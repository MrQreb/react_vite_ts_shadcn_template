/**
 * Opción disponible en un filtro de tipo select.
 */
export interface FilterOption {
  label: string;
  value: string;
}

/**
 * Mapa de valores soportados por cada tipo de filtro.
 */
export type FilterValueMap = {
  text: string;
  select: string;
  date: string | null;
  dateRange: { start: string | null; end: string | null };
};

/**
 * Base genérica discriminada por `type` para construir nuevos filtros.
 */
export type BaseFilter<T extends keyof FilterValueMap> = {
  type: T;
  key: string;
  label: string;
  value: FilterValueMap[T];
  onChange: (value: FilterValueMap[T]) => void;
  /** Si es `true`, el badge activo no muestra el botón de eliminar. */
  isNotRemovable?: boolean;
  /** Solo requerido para `type: "select"`. */
  options?: FilterOption[];
};

/**
 * Conjunto de tipos de filtro disponibles.
 */
export type FilterType =
  | BaseFilter<"text">
  | BaseFilter<"select">
  | BaseFilter<"date">
  | BaseFilter<"dateRange">;

/**
 * Props del contenedor de filtros para la toolbar de la tabla.
 */
export interface FilterTableProps {
  filters: FilterType[];
  /** Se invoca al hacer clic en "Aplicar". Aquí debes actualizar los query params. */
  onApply: () => void;
  /** Se invoca al limpiar todos los filtros. */
  onClear: () => void;
  /** Opcional: limpiar la búsqueda global del DataTable cuando se limpian filtros. */
  onClearSearch?: () => void;
}
