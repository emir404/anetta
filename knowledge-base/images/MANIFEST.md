# Image Manifest

Every image connected to this project is recorded here — both third-party reference material and our generated assets. **Nothing ships without a row in this file.**

## `reference/` — third-party, MUST NOT ship

Rights are unclear on all reference material. Design research and fact verification only.

| Item | Source | Seen | Stored |
|---|---|---|---|
| Storefront photo (sign „HAARSTUDIO AnettA", tagline, window phone sticker) | Google-Maps-Eintrag (user-provided screenshot in project briefing) | 2026-07-08 | not stored — view via Maps listing |
| Salon photo from 2014 (uploader „schnurzinchen") | https://www.golocal.de/luebeck/friseure/haarstudio-anetta-YUKPp/ | 2026-07-08 | not stored |

## `generated/` — genmedia outputs that ship

Source-of-truth copies of everything under `public/images/`. Each row: file, model, full prompt, date, acceptance note. No faces, no hands, no depiction of real persons (esp. no likeness of Anetta Dzikowski). Alt-Texte bleiben neutral-ehrlich (Stimmungsbilder, keine „unser Salon"-Behauptung).

| File | Model | Prompt | Date | Note |
|---|---|---|---|---|
| `salon-1.jpg` (ships as `public/images/salon-1.jpg`, 1152×1440) | fal-ai/flux-2-pro | "Editorial interior photograph of a small traditional European hair salon: an empty vintage salon chair facing a round wall mirror, warm ivory painted walls, honey-toned late-afternoon window light casting long soft shadows, brass fittings, a green potted plant, aged wooden floorboards, calm heritage atmosphere, shallow depth of field, subtle 35mm film grain, muted warm palette of cream, honey gold and deep blue-grey, no people, no text, no logos" | 2026-07-08 | Accepted: no people, plausible mirror reflection, palette on-token. Used: Salon-Sektion (groß) + /termin. |
| `salon-2.jpg` (ships as `public/images/salon-2.jpg`, 1536×1024) | fal-ai/flux-2-pro | "Editorial still life photograph on a wooden shelf in a traditional hair salon: classic hairdressing scissors, black fine-tooth combs and a soft bristle brush arranged neatly on folded ivory linen, small brass dish, warm honey-toned window light from the left, deep blue-grey shadowed background, shallow depth of field, subtle 35mm film grain, muted heritage palette of cream, honey gold and deep marine blue, no people, no hands, no text, no logos" | 2026-07-08 | Accepted: tool geometry plausible, marine backdrop matches Sektion. Used: Salon-Sektion (klein). |
| `about-detail.jpg` (ships as `public/images/about-detail.jpg`, 1152×1440) | fal-ai/flux-2-pro | "Quiet editorial still life photograph: a pair of classic silver hairdressing scissors and a tortoiseshell comb resting on a stack of folded cream linen towels, small ceramic bowl beside them, soft warm morning window light, gentle long shadows on an ivory plaster wall, shallow depth of field, film photography aesthetic, muted palette of warm ivory, honey and deep blue-grey, no people, no hands, no text, no logos" | 2026-07-08 | Accepted. Used: Über-Anetta-Sektion. |
| `og-source.jpg` (ships cropped as `app/opengraph-image.jpg`, 1200×630) | fal-ai/flux-2-pro | "Wide editorial interior photograph of a small traditional European hair salon: two empty vintage leather salon chairs at a long wooden counter beneath round brass mirrors, warm ivory walls, golden late-afternoon light streaming through tall windows with sheer curtains, green plants, aged wooden floor, calm heritage atmosphere, subtle 35mm film grain, muted palette of cream, honey gold and deep blue-grey, no people, no text, no logos" | 2026-07-08 | Accepted: keine lesbaren Etiketten, Spiegelungen plausibel. Used: Open-Graph-Bild. |
| `hero.jpg` (ships as `public/images/hero.jpg`, 1728×960) | fal-ai/flux-2-pro | "Wide editorial photograph inside a small traditional well-kept European hair salon: a single vintage leather salon chair in front of a round brass wall mirror, warm ivory plaster walls, tall window with sheer curtains on the right casting golden late-afternoon light, clean polished aged wooden floorboards, a green plant, calm tidy heritage atmosphere, generous calm empty wall space on the left third of the frame, shallow depth of field, subtle 35mm film grain, muted palette of cream, honey gold and deep marine blue, slightly dim moody exposure, no people, no text, no logos" | 2026-07-08 | Accepted (2. Versuch — 1. Versuch verworfen: Laub/Schmutz auf dem Boden wirkte verlassen statt gepflegt). Used: Hero-Hintergrund. |

**Alt-Text-Regel:** neutral-ehrlich („Salonstuhl im warmen Licht"), keine „unser Salon"-Behauptung — die Bilder sind Stimmungsbilder, nicht der reale Innenraum.
