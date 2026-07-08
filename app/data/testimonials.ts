// Kundenstimmen — HAUSREGEL: niemals Zitate erfinden (PROMPT.md,
// knowledge-base/content/reviews.md). Diese Liste bleibt leer, bis
// verifizierte, freigegebene Stimmen im KB dokumentiert sind
// (Zitat · Name/Kürzel · Quelle · Datum · Einverständnis).
// Die Stimmen-Sektion rendert null, solange die Liste leer ist.

export type Testimonial = {
  quote: string;
  attribution: string;
};

export const TESTIMONIALS: Testimonial[] = [];
