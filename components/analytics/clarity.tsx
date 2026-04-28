import Script from "next/script"

// Microsoft Clarity — heatmaps + grabaciones de sesión.
// Solo se inyecta si la variable NEXT_PUBLIC_CLARITY_PROJECT_ID está configurada.
// Sin la variable, no carga script y no se rastrea nada (failsafe).
//
// IMPORTANTE — Privacidad de inputs del formulario:
// El masking de campos sensibles (nombre, colegio, teléfono) se configura
// en el panel de Clarity (clarity.microsoft.com → Settings → Masking → "Mask all").
// No requiere tocar este código; es un toggle en la consola de Clarity.
export function Clarity() {
  const projectId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID
  if (!projectId) return null

  return (
    <Script id="ms-clarity" strategy="afterInteractive">
      {`
        (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "${projectId}");
      `}
    </Script>
  )
}
