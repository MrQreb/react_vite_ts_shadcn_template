import { ScrollArea } from '@/components/ui/scroll-area';
import { AnimatePresence, motion } from "framer-motion";
import type { IMessage } from '../interfaces/Imessage';
import { chatMessageAnimation } from '../animations/chatMessageAnimation';
import { LoadingMessage } from './LoadingMessage';
import { useEffect, useRef } from 'react';
import { chatTourClassNames } from '../tour/chatTourClassNames';
import { UserMessage } from './UserMessage';
import { AssistantMessage } from './AssistantMessage';

interface Props {
    /** Arreglo de objetos de los mensajes */
    messages: IMessage[];

    /** Permite saber si está pendiente el mensaje generado por el LLM */
    isPending: boolean;
}

/**
 * Contenedor principal de mensajes del chat.
 *
 * Características:
 * - Compatible con texto plano y Markdown
 * - Responsive para mobile y desktop
 * - Soporte para tablas y bloques de código
 * - Scroll automático al último mensaje
 * - Compatible con Streamdown
 *
 * @returns TSX
 */
export const Messages = ({ messages, isPending }: Props) => {

    /** Referencia usada para mover el scroll al final */
    const bottomRef = useRef<HTMLDivElement | null>(null);

    /**
     * Hace scroll automático al último mensaje
     * cada vez que cambia el arreglo de mensajes.
     */
    useEffect(() => {
        bottomRef.current?.scrollIntoView({
            behavior: 'smooth'
        });
    }, [messages]);

    return (
        <div className={`flex-1 overflow-hidden ${chatTourClassNames.message}`}>

            {/* Contenedor scrolleable del chat */}
            <ScrollArea className="h-full w-full">

                {/* Wrapper central del contenido */}
                <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-8 md:px-6">

                    <AnimatePresence>

                        {messages.map((message) => {

                            /** Permite saber si el mensaje pertenece al usuario */
                            const isUser = message.role === "user";

                            return (
                                <motion.div
                                    key={message.id}
                                    {...chatMessageAnimation}
                                    className={`
                                        flex
                                        min-w-0
                                        items-end
                                        gap-2
                                        sm:gap-3
                                        ${isUser
                                            ? "justify-end"
                                            : "justify-start"
                                        }
                                    `}
                                >

                                    {isUser
                                        ? <UserMessage message={message} />
                                        : <AssistantMessage message={message} />
                                    }

                                </motion.div>
                            );
                        })}

                        {/* Animación mientras el LLM genera respuesta */}
                        {isPending && <LoadingMessage />}

                    </AnimatePresence>

                    {/* Referencia usada para scroll automático */}
                    <div
                        className="h-4"
                        ref={bottomRef}
                    />

                </div>
            </ScrollArea>
        </div>
    );
};