"use client"

import * as React from "react"
import { X, ArrowRight, MessageCircle } from "lucide-react"
import { supabase } from "@/lib/supabase"

interface Props {
  open: boolean
  onClose: () => void
  whatsappHref: string
}

export function WhatsappLeadModal({ open, onClose, whatsappHref }: Props) {
  const [nombre, setNombre] = React.useState("")
  const [whatsapp, setWhatsapp] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [error, setError] = React.useState("")

  // Captura UTM params de la URL actual
  function getUtmParams() {
    if (typeof window === "undefined") return { utm_source: null, utm_campaign: null }
    const params = new URLSearchParams(window.location.search)
    return {
      utm_source: params.get("utm_source"),
      utm_campaign: params.get("utm_campaign"),
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")

    // Limpia el número: quita espacios, guiones y paréntesis
    const numeroLimpio = whatsapp.replace(/[\s\-\(\)]/g, "")

    if (!nombre.trim()) { setError("Por favor ingresa tu nombre."); return }
    if (numeroLimpio.length < 10) { setError("Por favor ingresa un número de WhatsApp válido de 10 dígitos."); return }

    const { utm_source, utm_campaign } = getUtmParams()

    // Guarda en Supabase en segundo plano — no esperamos para no bloquear el popup
    supabase.from("leads").insert({
      nombre: nombre.trim(),
      whatsapp_numero: numeroLimpio,
      email: email.trim() || null,
      origen: "solicito_cita",
      fase_plf: "pre_prelaunch",
      estatus: "nuevo",
      mensaje_enviado_count: 0,
      utm_source,
      utm_campaign,
    }).then(({ error: dbError }) => {
      if (dbError) console.error("Supabase error:", dbError)
    })

    // Abre WhatsApp inmediatamente — síncrono al clic para que el navegador lo permita
    window.open(whatsappHref, "_blank", "noopener,noreferrer")
    onClose()
    setNombre("")
    setWhatsapp("")
    setEmail("")
  }

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        {/* Botón cerrar */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          aria-label="Cerrar"
        >
          <X className="size-4" />
        </button>

        {/* Encabezado */}
        <div className="mb-5">
          <div className="mb-3 flex size-10 items-center justify-center rounded-full bg-green-100">
            <MessageCircle className="size-5 text-green-600" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900">
            Un paso antes de agendar
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Déjanos tu WhatsApp para darte seguimiento personalizado.
          </p>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Nombre <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Ej. María González"
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              WhatsApp <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              placeholder="Ej. 6681234567"
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Correo electrónico{" "}
              <span className="text-xs font-normal text-gray-400">(opcional)</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ej. maria@colegio.edu.mx"
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}

          <button
            type="submit"
            className="mt-1 flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700"
          >
            Continuar a WhatsApp
            <ArrowRight className="size-4" />
          </button>

          <p className="text-center text-xs text-gray-400">
            Al continuar aceptas nuestro{" "}
            <a href="/aviso-privacidad" className="underline hover:text-gray-600">
              Aviso de Privacidad
            </a>
          </p>
        </form>
      </div>
    </div>
  )
}
