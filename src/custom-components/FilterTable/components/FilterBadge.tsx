/** Badge para mostrar filtros activos con opción de removerlos. */
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatBadgeValue } from "../helpers";
import type { FilterType } from "../types";

interface FilterBadgeProps {
  filter: FilterType;
  onRemove: () => void;
}

/**
 * Muestra el filtro activo y permite limpiarlo individualmente.
 */
export function FilterBadge({ filter, onRemove }: FilterBadgeProps) {
  return (
    <Badge
      variant="secondary"
      className="gap-1.5 px-2.5 py-1 text-xs rounded-full bg-primary/10 text-primary border border-primary/20 hover:bg-primary/15 transition-colors"
    >
      <span className="text-primary/60 font-normal">{filter.label}:</span>
      <span>{formatBadgeValue(filter)}</span>
      {!filter.isNotRemovable && (
        <button
          onClick={onRemove}
          className="ml-0.5 rounded-full hover:bg-primary/20 p-0.5 transition-colors"
          aria-label={`Eliminar ${filter.label}`}
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </Badge>
  );
}
