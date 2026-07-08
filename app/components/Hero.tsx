"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { EASE, useReducedMotionSafe } from "./Reveal";
import { SALON, MAPS_URL } from "../data/salon";

const MotionLink = motion.create(Link);

const NAV_LINKS = [
  { label: "LEISTUNGEN", href: "#leistungen" },
  { label: "ÜBER ANETTA", href: "#ueber-anetta" },
  { label: "ÖFFNUNGSZEITEN", href: "#oeffnungszeiten" },
  { label: "TERMIN", href: "/termin" },
  { label: "KONTAKT", href: "#kontakt" },
];

// Masthead hero (DESIGN.md §4.5, v4): the sign itself — the client's script
// wordmark on its royal-blue panel, hours/address as the panel's bottom
// board — then the four working worlds of the salon as a still-life rail on
// white. Alt-Texte neutral-ehrlich — Stimmungsbilder, kein Portfolio-Anspruch.
const SERVICE_CARDS = [
  {
    label: "Damen",
    image: "/images/service-damen.jpg",
    alt: "Runde Holzbürste, Kamm und goldene Haarclips auf blauem Frottee",
  },
  {
    label: "Herren",
    image: "/images/service-herren.jpg",
    alt: "Schere, Kamm und Haarschneidemaschine auf blauem Frottee",
  },
  {
    label: "Kinder",
    image: "/images/service-kinder.jpg",
    alt: "Kleiner Hocker mit blauem Kinderumhang, Bürste und bunten Haarclips",
  },
  {
    label: "Farbe & Strähnen",
    image: "/images/service-farbe.jpg",
    alt: "Blaue Färbeschale mit Pinsel, Alufolie und braunen Glasflaschen",
  },
];

/** Minimal line-art scissors — the vertical's one pictographic device. */
function ScissorsGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 44 20"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      aria-hidden
    >
      <circle cx="6" cy="5" r="3.4" />
      <circle cx="6" cy="15" r="3.4" />
      <path d="M9.2 6.2 40 14.4" />
      <path d="M9.2 13.8 40 5.6" />
      <circle cx="21" cy="10" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Hero() {
  const reducedMotion = useReducedMotionSafe();
  const [menuOpen, setMenuOpen] = useState(false);

  const rise = (delay: number) => ({
    initial: { opacity: 0, y: reducedMotion ? 0 : 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay, ease: EASE },
  });

  return (
    <section
      data-print-hidden
      className="relative flex min-h-svh flex-col overflow-clip bg-background"
    >
      {/* Mobile menu overlay — covers the whole hero */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-7 bg-background/95 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            {NAV_LINKS.map((link, i) => {
              const variantProps = {
                onClick: () => setMenuOpen(false),
                className:
                  "flex min-h-11 items-center py-2 text-[15px] font-semibold uppercase tracking-[0.2em] text-foreground",
                initial: { opacity: 0, y: 16 },
                animate: { opacity: 1, y: 0 },
                transition: {
                  duration: 0.5,
                  delay: 0.1 + i * 0.06,
                  ease: EASE,
                },
              } as const;
              return link.href.startsWith("/") ? (
                <MotionLink key={link.label} href={link.href} {...variantProps}>
                  {link.label}
                </MotionLink>
              ) : (
                <motion.a key={link.label} href={link.href} {...variantProps}>
                  {link.label}
                </motion.a>
              );
            })}
            <motion.a
              href={`tel:${SALON.phoneE164}`}
              onClick={() => setMenuOpen(false)}
              className="mt-4 flex h-12 items-center justify-center bg-yellow px-8 text-[13px] font-semibold uppercase tracking-[0.18em] text-blue"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.42, ease: EASE }}
            >
              Termin vereinbaren
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* The sign: royal-blue panel carrying the script wordmark */}
      <div className="relative bg-blue">
        {/* Corner controls */}
        <motion.div
          className="absolute right-6 top-6 z-20 sm:right-10 lg:right-[min(10.5vw,152px)] lg:top-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2, ease: EASE }}
        >
          <motion.a
            href={`tel:${SALON.phoneE164}`}
            className="hidden h-11 items-center justify-center bg-yellow px-6 text-[12px] font-semibold uppercase tracking-[0.18em] text-blue lg:flex"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            Termin vereinbaren
          </motion.a>

          {/* Mobile hamburger */}
          <button
            type="button"
            aria-label={menuOpen ? "Menü schließen" : "Menü öffnen"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 lg:hidden"
          >
            <motion.span
              className={`block h-[2px] w-6 ${menuOpen ? "bg-foreground" : "bg-background"}`}
              animate={menuOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
            />
            <motion.span
              className={`block h-[2px] w-6 ${menuOpen ? "bg-foreground" : "bg-background"}`}
              animate={menuOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
            />
          </button>
        </motion.div>

        {/* Masthead: the wordmark as it hangs over the door */}
        <header className="flex flex-col items-center px-6 pb-[clamp(40px,6svh,64px)] pt-[clamp(88px,13svh,124px)] text-center sm:px-10 lg:pt-[clamp(56px,8svh,96px)]">
          <h1 className="flex flex-col items-center">
            <span className="sr-only">Haarstudio Anetta</span>
            <motion.span
              aria-hidden
              {...rise(0.15)}
              className="block text-[12px] font-semibold uppercase tracking-[0.55em] text-background/75 [text-indent:0.55em] sm:text-[13px]"
            >
              Haarstudio
            </motion.span>
            <motion.span aria-hidden className="mt-6 block" {...rise(0.3)}>
              <Image
                src="/logo/anetta-wordmark.png"
                alt=""
                width={1400}
                height={640}
                preload
                className="h-auto w-[min(78vw,540px)]"
              />
            </motion.span>
          </h1>

          <motion.p
            {...rise(0.55)}
            className="mt-7 text-[11px] font-semibold uppercase tracking-[0.3em] text-yellow sm:text-[12px]"
          >
            Friseur in Lübeck · {SALON.locality}
          </motion.p>

          <motion.nav
            {...rise(0.65)}
            className="mt-5 hidden items-center gap-8 lg:flex"
          >
            {NAV_LINKS.map((link) =>
              link.href.startsWith("/") ? (
                <Link
                  key={link.label}
                  href={link.href}
                  className="py-2 text-[12px] font-semibold uppercase tracking-[0.18em] text-background/85 transition-colors hover:text-yellow"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  className="py-2 text-[12px] font-semibold uppercase tracking-[0.18em] text-background/85 transition-colors hover:text-yellow"
                >
                  {link.label}
                </a>
              ),
            )}
          </motion.nav>

          {/* The snip: scissors open the yellow line */}
          <div
            className="mt-6 flex items-center gap-3 text-yellow lg:mt-5"
            aria-hidden
          >
            <motion.span
              className="shrink-0"
              initial={{ opacity: 0 }}
              animate={
                reducedMotion
                  ? { opacity: 1 }
                  : { opacity: 1, rotate: [0, -7, 5, 0] }
              }
              transition={
                reducedMotion
                  ? { duration: 0.6, delay: 0.8 }
                  : { duration: 0.55, delay: 0.8, ease: EASE }
              }
            >
              <ScissorsGlyph className="h-4 w-9" />
            </motion.span>
            <motion.span
              className="block h-px w-[min(180px,24vw)] origin-left bg-current"
              initial={{ scaleX: reducedMotion ? 1 : 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 1.3, delay: 0.95, ease: EASE }}
            />
          </div>
        </header>

        {/* Bottom board of the sign: hours · address · groups */}
        <motion.div
          className="flex flex-col gap-2 border-t border-background/20 px-6 py-6 text-[12px] font-semibold uppercase tracking-[0.14em] text-background/85 sm:flex-row sm:items-center sm:justify-between sm:px-10 lg:px-[min(10.5vw,152px)]"
          initial={{ opacity: 0, y: reducedMotion ? 0 : 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.15, ease: EASE }}
        >
          <p className="tabular-nums">Di–Fr 09:00–18:00 · Sa 08:00–13:00</p>
          <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-fit underline decoration-background/40 underline-offset-4 transition-colors hover:text-background hover:decoration-background"
          >
            {SALON.street}, {SALON.postalCode} {SALON.city}
          </a>
          <p>Damen · Herren · Kinder</p>
        </motion.div>
      </div>

      {/* Service rail on white — four still lifes, doors into die Preisliste */}
      <div className="relative flex flex-1 items-center px-6 py-8 sm:px-10 lg:px-[min(10.5vw,152px)] lg:py-10">
        <div className="grid w-full grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-6">
          {SERVICE_CARDS.map((card, i) => (
            <motion.a
              key={card.label}
              href="#leistungen"
              className="group relative block aspect-[2/3] overflow-clip"
              initial={{ opacity: 0, y: reducedMotion ? 0 : 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7 + i * 0.09, ease: EASE }}
            >
              <motion.div
                className="absolute inset-0"
                initial={{ scale: reducedMotion ? 1 : 1.12 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.5, delay: 0.7 + i * 0.09, ease: EASE }}
              >
                {/* Four rail images = multiple LCP candidates → eager, not
                    preload (next/image docs, v16 preload guidance). */}
                <Image
                  src={card.image}
                  alt={card.alt}
                  fill
                  loading="eager"
                  sizes="(max-width: 1024px) 50vw, 22vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
              </motion.div>
              <div
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-blue/80 to-transparent"
              />
              <span className="absolute inset-x-2 bottom-4 text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-background transition-colors duration-300 group-hover:text-yellow sm:bottom-5 sm:text-[12px]">
                {card.label}
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
