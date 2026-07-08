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
    <div className="pt-12 first:pt-0">
      <div className="flex items-baseline gap-4">
        <span aria-hidden className="h-px w-7 translate-y-[-0.35em] bg-accent" />
        <h3 className="font-serif font-medium leading-none text-[clamp(26px,3vw,32px)] text-foreground">
          {category.name}
        </h3>
      </div>
      <dl className="mt-4 divide-y divide-foreground/8">
        {category.items.map((item) => (
          <StaggerItem
            key={item.name}
            y={10}
            duration={0.7}
            className="flex items-baseline gap-3 py-[13px]"
          >
            <dt className="text-[16px] font-medium text-foreground/90">
              {item.name}
            </dt>
            <span
              aria-hidden
              className="flex-1 border-b border-dotted border-foreground/25"
            />
            <dd className="text-[16px] font-semibold tabular-nums text-accent">
              {formatPrice(item)}
            </dd>
          </StaggerItem>
        ))}
      </dl>
      {category.note && (
        <p className="mt-3 text-[13.5px] font-medium italic leading-[1.6] text-foreground/55">
          {category.note}
        </p>
      )}
    </div>
  );
}

export function Services() {
  const showFullList = PRICE_MODE !== "auf_anfrage";

  return (
    <section
      id="leistungen"
      className="bg-background px-6 py-20 sm:px-10 lg:px-[min(10.5vw,152px)] lg:py-[120px]"
    >
      <div className="grid gap-14 lg:grid-cols-[minmax(0,38%)_minmax(0,1fr)] lg:gap-24">
        {/* Intro column */}
        <div className="lg:sticky lg:top-24 lg:self-start" data-print-hidden>
          <Reveal y={16}>
            <p className="text-[12px] font-semibold uppercase tracking-[0.3em] text-accent">
              Leistungen &amp; Preise
            </p>
          </Reveal>
          <TextLineReveal
            as="h2"
            lines={["Gutes Handwerk,", "ehrliche Preise."]}
            className="mt-5 font-serif font-medium leading-[1.05] tracking-[-0.01em] text-foreground text-[clamp(38px,5.5vw,60px)]"
          />
          <Reveal delay={0.15} className="mt-7 max-w-[42ch]">
            <p className="text-pretty text-[16px] font-medium leading-[1.65] text-foreground/80">
              Vom klassischen Schnitt bis zur Dauerwelle — bei uns finden
              Damen, Herren und Kinder alles, was gutes Haar braucht.
              Vereinbaren Sie Ihren Termin telefonisch.
            </p>
          </Reveal>
          <Reveal delay={0.2} className="mt-8">
            <a
              href={`tel:${SALON.phoneE164}`}
              className="group inline-flex min-h-11 items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.18em] text-accent"
            >
              {SALON.phoneDisplay} anrufen
              <span
                aria-hidden
                className="inline-block transition-transform duration-300 group-hover:translate-x-1.5"
              >
                →
              </span>
            </a>
          </Reveal>
        </div>

        {/* Preisliste */}
        <div className="max-w-[760px]">
          {showFullList ? (
            <>
              <Stagger stagger={0.05} amount={0.1}>
                {SERVICE_CATEGORIES.map((category) => (
                  <CategoryBlock key={category.name} category={category} />
                ))}
              </Stagger>
              <Reveal delay={0.1} className="mt-10">
                <p className="text-pretty text-[13.5px] font-medium italic leading-[1.6] text-foreground/55">
                  {PRICE_FOOTNOTE}
                </p>
              </Reveal>
            </>
          ) : (
            /* price_mode "auf_anfrage": only the verified audience groups */
            <div className="flex h-full flex-col justify-center gap-8">
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
        </div>
      </div>
    </section>
  );
}
