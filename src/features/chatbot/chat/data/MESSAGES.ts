import type { IMesssages } from "../interfaces/Imessage";

/**
 * Arreglo de los mensajes maquetado
 */
export const MESSAGES:IMesssages[] = [
    {
        id: 1,
        role: "assistant",
        content:
            "Hola 👋 Soy tu asistente de facturación. Puedo ayudarte a consultar facturas, clientes, pagos y generar reportes.",
        time: "10:02 AM",
    },
    {
        id: 2,
        role: "user",
        content: "¿Cuántas facturas fueron emitidas hoy?",
        time: "10:03 AM",
    },
    {
        id: 3,
        role: "assistant",
        content:
            "Hoy se registraron 24 facturas emitidas con un total acumulado de $125,430.50 MXN.",
        time: "10:03 AM",
    },
    {
        id: 4,
        role: "user",
        content: "Muéstrame las 5 facturas con mayor monto.",
        time: "10:04 AM",
    },
    {
        id: 5,
        role: "assistant",
        content:
            "Las facturas con mayor monto corresponden a los clientes Marbran, NovaTech y Grupo Delta.",
        time: "10:04 AM",
    },
    {
        id: 6,
        role: "assistant",
        content:
            "También encontré 2 facturas vencidas con más de 30 días pendientes de pago.",
        time: "10:04 AM",
    },
    {
        id: 7,
        role: "user",
        content: "Genera un Excel con las facturas vencidas.",
        time: "10:05 AM",
    },
    {
        id: 8,
        role: "assistant",
        content:
            "Perfecto. Ya preparé el archivo Excel con el detalle de las facturas vencidas y sus clientes asociados.",
        time: "10:05 AM",
    },

    // mensajes extra para probar scroll
    ...Array.from({ length: 15 }).map((_, index) => ({
        id: index + 9,
        role: index % 2 === 0 ? "assistant" : "user",
        content:
            index % 2 === 0
                ? "Este es un mensaje de respuesta del asistente mostrando cómo se comporta el scroll dentro del chat."
                : "Mensaje del usuario para probar el comportamiento del scroll y el input fijo.",
        time: "10:06 AM",
    })),
];