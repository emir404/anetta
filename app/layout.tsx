import type { Metadata } from "next";
import { Cormorant, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "./components/SmoothScroll";
import { SITE_URL } from "./data/salon";

// DESIGN.md §4.1 — display serif, never below 24px; italics are the emphasis voice.
const cormorant = Cormorant({
  variable: "--font-cormorant",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

// Warm humanist grotesk — body, UI, tracked micro-labels.
const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  style: ["normal", "italic"],
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
      className={`${cormorant.variable} ${hankenGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
