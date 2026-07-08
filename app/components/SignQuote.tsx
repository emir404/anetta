"use client";

import { motion } from "motion/react";
import { Reveal, EASE, useReducedMotionSafe } from "./Reveal";

/**
 * Interlude: the storefront sign, quoted verbatim (knowledge-base copy rule —
 * original hyphenation preserved). The sign's yellow word on blue becomes the
 * brass word in the line — set in the display voice at sign-lettering scale.
 */
export function SignQuote() {
  const reducedMotion = useReducedMotionSafe();

  const lines: { key: string; content: React.ReactNode }[] = [
    {
      key: "l1",
      content: (
        <>
          „Der <span className="text-accent">freundliche</span>
        </>
      ),
    },
    { key: "l2", content: <>Damen- Herren-</> },
    { key: "l3", content: <>und Kinderfriseur“</> },
  ];

  return (
    <section
      aria-label="Leitspruch vom Ladenschild"
      data-print-hidden
      className="bg-surface px-6 py-20 sm:px-10 lg:px-[min(10.5vw,152px)] lg:py-28"
    >
      <figure className="mx-auto max-w-[980px] text-center">
        <blockquote className="font-display font-semibold uppercase leading-[1.12] tracking-[0.05em] [font-stretch:115%] text-foreground text-[clamp(23px,5.2vw,60px)]">
          {lines.map((line, i) => (
            <motion.span
              key={line.key}
              className="block overflow-hidden"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.6 }}
            >
              <motion.span
                className="block"
                variants={{
                  hidden: reducedMotion ? { opacity: 0 } : { y: "110%" },
                  visible: {
                    y: 0,
                    opacity: 1,
                    transition: { duration: 1, delay: i * 0.12, ease: EASE },
                  },
                }}
              >
                {line.content}
              </motion.span>
            </motion.span>
          ))}
        </blockquote>
        <Reveal delay={0.3}>
          <span aria-hidden className="mx-auto mt-9 block h-px w-16 bg-accent" />
          <figcaption className="mt-5 text-[11px] font-semibold uppercase tracking-[0.3em] text-foreground/55">
            Ladenschild · Kronsforder Allee 3a · Lübeck
          </figcaption>
        </Reveal>
      </figure>
    </section>
  );
}
