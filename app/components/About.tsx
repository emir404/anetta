"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { Reveal, TextLineReveal, EASE, useReducedMotionSafe } from "./Reveal";
import { SALON } from "../data/salon";

export function About() {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotionSafe();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const photoY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section
      id="ueber-anetta"
      ref={ref}
      className="relative overflow-clip bg-background px-6 py-20 sm:px-10 lg:px-[min(10.5vw,152px)] lg:py-[120px]"
    >
      <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,44%)] lg:gap-20">
        {/* Text column */}
        <div className="flex flex-col items-start">
          <Reveal y={16}>
            <p className="text-[12px] font-semibold uppercase tracking-[0.3em] text-accent">
              Über Anetta
            </p>
          </Reveal>

          <TextLineReveal
            as="h2"
            lines={["Die freundliche", "Adresse für Ihr Haar."]}
            className="mt-5 font-serif font-medium leading-[1.05] tracking-[-0.01em] text-foreground text-[clamp(38px,5.5vw,60px)]"
          />

          <Reveal delay={0.15} className="mt-9 max-w-[46ch]">
            <p className="text-pretty text-[16px] font-medium leading-[1.65] text-foreground/85 sm:text-[17px]">
              {SALON.owner} führt ihr Haarstudio an der Kronsforder Allee —
              einen inhabergeführten Nachbarschaftssalon, in dem sich Damen,
              Herren und Kinder gleichermaßen gut aufgehoben fühlen. Hier
              nimmt man sich Zeit: für ehrliche Beratung, sorgfältiges
              Handwerk und ein Ergebnis, mit dem Sie sich wohlfühlen.
            </p>
            <p className="mt-5 text-pretty text-[16px] font-medium leading-[1.65] text-foreground/85 sm:text-[17px]">
              Ob klassischer Schnitt, frische Farbe oder die Dauerwelle, die
              sitzt — vereinbaren Sie einfach telefonisch Ihren Termin. Wir
              freuen uns auf Sie!
            </p>
          </Reveal>

          <Reveal delay={0.2} className="mt-10">
            <a
              href={`tel:${SALON.phoneE164}`}
              className="group inline-flex min-h-11 items-center gap-3 text-[13px] font-semibold uppercase tracking-[0.18em] text-foreground transition-colors hover:text-accent"
            >
              {SALON.phoneDisplay}
              <span
                aria-hidden
                className="inline-block transition-transform duration-300 group-hover:translate-x-1.5"
              >
                →
              </span>
            </a>
          </Reveal>
        </div>

        {/* Image + sign plaque */}
        <div className="relative">
          <motion.div
            className="relative aspect-[4/5] w-full max-w-[520px] overflow-clip lg:ml-auto"
            style={reducedMotion ? undefined : { y: photoY }}
          >
            <motion.div
              className="absolute inset-0"
              initial={{ scale: reducedMotion ? 1 : 1.12, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 1.4, ease: EASE }}
            >
              <Image
                src="/images/about-detail.jpg"
                alt="Stillleben mit Schere und Kamm im warmen Licht"
                fill
                sizes="(max-width: 1024px) 100vw, 44vw"
                className="object-cover"
              />
            </motion.div>
          </motion.div>

          {/* The storefront sign, quoted verbatim — framed like a plaque. */}
          <motion.figure
            className="relative -mt-14 mr-auto w-[86%] max-w-[420px] border border-accent/50 bg-surface p-7 shadow-2xl sm:p-8 lg:absolute lg:-left-10 lg:bottom-10 lg:mt-0"
            initial={{
              opacity: 0,
              y: reducedMotion ? 0 : 48,
              scale: reducedMotion ? 1 : 0.97,
            }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ type: "spring", stiffness: 90, damping: 16 }}
          >
            <blockquote className="font-serif italic font-medium leading-[1.25] text-foreground text-[clamp(24px,2.6vw,30px)]">
              „Der freundliche Damen- Herren- und Kinderfriseur“
            </blockquote>
            <figcaption className="mt-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
              Ladenschild · Kronsforder Allee 3a
            </figcaption>
          </motion.figure>
        </div>
      </div>
    </section>
  );
}
