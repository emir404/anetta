"use client";

import { Reveal, Stagger, StaggerItem, TextLineReveal } from "./Reveal";
import { SALON } from "../data/salon";
import {
  PRICE_MODE,
  PRICE_FOOTNOTE,
  SERVICE_CATEGORIES,
  formatPrice,
  type ServiceItem,
  type ServiceCategory,
  type PriceMode,
} from "../data/services";

/** Price cell: the "ab" recedes so the digits carry (German list convention). */
function PriceCell({ item }: { item: ServiceItem }) {
  if (item.price === null) {
    return (
      <dd className="text-[15px] font-medium text-foreground/60">
        auf Anfrage
      </dd>
    );
  }
  return (
    <dd className="text-[15.5px] font-semibold tabular-nums text-accent">
      {item.fromPrice && (
        <span className="font-medium text-foreground/55">ab&nbsp;</span>
      )}
      {formatPrice({ ...item, fromPrice: false })}
    </dd>
  );
}

function CategoryBlock({
  category,
  index,
}: {
  category: ServiceCategory;
  index: number;
}) {
  return (
    <div className="break-inside-avoid pt-10 first:pt-0">
      <div className="flex items-baseline gap-3">
        <span
          aria-hidden
          className="text-[11px] font-semibold tabular-nums tracking-[0.08em] text-accent"
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3 className="font-display text-[16px] font-semibold uppercase leading-none tracking-[0.14em] text-foreground">
          {category.name}
        </h3>
        <span
          aria-hidden
          className="h-px flex-1 self-center bg-foreground/15"
        />
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
            <PriceCell item={item} />
          </StaggerItem>
        ))}
      </dl>
      {category.note && (
        <p className="mt-3 text-[13px] font-medium leading-[1.6] text-foreground/65">
          {category.note}
        </p>
      )}
    </div>
  );
}

/** Corner ticks — die Karte as a set print sheet. */
function CornerTicks() {
  return (
    <>
      <span
        aria-hidden
        className="pointer-events-none absolute left-3 top-3 h-4 w-4 border-l border-t border-accent/50"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute right-3 top-3 h-4 w-4 border-r border-t border-accent/50"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute bottom-3 left-3 h-4 w-4 border-b border-l border-accent/50"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute bottom-3 right-3 h-4 w-4 border-b border-r border-accent/50"
      />
    </>
  );
}

/**
 * The Preisliste as an object: a Karte laid on the page — surface sheet with
 * corner ticks, menu-card header, indexed categories flowing in two columns.
 * Prints as a clean document (globals.css @media print).
 */
type ServicesProps = {
  eyebrow?: string;
  headingLines?: string[];
  intro?: string;
  priceMode?: PriceMode;
  categories?: ServiceCategory[];
  footnote?: string;
  salon?: { phoneE164: string; phoneDisplay: string };
};

export function Services({
  eyebrow = "Leistungen",
  headingLines = ["Gutes Handwerk,", "ehrliche Preise."],
  intro = "Vom klassischen Schnitt bis zur Dauerwelle — bei uns finden Damen, Herren und Kinder alles, was gutes Haar braucht.",
  priceMode = PRICE_MODE,
  categories = SERVICE_CATEGORIES,
  footnote = PRICE_FOOTNOTE,
  salon = SALON,
}: ServicesProps = {}) {
  const showFullList = priceMode !== "auf_anfrage";

  return (
    <section
      id="leistungen"
      className="bg-background px-6 py-20 sm:px-10 lg:px-[min(10.5vw,152px)] lg:py-[120px]"
    >
      {/* Centered intro */}
      <div className="mx-auto max-w-[760px] text-center">
        <Reveal y={12}>
          <p className="text-[12px] font-semibold uppercase tracking-[0.3em] text-accent">
            {eyebrow}
          </p>
        </Reveal>
        <TextLineReveal
          as="h2"
          lines={headingLines}
          className="mt-4 font-display font-semibold leading-[1.06] tracking-[-0.01em] text-foreground text-[clamp(28px,4.6vw,52px)]"
        />
        <Reveal delay={0.15} className="mt-6">
          <p className="mx-auto max-w-[52ch] text-pretty text-[16px] font-medium leading-[1.65] text-foreground/80">
            {intro}
          </p>
        </Reveal>
      </div>

      {showFullList ? (
        <>
          {/* Die Karte */}
          <Reveal y={36} amount={0.1} className="mx-auto mt-14 max-w-[920px]">
            <div className="relative border border-foreground/15 bg-surface px-6 py-10 sm:px-12 sm:py-14">
              <CornerTicks />
              <div className="flex items-center gap-5" aria-hidden>
                <span className="h-px flex-1 bg-accent/50" />
                <span className="font-display text-[13px] font-semibold uppercase tracking-[0.32em] [text-indent:0.32em] text-accent">
                  Preisliste
                </span>
                <span className="h-px flex-1 bg-accent/50" />
              </div>

              <Stagger
                stagger={0.05}
                amount={0.05}
                className="mt-9 xl:columns-2 xl:gap-16"
              >
                {categories.map((category, i) => (
                  <CategoryBlock
                    key={category.name}
                    category={category}
                    index={i}
                  />
                ))}
              </Stagger>

              <p className="mt-10 border-t border-foreground/10 pt-6 text-pretty text-center text-[13px] font-medium leading-[1.6] text-foreground/70">
                {footnote}
              </p>
            </div>
          </Reveal>

          {/* Phone, second altitude of three: quiet label, the number carries */}
          <Reveal
            delay={0.1}
            className="mt-12 flex flex-col items-center gap-2.5 text-center"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-foreground/60">
              Termin vereinbaren
            </p>
            <a href={`tel:${salon.phoneE164}`} className="group block w-fit">
              <span className="block font-display font-semibold leading-none tracking-[0.02em] tabular-nums text-foreground transition-colors duration-300 group-hover:text-accent text-[clamp(24px,3.4vw,36px)]">
                {salon.phoneDisplay}
              </span>
              <span
                aria-hidden
                className="mt-1.5 block h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-500 ease-out group-hover:scale-x-100"
              />
            </a>
          </Reveal>
        </>
      ) : (
        /* price_mode "auf_anfrage": only the verified audience groups */
        <div className="mx-auto mt-14 flex max-w-[720px] flex-col items-center gap-7 text-center">
          {["Damen", "Herren", "Kinder"].map((group) => (
            <Reveal key={group}>
              <p className="font-display font-semibold tracking-[-0.01em] text-foreground text-[clamp(28px,4vw,40px)]">
                {group}
              </p>
            </Reveal>
          ))}
          <Reveal delay={0.15}>
            <p className="max-w-[46ch] text-[16px] font-medium leading-[1.65] text-foreground/80">
              Preise und Termine erfragen Sie gern telefonisch unter{" "}
              <a
                href={`tel:${salon.phoneE164}`}
                className="font-semibold tabular-nums text-accent"
              >
                {salon.phoneDisplay}
              </a>
              .
            </p>
          </Reveal>
        </div>
      )}
    </section>
  );
}
