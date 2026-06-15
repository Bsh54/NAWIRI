"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// ─── Copy (EN / FR) ────────────────────────────────────────────────────────────

const T = {
  en: {
    nav_countries: "Benin · Senegal · Ghana",
    badge:         "AI-powered social orientation · West Africa",
    h1a:           "Public aid exists.",
    h1b:           "Let's find yours.",
    sub:           "Families miss assistance they are legally entitled to — every single day. Not because it doesn't exist, but because the system is too hard to navigate. NAWIRI is the bridge.",
    quote:         "\"People often miss help not because it does not exist, but because the system is too hard to navigate.\"",
    cta:           "Start now, it's free",
    cta_sub:       "No account · No forms · No personal data stored",
    demo_user:     "My child is 3 years old and often sick. We have no health insurance. I live in Benin.",
    demo_q:        "Are you registered in the ANIP biometric system (national ID card)?",
    demo_label:    "NAWIRI asks one question at a time",
    stats: [
      { value: "22",  label: "programs documented" },
      { value: "3",   label: "countries covered" },
      { value: "5",   label: "languages supported" },
    ],
    how_title: "How it works",
    steps: [
      { n: "01", title: "Write in plain words",         desc: "English, French, or your local language. Describe your situation freely — no forms, no jargon." },
      { n: "02", title: "NAWIRI asks one question",      desc: "At a time, to pinpoint exactly which programs match your situation." },
      { n: "03", title: "You get a clear action plan",   desc: "Program name, documents to prepare, exact next step, official contact." },
      { n: "04", title: "You verify and act",            desc: "NAWIRI guides. The official body validates. You decide — always." },
    ],
    why_title: "Why AI and not a search engine",
    why_items: [
      { icon: "🧠", title: "It understands your situation",       desc: "A form cannot grasp a free-text description mixing health, finances and family signals at once. NAWIRI can." },
      { icon: "⚖️", title: "It crosses eligibility criteria",    desc: "Dozens of variables per program. A static tool cannot handle the combinatorics. NAWIRI does." },
      { icon: "🛡️", title: "It guides — it never decides",      desc: "NAWIRI orients. It never certifies eligibility. Only an official agent can validate a file." },
    ],
    countries_title: "Programs covered",
    countries: [
      { flag: "🇧🇯", name: "Benin",   count: "11 programs", items: ["Mandatory health insurance (AMO/ARCH)", "Free malaria care for children under 5 and pregnant women", "Free cesarean section", "Alafia microcredit (FNM)", "GBESSOKÉ cash transfers", "Free ARVs and HIV care", "CNSS old-age pension"] },
      { flag: "🇸🇳", name: "Senegal", count: "7 programs",  items: ["Community health mutuals (CMU)", "Free care for children under 5", "Plan Sésame (60+)", "Family Security Grant (PNBSF)", "Free cesarean section", "Free dialysis", "Equal Opportunity Card (disability)"] },
      { flag: "🇬🇭", name: "Ghana",   count: "4 programs",  items: ["National Health Insurance (NHIS)", "Free maternal health care", "Free dialysis (since December 2024)", "LEAP cash transfer"] },
    ],
    ai_title:    "Responsible AI by design",
    ai_items: [
      { icon: "🔒", title: "Never certifies eligibility",    desc: "NAWIRI always says \"you could be eligible\" — only an official agent can confirm. No false promises." },
      { icon: "🚨", title: "Emergencies first",              desc: "Any sign of a medical emergency triggers an immediate call to go to the nearest health facility, before anything else." },
      { icon: "🙈", title: "Zero data stored",               desc: "Nothing is saved on our servers. Your conversation stays in your device only." },
      { icon: "🧭", title: "Always points to a human",       desc: "If uncertain, NAWIRI directs you to the official body or a social worker — it never leaves you without a next step." },
    ],
    cta2_title: "Ready to find what you're entitled to?",
    cta2_sub:   "Start a conversation. It takes less than 2 minutes.",
    cta2_btn:   "Start now →",
    footer_tagline: "USAII Global AI Hackathon 2026 · Team EVOLUTICS · Université d'Abomey-Calavi, Benin",
    footer_privacy: "No personal data stored on our servers.",
  },
  fr: {
    nav_countries: "Bénin · Sénégal · Ghana",
    badge:         "Orientation sociale par l'IA · Afrique de l'Ouest",
    h1a:           "L'aide publique existe.",
    h1b:           "Trouvons la vôtre.",
    sub:           "Des familles ratent chaque jour l'aide à laquelle elles ont légalement droit. Non pas parce qu'elle n'existe pas, mais parce que le système est trop difficile à naviguer. NAWIRI est le pont.",
    quote:         "« Les gens ratent souvent l'aide non pas parce qu'elle n'existe pas, mais parce que le système est trop difficile à naviguer. »",
    cta:           "Commencer maintenant, c'est gratuit",
    cta_sub:       "Pas de compte · Pas de formulaire · Aucune donnée personnelle stockée",
    demo_user:     "Mon enfant a 3 ans et est souvent malade. Nous n'avons pas d'assurance maladie. Je suis au Bénin.",
    demo_q:        "Êtes-vous enregistré dans le système biométrique ANIP (carte nationale d'identité) ?",
    demo_label:    "NAWIRI pose une question à la fois",
    stats: [
      { value: "22", label: "programmes documentés" },
      { value: "3",  label: "pays couverts" },
      { value: "5",  label: "langues supportées" },
    ],
    how_title: "Comment ça marche",
    steps: [
      { n: "01", title: "Écrivez en langage libre",       desc: "Français, anglais ou votre langue locale. Décrivez votre situation librement — pas de formulaire, pas de jargon." },
      { n: "02", title: "NAWIRI pose une question",        desc: "À la fois, pour cibler exactement les programmes qui vous correspondent." },
      { n: "03", title: "Vous recevez un plan d'action",   desc: "Nom du programme, documents à préparer, prochaine étape, contact officiel." },
      { n: "04", title: "Vous vérifiez et agissez",        desc: "NAWIRI oriente. L'organisme officiel valide. Vous décidez — toujours." },
    ],
    why_title: "Pourquoi l'IA et pas un moteur de recherche",
    why_items: [
      { icon: "🧠", title: "Elle comprend votre situation",        desc: "Un formulaire ne peut pas saisir une description libre mêlant santé, finances et signaux familiaux. NAWIRI le peut." },
      { icon: "⚖️", title: "Elle croise les critères d'éligibilité", desc: "Des dizaines de variables par programme. Un outil statique ne peut pas gérer la combinatoire. NAWIRI le fait." },
      { icon: "🛡️", title: "Elle oriente — elle ne décide jamais", desc: "NAWIRI oriente. Elle ne certifie jamais l'éligibilité. Seul un agent officiel peut valider un dossier." },
    ],
    countries_title: "Programmes couverts",
    countries: [
      { flag: "🇧🇯", name: "Bénin",    count: "11 programmes", items: ["Assurance maladie obligatoire (AMO/ARCH)", "Gratuité paludisme <5 ans et femmes enceintes", "Gratuité césarienne", "Microcrédit Alafia (FNM)", "Transferts cash GBESSOKÉ", "ARV et soins VIH gratuits", "Pension vieillesse CNSS"] },
      { flag: "🇸🇳", name: "Sénégal",  count: "7 programmes",  items: ["Mutuelles de santé CMU", "Gratuité soins enfants <5 ans", "Plan Sésame (60+)", "Bourse de Sécurité Familiale (PNBSF)", "Gratuité césarienne", "Gratuité dialyse", "Carte d'Égalité des Chances (handicap)"] },
      { flag: "🇬🇭", name: "Ghana",    count: "4 programmes",  items: ["Assurance nationale NHIS", "Soins maternels gratuits", "Dialyse gratuite (depuis décembre 2024)", "Transfert cash LEAP"] },
    ],
    ai_title:    "IA responsable par conception",
    ai_items: [
      { icon: "🔒", title: "Ne certifie jamais l'éligibilité",    desc: "NAWIRI dit toujours « vous pourriez être éligible » — seul un agent officiel peut confirmer. Pas de fausses promesses." },
      { icon: "🚨", title: "Les urgences passent en premier",      desc: "Tout signe d'urgence médicale déclenche immédiatement un renvoi vers le centre de santé le plus proche." },
      { icon: "🙈", title: "Zéro donnée stockée",                 desc: "Rien n'est sauvegardé sur nos serveurs. Votre conversation reste sur votre appareil uniquement." },
      { icon: "🧭", title: "Toujours vers un humain",             desc: "En cas de doute, NAWIRI vous dirige vers l'organisme officiel ou un travailleur social — jamais sans étape suivante." },
    ],
    cta2_title: "Prêt(e) à trouver ce à quoi vous avez droit ?",
    cta2_sub:   "Commencez une conversation. Cela prend moins de 2 minutes.",
    cta2_btn:   "Commencer maintenant →",
    footer_tagline: "USAII Global AI Hackathon 2026 · Équipe EVOLUTICS · Université d'Abomey-Calavi, Bénin",
    footer_privacy: "Aucune donnée personnelle stockée sur nos serveurs.",
  },
};

// ─── Landing page ───────────────────────────────────────────────────────────────

export default function Landing() {
  const [lang, setLang] = useState("en");
  const router = useRouter();
  const t = T[lang];

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "var(--bg)" }}>

      {/* ── NAV ────────────────────────────────────────────────────────────── */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 50,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 clamp(16px, 4vw, 40px)", height: 60,
        background: "rgba(245,242,235,0.94)", backdropFilter: "blur(14px)",
        borderBottom: "1px solid var(--border-soft)",
      }}>
        <span style={{
          fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800,
          fontSize: 20, letterSpacing: "-0.5px", color: "var(--primary)",
        }}>
          NAWIRI
        </span>

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ fontSize: 12, color: "var(--text-3)", display: "none" }} className="nav-countries">
            {t.nav_countries}
          </span>
          <button
            onClick={() => setLang(l => l === "en" ? "fr" : "en")}
            style={{
              padding: "5px 14px", borderRadius: "var(--radius)",
              border: "1px solid var(--border)", background: "var(--bg-card)",
              fontSize: 13, fontWeight: 600, color: "var(--text-2)",
              cursor: "pointer", transition: "border-color 0.15s",
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = "var(--primary)"}
            onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border)"}
          >
            {lang === "en" ? "FR" : "EN"}
          </button>

          <button
            onClick={() => router.push("/chat")}
            style={{
              padding: "7px 18px", borderRadius: "var(--radius)",
              background: "var(--primary)", border: "none", color: "#fff",
              fontSize: 13, fontWeight: 700, cursor: "pointer",
              fontFamily: "'Space Grotesk', sans-serif",
              letterSpacing: "-0.2px", transition: "background 0.15s",
            }}
            onMouseEnter={e => e.currentTarget.style.background = "var(--primary-dark)"}
            onMouseLeave={e => e.currentTarget.style.background = "var(--primary)"}
          >
            {lang === "en" ? "Start" : "Commencer"} →
          </button>
        </div>
      </nav>

      {/* ── HERO ───────────────────────────────────────────────────────────── */}
      <section style={{ padding: "80px clamp(16px, 4vw, 40px) 64px" }}>
        <div style={{
          maxWidth: 1120, margin: "0 auto",
          display: "flex", gap: 64, alignItems: "center", flexWrap: "wrap",
        }}>

          {/* Copy */}
          <div className="anim-fade-up" style={{ flex: "1 1 400px" }}>
            <div style={{
              display: "flex", alignItems: "center", gap: 8, marginBottom: 24,
            }}>
              <span style={{ fontSize: 20 }}>🇧🇯</span>
              <span style={{ fontSize: 20 }}>🇸🇳</span>
              <span style={{ fontSize: 20 }}>🇬🇭</span>
              <span style={{ width: 1, height: 16, background: "var(--border)", margin: "0 4px" }} />
              <span style={{ fontSize: 12, color: "var(--text-3)", fontWeight: 500 }}>
                {t.nav_countries}
              </span>
            </div>

            <h1 style={{
              fontSize: "clamp(36px, 5vw, 60px)",
              color: "var(--text)", marginBottom: 20, lineHeight: 1.1,
            }}>
              {t.h1a}
              <br />
              <span style={{ color: "var(--primary)" }}>{t.h1b}</span>
            </h1>

            <p style={{
              fontSize: 17, color: "var(--text-2)", lineHeight: 1.75,
              maxWidth: 480, marginBottom: 36,
            }}>
              {t.sub}
            </p>

            <blockquote style={{
              borderLeft: "3px solid var(--primary)",
              paddingLeft: 16, marginBottom: 40,
              fontSize: 14, fontStyle: "italic",
              color: "var(--text-3)", lineHeight: 1.65, maxWidth: 420,
            }}>
              {t.quote}
            </blockquote>

            <button
              onClick={() => router.push("/chat")}
              style={{
                padding: "16px 32px", borderRadius: "var(--radius-lg)",
                background: "var(--primary)", color: "#fff", border: "none",
                fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
                fontSize: 16, letterSpacing: "-0.2px", cursor: "pointer",
                boxShadow: "0 4px 20px rgba(192,90,60,0.3)",
                transition: "all 0.15s",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "var(--primary-dark)"; e.currentTarget.style.boxShadow = "0 6px 24px rgba(192,90,60,0.4)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "var(--primary)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(192,90,60,0.3)"; }}
            >
              {t.cta}
            </button>
            <p style={{ fontSize: 11, color: "var(--text-3)", marginTop: 10, letterSpacing: "0.01em" }}>
              {t.cta_sub}
            </p>
          </div>

          {/* Chat demo mockup */}
          <div className="anim-fade-up anim-delay-2" style={{
            flex: "0 1 400px", width: "100%",
            background: "var(--bg-card)",
            borderRadius: "var(--radius-xl)",
            border: "1px solid var(--border-soft)",
            boxShadow: "0 8px 48px rgba(0,0,0,0.09)",
            overflow: "hidden",
          }}>
            {/* Mock top bar */}
            <div style={{
              padding: "14px 20px",
              borderBottom: "1px solid var(--border-soft)",
              display: "flex", alignItems: "center", gap: 10,
              background: "var(--bg)",
            }}>
              <div style={{
                width: 30, height: 30, borderRadius: "50%",
                background: "var(--primary)", color: "#fff",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 14,
              }}>N</div>
              <div>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 13, color: "var(--text)" }}>NAWIRI</div>
                <div style={{ fontSize: 11, color: "#4A7C59", fontWeight: 600 }}>● {lang === "en" ? "Online" : "En ligne"}</div>
              </div>
            </div>

            {/* Messages */}
            <div style={{ padding: "20px 16px", display: "flex", flexDirection: "column", gap: 14 }}>

              {/* User bubble */}
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <div style={{
                  maxWidth: "82%", padding: "10px 14px",
                  borderRadius: "14px 4px 14px 14px",
                  background: "var(--primary)", color: "#fff",
                  fontSize: 13, lineHeight: 1.55,
                }}>
                  {t.demo_user}
                </div>
              </div>

              {/* NAWIRI reply */}
              <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                <div style={{
                  width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
                  background: "var(--primary)", color: "#fff",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 12,
                }}>N</div>
                <div style={{
                  flex: 1, padding: "10px 14px",
                  background: "var(--bg-subtle)",
                  borderRadius: "4px 14px 14px 14px",
                  fontSize: 13, lineHeight: 1.55, color: "var(--text)",
                }}>
                  {t.demo_q}
                </div>
              </div>

              {/* Typing indicator */}
              <div style={{
                display: "flex", gap: 5, alignItems: "center",
                marginLeft: 36, opacity: 0.6,
              }}>
                {[0,1,2].map(i => (
                  <span key={i} style={{
                    width: 5, height: 5, borderRadius: "50%",
                    background: "var(--text-3)", display: "inline-block",
                    animation: `dot-bounce 1.2s ease-in-out ${i * 0.2}s infinite`,
                  }} />
                ))}
              </div>
            </div>

            {/* Demo label */}
            <div style={{
              padding: "10px 16px 14px",
              borderTop: "1px solid var(--border-soft)",
              fontSize: 11, color: "var(--text-3)",
              fontStyle: "italic", textAlign: "center",
            }}>
              {t.demo_label}
            </div>
          </div>

        </div>
      </section>

      {/* ── STATS BAR ──────────────────────────────────────────────────────── */}
      <div style={{
        borderTop: "1px solid var(--border-soft)",
        borderBottom: "1px solid var(--border-soft)",
        background: "var(--bg-card)",
        padding: "28px clamp(16px, 4vw, 40px)",
      }}>
        <div style={{
          maxWidth: 1120, margin: "0 auto",
          display: "flex", justifyContent: "center",
          gap: "clamp(32px, 6vw, 80px)", flexWrap: "wrap",
        }}>
          {t.stats.map((s, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{
                fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800,
                fontSize: "clamp(32px, 4vw, 44px)", color: "var(--primary)",
                letterSpacing: "-2px", lineHeight: 1,
              }}>
                {s.value}
              </div>
              <div style={{ fontSize: 13, color: "var(--text-3)", marginTop: 4, fontWeight: 500 }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── HOW IT WORKS ───────────────────────────────────────────────────── */}
      <section style={{ padding: "80px clamp(16px, 4vw, 40px)", background: "var(--bg)" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(24px, 3vw, 32px)", textAlign: "center", marginBottom: 56 }}>
            {t.how_title}
          </h2>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 16,
          }}>
            {t.steps.map((step, i) => (
              <div key={i} style={{
                padding: "28px 24px",
                background: "var(--bg-card)",
                border: "1px solid var(--border-soft)",
                borderRadius: "var(--radius-lg)",
                position: "relative", overflow: "hidden",
              }}>
                <div style={{
                  position: "absolute", top: 0, left: 0,
                  width: "100%", height: 3, background: "var(--primary)",
                  opacity: 0.15 + i * 0.25,
                }} />
                <div style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 800, fontSize: 11, color: "var(--primary)",
                  letterSpacing: "0.12em", marginBottom: 14,
                }}>
                  {step.n}
                </div>
                <div style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 700, fontSize: 15, color: "var(--text)", marginBottom: 10,
                  lineHeight: 1.3,
                }}>
                  {step.title}
                </div>
                <div style={{ fontSize: 13.5, color: "var(--text-2)", lineHeight: 1.65 }}>
                  {step.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY AI ─────────────────────────────────────────────────────────── */}
      <section style={{
        padding: "80px clamp(16px, 4vw, 40px)",
        background: "var(--bg-card)",
        borderTop: "1px solid var(--border-soft)",
      }}>
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(24px, 3vw, 32px)", textAlign: "center", marginBottom: 56 }}>
            {t.why_title}
          </h2>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 20,
          }}>
            {t.why_items.map((item, i) => (
              <div key={i} style={{
                padding: "32px 28px",
                background: "var(--bg)",
                border: "1px solid var(--border-soft)",
                borderRadius: "var(--radius-lg)",
              }}>
                <div style={{ fontSize: 28, marginBottom: 18 }}>{item.icon}</div>
                <div style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 700, fontSize: 16, color: "var(--text)", marginBottom: 10, lineHeight: 1.3,
                }}>
                  {item.title}
                </div>
                <div style={{ fontSize: 14, color: "var(--text-2)", lineHeight: 1.7 }}>
                  {item.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROGRAMS COVERED ───────────────────────────────────────────────── */}
      <section style={{
        padding: "80px clamp(16px, 4vw, 40px)",
        background: "var(--bg)",
        borderTop: "1px solid var(--border-soft)",
      }}>
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(24px, 3vw, 32px)", textAlign: "center", marginBottom: 56 }}>
            {t.countries_title}
          </h2>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 20,
          }}>
            {t.countries.map(c => (
              <div key={c.name} style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border-soft)",
                borderRadius: "var(--radius-lg)",
                overflow: "hidden",
              }}>
                {/* Country header */}
                <div style={{
                  padding: "20px 24px 16px",
                  background: "var(--primary-soft)",
                  borderBottom: "1px solid #F6AB99",
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 24 }}>{c.flag}</span>
                    <span style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontWeight: 700, fontSize: 18, color: "var(--text)",
                    }}>{c.name}</span>
                  </div>
                  <span style={{
                    fontSize: 11, fontWeight: 700, color: "var(--primary)",
                    background: "#fff", padding: "3px 10px",
                    borderRadius: 99, border: "1px solid #F6AB99",
                  }}>{c.count}</span>
                </div>

                {/* Programs list */}
                <ul style={{ listStyle: "none", padding: "20px 24px", display: "flex", flexDirection: "column", gap: 9 }}>
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

      {/* ── RESPONSIBLE AI ─────────────────────────────────────────────────── */}
      <section style={{
        padding: "80px clamp(16px, 4vw, 40px)",
        background: "var(--bg-card)",
        borderTop: "1px solid var(--border-soft)",
      }}>
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(24px, 3vw, 32px)", textAlign: "center", marginBottom: 56 }}>
            {t.ai_title}
          </h2>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 16,
          }}>
            {t.ai_items.map((item, i) => (
              <div key={i} style={{
                padding: "24px 22px",
                background: "var(--bg)",
                border: "1px solid var(--border-soft)",
                borderRadius: "var(--radius-lg)",
                display: "flex", gap: 14, alignItems: "flex-start",
              }}>
                <span style={{ fontSize: 22, flexShrink: 0, marginTop: 2 }}>{item.icon}</span>
                <div>
                  <div style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 700, fontSize: 14, color: "var(--text)", marginBottom: 6, lineHeight: 1.3,
                  }}>
                    {item.title}
                  </div>
                  <div style={{ fontSize: 13, color: "var(--text-2)", lineHeight: 1.65 }}>
                    {item.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRE-FOOTER CTA ─────────────────────────────────────────────────── */}
      <section style={{
        padding: "80px clamp(16px, 4vw, 40px)",
        background: "var(--primary)",
        textAlign: "center",
      }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <h2 style={{
            fontSize: "clamp(24px, 3.5vw, 36px)",
            color: "#fff", marginBottom: 16, lineHeight: 1.2,
          }}>
            {t.cta2_title}
          </h2>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.8)", marginBottom: 36 }}>
            {t.cta2_sub}
          </p>
          <button
            onClick={() => router.push("/chat")}
            style={{
              padding: "16px 40px", borderRadius: "var(--radius-lg)",
              background: "#fff", color: "var(--primary)",
              border: "none",
              fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
              fontSize: 16, cursor: "pointer",
              boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
              transition: "all 0.15s",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "var(--primary-soft)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "#fff"; }}
          >
            {t.cta2_btn}
          </button>
          <p style={{ fontSize: 11, color: "rgba(255,255,255,0.55)", marginTop: 12, letterSpacing: "0.01em" }}>
            {t.cta_sub}
          </p>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────────────────── */}
      <footer style={{
        borderTop: "1px solid rgba(255,255,255,0.1)",
        padding: "24px clamp(16px, 4vw, 40px)",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        flexWrap: "wrap", gap: 12, background: "var(--bg)",
        fontSize: 12, color: "var(--text-3)",
      }}>
        <span style={{
          fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800,
          fontSize: 16, color: "var(--primary)",
        }}>
          NAWIRI
        </span>
        <span style={{ textAlign: "center" }}>{t.footer_tagline}</span>
        <span>{t.footer_privacy}</span>
      </footer>

      <style>{`
        @keyframes dot-bounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40% { transform: translateY(-4px); opacity: 1; }
        }
        @media (min-width: 640px) {
          .nav-countries { display: block !important; }
        }
      `}</style>
    </div>
  );
}
