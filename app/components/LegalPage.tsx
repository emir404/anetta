import Link from "next/link";
import { Footer } from "./Footer";

export function LegalPage({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-svh flex-col bg-background">
      <header className="flex items-center justify-between px-6 pt-8 sm:px-10 lg:px-[min(10.5vw,152px)] lg:pt-14">
        <Link
          href="/"
          className="flex min-h-11 items-center py-2 text-[13px] font-semibold uppercase tracking-[0.24em] text-foreground"
        >
          Haarstudio&nbsp;Anetta
        </Link>
        <Link
          href="/"
          className="flex min-h-11 items-center py-2 text-[13px] font-semibold tracking-[-0.13px] text-foreground/70 transition-opacity hover:opacity-70"
        >
          ← Zurück zur Startseite
        </Link>
      </header>

      <main className="flex-1 px-6 py-16 sm:px-10 lg:px-[min(10.5vw,152px)] lg:py-24">
        <h1 className="hyphens-auto break-words font-display font-semibold leading-[1.06] tracking-[-0.01em] text-foreground text-[clamp(26px,4.6vw,52px)]">
          {title}
        </h1>
        <div className="mt-10 flex max-w-[640px] flex-col gap-8">{children}</div>
      </main>

      <Footer curtain={false} />
    </div>
  );
}

export function LegalSection({
  heading,
  children,
}: {
  heading?: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      {heading && (
        <h2 className="mb-3 text-[17px] font-semibold tracking-[-0.17px] text-foreground">
          {heading}
        </h2>
      )}
      <div className="text-[15.5px] font-medium leading-[1.7] text-foreground/80">
        {children}
      </div>
    </section>
  );
}

/** Visible marker for client-pending legal facts — never invent these. */
export function PendingFact({ children }: { children: React.ReactNode }) {
  return (
    <span className="border border-dashed border-accent/60 bg-surface px-2 py-0.5 text-[13px] font-semibold text-foreground/80">
      {children}
    </span>
  );
}
