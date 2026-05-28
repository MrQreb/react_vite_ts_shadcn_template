import type { IMessage } from "../interfaces/Imessage";

/**
 * Obtiene la hora en formato HH:mm:ss
 */
const getCurrentTime = (): string =>
  new Date().toLocaleTimeString("es-MX", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

/**
 * Arreglo de mensajes maquetados con Markdown
 */

/**
 * Mensajes iniciales del asistente
 */
/**
 * Mensajes iniciales del asistente
 */
export const MESSAGES: IMessage[] = [
  {
    id: 1,
    role: "assistant",
    content: `
  # Bienvenido

  Soy tu asistente de facturación.

  ## ¿Qué puedo hacer?

  ##### Consultar facturas
  ##### Verificar ventas
  ##### Generar reportes
  ##### Exportar archivos Excel

  > Nota:
  > Todas las consultas, reportes y archivos disponibles utilizan parámetros prediseñados.

  ---

  Escribe tu consulta para comenzar.
    `.trim(),
    time: getCurrentTime(),
  },
];
