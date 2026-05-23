import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
    Sparkles,
    ChevronDown,
    Check,
    Zap,
    BrainCircuit
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

/**
 * Mapa de iconos usados por cada modelo Gemini.
 *
 * La key corresponde al id del modelo.
 */
const MODEL_ICONS: any = {
    "gemini-2.5-flash-lite": Zap,
    "gemini-2.5-flash": Sparkles,
    "gemini-2.5-pro": BrainCircuit,
};

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

    /**
     * Icono correspondiente
     * al modelo actualmente seleccionado.
     */
    const CurrentIcon =
        MODEL_ICONS[model.id];

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

                        <CurrentIcon className="size-3.5" />

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
                     * Icono correspondiente
                     * al modelo iterado.
                     */
                    const Icon =
                        MODEL_ICONS[item.id];

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
                                    <div className="flex flex-col">

                                        <span className="text-xs font-medium">
                                            {item.label}
                                        </span>

                                        <span className="text-[10px] text-muted-foreground">
                                            {item.description}
                                        </span>

                                    </div>

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