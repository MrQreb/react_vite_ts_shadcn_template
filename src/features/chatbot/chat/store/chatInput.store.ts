import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface ChatInputStore {
  /** Texto */
  text: string;

  /** Actualiza el texto del input */
  setText: (value: string) => void;

  /** Limpia el texto */
  clearText: () => void;
}

/**
 * Store global del chat input del lado del usuario.
 */
export const useChatInputStore = create<ChatInputStore>()(
  devtools(
    (set) => ({
      text: "",

      setText: (value) =>
        set({
          text: value,
        }),

      clearText: () =>
        set({
          text: "",
        }),
    }),
    {
      name: "chat-input-store",
    },
  ),
);
