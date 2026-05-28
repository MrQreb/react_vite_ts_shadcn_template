import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  BarChart3,
  Calendar,
  CornerLeftUp,
  CornerRightDown,
  DollarSign,
  Files,
  FileSearch,
  FileSpreadsheet,
  Hash,
  PackageSearch,
  Sparkles,
  Wrench,
  type LucideIcon
} from 'lucide-react';
import { useChatInputStore } from '../store/chatInput.store';

/**
 * Representa un item de herramienta.
 */
type ToolItem = {
  title: string;
  description: string;
  icon: LucideIcon;
  iconClassName: string;
  prompt?: string;
  children?: ToolItem[];
};

/**
 * Representa una sección del dropdown.
 */
type ToolSection = {
  title: string;
  description: string;
  icon: LucideIcon;
  items: ToolItem[];
};

/**
 * Configuración de herramientas del dropdown.
 */
const sections: ToolSection[] = [
  {
    title: 'Consultas',
    description: 'Facturas y ventas',
    icon: FileSearch,
    items: [
      {
        title: 'Facturas',
        description: 'Permite ver los datos de facturas y sus detalles',
        icon: Files,
        iconClassName: 'text-emerald-500',
        children: [
          {
            title: 'Por rango de fechas',
            description: 'Buscar por un rango de fechas en especifico',
            icon: Calendar,
            iconClassName: 'text-green-400',
            prompt: 'Dame las facturas entre el 2026-01-01 y 2026-01-31'
          },
          {
            title: 'Por número de factura',
            description: 'Buscar una factura y sus detalles por número de factura',
            icon: BarChart3,
            iconClassName: 'text-green-400',
            prompt: 'Dame la factura número 412475'
          }
        ]

      },
      {
        title: 'Productos Vendido',
        description: 'Consultar ingreso, libras, cajas y producto.',
        icon: DollarSign,
        iconClassName: 'text-green-500',
        children: [
          {
            title: 'Productos más vendidos',
            description: 'Productos mas vendidos por un rango de fechas',
            icon: CornerLeftUp ,
            iconClassName: 'text-green-500',
            prompt: 'Dime los 20 productos más vendidos del 2025-01-01 hasta 2025-12-31'
          },
          {
            title: 'Productos menos vendidos',
            description: 'Productos menos vendidos por un rango de fechas',
            icon: CornerRightDown ,
            iconClassName: 'text-green-500',
            prompt: 'Dime los 20 productos menos vendidos del 2025-01-01 hasta 2025-12-31'
          },
        ]
      }
    ]
  },
  {
    title: 'Excels',
    description: 'Reportes de Exel',
    icon: FileSpreadsheet,
    items: [
      {
        title: 'Reporte de factura',
        description: '',
        icon: FileSpreadsheet,
        iconClassName: 'text-green-500',
        prompt: 'exportar facturas de hoy en Excel'
      },
      {
        title: 'Exportar Resumen',
        description: 'Generar reporte resumido.',
        icon: FileSpreadsheet,
        iconClassName: 'text-lime-500',
        prompt: 'exportar resumen en Excel'
      }
    ]
  }
];

/**
 * Dropdown de herramientas para insertar prompts predefinidos en el chat.
 */
export const ToolsDropdown = () => {
  const { setText } = useChatInputStore();

  /**
   * Inserta el prompt seleccionado en el input global del chat.
   */
  const handleClickItem = (value: string): void => {
    setText(value);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" className="group relative size-12 rounded-2xl">
          <Wrench className="relative z-10 size-4 transition-transform duration-200 group-hover:rotate-12" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={12}
        className="w-[92vw] max-w-[320px] rounded-2xl border border-border/50 bg-background/95 p-2 shadow-2xl backdrop-blur-xl"
      >
        {/* HEADER */}
        <div className="flex items-center gap-3 rounded-xl px-3 py-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10">
            <Sparkles className="size-4 text-primary" />
          </div>

          <div className="flex flex-col">
            <span className="text-sm font-medium">
              Herramientas Facturación
            </span>
          </div>
        </div>

        <DropdownMenuSeparator className="my-2" />

        {/* SECCIONES */}
        {sections.map((section) => {
          const SectionIcon = section.icon;

          return (

            <DropdownMenuGroup key={section.title}>

              <DropdownMenuSub>
                <DropdownMenuSubTrigger className="rounded-xl py-3">
                  <div className="flex flex-1 items-center gap-3">
                    <div className="flex size-8 items-center justify-center rounded-lg bg-muted">
                      <SectionIcon className="size-4 text-muted-foreground" />
                    </div>

                    <div className="flex flex-col text-left">
                      <span className="text-sm">{section.title}</span>
                      <span className="text-xs text-muted-foreground">
                        {section.description}
                      </span>
                    </div>
                  </div>
                </DropdownMenuSubTrigger>

                <DropdownMenuPortal>
                  <DropdownMenuSubContent
                    sideOffset={6}
                    alignOffset={-88}
                    className="w-[90vw] max-w-[340px] rounded-2xl border border-border/50 p-2 shadow-2xl"
                  >
                    <DropdownMenuLabel className="text-xs text-muted-foreground">
                      {section.title}
                    </DropdownMenuLabel>

                    <DropdownMenuSeparator />

                    {/* ITEMS */}
                    {section.items.map((item) => {
                      const ItemIcon = item.icon;

                      const hasChildren = item.children && item.children.length > 0;

                      // Item sin sub menu
                      if (!hasChildren) {
                        return (
                          <DropdownMenuItem
                            key={item.title}
                            onClick={() =>
                              item.prompt && handleClickItem(item.prompt)
                            }
                            className="items-start gap-3 rounded-xl py-3"
                          >
                            <ItemIcon className={`mt-0.5 size-4 ${item.iconClassName}`} />

                            <div className="flex flex-col text-left">
                              <span className="text-sm">{item.title}</span>
                              <span className="text-xs text-muted-foreground">
                                {item.description}
                              </span>
                            </div>
                          </DropdownMenuItem>
                        );
                      }

                      // Item con submenu a la derecha
                      return (
                        <DropdownMenuSub key={item.title}>
                          <DropdownMenuSubTrigger className="rounded-xl py-3">
                            <div className="flex items-start gap-3">
                              <ItemIcon className={`mt-0.5 size-4 ${item.iconClassName}`} />

                              <div className="flex flex-col text-left">
                                <span className="text-sm">{item.title}</span>
                                <span className="text-xs text-muted-foreground">
                                  {item.description}
                                </span>
                              </div>
                            </div>
                          </DropdownMenuSubTrigger>

                          <DropdownMenuPortal>
                            <DropdownMenuSubContent
                              sideOffset={10}
                              className="w-[260px] rounded-2xl border border-border/50 p-2 shadow-2xl"
                            >
                              <DropdownMenuLabel className="text-xs text-muted-foreground">
                                {item.title}
                              </DropdownMenuLabel>

                              <DropdownMenuSeparator />

                              {item.children?.map((child) => {
                                const ChildIcon = child.icon;

                                return (
                                  <DropdownMenuItem
                                    key={child.title}
                                    onClick={() =>
                                      child.prompt && handleClickItem(child.prompt)
                                    }
                                    className="flex items-start gap-2 rounded-xl py-2"
                                  >
                                    <ChildIcon
                                      className={`mt-0.5 size-3 ${child.iconClassName}`}
                                    />

                                    <div className="flex flex-col">
                                      <span className="text-xs">{child.title}</span>
                                      <span className="text-[11px] text-muted-foreground">
                                        {child.description}
                                      </span>
                                    </div>
                                  </DropdownMenuItem>
                                );
                              })}
                            </DropdownMenuSubContent>
                          </DropdownMenuPortal>
                        </DropdownMenuSub>
                      );
                    })}


                  </DropdownMenuSubContent>

                </DropdownMenuPortal>

              </DropdownMenuSub>

            </DropdownMenuGroup>
          );
        })}


      </DropdownMenuContent>
    </DropdownMenu>
  );
};