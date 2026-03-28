/** Renderiza el control adecuado según el tipo de filtro. */
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { FilterType } from "../types";
import { DateFilter } from "./DateFilter";
import { DateRangeFilter } from "./DateRangeFilter";
import { SelectFilter } from "./SelectFilter";

interface FilterFieldProps {
  filter: FilterType;
  onChange: (key: string, value: any) => void;
}

/**
 * Campo individual del panel de filtros.
 */
export function FilterField({ filter, onChange }: FilterFieldProps) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
        {filter.label}
      </Label>

      {filter.type === "text" && (
        <Input
          value={filter.value}
          placeholder={`Buscar por ${filter.label.toLowerCase()}...`}
          onChange={(event) => onChange(filter.key, event.target.value)}
          className="h-9 text-sm"
        />
      )}

      {filter.type === "select" && (
        <SelectFilter
          options={filter.options ?? []}
          value={filter.value}
          onSelect={(value) => onChange(filter.key, value)}
        />
      )}

      {filter.type === "date" && (
        <DateFilter value={filter.value} onChange={(value) => onChange(filter.key, value)} />
      )}

      {filter.type === "dateRange" && (
        <DateRangeFilter value={filter.value} onChange={(value) => onChange(filter.key, value)} />
      )}
    </div>
  );
}
