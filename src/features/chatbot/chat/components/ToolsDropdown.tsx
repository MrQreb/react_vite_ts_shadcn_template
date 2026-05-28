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
    ArrowDownWideNarrow,
  BarChart3,
  Calendar,
  CalendarRange,
  CornerLeftUp,
  CornerRightDown,
  DollarSign,
  Files,
  FileSearch,
  FileSpreadsheet,
  ListFilter,
  ListOrdered,
  Medal,
  Sheet,
  Sparkles,
  TrendingUp,
  Trophy,
  UserRoundSearch,
  Users,
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
    description: 'Consultas de facturación, ventas y análisis',
    icon: FileSearch,
    items: [
      {
        title: 'Facturas',
        description: 'Consulta información de facturas y sus detalles',
        icon: Files,
        iconClassName: 'text-emerald-500',
        children: [
          {
            title: 'Por rango de fechas',
            description: 'Busca facturas dentro de un periodo específico',
            icon: Calendar,
            iconClassName: 'text-green-400',
            prompt: 'Dame las facturas entre el 2026-01-01 y 2026-01-31'
          },
          {
            title: 'Por número de factura',
            description: 'Consulta una factura específica con sus detalles',
            icon: BarChart3,
            iconClassName: 'text-green-400',
            prompt: 'Dame los detalles de la facturas facturas 412465, 412466, 412467, 412475, 412480'
          }
        ]
      },

      {
        title: 'Productos vendidos',
        description: 'Consulta ingresos, libras, cajas y productos vendidos',
        icon: DollarSign,
        iconClassName: 'text-green-500',
        children: [
          {
            title: 'Productos más vendidos',
            description: 'Top de productos vendidos en un periodo',
            icon: CornerLeftUp,
            iconClassName: 'text-green-500',
            prompt: 'Dime los 20 productos más vendidos del 2025-01-01 hasta 2025-12-31'
          },
          {
            title: 'Productos menos vendidos',
            description: 'Productos con menor volumen de venta',
            icon: CornerRightDown,
            iconClassName: 'text-green-500',
            prompt: 'Dime los 20 productos menos vendidos del 2025-01-01 hasta 2025-12-31'
          }
        ]
      },

      {
        title: 'Ventas',
        description: 'Consultas de ventas y productos vendidos',
        icon: TrendingUp,
        iconClassName: 'text-cyan-500',
        children: [
          {
            title: 'Ventas por rango de fechas',
            description: 'Consulta resumen de ventas por periodo',
            icon: CalendarRange,
            iconClassName: 'text-cyan-500',
            prompt: 'Dame las ventas del 2025-01-01 al 2025-12-31'
          },
          {
            title: 'Productos más vendidos',
            description: 'Consulta ranking de productos vendidos',
            icon: Trophy,
            iconClassName: 'text-cyan-500',
            prompt: 'Dime los 50 productos más vendidos del 2025'
          },
          {
            title: 'Productos menos vendidos',
            description: 'Consulta productos con menor venta',
            icon: ArrowDownWideNarrow,
            iconClassName: 'text-cyan-500',
            prompt: 'Dime los productos menos vendidos del 2025'
          },
        ]
      },
    ]
  },

  {
    title: 'Reportes Excel',
    description: 'Generación de archivos Excel para facturación y análisis',
    icon: Sheet,
    items: [
      {
        title: 'Facturas',
        description: 'Exportación de facturas y detalles',
        icon: FileSpreadsheet,
        iconClassName: 'text-emerald-500',
        children: [
          {
            title: 'Por planta, fecha y cliente',
            description: 'Genera reportes usando filtros avanzados',
            icon: ListFilter,
            iconClassName: 'text-blue-500',
            prompt: 'Generame el excel de las facturas del enero del 2023 de la planta 03 y con codigo de cliente M01'
          },
          {
            title: 'Por números de factura',
            description: 'Exporta múltiples facturas específicas',
            icon: ListOrdered,
            iconClassName: 'text-blue-500',
            prompt: 'Generame el excel de las facturas 412465, 412466, 412467, 412475, 412480'
          }
        ]
      },

      {
        title: 'Ventas',
        description: 'Reportes de ventas y productos vendidos',
        icon: TrendingUp,
        iconClassName: 'text-cyan-500',
        children: [
          {
            title: 'Ventas por rango de fechas',
            description: 'Resumen de ventas por periodo',
            icon: CalendarRange,
            iconClassName: 'text-cyan-500',
            prompt: 'Generame un excel con las ventas del 2025-01-01 al 2025-12-31'
          },
          {
            title: 'Productos más vendidos',
            description: 'Exporta ranking de productos vendidos',
            icon: Trophy,
            iconClassName: 'text-cyan-500',
            prompt: 'Generame un excel con los 50 productos más vendidos del 2025'
          },
          {
            title: 'Productos menos vendidos',
            description: 'Exporta productos con menor venta',
            icon: ArrowDownWideNarrow,
            iconClassName: 'text-cyan-500',
            prompt: 'Generame un excel con los productos menos vendidos del 2025'
          },
          // {
          //   title: 'Por clave de producto',
          //   description: 'Exporta productos su clave',
          //   icon: CaseUpper ,
          //   iconClassName: 'text-cyan-500',
          //   prompt: 'Generame un excel de productos vendidos del producto BRFL1250GSELE00'
          // }
        ]
      },

      {
        title: 'Clientes',
        description: 'Reportes y análisis por cliente',
        icon: Users,
        iconClassName: 'text-violet-500',
        children: [
          {
            title: 'Facturas por cliente',
            description: 'Exporta facturas de un cliente específico',
            icon: UserRoundSearch,
            iconClassName: 'text-violet-500',
            prompt: 'Generame un excel con las facturas del cliente M01'
          },
          {
            title: 'Clientes con más compras',
            description: 'Ranking de clientes por volumen de compra',
            icon: Medal,
            iconClassName: 'text-violet-500',
            prompt: 'Generame un excel con los clientes con más compras del 2025'
          }
        ]
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