# DESIGN.md — Hairdresser Vertical · Haarstudio Anetta

Design research → direction → concrete spec. This file is a **template asset**: future salon reskins re-run section 4 (client-specific values) while sections 1–3 (what world-class salon sites do and why) stay useful.

Direction (v4, client direction 2026-07-08 — supersedes v3 "Warm Hanseatic heritage"): **Das Schild, auf Weiß** — the client's actual logo artwork (yellow script „AnettA") and the sign's own colors (Blau `#134792`, Gelb `#f4b821`), set on ~80% white with blue reserved for the sign moments and yellow for CTAs. Bright, friendly, unisex — „der freundliche Damen- Herren- und Kinderfriseur" is a family salon, and the site must never read as a menswear barbershop or a luxury heritage atelier. v3's translation (ivory/marine/brass "quiet luxury") was judged too detached from brand reality.

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

**Reject:** commerce chrome, booking widgets, hidden prices, PDF price lists, stylist-tier price matrices (single-owner salon), all-caps display sentences (v4: sentence-case display everywhere — caps only for micro-labels/nav/category names; the v3 caps-masthead read "super male" for a family salon), red/black shouting, marquee-mania (one slow footer marquee only), autoplay media, cookie banner (nothing to consent to), Du register, „seit 19xx" claims (unverified for this client), generated portraits or haircut-result photos (biggest AI tells; ambience only).

**v4 amendment to accent discipline:** CTAs are **yellow-filled with blue text** (client direction: "CTAs same color as logo") — the one sanctioned fill. Everywhere else the old rule holds: accents never fill, never ground body surfaces.

## 3. Why this direction is honest to THIS client

The storefront sign is deep blue with yellow lettering, a script "AnettA", retro hairdryer illustrations, and the self-description „Der freundliche Damen- Herren- und Kinderfriseur". v4 stops translating and starts using: the client's logo artwork IS the wordmark, the sign's blue and yellow ARE the tokens, the imagery shows a bright honest neighborhood salon with the sign's colors as real objects (blue capes and towels, yellow combs) and the retro dryer quoted as a still life. Friendly register, neighborhood truth. (History: v2 translated the script as serif italic; v3 as semi-expanded caps grotesk on ivory/marine/brass — both retired as too detached from the brand's reality.)

## 4. The spec

### 4.1 Type system
- **Display grotesk — Archivo** (`next/font/google`, variable wght) — v4: the brand's script voice now lives entirely in the logo artwork, so type stays quiet and friendly. Section H2s/display lines are **sentence case**, weight 600, `tracking [-0.01em]`, `leading 1.06` — the v3 caps + `[font-stretch:115%]` voice is retired (read "super male" for a family salon; stretch survives nowhere, caps survive only in micro-labels, nav, category names and the footer marquee). **No italics anywhere** — emphasis moves to the accent color and weight.
- **Text grotesk — Hanken Grotesk** (variable wght). Warm, humanist, disappears next to Archivo. Body 17px/1.65 at weight 430–500; UI labels 500–600. Unchanged from v2.
- **Micro-label voice**: Hanken 11–13px, 600, uppercase, `tracking [0.22em–0.3em]`, usually accent-colored. Eyebrows, nav, buttons, table headers.
- **Numbers**: `tabular-nums` for prices, hours, phone.
- CSS variables: `--font-display` (Archivo), `--font-sans` (Hanken Grotesk) — house contract.
- Scale: hero wordmark `clamp(52px, 11vw, 150px)` / leading 1; section H2 (caps, `[font-stretch:115%]`, tracking 0.06em) `clamp(30px, 4.6vw, 52px)` / leading 1.08; sign-quote interlude `clamp(28px, 5.2vw, 60px)`; Terminkarte tel `clamp(34px, 4.4vw, 58px)`, `/termin` tel `clamp(36px, 5.8vw, 72px)`; body 17px; micro 11–13px. Caps stay safe in German because every display line is short and hand-broken (`TextLineReveal` lines array); body copy carries `hyphens-auto`.

### 4.2 Color tokens (globals.css `:root` → `@theme inline`) — v4, sampled from the client's logo artwork
| Token | Value | Role |
|---|---|---|
| `--background` | `#ffffff` | white (page ground — ~80% of every viewport) |
| `--surface` | `#eef2f9` | pale blue-washed paper — cards, Preisliste sheet, today-row |
| `--foreground` | `#14264d` | navy ink derived from the sign blue — never `#000` |
| `--blue` | `#134792` | the sign blue — hero panel, sign-quote band, Terminkarte, footer (the ~20%) |
| `--yellow` | `#f4b821` | the sign yellow — CTA fills, accents/labels on blue (5.0:1 on `--blue`) |
| `--accent` | `#7d5f00` | deep gold — the yellow family made readable on light grounds: eyebrows, digits, rules, hovers (5.6:1 on white, 4.9:1 on surface) |
Usage discipline: **CTAs = `bg-yellow text-blue`** (the logo pairing, v4 client direction). All other fills stay off-limits for accents; text on blue = white or yellow. `::selection`: yellow ground, blue text. Contrast verified: white on blue 9.0:1 · yellow on blue 5.0:1 · ink on white 13+:1.

### 4.3 Space, radii, shadows
- Section envelope (house): `px-6 sm:px-10 lg:px-[min(10.5vw,152px)]`, `py-20 lg:py-[120px]`; Preisliste sheet `max-w-[920px]`; prose `max-w-[46–52ch]`.
- Radius: 0 everywhere (heritage sharpness); `rounded-full` only for the open/closed pill dot.
- Shadows: only the `/termin` floating map card (`shadow-2xl`, house) — nothing else. Overlapping images separate via a knockout border in the ground color (Salon pair: `border-[6px] border-background`), not shadow.
- Rules: 1px lines at 12–15% ink; gold hairlines at full accent, one per section max.
- Crafted details (each device once): Preisliste corner ticks (`accent/50`, print-sheet register) · About passe-partout mat (`bg-surface` + hairline, caption row) · Terminkarte yellow hairline frame (`border-yellow/60` — the sign plate) · index numerals (11px tabular accent) only on Preisliste categories and Salon timetable cells.
- Keyboard focus (globals): 2px deep-gold outline, 4px offset; sign yellow inside blue bands. Anchors get `scroll-margin-top` via `:target`.

### 4.4 Motion budget (house kit, nothing new)
`Reveal` rises · `TextLineReveal` clip-mask headlines · `Stagger` lists · hours flip-board · ONE slow velocity marquee above the footer · hovers: color→accent 200–500ms, underline scale-x, image scale ≤1.04. Everything branches on `useReducedMotionSafe()`. Lenis smooth scroll. No parallax beyond the house ghost-heading/photo drifts; no autoplay media.

### 4.5 Section architecture (homepage spine — v4: ~80% white, blue only where the sign speaks: hero panel, sign quote, Terminkarte, footer)
1. **Hero** `masthead` (v4) — **the sign as a blue panel**: „HAARSTUDIO" micro-caps over the **script logo artwork** (`public/logo/anetta-wordmark.png`, `w-[min(78vw,540px)]`, `preload`), yellow kicker „Friseur in Lübeck · am Mühlentor", centered nav row (lg, white/85 → yellow hover), snip device (scissors + yellow hairline — the glyph's one appearance), then **the phone number in the masthead** (micro-label + tabular display digits, white → yellow hover — the number painted on the sign, first of its altitudes), and the panel's bottom board: hours · address→Maps · groups behind a white/20 rule. **Yellow `tel:` CTA** top-right (lg only). Below the panel, on white: the **4-column service rail**, 2:3 bright still lifes (Damen / Herren / Kinder / Farbe & Strähnen), each a link into `#leistungen`, tracked-caps white label over a blue/80 scrim; 2×2 on mobile. **Mobile call bar** (client direction, lap.coffee reference): fixed bottom pill `rounded-full border-yellow/60 bg-blue` — wordmark · burger (opens the fixed menu overlay) · yellow tabular `tel:` button — the one rounded element and the one fixed element on the site; footer carries `pb-28` on mobile so legal links stay reachable.
2. **Preisliste** `object` `#leistungen` — centered sentence-case display intro (eyebrow „LEISTUNGEN"), then **die Karte**: a bordered surface sheet with corner ticks, „PREISLISTE" between flanking hairlines, categories indexed `01–06` (caps display names, trailing hairline) flowing in two columns (xl), dot-leader rows with `39,–` digits in accent („ab" recedes in ink/55), footnote row inside the sheet; beneath, the phone at its second altitude — quiet tracked label over the number at `clamp(24px,3.4vw,36px)` with an underline-grow hover. Prints as a document (print CSS forces the sheet to ink-on-white and hides everything else).
3. **Über Anetta** `mat-split` `#ueber-anetta` — the **matted print**: 4:5 image in a `bg-surface` passe-partout with hairline border and a caption row (micro-caps + gold tick) — a framed photograph off the salon wall; text right: honest copy, then a **facts ledger** (Inhaberin / Für / Termine as hairline dl-rows, tel row linked — replaces the loose phone link).
4. **Sign quote** `interlude` — **blue band** (v4): the storefront tagline quoted verbatim in sentence-case display white, „freundliche" in the sign's yellow, yellow rule, tracked caption white/60. The literal sign as an editorial beat.
5. **Der Salon** `light` `#salon` (v4 — was the dark band; flipped to keep the 80/20 balance) — white ground, ghost „Lübeck" outline (1.5px sign-blue stroke at 10%), story copy + image pair with parallax (small photo knocked out in **white**, no shadow), then a **timetable strip**: Lage / Für alle / Termine as hairline cells (foreground/15), indexed `01–03` in accent.
6. **Stimmen** — renders `null` until verified quotes exist (dormant markup: surface cards, body-voice quotes, gold-tick attribution).
7. **Kontakt & Termin** `split-object` `#kontakt` — header row (sentence-case H2 + side note), then the **blue Terminkarte in a yellow hairline frame (yellow/60)** — the storefront sign's grammar as a contact card (yellow eyebrow, tel at display scale in white → yellow hover, open/closed pill in yellow, quiet hours rows with a yellow dot on today, address + links) beside the **map bleeding to the right viewport edge** (hairline-framed, neutral-graded: grayscale 0.25, sepia retired with the ivory palette). No floating card, no flip board (the flip board lives on `/termin` only — pages differ too).
8. **Footer** — display-caps marquee (velocity-reactive; the one surviving caps-display texture), blue ground, logo wordmark block, contact + hours columns with yellow CTA, Impressum/Datenschutz. Curtain reveal.
Secondary routes: `/termin` (phone-first explainer + flip-board hours + map + floating card), `/impressum`, `/datenschutz`.
Nav (5): LEISTUNGEN · ÜBER ANETTA · ÖFFNUNGSZEITEN · KONTAKT + button TERMIN VEREINBAREN (`/termin` link in nav list; button = `tel:`).
**Motif discipline:** scissors glyph appears exactly once (hero), the matted print exactly once (Über Anetta), corner ticks exactly once (Preisliste), the brass card-frame exactly once (Terminkarte), one ghost word per page (Salon), one marquee (footer). Index numerals live only in the Preisliste and the Salon strip. Repetition would turn devices into wallpaper.

### 4.6 Imagery art direction (genmedia) — v4 „das Schild, in echt"
- Register: **bright friendly daylight in an honest, well-kept neighborhood salon** — clean warm-white walls, laminate, radiators, product bottles; simple modern furniture; never luxury-heritage, never moody. The sign's colors appear as real objects: royal-blue capes/towels, yellow combs/trims; the sign's retro dryer quoted once as a still life (salon-2). Family-warm, unisex — no barbershop coding (no badger brushes). **No faces, no hands, no haircut results, no likeness of the owner, no readable text.**
- Grade: fresh natural light, white grounds, blue/yellow accents; shallow DOF; believable photography; nothing sterile-stocky.
- Fixed ratios: Hero service rail 4× 2:3 portrait 1024×1536 (calm upper third, label scrim at the bottom) · About detail 4:5 · Salon pair 4:5 + 3:2 · OG 1200×630 (v4: composed from the logo artwork, not generated). (Retired: the whole v3 heritage set — archived, see MANIFEST.)
- Every accepted asset: row in `knowledge-base/images/MANIFEST.md` (file, model, prompt, date) + copy in `knowledge-base/images/generated/`. A slot that can't clear the bar ships as typographic composition instead.

### 4.7 Wordmark
**The client's logo artwork** (v4 — exception to the code-rendered house rule, because real brand artwork exists): yellow script „AnettA" PNG (alpha-trimmed 1400×640, `public/logo/anetta-wordmark.png`), always on the sign blue, with „HAARSTUDIO" as tracked micro-caps above. Hero masthead: h1 = sr-only full name + aria-hidden micro-caps + aria-hidden `next/image` (`preload`). Footer brand block: same lockup at 172px (`role="img"`, `aria-label` on the wrapper). Page headers use the one-line tracked-caps text brand (script art too fragile at 13px). Favicon/OG are composed from the same artwork (see MANIFEST).

## 5. Reskin guide (future salon clients)
Swap per client: token values (§4.2 — derive from the client's physical brand), font pairing IF the brand demands (keep the three-voice contract), wordmark lines, all `app/data/*` (from the new KB), section copy, imagery set, legal pages. Keep: type-scale contract, accent discipline, price-row recipe, „Termin vereinbaren" phone staging (or swap CTA target if the client has a booking system), motion budget, section spine (reorder/cut per client emphasis).
