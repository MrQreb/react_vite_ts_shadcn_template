import { useState } from "react";
import { Search, Columns3, ChevronDown, Eye, EyeOff, Download } from "lucide-react";
import type { ColumnDef, VisibilityState } from "@tanstack/react-table";

interface DataTableToolbarProps {
  globalFilter: string;
  onGlobalFilterChange: (value: string) => void;
  columns: ColumnDef<any, any>[];
  columnVisibility: VisibilityState;
  setColumnVisibility: (v: VisibilityState) => void;
  extraContent?: React.ReactNode;
  onExportCSV?: () => void;
}

export function DataTableToolbar({
  globalFilter,
  onGlobalFilterChange,
  columns,
  columnVisibility,
  setColumnVisibility,
  extraContent,
  onExportCSV,
}: DataTableToolbarProps) {
  const [colPopoverOpen, setColPopoverOpen] = useState(false);

  // Get columns that have an id or accessorKey to toggle
  const toggleableColumns = columns
    .filter((col) => (col as any).accessorKey || col.id)
    .map((col) => ({
      key: ((col as any).accessorKey ?? col.id) as string,
      label: typeof col.header === "string" ? col.header : ((col as any).accessorKey ?? col.id),
    }));

  const toggle = (key: string) => {
    setColumnVisibility({ ...columnVisibility, [key]: !(columnVisibility[key] ?? true) });
  };

  const visibleCount = toggleableColumns.filter((c) => columnVisibility[c.key] ?? true).length;

  return (
    <div className="flex flex-wrap items-center gap-2">
      {/* Global search */}
      <div className="relative flex-1 min-w-[200px]">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
        <input
          value={globalFilter}
          onChange={(e) => onGlobalFilterChange(e.target.value)}
          placeholder="Buscar..."
          className="w-full pl-10 pr-4 h-9 rounded-md border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-700 dark:text-white"
        />
      </div>

      {/* Extra toolbar slot (filters, buttons, etc.) */}
      {extraContent}

      {/* Column visibility */}
      <div className="relative">
        <button
          onClick={() => setColPopoverOpen((o) => !o)}
          className="flex items-center gap-2 h-9 px-3 rounded-md border border-gray-200 bg-white text-sm font-medium hover:bg-gray-50 dark:bg-gray-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800"
        >
          <Columns3 className="h-4 w-4 text-gray-500" />
          <span className="hidden sm:inline">Columnas</span>
          {visibleCount < toggleableColumns.length && (
            <span className="text-xs bg-blue-100 text-blue-700 px-1.5 rounded-full">
              {visibleCount}/{toggleableColumns.length}
            </span>
          )}
          <ChevronDown className={`h-3.5 w-3.5 transition-transform ${colPopoverOpen ? "rotate-180" : ""}`} />
        </button>

        {colPopoverOpen && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setColPopoverOpen(false)} />
            <div className="absolute right-0 top-full mt-2 z-20 w-56 rounded-xl border border-gray-200 bg-white shadow-xl dark:bg-gray-900 dark:border-gray-700 overflow-hidden">
              <div className="flex items-center justify-between px-3 py-2 border-b border-gray-100 dark:border-gray-800">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Columnas visibles</span>
                <div className="flex gap-1">
                  <button
                    onClick={() => setColumnVisibility(Object.fromEntries(toggleableColumns.map((c) => [c.key, true])))}
                    className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
                    title="Mostrar todas"
                  >
                    <Eye className="h-3.5 w-3.5 text-gray-400" />
                  </button>
                  <button
                    onClick={() => setColumnVisibility(Object.fromEntries(toggleableColumns.map((c) => [c.key, false])))}
                    className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
                    title="Ocultar todas"
                  >
                    <EyeOff className="h-3.5 w-3.5 text-gray-400" />
                  </button>
                </div>
              </div>
              <div className="py-1 max-h-60 overflow-y-auto">
                {toggleableColumns.map((col) => {
                  const isVisible = columnVisibility[col.key] ?? true;
                  return (
                    <label
                      key={col.key}
                      className="flex items-center gap-2 px-3 py-1.5 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 select-none"
                    >
                      <input
                        type="checkbox"
                        checked={isVisible}
                        onChange={() => toggle(col.key)}
                        className="rounded"
                      />
                      <span className="text-sm">{String(col.label)}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Export CSV */}
      {onExportCSV && (
        <button
          onClick={onExportCSV}
          className="flex items-center gap-2 h-9 px-3 rounded-md border border-gray-200 bg-white text-sm font-medium hover:bg-gray-50 dark:bg-gray-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800"
        >
          <Download className="h-4 w-4 text-gray-500" />
          <span className="hidden sm:inline">CSV</span>
        </button>
      )}
    </div>
  );
}
