import { ImageResponse } from 'next/og'

// Metadatos del archivo: Next.js los lee automáticamente
export const runtime = 'edge'
export const alt = 'Diagnóstico de exposición legal para colegios — Ekole'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

// Función que devuelve el SVG del checkmark (verde).
// Usamos SVG inline en lugar del símbolo ✓ Unicode porque la fuente
// que usa next/og no incluye ese carácter y se renderiza como cuadrado roto.
const renderCheck = () => (
  <svg
    width="30"
    height="30"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#178C65"
    strokeWidth="3.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 13l4 4L19 7" />
  </svg>
)

// Esta función genera la imagen Open Graph que aparece al compartir el link
// en WhatsApp, LinkedIn, Facebook, etc. Next.js la sirve en /diagnostico/opengraph-image
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#102C51',
          padding: '80px',
          fontFamily: 'sans-serif',
          color: 'white',
        }}
      >
        {/* Marca EKOLE — más prominente (38px) y separada del titular */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            fontSize: 38,
            fontWeight: 800,
            color: '#DC8409',
            letterSpacing: '0.08em',
            marginBottom: 24,
          }}
        >
          EKOLE
        </div>

        {/* Cuerpo: titular + subtítulo + badge legal + microcopy */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {/* Titular principal — palabra "expones" en ámbar para énfasis */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              fontSize: 76,
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              marginBottom: 32,
            }}
          >
            <span>Descubre cuánto te&nbsp;</span>
            <span style={{ color: '#DC8409' }}>expones&nbsp;</span>
            <span>si un padre presenta un reclamo</span>
          </div>

          {/* Subtítulo */}
          <div
            style={{
              fontSize: 32,
              fontWeight: 500,
              color: '#94A3B8',
              marginBottom: 28,
              display: 'flex',
            }}
          >
            Diagnóstico SEP + protección de datos de alumnos
          </div>

          {/* Badge de beneficio — promesa concreta del diagnóstico
              (activa la curiosidad: "¿en cuáles NO estoy cubierto?") */}
          <div style={{ display: 'flex', marginBottom: 32 }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '12px 26px',
                background: 'rgba(220, 132, 9, 0.14)',
                border: '2px solid #DC8409',
                borderRadius: 999,
                fontSize: 20,
                fontWeight: 600,
                color: '#DC8409',
                letterSpacing: '0.02em',
              }}
            >
              Sabe en qué áreas estás cubierto · y en cuáles no
            </div>
          </div>

          {/* Microcopy con beneficios de baja fricción y checkmarks SVG */}
          <div
            style={{
              fontSize: 26,
              color: '#CBD5E1',
              display: 'flex',
              alignItems: 'center',
              gap: 28,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              {renderCheck()}
              <span>90 segundos</span>
            </div>
            <span style={{ color: '#475569' }}>·</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              {renderCheck()}
              <span>Sin registro</span>
            </div>
            <span style={{ color: '#475569' }}>·</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              {renderCheck()}
              <span>Confidencial</span>
            </div>
          </div>
        </div>

        {/* Pie: dominio de la página */}
        <div
          style={{
            display: 'flex',
            color: '#64748B',
            fontSize: 24,
          }}
        >
          ekole.app/diagnostico
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
