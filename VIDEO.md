# NAWIRI — Pitch video script (3–5 min) + shot plan

> FR — But : une vidéo de ~4 min qui mappe le barème (Problem 20 / AI Reasoning 30 /
> Architecture 25 / Impact 15 / Responsible AI 10) et mène le récit sur l'**impact social**.
> Outil conseillé : Loom ou OBS. Démo en **navigation privée** + idéalement une vue **mobile**
> (les juges valorisent le public faible-connexion). Parle lentement, montre, ne lis pas l'écran.
> Garde-la sous 5 min (limite stricte). Sous-titres anglais recommandés.

---

## Découpage (cible ~4:00)

### 0:00–0:30 — Accroche + problème (dimension Problem 20%)
**À l'écran** : ton visage (webcam) ou une photo simple ; puis la phrase du brief en gros.
**Dire (EN)** :
> "In West Africa, a mother whose child is sick often doesn't take them to the clinic — because she thinks she can't afford it. But her child is legally entitled to free care. The program exists. She just has no way to know.
> As this hackathon's brief says: *people miss help not because it doesn't exist, but because the system is too hard to navigate.*
> We are a Beninese team. This isn't a story we read — it's the reality around us. So we built NAWIRI."

### 0:30–1:15 — Ce que c'est + pourquoi l'IA (dimension AI Reasoning 30% ★)
**À l'écran** : la landing NAWIRI (stats 25 / 3 / 5), puis ouvre le chat.
**Dire (EN)** :
> "NAWIRI is a conversational assistant. You describe your situation in plain words — in English, French, or a local language — and it tells you which real public programs may fit you, the exact documents, the next step, and the official office.
> Why AI and not a form or a Google search? A form can't understand a sentence that mixes health, money and family. Eligibility depends on dozens of variables across 25 programs in three countries. NAWIRI reads all the signals at once, asks the single most useful question, and crosses your situation against the real rules. It interprets — it doesn't just list links."

### 1:15–3:15 — Démo live (dimensions Architecture 25% + Impact 15%)

**Scénario A — Bénin, enfant malade (le cœur de l'impact)**
**Taper** : *"My child is 3 and often sick. We have no health insurance. I live in Benin."*
**Montrer** : la réponse structurée qui arrive en streaming → programme (gratuité paludisme / AMO-ARCH), **carte ANIP en 1re étape**, contact ANPS, puis cliquer le **lien-carte** → vol vers l'ANPS sur la carte.
**Dire** :
> "Notice: it doesn't dump everything. It asks one question, then gives a real plan — and because almost everything in Benin needs the ANIP biometric card, it makes that the first step. One click opens the official office on the map."

**Scénario B — le raisonnement croisé pays×règle (le moment fort)**
**Taper** : *"Is dialysis free in Benin?"* → montrer la réponse **« No, not free in Benin »**.
Puis : *"And in Senegal?"* → **« Yes, free, with a nephrologist's prescription + waiting list. »**
**Dire** :
> "This is what a directory or a search engine can't do. Same question, opposite truthful answers per country — and it refuses to create false hope. That's the interpretation that matters."

**Scénario C — fraîcheur des données + langue locale (30 s, optionnel mais fort)**
**Taper** (Ghana) : *"I'm poor and can't afford anything, I just need basic care now."* → montrer qu'il cite **Free Primary Healthcare, lancé en avril 2026**.
Puis basculer la langue sur **Fɔngbe** et taper une phrase simple → montrer la réponse dans la langue.
**Dire** :
> "Our data is verified to June 2026 — it even knows policies launched weeks ago, like Ghana's Free Primary Healthcare. And it meets people in their own language — Fɔngbe, Wolof, Twi."

### 3:15–3:45 — Responsible AI + human-in-the-loop (dimension Responsible AI 10%)
**À l'écran** : surligner dans une réponse « you could be eligible » + « verify with the official body ».
**Dire (EN)** :
> "Responsible by design. NAWIRI never says 'you are eligible' — only 'you could be', and always 'verify with the official body'. It never invents a number. A medical emergency triggers 'go to the nearest facility' first. And it never validates a file — only a human agent does. We tested 25 real scenarios against the live model; all 25 were correct."

### 3:45–4:00 — Clôture (Impact + équipe)
**Dire (EN)** :
> "The decision NAWIRI helps with is simple but huge: *do I take my sick child to the doctor today?* Before, the answer was 'I can't afford it.' After, it's 'yes — here's how.' That's NAWIRI. Thank you."

---

## Conseils de tournage
- **Navigation privée** + connexion correcte pour éviter toute latence/quota pendant la prise.
- Pré-écris les phrases à taper (copier-coller) pour ne pas hésiter à l'écran.
- Si une réponse est longue, accélère légèrement (x1.25) au montage plutôt que d'attendre.
- Montre AU MOINS une fois le **lien-carte** et le **contraste dialyse** — ce sont nos 2 moments différenciants.
- Termine sur la phrase « do I take my sick child to the doctor today? » (decision impact).
- Upload en **public** (YouTube non répertorié ou Loom public) ; teste le lien en navigation privée.

## Checklist pré-enregistrement
- [ ] Clé Gemini régénérée + quota OK (sinon la démo peut tomber en panne en plein tournage)
- [ ] Démo ouverte en navigation privée, langue par défaut = anglais
- [ ] Phrases des 3 scénarios prêtes à coller
- [ ] Durée finale < 5:00
