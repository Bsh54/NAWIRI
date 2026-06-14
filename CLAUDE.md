# CLAUDE.md — Mémoire du projet NAWIRI

> Ce fichier est ma mémoire de travail. `NAWIRI.md` est le **socle** (la source de vérité complète).
> Je le mets à jour au fur et à mesure que le projet avance.

---

## 1. IDENTITÉ DU PROJET

- **Nom du produit** : **NAWIRI** ⚠️ (ex-"AidePath West Africa" — renommé NAWIRI le 14 juin 2026 par décision de l'équipe ; ne plus utiliser AidePath)
- **Équipe** : EVOLUTICS — Shadrak BESSANH & Franckel GNONLONFIN (étudiants, Université d'Abomey-Calavi, Bénin)
- **Compétition** : USAII Global AI Hackathon 2026 — Undergraduate Track — **Brief 4 (Public Services)**
- **Statut qualifier** : Score 83/100 — Rang #84/424 (track de 427 équipes)
- **Code qualificateur** : `CO26-A91DB460` ⚠️ NE PAS PERDRE
- **Deadline soumission** : **21 juin 2026, 23h59 ET** (objectif : soumettre le **sam. 20 juin**, pas attendre dimanche)

## 2. LE PROBLÈME (en une phrase)

Les familles vulnérables d'Afrique de l'Ouest ratent l'aide publique à laquelle elles ont **légalement droit** — non pas parce qu'elle n'existe pas, mais parce que **le système est trop difficile à naviguer**. AidePath est le **pont** entre les gens et les ressources existantes.

> Citation clé du brief : *"People often miss help not because it does not exist, but because the system is too hard to navigate."*

## 3. LA SOLUTION (en une phrase)

Un **assistant conversationnel** (FR/EN) qui aide les familles à : découvrir les programmes d'aide auxquels elles ont droit → comprendre les étapes exactes → passer de la confusion à l'action. Pour **Sénégal, Bénin, Ghana**.

**Flux utilisateur** : choisir pays + langue → décrire sa situation en texte libre → l'IA pose des questions de suivi (une à la fois) → réponse structurée : **Programme / Documents / Étapes / Contact**.

**Différenciateur vs Google** : ce n'est pas l'information qui manque, c'est **l'interprétation** personnalisée croisant la situation réelle avec les critères des programmes.

## 4. POURQUOI L'IA (critère 30% — le plus important)

- Un formulaire statique ne peut pas **comprendre** une situation décrite librement (signaux multiples : santé + finance + logement).
- Les critères d'éligibilité varient selon des dizaines de variables → combinatoire impossible en statique.
- Une conversation est naturelle et moins intimidante qu'un formulaire en situation de stress.
- L'IA **n'automatise pas une décision** → elle interprète et oriente. (point crucial pour les juges)

## 5. ARCHITECTURE — Les 4 pièces

1. **Interface** : page web simple (pays, langue, zone de texte, réponse). Doit marcher sur mobile / connexion limitée.
2. **Base de données des programmes** : fichier structuré. Par programme/pays → nom, critères (langage simple), documents, démarche, contact officiel, limites. Données **publiques officielles consolidées**, jamais inventées.
3. **Moteur conversationnel (IA)** : LLM via API (Claude ou GPT-4). Identifie infos présentes/manquantes, pose la meilleure question, croise avec la BDD, produit la réponse.
4. **Garde-fous** : jamais "vous êtes éligible" (toujours "vous pourriez être"). Urgence médicale → afficher contacts d'urgence d'abord. Si incertain → orienter vers un humain.

## 6. PAYS & PROGRAMMES

**Sénégal** — ✅ DONNÉES COLLECTÉES → voir `data/SENEGAL.md` (7 programmes)
- ⚠️ **CORRECTIONS** : (1) l'Agence CMU (ANACMU) est devenue **SEN-CSU** depuis le décret 2024-832 du 27 mars 2024 → site **sencsu.sn** (agencecmu.sn marche encore), pilotée par le Ministère de la Famille. (2) La **Bourse de Sécurité Familiale = 35 000 FCFA/trimestre = 140 000 FCFA/an** depuis déc. 2022 (pas 100 000).
- CMU mutuelles (80% public, 50% pharma privée ; 7 000 FCFA/an, 3 500 subventionné, gratuit indigents) ; Gratuité enfants <5 ans ; Plan Sésame (60+) ; Gratuité dialyse (prescription néphrologue + liste d'attente) ; Gratuité césarienne ; PNBSF (cash transfer, ciblage RNU) ; Carte d'Égalité des Chances (handicap).
- Outil de ciblage transversal = **RNU** (Registre National Unique) → s'inscrire en mairie / service départemental action sociale.

**Bénin** (pays de l'équipe = authenticité) — ✅ DONNÉES COLLECTÉES → voir `data/BENIN.md`
- ⚠️ **CORRECTION MAJEURE** : le RAMU (Loi 2015-42) a été **remplacé en pratique par ARCH**, géré par l'**ANPS** (pas l'ANAM). Le bon guichet = **ANPS** (+229 20 21 34 14, masm.anps@gouv.bj, anps.social.gouv.bj). RAMU = cadre juridique seulement.
- 11 programmes documentés : ARCH Assurance Maladie (panier 22 affections, gratuit pauvres extrêmes, carte ANIP requise) ; ARCH Formation ; Crédit ARCH ; ARCH Retraite (30 000 FCFA/an indépendants) ; Microcrédit Alafia (FNM, 30/50/100k FCFA, 8%/an) ; GBESSOKÉ (transferts monétaires, ciblage enquête) ; Gratuité césarienne ; Gratuité paludisme <5 ans + femmes enceintes ; Gratuité ARV/VIH ; Campagnes planif. familiale & dépistage cancers (périodiques) ; CNSS pension vieillesse.
- Beaucoup de programmes = **ciblage par enquête (PMT/RSU)**, pas inscription libre. Prérequis transversal = **carte biométrique ANIP**.

**Ghana** (anglophone, scalabilité) — ✅ DONNÉES COLLECTÉES → voir `data/GHANA.md` (4 programmes)
- NHIS (NHIA, nhis.gov.gh) — couvre ~95% des maladies ; exemptés (gratuit) : <18 ans, **70+**, femmes enceintes, indigents, cotisants/pensionnés SSNIT, bénéficiaires LEAP. Informels : prime ~GHS 30-50/an. Renouvellement mobile **\*929#**. Docs : Ghana Card/passeport/SSNIT (adultes), acte naissance/carte parents (enfants) + preuve d'exemption.
- Free Maternal Care (sous NHIS) : 6 visites prénat., accouchement gratuit (y compris césarienne), 2 visites postnat., couvre la femme 1 an + nouveau-né 3 mois.
- **Free Dialysis (sous NHIS, depuis 1 déc. 2024)** — tous les membres NHIS avec maladie rénale, 20 hôpitaux désignés. (Nouveau vs NAWIRI.)
- LEAP (cash transfer, MoGCSP) : ménages très pauvres (65+, handicap sévère, OVC, mère+nourrisson) ; GH¢256-424/bimestre selon membres ; ciblage PMT ; + adhésion NHIS gratuite.

## 7. LES 5 CRITÈRES DE NOTATION

| Critère | Poids |
|---|---|
| Compréhension du problème | 20% |
| Raisonnement IA (pourquoi l'IA) | 30% |
| Architecture de la solution | 25% |
| Impact / valeur décisionnelle | 15% |
| Responsabilité IA | 10% |

**Decision Impact** : la décision concrète = "est-ce que j'emmène mon enfant malade chez le médecin aujourd'hui ?"
**Responsible AI** : risque = faux espoir d'éligibilité → mitigation = langage "pourriez" + toujours "vérifiez auprès de l'organisme officiel" + human-in-the-loop (l'IA ne valide jamais un dossier).

## 8. CE QUE LE PROJET N'EST PAS

- ❌ Pas un annuaire / liste de liens (les juges pénalisent ça explicitement)
- ❌ Pas un outil de diagnostic médical
- ❌ Pas une garantie d'éligibilité
- ❌ Pas exhaustif → choix de **profondeur (3 pays) plutôt que d'étendue**

## 9. PLAN 7 JOURS

- **Dim 14 juin** : créer projet Devpost + ajouter Franckel (URGENT) ; construire la BDD des programmes
- **Lun 15** : moteur conversationnel (prompt système + logique de questions)
- **Mar 16** : interface web + déploiement (lien public gratuit)
- **Mer 17** : tester 25 scénarios + documenter les limites (atout, pas faiblesse)
- **Jeu 18** : corriger + préparer script vidéo (2-5 min)
- **Ven 19** : tourner vidéo (YouTube/Loom) + rédiger soumission Devpost
- **Sam 20** : vérifier liens en navigation privée + code qualificateur + **SOUMETTRE**

## 10. SOURCES OFFICIELLES

- **Sénégal** : agencecmu.sn, sante.gouv.sn, Ministère Famille, primature.sn
- **Bénin** : ramubenin.com, beninsante.bj, liste OMS médicaments essentiels, WHO Afrique
- **Ghana** : nhis.gov.gh, nhia.gov.ng, WHO African Health Observatory, SocialProtection.org
- **Complément** : Banque Mondiale, UNICEF, WHO Global Health Observatory

---

## ÉTAT D'AVANCEMENT (journal)

- **2026-06-14** : Lecture intégrale de NAWIRI.md, création de ce CLAUDE.md.
- **2026-06-14 (suite)** : ✅ **Collecte de données BÉNIN terminée** → `data/BENIN.md` (11 programmes, sources officielles vérifiées). Lu le PDF `loi-2015-42.pdf` (RAMU, 91 articles) extrait en `loi-2015-42.txt`. Recherches web complètes (gouv.bj, ANPS, FNM, CNSS, OMS). Découverte clé : ARCH/ANPS a remplacé RAMU/ANAM.
- **2026-06-14 (suite 2)** : ✅ **Collecte SÉNÉGAL terminée** → `data/SENEGAL.md` (7 programmes, anglais, sources officielles). Corrections : ANACMU→SEN-CSU (sencsu.sn) ; BSF = 140 000 FCFA/an. Convention adoptée : fichiers data en **anglais** (site EN), discussion avec l'utilisateur en **français**.
- **2026-06-14 (suite 3)** : ✅ Collecte GHANA → `data/GHANA.md` (4 programmes). Collecte des 3 pays = 22 programmes.
- **2026-06-14 (suite 4 — VÉRIFICATION/REPRISE)** : 2e passe de vérification approfondie. Corrections majeures appliquées :
  - 🇧🇯 **Bénin santé = réforme AMO** : RAMU (cadre) → ARCH (projet, pauvres via ANPS) → **AMO Assurance Maladie Obligatoire** (Décret 2023-327 puis **Décret 2025-672 du 29 oct. 2025**, obligatoire pour tous ; employeurs conformes avant **29 oct. 2026**, amende 200 000 FCFA/salarié non couvert). Cotisation base : **enfants 9 000 / adultes 16 000 FCFA/an**, employeur ≥80%, ticket modérateur 20% sauf pauvres extrêmes. ⚠️ **Dialyse & insuline NON gratuites** au Bénin (juste exonération douanière kits dialyse sept. 2024). Paludisme <5 ans + femmes enceintes : gratuité confirmée active.
  - 🇸🇳 **Sénégal CMU exclusions** ajoutées : chirurgie esthétique, prothèses dentaires complexes, médicaments hors liste, évacuation à l'étranger.
  - 🇬🇭 **Ghana NHIS prime réelle = GH¢7-42/an + GH¢6 frais carte** (pas GHS 30-50). Ghana Card intégrée depuis 2022 (prérequis). Délai d'attente d'1 mois (nouveaux/renouvellements tardifs), levé temporairement nov.→14 déc. 2025. Renouvellement *929# / MyNHIS App, tous les 12 mois.
  - Données désormais datées, sourcées et précises. **🎉 BASE DE DONNÉES VÉRIFIÉE.**
- **2026-06-14 (suite 5 — DESIGN + PROMPT)** : Décisions plateforme arrêtées avec l'utilisateur :
  - **Renommage : le produit s'appelle NAWIRI** (plus "AidePath"). Corrigé dans data/ + CLAUDE.md. (NAWIRI.md socle pas encore aligné — en attente accord utilisateur, 17 occurrences "AidePath".)
  - **Vision UX** : Landing → connexion → page Profil = hub façon app Android avec 3 sections (🗺️ Carte institutions à gauche, 💬 Conversation IA au centre, 👤 Profil à droite). **Option 2 retenue** (pragmatique) : auth/profil légers (localStorage, rien sur serveur = argument confidentialité), carte via Leaflet/OpenStreetMap, cœur = conversation IA. Stack : **Next.js + Vercel + Tailwind + Claude API**.
  - **Design (via outil ui-ux-pro-max dans C:\Users\shadr\Downloads\ui-ux-pro-max-skill-main, lancé avec python search.py)** : Style **Accessible & Ethical / Inclusive (WCAG AAA)** ; palette **Healthcare** (primary #0891B2, accent #059669, bg #ECFEFF, fg #164E63, urgence #DC2626) ; typo **Lexend + Source Sans 3** (alt Atkinson Hyperlegible) ; landing **Minimal Single Column**.
  - ✅ **ÉTAPE 1 FAITE : system prompt** → `prompts/system-prompt.md` (v1). Template avec variables {{COUNTRY}}/{{LANGUAGE}}/{{COUNTRY_DATA}}, protocole d'urgence, boucle conversationnelle (1 question à la fois), format de réponse structuré, garde-fous stricts, nuances pays (ciblage registre, prérequis ANIP/RNU/Ghana Card, dialyse Bénin PAS gratuite), exemples few-shot.
  - ⚠️ **MOTEUR IA = Google Gemini (`gemini-flash-latest`), PAS Claude.** L'utilisateur n'a pas de clé Claude ; il a une clé Gemini (fournie dans `Nouveau document texte.txt`, endpoint generativelanguage.googleapis.com). Gratuit, rapide, bon FR/EN → adapté au projet. Le system-prompt.md s'envoie via le champ `system_instruction` de Gemini. **SÉCURITÉ : clé à régénérer (exposée) + à garder UNIQUEMENT côté serveur (var d'env `GEMINI_API_KEY` sur Vercel), jamais dans le frontend.**
  - ✅ **ÉTAPE 2 FAITE : projet Next.js + backend Gemini.** Fichiers créés : `package.json`, `next.config.mjs` (outputFileTracingIncludes pour data/ + prompts/), `.gitignore`, `.env.local.example`, `lib/context.js` (assemble system-prompt + data du pays via fs), `app/api/chat/route.js` (POST → Gemini `gemini-flash-latest`, clé via `process.env.GEMINI_API_KEY`, roles user/assistant→user/model), `app/layout.js`, `app/page.js` (chat simple FR/EN, sélecteurs pays+langue, palette Healthcare). Guide `DEPLOY.md` (GitHub → Vercel + var d'env). **Décisions : stack Next.js+Vercel ; test directement sur Vercel.**
  - **Prochaine étape : ÉTAPE 3 = embellir l'interface (style Accessible/Ethical + Healthcare via ui-ux-pro-max) ; puis landing, profil-hub 3 sections (carte/chat/profil), auth légère.** Avant : l'utilisateur doit créer repo GitHub + déployer Vercel + mettre GEMINI_API_KEY (clé à régénérer).

> ⚠️ Note : aujourd'hui = 14 juin. Il reste **6 jours** avant la deadline cible (20 juin). Le projet est encore au stade documentaire (pas de code/interface/BDD construits).
