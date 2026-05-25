import { baseUrl } from "@/config/baseUrl";
import { api } from "@/shared/services/api";
import type { ChatRequest } from "../dto/ChatRequest";
import type { ChatResponse } from "../dto/ChatResponse";


/** Servicio encargada de la logica de la parte del chat de facturacion */
export class FacturacionService {
  private readonly url: string;

  constructor() {
    if (!baseUrl) {
      throw new Error("La variable de entorno no esta inicializada");
    }

    this.url = `${baseUrl}/api/v1/chat/facturas`;
  }

  /** Permite chatear con el modo de facturacion de la api
   * @param ChatRequest
    */
  chat = async (data: ChatRequest): Promise<ChatResponse> => {
    const response:ChatResponse = await api(this.url, {
      body: JSON.stringify(data),
      method: "POST",
    });


    return response;
  };
}
