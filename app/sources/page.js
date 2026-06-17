"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// ─── Data ─────────────────────────────────────────────────────────────────────

const COUNTRIES = [
  {
    flag: "BJ",
    name: "Benin",
    color: "#C05A3C",
    verified: "15 June 2026",
    programs: [
      {
        name: "Mandatory Health Insurance — AMO / ARCH (Program 1)",
        official: [
          { label: "ANPS — National Social Protection Agency", url: "https://anps.social.gouv.bj", note: "Official desk for ARCH health insurance, AMO for the poor, training, credit, pension. Contact: +229 20 21 34 14" },
          { label: "gouv.bj — Government of Benin portal", url: "https://gouv.bj", note: "AMO rollout articles (IDs: 1145, 505, 1536, 913, 3479)" },
          { label: "Decree 2023-327 of 21 June 2023", note: "Establishes AMO (Assurance Maladie Obligatoire)" },
          { label: "Decree 2025-672 of 29 October 2025", note: "Makes AMO mandatory for all — employer deadline 29 Oct 2026, penalty 200,000 FCFA/uncovered employee" },
          { label: "Law No. 2015-42 of 17 March 2016 (RAMU)", note: "Founding legal framework — 91 articles. PDF stored in data/benin/documents/loi-2015-42.pdf" },
        ],
        institutional: [
          { label: "CLEISS", note: "Social security framework for the self-employed in Benin (ARCH retirement)" },
          { label: "WHO Benin & Afro regional office", note: "Corroboration of health coverage parameters" },
        ],
        press: [
          "lanouvelletribune.info / La Nouvelle Tribune (2024-2025) — AMO rollout, ARCH training",
          "baobab-courtage.com — AMO premiums (private-insurer angle)",
          "Cairn / Afrique contemporaine (2025) — AMO analysis",
        ],
      },
      {
        name: "Alafia Microcredit — FNM (Program 2)",
        official: [
          { label: "fnm.bj — National Microfinance Fund", url: "https://fnm.bj", note: "Alafia microcredit; SFD directory at fnm.bj/repartition-des-sfd-microcredit-alafia" },
          { label: "social.gouv.bj — Ministry of Social Affairs", url: "https://social.gouv.bj", note: "Alafia credit as part of ARCH project" },
        ],
        press: [
          "beninrevele.bj / beninrevele.com — Alafia microcredit details",
        ],
      },
      {
        name: "GBESSOKÉ Cash Transfers (Program 3)",
        official: [
          { label: "social.gouv.bj — Ministry of Social Affairs", url: "https://social.gouv.bj", note: "GBESSOKÉ cash transfers for vulnerable households" },
          { label: "sgg.gouv.bj — Secrétariat Général du Gouvernement", url: "https://sgg.gouv.bj", note: "Official decrees and Conseil des Ministres records" },
        ],
        institutional: [
          { label: "World Bank", note: "Social protection and PMT targeting methodology" },
        ],
        press: [
          "lanationbenin.info, banouto.bj (Sept. 2025) — GBESSOKÉ cash-transfer details and amounts",
        ],
      },
      {
        name: "Free Cesarean Section (Program 4)",
        official: [
          { label: "sante.gouv.bj (beninsante.bj) — Ministry of Health Benin", url: "https://sante.gouv.bj", note: "Free cesarean at public hospitals" },
        ],
        institutional: [
          { label: "WHO Benin", note: "Free cesarean policy" },
          { label: "Cairn / Santé Publique", note: "Free cesarean program analysis" },
        ],
        press: [
          "santetropicale.com, abmsbj.org (ABMS) — cesarean program coverage",
        ],
      },
      {
        name: "Free Malaria Care — children <5 and pregnant women (Program 5)",
        official: [
          { label: "sante.gouv.bj — Ministry of Health Benin", url: "https://sante.gouv.bj", note: "Free malaria treatment for children under 5 and pregnant women" },
        ],
        institutional: [
          { label: "WHO Benin & Afro regional office", note: "Free malaria policy" },
          { label: "UNICEF Benin", note: "Free malaria for under-5s" },
        ],
        press: [
          "baatonu.info (April 2026) — figures on malaria campaign",
        ],
      },
      {
        name: "Free ARV / HIV Treatment (Program 6)",
        official: [
          { label: "sante.gouv.bj — Ministry of Health Benin", url: "https://sante.gouv.bj", note: "Free antiretrovirals at certified centers" },
        ],
        institutional: [
          { label: "UN Benin / UNDP", note: "Joint HIV program, free ARVs" },
          { label: "WHO", note: "HIV treatment protocols" },
        ],
        press: [
          "abmsbj.org (ABMS) — HIV testing and ARV access",
        ],
      },
      {
        name: "Family Planning & Cancer Screening Campaigns (Program 7)",
        official: [
          { label: "sante.gouv.bj — Ministry of Health Benin", url: "https://sante.gouv.bj", note: "Periodic screening campaigns" },
        ],
        press: [
          "baatonu.info (April 2026) — family planning and cancer screening campaign figures",
          "beninrevele.bj — screening campaign coverage",
        ],
      },
      {
        name: "CNSS Old-Age Pension (Program 8)",
        official: [
          { label: "cnss.bj — National Social Security Fund", url: "https://cnss.bj", note: "Old-age pension, formal sector. Contact: +229 90 19 00 00" },
        ],
        institutional: [
          { label: "CLEISS", note: "Benin social security code (via Droit-Afrique)" },
        ],
      },
      {
        name: "ARCH Professional Training (Program 9)",
        official: [
          { label: "anps.social.gouv.bj — ANPS", url: "https://anps.social.gouv.bj", note: "Free vocational training for the poor under ARCH" },
        ],
        press: [
          "lanouvelletribune.info (March 2025) — ARCH training of 4,000 artisans",
        ],
      },
      {
        name: "ARCH Credit (Program 10)",
        official: [
          { label: "anps.social.gouv.bj — ANPS", url: "https://anps.social.gouv.bj", note: "Microcredit component of ARCH for the poor" },
        ],
      },
      {
        name: "ARCH Pension — informal workers (Program 11)",
        official: [
          { label: "anps.social.gouv.bj — ANPS", url: "https://anps.social.gouv.bj", note: "Annual allowance (30,000 FCFA/year) for informal workers aged 60+" },
          { label: "CLEISS", note: "Informal-sector pension framework" },
        ],
      },
      {
        name: "FAABA / SWEDD — Conditional cash transfers for schoolgirls (Program 12)",
        official: [
          { label: "gouv.bj — Government of Benin portal (article 2068)", url: "https://gouv.bj", note: "FAABA program announcement" },
          { label: "social.gouv.bj — Ministry of Social Affairs", url: "https://social.gouv.bj", note: "FAABA implementation" },
          { label: "sgg.gouv.bj — Conseil des Ministres 12 March 2025", url: "https://sgg.gouv.bj", note: "Official decision for FAABA" },
        ],
        institutional: [
          { label: "UNICEF Benin", note: "FAABA / Cash+Care — conditional cash transfers for girls 9–15 in school" },
          { label: "World Bank — SWEDD Project", note: "Sahel Women's Empowerment and Demographic Dividend project — finances FAABA in 6 northern departments (Atacora, Donga, Borgou, Alibori, Collines, Zou)" },
        ],
      },
    ],
  },
  {
    flag: "SN",
    name: "Senegal",
    color: "#4A7C59",
    verified: "15 June 2026",
    programs: [
      {
        name: "CMU — Community Health Mutuals (Program 1)",
        official: [
          { label: "sencsu.sn — SEN-CSU (ex-ANACMU)", url: "https://sencsu.sn", note: "Universal health coverage agency — renamed by Decree 2024-832 of 27 March 2024" },
          { label: "agencecmu.sn — former ANACMU site", url: "https://agencecmu.sn", note: "Still active as fallback; CMU, 0–5 care, dialysis pages" },
          { label: "sante.gouv.sn — Ministry of Health and Social Action", url: "https://sante.gouv.sn", note: "CMU dossier, coverage rates" },
          { label: "Decree No. 2024-832 of 27 March 2024", note: "Renames ANACMU → SEN-CSU, placed under Ministry of Family and Solidarity" },
        ],
        institutional: [
          { label: "WHO Afro", note: "CMU policy" },
          { label: "Better Than Cash Alliance", note: "CMU financing and impact" },
          { label: "World Bank", note: "CMU program profile" },
        ],
        press: [
          "getreliancehealth.com — CMU mutual coverage rates (80% public / 50% private pharmacy)",
        ],
      },
      {
        name: "Free Healthcare for Children Under 5 (Program 2)",
        official: [
          { label: "sante.gouv.sn — Ministry of Health", url: "https://sante.gouv.sn", note: "Free consultations and treatment at public facilities for children under 5" },
          { label: "senegalservices.sn — official public-service portal", url: "https://senegalservices.sn", note: "Under-5 care procedures and documents" },
          { label: "agencecmu.sn", url: "https://agencecmu.sn", note: "Under-5 free care pages" },
        ],
        press: [
          "santetropicale.com — under-5 free care coverage",
        ],
      },
      {
        name: "Plan Sésame — Free Healthcare for 60+ (Program 3)",
        official: [
          { label: "sante.gouv.sn — Ministry of Health", url: "https://sante.gouv.sn", note: "Plan Sésame: free healthcare for all persons 60 and above" },
          { label: "senegalservices.sn", url: "https://senegalservices.sn", note: "Plan Sésame procedures" },
        ],
        press: [
          "Cairn / Santé Publique, Jeune Afrique — Plan Sésame analysis and implementation constraints",
        ],
      },
      {
        name: "Free Dialysis (Program 4)",
        official: [
          { label: "sante.gouv.sn — Ministry of Health", url: "https://sante.gouv.sn", note: "Free kidney dialysis with nephrologist prescription + waiting list" },
          { label: "agencecmu.sn", url: "https://agencecmu.sn", note: "Dialysis free-care page" },
          { label: "senegalservices.sn", url: "https://senegalservices.sn", note: "Dialysis procedures" },
        ],
        press: [
          "allodocteurs.fr — free dialysis context and waiting-list information",
        ],
      },
      {
        name: "Free Cesarean Section (Program 5)",
        official: [
          { label: "sante.gouv.sn — Ministry of Health", url: "https://sante.gouv.sn", note: "Free cesarean sections at public maternity wards" },
          { label: "senegalservices.sn", url: "https://senegalservices.sn", note: "Cesarean procedures" },
        ],
        institutional: [
          { label: "WHO Afro", note: "Free cesarean policy" },
          { label: "Cairn / Santé Publique", note: "Free cesarean outcomes" },
        ],
      },
      {
        name: "PNBSF — Family Security Grant (Program 6)",
        official: [
          { label: "devcommunautaire.gouv.sn — Ministry of Family and Solidarity", url: "https://devcommunautaire.gouv.sn", note: "PNBSF family grant, RNU registration" },
          { label: "senegalservices.sn", url: "https://senegalservices.sn", note: "PNBSF eligibility and registration" },
        ],
        institutional: [
          { label: "World Bank", note: "PNBSF targeting, coverage, and impact (RNU-based PMT)" },
        ],
        press: [
          "senegal-emergent.com — PNBSF: 35,000 FCFA/quarter = 140,000 FCFA/year (since Dec. 2022), RNU role",
          "aps.sn (18 March 2026) — 2026 PNBSF resumption after RNU audit, ~355,013 beneficiary households",
          "ndarinfo.com, senenews.com — Q1 2026 payment from 19 March 2026",
          "allafrica.com (10 Dec 2025) — PNBSF resumption tied to RNU audit completion",
        ],
      },
      {
        name: "Equal Opportunity Card — Disability (Program 7)",
        official: [
          { label: "Direction Générale de l'Action Sociale (DGAS)", note: "Equal Opportunity Card issuance + departmental social services" },
          { label: "Social Orientation Law (Senegal)", note: "Legal basis of the Equal Opportunity Card (rights of persons with disabilities)" },
        ],
        institutional: [
          { label: "socialprotection-pfm.org", note: "Equal Opportunity Card / disability social protection profile" },
          { label: "WATHI, Journal Officiel", note: "Social Orientation Law analysis" },
        ],
        press: [
          "APS (Agence de Presse Sénégalaise) — Equal Opportunity Card reporting",
        ],
      },
    ],
  },
  {
    flag: "GH",
    name: "Ghana",
    color: "#B8860B",
    verified: "15 June 2026",
    programs: [
      {
        name: "NHIS — National Health Insurance Scheme (Program 1)",
        official: [
          { label: "nhis.gov.gh — NHIS official site", url: "https://nhis.gov.gh", note: "Benefits package, news, renewal. USSD: *929#. MyNHIS App." },
          { label: "NHIA — National Health Insurance Authority", note: "Premiums GH¢7–42 + GH¢6 card fee, exemptions, ~95% disease coverage" },
          { label: "National Health Insurance Act / NHIA tariff schedule", note: "Statutory basis of NHIS premiums, exemptions and benefits package" },
        ],
        institutional: [
          { label: "socialprotection.org", note: "NHIS program profile" },
          { label: "BMC / PLOS One / PMC peer-reviewed studies", note: "NHIS outcomes and coverage analysis" },
          { label: "Wikipedia (NHIS Ghana)", note: "Background corroboration only — not a primary source" },
        ],
        press: [
          "Accra Street Journal (2025) — NHIS premium and active-month details",
          "Pulse Ghana (2026) — NHIS active month and renewal",
        ],
      },
      {
        name: "Free Primary Healthcare — launched April 2026 (Program 2)",
        official: [
          { label: "nhis.gov.gh/News — NHIA news", url: "https://nhis.gov.gh/News", note: "prez-mahama-launches-free-primary-healthcare-policy announcement" },
          { label: "presidency.gov.gh — Office of the President", url: "https://presidency.gov.gh", note: "Official FPHC launch announcement (April 2026)" },
          { label: "Ministry of Health / Ghana Health Service", note: "FPHC delivery via CHPS compounds and health centres" },
        ],
        press: [
          "Ghana Business News (16 April 2026) — Phase 1: 150 underserved districts",
          "The Ghanaian Chronicle — FPHC rollout details",
          "News Ghana — nationwide expansion planned 2027–2028",
        ],
      },
      {
        name: "Free Maternal Health Care — under NHIS (Program 3)",
        official: [
          { label: "nhis.gov.gh — NHIA", url: "https://nhis.gov.gh", note: "Free maternal care: 6 ANC visits, delivery (incl. c-section), 2 postnatal visits. Added to NHIS exemptions 2008." },
        ],
        institutional: [
          { label: "BMC / PLOS One / PMC peer-reviewed studies", note: "Ghana free maternal-care policy outcomes" },
          { label: "UNICEF Ghana", note: "Maternal health coverage" },
        ],
      },
      {
        name: "Free Dialysis — since 1 December 2024 (Program 4)",
        official: [
          { label: "nhis.gov.gh/News — NHIA releases", url: "https://nhis.gov.gh/News", note: "Free dialysis added to NHIS benefits package 1 Dec 2024 — all NHIS members with kidney disease, 20 designated hospitals, ~GHC 57M/year" },
        ],
        press: [
          "MyJoyOnline — free dialysis rollout coverage",
          "Citi Newsroom (2025) — 20 designated dialysis hospitals",
          "GhanaWeb — free dialysis expansion",
        ],
      },
      {
        name: "MahamaCares — Ghana Medical Trust Fund (Program 5)",
        official: [
          { label: "presidency.gov.gh — Office of the President", url: "https://presidency.gov.gh", note: "Ghana Medical Trust Fund 2025-26 announcement" },
        ],
        institutional: [
          { label: "The Business & Financial Times (Budget 2025)", note: "MahamaCares funding: ≈GH¢2.3bn, from 20% of the NHIF" },
          { label: "GBC Ghana — Mahama WHA address 2026", note: "MahamaCares scope: NCDs (cancer, hypertension, diabetes, stroke, kidney failure)" },
        ],
        press: [
          "ModernGhana — MahamaCares coverage details",
        ],
      },
      {
        name: "LEAP — Livelihood Empowerment Against Poverty (Program 6)",
        official: [
          { label: "mogcsp.gov.gh — Ministry of Gender, Children and Social Protection", url: "https://mogcsp.gov.gh", note: "LEAP program management" },
          { label: "leap.mogcsp.gov.gh — LEAP Management Secretariat", url: "https://leap.mogcsp.gov.gh", note: "Eligibility, bi-monthly amounts GH¢256-424, PMT targeting. Enrolment: Department of Social Welfare (district level)." },
        ],
        institutional: [
          { label: "UNICEF Ghana Social Protection Budget Brief 2025", note: "LEAP expanded to 400,000 households from July 2025" },
          { label: "World Bank", note: "Social protection / LEAP program profile" },
          { label: "socialprotection.org", note: "LEAP program profile" },
          { label: "ReliefWeb — LEAP 1000 endline", note: "LEAP 1000 sub-window for pregnant women/infants" },
        ],
        press: [
          "thebftonline — Budget 2025 LEAP expansion",
          "Graphic Online, GNA (Ghana News Agency) — LEAP coverage (~360,000 households, 2024)",
        ],
      },
    ],
  },
];

// ─── Components ────────────────────────────────────────────────────────────────

function FlagBadge({ code, color }) {
  return (
    <div style={{
      width: 36, height: 36, borderRadius: 8, flexShrink: 0,
      background: color, display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 12,
      color: "#fff", letterSpacing: "0.04em",
    }}>
      {code}
    </div>
  );
}

function SourceRow({ item }) {
  const hasUrl = !!item.url;
  return (
    <div style={{
      display: "flex", gap: 10, alignItems: "flex-start",
      padding: "8px 0", borderBottom: "1px solid var(--border-soft)",
    }}>
      <div style={{
        width: 6, height: 6, borderRadius: "50%", background: "var(--primary)",
        flexShrink: 0, marginTop: 7,
      }} />
      <div style={{ flex: 1 }}>
        {hasUrl ? (
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontWeight: 600, fontSize: 14, color: "var(--primary)",
              textDecoration: "underline", textUnderlineOffset: 3,
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            {item.label}
          </a>
        ) : (
          <span style={{
            fontWeight: 600, fontSize: 14, color: "var(--text)",
            fontFamily: "'Space Grotesk', sans-serif",
          }}>
            {item.label}
          </span>
        )}
        {item.note && (
          <p style={{ fontSize: 13, color: "var(--text-2)", margin: "2px 0 0", lineHeight: 1.5 }}>
            {item.note}
          </p>
        )}
      </div>
    </div>
  );
}

function PressRow({ text }) {
  return (
    <div style={{
      display: "flex", gap: 10, alignItems: "flex-start",
      padding: "6px 0", borderBottom: "1px solid var(--border-soft)",
    }}>
      <div style={{
        width: 6, height: 6, borderRadius: "50%", background: "var(--text-3)",
        flexShrink: 0, marginTop: 7,
      }} />
      <span style={{ fontSize: 13, color: "var(--text-2)", lineHeight: 1.5 }}>{text}</span>
    </div>
  );
}

function SectionLabel({ children }) {
  return (
    <div style={{
      fontSize: 10, fontWeight: 800, letterSpacing: "0.1em",
      textTransform: "uppercase", color: "var(--text-3)",
      marginBottom: 4, marginTop: 10,
      fontFamily: "'Space Grotesk', sans-serif",
    }}>
      {children}
    </div>
  );
}

function ProgramCard({ prog, color }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{
      background: "var(--bg-card)", border: "1px solid var(--border-soft)",
      borderRadius: 12, overflow: "hidden",
      boxShadow: open ? "0 4px 16px rgba(0,0,0,0.07)" : "none",
      transition: "box-shadow 0.2s",
    }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: "100%", display: "flex", alignItems: "center",
          justifyContent: "space-between", gap: 16,
          padding: "16px 20px", background: "transparent", border: "none",
          cursor: "pointer", textAlign: "left",
        }}
      >
        <span style={{
          fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
          fontSize: 15, color: "var(--text)", lineHeight: 1.35,
        }}>
          {prog.name}
        </span>
        <svg
          width="16" height="16" viewBox="0 0 24 24" fill="none"
          stroke="var(--text-3)" strokeWidth="2.5" strokeLinecap="round"
          style={{ flexShrink: 0, transition: "transform 0.2s", transform: open ? "rotate(180deg)" : "none" }}
        >
          <polyline points="6,9 12,15 18,9" />
        </svg>
      </button>

      {open && (
        <div style={{ padding: "0 20px 20px", borderTop: "1px solid var(--border-soft)" }}>
          {prog.official?.length > 0 && (
            <>
              <SectionLabel>Official & Government Sources</SectionLabel>
              {prog.official.map((s, i) => <SourceRow key={i} item={s} />)}
            </>
          )}
          {prog.institutional?.length > 0 && (
            <>
              <SectionLabel>Institutional Sources (WHO, World Bank, UNICEF…)</SectionLabel>
              {prog.institutional.map((s, i) => <SourceRow key={i} item={s} />)}
            </>
          )}
          {prog.press?.length > 0 && (
            <>
              <SectionLabel>Press & Secondary Corroboration</SectionLabel>
              {prog.press.map((s, i) => <PressRow key={i} text={s} />)}
            </>
          )}
        </div>
      )}
    </div>
  );
}

function CountrySection({ country }) {
  const [open, setOpen] = useState(true);
  return (
    <section style={{ marginBottom: 40 }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: "100%", display: "flex", alignItems: "center",
          gap: 14, marginBottom: 16, background: "transparent",
          border: "none", cursor: "pointer", textAlign: "left", padding: 0,
        }}
      >
        <FlagBadge code={country.flag} color={country.color} />
        <div style={{ flex: 1 }}>
          <div style={{
            fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800,
            fontSize: 22, color: "var(--text)",
          }}>
            {country.name}
          </div>
          <div style={{ fontSize: 13, color: "var(--text-3)", marginTop: 2 }}>
            {country.programs.length} programs — verified {country.verified}
          </div>
        </div>
        <svg
          width="18" height="18" viewBox="0 0 24 24" fill="none"
          stroke="var(--text-3)" strokeWidth="2.5" strokeLinecap="round"
          style={{ flexShrink: 0, transition: "transform 0.2s", transform: open ? "rotate(180deg)" : "none" }}
        >
          <polyline points="6,9 12,15 18,9" />
        </svg>
      </button>

      {open && (
        <div style={{ display: "flex", flexDirection: "column", gap: 10, paddingLeft: 0 }}>
          {country.programs.map((prog, i) => (
            <ProgramCard key={i} prog={prog} color={country.color} />
          ))}
        </div>
      )}
    </section>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function SourcesPage() {
  const router = useRouter();

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>

      {/* ── NAV ────────────────────────────────────────────────────────────────── */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 50,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 clamp(16px, 4vw, 40px)", height: 60,
        background: "rgba(245,242,235,0.94)", backdropFilter: "blur(14px)",
        borderBottom: "1px solid var(--border-soft)",
      }}>
        <button
          onClick={() => router.push("/")}
          style={{
            fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800,
            fontSize: 20, letterSpacing: "-0.5px", color: "var(--primary)",
            background: "none", border: "none", cursor: "pointer", padding: 0,
          }}
        >
          NAWIRI
        </button>
        <button
          onClick={() => router.push("/")}
          style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600,
            color: "var(--text-2)", background: "transparent",
            border: "1.5px solid var(--border)", padding: "6px 14px",
            borderRadius: "var(--radius)", cursor: "pointer", transition: "all 0.15s",
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--primary)"; e.currentTarget.style.color = "var(--primary)"; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-2)"; }}
        >
          ← Back to NAWIRI
        </button>
      </nav>

      {/* ── HEADER ─────────────────────────────────────────────────────────────── */}
      <div style={{
        maxWidth: 860, margin: "0 auto",
        padding: "56px clamp(16px, 4vw, 40px) 32px",
      }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          background: "var(--primary-soft)", borderRadius: 99,
          padding: "5px 14px", marginBottom: 20,
        }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2.5" strokeLinecap="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          <span style={{
            fontSize: 12, fontWeight: 700, color: "var(--primary)",
            fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "0.04em",
          }}>
            Verified data — June 2026
          </span>
        </div>

        <h1 style={{
          fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800,
          fontSize: "clamp(28px, 5vw, 44px)", letterSpacing: "-0.03em",
          color: "var(--text)", marginBottom: 16, lineHeight: 1.1,
        }}>
          Sources & Data Provenance
        </h1>
        <p style={{
          fontSize: 17, color: "var(--text-2)", lineHeight: 1.65,
          maxWidth: 640, marginBottom: 32,
        }}>
          Every figure, rule, and program in NAWIRI comes from an official or institutional source.
          Nothing is invented or guessed. All data was manually collected and verified in June 2026.
          Click any program below to see its exact sources.
        </p>

        {/* Stats row */}
        <div style={{
          display: "flex", gap: 24, flexWrap: "wrap", marginBottom: 48,
          paddingBottom: 32, borderBottom: "1px solid var(--border-soft)",
        }}>
          {[
            { value: "25", label: "programs sourced" },
            { value: "3", label: "countries" },
            { value: "30+", label: "official sources" },
            { value: "100%", label: "primary / official" },
          ].map(s => (
            <div key={s.label}>
              <div style={{
                fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800,
                fontSize: 28, color: "var(--primary)", lineHeight: 1,
              }}>
                {s.value}
              </div>
              <div style={{ fontSize: 12, color: "var(--text-3)", marginTop: 3 }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Methodology note */}
        <div style={{
          background: "var(--bg-subtle)", borderRadius: 12,
          padding: "20px 24px", marginBottom: 48,
          border: "1px solid var(--border-soft)",
        }}>
          <div style={{
            fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
            fontSize: 14, color: "var(--text)", marginBottom: 10,
          }}>
            Methodology
          </div>
          <ul style={{ margin: 0, padding: "0 0 0 20px", color: "var(--text-2)", fontSize: 14, lineHeight: 1.8 }}>
            <li>Data collected from <strong>official government websites, national laws and decrees</strong> as primary sources.</li>
            <li>Cross-checked against <strong>WHO, World Bank, UNICEF</strong> institutional reports for figures and coverage data.</li>
            <li>Press/secondary sources used only to <strong>corroborate or date</strong> official figures — never as primary evidence.</li>
            <li>Known corrections applied (e.g. ANACMU→SEN-CSU in Senegal; ANAM→ANPS in Benin; dialysis NOT free in Benin).</li>
            <li>Targeted programs (cash transfers, free insurance for the poor) are <strong>survey-selected</strong>, not open sign-ups — correctly represented.</li>
            <li>Each program's AI response cites the official contact, not invented data.</li>
          </ul>
        </div>

        {/* Country sections */}
        {COUNTRIES.map(c => <CountrySection key={c.flag} country={c} />)}

        {/* Footer note */}
        <div style={{
          marginTop: 48, paddingTop: 24,
          borderTop: "1px solid var(--border-soft)",
          fontSize: 13, color: "var(--text-3)", lineHeight: 1.7,
        }}>
          <strong style={{ color: "var(--text-2)" }}>Important disclaimer:</strong> NAWIRI provides orientation only.
          Program rules, amounts, and contacts may change. Always verify with the official body before taking action.
          NAWIRI never certifies eligibility — only an official agent can validate a file.
          <br /><br />
          Data compiled by Team EVOLUTICS (Shadrak BESSANH & Franckel GNONLONFIN),
          Université d'Abomey-Calavi, Benin — June 2026.
        </div>
      </div>
    </div>
  );
}
