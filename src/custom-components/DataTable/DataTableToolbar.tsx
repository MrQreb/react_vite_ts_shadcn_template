import { useEffect, useState } from "react";
import { type Table } from "@tanstack/react-table";
import { Search, Columns3, Download, Eye, EyeOff, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// ─── Tipos ────────────────────────────────────────────────────────────────────

interface DataTableToolbarProps<TData> {
  /** Instancia de la tabla (contiene estado de columnas y métodos de visibilidad) */
  table: Table<TData>;
  /** Valor actual del campo de búsqueda global */
  globalFilter: string;
  /** Callback al escribir en el campo de búsqueda */
  onGlobalFilterChange: (value: string) => void;
  /**
   * Contenido extra entre la búsqueda y los botones.
   * Usa este slot para colocar `<FilterTable />` u otros controles.
   */
  extraContent?: React.ReactNode;
  /** Muestra el botón CSV si se proporciona */
  onExportCSV?: () => void;
}

// ─── Componente ───────────────────────────────────────────────────────────────

/**
 * Barra de herramientas de la tabla.
 *
 * Funcionalidades:
 * - Búsqueda global con botón de limpiar
 * - Slot para contenido extra (filtros, botones de acción)
 * - Menú de visibilidad de columnas con conteo de ocultas
 * - Botón de exportar CSV (solo columnas visibles)
 *
 * **Atajo de teclado:** doble clic en la cabecera de una columna la oculta.
 * Recupera las columnas ocultas desde el menú "Columnas".
 *
 * @example
 * ```tsx
 * <DataTableToolbar
 *   table={table}
 *   globalFilter={busqueda}
 *   onGlobalFilterChange={setBusqueda}
 *   extraContent={<FilterTable filters={filtros} onApply={aplicar} onClear={limpiar} />}
 *   onExportCSV={handleCSV}
 * />
 * ```
 */
export function DataTableToolbar<TData>({
  table,
  globalFilter,
  onGlobalFilterChange,
  extraContent,
  onExportCSV,
}: DataTableToolbarProps<TData>) {
  const [inputValue, setInputValue] = useState(globalFilter ?? "");

  // Mantiene el input sincronizado si el valor viene de afuera (ej. query params)
  useEffect(() => {
    setInputValue(globalFilter ?? "");
  }, [globalFilter]);

  const normalize = (value: string) =>
    value
      .normalize("NFD")
      .replace(/\p{Diacritic}/gu, "")
      .replace(/\s+/g, "")
      .toLowerCase();

  // Debounce de 500ms antes de notificar al padre
  useEffect(() => {
    const id = setTimeout(() => {
      onGlobalFilterChange(normalize(inputValue));
    }, 500);
    return () => clearTimeout(id);
  }, [inputValue, onGlobalFilterChange]);

  // Columnas que el usuario puede mostrar/ocultar (excluye la de selección)
  const ocultables = table.getAllColumns().filter((c) => c.getCanHide());

  // Solo mostramos el conteo de ocultas si hay al menos una
  const cantidadOcultas = ocultables.filter((c) => !c.getIsVisible()).length;

  return (
    <div className="flex flex-wrap items-center gap-2">
      {/* Búsqueda global */}
      <div className="relative flex-1 min-w-[200px]">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Buscar..."
          className="pl-9 h-9"
        />
        {inputValue && (
          <button
            onClick={() => setInputValue("")}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Limpiar búsqueda"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {/* Slot para contenido extra */}
      {extraContent}

      {/* Menú de visibilidad de columnas */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="h-9 gap-2">
            <Columns3 className="h-4 w-4" />
            <span className="hidden sm:inline">Columnas</span>
            {/* Solo muestra el conteo si hay columnas ocultas */}
            {cantidadOcultas > 0 && (
              <span className="inline-flex items-center justify-center h-4 min-w-4 px-1 rounded-full bg-primary text-primary-foreground text-[10px] font-semibold">
                -{cantidadOcultas}
              </span>
            )}
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-52">
          <DropdownMenuLabel className="flex items-center justify-between py-2">
            <span className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
              Columnas visibles
            </span>
            <div className="flex gap-1">
              {/* Mostrar todas */}
              <button
                onClick={() => ocultables.forEach((c) => c.toggleVisibility(true))}
                className="p-1 rounded hover:bg-accent transition-colors"
                title="Mostrar todas"
              >
                <Eye className="h-3 w-3 text-muted-foreground" />
              </button>
              {/* Ocultar todas */}
              <button
                onClick={() => ocultables.forEach((c) => c.toggleVisibility(false))}
                className="p-1 rounded hover:bg-accent transition-colors"
                title="Ocultar todas"
              >
                <EyeOff className="h-3 w-3 text-muted-foreground" />
              </button>
            </div>
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          {ocultables.map((column) => (
            <DropdownMenuCheckboxItem
              key={column.id}
              checked={column.getIsVisible()}
              onCheckedChange={(v) => column.toggleVisibility(v)}
              className="capitalize"
            >
              {/* Usa meta.label si está definido, sino el id de la columna */}
              {(column.columnDef.meta as any)?.label ?? column.id}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Exportar CSV (solo columnas visibles) */}
      {onExportCSV && (
        <Button variant="outline" size="sm" onClick={onExportCSV} className="h-9 gap-2">
          <Download className="h-4 w-4" />
          <span className="hidden sm:inline">CSV</span>
        </Button>
      )}
    </div>
  );
}
