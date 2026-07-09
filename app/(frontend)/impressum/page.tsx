import type { Metadata } from "next";
import type { ComponentProps } from "react";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { LegalPage, LegalSection } from "../components/LegalPage";
import { getCms } from "@/lib/cms";
import { normalizeSettings } from "../data/site";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Impressum",
  description:
    "Impressum des Haarstudios Anetta, Kronsforder Allee 3a, 23560 Lübeck.",
};

type RichTextData = ComponentProps<typeof RichText>["data"];

export default async function ImpressumPage() {
  const payload = await getCms();
  const [doc, settingsDoc] = await Promise.all([
    payload.findGlobal({ slug: "impressum" }),
    payload.findGlobal({ slug: "site-settings", depth: 1 }),
  ]);
  const site = normalizeSettings(settingsDoc);
  const footer = {
    salon: site.salon,
    hoursSummary: site.hoursSummary,
    logo: site.logo ?? undefined,
    mapsUrl: site.mapsUrl,
    tagline: site.salon.tagline,
  };

  return (
    <LegalPage title={doc.title || "Impressum"} footer={footer}>
      {(doc.sections ?? []).map((s, i) => (
        <LegalSection key={s.id ?? i} heading={s.heading ?? undefined}>
          <RichText
            data={s.body as unknown as RichTextData}
            className="[&_p:not(:first-child)]:mt-3"
          />
        </LegalSection>
      ))}
    </LegalPage>
  );
}
