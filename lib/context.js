import fs from "node:fs";
import path from "node:path";

// The prompt template and program databases never change at runtime, so read
// each file from disk only once and serve it from memory afterwards. This keeps
// every chat request fast (no repeated synchronous disk I/O on the hot path).
const fileCache = new Map();
function readFile(relativePath) {
  const cached = fileCache.get(relativePath);
  if (cached !== undefined) return cached;
  const content = fs.readFileSync(path.join(process.cwd(), relativePath), "utf8");
  fileCache.set(relativePath, content);
  return content;
}

// Each country's full block = its programs database + its required-documents file,
// so the AI knows both WHAT the user is entitled to and the EXACT papers to bring.
function countryBlock(key) {
  const files = {
    benin:   ["data/benin/BENIN.md",     "data/benin/DOCUMENTS.md"],
    senegal: ["data/senegal/SENEGAL.md", "data/senegal/DOCUMENTS.md"],
    ghana:   ["data/ghana/GHANA.md",     "data/ghana/DOCUMENTS.md"],
  }[key];
  return files.map(readFile).join("\n\n");
}

// A short stand-in used when a country is NOT the one currently active, so the
// system prompt stays small. If the user turns out to be in that country, the
// next request will re-detect it and load the full block.
function omitted(label) {
  return `(${label}'s detailed data is not loaded in this turn to keep the assistant fast. ` +
    `If the user is actually in ${label}, acknowledge it and continue — the full ${label} ` +
    `database will be loaded automatically on the next message.)`;
}

// Detect which supported country the conversation is about.
// Returns "benin" | "senegal" | "ghana" | null (null = none confirmed yet).
// The LATEST mention wins, so if the user switches country mid-conversation,
// we switch with them.
export function detectCountry(messages) {
  const patterns = {
    benin:   /b[ée]nin|b[ée]ninois|cotonou|porto[\s-]?novo|abomey|parakou|bohicon/i,
    senegal: /s[ée]n[ée]gal|s[ée]n[ée]galais|dakar|thi[èe]s|ziguinchor|saint[\s-]?louis|touba/i,
    ghana:   /ghana|ghanaian|ghan[ée]en|accra|kumasi|tamale|takoradi/i,
  };

  let found = null;
  // Walk messages oldest → newest; keep the last country mentioned in any message.
  for (const m of Array.isArray(messages) ? messages : []) {
    const text = String(m?.content || "");
    // Within a single message, the last-occurring country name wins too.
    let bestIdx = -1;
    for (const [key, re] of Object.entries(patterns)) {
      const match = text.match(re);
      if (match && match.index > bestIdx) {
        bestIdx = match.index;
        found = key;
      }
    }
  }
  return found;
}

// Builds the system instruction.
// - country = null  → load all 3 countries (initial state, before confirmation).
// - country = "benin"|"senegal"|"ghana" → load only that country's full data,
//   replacing the others with a short placeholder (faster, lighter).
const promptCache = new Map();
export function buildSystemInstruction(country = null) {
  const active = ["benin", "senegal", "ghana"].includes(country) ? country : null;
  const cacheKey = active || "all";

  const cached = promptCache.get(cacheKey);
  if (cached !== undefined) return cached;

  const template = readFile("prompts/system-prompt.md");

  const benin   = !active || active === "benin"   ? countryBlock("benin")   : omitted("Benin");
  const senegal = !active || active === "senegal" ? countryBlock("senegal") : omitted("Senegal");
  const ghana   = !active || active === "ghana"   ? countryBlock("ghana")   : omitted("Ghana");

  const result = template
    .replace("{{BENIN_DATA}}",   benin)
    .replace("{{SENEGAL_DATA}}", senegal)
    .replace("{{GHANA_DATA}}",   ghana);

  promptCache.set(cacheKey, result);
  return result;
}
