"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import {
  Reveal,
  Stagger,
  StaggerItem,
  TextLineReveal,
  useReducedMotionSafe,
} from "./Reveal";
import { SALON, MAPS_URL } from "../data/salon";

const INFO: { label: string; lines: [string, string]; href?: string }[] = [
  {
    label: "Lage",
    lines: [SALON.street, `${SALON.postalCode} ${SALON.city} · ${SALON.locality}`],
    href: MAPS_URL,
  },
  {
    label: "Für alle",
    lines: ["Damen, Herren", "und Kinder"],
  },
  {
    label: "Termine",
    lines: ["telefonisch unter", SALON.phoneDisplay],
  },
];

/** Timetable cell index — same quiet numbering voice as the Preisliste. */
function CellIndex({ n }: { n: number }) {
  return (
    <span
      aria-hidden
      className="text-[11px] font-semibold tabular-nums tracking-[0.08em] text-accent/70"
    >
      {String(n).padStart(2, "0")}
    </span>
  );
}

export function Salon() {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotionSafe();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const photoLargeY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const photoSmallY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const ghostY = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <section
      id="salon"
      ref={ref}
      data-print-hidden
      className="relative overflow-clip bg-background px-6 py-20 sm:px-10 lg:px-[min(10.5vw,152px)] lg:py-[130px]"
    >
      {/* Ghost place-name — sign blue at whisper strength on white */}
      <motion.p
        aria-hidden
        className="pointer-events-none absolute -left-[3vw] bottom-2 select-none font-display font-semibold leading-none tracking-[-0.01em] text-transparent text-[clamp(110px,20vw,300px)]"
        style={{
          WebkitTextStroke: "1.5px rgba(19,71,146,0.10)",
          y: reducedMotion ? 0 : ghostY,
        }}
      >
        Lübeck
      </motion.p>

      <div className="relative grid gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,46%)] lg:gap-20">
        {/* Text column */}
        <div className="flex flex-col items-start">
          <Reveal y={16}>
            <p className="text-[12px] font-semibold uppercase tracking-[0.3em] text-accent">
              Der Salon
            </p>
          </Reveal>

          <TextLineReveal
            as="h2"
            lines={["Am Mühlentor,", "mitten in", "Lübeck."]}
            className="mt-4 font-display font-semibold leading-[1.06] tracking-[-0.01em] text-foreground text-[clamp(28px,4.6vw,52px)]"
          />

          <Reveal delay={0.15} className="mt-8 max-w-[46ch]">
            <p className="hyphens-auto text-pretty text-[16px] font-medium leading-[1.65] text-foreground/80 sm:text-[17px]">
              Dort, wo die Lübecker Altstadt in die Kronsforder Allee
              übergeht, liegt das Haarstudio Anetta — mit dem Mühlentor vor
              der Tür und dem Viertel im Herzen.
            </p>
            <p className="mt-5 hyphens-auto text-pretty text-[16px] font-medium leading-[1.65] text-foreground/80 sm:text-[17px]">
              Ein Salon zum Wohlfühlen: herzlich, persönlich und
              unkompliziert. Alle Generationen sind willkommen — von der
              ersten Ponyfrisur bis zur Dauerwelle.
            </p>
          </Reveal>

          <Reveal delay={0.2} className="mt-10">
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex min-h-11 items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.18em] text-accent"
            >
              Route planen
              <span
                aria-hidden
                className="inline-block transition-transform duration-300 group-hover:translate-x-1.5"
              >
                →
              </span>
            </a>
          </Reveal>
        </div>

        {/* Image pair */}
        <div className="relative">
          <motion.div
            className="relative aspect-[4/5] w-full max-w-[520px] overflow-clip lg:ml-auto"
            style={reducedMotion ? undefined : { y: photoLargeY }}
          >
            <motion.div
              className="absolute inset-0"
              initial={{ scale: reducedMotion ? 1 : 1.12, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 1.4 }}
            >
              <Image
                src="/images/salon-1.jpg"
                alt="Salonstuhl mit blauem Umhang vor dem Spiegel im hellen Tageslicht"
                fill
                sizes="(max-width: 1024px) 100vw, 46vw"
                className="object-cover"
              />
            </motion.div>
          </motion.div>

          {/* Knockout frame in the ground color separates the overlap —
              flat v3 geometry, no shadow (§4.3: shadows only on the
              floating map card). */}
          <motion.div
            className="relative -mt-14 mr-auto aspect-[3/2] w-[74%] max-w-[420px] overflow-clip border-[6px] border-background lg:absolute lg:-left-20 lg:bottom-8 lg:mt-0 lg:w-[62%]"
            style={reducedMotion ? undefined : { y: photoSmallY }}
          >
            <motion.div
              className="absolute inset-0"
              initial={{ scale: reducedMotion ? 1 : 1.12, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 1.4, delay: 0.15 }}
            >
              <Image
                src="/images/salon-2.jpg"
                alt="Gestapelte blaue Handtücher, Retro-Haartrockner und gelber Kamm auf einer Ablage"
                fill
                sizes="(max-width: 1024px) 74vw, 30vw"
                className="object-cover"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Timetable-style info strip */}
      <Stagger
        className="relative mt-16 grid divide-y divide-foreground/15 border-y border-foreground/15 sm:grid-cols-3 sm:divide-x sm:divide-y-0 lg:mt-20"
        stagger={0.12}
      >
        {INFO.map((item, i) => (
          <StaggerItem key={item.label} y={18} className="px-1 py-7 sm:px-8">
            <p className="flex items-baseline gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
              <CellIndex n={i + 1} />
              {item.label}
            </p>
            {item.href ? (
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 block w-fit text-[14.5px] font-medium leading-[1.55] text-foreground/85 tabular-nums underline decoration-foreground/30 underline-offset-4 transition-colors hover:text-foreground hover:decoration-foreground"
              >
                {item.lines[0]}
                <br />
                {item.lines[1]}
              </a>
            ) : (
              <p className="mt-3 text-[14.5px] font-medium leading-[1.55] text-foreground/85 tabular-nums">
                {item.lines[0]}
                <br />
                {item.lines[1]}
              </p>
            )}
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
