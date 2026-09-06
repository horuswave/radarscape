/** Company facts that are identical across every locale. */

export const company = {
  legalName: "Radarscape Mozambique Limitada",
  shortName: "Radarscape",
  parent: "Macefield Ventures Mozambique Limitada",
  founded: "2021",
  operationalSince: "2022",
  license: "Class 7 ALVARÁ",
  registration: "Mozambique",
  headOffice: "Maputo, Mozambique",
  coreArea: "Cabo Delgado — Afungi LNG corridor",
  address: {
    line1: "Av. do Zimbabwe, No. 1512",
    line2: "Bairro da Sommershield",
    city: "Maputo",
    country: "Mozambique",
  },
  phone: "+258 849 459 905",
  phoneHref: "tel:+258849459905",
  email: "info@radarscapegroup.com",
  emailHref: "mailto:info@radarscapegroup.com",
  domain: "radarscapegroup.com",
  siteUrl: "https://radarscapegroup.com",
  /** Sommershield, Maputo — used for the OpenStreetMap embed (no API key). */
  mapEmbedSrc:
    "https://www.openstreetmap.org/export/embed.html?bbox=32.5900%2C-25.9760%2C32.6120%2C-25.9600&layer=mapnik&marker=-25.9680%2C32.6010",
  mapLink: "https://www.openstreetmap.org/?mlat=-25.9680&mlon=32.6010#map=15/-25.9680/32.6010",
} as const;

export const foundedYear = 2021;
