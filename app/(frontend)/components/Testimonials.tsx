"use client";

import { Reveal, Stagger, StaggerItem } from "./Reveal";
import { TESTIMONIALS } from "../data/testimonials";

/**
 * Renders nothing until verified, released quotes exist in
 * app/data/testimonials.ts (sourced via knowledge-base/content/reviews.md —
 * never invented). The layout below is ready for the day they arrive.
 */
type TestimonialsProps = {
  testimonials?: { quote: string; attribution: string }[];
};

export function Testimonials({ testimonials = TESTIMONIALS }: TestimonialsProps = {}) {
  if (testimonials.length === 0) return null;

  return (
    <section
      id="stimmen"
      data-print-hidden
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
        {testimonials.map((testimonial) => (
          <StaggerItem key={testimonial.quote} y={28}>
            <figure className="flex h-full flex-col justify-between border border-foreground/10 bg-surface p-8">
              <blockquote className="text-pretty text-[16.5px] font-medium leading-[1.6] text-foreground/90">
                „{testimonial.quote}“
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
                <span aria-hidden className="h-px w-6 bg-accent/60" />
                {testimonial.attribution}
              </figcaption>
            </figure>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
