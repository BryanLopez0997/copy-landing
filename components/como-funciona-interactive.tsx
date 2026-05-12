"use client"

import * as React from "react"
import { FlujoPuertaDemo } from "@/components/software-development-website"
import { WhatsappLeadModal } from "@/components/whatsapp-lead-modal"

const CALL_CTA_HREF =
  "https://wa.me/526685403658?text=Hola%2C%20me%20interesa%20agendar%20una%20revisi%C3%B3n%20de%2020%20minutos%20para%20conocer%20c%C3%B3mo%20Ekole%20puede%20mejorar%20el%20proceso%20de%20salida%20en%20mi%20colegio."

export function ComoFuncionaInteractive() {
  const [modalOpen, setModalOpen] = React.useState(false)

  return (
    <>
      <WhatsappLeadModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        whatsappHref={CALL_CTA_HREF}
      />

      {/* Demo animada */}
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

      {/* CTA de cierre */}
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
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-lg bg-[#173E75] px-8 py-4 text-[16px] font-semibold text-white shadow-md transition-colors duration-150 hover:bg-[#0F2A4F] focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[#2EB4E9] focus-visible:ring-offset-2"
          >
            Agendar revisión de salida
            <svg viewBox="0 0 20 20" fill="currentColor" className="size-5" aria-hidden>
              <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" />
            </svg>
          </button>
          <p className="mt-3 text-[13px] text-[#9CA3AF]">
            Por videollamada · Sin compromiso · 20 min
          </p>
        </div>
      </section>
    </>
  )
}
