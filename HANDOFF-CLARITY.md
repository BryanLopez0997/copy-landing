# Handoff — Activar Microsoft Clarity en producción

> Instrucciones para el desarrollador (Bryan). El código ya está listo en `main`.
> Solo se requieren 4 pasos externos: 2 en el panel de Clarity y 2 en Vercel.

---

## Datos del proyecto

| Campo | Valor |
|---|---|
| Project ID de Clarity | `wiu6edeqlw` |
| Variable de entorno | `NEXT_PUBLIC_CLARITY_PROJECT_ID` |
| Dominio de producción | `ekole.app` |

---

## Pasos (en este orden exacto)

### Paso 1 — Activar masking en Clarity PRIMERO
**Importante: este paso debe hacerse ANTES de agregar la env var en Vercel.**
Si se invierte el orden, hay un período donde se graban datos personales del formulario sin enmascarar.

1. Entrar a [clarity.microsoft.com](https://clarity.microsoft.com)
2. Seleccionar el proyecto `ekole.app`
3. Ir a **Settings → Masking**
4. Activar **"Mask all"**
5. Guardar cambios

---

### Paso 2 — Agregar la variable de entorno en Vercel

1. Entrar a [vercel.com](https://vercel.com) → seleccionar el proyecto de Ekole
2. Ir a **Settings → Environment Variables**
3. Crear nueva variable:
   - **Name:** `NEXT_PUBLIC_CLARITY_PROJECT_ID`
   - **Value:** `wiu6edeqlw`
   - **Environments:** marcar Production ✓ y Preview ✓
4. Guardar

---

### Paso 3 — Hacer redeploy

Vercel necesita un nuevo deploy para que tome la variable recién agregada.

1. Ir a la pestaña **Deployments** del proyecto en Vercel
2. En el deploy más reciente, clic en los tres puntos `···` → **Redeploy**
3. Confirmar sin cambiar nada más

---

### Paso 4 — Verificar que Clarity está activo

1. Abrir `https://ekole.app/diagnostico` en el navegador
2. Abrir las herramientas de desarrollador (F12) → pestaña **Network**
3. Buscar una petición a `clarity.ms` — si aparece, el script cargó correctamente
4. En el panel de Clarity, tras ~30 minutos empezarán a llegar las primeras sesiones

---

## Por qué el código no necesita cambios

El componente `components/analytics/clarity.tsx` ya está preparado:
- Lee la variable `NEXT_PUBLIC_CLARITY_PROJECT_ID` automáticamente
- Si la variable no está, el script no carga (failsafe — no rompe nada en staging/preview)
- Solo se activa en producción (condición en `app/layout.tsx`)

---

---

# Handoff — Activar Supabase (base de datos de leads)

> El código y la tabla ya están listos. Solo se requiere agregar la variable de entorno en Vercel.

---

## Datos del proyecto

| Campo | Valor |
|---|---|
| Supabase URL | `https://empsvaiihiseksiyghhj.supabase.co` |
| Variable de entorno (URL) | `NEXT_PUBLIC_SUPABASE_URL` |
| Anon Key | `sb_publishable_RsJ8erIUaiaR1jZzbJZX8g_N48bUHtv` |
| Variable de entorno (Key) | `NEXT_PUBLIC_SUPABASE_ANON_KEY` |
| Tabla en Supabase | `leads` (ya creada con RLS activo) |

---

## Pasos

### Paso 1 — Agregar las variables de entorno en Vercel

1. Entrar a [vercel.com](https://vercel.com) → seleccionar el proyecto de Ekole
2. Ir a **Settings → Environment Variables**
3. Crear primera variable:
   - **Name:** `NEXT_PUBLIC_SUPABASE_URL`
   - **Value:** `https://empsvaiihiseksiyghhj.supabase.co`
   - **Environments:** marcar Production ✓ y Preview ✓
4. Crear segunda variable:
   - **Name:** `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **Value:** `sb_publishable_RsJ8erIUaiaR1jZzbJZX8g_N48bUHtv`
   - **Environments:** marcar Production ✓ y Preview ✓
5. Guardar ambas

---

### Paso 2 — Hacer redeploy

1. Ir a la pestaña **Deployments** del proyecto en Vercel
2. En el deploy más reciente, clic en los tres puntos `···` → **Redeploy**
3. Confirmar sin cambiar nada más

---

### Paso 3 — Prueba rápida en producción

1. Abrir `https://ekole.app` → hacer clic en "Agendar llamada por WhatsApp"
2. Llenar el modal con datos de prueba y dar clic en "Continuar a WhatsApp"
3. Entrar a [supabase.com](https://supabase.com) → proyecto Ekole → **Table Editor → leads**
4. Debe aparecer el registro recién creado

---

## Lo que NO necesitas hacer

- **No correr SQL** — la tabla `leads` y sus políticas ya están creadas en Supabase
- **No instalar nada** — `@supabase/supabase-js` ya está en `package.json`
- **No tocar código** — `lib/supabase.ts` ya está configurado y conectado

---

## Para desarrollo local

Crear el archivo `.env.local` en la raíz del proyecto (no va a GitHub, está en `.gitignore`):

```
NEXT_PUBLIC_SUPABASE_URL=https://empsvaiihiseksiyghhj.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_RsJ8erIUaiaR1jZzbJZX8g_N48bUHtv
```

---

## Contacto

Cualquier duda: hipolito.garzon@gmail.com
