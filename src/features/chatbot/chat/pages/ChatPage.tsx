import { useState } from "react";
import { Card } from "@/components/ui/card";
import { MESSAGES } from "../data/MESSAGES";
import { Separator } from '@/components/ui/separator';
import { ChatInput, Header, Messages } from "../components";
import { facturacionService } from "../../api/instances/facturacion.instances";
import type { IMessage, MessageRole } from "../interfaces/Imessage";
import { useMutation } from "@tanstack/react-query";

/** Pagina encargada del chatbot.
* @returns Tsx component
*/
export const ChatPage = () => {
    let [inputText, setInputText] = useState("");
    let [messages, setMessages] = useState(MESSAGES);
    const emptyTextInput: boolean = inputText.length === 0;

    /** Permite generar el mensaje en base al texto y el rol
     * @param value - string
     * @param role - MessageRole
     */
    const createMessage = (
        value: string,
        role: MessageRole
    ): IMessage => {

        const time = new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        });

        return {
            id: Date.now() + Math.floor(Math.random() * 1000),
            content: value,
            role,
            time
        };
    };

    const { mutate, isPending, isError } = useMutation({
        mutationFn: async (value: string) => {
            return facturacionService.chat({
                message: value
            });
        },
        onSuccess: (data) => {

            const botMessage = createMessage(
                data?.answer,
                'assistant'
            );

            setMessages((prev) => [
                ...prev,
                botMessage
            ]);
        },
        onError: () => {
            const errorMessage = createMessage(
                "Ocurrió un error al procesar el mensaje. Contacte al desarrollador",
                "assistant"
            );
            setMessages((prev) => [
                ...prev,
                errorMessage
            ]);
        }
    });

    /** Anade el mensaje, renderiza y ejecuta la mutacion */
    const addNewMessage = (value: string) => {
        const userMessage = createMessage(
            value,
            'user'
        );

        //Mandar mensaje del usuario
        setMessages((prev) => [
            ...prev,
            userMessage
        ]);

        // Ejecuta mutation
        mutate(value);
    }

    /** Mandeja el evento de enviar mensaje */
    const handleOnClick = (): void => {
        if (!inputText.trim()) return;
        addNewMessage(inputText);
        setInputText("");
    }

    return (
        //Contenedor del chat
        <div className="h-screen bg-background p-4 md:p-6">

            <Card className="mx-auto flex h-full max-w-9xl flex-col overflow-hidden rounded-3xl border bg-background shadow-2xl">

                {/* Header donde muestro la parte de tarjetia del cahtbo*/}
                <Header />

                {/* Contenedor de mensajes */}
                <Messages isPending={isPending} messages={messages} />


                <Separator />

                {/* Input de mensaje usuario */}
                <ChatInput
                    value={inputText}
                    onChange={setInputText}
                    onSubmit={handleOnClick}
                    disabled={emptyTextInput || isPending}
                />

            </Card>
        </div>
    );
};