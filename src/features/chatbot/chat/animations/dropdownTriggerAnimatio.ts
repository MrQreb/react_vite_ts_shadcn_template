/**
 * Animación del botón principal del dropdown.
 */
export const dropdownTriggerAnimation = {
    whileHover: {
        scale: 1.03,
    },
    whileTap: {
        scale: 0.97,
    },
};

/**
 * Animación infinita del icono principal.
 */
export const dropdownIconAnimation = {
    animate: {
        rotate: [0, -8, 8, 0],
    },
    transition: {
        duration: 2.5,
        repeat: Infinity,
        repeatDelay: 4,
    },
};

/**
 * Animación del chevron.
 */
export const dropdownChevronAnimation = {
    animate: {
        rotate: 0,
    },
    whileHover: {
        rotate: 180,
    },
    transition: {
        duration: 0.3,
    },
};

/**
 * Animación de aparición de items.
 */
export const dropdownItemAnimation = (
    index: number
) => ({
    initial: {
        opacity: 0,
        y: 10,
    },
    animate: {
        opacity: 1,
        y: 0,
    },
    transition: {
        delay: index * 0.04,
    },
});

/**
 * Hover animation para iconos internos.
 */
export const dropdownItemIconAnimation = {
    whileHover: {
        scale: 1.1,
        rotate: 8,
    },
};

/**
 * Animación del check seleccionado.
 */
export const dropdownCheckAnimation = {
    initial: {
        scale: 0,
        opacity: 0,
    },
    animate: {
        scale: 1,
        opacity: 1,
    },
};