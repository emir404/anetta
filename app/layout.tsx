import type { Metadata } from "next";
import { Archivo, Hanken_Grotesk } from "next/font/google";
import { Agentation } from "agentation";
import "./globals.css";
import { SmoothScroll } from "./components/SmoothScroll";
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

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Haarstudio Anetta – Ihr Friseur in Lübeck am Mühlentor",
    template: "%s – Haarstudio Anetta",
  },
  description:
    "Haarstudio Anetta – der freundliche Damen-, Herren- und Kinderfriseur am Mühlentor in Lübeck. Kronsforder Allee 3a, 23560 Lübeck. Termine telefonisch: 0451 79 14 67.",
  openGraph: {
    title: "Haarstudio Anetta – Ihr Friseur in Lübeck am Mühlentor",
    description:
      "Der freundliche Damen-, Herren- und Kinderfriseur am Mühlentor in Lübeck. Termine telefonisch: 0451 79 14 67.",
    locale: "de_DE",
    type: "website",
    siteName: "Haarstudio Anetta",
  },
};

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
