# PROGRAMS DATABASE — SENEGAL
### NAWIRI — Structured data for the AI engine
**Country:** Republic of Senegal
**Last updated:** 14 June 2026
**Verification status:** Data collected from official public sources (sante.gouv.sn, sencsu.sn / agencecmu.sn, senegalservices.sn, devcommunautaire.gouv.sn, senegal-emergent.com, WHO, World Bank, CLEISS). Each program lists its source.

> ⚠️ IMPORTANT METHODOLOGICAL NOTE
> Two updates vs the NAWIRI.md document:
> 1. **The CMU agency has been renamed.** Since decree No. 2024-832 of 27 March 2024, the former **ANACMU** (Agence Nationale de la CMU) became the **SEN-CSU** (Agence Sénégalaise de la Couverture Sanitaire Universelle). New site: **sencsu.sn** (the old **agencecmu.sn** still works). It is now steered by the **Ministry of Family and Solidarity**.
> 2. **The Bourse de Sécurité Familiale (PNBSF) amount changed:** since December 2022 it is **35,000 FCFA per quarter = 140,000 FCFA/year** (not 100,000 FCFA/year as in NAWIRI.md).

---

## TARGETING TOOL — RNU (context, not a program)

- **Name:** RNU — Registre National Unique (National Single Registry)
- **Role:** the institutional targeting database used to select beneficiaries of social programs (PNBSF, free CMU enrollment for the indigent, etc.).
- **Implication for the AI:** several programs (cash transfer, free health insurance for the poor) draw their beneficiaries from the RNU. If a household is not in the RNU, the first step is often to get registered at the **town hall / departmental social services (Service Départemental de l'Action Sociale)**.
- **Source:** senegal-emergent.com, Ministry of Family and Solidarity.

---

## PROGRAM 1 — CMU: COMMUNITY HEALTH MUTUALS (main pillar) ⭐

- **Program name:** Universal Health Coverage (CMU) via community health mutuals (mutuelles de santé)
- **Managing body:** **SEN-CSU** (ex-ANACMU), under the Ministry of Family and Solidarity
- **Who it is for:** anyone aged **18+** can join a health mutual, for themselves and their dependents — especially **informal-sector workers** and rural populations not covered by formal insurance.
- **What it offers (care package):**
  - **80% coverage** for care in **public** health facilities and for **generic medicines**.
  - **50% coverage** at private pharmacies.
  - The insured pays the remaining share (co-payment).
- **Cost (annual contribution):**
  - **7,000 FCFA per person per year**.
  - **Subsidized 50%** by the State for those able to contribute → **3,500 FCFA** payable.
  - **Free (100% covered)** for **indigent** persons (identified via the RNU).
  - Plus one-time **membership fee** (droits d'adhésion) set by each mutual.
- **Documents required:** ID document (CNI), be 18+, information on dependents.
- **Exact procedure (steps):**
  1. Find the **community health mutual of your commune** (≈675 mutuals nationwide, at least one per commune).
  2. Pay the membership fee + the annual contribution (or the subsidized/free rate if eligible).
  3. Register yourself and your dependents → receive your membership card.
  4. Observe any waiting period before benefits start, then use the card in contracted public facilities.
- **Contact:** SEN-CSU — **sencsu.sn** (old: agencecmu.sn) | Ministry of Health — sante.gouv.sn | local commune health mutual / town hall.
- **What it does not cover / limits:**
  - Co-payment remains (20% public, 50% private pharmacy).
  - **Systematic exclusions:** cosmetic surgery, complex dental prosthetics, medicines off the essential-medicines list, and medical evacuation abroad.
  - Requires regular contribution payment to keep benefits active.
  - Free enrollment is reserved for the **indigent identified via the RNU**.
- **Sources:** sante.gouv.sn (CMU dossier), sencsu.sn, WHO Afro, Better Than Cash Alliance, getreliancehealth.com.

---

## PROGRAM 2 — FREE CARE FOR CHILDREN UNDER 5

- **Name:** Free healthcare for children aged 0 to 5 (gratuité des soins des moins de 5 ans)
- **Body:** Ministry of Health and Social Action (in force since October 2013)
- **Who it is for:** **any Senegalese child under 5 years old**.
- **What it offers:** free consultations, care and hospitalization in **all public health facilities** (health posts, health centers and hospitals).
- **Documents required:** the child's **health booklet, birth certificate, vaccination booklet, or any civil-status document proving the child's age**.
- **Procedure:** simply present the child at any public health facility with a document proving age — **no prior registration**; the free service applies on the spot.
- **Contact:** Ministry of Health — **sante.gouv.sn** | nearest public health post/center.
- **Limits:** applies to public facilities (not private); proof of age required.
- **Sources:** senegalservices.sn, agencecmu.sn (0-5 ans), santetropicale.com.

---

## PROGRAM 3 — PLAN SÉSAME: FREE CARE FOR THE ELDERLY (60+)

- **Name:** Plan Sésame
- **Body:** Ministry of Health and Social Action (launched 2006)
- **Who it is for:** Senegalese aged **60 and over**.
- **What it offers:** free care — consultations, hospitalization and certain treatments — in public health facilities.
- **Documents required:** ID document proving age (60+); proof of residence helpful.
- **Procedure:** present at a public health facility with an ID proving age 60+ to access free care under Plan Sésame.
- **Contact:** Ministry of Health — sante.gouv.sn | nearest public health facility.
- **Limits:** known funding/execution constraints; coverage may vary by facility and by service; some specialized care may remain partly payable.
- **Sources:** senegalservices.sn, Cairn/Santé Publique, Jeune Afrique, sante.gouv.sn.

---

## PROGRAM 4 — FREE DIALYSIS

- **Name:** Free dialysis (gratuité de la dialyse)
- **Body:** Ministry of Health and Social Action / CMU programs
- **Who it is for:** any **Senegalese patient with chronic kidney failure**, on a nephrologist's prescription.
- **What it offers:** free dialysis sessions in public health facilities.
- **Documents required:** **prescription from a nephrologist** confirming chronic kidney failure; ID document.
- **Procedure:** obtain the nephrologist's prescription → **register on the waiting list of a dialysis center** in a public health facility → start sessions when a slot is available.
- **Contact:** Ministry of Health — sante.gouv.sn | public dialysis center / referral hospital.
- **Limits:** limited number of machines/slots → **waiting lists**; depends on dialysis-center capacity.
- **Sources:** senegalservices.sn, sante.gouv.sn, agencecmu.sn (dialyse), allodocteurs.fr.

---

## PROGRAM 5 — FREE CESAREAN SECTION

- **Name:** Free cesarean section (gratuité de la césarienne)
- **Body:** Ministry of Health and Social Action
- **Who it is for:** **all women** requiring a cesarean in a public health facility.
- **What it offers:** free coverage of the cesarean procedure (part of the reinforced free-care programs alongside Plan Sésame and under-5 care).
- **Documents required:** present at the public maternity/hospital; ID document if available (emergencies take precedence).
- **Procedure:** go to a public facility offering maternity/surgery services; the free coverage applies on site.
- **Contact:** Ministry of Health — sante.gouv.sn | nearest public health facility with maternity services.
- **Limits:** concerns the cesarean act; some related care/consumables may remain payable depending on the facility.
- **Sources:** sante.gouv.sn, senegalservices.sn, WHO.

---

## PROGRAM 6 — PNBSF: FAMILY SECURITY GRANT (cash transfer)

- **Name:** National Family Security Grant Program (PNBSF — Programme National de Bourses de Sécurité Familiale)
- **Body:** Ministry of Family and Solidarity (steered via national community-development services)
- **Who it is for:** **households in extreme poverty** with **school-age children (6–12 years)**. Beneficiaries are selected from the **RNU** (National Single Registry).
- **What it offers:** a quarterly **cash transfer of 35,000 FCFA** → **140,000 FCFA per year** (raised from 100,000 FCFA/year since December 2022). Targets ~500,000 households.
- ⚠️ **Status (2026):** payments were **paused pending an audit of the RNU**, then **resumed**. The **Q1 2026 instalment (35,000 FCFA) began on 19 March 2026** for **~355,013 beneficiary households** (second phase of the PNBSF). The program is **active again but being re-targeted via the audited RNU** — getting registered at the town hall / departmental social services is what matters.
- **Conditions/commitments:** households are expected to keep children in school, follow health/vaccination check-ups, and register births (social conditionalities).
- **Documents required:** be registered in the **RNU**; family/household identification documents.
- **Procedure:** households are **identified and selected via the RNU** (not a free application). To have a chance of being included, get the household registered at the **departmental social services / town hall**. Payments are made quarterly to selected beneficiaries.
- **Contact:** Ministry of Family and Solidarity — devcommunautaire.gouv.sn | departmental social services / town hall.
- **Limits:** targeting by RNU (you do not "apply" to receive it directly); tied to a household; subject to available budget and payment schedule.
- **Sources:** senegal-emergent.com (PNBSF), devcommunautaire.gouv.sn, World Bank, senegalservices.sn; **2026 resumption:** APS (aps.sn, 18 Mar 2026), ndarinfo.com, senenews.com (355,013 beneficiaries, 35,000 FCFA Q1 2026).

---

## PROGRAM 7 — EQUAL OPPORTUNITY CARD (persons with disabilities)

- **Name:** Carte d'Égalité des Chances (Equal Opportunity Card)
- **Body:** Ministry of Family, Social Action and Solidarity (via departmental technical commissions / DGAS)
- **Who it is for:** **persons with disabilities** (legal basis: Social Orientation Law on the rights of persons with disabilities).
- **What it offers:** access to rights and benefits in **healthcare, rehabilitation, technical/financial aid, education, training, employment and transport**, plus other advantages for persons with disabilities.
- **Documents required:** proof of disability (medical assessment by the departmental technical commission); ID document; civil-status documents.
- **Procedure:** apply at the **departmental social services** (procedures are decentralized to departments) → assessment by the departmental technical commission → the card is issued by the Ministry in charge of Social Action.
- **Contact:** Ministry of Family, Social Action and Solidarity | Direction Générale de l'Action Sociale (DGAS) | departmental social services.
- **Limits:** requires assessment/validation by the technical commission; issuance times vary; benefits depend on partner services.
- **Sources:** APS, WATHI (Social Orientation Law), socialprotection-pfm.org, Journal Officiel.

---

## SUMMARY — QUICK ROUTING BY NEED (for the AI engine)

| Expressed need | Program(s) to suggest |
|---|---|
| No health insurance, informal worker / rural | **CMU health mutual (1)** — 7,000 FCFA/yr (3,500 subsidized, free if indigent via RNU) |
| Child < 5 sick | **Free under-5 care (2)** — bring proof of age |
| Elderly person 60+ needing care | **Plan Sésame (3)** |
| Chronic kidney failure / dialysis | **Free dialysis (4)** — nephrologist prescription + waiting list |
| Pregnant woman / cesarean | **Free cesarean (5)** + CMU (1) |
| Very poor household with children 6–12 | **PNBSF family grant (6)** — via RNU registration |
| Person with a disability | **Equal Opportunity Card (7)** |
| Indigent, wants free health coverage | **CMU (1)** free enrollment via **RNU** targeting |

---

## GUARDRAIL REMINDERS (to apply in every AI response)
- Always say "you **could** be eligible", never "you are eligible".
- Always end with "**verify with the official body** before taking any steps".
- For cash transfer (PNBSF) and free CMU enrollment, beneficiaries are **selected via the RNU** — direct the user to register at the **town hall / departmental social services**, not to "apply" directly.
- Use the **current name SEN-CSU** (site sencsu.sn); agencecmu.sn still works as a fallback.
- Free-care programs (under-5, Plan Sésame, cesarean, dialysis) apply in **public** facilities — tell the user to go to a public health post/center/hospital.
