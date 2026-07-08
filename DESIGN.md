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

**Reject:** commerce chrome, booking widgets, hidden prices, PDF price lists, stylist-tier price matrices (single-owner salon), all-caps sentences in German **body copy** (v3 exception: display headlines/wordmark set in caps by client direction — never running text), red/black shouting, marquee-mania (one slow footer marquee only), autoplay media, cookie banner (nothing to consent to), Du register, „seit 19xx" claims (unverified for this client), generated portraits or haircut-result photos (biggest AI tells; ambience only).

## 3. Why this direction is honest to THIS client

The storefront sign is deep blue with yellow lettering, a script "AnettA", retro hairdryer illustrations, and the self-description „Der freundliche Damen- Herren- und Kinderfriseur". The site translates rather than replaces it: the blue becomes marine ink, the yellow becomes honeyed brass. (v2 translated the script as a serif italic; v3, client-directed, sets the name in a modern semi-expanded grotesk — the sign's spirit now carried by the palette, the imagery warmth, and the brass accent word in the sign quote.) Luxury register, neighborhood truth.

## 4. The spec

### 4.1 Type system
- **Display grotesk — Archivo** (`next/font/google`, variable wght + `wdth` axis) — v3, client-directed 2026-07-08; supersedes the v2 Cormorant serif contract. The width axis IS the display voice: wordmark, section H2s and display digits at `[font-stretch:115%]`, caps, positive tracking (0.02–0.08em by size). Weight 600 display / 500 quotes. **No italics anywhere** — emphasis moves to the accent color and weight.
- **Text grotesk — Hanken Grotesk** (variable wght). Warm, humanist, disappears next to Archivo. Body 17px/1.65 at weight 430–500; UI labels 500–600. Unchanged from v2.
- **Micro-label voice**: Hanken 11–13px, 600, uppercase, `tracking [0.22em–0.3em]`, usually accent-colored. Eyebrows, nav, buttons, table headers.
- **Numbers**: `tabular-nums` for prices, hours, phone.
- CSS variables: `--font-display` (Archivo), `--font-sans` (Hanken Grotesk) — house contract.
- Scale: hero wordmark `clamp(52px, 11vw, 150px)` / leading 1; section H2 (caps, `[font-stretch:115%]`, tracking 0.06em) `clamp(30px, 4.6vw, 52px)` / leading 1.08; sign-quote interlude `clamp(28px, 5.2vw, 60px)`; Terminkarte tel `clamp(34px, 4.4vw, 58px)`, `/termin` tel `clamp(36px, 5.8vw, 72px)`; body 17px; micro 11–13px. Caps stay safe in German because every display line is short and hand-broken (`TextLineReveal` lines array); body copy carries `hyphens-auto`.

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
- Section envelope (house): `px-6 sm:px-10 lg:px-[min(10.5vw,152px)]`, `py-20 lg:py-[120px]`; Preisliste sheet `max-w-[920px]`; prose `max-w-[46–52ch]`.
- Radius: 0 everywhere (heritage sharpness); `rounded-full` only for the open/closed pill dot.
- Shadows: only the `/termin` floating map card (`shadow-2xl`, house) — nothing else. Overlapping images separate via a knockout border in the ground color (Salon pair: `border-[6px] border-marine`), not shadow.
- Rules: 1px lines at 12–15% ink; gold hairlines at full accent, one per section max.
- Crafted details (each device once): Preisliste corner ticks (`accent/50`, print-sheet register) · About passe-partout mat (`bg-surface` + hairline, caption row) · Terminkarte brass hairline frame (`border-accent-bright/25` — the sign plate) · index numerals (11px tabular accent) only on Preisliste categories and Salon timetable cells.
- Keyboard focus (globals): 2px brass outline, 4px offset; bright brass inside marine bands. Anchors get `scroll-margin-top` via `:target`.

### 4.4 Motion budget (house kit, nothing new)
`Reveal` rises · `TextLineReveal` clip-mask headlines · `Stagger` lists · hours flip-board · ONE slow velocity marquee above the footer · hovers: color→accent 200–500ms, underline scale-x, image scale ≤1.04. Everything branches on `useReducedMotionSafe()`. Lenis smooth scroll. No parallax beyond the house ghost-heading/photo drifts; no autoplay media.

### 4.5 Section architecture (homepage spine — v3, every section its own compositional shape)
1. **Hero** `masthead` (v3, client-directed after LATHR reference) — solid `bg-marine`, centered wordmark at display scale („HAARSTUDIO" micro-caps over „ANETTA" in Archivo caps, `[font-stretch:115%]`, clamp 52–150px), gold kicker „Friseur in Lübeck · am Mühlentor", centered nav row (lg), **snip device** beneath (scissors + gold hairline — the glyph's one appearance), then a **4-column service rail**: 2:3 editorial still lifes (Damen / Herren / Kinder / Farbe & Strähnen), each a link into `#leistungen`, tracked-caps label over a marine scrim; 2×2 on mobile; ivory `tel:` button top-right (lg) / hamburger (mobile); bottom info bar (hours · address→Maps, underlined · groups) kept from v2.
2. **Preisliste** `object` `#leistungen` — centered display-caps intro (eyebrow „LEISTUNGEN"), then **die Karte**: a bordered surface sheet with corner ticks, „PREISLISTE" between flanking hairlines, categories indexed `01–06` (caps display names, trailing hairline) flowing in two columns (xl), dot-leader rows with `39,–` digits in accent („ab" recedes in ink/55), footnote row inside the sheet; beneath, the phone at its second altitude — quiet tracked label over the number at `clamp(24px,3.4vw,36px)` with an underline-grow hover. Prints as a document (print CSS forces the sheet to ink-on-white and hides everything else).
3. **Über Anetta** `mat-split` `#ueber-anetta` — the **matted print**: 4:5 image in a `bg-surface` passe-partout with hairline border and a caption row (micro-caps + gold tick) — a framed photograph off the salon wall; text right: honest copy, then a **facts ledger** (Inhaberin / Für / Termine as hairline dl-rows, tel row linked — replaces the loose phone link).
4. **Sign quote** `interlude` — surface band, the storefront tagline quoted verbatim in the centered display voice (caps, semi-expanded; „freundliche" carries the accent — the sign's yellow word), gold rule, tracked caption. Editorial beat between light and dark.
5. **Der Salon** `dark-band` `#salon` — marine, ghost „Lübeck" outline (display voice, 1.5px ivory stroke at 7%), story copy + image pair with parallax (small photo knocked out in ground color, no shadow), then a **timetable strip**: Lage / Für alle / Termine as bordered, divided cells full-width, indexed `01–03`.
6. **Stimmen** — renders `null` until verified quotes exist (dormant markup: surface cards, body-voice quotes, gold-tick attribution).
7. **Kontakt & Termin** `split-object` `#kontakt` — header row (display-caps H2 + side note), then the **marine Terminkarte in a brass hairline frame** — the storefront sign's grammar as a contact card (eyebrow, tel at display scale `[font-stretch:115%]`, open/closed pill, quiet hours rows with a gold dot on today, address + links) beside the **map bleeding to the right viewport edge** (hairline-framed, warm-graded: grayscale 0.35 + sepia 0.08). No floating card, no flip board (the flip board lives on `/termin` only — pages differ too).
8. **Footer** — display-caps marquee (velocity-reactive), marine ground, wordmark block, contact + hours columns, Impressum/Datenschutz. Curtain reveal.
Secondary routes: `/termin` (phone-first explainer + flip-board hours + map + floating card), `/impressum`, `/datenschutz`.
Nav (5): LEISTUNGEN · ÜBER ANETTA · ÖFFNUNGSZEITEN · KONTAKT + button TERMIN VEREINBAREN (`/termin` link in nav list; button = `tel:`).
**Motif discipline:** scissors glyph appears exactly once (hero), the matted print exactly once (Über Anetta), corner ticks exactly once (Preisliste), the brass card-frame exactly once (Terminkarte), one ghost word per page (Salon), one marquee (footer). Index numerals live only in the Preisliste and the Salon strip. Repetition would turn devices into wallpaper.

### 4.6 Imagery art direction (genmedia)
- Register: warm editorial stills — salon chair by window light, scissors/comb still life on linen, towels + ceramic, mirror with plants, brass details. **No faces, no hands, no haircut results, no likeness of the owner.**
- Grade: warm ivory light, deep shadows toward marine, honey highlights; shallow DOF; believable 35mm feel; nothing sterile-stocky.
- Fixed ratios: Hero service rail 4× 2:3 portrait 1024×1536 (calm upper third, label scrim at the bottom; grounds alternate ivory/marine across the rail) · About detail 4:5 (matted) · Salon pair 4:5 + 3:2 · OG 1200×630. (Retired: v2 full-bleed hero 1728×960 — archived, see MANIFEST.)
- Every accepted asset: row in `knowledge-base/images/MANIFEST.md` (file, model, prompt, date) + copy in `knowledge-base/images/generated/`. A slot that can't clear the bar ships as typographic composition instead.

### 4.7 Wordmark
Code-rendered (house rule): „HAARSTUDIO" as tracked micro-caps (sans) above „ANETTA" in Archivo caps at `[font-stretch:115%]` — the sign rebuilt in the modern voice (v3). Realized at display scale as the hero masthead (h1: sr-only full name + aria-hidden visual spans; v3 client decision — supersedes the v2 statement-hero rationale) and statically in the footer brand block (`role="img"`, `aria-label`); page headers use the one-line tracked-caps brand.

## 5. Reskin guide (future salon clients)
Swap per client: token values (§4.2 — derive from the client's physical brand), font pairing IF the brand demands (keep the three-voice contract), wordmark lines, all `app/data/*` (from the new KB), section copy, imagery set, legal pages. Keep: type-scale contract, accent discipline, price-row recipe, „Termin vereinbaren" phone staging (or swap CTA target if the client has a booking system), motion budget, section spine (reorder/cut per client emphasis).
