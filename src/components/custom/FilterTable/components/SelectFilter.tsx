/** Selector con búsqueda basado en shadcn Command. */
import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { cn } from "@/lib/utils";
import type { FilterOption } from "../types";

interface SelectFilterProps {
  options: FilterOption[];
  value: string;
  onSelect: (value: string) => void;
}

/**
 * Combobox reutilizable para filtros de tipo select.
 */
export function SelectFilter({ options, value, onSelect }: SelectFilterProps) {
  const [open, setOpen] = useState(false);
  const label = options.find((option) => option.value === value)?.label;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-between h-9 text-sm font-normal",
            !label && "text-muted-foreground"
          )}
        >
          {label ?? "Seleccionar..."}
          <Check
            className={cn(
              "ml-auto h-4 w-4 transition-opacity",
              value ? "opacity-100 text-primary" : "opacity-0"
            )}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-0" align="start">
        <Command>
          <CommandInput placeholder="Buscar..." className="h-9" />
          <CommandList>
            <CommandEmpty className="py-4 text-center text-sm text-muted-foreground">
              Sin resultados
            </CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.label}
                  onSelect={() => {
                    onSelect(option.value === value ? "" : option.value);
                    setOpen(false);
                  }}
                  className="gap-2"
                >
                  <Check
                    className={cn(
                      "h-4 w-4 text-primary",
                      option.value === value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
