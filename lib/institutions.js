// Curated list of the official institutions NAWIRI references, per country.
// Pin coordinates are approximate (capital-city headquarters); the
// "Open in Google Maps" link uses a name search, so it always resolves to the
// real office and can give directions / the nearest branch.
//
// Most day-to-day aid is accessed at LOCAL offices (town hall / mairie,
// district office, nearest health center). These markers show the national
// agencies that own each program; the Google Maps search helps find a branch.

export const COUNTRIES = {
  benin: {
    label: "Benin",
    center: [6.40, 2.45],
    zoom: 11,
  },
  senegal: {
    label: "Senegal",
    center: [14.71, -17.45],
    zoom: 12,
  },
  ghana: {
    label: "Ghana",
    center: [5.58, -0.20],
    zoom: 12,
  },
};

export const INSTITUTIONS = [
  // ---------------- BENIN ----------------
  {
    id: "anps",
    country: "benin",
    name: "ANPS",
    full: "Agence Nationale de Protection Sociale",
    role: "Health insurance (AMO/ARCH), cash transfers, social protection",
    lat: 6.3654, lng: 2.4183,
    address: "Immeuble HOUNDEKON, Sainte Rita, Cotonou",
    phone: "+229 20 21 34 14",
    website: "anps.social.gouv.bj",
    gmaps: "ANPS Agence Nationale de Protection Sociale Cotonou",
  },
  {
    id: "cnss-benin",
    country: "benin",
    name: "CNSS Benin",
    full: "Caisse Nationale de Sécurité Sociale",
    role: "Old-age pension, social security for formal workers",
    lat: 6.3580, lng: 2.3960,
    address: "Cotonou",
    phone: "+229 90 19 00 00",
    website: "cnss.bj",
    gmaps: "CNSS Caisse Nationale de Securite Sociale Cotonou",
  },
  {
    id: "fnm",
    country: "benin",
    name: "FNM",
    full: "Fonds National de la Microfinance",
    role: "Alafia microcredit (women, vulnerable entrepreneurs)",
    lat: 6.3700, lng: 2.4205,
    address: "Cotonou",
    phone: "",
    website: "fnm.bj",
    gmaps: "Fonds National de la Microfinance FNM Cotonou",
  },
  {
    id: "anip",
    country: "benin",
    name: "ANIP",
    full: "Agence Nationale d'Identification des Personnes",
    role: "Biometric ID card (required for most programs)",
    lat: 6.3640, lng: 2.4280,
    address: "Cotonou",
    phone: "",
    website: "anip.bj",
    gmaps: "ANIP Agence Nationale Identification des Personnes Cotonou",
  },
  {
    id: "moh-benin",
    country: "benin",
    name: "Ministry of Health",
    full: "Ministère de la Santé du Bénin",
    role: "Free malaria/cesarean/ARV care, public health centers",
    lat: 6.3640, lng: 2.4350,
    address: "Cotonou",
    phone: "",
    website: "sante.gouv.bj",
    gmaps: "Ministere de la Sante Benin Cotonou",
  },

  // ---------------- SENEGAL ----------------
  {
    id: "sen-csu",
    country: "senegal",
    name: "SEN-CSU",
    full: "Couverture Sanitaire Universelle (ex-ANACMU)",
    role: "CMU health mutuals, universal health coverage",
    lat: 14.7167, lng: -17.4677,
    address: "Dakar",
    phone: "",
    website: "sencsu.sn",
    gmaps: "SEN-CSU Couverture Sanitaire Universelle Dakar",
  },
  {
    id: "moh-senegal",
    country: "senegal",
    name: "Ministry of Health",
    full: "Ministère de la Santé et de l'Action Sociale",
    role: "Free care <5, Plan Sesame, dialysis, cesarean",
    lat: 14.6928, lng: -17.4610,
    address: "Fann, Dakar",
    phone: "",
    website: "sante.gouv.sn",
    gmaps: "Ministere de la Sante et de l'Action Sociale Dakar",
  },
  {
    id: "family-senegal",
    country: "senegal",
    name: "Family & Solidarity",
    full: "Ministère de la Famille / DGAS",
    role: "Family Security Grant (PNBSF), Equal Opportunity Card, RNU",
    lat: 14.7100, lng: -17.4600,
    address: "Dakar",
    phone: "",
    website: "devcommunautaire.gouv.sn",
    gmaps: "Ministere de la Famille et de la Solidarite Dakar",
  },

  // ---------------- GHANA ----------------
  {
    id: "nhia",
    country: "ghana",
    name: "NHIA",
    full: "National Health Insurance Authority",
    role: "NHIS health insurance, free maternal care, free dialysis",
    lat: 5.5600, lng: -0.1969,
    address: "Ridge, Accra",
    phone: "",
    website: "nhis.gov.gh",
    gmaps: "National Health Insurance Authority NHIA Accra",
  },
  {
    id: "mogcsp",
    country: "ghana",
    name: "MoGCSP",
    full: "Ministry of Gender, Children and Social Protection",
    role: "LEAP cash transfer, social welfare",
    lat: 5.5560, lng: -0.1960,
    address: "Accra",
    phone: "",
    website: "mogcsp.gov.gh",
    gmaps: "Ministry of Gender Children and Social Protection Accra",
  },
];
