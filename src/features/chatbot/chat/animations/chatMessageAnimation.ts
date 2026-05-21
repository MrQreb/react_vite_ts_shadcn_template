import type { MotionProps } from "framer-motion";

/** Animacion de aparicion de los mensajes */
export const chatMessageAnimation: MotionProps = {
    initial: {
        opacity: 0,
        y: 20,
        scale: 0.98,
    },

    animate: {
        opacity: 1,
        y: 0,
        scale: 1,
    },

    exit: {
        opacity: 0,
        y: -10,
    },

    transition: {
        duration: 0.4,
    },
};