import { Badge } from "@/components/ui/badge";
import { Bot, DollarSign } from "lucide-react";
import { GeminiModelDropdown } from './GeminiModelDropdown';
import { chatTourClassNames } from "../tour/chatTourClassNames";
import { Button } from '@/components/ui/button';
/**
 * Componente visual de como muestra el header del contenedor del chatbot
 * @returns Tsx component
 */
export const Header = () => {
    return (
        <div className={`border-b bg-background/80 px-6 py-4 backdrop-blur ${chatTourClassNames.header}`}>
{/* 
            <div className="absolute top-0 right-4">
                <Button
                    size="icon"
                    className="
                    size-7
                    rounded-full
                    text-black
                    hover:text-foreground
                    hover:bg-muted">
                    ?
                </Button>
            </div> */}


            <div className="flex items-center justify-between mt-4">


                <section className="flex items-center gap-4">

                    <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10">
                        <Bot className="size-6 text-primary" />
                    </div>


                    <section>
                        <h1 className="text-lg font-semibold tracking-tight">
                            Reporteador Facturación
                        </h1>

                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Badge>
                                <DollarSign />
                                <span>Asistente de facturación</span>
                            </Badge>
                        </div>
                    </section>

                </section>

                <div>
                    <GeminiModelDropdown />
                </div>
                {/* <div className="hidden md:flex items-center gap-2 rounded-full border bg-muted/40 px-3 py-1 text-sm text-muted-foreground">
                    <div className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                    En línea

                </div> */}

            </div>
        </div>
    )
}

