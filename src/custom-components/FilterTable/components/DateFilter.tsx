/** Selector de fecha única para filtros. */
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
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
          {value ? format(new Date(value), "d MMM yyyy", { locale: es }) : "Seleccionar fecha"}
          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          locale={es}
          mode="single"
          selected={value ? new Date(value) : undefined}
          onSelect={(date) => onChange(date ? format(date, "yyyy-MM-dd") : null)}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
