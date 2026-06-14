"use client";

import { useState, useRef, useEffect } from "react";

const COUNTRIES = [
  { value: "Benin", label: "🇧🇯 Bénin" },
  { value: "Senegal", label: "🇸🇳 Sénégal" },
  { value: "Ghana", label: "🇬🇭 Ghana" },
];

const LANGUAGES = [
  { value: "French", label: "Français" },
  { value: "English", label: "English" },
];

export default function Home() {
  const [country, setCountry] = useState("Benin");
  const [language, setLanguage] = useState("French");
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

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
      if (!res.ok) {
        setError(data.error || "Erreur.");
      } else {
        setMessages([...nextMessages, { role: "assistant", content: data.reply }]);
      }
    } catch {
      setError("Problème de connexion. Réessayez.");
    } finally {
      setLoading(false);
    }
  }

  function onKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  return (
    <main
      style={{
        maxWidth: 720,
        margin: "0 auto",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        padding: "16px",
        boxSizing: "border-box",
      }}
    >
      <header style={{ paddingBottom: 12 }}>
        <h1 style={{ margin: "8px 0 2px", fontSize: 28, color: "#0891B2" }}>
          NAWIRI 🌍
        </h1>
        <p style={{ margin: 0, fontSize: 15 }}>
          Trouvez l'aide publique à laquelle vous avez droit, en quelques minutes.
        </p>

        <div style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            style={selectStyle}
          >
            {COUNTRIES.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            style={selectStyle}
          >
            {LANGUAGES.map((l) => (
              <option key={l.value} value={l.value}>
                {l.label}
              </option>
            ))}
          </select>
        </div>
      </header>

      <section
        style={{
          flex: 1,
          overflowY: "auto",
          background: "#FFFFFF",
          borderRadius: 16,
          padding: 16,
          border: "1px solid #A5F3FC",
        }}
      >
        {messages.length === 0 && (
          <p style={{ color: "#64748B" }}>
            Décrivez votre situation librement. Par exemple : « J'ai trois enfants,
            le plus jeune a 2 ans, il est souvent malade et je n'ai pas
            d'assurance. »
          </p>
        )}

        {messages.map((m, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: m.role === "user" ? "flex-end" : "flex-start",
              marginBottom: 10,
            }}
          >
            <div
              style={{
                maxWidth: "85%",
                whiteSpace: "pre-wrap",
                lineHeight: 1.5,
                fontSize: 15,
                padding: "10px 14px",
                borderRadius: 14,
                background: m.role === "user" ? "#0891B2" : "#ECFEFF",
                color: m.role === "user" ? "#FFFFFF" : "#164E63",
              }}
            >
              {m.content}
            </div>
          </div>
        ))}

        {loading && (
          <div style={{ color: "#64748B", fontSize: 14 }}>NAWIRI réfléchit…</div>
        )}
        {error && (
          <div style={{ color: "#DC2626", fontSize: 14 }}>{error}</div>
        )}
        <div ref={endRef} />
      </section>

      <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          rows={2}
          placeholder="Décrivez votre situation…"
          style={{
            flex: 1,
            resize: "none",
            fontSize: 15,
            padding: "10px 12px",
            borderRadius: 12,
            border: "1px solid #A5F3FC",
            fontFamily: "inherit",
          }}
        />
        <button
          onClick={send}
          disabled={loading}
          style={{
            background: "#059669",
            color: "#FFFFFF",
            border: "none",
            borderRadius: 12,
            padding: "0 20px",
            fontSize: 16,
            cursor: loading ? "default" : "pointer",
            opacity: loading ? 0.6 : 1,
          }}
        >
          Envoyer
        </button>
      </div>

      <p style={{ fontSize: 12, color: "#64748B", marginTop: 8 }}>
        NAWIRI vous oriente. Vérifiez toujours auprès de l'organisme officiel
        avant toute démarche.
      </p>
    </main>
  );
}

const selectStyle = {
  fontSize: 15,
  padding: "8px 10px",
  borderRadius: 10,
  border: "1px solid #A5F3FC",
  background: "#FFFFFF",
  color: "#164E63",
};
