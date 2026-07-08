# DESIGN.md — Hairdresser Vertical · Haarstudio Anetta

Design research → direction → concrete spec. This file is a **template asset**: future salon reskins re-run section 4 (client-specific values) while sections 1–3 (what world-class salon sites do and why) stay useful.

Direction (confirmed with studio, 2026-07-08): **Warm Hanseatic heritage** — the client's retro blue/gold storefront sign translated into quiet luxury. Never fashion-cold; "der freundliche Friseur" set like a beloved institution.

---

## 1. What the best salon sites do — and why

Method: 12+ live sites analyzed (WebFetch + shipped-CSS inspection for real typefaces). Four streams: London flagships (Hershesons, Larry King, George Northwood, Josh Wood Colour), award-tier studio builds (Hagi's Barber Düsseldorf — Awwwards SOTD, Una Auckland, Marco Ambrosi Verona, Don Barber Athens), German market (Shan Rahimkhan Berlin, Marlies Möller Hamburg, Pony Club München, ICONO), international luxury (see §1.5 addendum).

### 1.1 Typography — the entire luxury signal
- The award tier runs **one expressive serif at extreme scale against one whisper-quiet sans**, ratio ≈ 10:1 (Hagi's: Roxborough CF Thin at 10–12vw over GT America at ~1vw). Never a fourth voice.
- **Three voices total**: display serif · body text · tracked uppercase micro-label (11–13px, letter-spacing 0.2–0.5em — Ambrosi tracks eyebrows at 0.5rem). Every section reuses the same three.
- **Roman/italic switching inside one display line** to emphasize a single word (Una loads a dedicated italic cut of PP Eiko for exactly this). Cheapest possible move that reads instantly bespoke.
- George Northwood's inversion — serif for reading, tracked caps sans for wayfinding — is the quietest luxury system in the London set; JW's letterspaced Garamond addresses prove a classic serif = instant heritage.
- Light/Thin display cuts, `line-height 0.95–1.1`, minimal negative tracking. All-caps display paragraphs (GN's manifesto) strain legibility — **fatal in German** (compounds like "Terminvereinbarung"); caps only for short labels.

### 1.2 Color — ivory is a decision, gold is a text color
- Hagi's: warm ivory `#fffded` + near-black ink, **zero accent** — restraint IS the accent. Larry King in code: putty `#F1EDE6` ground + putty-light `#F8F6F3` cards (**two warm neutrals give section rhythm without borders**), ink `#353535` (never #000), gold `#BEA382` as seasoning.
- Accent usage across every good site: eyebrow labels, price digits, hover states, one hairline rule per section. **Never fills, never button backgrounds.**
- One inverted dark band mid-page (Don Barber) resets rhythm and makes the ivory feel warmer on return.

### 1.3 Structure & booking
- The salon-first sites keep **≤5 nav items**, words-first hero, near-zero motion. Commerce chrome (bags, mega-menus, newsletter pop-ins) is what makes the Shopify flagships feel like funnels — delete all of it.
- **Phone-only booking is award-compatible** (Ambrosi: WhatsApp/phone only) if the number is staged as typography: persistent header slot, price rows ending in the number, a closing section with the number set at hero scale in the display serif, `tel:`-linked, tabular numerals.
- Hours + address on the homepage, near the hero (Pony Club puts hours IN the hero) — the trust cues a neighborhood salon cannot bury (Hershesons buries everything → anti-model).
- Prices: **on-page typeset lines, never PDF, never hidden** (hidden prices = trust gap; Preisangaben expectation in Germany). Rows = name left, price right, hairline/dot leader between, footnotes as small italic beneath.

### 1.4 German-market conventions (calibration stream)
- **CTA verb**: phone-only salons say **„Termin vereinbaren"** — „Termin buchen"/„online buchen" implies a booking engine (Salonkee/StudioBookr). Sentence patterns: „Vereinbaren Sie Ihren Termin telefonisch unter …", „Rufen Sie uns gerne an – wir freuen uns auf Sie!"
- **Preisliste format**: flat list or 2-col, cents omitted — `71,-` (Pony Club), `94,– bis 116,–` (Marlies Möller); € stated once („Preise in Euro.") not per row; escape hatches „auf Anfrage", „nach Aufwand"; 1–2 footnotes (length/effort surcharge). Category canon: Damen / Herren / Farbe (Ansatz, Strähnen, Balayage) / Styling / Pflege / Beauty / Hochstecken-Braut; Kinder usually a line item. **Dauerwelle appears on none of the fashion-led sites — for an older neighborhood clientele it is expected; listing it is a deliberately traditional, correct touch.**
- **Tone**: strict Sie in client copy (Du only in recruiting); „Gäste" over „Kunden"; sign-off „Wir freuen uns auf Sie! Ihr … Team"; trust lines „inhabergeführt", „inkl. Beratung"; hedge „eine feste Preisauskunft … erst im persönlichen Beratungsgespräch" (Shan Rahimkhan).
- Footer: Impressum · Datenschutzerklärung as separate links. No cookie banner needed when the site sets no cookies (Pony Club needs one only for analytics).
- Big-city flagship prices run 1.5–2.5× a Lübeck neighborhood salon (Damen WSF: 71–116 € München/Hamburg-Pöseldorf) — our draft list sits deliberately at neighborhood level.

### 1.5 International-luxury stream (David Mallett Paris, Rossano Ferretti, Sassoon, Suite Caroline NYC)
- **Every flagship leaves the same gap: one distinctive serif, fully exploited.** DM ships default Noto Serif; Sassoon loads 12 weights of Playfair and renders none of it; Suite Caroline's single-weight display flattens hierarchy; RF commits but drowns it among five families. Our single-serif-with-italics centerpiece attacks exactly this gap.
- **Statement hero, words not slideshow**: the two strongest heroes found are a quoted line (DM: „Le meilleur salon de coiffure de Paris" — Vogue) and a positioning sentence (Sassoon). Confirms our typography-led hero.
- **Phone-first booking reads as luxury in Germany**: Sassoon Berlin runs „CALL TO BOOK APPOINTMENT" + tel: + structured hours table; DM recommends phone for technical services. Zero booking-widget JS also wins LCP.
- **Price discipline**: DM's categorized Tarifs with named tiers works; Sassoon's price opacity would fail German expectations (PAngV). Suite Caroline's grace note „Prices vary by stylist" → our footnote. `dl` + `grid-template-columns: 1fr max-content` + dotted leader is the durable row recipe. **Print stylesheet for the price page** — the most-visited, most-printed page of a salon site.
- Gold only at interaction points (RF's `#dfaf31` tips toward hotel-lobby when filled large); footer as the permanent contact card (Suite Caroline).

## 2. Adopt / Reject for this vertical

**Adopt:** three-voice type system with serif centerpiece and italic-word emphasis · two-step warm ivory ground + soft ink + accent-as-seasoning · one inverted marine band mid-page · ≤5 German nav items · words-first ivory hero with hours/address as hero furniture · Preisliste as typographic set-piece with `39,–` digits and one italic footnote · „Termin vereinbaren" phone staging at three altitudes (header, price list, closing section at hero scale) · house motion kit only, slow, reduced-motion-branched · Impressum/Datenschutz separate links · print stylesheet for the Preisliste.

**Reject:** commerce chrome, booking widgets, hidden prices, PDF price lists, stylist-tier price matrices (single-owner salon), all-caps sentences in German, red/black shouting, marquee-mania (one slow footer marquee only), autoplay media, cookie banner (nothing to consent to), Du register, „seit 19xx" claims (unverified for this client), generated portraits or haircut-result photos (biggest AI tells; ambience only).

## 3. Why this direction is honest to THIS client

The storefront sign is deep blue with yellow lettering, a script "AnettA", retro hairdryer illustrations, and the self-description „Der freundliche Damen- Herren- und Kinderfriseur". The site translates rather than replaces it: the blue becomes marine ink, the yellow becomes honeyed brass, the script becomes a serif italic, and „freundlich" becomes the emphasized word of the hero. Luxury register, neighborhood truth.

## 4. The spec

### 4.1 Type system
- **Display serif — Cormorant** (`next/font/google`, variable wght 300–700 + true italics). High-contrast garalde: European heritage with glamour, spectacular ≥28px. **Hard rule: never below 24px** (hairlines get fragile) — small sizes belong to the sans. Weights: 500 display / 600 for mid-size headings. Italic = emphasis voice (single words inside roman lines; the salon name „Anetta").
- **Text grotesk — Hanken Grotesk** (variable wght + italics). Warm, humanist, disappears next to Cormorant. Body 17px/1.65 at weight 430–500; UI labels 500–600.
- **Micro-label voice**: Hanken 11–13px, 600, uppercase, `tracking [0.22em–0.3em]`, usually accent-colored. Eyebrows, nav, buttons, table headers.
- **Numbers**: `tabular-nums` for prices, hours, phone.
- CSS variables: `--font-serif` (Cormorant), `--font-sans` (Hanken Grotesk) — house contract.
- Scale: hero display `clamp(3rem, 9.5vw, 8.5rem)` / leading 0.98; section H2 `clamp(2.5rem, 5.5vw, 4.25rem)` / leading 1.05; tel-headline `clamp(2.75rem, 8.5vw, 7.5rem)`; body 17px; micro 11–13px. German compounds: `hyphens-auto` on body copy, display lines broken by hand (`TextLineReveal` lines array).

### 4.2 Color tokens (globals.css `:root` → `@theme inline`)
| Token | Value | Role |
|---|---|---|
| `--background` | `#f6f1e7` | warm ivory paper (page ground) |
| `--surface` | `#ede5d3` | second ivory step — cards, alt rows, hours-board today-row |
| `--foreground` | `#1d2a36` | deep marine ink (text) — never `#000` |
| `--marine` | `#16222e` | inverted band ground („Der Salon", footer) |
| `--accent` | `#8a672c` | honeyed brass on light grounds — eyebrows, digits, rules, hovers (AA on ivory) |
| `--accent-bright` | `#c9a35e` | brass on dark grounds (AA on marine) — eyebrows/rules inside inverted band + footer |
Usage discipline: accent never fills, never button grounds. Buttons = 1px ink border or ink fill with ivory text. `::selection`: accent-bright ground, marine text.

### 4.3 Space, radii, shadows
- Section envelope (house): `px-6 sm:px-10 lg:px-[min(10.5vw,152px)]`, `py-20 lg:py-[120px]`; price-list column `max-w-[760px]`; prose `max-w-[52ch]`.
- Radius: 0 everywhere (heritage sharpness); `rounded-full` only for the open/closed pill dot.
- Shadows: only the floating map card (`shadow-2xl`, house) — nothing else.
- Rules: 1px lines at 12–15% ink; gold hairlines at full accent, one per section max.

### 4.4 Motion budget (house kit, nothing new)
`Reveal` rises · `TextLineReveal` clip-mask headlines · `Stagger` lists · hours flip-board · ONE slow velocity marquee above the footer · hovers: color→accent 200–500ms, underline scale-x, image scale ≤1.04. Everything branches on `useReducedMotionSafe()`. Lenis smooth scroll. No parallax beyond the house ghost-heading/photo drifts; no autoplay media.

### 4.5 Section architecture (homepage spine)
1. **Hero** — pure typography on ivory. Eyebrow „Friseur in Lübeck · am Mühlentor"; display headline „Der *freundliche* Friseur am Mühlentor." (italic emphasis); support line Damen · Herren · Kinder; primary CTA „Termin vereinbaren" (`tel:`) + secondary „Zur Preisliste"; hero furniture bottom row: today's hours · address · phone. No background photo (none exists that we may use — honesty beats decoration).
2. **Preisliste** `#leistungen` — set-piece list: category serif headings, rows (sans name / dot-leader hairline / tabular `39,–` in accent), Farbe consultation note, italic footnote, phone line beneath.
3. **Über Anetta** `#ueber-anetta` — personal section; large serif „Anetta" italic; honest copy (inhabergeführt, alle Generationen, persönliche Beratung); NO invented history; one generated ambience detail image 4:5.
4. **Der Salon** `#salon` — inverted marine band; accent-bright eyebrows; Mühlentor/Lage story + „für alle Generationen"; 2 generated ambience images (4:5 + 3:2); „Route planen" link.
5. **Stimmen** — renders `null` until verified quotes exist (empty `TESTIMONIALS`).
6. **Kontakt & Termin** `#kontakt` — ghost heading, „Termin vereinbaren — rufen Sie uns an", tel-headline at display scale, hours flip-board (`#oeffnungszeiten`), map + floating address card.
7. **Footer** — marquee („Damen · Herren · Kinder · Am Mühlentor · Lübeck ·"), marine ground, brand + contact + hours columns, Impressum/Datenschutz.
Secondary routes: `/termin` (phone-first explainer + hours + map), `/impressum`, `/datenschutz`.
Nav (5): LEISTUNGEN · ÜBER ANETTA · ÖFFNUNGSZEITEN · KONTAKT + button TERMIN VEREINBAREN (`/termin` link in nav list; button = `tel:`).

### 4.6 Imagery art direction (genmedia)
- Register: warm editorial stills — salon chair by window light, scissors/comb still life on linen, towels + ceramic, mirror with plants, brass details. **No faces, no hands, no haircut results, no likeness of the owner.**
- Grade: warm ivory light, deep shadows toward marine, honey highlights; shallow DOF; believable 35mm feel; nothing sterile-stocky.
- Fixed ratios: About detail 4:5 · Salon pair 4:5 + 3:2 · OG 1200×630 (typographic, generated texture background at most).
- Every accepted asset: row in `knowledge-base/images/MANIFEST.md` (file, model, prompt, date) + copy in `knowledge-base/images/generated/`. A slot that can't clear the bar ships as typographic composition instead.

### 4.7 Wordmark
Code-rendered (house rule): „HAARSTUDIO" as tracked micro-caps (sans) above „Anetta" in Cormorant italic — the sign's script spirit, set in our serif. Realized statically in the footer brand block (`role="img"`, `aria-label`); nav and page headers use the one-line tracked-caps brand. The hero deliberately carries a statement instead of the wordmark (§1.5: words beat logos) — that's what keeps this template from reading as a sibling reskin.

## 5. Reskin guide (future salon clients)
Swap per client: token values (§4.2 — derive from the client's physical brand), font pairing IF the brand demands (keep the three-voice contract), wordmark lines, all `app/data/*` (from the new KB), section copy, imagery set, legal pages. Keep: type-scale contract, accent discipline, price-row recipe, „Termin vereinbaren" phone staging (or swap CTA target if the client has a booking system), motion budget, section spine (reorder/cut per client emphasis).
