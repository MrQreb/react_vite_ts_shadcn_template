import type { IMessage } from "../interfaces/Imessage";
/**
 * Arreglo de los mensajes maquetado
 */
// export const MESSAGES: IMessage[] = [
//   {
//     id: 1,
//     role: "assistant",
//     content:
//       "Hola 👋 Soy tu asistente de facturación. Puedo ayudarte a consultar facturas, clientes, pagos y generar reportes.",
//     time: "10:02 AM",
//   },
//   {
//     id: 2,
//     role: "user",
//     content: "¿Cuántas facturas fueron emitidas hoy?",
//     time: "10:03 AM",
//   },
//   {
//     id: 3,
//     role: "assistant",
//     content:
//       "Hoy se registraron 24 facturas emitidas con un total acumulado de $125,430.50 MXN.",
//     time: "10:03 AM",
//   },
//   {
//     id: 4,
//     role: "user",
//     content: "Muéstrame las 5 facturas con mayor monto.",
//     time: "10:04 AM",
//   },
//   {
//     id: 5,
//     role: "assistant",
//     content:
//       "Las facturas con mayor monto corresponden a los clientes Marbran, NovaTech y Grupo Delta.",
//     time: "10:04 AM",
//   },
//   {
//     id: 6,
//     role: "assistant",
//     content:
//       "También encontré 2 facturas vencidas con más de 30 días pendientes de pago.",
//     time: "10:04 AM",
//   },
//   {
//     id: 7,
//     role: "user",
//     content: "Genera un Excel con las facturas vencidas.",
//     time: "10:05 AM",
//   },
//   {
//     id: 8,
//     role: "assistant",
//     content:
//       "Perfecto. Ya preparé el archivo Excel con el detalle de las facturas vencidas y sus clientes asociados.Perfecto. Ya preparé el archivo Excel con el detalle de las facturas vencidas y sus clientes asociados.Perfecto. Ya preparé el archivo Excel con el detalle de las facturas vencidas y sus clientes asociados.Perfecto. Ya preparé el archivo Excel con el detalle de las facturas vencidas y sus clientes asociados.Perfecto. Ya preparé el archivo Excel con el detalle de las facturas vencidas y sus clientes asociados.Perfecto. Ya preparé el archivo Excel con el detalle de las facturas vencidas y sus clientes asociados.Perfecto. Ya preparé el archivo Excel con el detalle de las facturas vencidas y sus clientes asociados.Perfecto. Ya preparé el archivo Excel con el detalle de las facturas vencidas y sus clientes asociados.Perfecto. Ya preparé el archivo Excel con el detalle de las facturas vencidas y sus clientes asociados.Perfecto. Ya preparé el archivo Excel con el detalle de las facturas vencidas y sus clientes asociados.Perfecto. Ya preparé el archivo Excel con el detalle de las facturas vencidas y sus clientes asociados.Perfecto. Ya preparé el archivo Excel con el detalle de las facturas vencidas y sus clientes asociados.Perfecto. Ya preparé el archivo Excel con el detalle de las facturas vencidas y sus clientes asociados.Perfecto. Ya preparé el archivo Excel con el detalle de las facturas vencidas y sus clientes asociados.Perfecto. Ya preparé el archivo Excel con el detalle de las facturas vencidas y sus clientes asociados.",
//     time: "10:05 AM",
//   }
// ];


/**
 * Arreglo de mensajes maquetados con Markdown
 */
export const MESSAGES: IMessage[] = [
  {
    id: 1,
    role: "assistant",
    content: `
# 👋 Bienvenido

Soy tu asistente de facturación.

Puedo ayudarte con:

- Consultar facturas
- Revisar pagos
- Generar reportes
- Exportar archivos Excel
- Analizar clientes

> También puedo responder preguntas usando IA en tiempo real.
`,
    time: "10:02 AM",
  },

  {
    id: 2,
    role: "user",
    content: `
¿Cuántas facturas fueron emitidas hoy?
`,
    time: "10:03 AM",
  },

  {
    id: 3,
    role: "assistant",
    content: `
## 📊 Resumen del día

Hoy se registraron:

| Concepto | Total |
|---|---|
| Facturas emitidas | **24** |
| Total acumulado | **$125,430.50 MXN** |
| Clientes atendidos | **12** |

### Estado general

- ✅ 18 facturas pagadas
- 🕒 4 pendientes
- ❌ 2 vencidas
`,
    time: "10:03 AM",
  },

  {
    id: 4,
    role: "user",
    content: `
Muéstrame las 5 facturas con mayor monto.
`,
    time: "10:04 AM",
  },

  {
    id: 5,
    role: "assistant",
    content: `
# 🧾 Facturas con mayor monto

| Folio | Cliente | Monto |
|---|---|---|
| FAC-2011 | Marbran | $25,430 |
| FAC-2010 | NovaTech | $22,150 |
| FAC-2008 | Grupo Delta | $19,880 |
| FAC-2003 | Orion Systems | $18,200 |
| FAC-1998 | Soluciones MX | $16,900 |

---

## Observaciones

> Las facturas de **Marbran** y **NovaTech** representan el 38% del total facturado hoy.
`,
    time: "10:04 AM",
  },

  {
    id: 6,
    role: "assistant",
    content: `
# ⚠️ Facturas vencidas

Encontré **2 facturas** con más de **30 días pendientes**.

## Clientes afectados

- Marbran
- Grupo Delta

## Recomendación

Puedes:

1. Enviar recordatorio automático
2. Generar reporte Excel
3. Bloquear nuevas órdenes temporalmente
`,
    time: "10:04 AM",
  },

  {
    id: 7,
    role: "user",
    content: `
Genera un Excel con las facturas vencidas.
`,
    time: "10:05 AM",
  },

  {
    id: 8,
    role: "assistant",
    content: `
# ✅ Archivo generado correctamente

Preparé el archivo:

\`\`\`
facturas_vencidas.xlsx
\`\`\`

## El reporte incluye

- Cliente
- Folio
- Fecha de emisión
- Fecha de vencimiento
- Días vencidos
- Total pendiente

---

## Vista previa

| Cliente | Folio | Días vencidos | Total |
|---|---|---|---|
| Marbran | FAC-1882 | 45 | $12,500 |
| Grupo Delta | FAC-1840 | 33 | $8,200 |

---

## Código de ejemplo

\`\`\`ts
const response = await fetch("/api/export");

const blob = await response.blob();

download(blob);
\`\`\`

> El archivo ya está listo para descargar.
`,
    time: "10:05 AM",
  },

  {
    id: 9,
    role: "assistant",
    content: `
# 💻 Ejemplo SQL

\`\`\`sql
SELECT
    cliente,
    total,
    fecha_vencimiento
FROM facturas
WHERE estado = 'VENCIDA'
ORDER BY total DESC;
\`\`\`
`,
    time: "10:06 AM",
  },

  {
    id: 10,
    role: "assistant",
    content: `
# 🌐 JSON de respuesta

\`\`\`json
{
  "success": true,
  "file": "facturas_vencidas.xlsx",
  "records": 2
}
\`\`\`
`,
    time: "10:06 AM",
  },

  {
    id: 11,
    role: "assistant",
    content: `
# 🔗 Links de prueba

- [OpenAI](https://openai.com)
- [Shadcn UI](https://ui.shadcn.com)
- [Streamdown](https://github.com/vercel/streamdown)

---

## Texto largo para probar overflow

Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernaturaspernaturaspernaturaspernaturaspernaturaspernaturaspernaturaspernaturaspernaturaspernaturaspernaturaspernatur.

\`\`\`bash
npm install streamdown shiki
\`\`\`
`,
    time: "10:07 AM",
  },
  {
    id: 12,
    role: "assistant",
    content:
      "Hola 👋 Soy tu asistente de facturación. Puedo ayudarte a consultar facturas, clientes, pagos y generar reportes.",
    time: "10:02 AM",
  },
  {
    id: 13,
    role: "user",
    content: "¿Cuántas facturas fueron emitidas hoy?",
    time: "10:03 AM",
  },
  {
    id: 14,
    role: "assistant",
    content:
      "Hoy se registraron 24 facturas emitidas con un total acumulado de $125,430.50 MXN.",
    time: "10:03 AM",
  },
  {
    id: 15,
    role: "user",
    content: "Muéstrame las 5 facturas con mayor monto.",
    time: "10:04 AM",
  },
  {
    id: 16,
    role: "assistant",
    content:
      "Las facturas con mayor monto corresponden a los clientes Marbran, NovaTech y Grupo Delta.",
    time: "10:04 AM",
  },
  {
    id: 17,
    role: "assistant",
    content:
      "También encontré 2 facturas vencidas con más de 30 días pendientes de pago.",
    time: "10:04 AM",
  },
  {
    id: 18,
    role: "user",
    content: "Genera un Excel con las facturas vencidas.",
    time: "10:05 AM",
  },
  {
    id: 19,
    role: "assistant",
    content:
      "Perfecto. Ya preparé el archivo Excel con el detalle de las facturas vencidas y sus clientes asociados.Perfecto. Ya preparé el archivo Excel con el detalle de las facturas vencidas y sus clientes asociados.Perfecto. Ya preparé el archivo Excel con el detalle de las facturas vencidas y sus clientes asociados.Perfecto. Ya preparé el archivo Excel con el detalle de las facturas vencidas y sus clientes asociados.Perfecto. Ya preparé el archivo Excel con el detalle de las facturas vencidas y sus clientes asociados.Perfecto. Ya preparé el archivo Excel con el detalle de las facturas vencidas y sus clientes asociados.Perfecto. Ya preparé el archivo Excel con el detalle de las facturas vencidas y sus clientes asociados.Perfecto. Ya preparé el archivo Excel con el detalle de las facturas vencidas y sus clientes asociados.Perfecto. Ya preparé el archivo Excel con el detalle de las facturas vencidas y sus clientes asociados.Perfecto. Ya preparé el archivo Excel con el detalle de las facturas vencidas y sus clientes asociados.Perfecto. Ya preparé el archivo Excel con el detalle de las facturas vencidas y sus clientes asociados.Perfecto. Ya preparé el archivo Excel con el detalle de las facturas vencidas y sus clientes asociados.Perfecto. Ya preparé el archivo Excel con el detalle de las facturas vencidas y sus clientes asociados.Perfecto. Ya preparé el archivo Excel con el detalle de las facturas vencidas y sus clientes asociados.Perfecto. Ya preparé el archivo Excel con el detalle de las facturas vencidas y sus clientes asociados.",
    time: "10:05 AM",
  }
];