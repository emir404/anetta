"use client";

import { Reveal, Stagger, StaggerItem, TextLineReveal } from "./Reveal";
import { SALON } from "../data/salon";
import {
  PRICE_MODE,
  PRICE_FOOTNOTE,
  SERVICE_CATEGORIES,
  formatPrice,
  type ServiceCategory,
} from "../data/services";

function CategoryBlock({ category }: { category: ServiceCategory }) {
  return (
    <div className="break-inside-avoid pt-10 first:pt-0">
      <div className="flex items-baseline gap-4">
        <span aria-hidden className="h-px w-7 translate-y-[-0.35em] bg-accent" />
        <h3 className="font-serif font-medium leading-none text-[clamp(24px,2.6vw,29px)] text-foreground">
          {category.name}
        </h3>
      </div>
      <dl className="mt-3 divide-y divide-foreground/8">
        {category.items.map((item) => (
          <StaggerItem
            key={item.name}
            y={10}
            duration={0.7}
            className="flex items-baseline gap-3 py-[11px]"
          >
            <dt className="text-[15.5px] font-medium text-foreground/90">
              {item.name}
            </dt>
            <span
              aria-hidden
              className="flex-1 border-b border-dotted border-foreground/25"
            />
            <dd className="text-[15.5px] font-semibold tabular-nums text-accent">
              {formatPrice(item)}
            </dd>
          </StaggerItem>
        ))}
      </dl>
      {category.note && (
        <p className="mt-3 text-[13px] font-medium italic leading-[1.6] text-foreground/70">
          {category.note}
        </p>
      )}
    </div>
  );
}

/**
 * The Preisliste as an object: a Karte laid on the page — surface sheet,
 * menu-card header, two text columns. Prints as a clean document.
 */
export function Services() {
  const showFullList = PRICE_MODE !== "auf_anfrage";

  return (
    <section
      id="leistungen"
      className="bg-background px-6 py-20 sm:px-10 lg:px-[min(10.5vw,152px)] lg:py-[120px]"
    >
      {/* Centered intro */}
      <div className="mx-auto max-w-[720px] text-center">
        <TextLineReveal
          as="h2"
          lines={["Gutes Handwerk,", "ehrliche Preise."]}
          className="font-serif font-medium leading-[1.05] tracking-[-0.01em] text-foreground text-[clamp(38px,5.5vw,60px)]"
        />
        <Reveal delay={0.15} className="mt-6">
          <p className="text-pretty text-[16px] font-medium leading-[1.65] text-foreground/80">
            Vom klassischen Schnitt bis zur Dauerwelle — bei uns finden Damen,
            Herren und Kinder alles, was gutes Haar braucht.
          </p>
        </Reveal>
      </div>

      {showFullList ? (
        <>
          {/* Die Karte */}
          <Reveal y={36} amount={0.1} className="mx-auto mt-14 max-w-[920px]">
            <div className="border border-foreground/10 bg-surface px-6 py-10 sm:px-12 sm:py-14">
              <div className="flex items-center gap-5" aria-hidden>
                <span className="h-px flex-1 bg-accent/50" />
                <span className="text-[12px] font-semibold uppercase tracking-[0.32em] text-accent">
                  Preisliste
                </span>
                <span className="h-px flex-1 bg-accent/50" />
              </div>

              <Stagger stagger={0.05} amount={0.05} className="mt-8 xl:columns-2 xl:gap-14">
                {SERVICE_CATEGORIES.map((category) => (
                  <CategoryBlock key={category.name} category={category} />
                ))}
              </Stagger>

              <p className="mt-10 border-t border-foreground/10 pt-6 text-pretty text-center text-[13px] font-medium italic leading-[1.6] text-foreground/70">
                {PRICE_FOOTNOTE}
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="mt-9 text-center" >
            <a
              href={`tel:${SALON.phoneE164}`}
              className="group inline-flex min-h-11 items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.18em] text-accent"
            >
              Termin vereinbaren — {SALON.phoneDisplay}
              <span
                aria-hidden
                className="inline-block transition-transform duration-300 group-hover:translate-x-1.5"
              >
                →
              </span>
            </a>
          </Reveal>
        </>
      ) : (
        /* price_mode "auf_anfrage": only the verified audience groups */
        <div className="mx-auto mt-14 flex max-w-[720px] flex-col items-center gap-7 text-center">
          {["Damen", "Herren", "Kinder"].map((group) => (
            <Reveal key={group}>
              <p className="font-serif font-medium text-[clamp(32px,4.5vw,44px)] text-foreground">
                {group}
              </p>
            </Reveal>
          ))}
          <Reveal delay={0.15}>
            <p className="max-w-[46ch] text-[16px] font-medium leading-[1.65] text-foreground/80">
              Preise und Termine erfragen Sie gern telefonisch unter{" "}
              <a
                href={`tel:${SALON.phoneE164}`}
                className="font-semibold text-accent"
              >
                {SALON.phoneDisplay}
              </a>
              .
            </p>
          </Reveal>
        </div>
      )}
    </section>
  );
}
