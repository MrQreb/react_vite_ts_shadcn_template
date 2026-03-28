import type { Column } from "@tanstack/react-table";
import { ArrowUp, ArrowDown, ArrowUpDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// ─── Sortable Header ──────────────────────────────────────────────────────────

interface SortableHeaderProps {
  /** Instancia de la columna de TanStack Table */
  column: Column<any, any>;
  /** Texto visible en la cabecera */
  title: string;
}

/**
 * Cabecera de columna con soporte de ordenamiento.
 *
 * Muestra un icono indicador del estado de ordenamiento:
 * - Sin ordenar → `↕`
 * - Ascendente → `↑`
 * - Descendente → `↓`
 *
 * @example
 * ```tsx
 * // En la definición de columnas:
 * {
 *   accessorKey: "name",
 *   header: ({ column }) => <SortableHeader column={column} title="Nombre" />,
 * }
 * ```
 */
export function SortableHeader({ column, title }: SortableHeaderProps) {
  const sorted = column.getIsSorted();

  return (
    <button
      onClick={column.getToggleSortingHandler()}
      className="flex items-center gap-1.5 font-semibold hover:text-primary transition-colors group"
    >
      {title}
      {sorted === "asc" ? (
        <ArrowUp className="h-3.5 w-3.5 text-primary" />
      ) : sorted === "desc" ? (
        <ArrowDown className="h-3.5 w-3.5 text-primary" />
      ) : (
        <ArrowUpDown className="h-3.5 w-3.5 text-muted-foreground group-hover:text-muted-foreground/80" />
      )}
    </button>
  );
}

// ─── Badge Boolean ────────────────────────────────────────────────────────────

interface BadgeBooleanProps {
  /** Valor booleano a representar */
  value: boolean;
  /** Texto para cuando el valor es `true`. Por defecto: "Sí" */
  textTrue?: string;
  /** Texto para cuando el valor es `false`. Por defecto: "No" */
  textFalse?: string;
}

/**
 * Badge que representa visualmente un valor booleano.
 *
 * - `true` → variante verde (éxito)
 * - `false` → variante roja (destructivo)
 *
 * Soporta modo oscuro automáticamente via variables CSS de shadcn.
 *
 * @example
 * ```tsx
 * <BadgeBoolean value={user.active} textTrue="Activo" textFalse="Inactivo" />
 * ```
 */
export function BadgeBoolean({
  value,
  textTrue = "Sí",
  textFalse = "No",
}: BadgeBooleanProps) {
  return (
    <Badge
      variant="secondary"
      className={cn(
        "text-xs font-semibold",
        value
          ? "bg-green-100 text-green-700 hover:bg-green-100 dark:bg-green-900/40 dark:text-green-400"
          : "bg-red-100 text-red-700 hover:bg-red-100 dark:bg-red-900/40 dark:text-red-400"
      )}
    >
      {value ? textTrue : textFalse}
    </Badge>
  );
}

// ─── Badge Text ───────────────────────────────────────────────────────────────

/** Variantes de color disponibles para `BadgeText` */
export type BadgeVariant =
  | "default"
  | "blue"
  | "green"
  | "red"
  | "yellow"
  | "gray"
  | "purple"
  | "orange";

const BADGE_STYLES: Record<BadgeVariant, string> = {
  default: "bg-secondary text-secondary-foreground hover:bg-secondary",
  blue:    "bg-blue-100 text-blue-700 hover:bg-blue-100 dark:bg-blue-900/40 dark:text-blue-400",
  green:   "bg-green-100 text-green-700 hover:bg-green-100 dark:bg-green-900/40 dark:text-green-400",
  red:     "bg-red-100 text-red-700 hover:bg-red-100 dark:bg-red-900/40 dark:text-red-400",
  yellow:  "bg-yellow-100 text-yellow-700 hover:bg-yellow-100 dark:bg-yellow-900/40 dark:text-yellow-400",
  gray:    "bg-gray-100 text-gray-600 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-400",
  purple:  "bg-purple-100 text-purple-700 hover:bg-purple-100 dark:bg-purple-900/40 dark:text-purple-400",
  orange:  "bg-orange-100 text-orange-700 hover:bg-orange-100 dark:bg-orange-900/40 dark:text-orange-400",
};

interface BadgeTextProps {
  /** Texto a mostrar dentro del badge */
  text: string;
  /** Variante de color. Por defecto: "default" */
  variant?: BadgeVariant;
  /** Icono opcional renderizado antes del texto */
  icon?: React.ReactNode;
}

/**
 * Badge de texto con soporte para múltiples variantes de color.
 *
 * Soporta modo oscuro automáticamente via variables CSS de shadcn.
 *
 * @example
 * ```tsx
 * <BadgeText text="Admin" variant="red" />
 * <BadgeText text="Editor" variant="blue" icon={<PencilIcon className="h-3 w-3" />} />
 * ```
 */
export function BadgeText({
  text,
  variant = "default",
  icon,
}: BadgeTextProps) {
  return (
    <Badge
      variant="secondary"
      className={cn("gap-1 text-xs font-semibold", BADGE_STYLES[variant])}
    >
      {icon}
      {text}
    </Badge>
  );
}
