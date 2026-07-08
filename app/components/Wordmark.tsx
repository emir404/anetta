"use client";

import { motion } from "motion/react";
import { EASE, useReducedMotionSafe } from "./Reveal";

const NAME = "Anetta";

/**
 * Typographic wordmark: "HAARSTUDIO" as a tracked micro-label above "Anetta"
 * in the Cormorant italic — the storefront sign's script spirit, set in our
 * serif (DESIGN.md §4.7). Colour inherits via `currentColor`.
 */
export function Wordmark({
  className,
  delay = 0.3,
}: {
  className?: string;
  delay?: number;
}) {
  const reducedMotion = useReducedMotionSafe();

  return (
    <div
      className={`flex flex-col items-center ${className ?? ""}`}
      role="img"
      aria-label="Haarstudio Anetta"
    >
      <motion.span
        aria-hidden
        className="block text-[clamp(11px,1.2vw,14px)] font-semibold uppercase tracking-[0.55em] opacity-80 [text-indent:0.55em]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ duration: 0.9, delay, ease: EASE }}
      >
        Haarstudio
      </motion.span>
      <span
        aria-hidden
        className="mt-1 block whitespace-nowrap font-serif italic font-medium leading-[1.1] text-[clamp(56px,14vw,150px)] tracking-[-0.01em]"
      >
        {NAME.split("").map((char, i) => (
          <motion.span
            key={i}
            className="inline-block"
            initial={
              reducedMotion
                ? { opacity: 0 }
                : { opacity: 0, y: "38%", rotate: i % 2 ? 2.5 : -2.5 }
            }
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{
              duration: reducedMotion ? 0.6 : 0.9,
              delay: delay + 0.15 + i * 0.06,
              ease: EASE,
            }}
          >
            {char}
          </motion.span>
        ))}
      </span>
    </div>
  );
}

/** Static one-line brand for headers/footers: HAARSTUDIO ANETTA. */
export function BrandLine({ className }: { className?: string }) {
  return (
    <span
      className={`text-[13px] font-semibold uppercase tracking-[0.24em] ${className ?? ""}`}
    >
      Haarstudio&nbsp;Anetta
    </span>
  );
}
