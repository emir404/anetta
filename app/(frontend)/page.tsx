import { Hero } from "./components/Hero";
import { Services } from "./components/Services";
import { About } from "./components/About";
import { SignQuote } from "./components/SignQuote";
import { Salon } from "./components/Salon";
import { Testimonials } from "./components/Testimonials";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { getCms, toImg } from "@/lib/cms";
import { normalizeSettings } from "./data/site";
import type { ServiceCategory } from "./data/services";

// Re-render at most every 60s so CMS edits go live without a rebuild.
export const revalidate = 60;

const texts = (arr?: { text: string }[] | null): string[] | undefined =>
  arr && arr.length ? arr.map((x) => x.text) : undefined;

export default async function Home() {
  const payload = await getCms();

  const [homepage, settingsDoc, testimonialsRes] = await Promise.all([
    payload.findGlobal({ slug: "homepage", depth: 1 }),
    payload.findGlobal({ slug: "site-settings", depth: 1 }),
    payload.find({
      collection: "testimonials",
      where: { active: { equals: true } },
      sort: "_order",
      limit: 50,
    }),
  ]);

  const site = normalizeSettings(settingsDoc);

  const heroCards = (homepage.hero?.serviceCards ?? []).flatMap((c) => {
    const image = toImg(c.image, c.alt);
    return image ? [{ label: c.label, image: image.src, alt: c.alt || image.alt }] : [];
  });

  const services = homepage.services;
  const categories: ServiceCategory[] | undefined = services?.categories?.length
    ? services.categories.map((c) => ({
        name: c.name,
        note: c.note ?? undefined,
        items: (c.items ?? []).map((it) => ({
          name: it.name,
          price: it.onRequest ? null : it.price ?? null,
          fromPrice: it.fromPrice ?? undefined,
        })),
      }))
    : undefined;

  const about = homepage.about;
  const salon = homepage.salon;

  const testimonials = testimonialsRes.docs.map((t) => ({
    quote: t.quote,
    attribution: t.attribution,
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HairSalon",
    name: site.salon.name,
    url: site.siteUrl,
    image: `${site.siteUrl}/opengraph-image.jpg`,
    telephone: site.salon.phoneE164,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.salon.street,
      postalCode: site.salon.postalCode,
      addressLocality: site.salon.city,
      addressRegion: "Schleswig-Holstein",
      addressCountry: "DE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.salon.geo.latitude,
      longitude: site.salon.geo.longitude,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "08:00",
        closes: "13:00",
      },
    ],
  };

  return (
    <div className="flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* z-10 + solid background so the page slides over the sticky footer
          (curtain reveal) */}
      <div className="relative z-10 flex flex-col bg-background">
        <Hero
          salon={site.salon}
          serviceCards={heroCards.length ? heroCards : undefined}
          hoursLine={homepage.hero?.hoursLine ?? undefined}
          groupsLine={homepage.hero?.groupsLine ?? undefined}
          logo={site.logo ?? undefined}
        />
        <Services
          eyebrow={services?.eyebrow ?? undefined}
          headingLines={texts(services?.headingLines)}
          intro={services?.intro ?? undefined}
          priceMode={services?.priceMode ?? undefined}
          categories={categories}
          footnote={services?.footnote ?? undefined}
          salon={site.salon}
        />
        <About
          eyebrow={about?.eyebrow ?? undefined}
          headingLines={texts(about?.headingLines)}
          paragraphs={texts(about?.paragraphs)}
          image={toImg(about?.image) ?? undefined}
          facts={
            about?.facts?.length
              ? about.facts.map((f) => ({
                  label: f.label,
                  value: f.value,
                  href: f.href ?? undefined,
                }))
              : undefined
          }
        />
        <SignQuote
          quoteLines={texts(homepage.signQuote?.quoteLines)}
          caption={homepage.signQuote?.caption ?? undefined}
        />
        <Salon
          eyebrow={salon?.eyebrow ?? undefined}
          headingLines={texts(salon?.headingLines)}
          paragraphs={texts(salon?.paragraphs)}
          storefrontImage={toImg(salon?.storefrontImage) ?? undefined}
          detailImage={toImg(salon?.detailImage) ?? undefined}
          salon={site.salon}
          mapsUrl={site.mapsUrl}
        />
        <Testimonials testimonials={testimonials} />
        <Contact
          headingLines={texts(homepage.contact?.headingLines)}
          intro={homepage.contact?.intro ?? undefined}
          salon={site.salon}
          hours={site.hours}
          mapsUrl={site.mapsUrl}
          mapsEmbedUrl={site.mapsEmbedUrl}
        />
      </div>
      <Footer
        salon={site.salon}
        hoursSummary={site.hoursSummary}
        logo={site.logo ?? undefined}
        mapsUrl={site.mapsUrl}
        tagline={site.salon.tagline}
      />
    </div>
  );
}
