/** Selector de fecha única para filtros. */
import { CalendarIcon } from "lucide-react";
import { format, parse } from "date-fns";
import { es } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

interface DateFilterProps {
  value: string | null;
  onChange: (value: string | null) => void;
}

/**
 * DatePicker compacto para elegir una única fecha.
 */
export function DateFilter({ value, onChange }: DateFilterProps) {
  const parseLocal = (iso: string) => parse(iso, "yyyy-MM-dd", new Date());

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-between h-9 text-sm font-normal",
            !value && "text-muted-foreground"
          )}
        >
          {value ? format(parseLocal(value), "d MMM yyyy", { locale: es }) : "Seleccionar fecha"}
          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          locale={es}
          mode="single"
          captionLayout="dropdown"
          hidden={{
            after: new Date(new Date().getFullYear() + 1, 11, 31),
            before: new Date(2000, 0, 1),
          }}
          // fromDate={new Date(2000, 0, 1)}
          // toDate={new Date(new Date().getFullYear() + 1, 11, 31)}
          selected={value ? parseLocal(value) : undefined}
          onSelect={(date) => onChange(date ? format(date, "yyyy-MM-dd") : null)}
        />
      </PopoverContent>
    </Popover>
  );
}
