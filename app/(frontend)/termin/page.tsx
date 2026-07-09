import type { Metadata } from "next";
import { Termin } from "../components/Termin";
import { getCms, toImg } from "@/lib/cms";
import { normalizeSettings } from "../data/site";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Termin vereinbaren",
  description:
    "Vereinbaren Sie Ihren Termin im Haarstudio Anetta telefonisch unter 0451 79 14 67 — Di–Fr 09:00–18:00, Sa 08:00–13:00. Kronsforder Allee 3a, 23560 Lübeck.",
};

export default async function TerminPage() {
  const payload = await getCms();
  const [homepage, settingsDoc] = await Promise.all([
    payload.findGlobal({ slug: "homepage", depth: 1 }),
    payload.findGlobal({ slug: "site-settings", depth: 1 }),
  ]);
  const site = normalizeSettings(settingsDoc);
  const t = homepage.termin;

  return (
    <Termin
      eyebrow={t?.eyebrow ?? undefined}
      headingLines={t?.headingLines?.length ? t.headingLines.map((x) => x.text) : undefined}
      intro={t?.intro ?? undefined}
      callLabel={t?.callLabel ?? undefined}
      image={toImg(t?.image) ?? undefined}
      salon={site.salon}
      hours={site.hours}
      hoursSummary={site.hoursSummary}
      mapsUrl={site.mapsUrl}
      mapsEmbedUrl={site.mapsEmbedUrl}
      logo={site.logo ?? undefined}
      tagline={site.salon.tagline}
    />
  );
}
