import path from "path";
import { fileURLToPath } from "url";
import { buildConfig } from "payload";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import { de } from "@payloadcms/translations/languages/de";
import { en } from "@payloadcms/translations/languages/en";
import sharp from "sharp";

import { Users } from "./collections/Users";
import { Media } from "./collections/Media";
import { Testimonials } from "./collections/Testimonials";
import { SiteSettings } from "./globals/SiteSettings";
import { Homepage } from "./globals/Homepage";
import { Impressum } from "./globals/Impressum";
import { Datenschutz } from "./globals/Datenschutz";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: "users",
    meta: {
      titleSuffix: " — Haarstudio Anetta",
    },
  },
  i18n: {
    supportedLanguages: { de, en },
    fallbackLanguage: "de",
  },
  collections: [Testimonials, Media, Users],
  globals: [Homepage, SiteSettings, Impressum, Datenschutz],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "dev-secret-change-me",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: sqliteAdapter({
    migrationDir: path.resolve(dirname, "migrations"),
    client: {
      // Local dev: a file DB. Production (Vercel): a Turso libSQL URL + token.
      url: process.env.DATABASE_URI || "file:./anetta.db",
      authToken: process.env.DATABASE_AUTH_TOKEN,
    },
  }),
  plugins: [
    // Store uploads in Vercel Blob when a token is present (production);
    // falls back to the local `public/media` folder in development.
    vercelBlobStorage({
      enabled: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
      // Serve media straight from the Blob CDN (public URLs) instead of
      // proxying every image through the serverless function.
      collections: { media: { disablePayloadAccessControl: true } },
      token: process.env.BLOB_READ_WRITE_TOKEN,
    }),
  ],
  sharp,
});
