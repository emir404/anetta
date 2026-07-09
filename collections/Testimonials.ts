import type { CollectionConfig } from "payload";

/**
 * Kundenstimmen. Nur veröffentlichte (aktive) Stimmen erscheinen auf der
 * Website. Per Drag & Drop sortierbar.
 */
export const Testimonials: CollectionConfig = {
  slug: "testimonials",
  labels: { singular: "Kundenstimme", plural: "Kundenstimmen" },
  orderable: true,
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: "attribution",
    defaultColumns: ["attribution", "active"],
    description:
      "Nur aktive Stimmen werden angezeigt. Die Sektion bleibt verborgen, solange keine aktive Stimme existiert.",
  },
  fields: [
    {
      name: "quote",
      label: "Zitat",
      type: "textarea",
      required: true,
    },
    {
      name: "attribution",
      label: "Name / Kürzel",
      type: "text",
      required: true,
    },
    {
      name: "active",
      label: "Anzeigen",
      type: "checkbox",
      defaultValue: true,
    },
  ],
};
