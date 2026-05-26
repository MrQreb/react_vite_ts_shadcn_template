import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { MESSAGES } from "../data/MESSAGES";
import { Separator } from '@/components/ui/separator';
import { ChatInput, Header, Messages } from "../components";
import { facturacionService } from "../../api/instances/facturacion.instances";
import type { IMessage, MessageRole } from "../interfaces/Imessage";
import { useMutation } from "@tanstack/react-query";
import { useChatInputStore } from "../store/chatInput.store";
import { useGeminiModel } from "../store/geminiModel.store";
import type { ChatFileResponse } from "../../api/dto";
// import { chatTour } from "../tour/chatTour";

/** Pagina encargada del chatbot.
* @returns Tsx component
*/
export const ChatPage = () => {

    // useEffect(() => {        
    //     const alreadySeen = localStorage.getItem("chat-tour");

    //     if (!alreadySeen) {

    //         setTimeout(() => {
    //             chatTour.drive();
    //         }, 500);

    //         localStorage.setItem("chat-tour", "true");
    //     }

    // }, []);


    //Estados globales
    const { text, setText } = useChatInputStore();
    const { model } = useGeminiModel();

    let [messages, setMessages] = useState(MESSAGES);
    const emptyTextInput: boolean = text.length === 0;

    /** Permite generar el mensaje en base al texto y el rol
     * @param value - string
     * @param role - MessageRole
     */
    const createMessage = (
        value: string,
        role: MessageRole,
        file?: ChatFileResponse

    ): IMessage => {

        const time = new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        });

        return {
            id: Date.now() + Math.floor(Math.random() * 1000),
            content: value,
            role,
            time,
            file
        };
    };

    const { mutate, isPending, isError } = useMutation({
        mutationFn: async (value: string) => {

            const response = await facturacionService.chat({
                message: value,
                modelGemini: model.id
            });
            return response;
        },
        onSuccess: (data) => {

            const botMessage = createMessage(
                data?.answer,
                'assistant',
                data.file
            );

            setMessages((prev) => [
                ...prev,
                botMessage
            ]);
        },
        onError: () => {
            const errorMessage = createMessage(
                "Ocurrió un error al procesar el mensaje.",
                "assistant"
            );
            setMessages((prev) => [
                ...prev,
                errorMessage
            ]);
        }
    });

    /** Añade el mensaje el mensaje, renderiza y ejecuta la mutacion */
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
        if (!text.trim()) return;
        addNewMessage(text);
        setText("");
    }

    return (
        //Contenedor del chat
        <div className="h-screen bg-background p-4 md:p-6">

            <Card className="mx-auto flex h-full max-w-9xl flex-col overflow-hidden rounded-3xl border bg-background shadow-2xl">



                {/* Header donde muestro la parte de tarjetia del cahtbo*/}
                <Header />

                {/* Contenedor de mensajes */}
                <Messages
                    isPending={isPending}
                    messages={messages}
                />

                <Separator />

                {/* Input de mensaje usuario */}
                <ChatInput
                    value={text}
                    onChange={setText}
                    onSubmit={handleOnClick}
                    disabled={emptyTextInput || isPending}
                />
            </Card>
        </div>
    );
};