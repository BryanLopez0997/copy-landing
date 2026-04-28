// Sistema de atribución de share para /diagnostico.
// Cada vez que un director recomienda el diagnóstico a otro director,
// el link compartido lleva un parámetro ?ref= que nos permite saber
// (sin exponer datos personales) cuántos clics generó cada director.

const STORAGE_KEY = "ekole_director_ref"
const SHARE_BASE_URL = "https://www.ekole.app/diagnostico"

// Mensaje pre-redactado V2 — alineado con la decisión del paso 1.
// El director que comparte aparece como alguien que "encontró" la herramienta
// (sin admitir huecos legales propios). Foco en SEP + derechos ARCO únicamente.
const SHARE_MESSAGE_TEMPLATE = (link: string) =>
  `Encontré este diagnóstico para directores — revisa SEP y derechos ARCO de tu colegio en 90 segundos. Vale la pena: ${link}`

// Hash anónimo aleatorio (12 chars hex con prefijo "a")
// Se usa cuando un director comparte ANTES de dejar sus datos en el lead form.
export function generateAnonRef(): string {
  if (typeof window === "undefined" || !window.crypto) return "aserver"
  const bytes = window.crypto.getRandomValues(new Uint8Array(6))
  return "a" + Array.from(bytes).map((b) => b.toString(16).padStart(2, "0")).join("")
}

// Hash determinístico FNV-1a del teléfono (8 chars hex con prefijo "d").
// Es one-way (no se puede revertir), suficiente para atribución de marketing.
// Se usa cuando un director ya dejó sus datos — sus shares quedan vinculados.
export function generateDirectorRef(phone: string): string {
  const normalized = phone.replace(/\D/g, "")
  if (!normalized) return generateAnonRef()
  let hash = 2166136261
  for (let i = 0; i < normalized.length; i++) {
    hash ^= normalized.charCodeAt(i)
    hash = Math.imul(hash, 16777619)
  }
  const hex = (hash >>> 0).toString(16).padStart(8, "0")
  return "d" + hex
}

// Lectura/escritura del ref personal en localStorage.
// Si el director ya hizo el diagnóstico antes en este navegador,
// recuperamos su ref personal aunque no haya hecho submit en esta sesión.
export function getStoredRef(): string | null {
  if (typeof window === "undefined") return null
  try {
    return window.localStorage.getItem(STORAGE_KEY)
  } catch {
    return null
  }
}

export function setStoredRef(ref: string): void {
  if (typeof window === "undefined") return
  try {
    window.localStorage.setItem(STORAGE_KEY, ref)
  } catch {
    // Ignora errores (modo privado, cuota llena, etc.)
  }
}

// Construye la URL completa que se compartirá al receptor
export function buildShareLink(ref: string): string {
  return `${SHARE_BASE_URL}?ref=${ref}`
}

// Construye el mensaje completo que se abre en WhatsApp
export function buildShareMessage(ref: string): string {
  return SHARE_MESSAGE_TEMPLATE(buildShareLink(ref))
}

// Construye la URL de wa.me con el mensaje pre-redactado y URL-encoded
export function buildWhatsAppShareUrl(ref: string): string {
  return `https://wa.me/?text=${encodeURIComponent(buildShareMessage(ref))}`
}

// Determina el tipo de ref para tracking (anon vs personal)
export function getRefType(ref: string): "personal" | "anon" {
  return ref.startsWith("d") ? "personal" : "anon"
}
