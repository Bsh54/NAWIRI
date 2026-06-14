"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const COUNTRIES = [
  { value: "Benin", label: "🇧🇯 Bénin" },
  { value: "Senegal", label: "🇸🇳 Sénégal" },
  { value: "Ghana", label: "🇬🇭 Ghana" },
];

const LANGUAGES = [
  { value: "French", label: "Français" },
  { value: "English", label: "English" },
];

export default function Landing() {
  const [country, setCountry] = useState("Benin");
  const [language, setLanguage] = useState("French");
  const router = useRouter();

  function start() {
    router.push(`/chat?country=${country}&language=${language}`);
  }

  return (
    <main style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* NAV */}
      <nav style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "16px 32px", borderBottom: "1px solid #A5F3FC",
        background: "#FFFFFF",
      }}>
        <span style={{
          fontFamily: "'Lexend', sans-serif", fontWeight: 700,
          fontSize: 22, color: "#0891B2", letterSpacing: "-0.5px",
        }}>
          NAWIRI
        </span>
        <span style={{ fontSize: 13, color: "#64748B" }}>
          Bénin · Sénégal · Ghana
        </span>
      </nav>

      {/* HERO */}
      <section style={{
        flex: 1, display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        padding: "60px 24px 40px", textAlign: "center",
        maxWidth: 680, margin: "0 auto", width: "100%",
      }}>
        {/* Badge */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          background: "#CFFAFE", color: "#0E7490", fontSize: 13, fontWeight: 600,
          padding: "6px 14px", borderRadius: 99, marginBottom: 28,
          border: "1px solid #A5F3FC",
        }}>
          <span style={{ fontSize: 16 }}>🌍</span>
          Assistant d'orientation sociale · West Africa
        </div>

        {/* Title */}
        <h1 style={{
          fontFamily: "'Lexend', sans-serif", fontWeight: 700,
          fontSize: "clamp(32px, 6vw, 52px)", lineHeight: 1.15,
          color: "#164E63", margin: "0 0 20px",
          letterSpacing: "-1px",
        }}>
          L'aide publique existe.
          <br />
          <span style={{ color: "#0891B2" }}>Trouvons la vôtre.</span>
        </h1>

        {/* Subtitle */}
        <p style={{
          fontSize: "clamp(16px, 2.5vw, 19px)", color: "#475569",
          lineHeight: 1.6, maxWidth: 540, margin: "0 0 44px",
        }}>
          Des familles ratent chaque jour l'aide à laquelle elles ont légalement droit —
          non pas parce qu'elle n'existe pas, mais parce que le système est difficile à naviguer.
          <br />
          <strong style={{ color: "#164E63" }}>NAWIRI est le pont.</strong>
        </p>

        {/* Selector card */}
        <div style={{
          background: "#FFFFFF", borderRadius: 20, padding: "32px 36px",
          boxShadow: "0 4px 24px rgba(8,145,178,0.10)",
          border: "1px solid #E0F7FA", width: "100%", maxWidth: 440,
          marginBottom: 16,
        }}>
          <p style={{
            fontFamily: "'Lexend', sans-serif", fontWeight: 600,
            fontSize: 15, color: "#164E63", margin: "0 0 20px", textAlign: "left",
          }}>
            Commençons par votre pays et votre langue
          </p>

          <div style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap" }}>
            {COUNTRIES.map((c) => (
              <button
                key={c.value}
                onClick={() => setCountry(c.value)}
                style={{
                  flex: 1, minWidth: 110, padding: "10px 8px",
                  borderRadius: 12, fontSize: 14, fontWeight: 600, cursor: "pointer",
                  border: country === c.value ? "2px solid #0891B2" : "2px solid #E2E8F0",
                  background: country === c.value ? "#ECFEFF" : "#F8FAFC",
                  color: country === c.value ? "#0E7490" : "#64748B",
                  transition: "all 0.15s",
                }}
              >
                {c.label}
              </button>
            ))}
          </div>

          <div style={{ display: "flex", gap: 12, marginBottom: 28 }}>
            {LANGUAGES.map((l) => (
              <button
                key={l.value}
                onClick={() => setLanguage(l.value)}
                style={{
                  flex: 1, padding: "10px 8px",
                  borderRadius: 12, fontSize: 14, fontWeight: 600, cursor: "pointer",
                  border: language === l.value ? "2px solid #059669" : "2px solid #E2E8F0",
                  background: language === l.value ? "#ECFDF5" : "#F8FAFC",
                  color: language === l.value ? "#047857" : "#64748B",
                  transition: "all 0.15s",
                }}
              >
                {l.label}
              </button>
            ))}
          </div>

          <button
            onClick={start}
            style={{
              width: "100%", padding: "16px", borderRadius: 14,
              background: "#0891B2", color: "#FFFFFF", border: "none",
              fontFamily: "'Lexend', sans-serif", fontWeight: 600,
              fontSize: 16, cursor: "pointer", letterSpacing: "0.2px",
              boxShadow: "0 4px 14px rgba(8,145,178,0.3)",
              transition: "background 0.15s, transform 0.1s",
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = "#0E7490"}
            onMouseLeave={(e) => e.currentTarget.style.background = "#0891B2"}
          >
            Décrire ma situation →
          </button>
        </div>

        <p style={{ fontSize: 12, color: "#94A3B8", maxWidth: 380 }}>
          Aucune donnée personnelle stockée sur nos serveurs.
          NAWIRI vous oriente — la décision finale appartient à l'organisme officiel.
        </p>
      </section>

      {/* HOW IT WORKS */}
      <section style={{
        background: "#FFFFFF", padding: "48px 24px",
        borderTop: "1px solid #E0F7FA",
      }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <h2 style={{
            fontFamily: "'Lexend', sans-serif", fontWeight: 700,
            fontSize: 22, color: "#164E63", textAlign: "center", marginBottom: 36,
          }}>
            Comment ça marche
          </h2>
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: 24,
          }}>
            {[
              { icon: "🗺️", title: "Choisissez votre pays", desc: "Bénin, Sénégal ou Ghana" },
              { icon: "💬", title: "Décrivez votre situation", desc: "En texte libre, dans votre langue" },
              { icon: "🤖", title: "L'IA pose des questions", desc: "Une à la fois, pour cibler précisément" },
              { icon: "✅", title: "Vous recevez un plan", desc: "Programme · Documents · Étapes · Contact" },
            ].map((step, i) => (
              <div key={i} style={{
                textAlign: "center", padding: "24px 16px",
                background: "#F0FDFF", borderRadius: 16,
                border: "1px solid #A5F3FC",
              }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>{step.icon}</div>
                <div style={{
                  fontFamily: "'Lexend', sans-serif", fontWeight: 600,
                  fontSize: 14, color: "#0E7490", marginBottom: 6,
                }}>{step.title}</div>
                <div style={{ fontSize: 13, color: "#64748B", lineHeight: 1.4 }}>{step.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{
        borderTop: "1px solid #E0F7FA", padding: "20px 32px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        flexWrap: "wrap", gap: 8, background: "#FFFFFF",
        fontSize: 12, color: "#94A3B8",
      }}>
        <span style={{ fontFamily: "'Lexend', sans-serif", fontWeight: 600, color: "#0891B2" }}>
          NAWIRI
        </span>
        <span>USAII Global AI Hackathon 2026 · Team EVOLUTICS · Université d'Abomey-Calavi</span>
        <span>🔒 Aucune donnée personnelle stockée</span>
      </footer>
    </main>
  );
}
