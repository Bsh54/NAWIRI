"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import { useRouter } from "next/navigation";
import InstitutionsMap from "./InstitutionsMap";

// Parse inline markdown (**bold**, *italic*) into React nodes.
function renderInline(content, keyBase) {
  const parts = [];
  const regex = /\*\*(.+?)\*\*|\*(.+?)\*/g;
  let last = 0, match;
  while ((match = regex.exec(content)) !== null) {
    if (match.index > last) parts.push(content.slice(last, match.index));
    if (match[1] !== undefined) {
      parts.push(
        <strong key={keyBase + "-" + match.index} style={{ fontWeight: 700, color: "inherit" }}>
          {match[1]}
        </strong>
      );
    } else {
      parts.push(
        <em key={keyBase + "-" + match.index} style={{ fontStyle: "italic" }}>
          {match[2]}
        </em>
      );
    }
    last = match.index + match[0].length;
  }
  if (last < content.length) parts.push(content.slice(last));
  return parts;
}

// Renders markdown-like text from Gemini:
// # headings, **bold**, *italic*, "- " / "* " / "▸ " bullets.
function renderMessage(text) {
  const lines = text.split("\n");
  return lines.map((line, li) => {
    // Heading: #, ##, ### ...
    const heading = line.match(/^\s*(#{1,6})\s+(.*)$/);
    if (heading) {
      const level = heading[1].length;
      return (
        <div key={li} style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 700,
          fontSize: level <= 2 ? 15 : 14,
          color: "var(--text)",
          marginTop: li === 0 ? 0 : 12, marginBottom: 2,
        }}>
          {renderInline(heading[2], li)}
        </div>
      );
    }

    // Bullet line
    const isBullet = /^(\s*[-*]|\s*▸)\s+/.test(line);
    const content  = isBullet ? line.replace(/^(\s*[-*▸])\s+/, "") : line;

    if (isBullet) {
      return (
        <div key={li} style={{ display: "flex", gap: 8, alignItems: "flex-start", marginTop: li === 0 ? 0 : 4 }}>
          <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--primary)", flexShrink: 0, marginTop: 8 }} />
          <span>{renderInline(content, li)}</span>
        </div>
      );
    }

    // Empty line = spacer
    if (content.trim() === "") return <div key={li} style={{ height: 6 }} />;

    return <div key={li} style={{ marginTop: li === 0 ? 0 : 2 }}>{renderInline(content, li)}</div>;
  });
}

function ChatApp() {
  const router = useRouter();
  const [messages, setMessages] = useState([]);
  const [input,    setInput]    = useState("");
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState("");
  const [mapOpen,  setMapOpen]  = useState(false);
  const endRef   = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;
    const next = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ messages: next }),
      });

      // Hard failure: read the JSON soft-error, no streaming.
      if (!res.ok || !res.body) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "I could not answer just now. Please wait a moment and try again.");
        setLoading(false);
        return;
      }

      // Stream the answer in, appending to a growing assistant bubble.
      const reader  = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      let started = false;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        if (!started) {
          started = true;
          setLoading(false);
          setMessages([...next, { role: "assistant", content: acc }]);
        } else {
          setMessages([...next, { role: "assistant", content: acc }]);
        }
      }
      // Nothing came through at all.
      if (!started) {
        setError("I could not answer just now. Please wait a moment and try again.");
        setLoading(false);
      }
    } catch {
      setError("I could not answer just now. Please check your connection and try again.");
      setLoading(false);
    }
  }

  function onKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
  }

  const suggestions = [
    "My child is 3 years old, often sick, and we have no health insurance. We live in Benin.",
    "Je suis enceinte et je ne peux pas payer les frais d'hôpital. Je suis au Sénégal.",
    "I am an informal worker in Ghana and want to know my social protection rights.",
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", overflow: "hidden", background: "var(--bg)" }}>

      {/* TOP BAR */}
      <header style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 24px", height: 54, flexShrink: 0,
        background: "var(--bg-card)",
        borderBottom: "1px solid var(--border-soft)",
      }}>
        <a href="/" style={{
          fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
          fontSize: 17, color: "var(--text)", letterSpacing: "-0.5px",
          textDecoration: "none",
        }}>
          NAWIRI
        </a>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {messages.length > 0 && (
            <button
              onClick={() => { setMessages([]); setError(""); }}
              style={{
                padding: "5px 12px", borderRadius: "var(--radius)",
                border: "1px solid var(--border)", background: "transparent",
                fontSize: 12, fontWeight: 600, color: "var(--text-3)", cursor: "pointer",
              }}
            >
              New conversation
            </button>
          )}
          <button
            onClick={() => setMapOpen(true)}
            style={{
              display: "flex", alignItems: "center", gap: 6,
              padding: "5px 14px", borderRadius: "var(--radius)",
              border: "1px solid var(--primary)", background: "var(--primary-soft)",
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 12, fontWeight: 600, color: "var(--primary)", cursor: "pointer",
            }}
          >
            <span style={{ fontSize: 14, lineHeight: 1 }}>◎</span>
            Institutions
          </button>
        </div>
      </header>

      {/* BODY: chat full width (map lives in a toggleable panel) */}
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>

        {/* Chat */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>

          {/* Messages (scroll area is full width; content is centered) */}
          <div style={{ flex: 1, overflowY: "auto", padding: "24px 16px" }}>
          <div style={{
            width: "100%", maxWidth: 820, margin: "0 auto", minHeight: "100%",
            display: "flex", flexDirection: "column", gap: 16,
          }}>

            {messages.length === 0 && (
              <div style={{ margin: "auto", maxWidth: 520, textAlign: "center", padding: "32px 16px" }}>
                <div style={{
                  width: 48, height: 48, borderRadius: "50%",
                  background: "var(--primary-soft)",
                  border: "1.5px solid #F6AB99",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 20px",
                  fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
                  fontSize: 18, color: "var(--primary)",
                }}>N</div>

                <p style={{
                  fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600,
                  fontSize: 17, color: "var(--text)", marginBottom: 8,
                }}>
                  Describe your situation
                </p>
                <p style={{ fontSize: 14, color: "var(--text-2)", lineHeight: 1.6, marginBottom: 24 }}>
                  In plain words, in English or French. NAWIRI will detect your language and ask one question at a time to find what fits you.
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {suggestions.map((s, i) => (
                    <button
                      key={i}
                      onClick={() => { setInput(s); inputRef.current?.focus(); }}
                      style={{
                        padding: "10px 14px",
                        background: "var(--bg-card)",
                        border: "1px solid var(--border-soft)",
                        borderRadius: "var(--radius-lg)",
                        fontSize: 13, color: "var(--text-2)",
                        cursor: "pointer", textAlign: "left", lineHeight: 1.5,
                        transition: "border-color 0.12s",
                      }}
                      onMouseEnter={e => e.currentTarget.style.borderColor = "var(--primary)"}
                      onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border-soft)"}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((m, i) => (
              <div key={i} style={{
                display: "flex",
                justifyContent: m.role === "user" ? "flex-end" : "flex-start",
                gap: 10, alignItems: "flex-start",
              }}>
                {m.role === "assistant" && (
                  <div style={{
                    width: 30, height: 30, borderRadius: "50%", flexShrink: 0,
                    background: "var(--primary-soft)",
                    border: "1.5px solid #F6AB99",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
                    fontSize: 13, color: "var(--primary)", marginTop: 2,
                  }}>N</div>
                )}
                <div style={{
                  maxWidth: "76%",
                  padding: "11px 15px",
                  borderRadius: m.role === "user" ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
                  background: m.role === "user" ? "var(--primary)" : "var(--bg-card)",
                  color: m.role === "user" ? "#FFF" : "var(--text)",
                  fontSize: 14, lineHeight: 1.65,
                  border: m.role === "assistant" ? "1px solid var(--border-soft)" : "none",
                  boxShadow: m.role === "assistant" ? "0 1px 4px rgba(0,0,0,0.05)" : "none",
                }}>
                  {m.role === "user" ? m.content : renderMessage(m.content)}
                </div>
              </div>
            ))}

            {loading && (
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <div style={{
                  width: 30, height: 30, borderRadius: "50%",
                  background: "var(--primary-soft)", border: "1.5px solid #F6AB99",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
                  fontSize: 13, color: "var(--primary)",
                }}>N</div>
                <div style={{
                  padding: "11px 16px",
                  background: "var(--bg-card)",
                  border: "1px solid var(--border-soft)",
                  borderRadius: "14px 14px 14px 4px",
                  display: "flex", gap: 5, alignItems: "center",
                }}>
                  {[0, 1, 2].map(i => (
                    <span key={i} style={{
                      width: 6, height: 6, borderRadius: "50%",
                      background: "var(--text-3)", display: "inline-block",
                      animation: `dot-bounce 1.2s ease-in-out ${i * 0.2}s infinite`,
                    }} />
                  ))}
                </div>
              </div>
            )}

            {error && (
              <div style={{
                alignSelf: "center", maxWidth: 380, textAlign: "center",
                padding: "10px 16px", marginTop: 4,
                background: "var(--bg-card)", border: "1px solid var(--border-soft)",
                borderRadius: "var(--radius-lg)", fontSize: 13, color: "var(--text-3)",
                lineHeight: 1.5,
              }}>
                {error}
              </div>
            )}

            <div ref={endRef} />
          </div>
          </div>

          {/* Input bar */}
          <div style={{
            padding: "14px 16px",
            borderTop: "1px solid var(--border-soft)",
            background: "var(--bg-card)", flexShrink: 0,
          }}>
            <div style={{ width: "100%", maxWidth: 820, margin: "0 auto" }}>
            <div style={{ display: "flex", gap: 10, alignItems: "flex-end" }}>
              <textarea
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                rows={2}
                placeholder="Describe your situation in English or French..."
                style={{
                  flex: 1, resize: "none",
                  padding: "10px 14px",
                  border: "1.5px solid var(--border)",
                  borderRadius: "var(--radius-lg)",
                  fontSize: 14, color: "var(--text)",
                  background: "var(--bg)", outline: "none",
                  lineHeight: 1.5, fontFamily: "'Inter', sans-serif",
                  transition: "border-color 0.15s",
                }}
                onFocus={e => e.target.style.borderColor = "var(--primary)"}
                onBlur={e => e.target.style.borderColor = "var(--border)"}
              />
              <button
                onClick={send}
                disabled={loading || !input.trim()}
                style={{
                  width: 46, height: 46, flexShrink: 0,
                  borderRadius: "var(--radius-lg)", border: "none",
                  background: loading || !input.trim() ? "var(--border)" : "var(--primary)",
                  color: "#FFF", fontSize: 18,
                  cursor: loading || !input.trim() ? "default" : "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "background 0.12s",
                }}
              >
                ↑
              </button>
            </div>
            <p style={{ fontSize: 11, color: "var(--text-3)", marginTop: 8, textAlign: "center" }}>
              NAWIRI guides you. Always verify with the official body before any step.
            </p>
            </div>
          </div>
        </div>
      </div>

      {/* INSTITUTIONS PANEL (slide-in on desktop, full-screen on mobile) */}
      {/* Backdrop */}
      <div
        onClick={() => setMapOpen(false)}
        style={{
          position: "fixed", inset: 0, zIndex: 100,
          background: "rgba(26,26,26,0.35)",
          opacity: mapOpen ? 1 : 0,
          pointerEvents: mapOpen ? "auto" : "none",
          transition: "opacity 0.25s",
        }}
      />
      {/* Panel */}
      <aside
        className="inst-panel"
        style={{
          position: "fixed", top: 0, right: 0, height: "100%", zIndex: 101,
          background: "var(--bg-card)",
          display: "flex", flexDirection: "column",
          boxShadow: "-8px 0 32px rgba(0,0,0,0.18)",
          transform: mapOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.3s ease",
        }}
      >
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "12px 16px", borderBottom: "1px solid var(--border-soft)", flexShrink: 0,
        }}>
          <span style={{
            fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
            fontSize: 14, color: "var(--text)",
          }}>
            Official institutions
          </span>
          <button
            onClick={() => setMapOpen(false)}
            aria-label="Close"
            style={{
              width: 30, height: 30, borderRadius: "var(--radius)",
              border: "1px solid var(--border)", background: "transparent",
              fontSize: 16, color: "var(--text-2)", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            ✕
          </button>
        </div>
        <div style={{ flex: 1, minHeight: 0 }}>
          <InstitutionsMap open={mapOpen} />
        </div>
      </aside>

      <style>{`
        @keyframes dot-bounce {
          0%, 80%, 100% { transform: translateY(0);    opacity: 0.4; }
          40%            { transform: translateY(-5px); opacity: 1;   }
        }
        .inst-panel { width: 420px; max-width: 100%; }
        @media (max-width: 640px) {
          .inst-panel { width: 100%; }
        }
      `}</style>
    </div>
  );
}

export default function ChatPage() {
  return (
    <Suspense fallback={
      <div style={{
        height: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "'Space Grotesk', sans-serif", color: "var(--text-2)", fontSize: 16,
      }}>
        Loading...
      </div>
    }>
      <ChatApp />
    </Suspense>
  );
}
