"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";

const COUNTRIES = ["Benin", "Senegal", "Ghana"];
const LANGUAGES = [
  { value: "English", label: "English" },
  { value: "French",  label: "Français" },
];

const MAP_URLS = {
  Benin:   "https://www.openstreetmap.org/export/embed.html?bbox=0.78%2C6.03%2C3.82%2C12.46&layer=mapnik",
  Senegal: "https://www.openstreetmap.org/export/embed.html?bbox=-17.77%2C12.31%2C-11.35%2C16.69&layer=mapnik",
  Ghana:   "https://www.openstreetmap.org/export/embed.html?bbox=-3.56%2C4.73%2C1.22%2C11.17&layer=mapnik",
};

const SUGGESTIONS = {
  English: [
    "My child is 3 years old, often sick and we have no health insurance.",
    "I am pregnant and cannot afford hospital fees.",
    "I am an informal worker and want to know my social protection rights.",
  ],
  French: [
    "Mon enfant a 3 ans, il est souvent malade et nous n'avons pas d'assurance.",
    "Je suis enceinte et je ne peux pas payer les frais d'hôpital.",
    "Je suis travailleur informel et je veux connaître mes droits sociaux.",
  ],
};

function ChatApp() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [country,  setCountry]  = useState(searchParams.get("country")  || "Benin");
  const [language, setLanguage] = useState(searchParams.get("language") || "English");
  const [messages, setMessages] = useState([]);
  const [input,    setInput]    = useState("");
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState("");
  const [panel,    setPanel]    = useState("chat"); // mobile only: map | chat
  const endRef   = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  function changeCountry(c) { setCountry(c); setMessages([]); setError(""); }

  async function send() {
    const text = input.trim();
    if (!text || loading) return;
    const next = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setError("");
    setLoading(true);
    try {
      const res  = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ country, language, messages: next }),
      });
      const data = await res.json();
      if (!res.ok) setError(data.error || "Error.");
      else setMessages([...next, { role: "assistant", content: data.reply }]);
    } catch {
      setError("Connection problem. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function onKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
  }

  const isEN = language === "English";

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", overflow: "hidden", background: "var(--bg)" }}>

      {/* ── TOP BAR ── */}
      <header style={{
        display: "flex", alignItems: "center", gap: 16,
        padding: "0 20px", height: 54, flexShrink: 0,
        background: "var(--bg-card)",
        borderBottom: "1px solid var(--border-soft)",
      }}>
        <a href="/" style={{
          fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
          fontSize: 17, color: "var(--text)", letterSpacing: "-0.5px",
          textDecoration: "none", flexShrink: 0, marginRight: 8,
        }}>
          NAWIRI
        </a>

        <div style={{ display: "flex", gap: 4 }}>
          {COUNTRIES.map(c => (
            <button key={c} onClick={() => changeCountry(c)} style={{
              padding: "4px 12px", borderRadius: "var(--radius)",
              border: "none", fontSize: 13, fontWeight: 600, cursor: "pointer",
              background: country === c ? "var(--primary-soft)" : "transparent",
              color: country === c ? "var(--primary)" : "var(--text-3)",
              transition: "all 0.12s",
            }}>
              {c}
            </button>
          ))}
        </div>

        <div style={{ display: "flex", gap: 4, marginLeft: 4 }}>
          {LANGUAGES.map(l => (
            <button key={l.value} onClick={() => setLanguage(l.value)} style={{
              padding: "4px 12px", borderRadius: "var(--radius)",
              border: "none", fontSize: 13, fontWeight: 600, cursor: "pointer",
              background: language === l.value ? "var(--green-soft)" : "transparent",
              color: language === l.value ? "var(--green)" : "var(--text-3)",
              transition: "all 0.12s",
            }}>
              {l.label}
            </button>
          ))}
        </div>

        <div style={{ marginLeft: "auto" }}>
          {messages.length > 0 && (
            <button onClick={() => { setMessages([]); setError(""); }} style={{
              padding: "4px 12px", borderRadius: "var(--radius)",
              border: "1px solid var(--border)", background: "transparent",
              fontSize: 12, fontWeight: 600, color: "var(--text-3)", cursor: "pointer",
            }}>
              {isEN ? "New conversation" : "Nouvelle conversation"}
            </button>
          )}
        </div>
      </header>

      {/* ── MOBILE TAB BAR ── */}
      <div className="mobile-tabs" style={{
        display: "none", borderBottom: "1px solid var(--border-soft)",
        background: "var(--bg-card)", flexShrink: 0,
      }}>
        {[
          { id: "map",  label: isEN ? "Map"          : "Carte" },
          { id: "chat", label: isEN ? "Conversation" : "Conversation" },
        ].map(tab => (
          <button key={tab.id} onClick={() => setPanel(tab.id)} style={{
            flex: 1, padding: "10px 4px", border: "none",
            borderBottom: panel === tab.id ? "2px solid var(--primary)" : "2px solid transparent",
            background: "transparent",
            fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600,
            fontSize: 13, cursor: "pointer",
            color: panel === tab.id ? "var(--primary)" : "var(--text-3)",
            transition: "all 0.12s",
          }}>
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── TWO-PANEL LAYOUT ── */}
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>

        {/* LEFT — MAP */}
        <div className={`side-panel ${panel === "map" ? "panel-active" : ""}`} style={{
          width: 300, flexShrink: 0,
          borderRight: "1px solid var(--border-soft)",
          background: "var(--bg-card)",
          display: "flex", flexDirection: "column",
          overflow: "hidden",
        }}>
          <div style={{
            padding: "10px 14px", borderBottom: "1px solid var(--border-soft)",
            fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600,
            fontSize: 12, color: "var(--text-3)",
            letterSpacing: "0.06em", textTransform: "uppercase",
          }}>
            {country}
          </div>
          <iframe
            key={country}
            src={MAP_URLS[country]}
            title={`Map of ${country}`}
            style={{ flex: 1, border: "none", width: "100%" }}
            loading="lazy"
          />
          <div style={{
            padding: "6px 12px", fontSize: 10, color: "var(--text-3)",
            borderTop: "1px solid var(--border-soft)",
          }}>
            © OpenStreetMap contributors
          </div>
        </div>

        {/* RIGHT — CHAT */}
        <div className={`center-panel ${panel === "chat" ? "panel-active" : ""}`} style={{
          flex: 1, display: "flex", flexDirection: "column", overflow: "hidden",
          background: "var(--bg)",
        }}>

          {/* Messages */}
          <div style={{
            flex: 1, overflowY: "auto", padding: "20px 28px",
            display: "flex", flexDirection: "column", gap: 16,
          }}>

            {messages.length === 0 && (
              <div style={{ margin: "auto", maxWidth: 500, textAlign: "center", padding: "40px 16px" }}>
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
                  {isEN ? "Describe your situation" : "Décrivez votre situation"}
                </p>
                <p style={{ fontSize: 14, color: "var(--text-2)", lineHeight: 1.6, marginBottom: 24 }}>
                  {isEN
                    ? "In plain words — no forms, no jargon. NAWIRI will ask one question at a time to find what fits you."
                    : "En langage libre — pas de formulaire. NAWIRI posera une question à la fois pour cibler ce qui vous correspond."}
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {SUGGESTIONS[language].map((s, i) => (
                    <button key={i} onClick={() => { setInput(s); inputRef.current?.focus(); }} style={{
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
                  fontSize: 14, lineHeight: 1.65, whiteSpace: "pre-wrap",
                  border: m.role === "assistant" ? "1px solid var(--border-soft)" : "none",
                  boxShadow: m.role === "assistant" ? "0 1px 4px rgba(0,0,0,0.05)" : "none",
                }}>
                  {m.content}
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
                padding: "10px 14px",
                background: "#FEF2F2", border: "1px solid #FECACA",
                borderRadius: "var(--radius)", fontSize: 13, color: "#B91C1C",
              }}>
                {error}
              </div>
            )}

            <div ref={endRef} />
          </div>

          {/* Input bar */}
          <div style={{
            padding: "14px 24px",
            borderTop: "1px solid var(--border-soft)",
            background: "var(--bg-card)", flexShrink: 0,
          }}>
            <div style={{ display: "flex", gap: 10, alignItems: "flex-end" }}>
              <textarea
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                rows={2}
                placeholder={isEN
                  ? "Describe your situation… (Enter to send)"
                  : "Décrivez votre situation… (Entrée pour envoyer)"}
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
                  color: "#FFF", fontSize: 18, cursor: loading || !input.trim() ? "default" : "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "background 0.12s",
                }}
              >
                ↑
              </button>
            </div>
            <p style={{ fontSize: 11, color: "var(--text-3)", marginTop: 8, textAlign: "center" }}>
              {isEN
                ? "NAWIRI guides you — always verify with the official body before any step."
                : "NAWIRI vous oriente — vérifiez toujours auprès de l'organisme officiel."}
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes dot-bounce {
          0%, 80%, 100% { transform: translateY(0);    opacity: 0.4; }
          40%            { transform: translateY(-5px); opacity: 1;   }
        }
        @media (max-width: 768px) {
          .side-panel   { display: none !important; }
          .center-panel { display: none !important; }
          .side-panel.panel-active   { display: flex !important; flex-direction: column; flex: 1; }
          .center-panel.panel-active { display: flex !important; }
          .mobile-tabs  { display: flex !important; }
        }
        @media (min-width: 769px) {
          .side-panel   { display: flex !important; flex-direction: column; }
          .center-panel { display: flex !important; }
          .mobile-tabs  { display: none !important; }
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
        Loading…
      </div>
    }>
      <ChatApp />
    </Suspense>
  );
}
