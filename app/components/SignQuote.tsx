"use client";

import { Reveal } from "./Reveal";

/**
 * Interlude: the storefront sign, quoted verbatim (knowledge-base copy rule —
 * original hyphenation preserved). A centered editorial beat between the
 * personal section and the marine band.
 */
export function SignQuote() {
  return (
    <section
      aria-label="Leitspruch vom Ladenschild"
      className="bg-surface px-6 py-16 sm:px-10 lg:px-[min(10.5vw,152px)] lg:py-24"
    >
      <figure className="mx-auto max-w-[900px] text-center">
        <Reveal y={24}>
          <blockquote className="text-balance font-serif italic font-medium leading-[1.22] text-foreground text-[clamp(26px,4vw,46px)]">
            „Der freundliche Damen- Herren- und Kinderfriseur“
          </blockquote>
        </Reveal>
        <Reveal delay={0.12}>
          <span aria-hidden className="mx-auto mt-8 block h-px w-16 bg-accent" />
          <figcaption className="mt-5 text-[11px] font-semibold uppercase tracking-[0.3em] text-accent">
            Ladenschild · Kronsforder Allee 3a · Lübeck
          </figcaption>
        </Reveal>
      </figure>
    </section>
  );
}
