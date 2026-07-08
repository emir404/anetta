"use client";

import { useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "motion/react";
import { EASE, useReducedMotionSafe } from "./Reveal";
import { SALON } from "../data/salon";

const MotionLink = motion.create(Link);

const NAV_LINKS = [
  { label: "LEISTUNGEN", href: "#leistungen" },
  { label: "ÜBER ANETTA", href: "#ueber-anetta" },
  { label: "ÖFFNUNGSZEITEN", href: "#oeffnungszeiten" },
  { label: "TERMIN", href: "/termin" },
  { label: "KONTAKT", href: "#kontakt" },
];

// Statement hero (DESIGN.md §4.5): the sign's yellow word on blue becomes
// the honeyed italic word in a marine-ink line.
const HEADLINE: ReactNode[] = [
  <>
    Der <em className="font-serif italic font-normal text-accent">freundliche</em>
  </>,
  <>Friseur am</>,
  <>Mühlentor.</>,
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotionSafe();
  const [menuOpen, setMenuOpen] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const statementY = useTransform(scrollYProgress, [0, 1], [0, 110]);
  const statementOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const infoOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-svh flex-col overflow-clip bg-background"
    >
      {/* Nav */}
      <motion.header
        className="relative z-20 flex items-center justify-between px-6 pt-8 sm:px-10 lg:px-[min(10.5vw,152px)] lg:pt-12"
        initial={{ opacity: 0, y: reducedMotion ? 0 : -14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.15, ease: EASE }}
      >
        <a
          href="#"
          className="py-2 text-[13px] font-semibold uppercase tracking-[0.24em] text-foreground"
        >
          Haarstudio&nbsp;Anetta
        </a>

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) =>
            link.href.startsWith("/") ? (
              <Link
                key={link.label}
                href={link.href}
                className="py-2 text-[12px] font-semibold uppercase tracking-[0.18em] text-foreground/80 transition-colors hover:text-accent"
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.label}
                href={link.href}
                className="py-2 text-[12px] font-semibold uppercase tracking-[0.18em] text-foreground/80 transition-colors hover:text-accent"
              >
                {link.label}
              </a>
            ),
          )}
        </nav>

        <motion.a
          href={`tel:${SALON.phoneE164}`}
          className="hidden h-11 items-center justify-center bg-foreground px-6 text-[12px] font-semibold uppercase tracking-[0.18em] text-background lg:flex"
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
            className="block h-[2px] w-6 bg-foreground"
            animate={menuOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
          />
          <motion.span
            className="block h-[2px] w-6 bg-foreground"
            animate={menuOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
          />
        </button>
      </motion.header>

      {/* Mobile menu overlay */}
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
                  "py-2 text-[15px] font-semibold uppercase tracking-[0.2em] text-foreground",
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
              className="mt-4 flex h-12 items-center justify-center bg-foreground px-8 text-[13px] font-semibold uppercase tracking-[0.18em] text-background"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.42, ease: EASE }}
            >
              Termin vereinbaren
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Statement */}
      <div className="relative z-0 flex flex-1 items-center px-6 sm:px-10 lg:px-[min(10.5vw,152px)]">
        <motion.div
          className="w-full max-w-[1180px]"
          style={
            reducedMotion
              ? undefined
              : { y: statementY, opacity: statementOpacity }
          }
        >
          <motion.p
            className="text-[12px] font-semibold uppercase tracking-[0.3em] text-accent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.25, ease: EASE }}
          >
            Friseur in Lübeck · {SALON.locality}
          </motion.p>

          <h1 className="mt-6 font-serif font-medium leading-[0.98] tracking-[-0.01em] text-foreground text-[clamp(52px,10vw,144px)]">
            {HEADLINE.map((line, i) => (
              <span key={i} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
                <motion.span
                  className="block"
                  initial={
                    reducedMotion ? { opacity: 0 } : { y: "112%", opacity: 1 }
                  }
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 1.1,
                    delay: 0.35 + i * 0.14,
                    ease: EASE,
                  }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.div
            aria-hidden
            className="mt-10 h-px w-[min(280px,40vw)] origin-left bg-accent"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.1, delay: 1.05, ease: EASE }}
          />

          <motion.p
            className="mt-8 max-w-[46ch] text-pretty text-[16px] font-medium leading-[1.65] text-foreground/80 sm:text-[17px]"
            initial={{ opacity: 0, y: reducedMotion ? 0 : 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.15, ease: EASE }}
          >
            Willkommen bei {SALON.owner} — persönliche Beratung, ehrliches
            Handwerk und Zeit für Ihr Haar. Für Damen, Herren und Kinder.
          </motion.p>

          <motion.div
            className="mt-9 flex flex-col items-start gap-5 sm:flex-row sm:items-center"
            initial={{ opacity: 0, y: reducedMotion ? 0 : 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.3, ease: EASE }}
          >
            <a
              href={`tel:${SALON.phoneE164}`}
              className="flex h-12 items-center justify-center bg-foreground px-7 text-[13px] font-semibold uppercase tracking-[0.18em] text-background transition-transform duration-200 hover:scale-[1.02]"
            >
              Termin vereinbaren
            </a>
            <a
              href="#leistungen"
              className="group inline-flex min-h-11 items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.18em] text-accent sm:min-h-0"
            >
              Zur Preisliste
              <span
                aria-hidden
                className="inline-block transition-transform duration-300 group-hover:translate-y-1"
              >
                ↓
              </span>
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom info row */}
      <motion.div
        className="relative z-10 flex flex-col gap-2 border-t border-foreground/10 px-6 py-6 text-[12px] font-semibold uppercase tracking-[0.14em] text-foreground/70 sm:flex-row sm:items-center sm:justify-between sm:px-10 lg:px-[min(10.5vw,152px)]"
        style={reducedMotion ? undefined : { opacity: infoOpacity }}
        initial={{ opacity: 0, y: reducedMotion ? 0 : 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.45, ease: EASE }}
      >
        <p className="tabular-nums">Di–Fr 09:00–18:00 · Sa 08:00–13:00</p>
        <p>
          {SALON.street}, {SALON.postalCode} {SALON.city}
        </p>
        <p>Damen · Herren · Kinder</p>
      </motion.div>
    </section>
  );
}
