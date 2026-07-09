import type { GlobalConfig } from "payload";

const lines = (name: string, label: string, maxRows?: number) => ({
  name,
  label,
  type: "array" as const,
  ...(maxRows ? { maxRows } : {}),
  labels: { singular: "Zeile", plural: "Zeilen" },
  fields: [{ name: "text", label: "Text", type: "text" as const, required: true }],
});

const paragraphs = {
  name: "paragraphs",
  label: "Absätze",
  type: "array" as const,
  minRows: 1,
  fields: [{ name: "text", label: "Text", type: "textarea" as const, required: true }],
};

/** All editable content of the homepage and the appointment page, by section. */
export const Homepage: GlobalConfig = {
  slug: "homepage",
  label: "Startseite",
  access: {
    read: () => true,
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Hero",
          name: "hero",
          fields: [
            { name: "groupsLine", label: "Zielgruppen-Zeile (z.B. Damen · Herren · Kinder)", type: "text" },
            { name: "hoursLine", label: "Öffnungszeiten-Zeile (Schild)", type: "text" },
            {
              name: "serviceCards",
              label: "Service-Karten (Rail)",
              type: "array",
              maxRows: 4,
              labels: { singular: "Karte", plural: "Karten" },
              fields: [
                { name: "label", label: "Titel", type: "text", required: true },
                {
                  name: "image",
                  label: "Bild",
                  type: "upload",
                  relationTo: "media",
                  required: true,
                },
                { name: "alt", label: "Alt-Text", type: "text", required: true },
              ],
            },
          ],
        },
        {
          label: "Leistungen",
          name: "services",
          fields: [
            { name: "eyebrow", label: "Überzeile", type: "text" },
            lines("headingLines", "Überschrift (Zeilen)", 3),
            { name: "intro", label: "Einleitungstext", type: "textarea" },
            {
              name: "priceMode",
              label: "Preis-Modus",
              type: "select",
              required: true,
              defaultValue: "draft",
              options: [
                { label: "Nur auf Anfrage", value: "auf_anfrage" },
                { label: "Preisliste (Entwurf)", value: "draft" },
                { label: "Preisliste (veröffentlicht)", value: "published" },
              ],
            },
            {
              name: "categories",
              label: "Kategorien",
              type: "array",
              labels: { singular: "Kategorie", plural: "Kategorien" },
              fields: [
                { name: "name", label: "Name", type: "text", required: true },
                { name: "note", label: "Hinweis (optional)", type: "textarea" },
                {
                  name: "items",
                  label: "Positionen",
                  type: "array",
                  labels: { singular: "Position", plural: "Positionen" },
                  fields: [
                    { name: "name", label: "Leistung", type: "text", required: true },
                    {
                      name: "onRequest",
                      label: "Auf Anfrage (kein Preis)",
                      type: "checkbox",
                      defaultValue: false,
                    },
                    {
                      name: "price",
                      label: "Preis (Euro)",
                      type: "number",
                      admin: { condition: (_, s) => !s?.onRequest },
                    },
                    {
                      name: "fromPrice",
                      label: "„ab“-Preis",
                      type: "checkbox",
                      defaultValue: false,
                      admin: { condition: (_, s) => !s?.onRequest },
                    },
                  ],
                },
              ],
            },
            { name: "footnote", label: "Fußnote unter der Preisliste", type: "textarea" },
          ],
        },
        {
          label: "Über Anetta",
          name: "about",
          fields: [
            { name: "eyebrow", label: "Überzeile", type: "text" },
            lines("headingLines", "Überschrift (Zeilen)", 3),
            paragraphs,
            {
              name: "image",
              label: "Bild",
              type: "upload",
              relationTo: "media",
            },
            {
              name: "facts",
              label: "Fakten (Ledger)",
              type: "array",
              maxRows: 5,
              fields: [
                { name: "label", label: "Bezeichnung", type: "text", required: true },
                { name: "value", label: "Wert", type: "text", required: true },
                { name: "href", label: "Link (optional, z.B. tel:...)", type: "text" },
              ],
            },
          ],
        },
        {
          label: "Leitspruch",
          name: "signQuote",
          description:
            "Zitat vom Ladenschild. Leer lassen, um den gestalteten Standardtext zu behalten.",
          fields: [
            lines("quoteLines", "Zitat-Zeilen", 4),
            { name: "caption", label: "Bildunterschrift", type: "text" },
          ],
        },
        {
          label: "Der Salon",
          name: "salon",
          fields: [
            { name: "eyebrow", label: "Überzeile", type: "text" },
            lines("headingLines", "Überschrift (Zeilen)", 4),
            paragraphs,
            {
              name: "storefrontImage",
              label: "Bild groß (Ladenfront)",
              type: "upload",
              relationTo: "media",
            },
            {
              name: "detailImage",
              label: "Bild klein (Detail)",
              type: "upload",
              relationTo: "media",
            },
          ],
        },
        {
          label: "Kontakt",
          name: "contact",
          fields: [
            lines("headingLines", "Überschrift (Zeilen)", 3),
            { name: "intro", label: "Einleitungstext", type: "textarea" },
          ],
        },
        {
          label: "Terminseite",
          name: "termin",
          fields: [
            { name: "eyebrow", label: "Überzeile", type: "text" },
            lines("headingLines", "Überschrift (Zeilen)", 3),
            { name: "intro", label: "Einleitungstext", type: "textarea" },
            { name: "callLabel", label: "Label über der Telefonnummer", type: "text" },
            {
              name: "image",
              label: "Bild",
              type: "upload",
              relationTo: "media",
            },
          ],
        },
      ],
    },
  ],
};
