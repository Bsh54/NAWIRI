import fs from "node:fs";
import path from "node:path";

function readFile(relativePath) {
  return fs.readFileSync(path.join(process.cwd(), relativePath), "utf8");
}

// Builds the system instruction with all 3 countries loaded.
// Language and country are detected by the AI from the conversation itself.
export function buildSystemInstruction() {
  const template = readFile("prompts/system-prompt.md");

  // Each country block = its programs database + its required-documents file,
  // so the AI knows both WHAT the user is entitled to and the EXACT papers to bring.
  const benin   = readFile("data/benin/BENIN.md")     + "\n\n" + readFile("data/benin/DOCUMENTS.md");
  const senegal = readFile("data/senegal/SENEGAL.md") + "\n\n" + readFile("data/senegal/DOCUMENTS.md");
  const ghana   = readFile("data/ghana/GHANA.md")     + "\n\n" + readFile("data/ghana/DOCUMENTS.md");

  return template
    .replace("{{BENIN_DATA}}",   benin)
    .replace("{{SENEGAL_DATA}}", senegal)
    .replace("{{GHANA_DATA}}",   ghana);
}
