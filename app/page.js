"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const UI_LANG = {
  en: {
    nav_countries: "Benin · Senegal · Ghana",
    hero_label: "AI-powered social orientation · West Africa",
    hero_h1_a: "Public aid exists.",
    hero_h1_b: "Let's find yours.",
    hero_sub:
      "Families miss assistance they are legally entitled to every day. Not because it does not exist, but because the system is too hard to navigate. NAWIRI is the bridge.",
    cta: "Start now",
    cta_sub: "No account. No forms. No personal data stored.",
    how_title: "How it works",
    steps: [
      { n: "01", title: "Write in plain words", desc: "English or French. Describe your situation freely, no jargon needed." },
      { n: "02", title: "NAWIRI asks one question", desc: "At a time, to pinpoint exactly which programs apply to you." },
      { n: "03", title: "You get a clear action plan", desc: "Program, documents to prepare, next step, official contact." },
      { n: "04", title: "You verify and act", desc: "NAWIRI guides. The official body validates. You decide." },
    ],
    why_title: "Why AI and not a search engine",
    why_items: [
      { title: "It understands your situation", desc: "A form cannot grasp a free-text description mixing health, finances and family signals. NAWIRI can." },
      { title: "It crosses eligibility criteria", desc: "Dozens of variables per program. A static tool cannot handle the combinatorics. NAWIRI does." },
      { title: "It guides, never decides", desc: "NAWIRI orients. It never certifies eligibility. Only an official agent can validate a file." },
    ],
    countries_title: "Programs covered",
    countries: [
      { name: "Benin", count: "11 programs", items: ["Mandatory health insurance (AMO/ARCH)", "Free malaria care for children under 5 and pregnant women", "Free cesarean section", "Alafia microcredit (FNM)", "GBESSOKÉ cash transfers", "Free ARVs and HIV care", "CNSS old-age pension"] },
      { name: "Senegal", count: "7 programs", items: ["Community health mutuals (CMU)", "Free care for children under 5", "Plan Sesame (60+)", "Family Security Grant (PNBSF)", "Free cesarean section", "Free dialysis", "Equal Opportunity Card for persons with disabilities"] },
      { name: "Ghana", count: "4 programs", items: ["National Health Insurance Scheme (NHIS)", "Free maternal health care", "Free dialysis (since December 2024)", "LEAP cash transfer"] },
    ],
    footer_tagline: "USAII Global AI Hackathon 2026 · Team EVOLUTICS · Universite d'Abomey-Calavi",
    footer_privacy: "No personal data stored on our servers.",
  },
  fr: {
    nav_countries: "Benin · Senegal · Ghana",
    hero_label: "Orientation sociale par l'IA · Afrique de l'Ouest",
    hero_h1_a: "L'aide publique existe.",
    hero_h1_b: "Trouvons la votre.",
    hero_sub:
      "Des familles ratent chaque jour l'aide a laquelle elles ont legalement droit. Non pas parce qu'elle n'existe pas, mais parce que le systeme est trop difficile a naviguer. NAWIRI est le pont.",
    cta: "Commencer maintenant",
    cta_sub: "Pas de compte. Pas de formulaire. Aucune donnee personnelle stockee.",
    how_title: "Comment ca marche",
    steps: [
      { n: "01", title: "Ecrivez en langage libre", desc: "Anglais ou francais. Decrivez votre situation, sans jargon." },
      { n: "02", title: "NAWIRI pose une question", desc: "A la fois, pour cibler exactement les programmes qui vous correspondent." },
      { n: "03", title: "Vous recevez un plan d'action", desc: "Programme, documents a preparer, prochaine etape, contact officiel." },
      { n: "04", title: "Vous verifiez et agissez", desc: "NAWIRI oriente. L'organisme officiel valide. Vous decidez." },
    ],
    why_title: "Pourquoi l'IA et pas un moteur de recherche",
    why_items: [
      { title: "Elle comprend votre situation", desc: "Un formulaire ne peut pas saisir une description libre melant sante, finances et signaux familiaux. NAWIRI le peut." },
      { title: "Elle croise les criteres d'eligibilite", desc: "Des dizaines de variables par programme. Un outil statique ne peut pas gerer la combinatoire. NAWIRI le fait." },
      { title: "Elle oriente, ne decide jamais", desc: "NAWIRI oriente. Elle ne certifie jamais l'eligibilite. Seul un agent officiel peut valider un dossier." },
    ],
    countries_title: "Programmes couverts",
    countries: [
      { name: "Benin", count: "11 programmes", items: ["Assurance maladie obligatoire (AMO/ARCH)", "Gratuite paludisme moins de 5 ans et femmes enceintes", "Gratuite cesarienne", "Microcredit Alafia (FNM)", "Transferts cash GBESSOKÉ", "ARV et soins VIH gratuits", "Pension vieillesse CNSS"] },
      { name: "Senegal", count: "7 programmes", items: ["Mutuelles de sante CMU", "Gratuite soins enfants moins de 5 ans", "Plan Sesame (60+)", "Bourse de Securite Familiale (PNBSF)", "Gratuite cesarienne", "Gratuite dialyse", "Carte d'Egalite des Chances (handicap)"] },
      { name: "Ghana", count: "4 programmes", items: ["Assurance nationale NHIS", "Soins maternels gratuits", "Dialyse gratuite (depuis decembre 2024)", "Transfert cash LEAP"] },
    ],
    footer_tagline: "USAII Global AI Hackathon 2026 · Equipe EVOLUTICS · Universite d'Abomey-Calavi",
    footer_privacy: "Aucune donnee personnelle stockee sur nos serveurs.",
  },
};

export default function Landing() {
  const [uiLang, setUiLang] = useState("en");
  const router = useRouter();
  const t = UI_LANG[uiLang];

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>

      {/* NAV */}
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

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ fontSize: 13, color: "var(--text-3)" }}>
            {t.nav_countries}
          </span>
          <button
            onClick={() => setUiLang(l => l === "en" ? "fr" : "en")}
            style={{
              padding: "5px 14px", borderRadius: "var(--radius)",
              border: "1px solid var(--border)", background: "var(--bg-card)",
              fontSize: 13, fontWeight: 600, color: "var(--text-2)",
              cursor: "pointer", transition: "border-color 0.15s",
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = "var(--primary)"}
            onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border)"}
          >
            {uiLang === "en" ? "FR" : "EN"}
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section style={{
        flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
        padding: "80px 24px 60px",
      }}>
        <div style={{ maxWidth: 1100, width: "100%", display: "flex", gap: 72, alignItems: "center", flexWrap: "wrap" }}>

          {/* Left copy */}
          <div style={{ flex: "1 1 420px" }} className="anim-fade-up">
            <div style={{
              display: "inline-block", fontSize: 12, fontWeight: 600,
              letterSpacing: "0.08em", textTransform: "uppercase",
              color: "var(--primary)", marginBottom: 24,
              padding: "4px 12px", borderRadius: 99,
              background: "var(--primary-soft)", border: "1px solid #F6AB99",
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
            flex: "0 1 360px", width: "100%",
            background: "var(--bg-card)", borderRadius: "var(--radius-xl)",
            border: "1px solid var(--border-soft)",
            padding: "36px",
            boxShadow: "0 4px 32px rgba(0,0,0,0.07)",
          }}>
            <p style={{
              fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600,
              fontSize: 16, color: "var(--text)", marginBottom: 12, lineHeight: 1.4,
            }}>
              {t.hero_sub.split(".")[0]}.
            </p>
            <p style={{ fontSize: 14, color: "var(--text-3)", marginBottom: 28, lineHeight: 1.5 }}>
              {t.cta_sub}
            </p>

            <button
              onClick={() => router.push("/chat")}
              style={{
                width: "100%", padding: "15px",
                borderRadius: "var(--radius-lg)",
                background: "var(--primary)", color: "#FFF", border: "none",
                fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600,
                fontSize: 15, letterSpacing: "-0.2px", cursor: "pointer",
                boxShadow: "0 2px 12px rgba(192,90,60,0.25)",
                transition: "background 0.15s",
              }}
              onMouseEnter={e => e.currentTarget.style.background = "var(--primary-dark)"}
              onMouseLeave={e => e.currentTarget.style.background = "var(--primary)"}
            >
              {t.cta} →
            </button>
          </div>
        </div>
      </section>

      <div style={{ borderTop: "1px solid var(--border-soft)" }} />

      {/* HOW IT WORKS */}
      <section style={{ background: "var(--bg-card)", padding: "72px 24px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <h2 style={{ fontSize: 30, color: "var(--text)", marginBottom: 48, textAlign: "center" }}>
            {t.how_title}
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20 }}>
            {t.steps.map(step => (
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

      {/* WHY AI */}
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

      {/* PROGRAMS */}
      <section style={{ background: "var(--bg-card)", padding: "72px 24px", borderTop: "1px solid var(--border-soft)" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <h2 style={{ fontSize: 30, color: "var(--text)", marginBottom: 48, textAlign: "center" }}>
            {t.countries_title}
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
            {t.countries.map(c => (
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

      {/* FOOTER */}
      <footer style={{
        borderTop: "1px solid var(--border-soft)",
        padding: "24px 40px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        flexWrap: "wrap", gap: 12, background: "var(--bg)",
        fontSize: 12, color: "var(--text-3)",
      }}>
        <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 16, color: "var(--text)" }}>
          NAWIRI
        </span>
        <span style={{ textAlign: "center" }}>{t.footer_tagline}</span>
        <span>{t.footer_privacy}</span>
      </footer>
    </div>
  );
}
