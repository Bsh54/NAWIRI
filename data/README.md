# NAWIRI — Programs database & provenance

This folder holds the structured aid-program data that powers the NAWIRI AI engine,
organized **one folder per country** so that every figure can be traced to its source.

## Structure

```
data/
├── README.md            ← this file
├── benin/
│   ├── BENIN.md         ← structured program data (read by the AI engine)
│   ├── SOURCES.md       ← provenance: every official source + verification notes
│   └── documents/       ← primary documents proving the data
│       ├── loi-2015-42.pdf   (Law 2015-42 establishing RAMU)
│       └── loi-2015-42.txt   (text extraction)
├── senegal/
│   ├── SENEGAL.md
│   ├── SOURCES.md
│   └── documents/       ← (web-sourced; add PDFs here as collected)
└── ghana/
    ├── GHANA.md
    ├── SOURCES.md
    └── documents/       ← (web-sourced; add PDFs here as collected)
```

## Rules

- **Each country folder is self-contained**: data + sources + original documents.
- `*.md` data files are the only files loaded at runtime (see `lib/context.js`).
  Documents in `documents/` are **evidence**, not loaded by the app.
- **Nothing is invented.** Every program in a `*.md` file ends with a `Sources:` line,
  and `SOURCES.md` consolidates them plus the key verification notes.
- When new evidence is downloaded (a law, a decree, an official PDF), drop it in the
  relevant `documents/` folder **and** add a row to that country's `SOURCES.md`.
