"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import { useReducedMotionSafe } from "./Reveal";
import { HOURS_SUMMARY } from "../data/openingHours";
import { SALON, MAPS_URL } from "../data/salon";

// Trailing NBSP: a plain trailing space collapses at the span boundary and
// the loop copies would butt together ("Lübeck ·Damen").
const MARQUEE_TEXT = "Damen · Herren · Kinder · Am Mühlentor · Lübeck · ";

function wrap(min: number, max: number, v: number): number {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
}

function VelocityMarquee() {
  const reducedMotion = useReducedMotionSafe();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 4], {
    clamp: false,
  });
  const direction = useRef(1);

  useAnimationFrame((_, delta) => {
    if (reducedMotion) return;
    let moveBy = direction.current * -1.2 * (delta / 1000);
    if (velocityFactor.get() < 0) direction.current = -1;
    else if (velocityFactor.get() > 0) direction.current = 1;
    moveBy += moveBy * Math.abs(velocityFactor.get());
    baseX.set(baseX.get() + moveBy);
  });

  const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`);

  return (
    <div className="border-y border-foreground/10 py-5 sm:py-7">
      <p className="sr-only">
        Friseur für Damen, Herren und Kinder am Mühlentor in Lübeck.
      </p>
      <div aria-hidden className="overflow-hidden whitespace-nowrap">
        <motion.div className="flex w-max whitespace-nowrap" style={{ x }}>
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className="shrink-0 font-display font-semibold uppercase leading-none tracking-[0.08em] [font-stretch:115%] text-foreground text-[clamp(22px,3.6vw,42px)]"
            >
              {MARQUEE_TEXT}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

function FooterLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent-bright">
      {children}
    </p>
  );
}

export function Footer({ curtain = true }: { curtain?: boolean }) {
  const footerRef = useRef<HTMLElement>(null);

  // The curtain reveal only works when the whole footer fits in the viewport;
  // otherwise its top (contact/legal links) would be unreachable.
  const [fitsViewport, setFitsViewport] = useState(true);

  useEffect(() => {
    const check = () => {
      setFitsViewport(
        (footerRef.current?.offsetHeight ?? 0) <= window.innerHeight,
      );
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const sticky = curtain && fitsViewport;

  return (
    <>
      {/* Marquee strip — stays in the ivory page flow above the footer curtain */}
      {curtain && (
        <div data-print-hidden className="relative z-10 bg-background">
          <VelocityMarquee />
        </div>
      )}

      <footer
        ref={footerRef}
        className={`bg-marine text-background ${
          sticky ? "sticky bottom-0 z-0 motion-reduce:static" : ""
        }`}
      >
        <div className="px-6 py-12 sm:px-10 lg:px-[min(10.5vw,152px)] lg:py-16">
          <div className="grid gap-10 sm:grid-cols-2 sm:gap-x-12 lg:grid-cols-[1.5fr_1fr_1fr] lg:gap-x-16">
            {/* Brand */}
            <div>
              <p
                role="img"
                aria-label="Haarstudio Anetta"
                className="flex flex-col"
              >
                <span
                  aria-hidden
                  className="text-[11px] font-semibold uppercase tracking-[0.5em] text-background/70 [text-indent:0.5em]"
                >
                  Haarstudio
                </span>
                <span
                  aria-hidden
                  className="font-display font-semibold uppercase leading-[1.15] tracking-[0.06em] [font-stretch:115%] text-background text-[34px]"
                >
                  Anetta
                </span>
              </p>
              <p className="mt-5 max-w-[36ch] text-[14px] font-medium leading-[1.6] text-background/70">
                Der freundliche Damen-, Herren- und Kinderfriseur
                <br />
                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-background/40 underline-offset-4 transition-opacity hover:opacity-60"
                >
                  {SALON.street}, {SALON.postalCode} {SALON.city} ·{" "}
                  {SALON.locality}
                </a>
              </p>
            </div>

            {/* Kontakt */}
            <div>
              <FooterLabel>Kontakt</FooterLabel>
              <div className="mt-4 flex flex-col gap-1 text-[15px] font-semibold">
                <a
                  href={`tel:${SALON.phoneE164}`}
                  className="min-h-11 py-1.5 tabular-nums transition-opacity hover:opacity-60 sm:min-h-0 sm:py-0.5"
                >
                  {SALON.phoneDisplay}
                </a>
                <p className="text-[13.5px] font-medium text-background/60">
                  Termine vereinbaren Sie telefonisch.
                </p>
              </div>
              <a
                href={`tel:${SALON.phoneE164}`}
                className="mt-5 inline-flex h-11 items-center justify-center bg-background px-6 text-[12px] font-semibold uppercase tracking-[0.18em] text-marine transition-transform duration-200 hover:scale-[1.03]"
              >
                Termin vereinbaren
              </a>
            </div>

            {/* Öffnungszeiten */}
            <div>
              <FooterLabel>Öffnungszeiten</FooterLabel>
              <dl className="mt-4 flex flex-col gap-2.5 text-[14px]">
                {HOURS_SUMMARY.map((row) => (
                  <div key={row.days} className="flex flex-col">
                    <dt className="font-semibold text-background">
                      {row.days}
                    </dt>
                    <dd className="font-medium tabular-nums text-background/70">
                      {row.time}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-12 flex flex-col gap-4 border-t border-background/20 pt-6 sm:flex-row sm:items-center sm:justify-between lg:mt-16">
            <p className="text-[13px] font-semibold tabular-nums text-background/60">
              © {new Date().getFullYear()} Haarstudio Anetta · Lübeck
            </p>
            <div className="flex items-center gap-6 text-[13px] font-semibold">
              <Link
                href="/impressum"
                className="min-h-11 py-2 transition-opacity hover:opacity-60 sm:min-h-0 sm:py-0"
              >
                Impressum
              </Link>
              <Link
                href="/datenschutz"
                className="min-h-11 py-2 transition-opacity hover:opacity-60 sm:min-h-0 sm:py-0"
              >
                Datenschutz
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
