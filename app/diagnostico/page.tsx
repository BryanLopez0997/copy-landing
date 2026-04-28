import type { Metadata } from "next"
import DiagnosticoTool from "@/components/diagnostico-tool"
import { DiagnosticoHeader, DiagnosticoFooter } from "@/components/diagnostico/parts"
import { RefTracker } from "@/components/diagnostico/ref-tracker"

export const metadata: Metadata = {
  title: "Diagnóstico de Exposición Legal — Ekole para Colegios",
  description:
    "Evalúe en 90 segundos el nivel de exposición legal de su colegio en 8 áreas de cumplimiento. Basado en LFPDPPP, CCF Art. 1920 y legislación federal vigente. Gratuito y confidencial.",
  // openGraph se usa al compartir el link en WhatsApp, LinkedIn, Facebook
  // El campo "images" lo añade Next.js automáticamente desde el archivo
  // app/diagnostico/opengraph-image.tsx — no hace falta declararlo aquí
  openGraph: {
    title: "Descubre cuánto te expones si un padre presenta un reclamo",
    description:
      "Diagnóstico SEP y protección de datos de alumnos. 90 segundos, sin registro y confidencial.",
    type: "website",
    url: "https://www.ekole.app/diagnostico",
  },
}

export default function Page() {
  return (
    <>
      <RefTracker />
      <DiagnosticoHeader />
      <main className="pt-16">
        <DiagnosticoTool />
      </main>
      <DiagnosticoFooter />
    </>
  )
}
