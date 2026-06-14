"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const COUNTRIES = [
  { value: "Benin",   label: "Benin" },
  { value: "Senegal", label: "Senegal" },
  { value: "Ghana",   label: "Ghana" },
];

const UI_LANG = {
  en: {
    nav_countries: "Benin · Senegal · Ghana",
    hero_label: "AI-powered social assistance · West Africa",
    hero_h1_a: "Public aid exists.",
    hero_h1_b: "Let's find yours.",
    hero_sub:
      "Families miss assistance they are legally entitled to every day — not because it doesn't exist, but because the system is too hard to navigate. NAWIRI is the bridge.",
    card_heading: "Where are you and what language do you prefer?",
    card_country: "Country",
    card_lang: "Language",
    cta: "Describe my situation",
    cta_sub: "No personal data stored on our servers.",
    how_title: "How it works",
    steps: [
      { n: "01", title: "Choose your country", desc: "Benin, Senegal, or Ghana." },
      { n: "02", title: "Describe your situation", desc: "In plain language — no forms, no jargon." },
      { n: "03", title: "The AI asks one question", desc: "At a time, to pinpoint what fits you." },
      { n: "04", title: "You get a clear action plan", desc: "Program · Documents · Steps · Official contact." },
    ],
    why_title: "Why AI — not a search engine",
    why_items: [
      { title: "Understands your situation", desc: "A form can't grasp a free-text description mixing health, finance and family signals. NAWIRI can." },
      { title: "Crosses eligibility criteria", desc: "Dozens of variables per program — a static tool can't handle the combinatorics. NAWIRI does." },
      { title: "Guides, never decides", desc: "NAWIRI orients. It never certifies eligibility. Only an official agent can validate a file." },
    ],
    countries_title: "Programs covered",
    countries: [
      { name: "Benin", count: "11 programs", items: ["Mandatory health insurance (AMO/ARCH)", "Free malaria care <5 & pregnant women", "Free cesarean section", "Alafia microcredit (FNM)", "GBESSOKÉ cash transfers", "Free ARVs / HIV care", "CNSS old-age pension"] },
      { name: "Senegal", count: "7 programs", items: ["Community health mutuals (CMU)", "Free care for children under 5", "Plan Sésame (60+)", "Family Security Grant (PNBSF)", "Free cesarean section", "Free dialysis", "Equal Opportunity Card (disability)"] },
      { name: "Ghana", count: "4 programs", items: ["National Health Insurance (NHIS)", "Free maternal health care", "Free dialysis (since Dec 2024)", "LEAP cash transfer"] },
    ],
    footer_tagline: "USAII Global AI Hackathon 2026 · Team EVOLUTICS · Université d'Abomey-Calavi",
    footer_privacy: "No personal data stored on our servers.",
  },
  fr: {
    nav_countries: "Bénin · Sénégal · Ghana",
    hero_label: "Assistance sociale pilotée par l'IA · Afrique de l'Ouest",
    hero_h1_a: "L'aide publique existe.",
    hero_h1_b: "Trouvons la vôtre.",
    hero_sub:
      "Des familles ratent chaque jour l'aide à laquelle elles ont légalement droit — non pas parce qu'elle n'existe pas, mais parce que le système est trop difficile à naviguer. NAWIRI est le pont.",
    card_heading: "Où êtes-vous et quelle langue préférez-vous ?",
    card_country: "Pays",
    card_lang: "Langue",
    cta: "Décrire ma situation",
    cta_sub: "Aucune donnée personnelle stockée sur nos serveurs.",
    how_title: "Comment ça marche",
    steps: [
      { n: "01", title: "Choisissez votre pays", desc: "Bénin, Sénégal ou Ghana." },
      { n: "02", title: "Décrivez votre situation", desc: "En langage libre — pas de formulaire, pas de jargon." },
      { n: "03", title: "L'IA pose une question", desc: "À la fois, pour cibler ce qui vous correspond." },
      { n: "04", title: "Vous recevez un plan d'action", desc: "Programme · Documents · Étapes · Contact officiel." },
    ],
    why_title: "Pourquoi l'IA — pas un moteur de recherche",
    why_items: [
      { title: "Comprend votre situation", desc: "Un formulaire ne peut pas saisir une description libre mêlant santé, finances et famille. NAWIRI, oui." },
      { title: "Croise les critères d'éligibilité", desc: "Des dizaines de variables par programme — un outil statique ne peut pas gérer la combinatoire. NAWIRI le fait." },
      { title: "Oriente, ne décide jamais", desc: "NAWIRI oriente. Il ne certifie jamais l'éligibilité. Seul un agent officiel peut valider un dossier." },
    ],
    countries_title: "Programmes couverts",
    countries: [
      { name: "Bénin", count: "11 programmes", items: ["Assurance maladie obligatoire (AMO/ARCH)", "Gratuité paludisme <5 ans & femmes enceintes", "Gratuité césarienne", "Microcrédit Alafia (FNM)", "Transferts cash GBESSOKÉ", "ARV / VIH gratuits", "Pension vieillesse CNSS"] },
      { name: "Sénégal", count: "7 programmes", items: ["Mutuelles de santé CMU", "Gratuité soins enfants <5 ans", "Plan Sésame (60+)", "Bourse de Sécurité Familiale (PNBSF)", "Gratuité césarienne", "Gratuité dialyse", "Carte d'Égalité des Chances (handicap)"] },
      { name: "Ghana", count: "4 programmes", items: ["Assurance nationale NHIS", "Soins maternels gratuits", "Dialyse gratuite (depuis déc. 2024)", "Transfert cash LEAP"] },
    ],
    footer_tagline: "USAII Global AI Hackathon 2026 · Équipe EVOLUTICS · Université d'Abomey-Calavi",
    footer_privacy: "Aucune donnée personnelle stockée sur nos serveurs.",
  },
};

export default function Landing() {
  const [country, setCountry]   = useState("Benin");
  const [appLang, setAppLang]   = useState("English"); // conversation language
  const [uiLang, setUiLang]     = useState("en");       // UI display language
  const router = useRouter();
  const t = UI_LANG[uiLang];

  function start() {
    router.push(`/chat?country=${country}&language=${appLang}`);
  }

  function toggleUiLang() {
    setUiLang(l => l === "en" ? "fr" : "en");
    setAppLang(l => l === "English" ? "French" : "English");
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>

      {/* ── NAV ── */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 50,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 40px", height: 60,
        background: "rgba(245,242,235,0.92)", backdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--border-soft)",
      }}>
        <span style={{
          fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
          fontSize: 20, letterSpacing: "-0.5px", color: "var(--text)",
        }}>
          NAWIRI
        </span>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 13, color: "var(--text-3)", letterSpacing: "0.2px", marginRight: 8 }}>
            {t.nav_countries}
          </span>
          <button
            onClick={toggleUiLang}
            style={{
              padding: "5px 14px", borderRadius: "var(--radius)",
              border: "1px solid var(--border)", background: "var(--bg-card)",
              fontSize: 13, fontWeight: 600, color: "var(--text-2)",
              transition: "border-color 0.15s",
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = "var(--primary)"}
            onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border)"}
          >
            {uiLang === "en" ? "FR" : "EN"}
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{
        flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
        padding: "80px 24px 60px",
      }}>
        <div style={{ maxWidth: 1100, width: "100%", display: "flex", gap: 64, alignItems: "center", flexWrap: "wrap" }}>

          {/* Left copy */}
          <div style={{ flex: "1 1 420px" }} className="anim-fade-up">
            <div style={{
              display: "inline-block", fontSize: 12, fontWeight: 600,
              letterSpacing: "0.08em", textTransform: "uppercase",
              color: "var(--primary)", marginBottom: 24,
              padding: "4px 12px", borderRadius: 99,
              background: "var(--primary-soft)",
              border: "1px solid #F6AB99",
            }}>
              {t.hero_label}
            </div>

            <h1 style={{
              fontSize: "clamp(38px, 5.5vw, 62px)",
              color: "var(--text)", marginBottom: 12,
            }}>
              {t.hero_h1_a}
              <br />
              <span style={{ color: "var(--primary)" }}>{t.hero_h1_b}</span>
            </h1>

            <p style={{
              fontSize: 17, color: "var(--text-2)", lineHeight: 1.7,
              maxWidth: 500, marginBottom: 0,
            }}>
              {t.hero_sub}
            </p>
          </div>

          {/* Right card */}
          <div className="anim-fade-up anim-delay-2" style={{
            flex: "0 1 380px", width: "100%",
            background: "var(--bg-card)", borderRadius: "var(--radius-xl)",
            border: "1px solid var(--border-soft)",
            padding: "32px 32px 28px",
            boxShadow: "0 4px 32px rgba(0,0,0,0.07)",
          }}>
            <p style={{
              fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600,
              fontSize: 15, color: "var(--text)", marginBottom: 24,
            }}>
              {t.card_heading}
            </p>

            {/* Country */}
            <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "var(--text-3)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 8 }}>
              {t.card_country}
            </label>
            <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
              {COUNTRIES.map(c => (
                <button key={c.value} onClick={() => setCountry(c.value)} style={{
                  flex: 1, padding: "9px 4px", borderRadius: "var(--radius)",
                  border: country === c.value ? "1.5px solid var(--primary)" : "1.5px solid var(--border)",
                  background: country === c.value ? "var(--primary-soft)" : "var(--bg)",
                  color: country === c.value ? "var(--primary-dark)" : "var(--text-2)",
                  fontSize: 13, fontWeight: 600, transition: "all 0.12s",
                }}>
                  {c.label}
                </button>
              ))}
            </div>

            {/* Language */}
            <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "var(--text-3)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 8 }}>
              {t.card_lang}
            </label>
            <div style={{ display: "flex", gap: 8, marginBottom: 28 }}>
              {[["English","English"],["French","Français"]].map(([val, lbl]) => (
                <button key={val} onClick={() => setAppLang(val)} style={{
                  flex: 1, padding: "9px 4px", borderRadius: "var(--radius)",
                  border: appLang === val ? "1.5px solid var(--green)" : "1.5px solid var(--border)",
                  background: appLang === val ? "var(--green-soft)" : "var(--bg)",
                  color: appLang === val ? "var(--green)" : "var(--text-2)",
                  fontSize: 13, fontWeight: 600, transition: "all 0.12s",
                }}>
                  {lbl}
                </button>
              ))}
            </div>

            <button onClick={start} style={{
              width: "100%", padding: "14px", borderRadius: "var(--radius-lg)",
              background: "var(--primary)", color: "#FFF", border: "none",
              fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600,
              fontSize: 15, letterSpacing: "-0.2px",
              boxShadow: "0 2px 12px rgba(192,90,60,0.25)",
              transition: "background 0.15s, transform 0.1s",
            }}
              onMouseEnter={e => e.currentTarget.style.background = "var(--primary-dark)"}
              onMouseLeave={e => e.currentTarget.style.background = "var(--primary)"}
              onMouseDown={e => e.currentTarget.style.transform = "scale(0.98)"}
              onMouseUp={e => e.currentTarget.style.transform = "scale(1)"}
            >
              {t.cta} →
            </button>

            <p style={{ textAlign: "center", fontSize: 12, color: "var(--text-3)", marginTop: 12 }}>
              {t.cta_sub}
            </p>
          </div>
        </div>
      </section>

      {/* ── DIVIDER ── */}
      <div style={{ borderTop: "1px solid var(--border-soft)" }} />

      {/* ── HOW IT WORKS ── */}
      <section style={{ background: "var(--bg-card)", padding: "72px 24px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <h2 style={{ fontSize: 30, color: "var(--text)", marginBottom: 48, textAlign: "center" }}>
            {t.how_title}
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 24 }}>
            {t.steps.map((step) => (
              <div key={step.n} style={{
                padding: "28px 24px",
                border: "1px solid var(--border-soft)",
                borderRadius: "var(--radius-lg)",
                background: "var(--bg)",
              }}>
                <div style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 700, fontSize: 12, color: "var(--primary)",
                  letterSpacing: "0.08em", marginBottom: 14,
                }}>
                  {step.n}
                </div>
                <div style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 600, fontSize: 16, color: "var(--text)", marginBottom: 8,
                }}>
                  {step.title}
                </div>
                <div style={{ fontSize: 14, color: "var(--text-2)", lineHeight: 1.6 }}>
                  {step.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY AI ── */}
      <section style={{ padding: "72px 24px", background: "var(--bg)" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <h2 style={{ fontSize: 30, color: "var(--text)", marginBottom: 48, textAlign: "center" }}>
            {t.why_title}
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
            {t.why_items.map((item, i) => (
              <div key={i} style={{
                padding: "28px",
                border: "1px solid var(--border-soft)",
                borderRadius: "var(--radius-lg)",
                background: "var(--bg-card)",
              }}>
                <div style={{
                  width: 32, height: 3, background: "var(--primary)",
                  borderRadius: 99, marginBottom: 18,
                }} />
                <div style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 600, fontSize: 16, color: "var(--text)", marginBottom: 10,
                }}>
                  {item.title}
                </div>
                <div style={{ fontSize: 14, color: "var(--text-2)", lineHeight: 1.65 }}>
                  {item.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROGRAMS COVERED ── */}
      <section style={{ background: "var(--bg-card)", padding: "72px 24px", borderTop: "1px solid var(--border-soft)" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <h2 style={{ fontSize: 30, color: "var(--text)", marginBottom: 48, textAlign: "center" }}>
            {t.countries_title}
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
            {t.countries.map((c) => (
              <div key={c.name} style={{
                padding: "28px",
                border: "1px solid var(--border-soft)",
                borderRadius: "var(--radius-lg)",
                background: "var(--bg)",
              }}>
                <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 20 }}>
                  <span style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 700, fontSize: 18, color: "var(--text)",
                  }}>{c.name}</span>
                  <span style={{
                    fontSize: 12, fontWeight: 600, color: "var(--primary)",
                    background: "var(--primary-soft)", padding: "3px 10px",
                    borderRadius: 99,
                  }}>{c.count}</span>
                </div>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
                  {c.items.map((item, i) => (
                    <li key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                      <span style={{
                        width: 5, height: 5, borderRadius: "50%",
                        background: "var(--primary)", flexShrink: 0, marginTop: 7,
                      }} />
                      <span style={{ fontSize: 13, color: "var(--text-2)", lineHeight: 1.5 }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{
        borderTop: "1px solid var(--border-soft)",
        padding: "24px 40px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        flexWrap: "wrap", gap: 12, background: "var(--bg)",
      }}>
        <span style={{
          fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
          fontSize: 16, color: "var(--text)",
        }}>
          NAWIRI
        </span>
        <span style={{ fontSize: 12, color: "var(--text-3)", textAlign: "center" }}>
          {t.footer_tagline}
        </span>
        <span style={{ fontSize: 12, color: "var(--text-3)" }}>
          {t.footer_privacy}
        </span>
      </footer>
    </div>
  );
}
