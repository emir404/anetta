import type { Metadata } from "next";
import { Termin } from "../components/Termin";

export const metadata: Metadata = {
  title: "Termin vereinbaren",
  description:
    "Vereinbaren Sie Ihren Termin im Haarstudio Anetta telefonisch unter 0451 79 14 67 — Di–Fr 09:00–18:00, Sa 08:00–13:00. Kronsforder Allee 3a, 23560 Lübeck.",
};

export default function TerminPage() {
  return <Termin />;
}
