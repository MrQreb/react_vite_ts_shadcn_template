import { motion } from "motion/react";
import { useEffect, useState } from "react";

const sprites = [
  "/assets/brocoli/01_main_idle.png",
  "/assets/brocoli/02_laptop.png",
  "/assets/brocoli/03_thinking.png",
  "/assets/brocoli/04_idea.png",
];

export const AnimatedBrocoli = () => {

  const [currentFrame, setCurrentFrame] = useState(0);

  useEffect(() => {

    const interval = setInterval(() => {

      setCurrentFrame((prev) =>
        prev === sprites.length - 1
          ? 0
          : prev + 1
      );

    }, 250);

    return () => clearInterval(interval);

  }, []);

  return (
    <motion.img
      src={sprites[currentFrame]}
      alt="Brocoli Assistant"
      className="
        w-20
        h-20
        object-contain
        pixel-art
      "
      animate={{
        y: [0, -2, 0],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
      }}
    />
  );
};