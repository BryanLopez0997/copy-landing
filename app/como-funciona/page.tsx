import type { Metadata } from "next"
import Image from "next/image"
import { HeroHeader, Footer, FlujoPuertaDemo } from "@/components/software-development-website"

// Esta página NO se indexa en Google — es material de seguimiento post-llamada,
// no una página de conversión de tráfico frío.
export const metadata: Metadata = {
  title: "Cómo funciona Ekole — Flujo de puerta paso a paso",
  description:
    "Flujo real de salida escolar con Ekole: clave de recogida, confirmación del maestro y entrega documentada en segundos.",
  robots: { index: false, follow: false },
}

const CALL_CTA_HREF =
  "https://wa.me/526685403658?text=Hola%2C%20me%20interesa%20agendar%20una%20revisi%C3%B3n%20de%2020%20minutos%20para%20conocer%20c%C3%B3mo%20Ekole%20puede%20mejorar%20el%20proceso%20de%20salida%20en%20mi%20colegio."

const steps = [
  {
    number: "01",
    title: "Clave en puerta",
    body: "El personal ingresa los 3 dígitos del tutor. El alumno autorizado aparece al instante sin buscar en listas.",
    img: "/promotions/Buscador iphone 089.png",
    alt: "iPad con buscador Ekole: clave ingresada y alumno identificado",
    tone: "#173E75",
    tint: "bg-[#F4F8FC]",
  },
  {
    number: "02",
    title: "Confirmación del maestro",
    body: "El maestro ve al alumno en su tablero y confirma el movimiento hacia la salida desde su dispositivo.",
    img: "/promotions/Ipad dasboard final.png",
    alt: "iPad con dashboard del maestro: alumno listo para enviar a puerta",
    tone: "#2EB4E9",
    tint: "bg-[#F7FCFE]",
  },
  {
    number: "03",
    title: "Entrega documentada",
    body: "Nombre, hora, grado, tutor autorizado y personal que entregó quedan disponibles como evidencia consultable.",
    img: "/promotions/Ipad Entregados.png",
    alt: "iPad con pantalla de entregas confirmadas y registro de hora exacta",
    tone: "#10B981",
    tint: "bg-[#F6FEFA]",
  },
]

const proofItems = [
  { label: "Alumno", value: "Nombre y grado" },
  { label: "Hora exacta", value: "Timestamp automático" },
  { label: "Tutor autorizado", value: "Quién recogió" },
  { label: "Personal que confirmó", value: "Registro de quien entregó" },
]

export default function ComoFuncionaPage() {
  return (
    <>
      <HeroHeader />
      <main className="overflow-hidden pt-20">

        {/* ── Encabezado de página ── */}
        <section className="bg-[#F4F8FC] py-16 md:py-20">
          <div className="mx-auto max-w-6xl px-6">
            <a
              href="/"
              className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#6B7280] hover:text-[#173E75]"
            >
              ← Volver a la página principal
            </a>
            <h1 className="mt-6 max-w-[700px] text-balance text-[2.35rem] font-extrabold leading-[1.12] tracking-[-0.01em] text-[#173E75] sm:text-[3rem]">
              De la clave al registro{" "}
              <span className="text-[#2EB4E9]">en segundos.</span>
            </h1>
            <p className="mt-5 max-w-[620px] text-[18px] font-normal leading-[1.6] text-[#4B5563]">
              El equipo de puerta identifica, confirma y deja evidencia sin pasos manuales.
              Tres pantallas, tres roles, un flujo completo.
            </p>
          </div>
        </section>

        {/* ── Panel oscuro — screenshots paso a paso ── */}
        <section className="bg-[#0D2545] py-16 md:py-20">
          <div className="mx-auto max-w-6xl px-6">
            <p className="text-[13px] font-bold uppercase tracking-[1.2px] text-white/50">
              Flujo real de puerta
            </p>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {steps.map((step) => (
                <div
                  key={step.number}
                  className="flex flex-col overflow-hidden rounded-[20px] bg-white/[0.06] ring-1 ring-white/10"
                >
                  <div
                    className={`relative flex aspect-[16/10] items-center justify-center overflow-hidden ${step.tint}`}
                  >
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(0,0,0,0.06)_100%)]"
                    />
                    <div
                      aria-hidden
                      className="absolute left-3 top-3 z-20 rounded-md bg-white/90 px-2.5 py-1 text-[12px] font-bold shadow-sm backdrop-blur"
                      style={{ color: step.tone }}
                    >
                      {step.number}
                    </div>
                    <Image
                      src={step.img}
                      alt={step.alt}
                      fill
                      quality={95}
                      className="object-contain object-center p-5 drop-shadow-[0_10px_24px_rgba(0,0,0,0.22)]"
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 33vw, 360px"
                    />
                  </div>
                  <div className="px-4 py-4">
                    <h2 className="text-[17px] font-bold leading-snug text-white">
                      {step.title}
                    </h2>
                    <p className="mt-1.5 text-[14px] leading-[1.6] text-white/55">
                      {step.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Qué queda registrado */}
            <div className="mt-8 overflow-hidden rounded-[20px] border border-white/10 bg-white/[0.04]">
              <div className="px-5 py-3">
                <p className="text-[11px] font-bold uppercase tracking-[1.4px] text-white/50">
                  Qué queda registrado en cada entrega
                </p>
              </div>
              <div className="grid divide-y divide-white/10 border-t border-white/10 sm:grid-cols-2 sm:divide-x sm:divide-y-0 md:grid-cols-4 md:divide-x md:divide-y-0">
                {proofItems.map((item) => (
                  <div key={item.label} className="flex items-center gap-3 px-5 py-3.5 md:px-6">
                    <div className="flex size-6 flex-shrink-0 items-center justify-center rounded-md bg-[#10B981]/20 text-[#10B981]">
                      <svg viewBox="0 0 16 16" fill="currentColor" className="size-3.5" aria-hidden>
                        <path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.75.75 0 0 1 1.06-1.06L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[13px] font-bold text-white">{item.label}</p>
                      <p className="text-[12px] text-white/50">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Demo animada de flujo de puerta ── */}
        <section className="bg-gradient-to-b from-[#F4F8FC] to-white py-16 md:py-20">
          <div className="mx-auto max-w-6xl px-6">
            <p className="mb-2 text-center text-[13px] font-bold uppercase tracking-[1.2px] text-[#6B7280]">
              Experiencia interactiva
            </p>
            <h2 className="mb-10 text-center text-[1.8rem] font-extrabold text-[#173E75] sm:text-[2.2rem]">
              Así lo ve el equipo de puerta
            </h2>
            <FlujoPuertaDemo />
          </div>
        </section>

        {/* ── CTA de cierre ── */}
        <section className="border-t border-[#E5E7EB] bg-white py-14 md:py-16">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <p className="text-[13px] font-bold uppercase tracking-[1.2px] text-[#6B7280]">
              Siguiente paso
            </p>
            <h2 className="mt-4 text-balance text-[2rem] font-extrabold leading-[1.12] text-[#173E75] sm:text-[2.5rem]">
              ¿Vemos cómo aplica esto en su colegio?
            </h2>
            <p className="mt-4 text-[17px] leading-[1.65] text-[#4B5563]">
              En 20 minutos revisamos su flujo actual y vemos qué tan rápido puede operar Ekole con sus datos listos.
            </p>
            <a
              href={CALL_CTA_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-lg bg-[#173E75] px-8 py-4 text-[16px] font-semibold text-white shadow-md transition-colors duration-150 hover:bg-[#0F2A4F] focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[#2EB4E9] focus-visible:ring-offset-2"
            >
              Agendar revisión de salida
              <svg viewBox="0 0 20 20" fill="currentColor" className="size-5" aria-hidden>
                <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" />
              </svg>
            </a>
            <p className="mt-3 text-[13px] text-[#9CA3AF]">
              Por videollamada · Sin compromiso · 20 min
            </p>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
