```
███╗   ██╗ █████╗ ██╗    ██╗██╗██████╗ ██╗
████╗  ██║██╔══██╗██║    ██║██║██╔══██╗██║
██╔██╗ ██║███████║██║ █╗ ██║██║██████╔╝██║
██║╚██╗██║██╔══██║██║███╗██║██║██╔══██╗██║
██║ ╚████║██║  ██║╚███╔███╔╝██║██║  ██║██║
╚═╝  ╚═══╝╚═╝  ╚═╝ ╚══╝╚══╝ ╚═╝╚═╝  ╚═╝╚═╝
```

**AI-powered social orientation for West Africa**  
Benin · Senegal · Ghana — 25 programs — 5 languages

---

## What it does

Families across West Africa miss public aid they are legally entitled to — not because it doesn't exist, but because the system is too hard to navigate.

NAWIRI is a conversational AI assistant that bridges that gap. You describe your situation in plain words — English, French, Fɔngbe, Wolof, or Twi — and NAWIRI asks one question at a time to find the programs you qualify for, the exact documents to bring, and the official contact to call.

---

## Live demo

**[nawiri.vercel.app](https://nawiri.vercel.app)**

---

## Programs covered

| Country | Programs |
|---------|----------|
| 🇧🇯 Benin | AMO/ARCH health insurance, Alafia microcredit, GBESSOKÉ cash transfers, free cesarean, free malaria care, free ARVs, CNSS pension, FAABA schoolgirl grants + more |
| 🇸🇳 Senegal | CMU health mutuals, free care under 5, Plan Sésame (60+), PNBSF family grant, free cesarean, free dialysis, Equal Opportunity Card |
| 🇬🇭 Ghana | NHIS, Free Primary Healthcare (April 2026), free maternal care, free dialysis, MahamaCares, LEAP cash transfer |

---

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

---

## Why AI and not a search engine

A static tool cannot cross dozens of eligibility variables with a free-text description. A form cannot grasp a situation that mixes health, finances, and family signals at once. A conversation is less intimidating than a bureaucratic questionnaire. NAWIRI does not automate decisions — it personalizes orientation.

---

## Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14 (App Router) |
| Styling | Tailwind-inspired inline styles, Space Grotesk + Lexend |
| AI engine | Google Gemini `gemini-flash-lite-latest` via SSE streaming |
| Translation | Google Translate via Cloudflare Worker (Fɔngbe / Wolof / Twi) |
| Map | Leaflet + OpenStreetMap |
| Deployment | Vercel |

---

## Responsible AI

- Never says "you are eligible" — always "you could be eligible"
- Medical emergency detected → show emergency contacts first
- Zero personal data stored on server
- If uncertain → directs to a human (social worker or official body)
- Tested on 25 real scenarios before release

---

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

> The app is designed to build and deploy on Vercel. No local build is required for production.

---

## Data sources

All program data is verified from official government sources:

- **Benin** — gouv.bj, anps.social.gouv.bj, sgg.gouv.bj, cnss.bj, fnm.bj, sante.gouv.bj
- **Senegal** — sencsu.sn, sante.gouv.sn, senegalservices.sn, devcommunautaire.gouv.sn
- **Ghana** — nhis.gov.gh, presidency.gov.gh, mogcsp.gov.gh, gmtf.gov.gh

See [Sources](/sources) on the live app for every URL.

---

## Team

**EVOLUTICS** — Shadrak BESSANH & Franckel GNONLONFIN  
Université d'Abomey-Calavi, Benin  
USAII Global AI Hackathon 2026 — Undergraduate Track — Brief 4 (Public Services)
