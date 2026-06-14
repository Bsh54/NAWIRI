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
  const [tab,      setTab]      = useState("chat"); // "chat" | "map"
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

      {/* TOP BAR — logo left, Facebook-style icon tabs centered, action right */}
      <header style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 16px", height: 56, flexShrink: 0,
        background: "var(--bg-card)",
        borderBottom: "1px solid var(--border-soft)",
      }}>
        <a href="/" className="brand-text" style={{
          fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
          fontSize: 17, color: "var(--text)", letterSpacing: "-0.5px",
          textDecoration: "none", flex: 1,
        }}>
          NAWIRI
        </a>

        {/* Center icon tabs */}
        <nav style={{ display: "flex", gap: 6, alignItems: "stretch", height: "100%" }}>
          <TabButton
            active={tab === "chat"}
            onClick={() => setTab("chat")}
            label="Conversation"
            icon={<ChatIcon />}
          />
          <TabButton
            active={tab === "map"}
            onClick={() => setTab("map")}
            label="Institutions"
            icon={<MapIcon />}
          />
        </nav>

        <div style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
          {tab === "chat" && messages.length > 0 && (
            <button
              onClick={() => { setMessages([]); setError(""); }}
              style={{
                padding: "5px 12px", borderRadius: "var(--radius)",
                border: "1px solid var(--border)", background: "transparent",
                fontSize: 12, fontWeight: 600, color: "var(--text-3)", cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              New chat
            </button>
          )}
        </div>
      </header>

      {/* BODY: two full-page views toggled by the tabs (both stay mounted) */}
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>

        {/* Chat view */}
        <div style={{
          flex: 1, flexDirection: "column", overflow: "hidden",
          display: tab === "chat" ? "flex" : "none",
        }}>

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

            {messages.map((m, i) => {
              const isUser = m.role === "user";
              return (
                <div key={i} style={{
                  display: "flex", gap: 12, alignItems: "flex-start", width: "100%",
                  flexDirection: isUser ? "row-reverse" : "row",
                }}>
                  <Avatar role={m.role} />
                  <div style={{
                    minWidth: 0, paddingTop: 5,
                    flex: isUser ? "0 1 auto" : 1,
                    maxWidth: isUser ? "82%" : "100%",
                    textAlign: isUser ? "right" : "left",
                  }}>
                    <div style={{
                      fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
                      fontSize: 13, color: "var(--text)", marginBottom: 3,
                    }}>
                      {isUser ? "You" : "NAWIRI"}
                    </div>
                    {isUser ? (
                      <div style={{
                        display: "inline-block", textAlign: "left",
                        padding: "10px 14px", borderRadius: "14px 4px 14px 14px",
                        background: "var(--primary)", color: "#fff",
                        fontSize: 14, lineHeight: 1.6,
                      }}>
                        {m.content}
                      </div>
                    ) : (
                      <div style={{ fontSize: 14, lineHeight: 1.65, color: "var(--text)" }}>
                        {renderMessage(m.content)}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {loading && (
              <div style={{ display: "flex", gap: 12, alignItems: "flex-start", width: "100%" }}>
                <Avatar role="assistant" />
                <div style={{ flex: 1, paddingTop: 5 }}>
                  <div style={{
                    fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
                    fontSize: 13, color: "var(--text)", marginBottom: 6,
                  }}>
                    NAWIRI
                  </div>
                  <div style={{ display: "flex", gap: 5, alignItems: "center", height: 16 }}>
                    {[0, 1, 2].map(i => (
                      <span key={i} style={{
                        width: 6, height: 6, borderRadius: "50%",
                        background: "var(--text-3)", display: "inline-block",
                        animation: `dot-bounce 1.2s ease-in-out ${i * 0.2}s infinite`,
                      }} />
                    ))}
                  </div>
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

        {/* Map view (full page) */}
        <div style={{
          flex: 1, minHeight: 0,
          display: tab === "map" ? "block" : "none",
        }}>
          <InstitutionsMap open={tab === "map"} />
        </div>
      </div>

      <style>{`
        @keyframes dot-bounce {
          0%, 80%, 100% { transform: translateY(0);    opacity: 0.4; }
          40%            { transform: translateY(-5px); opacity: 1;   }
        }
        @media (max-width: 520px) {
          .brand-text { font-size: 0 !important; }
          .tab-label  { display: none !important; }
        }
      `}</style>
    </div>
  );
}

// ---- Facebook-style icon tab ----
function TabButton({ active, onClick, label, icon }) {
  return (
    <button
      onClick={onClick}
      title={label}
      style={{
        display: "flex", alignItems: "center", gap: 8,
        padding: "0 22px", height: "100%", minWidth: 90,
        justifyContent: "center", cursor: "pointer",
        background: "transparent", border: "none",
        borderBottom: "3px solid " + (active ? "var(--primary)" : "transparent"),
        color: active ? "var(--primary)" : "var(--text-3)",
        fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 13,
        transition: "color 0.15s, border-color 0.15s",
      }}
      onMouseEnter={e => { if (!active) e.currentTarget.style.color = "var(--text-2)"; }}
      onMouseLeave={e => { if (!active) e.currentTarget.style.color = "var(--text-3)"; }}
    >
      {icon}
      <span className="tab-label">{label}</span>
    </button>
  );
}

// ---- Circular app-style avatars (both participants) ----
function Avatar({ role }) {
  if (role === "user") {
    return (
      <div style={{
        width: 34, height: 34, borderRadius: "50%", flexShrink: 0,
        background: "var(--sage, #4A7C59)",
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: "0 1px 4px rgba(0,0,0,0.12)",
        color: "#fff",
      }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="8" r="4" />
          <path d="M4 20c0-4 3.5-6 8-6s8 2 8 6" />
        </svg>
      </div>
    );
  }
  return (
    <div style={{
      width: 34, height: 34, borderRadius: "50%", flexShrink: 0,
      background: "var(--primary)",
      display: "flex", alignItems: "center", justifyContent: "center",
      boxShadow: "0 1px 4px rgba(0,0,0,0.12)",
      fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
      fontSize: 15, color: "#fff",
    }}>N</div>
  );
}

// ---- Tab icons ----
function ChatIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}
function MapIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
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
