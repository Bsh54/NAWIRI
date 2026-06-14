import fs from "node:fs";
import path from "node:path";

function readFile(relativePath) {
  return fs.readFileSync(path.join(process.cwd(), relativePath), "utf8");
}

// Builds the system instruction with all 3 countries loaded.
// Language and country are detected by the AI from the conversation itself.
export function buildSystemInstruction() {
  const template = readFile("prompts/system-prompt.md");
  return template
    .replace("{{BENIN_DATA}}",   readFile("data/BENIN.md"))
    .replace("{{SENEGAL_DATA}}", readFile("data/SENEGAL.md"))
    .replace("{{GHANA_DATA}}",   readFile("data/GHANA.md"));
}
