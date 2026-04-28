"use client"

import { useEffect } from "react"

// Componente cliente que registra cuando un director llega a /diagnostico
// con un parámetro ?ref= en la URL — es decir, vino por share peer-to-peer.
// No renderiza nada visible; solo dispara un evento de tracking al montarse.
// Se incluye en /diagnostico/page.tsx para cubrir tráfico orgánico de share.
export function RefTracker() {
  useEffect(() => {
    if (typeof window === "undefined") return
    const params = new URLSearchParams(window.location.search)
    const ref = params.get("ref")
    if (!ref) return

    // Lazy import para no bloquear ni romper la página si analytics falla
    import("@vercel/analytics")
      .then(({ track }) => {
        track("diagnostico_visit_via_share", {
          ref,
          refType: ref.startsWith("d") ? "personal" : "anon",
        })
      })
      .catch(() => {
        // Silenciar — tracking no es crítico
      })
  }, [])

  return null
}
