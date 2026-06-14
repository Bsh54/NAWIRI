# NAWIRI — Description complète du projet

**Équipe** : EVOLUTICS — Shadrak BESSANH & Franckel GNONLONFIN  
**Institution** : Université d'Abomey-Calavi, Bénin  
**Compétition** : USAII Global AI Hackathon 2026 — Undergraduate Track — Brief 4 (Public Services)  
**Code qualificateur** : CO26-A91DB460  
**Deadline soumission** : 21 juin 2026, 23h59 ET  

---

## 1. Le problème

Les familles vulnérables d'Afrique de l'Ouest ratent chaque jour l'aide publique à laquelle elles ont légalement droit. Non pas parce qu'elle n'existe pas, mais parce que le système est trop difficile à naviguer. Les programmes existent : assurance maladie, transferts monétaires, soins gratuits, microcrédits. Mais entre l'existence d'un programme et le fait qu'une famille en bénéficie concrètement, il y a un fossé immense fait de jargon administratif, de procédures opaques, de conditions d'éligibilité croisées et de guichets mal identifiés.

Citation clé du brief : *"People often miss help not because it does not exist, but because the system is too hard to navigate."*

---

## 2. La solution : NAWIRI

NAWIRI est un assistant conversationnel alimenté par l'IA (Google Gemini) qui aide les familles à :

1. Découvrir les programmes d'aide publique auxquels elles pourraient avoir droit
2. Comprendre les critères d'éligibilité dans un langage simple
3. Savoir exactement quels documents préparer et quelle démarche suivre
4. Obtenir les contacts officiels pour vérifier et s'inscrire

NAWIRI couvre aujourd'hui trois pays : le **Bénin**, le **Sénégal** et le **Ghana**, pour un total de **22 programmes d'aide publique** documentés et vérifiés.

---

## 3. Pourquoi l'IA (critère 30% — le plus important pour les juges)

Un formulaire statique ou un moteur de recherche ne peuvent pas :

- **Comprendre une situation décrite librement** : une mère qui écrit "mon fils de 2 ans est souvent malade et mon mari est menuisier informel" donne des signaux multiples (santé, âge, statut professionnel, niveau de revenus implicite) qu'un formulaire ne peut pas interpréter.
- **Croiser des dizaines de variables d'éligibilité** : chaque programme a des conditions qui se combinent (âge, revenus, commune de résidence, inscription dans un registre, situation familiale). La combinatoire est impossible à gérer statiquement.
- **Poser la bonne question suivante** : NAWIRI identifie ce qui manque dans la description et pose une seule question ciblée, comme le ferait un travailleur social expérimenté.

Point crucial pour les juges : l'IA **n'automatise pas une décision administrative**. Elle interprète et oriente. Seul un agent officiel peut valider un dossier. NAWIRI est le pont, pas le décideur.

---

## 4. Architecture technique

### Stack

| Composant | Technologie |
|---|---|
| Framework web | Next.js 14 (App Router) |
| Hébergement | Vercel (déploiement automatique depuis GitHub) |
| Moteur IA | Google Gemini Flash (`gemini-flash-latest`) via API REST |
| Style | CSS vanilla (variables CSS, inline styles) |
| Polices | Space Grotesk (titres) + Inter (corps) via Google Fonts |
| Carte | OpenStreetMap via iframe (aucune clé API requise) |
| Données utilisateur | Aucune base de données — zéro donnée personnelle côté serveur |

### Les 4 pièces de l'architecture

**1. La base de données des programmes**  
Trois fichiers Markdown dans `data/` : `BENIN.md`, `SENEGAL.md`, `GHANA.md`. Chaque fichier contient les programmes du pays avec leurs critères d'éligibilité, les documents requis, la procédure exacte et les contacts officiels. Ces données sont publiques et officielles, vérifiées source par source. Aucune donnée inventée.

**2. Le moteur conversationnel**  
Le system prompt (`prompts/system-prompt.md`) contient les instructions comportementales de NAWIRI et les données des 3 pays intégrées. Il est injecté à chaque appel Gemini via le champ `system_instruction`. Temperature : 0.4 (factuel mais naturel). MaxOutputTokens : 2048.

**3. Le backend serverless**  
`app/api/chat/route.js` — route Next.js exécutée côté serveur. Elle assemble le system prompt + les données des 3 pays, convertit les rôles (`assistant` → `model` pour Gemini) et appelle l'API Gemini. La clé API n'est jamais exposée côté client : elle vit uniquement dans les variables d'environnement Vercel (`GEMINI_API_KEY`).

**4. L'interface**  
`app/chat/page.js` — page de conversation. `app/page.js` — landing page. Aucune dépendance UI externe, aucun framework CSS. Tout est en CSS vanilla avec des variables CSS pour la cohérence visuelle.

### Flux d'une conversation

```
Utilisateur écrit un message
       ↓
Frontend (app/chat/page.js)
POST /api/chat { messages: [...] }
       ↓
Backend serverless (app/api/chat/route.js)
Lit system-prompt.md + BENIN.md + SENEGAL.md + GHANA.md
Injecte tout dans system_instruction
Appelle Gemini Flash
       ↓
Gemini génère la réponse
       ↓
Backend retourne { reply: "..." }
       ↓
Frontend rend la réponse avec rendu markdown
(gras, italique, listes à puces)
```

---

## 5. La base de données des programmes (22 programmes vérifiés)

### Bénin — 11 programmes

1. **AMO / ARCH Assurance Maladie** — Assurance maladie obligatoire pour tous. Gratuite pour les pauvres extrêmes (ciblage PMT/RSU via ANPS), cotisation pour les autres (enfants 9 000 FCFA/an, adultes 16 000 FCFA/an, employeur paie 80%). Gérée par l'ANPS. Prérequis : carte biométrique ANIP.
2. **ARCH Formation** — Formation professionnelle pour artisans et travailleurs vulnérables. Via ANPS.
3. **ARCH Crédit** — Financement concessionnel pour artisans ayant suivi la formation ARCH.
4. **ARCH Retraite** — Pension pour indépendants et informels (30 000 FCFA/an, État contribue 20%).
5. **Microcrédit Alafia (FNM)** — Prêts de 30 000, 50 000 ou 100 000 FCFA à 8%/an pour femmes et entrepreneurs vulnérables, via SFDs partenaires du FNM.
6. **GBESSOKÉ** — Transferts monétaires non remboursables pendant 9 mois pour ménages en extrême pauvreté, ciblage par enquête PMT.
7. **Gratuité césarienne** — Toutes les femmes, dans toute structure publique, depuis 2005.
8. **Gratuité paludisme enfants moins de 5 ans et femmes enceintes** — En vigueur depuis 2007 dans les centres de santé publics.
9. **ARV / VIH gratuits** — Pour toutes les personnes vivant avec le VIH, depuis 2004.
10. **Campagnes planification familiale et dépistage cancers** — Campagnes périodiques gratuites pour les femmes.
11. **Pension vieillesse CNSS** — Pour les salariés du secteur formel ayant cotisé.

Note critique : la dialyse et l'insuline ne sont PAS gratuites au Bénin. NAWIRI ne crée jamais ce faux espoir.

### Sénégal — 7 programmes

1. **CMU — Mutuelles de santé communautaires** — 7 000 FCFA/an (3 500 FCFA subventionné par l'État, gratuit pour indigents via RNU). Couvre 80% des soins en structures publiques, 50% en pharmacie privée. Gérée par SEN-CSU (ex-ANACMU, rebaptisée par décret 2024-832).
2. **Gratuité soins enfants moins de 5 ans** — Dans toutes les structures publiques depuis octobre 2013. Sur présentation d'un document prouvant l'âge.
3. **Plan Sésame** — Soins gratuits pour les personnes de 60 ans et plus dans les structures publiques.
4. **Gratuité dialyse** — Pour les patients avec insuffisance rénale chronique, sur prescription néphrologue + liste d'attente.
5. **Gratuité césarienne** — Toutes les femmes en structures publiques.
6. **PNBSF — Bourse de Sécurité Familiale** — 35 000 FCFA/trimestre (140 000 FCFA/an, relevé de 100 000 en décembre 2022) pour ménages en extrême pauvreté avec enfants de 6 à 12 ans. Ciblage via RNU.
7. **Carte d'Égalité des Chances** — Accès aux droits pour personnes en situation de handicap (santé, réadaptation, aide technique, emploi, transport).

Outil transversal : le **RNU** (Registre National Unique) est la porte d'entrée de la plupart des programmes ciblés. Première étape pour les familles vulnérables : s'inscrire en mairie ou au service départemental de l'action sociale.

### Ghana — 4 programmes

1. **NHIS — National Health Insurance Scheme** — Couvre environ 95% des maladies. Gratuit (exemptés) : enfants de moins de 18 ans, personnes de 70 ans et plus, femmes enceintes, indigents, cotisants et pensionnés SSNIT, bénéficiaires LEAP. Informels : prime de GH¢7 à 42/an + frais de carte GH¢6. Renouvellement via USSD *929# ou application MyNHIS. Prérequis : Ghana Card.
2. **Free Maternal Health Care** — Sous NHIS : 6 visites prénatales, accouchement gratuit (y compris césarienne), 2 visites postnatales. La femme est couverte 1 an et le nouveau-né 3 mois.
3. **Free Dialysis (depuis le 1er décembre 2024)** — Pour tous les membres actifs du NHIS avec maladie rénale. Déployé dans 20 hôpitaux désignés. Nécessite une adhésion NHIS active et un diagnostic/référence de néphrologue.
4. **LEAP — Livelihood Empowerment Against Poverty** — Transferts bimensuels de GH¢256 à 424 selon le nombre de membres. Pour ménages très pauvres avec : personne de 65+ sans soutien, handicap sévère, enfants orphelins ou vulnérables, mère avec nourrisson. Ciblage par PMT. Inclut l'inscription NHIS gratuite.

---

## 6. Le system prompt — le cerveau de NAWIRI

Le system prompt (`prompts/system-prompt.md`) est le fichier le plus important du projet. Il définit :

**Détection automatique de langue** : NAWIRI détecte la langue de l'utilisateur depuis son premier message et répond dans cette langue tout au long de la conversation. Aucun sélecteur, aucune question sur la langue.

**Détection du pays** : Si l'utilisateur ne mentionne pas son pays dans son premier message, NAWIRI pose cette unique question en premier. Une fois le pays connu :
- Si Bénin, Sénégal ou Ghana : NAWIRI utilise les données de ce pays uniquement.
- Si autre pays : NAWIRI explique poliment qu'il ne couvre pas encore ce pays et oriente vers les services sociaux locaux.

**Protocole d'urgence** : Avant tout, NAWIRI scanne chaque message pour détecter une urgence médicale (convulsions, perte de conscience, difficultés respiratoires, bébé très malade). Si urgence détectée : orienter immédiatement vers le centre de santé le plus proche, avant toute information sur les programmes.

**Boucle conversationnelle** : extraire les informations déjà données, identifier ce qui manque, poser UNE seule question à la fois, s'arrêter dès qu'on a assez pour recommander.

**Format de réponse** : pour chaque programme qui correspond, NAWIRI donne un plan structuré : nom du programme, pourquoi ça correspond à la situation, ce que ça donne concrètement, documents à préparer, prochaine étape, contact officiel.

**Garde-fous stricts** :
- Jamais "vous êtes éligible" : toujours "vous pourriez être éligible"
- Toujours terminer par "vérifiez auprès de l'organisme officiel"
- Jamais de conseil médical ou de diagnostic
- Jamais inventer un programme, un montant ou un contact
- Dialyse et insuline : ne JAMAIS dire que c'est gratuit au Bénin

---

## 7. L'interface utilisateur

### Landing page (`/`)

Page d'accueil Minimal Single Column avec :
- Navigation sticky avec logo NAWIRI + indicateur des pays couverts + switcher FR/EN (pour la langue de l'interface uniquement)
- Hero deux colonnes : texte de présentation à gauche, carte d'appel à l'action à droite
- Section "How it works" : 4 étapes numérotées (01 à 04)
- Section "Why AI and not a search engine" : 3 cartes avec argument développé
- Section "Programs covered" : 3 colonnes (Bénin, Sénégal, Ghana) avec liste des programmes
- Footer

### Page de conversation (`/chat`)

Interface de conversation en deux colonnes :
- **Colonne gauche** (300px) : carte OpenStreetMap de l'Afrique de l'Ouest via iframe. Affichée en permanence pour contextualiser géographiquement. Masquée sur mobile.
- **Colonne droite** : interface de conversation. En haut : barre de navigation avec logo (lien retour landing) et bouton "New conversation". Au centre : historique des messages. En bas : champ de saisie + bouton d'envoi.

État vide de la conversation : avatar "N" + titre + 3 suggestions cliquables en anglais et français pour guider les nouveaux utilisateurs.

Rendu markdown des réponses de l'IA : `**gras**`, `*italique*`, listes à puces (`- item` ou `▸ item`) sont rendus visuellement dans les bulles de réponse.

Mobile : la carte est masquée, l'interface de chat prend tout l'écran.

### Charte graphique (inspirée du projet aural-oss)

| Élément | Valeur |
|---|---|
| Fond principal | `#F5F2EB` (sable chaud) |
| Fond cartes | `#FFFFFF` |
| Couleur primaire | `#C05A3C` (terracotta) |
| Couleur secondaire | `#4A7C59` (vert sauge) |
| Texte principal | `#1A1A1A` (charbon) |
| Texte secondaire | `#555555` |
| Texte atténué | `#888888` |
| Bordures | `#D1CCC4` |
| Police titres | Space Grotesk (700) |
| Police corps | Inter (400, 500, 600) |
| Border radius | 8px (standard), 14px (cartes), 20px (modales) |

---

## 8. Sécurité et confidentialité

- La clé API Gemini est stockée uniquement dans les variables d'environnement Vercel (`GEMINI_API_KEY`). Elle n'est jamais dans le code source ni dans aucun fichier commité.
- Aucune donnée personnelle n'est stockée côté serveur. NAWIRI ne dispose d'aucune base de données utilisateur.
- Aucun compte requis. L'utilisateur arrive et parle directement.
- L'historique de conversation n'est pas conservé entre les sessions.

---

## 9. Structure des fichiers du projet

```
NAWIRI/
├── app/
│   ├── api/chat/route.js      Backend serverless — appelle Gemini, cache la cle API
│   ├── chat/page.js           Page de conversation
│   ├── globals.css            Variables CSS + polices + animations
│   ├── layout.js              Layout racine Next.js
│   └── page.js                Landing page
├── data/
│   ├── BENIN.md               11 programmes documentés, vérifiés, sourcés
│   ├── SENEGAL.md             7 programmes documentés, vérifiés, sourcés
│   └── GHANA.md               4 programmes documentés, vérifiés, sourcés
├── lib/
│   └── context.js             Assemble system prompt + données des 3 pays
├── prompts/
│   └── system-prompt.md       Le cerveau de NAWIRI (instructions + données intégrées)
├── next.config.mjs            Configuration Next.js (bundling data/ et prompts/ pour Vercel)
├── package.json               Dépendances (next, react, react-dom uniquement)
├── .env.local.example         Template pour la clé Gemini (jamais la vraie clé)
└── DEPLOY.md                  Guide de déploiement pas à pas
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
| Compréhension du problème | 20% | Le brief est cité directement. Le problème est précis : pas le manque d'aide, mais le manque de navigation. |
| Raisonnement IA | 30% | L'IA interprète des situations libres, croise des variables et pose des questions ciblées. Pas un formulaire amélioré. |
| Architecture | 25% | 4 pièces claires : base de données, system prompt, backend serverless, interface. Chaque pièce a un rôle précis. |
| Impact / valeur décisionnelle | 15% | La décision aidée est concrète : "est-ce que j'emmène mon enfant malade chez le médecin aujourd'hui ?" |
| Responsabilité IA | 10% | Langage "pourriez", toujours renvoyer vers l'officiel, jamais de garantie, human-in-the-loop explicite. |

---

## 12. Historique des décisions techniques

| Date | Décision | Raison |
|---|---|---|
| 14 juin | Moteur IA : Gemini Flash (pas Claude) | L'équipe n'a pas de clé Claude. Gemini gratuit, rapide, bon FR/EN. |
| 14 juin | Pas de RAG | Les données (22 programmes) tiennent dans le contexte de Gemini. Injection directe = plus simple, plus explicable aux juges. |
| 14 juin | Données en anglais, discussions en français | Convention d'équipe pour la cohérence des fichiers data. |
| 14 juin | Renommage AidePath → NAWIRI | Décision d'équipe. NAWIRI ne plus utiliser "AidePath". |
| 14 juin | Pas d'authentification | Friction inutile pour des familles vulnérables en situation de stress. Contradictoire avec le brief. |
| 14 juin | Détection automatique langue/pays | Supprimer les sélecteurs = expérience plus naturelle, plus proche d'une vraie conversation. |
| 14 juin | Charte graphique aural-oss | Palette sable/terracotta/sauge, Space Grotesk, over design chirurgical sobre. |
