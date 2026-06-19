import fs from "node:fs";
import path from "node:path";

const fileCache = new Map();
function readFile(relativePath) {
  const cached = fileCache.get(relativePath);
  if (cached !== undefined) return cached;
  const content = fs.readFileSync(path.join(process.cwd(), relativePath), "utf8");
  fileCache.set(relativePath, content);
  return content;
}

function countryBlock(key) {
  const files = {
    benin:   ["data/benin/BENIN.md",     "data/benin/DOCUMENTS.md"],
    senegal: ["data/senegal/SENEGAL.md", "data/senegal/DOCUMENTS.md"],
    ghana:   ["data/ghana/GHANA.md",     "data/ghana/DOCUMENTS.md"],
  }[key];
  return files.map(readFile).join("\n\n");
}

function omitted(label) {
  return `(${label}'s detailed data is not loaded in this turn to keep the assistant fast. ` +
    `If the user is actually in ${label}, acknowledge it and continue — the full ${label} ` +
    `database will be loaded automatically on the next message.)`;
}

export function detectCountry(messages) {
  const patterns = {
    benin:   /b[ée]nin|b[ée]ninois|cotonou|porto[\s-]?novo|abomey|parakou|bohicon/i,
    senegal: /s[ée]n[ée]gal|s[ée]n[ée]galais|dakar|thi[èe]s|ziguinchor|saint[\s-]?louis|touba/i,
    ghana:   /ghana|ghanaian|ghan[ée]en|accra|kumasi|tamale|takoradi/i,
  };

  let found = null;
  for (const m of Array.isArray(messages) ? messages : []) {
    const text = String(m?.content || "");
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
