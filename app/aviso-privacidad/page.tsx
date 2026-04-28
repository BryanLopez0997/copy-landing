import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Aviso de Privacidad — Ekole",
  description: "Información sobre el tratamiento de datos personales en Ekole conforme a la LFPDPPP.",
  robots: { index: false },
}

export default function AvisoPrivacidadPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="mx-auto max-w-3xl px-6 py-5">
          <Link
            href="/diagnostico"
            className="text-sm font-semibold text-primary transition-colors hover:text-primary-dark"
          >
            ← Volver al diagnóstico
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-14">
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
          Aviso de Privacidad
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Última actualización: 27 de abril de 2026
        </p>

        <div className="mt-10 space-y-8 text-[15px] leading-relaxed text-foreground/85 [&_h2]:mb-3 [&_h2]:mt-8 [&_h2]:text-base [&_h2]:font-bold [&_h2]:text-foreground [&_strong]:font-semibold [&_strong]:text-foreground">

          <section>
            <h2>Responsable del tratamiento</h2>
            <p>
              <strong>Ekole</strong> es el responsable del tratamiento de sus datos personales conforme
              a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares
              (LFPDPPP). Para cualquier solicitud o duda puede escribirnos a:{" "}
              <a
                href="mailto:contacto@ekole.app"
                className="text-primary underline-offset-4 hover:underline"
              >
                contacto@ekole.app
              </a>
            </p>
          </section>

          <section>
            <h2>Datos personales que recabamos</h2>
            <p>
              A través del formulario de diagnóstico recabamos: <strong>nombre</strong>,{" "}
              <strong>nombre del colegio</strong> y <strong>número de teléfono celular</strong>.
            </p>
            <p className="mt-3">
              Adicionalmente, generamos una <strong>clave de referencia anónima</strong> que se
              almacena localmente en su dispositivo (localStorage del navegador) para medir el
              alcance viral de la herramienta. Esta clave no contiene datos personales
              identificables y no puede revertirse a su información original.
            </p>
          </section>

          <section>
            <h2>Finalidad del tratamiento</h2>
            <p>Sus datos se utilizan para:</p>
            <ul className="mt-2 space-y-1.5 pl-5 list-disc">
              <li>
                Enviarle por WhatsApp la Guía de Protección Legal personalizada para su colegio.
              </li>
              <li>
                Enviarle comunicaciones posteriores relacionadas con el cumplimiento legal para
                colegios privados en México.
              </li>
            </ul>
            <p className="mt-3">
              No compartimos sus datos con terceros comerciales. Únicamente los procesamos a través de
              proveedores tecnológicos que nos ayudan a operar este servicio (Vercel, Inc. —
              infraestructura de hospedaje y analítica anónima de uso del sitio).
            </p>
          </section>

          <section>
            <h2>Analítica y almacenamiento técnico</h2>
            <p>
              Utilizamos <strong>Vercel Analytics</strong> para medir el tráfico de esta página de
              forma anónima. Esta herramienta no recolecta datos personales identificables ni instala
              cookies en su dispositivo.
            </p>
            <p className="mt-3">
              El almacenamiento local (localStorage) se usa exclusivamente para guardar la clave de
              referencia anónima mencionada anteriormente. No utilizamos cookies de rastreo ni
              publicidad.
            </p>
          </section>

          <section>
            <h2>Derechos ARCO</h2>
            <p>
              Conforme a la LFPDPPP, usted tiene derecho a <strong>Acceder</strong>,{" "}
              <strong>Rectificar</strong>, <strong>Cancelar</strong> u <strong>Oponerse</strong> al
              tratamiento de sus datos personales.
            </p>
            <p className="mt-3">
              Para ejercer sus derechos ARCO, envíe un correo a{" "}
              <a
                href="mailto:contacto@ekole.app"
                className="text-primary underline-offset-4 hover:underline"
              >
                contacto@ekole.app
              </a>{" "}
              indicando su nombre y la solicitud específica. Responderemos en un plazo no mayor a{" "}
              <strong>20 días hábiles</strong>.
            </p>
          </section>

          <section>
            <h2>Cambios a este aviso</h2>
            <p>
              Ekole puede actualizar este aviso en cualquier momento. La fecha de última
              actualización aparece al inicio de esta página. El uso continuado de la herramienta
              después de cualquier cambio implica la aceptación del aviso vigente.
            </p>
          </section>
        </div>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto max-w-3xl px-6 py-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Ekole · contacto@ekole.app
        </div>
      </footer>
    </div>
  )
}
