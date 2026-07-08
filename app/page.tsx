import { Hero } from "./components/Hero";
import { Services } from "./components/Services";
import { About } from "./components/About";
import { Salon } from "./components/Salon";
import { Testimonials } from "./components/Testimonials";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { SALON, SITE_URL } from "./data/salon";

// JSON-LD (schema.org HairSalon) — values mirror knowledge-base/data/salon.json.
// Hours are duplicated from app/data/openingHours.ts by hand (that module is a
// client module); the QA fact-audit checks the two stay in agreement.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HairSalon",
  name: SALON.name,
  url: SITE_URL,
  telephone: SALON.phoneE164,
  address: {
    "@type": "PostalAddress",
    streetAddress: SALON.street,
    postalCode: SALON.postalCode,
    addressLocality: SALON.city,
    addressRegion: "Schleswig-Holstein",
    addressCountry: "DE",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: SALON.geo.latitude,
    longitude: SALON.geo.longitude,
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

export default function Home() {
  return (
    <div className="flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* z-10 + solid background so the page slides over the sticky footer
          (curtain reveal) */}
      <div className="relative z-10 flex flex-col bg-background">
        <Hero />
        <Services />
        <About />
        <Salon />
        <Testimonials />
        <Contact />
      </div>
      <Footer />
    </div>
  );
}
