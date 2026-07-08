import type { Metadata } from "next";
import { LegalPage, LegalSection, PendingFact } from "../components/LegalPage";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  description:
    "Datenschutzerklärung des Haarstudios Anetta, Kronsforder Allee 3a, 23560 Lübeck.",
};

// Quelle: knowledge-base/content/datenschutz.md — die Erklärung spiegelt das
// tatsächliche Verhalten der Website: keine Cookies, kein Tracking, keine
// Formulare, Schriften lokal (next/font). Einzige externe Einbindung: Google Maps.
export default function DatenschutzPage() {
  return (
    // Soft hyphen steers the caps-H1 break to the compound boundary
    // (DATENSCHUTZ-ERKLÄRUNG); the <title> above stays clean.
    <LegalPage title={"Datenschutz­erklärung"}>
      <LegalSection heading="Verantwortliche">
        <p>
          Anetta Dzikowski
          <br />
          Kronsforder Allee 3a, 23560 Lübeck
          <br />
          Telefon:{" "}
          <a href="tel:+49451791467" className="underline underline-offset-2">
            0451 79 14 67
          </a>
          <br />
          E-Mail: <PendingFact>wird vor Go-Live ergänzt</PendingFact>
        </p>
      </LegalSection>

      <LegalSection heading="Zugriffsdaten und Server-Logfiles">
        <p>
          Beim Aufruf dieser Website verarbeitet unser Hosting-Anbieter
          automatisch Informationen, die Ihr Browser übermittelt: IP-Adresse,
          Datum und Uhrzeit der Anfrage, aufgerufene Seite, verwendeter
          Browser (User-Agent) und die zuvor besuchte Seite (Referrer). Die
          Verarbeitung erfolgt zur Auslieferung und technischen Absicherung
          der Website (Art. 6 Abs. 1 lit. f DSGVO). Die Website wird bei
          Vercel Inc. gehostet; mit dem Anbieter besteht ein Vertrag zur
          Auftragsverarbeitung.
        </p>
      </LegalSection>

      <LegalSection heading="Google Maps">
        <p>
          Zur Anfahrtsdarstellung binden wir eine Karte von Google Maps
          (Google Ireland Limited, Gordon House, Barrow Street, Dublin 4,
          Irland) per iframe ein. Beim Laden der Karte werden Daten — unter
          anderem Ihre IP-Adresse — an Google übertragen. Rechtsgrundlage ist
          Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einer
          einfachen Anfahrtsbeschreibung). Weitere Informationen finden Sie
          in der{" "}
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2"
          >
            Datenschutzerklärung von Google
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection heading="Schriftarten">
        <p>
          Die verwendeten Schriften werden lokal von unserem Server
          ausgeliefert. Beim Aufruf der Website wird keine Verbindung zu
          Servern von Google Fonts oder anderen Schriftanbietern aufgebaut.
        </p>
      </LegalSection>

      <LegalSection heading="Keine weiteren Datenverarbeitungen">
        <p>
          Diese Website setzt keine Cookies, verwendet keine Analyse- oder
          Tracking-Dienste, bindet keine Social-Media-Plugins ein und enthält
          keine Kontaktformulare und keinen Newsletter. Wenn Sie uns anrufen,
          verwenden wir Ihre Angaben ausschließlich zur Terminvereinbarung.
        </p>
      </LegalSection>

      <LegalSection heading="Ihre Rechte">
        <p>
          Sie haben das Recht auf Auskunft (Art. 15 DSGVO), Berichtigung
          (Art. 16 DSGVO), Löschung (Art. 17 DSGVO), Einschränkung der
          Verarbeitung (Art. 18 DSGVO), Datenübertragbarkeit (Art. 20 DSGVO)
          und Widerspruch (Art. 21 DSGVO). Außerdem können Sie sich bei einer
          Datenschutz-Aufsichtsbehörde beschweren — zuständig ist das
          Unabhängige Landeszentrum für Datenschutz Schleswig-Holstein (ULD),
          Holstenstraße 98, 24103 Kiel.
        </p>
        <p className="mt-3">Stand: Juli 2026</p>
      </LegalSection>
    </LegalPage>
  );
}
