"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { Reveal, TextLineReveal, EASE, useReducedMotionSafe } from "./Reveal";
import { Footer } from "./Footer";
import { HOURS, DISPLAY_ORDER, useOpenState } from "../data/openingHours";
import { SALON, MAPS_URL, MAPS_EMBED_URL } from "../data/salon";

export function Termin() {
  const reducedMotion = useReducedMotionSafe();
  const openState = useOpenState();

  return (
    <div className="flex min-h-svh flex-col bg-background">
      {/* Header */}
      <header className="flex items-center justify-between px-6 pt-8 sm:px-10 lg:px-[min(10.5vw,152px)] lg:pt-14">
        <Link
          href="/"
          className="py-2 text-[13px] font-semibold uppercase tracking-[0.24em] text-foreground"
        >
          Haarstudio&nbsp;Anetta
        </Link>
        <Link
          href="/"
          className="py-2 text-[13px] font-semibold tracking-[-0.13px] text-foreground/70 transition-opacity hover:opacity-70"
        >
          ← Zurück zur Startseite
        </Link>
      </header>

      <main className="flex-1">
        {/* Intro + phone CTA */}
        <section className="px-6 pt-16 sm:px-10 lg:px-[min(10.5vw,152px)] lg:pt-24">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,42%)] lg:gap-20">
            <div className="flex flex-col items-start">
              <Reveal y={16}>
                <p className="text-[12px] font-semibold uppercase tracking-[0.3em] text-accent">
                  Terminvereinbarung
                </p>
              </Reveal>
              <TextLineReveal
                as="h1"
                lines={["Termin", "vereinbaren"]}
                className="mt-3 font-serif font-medium leading-[1.02] tracking-[-0.01em] text-foreground text-[clamp(44px,7vw,84px)]"
              />

              <Reveal delay={0.15} className="mt-8 max-w-[460px]">
                <p className="text-pretty text-[16px] font-medium leading-[1.65] text-foreground/85">
                  Termine vergeben wir persönlich am Telefon — so finden wir
                  gemeinsam den Zeitpunkt, der Ihnen passt, und nehmen uns
                  die Zeit, die Ihr Haar braucht. Rufen Sie uns gerne zu den
                  Öffnungszeiten an. Wir freuen uns auf Sie!
                </p>
              </Reveal>

              {/* Giant phone CTA */}
              <div className="mt-12 w-full">
                <Reveal y={20}>
                  <p className="text-[12px] font-semibold uppercase tracking-[0.26em] text-foreground/70">
                    Rufen Sie uns an
                  </p>
                </Reveal>
                <motion.span
                  className="mt-3 block overflow-hidden"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.4 }}
                >
                  <motion.a
                    href={`tel:${SALON.phoneE164}`}
                    className="group block w-fit max-w-full"
                    variants={{
                      hidden: reducedMotion ? { opacity: 0 } : { y: "105%" },
                      visible: {
                        y: 0,
                        opacity: 1,
                        transition: { duration: 1.1, delay: 0.1, ease: EASE },
                      },
                    }}
                  >
                    <span className="block whitespace-nowrap font-serif font-medium leading-[1.02] tabular-nums text-foreground transition-colors duration-500 group-hover:text-accent text-[clamp(40px,7vw,96px)]">
                      0451&nbsp;79&nbsp;14&nbsp;67
                    </span>
                    <span
                      aria-hidden
                      className="mt-2 block h-[2px] w-full origin-left scale-x-0 bg-accent transition-transform duration-700 ease-out group-hover:scale-x-100"
                    />
                  </motion.a>
                </motion.span>

                <Reveal delay={0.15} className="mt-6">
                  <p className="text-[14px] font-medium text-foreground/70">
                    {SALON.street}, {SALON.postalCode} {SALON.city} ·{" "}
                    {SALON.locality}
                  </p>
                </Reveal>
              </div>
            </div>

            {/* Photo */}
            <div className="relative">
              <motion.div
                className="relative aspect-[593/720] w-full overflow-clip lg:ml-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                <motion.div
                  className="absolute inset-0"
                  initial={{ scale: reducedMotion ? 1 : 1.12, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 1.4, ease: EASE }}
                >
                  <Image
                    src="/images/salon-1.jpg"
                    alt="Salonstuhl vor dem Spiegel im warmen Abendlicht"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="object-cover"
                  />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Öffnungszeiten */}
        <section className="px-6 py-20 sm:px-10 lg:px-[min(10.5vw,152px)] lg:py-28">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Reveal>
              <h2 className="text-[18px] font-semibold uppercase tracking-[0.14em] text-foreground">
                Öffnungszeiten
              </h2>
            </Reveal>
            {openState && (
              <motion.p
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: EASE }}
                className={`flex items-center gap-2.5 border px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.14em] ${
                  openState.isOpen
                    ? "border-accent/50 text-accent"
                    : "border-foreground/20 text-foreground/50"
                }`}
              >
                <span
                  aria-hidden
                  className={`inline-block h-2 w-2 rounded-full ${
                    openState.isOpen
                      ? "animate-pulse bg-accent"
                      : "bg-foreground/40"
                  }`}
                />
                {openState.isOpen ? "Jetzt geöffnet" : "Derzeit geschlossen"}
              </motion.p>
            )}
          </div>

          <div className="mt-8 [perspective:900px]">
            {DISPLAY_ORDER.map((dayIndex, i) => {
              const { day, time } = HOURS[dayIndex];
              const isToday = openState?.day === dayIndex;
              const isClosed = HOURS[dayIndex].open === null;
              return (
                <motion.div
                  key={day}
                  initial={
                    reducedMotion
                      ? { opacity: 0 }
                      : { opacity: 0, rotateX: -70, y: 24 }
                  }
                  whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.7, delay: i * 0.07, ease: EASE }}
                  className={`relative flex items-baseline justify-between gap-4 border-b border-foreground/10 px-4 py-4 [transform-origin:top] sm:px-6 ${
                    isToday ? "bg-surface" : ""
                  }`}
                >
                  {isToday && (
                    <motion.span
                      aria-hidden
                      className="absolute bottom-0 left-0 top-0 w-1 bg-accent"
                      initial={{ scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.5, ease: EASE }}
                    />
                  )}
                  <span className="flex items-baseline gap-3 text-[15px] font-semibold uppercase tracking-[0.12em] text-foreground">
                    {day}
                    {isToday && (
                      <span className="text-[11px] font-semibold tracking-[0.16em] text-accent">
                        Heute
                      </span>
                    )}
                  </span>
                  <span
                    className={`text-[16px] font-medium tabular-nums tracking-[0.04em] ${
                      isClosed ? "text-foreground/65" : "text-foreground/90"
                    }`}
                  >
                    {time}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Map */}
        <section className="px-6 pb-24 sm:px-10 lg:px-[min(10.5vw,152px)] lg:pb-32">
          <div className="relative">
            <Reveal y={60} amount={0.15}>
              <div className="relative aspect-[4/3] w-full overflow-clip sm:aspect-[16/9] lg:aspect-[21/9]">
                <iframe
                  src={MAPS_EMBED_URL}
                  title="Haarstudio Anetta auf Google Maps – Kronsforder Allee 3a, 23560 Lübeck"
                  className="absolute inset-0 h-full w-full border-0 grayscale-[0.35] contrast-[0.95]"
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </Reveal>

            <motion.div
              className="relative -mt-8 ml-4 mr-4 border-l-4 border-accent bg-surface p-6 shadow-2xl sm:absolute sm:bottom-8 sm:left-8 sm:ml-0 sm:mr-0 sm:mt-0 sm:max-w-[360px]"
              initial={{
                opacity: 0,
                y: reducedMotion ? 0 : 60,
                x: reducedMotion ? 0 : -24,
              }}
              whileInView={{ opacity: 1, y: 0, x: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ type: "spring", stiffness: 90, damping: 16, delay: 0.2 }}
            >
              <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-foreground">
                Haarstudio Anetta
              </p>
              <p className="mt-2 text-[15px] font-medium leading-[1.6] text-foreground/80">
                {SALON.street}
                <br />
                {SALON.postalCode} {SALON.city} · {SALON.locality}
              </p>
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-4 inline-flex min-h-11 items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.16em] text-accent sm:min-h-0"
              >
                Route planen
                <span
                  aria-hidden
                  className="inline-block transition-transform duration-300 group-hover:translate-x-1.5"
                >
                  →
                </span>
              </a>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer curtain={false} />
    </div>
  );
}
