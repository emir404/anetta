import type { GlobalConfig } from "payload";

/** Impressum — freely editable sections (heading + rich text body). */
export const Impressum: GlobalConfig = {
  slug: "impressum",
  label: "Impressum",
  access: {
    read: () => true,
  },
  fields: [
    { name: "title", label: "Seitentitel", type: "text", required: true, defaultValue: "Impressum" },
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
