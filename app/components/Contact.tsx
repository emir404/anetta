"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Reveal, TextLineReveal, EASE, useReducedMotionSafe } from "./Reveal";
import { HOURS, DISPLAY_ORDER, useOpenState } from "../data/openingHours";
import { SALON, MAPS_URL, MAPS_EMBED_URL } from "../data/salon";

/**
 * Kontakt as a split object: a marine Terminkarte beside the map, which
 * bleeds to the viewport edge. Deliberately unlike the sibling templates'
 * stacked contact pattern.
 */
export function Contact() {
  const reducedMotion = useReducedMotionSafe();
  const openState = useOpenState();

  return (
    <section
      id="kontakt"
      data-print-hidden
      className="bg-background px-6 py-20 sm:px-10 lg:px-[min(10.5vw,152px)] lg:py-[140px]"
    >
      <div className="flex flex-wrap items-end justify-between gap-x-16 gap-y-6">
        <TextLineReveal
          as="h2"
          lines={["Kontakt &", "Termin"]}
          className="font-display font-semibold uppercase leading-[1.08] tracking-[0.06em] [font-stretch:115%] text-foreground text-[clamp(28px,4.6vw,52px)]"
        />
        <Reveal delay={0.1}>
          <p className="max-w-[38ch] text-pretty pb-2 text-[15px] font-medium leading-[1.6] text-foreground/75">
            Termine vergeben wir persönlich am Telefon — rufen Sie uns gerne
            zu den Öffnungszeiten an.
          </p>
        </Reveal>
      </div>

      <div className="mt-12 grid lg:mt-16 lg:grid-cols-[minmax(0,46%)_1fr]">
        {/* Terminkarte — the marine plate with the brass hairline frame,
            the storefront sign's grammar as a contact card */}
        <motion.div
          className="border border-accent-bright/25 bg-marine p-8 text-background sm:p-12 lg:p-14"
          initial={{ opacity: 0, y: reducedMotion ? 0 : 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <p className="text-[12px] font-semibold uppercase tracking-[0.3em] text-accent-bright">
            Termin vereinbaren
          </p>

          <a
            href={`tel:${SALON.phoneE164}`}
            className="group mt-5 block w-fit"
          >
            <span className="block whitespace-nowrap font-display font-semibold leading-none tracking-[0.02em] tabular-nums [font-stretch:115%] text-background transition-colors duration-500 group-hover:text-accent-bright text-[clamp(34px,4.4vw,58px)]">
              0451&nbsp;79&nbsp;14&nbsp;67
            </span>
            <span
              aria-hidden
              className="mt-2 block h-[2px] w-full origin-left scale-x-0 bg-accent-bright transition-transform duration-700 ease-out group-hover:scale-x-100"
            />
          </a>

          {openState && (
            <motion.p
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: EASE }}
              className={`mt-6 inline-flex items-center gap-2.5 border px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.14em] ${
                openState.isOpen
                  ? "border-accent-bright/50 text-accent-bright"
                  : "border-background/25 text-background/60"
              }`}
            >
              <span
                aria-hidden
                className={`inline-block h-2 w-2 rounded-full ${
                  openState.isOpen
                    ? "animate-pulse bg-accent-bright"
                    : "bg-background/40"
                }`}
              />
              {openState.isOpen ? "Jetzt geöffnet" : "Derzeit geschlossen"}
            </motion.p>
          )}

          {/* Hours — quiet rows, gold dot marks today */}
          <div id="oeffnungszeiten" className="mt-10 scroll-mt-10">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent-bright">
              Öffnungszeiten
            </h3>
            <div className="mt-4">
              {DISPLAY_ORDER.map((dayIndex) => {
                const { day, time } = HOURS[dayIndex];
                const isToday = openState?.day === dayIndex;
                const isClosed = HOURS[dayIndex].open === null;
                return (
                  <div
                    key={day}
                    className="flex items-baseline justify-between gap-4 border-b border-background/12 py-3"
                  >
                    <span
                      className={`flex items-baseline gap-2.5 text-[14px] font-semibold uppercase tracking-[0.12em] ${
                        isToday ? "text-accent-bright" : "text-background/90"
                      }`}
                    >
                      {isToday && (
                        <span
                          aria-hidden
                          className="inline-block h-1.5 w-1.5 translate-y-[-2px] rounded-full bg-accent-bright"
                        />
                      )}
                      {day}
                      {isToday && <span className="sr-only">(heute)</span>}
                    </span>
                    <span
                      className={`text-[15px] font-medium tabular-nums ${
                        isClosed ? "text-background/55" : "text-background/85"
                      }`}
                    >
                      {time}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Address + links */}
          <div className="mt-10 flex flex-col gap-4">
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-fit text-[15px] font-medium leading-[1.6] text-background/85 underline decoration-background/40 underline-offset-4 transition-colors hover:text-background hover:decoration-background"
            >
              {SALON.street}, {SALON.postalCode} {SALON.city} ·{" "}
              {SALON.locality}
            </a>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex min-h-11 items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.16em] text-accent-bright sm:min-h-0"
              >
                Route planen
                <span
                  aria-hidden
                  className="inline-block transition-transform duration-300 group-hover:translate-x-1.5"
                >
                  →
                </span>
              </a>
              <Link
                href="/termin"
                className="group inline-flex min-h-11 items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.16em] text-background/70 transition-colors hover:text-background sm:min-h-0"
              >
                Alles zur Terminvereinbarung
                <span
                  aria-hidden
                  className="inline-block transition-transform duration-300 group-hover:translate-x-1.5"
                >
                  →
                </span>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Map — bleeds to the right viewport edge */}
        <Reveal
          y={40}
          amount={0.15}
          className="relative min-h-[380px] lg:mr-[calc(min(10.5vw,152px)*-1)]"
        >
          <div className="absolute inset-0 border border-foreground/12 lg:border-r-0">
            <iframe
              src={MAPS_EMBED_URL}
              title="Haarstudio Anetta auf Google Maps – Kronsforder Allee 3a, 23560 Lübeck"
              className="absolute inset-0 h-full w-full border-0 grayscale-[0.35] contrast-[0.95] sepia-[0.08]"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
