# NAWIRI — Description complète du projet

**Équipe** : EVOLUTICS — Shadrak BESSANH & Franckel GNONLONFIN
**Institution** : Université d'Abomey-Calavi, Bénin
**Compétition** : USAII Global AI Hackathon 2026 — Undergraduate Track — Brief 4 (Public Services)
**Code qualificateur** : CO26-A91DB460
**Deadline soumission** : 21 juin 2026, 23h59 ET (objectif : soumettre le 20 juin)
**Dernière mise à jour de ce document** : 15 juin 2026

> Ce fichier décrit **le site / l'application NAWIRI** : ce qu'il est, ce qui a été construit, et la logique de fonctionnement. C'est la description de référence du produit. (Le journal de travail au jour le jour est dans `CLAUDE.md` ; le socle d'origine est `NAWIRI.md`.)

---

## 1. Le problème

Les familles vulnérables d'Afrique de l'Ouest ratent chaque jour l'aide publique à laquelle elles ont légalement droit. Non pas parce qu'elle n'existe pas, mais parce que le système est trop difficile à naviguer. Les programmes existent : assurance maladie, transferts monétaires, soins gratuits, microcrédits. Mais entre l'existence d'un programme et le fait qu'une famille en bénéficie concrètement, il y a un fossé immense fait de jargon administratif, de procédures opaques, de conditions d'éligibilité croisées, de **pièces à fournir mal connues** et de guichets mal identifiés.

Citation clé du brief : *"People often miss help not because it does not exist, but because the system is too hard to navigate."*

---

## 2. La solution : NAWIRI

NAWIRI est un assistant conversationnel alimenté par l'IA (Google Gemini) qui aide les familles à :

1. Découvrir les programmes d'aide publique auxquels elles pourraient avoir droit
2. Comprendre les critères d'éligibilité dans un langage simple
3. Savoir **exactement quels documents préparer** et quelle démarche suivre
4. Obtenir les contacts officiels — et **se rendre physiquement au bon guichet** grâce à une carte intégrée

NAWIRI couvre aujourd'hui trois pays : le **Bénin**, le **Sénégal** et le **Ghana**, pour un total de **25 programmes d'aide publique** documentés, vérifiés et sourcés.

---

## 3. Pourquoi l'IA (critère 30% — le plus important pour les juges)

Un formulaire statique ou un moteur de recherche ne peuvent pas :

- **Comprendre une situation décrite librement** : une mère qui écrit "mon fils de 2 ans est souvent malade et mon mari est menuisier informel" donne des signaux multiples (santé, âge, statut professionnel, niveau de revenus implicite) qu'un formulaire ne peut pas interpréter.
- **Croiser des dizaines de variables d'éligibilité** : chaque programme a des conditions qui se combinent (âge, revenus, commune de résidence, inscription dans un registre, situation familiale). La combinatoire est impossible à gérer statiquement.
- **Poser la bonne question suivante** : NAWIRI identifie ce qui manque dans la description et pose une seule question ciblée, comme le ferait un travailleur social expérimenté.
- **Identifier le vrai point de blocage** : souvent ce n'est pas le programme qui manque, c'est une pièce fondatrice (carte ANIP au Bénin, CNI au Sénégal, Ghana Card au Ghana). NAWIRI le détecte et fait de l'obtention de cette pièce la première étape concrète.

Point crucial pour les juges : l'IA **n'automatise pas une décision administrative**. Elle interprète et oriente. Seul un agent officiel peut valider un dossier. NAWIRI est le pont, pas le décideur.

---

## 4. Architecture technique

### Stack

| Composant | Technologie |
|---|---|
| Framework web | Next.js 14 (App Router) |
| Hébergement | Vercel — déploiement automatique depuis GitHub (`Bsh54/NAWIRI`). Build en ligne, pas en local. |
| Moteur IA | Google Gemini **Flash-Lite** (`gemini-flash-lite-latest`) via API REST, en **streaming SSE** |
| Style | CSS vanilla (variables CSS + inline styles), aucun framework CSS |
| Polices | Space Grotesk (titres) + Inter (corps) via Google Fonts |
| Carte | **Leaflet** + tuiles OpenStreetMap, chargé depuis CDN (aucune clé API requise) |
| Données utilisateur | Aucune base de données — zéro donnée personnelle côté serveur |

Pourquoi Flash-Lite : pas de tokens de "réflexion" (thinking) → réponses plus rapides et bien plus économes sur le quota gratuit, tout en restant complètes et bien structurées en FR/EN.

### Les 4 pièces de l'architecture

**1. La base de données des programmes**
Un dossier par pays dans `data/` (`data/benin/`, `data/senegal/`, `data/ghana/`). Chaque dossier contient :
- le fichier de données (`BENIN.md`, `SENEGAL.md`, `GHANA.md`) — programmes, critères, procédure, contacts officiels ;
- `DOCUMENTS.md` — les **pièces exactes à fournir** par programme + comment obtenir les documents fondateurs ;
- `SOURCES.md` — la provenance de chaque chiffre et règle (traçabilité totale) ;
- `documents/` — les textes primaires téléchargés (ex. la loi 2015-42 au Bénin).
Données publiques et officielles, vérifiées source par source. **Aucune donnée inventée.**

**2. Le moteur conversationnel**
Le system prompt (`prompts/system-prompt.md`) contient les instructions comportementales de NAWIRI. Les données pays y sont injectées à l'exécution. Il est envoyé à chaque appel Gemini via le champ `system_instruction`. Temperature : 0.4 (factuel mais naturel). MaxOutputTokens : 4096.

**3. Le backend serverless**
`app/api/chat/route.js` — route Next.js exécutée côté serveur. Elle détecte le pays de la conversation, assemble le system prompt + les données du bon pays, convertit les rôles (`assistant` → `model` pour Gemini), appelle l'API Gemini en streaming et **renvoie la réponse token par token**. La clé API n'est jamais exposée côté client : elle vit uniquement dans les variables d'environnement Vercel (`GEMINI_API_KEY`).

**4. L'interface**
`app/page.js` = landing page. `app/chat/page.js` = page de conversation avec onglets (chat / carte). `app/chat/InstitutionsMap.js` = carte Leaflet des institutions. `lib/institutions.js` = la liste des 10 institutions géolocalisées.

### Flux d'une conversation

```
Utilisateur écrit un message
       ↓
Frontend (app/chat/page.js)  →  POST /api/chat { messages: [...] } (streaming)
       ↓
Backend serverless (app/api/chat/route.js)
  1. detectCountry(messages)         → quel pays ? (Bénin / Sénégal / Ghana / inconnu)
  2. buildSystemInstruction(country) → system-prompt + données du pays détecté
                                        (tant qu'inconnu : les 3 pays ; sinon : 1 seul)
  3. appel Gemini Flash-Lite en streaming SSE
       ↓
Le texte arrive token par token → renvoyé tel quel au frontend
       ↓
Frontend rend la réponse (markdown : gras, italique, listes)
  + transforme les tokens [[MAP:id|label]] en boutons cliquables → carte
```

### Logique d'optimisation : envoi par pays

Le system prompt complet avec les 3 pays fait ~82 000 caractères. Pour alléger chaque requête :

- **Au début** (pays inconnu) → on envoie les 3 pays.
- **Dès qu'un pays est confirmé** (l'utilisateur mentionne « Cotonou », « Dakar », « je suis au Ghana »…) → on n'envoie plus que **ce pays**. Les deux autres sont remplacés par un court placeholder.
- **Si l'utilisateur change de pays** en cours de conversation → `detectCountry` re-scanne tout l'historique (la **dernière mention gagne**) et bascule automatiquement au message suivant.

Résultat : **−49 %** de taille de prompt pour une conversation localisée (Bénin seul : 42 361 vs 82 689 caractères) → réponses plus rapides et quota préservé.

---

## 5. La base de données des programmes (25 programmes vérifiés)

### Bénin — 12 programmes

1. **AMO / ARCH Assurance Maladie** — Assurance maladie obligatoire pour tous (Décret 2025-672 du 29 oct. 2025). Gratuite pour les pauvres extrêmes (ciblage PMT/RSU via ANPS), cotisation pour les autres (enfants 9 000 FCFA/an, adultes 16 000 FCFA/an, employeur ≥80 %). Prérequis : carte biométrique ANIP.
2. **ARCH Formation** — Formation professionnelle pour artisans et travailleurs vulnérables, via ANPS.
3. **ARCH Crédit** — Financement concessionnel pour artisans ayant suivi la formation ARCH.
4. **ARCH Retraite** — Pension pour indépendants et informels (30 000 FCFA/an).
5. **Microcrédit Alafia (FNM)** — Prêts de 30 000 / 50 000 / 100 000 FCFA à 8 %/an, via SFDs partenaires du FNM.
6. **GBESSOKÉ** — Transferts monétaires pour ménages en extrême pauvreté, ciblage par enquête PMT.
7. **Gratuité césarienne** — Toutes les femmes, structures publiques.
8. **Gratuité paludisme** — Enfants de moins de 5 ans et femmes enceintes, centres de santé publics.
9. **ARV / VIH gratuits** — Pour toutes les personnes vivant avec le VIH.
10. **Campagnes planification familiale et dépistage cancers** — Campagnes périodiques gratuites.
11. **Pension vieillesse CNSS** — Salariés du secteur formel ayant cotisé.
12. **FAABA (SWEDD)** — Transferts monétaires conditionnels pour maintenir les filles de 9-15 ans à l'école (450-600 FCFA/jour, Atacora/Donga/Borgou/Alibori).

Note critique : la **dialyse et l'insuline ne sont PAS gratuites** au Bénin. NAWIRI ne crée jamais ce faux espoir.

### Sénégal — 7 programmes

1. **CMU — Mutuelles de santé communautaires** — 7 000 FCFA/an (3 500 subventionné, gratuit pour indigents via RNU). Gérée par SEN-CSU (ex-ANACMU, décret 2024-832).
2. **Gratuité soins enfants moins de 5 ans** — Structures publiques.
3. **Plan Sésame** — Soins gratuits pour les 60 ans et plus.
4. **Gratuité dialyse** — Insuffisance rénale chronique, sur prescription néphrologue + liste d'attente.
5. **Gratuité césarienne** — Toutes les femmes, structures publiques.
6. **PNBSF — Bourse de Sécurité Familiale** — 35 000 FCFA/trimestre (140 000 FCFA/an depuis déc. 2022). Ciblage via RNU.
7. **Carte d'Égalité des Chances** — Accès aux droits pour personnes en situation de handicap.

Outil transversal : le **RNU** (Registre National Unique) est la porte d'entrée de la plupart des programmes ciblés.

### Ghana — 6 programmes

1. **NHIS — National Health Insurance Scheme** — Couvre ~95 % des maladies. Gratuit (exemptés) : moins de 18 ans, 70 ans et plus, femmes enceintes, indigents, cotisants/pensionnés SSNIT, bénéficiaires LEAP. Informels : prime GH¢7-42/an + GH¢6 carte. Renouvellement *929# / MyNHIS. Prérequis : Ghana Card.
2. **Free Maternal Health Care (sous NHIS)** — 6 visites prénatales, accouchement gratuit (y compris césarienne), 2 visites postnatales.
3. **Free Dialysis (sous NHIS, depuis le 1er déc. 2024)** — Tous les membres NHIS avec maladie rénale, 20 hôpitaux désignés.
4. **LEAP — Livelihood Empowerment Against Poverty** — Transferts bimensuels GH¢256-424, ciblage PMT, inclut l'adhésion NHIS gratuite (élargi à 400 000 ménages dès juillet 2025).
5. **Free Primary Healthcare (FPHC)** — NOUVEAU 2026 : soins primaires gratuits pour tous les résidents (Ghana Card pour y accéder), Phase 1 = 150 districts.
6. **Ghana Medical Trust Fund (« MahamaCares »)** — NOUVEAU 2025-2026 : troisième pilier pour les maladies chroniques non transmissibles (cancer, hypertension, diabète, AVC, insuffisance rénale).

---

## 6. Le system prompt — le cerveau de NAWIRI

Le system prompt (`prompts/system-prompt.md`) est le fichier le plus important du projet. Il définit :

**Détection automatique de langue** : NAWIRI détecte la langue du premier message et répond dans cette langue toute la conversation. Aucun sélecteur.

**Détection du pays** : si l'utilisateur ne mentionne pas son pays, NAWIRI pose cette unique question en premier. Une fois connu : données de ce pays uniquement ; si pays non couvert, il l'explique poliment et oriente vers les services sociaux locaux.

**Protocole d'urgence** : avant tout, NAWIRI scanne chaque message pour détecter une urgence médicale (convulsions, perte de conscience, difficultés respiratoires, bébé très malade). Si urgence : orienter immédiatement vers le centre de santé le plus proche, avant toute information sur les programmes.

**Boucle conversationnelle** : extraire les infos déjà données, identifier ce qui manque, poser UNE seule question à la fois, s'arrêter dès qu'on a assez pour recommander.

**Format de réponse** : pour chaque programme qui correspond — nom, pourquoi ça correspond, ce que ça donne concrètement, **documents à préparer (pièces exactes issues de `DOCUMENTS.md`)**, prochaine étape, contact officiel. Si une pièce fondatrice manque (carte ANIP / CNI / Ghana Card, ou acte de naissance → jugement supplétif), l'obtenir devient la première étape.

**Le lien-carte (section 7B du prompt)** : NAWIRI peut émettre un token `[[MAP:<id>|<label>]]` pour proposer à l'utilisateur d'ouvrir la carte directement sur une institution. Il l'offre quand l'utilisateur le demande, veut s'y rendre, ou après avoir parlé d'une institution précise (max 1-2 liens par réponse).

**Garde-fous stricts** :
- Jamais "vous êtes éligible" : toujours "vous pourriez être éligible"
- Toujours terminer par "vérifiez auprès de l'organisme officiel"
- Jamais de conseil médical ou de diagnostic
- Jamais inventer un programme, un montant ou un contact
- Dialyse et insuline : ne JAMAIS dire que c'est gratuit au Bénin

---

## 7. L'interface utilisateur

### Landing page (`/`)

Page d'accueil Minimal Single Column : navigation sticky (logo + pays couverts + switcher FR/EN), hero, "How it works" (4 étapes), "Why AI and not a search engine" (3 cartes), "Programs covered" (3 colonnes), footer.

### Page de conversation (`/chat`)

Interface à onglets :
- **Onglet Chat** : historique des messages + champ de saisie. État vide = avatar "N" + suggestions cliquables FR/EN. Rendu markdown des réponses (gras, italique, listes) et boutons-carte cliquables issus des tokens `[[MAP:...]]`.
- **Onglet Carte** : carte **Leaflet** des institutions des 3 pays. 10 institutions géolocalisées avec marqueurs terracotta ; au clic d'un bouton-carte dans le chat, on bascule sur cet onglet et la carte **vole** (flyTo) jusqu'à l'institution et ouvre sa popup (nom, rôle, adresse, téléphone, site, lien Google Maps).

Les 10 institutions (`lib/institutions.js`) : Bénin → ANPS, CNSS, FNM, ANIP, Ministère Santé ; Sénégal → SEN-CSU, Ministère Santé, Ministère Famille ; Ghana → NHIA, MoGCSP. Chacune a un `id` stable que l'IA cible via `[[MAP:id|label]]`.

### Charte graphique

| Élément | Valeur |
|---|---|
| Fond principal | `#F5F2EB` (sable chaud) |
| Fond cartes | `#FFFFFF` |
| Couleur primaire | `#C05A3C` (terracotta) |
| Couleur secondaire | `#4A7C59` (vert sauge) |
| Texte principal | `#1A1A1A` (charbon) |
| Police titres | Space Grotesk (700) |
| Police corps | Inter (400-600) |

---

## 8. Sécurité, confidentialité et robustesse

- La clé API Gemini est stockée **uniquement** dans les variables d'environnement Vercel (`GEMINI_API_KEY`). Jamais dans le code ni dans un fichier commité. `.gitignore` exclut `.env*.local`, `CLAUDE.md` et les notes privées.
- **Aucune donnée personnelle** côté serveur. Pas de base de données utilisateur, pas de compte requis, pas d'historique conservé entre sessions. C'est aussi un argument de confidentialité fort pour des familles vulnérables.
- **Gestion d'erreurs invisible** : aucun message d'erreur technique n'est affiché ni en console ni dans l'interface. En cas de problème, NAWIRI affiche un message neutre unique ("I could not answer just now…") ; les logs serveur restent génériques et minimaux.
- **Garde-fous IA permissifs côté sécurité Gemini** : les filtres `safetySettings` sont sur `BLOCK_NONE` pour éviter les blocages parasites sur des messages parlant de maladie, d'argent ou d'enfants (contenu légitime d'orientation sociale).

---

## 9. Structure des fichiers du projet

```
NAWIRI/
├── app/
│   ├── api/chat/route.js          Backend serverless — détection pays + Gemini streaming
│   ├── chat/
│   │   ├── page.js                Page de conversation (onglets chat / carte)
│   │   └── InstitutionsMap.js     Carte Leaflet des institutions (flyTo sur lien-carte)
│   ├── globals.css                Variables CSS + polices + scrollbar
│   ├── layout.js                  Layout racine Next.js
│   └── page.js                    Landing page
├── data/
│   ├── benin/    BENIN.md (12 prog.) + DOCUMENTS.md + SOURCES.md + documents/(loi-2015-42)
│   ├── senegal/  SENEGAL.md (7 prog.) + DOCUMENTS.md + SOURCES.md + documents/
│   └── ghana/    GHANA.md (6 prog.)   + DOCUMENTS.md + SOURCES.md + documents/
├── lib/
│   ├── context.js                 detectCountry() + buildSystemInstruction()
│   └── institutions.js            10 institutions géolocalisées (id, coords, contacts)
├── prompts/
│   └── system-prompt.md           Le cerveau de NAWIRI (instructions + lien-carte + few-shot)
├── next.config.mjs                Bundling de data/ et prompts/ pour Vercel
├── package.json                   next, react, react-dom
├── .env.local.example             Template pour la clé Gemini (jamais la vraie clé)
└── DEPLOY.md                      Guide de déploiement pas à pas
```

---

## 10. Ce que NAWIRI n'est pas

- Pas un annuaire ou une liste de liens
- Pas un outil de diagnostic médical
- Pas une garantie d'éligibilité
- Pas exhaustif : 3 pays choisis en profondeur plutôt qu'une liste superficielle de 50 pays

---

## 11. Critères de notation et positionnement

| Critère | Poids | Positionnement NAWIRI |
|---|---|---|
| Compréhension du problème | 20% | Le brief est cité directement. Le problème : pas le manque d'aide, mais le manque de navigation. |
| Raisonnement IA | 30% | L'IA interprète des situations libres, croise des variables, pose des questions ciblées, repère le vrai point de blocage (pièce manquante). Pas un formulaire amélioré. |
| Architecture | 25% | 4 pièces claires (BDD + system prompt + backend serverless + interface), + carte des institutions et envoi optimisé par pays. |
| Impact / valeur décisionnelle | 15% | La décision aidée est concrète : "est-ce que j'emmène mon enfant malade chez le médecin aujourd'hui ?" et "quels papiers dois-je apporter, et où ?" |
| Responsabilité IA | 10% | Langage "pourriez", renvoi systématique vers l'officiel, jamais de garantie, human-in-the-loop explicite, pas de faux espoir (dialyse Bénin). |

---

## 12. Historique des décisions techniques

| Date | Décision | Raison |
|---|---|---|
| 14 juin | Moteur IA : Gemini (pas Claude) | L'équipe n'a pas de clé Claude. Gemini gratuit, rapide, bon FR/EN. |
| 14 juin | Pas de RAG | Les données tiennent dans le contexte de Gemini. Injection directe = plus simple, plus explicable. |
| 14 juin | Données en anglais, discussions en français | Cohérence des fichiers data. |
| 14 juin | Renommage AidePath → NAWIRI | Décision d'équipe. |
| 14 juin | Pas d'authentification | Friction inutile en situation de stress ; argument de confidentialité. |
| 14 juin | Détection auto langue/pays | Expérience plus naturelle, plus proche d'une vraie conversation. |
| 14 juin | Charte sable / terracotta / sauge, Space Grotesk | Design sobre et chaleureux. |
| 15 juin | Modèle → `gemini-flash-lite-latest` en streaming | Pas de tokens "thinking" → plus rapide, plus léger sur le quota ; réponses au fil de l'eau. |
| 15 juin | Réorganisation `data/` par pays + `DOCUMENTS.md` + `SOURCES.md` | Pièces à fournir = vrai différenciateur ; traçabilité des sources. |
| 15 juin | Carte Leaflet + institutions + lien-carte `[[MAP:id\|label]]` piloté par l'IA | Passer de "qui contacter" à "où aller exactement". |
| 15 juin | Envoi du prompt limité au pays confirmé (auto-switch) | −49 % de taille de prompt → plus rapide, quota préservé. |
| 15 juin | Erreurs invisibles (SOFT_ERROR) | Ne jamais exposer d'erreur technique à un utilisateur vulnérable. |
