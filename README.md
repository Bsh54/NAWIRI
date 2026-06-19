<p align="center">
  <img src="public/nawiri-logo.svg" alt="NAWIRI" width="480" />
</p>

<p align="center">
  <b>AI-powered social orientation for West Africa</b><br>
  Benin · Senegal · Ghana &nbsp;·&nbsp; 25 programs &nbsp;·&nbsp; 5 languages
</p>

<p align="center">
  <a href="https://nawiri.vercel.app"><strong>→ Live demo</strong></a>
</p>

<br>

## What it does

Families across West Africa miss public aid they are legally entitled to — not because it doesn't exist, but because the system is too hard to navigate.

NAWIRI is a conversational AI assistant that bridges that gap. You describe your situation in plain words — English, French, Fɔngbe, Wolof, or Twi — and NAWIRI asks one question at a time to find the programs you qualify for, the exact documents to bring, and the official contact to call.

## Programs covered

| Country | Programs |
|---------|----------|
| 🇧🇯 Benin | AMO/ARCH health insurance, Alafia microcredit, GBESSOKÉ cash transfers, free cesarean, free malaria care, free ARVs, CNSS pension, FAABA schoolgirl grants + more |
| 🇸🇳 Senegal | CMU health mutuals, free care under 5, Plan Sésame (60+), PNBSF family grant, free cesarean, free dialysis, Equal Opportunity Card |
| 🇬🇭 Ghana | NHIS, Free Primary Healthcare (April 2026), free maternal care, free dialysis, MahamaCares, LEAP cash transfer |

## How it works

```
User describes situation in free text
        ↓
NAWIRI identifies signals (health + finance + family)
        ↓
One follow-up question at a time
        ↓
Structured response: Program / Documents / Steps / Contact
```

The AI interprets, never decides. Every response ends with "verify with the official body."

## Why AI and not a search engine

A static tool cannot cross dozens of eligibility variables with a free-text description. A form cannot grasp a situation that mixes health, finances, and family signals at once. A conversation is less intimidating than a bureaucratic questionnaire. NAWIRI does not automate decisions — it personalizes orientation.

## Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14 (App Router) |
| AI engine | Google Gemini `gemini-flash-lite-latest` via SSE streaming |
| Translation | Google Translate via Cloudflare Worker (Fɔngbe / Wolof / Twi) |
| Map | Leaflet + OpenStreetMap |
| Deployment | Vercel |

## Responsible AI

- Never says "you are eligible" — always "you could be eligible"
- Medical emergency detected → show emergency contacts first
- Zero personal data stored on server
- If uncertain → directs to a human (social worker or official body)
- Tested on 25 real scenarios before release

## Run locally

```bash
git clone https://github.com/Bsh54/NAWIRI.git
cd NAWIRI
npm install
```

Create `.env.local`:
```
GEMINI_API_KEY=your_key_here
```

```bash
npm run dev
```

## Data sources

All program data is verified from official government sources:

- **Benin** — gouv.bj, anps.social.gouv.bj, sgg.gouv.bj, cnss.bj, fnm.bj, sante.gouv.bj
- **Senegal** — sencsu.sn, sante.gouv.sn, senegalservices.sn, devcommunautaire.gouv.sn
- **Ghana** — nhis.gov.gh, presidency.gov.gh, mogcsp.gov.gh, gmtf.gov.gh

Full source list with clickable links: [nawiri.vercel.app/sources](https://nawiri.vercel.app/sources)

## Team

**EVOLUTICS** — Shadrak BESSANH & Franckel GNONLONFIN  
Université d'Abomey-Calavi, Benin  
USAII Global AI Hackathon 2026 — Undergraduate Track — Brief 4 (Public Services)
