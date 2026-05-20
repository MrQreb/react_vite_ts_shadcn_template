import { ScrollArea } from '@/components/ui/scroll-area';
import { AnimatePresence, motion } from 'motion/react';
import type { IMesssages } from '../interfaces/Imessage';
import { chatMessageAnimation } from '../animations/chatMessageAnimation';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Bot, FileSpreadsheet, User } from 'lucide-react';

interface Props{
    /** Arreglo de objetos de los mensajes */
    messages:IMesssages[];
    /** Referencia del contenedor donde terminan los mensajes */
    bottomRef:React.RefObject<HTMLDivElement | null>;
}

/** Contenedor de los mensajes del chat
 * @returns Tsx
 */
export const Messages = ({ messages, bottomRef}:Props) => {
    return (
        <div className="flex-1 overflow-hidden">
            <ScrollArea className="h-full">
                
                <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 py-8 md:px-6">
                    <AnimatePresence>
                        {messages.map((message) => {
                            const isUser = message.role === "user";

                            return (
                                <motion.div
                                    key={message.id}
                                    {...chatMessageAnimation} //Animacion del mensaje cuando aparece
                                    className={`flex items-end gap-3 ${isUser ? "justify-end" : "justify-start"
                                        }`}
                                >
                                    {!isUser && (
                                        <Avatar className="size-10 border shadow-sm">
                                            <AvatarFallback className="bg-primary text-primary-foreground">
                                                <Bot size={18} />
                                            </AvatarFallback>
                                        </Avatar>
                                    )}

                                    <div
                                        className={`flex max-w-[85%] flex-col gap-2 ${isUser ? "items-end" : "items-start"
                                            }`}
                                    >
                                        <div
                                            className={`rounded-3xl px-5 py-4 text-sm leading-relaxed shadow-sm ${isUser
                                                ? "rounded-br-md bg-primary text-primary-foreground"
                                                : "rounded-bl-md border bg-card text-card-foreground"
                                                }`}
                                        >
                                            {message.content}
                                        </div>

                                        <span className="px-2 text-xs text-muted-foreground">
                                            {message.time}
                                        </span>
                                    </div>

                                    {isUser && (
                                        <Avatar className="size-10 border shadow-sm">
                                            <AvatarFallback className="bg-muted">
                                                <User size={18} />
                                            </AvatarFallback>
                                        </Avatar>
                                    )}
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>

                    {/* Ejemplo de archivo generado con hover */}
                    <div className="flex items-start gap-3 hover:cursor-pointer">
                        <Avatar className="size-10 border shadow-sm">
                            <AvatarFallback className="bg-primary text-primary-foreground">
                                <Bot size={18} />
                            </AvatarFallback>
                        </Avatar>

                        <div className="max-w-md rounded-3xl rounded-bl-md border bg-card p-4 shadow-sm">
                            <div className="flex items-center gap-3">
                                <div className="flex size-11 items-center justify-center rounded-2xl bg-emerald-500/10">
                                    <FileSpreadsheet className="size-5 text-emerald-500" />
                                </div>

                                <div>
                                    <p className="text-sm font-medium">
                                        facturas_vencidas.xlsx
                                    </p>

                                    <p className="text-xs text-muted-foreground">
                                        Archivo generado correctamente
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Fin de mensajes */}
                    {/* espacio inferior */}
                    <div className="h-4" ref={bottomRef} />
                </div>
            </ScrollArea>
        </div>
  )
}

