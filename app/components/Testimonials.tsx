"use client";

import { Reveal, Stagger, StaggerItem } from "./Reveal";
import { TESTIMONIALS } from "../data/testimonials";

/**
 * Renders nothing until verified, released quotes exist in
 * app/data/testimonials.ts (sourced via knowledge-base/content/reviews.md —
 * never invented). The layout below is ready for the day they arrive.
 */
export function Testimonials() {
  if (TESTIMONIALS.length === 0) return null;

  return (
    <section
      id="stimmen"
      className="bg-background px-6 py-20 sm:px-10 lg:px-[min(10.5vw,152px)] lg:py-[120px]"
    >
      <Reveal y={16}>
        <p className="text-[12px] font-semibold uppercase tracking-[0.3em] text-accent">
          Stimmen unserer Gäste
        </p>
      </Reveal>

      <Stagger
        className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        stagger={0.12}
      >
        {TESTIMONIALS.map((testimonial) => (
          <StaggerItem key={testimonial.quote} y={28}>
            <figure className="flex h-full flex-col justify-between border border-foreground/10 bg-surface p-8">
              <blockquote className="font-serif italic font-medium leading-[1.35] text-foreground text-[clamp(20px,2vw,24px)]">
                „{testimonial.quote}“
              </blockquote>
              <figcaption className="mt-6 text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
                {testimonial.attribution}
              </figcaption>
            </figure>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
