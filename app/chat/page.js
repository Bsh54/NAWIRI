"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import InstitutionsMap from "./InstitutionsMap";

const SOFT_ERROR = "I could not answer just now. Please wait a moment and try again.";

const LANG_CONFIG = {
  en:  { native: "English",  flag: "",   sub: "",         local: false },
  fr:  { native: "Français", flag: "",   sub: "",         local: false },
  fon: { native: "Fɔngbe",   flag: "🇧🇯", sub: "Bénin",   local: true  },
  wo:  { native: "Wolof",    flag: "🇸🇳", sub: "Sénégal", local: true  },
  tw:  { native: "Twi",      flag: "🇬🇭", sub: "Ghana",   local: true  },
};

const PLACEHOLDERS = {
  en:  "Describe your situation in English...",
  fr:  "Décrivez votre situation en français...",
  fon: "Wlan nǔ e ɖo wɛ ɖo Fɔngbe...",
  wo:  "Bind sa dëkk bi ci Wolof...",
  tw:  "Ka wo ho asɛm wɔ Twi mu...",
};

// Static strings for EN and FR; local langs are filled via API on language selection.
const STATIC_STRINGS = {
  en: {
    welcome_title:   "Describe your situation",
    welcome_sub:     "In plain words. NAWIRI will ask one question at a time to find what fits you.",
    disclaimer:      "NAWIRI guides you. Always verify with the official body before any step.",
    you:             "You",
    new_chat:        "New chat",
  },
  fr: {
    welcome_title:   "Décrivez votre situation",
    welcome_sub:     "En langage libre. NAWIRI posera une question à la fois pour trouver ce qui vous correspond.",
    disclaimer:      "NAWIRI vous oriente. Vérifiez toujours avec l'organisme officiel avant d'agir.",
    you:             "Vous",
    new_chat:        "Nouvelle conversation",
  },
};

// ─── Markdown / MAP-link renderer ──────────────────────────────────────────────

function renderInline(content, keyBase, onMap) {
  const parts = [];
  const regex = /\[\[MAP:([^\]|]+)\|([^\]]+)\]\]|\*\*(.+?)\*\*|\*(.+?)\*/g;
  let last = 0, match;
  while ((match = regex.exec(content)) !== null) {
    if (match.index > last) parts.push(content.slice(last, match.index));
    if (match[1] !== undefined) {
      const id = match[1].trim(), label = match[2].trim();
      parts.push(
        <button
          key={keyBase + "-map-" + match.index}
          onClick={() => onMap && onMap(id)}
          style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            verticalAlign: "middle", margin: "2px 0",
            padding: "4px 11px", borderRadius: 999,
            border: "1.5px solid var(--primary)",
            background: "var(--primary-soft)", color: "var(--primary-dark)",
            fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
            fontSize: 12.5, cursor: "pointer", lineHeight: 1.2,
            transition: "background 0.12s",
          }}
          onMouseEnter={e => e.currentTarget.style.background = "#FBD7CE"}
          onMouseLeave={e => e.currentTarget.style.background = "var(--primary-soft)"}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          {label}
        </button>
      );
    } else if (match[3] !== undefined) {
      parts.push(<strong key={keyBase + "-" + match.index} style={{ fontWeight: 700 }}>{match[3]}</strong>);
    } else {
      parts.push(<em key={keyBase + "-" + match.index} style={{ fontStyle: "italic" }}>{match[4]}</em>);
    }
    last = match.index + match[0].length;
  }
  if (last < content.length) parts.push(content.slice(last));
  return parts;
}

function renderMessage(text, onMap) {
  return text.split("\n").map((line, li) => {
    const heading = line.match(/^\s*(#{1,6})\s+(.*)$/);
    if (heading) {
      return (
        <div key={li} style={{
          fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
          fontSize: heading[1].length <= 2 ? 15 : 14, color: "var(--text)",
          marginTop: li === 0 ? 0 : 12, marginBottom: 2,
        }}>
          {renderInline(heading[2], li, onMap)}
        </div>
      );
    }
    const isBullet = /^(\s*[-*]|\s*▸)\s+/.test(line);
    const content  = isBullet ? line.replace(/^(\s*[-*▸])\s+/, "") : line;
    if (isBullet) {
      return (
        <div key={li} style={{ display: "flex", gap: 8, alignItems: "flex-start", marginTop: li === 0 ? 0 : 4 }}>
          <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--primary)", flexShrink: 0, marginTop: 8 }} />
          <span>{renderInline(content, li, onMap)}</span>
        </div>
      );
    }
    if (content.trim() === "") return <div key={li} style={{ height: 6 }} />;
    return <div key={li} style={{ marginTop: li === 0 ? 0 : 2 }}>{renderInline(content, li, onMap)}</div>;
  });
}

// ─── Language picker popup ──────────────────────────────────────────────────────

function LangCard({ code, onSelect }) {
  const [hover, setHover] = useState(false);
  const cfg = LANG_CONFIG[code];
  return (
    <button
      onClick={() => onSelect(code)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        flex: 1, padding: cfg.flag ? "18px 10px" : "16px 12px",
        borderRadius: 14, textAlign: "center", cursor: "pointer",
        border: "2px solid " + (hover ? "var(--primary)" : "var(--border-soft)"),
        background: hover ? "var(--primary-soft)" : "var(--bg)",
        transition: "all 0.15s",
      }}
    >
      {cfg.flag && <div style={{ fontSize: 26, marginBottom: 8 }}>{cfg.flag}</div>}
      <div style={{
        fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
        fontSize: cfg.flag ? 16 : 17, color: "var(--text)", lineHeight: 1.2,
      }}>
        {cfg.native}
      </div>
      {cfg.sub && <div style={{ fontSize: 11, color: "var(--text-3)", marginTop: 4 }}>{cfg.sub}</div>}
    </button>
  );
}

function LanguagePicker({ onSelect }) {
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 200,
      background: "rgba(15,12,8,0.65)", backdropFilter: "blur(6px)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: 24,
    }}>
      <div style={{
        background: "var(--bg-card)", borderRadius: 22,
        border: "1px solid var(--border-soft)",
        boxShadow: "0 24px 64px rgba(0,0,0,0.22)",
        width: "100%", maxWidth: 440, overflow: "hidden",
      }}>
        <div style={{ padding: "32px 28px 24px", textAlign: "center" }}>
          <div style={{
            fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800,
            fontSize: 26, color: "var(--primary)", letterSpacing: "-0.5px", marginBottom: 10,
          }}>
            NAWIRI
          </div>
          <p style={{ fontSize: 15, fontWeight: 600, color: "var(--text)", marginBottom: 4 }}>
            Choose your language
          </p>
          <p style={{ fontSize: 13, color: "var(--text-3)" }}>
            Choisissez votre langue
          </p>
        </div>

        <div style={{ padding: "0 24px", display: "flex", gap: 12 }}>
          <LangCard code="en" onSelect={onSelect} />
          <LangCard code="fr" onSelect={onSelect} />
        </div>

        <div style={{ margin: "22px 24px 14px", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ flex: 1, height: 1, background: "var(--border-soft)" }} />
          <span style={{
            fontSize: 10, fontWeight: 700, color: "var(--text-3)",
            textTransform: "uppercase", letterSpacing: "0.1em", whiteSpace: "nowrap",
          }}>
            African Languages
          </span>
          <div style={{ flex: 1, height: 1, background: "var(--border-soft)" }} />
        </div>

        <div style={{ padding: "0 24px 28px", display: "flex", gap: 12 }}>
          <LangCard code="fon" onSelect={onSelect} />
          <LangCard code="wo"  onSelect={onSelect} />
          <LangCard code="tw"  onSelect={onSelect} />
        </div>
      </div>
    </div>
  );
}

// ─── Translation helper ─────────────────────────────────────────────────────────

// [[MAP:id|label]] → "label §n§" so the label gets translated but the id is preserved.
async function translateText(text, src, tgt) {
  const mapIds = [];
  const prepared = text.replace(/\[\[MAP:([^\]|]+)\|([^\]]+)\]\]/g, (_, id, label) => {
    const n = mapIds.length;
    mapIds.push(id);
    return `${label} §${n}§`;
  });
  try {
    const res = await fetch("/api/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: prepared, src, tgt }),
    });
    if (!res.ok) return null;
    const data = await res.json();
    let result = data.result || null;
    if (!result) return null;
    if (mapIds.length > 0) {
      result = result.replace(/([^§\n]+?)\s*§(\d+)§/g, (_, label, n) => {
        const id = mapIds[+n];
        return id ? `[[MAP:${id}|${label.trim()}]]` : label;
      });
    }
    return result;
  } catch {
    return null;
  }
}

// ─── Main chat component ────────────────────────────────────────────────────────

function ChatApp() {
  const [messages,    setMessages]    = useState([]);
  const [input,       setInput]       = useState("");
  const [loading,     setLoading]     = useState(false);
  const [translating, setTranslating] = useState(false);
  const [error,       setError]       = useState("");
  const [tab,         setTab]         = useState("chat");
  const [mapTarget,   setMapTarget]   = useState(null);
  const [chosenLang,  setChosenLang]  = useState(null);
  const [showPicker,  setShowPicker]  = useState(false);

  // UI strings in the chosen language (welcome title, sub, disclaimer, etc.)
  const [uiStr, setUiStr] = useState(STATIC_STRINGS.en);

  // Clean conversation history sent to Gemini (always EN for local langs, or chosen lang otherwise).
  const aiHistoryRef = useRef([]);

  const endRef   = useRef(null);
  const inputRef = useRef(null);

  const isLocalLang = chosenLang && LANG_CONFIG[chosenLang]?.local;

  function openMapAt(id) {
    setMapTarget({ id, key: Date.now() });
    setTab("map");
  }

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Called when the user picks a language from the popup.
  // For local langs: translate the key UI strings via the API so the welcome screen
  // and hints appear in their language.
  async function selectLang(code) {
    setChosenLang(code);
    setShowPicker(false);

    if (LANG_CONFIG[code]?.local) {
      const native = LANG_CONFIG[code].native;
      const [title, sub, disc] = await Promise.all([
        translateText("Describe your situation", "en", code),
        translateText(`NAWIRI understands ${native}. Describe your situation freely.`, "en", code),
        translateText("NAWIRI guides you. Always verify with the official body before any step.", "en", code),
      ]);
      setUiStr({
        welcome_title: title    || "Describe your situation",
        welcome_sub:   sub      || `NAWIRI understands ${native}. Describe your situation freely.`,
        disclaimer:    disc     || "NAWIRI guides you. Always verify with the official body before any step.",
        you:           "You",
        new_chat:      "New chat",
      });
    } else {
      setUiStr(STATIC_STRINGS[code] ?? STATIC_STRINGS.en);
    }

    inputRef.current?.focus();
  }

  function newChat() {
    setMessages([]);
    setError("");
    setInput("");
    aiHistoryRef.current = [];
    setChosenLang(null);
    setShowPicker(false);
    setUiStr(STATIC_STRINGS.en);
  }

  async function send() {
    const text = input.trim();
    if (!text || loading || translating || !chosenLang) return;

    const newDisplay = [...messages, { role: "user", content: text }];
    setMessages(newDisplay);
    setInput("");
    setError("");
    setLoading(true);

    try {
      // For local langs: translate user input → English so Gemini always gets EN.
      let aiText = text;
      if (isLocalLang) {
        const xlated = await translateText(text, "auto", "en");
        if (xlated) aiText = xlated;
      }

      const newAiHistory = [...aiHistoryRef.current, { role: "user", content: aiText }];

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newAiHistory }),
      });

      if (!res.ok || !res.body) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || SOFT_ERROR);
        setLoading(false);
        return;
      }

      // Stream the English response live.
      const reader  = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      let started = false;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        if (!started) { started = true; setLoading(false); }
        setMessages([...newDisplay, { role: "assistant", content: acc }]);
      }

      if (!started) {
        setError(SOFT_ERROR);
        setLoading(false);
        return;
      }

      // Store English exchange in AI history.
      aiHistoryRef.current = [...newAiHistory, { role: "assistant", content: acc }];

      // For local langs: silently translate the response to the user's language.
      if (isLocalLang) {
        setTranslating(true);
        const xlated = await translateText(acc, "en", chosenLang);
        setTranslating(false);
        // Show translated version if successful, otherwise keep the English text.
        if (xlated) {
          setMessages([...newDisplay, { role: "assistant", content: xlated }]);
        }
      }

    } catch {
      setError(SOFT_ERROR);
      setLoading(false);
      setTranslating(false);
    }
  }

  function onKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
  }

  const isBusy = loading || translating;

  const suggestions = chosenLang === "fr"
    ? [
        "Mon enfant a 3 ans, il est souvent malade et nous n'avons pas d'assurance. Nous sommes au Bénin.",
        "Je suis enceinte et je ne peux pas payer les frais d'hôpital. Je suis au Sénégal.",
        "Je suis travailleur informel au Ghana et je veux connaître mes droits.",
      ]
    : [
        "My child is 3 years old, often sick, and we have no health insurance. We live in Benin.",
        "I am pregnant and cannot afford hospital fees. I am in Senegal.",
        "I am an informal worker in Ghana and want to know my social protection rights.",
      ];

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", overflow: "hidden", background: "var(--bg)" }}>

      {(!chosenLang || showPicker) && <LanguagePicker onSelect={selectLang} />}

      {/* TOP BAR */}
      <header style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 16px", height: 56, flexShrink: 0,
        background: "var(--bg-card)", borderBottom: "1px solid var(--border-soft)",
      }}>
        <a href="/" style={{
          fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
          fontSize: 17, color: "var(--text)", letterSpacing: "-0.5px",
          textDecoration: "none", flex: 1,
        }}>
          NAWIRI
        </a>

        <nav className="top-tabs" style={{ display: "flex", gap: 6, alignItems: "stretch", height: "100%" }}>
          <TabButton active={tab === "chat"} onClick={() => setTab("chat")} label="Conversation" icon={<ChatIcon />} />
          <TabButton active={tab === "map"}  onClick={() => setTab("map")}  label="Institutions"  icon={<MapIcon />} />
        </nav>

        <div style={{ flex: 1, display: "flex", justifyContent: "flex-end", gap: 8, alignItems: "center" }}>
          {messages.length > 0 && (
            <button onClick={newChat} style={{
              padding: "5px 12px", borderRadius: "var(--radius)",
              border: "1px solid var(--border)", background: "transparent",
              fontSize: 12, fontWeight: 600, color: "var(--text-3)", cursor: "pointer",
            }}>
              {uiStr.new_chat}
            </button>
          )}
        </div>
      </header>

      {/* BODY */}
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>

        {/* Chat view */}
        <div style={{
          flex: 1, flexDirection: "column", overflow: "hidden",
          display: tab === "chat" ? "flex" : "none",
        }}>
          <div style={{ flex: 1, overflowY: "auto", padding: "24px 16px" }}>
            <div style={{
              width: "100%", maxWidth: 820, margin: "0 auto", minHeight: "100%",
              display: "flex", flexDirection: "column", gap: 16,
            }}>

              {messages.length === 0 && chosenLang && (
                <div style={{ margin: "auto", maxWidth: 520, textAlign: "center", padding: "32px 16px" }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: "50%",
                    background: "var(--primary-soft)", border: "1.5px solid #F6AB99",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    margin: "0 auto 20px",
                    fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
                    fontSize: 18, color: "var(--primary)",
                  }}>N</div>

                  <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 17, color: "var(--text)", marginBottom: 8 }}>
                    {uiStr.welcome_title}
                  </p>
                  <p style={{ fontSize: 14, color: "var(--text-2)", lineHeight: 1.6, marginBottom: 24 }}>
                    {uiStr.welcome_sub}
                  </p>

                  {!isLocalLang && (
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      {suggestions.map((s, i) => (
                        <button
                          key={i}
                          onClick={() => { setInput(s); inputRef.current?.focus(); }}
                          style={{
                            padding: "10px 14px", background: "var(--bg-card)",
                            border: "1px solid var(--border-soft)", borderRadius: "var(--radius-lg)",
                            fontSize: 13, color: "var(--text-2)", cursor: "pointer",
                            textAlign: "left", lineHeight: 1.5, transition: "border-color 0.12s",
                          }}
                          onMouseEnter={e => e.currentTarget.style.borderColor = "var(--primary)"}
                          onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border-soft)"}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  )}
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
                        {isUser ? uiStr.you : "NAWIRI"}
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
                          {renderMessage(m.content, openMapAt)}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              {(loading || translating) && (
                <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <Avatar role="assistant" />
                  <div style={{ flex: 1, paddingTop: 5 }}>
                    <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 13, color: "var(--text)", marginBottom: 6 }}>
                      NAWIRI
                    </div>
                    <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
                      {[0, 1, 2].map(i => (
                        <span key={i} style={{
                          width: 6, height: 6, borderRadius: "50%", background: "var(--text-3)",
                          display: "inline-block",
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
                  padding: "10px 16px", background: "var(--bg-card)",
                  border: "1px solid var(--border-soft)", borderRadius: "var(--radius-lg)",
                  fontSize: 13, color: "var(--text-3)", lineHeight: 1.5,
                }}>
                  {error}
                </div>
              )}

              <div ref={endRef} />
            </div>
          </div>

          {/* Input bar */}
          <div style={{
            padding: "12px 16px 14px", borderTop: "1px solid var(--border-soft)",
            background: "var(--bg-card)", flexShrink: 0,
          }}>
            <div style={{ width: "100%", maxWidth: 820, margin: "0 auto" }}>

              {/* Change language link */}
              {chosenLang && (
                <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 6 }}>
                  <button
                    onClick={() => setShowPicker(true)}
                    style={{
                      fontSize: 11, color: "var(--primary)", fontWeight: 600,
                      background: "none", border: "none", cursor: "pointer", padding: "2px 4px",
                    }}
                  >
                    Change language ›
                  </button>
                </div>
              )}

              <div style={{ display: "flex", gap: 10, alignItems: "flex-end" }}>
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={onKeyDown}
                  rows={2}
                  placeholder={chosenLang ? PLACEHOLDERS[chosenLang] : ""}
                  disabled={!chosenLang}
                  style={{
                    flex: 1, resize: "none", padding: "10px 14px",
                    border: "1.5px solid var(--border)", borderRadius: "var(--radius-lg)",
                    fontSize: 14, color: "var(--text)", background: "var(--bg)",
                    outline: "none", lineHeight: 1.5, fontFamily: "'Inter', sans-serif",
                    transition: "border-color 0.15s", opacity: chosenLang ? 1 : 0.4,
                  }}
                  onFocus={e => e.target.style.borderColor = "var(--primary)"}
                  onBlur={e  => e.target.style.borderColor = "var(--border)"}
                />
                <button
                  onClick={send}
                  disabled={isBusy || !input.trim() || !chosenLang}
                  style={{
                    width: 46, height: 46, flexShrink: 0,
                    borderRadius: "var(--radius-lg)", border: "none",
                    background: (isBusy || !input.trim() || !chosenLang) ? "var(--border)" : "var(--primary)",
                    color: "#FFF", fontSize: 18,
                    cursor: (isBusy || !input.trim() || !chosenLang) ? "default" : "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "background 0.12s",
                  }}
                >
                  ↑
                </button>
              </div>

              <p style={{ fontSize: 11, color: "var(--text-3)", marginTop: 8, textAlign: "center" }}>
                {uiStr.disclaimer}
              </p>
            </div>
          </div>
        </div>

        {/* Map view */}
        <div style={{ flex: 1, minHeight: 0, display: tab === "map" ? "block" : "none" }}>
          <InstitutionsMap open={tab === "map"} target={mapTarget} />
        </div>
      </div>

      {/* BOTTOM NAV (mobile) */}
      <nav className="bottom-nav" style={{
        flexShrink: 0, background: "var(--bg-card)",
        borderTop: "1px solid var(--border-soft)",
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
      }}>
        <BottomTab active={tab === "chat"} onClick={() => setTab("chat")} label="Conversation" icon={<ChatIcon />} />
        <BottomTab active={tab === "map"}  onClick={() => setTab("map")}  label="Institutions"  icon={<MapIcon />} />
      </nav>

      <style>{`
        @keyframes dot-bounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40% { transform: translateY(-5px); opacity: 1; }
        }
        .bottom-nav { display: none; }
        @media (max-width: 640px) {
          .top-tabs { display: none !important; }
          .bottom-nav { display: flex !important; }
        }
      `}</style>
    </div>
  );
}

// ─── Sub-components ─────────────────────────────────────────────────────────────

function TabButton({ active, onClick, label, icon }) {
  return (
    <button onClick={onClick} title={label} style={{
      display: "flex", alignItems: "center", gap: 8,
      padding: "0 22px", height: "100%", minWidth: 90, justifyContent: "center",
      cursor: "pointer", background: "transparent", border: "none",
      borderBottom: "3px solid " + (active ? "var(--primary)" : "transparent"),
      color: active ? "var(--primary)" : "var(--text-3)",
      fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 13,
      transition: "color 0.15s, border-color 0.15s",
    }}
    onMouseEnter={e => { if (!active) e.currentTarget.style.color = "var(--text-2)"; }}
    onMouseLeave={e => { if (!active) e.currentTarget.style.color = "var(--text-3)"; }}
    >
      {icon}<span className="tab-label">{label}</span>
    </button>
  );
}

function BottomTab({ active, onClick, label, icon }) {
  return (
    <button onClick={onClick} style={{
      flex: 1, display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "center", gap: 3, padding: "8px 0 9px",
      background: "transparent", border: "none", cursor: "pointer",
      color: active ? "var(--primary)" : "var(--text-3)",
      fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 11,
      transition: "color 0.15s",
    }}>
      {icon}<span>{label}</span>
    </button>
  );
}

function Avatar({ role }) {
  if (role === "user") {
    return (
      <div style={{
        width: 34, height: 34, borderRadius: "50%", flexShrink: 0,
        background: "var(--sage, #4A7C59)", color: "#fff",
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: "0 1px 4px rgba(0,0,0,0.12)",
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
      background: "var(--primary)", color: "#fff",
      display: "flex", alignItems: "center", justifyContent: "center",
      boxShadow: "0 1px 4px rgba(0,0,0,0.12)",
      fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 15,
    }}>N</div>
  );
}

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
