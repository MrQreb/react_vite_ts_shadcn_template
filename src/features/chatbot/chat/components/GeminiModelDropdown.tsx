import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
    ChevronDown,
    Check,
} from "lucide-react";

import { motion } from "framer-motion";

import {
    dropdownCheckAnimation,
    dropdownChevronAnimation,
    dropdownIconAnimation,
    dropdownItemAnimation,
    dropdownItemIconAnimation,
    dropdownTriggerAnimation
} from "../animations/dropdownTriggerAnimatio";

import {
    GEMINI_MODELS,
    useGeminiModel
} from "../store/geminiModel.store";
import { Label } from "@/components/ui/label";


/**
 * Dropdown encargado de seleccionar
 * el modelo Gemini usado globalmente
 * dentro del chat.
 * @returns Tsx component
 */
export const GeminiModelDropdown = () => {

    const {
        model,
        setModel
    } = useGeminiModel();
    
    return (

        <DropdownMenu>

            {/* Trigger principal del dropdown */}
            <DropdownMenuTrigger asChild>

                <motion.button
                    {...dropdownTriggerAnimation}
                    className="
                        group
                        mt-4
                        flex
                        items-center
                        gap-2

                        rounded-xl
                        border
                        bg-background/80

                        px-3
                        py-2

                        shadow-sm
                        backdrop-blur

                        transition-all
                        hover:border-primary/30
                    "
                >

                    {/* Icono del modelo seleccionado */}
                    <motion.div
                        {...dropdownIconAnimation}
                        className="
                            flex
                            size-7
                            items-center
                            justify-center
                            rounded-lg
                            bg-primary/10
                            text-primary
                        "
                    >

                        <model.icon className="size-3.5" />

                    </motion.div>

                    {/* Información del modelo */}
                    <div className="flex flex-col items-start leading-none">

                        <span className="text-xs font-medium">
                            {model.label}
                        </span>

                        <span className="text-[10px] text-muted-foreground">
                            {model.description}
                        </span>

                    </div>

                    {/* Chevron animado */}
                    <motion.div
                        {...dropdownChevronAnimation}
                    >

                        <ChevronDown
                            className="
                                size-3.5
                                text-muted-foreground
                            "
                        />

                    </motion.div>

                </motion.button>

            </DropdownMenuTrigger>

            {/* Contenido del dropdown */}
            <DropdownMenuContent
                align="start"
                className="
                    w-60
                    rounded-xl
                    p-2
                "
            >
                {GEMINI_MODELS.map((item, index) => {

                    /**
                     * Permite saber si el item
                     * corresponde al modelo activo.
                     */
                    const isSelected =
                        item.id === model.id;

                    /**
                     * Icono actual del item.
                     */
                    const Icon =
                        item.icon;

                    return (

                        <motion.div
                            key={item.id}
                            {...dropdownItemAnimation(index)}
                        >

                            {/* Item individual */}
                            <DropdownMenuItem
                                onClick={() =>
                                    setModel(item)
                                }
                                className="
                                    mb-1
                                    flex
                                    cursor-pointer
                                    items-center
                                    justify-between

                                    rounded-lg
                                    px-2
                                    py-2
                                "
                            >

                                {/* Lado izquierdo */}
                                <div className="flex items-center gap-2">

                                    {/* Icono */}
                                    <motion.div
                                        {...dropdownItemIconAnimation}
                                        className="
                                            flex
                                            size-8
                                            items-center
                                            justify-center
                                            rounded-lg
                                            bg-muted
                                        "
                                    >

                                        <Icon
                                            className="
                                            size-3.5
                                            text-muted-foreground
                                            "
                                        />

                                    </motion.div>

                                    {/* Texto */}
                                    <section className="flex flex-col ml-3">

                                        <Label className="text-xs font-medium">
                                            {item.label}
                                        </Label>

                                        <Label className="text-[10px] text-muted-foreground">
                                            {item.description}
                                        </Label>

                                        <Label className="mt-2 text-[9px] font-bold text-muted-foreground">
                                            {item.name}
                                        </Label>

                                    </section>

                                </div>

                                {/* Indicador visual de seleccionado */}
                                {isSelected && (

                                    <motion.div
                                        layoutId="active-model"
                                        {...dropdownCheckAnimation}
                                        className="
                                            flex
                                            size-5
                                            items-center
                                            justify-center
                                            rounded-full
                                            bg-primary
                                            text-primary-foreground
                                        "
                                    >

                                        <Check className="size-3" />
                                    </motion.div>
                                )}

                            </DropdownMenuItem>

                        </motion.div>
                    );
                })}
            </DropdownMenuContent>

        </DropdownMenu>
    );
};