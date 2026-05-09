'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

// Anima un número de 0 al objetivo con easing ease-out
function useCountUp(target: number, isActive: boolean, duration = 1400): number {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!isActive) return
    const startTime = performance.now()
    let rafId: number
    const animate = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3) // ease-out cúbico
      setCount(Math.floor(eased * target))
      if (progress < 1) {
        rafId = requestAnimationFrame(animate)
      } else {
        setCount(target)
      }
    }
    rafId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafId)
  }, [isActive, target, duration])
  return count
}

// Marco visual de MacBook
function MacbookFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto w-full max-w-[720px]">
      <div
        className="rounded-t-2xl p-2.5 pt-6 shadow-[0_24px_60px_rgba(15,34,64,0.18)]"
        style={{ background: 'linear-gradient(180deg,#D8DCE3 0%,#BFC4CC 100%)' }}
      >
        {/* Cámara frontal */}
        <div className="absolute top-2.5 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[#9CA3AF]" />
        {/* Pantalla */}
        <div className="overflow-hidden rounded-xl border border-[#1E4080]">
          {children}
        </div>
      </div>
      {/* Repisa base */}
      <div
        className="h-4 rounded-b-lg"
        style={{ background: 'linear-gradient(180deg,#C8CDD5 0%,#B8BDC5 100%)' }}
      />
      {/* Trackpad visual */}
      <div className="mx-auto h-3 w-[88%] rounded-b-xl bg-[#B0B5BC]" />
    </div>
  )
}

// Datos ficticios pero realistas para una institución mexicana
const ALUMNOS = [
  { nombre: 'Sofía Ramírez', grado: '3° A', tutor: 'Mamá autorizada', estado: 'entregado' as const, hora: '14:28' },
  { nombre: 'Carlos Mendoza', grado: '2° B', tutor: 'Por confirmar',   estado: 'espera'    as const, hora: '14:31' },
  { nombre: 'Valeria Santos', grado: '1° A', tutor: 'Sin autorizar',   estado: 'urgente'   as const, hora: '14:29' },
  { nombre: 'Emilio Vega',    grado: '4° B', tutor: 'Papá autorizado', estado: 'entregado' as const, hora: '14:33' },
]

type EstadoAlumno = 'entregado' | 'espera' | 'urgente'

const ESTADO_CONFIG: Record<EstadoAlumno, { label: string; color: string; bg: string }> = {
  entregado: { label: '✓ Entregado',  color: '#10B981', bg: 'rgba(16,185,129,0.12)' },
  espera:    { label: '⏳ En espera', color: '#F59E0B', bg: 'rgba(245,158,11,0.12)' },
  urgente:   { label: '⚠ Urgente',   color: '#EF4444', bg: 'rgba(239,68,68,0.12)'  },
}

// Contenido del dashboard que va dentro del marco de MacBook
function DashboardUI({ isActive }: { isActive: boolean }) {
  const espera     = useCountUp(12, isActive, 1200)
  const entregados = useCountUp(47, isActive, 1700)
  const urgentes   = useCountUp(3,  isActive, 900)

  const kpis = [
    {
      label: 'En Espera',
      value: espera,
      color: '#F59E0B',
      bg: 'rgba(245,158,11,0.10)',
      border: 'rgba(245,158,11,0.25)',
      glow: false,
      sub: null,
    },
    {
      label: 'Entregados',
      value: entregados,
      color: '#10B981',
      bg: 'rgba(16,185,129,0.10)',
      border: 'rgba(16,185,129,0.25)',
      glow: false,
      sub: null,
    },
    {
      label: 'Urgentes',
      value: urgentes,
      color: '#EF4444',
      bg: 'rgba(239,68,68,0.10)',
      border: 'rgba(239,68,68,0.40)',
      glow: true,
      sub: 'Requieren atención',
    },
  ]

  return (
    <div className="bg-[#0F2240] p-3 sm:p-5 font-sans">
      {/* Encabezado de la app */}
      <div className="mb-3 sm:mb-5 flex items-center justify-between">
        <div>
          <p className="text-[10px] sm:text-[11px] text-[#7BADD4]">
            Salida escolar · 9 May · 14:34
          </p>
          <p className="text-[13px] sm:text-[14px] font-semibold text-[#F1F5F9]">
            Colegio San Patricio
          </p>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-[#10B981]" />
          <span className="text-[10px] sm:text-[11px] font-medium text-[#10B981]">En vivo</span>
        </div>
      </div>

      {/* KPI Cards — padding y número más chico en mobile */}
      <div className="mb-3 sm:mb-4 grid grid-cols-3 gap-2 sm:gap-3">
        {kpis.map((kpi) => (
          <div
            key={kpi.label}
            className="relative overflow-hidden rounded-xl border p-2.5 sm:p-4"
            style={{ background: kpi.bg, borderColor: kpi.border }}
          >
            {/* Efecto de glow pulsante solo en Urgentes */}
            {kpi.glow && isActive && (
              <motion.div
                className="pointer-events-none absolute inset-0 rounded-xl"
                animate={{
                  boxShadow: [
                    'inset 0 0 0 1px rgba(239,68,68,0.20), 0 0 10px rgba(239,68,68,0.12)',
                    'inset 0 0 0 1px rgba(239,68,68,0.55), 0 0 28px rgba(239,68,68,0.35)',
                    'inset 0 0 0 1px rgba(239,68,68,0.20), 0 0 10px rgba(239,68,68,0.12)',
                  ],
                }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              />
            )}
            <p className="mb-1 text-[10px] sm:text-[11px] text-[#7BADD4]">{kpi.label}</p>
            {/* Número animado — más chico en mobile */}
            <p
              className="text-[26px] sm:text-[38px] font-extrabold leading-none tabular-nums"
              style={{ color: kpi.color }}
            >
              {kpi.value}
            </p>
            {kpi.sub && (
              <p className="mt-1 text-[9px] sm:text-[10px] font-semibold" style={{ color: kpi.color }}>
                {kpi.sub}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Tabla de alumnos — hora y tutor ocultos en mobile */}
      <div className="overflow-hidden rounded-xl border border-[#1E4080]">
        <div className="border-b border-[#1E4080] bg-[#152D5A] px-3 sm:px-4 py-2">
          <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-[#4D7EAE]">
            Registro reciente
          </p>
        </div>
        <div className="divide-y divide-[#1E4080] bg-[#0F2240]">
          {ALUMNOS.map((alumno, i) => {
            const cfg = ESTADO_CONFIG[alumno.estado]
            return (
              <motion.div
                key={alumno.nombre}
                initial={{ opacity: 0, x: -8 }}
                animate={isActive ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.9 + i * 0.13, duration: 0.4, ease: 'easeOut' }}
                className="flex items-center justify-between gap-2 px-3 sm:px-4 py-2 sm:py-2.5"
              >
                <div className="min-w-0">
                  <p className="truncate text-[12px] sm:text-[13px] font-medium text-[#F1F5F9]">
                    {alumno.nombre}
                  </p>
                  <p className="text-[10px] sm:text-[11px] text-[#4D7EAE]">
                    {alumno.grado}
                    <span className="hidden sm:inline"> · {alumno.tutor}</span>
                  </p>
                </div>
                <div className="flex flex-shrink-0 items-center gap-2">
                  <p className="hidden sm:block text-[11px] text-[#4D7EAE]">{alumno.hora}</p>
                  <span
                    className="whitespace-nowrap rounded-full px-2 sm:px-2.5 py-0.5 text-[10px] sm:text-[11px] font-semibold"
                    style={{ color: cfg.color, background: cfg.bg }}
                  >
                    {cfg.label}
                  </span>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// Componente principal — exportado para usar en la landing
export function EkoleDashboardMockup() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })

  return (
    <section ref={sectionRef} className="bg-[#F4F8FC] pb-14 pt-10 md:pb-20 md:pt-14">
      <div className="mx-auto max-w-5xl px-6">
        {/* Etiqueta de contexto */}
        <motion.div
          className="mb-8 text-center"
          initial={{ opacity: 0, y: 14 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <p className="text-[13px] font-semibold uppercase tracking-wide text-[#2EB4E9]">
            Vista del director · En tiempo real
          </p>
          <p className="mt-1.5 text-[17px] font-medium text-[#4B5563]">
            Cada salida registrada. Ningún alumno sale sin evidencia.
          </p>
        </motion.div>

        {/* Marco MacBook con dashboard animado */}
        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.98 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.75, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <MacbookFrame>
            <DashboardUI isActive={isInView} />
          </MacbookFrame>
        </motion.div>
      </div>
    </section>
  )
}
