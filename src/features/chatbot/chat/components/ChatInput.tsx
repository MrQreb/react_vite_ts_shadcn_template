import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { useRef } from 'react';
import { chatInputAnimation, sendButtonAnimation } from '../animations';
import { ToolsDropdown } from './ToolsDropdown';
import { chatTourClassNames } from '../tour/chatTourClassNames';

interface Props {
    /**
     * Valor actual del textarea.
     */
    value: string;
    /**
     * Callback ejecutado al cambiar el contenido del textarea.
     * @param value Nuevo valor ingresado.
     */
    onChange: (value: string) => void;
    /**
     * Callback ejecutado al enviar el mensaje.
     */
    onSubmit: () => void;
    /**
     * Indica si el botón de envío debe estar deshabilitado.
     */
    disabled?: boolean;
}

/**
 * Componente encargado de renderizar el input del chat. Desde el boton ,TextArea y ToolsDropdown
 * @returns Tsx component
 */
export const ChatInput = ({
    value,
    onChange,
    onSubmit,
    disabled
}: Props) => {
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const MotionTextarea = motion.create(Textarea);
    const MotionButton = motion.create(Button);

    /**
     * Maneja el cambio de valor del textarea y ajusta
     * automáticamente su altura según el contenido.
     * 
     * @param e Evento de cambio del textarea.
     */
    const handleTextareaChange = (
        e: React.ChangeEvent<HTMLTextAreaElement>
    ) => {

        onChange(e.target.value);

        const textarea = textareaRef.current;

        if (!textarea) return;

        textarea.style.height = "auto";
        textarea.style.height = `${textarea.scrollHeight}px`;
    };

    /**
     * Maneja el envío del mensaje mediante la tecla Enter.
     * 
     * Comportamiento:
     * - Enter: envía el mensaje.
     * - Shift + Enter: agrega salto de línea.
     * 
     * @param e Evento de teclado del textarea.
     */
    const handlePressEnter = (
        e: React.KeyboardEvent<HTMLTextAreaElement>
    ) => {

        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            onSubmit();
        }
    };

    return (
        <div className={`sticky bottom-0 bg-background/95 backdrop-blur ${chatTourClassNames.input}`}>

            <div className="mx-auto w-full max-w-6xl p-4 md:p-6">

                <div className="flex items-center gap-3">
                    
                    {/* Dropdown */}
                    <ToolsDropdown />

                    {/* TextArea */}
                    <MotionTextarea
                        ref={textareaRef}
                        {...chatInputAnimation(!!value)}
                        value={value}
                        onChange={handleTextareaChange}
                        onKeyDown={handlePressEnter}
                        placeholder="Escribe un mensaje..."
                        rows={1}
                        className="
                            min-h-14
                            max-h-60
                            resize-none
                            overflow-y-auto
                            rounded-2xl
                            px-5
                            py-4
                            text-sm
                            shadow-sm
                        "
                    />

                    {/* Button */}
                    <MotionButton
                        {...sendButtonAnimation}
                        size="icon"
                        disabled={disabled}
                        className="size-14 rounded-2xl shadow-md"
                        onClick={onSubmit}
                    >
                        <ArrowUp className="size-5" />
                    </MotionButton>

                </div>

                <p className="mt-3 italic text-center text-md text-muted-foreground font-bold">
                    El asistente puede cometer errores. Verifica la información importante.
                </p>

            </div>
        </div>
    );
};