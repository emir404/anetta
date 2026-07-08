# Image Manifest

Every image connected to this project is recorded here — both third-party reference material and our generated assets. **Nothing ships without a row in this file.**

## `reference/` — third-party, MUST NOT ship

Rights are unclear on all reference material. Design research and fact verification only.

| Item | Source | Seen | Stored |
|---|---|---|---|
| Storefront photo (sign „HAARSTUDIO AnettA", tagline, window phone sticker) | Google-Maps-Eintrag (user-provided screenshot in project briefing) | 2026-07-08 | superseded — a studio-provided copy now ships, see `real/` below |
| Salon photo from 2014 (uploader „schnurzinchen") | https://www.golocal.de/luebeck/friseure/haarstudio-anetta-YUKPp/ | 2026-07-08 | not stored |

## `real/` — studio-provided photos that ship

| File | Source & enhancement | Used | Note |
|---|---|---|---|
| `real/storefront.jpg` (ships as `public/images/storefront.jpg`, 2212×1854) | Storefront photo provided by the studio in this project's briefing (2026-07-08); enhanced 2× via fal-ai/topaz/upscale/image (Standard V2, fix_compression 0.6, denoise 0.3, face_enhancement off) | Der-Salon-Sektion (groß) | The one REAL photograph on the site — alt text may state it IS the salon (the Stimmungsbild hedge applies only to generated imagery). **Freigabe der Inhaberin im Verifizierungscall bestätigen** (KB-Checkliste Punkt 9). |

## Logo artwork — client brand, ships

Provided by the studio in the project briefing 2026-07-08 (cleaned-up rendering of the storefront sign's script wordmark). Brand values sampled from this artwork: **Blau `#134792` · Gelb `#f4b821`** — these are the site tokens (DESIGN.md §4.2 v4).

| File | What it is | Used |
|---|---|---|
| `generated/anetta-wordmark.png` (source of truth; ships as `public/logo/anetta-wordmark.png`, 2400×1097, alpha-trimmed) | Yellow script „AnettA" wordmark, transparent background. Upscaled 2026-07-08 via fal-ai/recraft/upscale/crisp (matted on `#134792`, ~2.9×, alpha rebuilt from the original channel) | Hero-Masthead, Footer-Brand |
| `app/icon.png` 512×512 + `app/apple-icon.png` 180×180 | Wordmark centered on `#134792` (composed with PIL from the artwork) | Favicon / Touch-Icon |
| `generated/og-logo.jpg` (ships as `app/opengraph-image.jpg`, 1200×630) | Wordmark on `#134792` — the sign as a social card | Open-Graph-Bild |

## `generated/` — genmedia outputs that ship (v4, 2026-07-08)

Art direction v4 („das Schild, in echt"): bright friendly daylight, clean warm-white walls, an honest well-kept **neighborhood** salon — never luxury-heritage; the sign's royal blue and yellow appear as real objects (capes, towels, combs). No faces, no hands, no depiction of real persons (esp. no likeness of Anetta Dzikowski), no haircut-result imagery. Alt-Texte bleiben neutral-ehrlich (Stimmungsbilder, keine „unser Salon"-Behauptung). All via fal-ai/flux-2-pro.

| File | Prompt | Note |
|---|---|---|
| `service-damen.jpg` (1024×1536) | "Bright friendly photograph in a small well-kept German neighborhood hair salon: a classic round wooden hairbrush, a fine-tooth comb and a few golden hair clips arranged on a neatly folded royal blue cotton towel on a white shelf, clean warm white wall behind, soft natural daylight from the left, fresh cheerful atmosphere, tall portrait composition with calm negative space in the upper third, shallow depth of field, believable natural photography, no people, no hands, no faces, no text, no logos" | Accepted: Clip-Prägung unleserlich, Werkzeuggeometrie plausibel. Used: Hero-Servicekarte „Damen". |
| `service-herren.jpg` (1024×1536) | Same base; subject: "classic barber scissors, a black fine-tooth comb and metal hair clippers resting on a neatly folded royal blue cotton towel on a light wooden shelf … fresh tidy atmosphere" | Accepted: Gravuren unleserlich (gleiche Messlatte wie v3). Kein Rasierpinsel mehr — Familiensalon, kein Barbershop. Used: Hero-Servicekarte „Herren". |
| `service-kinder.jpg` (1024×1536) | Same base; subject: "a child-size wooden stool with a neatly folded royal blue children's salon cape with a yellow trim resting on it, a small soft hairbrush and two colorful hair clips beside it … light wooden floor, cheerful welcoming family atmosphere" | Accepted: Schild-Farben als reale Objekte (blauer Umhang, gelber Saum), bunte Clips = kinderfreundlich ohne Kinderdarstellung. Used: Hero-Servicekarte „Kinder". |
| `service-farbe.jpg` (1024×1536) | Same base; subject: "a small deep blue plastic hair tint bowl with a flat professional hair colour brush with a long thin black handle resting across its rim, a few neatly folded sheets of aluminium foil beside it and two small amber glass bottles, arranged on a white shelf" | Accepted (2. Versuch — 1. verworfen: Malerpinsel statt Färbepinsel, Folien-Sachets unplausibel). Used: Hero-Servicekarte „Farbe & Strähnen". |
| `about-detail.jpg` (1152×1440) | "Bright friendly still life photograph in a small well-kept German neighborhood hair salon: a pair of classic silver hairdressing scissors and a tortoiseshell comb resting on a stack of neatly folded white cotton towels with one royal blue towel in the stack, a small yellow-handled brush beside them, clean warm white wall, soft natural daylight with gentle shadows, fresh honest atmosphere, shallow depth of field, believable natural photography, no people, no hands, no faces, no text, no logos" | Accepted: Scheren-Gravur klein/unleserlich, Blau-Gelb-Weiß = Schildfarben. Used: Über-Anetta-Sektion. |
| `salon-1.jpg` (1152×1440) | "Bright friendly photograph of a small well-kept German neighborhood hair salon interior: a simple modern black styling chair in front of a large plain wall mirror, a royal blue salon cape draped over the chair, clean warm white walls, a green potted plant, big window with soft natural daylight, light wooden floor, tidy cheerful welcoming family atmosphere, an honest everyday neighborhood salon rather than a luxury salon, shallow depth of field, believable natural photography, tall portrait composition, no people, no hands, no faces, no text, no logos" | Accepted: Heizkörper, Laminat, Produktflaschen (Etiketten unleserlich), plausible Spiegelung — ehrlicher Nachbarschaftssalon statt Heritage-Atelier. Used: Salon-Sektion (groß) + /termin. |
| `salon-2.jpg` (1536×1024) | "Bright friendly still life photograph on a white shelf in a small German neighborhood hair salon: a stack of neatly folded royal blue cotton towels, a classic vintage hand hair dryer in cream colour and a yellow comb, clean warm white wall behind, soft natural daylight from the left, fresh cheerful atmosphere with a subtle retro touch, shallow depth of field, believable natural photography, no people, no hands, no faces, no text, no logos" | Accepted: der Retro-Haartrockner zitiert die Föhn-Illustration des Ladenschilds. Used: Salon-Sektion (klein). |

**Alt-Text-Regel:** neutral-ehrlich („Salonstuhl im hellen Tageslicht"), keine „unser Salon"-Behauptung — die Bilder sind Stimmungsbilder, nicht der reale Innenraum.

## `generated/archive-v3/` — retired 2026-07-08 (do not ship)

The v3 "Warm Hanseatic heritage" set (ivory/brass/marine editorial stills, incl. the v2 full-bleed `hero.jpg` and `og-source.jpg`). Retired with the v4 redesign: client direction moved the site to the sign's own blue/yellow on white, and the heritage-luxury register misrepresented the salon („photos too disconnected from brand reality"). Prompts and acceptance notes for these files live in this file's git history (2026-07-08, v3 table).
