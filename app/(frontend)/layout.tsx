import type { Metadata } from "next";
import { Archivo, Hanken_Grotesk } from "next/font/google";
import { Agentation } from "agentation";
import "./globals.css";
import { SmoothScroll } from "./components/SmoothScroll";
import { getCms } from "@/lib/cms";
import { SITE_URL } from "./data/salon";

// DESIGN.md §4.1 (v3) — modern display grotesk; the wdth axis carries the
// wordmark's semi-expanded voice. No italics anywhere in the sans contract.
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
});

// Warm humanist grotesk — body, UI, tracked micro-labels.
const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
});

const DEFAULT_TITLE = "Haarstudio Anetta – Ihr Friseur in Lübeck am Mühlentor";
const DEFAULT_TEMPLATE = "%s – Haarstudio Anetta";
const DEFAULT_DESCRIPTION =
  "Haarstudio Anetta – der freundliche Damen-, Herren- und Kinderfriseur am Mühlentor in Lübeck. Kronsforder Allee 3a, 23560 Lübeck. Termine telefonisch: 0451 79 14 67.";

export async function generateMetadata(): Promise<Metadata> {
  let title = DEFAULT_TITLE;
  let template = DEFAULT_TEMPLATE;
  let description = DEFAULT_DESCRIPTION;
  let siteUrl = SITE_URL;

  try {
    const payload = await getCms();
    const s = await payload.findGlobal({ slug: "site-settings" });
    if (s?.meta) {
      title = s.meta.title || title;
      template = s.meta.titleTemplate || template;
      description = s.meta.description || description;
      siteUrl = s.meta.siteUrl || siteUrl;
    }
  } catch {
    // CMS unavailable (e.g. during build without a DB) — fall back to defaults.
  }

  return {
    metadataBase: new URL(siteUrl),
    title: { default: title, template },
    description,
    openGraph: {
      title,
      description,
      locale: "de_DE",
      type: "website",
      siteName: "Haarstudio Anetta",
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de"
      className={`${archivo.variable} ${hankenGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SmoothScroll>{children}</SmoothScroll>
        {process.env.NODE_ENV === "development" && <Agentation />}
      </body>
    </html>
  );
}
