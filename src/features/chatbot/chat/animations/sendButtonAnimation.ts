import type { MotionProps } from "motion/react";

/** Animacion de boton de envio */
export const sendButtonAnimation: MotionProps = {
  whileHover: {
    scale: 1.05,
    y: -2,
  },
  whileTap: {
    scale: 0.9,
  },
  transition: {
    type: "spring",
    stiffness: 700,
    damping: 10,
  },
};
