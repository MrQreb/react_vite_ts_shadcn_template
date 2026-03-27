/**
 * Panel de filtros avanzados para usar como toolbar en `<DataTable />`.
 *
 * Los filtros se mantienen en estado local hasta que el usuario hace clic en
 * "Aplicar", evitando peticiones al servidor en cada cambio.
 */
import { useCallback, useEffect, useMemo, useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { FilterBadge } from "./components/FilterBadge";
import { FilterField } from "./components/FilterField";
import { cloneFilters, EMPTY_VALUES, hasValue } from "./helpers";
import type { FilterTableProps, FilterType } from "./types";

export function FilterTable({ filters, onApply, onClear }: FilterTableProps) {
  const [localFilters, setLocalFilters] = useState<FilterType[]>(() => cloneFilters(filters));
  const [open, setOpen] = useState(false);

  // Sincroniza el estado local cuando cambian los filtros externos
  useEffect(() => {
    setLocalFilters((previous) => {
      const next = cloneFilters(filters);
      return JSON.stringify(previous) === JSON.stringify(next) ? previous : next;
    });
  }, [filters]);

  const setValue = useCallback(
    (key: string, value: any) =>
      setLocalFilters((previous) =>
        previous.map((filter) => (filter.key === key ? { ...filter, value } : filter))
      ),
    []
  );

  const apply = useCallback(() => {
    localFilters.forEach((localFilter) =>
      filters.find((filter) => filter.key === localFilter.key)?.onChange(localFilter.value as any)
    );
    onApply();
    setOpen(false);
  }, [localFilters, filters, onApply]);

  const clear = useCallback(() => {
    const reset = localFilters.map((filter) => ({ ...filter, value: EMPTY_VALUES[filter.type] })) as FilterType[];
    setLocalFilters(reset);
    reset.forEach((filter) => filters.find((target) => target.key === filter.key)?.onChange(filter.value as any));
    onClear();
  }, [localFilters, filters, onClear]);

  const remove = useCallback(
    (key: string, type: FilterType["type"]) => {
      const emptyValue = EMPTY_VALUES[type];
      setLocalFilters((previous) =>
        previous.map((filter) => (filter.key === key ? { ...filter, value: emptyValue } : filter))
      );
      filters.find((filter) => filter.key === key)?.onChange(emptyValue as any);
      setTimeout(onApply, 0);
    },
    [filters, onApply]
  );

  const activeFilters = useMemo(() => localFilters.filter(hasValue), [localFilters]);

  return (
    <div className="flex flex-col items-end gap-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className={cn("h-9 gap-2 transition-all", open && "border-primary/60 bg-accent")}
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filtros
            {activeFilters.length > 0 && (
              <span className="inline-flex items-center justify-center h-4 min-w-4 px-1 rounded-full bg-primary text-primary-foreground text-[10px] font-semibold">
                {activeFilters.length}
              </span>
            )}
          </Button>
        </PopoverTrigger>

        <PopoverContent align="end" className="w-72 p-0" sideOffset={8}>
          {/* Cabecera */}
          <div className="flex items-center justify-between px-4 py-3 border-b">
            <span className="font-semibold text-sm flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
              Filtros
            </span>
            {activeFilters.length > 0 && (
              <button
                onClick={clear}
                className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-2 transition-colors"
              >
                Limpiar todo
              </button>
            )}
          </div>

          {/* Campos */}
          <div className="px-4 py-3 space-y-4 max-h-[60vh] overflow-y-auto">
            {localFilters.map((filter) => (
              <FilterField key={filter.key} filter={filter} onChange={setValue} />
            ))}
          </div>

          <Separator />

          {/* Footer */}
          <div className="flex items-center justify-between px-4 py-3">
            <Button size="sm" variant="ghost" onClick={clear} className="gap-1.5 text-muted-foreground">
              <X className="h-3.5 w-3.5" /> Limpiar
            </Button>
            <Button size="sm" onClick={apply} className="px-5">
              Aplicar
            </Button>
          </div>
        </PopoverContent>
      </Popover>

      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-1.5 justify-end">
          {activeFilters.map((filter) => (
            <FilterBadge key={filter.key} filter={filter} onRemove={() => remove(filter.key, filter.type)} />
          ))}
        </div>
      )}
    </div>
  );
}
