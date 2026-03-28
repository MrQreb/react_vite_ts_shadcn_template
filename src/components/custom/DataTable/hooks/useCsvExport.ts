import { useCallback } from "react";
import type { DataTableProps } from "../DataTable";

interface UseCsvExportOptions {
  /** Nombre del archivo a descargar. Default: "datos.csv" */
  fileName?: string;
  /** Separador de columnas. Default: "," */
  separator?: string;
  /** Incluye BOM para que Excel respete UTF-8 (acentos). Default: true */
  includeBom?: boolean;
}

type ExportHandler<TData> = NonNullable<DataTableProps<TData>["onExportCSV"]>;
type ExportParams<TData> = Parameters<ExportHandler<TData>>[0];

/**
 * Hook reutilizable para generar un callback `onExportCSV`.
 * - Prioriza filas seleccionadas; usa fallback si no hay selección.
 * - Agrega BOM UTF-8 opcional para que Excel respete acentos y caracteres especiales.
 */
export function useCsvExport<TData>(options?: UseCsvExportOptions): ExportHandler<TData> {
  const { fileName = "datos.csv", separator = ",", includeBom = true } = options ?? {};

  return useCallback(
    ({ visibleHeaders, getRowValues, selectedRows, rowsForExport }: ExportParams<TData>) => {
      const sourceRows = selectedRows.length > 0 ? selectedRows : rowsForExport;
      const csvRows = [visibleHeaders, ...sourceRows.map(getRowValues)];
      const content = csvRows.map((row) => row.join(separator)).join("\r\n");
      const prefix = includeBom ? "\uFEFF" : "";

      const blob = new Blob([prefix + content], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = fileName;
      link.click();

      URL.revokeObjectURL(url);
    },
    [fileName, separator, includeBom]
  );
}
