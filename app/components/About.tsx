"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { Reveal, TextLineReveal, EASE, useReducedMotionSafe } from "./Reveal";
import { SALON } from "../data/salon";

// The ledger is the only place on the page carrying the owner's name —
// kept factual, no invented history.
const FACTS: {
  label: string;
  value: string;
  href?: string;
  tabular?: boolean;
}[] = [
  { label: "Inhaberin", value: SALON.owner },
  { label: "Für", value: "Damen, Herren und Kinder" },
  {
    label: "Termine",
    value: `telefonisch · ${SALON.phoneDisplay}`,
    href: `tel:${SALON.phoneE164}`,
    tabular: true,
  },
];

export function About() {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotionSafe();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const photoY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section
      id="ueber-anetta"
      ref={ref}
      data-print-hidden
      className="relative overflow-clip bg-background px-6 py-20 sm:px-10 lg:px-[min(10.5vw,152px)] lg:py-[120px]"
    >
      <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,42%)_1fr] lg:gap-24">
        {/* Matted photograph — a framed print, sharp corners */}
        <motion.div
          className="relative mx-auto w-full max-w-[440px]"
          style={reducedMotion ? undefined : { y: photoY }}
        >
          <figure className="border border-foreground/15 bg-surface p-3 sm:p-4">
            <div className="relative aspect-[4/5] overflow-clip">
              <motion.div
                className="absolute inset-0"
                initial={{ scale: reducedMotion ? 1 : 1.12, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 1.4, ease: EASE }}
              >
                <Image
                  src="/images/about-detail.jpg"
                  alt="Stillleben mit Schere und Kamm auf Leinentüchern im warmen Licht"
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover"
                />
              </motion.div>
            </div>
            <figcaption className="flex items-center justify-between gap-4 pt-3 sm:pt-3.5">
              <span className="text-[10.5px] font-semibold uppercase tracking-[0.22em] text-foreground/60">
                Schere &amp; Kamm — das Handwerk
              </span>
              <span aria-hidden className="h-px w-8 shrink-0 bg-accent/60" />
            </figcaption>
          </figure>
        </motion.div>

        {/* Text column */}
        <div className="flex flex-col items-start">
          <Reveal y={16}>
            <p className="text-[12px] font-semibold uppercase tracking-[0.3em] text-accent">
              Über Anetta
            </p>
          </Reveal>

          <TextLineReveal
            as="h2"
            lines={["Zeit für", "gutes Haar."]}
            className="mt-4 font-display font-semibold uppercase leading-[1.08] tracking-[0.06em] [font-stretch:115%] text-foreground text-[clamp(28px,4.6vw,52px)]"
          />

          <Reveal delay={0.15} className="mt-8 max-w-[46ch]">
            <p className="hyphens-auto text-pretty text-[16px] font-medium leading-[1.65] text-foreground/85 sm:text-[17px]">
              {SALON.owner} führt ihr Haarstudio an der Kronsforder Allee —
              einen inhabergeführten Nachbarschaftssalon, in dem sich Damen,
              Herren und Kinder gleichermaßen gut aufgehoben fühlen. Hier
              nimmt man sich Zeit: für ehrliche Beratung, sorgfältiges
              Handwerk und ein Ergebnis, mit dem Sie sich wohlfühlen.
            </p>
            <p className="mt-5 hyphens-auto text-pretty text-[16px] font-medium leading-[1.65] text-foreground/85 sm:text-[17px]">
              Ob klassischer Schnitt, frische Farbe oder die Dauerwelle, die
              sitzt — vereinbaren Sie einfach telefonisch Ihren Termin. Wir
              freuen uns auf Sie!
            </p>
          </Reveal>

          {/* Facts ledger — quiet rows in the rhythm of the Preisliste */}
          <Reveal delay={0.2} className="mt-10 w-full max-w-[440px]">
            <dl className="divide-y divide-foreground/10 border-y border-foreground/10">
              {FACTS.map((fact) => (
                <div
                  key={fact.label}
                  className="flex items-baseline justify-between gap-6 py-3.5"
                >
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
                    {fact.label}
                  </dt>
                  <dd
                    className={`text-right text-[15px] font-medium text-foreground/85 ${
                      fact.tabular ? "tabular-nums" : ""
                    }`}
                  >
                    {fact.href ? (
                      <a
                        href={fact.href}
                        className="transition-colors duration-300 hover:text-accent"
                      >
                        {fact.value}
                      </a>
                    ) : (
                      fact.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
