import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { motion } from 'motion/react';
import { MESSAGES } from "../data/MESSAGES";
import { Separator } from '@/components/ui/separator';
import { SendHorizonal } from "lucide-react";
import { Header, Messages } from "../components";
import { chatInputAnimation, sendButtonAnimation } from "../animations";

/** Componente de la pagina del chat */
export const ChatPage = () => {
    const MotionButton = motion.create(Button);
    const MotionInput = motion.create(Input);

    //Referencia del formulario
    const bottomRef = useRef<HTMLDivElement | null>(null);

    let [inputText, setInputText] = useState("");
    let [messages, setMessages] = useState(MESSAGES);


    const addNewMessage = (value: string) => {

        const newMessage = {
            id: messages.length + 1,
            role: "user",
            content: value,
            time: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
            }),
        };

        const botMessage = {
            id: messages.length + 1,
            role: "assistant",
            content: "Hola carnal",
            time: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
            }),
        };

        //agregar mensaje
        setMessages((prev) => [...prev, newMessage, botMessage]);

    }

    const handleOnClick = (): void => {
        if (!inputText.trim()) return;
        addNewMessage(inputText);
        setInputText("");
    }

    /** Manda hazta el final de los mensajes */
    useEffect(() => {
        bottomRef.current?.scrollIntoView({
            behavior: 'smooth'
        });

    }, [messages])



    return (
        //Contenedor del chat
        <div className="h-screen bg-background p-4 md:p-6">

            <Card className="mx-auto flex h-full max-w-9xl flex-col overflow-hidden rounded-3xl border bg-background shadow-2xl">

                {/* Header */}
                <Header />

                {/* Scroll mensajes */}
                <Messages bottomRef={bottomRef} messages={messages} />

                <Separator />

                {/* Input de mensaje usuario */}
                <div className="sticky bottom-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
                    <div className="mx-auto w-full max-w-6xl p-4 md:p-6">
                        <div className="flex items-center gap-3">
                            <MotionInput
                                {...chatInputAnimation(!!inputText)}
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                placeholder="Escribe un mensaje..."
                                className="h-14 rounded-2xl border bg-muted/40 px-5 text-sm shadow-sm"
                            />

                            <MotionButton
                                {...sendButtonAnimation}
                                size="icon"
                                className="size-14 rounded-2xl shadow-md"
                                onClick={
                                    handleOnClick
                                }
                            >
                                <SendHorizonal className="size-5" />
                            </MotionButton>
                        </div>

                        <p className="mt-3 text-center text-md text-muted-foreground font-semibold">
                            El asistente puede cometer errores. Verifica la información
                            importante.
                        </p>
                    </div>
                </div>
            </Card>
        </div>
    );
};