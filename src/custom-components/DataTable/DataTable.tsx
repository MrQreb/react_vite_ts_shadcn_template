import { useRef, useState, useCallback } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
  type ColumnFiltersState,
  type VisibilityState,
  type RowSelectionState,
  type ColumnSizingState,
} from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { DataTablePagination } from "./DataTablePagination";
import { DataTableToolbar } from "./DataTableToolbar";

// ─── Tipos ────────────────────────────────────────────────────────────────────

/**
 * Parámetros de consulta sincronizados con la URL via TanStack Router.
 * Se pasan al servidor como query params para búsquedas server-side.
 *
 * URL resultante de ejemplo:
 * `/usuarios?page=2&pageSize=25&search=ana&rol=admin`
 */
export interface QueryParams {
  /** Página actual (base 1) */
  page: number;
  /** Registros por página */
  pageSize: number;
  /** Búsqueda global */
  search?: string;
  /** Filtros adicionales — columnas, fechas, selects, etc. */
  [key: string]: string | number | undefined;
}

/**
 * Props del componente DataTable.
 * @template TData — Tipo de cada fila
 */
export interface DataTableProps<TData> {
  /** Filas de la página actual */
  data: TData[];
  /** Definición de columnas de TanStack Table */
  columns: ColumnDef<TData, any>[];
  /** Total de páginas del servidor */
  totalPages: number;
  /** Total de registros en la BD (opcional, para el footer) */
  totalRecords?: number;
  /** Parámetros actuales leídos de la URL */
  queryParams: QueryParams;
  /** Callback invocado al cambiar cualquier parámetro (actualiza la URL) */
  onQueryChange: (updates: Partial<QueryParams>) => void;
  /**
   * Exporta a CSV **solo las columnas visibles**.
   * Recibe las filas seleccionadas (o todas si no hay selección) y los
   * encabezados de las columnas actualmente visibles.
   */
  onExportCSV?: (params: { visibleHeaders: string[]; getRowValues: (row: TData) => string[] }) => void;
  /** Slot para contenido extra en la toolbar (ej. `<FilterTable />`) */
  toolbar?: React.ReactNode;
  /** Muestra skeletons en lugar de filas */
  loading?: boolean;
  /** Habilita el redimensionamiento de columnas. Default: `true` */
  enableResizing?: boolean;
  /**
   * Habilita la selección de filas con checkboxes.
   * Cuando está activo se añade automáticamente una columna de checkbox.
   * Default: `false`
   */
  enableRowSelection?: boolean;
  /**
   * Callback con las filas seleccionadas cuando cambia la selección.
   * Solo disponible si `enableRowSelection` es `true`.
   */
  onRowSelectionChange?: (rows: TData[]) => void;
  /** Título visible encima de la tabla */
  title?: string;
}

// ─── Columna de selección ────────────────────────────────────────────────────

/** Genera la definición de columna de checkbox para row selection */
function crearColumnaSeleccion<TData>(): ColumnDef<TData, any> {
  return {
    id: "__seleccion__",
    size: 48,
    enableResizing: false,
    enableHiding: false,
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected()
            ? true
            : table.getIsSomePageRowsSelected()
            ? "indeterminate"
            : false
        }
        onCheckedChange={(v) => table.toggleAllPageRowsSelected(!!v)}
        aria-label="Seleccionar todas las filas"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(v) => row.toggleSelected(!!v)}
        aria-label="Seleccionar fila"
        onClick={(e) => e.stopPropagation()}
      />
    ),
  };
}

// ─── Componente ───────────────────────────────────────────────────────────────

/**
 * Tabla de datos reutilizable con:
 * - Paginación server-side (query params en la URL)
 * - Búsqueda global
 * - Visibilidad de columnas (doble clic en cabecera)
 * - Ordenamiento por columna
 * - Redimensionamiento de columnas
 * - Selección de filas con checkbox
 * - Exportación a CSV de columnas visibles
 *
 * @example
 * ```tsx
 * <DataTable
 *   data={usuarios}
 *   columns={columnas}
 *   totalPages={totalPaginas}
 *   queryParams={queryParams}
 *   onQueryChange={updateQueryParams}
 *   enableRowSelection
 *   onRowSelectionChange={(filas) => console.log(filas)}
 * />
 * ```
 */
export function DataTable<TData>({
  data,
  columns: columnsProp,
  totalPages,
  totalRecords,
  queryParams,
  onQueryChange,
  onExportCSV,
  toolbar,
  loading = false,
  enableResizing = true,
  enableRowSelection = false,
  onRowSelectionChange,
  title,
}: DataTableProps<TData>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [columnSizing, setColumnSizing] = useState<ColumnSizingState>({});
  const [globalFilter, setGlobalFilter] = useState(queryParams.search ?? "");

  const containerRef = useRef<HTMLDivElement>(null);

  // Prepend columna de selección si está habilitada
  const columns = enableRowSelection
    ? [crearColumnaSeleccion<TData>(), ...columnsProp]
    : columnsProp;

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
      columnSizing,
      pagination: { pageIndex: queryParams.page - 1, pageSize: queryParams.pageSize },
    },
    manualPagination: true,
    pageCount: totalPages,
    enableColumnResizing: enableResizing,
    columnResizeMode: "onChange",
    enableRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onColumnSizingChange: setColumnSizing,
    onRowSelectionChange: (updater) => {
      const next = typeof updater === "function" ? updater(rowSelection) : updater;
      setRowSelection(next);
      // Notificar al padre con las filas originales
      onRowSelectionChange?.(
        Object.keys(next)
          .filter((k) => next[k])
          .map((k) => data[Number(k)])
          .filter(Boolean)
      );
    },
    onGlobalFilterChange: (value) => {
      setGlobalFilter(value);
      onQueryChange({ search: value, page: 1 });
    },
  });

  // ── CSV con columnas visibles ─────────────────────────────────────────────
  const handleExportCSV = useCallback(() => {
    if (!onExportCSV) return;

    // Columnas visibles (excluye la de selección)
    const visibleCols = table
      .getVisibleLeafColumns()
      .filter((c) => c.id !== "__seleccion__");

    const visibleHeaders = visibleCols.map(
      (c) => (c.columnDef.meta as any)?.label ?? c.id
    );

    const getRowValues = (row: TData): string[] =>
      visibleCols.map((c) => {
        const accessorKey = (c.columnDef as any).accessorKey as keyof TData | undefined;
        const val = accessorKey ? row[accessorKey] : "";
        return String(val ?? "");
      });

    onExportCSV({ visibleHeaders, getRowValues });
  }, [table, onExportCSV]);

  // ── Conteo de seleccionados ───────────────────────────────────────────────
  const seleccionados = table.getSelectedRowModel().rows.length;

  return (
    <div className="flex flex-col gap-4">
      {/* Título */}
      {title && (
        <h2 className="text-2xl font-black text-center capitalize text-foreground">
          {title}
        </h2>
      )}

      {/* Toolbar */}
      <DataTableToolbar
        table={table}
        globalFilter={globalFilter}
        onGlobalFilterChange={(v) => {
          setGlobalFilter(v);
          onQueryChange({ search: v, page: 1 });
        }}
        extraContent={toolbar}
        onExportCSV={onExportCSV ? handleExportCSV : undefined}
      />

      {/* Banner de selección */}
      {enableRowSelection && seleccionados > 0 && (
        <div className="flex items-center gap-3 px-3 py-2 rounded-md bg-primary/10 border border-primary/20 text-sm text-primary">
          <Badge variant="secondary" className="bg-primary text-primary-foreground text-xs">
            {seleccionados}
          </Badge>
          <span>{seleccionados === 1 ? "fila seleccionada" : "filas seleccionadas"}</span>
          <button
            onClick={() => table.resetRowSelection()}
            className="ml-auto text-xs underline underline-offset-2 hover:opacity-70 transition-opacity"
          >
            Deseleccionar todo
          </button>
        </div>
      )}

      {/* Tabla */}
      <div ref={containerRef} className="rounded-md border overflow-x-auto">
        <Table style={{ width: enableResizing ? table.getTotalSize() : "100%" }}>
          <TableHeader>
            {table.getHeaderGroups().map((hg) => (
              <TableRow key={hg.id} className="bg-muted/50 hover:bg-muted/50">
                {hg.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    style={{ width: header.getSize(), position: "relative" }}
                    className="font-semibold text-foreground select-none"
                    /**
                     * Doble clic en la cabecera → oculta la columna.
                     * No aplica a la columna de selección ni a columnas no ocultables.
                     */
                    onDoubleClick={() => {
                      if (header.column.getCanHide()) {
                        header.column.toggleVisibility(false);
                      }
                    }}
                    title={header.column.getCanHide() ? "Doble clic para ocultar columna" : undefined}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}

                    {/* Handle de redimensionamiento */}
                    {enableResizing && header.column.getCanResize() && (
                      <div
                        onMouseDown={header.getResizeHandler()}
                        onTouchStart={header.getResizeHandler()}
                        className={[
                          "absolute right-0 top-0 h-full w-1 cursor-col-resize select-none touch-none",
                          "bg-border hover:bg-primary/60 transition-colors",
                          header.column.getIsResizing()
                            ? "bg-primary opacity-100"
                            : "opacity-0 hover:opacity-100",
                        ].join(" ")}
                      />
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {loading
              ? Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={`sk-${i}`}>
                    {columns.map((_, j) => (
                      <TableCell key={j}>
                        <Skeleton className="h-4 w-full" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              : table.getRowModel().rows.length === 0
              ? (
                <TableRow>
                  <TableCell colSpan={columns.length} className="py-16 text-center text-muted-foreground">
                    Sin resultados.
                  </TableCell>
                </TableRow>
              )
              : table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() ? "selected" : undefined}
                    className={enableRowSelection ? "cursor-pointer" : undefined}
                    onClick={enableRowSelection ? () => row.toggleSelected() : undefined}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} style={{ width: cell.column.getSize() }}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </div>

      {/* Paginación */}
      <DataTablePagination
        page={queryParams.page}
        pageSize={queryParams.pageSize}
        totalPages={totalPages}
        totalRecords={totalRecords}
        rowCount={data.length}
        onPageChange={(page) => onQueryChange({ page })}
        onPageSizeChange={(pageSize) => onQueryChange({ pageSize, page: 1 })}
        onReset={() => onQueryChange({ page: 1, search: "" })}
      />
    </div>
  );
}
