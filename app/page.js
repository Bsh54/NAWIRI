"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

// ─── Copy (EN / FR) ────────────────────────────────────────────────────────────

const T = {
  en: {
    nav_countries: "Benin · Senegal · Ghana",
    badge:         "AI-powered social orientation · West Africa",
    h1a:           "Public aid exists.",
    h1b:           "Let's find yours.",
    sub:           "Families miss assistance they are legally entitled to — every single day. Not because it doesn't exist, but because the system is too hard to navigate. NAWIRI is the bridge.",
    quote:         "\"People often miss help not because it does not exist, but because the system is too hard to navigate.\"",
    cta:           "Start now, it's free",
    cta_sub:       "No account · No forms · No personal data stored",
    demo_user:     "My child is 3 years old and often sick. We have no health insurance. I live in Benin.",
    demo_q:        "Are you registered in the ANIP biometric system (national ID card)?",
    demo_label:    "NAWIRI asks one question at a time",
    stats: [
      { value: "22",  label: "programs documented" },
      { value: "3",   label: "countries covered" },
      { value: "5",   label: "languages supported" },
    ],
    how_title: "How it works",
    steps: [
      { n: "01", title: "Write in plain words",         desc: "English, French, or your local language. Describe your situation freely — no forms, no jargon." },
      { n: "02", title: "NAWIRI asks one question",      desc: "At a time, to pinpoint exactly which programs match your situation." },
      { n: "03", title: "You get a clear action plan",   desc: "Program name, documents to prepare, exact next step, official contact." },
      { n: "04", title: "You verify and act",            desc: "NAWIRI guides. The official body validates. You decide — always." },
    ],
    why_title: "Why AI and not a search engine",
    why_items: [
      { icon: "brain", title: "It understands your situation",       desc: "A form cannot grasp a free-text description mixing health, finances and family signals at once. NAWIRI can." },
      { icon: "scale", title: "It crosses eligibility criteria",    desc: "Dozens of variables per program. A static tool cannot handle the combinatorics. NAWIRI does." },
      { icon: "shield", title: "It guides — it never decides",      desc: "NAWIRI orients. It never certifies eligibility. Only an official agent can validate a file." },
    ],
    countries_title: "Programs covered",
    countries: [
      { flag: "BJ", name: "Benin",   count: "11 programs", items: ["Mandatory health insurance (AMO/ARCH)", "Free malaria care for children under 5 and pregnant women", "Free cesarean section", "Alafia microcredit (FNM)", "GBESSOKÉ cash transfers", "Free ARVs and HIV care", "CNSS old-age pension"] },
      { flag: "SN", name: "Senegal", count: "7 programs",  items: ["Community health mutuals (CMU)", "Free care for children under 5", "Plan Sésame (60+)", "Family Security Grant (PNBSF)", "Free cesarean section", "Free dialysis", "Equal Opportunity Card (disability)"] },
      { flag: "GH", name: "Ghana",   count: "4 programs",  items: ["National Health Insurance (NHIS)", "Free maternal health care", "Free dialysis (since December 2024)", "LEAP cash transfer"] },
    ],
    ai_title:    "Responsible AI by design",
    ai_items: [
      { icon: "🔒", title: "Never certifies eligibility",    desc: "NAWIRI always says \"you could be eligible\" — only an official agent can confirm. No false promises." },
      { icon: "🚨", title: "Emergencies first",              desc: "Any sign of a medical emergency triggers an immediate call to go to the nearest health facility, before anything else." },
      { icon: "🙈", title: "Zero data stored",               desc: "Nothing is saved on our servers. Your conversation stays in your device only." },
      { icon: "🧭", title: "Always points to a human",       desc: "If uncertain, NAWIRI directs you to the official body or a social worker — it never leaves you without a next step." },
    ],
    cta2_title: "Ready to find what you're entitled to?",
    cta2_sub:   "Start a conversation. It takes less than 2 minutes.",
    cta2_btn:   "Start now →",
    footer_tagline: "USAII Global AI Hackathon 2026 · Team EVOLUTICS · Université d'Abomey-Calavi, Benin",
    footer_privacy: "No personal data stored on our servers.",
  },
  fr: {
    nav_countries: "Bénin · Sénégal · Ghana",
    badge:         "Orientation sociale par l'IA · Afrique de l'Ouest",
    h1a:           "L'aide publique existe.",
    h1b:           "Trouvons la vôtre.",
    sub:           "Des familles ratent chaque jour l'aide à laquelle elles ont légalement droit. Non pas parce qu'elle n'existe pas, mais parce que le système est trop difficile à naviguer. NAWIRI est le pont.",
    quote:         "« Les gens ratent souvent l'aide non pas parce qu'elle n'existe pas, mais parce que le système est trop difficile à naviguer. »",
    cta:           "Commencer maintenant, c'est gratuit",
    cta_sub:       "Pas de compte · Pas de formulaire · Aucune donnée personnelle stockée",
    demo_user:     "Mon enfant a 3 ans et est souvent malade. Nous n'avons pas d'assurance maladie. Je suis au Bénin.",
    demo_q:        "Êtes-vous enregistré dans le système biométrique ANIP (carte nationale d'identité) ?",
    demo_label:    "NAWIRI pose une question à la fois",
    stats: [
      { value: "22", label: "programmes documentés" },
      { value: "3",  label: "pays couverts" },
      { value: "5",  label: "langues supportées" },
    ],
    how_title: "Comment ça marche",
    steps: [
      { n: "01", title: "Écrivez en langage libre",       desc: "Français, anglais ou votre langue locale. Décrivez votre situation librement — pas de formulaire, pas de jargon." },
      { n: "02", title: "NAWIRI pose une question",        desc: "À la fois, pour cibler exactement les programmes qui vous correspondent." },
      { n: "03", title: "Vous recevez un plan d'action",   desc: "Nom du programme, documents à préparer, prochaine étape, contact officiel." },
      { n: "04", title: "Vous vérifiez et agissez",        desc: "NAWIRI oriente. L'organisme officiel valide. Vous décidez — toujours." },
    ],
    why_title: "Pourquoi l'IA et pas un moteur de recherche",
    why_items: [
      { icon: "brain", title: "Elle comprend votre situation",        desc: "Un formulaire ne peut pas saisir une description libre mêlant santé, finances et signaux familiaux. NAWIRI le peut." },
      { icon: "scale", title: "Elle croise les critères d'éligibilité", desc: "Des dizaines de variables par programme. Un outil statique ne peut pas gérer la combinatoire. NAWIRI le fait." },
      { icon: "shield", title: "Elle oriente — elle ne décide jamais", desc: "NAWIRI oriente. Elle ne certifie jamais l'éligibilité. Seul un agent officiel peut valider un dossier." },
    ],
    countries_title: "Programmes couverts",
    countries: [
      { flag: "BJ", name: "Bénin",    count: "11 programmes", items: ["Assurance maladie obligatoire (AMO/ARCH)", "Gratuité paludisme <5 ans et femmes enceintes", "Gratuité césarienne", "Microcrédit Alafia (FNM)", "Transferts cash GBESSOKÉ", "ARV et soins VIH gratuits", "Pension vieillesse CNSS"] },
      { flag: "SN", name: "Sénégal",  count: "7 programmes",  items: ["Mutuelles de santé CMU", "Gratuité soins enfants <5 ans", "Plan Sésame (60+)", "Bourse de Sécurité Familiale (PNBSF)", "Gratuité césarienne", "Gratuité dialyse", "Carte d'Égalité des Chances (handicap)"] },
      { flag: "GH", name: "Ghana",    count: "4 programmes",  items: ["Assurance nationale NHIS", "Soins maternels gratuits", "Dialyse gratuite (depuis décembre 2024)", "Transfert cash LEAP"] },
    ],
    ai_title:    "IA responsable par conception",
    ai_items: [
      { icon: "🔒", title: "Ne certifie jamais l'éligibilité",    desc: "NAWIRI dit toujours « vous pourriez être éligible » — seul un agent officiel peut confirmer. Pas de fausses promesses." },
      { icon: "🚨", title: "Les urgences passent en premier",      desc: "Tout signe d'urgence médicale déclenche immédiatement un renvoi vers le centre de santé le plus proche." },
      { icon: "🙈", title: "Zéro donnée stockée",                 desc: "Rien n'est sauvegardé sur nos serveurs. Votre conversation reste sur votre appareil uniquement." },
      { icon: "🧭", title: "Toujours vers un humain",             desc: "En cas de doute, NAWIRI vous dirige vers l'organisme officiel ou un travailleur social — jamais sans étape suivante." },
    ],
    cta2_title: "Prêt(e) à trouver ce à quoi vous avez droit ?",
    cta2_sub:   "Commencez une conversation. Cela prend moins de 2 minutes.",
    cta2_btn:   "Commencer maintenant →",
    footer_tagline: "USAII Global AI Hackathon 2026 · Équipe EVOLUTICS · Université d'Abomey-Calavi, Bénin",
    footer_privacy: "Aucune donnée personnelle stockée sur nos serveurs.",
  },

  // African-language copy, pre-translated from English via the Google Translate API
  // (same engine the chat uses). Static so the landing renders instantly with no spinner.
  fon: {
    nav_countries: "Benin · Sénégal · Gana",
    h1a: "Alɔdó togun tɔn tíìn.",
    h1b: "Mi nú mǐ ni ba towe.",
    sub: "Hwɛndo lɛ nɔ gɔn alɔdó e ye ɖó acɛ na ɖò sɛ́n linu é — azǎn ɖokpo ɖokpo jí. É nyí ɖó é ma tíìn ǎ wutu wɛ ǎ, loɔ, ɖó tutoblonunu ɔ vɛwǔ tawun bɔ è na zán wutu wɛ. NAWIRI wɛ nyí pont ɔ.",
    quote: "« Mɛ lɛ nɔ gɔn alɔdo hwɛhwɛ ɖó é ma tíìn ǎ wutu wɛ ǎ, loɔ, ɖó tuto ɔ vɛwǔ tawun bɔ è na zán. »",
    cta: "Bɛ̌ din, vɔ̌nu",
    demo_user: "Vi ce ɖo xwe 3 bo nɔ jɛ azɔn hwɛhwɛ. Mǐ ɖó akwɛzinzan ɖě ǎ. Un nɔ nɔ Bénin.",
    demo_q: "A ka wlan nyikɔ towe dó ANIP sín tuto biométrique (carte d’identité nationale) mɛ à?",
    stats: [
      { value: "22", label: "tuto e è wlan lɛ é" },
      { value: "3",  label: "tò e mɛ è ɖɔ xó dó lɛ é" },
      { value: "5",  label: "gbè e è nɔ gudo nú lɛ é" },
    ],
    how_title: "Lee é nɔ w’azɔ̌ gbɔn é",
    steps: [
      { n: "01", title: "Wlan kpo xógbe e ɖò wɛn lɛ é kpo", desc: "Glɛnsigbe, Flanségbe, alǒ gbè xá towe tɔn. Tinmɛ ninɔmɛ towe ɖò vivo mɛ — xógbe alɔkpa lɛ ɖě, xógbe syɛnsyɛn lɛ ɖě ǎ." },
      { n: "02", title: "NAWIRI kàn nǔ ɖokpo byɔ", desc: "Hweɖelɛnu ɔ, bo na dó tuùn tuto ɖěɖee sɔgbe xá ninɔmɛ towe lɛ é pɛ́pɛ́pɛ́pɛ́." },
      { n: "03", title: "A mɔ tuto nǔwiwa tɔn ɖé bɔ é ɖò wɛn", desc: "Tuto ɔ sín nyikɔ, wema e mi ɖo na sɔnu tɔn lɛ e, afɔ e bɔ d'ewu e, mɛ e è na ylɔ e." },
      { n: "04", title: "A nɔ gbéjé kpɔ́n bo nɔ wà nǔ", desc: "NAWIRI sín alixlɛ́mɛtɔ́ lɛ. Agbaza acɛkpikpa tɔn wɛ nɔ ɖexlɛ́ ɖɔ nǔgbo wɛ. A nɔ wá gbeta ɔ kɔn — hwebǐnu." },
    ],
    why_title: "Etɛwu AI ma ka nyí nǔbiba sín mɔ̌to ɖé ǎ",
    why_items: [
      { icon: "brain",  title: "É mɔ nukúnnú jɛ ninɔmɛ towe mɛ", desc: "Fómu ɖé sixu mɔ nukúnnú jɛ tinmɛ e è wlan dó wema mɛ bo nɔ xò lanmɛ na nɔ ganji, akwɛzinzan kpo wuntun xwédo tɔn lɛ kpo kplé é wu azɔn ɖokpo ǎ. NAWIRI sixu." },
      { icon: "scale",  title: "É gbɔn nǔ e è byɔ ɖò mɛ sí lɛ é jí", desc: "Nǔ vovo mɔkpan wɛ ɖò tuto ɖokpo ɖokpo mɛ. Azɔwanú e ɖò te é ɖé sixu kpé nukún dó nǔ e è nɔ ylɔ ɖɔ combinatoire lɛ é wu ǎ. NAWIRI nɔ wà mɔ̌." },
      { icon: "shield", title: "É nɔ xlɛ́ ali — é nɔ wá gbeta ɔ kɔn gbeɖé ǎ", desc: "NAWIRI nɔ xlɛ́ ali. É nɔ ɖexlɛ́ gbeɖé ɖɔ è jɛxa ǎ. Mɛ e nɔ w’azɔ̌ ɖò acɛkpikpa ɔ glɔ́ é kɛɖɛ wɛ sixu gbéjé wěma ɖé kpɔ́n." },
    ],
    countries_title: "Tuto e è kplɔ́n lɛ é",
    countries: [
      { flag: "BJ", name: "Benin",   count: "Tuto 11", items: ["Akwɛzinzan lanmɛ na nɔ ganji tɔn e ɖò dandan é (AMO/ARCH)", "Zansukpɛ zɔn vɔ̌nu nú yɔkpɔvu e ma ko ɖó xwè atɔ́ɔ́n ǎ lɛ é kpo nyɔnu e ɖò xomɛ lɛ é kpo", "Cesarean vɔ̌nu", "Alafia sín akwɛ kpɛví (FNM)", "GBESSOKÉ akwɛ ɖiɖe", "ARV kpo VIH kpo sín nukúnkpédómɛwu vɔ̌nu", "CNSS pension mɛxoxwe tɔn"] },
      { flag: "SN", name: "Sénégal", count: "Tuto 7",  items: ["Lanmɛ na nɔ ganji mɛ lɛ tɔn (CMU)", "Nukúnkpédómɛwu vɔ̌nu nú vǐ e ma ko ɖó xwè 5 ǎ lɛ é", "Sésame sín tito (60 jɛji)", "Akwɛzinzan nú Acɛkpikpa Xwédo Tɔn (PNBSF)", "Cesarean vɔ̌nu", "Dialyse vɔ̌nu", "Kati Ali ɖokpo ɔ tɔn (azinzɔnnɔ)"] },
      { flag: "GH", name: "Ghana",   count: "Tuto 4",  items: ["Assurance lanmɛ na nɔ ganji tɔn tò ɔ tɔn (NHIS)", "Nɔ lɛ sín lanmɛ na nɔ ganji vɔ̌nu", "Dialyse vɔ̌nu (sín décembre 2024)", "LEAP akwɛ ɖiɖe"] },
    ],
    cta2_title: "A ɖò gbesisɔmɛ bo na mɔ nǔ e jɛxa we é à?",
    cta2_sub: "Blǒ xóɖɔɖókpɔ́ ɖé. É nɔ ɖu cɛju 2 mɔ̌ ǎ.",
    cta2_btn: "Bɛ̌ dìn →",
  },
  wo: {
    nav_countries: "Bénin · Sénégal · Ghana",
    h1a: "Ndimbalu mbooloo am na.",
    h1b: "Nanu wut sa bos.",
    sub: "Njaboot yi duñu am ndimmbal lu leen yelloo ci yoon — bis bu nekk. Du ndax amul, waaye ndax sistem bi jafe navigate. NAWIRI moy pont bi.",
    quote: "« Nit ñi dañuy faral di ñàkka am ndimbal, te du ndax amul, waaye ndax sistem bi dafa jafe lool ngir doxal. »",
    cta: "Tambalil leegi, doo fay",
    demo_user: "Sama doom amna 3 at te dafay faral di feebar. Amu nu assurance wérgi-yaram. Maa ngi dëkk Bénin.",
    demo_q: "Ndax bind nga sa tur ci sistem biometrik ANIP (kàrtu identite nasonaal)?",
    stats: [
      { value: "22", label: "prograam yuñ bind" },
      { value: "3",  label: "réew yiñ wax" },
      { value: "5",  label: "làkk yiñ jàppale" },
    ],
    how_title: "Nimuy doxee",
    steps: [
      { n: "01", title: "Bindal ci kàddu yu leer", desc: "Angale, Français wala sa làkku dëkk bi. Waxñu sa dundu ci lu leer — amul benn xeetu mbind, amul benn jargon." },
      { n: "02", title: "NAWIRI dafa laaj benn laaj", desc: "Benn yoon, ngir xam bu baax ban prograam moo méngoo ak sa dundu." },
      { n: "03", title: "Danga am pexe jëf bu leer", desc: "Turu prograam bi, këyitu waajal yi, jéego yi ci topp, jokkool ofisel bi." },
      { n: "04", title: "Yaa ngi xool ba noppi jëfandikoo", desc: "NAWIRI dafay jubal. Baŋxaas ofisel bi mooy firndeel. Yaay jël dogal — saa yu nekk." },
    ],
    why_title: "Lu tax IA te du motëru seetlu",
    why_items: [
      { icon: "brain",  title: "Dafa xam sa dundu", desc: "Formileer mënul jàpp tegtal bu amul benn mbind buy jaxase wérgi-yaram, xaalis ak siñaal famiy ci benn yoon. NAWIRI mën na." },
      { icon: "scale",  title: "Dafay romb kritër yiñ tëral", desc: "Fukki-fukki variable ci prograam bu nekk. Jumtukaay bu taxaw mënul jëfandikoo kombinatorik. NAWIRI def ko." },
      { icon: "shield", title: "Dafay tegtal — du musa jël dogal", desc: "NAWIRI dafay jubal. Du musa firndeel ni yelloo nañu ko. Agent ofisel kese moo mëna saytu fichier bi." },
    ],
    countries_title: "Prograam yiñ wax",
    countries: [
      { flag: "BJ", name: "Bénin",   count: "11 prograam", items: ["Assurance wérgi-yaram bu war (AMO/ARCH)", "Faj sibbiru bu amul fey ngir xale yu tolluwul ci 5 at ak jigéen ñu ëmb", "Sesarean gratuit", "Microcrédit Alafia (FNM)", "GBESSOKÉ xaliss", "ARV ak pajum VIH te doo fay", "Pension magget yu CNSS"] },
      { flag: "SN", name: "Sénégal", count: "7 prograam",  items: ["Mutuel yu wérgi-yaram ci askan wi (CMU)", "Xale yu tolluwul ci 5 at ñu ngi koy toppatoo te doo fay", "Plan Sésame (60+)", "Kaaraange njaboot (PNBSF)", "Sesarean gratuit", "Dialyse buy maye", "Kartu yamale sañ-sañ (invalidite)"] },
      { flag: "GH", name: "Gana",    count: "4 prograam",  items: ["Assurance Wérgi-yaram bu Réew mi (NHIS)", "Toppatoo wérgi-yaramu yaay bu amul fey", "Dialyse buy maye (decembre 2024 ba leegi)", "LEAP xaalis"] },
    ],
    cta2_title: "Ndax waajal nga gis li nga yelloo?",
    cta2_sub: "Tambalil waxtaan. Du def lu ëpp 2 simili.",
    cta2_btn: "Tambalil leegi →",
  },
  tw: {
    nav_countries: "Benin · Senegal · Ghana",
    h1a: "Ɔmanfo mmoa wɔ hɔ.",
    h1b: "Momma yɛnhwehwɛ wo de.",
    sub: "Mmusua hwere mmoa a wɔwɔ hokwan wɔ mmara mu — da biara da. Ɛnyɛ sɛ enni hɔ nti, na mmom esiane sɛ ɛyɛ den dodo sɛ wobɛfa nhyehyɛe no mu nti. NAWIRI ne bridge no.",
    quote: "« Nkurɔfo taa hwere mmoa ɛnyɛ sɛ enni hɔ nti, na mmom esiane sɛ nhyehyɛe no yɛ den dodo sɛ wɔbɛfa mu nti. »",
    cta: "Fi ase mprempren, ɛyɛ kwa",
    demo_user: "Me ba adi mfe 3 na ɔtaa yare. Yenni akwahosan ho insurance biara. Mete Benin.",
    demo_q: "So woakyerɛw wo din wɔ ANIP biometric nhyehyɛe (ɔman ID krataa) mu?",
    stats: [
      { value: "22", label: "nhyehyɛe ahorow a wɔakyerɛw ato hɔ" },
      { value: "3",  label: "aman a wɔka ho asɛm" },
      { value: "5",  label: "kasa horow a wɔboa" },
    ],
    how_title: "Sɛnea ɛyɛ adwuma",
    steps: [
      { n: "01", title: "Fa nsɛmfua a emu da hɔ kyerɛw", desc: "Borɔfo, Franse kasa, anaa wo kurom kasa. Kyerɛkyerɛ wo tebea no mu kwa — ɔkwan biara nni hɔ, kasakoa biara nni hɔ." },
      { n: "02", title: "NAWIRI bisa asɛm biako", desc: "Bere bi mu no, sɛnea ɛbɛyɛ a wobɛkyerɛ dwumadi ahorow a ɛne wo tebea no hyia pɛpɛɛpɛ." },
      { n: "03", title: "Wo nsa ka adeyɛ nhyehyɛe a emu da hɔ", desc: "Dwumadi no din, nkrataa a ɛsɛ sɛ wosiesie, anammɔn a edi hɔ pɛpɛɛpɛ, aban nkitahodi." },
      { n: "04", title: "Wohwɛ sɛ ɛyɛ nokware na woyɛ ho biribi", desc: "NAWIRI akwankyerɛfo. Aban kuw no gye tom. Wo na wo si gyinae — bere nyinaa." },
    ],
    why_title: "Dɛn nti na AI na ɛnyɛ search engine",
    why_items: [
      { icon: "brain",  title: "Ɛte wo tebea no ase", desc: "Krataa bi ntumi nte nkyerɛkyerɛmu a wɔde nsɛm a wɔakyerɛw a wɔmfa hwee nto mu a ɛde akwahosan, sikasɛm ne abusua nsɛnkyerɛnne frafra prɛko pɛ no ase. NAWIRI betumi." },
      { icon: "scale",  title: "Ɛtwa gyinapɛn ahorow a wɔde fata ho", desc: "Nsakrae ahorow du du pii wɔ dwumadi biara mu. Adwinnade a ɛyɛ static ntumi nni combinatorics no ho dwuma. NAWIRI yɛ saa." },
      { icon: "shield", title: "Ɛkyerɛ kwan — ɛnsi gyinae da", desc: "NAWIRI kyerɛ kwan. Ɛnkyerɛ sɛ obi fata da. Ɔmanpanyin a ɔyɛ ɔnanmusifo nkutoo na obetumi agye fael bi atom." },
    ],
    countries_title: "Dwumadi ahorow a wɔka ho asɛm",
    countries: [
      { flag: "BJ", name: "Benin",   count: "11 dwumadi", items: ["Akwahosan ho insurance a ɛyɛ ahyɛde (AMO/ARCH)", "Mmofra a wonnii mfe 5 ne mmea a wɔyem a wɔhwɛ wɔn a wontua hwee wɔ asramma ho", "Oprehyɛn a wontua hwee", "Alafia bosea nketewa (FNM)", "GBESSOKÉ sika a wɔde kɔma afoforo", "ARV ne HIV hwɛ a wontua hwee", "CNSS nkwakoraa ne mmerewa pɛnhyen sika"] },
      { flag: "SN", name: "Senegal", count: "7 dwumadi",  items: ["Mpɔtam hɔ akwahosan ho nhyehyɛe (CMU)", "Wɔhwɛ mmofra a wonnii mfe 5 a wontua hwee", "Nhyehyɛe Sésame (60+)", "Abusua Ahobammɔ Ho Mmoa (PNBSF)", "Oprehyɛn a wontua hwee", "Dialysis a wɔde ma kwa", "Hokwan a Ɛyɛ Pɛ Kaad (dɛmdi)"] },
      { flag: "GH", name: "Ghana",   count: "4 dwumadi",  items: ["Ɔman Akwahosan Insurance (NHIS)", "Ɛnanom akwahosan ho nhyehyɛe a wontua hwee", "Dialysis a wontua hwee (efi December 2024)", "LEAP sika a wɔde mena"] },
    ],
    cta2_title: "Woasiesie wo ho sɛ wubenya nea wowɔ hokwan sɛ wunya?",
    cta2_sub: "Fi ase mmɔ nkɔmmɔ. Egye nea ennu simma 2.",
    cta2_btn: "Fi ase mprempren →",
  },
};

// ─── SVG icon set ──────────────────────────────────────────────────────────────

const ICONS = {
  brain: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/>
      <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/>
    </svg>
  ),
  scale: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/>
      <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/>
      <path d="M7 21h10"/>
      <path d="M12 3v18"/>
      <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/>
    </svg>
  ),
  shield: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      <polyline points="9 12 11 14 15 10"/>
    </svg>
  ),
};

function FlagBadge({ code }) {
  return (
    <div style={{
      width: 36, height: 36, borderRadius: 10, flexShrink: 0,
      background: "var(--primary)", color: "#fff",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 11,
      letterSpacing: "0.05em",
    }}>
      {code}
    </div>
  );
}

// ─── UI language switcher (globe dropdown, Oreus-style) ─────────────────────────

const UI_LANGS = [
  { code: "en", label: "English" },
  { code: "fr", label: "Français" },
];
const UI_LANGS_AFRICAN = [
  { code: "fon", label: "Fɔngbe" },
  { code: "wo",  label: "Wolof" },
  { code: "tw",  label: "Twi" },
];
const LANG_SHORT = { en: "EN", fr: "FR", fon: "Fɔn", wo: "Wol", tw: "Twi" };
const NAV_START  = { en: "Start", fr: "Commencer", fon: "Bɛ̌ dìn", wo: "Tambalil", tw: "Fi ase" };
const ONLINE     = { en: "Online", fr: "En ligne", fon: "Ðò te", wo: "Ci kaw", tw: "Wɔ hɔ" };

function LangSwitcher({ lang, setLang }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);

  useEffect(() => {
    function onClick(e) {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <div ref={wrapRef} style={{ position: "relative", flexShrink: 0 }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          display: "inline-flex", alignItems: "center", gap: 7,
          fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 700,
          color: open ? "var(--primary)" : "var(--text-2)",
          background: open ? "var(--primary-soft)" : "var(--bg-card)",
          border: "1.5px solid " + (open ? "var(--primary)" : "var(--border)"),
          cursor: "pointer", padding: "6px 12px", borderRadius: "var(--radius)",
          letterSpacing: "0.02em", transition: "all 0.15s",
        }}
        onMouseEnter={e => { if (!open) { e.currentTarget.style.borderColor = "var(--primary)"; e.currentTarget.style.color = "var(--primary)"; } }}
        onMouseLeave={e => { if (!open) { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-2)"; } }}
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
        <span>{LANG_SHORT[lang] || lang.toUpperCase()}</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
             style={{ opacity: 0.6, transition: "transform 0.2s", transform: open ? "rotate(180deg)" : "none" }}>
          <polyline points="6,9 12,15 18,9" />
        </svg>
      </button>

      {open && (
        <div style={{
          position: "absolute", right: 0, top: "calc(100% + 8px)", width: 184,
          background: "var(--bg-card)", border: "1.5px solid var(--border)",
          borderRadius: 12, boxShadow: "0 12px 32px rgba(0,0,0,0.13)",
          overflow: "hidden", padding: 4, zIndex: 500,
        }}>
          {UI_LANGS.map(({ code, label }) => (
            <LangItem key={code} code={code} label={label} active={lang === code}
                      onPick={() => { setLang(code); setOpen(false); }} />
          ))}

          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 10px 6px" }}>
            <div style={{ flex: 1, height: 1, background: "var(--border-soft)" }} />
            <span style={{
              fontSize: 9, fontWeight: 700, color: "var(--text-3)",
              textTransform: "uppercase", letterSpacing: "0.08em", whiteSpace: "nowrap",
            }}>
              African Languages
            </span>
            <div style={{ flex: 1, height: 1, background: "var(--border-soft)" }} />
          </div>

          {UI_LANGS_AFRICAN.map(({ code, label }) => (
            <LangItem key={code} code={code} label={label} active={lang === code}
                      onPick={() => { setLang(code); setOpen(false); }} />
          ))}
        </div>
      )}
    </div>
  );
}

function LangItem({ label, active, onPick }) {
  return (
    <button
      onClick={onPick}
      style={{
        display: "flex", alignItems: "center", gap: 10, width: "100%",
        padding: "11px 14px", borderRadius: 8, border: "none", cursor: "pointer",
        textAlign: "left", background: active ? "var(--primary-soft)" : "transparent",
        color: active ? "var(--primary)" : "var(--text-2)",
        fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 14,
        transition: "background 0.12s, color 0.12s",
      }}
      onMouseEnter={e => { if (!active) e.currentTarget.style.background = "var(--bg-subtle)"; }}
      onMouseLeave={e => { if (!active) e.currentTarget.style.background = "transparent"; }}
    >
      <span style={{
        width: 8, height: 8, borderRadius: "50%", flexShrink: 0,
        background: active ? "var(--primary)" : "var(--border)",
      }} />
      {label}
    </button>
  );
}

// ─── Landing page ───────────────────────────────────────────────────────────────

export default function Landing() {
  const [lang, setLang] = useState("en");
  const router = useRouter();
  const t = T[lang];

  // Restore the chosen UI language from a previous visit.
  useEffect(() => {
    const saved = localStorage.getItem("nawiri_lang");
    if (saved && T[saved]) setLang(saved);
  }, []);

  function changeLang(code) {
    setLang(code);
    localStorage.setItem("nawiri_lang", code);
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "var(--bg)" }}>

      {/* ── NAV ────────────────────────────────────────────────────────────── */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 50,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 clamp(16px, 4vw, 40px)", height: 60,
        background: "rgba(245,242,235,0.94)", backdropFilter: "blur(14px)",
        borderBottom: "1px solid var(--border-soft)",
      }}>
        <span style={{
          fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800,
          fontSize: 20, letterSpacing: "-0.5px", color: "var(--primary)",
        }}>
          NAWIRI
        </span>

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ fontSize: 12, color: "var(--text-3)", display: "none" }} className="nav-countries">
            {t.nav_countries}
          </span>
          <LangSwitcher lang={lang} setLang={changeLang} />

          <button
            onClick={() => router.push("/chat")}
            style={{
              padding: "7px 18px", borderRadius: "var(--radius)",
              background: "var(--primary)", border: "none", color: "#fff",
              fontSize: 13, fontWeight: 700, cursor: "pointer",
              fontFamily: "'Space Grotesk', sans-serif",
              letterSpacing: "-0.2px", transition: "background 0.15s",
            }}
            onMouseEnter={e => e.currentTarget.style.background = "var(--primary-dark)"}
            onMouseLeave={e => e.currentTarget.style.background = "var(--primary)"}
          >
            {NAV_START[lang] || "Start"} →
          </button>
        </div>
      </nav>

      {/* ── HERO ───────────────────────────────────────────────────────────── */}
      <section style={{ padding: "80px clamp(16px, 4vw, 40px) 64px" }}>
        <div style={{
          maxWidth: 1120, margin: "0 auto",
          display: "flex", gap: 64, alignItems: "center", flexWrap: "wrap",
        }}>

          {/* Copy */}
          <div className="anim-fade-up" style={{ flex: "1 1 400px" }}>
            <h1 style={{
              fontSize: "clamp(36px, 5vw, 60px)",
              color: "var(--text)", marginBottom: 20, lineHeight: 1.1,
            }}>
              {t.h1a}
              <br />
              <span style={{ color: "var(--primary)" }}>{t.h1b}</span>
            </h1>

            <p style={{
              fontSize: 17, color: "var(--text-2)", lineHeight: 1.75,
              maxWidth: 480, marginBottom: 36,
            }}>
              {t.sub}
            </p>

            <blockquote style={{
              borderLeft: "3px solid var(--primary)",
              paddingLeft: 16, marginBottom: 40,
              fontSize: 14, fontStyle: "italic",
              color: "var(--text-3)", lineHeight: 1.65, maxWidth: 420,
            }}>
              {t.quote}
            </blockquote>

            <button
              onClick={() => router.push("/chat")}
              style={{
                padding: "16px 32px", borderRadius: "var(--radius-lg)",
                background: "var(--primary)", color: "#fff", border: "none",
                fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
                fontSize: 16, letterSpacing: "-0.2px", cursor: "pointer",
                boxShadow: "0 4px 20px rgba(192,90,60,0.3)",
                transition: "all 0.15s",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "var(--primary-dark)"; e.currentTarget.style.boxShadow = "0 6px 24px rgba(192,90,60,0.4)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "var(--primary)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(192,90,60,0.3)"; }}
            >
              {t.cta}
            </button>
          </div>

          {/* Chat demo mockup */}
          <div className="anim-fade-up anim-delay-2" style={{
            flex: "0 1 400px", width: "100%",
            background: "var(--bg-card)",
            borderRadius: "var(--radius-xl)",
            border: "1px solid var(--border-soft)",
            boxShadow: "0 8px 48px rgba(0,0,0,0.09)",
            overflow: "hidden",
          }}>
            {/* Mock top bar */}
            <div style={{
              padding: "14px 20px",
              borderBottom: "1px solid var(--border-soft)",
              display: "flex", alignItems: "center", gap: 10,
              background: "var(--bg)",
            }}>
              <div style={{
                width: 30, height: 30, borderRadius: "50%",
                background: "var(--primary)", color: "#fff",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 14,
              }}>N</div>
              <div>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 13, color: "var(--text)" }}>NAWIRI</div>
                <div style={{ fontSize: 11, color: "#4A7C59", fontWeight: 600 }}>● {ONLINE[lang] || "Online"}</div>
              </div>
            </div>

            {/* Messages */}
            <div style={{ padding: "20px 16px", display: "flex", flexDirection: "column", gap: 14 }}>

              {/* User bubble */}
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <div style={{
                  maxWidth: "82%", padding: "10px 14px",
                  borderRadius: "14px 4px 14px 14px",
                  background: "var(--primary)", color: "#fff",
                  fontSize: 13, lineHeight: 1.55,
                }}>
                  {t.demo_user}
                </div>
              </div>

              {/* NAWIRI reply */}
              <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                <div style={{
                  width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
                  background: "var(--primary)", color: "#fff",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 12,
                }}>N</div>
                <div style={{
                  flex: 1, padding: "10px 14px",
                  background: "var(--bg-subtle)",
                  borderRadius: "4px 14px 14px 14px",
                  fontSize: 13, lineHeight: 1.55, color: "var(--text)",
                }}>
                  {t.demo_q}
                </div>
              </div>

              {/* Typing indicator */}
              <div style={{
                display: "flex", gap: 5, alignItems: "center",
                marginLeft: 36, opacity: 0.6,
              }}>
                {[0,1,2].map(i => (
                  <span key={i} style={{
                    width: 5, height: 5, borderRadius: "50%",
                    background: "var(--text-3)", display: "inline-block",
                    animation: `dot-bounce 1.2s ease-in-out ${i * 0.2}s infinite`,
                  }} />
                ))}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ── STATS BAR ──────────────────────────────────────────────────────── */}
      <div style={{
        borderTop: "1px solid var(--border-soft)",
        borderBottom: "1px solid var(--border-soft)",
        background: "var(--bg-card)",
        padding: "28px clamp(16px, 4vw, 40px)",
      }}>
        <div style={{
          maxWidth: 1120, margin: "0 auto",
          display: "flex", justifyContent: "center",
          gap: "clamp(32px, 6vw, 80px)", flexWrap: "wrap",
        }}>
          {t.stats.map((s, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{
                fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800,
                fontSize: "clamp(32px, 4vw, 44px)", color: "var(--primary)",
                letterSpacing: "-2px", lineHeight: 1,
              }}>
                {s.value}
              </div>
              <div style={{ fontSize: 13, color: "var(--text-3)", marginTop: 4, fontWeight: 500 }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── HOW IT WORKS ───────────────────────────────────────────────────── */}
      <section style={{ padding: "80px clamp(16px, 4vw, 40px)", background: "var(--bg)" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(24px, 3vw, 32px)", textAlign: "center", marginBottom: 56 }}>
            {t.how_title}
          </h2>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 16,
          }}>
            {t.steps.map((step, i) => (
              <div key={i} style={{
                padding: "28px 24px",
                background: "var(--bg-card)",
                border: "1px solid var(--border-soft)",
                borderRadius: "var(--radius-lg)",
                position: "relative", overflow: "hidden",
              }}>
                <div style={{
                  position: "absolute", top: 0, left: 0,
                  width: "100%", height: 3, background: "var(--primary)",
                  opacity: 0.15 + i * 0.25,
                }} />
                <div style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 800, fontSize: 11, color: "var(--primary)",
                  letterSpacing: "0.12em", marginBottom: 14,
                }}>
                  {step.n}
                </div>
                <div style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 700, fontSize: 15, color: "var(--text)", marginBottom: 10,
                  lineHeight: 1.3,
                }}>
                  {step.title}
                </div>
                <div style={{ fontSize: 13.5, color: "var(--text-2)", lineHeight: 1.65 }}>
                  {step.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY AI ─────────────────────────────────────────────────────────── */}
      <section style={{
        padding: "80px clamp(16px, 4vw, 40px)",
        background: "var(--bg-card)",
        borderTop: "1px solid var(--border-soft)",
      }}>
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(24px, 3vw, 32px)", textAlign: "center", marginBottom: 56 }}>
            {t.why_title}
          </h2>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 20,
          }}>
            {t.why_items.map((item, i) => (
              <div key={i} style={{
                padding: "32px 28px",
                background: "var(--bg)",
                border: "1px solid var(--border-soft)",
                borderRadius: "var(--radius-lg)",
              }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 12, marginBottom: 18,
                  background: "var(--primary-soft)", color: "var(--primary)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  {ICONS[item.icon]}
                </div>
                <div style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 700, fontSize: 16, color: "var(--text)", marginBottom: 10, lineHeight: 1.3,
                }}>
                  {item.title}
                </div>
                <div style={{ fontSize: 14, color: "var(--text-2)", lineHeight: 1.7 }}>
                  {item.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROGRAMS COVERED ───────────────────────────────────────────────── */}
      <section style={{
        padding: "80px clamp(16px, 4vw, 40px)",
        background: "var(--bg)",
        borderTop: "1px solid var(--border-soft)",
      }}>
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(24px, 3vw, 32px)", textAlign: "center", marginBottom: 56 }}>
            {t.countries_title}
          </h2>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 20,
          }}>
            {t.countries.map(c => (
              <div key={c.name} style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border-soft)",
                borderRadius: "var(--radius-lg)",
                overflow: "hidden",
              }}>
                {/* Country header */}
                <div style={{
                  padding: "20px 24px 16px",
                  background: "var(--primary-soft)",
                  borderBottom: "1px solid #F6AB99",
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <FlagBadge code={c.flag} />
                    <span style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontWeight: 700, fontSize: 18, color: "var(--text)",
                    }}>{c.name}</span>
                  </div>
                  <span style={{
                    fontSize: 11, fontWeight: 700, color: "var(--primary)",
                    background: "#fff", padding: "3px 10px",
                    borderRadius: 99, border: "1px solid #F6AB99",
                  }}>{c.count}</span>
                </div>

                {/* Programs list */}
                <ul style={{ listStyle: "none", padding: "20px 24px", display: "flex", flexDirection: "column", gap: 9 }}>
                  {c.items.map((item, i) => (
                    <li key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                      <span style={{
                        width: 5, height: 5, borderRadius: "50%",
                        background: "var(--primary)", flexShrink: 0, marginTop: 7,
                      }} />
                      <span style={{ fontSize: 13, color: "var(--text-2)", lineHeight: 1.5 }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRE-FOOTER CTA ─────────────────────────────────────────────────── */}
      <section style={{
        padding: "80px clamp(16px, 4vw, 40px)",
        background: "var(--primary)",
        textAlign: "center",
      }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <h2 style={{
            fontSize: "clamp(24px, 3.5vw, 36px)",
            color: "#fff", marginBottom: 16, lineHeight: 1.2,
          }}>
            {t.cta2_title}
          </h2>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.8)", marginBottom: 36 }}>
            {t.cta2_sub}
          </p>
          <button
            onClick={() => router.push("/chat")}
            style={{
              padding: "16px 40px", borderRadius: "var(--radius-lg)",
              background: "#fff", color: "var(--primary)",
              border: "none",
              fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
              fontSize: 16, cursor: "pointer",
              boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
              transition: "all 0.15s",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "var(--primary-soft)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "#fff"; }}
          >
            {t.cta2_btn}
          </button>
        </div>
      </section>


      <style>{`
        @keyframes dot-bounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40% { transform: translateY(-4px); opacity: 1; }
        }
        @media (min-width: 640px) {
          .nav-countries { display: block !important; }
        }
      `}</style>
    </div>
  );
}
