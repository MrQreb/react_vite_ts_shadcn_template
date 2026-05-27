import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User } from "lucide-react";
import { Streamdown } from "streamdown";
import type { IMessage } from "../interfaces/Imessage";
import { MessageFileCard } from "./MessageFileCard";

interface Props {
    message: IMessage;
}

/** Mensaje del usuario
 * @returns Tsx component
 * @param message IMessage
 */
export const UserMessage = ({ message }: Props) => {
    return (
        <>
            <section className="flex min-w-0 flex-1 flex-col gap-2 items-end">
                <div
                    className={
                        "markdown-container min-w-0 w-fit max-w-[85vw] sm:max-w-[75vw] lg:max-w-[65vw] overflow-hidden rounded-3xl px-4 py-4 sm:px-5 shadow-sm rounded-br-md bg-primary text-primary-foreground"
                    }
                >

                    <Streamdown className="markdown">{message.content}</Streamdown>

                    {/* Si mando algun archivo usuario */}
                    {message.file && (
                        <MessageFileCard
                            fileName={message.file.fileName}
                            url={message.file.url}
                            contentType={message.file.contentType}
                        />
                    )}
                </div>

                <span className="px-2 text-xs text-muted-foreground">{message.time}</span>
            </section>

            <Avatar className="size-10 shrink-0 border shadow-sm">
                <AvatarFallback className="bg-muted">
                    <User size={18} />
                </AvatarFallback>
            </Avatar>
        </>
    );
};
