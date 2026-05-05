export type QId = "q1" | "q2" | "q3" | "q4" | "q5" | "q6" | "q7" | "q8"
export type Answer = "si" | "no"
export type AnswerMap = Partial<Record<QId, Answer>>

export const INVERTED: Record<QId, boolean> = {
  q1: false, q2: false, q3: false, q4: true,
  q5: false, q6: false, q7: true, q8: true,
}

export const WEIGHTS: Record<QId, number> = {
  q1: 2, q2: 2, q3: 2, q4: 2, q5: 1, q6: 1, q7: 2, q8: 2,
}

export const MAX_SCORE = 14

export type Question = {
  id: QId
  num: string
  ref: string
  refTooltip: string
  text: string
  hint: string
  hintCollapsible?: boolean
  feedback: string
}

export type Section = {
  num: string
  title: string
  subtitle: string
  questions: Question[]
}

export const SECTIONS: Section[] = [
  {
    num: "ÁREA 01",
    title: "Documentación legal",
    subtitle: "Avisos de privacidad y consentimientos",
    questions: [
      {
        id: "q1",
        num: "01 / 08",
        ref: "LFPDPPP Art. 15–16",
        refTooltip:
          "Artículos que obligan a los responsables de datos (como colegios) a tener un aviso de privacidad disponible y actualizado al momento de recabar datos personales.",
        text: "¿Tienen aviso de privacidad visible en la entrada del colegio y en sus documentos de inscripción?",
        hint: "Debe informar qué datos recaban, para qué los usan, y cómo el titular puede ejercer sus derechos.",
        feedback: "Esta área genera exposición personal para el director",
      },
      {
        id: "q2",
        num: "02 / 08",
        ref: "LFPDPPP Art. 8–9",
        refTooltip:
          "El uso de imágenes y datos de menores requiere finalidades claras, consentimiento cuando corresponda y documentación suficiente para acreditar autorización.",
        text: "¿Cuentan con autorización firmada de los padres para usar imágenes de los alumnos?",
        hint: "Fotos para anuario, redes sociales, videos de eventos y material de comunicación del colegio.",
        feedback: "El uso de imágenes de menores sin consentimiento expreso es una infracción grave",
      },
    ],
  },
  {
    num: "ÁREA 02",
    title: "Salida escolar segura",
    subtitle: "Protocolo SEP · Registro y control de entregas",
    questions: [
      {
        id: "q3",
        num: "03 / 08",
        ref: "CCF Art. 1920 · LFPDPPP Art. 35",
        refTooltip:
          "Art. 1920: vuelve relevante acreditar diligencia mientras el menor está bajo vigilancia escolar. Art. 35: los derechos ARCO permiten al padre solicitar información formal. Además, los lineamientos de la SEP para entornos escolares seguros recomiendan control visual de quién recoge a cada alumno y flujo de salida documentado.",
        text: "¿Tienen registro formal de quién recogió a cada alumno, con hora exacta y nombre del responsable del colegio que autorizó la entrega?",
        hintCollapsible: true,
        hint: "Haga el ejercicio: ¿puede abrir ahora mismo el registro del martes pasado y decirme quién recogió al alumno Pérez a las 2:47 pm? No vale la memoria del personal ni un chat de WhatsApp — los mensajes se borran, se editan, y no identifican quién del colegio validó la entrega. Si un padre ejerce sus derechos ARCO, usted tiene 20 días hábiles para entregar el registro.",
        feedback: "Sin registro, la defensa documental del colegio se debilita",
      },
      {
        id: "q4",
        num: "04 / 08",
        ref: "LFPDPPP Art. 7 y 9 — datos de menores",
        refTooltip:
          "Artículos que exigen que los datos personales se traten con medidas de seguridad adecuadas. WhatsApp puede elevar el riesgo cuando se usa como sistema principal en teléfonos personales y sin controles documentados.",
        text: "¿Usan WhatsApp para coordinar la salida o manejar información de alumnos?",
        hintCollapsible: true,
        hint: "WhatsApp puede servir como apoyo limitado, pero cuando concentra nombres de alumnos, autorizaciones o incidencias en teléfonos personales, el colegio pierde trazabilidad y control de acceso.",
        feedback: "WhatsApp como sistema principal eleva la exposición documental",
      },
    ],
  },
  {
    num: "ÁREA 03",
    title: "Control de información y protocolos",
    subtitle: "Acceso a datos de alumnos y casos especiales",
    questions: [
      {
        id: "q5",
        num: "05 / 08",
        ref: "LFPDPPP Art. 19 (medidas de seguridad)",
        refTooltip:
          "Obliga a implementar medidas de seguridad administrativas, físicas y técnicas para proteger datos personales contra daño, pérdida, alteración o acceso no autorizado.",
        text: "¿Pueden identificar hoy quién tiene acceso a las listas y expedientes de sus alumnos — incluyendo personal que ya no trabaja en el colegio?",
        hint: "Exmaestros con listas impresas, grupos de WhatsApp con datos de alumnos de ciclos anteriores, hojas de Excel enviadas por correo. La ley exige saber quién tiene sus datos y poder cancelar ese acceso.",
        feedback: "Sin control de acceso, ex-empleados conservan datos de sus alumnos",
      },
      {
        id: "q6",
        num: "06 / 08",
        ref: "Protocolo SEP/AEFCM",
        refTooltip:
          "El protocolo SEP/AEFCM establece que cada alumno debe tener un máximo de 3 personas autorizadas, registradas mediante documento firmado e identificación. Sin protocolo documentado, el director y el maestro quedan expuestos ante situaciones de custodia, restricciones o emergencias.",
        text: "¿Tienen protocolo documentado para custodias legales, restricciones de entrega o persona no registrada?",
        hint: "Un padre con orden de restricción, un menor con indicación médica, alguien que aparece sin estar en la lista.",
        feedback: "Sin protocolo documentado, el equipo queda sin respaldo claro",
      },
    ],
  },
  {
    num: "ÁREA 04",
    title: "Riesgo ambiental por ruido",
    subtitle: "NOM-081-SEMARNAT-1994",
    questions: [
      {
        id: "q7",
        num: "07 / 08",
        ref: "NOM-081-SEMARNAT-1994",
        refTooltip:
          "Norma que fija el límite de 55 dB para fuentes fijas en zonas residenciales. Un altavoz escolar supera ese límite fácilmente.",
        text: "¿Usan altavoz o megáfono para llamar a los alumnos durante la salida?",
        hintCollapsible: true,
        hint: "Dos problemas simultáneos: la NOM-081 fija 55 dB en zonas residenciales y una denuncia activa inspección. Pero el altavoz también significa que no hay ningún proceso de entrega — y sin proceso no hay registro.",
        feedback: "Altavoz = doble exposición: ruido operativo + cero registro de entrega",
      },
      {
        id: "q8",
        num: "08 / 08",
        ref: "NOM-081 / Antecedente formal",
        refTooltip:
          "Un antecedente documentado de queja por ruido significa que la siguiente queja puede generar sanción directa sin nueva medición.",
        text: "¿Han recibido alguna queja formal de vecinos o autoridades por ruido en los últimos 24 meses?",
        hint: "Una queja documentada establece antecedente. Si vuelve a presentarse, conviene tener proceso, medidas y evidencia de corrección.",
        feedback: "Un antecedente activo vuelve más delicada la siguiente revisión",
      },
    ],
  },
]

export type ScenarioTone = "risk" | "amber" | "navy"

export type Scenario = {
  id: string
  trigger: (args: { score: number; isAtRisk: (q: QId) => boolean }) => boolean
  tone: ScenarioTone
  icon: string
  category: string
  title: string
  body: string[]
  consequence: string
}

export const ALL_SCENARIOS: Scenario[] = [
  {
    id: "sc-padre-abogado",
    trigger: ({ isAtRisk }) => isAtRisk("q1") || isAtRisk("q3"),
    tone: "risk",
    icon: "⚖️",
    category: "Civil",
    title: "El padre con abogado",
    body: [
      "Un padre en proceso de divorcio exige al colegio demostrar <strong>a quién le entregaron a su hijo el 15 de noviembre del año pasado a las 12:53 pm</strong>. No pregunta por la semana pasada; pregunta por hace meses, cuando muchas escuelas ya no tienen registro claro.",
      "Si el colegio tiene algún registro pero no puede encontrar el dato de esa fecha, el abogado presenta ejercicio de derechos ARCO. El colegio tiene 20 días hábiles para entregar la información organizada. <strong>Los derechos ARCO no tienen fecha de vencimiento.</strong>",
      "Si el colegio no tiene registro alguno, el problema es peor: ante una demanda civil, el Art. 1920 del CCF vuelve relevante demostrar diligencia. Sin registro, <strong>la defensa se vuelve mucho más débil</strong>.",
      '<strong>Un expediente abierto consume tiempo directivo, honorarios de abogados y reputación — incluso si usted "gana" al final.</strong>',
    ],
    consequence:
      "Con registro incompleto: solicitud ARCO, revisión documental y tiempo directivo. Sin registro alguno, la posición del colegio se vuelve más vulnerable ante una reclamación civil.",
  },
  {
    id: "sc-whatsapp",
    trigger: ({ isAtRisk }) => isAtRisk("q4"),
    tone: "amber",
    icon: "📱",
    category: "Datos personales",
    title: "Cuando WhatsApp se vuelve el sistema de salida",
    body: [
      "WhatsApp puede ser útil como apoyo puntual. El riesgo aparece cuando se vuelve el sistema principal para autorizar, coordinar y documentar la salida de menores.",
      "Si un padre presenta una queja, el chat suele ser lo único disponible. Ese chat puede mostrar nombres de alumnos en teléfonos personales, cambios de autorizado, capturas y decisiones sin trazabilidad institucional.",
      "El punto no es decir que WhatsApp sea ilegal por sí solo; el punto es que deja al colegio con una posición documental más frágil que un flujo controlado.",
    ],
    consequence:
      "Cuando datos de menores circulan sin controles, minimización ni trazabilidad suficiente, el responsable puede quedar expuesto frente a padres o autoridad.",
  },
  {
    id: "sc-control-perdido",
    trigger: ({ isAtRisk }) => isAtRisk("q4"),
    tone: "risk",
    icon: "📲",
    category: "Datos personales",
    title: "El dato que ya no puede recuperar",
    body: [
      "Si la salida se coordina por chats personales, parte de la información de alumnos puede quedar en dispositivos que el colegio no administra ni controla.",
      "<strong>Piense en cuántas cosas pueden pasar sin que nadie tenga mala intención:</strong> una maestra reenvía por error la lista al grupo equivocado. Un maestro comparte el chat con un colega. Un teléfono se pierde. A otro se lo roban. Un maestro que renunció molesto reenvía la información.",
      "<strong>Ninguno requiere un actor malicioso. Solo requiere que la vida normal suceda.</strong>",
      "Si una familia pregunta cómo operaban, el historial de WhatsApp puede mostrar que el colegio dependía de teléfonos personales como repositorio informal de datos de menores.",
    ],
    consequence:
      "El chat deja de ser solo comunicación cuando sustituye al registro institucional de salida.",
  },
  {
    id: "sc-registro",
    trigger: ({ isAtRisk }) => isAtRisk("q3"),
    tone: "risk",
    icon: "📋",
    category: "Civil",
    title: '"Nosotros sí llevamos control" — las 4 respuestas que no funcionan',
    body: [
      '<strong>"Las maestras avisan por el grupo de WhatsApp."</strong> Los mensajes se pueden editar, se pueden borrar. Si una maestra renuncia y cambia de teléfono, el "registro" de meses de operaciones desaparece.',
      '<strong>"Tenemos cámaras."</strong> El disco se sobreescribe a los 7 días. Y aunque grabe la entrega, no documenta quién del colegio la autorizó. <strong>El valor probatorio sin acta firmada es severamente cuestionado.</strong>',
      '<strong>"La maestra apunta en una libreta."</strong> ¿Tiene la libreta de noviembre del año pasado? ¿Está completa? ¿Identifica quién validó? Un cuaderno no es un registro legal.',
      '<strong>"Lo tenemos en Excel."</strong> Carece de <strong>trazabilidad inmutable</strong>. Sin candados informáticos, ante un peritaje judicial pierde valor probatorio.',
    ],
    consequence:
      "Un registro defendible necesita hora exacta, identidad de quien recogió, nombre de quien autorizó y trazabilidad razonable. Si falta cualquiera, la posición del colegio se debilita.",
  },
  {
    id: "sc-altavoz",
    trigger: ({ isAtRisk }) => isAtRisk("q7"),
    tone: "amber",
    icon: "📢",
    category: "Administrativa",
    title: "El megáfono: dos problemas que se combinan",
    body: [
      "<strong>Problema 1 — Ruido.</strong> La NOM-081 fija 55 dB en zonas residenciales. Un altavoz escolar supera ese límite. Una denuncia vecinal activa inspección.",
      "<strong>Problema 2 — Cero registro.</strong> Si se llama a los niños por altavoz, no hay lista, no hay validación, no hay nombre de quién autorizó.",
      "<strong>El Art. 1920 del CCF vuelve relevante demostrar diligencia.</strong> Con un proceso de megáfono, esa demostración se vuelve más difícil.",
      "En casos de menores entregados a personas no autorizadas — divorcios conflictivos, órdenes de restricción — la ausencia de registro puede dejar al director y al equipo sin una explicación documental clara.",
    ],
    consequence:
      "Ruido + cero registro = doble exposición operativa. La ausencia de proceso deja al colegio con menos elementos para responder.",
  },
  {
    id: "sc-antecedente",
    trigger: ({ isAtRisk }) => isAtRisk("q8") && !isAtRisk("q7"),
    tone: "risk",
    icon: "📁",
    category: "Administrativa",
    title: "El antecedente que no desaparece",
    body: [
      "Ya recibieron una queja formal de ruido. Ese expediente existe en los registros de la autoridad.",
      "<strong>Una segunda queja puede ser más delicada cuando ya existe antecedente.</strong> Si la primera queja generó resolución, conviene revisar obligaciones pendientes y reducir frentes de exposición.",
      'Lo que parece resuelto — "pagamos la multa y ya" — dejó abierta una ventana que cualquier vecino puede usar.',
    ],
    consequence:
      "Un antecedente vuelve más importante documentar el proceso y reducir ruido operativo antes de otra revisión.",
  },
  {
    id: "sc-critico",
    trigger: ({ score }) => score > 10,
    tone: "risk",
    icon: "⚠",
    category: "Crítica",
    title: "Cuando se activan varios frentes a la vez",
    body: [
      "El escenario más costoso no es una multa grande — es cuando <strong>varios frentes se activan al mismo tiempo</strong>: un padre con ARCO mientras el vecino denuncia por ruido mientras una ex empleada reporta contraseñas compartidas.",
      "Cada frente requiere atención legal por separado. Cada uno consume tiempo directivo. El conjunto crea una percepción pública que ninguna campaña puede corregir rápidamente.",
      "Las instituciones en esta situación pierden control porque <strong>no tienen documentación suficiente para responder con orden en ninguno de los frentes</strong>.",
    ],
    consequence:
      "La exposición crítica no es un evento — es la confluencia de varios eventos simultáneos contra una institución que no puede demostrar que hizo las cosas bien.",
  },
  {
    id: "sc-director-personal",
    trigger: ({ isAtRisk }) => isAtRisk("q3") || isAtRisk("q6"),
    tone: "risk",
    icon: "👤",
    category: "Civil",
    title: "La reclamación que también toca a la dirección",
    body: [
      "La mayoría de los directores asumen que el colegio absorbe el problema. En la práctica, la dirección también debe poder explicar qué controles existían y cómo se actuó.",
      "Un padre reclama al colegio por entregar a su hijo a la ex pareja sin autorización documentada. La conversación se centra en si hubo protocolo, registro y validación suficiente.",
      "<strong>Esta demanda puede llegar hasta 2 años después</strong> (Art. 1934 CCF). ¿Tiene el registro de hace 2 años? Esa es la ventana que el abogado va a usar.",
      "<strong>Cuando no existe registro, la defensa depende de memoria, chats o versiones del personal.</strong>",
    ],
    consequence:
      "Art. 1920 CCF y Art. 1934 vuelven importante conservar evidencia de entrega. Sin registro, la defensa se debilita.",
  },
  {
    id: "sc-maestro-penal",
    trigger: ({ isAtRisk }) => isAtRisk("q3") || isAtRisk("q5") || isAtRisk("q6"),
    tone: "amber",
    icon: "🚨",
    category: "Penal",
    title: "El maestro que entregó al niño a la persona equivocada",
    body: [
      'Un maestro recibe a un señor que dice ser el tío del alumno. No hay lista formal. El maestro lo conoce "de vista" y entrega al niño. Esa noche, la madre llama: ese señor no debía tener al niño.',
      "La investigación llega al maestro. <strong>¿Con base en qué instrucción entregó al menor?</strong> No hay protocolo, no hay registro. El maestro queda expuesto personalmente.",
      "Ante una denuncia delicada, la autoridad puede revisar qué instrucción recibió la persona que entregó al menor y qué controles tenía la institución.",
    ],
    consequence:
      "Sin protocolo ni registro, la institución tiene menos elementos para respaldar al maestro y explicar la decisión tomada.",
  },
]

export function getNivel(score: number) {
  const pct = Math.round((score / MAX_SCORE) * 100)
  if (score <= 2)
    return {
      nivel: "BAJO" as const,
      pct,
      tagline: `Su nivel de exposición es del ${pct}%. Existen áreas a fortalecer, pero el riesgo inmediato es limitado si mantiene sus protocolos actuales.`,
      color: "text-safe",
      bgFill: "bg-safe",
    }
  if (score <= 6)
    return {
      nivel: "MODERADO" as const,
      pct,
      tagline: `Su nivel de exposición operativa y documental es del ${pct}% por brechas que una familia o tercero podría cuestionar.`,
      color: "text-risk",
      bgFill: "bg-risk",
    }
  if (score <= 10)
    return {
      nivel: "ALTO" as const,
      pct,
      tagline: `Su nivel de exposición civil y administrativa es del ${pct}% por falta de documentación consistente. La información disponible podría no bastar para explicar una entrega cuestionada.`,
      color: "text-[#C2410C]",
      bgFill: "bg-[#EA580C]",
    }
  return {
    nivel: "CRÍTICO" as const,
    pct,
    tagline: `Su nivel de exposición civil, penal y administrativa es del ${pct}%. Un evento adverso podría activar varios frentes de revisión al mismo tiempo.`,
    color: "text-destructive",
    bgFill: "bg-destructive",
  }
}

export type Nivel = ReturnType<typeof getNivel>["nivel"]
