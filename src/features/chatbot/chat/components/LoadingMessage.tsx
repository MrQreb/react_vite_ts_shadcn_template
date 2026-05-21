import { motion } from "motion/react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bot } from "lucide-react";

const dotVariants = {
    animate: {
        y: [0, -6, 0],
        scale: [1, 1.2, 1],
        opacity: [0.4, 1, 0.4],
    },
};

/** Mensaje de animacion del LLM
 * @returns Tsx component
 */
export const LoadingMessage = () => {
    return (
        <motion.div
            initial={{
                opacity: 0,
                y: 10,
                scale: 0.98,
            }}
            animate={{
                opacity: 1,
                y: 0,
                scale: 1,
            }}
            exit={{
                opacity: 0,
                y: 10,
            }}
            transition={{
                duration: 0.25,
            }}
            className="flex items-end gap-3"
        >
            {/* Avatar */}
            <motion.div
                animate={{
                    scale: [1, 1.05, 1],
                }}
                transition={{
                    repeat: Infinity,
                    duration: 2,
                    ease: "easeInOut",
                }}
            >
                <Avatar className="size-10 border shadow-sm">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                        <Bot size={18} />
                    </AvatarFallback>
                </Avatar>
            </motion.div>

            {/* Bubble */}
            <motion.div
                animate={{
                    boxShadow: [
                        "0 0 0 rgba(0,0,0,0)",
                        "0 0 12px rgba(255,255,255,0.05)",
                        "0 0 0 rgba(0,0,0,0)",
                    ],
                }}
                transition={{
                    repeat: Infinity,
                    duration: 2,
                }}
                className="
                    rounded-3xl
                    rounded-bl-md
                    border
                    bg-card
                    px-5
                    py-4
                    shadow-sm
                "
            >
                <div className="flex items-center gap-2">

                    {[0, 0.2, 0.4].map((delay, index) => (
                        <motion.div
                            key={index}
                            variants={dotVariants}
                            animate="animate"
                            transition={{
                                repeat: Infinity,
                                duration: 1,
                                delay,
                                ease: "easeInOut",
                            }}
                            className="
                                h-3
                                w-3
                                rounded-full
                                bg-primary
                            "
                        />
                    ))}

                </div>
            </motion.div>
        </motion.div>
    );
};