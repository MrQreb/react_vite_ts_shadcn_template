import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// ─── Types ───────────────────────────────────────────────────────────────────

interface DataTablePaginationProps {
  /** Página actual (base 1) */
  page: number;
  /** Registros por página seleccionados */
  pageSize: number;
  /** Total de páginas devuelto por el servidor */
  totalPages: number;
  /** Total de registros en la base de datos */
  totalRecords?: number;
  /** Cantidad de filas en la página actual */
  rowCount: number;
  /** Callback al cambiar de página */
  onPageChange: (page: number) => void;
  /** Callback al cambiar el tamaño de página */
  onPageSizeChange: (pageSize: number) => void;
  /** Callback para resetear búsqueda y volver a la página 1 */
  onReset: () => void;
}

/** Opciones de tamaño de página disponibles */
const PAGE_SIZES = [10, 25, 50, 100, 200] as const;

// ─── Component ───────────────────────────────────────────────────────────────

/**
 * Footer de paginación para la tabla.
 *
 * Muestra:
 * - Información de registros (filas en página actual y total)
 * - Selector de registros por página
 * - Navegación de páginas (primera, anterior, siguiente, última)
 * - Botón para limpiar filtros y volver a la página 1
 *
 * @example
 * ```tsx
 * <DataTablePagination
 *   page={queryParams.page}
 *   pageSize={queryParams.pageSize}
 *   totalPages={totalPages}
 *   totalRecords={500}
 *   rowCount={data.length}
 *   onPageChange={(p) => updateQueryParams({ page: p })}
 *   onPageSizeChange={(s) => updateQueryParams({ pageSize: s, page: 1 })}
 *   onReset={resetQueryParams}
 * />
 * ```
 */
export function DataTablePagination({
  page,
  pageSize,
  totalPages,
  totalRecords,
  rowCount,
  onPageChange,
  onPageSizeChange,
  onReset,
}: DataTablePaginationProps) {
  const isFirstPage = page <= 1;
  const isLastPage = page >= totalPages || totalPages === 0;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-1 py-2 text-sm text-muted-foreground">
      {/* Información de registros */}
      <div className="flex flex-col gap-0.5">
        <span>
          {rowCount} {rowCount === 1 ? "fila" : "filas"} en esta página
        </span>
        {totalRecords !== undefined && (
          <span className="text-xs">
            {totalRecords.toLocaleString("es-MX")} registros en total
          </span>
        )}
        <span className="text-xs">
          Página{" "}
          <strong className="text-foreground font-semibold">{page}</strong> de{" "}
          {totalPages}
        </span>
      </div>

      {/* Controles */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Botón para limpiar filtros */}
        <Button variant="ghost" size="sm" onClick={onReset} className="h-8 text-xs">
          Borrar filtros
        </Button>

        {/* Selector de registros por página */}
        <Select
          value={String(pageSize)}
          onValueChange={(v) => onPageSizeChange(Number(v))}
        >
          <SelectTrigger className="h-8 w-[110px] text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {PAGE_SIZES.map((s) => (
              <SelectItem key={s} value={String(s)} className="text-xs">
                {s} / página
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Navegación de páginas */}
        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => onPageChange(1)}
            disabled={isFirstPage}
            title="Primera página"
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => onPageChange(page - 1)}
            disabled={isFirstPage}
            title="Página anterior"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => onPageChange(page + 1)}
            disabled={isLastPage}
            title="Página siguiente"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => onPageChange(totalPages)}
            disabled={isLastPage}
            title="Última página"
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
