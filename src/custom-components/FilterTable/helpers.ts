/** Funciones utilitarias para el módulo de filtros. */
import { format } from "date-fns";
import { es } from "date-fns/locale";
import type { FilterType, FilterValueMap } from "./types";

/**
 * Valores vacíos por tipo de filtro, usados para limpiar el estado local y externo.
 */
export const EMPTY_VALUES: Record<FilterType["type"], FilterValueMap[keyof FilterValueMap]> = {
  text: "",
  select: "",
  date: null,
  dateRange: { start: null, end: null },
};

/**
 * Clona los filtros recibidos por props para mantener estado local sin referencias compartidas.
 */
export const cloneFilters = (list: FilterType[]): FilterType[] =>
  list.map((filter) => ({
    ...filter,
    isNotRemovable: filter.isNotRemovable ?? false,
    value:
      filter.type === "dateRange"
        ? { ...(filter.value ?? { start: null, end: null }) }
        : (filter.value ?? ""),
  })) as FilterType[];

/**
 * Indica si un filtro tiene algún valor activo (sirve para mostrar badges y limpiar).
 */
export const hasValue = (filter: FilterType): boolean => {
  if (filter.type === "dateRange") return !!(filter.value?.start || filter.value?.end);
  return !!filter.value;
};

/**
 * Convierte el valor interno de un filtro en texto legible para el badge.
 */
export function formatBadgeValue(filter: FilterType): string {
  if (filter.type === "date" && filter.value)
    return format(new Date(filter.value), "d MMM yyyy", { locale: es });

  if (filter.type === "dateRange") {
    const { start, end } = filter.value ?? {};
    if (!start) return "";
    const startText = format(new Date(start), "d MMM", { locale: es });
    const endText = end ? format(new Date(end), "d MMM", { locale: es }) : "...";
    return `${startText} → ${endText}`;
  }

  if (filter.type === "select")
    return filter.options?.find((option) => option.value === filter.value)?.label ?? filter.value;

  return filter.value ?? "";
}
