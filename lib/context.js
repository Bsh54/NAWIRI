import fs from "node:fs";
import path from "node:path";

// Maps the country chosen in the UI to its data file.
const COUNTRY_FILES = {
  Benin: "BENIN.md",
  Senegal: "SENEGAL.md",
  Ghana: "GHANA.md",
};

export const COUNTRIES = Object.keys(COUNTRY_FILES);
export const LANGUAGES = ["French", "English"];

function readFile(relativePath) {
  return fs.readFileSync(path.join(process.cwd(), relativePath), "utf8");
}

// Builds the full system instruction for one conversation by filling the
// template placeholders in prompts/system-prompt.md with the runtime values.
export function buildSystemInstruction({ country, language }) {
  const safeCountry = COUNTRY_FILES[country] ? country : "Benin";
  const safeLanguage = LANGUAGES.includes(language) ? language : "French";

  const template = readFile("prompts/system-prompt.md");
  const countryData = readFile(`data/${COUNTRY_FILES[safeCountry]}`);

  return template
    .replaceAll("{{COUNTRY}}", safeCountry)
    .replaceAll("{{LANGUAGE}}", safeLanguage)
    .replace("{{COUNTRY_DATA}}", countryData);
}
