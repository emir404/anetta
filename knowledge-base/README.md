# Haarstudio Anetta — Knowledge Base

Single source of truth for the Haarstudio Anetta website (first client of the hairdresser vertical template). Unlike our other knowledge bases, this one is **not** a capture of an existing website — the client has none. It is an **assembled dossier**: every fact below was collected from public directories, the Google Maps listing, and the storefront itself on **2026-07-08**, and every fact carries a source and a verification status.

> ⚠️ **Copy rule:** Only VERIFIED facts may be presented as facts on the website. UNVERIFIED facts may be used where marked, and must be confirmed with the client before go-live. Nothing may be invented — no history ("seit 19xx"), no quotes, no services or claims beyond what this KB records.

## Contents

| Path | What it is |
|---|---|
| `content/salon.md` | The dossier — every known fact with source, date, status |
| `content/services.md` | Service taxonomy + **draft** price list (all unverified, see rule below) |
| `content/reviews.md` | Testimonial situation: what exists, why nothing is usable, how to obtain real quotes |
| `content/impressum.md` | Impressum draft + REQUIRED-FROM-CLIENT markers |
| `content/datenschutz.md` | Datenschutz draft matching actual site behavior |
| `data/salon.json` | Machine-readable business facts (the record the app mirrors) |
| `data/services.json` | Machine-readable services + prices with `price_mode` gate |
| `images/MANIFEST.md` | Provenance for every image — sourced and generated |

## Quick facts

- **Name:** Haarstudio Anetta (directories also list "Anetta Dzikowski")
- **Owner:** Anetta Dzikowski
- **Tagline (storefront, verbatim):** „Der freundliche Damen- Herren- und Kinderfriseur"
- **Address:** Kronsforder Allee 3a, 23560 Lübeck (am Mühlentor / St. Jürgen)
- **Phone:** 0451 79 14 67 · `tel:+49451791467`
- **Hours (unverified):** Di–Fr 09:00–18:00 · Sa 08:00–13:00 · So + Mo geschlossen
- **Booking:** phone only — no online booking anywhere
- **Web presence:** none (no website, no socials found; unclaimed Yelp/golocal listings)

## Draft-price rule

`data/services.json` has `price_mode: "draft"`. The site **renders the full price list** in this mode by design decision (2026-07-08, studio call): a complete Preisliste demonstrates the template, and prices are set at Lübeck-neighborhood mid-market level. Every number is `verified: false`. **Before go-live** the verification call (below) walks through every line with the client; confirmed values flip `verified: true` and the file flips to `price_mode: "published"`.

## Data gaps — client verification call checklist

Ask Anetta Dzikowski, in this order:

1. **E-Mail-Adresse** — required for the Impressum (§ 5 DDG Pflichtangabe)
2. **Rechtsform / eingetragener Name** — "Haarstudio Anetta", "Anetta Dzikowski", or other legal name?
3. **USt-IdNr. oder Kleinunternehmer-Status** (§ 19 UStG)
4. **Handwerksrolle / Handwerkskammer** — Friseur is zulassungspflichtiges Handwerk; chamber + register entry for the Impressum
5. **Leistungen & Preise** — walk through `content/services.md` line by line: what is offered, what is not, real prices
6. **Öffnungszeiten** — confirm Di–Fr 09–18, Sa 08–13 (source was a directory listing)
7. **Walk-ins** — spontan vorbeikommen möglich, oder nur mit Termin?
8. **Seit wann gibt es den Salon?** — founding year would enrich the story (currently unknown; the site makes no claim)
9. **Fotos** — permission/desire to photograph the salon; the studio-provided storefront photo already ships (Der-Salon-Sektion — **confirm Freigabe on this call**, see `images/MANIFEST.md` `real/`); interiors remain generated ambience imagery (clearly non-portrait) until real photos exist
10. **Kundenstimmen** — permission to collect and publish testimonials
11. **Domain** — production domain decision (`SITE_URL`)

## Growth slots (post-launch)

- **Portfolio gallery** — deliberately absent in v1. Generated "haircut result" imagery fails our quality bar (faces/hair are the biggest AI tells). Add a real-photo gallery when the client supplies photos.
- **Testimonials section** — built and auto-hidden; populates the moment verified quotes exist in `data/` (see `content/reviews.md`).

## Source index

| Source | What it provided | URL |
|---|---|---|
| Google Maps listing (user-provided link + storefront photo) | name, coordinates, tagline, window signage | maps.google.com place `Anetta Dzikowski`, 53.8574831, 10.6911155 |
| golocal.de | address, category, district St. Jürgen, 1 photo (2014), 0 reviews | https://www.golocal.de/luebeck/friseure/haarstudio-anetta-YUKPp/ |
| 11880.com | opening hours (via search snippet; page blocks direct fetch) | https://www.11880.com/branchenbuch/luebeck/110631771B29110/anetta-dzikowski.html |
| Yelp.de | address, phone, "unclaimed" status, 0 reviews | https://www.yelp.de/biz/anetta-dzikowski-l%C3%BCbeck |
| Das Telefonbuch | phone | https://kontakt-2.dastelefonbuch.de/L%C3%BCbeck/Anetta-Dzikowski-L%C3%BCbeck-Kronsforder-Allee.html |
| branchen-info.net | listing exists (district labeled "Innenstadt"; page unreachable on fetch) | https://luebeck.branchen-info.net/fp_2931542.php |
| friseurempfehlung.de | listed but server unreachable on 2026-07-08 | https://www.friseurempfehlung.de/l%C3%BCbeck/anetta-dzikowski-haarstudio |
