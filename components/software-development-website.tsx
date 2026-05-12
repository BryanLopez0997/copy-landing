"use client"

import * as React from "react"
import Image from "next/image"
import { motion, AnimatePresence, type Variants } from "framer-motion"
import {
  ArrowRight,
  Check,
  ChevronDown,
  ClipboardCheck,
  Clock,
  FileText,
  GraduationCap,
  KeyRound,
  Lock,
  Menu,
  MessageSquare,
  ShieldCheck,
  Smartphone,
  Stethoscope,
  Users2,
  X,
  Zap,
} from "lucide-react"
import { EfectoEkoleChart } from "./efecto-ekole-chart"
import { EkoleDashboardMockup } from "./ekole-dashboard-mockup"
import { WhatsappLeadModal } from "./whatsapp-lead-modal"

/* ==============================================================
   Launch funnel:
   - trafico frio: diagnostico de exposicion legal.
   - prospecto caliente: llamada por WhatsApp cuando exista el link real.
   ============================================================== */
const CALL_CTA_HREF = "https://wa.me/526685403658?text=Hola%2C%20me%20interesa%20agendar%20una%20revisi%C3%B3n%20de%2020%20minutos%20para%20conocer%20c%C3%B3mo%20Ekole%20puede%20mejorar%20el%20proceso%20de%20salida%20en%20mi%20colegio."
const CALL_CTA_LABEL = "Agendar llamada"
const CALL_CTA_FULL_LABEL = "Agendar llamada por WhatsApp"
const CALL_CTA_MICROCOPY = "20 min · Revisamos su salida actual · Sin compromiso"
const DIAGNOSTIC_CTA_HREF = "/diagnostico"
const DIAGNOSTIC_CTA_LABEL = "Hacer diagnóstico en 3 min"
const DIAGNOSTIC_CTA_SHORT_LABEL = "Diagnóstico legal"
const DIAGNOSTIC_CTA_MICROCOPY = "Gratis · Resultado inmediato · Confidencial"

/* ---------- modal context ---------- */
const ModalContext = React.createContext<() => void>(() => {})
function useOpenModal() { return React.useContext(ModalContext) }

/* ---------- utilities ---------- */

function cn(...classes: (string | undefined | null | boolean)[]): string {
  return classes.filter(Boolean).join(" ")
}

/* ---------- motion variants ---------- */

const containerFade: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const itemRise: Variants = {
  hidden: { opacity: 0, y: 14, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring" as const, bounce: 0.28, duration: 1.1 },
  },
}

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
        visible: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: { type: "spring" as const, bounce: 0.25, duration: 0.9, delay },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ---------- brand ---------- */

const Logo = ({ className }: { className?: string }) => (
  <div className={cn("flex items-center", className)}>
    <Image
      src="/logo.png"
      alt="Ekole Logo"
      width={120}
      height={40}
      className="h-9 w-auto object-contain"
      priority
    />
  </div>
)

/* ---------- navbar ---------- */

const menuItems = [
  { name: "Por qué importa", href: "/#problema" },
  { name: "Diagnóstico", href: "/#diagnostico" },
  { name: "La solución", href: "/#solucion" },
  { name: "Cómo funciona", href: "/como-funciona" },
  { name: "Preguntas", href: "/#preguntas" },
]

export function HeroHeader() {
  const [open, setOpen] = React.useState(false)
  const [scrolled, setScrolled] = React.useState(false)
  const openModal = useOpenModal()

  React.useEffect(() => {
    if (typeof window === "undefined") return
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="px-3 pt-3">
        <nav
          className={cn(
            "mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-full border border-transparent px-4 py-2.5 transition-all duration-300 lg:px-6",
            scrolled && "border-border/70 bg-background/80 shadow-[0_1px_0_0_hsl(var(--border))] backdrop-blur-xl",
          )}
        >
          <a href="/" aria-label="Ekole inicio" className="flex items-center">
            <Logo />
          </a>

          <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-7 text-sm text-muted-foreground lg:flex">
            {menuItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="transition-colors hover:text-foreground"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={openModal}
              className="hidden items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition-colors duration-150 hover:-translate-y-[1px] hover:bg-primary-dark hover:shadow-md active:translate-y-px active:shadow-sm focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-sky focus-visible:ring-offset-2 lg:inline-flex"
            >
              {CALL_CTA_LABEL}
              <ArrowRight className="size-3.5" />
            </button>
            <button
              type="button"
              aria-label="Abrir menú"
              onClick={() => setOpen((v) => !v)}
              className="inline-flex size-9 items-center justify-center rounded-full border border-border/70 bg-background/60 text-foreground backdrop-blur lg:hidden"
            >
              {open ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>
        </nav>

        {open && (
          <div className="mx-auto mt-2 max-w-6xl rounded-2xl border border-border/70 bg-background/95 p-4 shadow-lg backdrop-blur lg:hidden">
            <ul className="flex flex-col gap-2 text-base">
              {menuItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-2 text-foreground/90 hover:bg-muted"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  onClick={() => { setOpen(false); openModal() }}
                  className="mt-1 block w-full rounded-lg bg-primary px-3 py-2 text-center font-medium text-primary-foreground"
                >
                  {CALL_CTA_LABEL}
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  )
}

/* ---------- small ui primitives ---------- */

export function Pill({
  children,
  tone = "default",
}: {
  children: React.ReactNode
  tone?: "default" | "safe" | "risk" | "primary" | "amber"
}) {
  const toneMap: Record<string, string> = {
    default: "border-border/80 bg-background text-foreground/80",
    safe: "border-safe/20 bg-safe-soft text-safe",
    risk: "border-risk/30 bg-risk-soft text-risk",
    primary: "border-primary/20 bg-primary/5 text-primary",
    amber: "border-[rgba(245,158,11,0.25)] bg-[rgba(245,158,11,0.1)] text-[#92400e]",
  }
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium",
        toneMap[tone],
      )}
    >
      {children}
    </span>
  )
}

export function PrimaryCTA({
  children,
  href = "#cta",
  className,
}: {
  children: React.ReactNode
  href?: string
  className?: string
}) {
  return (
    <a
      href={href}
      className={cn(
        // DS: hover → bg más oscuro (primary-dark) + shadow-lg; active → translate-y-px + shadow off; focus-visible → ring sky 3px
        "group inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/20 ring-1 ring-primary/30 transition-colors duration-150 hover:-translate-y-[1px] hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/35 active:translate-y-px active:shadow-sm focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-sky focus-visible:ring-offset-2 md:text-base",
        className,
      )}
    >
      {children}
      <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
    </a>
  )
}

export function GhostCTA({
  children,
  href = "#diagnostico",
  className,
}: {
  children: React.ReactNode
  href?: string
  className?: string
}) {
  return (
    <a
      href={href}
      className={cn(
        // DS ghost: hover → bg primary/8 + border primary/50 + text primary; active → bg primary/14; focus-visible sky
        "inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-background/60 px-6 py-3 text-sm font-medium text-foreground/90 transition-colors duration-150 hover:-translate-y-[1px] hover:border-primary/60 hover:bg-primary/[0.06] hover:text-primary hover:shadow-sm active:translate-y-px active:bg-primary/[0.12] active:shadow-none focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-sky focus-visible:ring-offset-2 md:text-base",
        className,
      )}
    >
      {children}
    </a>
  )
}

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center gap-3 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
      <span className="h-px w-8 bg-border" />
      {children}
      <span className="h-px w-8 bg-border" />
    </div>
  )
}

/* ----------------------------------------------------------------
   LegalCredential — design system component
   Shield + text, usado SOLO para referencias a leyes/normas oficiales.
   No es un badge/pill; comunica autoridad institucional.
   ---------------------------------------------------------------- */

export function LegalCredentials({
  items,
  tone = "light",
  className,
}: {
  items: string[]
  tone?: "light" | "navy"
  className?: string
}) {
  const textCls = tone === "navy" ? "text-white/95" : "text-primary"
  const iconCls = tone === "navy" ? "text-sky" : "text-primary"
  const sepCls =
    tone === "navy" ? "bg-white/20" : "bg-primary/20"
  return (
    <div className={cn("flex flex-wrap items-center gap-x-3 gap-y-2", className)}>
      {items.map((label, i) => (
        <React.Fragment key={label}>
          {i > 0 && <span className={cn("h-3.5 w-px", sepCls)} aria-hidden />}
          <span className={cn("inline-flex items-center gap-1.5 text-sm font-semibold leading-none tracking-[0.01em]", textCls)}>
            <ShieldCheck className={cn("size-4", iconCls)} strokeWidth={2.25} />
            <span>{label}</span>
          </span>
        </React.Fragment>
      ))}
    </div>
  )
}

/* ==============================================================
   HERO
   ============================================================== */

function Hero() {
  const openModal = useOpenModal()
  const adoptionItems = [
    {
      icon: Smartphone,
      title: "Padres sin app obligatoria",
      body: "Recogen con una clave personal. La app es opcional.",
    },
    {
      icon: GraduationCap,
      title: "Tres pasos que el maestro entiende en minutos",
      body: "Busca la clave, confirma al alumno y registra la entrega.",
    },
  ]

  const trustItems = [
    {
      icon: ShieldCheck,
      title: "Evidencia consultable",
      body: "Hora, tutor autorizado y personal que entregó, listo para consulta.",
    },
    {
      icon: FileText,
      title: "Contrato y confidencialidad",
      body: "Antes de datos reales, servicio y confidencialidad quedan por escrito.",
    },
    {
      icon: Clock,
      title: "15 días acompañados",
      body: "Activación guiada para validar valor operativo sin permanencia forzosa.",
    },
  ]

  return (
    <section id="top" className="relative isolate overflow-hidden bg-[#F4F8FC] pt-28 pb-16 md:pt-32 md:pb-24">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#EAF3FC_0%,#F6FAFD_58%,#FFFFFF_100%)]" />
        <div className="absolute inset-x-0 top-0 h-[66%] bg-grid opacity-[0.12] mask-fade-edges" />
        {/* glow azul detrás del mockup derecho */}
        <div className="absolute right-[-5%] top-[5%] h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.30),transparent_70%)]" />
      </div>

      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial="visible"
          animate="visible"
          variants={containerFade}
          className="grid items-start gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14"
        >
          <div className="min-w-0 text-center lg:text-left">
            <motion.div variants={itemRise} className="flex items-center justify-center gap-1.5 lg:justify-start">
              <span className="relative flex size-2 items-center justify-center">
                <span className="absolute inline-flex size-2 animate-pulse-dot rounded-full bg-[#10B981]/50" />
                <span className="relative inline-flex size-1.5 rounded-full bg-[#10B981]" />
              </span>
              <span className="text-[12px] font-semibold text-[#4B5563]">
                Ciclo 2026-2027 · Cierre de activaciones en julio · Reabre 2027
              </span>
            </motion.div>

            <motion.div variants={itemRise} className="mt-4">
              <span className="inline-flex items-center rounded-full border border-white/80 bg-white px-4 py-1.5 text-[14px] font-semibold text-[#173E75] shadow-sm">
                Salida escolar + exposición legal
              </span>
            </motion.div>

            <motion.h1
              variants={itemRise}
              className="mx-auto mt-7 max-w-[340px] break-words text-[1.95rem] font-extrabold leading-[1.08] tracking-[-0.02em] text-[#173E75] sm:max-w-3xl sm:text-balance sm:text-[3rem] md:text-[3.75rem] lg:mx-0"
            >
              El colegio sabe quién entra.{" "}
              <span className="text-[#2EB4E9]">No tiene evidencia</span> de
              quién se llevó a cada alumno.
            </motion.h1>

            <motion.p
              variants={itemRise}
              className="mx-auto mt-6 max-w-[340px] text-[16px] font-normal leading-[1.6] text-[#4B5563] sm:max-w-[640px] sm:text-balance md:text-[18px] lg:mx-0 lg:text-left"
            >
              El sistema que reemplaza los grupos de WhatsApp de la salida con
              un <span className="font-semibold text-[#173E75]">registro digital</span>:
              quién recogió a cada alumno, cuándo y con qué autorización.{" "}
              <span className="font-semibold text-[#173E75]">Constancia</span> ante
              cualquier reclamo, accidente o solicitud formal.
            </motion.p>

            <motion.div
              variants={itemRise}
              className="mx-auto mt-8 flex w-full max-w-[340px] flex-col items-center gap-3 sm:max-w-none lg:mx-0 lg:items-start"
            >
              <div className="flex w-full flex-col items-stretch justify-center gap-3 sm:w-auto sm:flex-row sm:items-center">
                <button
                  type="button"
                  onClick={openModal}
                  className="group inline-flex w-full shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-[#173E75] px-6 py-3 text-[16px] font-semibold text-white shadow-sm transition-colors duration-150 hover:bg-[#0F2A4F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2EB4E9] focus-visible:ring-offset-2 sm:w-auto"
                >
                  {CALL_CTA_FULL_LABEL}
                  <ArrowRight className="size-5 flex-shrink-0 transition-transform group-hover:translate-x-0.5" />
                </button>
                <a
                  href={DIAGNOSTIC_CTA_HREF}
                  className="group inline-flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-[#D1D5DB] bg-white/90 px-5 py-3 text-[16px] font-semibold text-[#173E75] shadow-sm transition-colors duration-150 hover:border-[#2EB4E9] hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2EB4E9] focus-visible:ring-offset-2 sm:w-auto"
                >
                  {DIAGNOSTIC_CTA_LABEL}
                  <ArrowRight className="size-5 flex-shrink-0 transition-transform group-hover:translate-x-0.5" />
                </a>
              </div>
              <p className="text-[14px] leading-[1.5] text-[#6B7280]">
                {CALL_CTA_MICROCOPY}
              </p>
            </motion.div>

            <motion.div variants={itemRise} className="mx-auto mt-7 w-full max-w-[340px] sm:max-w-[650px] lg:mx-0">
              <div className="grid gap-2.5 rounded-[18px] border border-white/80 bg-white/55 p-2.5 shadow-[0_16px_36px_rgba(15,42,79,0.06)] backdrop-blur sm:grid-cols-2">
              {adoptionItems.map((item) => {
                const Icon = item.icon
                return (
                  <div
                    key={item.title}
                    className="flex items-start gap-3 rounded-[14px] px-3 py-2.5 text-left"
                  >
                    <span className="flex size-9 flex-shrink-0 items-center justify-center rounded-[10px] bg-[#EEF4FA] text-[#173E75]">
                      <Icon className="size-5" strokeWidth={1.9} />
                    </span>
                    <div>
                      <p className="text-[14px] font-bold leading-snug text-[#173E75]">
                        {item.title}
                      </p>
                      <p className="mt-0.5 text-[14px] leading-[1.45] text-[#6B7280]">
                        {item.body}
                      </p>
                    </div>
                  </div>
                )
              })}
              </div>
            </motion.div>

            <motion.div variants={itemRise} className="mt-7 flex justify-center lg:justify-start">
              <LegalCredentials
                items={["SEP", "LFPDPPP", "Derechos ARCO", "CCF Art. 1920"]}
                className="max-w-[340px] justify-center sm:max-w-full lg:justify-start"
              />
            </motion.div>
          </div>

          <motion.div variants={itemRise} className="relative mx-auto w-full max-w-[340px] min-w-0 sm:max-w-none lg:pt-24">
            <div className="relative overflow-hidden rounded-[22px] border border-white/80 bg-white/60 p-3 shadow-[0_24px_60px_rgba(15,42,79,0.10)] ring-1 ring-black/[0.03] backdrop-blur">
              <div className="relative aspect-[16/10] overflow-hidden rounded-[14px] border border-[#DDE7F2] bg-[#EEF4FA]">
                <Image
                  src="/promotions/Macbook Dashboard 1.png"
                  alt="Dashboard Ekole con registro de alumnos en espera, entregados y urgentes"
                  fill
                  priority
                  className="origin-center -translate-y-[2.5%] scale-[1.045] object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 600px"
                />
              </div>
              <div className="grid gap-2 border-t border-[#DDE7F2]/80 bg-white/80 px-4 py-4 sm:grid-cols-3">
                {[
                  "Padres sin app",
                  "3 pasos simples",
                  "Entrega registrada",
                ].map((label) => (
                  <div key={label} className="flex items-center gap-2 text-[13px] font-semibold text-[#173E75]">
                    <Check className="size-4 flex-shrink-0 text-[#10B981]" />
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </div>
            <p className="mt-4 text-center text-[14px] leading-[1.5] text-[#6B7280]">
              El producto debe dejar un historial consultable, no solo acelerar la fila.
            </p>
          </motion.div>
        </motion.div>

        {/* benefits strip */}
        <Reveal delay={0.2}>
          <div className="mx-auto mt-12 max-w-5xl rounded-[20px] border border-white/80 bg-white/55 p-3 shadow-[0_18px_44px_rgba(15,42,79,0.08)] backdrop-blur-md">
            <div className="grid gap-2 md:grid-cols-3">
            {trustItems.map((item) => {
              const Icon = item.icon
              return (
                <div key={item.title} className="rounded-[14px] px-4 py-3">
                  <div className="flex items-start gap-3">
                    <span className="flex size-10 flex-shrink-0 items-center justify-center rounded-[10px] bg-[#EEF4FA] text-[#173E75]">
                      <Icon className="size-5" />
                    </span>
                    <div>
                      <p className="text-[16px] font-bold leading-snug text-[#173E75]">{item.title}</p>
                      <p className="mt-1 text-[14px] leading-[1.5] text-[#6B7280]">{item.body}</p>
                    </div>
                  </div>
                </div>
              )
            })}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ==============================================================
   SOCIAL PROOF — ecosistema + cumplimiento
   ============================================================== */

function SocialProof() {
  return (
    <section className="border-t border-[#E5E7EB] bg-white py-5 md:py-6">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center gap-4 md:flex-row md:items-start md:justify-center md:gap-0">

          {/* Grupo 1 — Ecosistema */}
          <div className="flex flex-col items-center gap-3">
            <span className="text-[10px] font-bold uppercase tracking-[1.4px] text-[#C4CDD6]">
              Desarrollado en ecosistema
            </span>
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
              <Image
                src="/logos/tec-monterrey.svg"
                alt="Tec de Monterrey"
                width={120}
                height={52}
                className="h-[52px] w-auto object-contain grayscale opacity-55 transition-all duration-300 hover:grayscale-0 hover:opacity-100"
              />
              <Image
                src="/logos/iberoamericana.svg"
                alt="Universidad Iberoamericana"
                width={120}
                height={52}
                className="h-[52px] w-auto object-contain grayscale opacity-55 transition-all duration-300 hover:grayscale-0 hover:opacity-100"
              />
            </div>
          </div>

          {/* Separador vertical */}
          <div className="hidden h-14 w-px flex-shrink-0 self-center bg-[#E5E7EB] md:mx-10 md:block" />
          {/* Separador horizontal en mobile */}
          <div className="h-px w-24 bg-[#E5E7EB] md:hidden" />

          {/* Grupo 2 — Normativo */}
          <div className="flex flex-col items-center gap-3">
            <span className="text-[10px] font-bold uppercase tracking-[1.4px] text-[#C4CDD6]">
              Cumplimiento normativo
            </span>
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
              <Image
                src="/logos/cnep.svg"
                alt="CNEP — Confederación Nacional de Escuelas Particulares"
                width={46}
                height={53}
                className="h-[52px] w-auto object-contain opacity-70 transition-opacity duration-300 hover:opacity-100"
              />
              <Image
                src="/logos/fimpes.svg"
                alt="FIMPES — Federación de Instituciones Mexicanas Particulares de Educación Superior"
                width={52}
                height={52}
                className="h-[52px] w-auto object-contain opacity-70 transition-opacity duration-300 hover:opacity-100"
              />
              <Image
                src="/logos/sep.svg"
                alt="SEP — Secretaría de Educación Pública"
                width={95}
                height={52}
                className="h-[52px] w-auto object-contain opacity-70 transition-opacity duration-300 hover:opacity-100"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

/* ==============================================================
   PROBLEMA + COSTO SILENCIOSO
   ============================================================== */

function Problema() {
  return (
    <section id="problema" className="relative overflow-hidden bg-white py-24 md:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white to-transparent" />
      {/* glow sutil sky detrás del headline */}
      <div aria-hidden className="pointer-events-none absolute left-[-10%] top-1/2 -z-10 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(46,180,233,0.22),transparent_70%)]" />
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-[13px] font-bold uppercase tracking-[1.2px] text-[#6B7280]">
              Por qué importa
            </p>
            <h2 className="mt-4 max-w-[620px] text-balance text-[2.35rem] font-extrabold leading-[1.12] tracking-[-0.01em] text-[#111827] sm:text-[3rem]">
              El problema no aparece en la fila. Aparece cuando piden{" "}
              <span className="text-[#2EB4E9]">evidencia.</span>
            </h2>
            <p className="mt-6 max-w-[620px] text-[18px] font-normal leading-[1.6] text-[#4B5563]">
              Bocina, WhatsApp y memoria pueden funcionar en un día normal. Pero si mañana hay
              un reclamo, accidente o solicitud formal, el colegio necesita responder con hechos.
            </p>
          </div>

          <div className="rounded-[24px] border border-[#DDEAF5] bg-[#F4F8FC] p-5 shadow-[0_24px_60px_rgba(15,42,79,0.08)] md:p-7">
            <div className="rounded-[18px] border border-white/80 bg-white/75 p-5 shadow-[0_4px_24px_rgba(15,23,42,0.06)] backdrop-blur">
              <p className="text-[13px] font-bold uppercase tracking-[1.2px] text-[#6B7280]">
                Pregunta crítica
              </p>
              <p className="mt-3 text-balance text-[1.65rem] font-extrabold leading-[1.15] text-[#173E75] md:text-[2rem]">
                ¿Quién recogió al alumno, quién lo autorizó y a qué hora?
              </p>
              <div className="mt-5 grid gap-2 sm:grid-cols-3">
                {["Autorización", "Entrega", "Hora"].map((item) => (
                  <div key={item} className="rounded-[12px] border border-[#DDEAF5] bg-white px-4 py-3 shadow-[0_4px_24px_rgba(15,23,42,0.06)]">
                    <p className="text-[14px] font-bold text-[#173E75]">{item}</p>
                    <p className="mt-1 text-[13px] leading-[1.45] text-[#6B7280]">Debe quedar consultable.</p>
                  </div>
                ))}
              </div>
              <p className="mt-5 rounded-[14px] bg-[#173E75] px-4 py-3 text-[15px] font-semibold leading-[1.5] text-white">
                Lo que no queda documentado, difícilmente se puede acreditar.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ==============================================================
   ESCENARIOS
   ============================================================== */

function Escenarios() {
  const scenarios = [
    {
      icon: Users2,
      label: "Autorización delegada",
      title: "Sale con la familia de un compañero",
      body: "El flujo parece resuelto hasta que la autorización queda repartida entre chats, capturas y memoria del equipo.",
      statusQuo:
        "WhatsApp ayuda a coordinar, pero un mensaje no es un registro controlado por el colegio: puede perder contexto, reenviarse o borrarse.",
      quote: "“¿Quién autorizó que mi hijo se fuera con otra familia?”",
      evidence: ["Tutor autorizado", "Persona que recoge", "Hora de entrega"],
      risk: "Si el adulto que recogió no era el autorizado, el colegio responde por la entrega indebida bajo LFPDPPP.",
    },
    {
      icon: Stethoscope,
      label: "Incidente en puerta",
      title: "Se lastima durante la salida",
      body: "La familia no busca una explicación general. Necesita reconstruir qué pasó, quién intervino y en qué momento.",
      quote: "“¿A qué hora salió? ¿Quién lo entregó? ¿Quién lo autorizó?”",
      evidence: ["Hora exacta", "Responsable de entrega", "Historial consultable"],
      risk: "Sin bitácora, la versión del colegio depende de la memoria — y la confianza de las familias no se reconstruye con explicaciones.",
    },
    {
      icon: FileText,
      label: "Solicitud por escrito",
      title: "Piden historial de recogidas",
      body: "En divorcio o custodia, una solicitud formal puede pedir fechas, personas autorizadas y procedimiento.",
      quote: "“Necesito el historial de entregas y autorizaciones.”",
      evidence: ["Fechas y horarios", "Autorizaciones", "Bitácora exportable"],
      risk: "Sin historial exportable, el colegio no puede acreditar el protocolo que siguió ante un juzgado.",
    },
  ]

  return (
    <section className="relative isolate overflow-hidden bg-[#F1F5F9] py-24 md:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,#F4F8FC_0%,#FFFFFF_45%,#F4F8FC_100%)]" />
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
          <div>
            <p className="text-[13px] font-bold uppercase tracking-[1.2px] text-[#6B7280]">
              Casos que elevan el riesgo
            </p>
            <h2 className="mt-3 max-w-[680px] text-balance text-[2.3rem] font-extrabold leading-[1.15] tracking-[-0.01em] text-[#111827] sm:text-[2.8rem]">
              Tres momentos donde la salida se convierte en{" "}
              <span className="text-[#2EB4E9]">evidencia.</span>
            </h2>
          </div>
          <p className="max-w-[560px] text-[18px] font-normal leading-[1.65] text-[#4B5563] lg:ml-auto">
            No se trata de asustar. Se trata de mostrarle al director en qué momentos una
            salida normal puede exigir prueba, orden y trazabilidad.
          </p>
        </Reveal>

        <div className="mt-11 rounded-[28px] border border-[#DDEAF5] bg-white/[0.78] p-3 shadow-[0_26px_70px_rgba(15,42,79,0.08)] backdrop-blur md:p-4">
          <div className="grid gap-3 lg:grid-cols-3">
            {scenarios.map((s, i) => {
              const Icon = s.icon
              return (
                <Reveal key={s.title} delay={i * 0.1}>
                  <article className="flex h-full flex-col overflow-hidden rounded-[22px] border border-[#DDEAF5] bg-white shadow-[0_4px_24px_rgba(15,23,42,0.06)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_12px_36px_rgba(15,23,42,0.12)]">
                    <div className="border-b border-[#E5E7EB] bg-[linear-gradient(180deg,#F9FBFD_0%,#FFFFFF_100%)] px-5 py-5">
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-[12px] font-bold uppercase tracking-[1.2px] text-[#6B7280]">
                          Caso 0{i + 1}
                        </span>
                        <span className="flex size-11 flex-shrink-0 items-center justify-center rounded-[14px] bg-[#EEF4FA] text-[#173E75]">
                          <Icon className="size-5" strokeWidth={1.9} aria-hidden />
                        </span>
                      </div>
                      <p className="mt-5 text-[13px] font-bold uppercase tracking-[1.2px] text-[#6B7280]">
                        {s.label}
                      </p>
                      <h3 className="mt-2 text-balance text-[1.45rem] font-extrabold leading-[1.15] text-[#111827]">
                        {s.title}
                      </h3>
                    </div>

                    <div className="flex flex-1 flex-col px-5 py-5">
                      <p className="text-[15px] leading-[1.65] text-[#4B5563]">{s.body}</p>

                      {s.statusQuo ? (
                        <div className="mt-4 flex gap-3 rounded-[16px] border border-[#DDEAF5] bg-white px-4 py-3 shadow-[0_4px_24px_rgba(15,23,42,0.06)]">
                          <span className="mt-0.5 flex size-7 flex-shrink-0 items-center justify-center rounded-[10px] bg-[#EEF4FA] text-[#173E75]">
                            <MessageSquare className="size-4" strokeWidth={1.9} aria-hidden />
                          </span>
                          <p className="text-[14px] font-semibold leading-[1.5] text-[#173E75]">
                            {s.statusQuo}
                          </p>
                        </div>
                      ) : null}

                      <div className="mt-5 rounded-[16px] border border-[#DDEAF5] bg-[#F4F8FC] p-4">
                        <p className="text-[12px] font-bold uppercase tracking-[1.1px] text-[#6B7280]">
                          Pregunta crítica
                        </p>
                        <blockquote className="mt-2 text-[16px] font-extrabold leading-snug text-[#173E75]">
                          {s.quote}
                        </blockquote>
                      </div>

                      <div className="mt-5">
                        <p className="text-[12px] font-bold uppercase tracking-[1.1px] text-[#6B7280]">
                          Evidencia que debería existir
                        </p>
                        <div className="mt-3 grid gap-2">
                          {s.evidence.map((item) => (
                            <div key={item} className="flex items-center gap-2 text-[14px] font-semibold text-[#173E75]">
                              <Check className="size-4 flex-shrink-0 text-[#2EB4E9]" strokeWidth={2.2} aria-hidden />
                              {item}
                            </div>
                          ))}
                        </div>
                      </div>

                      <p className="mt-6 border-t border-[#E5E7EB] pt-4 text-[15px] font-semibold leading-[1.5] text-[#173E75]">
                        {s.risk}
                      </p>
                    </div>
                  </article>
                </Reveal>
              )
            })}
          </div>
        </div>

        <Reveal delay={0.3}>
          <div className="mx-auto mt-9 max-w-5xl overflow-hidden rounded-[26px] border border-[#173E75]/15 bg-[#173E75] shadow-[0_28px_70px_rgba(15,42,79,0.14)]">
            <div className="grid lg:grid-cols-[1fr_0.72fr]">
              <div className="relative isolate overflow-hidden bg-[linear-gradient(135deg,#173E75_0%,#0F2A4F_100%)] p-5 text-white md:p-7">
                <div aria-hidden className="absolute inset-y-0 right-0 -z-10 w-1/2 bg-[radial-gradient(circle_at_80%_30%,rgba(94,204,230,0.24),transparent_58%)]" />
                <div className="flex items-center gap-3">
                  <span className="flex size-10 flex-shrink-0 items-center justify-center rounded-[14px] bg-white/10 text-[#5ECCE6]">
                    <ShieldCheck className="size-5" strokeWidth={1.9} aria-hidden />
                  </span>
                  <p className="text-[13px] font-bold uppercase tracking-[1.2px] text-white/70">
                    Siguiente paso
                  </p>
                </div>
                <p className="mt-5 max-w-[620px] text-balance text-[1.75rem] font-extrabold leading-[1.15] md:text-[2.15rem]">
                  Mida si su salida puede sostener una{" "}
                  <span className="text-[#5ECCE6]">solicitud formal.</span>
                </p>
                <p className="mt-4 max-w-[620px] text-[16px] leading-[1.65] text-white/80">
                  Si cualquiera de estos casos le suena familiar, el diagnóstico identifica
                  dónde se pierde evidencia y estima la exposición específica del colegio
                  ante LFPDPPP — en 3 minutos, sin comprar nada.
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {["3 min", "Resultado inmediato", "Confidencial"].map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[13px] font-semibold text-white/90"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-white p-5 md:p-6">
                <p className="text-[13px] font-bold uppercase tracking-[1.2px] text-[#6B7280]">
                  Diagnóstico de exposición legal
                </p>
                <div className="mt-5 grid gap-3">
                  {["Autorizaciones", "Evidencia documental", "Datos bajo control"].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-[14px] font-semibold text-[#173E75]">
                      <Check className="size-4 flex-shrink-0 text-[#2EB4E9]" strokeWidth={2.2} aria-hidden />
                      {item}
                    </div>
                  ))}
                </div>
                <a
                  href={DIAGNOSTIC_CTA_HREF}
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-[12px] bg-[#173E75] px-5 py-3.5 text-[15px] font-semibold text-white shadow-sm transition-colors duration-150 hover:bg-[#0F2A4F] focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[#5ECCE6] focus-visible:ring-offset-2"
                >
                  {DIAGNOSTIC_CTA_LABEL}
                  <ArrowRight className="size-4 flex-shrink-0" />
                </a>
                <p className="mt-3 text-[13px] leading-[1.5] text-[#6B7280]">
                  No requiere instalar nada para obtener el primer resultado.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ==============================================================
   FALSO DILEMA (tabla SIN vs MANUAL vs EKOLE)
   ============================================================== */

/* ==============================================================
   EFECTO EKOLE — comparativo de impacto
   ============================================================== */

function EfectoEkole() {
  const [comparativaAbierta, setComparativaAbierta] = React.useState(false)

  const CLIP  = "M168,152a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h64A8,8,0,0,1,168,152Zm-8-40H96a8,8,0,0,0,0,16h64a8,8,0,0,0,0-16Zm56-64V216a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16V48A16,16,0,0,1,56,32H92.26a47.92,47.92,0,0,1,71.48,0H200A16,16,0,0,1,216,48ZM96,64h64a32,32,0,0,0-64,0ZM200,48H173.25A47.93,47.93,0,0,1,176,64v8a8,8,0,0,1-8,8H88a8,8,0,0,1-8-8V64a47.93,47.93,0,0,1,2.75-16H56V216H200Z"
  const CLOCK = "M232,136.66A104.12,104.12,0,1,1,119.34,24,8,8,0,0,1,120.66,40,88.12,88.12,0,1,0,216,135.34,8,8,0,0,1,232,136.66ZM120,72v56a8,8,0,0,0,8,8h56a8,8,0,0,0,0-16H136V72a8,8,0,0,0-16,0Zm40-24a12,12,0,1,0-12-12A12,12,0,0,0,160,48Zm36,24a12,12,0,1,0-12-12A12,12,0,0,0,196,72Zm24,36a12,12,0,1,0-12-12A12,12,0,0,0,220,108Z"
  const CHECK = "M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm45.66,85.66-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35a8,8,0,0,1,11.32,11.32Z"

  const columns = [
    {
      key: "sin",
      number: "01",
      title: "Sin documentación",
      path: CLOCK,
      headline: "Rápido, pero sin respaldo",
      summary: "La fila avanza, pero la evidencia queda dispersa en memoria, chats o capturas.",
      metrics: [
        { label: "Tiempo", value: "Ágil al inicio" },
        { label: "Registro", value: "Sin evidencia propia" },
        { label: "Flujo", value: "Depende de memoria" },
        { label: "Exposición", value: "Alta ante reclamo" },
      ],
      footer: "El colegio responde con versiones.",
    },
    {
      key: "manual",
      number: "02",
      title: "Documentación manual",
      path: CLIP,
      headline: "Evidencia que frena la puerta",
      summary: "El papel ayuda a documentar, pero cada registro agrega espera y retrabajo.",
      metrics: [
        { label: "Tiempo", value: "1-2 min por alumno" },
        { label: "Registro", value: "Existe, cuesta consultar" },
        { label: "Flujo", value: "Más fricción diaria" },
        { label: "Exposición", value: "Menor, pero lento" },
      ],
      footer: "El respaldo aparece, la salida se cansa.",
    },
    {
      key: "ekole",
      number: "03",
      title: "Con Ekole",
      path: CHECK,
      headline: "Rapidez y evidencia en el mismo flujo",
      summary: "Ekole registra la entrega mientras el equipo opera una salida simple y ágil.",
      metrics: [
        { label: "Tiempo", value: "Salida ágil" },
        { label: "Registro", value: "Historial automático" },
        { label: "Flujo", value: "Tres pasos simples" },
        { label: "Exposición", value: "Evidencia sin frenar" },
      ],
      footer: "El colegio responde con hechos.",
    },
  ] as const

  return (
    <section id="efecto" className="relative isolate overflow-hidden bg-white py-24 md:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,#FFFFFF_0%,#F4F8FC_26%,#F8FBFE_72%,#FFFFFF_100%)]" />
      <div className="mx-auto max-w-6xl px-6">

        <Reveal className="grid gap-6 md:grid-cols-[0.9fr_1fr] md:items-end">
          <div>
            <p className="text-[13px] font-bold uppercase tracking-[1.2px] text-[#6B7280]">
              Efecto Ekole
            </p>
            <h2 className="mt-4 max-w-[640px] text-balance text-[2.35rem] font-extrabold leading-[1.12] text-[#173E75] sm:text-[3rem]">
              El punto crítico no es la fila. Es el control{" "}
              <span className="text-[#2EB4E9]">documentado.</span>
            </h2>
          </div>
          <p className="max-w-[620px] text-[18px] font-normal leading-[1.65] text-[#4B5563] md:pb-2">
            Bajar tiempos importa. El salto real es que cada entrega deja rastro cuando una familia pide una explicación o una solicitud llega por escrito.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-10">
            <EfectoEkoleChart />
          </div>
        </Reveal>

        <Reveal delay={0.25}>
          <div className="mx-auto mt-10 flex max-w-2xl flex-col items-center gap-5 rounded-[20px] border border-[#DCFCE7] bg-[#F0FDF4] px-8 py-6 sm:flex-row sm:gap-0">
            {/* Stat principal */}
            <div className="flex-shrink-0 text-center">
              <p className="text-[3.2rem] font-black leading-none text-[#16A34A]">−70%</p>
              <p className="mt-1 text-[11px] font-bold uppercase tracking-[1.4px] text-[#16A34A]/70">tiempo de espera</p>
            </div>
            <div className="hidden h-12 w-px flex-shrink-0 bg-[#BBF7D0] sm:mx-8 sm:block" />
            <div className="h-px w-16 bg-[#BBF7D0] sm:hidden" />
            {/* Antes → Después */}
            <div className="flex items-center gap-4">
              <div className="text-center">
                <p className="text-[1.6rem] font-black leading-none text-[#DC2626]">~30 min</p>
                <p className="mt-1 text-[11px] font-bold uppercase tracking-[1px] text-[#6B7280]">Sin Ekole</p>
              </div>
              <span className="text-[1.4rem] text-[#9CA3AF]">→</span>
              <div className="text-center">
                <p className="text-[1.6rem] font-black leading-none text-[#16A34A]">~5 min</p>
                <p className="mt-1 text-[11px] font-bold uppercase tracking-[1px] text-[#6B7280]">Con Ekole</p>
              </div>
            </div>
            <div className="hidden h-12 w-px flex-shrink-0 bg-[#BBF7D0] sm:mx-8 sm:block" />
            <div className="h-px w-16 bg-[#BBF7D0] sm:hidden" />
            {/* Tagline */}
            <p className="text-center text-[14px] leading-[1.6] text-[#374151] sm:text-left">
              Mismo colegio.<br className="hidden sm:block" /> Mismas familias.<br className="hidden sm:block" /> Diferente sistema.
            </p>
          </div>
        </Reveal>

        {/* Acordeón — comparativa Sin/Manual/Con Ekole (colapsado por defecto) */}
        <div className="mt-10 flex flex-col items-center">
          <button
            type="button"
            onClick={() => setComparativaAbierta(v => !v)}
            aria-expanded={comparativaAbierta}
            className="inline-flex items-center gap-2 rounded-lg border border-[#DDEAF5] bg-white px-5 py-3 text-[14px] font-semibold text-[#173E75] shadow-sm transition-colors duration-150 hover:border-[#2EB4E9] hover:text-[#2EB4E9] focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[#2EB4E9] focus-visible:ring-offset-2"
          >
            Ver comparativa: Sin documentación · Manual · Con Ekole
            <ChevronDown className={cn("size-4 transition-transform duration-300", comparativaAbierta && "rotate-180")} />
          </button>

          <div
            className={cn(
              "grid w-full overflow-hidden transition-all duration-300 ease-in-out",
              comparativaAbierta ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
            )}
          >
            <div className="min-h-0">
              <div className="mx-auto mt-8 grid gap-4 md:grid-cols-3">
                {columns.map((col) => {
                  const isEkole = col.key === "ekole"
                  return (
                    <div
                      key={col.key}
                      className={cn(
                        "relative flex h-full flex-col overflow-hidden rounded-[26px] border p-5 shadow-[0_24px_62px_rgba(15,42,79,0.08)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_32px_72px_rgba(15,42,79,0.14)]",
                        isEkole
                          ? "border-[#5ECCE6]/30 bg-[#173E75] text-white ring-1 ring-[#5ECCE6]/30"
                          : "border-[#DDEAF5] bg-white"
                      )}
                    >
                      {isEkole ? (
                        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-[radial-gradient(circle_at_72%_15%,rgba(94,204,230,0.28),transparent_62%)]" />
                      ) : null}
                      <div className="relative flex items-start justify-between gap-4">
                        <div>
                          <p className={cn("text-[12px] font-bold uppercase tracking-[1.2px]", isEkole ? "text-white/60" : "text-[#6B7280]")}>
                            Opción {col.number}
                          </p>
                          <h3 className={cn("mt-2 text-[1.35rem] font-extrabold leading-tight", isEkole ? "text-white" : "text-[#111827]")}>
                            {col.title}
                          </h3>
                        </div>
                        <span className={cn("flex size-16 flex-shrink-0 items-center justify-center rounded-[20px]", isEkole ? "bg-white/10 text-[#5ECCE6]" : "bg-[#EEF4FA] text-[#173E75]")}>
                          <svg viewBox="0 0 256 256" fill="currentColor" className="size-9" aria-hidden>
                            <path d={col.path} />
                          </svg>
                        </span>
                      </div>
                      <p className={cn("relative mt-5 text-[1.35rem] font-extrabold leading-[1.18]", isEkole ? "text-[#5ECCE6]" : "text-[#173E75]")}>
                        {col.headline}
                      </p>
                      <p className={cn("relative mt-3 text-[15px] leading-[1.6]", isEkole ? "text-white/80" : "text-[#4B5563]")}>
                        {col.summary}
                      </p>
                      <div className={cn("relative mt-5 flex flex-1 flex-col divide-y", isEkole ? "divide-white/15" : "divide-[#E5E7EB]")}>
                        {col.metrics.map((metric) => (
                          <div key={metric.label} className="grid grid-cols-[0.72fr_1fr] gap-3 py-3">
                            <span className={cn("text-[12px] font-bold uppercase tracking-[1px]", isEkole ? "text-white/60" : "text-[#6B7280]")}>
                              {metric.label}
                            </span>
                            <span className={cn("text-[15px] font-bold leading-[1.35]", isEkole ? "text-white" : "text-[#173E75]")}>
                              {metric.value}
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className={cn("relative mt-4 rounded-[16px] px-4 py-3 text-[15px] font-extrabold leading-[1.45]", isEkole ? "bg-white text-[#173E75]" : "bg-[#F4F8FC] text-[#4B5563]")}>
                        {col.footer}
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="mx-auto mt-8 max-w-3xl rounded-[24px] border border-[#DDEAF5] bg-white/80 p-6 text-center shadow-[0_18px_44px_rgba(15,42,79,0.06)] backdrop-blur">
                <p className="text-balance text-[1.65rem] font-extrabold leading-tight text-[#173E75] md:text-[2rem]">
                  Ekole es la tercera vía: rapidez para la familia y trazabilidad para el colegio.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ==============================================================
   DIAGNÓSTICO
   ============================================================== */

function Diagnostico() {
  const bullets = [
    "Dependencia de WhatsApp, listas, bocina o memoria del personal.",
    "Evidencia disponible sobre quién recogió, quién autorizó y a qué hora.",
    "Brechas que conviene revisar antes de un reclamo formal.",
  ]

  const previewRows = [
    { label: "Autorización", value: "Revisar trazabilidad" },
    { label: "Identidad del tutor", value: "Validar evidencia" },
    { label: "Historial consultable", value: "Fortalecer registro" },
  ]

  return (
    <section id="diagnostico" className="relative isolate overflow-hidden bg-[#F1F5F9] py-24 md:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,#FFFFFF_0%,#F4F8FC_54%,#FFFFFF_100%)]" />
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="grid gap-10 overflow-hidden rounded-[28px] border border-[#DDEAF5] bg-white/80 p-5 shadow-[0_28px_70px_rgba(15,42,79,0.10)] backdrop-blur md:p-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div className="px-1 py-2 md:px-2">
              <p className="text-[13px] font-bold uppercase tracking-[1.2px] text-[#6B7280]">
                Diagnóstico de exposición legal
              </p>
              <h2 className="mt-4 max-w-[640px] text-balance text-[2.35rem] font-extrabold leading-[1.12] tracking-[-0.01em] text-[#111827] sm:text-[3rem]">
                Antes de comprar, vea si su salida sostiene una{" "}
                <span className="text-[#2EB4E9]">solicitud formal.</span>
              </h2>
              <p className="mt-6 max-w-[620px] text-[18px] font-normal leading-[1.6] text-[#4B5563]">
                En pocos minutos, el director identifica si su proceso actual puede responder ante
                registros solicitados por escrito, un reclamo familiar o un caso de custodia.
              </p>

              <ul className="mt-7 grid gap-3">
                {bullets.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 flex size-6 flex-shrink-0 items-center justify-center rounded-full bg-[#E7F7EE] text-[#10B981]">
                      <Check className="size-4" strokeWidth={2.4} />
                    </span>
                    <span className="text-[16px] leading-[1.55] text-[#4B5563]">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href={DIAGNOSTIC_CTA_HREF}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#173E75] px-6 py-3.5 text-[16px] font-semibold text-white shadow-md transition-colors duration-150 hover:bg-[#0F2A4F] focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[#5ECCE6] focus-visible:ring-offset-2"
                >
                  {DIAGNOSTIC_CTA_LABEL}
                  <ArrowRight className="size-5 flex-shrink-0" />
                </a>
                <p className="text-[14px] leading-[1.5] text-[#6B7280]">
                  {DIAGNOSTIC_CTA_MICROCOPY}
                </p>
              </div>
            </div>

            <div className="rounded-[24px] border border-[#DDEAF5] bg-[#F4F8FC] p-4 shadow-inner md:p-5">
              <div className="overflow-hidden rounded-[20px] border border-white/80 bg-white shadow-[0_20px_50px_rgba(15,42,79,0.10)]">
                <div className="border-b border-[#E5E7EB] px-5 py-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-[13px] font-bold uppercase tracking-[1px] text-[#6B7280]">
                        Vista previa
                      </p>
                      <p className="mt-1 text-[18px] font-bold text-[#173E75]">
                        Resultado del diagnóstico
                      </p>
                    </div>
                    <span className="rounded-full bg-[#EEF4FA] px-3 py-1 text-[12px] font-bold text-[#173E75]">
                      Confidencial
                    </span>
                  </div>
                </div>

                <div className="px-5 py-5">
                  <div className="rounded-[16px] bg-[#173E75] p-5 text-white">
                    <p className="text-[13px] font-semibold uppercase tracking-[1px] text-white/70">
                      Lectura ejecutiva
                    </p>
                    <p className="mt-3 text-balance text-[1.65rem] font-extrabold leading-[1.12]">
                      Brechas documentales antes de un reclamo.
                    </p>
                    <p className="mt-3 text-[14px] leading-[1.55] text-white/80">
                      El resultado orienta prioridades; no sustituye asesoría jurídica.
                    </p>
                  </div>

                  <div className="mt-4 space-y-2.5">
                    {previewRows.map((row) => (
                      <div key={row.label} className="flex flex-col gap-1.5 rounded-[14px] border border-[#E5E7EB] bg-white px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                        <div className="flex items-center gap-3">
                          <span className="flex size-8 flex-shrink-0 items-center justify-center rounded-[10px] bg-[#EEF4FA] text-[#173E75]">
                            <ShieldCheck className="size-4" />
                          </span>
                          <p className="text-[14px] font-bold text-[#111827]">{row.label}</p>
                        </div>
                        <p className="pl-11 text-[13px] font-semibold text-[#6B7280] sm:pl-0 sm:text-right">{row.value}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 flex items-start gap-2 rounded-[14px] bg-[#F9FAFB] px-4 py-3">
                    <Lock className="mt-0.5 size-4 flex-shrink-0 text-[#173E75]" />
                    <p className="text-[13px] leading-[1.5] text-[#6B7280]">
                      Sus respuestas son confidenciales. No almacenamos datos de su colegio sin permiso explícito.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ==============================================================
   FLUJO DE PUERTA — demo animada QR → confirmación → registro
   ============================================================== */

const QR_GRID = [
  1,1,1,0,1,1,
  1,0,1,0,0,1,
  1,1,1,1,0,0,
  0,1,0,1,1,1,
  1,0,1,0,1,0,
  1,1,0,1,0,1,
]

export function FlujoPuertaDemo() {
  const openModal = useOpenModal()
  const [phase, setPhase] = React.useState<"clave" | "confirm" | "result">("clave")
  const [digits, setDigits] = React.useState<string>("")

  // Ciclo principal de fases
  React.useEffect(() => {
    const durations: Record<string, number> = { clave: 2700, confirm: 2200, result: 3400 }
    const next: Record<string, "clave" | "confirm" | "result"> = {
      clave: "confirm",
      confirm: "result",
      result: "clave",
    }
    const id = setTimeout(() => setPhase(next[phase]), durations[phase])
    return () => clearTimeout(id)
  }, [phase])

  // Animación de escritura de los 3 dígitos
  React.useEffect(() => {
    if (phase !== "clave") { setDigits(""); return }
    setDigits("")
    const t1 = setTimeout(() => setDigits("0"),    700)
    const t2 = setTimeout(() => setDigits("07"),  1300)
    const t3 = setTimeout(() => setDigits("072"), 1900)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [phase])

  return (
    <div className="px-4 pb-2 pt-0 md:px-6">
      <p className="mb-5 text-center text-[12px] font-bold uppercase tracking-[1.4px] text-[#6B7280]">
        Demo interactiva · Flujo de puerta en vivo
      </p>

      <div className="mx-auto w-full max-w-[360px]">
        {/* Cuerpo del dispositivo */}
        <div className="overflow-hidden rounded-[20px] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.55)] ring-[5px] ring-[#1A1A1E]">
          {/* Barra de la app */}
          <div className="flex items-center justify-between bg-[#173E75] px-4 py-2.5">
            <span className="text-[12px] font-bold text-white">Ekole · Puerta Principal</span>
            <span className="text-[12px] font-semibold text-white/60">13:45</span>
          </div>

          {/* Área de contenido animado */}
          <div className="relative h-[256px] overflow-hidden">
            <AnimatePresence mode="wait">

              {/* — FASE 1: Clave de recogida — */}
              {phase === "clave" && (
                <motion.div
                  key="clave"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-white px-6"
                >
                  <div className="text-center">
                    <p className="text-[13px] font-bold text-[#173E75]">Clave de recogida</p>
                    <p className="mt-0.5 text-[12px] text-[#9CA3AF]">Ingrese los 3 dígitos del tutor</p>
                  </div>

                  {/* Los 3 cuadros de dígito */}
                  <div className="flex gap-3">
                    {[0, 1, 2].map((i) => {
                      const filled = digits[i] !== undefined
                      const active = digits.length === i
                      return (
                        <div
                          key={i}
                          className={cn(
                            "relative flex size-[52px] items-center justify-center rounded-[12px] border-2 text-[22px] font-bold transition-all duration-200",
                            filled
                              ? "border-[#173E75] bg-[#EEF4FA] text-[#173E75]"
                              : active
                              ? "border-[#2EB4E9] bg-white text-transparent"
                              : "border-[#E5E7EB] bg-[#F9FAFB] text-transparent",
                          )}
                        >
                          {filled ? digits[i] : null}
                          {/* Cursor parpadeante en el cuadro activo */}
                          {active && (
                            <motion.div
                              className="absolute h-[20px] w-[2px] rounded-full bg-[#2EB4E9]"
                              animate={{ opacity: [1, 0, 1] }}
                              transition={{ duration: 0.9, repeat: Infinity }}
                            />
                          )}
                        </div>
                      )
                    })}
                  </div>

                  {/* Botón Buscar — se ilumina y es clickeable cuando están los 3 dígitos */}
                  <motion.button
                    onClick={() => digits.length === 3 && setPhase("confirm")}
                    animate={{
                      opacity: digits.length === 3 ? 1 : 0.35,
                      scale:   digits.length === 3 ? 1 : 0.97,
                    }}
                    transition={{ duration: 0.25 }}
                    className={cn(
                      "w-full rounded-[10px] bg-[#173E75] py-2.5 text-center text-[13px] font-bold text-white",
                      digits.length === 3 ? "cursor-pointer" : "cursor-default",
                    )}
                  >
                    Buscar alumno
                  </motion.button>

                  {/* Alternativa QR */}
                  <p className="text-[12px] text-[#9CA3AF]">
                    o escanee el código QR del tutor
                  </p>
                </motion.div>
              )}

              {/* — FASE 2: Confirmación verde — */}
              {phase === "confirm" && (
                <motion.div
                  key="confirm"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.03 }}
                  transition={{ duration: 0.25 }}
                  className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-white"
                >
                  <div className="relative flex items-center justify-center">
                    {/* Anillo pulsante */}
                    <motion.div
                      className="absolute size-28 rounded-full bg-[#10B981]/12"
                      animate={{ scale: [1, 1.6, 1], opacity: [0.8, 0, 0.8] }}
                      transition={{ duration: 1.1, repeat: Infinity }}
                    />
                    {/* Círculo verde */}
                    <motion.div
                      className="relative flex size-[62px] items-center justify-center rounded-full bg-[#10B981]"
                      initial={{ scale: 0, rotate: -20 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", bounce: 0.55, delay: 0.1 }}
                    >
                      <svg viewBox="0 0 24 24" className="size-8" fill="none" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
                        <motion.path
                          d="M5 13l4 4L19 7"
                          stroke="white"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.4, delay: 0.3 }}
                        />
                      </svg>
                    </motion.div>
                  </div>
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-center"
                  >
                    <p className="text-[16px] font-bold text-[#111827]">Tutor autorizado</p>
                    <p className="mt-0.5 text-[12px] text-[#6B7280]">Validando alumno…</p>
                  </motion.div>
                </motion.div>
              )}

              {/* — FASE 3: Nombre + hora — */}
              {phase === "result" && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 flex flex-col justify-center gap-3 bg-[#F8FBFE] px-4"
                >
                  {/* Banner verde */}
                  <div className="flex items-center gap-2 rounded-[10px] bg-[#ECFDF5] px-3 py-2 ring-1 ring-[#10B981]/20">
                    <div className="flex size-5 flex-shrink-0 items-center justify-center rounded-full bg-[#10B981]">
                      <Check className="size-3 text-white" strokeWidth={3} />
                    </div>
                    <span className="text-[12px] font-bold text-[#065F46]">
                      Entrega registrada · 13:45:22
                    </span>
                  </div>
                  {/* Tarjeta del alumno */}
                  <div className="rounded-[14px] bg-white px-4 py-3.5 shadow-[0_2px_12px_rgba(0,0,0,0.07)] ring-1 ring-[#E5E7EB]">
                    <div className="flex items-center gap-3">
                      <div className="flex size-10 flex-shrink-0 items-center justify-center rounded-full bg-[#EEF4FA] text-[15px] font-bold text-[#173E75]">
                        S
                      </div>
                      <div>
                        <p className="text-[14px] font-bold text-[#111827]">Sofía Ramírez Torres</p>
                        <p className="text-[12px] text-[#6B7280]">3ro B · Primaria</p>
                      </div>
                    </div>
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      <div className="rounded-[8px] bg-[#F4F8FC] px-3 py-2">
                        <p className="text-[10px] text-[#9CA3AF]">Recoge</p>
                        <p className="text-[12px] font-semibold text-[#374151]">María Torres</p>
                      </div>
                      <div className="rounded-[8px] bg-[#F4F8FC] px-3 py-2">
                        <p className="text-[10px] text-[#9CA3AF]">Confirmó</p>
                        <p className="text-[12px] font-semibold text-[#374151]">Mtra. Lucía</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </div>

        {/* Indicadores de fase (clic para saltar) */}
        <div className="mt-4 flex justify-center gap-2">
          {(["clave", "confirm", "result"] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPhase(p)}
              aria-label={`Ver fase ${p}`}
              className={cn(
                "h-[5px] rounded-full transition-all duration-300",
                phase === p ? "w-[20px] bg-[#2EB4E9]" : "w-[5px] bg-[#CBD5E1]",
              )}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

/* ==============================================================
   SOLUCIÓN (explicación compacta + walkthrough visual)
   ============================================================== */

function Solucion() {
  const openModal = useOpenModal()
  const solutionCards = [
    {
      icon: KeyRound,
      title: "Clave personal de recogida",
      body: "Cada tutor autorizado recibe una clave única. Al recoger, Ekole registra quién recibió al alumno, a qué hora y bajo qué autorización.",
    },
    {
      icon: ClipboardCheck,
      title: "Tres pasos que el maestro entiende en minutos",
      body: "Busca la clave, confirma al alumno y registra la entrega. Sin pasos extra ni configuración compleja en puerta.",
    },
    {
      icon: Smartphone,
      title: "Los padres no necesitan app",
      body: "La app mejora la experiencia, pero no es requisito para operar. El colegio puede documentar la entrega desde el primer flujo.",
    },
  ]

  const proofItems = [
    { label: "Alumno", value: "Nombre y grado" },
    { label: "Hora exacta", value: "Timestamp automático" },
    { label: "Tutor autorizado", value: "Quién recogió" },
    { label: "Personal que confirmó", value: "Registro de quien entregó" },
  ]

  return (
    <section id="solucion" className="relative isolate overflow-hidden bg-white py-24 md:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,#FFFFFF_0%,#F4F8FC_48%,#FFFFFF_100%)]" />
      {/* glow cyan-azul detrás de feature cards */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-1/3 -z-10 mx-auto h-[500px] w-[900px] rounded-full bg-[radial-gradient(ellipse,rgba(46,180,233,0.22),transparent_70%)]" />
      <div className="mx-auto max-w-6xl px-6">

        {/* Encabezado */}
        <Reveal className="grid gap-6 md:grid-cols-[0.92fr_1fr] md:items-end">
          <div>
            <p className="text-[13px] font-bold uppercase tracking-[1.2px] text-[#6B7280]">
              La solución
            </p>
            <h2 className="mt-4 max-w-[660px] text-balance text-[2.35rem] font-extrabold leading-[1.12] text-[#173E75] sm:text-[3rem]">
              Ekole agiliza la salida y deja cada entrega{" "}
              <span className="text-[#2EB4E9]">documentada.</span>
            </h2>
          </div>
          <p className="max-w-[620px] text-[18px] font-normal leading-[1.65] text-[#4B5563] md:pb-2">
            El flujo se mantiene simple para puerta y maestros, mientras el colegio gana un historial consultable cuando necesita explicar qué pasó.
          </p>
        </Reveal>

        {/* Visual protagonista — dashboard animado */}
        <Reveal delay={0.1}>
          <div className="mt-10">
            <EkoleDashboardMockup />
          </div>
        </Reveal>

        {/* B) Tarjetas con borde de acento */}
        <Reveal delay={0.15}>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {solutionCards.map((card) => {
              const Icon = card.icon
              return (
                <div
                  key={card.title}
                  className="flex h-full flex-col overflow-hidden rounded-[24px] border border-white/70 bg-white/75 shadow-[0_18px_44px_rgba(15,42,79,0.07)] backdrop-blur-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_28px_60px_rgba(15,42,79,0.14)]"
                >
                  <div className="h-[3px] w-full bg-gradient-to-r from-[#173E75] via-[#2EB4E9] to-[#5ECCE6]" />
                  <div className="flex flex-1 gap-4 p-5 md:flex-col md:p-6">
                    <div className="flex size-11 flex-shrink-0 items-center justify-center rounded-[14px] bg-[#EEF4FA] text-[#173E75] md:size-12">
                      <Icon className="size-6" strokeWidth={1.8} aria-hidden />
                    </div>
                    <div>
                      <h3 className="text-[18px] font-bold leading-snug text-[#173E75] md:text-[20px]">
                        {card.title}
                      </h3>
                      <p className="mt-2 text-[15px] leading-[1.6] text-[#4B5563] md:text-[16px]">
                        {card.body}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </Reveal>

        {/* C) Banda — qué queda documentado */}
        <Reveal delay={0.22}>
          <div className="mt-6 overflow-hidden rounded-[20px] border border-[#DDEAF5] bg-[#F8FBFE]">
            <div className="px-5 py-3 md:px-6">
              <p className="text-[11px] font-bold uppercase tracking-[1.4px] text-[#6B7280]">
                Qué queda registrado en cada entrega
              </p>
            </div>
            <div className="grid divide-y divide-[#EEF4FA] border-t border-[#DDEAF5] sm:grid-cols-2 sm:divide-x sm:divide-y-0 md:grid-cols-4 md:divide-x md:divide-y-0">
              {proofItems.map((item) => (
                <div key={item.label} className="flex items-center gap-3 px-5 py-3.5 md:px-6">
                  <span className="flex size-6 flex-shrink-0 items-center justify-center rounded-md bg-[#E7F7EE] text-[#10B981]">
                    <Check className="size-3.5" strokeWidth={2.5} />
                  </span>
                  <div>
                    <p className="text-[13px] font-bold text-[#173E75]">{item.label}</p>
                    <p className="text-[12px] text-[#6B7280]">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* CTA */}
        <Reveal delay={0.35}>
          <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-[24px] border border-[#DDEAF5] bg-[#F8FBFE] p-5 text-center shadow-[0_18px_44px_rgba(15,42,79,0.06)] md:flex-row md:text-left">
            <div>
              <p className="text-[18px] font-bold leading-snug text-[#173E75]">
                ¿Quiere ver este flujo aplicado a su colegio?
              </p>
              <p className="mt-1 text-[14px] leading-[1.5] text-[#6B7280]">
                {CALL_CTA_MICROCOPY}
              </p>
              <p className="mt-1.5 text-[13px] leading-[1.5] text-[#6B7280]">
                Suscripción mensual accesible. Sin costo de instalación. Sin permanencia.
              </p>
              <a
                href="/como-funciona"
                className="mt-2 inline-flex items-center gap-1 text-[13px] font-semibold text-[#2EB4E9] hover:underline"
              >
                Ver flujo completo paso a paso →
              </a>
            </div>
            <button
              type="button"
              onClick={openModal}
              className="inline-flex flex-shrink-0 items-center justify-center gap-2.5 rounded-lg bg-[#173E75] px-6 py-3.5 text-[16px] font-semibold text-white shadow-md transition-colors duration-150 hover:bg-[#0F2A4F] focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[#5ECCE6] focus-visible:ring-offset-2"
            >
              {CALL_CTA_FULL_LABEL}
              <ArrowRight className="size-5 flex-shrink-0" />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ==============================================================
   CÓMO FUNCIONA — timeline 01 · 02 · 03
   ============================================================== */

function ComoFunciona() {
  const openModal = useOpenModal()
  const steps = [
    {
      icon: MessageSquare,
      num: "01",
      title: "Llamada de 20 min",
      body: "Entendemos puertas, horarios, alumnos, tutores y dónde hoy se pierde control documental.",
    },
    {
      icon: FileText,
      num: "02",
      title: "Configuración con datos listos",
      body: "Cargamos alumnos, tutores autorizados, personal y reglas básicas para operar sin fricción.",
    },
    {
      icon: ShieldCheck,
      num: "03",
      title: "Salida documentada desde el día uno",
      body: "Su equipo opera con clave, registro automático e historial consultable para dirección.",
    },
  ]

  const adoptionPoints = [
    "Configuración inicial con los datos del colegio.",
    "Ajustes al flujo real de puerta y horarios.",
    "Acompañamiento mientras el equipo adopta el proceso.",
  ]

  return (
    <section id="como-funciona" className="relative isolate overflow-hidden bg-[#F1F5F9] py-24 md:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,#FFFFFF_0%,#F4F8FC_44%,#F9FAFB_100%)]" />
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="grid gap-6 md:grid-cols-[0.92fr_1fr] md:items-end">
          <div>
            <p className="text-[13px] font-bold uppercase tracking-[1.2px] text-[#6B7280]">
              Implementación acompañada
            </p>
            <h2 className="mt-4 max-w-[660px] text-balance text-[2.35rem] font-extrabold leading-[1.12] text-[#173E75] sm:text-[3rem]">
              De primera llamada a salida documentada sin cargar{" "}
              <span className="text-[#2EB4E9]">al equipo.</span>
            </h2>
          </div>
          <p className="max-w-[620px] text-[18px] font-normal leading-[1.65] text-[#4B5563] md:pb-2">
            Ekole no entra como un proyecto largo. Se configura con datos básicos, se valida en operación real y se acompaña la adopción de puerta.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal delay={0.1}>
            <div className="relative overflow-hidden rounded-[28px] bg-[#173E75] p-6 text-white shadow-[0_28px_70px_rgba(15,42,79,0.18)] md:p-8">
              <div aria-hidden className="absolute inset-x-0 top-0 h-1 bg-[#5ECCE6]" />
              <p className="text-[13px] font-bold uppercase tracking-[1.2px] text-white/70">
                Acompañamiento de adopción
              </p>
              <h3 className="mt-4 max-w-[520px] text-balance text-[2rem] font-extrabold leading-[1.12] md:text-[2.4rem]">
                Primeros 15 días por cuenta de{" "}
                <span className="text-[#5ECCE6]">Ekole.</span>
              </h3>
              <p className="mt-5 max-w-[560px] text-[16px] leading-[1.65] text-white/80">
                Un periodo para validar valor operativo, ajustar detalles de puerta y acompañar al equipo sin permanencia forzosa.
              </p>

              <div className="mt-7 space-y-3">
                {adoptionPoints.map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <span className="mt-0.5 flex size-6 flex-shrink-0 items-center justify-center rounded-full bg-white/10 text-[#5ECCE6]">
                      <Check className="size-4" strokeWidth={2.4} />
                    </span>
                    <p className="text-[15px] leading-[1.55] text-white/90">{point}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <button
                  type="button"
                  onClick={openModal}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-6 py-3.5 text-[16px] font-semibold text-[#173E75] shadow-md transition-colors duration-150 hover:bg-[#EEF4FA] focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[#5ECCE6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#173E75]"
                >
                  {CALL_CTA_FULL_LABEL}
                  <ArrowRight className="size-5 flex-shrink-0" />
                </button>
                <p className="text-[14px] leading-[1.5] text-white/70">
                  {CALL_CTA_MICROCOPY}
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="rounded-[28px] border border-[#DDEAF5] bg-white/90 p-5 shadow-[0_24px_60px_rgba(15,42,79,0.09)] backdrop-blur md:p-6">
              <div className="flex items-start justify-between gap-4 border-b border-[#E5E7EB] pb-5">
                <div>
                  <p className="text-[13px] font-bold uppercase tracking-[1.2px] text-[#6B7280]">
                    Ruta de activación
                  </p>
                  <h3 className="mt-2 text-[1.45rem] font-extrabold leading-tight text-[#173E75]">
                    Rápido para empezar. Claro para dirección.
                  </h3>
                </div>
                <span className="hidden rounded-full bg-[#EEF4FA] px-3 py-1 text-[12px] font-bold text-[#173E75] sm:inline-flex">
                  3 pasos
                </span>
              </div>

              <div className="divide-y divide-[#E5E7EB]">
                {steps.map((step) => {
                  const Icon = step.icon
                  return (
                    <div key={step.num} className="grid gap-4 py-5 sm:grid-cols-[64px_1fr]">
                      <div className="flex items-center gap-3 sm:block">
                        <div className="flex size-12 items-center justify-center rounded-[16px] bg-[#EEF4FA] text-[#173E75]">
                          <Icon className="size-6" strokeWidth={1.8} aria-hidden />
                        </div>
                        <span className="text-[13px] font-extrabold tracking-[1px] text-[#2EB4E9] sm:mt-3 sm:block">
                          {step.num}
                        </span>
                      </div>
                      <div>
                        <h4 className="text-[18px] font-bold leading-snug text-[#111827]">
                          {step.title}
                        </h4>
                        <p className="mt-2 text-[15px] leading-[1.6] text-[#4B5563] md:text-[16px]">
                          {step.body}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="mt-2 rounded-[18px] bg-[#F4F8FC] px-4 py-4">
                <p className="text-[15px] font-semibold leading-[1.55] text-[#173E75]">
                  Resultado: una salida operable, historial consultable y equipo acompañado mientras adopta el proceso.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ==============================================================
   STATS BLOCK — 3 números clave de impacto operativo
   Reemplaza Testimonios hasta tener testimonios reales de clientes.
   Cuando existan quotes reales, insertar sección Testimonios aquí.
   ============================================================== */

function StatsBlock() {
  const stats = [
    { value: "4.5 min", label: "tiempo de salida", sub: "antes: 30 min" },
    { value: "3 pasos", label: "el equipo entiende", sub: "en minutos" },
    { value: "Día 1", label: "salida documentada", sub: "desde el inicio" },
  ]

  return (
    <section className="bg-[#173E75] py-10 md:py-14">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-3 divide-x divide-white/15">
          {stats.map((stat) => (
            <div key={stat.value} className="flex flex-col items-center gap-1 px-4 text-center md:px-10">
              <p className="text-[2.2rem] font-black leading-none text-[#2EB4E9] md:text-[3.5rem]">
                {stat.value}
              </p>
              <p className="mt-1.5 text-[13px] font-semibold text-white md:text-[15px]">
                {stat.label}
              </p>
              <p className="text-[11px] text-white/55 md:text-[12px]">
                {stat.sub}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-5 text-center text-[11px] text-white/40">
          Basado en operación real de salida con registro manual vs. Ekole
        </p>
      </div>
    </section>
  )
}

/* ==============================================================
   CONFIANZA — contrato, confidencialidad y datos
   ============================================================== */

function ConfianzaDatos() {
  const trustItems = [
    {
      icon: FileText,
      title: "Contrato de servicios y confidencialidad",
      body: "Servicio, alcance y confidencialidad quedan definidos antes de operar con información real.",
    },
    {
      icon: Lock,
      title: "Datos personales bajo control",
      body: "La información pertenece al colegio y se usa solo para configurar y operar el servicio autorizado.",
    },
    {
      icon: ShieldCheck,
      title: "Sin permanencia forzosa",
      body: "El acuerdo protege datos; no amarra al colegio. Si no aporta valor en 15 días, puede detenerse sin costo.",
    },
  ]

  const credentials = ["SEP", "LFPDPPP", "Derechos ARCO", "CCF Art. 1920"]

  return (
    <section id="confianza" className="relative isolate scroll-mt-28 overflow-hidden bg-white py-16 md:py-24 lg:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,#F9FAFB_0%,#FFFFFF_45%,#F4F8FC_100%)]" />
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="grid gap-5 overflow-hidden rounded-[30px] border border-[#DDEAF5] bg-white/90 p-5 shadow-[0_28px_70px_rgba(15,42,79,0.10)] backdrop-blur md:gap-8 md:p-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-stretch">
            <div className="flex flex-col justify-between gap-5 px-1 py-2 md:gap-8">
              <div>
                <p className="text-[13px] font-bold uppercase tracking-[1.2px] text-[#6B7280]">
                  Confianza antes de operar
                </p>
                <h2 className="mt-4 max-w-[620px] text-balance text-[1.85rem] font-extrabold leading-[1.12] text-[#111827] sm:text-[2.35rem] md:text-[3rem]">
                  Antes de compartir datos, todo queda{" "}
                  <span className="text-[#2EB4E9]">por escrito.</span>
                </h2>
                <p className="mt-4 max-w-[620px] text-[16px] leading-[1.65] text-[#4B5563] md:mt-6 md:text-[18px]">
                  Ekole está pensado para que el director pueda avanzar sin sentir que expone la información del colegio.
                </p>
              </div>

              <div>
                <p className="text-[13px] font-bold uppercase tracking-[1.2px] text-[#6B7280]">
                  Referencias legales
                </p>
                <div className="mt-4 flex flex-wrap gap-x-5 gap-y-3 md:flex-nowrap md:items-center md:divide-x md:divide-[#D1D5DB]">
                  {credentials.map((label) => (
                    <div key={label} className="flex items-center gap-2 md:px-4 md:first:pl-0">
                      <ShieldCheck className="size-4 flex-shrink-0 text-[#173E75]" strokeWidth={1.9} aria-hidden />
                      <span className="text-[14px] font-semibold text-[#173E75]">{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-[26px] bg-[#F4F8FC] p-4 shadow-inner md:p-5">
              <div className="overflow-hidden rounded-[22px] border border-white/80 bg-white shadow-[0_20px_50px_rgba(15,42,79,0.10)]">
                <div className="bg-[#173E75] px-5 py-3 text-white md:py-5">
                  <p className="text-[13px] font-bold uppercase tracking-[1.2px] text-white/70">
                    Control documental
                  </p>
                  <p className="mt-2 text-balance text-[1.6rem] font-extrabold leading-[1.15]">
                    Avanzar sin improvisar el manejo de datos.
                  </p>
                </div>

                <div className="divide-y divide-[#E5E7EB]">
                  {trustItems.map((item) => {
                    const Icon = item.icon
                    return (
                      <div key={item.title} className="flex items-start gap-4 px-5 py-3 md:py-4">
                        <div className="flex size-11 flex-shrink-0 items-center justify-center rounded-[16px] bg-[#EEF4FA] text-[#173E75]">
                          <Icon className="size-5" strokeWidth={1.8} aria-hidden />
                        </div>
                        <div>
                          <h3 className="text-[16px] font-bold leading-snug text-[#173E75] md:text-[18px]">
                            {item.title}
                          </h3>
                          <p className="mt-1.5 text-[14px] leading-[1.6] text-[#4B5563] md:text-[15px]">
                            {item.body}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>

                <div className="border-t border-[#E5E7EB] bg-[#F9FAFB] px-5 py-3 md:py-4">
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 flex size-7 flex-shrink-0 items-center justify-center rounded-full bg-[#E7F7EE] text-[#10B981]">
                      <Check className="size-4" strokeWidth={2.4} />
                    </span>
                    <p className="text-[14px] font-semibold leading-[1.55] text-[#173E75]">
                      El objetivo es proteger la información del colegio antes, durante y después de la activación.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ==============================================================
   FAQ
   ============================================================== */

function FAQItem({ q, a, defaultOpen = false }: { q: string; a: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = React.useState(defaultOpen)
  return (
    <div className={cn(
      "overflow-hidden rounded-[20px] border border-[#DDEAF5] transition-all duration-200",
      open ? "bg-white shadow-[0_18px_44px_rgba(15,42,79,0.07)]" : "bg-white/80 shadow-sm",
    )}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left md:px-6"
        aria-expanded={open}
      >
        <span className="text-[16px] font-bold leading-snug text-[#111827] md:text-[18px]">{q}</span>
        <span className={cn(
          "flex size-8 flex-shrink-0 items-center justify-center rounded-full transition-colors duration-200",
          open ? "bg-[#EEF4FA] text-[#173E75]" : "bg-[#F9FAFB] text-[#6B7280]",
        )}>
          <ChevronDown
            className={cn("size-4 transition-transform duration-300", open && "rotate-180")}
          />
        </span>
      </button>
      <div
        className={cn(
          "grid overflow-hidden transition-all duration-300 ease-in-out",
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="min-h-0">
          <div className="px-5 pb-5 text-[15px] leading-[1.65] text-[#4B5563] md:px-6 md:pb-6 md:text-[16px]">{a}</div>
        </div>
      </div>
    </div>
  )
}

function FAQ() {
  const faqs = [
    {
      q: "¿En qué se diferencia de otros sistemas escolares?",
      a: "Otros gestionan lo de DENTRO (calificaciones, asistencia, cobro). Ekole cubre el momento que el padre VIVE todos los días: la salida. No reemplazamos su sistema — lo complementamos donde ningún otro llega.",
    },
    {
      q: "¿Firmamos algo antes de compartir datos del colegio?",
      a: "Sí. Antes de operar con información real, formalizamos el servicio y la confidencialidad por escrito. El contrato define el alcance, quién accede a los datos y bajo qué condiciones. El objetivo es que el director pueda avanzar sin sentir que expone la información del colegio.",
    },
    {
      q: "¿Los datos están seguros?",
      a: "Sí. Antes de operar con información real, formalizamos el servicio y la confidencialidad por escrito para proteger datos de alumnos, tutores autorizados y personal. Los datos se resguardan bajo reglas claras de uso, acceso y responsabilidad, alineadas con la LFPDPPP. El colegio conserva la propiedad de su información.",
    },
    {
      q: "¿Cuánto cuesta Ekole?",
      a: "Depende del tamaño del colegio y del flujo de salida, pero Ekole está pensado como una suscripción accesible, no como un proyecto caro de implementación. En la revisión de 20 minutos le decimos qué plan aplica, qué incluye y cómo se compara contra el costo de operar una salida lenta o sin evidencia. No hay costo de instalación, contrato forzoso ni riesgo inicial: los primeros 15 días van por cuenta de Ekole.",
    },
    {
      q: "¿Qué tan fácil es implementarlo?",
      a: "Cuando el colegio comparte los datos necesarios — alumnos, tutores autorizados, personal y flujo de puertas — podemos avanzar muy rápido en la configuración inicial. La activación se acompaña hasta 15 días para que el equipo opere con clave de recogida, registro automático e historial consultable sin sentirse solo.",
    },
    {
      q: "¿Los padres necesitan descargar una app?",
      a: (
        <>
          <p>
            No. Cada tutor autorizado recibe una clave de recogida personal. Al llegar, la proporciona y
            listo — igual de simple que dar un número de pedido en una ventanilla.
          </p>
          <p className="mt-3">
            Para las familias que con el tiempo quieran una experiencia completamente automática, existe una
            app opcional con detección por geocerca y encriptación extremo a extremo. Pero esto es un extra
            para quien lo quiera — el sistema base funciona igual de bien con la clave.
          </p>
        </>
      ),
    },
    {
      q: "¿Y si mi equipo o los padres necesitan tiempo para adaptarse?",
      a: "Es normal. Por eso los primeros 15 días van por cuenta de Ekole y los acompañamos paso a paso. El flujo base son tres pasos que el maestro entiende en minutos: buscar clave, confirmar alumno y registrar entrega. Las familias pueden recoger con clave sin descargar app. Si su colegio necesita avanzar por etapas, lo hacemos juntos.",
    },
    {
      q: "¿Qué pasa si no me convence?",
      a: "No hay contrato forzoso de permanencia. Sí existe un contrato de servicios y confidencialidad para proteger la información del colegio, pero si Ekole no le aporta valor operativo durante los primeros 15 días, puede detener la activación sin costo.",
    },
    {
      q: "¿Hay contrato de permanencia forzosa?",
      a: "No. El contrato de servicios y confidencialidad protege los datos del colegio, pero no amarra la relación. Si Ekole no aporta valor operativo durante los primeros 15 días, puede detener la activación sin costo adicional.",
    },
    {
      q: "¿El registro de salidas tiene validez como evidencia?",
      a: "Cada salida se documenta con fecha, hora, tutor autorizado, personal receptor y timestamp automático: elementos que ayudan a sustentar un argumento de supervisión. Es evidencia documental para respaldar diligencia operativa. Como toda evidencia, recomendamos integrarla a su estrategia de respaldo junto con su equipo legal.",
    },
    {
      q: "¿Qué pasa con los datos si decidimos no continuar?",
      a: "Los datos pertenecen al colegio y se usan únicamente para configurar y operar el servicio autorizado. Si decide no continuar, se acuerda el proceso de eliminación o entrega de la información conforme a lo pactado por escrito desde el inicio.",
    },
  ]

  return (
    <section id="preguntas" className="relative isolate overflow-hidden bg-[#F1F5F9] py-24 md:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,#F4F8FC_0%,#FFFFFF_50%,#F4F8FC_100%)]" />
      <div className="mx-auto grid max-w-6xl gap-8 px-6 lg:grid-cols-[0.86fr_1.14fr] lg:items-start">
        <Reveal className="lg:sticky lg:top-28">
          <p className="text-[13px] font-bold uppercase tracking-[1.2px] text-[#6B7280]">
            Preguntas frecuentes
          </p>
          <h2 className="mt-4 max-w-[560px] text-balance text-[2.35rem] font-extrabold leading-[1.12] text-[#111827] sm:text-[3rem]">
            Preguntas que ayudan a decidir con{" "}
            <span className="text-[#2EB4E9]">control.</span>
          </h2>
          <p className="mt-6 max-w-[520px] text-[18px] leading-[1.65] text-[#4B5563]">
            Respuestas directas sobre costo, adopción, familias, datos y evidencia documental antes de agendar una llamada.
          </p>

          <div className="mt-8 rounded-[24px] border border-[#DDEAF5] bg-white/80 p-5 shadow-[0_18px_44px_rgba(15,42,79,0.06)] backdrop-blur">
            <p className="text-[15px] font-bold leading-snug text-[#173E75]">
              Lo importante antes de avanzar
            </p>
            <div className="mt-4 grid gap-3">
              {["Costo claro en la llamada", "15 días por cuenta de Ekole", "Datos bajo acuerdo escrito"].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 flex size-6 flex-shrink-0 items-center justify-center rounded-full bg-[#E7F7EE] text-[#10B981]">
                    <Check className="size-4" strokeWidth={2.4} />
                  </span>
                  <span className="text-[14px] font-semibold leading-[1.5] text-[#4B5563]">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="flex flex-col gap-3">
          {faqs.map((f, i) => (
            <Reveal key={f.q} delay={i * 0.04}>
              <FAQItem q={f.q} a={f.a} defaultOpen={i === 0} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ==============================================================
   CTA FINAL
   ============================================================== */

function CTAFinal() {
  const openModal = useOpenModal()
  const callPoints = [
    "Dónde se pierde evidencia hoy.",
    "Qué brechas conviene cerrar primero.",
    "Cómo activar Ekole sin cargar al equipo.",
  ]

  return (
    <section id="cta" className="relative isolate overflow-hidden bg-[#173E75] py-20 md:py-28">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,#173E75_0%,#0F2A4F_100%)]" />
      {/* glow que envuelve el área del botón CTA */}
      <div aria-hidden className="pointer-events-none absolute bottom-[-10%] right-[-5%] -z-10 h-[450px] w-[550px] rounded-full bg-[radial-gradient(circle,rgba(94,204,230,0.40),transparent_70%)]" />
      <div className="relative mx-auto grid max-w-6xl gap-8 px-6 lg:grid-cols-[1fr_0.82fr] lg:items-center">
        <Reveal>
          <p className="text-[13px] font-bold uppercase tracking-[1.2px] text-white/70">
            Revisión ejecutiva
          </p>
          <h2 className="mt-4 max-w-[700px] text-balance text-[2.35rem] font-extrabold leading-[1.12] text-white sm:text-[3rem]">
            ¿Cuánto vale la certeza de que{" "}
            <span className="text-[#5ECCE6]">ningún alumno</span> salió con la
            persona equivocada?
          </h2>
          <p className="mt-6 max-w-[640px] text-[18px] font-normal leading-[1.65] text-white/80">
            En 20 minutos revisamos dónde el colegio está expuesto hoy y qué tan rápido podría operar Ekole con sus datos.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={openModal}
              className="group inline-flex items-center justify-center gap-2 rounded-lg bg-white px-6 py-3.5 text-[16px] font-semibold text-[#173E75] shadow-md transition-colors duration-150 hover:bg-[#EEF4FA] focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[#5ECCE6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#173E75]"
            >
              {CALL_CTA_FULL_LABEL}
              <ArrowRight className="size-5 flex-shrink-0 transition-transform group-hover:translate-x-0.5" />
            </button>
            <a
              href={DIAGNOSTIC_CTA_HREF}
              className="inline-flex items-center justify-center rounded-lg border border-white/30 px-6 py-3.5 text-[16px] font-semibold text-white transition-colors duration-150 hover:border-white/55 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[#5ECCE6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#173E75]"
            >
              {DIAGNOSTIC_CTA_LABEL}
            </a>
          </div>
          <p className="mt-4 text-[14px] leading-[1.5] text-white/70">
            {CALL_CTA_MICROCOPY}
          </p>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="rounded-[28px] border border-white/15 bg-white/10 p-5 shadow-[0_28px_70px_rgba(0,0,0,0.18)] backdrop-blur md:p-6">
            <div className="rounded-[22px] bg-white p-5 text-[#173E75] md:p-6">
              <p className="text-[13px] font-bold uppercase tracking-[1.2px] text-[#6B7280]">
                En la llamada revisamos
              </p>
              <div className="mt-5 grid gap-3">
                {callPoints.map((point) => (
                  <div key={point} className="flex items-start gap-3 rounded-[14px] bg-[#F4F8FC] px-4 py-3">
                    <span className="mt-0.5 flex size-6 flex-shrink-0 items-center justify-center rounded-full bg-[#E7F7EE] text-[#10B981]">
                      <Check className="size-4" strokeWidth={2.4} />
                    </span>
                    <span className="text-[15px] font-semibold leading-[1.5] text-[#173E75]">{point}</span>
                  </div>
                ))}
              </div>
              <div className="mt-5 rounded-[16px] border border-[#DDEAF5] px-4 py-3">
                <p className="text-[14px] leading-[1.55] text-[#4B5563]">
                  Si aún no está listo para hablar, el diagnóstico ayuda a medir exposición legal primero.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ==============================================================
   FOOTER
   ============================================================== */

export function Footer() {
  const productLinks = [
    { label: "Por qué importa", href: "/#problema" },
    { label: "Diagnóstico", href: DIAGNOSTIC_CTA_HREF },
    { label: "Solución", href: "/#solucion" },
    { label: "Preguntas", href: "/#preguntas" },
  ]

  const contactLinks = [
    { label: CALL_CTA_LABEL, href: CALL_CTA_HREF },
    { label: DIAGNOSTIC_CTA_SHORT_LABEL, href: DIAGNOSTIC_CTA_HREF },
    { label: "Aviso de Privacidad", href: "/aviso-privacidad" },
    { label: "Términos y condiciones", href: "https://www.ekole.app/terms-and-conditions" },
  ]

  return (
    <footer className="relative overflow-hidden bg-[#0F2A4F] text-white">
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#5ECCE6]/40 to-transparent" />
      <div className="mx-auto max-w-6xl px-6 py-14 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.08fr_1fr] lg:items-start">
          <div>
            <div className="inline-flex rounded-[18px] bg-white p-1.5 shadow-sm ring-1 ring-white/10">
              <Logo className="[&_img]:h-11 [&_img]:rounded-[14px]" />
            </div>
            <p className="mt-6 max-w-xl text-[15px] leading-[1.7] text-white/70">
              Ekole ayuda a colegios privados a operar salidas escolares con rapidez, control y
              evidencia documental. La meta es simple: que el director tenga claridad antes de que una
              entrega se vuelva una conversación difícil.
            </p>

            <div className="mt-7 grid gap-3 text-[14px] font-semibold text-white/90 sm:grid-cols-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="size-4 text-[#5ECCE6]" aria-hidden />
                Evidencia
              </div>
              <div className="flex items-center gap-2">
                <Clock className="size-4 text-[#5ECCE6]" aria-hidden />
                Rapidez
              </div>
              <div className="flex items-center gap-2">
                <Lock className="size-4 text-[#5ECCE6]" aria-hidden />
                Datos bajo control
              </div>
            </div>
          </div>

          <nav className="grid gap-8 sm:grid-cols-2" aria-label="Footer">
            <div>
              <h3 className="text-[13px] font-bold uppercase tracking-[1.2px] text-white/50">Producto</h3>
              <ul className="mt-4 space-y-3 text-[14px] font-medium text-white/70">
                {productLinks.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="transition-colors hover:text-[#5ECCE6]">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-[13px] font-bold uppercase tracking-[1.2px] text-white/50">Contacto y legal</h3>
              <ul className="mt-4 space-y-3 text-[14px] font-medium text-white/70">
                {contactLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      {...(link.href.startsWith("https://") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="transition-colors hover:text-[#5ECCE6]"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>

        {/* legal notice */}
        <div className="mt-12 rounded-[16px] border border-white/10 bg-white/[0.04] px-5 py-4 text-[12px] leading-[1.6] text-white/60">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 flex size-5 flex-shrink-0 items-center justify-center rounded-full border border-white/20 text-[10px] font-semibold text-white/70">
              i
            </span>
            <p>
              <strong className="font-semibold text-white/80">Aviso legal.</strong> La información legal presentada en
              esta página — incluyendo referencias al Art. 1920 del Código Civil Federal, la Ley Federal de
              Protección de Datos Personales en Posesión de los Particulares (LFPDPPP) y los deberes de
              custodia escolar — es orientativa y tiene fines informativos. No constituye asesoría jurídica
              ni sustituye la consulta con un abogado especializado. Para aplicar estos conceptos a su caso
              concreto, recomendamos consultar con su equipo legal.
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-7 text-[12px] md:flex-row md:items-center">
          <div className="text-white/50">© {new Date().getFullYear()} Ekole. Todos los derechos reservados.</div>
          <div className="flex items-center gap-1.5 font-semibold text-[#5ECCE6]">
            <span className="relative flex size-2 items-center justify-center">
              <span className="absolute inline-flex size-2 animate-pulse-dot rounded-full bg-[#5ECCE6]/50" />
              <span className="relative inline-flex size-1.5 rounded-full bg-[#5ECCE6]" />
            </span>
            Activaciones abiertas · ciclo 2026-2027
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ==============================================================
   PAGE COMPOSITION
   ============================================================== */

export default function SoftwareDevelopmentWebsite() {
  const [modalOpen, setModalOpen] = React.useState(false)
  const openModal = React.useCallback(() => setModalOpen(true), [])

  return (
    <ModalContext.Provider value={openModal}>
      <WhatsappLeadModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        whatsappHref={CALL_CTA_HREF}
      />
      <HeroHeader />
      <main className="overflow-hidden">
        <Hero />
        <SocialProof />
        <Problema />
        <Escenarios />
        <StatsBlock />
        <Diagnostico />
        <EfectoEkole />
        <Solucion />
        <ComoFunciona />
        <FAQ />
        <CTAFinal />
      </main>
      <Footer />
    </ModalContext.Provider>
  )
}
