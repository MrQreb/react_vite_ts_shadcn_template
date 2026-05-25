import type { ChatFileResponse } from "../../api/dto";

/** Clasificacion de quien viene el mensaje */
export type MessageRole = "user" | "assistant";

/** Interfaz de reglas del mensaje */
export interface IMessage {
  /** Id generado */
  id: number;
  role: MessageRole;
  /** Contenido del mensaje */
  content: string;
  /** Fecha de creacion */
  time: string;
  file?: ChatFileResponse;
}
