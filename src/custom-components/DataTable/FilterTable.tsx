import { useState, useMemo, useEffect, useCallback } from "react";
import { SlidersHorizontal, X, CalendarIcon, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { cn } from "@/lib/utils";

// ─── Tipos ────────────────────────────────────────────────────────────────────

/** Opción de un filtro tipo `select` */
export interface FilterOption {
  label: string;
  value: string;
}

/** Mapa de valores por tipo de filtro */
type FilterValueMap = {
  text:      string;
  select:    string;
  date:      string | null;
  dateRange: { start: string | null; end: string | null };
};

/** Tipo base genérico — discriminado por `type` */
type BaseFilter<T extends keyof FilterValueMap> = {
  type: T;
  key: string;
  label: string;
  value: FilterValueMap[T];
  onChange: (v: FilterValueMap[T]) => void;
  /** Si es `true`, el badge activo no muestra el botón de eliminar */
  isNotRemovable?: boolean;
  /** Solo requerido para `type: "select"` */
  options?: FilterOption[];
};

/**
 * Tipo unión de filtros disponibles.
 * Discriminado por el campo `type`.
 *
 * @example
 * ```ts
 * const filtros: FilterType[] = [
 *   { type: "text",   key: "nombre",   label: "Nombre",   value: nombre,   onChange: setNombre },
 *   { type: "select", key: "rol",      label: "Rol",      value: rol,      options: ROL_OPTIONS, onChange: setRol },
 *   { type: "date",   key: "desde",    label: "Desde",    value: desde,    onChange: setDesde },
 * ];
 * ```
 */
export type FilterType =
  | BaseFilter<"text">
  | BaseFilter<"select">
  | BaseFilter<"date">
  | BaseFilter<"dateRange">;

interface FilterTableProps {
  filters: FilterType[];
  /** Se invoca al hacer clic en "Aplicar". Aquí debes actualizar los query params. */
  onApply: () => void;
  /** Se invoca al limpiar todos los filtros. */
  onClear: () => void;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const EMPTY: Record<FilterType["type"], any> = {
  text:      "",
  select:    "",
  date:      null,
  dateRange: { start: null, end: null },
};

/** Clona los filtros para el estado local sin referencias compartidas */
const clonar = (list: FilterType[]): FilterType[] =>
  list.map((f) => ({
    ...f,
    isNotRemovable: f.isNotRemovable ?? false,
    value: f.type === "dateRange" ? { ...(f.value as any) } : (f.value ?? ""),
  })) as FilterType[];

/** Devuelve `true` si el filtro tiene un valor activo */
const tieneValor = (f: FilterType): boolean => {
  if (f.type === "dateRange") return !!(f.value?.start || f.value?.end);
  return !!f.value;
};

/** Formatea el valor de un filtro para mostrarlo en el badge */
function formatearValorBadge(f: FilterType): string {
  if (f.type === "date" && f.value)
    return format(new Date(f.value), "d MMM yyyy", { locale: es });

  if (f.type === "dateRange") {
    const { start, end } = f.value ?? {};
    if (!start) return "";
    const s = format(new Date(start), "d MMM", { locale: es });
    const e = end ? format(new Date(end), "d MMM", { locale: es }) : "...";
    return `${s} → ${e}`;
  }

  if (f.type === "select")
    return f.options?.find((o) => o.value === f.value)?.label ?? f.value;

  return f.value ?? "";
}

// ─── Componente principal ─────────────────────────────────────────────────────

/**
 * Panel de filtros avanzados para usar como `toolbar` en `<DataTable />`.
 *
 * Los filtros se mantienen en estado local hasta que el usuario hace clic en
 * "Aplicar", evitando peticiones al servidor en cada cambio.
 *
 * @example
 * ```tsx
 * <DataTable
 *   toolbar={
 *     <FilterTable
 *       filters={filtros}
 *       onApply={() => updateQueryParams({ rol, activo, page: 1 })}
 *       onClear={() => updateQueryParams({ rol: undefined, activo: undefined, page: 1 })}
 *     />
 *   }
 * />
 * ```
 */
export function FilterTable({ filters, onApply, onClear }: FilterTableProps) {
  const [local, setLocal] = useState<FilterType[]>(() => clonar(filters));
  const [open, setOpen] = useState(false);

  // Sincronizar con cambios externos en props
  useEffect(() => {
    setLocal((prev) => {
      const next = clonar(filters);
      return JSON.stringify(prev) === JSON.stringify(next) ? prev : next;
    });
  }, [filters]);

  const setValor = useCallback(
    (key: string, value: any) =>
      setLocal((prev) => prev.map((f) => (f.key === key ? { ...f, value } : f))),
    []
  );

  const aplicar = useCallback(() => {
    local.forEach((l) => filters.find((f) => f.key === l.key)?.onChange(l.value as any));
    onApply();
    setOpen(false);
  }, [local, filters, onApply]);

  const limpiar = useCallback(() => {
    const reset = local.map((f) => ({ ...f, value: EMPTY[f.type] })) as FilterType[];
    setLocal(reset);
    reset.forEach((f) => filters.find((x) => x.key === f.key)?.onChange(f.value as any));
    onClear();
  }, [local, filters, onClear]);

  const eliminarFiltro = useCallback(
    (key: string, type: FilterType["type"]) => {
      const vacio = EMPTY[type];
      setLocal((prev) => prev.map((f) => (f.key === key ? { ...f, value: vacio } : f)));
      filters.find((f) => f.key === key)?.onChange(vacio);
      setTimeout(onApply, 0);
    },
    [filters, onApply]
  );

  const activos = useMemo(() => local.filter(tieneValor), [local]);

  return (
    <div className="flex flex-col items-end gap-2">
      {/* Botón disparador */}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className={cn("h-9 gap-2 transition-all", open && "border-primary/60 bg-accent")}
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filtros
            {activos.length > 0 && (
              <span className="inline-flex items-center justify-center h-4 min-w-4 px-1 rounded-full bg-primary text-primary-foreground text-[10px] font-semibold">
                {activos.length}
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
            {activos.length > 0 && (
              <button
                onClick={limpiar}
                className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-2 transition-colors"
              >
                Limpiar todo
              </button>
            )}
          </div>

          {/* Campos */}
          <div className="px-4 py-3 space-y-4 max-h-[60vh] overflow-y-auto">
            {local.map((f) => (
              <CampoFiltro key={f.key} filtro={f} onChange={setValor} />
            ))}
          </div>

          <Separator />

          {/* Footer */}
          <div className="flex items-center justify-between px-4 py-3">
            <Button size="sm" variant="ghost" onClick={limpiar} className="gap-1.5 text-muted-foreground">
              <X className="h-3.5 w-3.5" /> Limpiar
            </Button>
            <Button size="sm" onClick={aplicar} className="px-5">
              Aplicar
            </Button>
          </div>
        </PopoverContent>
      </Popover>

      {/* Badges de filtros activos */}
      {activos.length > 0 && (
        <div className="flex flex-wrap gap-1.5 justify-end">
          {activos.map((f) => (
            <BadgeFiltro
              key={f.key}
              filtro={f}
              onEliminar={() => eliminarFiltro(f.key, f.type)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Campo de filtro ──────────────────────────────────────────────────────────

/** Renderiza el control correspondiente al tipo de filtro */
function CampoFiltro({ filtro, onChange }: { filtro: FilterType; onChange: (k: string, v: any) => void }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
        {filtro.label}
      </Label>

      {filtro.type === "text" && (
        <Input
          value={filtro.value}
          placeholder={`Buscar por ${filtro.label.toLowerCase()}...`}
          onChange={(e) => onChange(filtro.key, e.target.value)}
          className="h-9 text-sm"
        />
      )}

      {filtro.type === "select" && (
        <ComboboxFiltro
          options={filtro.options ?? []}
          value={filtro.value}
          onSelect={(v) => onChange(filtro.key, v)}
        />
      )}

      {filtro.type === "date" && (
        <DatePickerFiltro value={filtro.value} onChange={(v) => onChange(filtro.key, v)} />
      )}

      {filtro.type === "dateRange" && (
        <DateRangeFiltro value={filtro.value} onChange={(v) => onChange(filtro.key, v)} />
      )}
    </div>
  );
}

// ─── Controles de filtro ──────────────────────────────────────────────────────

/** Selector con búsqueda (Combobox) usando shadcn Command */
function ComboboxFiltro({ options, value, onSelect }: { options: FilterOption[]; value: string; onSelect: (v: string) => void }) {
  const [open, setOpen] = useState(false);
  const label = options.find((o) => o.value === value)?.label;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className={cn("w-full justify-between h-9 text-sm font-normal", !label && "text-muted-foreground")}>
          {label ?? "Seleccionar..."}
          <Check className={cn("ml-auto h-4 w-4 transition-opacity", value ? "opacity-100 text-primary" : "opacity-0")} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-0" align="start">
        <Command>
          <CommandInput placeholder="Buscar..." className="h-9" />
          <CommandList>
            <CommandEmpty className="py-4 text-center text-sm text-muted-foreground">Sin resultados</CommandEmpty>
            <CommandGroup>
              {options.map((opt) => (
                <CommandItem
                  key={opt.value}
                  value={opt.label}
                  onSelect={() => { onSelect(opt.value === value ? "" : opt.value); setOpen(false); }}
                  className="gap-2"
                >
                  <Check className={cn("h-4 w-4 text-primary", opt.value === value ? "opacity-100" : "opacity-0")} />
                  {opt.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

/** Selector de fecha única */
function DatePickerFiltro({ value, onChange }: { value: string | null; onChange: (v: string | null) => void }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className={cn("w-full justify-between h-9 text-sm font-normal", !value && "text-muted-foreground")}>
          {value ? format(new Date(value), "d MMM yyyy", { locale: es }) : "Seleccionar fecha"}
          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar locale={es} mode="single" selected={value ? new Date(value) : undefined}
          onSelect={(d) => onChange(d ? format(d, "yyyy-MM-dd") : null)} initialFocus />
      </PopoverContent>
    </Popover>
  );
}

/** Selector de rango de fechas */
function DateRangeFiltro({ value, onChange }: { value: { start: string | null; end: string | null }; onChange: (v: any) => void }) {
  const texto = value.start
    ? `${format(new Date(value.start), "d MMM", { locale: es })} → ${value.end ? format(new Date(value.end), "d MMM", { locale: es }) : "..."}`
    : null;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className={cn("w-full justify-between h-9 text-sm font-normal", !value.start && "text-muted-foreground")}>
          {texto ?? "Seleccionar rango"}
          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar locale={es} mode="range" numberOfMonths={2}
          selected={{ from: value.start ? new Date(value.start) : undefined, to: value.end ? new Date(value.end) : undefined }}
          onSelect={(r) => onChange({ start: r?.from ? format(r.from, "yyyy-MM-dd") : null, end: r?.to ? format(r.to, "yyyy-MM-dd") : null })}
          initialFocus />
      </PopoverContent>
    </Popover>
  );
}

// ─── Badge de filtro activo ───────────────────────────────────────────────────

function BadgeFiltro({ filtro, onEliminar }: { filtro: FilterType; onEliminar: () => void }) {
  return (
    <Badge variant="secondary" className="gap-1.5 px-2.5 py-1 text-xs rounded-full bg-primary/10 text-primary border border-primary/20 hover:bg-primary/15 transition-colors">
      <span className="text-primary/60 font-normal">{filtro.label}:</span>
      <span>{formatearValorBadge(filtro)}</span>
      {!filtro.isNotRemovable && (
        <button onClick={onEliminar} className="ml-0.5 rounded-full hover:bg-primary/20 p-0.5 transition-colors" aria-label={`Eliminar ${filtro.label}`}>
          <X className="h-3 w-3" />
        </button>
      )}
    </Badge>
  );
}
