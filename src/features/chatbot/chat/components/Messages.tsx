import { ScrollArea } from '@/components/ui/scroll-area';
import { AnimatePresence, motion } from "framer-motion";
import type { IMessage } from '../interfaces/Imessage';
import { chatMessageAnimation } from '../animations/chatMessageAnimation';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Bot, User } from 'lucide-react';
import { LoadingMessage } from './LoadingMessage';
import { useEffect, useRef } from 'react';
import { Streamdown } from 'streamdown';
import { MessageFileCard } from './MessageFileCard';

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
        <div className="flex-1 overflow-hidden">

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

                                    {/* Avatar del assistant */}
                                    {!isUser && (
                                        <Avatar className="size-10 shrink-0 border shadow-sm">
                                            <AvatarFallback className="bg-primary text-primary-foreground">
                                                <Bot size={18} />
                                            </AvatarFallback>
                                        </Avatar>
                                    )}

                                    {/* Contenedor flexible del mensaje */}
                                    <div
                                        className={`
                                            flex
                                            min-w-0
                                            flex-1
                                            flex-col
                                            gap-2
                                            ${isUser
                                                ? "items-end"
                                                : "items-start"
                                            }
                                        `}
                                    >

                                        {/* Bubble del mensaje */}
                                        <div
                                            className={`
                                                markdown-container

                                                min-w-0
                                                w-fit
                                                max-w-[85vw]

                                                sm:max-w-[75vw]
                                                lg:max-w-[65vw]

                                                overflow-hidden
                                                rounded-3xl
                                                px-4
                                                py-4
                                                sm:px-5
                                                shadow-sm

                                                ${isUser
                                                    ? "rounded-br-md bg-primary text-primary-foreground"
                                                    : "rounded-bl-md border bg-card text-card-foreground"
                                                }
                                            `}
                                        >

                                            {/* Renderizado markdown/texto */}
                                            <Streamdown className="markdown">
                                                {message.content}
                                            </Streamdown>

                                            {/* Archivo adjunto */}
                                            {message.file && (
                                                <MessageFileCard
                                                    fileName={message.file.fileName}
                                                    url={message.file.url}
                                                    contentType={message.file.contentType}
                                                />
                                            )}

                                        </div>

                                        {/* Hora del mensaje */}
                                        <span className="px-2 text-xs text-muted-foreground">
                                            {message.time}
                                        </span>

                                    </div>

                                    {/* Avatar del usuario */}
                                    {isUser && (
                                        <Avatar className="size-10 shrink-0 border shadow-sm">
                                            <AvatarFallback className="bg-muted">
                                                <User size={18} />
                                            </AvatarFallback>
                                        </Avatar>
                                    )}

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