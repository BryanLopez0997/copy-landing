"use client"

import * as React from "react"
import Image from "next/image"
import { motion, type Variants } from "framer-motion"
import {
  ArrowRight,
  Check,
  ChevronDown,
  Clock,
  FileText,
  Lock,
  Menu,
  MessageSquare,
  ShieldCheck,
  Stethoscope,
  Users2,
  X,
  Zap,
} from "lucide-react"
import { EfectoEkoleChart } from "./efecto-ekole-chart"

/* ==============================================================
   TODO: reemplazar por el link real de agenda cuando exista.
   Opciones futuras: Calendly (https://calendly.com/...), WhatsApp
   (https://wa.me/52...?text=...) o página /demo con formulario.
   Hoy apunta a /diagnostico como fallback para no dejar botones
   muertos (href="#") ni bucles de scroll.
   ============================================================== */
const DEMO_CTA_HREF = "/diagnostico"

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
  { name: "El efecto", href: "/#efecto" },
  { name: "La solución", href: "/#solucion" },
  { name: "Preguntas", href: "/#preguntas" },
]

export function HeroHeader() {
  const [open, setOpen] = React.useState(false)
  const [scrolled, setScrolled] = React.useState(false)

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
            <a
              href={DEMO_CTA_HREF}
              className="hidden items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition-all duration-150 hover:-translate-y-[1px] hover:bg-primary-dark hover:shadow-md active:translate-y-px active:shadow-sm focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-sky focus-visible:ring-offset-2 lg:inline-flex"
            >
              Agendar revisión
              <ArrowRight className="size-3.5" />
            </a>
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
                <a
                  href="/#cta"
                  onClick={() => setOpen(false)}
                  className="mt-1 block rounded-lg bg-primary px-3 py-2 text-center font-medium text-primary-foreground"
                >
                  Agendar revisión
                </a>
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
        "group inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/20 ring-1 ring-primary/30 transition-all duration-150 hover:-translate-y-[1px] hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/35 active:translate-y-px active:shadow-sm focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-sky focus-visible:ring-offset-2 md:text-base",
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
        "inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background/60 px-6 py-3 text-sm font-medium text-foreground/90 transition-all duration-150 hover:-translate-y-[1px] hover:border-primary/60 hover:bg-primary/[0.06] hover:text-primary hover:shadow-sm active:translate-y-px active:bg-primary/[0.12] active:shadow-none focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-sky focus-visible:ring-offset-2 md:text-base",
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
  return (
    <section id="top" className="relative overflow-hidden bg-[#F9FAFB] pt-28 pb-20 md:pt-36 md:pb-28">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid opacity-[0.08] mask-fade-edges" />
      </div>

      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerFade}
          className="flex flex-col items-center text-center"
        >
          <motion.div variants={itemRise}>
            <span className="inline-flex items-center rounded-full border border-[#E5E7EB] bg-white px-4 py-1.5 text-[14px] font-semibold text-[#173E75]">
              Software de salida escolar · Ciclo 2026-2027
            </span>
          </motion.div>

          <motion.h1
            variants={itemRise}
            className="mt-8 max-w-4xl text-balance text-[2.375rem] font-extrabold leading-[1.05] tracking-[-0.02em] text-[#173E75] sm:text-[3rem] md:text-[4rem]"
          >
            Salida escolar{" "}
            <span className="text-[#2EB4E9]">más rápida</span>.{" "}
            Con registro automático de cada entrega.
          </motion.h1>

          <motion.p
            variants={itemRise}
            className="mt-6 max-w-[680px] text-balance text-[17px] font-normal leading-[1.6] text-[#4B5563] md:text-[18px]"
          >
            Olvídese de las filas, la bocina y los grupos de WhatsApp.{" "}
            Ekole agiliza la salida y{" "}
            <strong className="font-semibold text-[#1F2937]">registra cada entrega automáticamente</strong>,{" "}
            sin que las familias descarguen una app.
          </motion.p>

          {/* Dashboard preview */}
          <motion.div
            variants={itemRise}
            className="relative mt-12 w-full max-w-5xl"
          >
            <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-primary/10 ring-1 ring-black/[0.04] md:rounded-3xl">
              <Image
                src="/promotions/Macbook Dashboard 1.png"
                alt="Dashboard Ekole en MacBook: visibilidad total de cada salida en tiempo real"
                width={2400}
                height={1500}
                priority
                className="h-auto w-full"
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1024px"
              />
            </div>
            <p className="mt-4 text-center text-xs italic text-muted-foreground md:text-sm">
              Dashboard Ekole: visibilidad total de cada salida en tiempo real.
            </p>
          </motion.div>

          <motion.div
            variants={itemRise}
            className="mt-10 flex flex-col items-center gap-2"
          >
            <a
              href={DEMO_CTA_HREF}
              className="group inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#173E75] px-6 py-3 text-[16px] font-semibold text-white shadow-sm transition-colors duration-150 hover:bg-[#0F2A4F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2EB4E9] focus-visible:ring-offset-2 sm:w-auto"
            >
              Agendar revisión de salida de 20 min
              <ArrowRight className="size-5 flex-shrink-0 transition-transform group-hover:translate-x-0.5" />
            </a>
            <p className="text-[14px] leading-[1.5] text-[#6B7280]">
              Por videollamada · Sin compromiso · Revisamos su proceso de salida
            </p>
          </motion.div>
        </motion.div>

        {/* benefits strip */}
        <Reveal delay={0.2}>
          <div className="mx-auto mt-12 max-w-3xl space-y-4">
            {/* Fila 1 — Beneficios funcionales */}
            <div className="overflow-hidden rounded-[12px] border border-[#E5E7EB] bg-white shadow-sm">
              <div className="grid grid-cols-1 divide-y divide-[#D1D5DB] md:grid-cols-3 md:divide-x md:divide-y-0">
                <div className="flex items-center gap-2.5 px-5 py-4">
                  <svg viewBox="0 0 256 256" fill="currentColor" className="size-5 flex-shrink-0 text-[#173E75]" aria-hidden>
                    <path d="M232,136.66A104.12,104.12,0,1,1,119.34,24,8,8,0,0,1,120.66,40,88.12,88.12,0,1,0,216,135.34,8,8,0,0,1,232,136.66ZM120,72v56a8,8,0,0,0,8,8h56a8,8,0,0,0,0-16H136V72a8,8,0,0,0-16,0Zm40-24a12,12,0,1,0-12-12A12,12,0,0,0,160,48Zm36,24a12,12,0,1,0-12-12A12,12,0,0,0,196,72Zm24,36a12,12,0,1,0-12-12A12,12,0,0,0,220,108Z" />
                  </svg>
                  <span className="text-[16px] font-semibold text-[#173E75]">Activo en menos de 24 h</span>
                </div>
                <div className="flex items-center gap-2.5 px-5 py-4">
                  <svg viewBox="0 0 256 256" fill="currentColor" className="size-5 flex-shrink-0 text-[#173E75]" aria-hidden>
                    <path d="M213.92,210.62l-160-176A8,8,0,1,0,42.08,45.38L56,60.69V216a24,24,0,0,0,24,24h96a24,24,0,0,0,23.82-21.11l2.26,2.49a8,8,0,1,0,11.84-10.76ZM184,216a8,8,0,0,1-8,8H80a8,8,0,0,1-8-8V78.29l112,123.2ZM68.7,24a8,8,0,0,1,8-8H176a24,24,0,0,1,24,24V150.83a8,8,0,1,1-16,0V40a8,8,0,0,0-8-8H76.7A8,8,0,0,1,68.7,24Z" />
                  </svg>
                  <span className="text-[16px] font-semibold text-[#173E75]">Sin app para familias</span>
                </div>
                <div className="flex items-center gap-2.5 px-5 py-4">
                  <svg viewBox="0 0 256 256" fill="currentColor" className="size-5 flex-shrink-0 text-[#173E75]" aria-hidden>
                    <path d="M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,51.31,188.69,80H160ZM200,216H56V40h88V88a8,8,0,0,0,8,8h48V216Zm-32-80a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h64A8,8,0,0,1,168,136Zm0,32a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h64A8,8,0,0,1,168,168Z" />
                  </svg>
                  <span className="text-[16px] font-semibold text-[#173E75]">Evidencia ante reclamaciones</span>
                </div>
              </div>
            </div>

            {/* Fila 2 — Legal Credentials */}
            <div className="flex flex-wrap items-center justify-center gap-0 divide-x divide-[#D1D5DB]">
              {[
                "SEP",
                "LFPDPPP",
                "Derechos ARCO",
                "DOF vigente 2025",
              ].map((label) => (
                <div key={label} className="flex items-center gap-1.5 px-4 py-1.5">
                  <svg viewBox="0 0 256 256" fill="currentColor" className="size-4 flex-shrink-0 text-[#173E75]" aria-hidden>
                    <path d="M208,40H48A16,16,0,0,0,32,56v56c0,52.72,25.52,84.67,46.93,102.19,23.06,18.86,46,25.26,47,25.53a8,8,0,0,0,4.2,0c1-.27,23.91-6.67,47-25.53C198.48,196.67,224,164.72,224,112V56A16,16,0,0,0,208,40Zm-34.32,69.66-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35a8,8,0,0,1,11.32,11.32Z" />
                  </svg>
                  <span className="text-[14px] font-semibold text-[#173E75]">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ==============================================================
   PROBLEMA + COSTO SILENCIOSO
   ============================================================== */

function Problema() {
  return (
    <section id="problema" className="relative bg-[#F9FAFB] py-24 md:py-28">
      <div className="mx-auto max-w-4xl px-6">
        <Reveal className="text-center">
          <h2 className="text-balance text-[2.5rem] font-extrabold leading-[1.1] tracking-[-0.01em] text-[#111827] sm:text-[3rem]">
            El problema no es que la salida sea lenta.{" "}
            <span className="text-[#2EB4E9]">Es que opera sin registro.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-[680px] text-balance text-[18px] font-normal leading-[1.6] text-[#4B5563]">
            La mayoría de los colegios ya normalizó una salida con bocina, WhatsApp y memoria.
            Funciona, hasta que un tutor no autorizado se presenta o alguien pregunta:{" "}
            <strong className="font-semibold text-[#1F2937]">"¿quién recogió al alumno y a qué hora?"</strong>
          </p>
          <div className="mx-auto mt-8 max-w-xl rounded-[12px] border border-[#E5E7EB] bg-white px-6 py-4 shadow-sm">
            <p className="text-[16px] font-semibold text-[#111827]">
              Lo que no queda documentado, difícilmente se puede acreditar.
            </p>
          </div>
          <h3 className="mt-10 text-balance text-[2rem] font-extrabold leading-tight text-[#111827]">
            ¿Qué significa eso en la práctica?
          </h3>
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
      iconPath:
        "M244.8,150.4a8,8,0,0,1-11.2-1.6A51.6,51.6,0,0,0,192,128a8,8,0,0,1-7.37-4.89,8,8,0,0,1,0-6.22A8,8,0,0,1,192,112a24,24,0,1,0-23.24-30,8,8,0,1,1-15.5-4A40,40,0,1,1,219,117.51a67.94,67.94,0,0,1,27.43,21.68A8,8,0,0,1,244.8,150.4ZM190.92,212a8,8,0,1,1-13.84,8,57,57,0,0,0-98.16,0,8,8,0,1,1-13.84-8,72.06,72.06,0,0,1,33.74-29.92,48,48,0,1,1,58.36,0A72.06,72.06,0,0,1,190.92,212ZM128,176a32,32,0,1,0-32-32A32,32,0,0,0,128,176ZM72,120a8,8,0,0,0-8-8A24,24,0,1,1,87.24,82a8,8,0,1,0,15.5-4A40,40,0,1,0,37,117.51,67.94,67.94,0,0,0,9.6,139.19a8,8,0,1,0,12.8,9.61A51.6,51.6,0,0,1,64,128,8,8,0,0,0,72,120Z",
      title: "El compañero",
      body: "Un alumno se va con la familia de un compañero. La autorización llegó por WhatsApp, pero no quedó validada en un canal oficial del colegio.",
      quote: "“¿Quién autorizó que mi hijo se fuera con otra familia?”",
      fallout: "Sin registro, el colegio no puede acreditar identidad, autorización ni hora de entrega.",
      closing: "La memoria no alcanza como evidencia.",
    },
    {
      iconPath:
        "M216,56H176V48a24,24,0,0,0-24-24H104A24,24,0,0,0,80,48v8H40A16,16,0,0,0,24,72V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V72A16,16,0,0,0,216,56ZM96,48a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96ZM216,200H40V72H216V200Zm-56-64a8,8,0,0,1-8,8H136v16a8,8,0,0,1-16,0V144H104a8,8,0,0,1,0-16h16V112a8,8,0,0,1,16,0v16h16A8,8,0,0,1,160,136Z",
      title: "El accidente a la salida",
      body: "Un alumno se lastima al salir. El padre no busca explicaciones generales: pide saber exactamente cuándo salió, quién lo entregó y con quién se fue.",
      quote: "“¿A qué hora salió? ¿Quién lo entregó?”",
      fallout: "Sin evidencia, el colegio queda expuesto a responder desde memoria.",
      closing: "El problema empieza cuando no hay constancia.",
    },
    {
      iconPath:
        "M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,51.31,188.69,80H160ZM200,216H56V40h88V88a8,8,0,0,0,8,8h48V216Zm-32-80a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h64A8,8,0,0,1,168,136Zm0,32a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h64A8,8,0,0,1,168,168Z",
      title: "La solicitud formal",
      body: "Un familiar solicita los registros de recogida del último ciclo escolar: quién recogió al alumno, a qué hora y bajo qué autorización.",
      quote: "“Necesito el historial de entregas.”",
      fallout: "Si el colegio no conserva registros, no tiene cómo acreditar el proceso.",
      closing: "No es un ataque. Es un derecho.",
    },
  ]

  return (
    <section className="relative overflow-hidden bg-muted/40 py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mx-auto max-w-[860px] text-center">
          <p className="text-[13px] font-bold uppercase tracking-[1.2px] text-[#6B7280]">
            Casos cotidianos
          </p>
          <h2 className="mt-3 text-balance text-[2.5rem] font-extrabold leading-[1.15] tracking-[-0.01em] text-[#111827]">
            Tres situaciones que exponen el{" "}
            <span className="text-[#2EB4E9]">mismo vacío</span>
          </h2>
          <p className="mt-6 text-balance text-[18px] font-normal leading-[1.6] text-[#4B5563]">
            No empiezan con mala intención. Terminan sin evidencia para responder.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {scenarios.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.1}>
              <div className="flex h-full flex-col rounded-[12px] border border-[#E5E7EB] bg-white p-6 shadow-sm">
                {/* icon container */}
                <div className="flex size-12 flex-shrink-0 items-center justify-center rounded-[12px] bg-[rgba(23,62,117,0.06)]">
                  <svg viewBox="0 0 256 256" fill="currentColor" className="size-7 text-[#173E75]" aria-hidden>
                    <path d={s.iconPath} />
                  </svg>
                </div>
                {/* title */}
                <h3 className="mt-4 text-[20px] font-bold leading-snug text-[#111827]">{s.title}</h3>
                {/* situation */}
                <p className="mt-3 text-[16px] leading-[1.6] text-[#4B5563]">{s.body}</p>
                {/* critical question */}
                <blockquote className="mt-4 rounded-[8px] border-l-[3px] border-[#2EB4E9] bg-[#EEF4FA] px-4 py-3 text-[16px] font-bold leading-snug text-[#173E75]">
                  {s.quote}
                </blockquote>
                {/* consequence */}
                <p className="mt-4 text-[16px] leading-[1.6] text-[#4B5563]">{s.fallout}</p>
                {/* closing phrase */}
                <p className="mt-auto rounded-[8px] bg-[#F9FAFB] px-4 py-3 text-[15px] font-semibold text-[#173E75]">
                  {s.closing}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3}>
          <div className="mx-auto mt-16 max-w-[680px] rounded-[12px] border border-[#E5E7EB] bg-white p-8 text-center shadow-sm md:p-10">
            <p className="text-balance text-[20px] font-semibold leading-[1.6] text-[#4B5563]">
              Mientras usted no lo ve, las familias sí lo sienten.
            </p>
            <p className="mt-4 text-balance text-[18px] font-normal leading-[1.6] text-[#4B5563]">
              Esperar en fila, depender de la bocina y no saber si ya llamaron a su hijo no siempre genera quejas formales. A veces genera cambios de colegio.
            </p>
            <p className="mt-4 text-balance text-[18px] font-normal leading-[1.6] text-[#4B5563]">
              La salida es la primera y última impresión del día, y se repite cerca de 180 veces al año.
            </p>
            <p className="mt-8 text-balance text-[2.5rem] font-extrabold leading-tight text-[#173E75]">
              Las familias no siempre se quejan. A veces simplemente{" "}
              <span className="text-[#2EB4E9]">se van</span>.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.4}>
          <p className="mx-auto mt-10 max-w-[600px] text-center text-[22px] font-semibold leading-[1.5] text-[#374151]">
            Entonces la pregunta no es si debe registrar.
            Es cómo hacerlo sin frenar la salida.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

/* ==============================================================
   FALSO DILEMA (tabla SIN vs MANUAL)
   ============================================================== */

function FalsoDilema() {
  const CLOCK    = "M232,136.66A104.12,104.12,0,1,1,119.34,24,8,8,0,0,1,120.66,40,88.12,88.12,0,1,0,216,135.34,8,8,0,0,1,232,136.66ZM120,72v56a8,8,0,0,0,8,8h56a8,8,0,0,0,0-16H136V72a8,8,0,0,0-16,0Zm40-24a12,12,0,1,0-12-12A12,12,0,0,0,160,48Zm36,24a12,12,0,1,0-12-12A12,12,0,0,0,196,72Zm24,36a12,12,0,1,0-12-12A12,12,0,0,0,220,108Z"
  const CLIP     = "M168,152a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h64A8,8,0,0,1,168,152Zm-8-40H96a8,8,0,0,0,0,16h64a8,8,0,0,0,0-16Zm56-64V216a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16V48A16,16,0,0,1,56,32H92.26a47.92,47.92,0,0,1,71.48,0H200A16,16,0,0,1,216,48ZM96,64h64a32,32,0,0,0-64,0ZM200,48H173.25A47.93,47.93,0,0,1,176,64v8a8,8,0,0,1-8,8H88a8,8,0,0,1-8-8V64a47.93,47.93,0,0,1,2.75-16H56V216H200Z"
  const USERS    = "M244.8,150.4a8,8,0,0,1-11.2-1.6A51.6,51.6,0,0,0,192,128a8,8,0,0,1-7.37-4.89,8,8,0,0,1,0-6.22A8,8,0,0,1,192,112a24,24,0,1,0-23.24-30,8,8,0,1,1-15.5-4A40,40,0,1,1,219,117.51a67.94,67.94,0,0,1,27.43,21.68A8,8,0,0,1,244.8,150.4ZM190.92,212a8,8,0,1,1-13.84,8,57,57,0,0,0-98.16,0,8,8,0,1,1-13.84-8,72.06,72.06,0,0,1,33.74-29.92,48,48,0,1,1,58.36,0A72.06,72.06,0,0,1,190.92,212ZM128,176a32,32,0,1,0-32-32A32,32,0,0,0,128,176ZM72,120a8,8,0,0,0-8-8A24,24,0,1,1,87.24,82a8,8,0,1,0,15.5-4A40,40,0,1,0,37,117.51,67.94,67.94,0,0,0,9.6,139.19a8,8,0,1,0,12.8,9.61A51.6,51.6,0,0,1,64,128,8,8,0,0,0,72,120Z"
  const WARN     = "M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm-8,56a8,8,0,0,1,16,0v56a8,8,0,0,1-16,0Zm8,104a12,12,0,1,1,12-12A12,12,0,0,1,128,184Z"
  const CHECK    = "M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm45.66,85.66-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35a8,8,0,0,1,11.32,11.32Z"

  const rows = [
    { sinPath: CLOCK,  sinColor: "#173E75", sinText: "40-60 min de salida",        manualPath: CLOCK,  manualColor: "#173E75", manualText: "200-400 min de salida" },
    { sinPath: CLIP,   sinColor: "#173E75", sinText: "0 registros",                 manualPath: CLIP,   manualColor: "#173E75", manualText: "Registros en papel" },
    { sinPath: USERS,  sinColor: "#173E75", sinText: "Las familias esperan",        manualPath: USERS,  manualColor: "#173E75", manualText: "Las familias esperan más" },
    { sinPath: WARN,   sinColor: "#EF4444", sinText: "El colegio queda expuesto",   manualPath: CHECK,  manualColor: "#10B981", manualText: "El colegio gana evidencia, pero pierde fluidez" },
  ]

  return (
    <section className="relative bg-[#F9FAFB] pt-10 pb-16 md:pb-20">
      <div className="mx-auto max-w-5xl px-6">

        {/* Encabezado */}
        <Reveal className="mx-auto max-w-[780px] text-center">
          <h2 className="text-balance text-[2.5rem] font-extrabold leading-[1.1] tracking-[-0.01em] text-[#111827]">
            Registrar cada salida a mano{" "}
            <span className="text-[#2EB4E9]">no es viable</span>.
          </h2>
          <p className="mt-6 text-[18px] font-normal leading-[1.6] text-[#4B5563]">
            Registrar cada salida a mano tomaría 1-2 minutos por alumno.
            Con 200 alumnos, eso suma 3-6 horas adicionales de operación.
          </p>
          <p className="mt-4 text-[18px] font-bold text-[#111827]">
            No es viable. Por eso muchos colegios terminan operando sin registro.
          </p>
          <p className="mt-4 text-[18px] font-normal leading-[1.6] text-[#4B5563]">
            Pero el problema no es elegir entre velocidad y evidencia.
            Es no tener una forma simple de tener ambas.
          </p>
        </Reveal>

        {/* Tabla comparativa */}
        <Reveal delay={0.15}>
          {/* Desktop */}
          <div className="mx-auto mt-12 hidden max-w-3xl overflow-hidden rounded-[12px] border border-[#E5E7EB] bg-white shadow-sm md:block">
            <div className="grid grid-cols-2 border-b border-[#E5E7EB]">
              <div className="px-6 py-4">
                <span className="text-[13px] font-bold uppercase tracking-[0.8px] text-[#173E75]">Sin documentación</span>
              </div>
              <div className="border-l border-[#E5E7EB] px-6 py-4">
                <span className="text-[13px] font-bold uppercase tracking-[0.8px] text-[#173E75]">Documentación manual</span>
              </div>
            </div>
            {rows.map((r, i) => (
              <div key={i} className={cn("grid grid-cols-2", i !== rows.length - 1 && "border-b border-[#E5E7EB]")}>
                <div className="flex items-center gap-2.5 px-6 py-4 text-[16px] leading-[1.5] text-[#4B5563]">
                  <svg viewBox="0 0 256 256" fill="currentColor" className="size-4 flex-shrink-0" style={{ color: r.sinColor }} aria-hidden>
                    <path d={r.sinPath} />
                  </svg>
                  <span>{r.sinText}</span>
                </div>
                <div className="flex items-center gap-2.5 border-l border-[#E5E7EB] px-6 py-4 text-[16px] leading-[1.5] text-[#4B5563]">
                  <svg viewBox="0 0 256 256" fill="currentColor" className="size-4 flex-shrink-0" style={{ color: r.manualColor }} aria-hidden>
                    <path d={r.manualPath} />
                  </svg>
                  <span>{r.manualText}</span>
                </div>
              </div>
            ))}
            <div className="grid grid-cols-2 border-t border-[#E5E7EB] bg-[#F9FAFB]">
              <div className="px-6 py-4 text-[15px] font-semibold text-[#4B5563]">
                Elige velocidad. Pierde evidencia.
              </div>
              <div className="border-l border-[#E5E7EB] px-6 py-4 text-[15px] font-semibold text-[#4B5563]">
                Elige protección. Pierde experiencia.
              </div>
            </div>
          </div>

          {/* Mobile: dos cards apiladas */}
          <div className="mt-10 flex flex-col gap-4 md:hidden">
            {(["sin", "manual"] as const).map((col) => (
              <div key={col} className="overflow-hidden rounded-[12px] border border-[#E5E7EB] bg-white shadow-sm">
                <div className="border-b border-[#E5E7EB] px-5 py-3">
                  <span className="text-[13px] font-bold uppercase tracking-[0.8px] text-[#173E75]">
                    {col === "sin" ? "Sin documentación" : "Documentación manual"}
                  </span>
                </div>
                {rows.map((r, i) => (
                  <div key={i} className={cn("flex items-center gap-2.5 px-5 py-3.5 text-[16px] text-[#4B5563]", i !== 0 && "border-t border-[#E5E7EB]")}>
                    <svg viewBox="0 0 256 256" fill="currentColor" className="size-4 flex-shrink-0" style={{ color: col === "sin" ? r.sinColor : r.manualColor }} aria-hidden>
                      <path d={col === "sin" ? r.sinPath : r.manualPath} />
                    </svg>
                    <span>{col === "sin" ? r.sinText : r.manualText}</span>
                  </div>
                ))}
                <div className="border-t border-[#E5E7EB] bg-[#F9FAFB] px-5 py-3 text-[15px] font-semibold text-[#4B5563]">
                  {col === "sin" ? "Elige velocidad. Pierde evidencia." : "Elige protección. Pierde experiencia."}
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Cierre */}
        <Reveal delay={0.3}>
          <p className="mx-auto mt-16 max-w-[640px] text-center text-[2rem] font-extrabold leading-tight text-[#173E75]">
            ¿Y si no tuviera que elegir?
          </p>
        </Reveal>

      </div>
    </section>
  )
}

/* ==============================================================
   EFECTO EKOLE — gráfica de campana
   ============================================================== */

function EfectoEkole() {
  return (
    <section id="efecto" className="relative overflow-hidden py-16 md:py-20">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,hsl(var(--safe)/0.10),transparent_70%)] blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="text-balance text-[2.5rem] font-extrabold leading-[1.1] tracking-[-0.01em] text-[#173E75] sm:text-[3rem]">
            La diferencia no son los padres.
            Es el tiempo que el colegio{" "}
            <span className="text-[#2EB4E9]">pierde cada día</span>.
          </h2>
          <p className="mt-6 text-balance text-[18px] font-normal leading-[1.6] text-[#4B5563]">
            En un colegio de 300 alumnos, reducir la salida de 30 minutos a 5 no es solo comodidad:
            es menos fila, menos personal detenido y menos exposición en el momento más vulnerable del día.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-14">
            <EfectoEkoleChart />
          </div>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="mx-auto mt-12 max-w-2xl text-center">
            <p className="text-balance text-[18px] font-semibold leading-[1.6] text-[#111827]">
              Sin Ekole: hasta 30 minutos de espera. Con Ekole: cerca de 5.
            </p>
            <p className="mt-2 text-[16px] text-[#6B7280]">
              Mismo colegio. Mismo número de familias. Diferente sistema.
            </p>
            <p className="mt-6 text-[17px] font-semibold text-[#4B5563]">
              ¿Cómo lo logra? Con un flujo que su equipo aprende en 15 minutos.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ==============================================================
   DIAGNÓSTICO
   ============================================================== */

function Diagnostico() {
  const CHK_FILL  = "M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm45.66,85.66-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35a8,8,0,0,1,11.32,11.32Z"
  const LOCK      = "M208,80H176V56a48,48,0,0,0-96,0V80H48A16,16,0,0,0,32,96V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V96A16,16,0,0,0,208,80ZM96,56a32,32,0,0,1,64,0V80H96ZM208,208H48V96H208V208Z"

  const bullets = [
    "Qué pasa si un tutor no autorizado se presenta en la puerta.",
    "Si puede demostrar quién retiró a cada alumno hoy.",
    "Si tiene registro de hora y autorización por cada salida.",
  ]

  return (
    <section id="diagnostico" className="relative bg-white py-20 md:py-24">
      <div className="mx-auto max-w-5xl px-6">

        {/* Header */}
        <Reveal className="mx-auto max-w-[760px] text-center">
          <h2 className="text-balance text-[2.5rem] font-extrabold leading-[1.1] tracking-[-0.01em] text-[#111827]">
            ¿Aún no está listo para agendar una llamada?{" "}
            <span className="text-[#2EB4E9]">Evalúe su salida en 3 minutos.</span>
          </h2>
          <p className="mt-5 text-balance text-[18px] font-normal leading-[1.6] text-[#4B5563]">
            Responda 3 preguntas y detecte si su colegio puede demostrar quién recogió a cada alumno, a qué hora y bajo qué autorización.
          </p>
        </Reveal>

        {/* Card compacta 2 columnas */}
        <Reveal delay={0.15}>
          <div className="mx-auto mt-10 max-w-4xl overflow-hidden rounded-[12px] border border-[#E5E7EB] bg-white shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2">

              {/* Izquierda — Qué evalúa */}
              <div className="border-b border-[#E5E7EB] px-6 py-7 md:border-b-0 md:border-r">
                <p className="text-[13px] font-bold uppercase tracking-[1px] text-[#6B7280]">
                  Qué evalúa
                </p>
                <ul className="mt-4 space-y-3">
                  {bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2.5">
                      <svg viewBox="0 0 256 256" fill="currentColor" className="mt-0.5 size-4 flex-shrink-0 text-[#10B981]" aria-hidden>
                        <path d={CHK_FILL} />
                      </svg>
                      <span className="text-[16px] leading-[1.5] text-[#4B5563]">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Derecha — Qué recibe + CTA */}
              <div className="flex flex-col justify-between gap-6 px-6 py-7">
                <div>
                  <p className="text-[13px] font-bold uppercase tracking-[1px] text-[#6B7280]">
                    Qué recibe
                  </p>
                  <p className="mt-3 text-[16px] leading-[1.6] text-[#4B5563]">
                    Una guía de revisión de salida escolar con pasos concretos para fortalecer su proceso.
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  <a
                    href="/diagnostico"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-[12px] bg-[#173E75] px-6 py-3.5 text-[16px] font-semibold text-white shadow-md transition-colors duration-150 hover:bg-[#0F2A4F] focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[#5ECCE6] focus-visible:ring-offset-2"
                  >
                    Evaluar mi salida en 3 min
                    <ArrowRight className="size-4 flex-shrink-0" />
                  </a>
                  <p className="text-center text-[14px] text-[#6B7280]">
                    Gratis · Sin compromiso · Resultado inmediato
                  </p>

                  <div className="flex items-start gap-2 pt-1">
                    <svg viewBox="0 0 256 256" fill="currentColor" className="mt-0.5 size-4 flex-shrink-0 text-[#6B7280]" aria-hidden>
                      <path d={LOCK} />
                    </svg>
                    <p className="text-[13px] leading-[1.5] text-[#6B7280]">
                      Sus respuestas son confidenciales. Solo usted ve el resultado. No almacenamos datos de su colegio sin su permiso explícito.
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
   SOLUCIÓN (explicación + tabla 3 col + beneficios)
   ============================================================== */

function Solucion() {
  const CLOCK   = "M232,136.66A104.12,104.12,0,1,1,119.34,24,8,8,0,0,1,120.66,40,88.12,88.12,0,1,0,216,135.34,8,8,0,0,1,232,136.66ZM120,72v56a8,8,0,0,0,8,8h56a8,8,0,0,0,0-16H136V72a8,8,0,0,0-16,0Zm40-24a12,12,0,1,0-12-12A12,12,0,0,0,160,48Zm36,24a12,12,0,1,0-12-12A12,12,0,0,0,196,72Zm24,36a12,12,0,1,0-12-12A12,12,0,0,0,220,108Z"
  const CLIP    = "M168,152a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h64A8,8,0,0,1,168,152Zm-8-40H96a8,8,0,0,0,0,16h64a8,8,0,0,0,0-16Zm56-64V216a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16V48A16,16,0,0,1,56,32H92.26a47.92,47.92,0,0,1,71.48,0H200A16,16,0,0,1,216,48ZM96,64h64a32,32,0,0,0-64,0ZM200,48H173.25A47.93,47.93,0,0,1,176,64v8a8,8,0,0,1-8,8H88a8,8,0,0,1-8-8V64a47.93,47.93,0,0,1,2.75-16H56V216H200Z"
  const USERS   = "M244.8,150.4a8,8,0,0,1-11.2-1.6A51.6,51.6,0,0,0,192,128a8,8,0,0,1-7.37-4.89,8,8,0,0,1,0-6.22A8,8,0,0,1,192,112a24,24,0,1,0-23.24-30,8,8,0,1,1-15.5-4A40,40,0,1,1,219,117.51a67.94,67.94,0,0,1,27.43,21.68A8,8,0,0,1,244.8,150.4ZM190.92,212a8,8,0,1,1-13.84,8,57,57,0,0,0-98.16,0,8,8,0,1,1-13.84-8,72.06,72.06,0,0,1,33.74-29.92,48,48,0,1,1,58.36,0A72.06,72.06,0,0,1,190.92,212ZM128,176a32,32,0,1,0-32-32A32,32,0,0,0,128,176ZM72,120a8,8,0,0,0-8-8A24,24,0,1,1,87.24,82a8,8,0,1,0,15.5-4A40,40,0,1,0,37,117.51,67.94,67.94,0,0,0,9.6,139.19a8,8,0,1,0,12.8,9.61A51.6,51.6,0,0,1,64,128,8,8,0,0,0,72,120Z"
  const WARN    = "M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm-8,56a8,8,0,0,1,16,0v56a8,8,0,0,1-16,0Zm8,104a12,12,0,1,1,12-12A12,12,0,0,1,128,184Z"
  const CHKFILL = "M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm45.66,85.66-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35a8,8,0,0,1,11.32,11.32Z"

  const compareRows = [
    {
      sinIcon: CLOCK,  sinColor: "#6B7280", sinText: "40-60 min de salida",
      manIcon: CLOCK,  manColor: "#6B7280", manText: "200+ min de salida",
      ekIcon:  CLOCK,  ekColor:  "#173E75", ekText:  "12-15 min de salida",
    },
    {
      sinIcon: CLIP,   sinColor: "#6B7280", sinText: "0 registros",
      manIcon: CLIP,   manColor: "#6B7280", manText: "Registros en papel",
      ekIcon:  CLIP,   ekColor:  "#173E75", ekText:  "Registro automático",
    },
    {
      sinIcon: USERS,  sinColor: "#6B7280", sinText: "Familias esperan",
      manIcon: USERS,  manColor: "#6B7280", manText: "Familias esperan más",
      ekIcon:  USERS,  ekColor:  "#173E75", ekText:  "Familias satisfechas",
    },
    {
      sinIcon: WARN,   sinColor: "#F59E0B", sinText: "Colegio expuesto",
      manIcon: WARN,   manColor: "#F59E0B", manText: "Cubierto, pero pierde fluidez",
      ekIcon:  CHKFILL, ekColor: "#10B981", ekText:  "Protegido y con familias",
    },
  ]


  return (
    <section id="solucion" className="relative overflow-hidden bg-muted/40 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="text-[12px] font-bold uppercase tracking-[1.2px] text-[#6B7280]">
            La solución
          </p>
          <h2 className="mt-4 text-balance text-[3rem] font-extrabold leading-[1.1] tracking-[-0.01em] text-[#173E75]">
            Ekole agiliza la salida y registra{" "}
            <span className="text-[#2EB4E9]">cada entrega</span> en segundos.
          </h2>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-3">
            {[
              {
                iconPath: "M216.57,39.43A80,80,0,0,0,83.91,120.78L28.69,176A15.86,15.86,0,0,0,24,187.31V216a16,16,0,0,0,16,16H72a8,8,0,0,0,8-8V208H96a8,8,0,0,0,8-8V184h16a8,8,0,0,0,5.66-2.34l9.56-9.57A79.73,79.73,0,0,0,160,176h.1A80,80,0,0,0,216.57,39.43ZM224,98.1c-1.09,34.09-29.75,61.86-63.89,61.9H160a63.7,63.7,0,0,1-23.65-4.51,8,8,0,0,0-8.84,1.68L116.69,168H96a8,8,0,0,0-8,8v16H72a8,8,0,0,0-8,8v16H40V187.31l58.83-58.82a8,8,0,0,0,1.68-8.84A63.72,63.72,0,0,1,96,95.92c0-34.14,27.81-62.8,61.9-63.89A64,64,0,0,1,224,98.1ZM192,76a12,12,0,1,1-12-12A12,12,0,0,1,192,76Z",
                title: "Clave personal de recogida",
                body: "Cada tutor autorizado recibe una clave única. Al recoger, el sistema registra quién recibió al alumno, a qué hora y bajo qué autorización.",
              },
              {
                iconPath: "M168,152a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h64A8,8,0,0,1,168,152Zm-8-40H96a8,8,0,0,0,0,16h64a8,8,0,0,0,0-16Zm56-64V216a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16V48A16,16,0,0,1,56,32H92.26a47.92,47.92,0,0,1,71.48,0H200A16,16,0,0,1,216,48ZM96,64h64a32,32,0,0,0-64,0ZM200,48H173.25A47.93,47.93,0,0,1,176,64v8a8,8,0,0,1-8,8H88a8,8,0,0,1-8-8V64a47.93,47.93,0,0,1,2.75-16H56V216H200Z",
                title: "Funciona desde el primer día",
                body: "Sin app obligatoria, sin dispositivos especiales y sin semanas de capacitación. Su equipo usa lo que ya tiene.",
              },
              {
                iconPath: "M176,16H80A24,24,0,0,0,56,40V216a24,24,0,0,0,24,24h96a24,24,0,0,0,24-24V40A24,24,0,0,0,176,16ZM72,64H184V192H72Zm8-32h96a8,8,0,0,1,8,8v8H72V40A8,8,0,0,1,80,32Zm96,192H80a8,8,0,0,1-8-8v-8H184v8A8,8,0,0,1,176,224Z",
                title: "App opcional para familias",
                body: "La app mejora la experiencia para quien la quiera. Pero el sistema funciona completo con la clave desde el primer día.",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="flex flex-col gap-3 rounded-[12px] border border-[#E5E7EB] bg-white px-5 pt-5 pb-6 shadow-sm"
                style={{ borderTop: "3px solid #2EB4E9" }}
              >
                <div className="flex size-12 flex-shrink-0 items-center justify-center rounded-[12px] bg-[rgba(23,62,117,0.08)]">
                  <svg viewBox="0 0 256 256" fill="currentColor" className="size-7 text-[#173E75]" aria-hidden>
                    <path d={card.iconPath} />
                  </svg>
                </div>
                <h3 className="text-[20px] font-bold leading-snug text-[#173E75]">{card.title}</h3>
                <p className="text-[16px] leading-[1.6] text-[#4B5563]">{card.body}</p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* 3-step visual walkthrough */}
        <div className="mt-20">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <h3 className="text-balance text-[2rem] font-extrabold leading-[1.1] text-[#111827] sm:text-[2.5rem]">
                De la clave al registro{" "}
                <span className="text-[#2EB4E9]">en segundos</span>.
              </h3>
            </div>
          </Reveal>

          {/* Wrapper que se estira más allá del max-w-6xl en lg+ para dar tamaño real a los iPads */}
          <div className="mt-12 md:mx-auto md:max-w-none lg:-mx-4 xl:-mx-8 2xl:-mx-16">
          <div className="grid gap-10 md:grid-cols-3 md:gap-5 lg:gap-4">
            {[
              {
                title: "El tutor da su clave en la puerta o en la fila",
                body: "El personal ingresa los 3 dígitos. El alumno aparece al instante.",
                img: "/promotions/Buscador iphone 089.png",
                alt: "iPad con buscador Ekole: clave ingresada y alumno identificado",
                numColor: "#173E75",
                barColor: "#173E75",
                tint: "from-[rgba(23,62,117,0.06)] via-white to-white",
              },
              {
                title: "El maestro confirma y envía al alumno",
                body: "El maestro ve al alumno autorizado en su tablero y lo envía a la puerta.",
                img: "/promotions/Ipad dasboard final.png",
                alt: "iPad con dashboard del maestro: alumno listo para enviar a puerta",
                numColor: "#2EB4E9",
                barColor: "#2EB4E9",
                tint: "from-[rgba(46,180,233,0.08)] via-white to-white",
              },
              {
                title: "La entrega queda documentada automáticamente",
                body: "Nombre, hora, grado y confirmación. Evidencia de entrega sin trabajo adicional.",
                img: "/promotions/Ipad Entregados.png",
                alt: "iPad con pantalla de entregas confirmadas y registro de hora exacta",
                numColor: "#10B981",
                barColor: "#10B981",
                tint: "from-[rgba(16,185,129,0.07)] via-white to-white",
              },
            ].map((step, i) => (
              <Reveal key={step.title} delay={0.1 + i * 0.08}>
                <div className="flex h-full flex-col">
                  {/* Image frame */}
                  <div
                    className={cn(
                      "relative flex aspect-[4/5] items-center justify-center overflow-hidden rounded-[16px] border border-[rgba(0,0,0,0.08)] bg-gradient-to-br transition-shadow hover:shadow-lg md:aspect-[5/4] lg:aspect-[4/3]",
                      step.tint,
                    )}
                    style={{ boxShadow: "0 20px 40px rgba(15,42,79,0.12)" }}
                  >
                    {/* Accent bar */}
                    <div
                      aria-hidden
                      className="absolute inset-x-0 top-0 h-1 rounded-t-[16px]"
                      style={{ background: step.barColor }}
                    />
                    {/* Step badge */}
                    <div
                      aria-hidden
                      className="absolute left-4 top-4 z-10 flex size-9 items-center justify-center rounded-full border border-[#E5E7EB] bg-white text-[15px] font-bold shadow-sm md:left-5 md:top-5"
                      style={{ color: step.numColor }}
                    >
                      {i + 1}
                    </div>

                    <Image
                      src={step.img}
                      alt={step.alt}
                      fill
                      quality={95}
                      className="rounded-[8px] object-contain object-center p-3 lg:p-2"
                      sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 420px"
                    />
                  </div>

                  {/* Copy */}
                  <div className="mt-5 flex-1">
                    <div className="flex items-start gap-3">
                      <span
                        className="mt-0.5 flex size-9 flex-shrink-0 items-center justify-center rounded-full border border-[#E5E7EB] text-[15px] font-bold"
                        style={{ color: step.numColor }}
                        aria-hidden
                      >
                        {i + 1}
                      </span>
                      <div>
                        <h4 className="text-[20px] font-bold leading-snug text-[#111827]">
                          {step.title}
                        </h4>
                        <p className="mt-2 text-[16px] leading-[1.6] text-[#4B5563]">{step.body}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          </div>
        </div>

        {/* comparison: table en desktop, cards apiladas en móvil */}
        <Reveal delay={0.25}>
          {/* Desktop: tabla 3 col */}
          <div className="mx-auto mt-16 hidden max-w-5xl overflow-hidden rounded-[12px] border border-[#E5E7EB] bg-white shadow-sm md:block">
            {/* Headers */}
            <div className="grid grid-cols-3 border-b border-[#E5E7EB]">
              <div className="px-5 py-4 text-[13px] font-bold uppercase tracking-[0.8px] text-[#4B5563]">
                Sin documentación
              </div>
              <div className="border-l border-[#E5E7EB] px-5 py-4 text-[13px] font-bold uppercase tracking-[0.8px] text-[#4B5563]">
                Documentación manual
              </div>
              <div className="border-l border-[#E5E7EB] bg-[#F0FDF4] px-5 py-4 text-[13px] font-bold uppercase tracking-[0.8px] text-[#047857]">
                Con Ekole
              </div>
            </div>
            {/* Rows */}
            {compareRows.map((r, i) => (
              <div
                key={i}
                className={cn("grid grid-cols-3", i !== compareRows.length - 1 && "border-b border-[#E5E7EB]")}
              >
                <div className="flex items-center gap-2.5 px-5 py-4 text-[16px] leading-[1.5] text-[#4B5563]">
                  <svg viewBox="0 0 256 256" fill="currentColor" className="size-4 flex-shrink-0" style={{ color: r.sinColor }} aria-hidden><path d={r.sinIcon} /></svg>
                  <span>{r.sinText}</span>
                </div>
                <div className="flex items-center gap-2.5 border-l border-[#E5E7EB] px-5 py-4 text-[16px] leading-[1.5] text-[#4B5563]">
                  <svg viewBox="0 0 256 256" fill="currentColor" className="size-4 flex-shrink-0" style={{ color: r.manColor }} aria-hidden><path d={r.manIcon} /></svg>
                  <span>{r.manText}</span>
                </div>
                <div className="flex items-center gap-2.5 border-l border-[#E5E7EB] bg-[#F0FDF4] px-5 py-4 text-[16px] font-bold leading-[1.5] text-[#111827]">
                  <svg viewBox="0 0 256 256" fill="currentColor" className="size-4 flex-shrink-0" style={{ color: r.ekColor }} aria-hidden><path d={r.ekIcon} /></svg>
                  <span>{r.ekText}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile: cards apiladas — 3 variantes por fila */}
          <div className="mt-10 flex flex-col gap-4 md:hidden">
            {compareRows.map((r, i) => (
              <div key={i} className="overflow-hidden rounded-[12px] border border-[#E5E7EB] bg-white shadow-sm">
                <div className="divide-y divide-[#E5E7EB]">
                  <div className="flex items-center gap-3 px-5 py-3.5">
                    <span className="w-[120px] flex-shrink-0 text-[12px] font-bold uppercase tracking-[0.8px] text-[#4B5563]">Sin doc.</span>
                    <div className="flex items-center gap-2 text-[15px] text-[#4B5563]">
                      <svg viewBox="0 0 256 256" fill="currentColor" className="size-4 flex-shrink-0" style={{ color: r.sinColor }} aria-hidden><path d={r.sinIcon} /></svg>
                      <span>{r.sinText}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 px-5 py-3.5">
                    <span className="w-[120px] flex-shrink-0 text-[12px] font-bold uppercase tracking-[0.8px] text-[#4B5563]">Manual</span>
                    <div className="flex items-center gap-2 text-[15px] text-[#4B5563]">
                      <svg viewBox="0 0 256 256" fill="currentColor" className="size-4 flex-shrink-0" style={{ color: r.manColor }} aria-hidden><path d={r.manIcon} /></svg>
                      <span>{r.manText}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-[#F0FDF4] px-5 py-3.5">
                    <span className="w-[120px] flex-shrink-0 text-[12px] font-bold uppercase tracking-[0.8px] text-[#047857]">Con Ekole</span>
                    <div className="flex items-center gap-2 text-[15px] font-bold text-[#111827]">
                      <svg viewBox="0 0 256 256" fill="currentColor" className="size-4 flex-shrink-0" style={{ color: r.ekColor }} aria-hidden><path d={r.ekIcon} /></svg>
                      <span>{r.ekText}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.35}>
          <div className="mt-10 flex flex-col items-center">
            <a
              href={DEMO_CTA_HREF}
              className="inline-flex items-center gap-2.5 rounded-[12px] bg-[#173E75] px-8 py-4 text-[17px] font-semibold text-white shadow-md transition-colors duration-150 hover:bg-[#0F2A4F] focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[#5ECCE6] focus-visible:ring-offset-2"
            >
              Agendar revisión de salida de 20 min
              <ArrowRight className="size-5 flex-shrink-0 transition-transform group-hover:translate-x-0.5" />
            </a>
            <p className="mt-4 text-[14px] leading-[1.5] text-[#6B7280]">
              Por videollamada · Sin compromiso · Revisamos su proceso de salida
            </p>
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
  const CHAT  = "M168,112a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h64A8,8,0,0,1,168,112Zm-8,24H96a8,8,0,0,0,0,16h64a8,8,0,0,0,0-16Zm72-8A104,104,0,0,1,79.12,219.82L45.07,231.17a16,16,0,0,1-20.24-20.24l11.35-34.05A104,104,0,1,1,232,128Zm-16,0A88,88,0,1,0,51.81,172.06a8,8,0,0,1,.66,6.54L40,216,77.4,203.53a7.85,7.85,0,0,1,2.53-.42,8,8,0,0,1,4,1.08A88,88,0,0,0,216,128Z"
  const CLOCK = "M232,136.66A104.12,104.12,0,1,1,119.34,24,8,8,0,0,1,120.66,40,88.12,88.12,0,1,0,216,135.34,8,8,0,0,1,232,136.66ZM120,72v56a8,8,0,0,0,8,8h56a8,8,0,0,0,0-16H136V72a8,8,0,0,0-16,0Zm40-24a12,12,0,1,0-12-12A12,12,0,0,0,160,48Zm36,24a12,12,0,1,0-12-12A12,12,0,0,0,196,72Zm24,36a12,12,0,1,0-12-12A12,12,0,0,0,220,108Z"
  const CHK   = "M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm45.66,85.66-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35a8,8,0,0,1,11.32,11.32Z"

  const steps = [
    {
      iconPath: CHAT,
      num: "1",
      title: "Diagnóstico de 20 min",
      body: "Entendemos puertas, alumnos y flujo actual.",
    },
    {
      iconPath: CLOCK,
      num: "2",
      title: "Configuración en menos de 24 h",
      body: "Cargamos alumnos, tutores y personal autorizado.",
    },
    {
      iconPath: CHK,
      num: "3",
      title: "Salida documentada desde el día uno",
      body: "Su equipo opera con clave, registro automático e historial.",
    },
  ]

  return (
    <section className="relative bg-[#F9FAFB] py-20 md:py-24">
      <div className="mx-auto max-w-5xl px-6">

        {/* Header */}
        <Reveal className="mx-auto max-w-[860px] text-center">
          <h2 className="text-balance text-[2.5rem] font-extrabold leading-[1.1] tracking-[-0.01em] text-[#173E75]">
            De primera llamada a salida documentada{" "}
            <span className="text-[#2EB4E9]">en menos de 24 horas</span>.
          </h2>
          <p className="mx-auto mt-5 max-w-[720px] text-balance text-[18px] font-normal leading-[1.6] text-[#4B5563]">
            Usted nos comparte los datos básicos. Nosotros configuramos Ekole, cargamos tutores autorizados y capacitamos a su equipo en 15 minutos.
          </p>
          <p className="mx-auto mt-3 max-w-[720px] text-balance text-[18px] font-normal leading-[1.6] text-[#4B5563]">
            Desde el primer día, su salida puede operar con clave de recogida, registro automático e historial consultable.
          </p>
        </Reveal>

        {/* Mini steps — horizontal en desktop, vertical en móvil */}
        <Reveal delay={0.15}>
          <div className="mx-auto mt-10 flex max-w-3xl flex-col items-center gap-6 md:flex-row md:items-start md:gap-0">
            {steps.map((s, i) => (
              <React.Fragment key={s.num}>
                <div className="flex flex-1 flex-col items-center gap-2.5 text-center">
                  <div className="flex size-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-[#2EB4E9] bg-white text-[15px] font-bold text-[#173E75]">
                    {s.num}
                  </div>
                  <p className="max-w-[140px] text-[15px] font-semibold leading-snug text-[#111827]">{s.title}</p>
                </div>
                {i < 2 && (
                  <ArrowRight className="hidden size-5 flex-shrink-0 self-start text-[#D1D5DB] md:block" style={{ marginTop: "12px" }} />
                )}
              </React.Fragment>
            ))}
          </div>
        </Reveal>

        {/* CTA */}
        <Reveal delay={0.3}>
          <div className="mt-10 flex flex-col items-center">
            <a
              href={DEMO_CTA_HREF}
              className="inline-flex items-center gap-2.5 rounded-[12px] bg-[#173E75] px-8 py-4 text-[17px] font-semibold text-white shadow-md transition-colors duration-150 hover:bg-[#0F2A4F] focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[#5ECCE6] focus-visible:ring-offset-2"
            >
              Agendar revisión de salida de 20 min
              <ArrowRight className="size-5 flex-shrink-0" />
            </a>
            <p className="mt-4 text-[14px] leading-[1.5] text-[#6B7280]">
              Por videollamada · Sin compromiso · Revisamos su proceso de salida
            </p>
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
    <div className="overflow-hidden rounded-2xl border border-border bg-card transition-all">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
        aria-expanded={open}
      >
        <span className="text-base font-medium text-foreground md:text-lg">{q}</span>
        <ChevronDown
          className={cn(
            "size-5 flex-shrink-0 text-muted-foreground transition-transform duration-300",
            open && "rotate-180 text-primary",
          )}
        />
      </button>
      <div
        className={cn(
          "grid overflow-hidden transition-all duration-300 ease-in-out",
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="min-h-0">
          <div className="px-6 pb-6 text-sm leading-relaxed text-muted-foreground md:text-base">{a}</div>
        </div>
      </div>
    </div>
  )
}

function FAQ() {
  const faqs = [
    {
      q: "¿Cuánto cuesta Ekole?",
      a: "Planes adaptados al tamaño de su colegio. En la demo le mostramos cuánto sería y lo comparamos con su costo operativo actual. Sin costo de instalación, sin contratos forzosos, primera semana por nuestra cuenta.",
    },
    {
      q: "¿Qué tan fácil es implementarlo?",
      a: "Menos de 24 horas, y lo hacemos nosotros. Usted aprueba una configuración; nosotros activamos el sistema, entregamos las claves a los tutores y capacitamos a su equipo en 15 minutos. El primer día de clases siguiente, la salida ya cambió.",
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
      a: "Es normal. Por eso la primera semana va por nuestra cuenta y los acompañamos paso a paso. La mayoría de los colegios reportan que padres y personal se adaptan en 2-3 días — la clave de recogida es tan simple que no requiere explicación. Pero si necesita ir a su ritmo, lo hacemos juntos.",
    },
    {
      q: "¿Los datos están seguros?",
      a: "Sí. Todos los datos van encriptados en tránsito y en reposo, cumplimos con la LFPDPPP (Ley Federal de Protección de Datos Personales en Posesión de los Particulares), y no compartimos información con terceros. Usted puede solicitar eliminación de los datos en cualquier momento y conserva la propiedad total de la información de su colegio.",
    },
    {
      q: "¿Qué pasa si no me convence?",
      a: "Sin contrato forzoso. Si no cumplimos, cancela sin costo. Nos ganamos su confianza con resultados, no con contratos.",
    },
    {
      q: "¿En qué se diferencia de otros sistemas escolares?",
      a: "Otros gestionan lo de DENTRO (calificaciones, asistencia, cobro). Ekole cubre el momento que el padre VIVE todos los días: la salida. No reemplazamos su sistema — lo complementamos donde ningún otro llega.",
    },
    {
      q: "¿El registro de salidas tiene validez como evidencia?",
      a: "Sí. Cada salida se documenta con fecha, hora, tutor autorizado, personal receptor y timestamp automático — exactamente los elementos que sustentan un argumento de supervisión. Es su evidencia objetiva de diligencia. (Como toda evidencia, recomendamos incluirla en su estrategia de respaldo general junto con su equipo legal.)",
    },
  ]

  return (
    <section id="preguntas" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-6">
        <Reveal className="text-center">
          <h2 className="mt-6 text-balance text-3xl font-semibold tracking-tight md:text-5xl">
            Preguntas que nos hacen{" "}
            <span className="font-display italic font-normal text-primary">los directivos</span> antes de
            empezar.
          </h2>
        </Reveal>

        <div className="mt-14 flex flex-col gap-3">
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
  return (
    <section id="cta" className="relative overflow-hidden bg-[#173E75] py-16 md:py-20">
      {/* Glows decorativos */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -right-32 -top-32 size-[500px] rounded-full bg-[radial-gradient(closest-side,rgba(46,180,233,0.14),transparent_70%)] blur-3xl" />
        <div className="absolute -bottom-32 -left-20 size-[400px] rounded-full bg-[radial-gradient(closest-side,rgba(255,255,255,0.06),transparent_70%)] blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <Reveal>
          <h2 className="text-balance text-[2.5rem] font-extrabold leading-[1.1] tracking-[-0.01em] text-white sm:text-[3rem]">
            Vea cómo quedaría{" "}
            <span className="text-[#2EB4E9]">documentada la salida</span>{" "}
            de su colegio.
          </h2>
          <p className="mx-auto mt-6 max-w-[620px] text-balance text-[18px] font-normal leading-[1.6] text-white/75">
            En 20 minutos revisamos su proceso actual y le mostramos dónde está perdiendo tiempo, dónde está expuesto y cómo Ekole lo resolvería desde el primer día.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-10 flex flex-col items-center gap-3">
            <a
              href={DEMO_CTA_HREF}
              className="group inline-flex w-full items-center justify-center gap-2 rounded-[12px] bg-white px-8 py-4 text-[17px] font-semibold text-[#173E75] shadow-md transition-colors duration-150 hover:bg-[#F0F6FF] focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[#2EB4E9] focus-visible:ring-offset-2 focus-visible:ring-offset-[#173E75] sm:w-auto"
            >
              Agendar revisión de salida de 20 min
              <ArrowRight className="size-5 flex-shrink-0 transition-transform group-hover:translate-x-0.5" />
            </a>
            <p className="text-[14px] text-white/60">
              Por videollamada · Sin compromiso · Sin instalación previa
            </p>
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
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-6xl px-6 py-16 lg:py-20">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="space-y-5 md:col-span-5">
            <Logo />
            <p className="max-w-md text-sm leading-[1.6] text-[#6B7280]">
              Creemos que ningún director debería quedar expuesto personalmente por operar un proceso que,
              hasta hoy, no tenía solución viable. Por eso creamos Ekole.
            </p>
            <p className="text-sm font-medium text-[#6B7280]">— El equipo de Ekole</p>
          </div>

          <div className="md:col-span-3">
            <h3 className="text-sm font-bold text-foreground">Producto</h3>
            <ul className="mt-4 space-y-3 text-sm text-[#6B7280]">
              <li>
                <a href="/#problema" className="transition-colors hover:text-primary">
                  Problema
                </a>
              </li>
              <li>
                <a href="/diagnostico" className="transition-colors hover:text-primary">
                  Diagnóstico
                </a>
              </li>
              <li>
                <a href="/#solucion" className="transition-colors hover:text-primary">
                  Solución
                </a>
              </li>
              <li>
                <a href="/#preguntas" className="transition-colors hover:text-primary">
                  Preguntas
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <h3 className="text-sm font-bold text-foreground">Contacto</h3>
            <ul className="mt-4 space-y-3 text-sm text-[#6B7280]">
              <li>
                <a href={DEMO_CTA_HREF} className="transition-colors hover:text-primary">
                  Agendar revisión
                </a>
              </li>
              <li>
                <a
                  href="https://www.ekole.app/privacy-and-policy"
                  className="transition-colors hover:text-primary"
                >
                  Política de Privacidad
                </a>
              </li>
              <li>
                <a
                  href="https://www.ekole.app/terms-and-conditions"
                  className="transition-colors hover:text-primary"
                >
                  Términos y condiciones
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* legal notice */}
        <div className="mt-14 rounded-[8px] border border-border bg-[#F3F4F6] px-5 py-4 text-xs leading-[1.5] text-[#6B7280]">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 flex size-5 flex-shrink-0 items-center justify-center rounded-full border border-border text-[10px] font-semibold">
              i
            </span>
            <p>
              <strong className="font-semibold text-[#6B7280]">Aviso legal.</strong> La información legal presentada en
              esta página — incluyendo referencias al Art. 1921 del Código Civil Federal, la Ley Federal de
              Protección de Datos Personales en Posesión de los Particulares (LFPDPPP) y los deberes de
              custodia escolar — es orientativa y tiene fines informativos. No constituye asesoría jurídica
              ni sustituye la consulta con un abogado especializado. Para aplicar estos conceptos a su caso
              concreto, recomendamos consultar con su equipo legal.
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-border pt-8 text-xs md:flex-row">
          <div className="text-[#9CA3AF]">© {new Date().getFullYear()} Ekole. Todos los derechos reservados.</div>
          <div className="flex items-center gap-1.5 font-semibold text-[#10B981]">
            <span className="relative flex size-2 items-center justify-center">
              <span className="absolute inline-flex size-2 animate-pulse-dot rounded-full bg-[#10B981]/60" />
              <span className="relative inline-flex size-1.5 rounded-full bg-[#10B981]" />
            </span>
            Cupos abiertos · ciclo 2026-2027
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
  return (
    <>
      <HeroHeader />
      <main className="overflow-hidden">
        <Hero />
        <Problema />
        <Escenarios />
        <FalsoDilema />
        <EfectoEkole />
        <Solucion />
        <ComoFunciona />
        <Diagnostico />
        <FAQ />
        <CTAFinal />
      </main>
      <Footer />
    </>
  )
}
