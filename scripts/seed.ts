/**
 * One-time seed: migrates the previously hardcoded site content and the images
 * from public/images + public/logo into Payload. Run with:
 *
 *   bun run seed
 *
 * Safe to re-run: skips content seeding if site settings already exist.
 */
import path from "path";
import { fileURLToPath } from "url";
import { getPayload } from "payload";
import config from "../payload.config";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const ADMIN_EMAIL = "admin@haarstudio-anetta.de";
const ADMIN_PASSWORD = "anetta2026";

/** Minimal Lexical editor state from an array of plain-text paragraphs. */
function rt(paragraphs: string[]) {
  return {
    root: {
      type: "root",
      format: "" as const,
      indent: 0,
      version: 1,
      direction: "ltr" as const,
      children: paragraphs.map((text) => ({
        type: "paragraph",
        version: 1,
        format: "" as const,
        indent: 0,
        direction: "ltr" as const,
        textFormat: 0,
        children: [
          {
            type: "text",
            version: 1,
            text,
            format: 0,
            style: "",
            mode: "normal" as const,
            detail: 0,
          },
        ],
      })),
    },
  };
}

async function main() {
  const payload = await getPayload({ config });

  // --- Admin user ---
  const existingUsers = await payload.find({ collection: "users", limit: 1 });
  if (existingUsers.totalDocs === 0) {
    await payload.create({
      collection: "users",
      data: { email: ADMIN_EMAIL, password: ADMIN_PASSWORD },
    });
    payload.logger.info(`Admin user created: ${ADMIN_EMAIL} / ${ADMIN_PASSWORD}`);
  }

  const existingMedia = await payload.find({ collection: "media", limit: 1 });
  if (existingMedia.totalDocs > 0) {
    payload.logger.info("Media already exists — skipping content seed.");
    return;
  }

  const media = async (relPath: string, alt: string) => {
    const doc = await payload.create({
      collection: "media",
      data: { alt },
      filePath: path.join(root, "public", relPath),
    });
    return doc.id;
  };

  // --- Images ---
  const img = {
    serviceDamen: await media(
      "images/service-damen.jpg",
      "Runde Holzbürste, Kamm und goldene Haarclips auf blauem Frottee",
    ),
    serviceHerren: await media(
      "images/service-herren.jpg",
      "Schere, Kamm und Haarschneidemaschine auf blauem Frottee",
    ),
    serviceKinder: await media(
      "images/service-kinder.jpg",
      "Kleiner Hocker mit blauem Kinderumhang, Bürste und bunten Haarclips",
    ),
    serviceFarbe: await media(
      "images/service-farbe.jpg",
      "Blaue Färbeschale mit Pinsel, Alufolie und braunen Glasflaschen",
    ),
    aboutDetail: await media(
      "images/about-detail.jpg",
      "Stillleben mit Schere, Kamm und gelber Bürste auf gestapelten Handtüchern",
    ),
    storefront: await media(
      "images/storefront.jpg",
      "Die Ladenfront des Haarstudio Anetta: blaues Schild mit gelbem AnettA-Schriftzug über den Schaufenstern",
    ),
    salon2: await media(
      "images/salon-2.jpg",
      "Gestapelte blaue Handtücher, Retro-Haartrockner und gelber Kamm auf einer Ablage",
    ),
    salon1: await media(
      "images/salon-1.jpg",
      "Salonstuhl mit blauem Umhang vor dem Spiegel im hellen Tageslicht",
    ),
    logo: await media("logo/anetta-wordmark.png", "Haarstudio Anetta – Wortmarke"),
  };
  payload.logger.info("Media seeded.");

  // --- Site settings ---
  await payload.updateGlobal({
    slug: "site-settings",
    data: {
      meta: {
        title: "Haarstudio Anetta – Ihr Friseur in Lübeck am Mühlentor",
        titleTemplate: "%s – Haarstudio Anetta",
        description:
          "Haarstudio Anetta – der freundliche Damen-, Herren- und Kinderfriseur am Mühlentor in Lübeck. Kronsforder Allee 3a, 23560 Lübeck. Termine telefonisch: 0451 79 14 67.",
        siteUrl: "https://haarstudio-anetta.de",
      },
      business: {
        name: "Haarstudio Anetta",
        owner: "Anetta Dzikowski",
        tagline: "Der freundliche Damen- Herren- und Kinderfriseur",
        street: "Kronsforder Allee 3a",
        postalCode: "23560",
        city: "Lübeck",
        locality: "am Mühlentor",
        phoneDisplay: "0451 79 14 67",
        phoneE164: "+49451791467",
        logo: img.logo,
      },
      geo: { latitude: 53.8574831, longitude: 10.6911155 },
      maps: {
        url: "https://www.google.com/maps/search/?api=1&query=Haarstudio+Anetta+Kronsforder+Allee+3a+23560+L%C3%BCbeck",
        embedUrl:
          "https://maps.google.com/maps?q=Kronsforder%20Allee%203a%2C%2023560%20L%C3%BCbeck&z=16&output=embed",
      },
      hours: [
        { day: "Sonntag", time: "Geschlossen", closed: true },
        { day: "Montag", time: "Geschlossen", closed: true },
        { day: "Dienstag", time: "09:00 – 18:00", closed: false, openMinutes: 540, closeMinutes: 1080 },
        { day: "Mittwoch", time: "09:00 – 18:00", closed: false, openMinutes: 540, closeMinutes: 1080 },
        { day: "Donnerstag", time: "09:00 – 18:00", closed: false, openMinutes: 540, closeMinutes: 1080 },
        { day: "Freitag", time: "09:00 – 18:00", closed: false, openMinutes: 540, closeMinutes: 1080 },
        { day: "Samstag", time: "08:00 – 13:00", closed: false, openMinutes: 480, closeMinutes: 780 },
      ],
      hoursSummary: [
        { days: "Dienstag – Freitag", time: "09:00 – 18:00" },
        { days: "Samstag", time: "08:00 – 13:00" },
        { days: "Sonntag & Montag", time: "Geschlossen" },
      ],
    },
  });
  payload.logger.info("Site settings seeded.");

  // --- Homepage ---
  await payload.updateGlobal({
    slug: "homepage",
    data: {
      hero: {
        groupsLine: "Damen · Herren · Kinder",
        hoursLine: "Di–Fr 09:00–18:00 · Sa 08:00–13:00",
        serviceCards: [
          {
            label: "Damen",
            image: img.serviceDamen,
            alt: "Runde Holzbürste, Kamm und goldene Haarclips auf blauem Frottee",
          },
          {
            label: "Herren",
            image: img.serviceHerren,
            alt: "Schere, Kamm und Haarschneidemaschine auf blauem Frottee",
          },
          {
            label: "Kinder",
            image: img.serviceKinder,
            alt: "Kleiner Hocker mit blauem Kinderumhang, Bürste und bunten Haarclips",
          },
          {
            label: "Farbe & Strähnen",
            image: img.serviceFarbe,
            alt: "Blaue Färbeschale mit Pinsel, Alufolie und braunen Glasflaschen",
          },
        ],
      },
      services: {
        eyebrow: "Leistungen",
        headingLines: [{ text: "Gutes Handwerk," }, { text: "ehrliche Preise." }],
        intro:
          "Vom klassischen Schnitt bis zur Dauerwelle — bei uns finden Damen, Herren und Kinder alles, was gutes Haar braucht.",
        priceMode: "draft",
        categories: [
          {
            name: "Damen",
            items: [
              { name: "Waschen, Schneiden & Föhnen", price: 39, onRequest: false, fromPrice: false },
              { name: "Trockenhaarschnitt", price: 26, onRequest: false, fromPrice: false },
              { name: "Waschen & Föhnen (kurz)", price: 22, onRequest: false, fromPrice: false },
              { name: "Waschen & Föhnen (lang)", price: 27, onRequest: false, fromPrice: false },
            ],
          },
          {
            name: "Herren",
            items: [
              { name: "Waschen, Schneiden & Styling", price: 25, onRequest: false, fromPrice: false },
              { name: "Maschinenschnitt", price: 16, onRequest: false, fromPrice: false },
              { name: "Bart konturieren & pflegen", price: 12, onRequest: false, fromPrice: false },
            ],
          },
          {
            name: "Kinder",
            items: [
              { name: "Kinderhaarschnitt (bis 12 Jahre)", price: 15, onRequest: false, fromPrice: false },
            ],
          },
          {
            name: "Farbe & Strähnen",
            note: "Preis je nach Haarlänge und Aufwand — wir beraten Sie gern telefonisch.",
            items: [
              { name: "Ansatzfarbe", price: 42, onRequest: false, fromPrice: false },
              { name: "Komplettfarbe", price: 52, onRequest: false, fromPrice: false },
              { name: "Foliensträhnen (Oberkopf)", price: 49, onRequest: false, fromPrice: false },
              { name: "Foliensträhnen (komplett)", price: 69, onRequest: false, fromPrice: false },
              { name: "Tönung", price: 35, onRequest: false, fromPrice: false },
            ],
          },
          {
            name: "Dauerwelle",
            items: [
              { name: "Dauerwelle inkl. Schnitt & Pflege", price: 75, onRequest: false, fromPrice: false },
              { name: "Volumenwelle (Ansatz)", price: 55, onRequest: false, fromPrice: false },
            ],
          },
          {
            name: "Pflege & Anlässe",
            items: [
              { name: "Intensivkur mit Kopfhautmassage", price: 15, onRequest: false, fromPrice: false },
              { name: "Augenbrauen zupfen oder färben", price: 12, onRequest: false, fromPrice: false },
              { name: "Hochsteckfrisur / festliche Anlässe", price: 45, onRequest: false, fromPrice: true },
            ],
          },
        ],
        footnote:
          "Alle Preise in Euro. Je nach Haarlänge und Aufwand können die Preise variieren — eine verbindliche Auskunft geben wir Ihnen gern persönlich oder telefonisch.",
      },
      about: {
        eyebrow: "Über Anetta",
        headingLines: [{ text: "Zeit für" }, { text: "gutes Haar." }],
        paragraphs: [
          {
            text: "Anetta Dzikowski führt ihr Haarstudio an der Kronsforder Allee — einen inhabergeführten Nachbarschaftssalon, in dem sich Damen, Herren und Kinder gleichermaßen gut aufgehoben fühlen. Hier nimmt man sich Zeit: für ehrliche Beratung, sorgfältiges Handwerk und ein Ergebnis, mit dem Sie sich wohlfühlen.",
          },
          {
            text: "Ob klassischer Schnitt, frische Farbe oder die Dauerwelle, die sitzt — vereinbaren Sie einfach telefonisch Ihren Termin. Wir freuen uns auf Sie!",
          },
        ],
        image: img.aboutDetail,
        facts: [
          { label: "Inhaberin", value: "Anetta Dzikowski" },
          { label: "Für", value: "Damen, Herren und Kinder" },
          { label: "Termine", value: "telefonisch · 0451 79 14 67", href: "tel:+49451791467" },
        ],
      },
      signQuote: {
        quoteLines: [
          { text: "„Der freundliche" },
          { text: "Damen- Herren-" },
          { text: "und Kinderfriseur“" },
        ],
        caption: "Ladenschild · Kronsforder Allee 3a · Lübeck",
      },
      salon: {
        eyebrow: "Der Salon",
        headingLines: [{ text: "Am Mühlentor," }, { text: "mitten in" }, { text: "Lübeck." }],
        paragraphs: [
          {
            text: "Dort, wo die Lübecker Altstadt in die Kronsforder Allee übergeht, liegt das Haarstudio Anetta — mit dem Mühlentor vor der Tür und dem Viertel im Herzen.",
          },
          {
            text: "Ein Salon zum Wohlfühlen: herzlich, persönlich und unkompliziert. Alle Generationen sind willkommen — von der ersten Ponyfrisur bis zur Dauerwelle.",
          },
        ],
        storefrontImage: img.storefront,
        detailImage: img.salon2,
      },
      contact: {
        headingLines: [{ text: "Kontakt &" }, { text: "Termin" }],
        intro:
          "Termine vergeben wir persönlich am Telefon — rufen Sie uns gerne zu den Öffnungszeiten an.",
      },
      termin: {
        eyebrow: "Terminvereinbarung",
        headingLines: [{ text: "Termin" }, { text: "vereinbaren" }],
        intro:
          "Termine vergeben wir persönlich am Telefon — so finden wir gemeinsam den Zeitpunkt, der Ihnen passt, und nehmen uns die Zeit, die Ihr Haar braucht. Rufen Sie uns gerne zu den Öffnungszeiten an. Wir freuen uns auf Sie!",
        callLabel: "Rufen Sie uns an",
        image: img.salon1,
      },
    },
  });
  payload.logger.info("Homepage seeded.");

  // --- Impressum ---
  await payload.updateGlobal({
    slug: "impressum",
    data: {
      title: "Impressum",
      sections: [
        {
          heading: "Angaben gemäß § 5 DDG",
          body: rt([
            "Haarstudio Anetta, Anetta Dzikowski, Kronsforder Allee 3a, 23560 Lübeck",
            "Rechtsform: wird vor Go-Live ergänzt",
          ]),
        },
        {
          heading: "Kontakt",
          body: rt([
            "Telefon: 0451 79 14 67",
            "E-Mail: wird vor Go-Live ergänzt",
          ]),
        },
        {
          heading: "Umsatzsteuer",
          body: rt([
            "USt-IdNr. gemäß § 27a UStG oder Hinweis auf Kleinunternehmerregelung (§ 19 UStG) — wird vor Go-Live ergänzt",
          ]),
        },
        {
          heading: "Berufsbezeichnung und Kammer",
          body: rt([
            "Berufsbezeichnung: Friseurin (verliehen in der Bundesrepublik Deutschland)",
            "Handwerkskammer und Eintrag in der Handwerksrolle — wird vor Go-Live ergänzt",
          ]),
        },
        {
          heading: "Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV",
          body: rt(["Anetta Dzikowski, Anschrift wie oben."]),
        },
        {
          heading: "Streitschlichtung",
          body: rt([
            "Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: https://ec.europa.eu/consumers/odr/. Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.",
          ]),
        },
        {
          heading: "Haftung für Inhalte",
          body: rt([
            "Als Diensteanbieterin sind wir gemäß § 7 Abs. 1 DDG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 DDG sind wir jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.",
          ]),
        },
        {
          heading: "Haftung für Links",
          body: rt([
            "Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Für diese fremden Inhalte übernehmen wir keine Gewähr; verantwortlich ist stets der jeweilige Anbieter oder Betreiber der Seiten.",
          ]),
        },
        {
          heading: "Urheberrecht",
          body: rt([
            "Die durch die Seitenbetreiberin erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechts bedürfen der schriftlichen Zustimmung.",
          ]),
        },
      ],
    },
  });
  payload.logger.info("Impressum seeded.");

  // --- Datenschutz ---
  await payload.updateGlobal({
    slug: "datenschutz",
    data: {
      title: "Datenschutzerklärung",
      sections: [
        {
          heading: "Verantwortliche",
          body: rt([
            "Anetta Dzikowski, Kronsforder Allee 3a, 23560 Lübeck",
            "Telefon: 0451 79 14 67",
            "E-Mail: wird vor Go-Live ergänzt",
          ]),
        },
        {
          heading: "Zugriffsdaten und Server-Logfiles",
          body: rt([
            "Beim Aufruf dieser Website verarbeitet unser Hosting-Anbieter automatisch Informationen, die Ihr Browser übermittelt: IP-Adresse, Datum und Uhrzeit der Anfrage, aufgerufene Seite, verwendeter Browser (User-Agent) und die zuvor besuchte Seite (Referrer). Die Verarbeitung erfolgt zur Auslieferung und technischen Absicherung der Website (Art. 6 Abs. 1 lit. f DSGVO). Die Website wird bei Vercel Inc. gehostet; mit dem Anbieter besteht ein Vertrag zur Auftragsverarbeitung.",
          ]),
        },
        {
          heading: "Google Maps",
          body: rt([
            "Zur Anfahrtsdarstellung binden wir eine Karte von Google Maps (Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland) per iframe ein. Beim Laden der Karte werden Daten — unter anderem Ihre IP-Adresse — an Google übertragen. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einer einfachen Anfahrtsbeschreibung). Weitere Informationen finden Sie in der Datenschutzerklärung von Google: https://policies.google.com/privacy.",
          ]),
        },
        {
          heading: "Schriftarten",
          body: rt([
            "Die verwendeten Schriften werden lokal von unserem Server ausgeliefert. Beim Aufruf der Website wird keine Verbindung zu Servern von Google Fonts oder anderen Schriftanbietern aufgebaut.",
          ]),
        },
        {
          heading: "Keine weiteren Datenverarbeitungen",
          body: rt([
            "Diese Website setzt keine Cookies, verwendet keine Analyse- oder Tracking-Dienste, bindet keine Social-Media-Plugins ein und enthält keine Kontaktformulare und keinen Newsletter. Wenn Sie uns anrufen, verwenden wir Ihre Angaben ausschließlich zur Terminvereinbarung.",
          ]),
        },
        {
          heading: "Ihre Rechte",
          body: rt([
            "Sie haben das Recht auf Auskunft (Art. 15 DSGVO), Berichtigung (Art. 16 DSGVO), Löschung (Art. 17 DSGVO), Einschränkung der Verarbeitung (Art. 18 DSGVO), Datenübertragbarkeit (Art. 20 DSGVO) und Widerspruch (Art. 21 DSGVO). Außerdem können Sie sich bei einer Datenschutz-Aufsichtsbehörde beschweren — zuständig ist das Unabhängige Landeszentrum für Datenschutz Schleswig-Holstein (ULD), Holstenstraße 98, 24103 Kiel.",
            "Stand: Juli 2026",
          ]),
        },
      ],
    },
  });
  payload.logger.info("Datenschutz seeded.");
  payload.logger.info("Seed complete.");
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
