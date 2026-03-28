/**
 * Hook reutilizable para exportar CSV priorizando las filas seleccionadas.
 * Si no hay selección, usa un fallback (ej. todas las filas filtradas).
 */
import { useCallback } from "react";

interface ExportParams<TData> {
  visibleHeaders: string[];
  getRowValues: (row: TData) => string[];
  /** Nombre del archivo CSV. Default: "datos.csv" */
  fileName?: string;
  /** Exporta solo seleccionadas cuando es `true`. Default: `true`. */
  onlySelected?: boolean;
}

interface UseRowSelectionExportReturn<TData> {
  /**
   * Devuelve las filas que se exportarán, priorizando las seleccionadas.
   */
  getRowsForExport: (onlySelected?: boolean) => TData[];
  /**
   * Genera y descarga el CSV usando columnas visibles y filas seleccionadas.
   */
  exportToCsv: (params: ExportParams<TData>) => void;
}

export function useRowSelectionExport<TData>(
  selectedRows: TData[],
  fallbackRows: TData[]
): UseRowSelectionExportReturn<TData> {
  const getRowsForExport = useCallback(
    (onlySelected: boolean = true) =>
      onlySelected && selectedRows.length > 0 ? selectedRows : fallbackRows,
    [selectedRows, fallbackRows]
  );

  const exportToCsv = useCallback(
    ({ visibleHeaders, getRowValues, fileName = "datos.csv", onlySelected = true }: ExportParams<TData>) => {
      const rows = getRowsForExport(onlySelected).map(getRowValues);
      const csv = [visibleHeaders, ...rows].map((row) => row.join(",")).join("\n");

      const blob = new Blob([csv], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = fileName;
      link.click();

      URL.revokeObjectURL(url);
    },
    [getRowsForExport]
  );

  return { getRowsForExport, exportToCsv };
}
