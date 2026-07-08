"use client";

import { useRef, useState, type ReactNode } from "react";
import Image from "next/image";
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

// Statement hero over the salon itself (DESIGN.md §4.5): the sign's yellow
// word on blue becomes the honeyed italic word in an ivory line.
const HEADLINE: ReactNode[] = [
  <>
    Der{" "}
    <em className="font-serif italic font-normal text-accent-bright">
      freundliche
    </em>
  </>,
  <>Friseur am</>,
  <>Mühlentor.</>,
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
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotionSafe();
  const [menuOpen, setMenuOpen] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const statementY = useTransform(scrollYProgress, [0, 1], [0, 110]);
  const statementOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const photoScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const infoOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-svh flex-col overflow-clip bg-marine"
    >
      {/* The salon itself, behind everything */}
      <motion.div
        className="absolute inset-0"
        style={reducedMotion ? undefined : { scale: photoScale }}
        initial={reducedMotion ? { opacity: 0 } : { scale: 1.06, opacity: 0 }}
        animate={reducedMotion ? { opacity: 1 } : { scale: 1, opacity: 1 }}
        transition={{ duration: 1.6, ease: EASE }}
      >
        <Image
          src="/images/hero.jpg"
          alt="Vintage-Salonstuhl vor rundem Messingspiegel im warmen Abendlicht"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-marine/75" />
      </motion.div>

      {/* Nav */}
      <motion.header
        className="relative z-20 flex items-center justify-between px-6 pt-8 sm:px-10 lg:px-[min(10.5vw,152px)] lg:pt-12"
        initial={{ opacity: 0, y: reducedMotion ? 0 : -14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.15, ease: EASE }}
      >
        <a
          href="#"
          className="py-2 text-[13px] font-semibold uppercase tracking-[0.24em] text-background"
        >
          Haarstudio&nbsp;Anetta
        </a>

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) =>
            link.href.startsWith("/") ? (
              <Link
                key={link.label}
                href={link.href}
                className="py-2 text-[12px] font-semibold uppercase tracking-[0.18em] text-background/85 transition-colors hover:text-accent-bright"
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.label}
                href={link.href}
                className="py-2 text-[12px] font-semibold uppercase tracking-[0.18em] text-background/85 transition-colors hover:text-accent-bright"
              >
                {link.label}
              </a>
            ),
          )}
        </nav>

        <motion.a
          href={`tel:${SALON.phoneE164}`}
          className="hidden h-11 items-center justify-center bg-background px-6 text-[12px] font-semibold uppercase tracking-[0.18em] text-marine lg:flex"
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
            className="text-[12px] font-semibold uppercase tracking-[0.3em] text-accent-bright"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.25, ease: EASE }}
          >
            Friseur in Lübeck · {SALON.locality}
          </motion.p>

          <h1 className="mt-6 font-serif font-medium leading-[0.98] tracking-[-0.01em] text-background text-[clamp(52px,10vw,144px)]">
            {HEADLINE.map((line, i) => (
              <span
                key={i}
                className="block overflow-hidden pb-[0.08em] -mb-[0.08em]"
              >
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

          {/* The snip: scissors open the gold line */}
          <div className="mt-10 flex items-center gap-3 text-accent-bright" aria-hidden>
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
                  ? { duration: 0.6, delay: 1.0 }
                  : { duration: 0.55, delay: 1.0, ease: EASE }
              }
            >
              <ScissorsGlyph className="h-5 w-11" />
            </motion.span>
            <motion.span
              className="block h-px w-[min(280px,32vw)] origin-left bg-current"
              initial={{ scaleX: reducedMotion ? 1 : 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 1.3, delay: 1.2, ease: EASE }}
            />
          </div>

          <motion.p
            className="mt-8 max-w-[46ch] text-pretty text-[16px] font-medium leading-[1.65] text-background/85 sm:text-[17px]"
            initial={{ opacity: 0, y: reducedMotion ? 0 : 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.15, ease: EASE }}
          >
            Schnitt, Farbe und Dauerwelle — mit Zeit, Ruhe und ehrlichem
            Handwerk. Willkommen bei {SALON.owner}, für Damen, Herren und
            Kinder.
          </motion.p>

          <motion.div
            className="mt-9 flex flex-col items-start gap-5 sm:flex-row sm:items-center"
            initial={{ opacity: 0, y: reducedMotion ? 0 : 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.3, ease: EASE }}
          >
            <a
              href={`tel:${SALON.phoneE164}`}
              className="flex h-12 items-center justify-center bg-background px-7 text-[13px] font-semibold uppercase tracking-[0.18em] text-marine transition-transform duration-200 hover:scale-[1.02]"
            >
              Termin vereinbaren
            </a>
            <a
              href="#leistungen"
              className="group inline-flex min-h-11 items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.18em] text-accent-bright sm:min-h-0"
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
        className="relative z-10 flex flex-col gap-2 border-t border-background/20 px-6 py-6 text-[12px] font-semibold uppercase tracking-[0.14em] text-background/85 sm:flex-row sm:items-center sm:justify-between sm:px-10 lg:px-[min(10.5vw,152px)]"
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
