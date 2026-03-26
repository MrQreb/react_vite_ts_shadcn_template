import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

interface DataTablePaginationProps {
  page: number;
  pageSize: number;
  totalPages: number;
  totalRecords?: number;
  rowCount: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  onReset: () => void;
  onExportCSV?: () => void;
}

const PAGE_SIZES = [10, 25, 50, 100, 200];

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
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-1 py-2 text-sm text-gray-600 dark:text-gray-400">
      {/* Info */}
      <div className="flex flex-col gap-0.5">
        <span>{rowCount} filas en esta página</span>
        {totalRecords !== undefined && (
          <span className="text-xs text-gray-400">{totalRecords} registros en total</span>
        )}
        <span className="text-xs">
          Página <strong className="text-gray-800 dark:text-gray-200">{page}</strong> de {totalPages}
        </span>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Reset filters */}
        <button
          onClick={onReset}
          className="h-8 px-3 rounded-md border border-gray-200 bg-white text-xs font-medium hover:bg-gray-50 dark:bg-gray-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800"
        >
          Borrar filtros
        </button>

        {/* Page size */}
        <select
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          className="h-8 px-2 rounded-md border border-gray-200 bg-white text-xs dark:bg-gray-900 dark:border-gray-700 dark:text-white"
        >
          {PAGE_SIZES.map((s) => (
            <option key={s} value={s}>
              {s} / página
            </option>
          ))}
        </select>

        {/* Nav buttons */}
        <div className="flex items-center gap-1">
          <NavBtn onClick={() => onPageChange(1)} disabled={page === 1} title="Primera página">
            <ChevronsLeft className="h-4 w-4" />
          </NavBtn>
          <NavBtn onClick={() => onPageChange(page - 1)} disabled={page === 1} title="Página anterior">
            <ChevronLeft className="h-4 w-4" />
          </NavBtn>
          <NavBtn onClick={() => onPageChange(page + 1)} disabled={page >= totalPages || totalPages === 0} title="Página siguiente">
            <ChevronRight className="h-4 w-4" />
          </NavBtn>
          <NavBtn onClick={() => onPageChange(totalPages)} disabled={page >= totalPages || totalPages === 0} title="Última página">
            <ChevronsRight className="h-4 w-4" />
          </NavBtn>
        </div>
      </div>
    </div>
  );
}

function NavBtn({ onClick, disabled, title, children }: {
  onClick: () => void;
  disabled: boolean;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      className="h-8 w-8 flex items-center justify-center rounded-md border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed dark:bg-gray-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800"
    >
      {children}
    </button>
  );
}
