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
        name: "Mandatory Health Insurance — AMO / ARCH",
        official: [
          { label: "ANPS — Agence Nationale de Protection Sociale", url: "https://anps.social.gouv.bj/", note: "Official operational desk for ARCH health insurance and AMO for the poor" },
          { label: "ANPS — Présentation du projet ARCH", url: "https://anps.social.gouv.bj/arch/presentation", note: "Official presentation of the ARCH project (health, training, credit, pension)" },
          { label: "Décret N° 2023-327 du 21 juin 2023 — sgg.gouv.bj", url: "https://sgg.gouv.bj/doc/decret-2023-327/", note: "Decree establishing AMO (Assurance Maladie Obligatoire)" },
          { label: "Décret N° 2025-672 du 29 octobre 2025 — sgg.gouv.bj", url: "https://sgg.gouv.bj/doc/decret-2025-672/", note: "Makes AMO mandatory for all — employer deadline 29 Oct 2026, penalty 200,000 FCFA/uncovered employee" },
          { label: "gouv.bj — AMO: syndicats, patronat et assureurs informés", url: "https://www.gouv.bj/article/2309/assurance-maladie-obligatoire-syndicats-patronat-assureurs-informes-contenu-decret-application/", note: "Government article on AMO implementation decree" },
          { label: "social.gouv.bj — Ministère des Affaires Sociales", url: "https://social.gouv.bj/", note: "Ministry overseeing ARCH, GBESSOKÉ and social protection programs" },
        ],
        press: [
          "baobab-courtage.com — AMO premiums and employer obligations",
        ],
      },
      {
        name: "Alafia Microcredit — FNM",
        official: [
          { label: "fnm.bj — Fonds National de la Microfinance", url: "https://www.fnm.bj/", note: "Official FNM site — Alafia microcredit (30k / 50k / 100k FCFA)" },
          { label: "social.gouv.bj — FNM page", url: "https://social.gouv.bj/ministere/fnm", note: "FNM under the Ministry of Social Affairs" },
          { label: "gouv.bj — Microcrédit Alafia: mise en garde contre faux intermédiaires", url: "https://www.gouv.bj/article/2169/microcredit-alafia-anssfd-mettent-faux-intermediaires-garde-invitent-populations-vigilance/", note: "Official government article on Alafia microcredit" },
        ],
        press: [
          "beninrevele.bj — Lancement microcrédit Alafia dans le Zou",
          "beninrevele.bj — Microcrédit Alafia passe à 100 000 FCFA",
        ],
      },
      {
        name: "GBESSOKÉ Cash Transfers",
        official: [
          { label: "social.gouv.bj — Lancement du programme GBESSOKÉ", url: "https://social.gouv.bj/actualite/actualites/lancement-du-programme-de-filets-de-protection-sociale-productifs-gbessoke", note: "Official launch announcement of productive social protection networks GBESSOKÉ" },
          { label: "gouv.bj — GBESSOKÉ: des CIP offerts à 34 000 bénéficiaires", url: "https://www.gouv.bj/article/2660/programme-social-gbessoke-offerts-beneficiaires-prelude-demarrage./", note: "Government article on GBESSOKÉ beneficiaries receiving ANIP cards" },
        ],
      },
      {
        name: "Free Cesarean Section",
        official: [
          { label: "sante.gouv.bj — Ministère de la Santé du Bénin", url: "https://sante.gouv.bj/", note: "Ministry of Health — free cesarean at public hospitals" },
        ],
      },
      {
        name: "Free Malaria Care — children under 5 and pregnant women",
        official: [
          { label: "sante.gouv.bj — Ministère de la Santé du Bénin", url: "https://sante.gouv.bj/", note: "Ministry of Health — free malaria treatment" },
          { label: "UNICEF Bénin — Cash+Care Faaba (2024-2025)", url: "https://www.unicef.org/benin/recits/cashcare-faaba-un-appui-renforc%C3%A9-en-2024-2025", note: "UNICEF Benin — social protection programs including malaria and child health" },
        ],
      },
      {
        name: "Free ARV / HIV Treatment",
        official: [
          { label: "sante.gouv.bj — Ministère de la Santé du Bénin", url: "https://sante.gouv.bj/", note: "Ministry of Health — free antiretrovirals at certified centers" },
        ],
      },
      {
        name: "Family Planning & Cancer Screening Campaigns",
        official: [
          { label: "sante.gouv.bj — Ministère de la Santé du Bénin", url: "https://sante.gouv.bj/", note: "Ministry of Health — periodic free screening campaigns" },
        ],
      },
      {
        name: "CNSS Old-Age Pension",
        official: [
          { label: "cnss.bj — Caisse Nationale de Sécurité Sociale du Bénin", url: "https://cnss.bj/", note: "Official CNSS site — old-age pension, formal sector" },
          { label: "cnss.bj — La pension de vieillesse", url: "https://cnss.bj/branches-des-pensions/la-pension-de-vieillesse/", note: "Full eligibility details: 180 months (15 years) of insurance required, age 60" },
          { label: "cnss.bj — Services en ligne / pension vieillesse anticipée", url: "https://cnss.bj/services/public/pension-vieillesse-anticipee", note: "Online pension calculation and early retirement service" },
          { label: "CLEISS — Le régime béninois de sécurité sociale", url: "https://www.cleiss.fr/docs/regimes/regime_benin-salaries.html", note: "French official cross-border social security reference" },
        ],
      },
      {
        name: "ARCH Professional Training",
        official: [
          { label: "ANPS — anps.social.gouv.bj", url: "https://anps.social.gouv.bj/", note: "ANPS manages ARCH formation (vocational training for the poor)" },
        ],
      },
      {
        name: "ARCH Credit",
        official: [
          { label: "ANPS — anps.social.gouv.bj", url: "https://anps.social.gouv.bj/", note: "ANPS manages ARCH credit (microcredit for the poor)" },
        ],
      },
      {
        name: "ARCH Pension — informal workers",
        official: [
          { label: "ANPS — anps.social.gouv.bj", url: "https://anps.social.gouv.bj/", note: "ANPS manages ARCH retraite — 30,000 FCFA/year for informal workers aged 60+" },
        ],
      },
      {
        name: "FAABA / SWEDD — Conditional cash transfers for schoolgirls",
        official: [
          { label: "gouv.bj — Transferts monétaires à 30 000 filles scolarisées au Bénin", url: "https://www.gouv.bj/article/2068/transferts-monetaires-filles-issues-famille-situation-difficile-plus-9-milliards-fcfa-distribuer-30-mille-filles-scolarisees-benin/", note: "Official government article — 9+ billion FCFA for FAABA cash transfers" },
          { label: "social.gouv.bj — Lancement des transferts monétaires à des filles", url: "https://social.gouv.bj/actualite/actualites/lancement-des-transferts-monetaires-a-des-filles-issues-de-famille-en-situation-difficile---plus-de-9-milliards-fcfa-a-distribuer-a-30-mille-filles-scolarisees-au-benin", note: "Ministry of Social Affairs official announcement" },
          { label: "social.gouv.bj — Projet SWEDD-Bénin", url: "https://social.gouv.bj/actualite/actualites/mise-en-oeuvre-du-projet-swedd-benin---le-gouvernement-met-en-formation-1-200-adolescentes-et-filles-jeunes-descolarisees", note: "SWEDD project implementation in Benin" },
          { label: "UNICEF Bénin — Cash+Care Faaba: un appui renforcé en 2024-2025", url: "https://www.unicef.org/benin/recits/cashcare-faaba-un-appui-renforc%C3%A9-en-2024-2025", note: "UNICEF Benin — FAABA program, girls 9–15, 6 northern departments" },
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
        name: "CMU — Community Health Mutuals",
        official: [
          { label: "sencsu.sn — SEN-CSU (Agence Sénégalaise de la Couverture Sanitaire Universelle)", url: "https://sencsu.sn/", note: "Official site — renamed from ANACMU by Decree 2024-832 of 27 March 2024. Contact: +221 33 859 15 15" },
          { label: "sencsu.sn — Historique de la CMU", url: "https://sencsu.sn/csu.php?page=article&id_article=1", note: "History and legal basis of universal health coverage in Senegal" },
          { label: "agencecmu.sn — Ancienne ANACMU (still active)", url: "https://www.agencecmu.sn/", note: "Former ANACMU site — still accessible with CMU, under-5 and dialysis information" },
          { label: "sante.gouv.sn — Ministère de la Santé et de l'Action Sociale", url: "https://www.sante.gouv.sn/", note: "Ministry of Health — CMU dossier and free care programs" },
        ],
        press: [
          "cleiss.fr — La sécurité sociale au Sénégal (French cross-border social security reference)",
        ],
      },
      {
        name: "Free Healthcare for Children Under 5",
        official: [
          { label: "sante.gouv.sn — Ministère de la Santé", url: "https://www.sante.gouv.sn/", note: "Free consultations and treatment at public facilities for children under 5" },
          { label: "agencecmu.sn — Gratuité soins 0–5 ans", url: "https://www.agencecmu.sn/", note: "CMU agency page on free under-5 care" },
        ],
      },
      {
        name: "Plan Sésame — Free Healthcare for 60+",
        official: [
          { label: "senegalservices.sn — Demander à bénéficier du Plan Sésame", url: "https://senegalservices.sn/demarche/demander-a-beneficier-du-plan-sesame-1337", note: "Official Senegal public services portal — exact procedure and required documents" },
          { label: "senegalservices.sn — Le Plan Sésame du Sénégal", url: "https://senegalservices.sn/texte/le-plan-sesame-du-senegal", note: "Official description of the Plan Sésame" },
          { label: "agencecmu.sn — Plan Sésame", url: "https://www.agencecmu.sn/plan-sesame-0", note: "CMU agency page on Plan Sésame" },
        ],
        press: [
          "Cairn.info — Analyse du fonctionnement du Plan Sésame (Santé Publique, 2013)",
          "Jeune Afrique — Plan Sésame: le Sénégal aux petits soins avec les seniors",
        ],
      },
      {
        name: "Free Dialysis",
        official: [
          { label: "senegalservices.sn — Demander à bénéficier de la gratuité de la dialyse", url: "https://senegalservices.sn/demarche/demander-a-beneficier-de-la-gratuite-de-la-dialyse", note: "Official procedure: register on a waiting list at a public dialysis center + nephrologist prescription" },
          { label: "sante.gouv.sn — Contribution sur la gratuité de la prise en charge de l'insuffisance rénale", url: "https://www.sante.gouv.sn/Actualites/contribution-du-docteur-annette-seck-ndiaye-directrice-de-la-pharmacie-nationale-d", note: "Ministry of Health official article on free dialysis in Senegal" },
          { label: "agencecmu.sn — Dialyse", url: "https://www.agencecmu.sn/", note: "CMU agency — free dialysis information" },
        ],
      },
      {
        name: "Free Cesarean Section",
        official: [
          { label: "senegalservices.sn — Demander à bénéficier de la gratuité de la césarienne", url: "https://senegalservices.sn/demarche/demander-a-beneficier-de-la-gratuite-de-la-cesarienne-des-femmes-dans-les-structures-de-sante-publiq", note: "Official procedure — all public health structures with operating rooms" },
          { label: "sencsu.sn — Gratuité de la césarienne", url: "https://sencsu.sn/csu.php?id_article=8&page=article", note: "SEN-CSU official page on free cesarean" },
        ],
      },
      {
        name: "PNBSF — Family Security Grant",
        official: [
          { label: "devcommunautaire.gouv.sn — Bénéficiaires du PNBSF", url: "https://devcommunautaire.gouv.sn/actualite/la-rencontre-des-beneficiaires-du-programme-national-de-bourse-de-securite-familiale", note: "Ministry of Family and Solidarity — PNBSF beneficiaries article" },
          { label: "devcommunautaire.gouv.sn — Évaluation du RNU", url: "https://devcommunautaire.gouv.sn/actualite/le-ministere-de-la-famille-et-des-solidarites-evalue-le-registre-national-unique-rnu", note: "Ministry evaluating the National Single Registry (RNU) — gateway to PNBSF" },
          { label: "senegal-emergent.com — PNBSF", url: "http://senegal-emergent.com/fr/programme-national-de-bourses-de-securite-familiale-pnbsf", note: "Official Senegal Emergent portal — 35,000 FCFA/quarter confirmed since Dec. 2022" },
        ],
        press: [
          "socialprotection.org — PNBSF program profile (World Bank / ILO database)",
          "aps.sn (18 March 2026) — PNBSF resumption: Q1 2026 payments to ~355,013 households",
        ],
      },
      {
        name: "Equal Opportunity Card — Disability",
        official: [
          { label: "devcommunautaire.gouv.sn — Ministère de la Famille et des Solidarités", url: "https://devcommunautaire.gouv.sn/", note: "Ministry issuing the Equal Opportunity Card (Carte d'Égalité des Chances) via DGAS" },
        ],
        institutional: [
          { label: "socialprotection.org — Carte d'Égalité des Chances", url: "https://socialprotection.org/", note: "International Social Protection database profile" },
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
        name: "NHIS — National Health Insurance Scheme",
        official: [
          { label: "nhis.gov.gh — National Health Insurance Scheme", url: "https://nhis.gov.gh/", note: "Official NHIS site — benefits, renewal (*929# / MyNHIS App), district offices" },
          { label: "socialprotection.org — Ghana NHIS Fee Exemptions", url: "https://socialprotection.org/discover/programmes/ghana%E2%80%99s-national-health-insurance-scheme-fee-exemptions", note: "Comprehensive NHIS program profile — exemptions, coverage, premiums" },
          { label: "PMC / NIH — Implementation of the NHIS in Ghana", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC7537808/", note: "Peer-reviewed study — NHIS structure, coverage and outcomes" },
        ],
      },
      {
        name: "Free Primary Healthcare — launched April 2026",
        official: [
          { label: "presidency.gov.gh — Mahama launches Free Primary Healthcare Programme", url: "https://presidency.gov.gh/mahama-launches-landmark-free-primary-healthcare-programme-to-tackle-disease-burden-and-achieve-universal-coverage/", note: "Official presidential launch announcement — April 2026" },
          { label: "ghs.gov.gh — President Mahama launches Free Primary Health Care Initiative", url: "https://ghs.gov.gh/news-and-events/president-mahama-launches-free-primary-health-care-initiative-", note: "Ghana Health Service official announcement" },
          { label: "moh.gov.gh — Free Primary Healthcare Rollout in 150 Districts", url: "https://moh.gov.gh/free-primary-healthcare/", note: "Ministry of Health — Phase 1: 150 underserved districts" },
          { label: "ghs.gov.gh — GHS Advances Development of FPHC Implementation Guidelines", url: "https://ghs.gov.gh/news-and-events/ghs-advances-development-of-free-primary-health-care-implementation-guidelines", note: "Implementation guidelines for FPHC at CHPS compounds and health centres" },
        ],
      },
      {
        name: "Free Maternal Health Care — under NHIS",
        official: [
          { label: "nhis.gov.gh — National Health Insurance Scheme", url: "https://nhis.gov.gh/", note: "NHIS benefits: 6 ANC visits, delivery incl. c-section, 2 postnatal visits, 1-year cover mother + 3 months newborn" },
        ],
        institutional: [
          { label: "PMC / NIH — Ghana free maternal-care policy", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC5953527", note: "Peer-reviewed study on free maternal care policy outcomes in Ghana" },
        ],
      },
      {
        name: "Free Dialysis — since 1 December 2024",
        official: [
          { label: "nhis.gov.gh — NHIA Rolls Out Free Dialysis Program", url: "https://www.nhis.gov.gh/News/nhia-rolls-out-free-dialysis-program-5637", note: "Official NHIA announcement — free dialysis for all NHIS members with kidney disease, effective 1 Dec 2024" },
          { label: "nhis.gov.gh — NHIA free dialysis program to cover renal disease patients", url: "https://www.nhis.gov.gh/News/nhia-free-dialysis-program-to-cover-hundreds-of-renal-disease-patients--5638", note: "Official NHIA news — 20 designated hospitals, 1,200+ projected beneficiaries" },
        ],
        press: [
          "myjoyonline.com — Free dialysis for all kidney patients under NHIS from Dec. 1",
          "citinewsroom.com — NHIS announces hospitals offering free dialysis starting December 1",
          "gna.org.gh (Ghana News Agency) — Kidney patients on NHIS to enjoy free dialysis from December 01",
        ],
      },
      {
        name: "MahamaCares — Ghana Medical Trust Fund",
        official: [
          { label: "gmtf.gov.gh — Ghana Medical Trust Fund (official site)", url: "https://gmtf.gov.gh/", note: "Official MahamaCares site — covers NCDs: cancer, cardiovascular, kidney failure, stroke, diabetes" },
          { label: "moh.gov.gh — President Mahama launches Ghana Medical Trust Fund", url: "https://www.moh.gov.gh/president-mahama-launches-ghana-medical-trust-fund-to-support-chronic-disease-care/", note: "Ministry of Health official announcement" },
          { label: "moh.gov.gh — MahamaCares Taskforce inauguration", url: "https://www.moh.gov.gh/hon-minister-for-health-inaugurated-ghana-medical-trust-fund-mahamacares-taskforce/", note: "Ministry of Health — MahamaCares taskforce setup" },
        ],
      },
      {
        name: "LEAP — Livelihood Empowerment Against Poverty",
        official: [
          { label: "mogcsp.gov.gh — Ministry of Gender, Children and Social Protection", url: "https://www.mogcsp.gov.gh/", note: "Ministry overseeing LEAP cash transfers" },
          { label: "leap.mogcsp.gov.gh — LEAP Management Secretariat", url: "https://leap.mogcsp.gov.gh/", note: "Official LEAP site — eligibility, bi-monthly amounts GH¢256–424, PMT targeting" },
          { label: "mogcsp.gov.gh — LEAP program page", url: "https://www.mogcsp.gov.gh/projects/livelyhood-empowerment-against-poverty-leap/", note: "Official LEAP program description" },
          { label: "mogcsp.gov.gh — Government begins 99th cycle of LEAP payments", url: "https://www.mogcsp.gov.gh/government-begins-99th-cycle-of-leap-cash-grant-payments/", note: "99th payment cycle — GH¢139M released for ~350,580 households (Dec 2025)" },
        ],
        institutional: [
          { label: "socialprotection.org — LEAP program profile", url: "https://socialprotection.org/", note: "LEAP in the international Social Protection database" },
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
        padding: "48px clamp(16px, 4vw, 40px) 48px",
      }}>
        <h1 style={{
          fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800,
          fontSize: "clamp(26px, 5vw, 40px)", letterSpacing: "-0.03em",
          color: "var(--text)", marginBottom: 32, lineHeight: 1.1,
        }}>
          Sources
        </h1>

        {/* Country sections */}
        {COUNTRIES.map(c => <CountrySection key={c.flag} country={c} />)}
      </div>
    </div>
  );
}
