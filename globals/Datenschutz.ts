import type { GlobalConfig } from "payload";

/** Datenschutzerklärung — freely editable sections (heading + rich text body). */
export const Datenschutz: GlobalConfig = {
  slug: "datenschutz",
  label: "Datenschutz",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "title",
      label: "Seitentitel",
      type: "text",
      required: true,
      defaultValue: "Datenschutzerklärung",
    },
    {
      name: "sections",
      label: "Abschnitte",
      type: "array",
      minRows: 1,
      labels: { singular: "Abschnitt", plural: "Abschnitte" },
      fields: [
        { name: "heading", label: "Überschrift", type: "text" },
        { name: "body", label: "Text", type: "richText", required: true },
      ],
    },
  ],
};
