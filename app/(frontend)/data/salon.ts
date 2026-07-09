// Single source of truth for business facts, mirrored from
// knowledge-base/data/salon.json — change the KB first, then this file.

export const SALON = {
  name: "Haarstudio Anetta",
  owner: "Anetta Dzikowski",
  /** Wörtlich vom Ladenschild — Schreibweise nicht "korrigieren". */
  tagline: "Der freundliche Damen- Herren- und Kinderfriseur",
  street: "Kronsforder Allee 3a",
  postalCode: "23560",
  city: "Lübeck",
  /** Sichere Lageangabe — Verzeichnisse widersprechen sich bei Stadtteil. */
  locality: "am Mühlentor",
  phoneDisplay: "0451 79 14 67",
  phoneE164: "+49451791467",
  geo: { latitude: 53.8574831, longitude: 10.6911155 },
} as const;

// TODO(go-live): Produktions-Domain unbestätigt — siehe KB data_gaps.
// Wert wird nur für metadataBase / sitemap / OG benutzt, nie im sichtbaren Text.
export const SITE_URL = "https://haarstudio-anetta.de";

export const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Haarstudio+Anetta+Kronsforder+Allee+3a+23560+L%C3%BCbeck";

export const MAPS_EMBED_URL =
  "https://maps.google.com/maps?q=Kronsforder%20Allee%203a%2C%2023560%20L%C3%BCbeck&z=16&output=embed";
