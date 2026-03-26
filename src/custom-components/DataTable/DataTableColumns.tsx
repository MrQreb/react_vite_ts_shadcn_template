import type { Column } from "@tanstack/react-table";
import { ArrowUp, ArrowDown, ArrowUpDown } from "lucide-react";

// ─── Sortable Column Header ───────────────────────────────────────────────────

interface SortableHeaderProps {
  column: Column<any, any>;
  title: string;
}

export function SortableHeader({ column, title }: SortableHeaderProps) {
  const sorted = column.getIsSorted();

  return (
    <button
      onClick={column.getToggleSortingHandler()}
      className="flex items-center gap-1 font-semibold hover:text-blue-600 transition-colors group"
    >
      {title}
      {sorted === "asc" ? (
        <ArrowUp className="h-3.5 w-3.5 text-blue-500" />
      ) : sorted === "desc" ? (
        <ArrowDown className="h-3.5 w-3.5 text-blue-500" />
      ) : (
        <ArrowUpDown className="h-3.5 w-3.5 text-gray-400 group-hover:text-gray-600" />
      )}
    </button>
  );
}

// ─── Badge Boolean ────────────────────────────────────────────────────────────

interface BadgeBooleanProps {
  value: boolean;
  textTrue?: string;
  textFalse?: string;
}

export function BadgeBoolean({ value, textTrue = "Sí", textFalse = "No" }: BadgeBooleanProps) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
        value
          ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
          : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
      }`}
    >
      {value ? textTrue : textFalse}
    </span>
  );
}

// ─── Badge Text ───────────────────────────────────────────────────────────────

type BadgeVariant = "default" | "blue" | "green" | "red" | "yellow" | "gray";

const BADGE_STYLES: Record<BadgeVariant, string> = {
  default: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
  blue:    "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
  green:   "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
  red:     "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
  yellow:  "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300",
  gray:    "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
};

interface BadgeTextProps {
  text: string;
  variant?: BadgeVariant;
  icon?: React.ReactNode;
}

export function BadgeText({ text, variant = "default", icon }: BadgeTextProps) {
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${BADGE_STYLES[variant]}`}>
      {icon}
      {text}
    </span>
  );
}
