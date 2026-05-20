
/** Interfaz de reglas del mensaje */
export interface IMesssages {
    /** Id generado */
    id: number;
    role: string;
    /** Contenido del mensaje */
    content: string;
    /** Fecha de creacion */
    time: string;
}
