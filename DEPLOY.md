# Déployer NAWIRI sur Vercel — guide pas à pas

NAWIRI est une app **Next.js**. Le moteur IA est **Google Gemini** (`gemini-flash-latest`).
La clé API reste **uniquement côté serveur** (variable d'environnement) — jamais dans le code public.

---

## 0. ⚠️ Sécurité d'abord
La clé qui était dans `Nouveau document texte.txt` est **exposée** → **régénère-en une nouvelle**
sur https://aistudio.google.com/apikey et garde-la secrète. Ne la mets jamais dans un fichier suivi par Git.

---

## 1. Mettre le code sur GitHub
Dans le dossier du projet (`NAWIRI`) :

```bash
git init
git add .
git commit -m "NAWIRI — étape 2 : conversation IA (Gemini) + backend"
```

Crée un dépôt **privé** sur GitHub (https://github.com/new), puis :

```bash
git remote add origin https://github.com/<ton-compte>/nawiri.git
git branch -M main
git push -u origin main
```

> Le fichier `.gitignore` empêche déjà d'envoyer `.env.local` et `node_modules`. ✅

---

## 2. Importer dans Vercel
1. Va sur https://vercel.com → **Add New… → Project**.
2. Connecte ton compte GitHub et choisis le dépôt `nawiri`.
3. Vercel détecte Next.js automatiquement — ne change rien.

## 3. Ajouter la clé API (étape CRUCIALE)
Avant de cliquer sur **Deploy**, ouvre **Environment Variables** et ajoute :

| Name | Value |
|---|---|
| `GEMINI_API_KEY` | *(ta nouvelle clé Gemini)* |

Puis clique **Deploy**. Au bout d'une minute, tu as un lien public `https://nawiri-xxx.vercel.app`.

---

## 4. Tester en local (optionnel)
Si tu veux aussi le lancer sur ton PC :

```bash
npm install
# crée le fichier .env.local à partir de l'exemple, et mets-y ta clé
npm run dev
```
Puis ouvre http://localhost:3000

---

## 5. Mettre à jour le site
À chaque fois que tu modifies le code :

```bash
git add .
git commit -m "ta modification"
git push
```
Vercel redéploie automatiquement. ✅

---

## Structure du projet
- `app/page.js` — l'interface de chat (sera embellie à l'étape 3)
- `app/api/chat/route.js` — le backend qui appelle Gemini (cache la clé)
- `lib/context.js` — assemble le system prompt + les données du pays choisi
- `prompts/system-prompt.md` — le « cerveau » (rôle, garde-fous, format)
- `data/benin/BENIN.md` / `senegal/SENEGAL.md` / `ghana/GHANA.md` — la base des programmes (+ `SOURCES.md` et `documents/` par pays)
