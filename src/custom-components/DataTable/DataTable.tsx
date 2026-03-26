import { useState } from "react";
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

} from "@tanstack/react-table";
import { DataTablePagination } from "./DataTablePagination";
import { DataTableToolbar } from "./DataTableToolbar";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface QueryParams {
  page: number;
  pageSize: number;
  search?: string;
  [key: string]: string | number | undefined;
}

export interface DataTableProps<TData> {
  /** Table title */
  title: string;
  /** Row data */
  data: TData[];
  /** TanStack column definitions */
  columns: ColumnDef<TData, any>[];
  /** Total pages from server/pagination */
  totalPages: number;
  /** Total records count */
  totalRecords?: number;
  /** Current query params (page, pageSize, etc.) */
  queryParams: QueryParams;
  /** Called whenever page, pageSize, or search changes */
  onQueryChange: (updates: Partial<QueryParams>) => void;
  /** Optional: export to CSV */
  onExportCSV?: () => void;
  /** Optional: extra toolbar content (filters, buttons, etc.) */
  toolbar?: React.ReactNode;
  /** Loading state */
  loading?: boolean;
}

// ─── Component ───────────────────────────────────────────────────────────────

export function DataTable<TData>({
  title,
  data,
  columns,
  totalPages,
  totalRecords,
  queryParams,
  onQueryChange,
  onExportCSV,
  toolbar,
  loading = false,
}: DataTableProps<TData>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [globalFilter, setGlobalFilter] = useState(queryParams.search ?? "");

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
      pagination: {
        pageIndex: queryParams.page - 1,
        pageSize: queryParams.pageSize,
      },
    },
    manualPagination: true,
    pageCount: totalPages,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: (value) => {
      setGlobalFilter(value);
      onQueryChange({ search: value, page: 1 });
    },
    globalFilterFn: (row, _columnId, filterValue) => {
      const normalize = (s: string) =>
        s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      const words = normalize(filterValue).split(" ");
      return Object.values(row.original as object).some((v) => {
        const str = normalize(String(v ?? ""));
        return words.every((w) => str.includes(w));
      });
    },
  });

  return (
    <div className="flex flex-col gap-4">
      {/* Title */}
      <h2 className="text-2xl font-black text-center capitalize">{title}</h2>

      {/* Toolbar: search + extra content */}
      <DataTableToolbar
        globalFilter={globalFilter}
        onGlobalFilterChange={(v) => {
          setGlobalFilter(v);
          onQueryChange({ search: v, page: 1 });
        }}
        columnVisibility={columnVisibility}
        setColumnVisibility={setColumnVisibility}
        columns={columns}
        extraContent={toolbar}
        onExportCSV={onExportCSV}
      />

      {/* Table */}
      <div className="rounded-md border overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 dark:bg-gray-800">
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id}>
                {hg.headers.map((header) => (
                  <th key={header.id} className="px-4 py-3 text-left font-semibold">
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={columns.length} className="py-10 text-center text-gray-400">
                  Cargando...
                </td>
              </tr>
            ) : table.getRowModel().rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="py-10 text-center text-gray-400">
                  Sin resultados.
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="border-t hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                  data-selected={row.getIsSelected()}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-4 py-3">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <DataTablePagination
        page={queryParams.page}
        pageSize={queryParams.pageSize}
        totalPages={totalPages}
        totalRecords={totalRecords}
        rowCount={data.length}
        onPageChange={(page) => onQueryChange({ page })}
        onPageSizeChange={(pageSize) => onQueryChange({ pageSize, page: 1 })}
        onReset={() => onQueryChange({ page: 1, search: "" })}
        onExportCSV={onExportCSV}
      />
    </div>
  );
}
