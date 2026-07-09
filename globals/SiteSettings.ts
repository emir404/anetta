import type { GlobalConfig } from "payload";

/**
 * Shared site data: business facts, contact, geo, opening hours and SEO.
 * Used across Hero, Contact, Footer, Termin, legal pages and metadata.
 */
export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  label: "Einstellungen",
  access: {
    read: () => true,
  },
  fields: [
    {
      type: "group",
      name: "meta",
      label: "SEO & Metadaten",
      fields: [
        { name: "title", label: "Seitentitel (Standard)", type: "text", required: true },
        {
          name: "titleTemplate",
          label: "Titel-Vorlage (%s = Seitentitel)",
          type: "text",
          required: true,
        },
        {
          name: "description",
          label: "Beschreibung",
          type: "textarea",
          required: true,
        },
        { name: "siteUrl", label: "Website-URL (für Sitemap/OG)", type: "text", required: true },
      ],
    },
    {
      type: "group",
      name: "business",
      label: "Betrieb",
      fields: [
        { name: "name", label: "Name", type: "text", required: true },
        { name: "owner", label: "Inhaberin", type: "text", required: true },
        { name: "tagline", label: "Slogan", type: "text", required: true },
        { name: "street", label: "Straße", type: "text", required: true },
        { name: "postalCode", label: "PLZ", type: "text", required: true },
        { name: "city", label: "Ort", type: "text", required: true },
        { name: "locality", label: "Lage (z.B. am Mühlentor)", type: "text", required: true },
        {
          name: "phoneDisplay",
          label: "Telefon (Anzeige)",
          type: "text",
          required: true,
        },
        {
          name: "phoneE164",
          label: "Telefon (international, z.B. +49451791467)",
          type: "text",
          required: true,
        },
        {
          name: "logo",
          label: "Wortmarke / Logo",
          type: "upload",
          relationTo: "media",
        },
      ],
    },
    {
      type: "group",
      name: "geo",
      label: "Geo-Koordinaten (schema.org)",
      fields: [
        { name: "latitude", label: "Breitengrad", type: "number", required: true },
        { name: "longitude", label: "Längengrad", type: "number", required: true },
      ],
    },
    {
      type: "group",
      name: "maps",
      label: "Google Maps",
      fields: [
        { name: "url", label: "Maps-Link (Route planen)", type: "text", required: true },
        { name: "embedUrl", label: "Maps Embed-URL (iframe)", type: "text", required: true },
      ],
    },
    {
      name: "hours",
      label: "Öffnungszeiten",
      type: "array",
      minRows: 7,
      maxRows: 7,
      labels: { singular: "Tag", plural: "Tage" },
      admin: {
        description:
          "Genau 7 Zeilen, beginnend mit Sonntag (Reihenfolge: So, Mo, Di, Mi, Do, Fr, Sa). Öffnet/Schließt in Minuten ab Mitternacht (z.B. 9:00 = 540, 18:00 = 1080). Bei geschlossenen Tagen „Geschlossen“ ankreuzen.",
      },
      fields: [
        { name: "day", label: "Tag", type: "text", required: true },
        { name: "time", label: "Zeiten (Anzeige)", type: "text", required: true },
        { name: "closed", label: "Geschlossen", type: "checkbox", defaultValue: false },
        {
          name: "openMinutes",
          label: "Öffnet (Minuten ab Mitternacht)",
          type: "number",
          admin: { condition: (_, siblingData) => !siblingData?.closed },
        },
        {
          name: "closeMinutes",
          label: "Schließt (Minuten ab Mitternacht)",
          type: "number",
          admin: { condition: (_, siblingData) => !siblingData?.closed },
        },
      ],
    },
    {
      name: "hoursSummary",
      label: "Öffnungszeiten (Kurzfassung, Footer)",
      type: "array",
      minRows: 1,
      labels: { singular: "Zeile", plural: "Zeilen" },
      fields: [
        { name: "days", label: "Tage", type: "text", required: true },
        { name: "time", label: "Zeiten", type: "text", required: true },
      ],
    },
  ],
};
