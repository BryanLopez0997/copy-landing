"use client"

import * as React from "react"
import { AlertTriangle, ChevronDown, Info, Lock, ShieldAlert } from "lucide-react"
import { LegalCredentials, Pill } from "@/components/software-development-website"
import type { Answer, Question } from "./data"

export function cn(...classes: (string | undefined | null | boolean)[]): string {
  return classes.filter(Boolean).join(" ")
}

/* ---------- Tooltip on focus/hover ---------- */

export function InfoHint({ children, label }: { children: React.ReactNode; label?: string }) {
  return (
    <span className="group relative inline-flex">
      <button
        type="button"
        aria-label={label ?? "Más información"}
        className="inline-flex size-4 items-center justify-center rounded-full border border-border/70 bg-background text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
      >
        <Info className="size-2.5" strokeWidth={2.5} />
      </button>
      <span className="pointer-events-none absolute left-1/2 top-full z-50 mt-2 hidden w-64 -translate-x-1/2 rounded-xl border border-border bg-popover px-3.5 py-2.5 text-left text-xs leading-relaxed text-popover-foreground shadow-lg group-hover:block group-focus-within:block">
        {children}
      </span>
    </span>
  )
}

/* ---------- Reference badge with tooltip ---------- */

export function RefBadge({
  children,
  tooltip,
  tone = "default",
}: {
  children: React.ReactNode
  tooltip: string
  tone?: "default" | "safe" | "risk" | "primary"
}) {
  return (
    <span className="group relative inline-flex">
      <span className="inline-flex items-center rounded-full bg-[rgba(23,62,117,0.1)] px-2 py-0.5 font-mono text-xs font-semibold text-primary">
        {children}
      </span>
      <span className="pointer-events-none absolute left-0 top-full z-50 mt-2 hidden w-64 rounded-xl border border-border bg-popover px-3.5 py-2.5 text-xs leading-relaxed text-popover-foreground shadow-lg group-hover:block group-focus-within:block">
        {tooltip}
      </span>
    </span>
  )
}

/* ──────────────────────────────────────────────
   HERO HEADER (aurora + serif, estilo landing)
   ────────────────────────────────────────────── */

export function DocHeader() {
  return (
    <section className="relative overflow-hidden pt-16 pb-16 md:pt-24 md:pb-20">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid opacity-[0.18] mask-fade-edges" />
        <div className="absolute left-1/2 top-[-15%] h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,hsl(var(--primary)/0.14),transparent_70%)] blur-2xl" />
        <div className="absolute left-[6%] top-[25%] h-[300px] w-[300px] rounded-full bg-[radial-gradient(closest-side,hsl(var(--risk)/0.12),transparent_70%)] blur-3xl" />
        <div className="absolute right-[8%] top-[10%] h-[320px] w-[320px] rounded-full bg-[radial-gradient(closest-side,hsl(var(--safe)/0.10),transparent_70%)] blur-3xl" />
      </div>

      <div className="mx-auto max-w-3xl px-6 text-center">
        <div className="flex items-center justify-center gap-3 text-[11px] font-bold uppercase tracking-[1.2px] text-[#6B7280]">
          <span className="h-px w-8 bg-border" />
          Diagnóstico Institucional
          <span className="h-px w-8 bg-border" />
        </div>

        {/* DS rule: "Ekole persuade" → navy headline; highlight con primary-light, no itálica */}
        <h1 className="mt-6 text-balance text-[32px] font-extrabold leading-[1.08] tracking-[-0.02em] text-primary md:text-[52px]">
          ¿Cuál es el nivel de exposición legal de{" "}
          <span className="text-primary-light">su institución</span>?
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-balance text-lg font-semibold leading-[1.6] text-[#1F2937]">
          — y el suyo como director.
        </p>

        <p className="mx-auto mt-6 max-w-[65ch] text-balance text-base leading-relaxed text-muted-foreground md:text-lg">
          Evaluación de 8 áreas de cumplimiento. Resultados basados en legislación federal vigente. La
          responsabilidad no recae solo en el colegio.
        </p>

        {/* DS: Legal Credentials con escudo + separador (no pills) */}
        <LegalCredentials
          tone="light"
          className="mt-7 justify-center"
          items={["LFPDPPP", "Derechos ARCO", "NOM-081-SEMARNAT", "DOF vigente 2025"]}
        />

        <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-[rgba(23,62,117,0.1)] px-2 py-0.5 text-xs font-semibold text-primary">
          <Lock className="size-[14px] flex-shrink-0" />
          <span>Confidencial · Se calcula en su dispositivo · 90 segundos</span>
        </div>
      </div>
    </section>
  )
}

/* ──────────────────────────────────────────────
   ALERTA LEGAL — cita CCF 1920
   ────────────────────────────────────────────── */

export function AlertBanner() {
  return (
    <div className="mx-auto max-w-3xl px-6">
      <div className="rounded-lg border border-border bg-card p-6">
        <div className="flex items-start gap-3">
          <div className="mt-px flex size-8 flex-shrink-0 items-center justify-center rounded-full bg-[rgba(245,158,11,0.08)] text-[#92400e]">
            <AlertTriangle className="size-[18px]" />
          </div>
          <div>
            <LegalCredentials tone="light" items={["CCF Art. 1920"]} />
            <p className="mt-2.5 text-base font-bold leading-[1.6] text-[#1F2937]">
              Cuando un menor está bajo la vigilancia de un director de colegio, la responsabilidad civil
              se transfiere del padre al director.
            </p>
            <p className="mt-2 text-sm font-normal leading-[1.5] text-[#4B5563]">
              Usted asume esa responsabilidad personalmente — no solo la institución.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ──────────────────────────────────────────────
   CALLOUT PERSONAL
   ────────────────────────────────────────────── */

export function LiabilityCallout() {
  return (
    <div className="rounded-3xl border border-border bg-card p-8 shadow-sm md:p-10">
      {/* DS: fondo blanco limpio, sin aurora. Acentos solo en heros / cierre */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[rgba(245,158,11,0.1)] px-2 py-0.5 text-xs font-semibold text-[#92400e]">
          <ShieldAlert className="size-3" />
          <span>Lo que muchos directores no saben</span>
        </span>
        <LegalCredentials tone="light" items={["CCF 1920", "CPF 335"]} className="ml-auto" />
      </div>

      {/* DS: "Ekole persuade" → navy; highlight con primary-light, no itálica */}
      <h2 className="mt-5 max-w-2xl text-balance text-[28px] font-extrabold leading-[1.1] tracking-tight text-primary md:text-[40px]">
        La responsabilidad civil es <span className="text-primary-light">suya</span> — no del colegio.
      </h2>

      <div className="mt-5 max-w-[65ch] space-y-4 text-base leading-[1.6] text-[#1F2937]">
        <p>
          Cuando un menor está bajo la vigilancia del colegio, la ley transfiere la responsabilidad civil{" "}
          <strong className="font-bold text-[#1F2937]">al director personalmente</strong>. No al colegio
          como entidad — a usted como individuo.
        </p>
        <blockquote className="rounded-r-[8px] border-l-[3px] border-[#2EB4E9] bg-[rgba(46,180,233,0.06)] px-5 py-4 text-sm leading-relaxed text-[#374151]">
          "Cesa la responsabilidad de los padres cuando los menores ejecuten los actos encontrándose bajo la
          vigilancia y autoridad de otras personas, como directores de colegios… pues entonces{" "}
          <strong className="not-italic font-semibold underline text-[#1F2937]">
            esas personas asumirán la responsabilidad
          </strong>
          ."
          <footer className="mt-2 font-sans text-xs font-semibold not-italic uppercase tracking-[0.5px] text-[#6B7280]">
            — CÓDIGO CIVIL FEDERAL, ART. 1920
          </footer>
        </blockquote>
        <p>
          Ante un incidente en la salida escolar, un padre puede demandar tanto al colegio como a{" "}
          <strong className="font-bold text-[#1F2937]">usted en lo personal</strong>.
        </p>
        <p className="rounded-[8px] border border-[#E5E7EB] bg-[#F9FAFB] px-5 py-4 text-sm font-normal leading-[1.6] text-[#4B5563]">
          En 2025, un tribunal en Baja California condenó a un maestro a prisión personal por no llevar a
          urgencias a un alumno que se golpeó en clase.{" "}
          <strong className="font-bold text-[#1F2937]">El maestro respondió con su libertad.</strong>
        </p>
      </div>
    </div>
  )
}

/* ──────────────────────────────────────────────
   PROGRESS BAR
   ────────────────────────────────────────────── */

export function ProgressBar({ answered, total }: { answered: number; total: number }) {
  const pct = Math.round((answered / total) * 100)
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
          Progreso
        </span>
        <span className="font-mono text-[11px] tracking-wider text-foreground">
          {answered}<span className="text-muted-foreground">/{total}</span>
        </span>
      </div>
      <div className="h-1 overflow-hidden rounded-full bg-border">
        <div
          className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}

/* ──────────────────────────────────────────────
   SECTION HEADER (cada área del diagnóstico)
   ────────────────────────────────────────────── */

export function SectionHeader({
  num,
  title,
  subtitle,
}: {
  num: string
  title: string
  subtitle: string
}) {
  return (
    <div className="mb-5 flex items-baseline gap-4">
      <span className="font-mono text-[11px] font-bold uppercase tracking-[1.2px] text-[#6B7280]">{num}</span>
      <div>
        <h3 className="text-[24px] font-bold leading-[1.3] tracking-tight text-[#1F2937]">
          {title}
        </h3>
        <p className="mt-0.5 text-sm leading-[1.5] text-[#6B7280]">{subtitle}</p>
      </div>
    </div>
  )
}

/* ──────────────────────────────────────────────
   QUESTION BLOCK (rediseñado)
   ────────────────────────────────────────────── */

export function QuestionBlock({
  question,
  answer,
  atRisk,
  onAnswer,
}: {
  question: Question
  answer: Answer | undefined
  atRisk: boolean
  onAnswer: (a: Answer) => void
}) {
  const [hintOpen, setHintOpen] = React.useState(!question.hintCollapsible)
  const answered = answer !== undefined

  return (
    <div
      className={cn(
        "group/qb relative rounded-lg border bg-card p-6 transition-all",
        atRisk
          ? "border-risk/40 shadow-[0_0_0_3px_hsl(var(--risk)/0.06)]"
          : answered
            ? "border-safe/30 shadow-[0_0_0_3px_hsl(var(--safe)/0.05)]"
            : "border-border hover:border-border/50",
      )}
    >
      <div className="flex flex-col gap-5 md:flex-row md:items-start md:gap-6">
        <div className="flex-1">
          <div className="mb-3 flex items-center gap-2">
            <span className="font-mono text-xs font-semibold tracking-wider text-[#6B7280]">
              {question.num}
            </span>
            <RefBadge tooltip={question.refTooltip}>{question.ref}</RefBadge>
          </div>

          <p className="text-balance text-lg font-bold leading-[1.4] text-[#1F2937]">
            {question.text}
          </p>

          {question.hintCollapsible ? (
            <>
              <button
                type="button"
                onClick={() => setHintOpen((v) => !v)}
                className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
              >
                ¿Por qué importa?
                <ChevronDown
                  className={cn("size-[14px] transition-transform", hintOpen && "rotate-180")}
                />
              </button>
              {hintOpen && (
                <p className="mt-2 rounded-[8px] bg-[#F9FAFB] px-4 py-3 text-sm leading-[1.6] text-[#4B5563]">
                  {question.hint}
                </p>
              )}
            </>
          ) : (
            <p className="mt-2.5 text-sm leading-[1.6] text-[#4B5563]">{question.hint}</p>
          )}

          {atRisk && (
            <div className="mt-3 flex items-start gap-2 rounded-[8px] border border-[rgba(245,158,11,0.2)] bg-[rgba(245,158,11,0.08)] px-5 py-4">
              <AlertTriangle className="mt-px size-[18px] flex-shrink-0 text-[#92400e]" />
              <span className="text-sm leading-relaxed text-[#92400e]">{question.feedback}</span>
            </div>
          )}
        </div>

        {/* Answer pills */}
        <div className="flex flex-shrink-0 items-center gap-2 md:flex-col md:items-stretch md:pt-8">
          {(["si", "no"] as const).map((v) => {
            const active = answer === v
            const activeRisk = active && atRisk
            const activeSafe = active && !atRisk
            return (
              <button
                key={v}
                type="button"
                onClick={() => onAnswer(v)}
                className={cn(
                  "relative rounded-full px-6 py-2 font-sans text-sm font-semibold uppercase tracking-wider transition-all md:min-w-[84px]",
                  !active &&
                    "border border-border bg-background text-foreground/70 hover:border-primary/40 hover:text-foreground",
                  activeSafe &&
                    "bg-primary text-primary-foreground shadow-sm ring-1 ring-primary/30",
                  activeRisk &&
                    "bg-risk text-risk-foreground shadow-sm ring-1 ring-risk/30",
                )}
              >
                {v.toUpperCase()}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
