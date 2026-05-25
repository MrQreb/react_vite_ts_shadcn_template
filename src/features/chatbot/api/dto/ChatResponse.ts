/** Respuesta del LLM */
export interface ChatResponse {
  answer: string;
  file?: ChatFileResponse;
}

/** En caso de que devuelva algun archivo */
export interface ChatFileResponse {
  fileName?: string;
  contentType?: string;
  url?: string;
}
