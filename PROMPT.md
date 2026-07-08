You're reskinning our salon template for a new client. The knowledge base has just been updated with the new salon's details — treat it as the single source of truth. Read it fully before touching any code.

Our house standard is LUXURY / HIGH-END. Every site we ship is upscale, refined, and expensive-feeling — restrained, not loud. This is non-negotiable. The knowledge base decides *how* that luxury is expressed for this specific salon; it never lowers the bar to casual or playful.

1. UNDERSTAND THE SALON FIRST
Extract from the KB: name, type (salon / studio / colour specialist / high-end barbering), positioning, price tier, neighborhood, origin story & philosophy, signature services and specialties (e.g. balayage, precision cutting, extensions, bridal), star stylists, hours, contact, booking system/link, and any brand cues (existing colors, voice, personality). Form a clear picture of who this place is and how it should *feel* before designing anything.

2. SET THE DESIGN DIRECTION (luxury, shaped by the salon)
The mood always sits in the high-end register — the salon's identity decides the *flavor* of that luxury. A clean architectural hair studio, a glamorous warm blow-dry bar, a moody high-fashion colour house, and a refined heritage barbershop should all feel expensive, but look distinct. Decide:
- Mood in one sentence, always within luxury (e.g. "clean, minimal, architectural" vs "warm, glamorous, opulent" vs "editorial, moody, high-fashion" vs "classic, refined, heritage grooming").
- Typography — high-end pairings only. High-contrast editorial serifs for glamour and heritage; refined humanist or grotesk sans for modern/architectural. No generic system fonts, nothing playful. Type carries most of the luxury signal, so treat it as the centerpiece.
- Color — sophisticated, muted, considered. Warm neutrals, deep tones, a single disciplined accent drawn from the brand/space. Avoid bright saturated palettes. Define as OKLCH design tokens (background, foreground, primary, accent, muted, border). Keep contrast accessible.
- Space, radii, shadows — generous whitespace, tight intentional hierarchy, subtle shadows. Sharp/minimal for modern-luxe, soft-but-refined for warm/glamorous. Never cramped, never busy.
Update the actual token definitions (Tailwind v4 @theme / CSS variables). Don't override inline.

3. REPLACE ALL CONTENT
Nothing from the previous salon may survive. Rewrite:
- Hero headline + subcopy in the new brand's voice
- About / story / philosophy
- Services & pricing — sections, service names, descriptions, and prices (respect the KB's pricing convention, e.g. "from £X"; don't invent numbers)
- Team / stylists — names, roles, specialties, short bios (this is often the heart of a salon site; treat it with care)
- Gallery / portfolio of work
- Booking — CTA and how-to-book, wired to the KB's booking link/system
- Hours, location, contact, socials
- Testimonials (use real ones from the KB; if none, leave a clearly marked placeholder — do NOT invent quotes)
- Metadata: page title, description, OG tags
- Image alt text
Then grep for the old salon's name and any old-specific strings to confirm nothing slipped through.

4. LAYOUT IS YOURS TO CHANGE
Start from the existing structure since it's proven, but you have full freedom to restructure when the salon calls for it — a stylist-led studio, a service-led salon, and a portfolio-led colour house want different emphasis. Reorder, add, or cut sections, rethink the hero, foreground the team or the gallery if that's the draw. The goal: this should look like a bespoke site built *for this salon*, not a recognizable reskin — while still reading as unmistakably high-end. If a section doesn't serve this place, cut it. If the story needs a section the template lacks, build it.

5. IMAGERY
Use client photos from the KB when provided and they meet the bar. When photos are missing, low-quality, don't fit a section, or you have a stronger visual idea, generate new ones with the genmedia CLI (check its --help for exact usage/flags before running).
Quality bar: every image must look like it came from a high-end hair/beauty editorial — this is where generated imagery most often betrays a "cheap" site, so hold it hard. Direct the generations deliberately:
- Match the salon's established mood, palette, and specialty (bright airy Scandinavian vs. warm glamorous vs. moody editorial).
- Cinematic lighting, shallow depth of field, real salon interiors, believable hair with natural texture and movement.
- Editorial composition: generous negative space, considered crops, no clutter, no stock-photo staginess.
- Keep aspect ratios and placeholder slots consistent with the layout so nothing breaks.
Watch the usual generation tells hard: hands, faces, and hair strands are where these fail — reject anything with mangled fingers, uncanny faces, or melting/impossible hair. A weak generated image is worse than a clean placeholder — if you can't get it to the standard, leave a marked placeholder instead.
