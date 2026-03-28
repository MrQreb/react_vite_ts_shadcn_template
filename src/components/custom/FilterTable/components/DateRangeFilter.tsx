/** Selector de rango de fechas para filtros. */
import { CalendarIcon } from "lucide-react";
import { format, parse } from "date-fns";
import { es } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

interface DateRangeFilterProps {
  value: { start: string | null; end: string | null };
  onChange: (value: { start: string | null; end: string | null }) => void;
}

/**
 * DatePicker para rangos con dos meses visibles.
 */
export function DateRangeFilter({ value, onChange }: DateRangeFilterProps) {
  const parseLocal = (iso: string) => parse(iso, "yyyy-MM-dd", new Date());

  const label = value.start
    ? `${format(parseLocal(value.start), "d MMM", { locale: es })} → ${value.end ? format(parseLocal(value.end), "d MMM", { locale: es }) : "..."
    }`
    : null;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-between h-9 text-sm font-normal",
            !value.start && "text-muted-foreground"
          )}
        >
          {label ?? "Seleccionar rango"}
          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          locale={es}
          mode="range"
          numberOfMonths={2}
          captionLayout="dropdown"
          hidden={{
            after: new Date(new Date().getFullYear() + 1, 11, 31),
            before: new Date(2000, 0, 1),
          }}
          selected={{
            from: value.start ? parseLocal(value.start) : undefined,
            to: value.end ? parseLocal(value.end) : undefined,
          }}
          onSelect={(range) =>
            onChange({
              start: range?.from ? format(range.from, "yyyy-MM-dd") : null,
              end: range?.to ? format(range.to, "yyyy-MM-dd") : null,
            })
          }
        // initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
