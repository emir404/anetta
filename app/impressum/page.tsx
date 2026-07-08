import type { Metadata } from "next";
import { LegalPage, LegalSection, PendingFact } from "../components/LegalPage";

export const metadata: Metadata = {
  title: "Impressum",
  description:
    "Impressum des Haarstudios Anetta, Kronsforder Allee 3a, 23560 Lübeck.",
};

// Quelle: knowledge-base/content/impressum.md — Felder mit <PendingFact> sind
// Pflichtangaben, die vor Go-Live von der Kundin kommen müssen (niemals erfinden).
export default function ImpressumPage() {
  return (
    <LegalPage title="Impressum">
      <LegalSection heading="Angaben gemäß § 5 DDG">
        <p>
          Haarstudio Anetta
          <br />
          Anetta Dzikowski
          <br />
          Kronsforder Allee 3a
          <br />
          23560 Lübeck
        </p>
        <p className="mt-3">
          <PendingFact>Rechtsform wird vor Go-Live ergänzt</PendingFact>
        </p>
      </LegalSection>

      <LegalSection heading="Kontakt">
        <p>
          Telefon:{" "}
          <a href="tel:+49451791467" className="underline underline-offset-2">
            0451 79 14 67
          </a>
          <br />
          E-Mail: <PendingFact>wird vor Go-Live ergänzt</PendingFact>
        </p>
      </LegalSection>

      <LegalSection heading="Umsatzsteuer">
        <p>
          <PendingFact>
            USt-IdNr. gemäß § 27a UStG oder Hinweis auf
            Kleinunternehmerregelung (§ 19 UStG) — wird vor Go-Live ergänzt
          </PendingFact>
        </p>
      </LegalSection>

      <LegalSection heading="Berufsbezeichnung und Kammer">
        <p>
          Berufsbezeichnung: Friseurin (verliehen in der Bundesrepublik
          Deutschland)
          <br />
          <PendingFact>
            Handwerkskammer und Eintrag in der Handwerksrolle — wird vor
            Go-Live ergänzt
          </PendingFact>
        </p>
      </LegalSection>

      <LegalSection heading="Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV">
        <p>Anetta Dzikowski, Anschrift wie oben.</p>
      </LegalSection>

      <LegalSection heading="Streitschlichtung">
        <p>
          Die Europäische Kommission stellt eine Plattform zur
          Online-Streitbeilegung (OS) bereit:{" "}
          <a
            href="https://ec.europa.eu/consumers/odr/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2"
          >
            https://ec.europa.eu/consumers/odr/
          </a>
          . Wir sind nicht bereit oder verpflichtet, an
          Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
          teilzunehmen.
        </p>
      </LegalSection>

      <LegalSection heading="Haftung für Inhalte">
        <p>
          Als Diensteanbieterin sind wir gemäß § 7 Abs. 1 DDG für eigene
          Inhalte auf diesen Seiten nach den allgemeinen Gesetzen
          verantwortlich. Nach §§ 8 bis 10 DDG sind wir jedoch nicht
          verpflichtet, übermittelte oder gespeicherte fremde Informationen
          zu überwachen oder nach Umständen zu forschen, die auf eine
          rechtswidrige Tätigkeit hinweisen.
        </p>
      </LegalSection>

      <LegalSection heading="Haftung für Links">
        <p>
          Unser Angebot enthält Links zu externen Websites Dritter, auf deren
          Inhalte wir keinen Einfluss haben. Für diese fremden Inhalte
          übernehmen wir keine Gewähr; verantwortlich ist stets der jeweilige
          Anbieter oder Betreiber der Seiten.
        </p>
      </LegalSection>

      <LegalSection heading="Urheberrecht">
        <p>
          Die durch die Seitenbetreiberin erstellten Inhalte und Werke auf
          diesen Seiten unterliegen dem deutschen Urheberrecht.
          Vervielfältigung, Bearbeitung, Verbreitung und jede Art der
          Verwertung außerhalb der Grenzen des Urheberrechts bedürfen der
          schriftlichen Zustimmung.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
