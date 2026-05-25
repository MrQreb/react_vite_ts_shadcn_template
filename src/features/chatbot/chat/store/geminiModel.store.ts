import { create } from "zustand";
import { devtools } from "zustand/middleware";

/**
 * Modelo Gemini disponible.
 */
export interface IGeminiModel {

    /**
     * Id interno usado por Gemini API.
     */
    id: string;

    /**
     * Nombre mostrado en UI.
     */
    label: string;

    /**
     * Descripción corta del modelo.
     */
    description: string;
}

/**
 * Lista global de modelos Gemini.
 */
export const GEMINI_MODELS: IGeminiModel[] = [
    {
        id: "gemini-2.5-flash-lite",
        label: "Flash Lite",
        description: "Rápido",
    },
    {
        id: "gemini-2.5-flash",
        label: "Flash",
        description: "Balanceado",
    },
    {
        id: "gemini-2.5-pro",
        label: "Pro",
        description: "Razonamiento",
    },
];

/**
 * Store global del chat.
 */
interface ChatInputStore {

    /**
     * Modelo Gemini seleccionado.
     */
    model: IGeminiModel;

    /**
     * Actualiza el modelo actual.
     */
    setModel: (
        model: IGeminiModel
    ) => void;
}

/**
 * Store global del modelo IA.
 *
 * Default:
 * gemini-2.5-flash
 */
export const useGeminiModel =
    create<ChatInputStore>()(

        devtools(

            (set) => ({

                /**
                 * Modelo default.
                 */
                model: GEMINI_MODELS[1],

                /**
                 * Actualiza modelo global.
                 */
                setModel: (model) =>
                    set({
                        model,
                    }),
            }),
            {
                name: "chat-input-store",
            }

        )

    );