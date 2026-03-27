// ─── Componente principal ─────────────────────────────────────────────────────
export { DataTable } from "./DataTable";
export type { DataTableProps, QueryParams } from "./DataTable";

// ─── Sub-componentes ──────────────────────────────────────────────────────────
export { DataTableToolbar } from "./DataTableToolbar";
export { DataTablePagination } from "./DataTablePagination";

// ─── Helpers de columnas ──────────────────────────────────────────────────────
export { SortableHeader, BadgeBoolean, BadgeText } from "./DataTableColumns";
export type { BadgeVariant } from "./DataTableColumns";

// ─── Filtros avanzados ────────────────────────────────────────────────────────
export { FilterTable } from "../FilterTable";
export type { FilterType, FilterOption, FilterTableProps } from "../FilterTable";

// ─── Helpers de FilterTable ───────────────────────────────────────────────────
export { getBooleanValue, getValidBoolean, parseBooleanParam } from "./filterTable-helper";

// ─── Hook de sincronización con URL ──────────────────────────────────────────
export { useDataTable } from "./hooks/useDataTable";
export { useRowSelectionExport } from "./hooks/useRowSelectionExport";
export { useCsvExport } from "./hooks/useCsvExport";
