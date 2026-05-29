import {Brain, Zap, type LucideProps } from "lucide-react";
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
   * Nombre del modelo.
   */
  name: string;

  /**
   * Descripción corta del modelo.
   */
  description: string;

  /** Icono de Lucide Icons */
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
}

/**
 * Lista global de modelos Gemini.
 */
export const GEMINI_MODELS: IGeminiModel[] = [
  {
    id: "gemini-2.5-flash",
    name:"gemini-2.5-flash",
    label: "Flash Lite",
    description: "Rápido",
    icon: Zap,
  },
  {
    id: "gemini-3.5-flash",
    name:"gemini-3.5-flash",
    label: "Flash",
    description: "Balanceado",
    icon: Brain,
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
  setModel: (model: IGeminiModel) => void;
}

/**
 * Store global del modelo IA.
 *
 * Default:
 * gemini-2.5-flash
 */
export const useGeminiModel = create<ChatInputStore>()(
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
    },
  ),
);
