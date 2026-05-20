import type { MotionProps } from "motion/react";

/** Animacion de boton de envio */

export const chatInputAnimation = (
    hasText: boolean
): MotionProps => ({

    animate: {
        scale: hasText ? 1 : 0.98,
        opacity: hasText ? 1 : 0.85,
    },

    transition: {
        type: "spring",
        stiffness: 400,
        damping: 18,
    },
});