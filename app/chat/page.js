"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";

const COUNTRIES = [
  { value: "Benin", label: "🇧🇯 Bénin" },
  { value: "Senegal", label: "🇸🇳 Sénégal" },
  { value: "Ghana", label: "🇬🇭 Ghana" },
];

const LANGUAGES = [
  { value: "French", label: "Français" },
  { value: "English", label: "English" },
];

const MAP_URLS = {
  Benin: "https://www.openstreetmap.org/export/embed.html?bbox=0.7763671875%2C6.03%2C3.8232421875%2C12.46&layer=mapnik",
  Senegal: "https://www.openstreetmap.org/export/embed.html?bbox=-17.77%2C12.31%2C-11.35%2C16.69&layer=mapnik",
  Ghana: "https://www.openstreetmap.org/export/embed.html?bbox=-3.56%2C4.73%2C1.22%2C11.17&layer=mapnik",
};

function ChatApp() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [country, setCountry] = useState(searchParams.get("country") || "Benin");
  const [language, setLanguage] = useState(searchParams.get("language") || "French");
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activePanel, setActivePanel] = useState("chat"); // mobile: "map" | "chat" | "profile"
  const [profile, setProfile] = useState(() => {
    if (typeof window !== "undefined") {
      try { return JSON.parse(localStorage.getItem("nawiri_profile") || "{}"); }
      catch { return {}; }
    }
    return {};
  });
  const [editingProfile, setEditingProfile] = useState(false);
  const [profileDraft, setProfileDraft] = useState({});
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  function saveProfile(data) {
    localStorage.setItem("nawiri_profile", JSON.stringify(data));
    setProfile(data);
    setEditingProfile(false);
  }

  function clearSession() {
    setMessages([]);
    setError("");
  }

  function changeCountry(c) {
    setCountry(c);
    clearSession();
  }

  async function send() {
    const text = input.trim();
    if (!text || loading) return;
    const nextMessages = [...messages, { role: "user", content: text }];
    setMessages(nextMessages);
    setInput("");
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ country, language, messages: nextMessages }),
      });
      const data = await res.json();
      if (!res.ok) setError(data.error || "Erreur.");
      else setMessages([...nextMessages, { role: "assistant", content: data.reply }]);
    } catch {
      setError("Problème de connexion. Réessayez.");
    } finally {
      setLoading(false);
    }
  }

  function onKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
  }

  const panelBtn = (id, label, emoji) => (
    <button
      onClick={() => setActivePanel(id)}
      style={{
        flex: 1, padding: "8px 4px", border: "none", cursor: "pointer",
        background: activePanel === id ? "#0891B2" : "#F0FDFF",
        color: activePanel === id ? "#FFFFFF" : "#0891B2",
        fontFamily: "'Lexend', sans-serif", fontWeight: 600, fontSize: 12,
        borderRadius: 8, transition: "all 0.15s",
      }}
    >
      {emoji} {label}
    </button>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", overflow: "hidden" }}>

      {/* TOP BAR */}
      <header style={{
        display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap",
        padding: "10px 16px", background: "#FFFFFF",
        borderBottom: "1px solid #A5F3FC", flexShrink: 0,
      }}>
        <button
          onClick={() => router.push("/")}
          style={{
            background: "none", border: "none", cursor: "pointer",
            fontFamily: "'Lexend', sans-serif", fontWeight: 700,
            fontSize: 18, color: "#0891B2", padding: 0,
          }}
        >
          NAWIRI
        </button>

        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {COUNTRIES.map((c) => (
            <button key={c.value} onClick={() => changeCountry(c.value)} style={{
              padding: "5px 10px", borderRadius: 8, fontSize: 13, fontWeight: 600,
              cursor: "pointer", border: "none",
              background: country === c.value ? "#ECFEFF" : "#F8FAFC",
              color: country === c.value ? "#0E7490" : "#94A3B8",
              outline: country === c.value ? "2px solid #0891B2" : "2px solid transparent",
            }}>{c.label}</button>
          ))}
        </div>

        <div style={{ display: "flex", gap: 6 }}>
          {LANGUAGES.map((l) => (
            <button key={l.value} onClick={() => setLanguage(l.value)} style={{
              padding: "5px 10px", borderRadius: 8, fontSize: 13, fontWeight: 600,
              cursor: "pointer", border: "none",
              background: language === l.value ? "#ECFDF5" : "#F8FAFC",
              color: language === l.value ? "#047857" : "#94A3B8",
              outline: language === l.value ? "2px solid #059669" : "2px solid transparent",
            }}>{l.label}</button>
          ))}
        </div>

        {messages.length > 0 && (
          <button onClick={clearSession} style={{
            marginLeft: "auto", padding: "5px 12px", borderRadius: 8,
            background: "#FEF2F2", color: "#DC2626", border: "1px solid #FECACA",
            fontSize: 12, fontWeight: 600, cursor: "pointer",
          }}>
            Nouvelle conversation
          </button>
        )}
      </header>

      {/* MOBILE PANEL SWITCHER */}
      <div style={{
        display: "flex", gap: 6, padding: "8px 12px",
        background: "#F0FDFF", borderBottom: "1px solid #A5F3FC",
        flexShrink: 0,
      }}
        className="mobile-tabs"
      >
        {panelBtn("map", "Carte", "🗺️")}
        {panelBtn("chat", "Conversation", "💬")}
        {panelBtn("profile", "Profil", "👤")}
      </div>

      {/* THREE-PANEL HUB */}
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>

        {/* LEFT — MAP */}
        <div style={{
          width: 280, flexShrink: 0, borderRight: "1px solid #A5F3FC",
          background: "#FFFFFF", display: "flex", flexDirection: "column",
          overflow: "hidden",
        }}
          className={`side-panel ${activePanel === "map" ? "panel-active" : ""}`}
        >
          <div style={{
            padding: "12px 14px", borderBottom: "1px solid #E0F7FA",
            fontFamily: "'Lexend', sans-serif", fontWeight: 600,
            fontSize: 13, color: "#0E7490",
          }}>
            🗺️ Carte — {COUNTRIES.find(c => c.value === country)?.label}
          </div>
          <iframe
            key={country}
            src={MAP_URLS[country]}
            title={`Carte ${country}`}
            style={{ flex: 1, border: "none", width: "100%" }}
            loading="lazy"
          />
          <div style={{
            padding: "8px 12px", fontSize: 11, color: "#94A3B8",
            borderTop: "1px solid #E0F7FA", textAlign: "center",
          }}>
            © OpenStreetMap contributors
          </div>
        </div>

        {/* CENTER — CHAT */}
        <div style={{
          flex: 1, display: "flex", flexDirection: "column", overflow: "hidden",
        }}
          className={`center-panel ${activePanel === "chat" ? "panel-active" : ""}`}
        >
          {/* Messages */}
          <div style={{
            flex: 1, overflowY: "auto", padding: "16px",
            display: "flex", flexDirection: "column", gap: 12,
          }}>
            {messages.length === 0 && (
              <div style={{
                margin: "auto", maxWidth: 420, textAlign: "center", padding: "32px 16px",
              }}>
                <div style={{ fontSize: 40, marginBottom: 16 }}>👋</div>
                <p style={{
                  fontFamily: "'Lexend', sans-serif", fontWeight: 600,
                  fontSize: 16, color: "#164E63", marginBottom: 10,
                }}>
                  Décrivez votre situation librement
                </p>
                <p style={{ fontSize: 14, color: "#64748B", lineHeight: 1.6 }}>
                  Par exemple : <em>« J'ai trois enfants, le plus jeune a 2 ans, il est souvent
                  malade et je n'ai pas d'assurance. »</em>
                </p>
                <div style={{
                  marginTop: 20, display: "flex", flexDirection: "column", gap: 8,
                }}>
                  {[
                    "Mon enfant de 3 ans est malade et je n'ai pas d'assurance",
                    "Je suis enceinte et je n'ai pas les moyens de payer l'hôpital",
                    "Je suis artisan informel, je voudrais une protection sociale",
                  ].map((ex, i) => (
                    <button key={i} onClick={() => setInput(ex)} style={{
                      background: "#F0FDFF", border: "1px solid #A5F3FC",
                      borderRadius: 10, padding: "8px 12px", fontSize: 13,
                      color: "#0E7490", cursor: "pointer", textAlign: "left",
                      fontFamily: "'Source Sans 3', sans-serif",
                    }}>
                      {ex}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((m, i) => (
              <div key={i} style={{
                display: "flex",
                justifyContent: m.role === "user" ? "flex-end" : "flex-start",
              }}>
                {m.role === "assistant" && (
                  <div style={{
                    width: 28, height: 28, borderRadius: "50%",
                    background: "#0891B2", color: "#FFF",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 13, fontWeight: 700, flexShrink: 0,
                    marginRight: 8, marginTop: 2,
                  }}>N</div>
                )}
                <div style={{
                  maxWidth: "78%", whiteSpace: "pre-wrap", lineHeight: 1.6,
                  fontSize: 14, padding: "10px 14px", borderRadius: 14,
                  background: m.role === "user" ? "#0891B2" : "#FFFFFF",
                  color: m.role === "user" ? "#FFFFFF" : "#164E63",
                  boxShadow: m.role === "assistant" ? "0 1px 6px rgba(0,0,0,0.07)" : "none",
                  border: m.role === "assistant" ? "1px solid #E0F7FA" : "none",
                }}>
                  {m.content}
                </div>
              </div>
            ))}

            {loading && (
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{
                  width: 28, height: 28, borderRadius: "50%", background: "#0891B2",
                  color: "#FFF", display: "flex", alignItems: "center",
                  justifyContent: "center", fontSize: 13, fontWeight: 700,
                }}>N</div>
                <div style={{
                  background: "#FFFFFF", border: "1px solid #E0F7FA",
                  borderRadius: 14, padding: "10px 16px",
                  boxShadow: "0 1px 6px rgba(0,0,0,0.07)",
                }}>
                  <span style={{ color: "#94A3B8", fontSize: 13 }}>
                    NAWIRI réfléchit
                    <span style={{ animation: "blink 1.2s infinite" }}> …</span>
                  </span>
                </div>
              </div>
            )}

            {error && (
              <div style={{
                background: "#FEF2F2", border: "1px solid #FECACA",
                borderRadius: 10, padding: "10px 14px", color: "#DC2626", fontSize: 13,
              }}>
                ⚠️ {error}
              </div>
            )}

            <div ref={endRef} />
          </div>

          {/* Input bar */}
          <div style={{
            padding: "12px 16px", borderTop: "1px solid #E0F7FA",
            background: "#FFFFFF", flexShrink: 0,
          }}>
            <div style={{ display: "flex", gap: 8, alignItems: "flex-end" }}>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                rows={2}
                placeholder="Décrivez votre situation… (Entrée pour envoyer)"
                style={{
                  flex: 1, resize: "none", fontSize: 14,
                  padding: "10px 14px", borderRadius: 12,
                  border: "1.5px solid #A5F3FC", fontFamily: "'Source Sans 3', sans-serif",
                  color: "#164E63", outline: "none", lineHeight: 1.5,
                  background: "#F9FEFF",
                }}
                onFocus={(e) => e.target.style.borderColor = "#0891B2"}
                onBlur={(e) => e.target.style.borderColor = "#A5F3FC"}
              />
              <button
                onClick={send}
                disabled={loading || !input.trim()}
                style={{
                  background: loading || !input.trim() ? "#A5F3FC" : "#0891B2",
                  color: "#FFFFFF", border: "none", borderRadius: 12,
                  padding: "0 20px", fontSize: 20, cursor: loading ? "default" : "pointer",
                  height: 52, flexShrink: 0, transition: "background 0.15s",
                }}
              >
                →
              </button>
            </div>
            <p style={{ fontSize: 11, color: "#94A3B8", margin: "6px 0 0", textAlign: "center" }}>
              NAWIRI vous oriente — vérifiez toujours auprès de l'organisme officiel avant toute démarche.
            </p>
          </div>
        </div>

        {/* RIGHT — PROFILE */}
        <div style={{
          width: 260, flexShrink: 0, borderLeft: "1px solid #A5F3FC",
          background: "#FFFFFF", display: "flex", flexDirection: "column",
          overflow: "hidden",
        }}
          className={`side-panel ${activePanel === "profile" ? "panel-active" : ""}`}
        >
          <div style={{
            padding: "12px 14px", borderBottom: "1px solid #E0F7FA",
            fontFamily: "'Lexend', sans-serif", fontWeight: 600,
            fontSize: 13, color: "#0E7490",
          }}>
            👤 Mon profil
          </div>

          <div style={{ flex: 1, overflowY: "auto", padding: 14 }}>
            {!editingProfile ? (
              <>
                <p style={{ fontSize: 12, color: "#94A3B8", marginBottom: 14, lineHeight: 1.5 }}>
                  Votre profil est sauvegardé localement sur cet appareil.
                  Aucune donnée envoyée sur nos serveurs.
                </p>

                {[
                  { key: "name", label: "Prénom (optionnel)" },
                  { key: "age", label: "Votre âge" },
                  { key: "family", label: "Situation familiale" },
                  { key: "situation", label: "Situation professionnelle" },
                  { key: "need", label: "Besoin principal" },
                ].map(({ key, label }) => (
                  profile[key] ? (
                    <div key={key} style={{ marginBottom: 12 }}>
                      <div style={{ fontSize: 11, color: "#94A3B8", marginBottom: 2 }}>{label}</div>
                      <div style={{
                        fontSize: 13, color: "#164E63", background: "#F0FDFF",
                        borderRadius: 8, padding: "6px 10px", border: "1px solid #A5F3FC",
                      }}>{profile[key]}</div>
                    </div>
                  ) : null
                ))}

                {Object.keys(profile).length === 0 && (
                  <p style={{ fontSize: 13, color: "#64748B", lineHeight: 1.6, marginBottom: 16 }}>
                    Enregistrez votre situation pour gagner du temps lors de vos prochaines conversations.
                  </p>
                )}

                <button onClick={() => { setProfileDraft({ ...profile }); setEditingProfile(true); }} style={{
                  width: "100%", padding: "10px", borderRadius: 10,
                  background: "#0891B2", color: "#FFF", border: "none",
                  fontFamily: "'Lexend', sans-serif", fontWeight: 600,
                  fontSize: 13, cursor: "pointer", marginTop: 8,
                }}>
                  {Object.keys(profile).length === 0 ? "Créer mon profil" : "Modifier"}
                </button>

                {Object.keys(profile).length > 0 && (
                  <button onClick={() => { localStorage.removeItem("nawiri_profile"); setProfile({}); }} style={{
                    width: "100%", padding: "8px", borderRadius: 10, marginTop: 8,
                    background: "#FEF2F2", color: "#DC2626", border: "1px solid #FECACA",
                    fontSize: 12, fontWeight: 600, cursor: "pointer",
                  }}>
                    Effacer mon profil
                  </button>
                )}
              </>
            ) : (
              <>
                <p style={{ fontSize: 12, color: "#94A3B8", marginBottom: 14 }}>
                  Ces informations restent sur votre appareil uniquement.
                </p>
                {[
                  { key: "name", label: "Prénom (optionnel)", placeholder: "Ex : Amina" },
                  { key: "age", label: "Votre âge", placeholder: "Ex : 34 ans" },
                  { key: "family", label: "Situation familiale", placeholder: "Ex : 2 enfants dont 1 bébé" },
                  { key: "situation", label: "Situation professionnelle", placeholder: "Ex : vendeuse au marché" },
                  { key: "need", label: "Besoin principal", placeholder: "Ex : soins de santé pour mes enfants" },
                ].map(({ key, label, placeholder }) => (
                  <div key={key} style={{ marginBottom: 12 }}>
                    <label style={{ fontSize: 11, color: "#64748B", display: "block", marginBottom: 4 }}>
                      {label}
                    </label>
                    <input
                      value={profileDraft[key] || ""}
                      onChange={(e) => setProfileDraft({ ...profileDraft, [key]: e.target.value })}
                      placeholder={placeholder}
                      style={{
                        width: "100%", padding: "7px 10px", borderRadius: 8,
                        border: "1.5px solid #A5F3FC", fontSize: 13, color: "#164E63",
                        fontFamily: "'Source Sans 3', sans-serif", boxSizing: "border-box",
                        background: "#F9FEFF", outline: "none",
                      }}
                    />
                  </div>
                ))}
                <button onClick={() => saveProfile(profileDraft)} style={{
                  width: "100%", padding: "10px", borderRadius: 10,
                  background: "#059669", color: "#FFF", border: "none",
                  fontFamily: "'Lexend', sans-serif", fontWeight: 600,
                  fontSize: 13, cursor: "pointer", marginTop: 4,
                }}>
                  Sauvegarder
                </button>
                <button onClick={() => setEditingProfile(false)} style={{
                  width: "100%", padding: "8px", borderRadius: 10, marginTop: 6,
                  background: "#F8FAFC", color: "#64748B", border: "1px solid #E2E8F0",
                  fontSize: 12, cursor: "pointer",
                }}>
                  Annuler
                </button>
              </>
            )}
          </div>

          {/* Stats */}
          {messages.length > 0 && (
            <div style={{
              padding: "10px 14px", borderTop: "1px solid #E0F7FA",
              fontSize: 11, color: "#94A3B8",
            }}>
              {Math.floor(messages.length / 2)} échange{messages.length > 2 ? "s" : ""} · {country} · {language}
            </div>
          )}
        </div>
      </div>

      {/* CSS for responsiveness */}
      <style>{`
        @media (max-width: 768px) {
          .side-panel { display: none !important; }
          .center-panel { display: none !important; }
          .side-panel.panel-active { display: flex !important; flex-direction: column; flex: 1; }
          .center-panel.panel-active { display: flex !important; }
          .mobile-tabs { display: flex !important; }
        }
        @media (min-width: 769px) {
          .side-panel { display: flex !important; flex-direction: column; }
          .center-panel { display: flex !important; }
          .mobile-tabs { display: none !important; }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; } 50% { opacity: 0.3; }
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
        fontFamily: "'Lexend', sans-serif", color: "#0891B2", fontSize: 18,
      }}>
        Chargement de NAWIRI…
      </div>
    }>
      <ChatApp />
    </Suspense>
  );
}
