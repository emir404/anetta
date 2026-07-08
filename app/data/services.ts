// Typed mirror of knowledge-base/data/services.json — change the KB first.
//
// price_mode governs what the Leistungen section renders:
//   "auf_anfrage" — only the three audience groups + phone CTA, no prices
//   "draft"       — full Preisliste with draft prices (ALL unverified in the KB;
//                   studio decision 2026-07-08 — must be confirmed before go-live)
//   "published"   — full Preisliste, client-confirmed
export type PriceMode = "auf_anfrage" | "draft" | "published";

export const PRICE_MODE: PriceMode = "draft";

export type ServiceItem = {
  name: string;
  /** Euro amount; null = auf Anfrage */
  price: number | null;
  /** "ab"-Preis (variabler Aufwand) */
  fromPrice?: boolean;
};

export type ServiceCategory = {
  name: string;
  note?: string;
  items: ServiceItem[];
};

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    name: "Damen",
    items: [
      { name: "Waschen, Schneiden & Föhnen", price: 39 },
      { name: "Trockenhaarschnitt", price: 26 },
      { name: "Waschen & Föhnen (kurz)", price: 22 },
      { name: "Waschen & Föhnen (lang)", price: 27 },
    ],
  },
  {
    name: "Herren",
    items: [
      { name: "Waschen, Schneiden & Styling", price: 25 },
      { name: "Maschinenschnitt", price: 16 },
      { name: "Bart konturieren & pflegen", price: 12 },
    ],
  },
  {
    name: "Kinder",
    items: [{ name: "Kinderhaarschnitt (bis 12 Jahre)", price: 15 }],
  },
  {
    name: "Farbe & Strähnen",
    note: "Preis je nach Haarlänge und Aufwand — wir beraten Sie gern telefonisch.",
    items: [
      { name: "Ansatzfarbe", price: 42 },
      { name: "Komplettfarbe", price: 52 },
      { name: "Foliensträhnen (Oberkopf)", price: 49 },
      { name: "Foliensträhnen (komplett)", price: 69 },
      { name: "Tönung", price: 35 },
    ],
  },
  {
    name: "Dauerwelle",
    items: [
      { name: "Dauerwelle inkl. Schnitt & Pflege", price: 75 },
      { name: "Volumenwelle (Ansatz)", price: 55 },
    ],
  },
  {
    name: "Pflege & Anlässe",
    items: [
      { name: "Intensivkur mit Kopfhautmassage", price: 15 },
      { name: "Augenbrauen zupfen oder färben", price: 12 },
      { name: "Hochsteckfrisur / festliche Anlässe", price: 45, fromPrice: true },
    ],
  },
];

const euro = new Intl.NumberFormat("de-DE", {
  style: "currency",
  currency: "EUR",
});

export function formatPrice(item: ServiceItem): string {
  if (item.price === null) return "auf Anfrage";
  const amount = euro.format(item.price);
  return item.fromPrice ? `ab ${amount}` : amount;
}
