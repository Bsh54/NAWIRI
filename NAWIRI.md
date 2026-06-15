# NAWIRI — Dossier Complet du Projet
### USAII Global AI Hackathon 2026 | Undergraduate Track | Brief 4 — Public Services
#### Équipe : EVOLUTICS | Shadrak BESSANH & Franckel GNONLONFIN | Score Qualifier : 83/100 | Rang #84/424

---

## PARTIE 1 — COMPRENDRE LE VRAI PROBLÈME

### Le paradoxe qui tue des gens

En Afrique de l'Ouest, des millions de personnes n'accèdent pas aux soins de santé, aux aides alimentaires, ou aux programmes sociaux auxquels elles ont légalement droit. Ce n'est pas parce que ces programmes n'existent pas. Ils existent. Les gouvernements les ont créés, financés, et mis en place. Mais les citoyens ordinaires ne savent pas comment y accéder.

C'est ça le vrai problème. Pas l'absence de ressources. L'absence d'un pont entre les gens et les ressources qui existent déjà.

Prenons un exemple concret. Au Sénégal, il existe un programme officiel qui garantit la gratuité des soins médicaux pour tous les enfants de moins de 5 ans. Ce programme s'appelle CMU — Couverture Maladie Universelle. Il est financé par l'État, opérationnel, et disponible dans chaque commune du pays. Mais combien de mères sénégalaises, surtout en zone rurale ou en milieu informel, savent que ce programme existe ? Combien savent comment s'inscrire ? Quels documents apporter ? Quel centre de santé contacter ?

La réponse est : très peu. Et pendant ce temps, des enfants ne reçoivent pas de soins parce que leurs parents pensent ne pas pouvoir payer.

Ce scénario se répète avec des dizaines de programmes dans chaque pays d'Afrique de l'Ouest. Des programmes de bourses familiales. Des régimes d'assurance maladie. Des aides alimentaires. Des programmes pour personnes âgées. Tous existent. Tous sont sous-utilisés parce que le système est trop complexe, trop opaque, et trop difficile à naviguer, surtout pour quelqu'un qui est déjà sous pression.

### Pourquoi c'est exactement ce que le hackathon demande

Le Brief 4 du hackathon demande de construire quelque chose qui aide les gens à naviguer les systèmes publics dont ils dépendent. La phrase clé est : "People often miss help not because it does not exist, but because the system is too hard to navigate."

Traduction : les gens ratent l'aide non pas parce qu'elle n'existe pas, mais parce que le système est trop difficile à naviguer.

C'est mot pour mot le problème qu'on résout. Le système existe. Il est trop difficile à naviguer. NAWIRI est le pont.

---

## PARTIE 2 — CE QU'EST AIDEPATH

### En une phrase

NAWIRI est un assistant conversationnel qui aide les familles vulnérables d'Afrique de l'Ouest à découvrir les programmes d'aide publique auxquels elles ont droit, à comprendre les étapes exactes pour y accéder, et à passer de la confusion à l'action concrète. NAWIRI parle français et anglais, et prend en charge trois langues africaines locales — le fɔngbe (Bénin), le wolof (Sénégal) et le twi (Ghana) — en entrée comme en sortie.

### Ce que ça fait vraiment, étape par étape

L'utilisateur arrive sur une interface simple. Un popup lui demande d'abord sa langue (anglais, français, ou une des trois langues africaines). Puis il décrit sa situation librement, comme il le ferait à un ami — le pays (Sénégal, Bénin ou Ghana) est détecté automatiquement à partir de ce qu'il écrit, et peut changer en cours de conversation. Une carte des institutions officielles est accessible à tout moment, et l'IA peut y renvoyer directement via un lien cliquable.

Exemple : "J'ai trois enfants, le plus jeune a 2 ans, il est souvent malade et je n'ai pas d'assurance maladie. Mon mari est menuisier, on n'a pas de revenus fixes."

L'IA lit cette description. Elle identifie ce qu'elle sait déjà (3 enfants, enfant de 2 ans, pas d'assurance, secteur informel) et ce qu'il lui manque pour donner une réponse précise (la commune, l'âge des autres enfants, si la famille est déjà enrôlée quelque part).

Elle pose une question à la fois, dans l'ordre qui fait le plus de sens, comme un agent social compétent le ferait.

Une fois qu'elle a assez d'informations, elle produit une réponse structurée qui ressemble à ceci :

---

*Votre famille pourrait être éligible à au moins 2 programmes.*

*Programme 1 — Soins gratuits enfants moins de 5 ans (CMU Sénégal)*
Votre fils de 2 ans a droit à des consultations médicales gratuites dans tout centre de santé public au Sénégal.
Documents à apporter : extrait de naissance de l'enfant, pièce d'identité du parent.
Prochaine étape : rendez-vous au centre de santé le plus proche et demandez le formulaire CMU enfant.
Contact : SEN-CSU (ex-Agence CMU) — sencsu.sn

*Programme 2 — Bourse de Sécurité Familiale*
Les familles à faibles revenus avec enfants peuvent recevoir une allocation de 35 000 FCFA/trimestre (140 000 FCFA/an), via ciblage par le Registre National Unique (RNU).
Documents à apporter : livret de famille, justificatif de résidence, pièce d'identité.
Prochaine étape : contactez l'antenne locale du Ministère de la Famille de votre commune.

*Ce que cette réponse ne fait pas : elle ne confirme pas que vous êtes définitivement éligible. Seul l'agent du programme peut valider votre dossier. Considérez cette réponse comme un guide de départ, pas comme une garantie.*

---

Voilà ce qu'NAWIRI produit. Pas une liste de liens. Pas un résumé générique. Un plan d'action personnalisé, ancré dans la situation réelle de cette personne, dans ce pays précis.

### La différence entre NAWIRI et une simple recherche Google

Quelqu'un qui cherche "aide médicale enfant Sénégal" sur Google va tomber sur des articles de presse, des pages gouvernementales en français administratif difficile à lire, et des informations génériques qui ne lui disent pas concrètement quoi faire.

NAWIRI fait quelque chose que Google ne peut pas faire : elle comprend la situation spécifique de la personne, croise cette situation avec les critères réels des programmes disponibles, et produit une réponse personnalisée avec les étapes exactes à suivre.

C'est l'interprétation qui manque. Pas l'information. L'interprétation.

---

## PARTIE 3 — POURQUOI L'IA ET PAS AUTRE CHOSE

### La question que les juges vont poser

Les juges évaluent à 30% la justification de l'usage de l'IA. Ils vont demander : pourquoi l'IA ? Pourquoi pas un formulaire statique, un site web avec des FAQ, ou un numéro de téléphone ?

La réponse est précise.

Un formulaire statique ne peut pas comprendre une situation. Il peut collecter des données mais pas les interpréter. Une mère qui décrit "mon mari est malade depuis 3 mois et on n'arrive plus à payer le loyer" n'entre pas ça dans un formulaire. Elle le dit. Et ce qu'elle dit contient des signaux multiples (problème de santé, problème financier, potentiellement logement instable) qui correspondent à plusieurs programmes différents. Seul un système capable de comprendre le langage naturel et de faire des liens peut répondre correctement.

De plus, les critères d'éligibilité varient selon le pays, la région, le statut familial, l'âge des enfants, le type d'emploi, et des dizaines d'autres variables. Aucun formulaire statique ne peut gérer cette combinatoire. L'IA, elle, peut traiter ces variables simultanément, poser des questions de suivi intelligentes pour combler les lacunes, et produire une réponse adaptée à la situation précise de chaque personne.

Enfin, beaucoup d'utilisateurs potentiels ne sont pas à l'aise avec les systèmes numériques formels. Une conversation est naturelle. Un formulaire est intimidant, surtout dans un moment de stress.

### Ce que l'IA fait que rien d'autre ne peut faire ici

Elle comprend le contexte. Elle pose les bonnes questions dans le bon ordre. Elle interprète des critères complexes pour une situation individuelle. Et elle répond dans la langue de la personne, avec un niveau de langage adapté à quelqu'un qui n'est pas familier avec le jargon administratif.

---

## PARTIE 4 — LES PAYS ET LES PROGRAMMES

### Pourquoi Sénégal, Bénin et Ghana

Ces trois pays ont été choisis pour des raisons précises, pas arbitrairement.

Le Sénégal a les données les plus riches et les plus précises. Les programmes sont bien documentés, les critères sont publics, et il y a des sources officielles directes (agencecmu.sn, sante.gouv.sn) avec des informations vérifiables. De plus, le Sénégal est souvent cité comme référence en matière de protection sociale en Afrique de l'Ouest.

Le Bénin est le pays d'origine de l'équipe. Ça compte énormément pour deux raisons. D'abord, on connaît le contexte de l'intérieur — les vraies difficultés que les familles béninoises rencontrent ne sont pas des abstractions pour nous. Ensuite, les juges valorisent l'authenticité. Une équipe béninoise qui construit pour le Bénin est plus crédible qu'une équipe indienne qui construit pour l'Afrique de l'Ouest en général.

Le Ghana permet de couvrir l'Afrique de l'Ouest anglophone et montre que le projet est scalable au-delà du seul contexte francophone. Le NHIS (National Health Insurance Scheme) est l'un des systèmes les mieux documentés du continent, avec des données publiques précises et des sources officielles directes.

### Les programmes couverts par pays

**Sénégal**

Le premier programme est la CMU — Couverture Maladie Universelle. Elle couvre les personnes à faibles revenus via des mutuelles de santé communautaires. Pour s'inscrire il faut une Carte Nationale d'Identité pour les adultes, ou un extrait d'acte de naissance pour les enfants de moins de 18 ans. Le contact officiel est SEN-CSU (ex-Agence CMU, depuis le décret 2024-832) — sencsu.sn. Le Sénégal compte 7 programmes documentés au total (voir data/senegal/).

Le deuxième programme est la gratuité des soins pour les enfants de moins de 5 ans. Aucune inscription préalable n'est nécessaire. Il suffit de se présenter dans un centre de santé public avec l'extrait de naissance de l'enfant. La consultation et les médicaments essentiels sont gratuits.

Le troisième programme est le Plan Sésame pour les personnes âgées de plus de 60 ans. Il couvre les consultations, hospitalisations, et certains médicaments. Il faut une pièce d'identité prouvant l'âge et une carte de résident.

Le quatrième programme est la Bourse de Sécurité Familiale (PNBSF). Elle cible les ménages pauvres avec enfants et verse 35 000 FCFA/trimestre (140 000 FCFA/an). Le ciblage se fait via le Registre National Unique (RNU) — ce n'est pas une inscription libre. Elle passe par le Ministère de la Famille.

**Bénin**

⚠️ Correction majeure depuis la rédaction initiale : le RAMU (loi 2015-42) n'est plus le guichet pratique. La santé au Bénin est passée à l'**AMO — Assurance Maladie Obligatoire** (décrets 2023-327 puis 2025-672), avec le volet **ARCH** pour les pauvres, géré par l'**ANPS** (Agence Nationale de Protection Sociale), pas l'ANAM. Bon contact : ANPS — +229 20 21 34 14 — anps.social.gouv.bj. Prérequis transversal : la **carte biométrique ANIP**.

Le Bénin compte 11 programmes documentés (voir data/benin/) : AMO/ARCH, gratuité paludisme <5 ans + femmes enceintes, gratuité césarienne, microcrédit Alafia (FNM), transferts GBESSOKÉ (ciblage enquête), ARV/VIH gratuits, pension CNSS, etc. ⚠️ La dialyse et l'insuline NE sont PAS gratuites au Bénin (ne jamais créer ce faux espoir).

**Ghana**

Le NHIS — National Health Insurance Scheme — est le plus ancien et le plus structuré des trois pays. Les groupes exemptés de frais d'inscription sont : les enfants de moins de 18 ans, les femmes enceintes, les personnes âgées, et les personnes en situation d'indigence. Pour s'inscrire, les adultes ont besoin d'une carte nationale d'identité ou d'un numéro SSNIT. Les enfants ont besoin d'un certificat de naissance ou de la carte NHIS des parents. L'organisme gestionnaire est la NHIA — National Health Insurance Authority — sur nhis.gov.gh.

---

## PARTIE 5 — COMMENT LE PROJET FONCTIONNE TECHNIQUEMENT (SANS JARGON)

### L'image mentale correcte

Imagine que NAWIRI est comme un très bon agent social qui connaît par cœur les règles de tous les programmes d'aide au Sénégal, au Bénin, et au Ghana. Cet agent écoute ce que la personne lui dit, pose des questions de suivi pour mieux comprendre sa situation, et lui dit exactement à quoi elle a droit et comment l'obtenir.

La différence avec un vrai agent social : NAWIRI est disponible 24h/24, répond en quelques secondes, et ne juge pas la personne.

### Les quatre pièces qui font fonctionner le système

**Pièce 1 — L'interface (ce que l'utilisateur voit)**

Une page web simple. En haut, un menu pour choisir le pays et la langue. En bas, une zone de texte pour écrire sa situation. Et une zone d'affichage pour lire la réponse. Rien de plus. L'interface doit être utilisable sur un téléphone avec une connexion limitée.

**Pièce 2 — La base de données des programmes (le cerveau de droite)**

Un fichier structuré qui contient, pour chaque programme dans chaque pays, les informations suivantes : le nom du programme, qui y a droit (les critères d'éligibilité traduits en conditions simples), quels documents sont nécessaires, quelle est la démarche exacte, quel est le contact officiel, et quelles sont les limites ou exceptions à connaître.

Ces données sont construites à partir de sources officielles publiques : les sites des ministères de la santé, les rapports de l'OMS, et les publications des agences de couverture maladie de chaque pays. Ce ne sont pas des données inventées. Ce sont des données publiques consolidées et structurées.

**Pièce 3 — Le moteur de conversation (le cerveau de gauche)**

C'est la partie IA proprement dite. Elle reçoit ce que l'utilisateur a dit, analyse quelles informations sont présentes et lesquelles manquent, formule la question suivante la plus pertinente, et quand elle a assez d'informations, croise la situation de l'utilisateur avec la base de données des programmes pour produire la réponse.

Ce moteur utilise un grand modèle de langage — **Google Gemini (`gemini-flash-lite-latest`)** via une connexion API, en streaming. On lui donne des instructions précises sur son rôle, son ton, la langue qu'il doit utiliser, et les règles qu'il ne doit jamais violer (par exemple : ne jamais dire "vous êtes éligible" de façon définitive, toujours recommander de vérifier auprès de l'organisme officiel).

**Pièce 4 — Les garde-fous (ce que le système refuse de faire)**

L'IA ne prend pas de décision finale. Elle ne dit jamais "vous avez droit à cela, c'est garanti." Elle dit "selon les critères publics de ce programme, votre situation correspond. Voici les étapes pour vérifier et faire votre demande."

Si quelqu'un décrit une situation d'urgence médicale, le système affiche immédiatement les contacts d'urgence avant toute autre réponse.

Si le système n'a pas assez d'informations ou si la situation est trop complexe, il ne tente pas de deviner. Il dit clairement ce qu'il ne sait pas et oriente vers un contact humain.

---

## PARTIE 6 — STRATÉGIE DE COMPÉTITION

### Pourquoi ce projet peut gagner

Il y a 427 équipes dans le track undergraduate. La grande majorité va construire des projets pour des contextes américains ou indiens, parce que c'est là que vivent la plupart des participants. Les juges vont voir des dizaines de navigateurs d'aides sociales pour les États-Unis, des guides de logement pour l'Inde, des assistants d'accès aux soins pour le Royaume-Uni.

Ils n'ont jamais vu un projet ancré dans la réalité des programmes sociaux d'Afrique de l'Ouest. C'est la différenciation la plus forte possible.

Le FAQ du hackathon dit explicitement : "Can I build for a country outside the U.S.? Absolutely. Judges value specificity and authenticity." Ce n'est pas une autorisation passive. C'est une invitation active.

### Comment scorer haut sur chacun des 5 critères

**Critère 1 — Compréhension du problème (20%)**

On décrit un problème très précis : les familles vulnérables d'Afrique de l'Ouest ratent l'accès aux programmes d'aide publique non pas parce que ces programmes n'existent pas, mais parce que le système est illisible pour quelqu'un sans formation administrative. On identifie clairement l'utilisateur (mère de famille, travailleur informel, personne âgée), la situation (stress, urgence, manque d'information), et les contraintes réelles (langue, littératie numérique, accès limité à internet).

**Critère 2 — Raisonnement IA (30%)**

On répond explicitement à la question "pourquoi l'IA et pas autre chose ?" La réponse est que les critères d'éligibilité sont complexes et varient selon des dizaines de variables individuelles, que la compréhension du langage naturel est nécessaire parce que les gens décrivent leur situation librement et non via des formulaires, et que la personnalisation de la réponse est impossible avec un système statique. On explique aussi que l'IA n'est pas utilisée pour automatiser une décision (ce serait inapproprié), mais pour interpréter une situation et orienter vers les bonnes ressources.

**Critère 3 — Architecture de la solution (25%)**

On présente un flux clair : l'utilisateur décrit sa situation en texte libre, le moteur conversationnel identifie les informations présentes et manquantes, pose des questions de suivi ciblées, croise la situation complète avec la base de données des programmes, et produit une réponse structurée avec les étapes concrètes et les contacts officiels. Chaque étape est explicable et justifiée.

**Critère 4 — Impact et valeur décisionnelle (15%)**

La décision que l'IA aide à prendre est claire : est-ce que je peux accéder à ce programme, et si oui comment ? Le before/after est fort : avant NAWIRI, la personne ne sait pas qu'un programme existe ou ne sait pas comment y accéder. Après NAWIRI, elle a un plan d'action en main, avec les documents à rassembler et le premier appel à passer.

**Critère 5 — Responsabilité IA (10%)**

On identifie un risque réaliste et précis : l'IA pourrait dire à quelqu'un qu'il est probablement éligible alors que sa situation a des nuances que le système n'a pas détectées, ce qui pourrait le décourager si la demande est rejetée ou, pire, lui faire manquer un autre programme auquel il a vraiment droit. La mitigation est concrète : chaque réponse utilise systématiquement "vous pourriez être éligible" et jamais "vous êtes éligible", et chaque réponse se termine par une recommandation explicite de vérifier auprès de l'organisme officiel.

Le human-in-the-loop est clair : l'IA ne valide jamais une demande. Seul un agent humain du programme peut accepter ou refuser un dossier. L'IA guide vers cet agent, elle ne le remplace pas.

### Le Decision Impact Statement (champ obligatoire découvert dans le kickoff)

Avant NAWIRI : une mère de famille à Dakar passe 2 heures à chercher sur internet sans trouver d'information claire. Elle appelle le numéro du ministère, personne ne répond. Elle abandonne. Son enfant malade n'est pas soigné parce qu'elle pense ne pas avoir les moyens.

Après NAWIRI : en moins de 3 minutes de conversation, elle sait que son enfant de 2 ans a droit aux soins gratuits, quels documents apporter, dans quel centre aller, et quel contact appeler si elle a une difficulté.

La décision que l'IA aide à prendre n'est pas abstraite. C'est "est-ce que j'emmène mon enfant chez le médecin aujourd'hui ?"

---

## PARTIE 7 — PLAN D'EXÉCUTION SUR 7 JOURS

### Dimanche 14 juin — Poser les fondations

Deux tâches seulement. Créer le projet sur Devpost et ajouter Franckel comme coéquipier (c'est urgent, sans ça on ne peut pas soumettre). Ensuite, construire la base de données des programmes dans un fichier structuré. Pour chaque programme dans chaque pays : nom, qui y a droit en langage simple, documents nécessaires, étapes à suivre, contact officiel, et ce que le programme ne couvre pas.

### Lundi 15 juin — Construire le moteur conversationnel

Écrire les instructions précises que l'IA reçoit. Ces instructions définissent son rôle (agent d'orientation sociale), son ton (clair, bienveillant, sans jargon), les règles qu'elle ne peut pas violer (ne pas certifier l'éligibilité, toujours recommander de vérifier), et le format de ses réponses (toujours structuré en programme / documents / étapes / contact).

Construire aussi la logique de conversation : comment l'IA décide quelle question poser ensuite, quand elle considère qu'elle a assez d'informations pour répondre, et comment elle gère les situations imprévues.

### Mardi 16 juin — Construire l'interface

Une page web simple. Sélection du pays. Sélection de la langue. Zone de texte. Bouton d'envoi. Zone de réponse. Rien de plus. L'esthétique compte moins que la clarté et la vitesse de chargement.

Déployer l'application sur une plateforme gratuite pour avoir un lien public que les juges peuvent tester.

### Mercredi 17 juin — Tests et documentation des limites

Tester 25 scénarios différents couvrant des situations réelles variées : enfant malade, personne âgée sans ressources, femme enceinte, travailleur informel, demande floue, urgence médicale, situation qui ne correspond à aucun programme.

Documenter honnêtement ce qui fonctionne et ce qui ne fonctionne pas. Les cas d'échec documentés sont un atout dans la soumission, pas un aveu de faiblesse. Ils prouvent qu'on a réfléchi aux limites du système.

### Jeudi 18 juin — Affiner et préparer la vidéo

Corriger les problèmes identifiés la veille. Préparer le script de la vidéo de démonstration. La vidéo dure entre 2 et 5 minutes et suit cette structure : 30 secondes sur le problème (avec chiffres d'impact), 90 secondes sur la solution et comment elle fonctionne, 2 minutes de démonstration live sur 2 scénarios concrets, et 30 secondes sur les limites et prochaines étapes.

### Vendredi 19 juin — Tourner la vidéo et rédiger la soumission

Filmer la vidéo. La mettre sur YouTube ou Loom avec un lien public. Rédiger toutes les réponses aux champs obligatoires de Devpost : description complète, architecture IA, garde-fou responsible AI, human-in-the-loop, decision impact statement, outils utilisés, sources de données.

### Samedi 20 juin — Vérification et soumission

Tester tous les liens en navigation privée pour s'assurer que les juges peuvent y accéder. Vérifier que le code qualificateur CO26-A91DB460 est bien entré. Soumettre. Ne pas attendre le dimanche 21, le risque technique n'en vaut pas la peine.

---

## PARTIE 8 — LES SOURCES DE DONNÉES OFFICIELLES

Toutes les données utilisées dans NAWIRI proviennent de sources publiques et vérifiables. Voici les sources par pays.

**Sénégal**
Site officiel de l'Agence CMU : agencecmu.sn
Site du Ministère de la Santé : sante.gouv.sn
Site du Ministère de la Famille pour la Bourse de Sécurité Familiale
Portail gouvernemental : primature.sn

**Bénin**
Site de l'ANAM : ramubenin.com
Site du Ministère de la Santé : beninsante.bj
Liste nationale des médicaments essentiels publiée par l'OMS
Organisation Mondiale de la Santé — Bureau Afrique pour les programmes de santé

**Ghana**
Site officiel du NHIS : nhis.gov.gh
Site de la NHIA : nhia.gov.ng (pour comparaison)
WHO — African Health Observatory pour les données de couverture
SocialProtection.org pour les données d'exemption et d'éligibilité

**Données complémentaires**
Banque Mondiale — données de protection sociale en Afrique de l'Ouest
UNICEF — rapports sur l'accès aux soins pour les enfants en Afrique subsaharienne
WHO — Global Health Observatory pour les données de contexte

---

## PARTIE 9 — RÉPONSES PRÊTES POUR LA SOUMISSION DEVPOST

### Architecture IA (600 caractères max)

L'utilisateur décrit sa situation en langage naturel. Le système identifie les informations présentes et pose des questions de suivi ciblées jusqu'à avoir une image complète. Un moteur de traitement croise la situation avec une base de données structurée de programmes d'aide publique pour Sénégal, Bénin et Ghana. Il produit un plan d'action personnalisé avec critères d'éligibilité interprétés, documents requis, étapes concrètes et contacts officiels.

### Human-in-the-Loop (500 caractères max)

L'IA ne valide jamais l'éligibilité d'une personne. Seul un agent humain de l'organisme concerné peut accepter ou refuser un dossier. Le système guide vers cet agent mais ne le remplace pas. Cette décision dépend de documents, de vérifications terrain, et de nuances que le système ne peut pas évaluer à distance.

### Responsible AI Guardrail (500 caractères max)

Risque : l'IA oriente une personne vers un programme alors qu'une nuance non détectée la rend inéligible, créant une fausse espoir. Mitigation : le système utilise systématiquement "vous pourriez être éligible" et jamais "vous êtes éligible", et chaque réponse se termine par "vérifiez auprès de l'organisme officiel avant toute démarche."

### Decision Impact Statement

Avant NAWIRI : une mère à Dakar ne sait pas que son enfant de 2 ans a droit aux soins gratuits. Elle n'emmène pas son enfant malade chez le médecin par peur du coût. Après NAWIRI : en 3 minutes de conversation, elle sait exactement à quel programme elle a droit, quels documents apporter, et où aller. La décision change : elle emmène son enfant chez le médecin.

---

## PARTIE 10 — CE QUE CE PROJET N'EST PAS

Il est aussi important de définir les limites que les capacités.

NAWIRI n'est pas un annuaire de programmes. Une liste de liens ou un résumé de programmes sans interprétation personnalisée ne répond pas au brief. Les juges ont explicitement dit qu'ils marqueraient en négatif les projets qui ne font que lister des ressources sans raisonner sur l'éligibilité.

NAWIRI n'est pas un outil de diagnostic médical. Il oriente vers des soins et des programmes de santé, mais ne donne jamais d'avis médical.

NAWIRI n'est pas une garantie. Il indique des pistes d'éligibilité basées sur des critères publics. La décision finale appartient toujours à l'humain, et la vérification appartient toujours à l'organisme officiel.

NAWIRI n'est pas exhaustif. On couvre 3 pays et un nombre limité de programmes. C'est un choix délibéré de profondeur plutôt que d'étendue. Mieux couvrir 3 pays avec précision vaut plus que couvrir 10 pays superficiellement.

---

## PARTIE 11 — POURQUOI CETTE ÉQUIPE EST LA BONNE POUR CE PROJET

Ce point est sous-estimé dans la plupart des soumissions. Les juges évaluent aussi la crédibilité de l'équipe à construire ce qu'elle propose.

Shadrak est béninois et étudiant à l'Université d'Abomey-Calavi. Il connaît de l'intérieur les difficultés que les familles béninoises rencontrent face aux systèmes administratifs. Il n'invente pas les problèmes. Il les a vus et vécus dans son entourage.

Franckel est son coéquipier, même contexte géographique et culturel.

Quand une équipe indienne ou américaine construit pour l'Afrique de l'Ouest, elle le fait depuis des données et des articles. Quand cette équipe construit pour l'Afrique de l'Ouest, elle le fait depuis une connaissance authentique du terrain. Les juges sentent cette différence.

---

## PARTIE 12 — ÉTAT DE RÉALISATION (mis à jour le 15 juin 2026)

Ce qui est construit et déployé (repo GitHub Bsh54/NAWIRI, hébergé sur Vercel) :

**Nom & moteur** — Produit renommé NAWIRI. Moteur = Google Gemini `gemini-flash-lite-latest` en streaming SSE (pas Claude/GPT-4 : l'équipe dispose d'une clé Gemini gratuite, rapide, bon FR/EN). Stack : Next.js 14 + Vercel, styles inline, zéro dépendance lourde.

**Données vérifiées** — 22 programmes sur 3 pays, datés et sourcés (data/benin = 11, data/senegal = 7, data/ghana = 4), avec pour chaque pays un fichier de programmes + SOURCES.md + DOCUMENTS.md (pièces exactes à fournir, vrai différenciateur vs Google). Corrections clés intégrées : SEN-CSU (ex-CMU), bourse 140 000 FCFA/an, ARCH/AMO/ANPS au Bénin (ex-RAMU/ANAM), dialyse/insuline NON gratuites au Bénin, prime NHIS réelle GH¢7-42 + GH¢6.

**Langues** — Anglais et français + **trois langues africaines** : fɔngbe, wolof, twi. Sélecteur de langue en popup. Pour les langues africaines : le texte de l'utilisateur passe par une API de traduction (Google Translate via un worker) → anglais → Gemini → retour dans la langue locale. Les chaînes d'interface (accueil, landing) sont pré-traduites et figées → bascule de langue instantanée.

**Détection pays** — Automatique depuis le texte (la dernière mention l'emporte, gère le changement de pays en cours de conversation). Tant qu'aucun pays n'est confirmé, les 3 sont chargés ; dès confirmation, un seul → prompt ~49% plus léger.

**Carte** — Carte Leaflet/OpenStreetMap des institutions officielles (chargée à la demande). L'IA peut émettre un lien `[[MAP:id]]` qui amène l'utilisateur directement à l'institution.

**Garde-fous testés** — System prompt avec protocole d'urgence en premier, boucle d'une question à la fois, format structuré (Programme/Documents/Étapes/Contact), interdiction de certifier l'éligibilité et d'inventer un numéro. **25 scénarios testés contre le modèle réel : 25/25 corrects** (voir tests/SCENARIOS.md), dont le contraste dialyse Bénin (non) / Sénégal (oui), et le pipeline langue africaine de bout en bout.

**Reste à faire** — Tests utilisateurs finaux, script + tournage vidéo, rédaction soumission Devpost, vérification des liens, soumission (objectif sam. 20 juin).

---

*Document préparé pour l'équipe EVOLUTICS dans le cadre du USAII Global AI Hackathon 2026.*
*Code qualificateur : CO26-A91DB460 — À ne pas perdre. Deadline soumission : 21 juin 2026 à 23h59 ET.*
