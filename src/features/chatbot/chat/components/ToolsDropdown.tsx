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
 * Tipado de item.
 */
type ToolItem = {
  title: string;
  description: string;
  icon: LucideIcon;
  iconClassName: string;
  prompt: string;
};

/**
 * Tipado de sección.
 */
type ToolSection = {
  title: string;
  description: string;
  icon: LucideIcon;
  items: ToolItem[];
};

/**
 * Configuración del dropdown.
 */
const sections: ToolSection[] = [
  {
    title: 'Consultas',
    description: 'Facturas y métricas',
    icon: FileSearch,

    items: [
      {
        title: 'Obtener Factura',
        description: 'Buscar por número de factura.',
        icon: Hash,
        iconClassName: 'text-blue-500',
        prompt: "dame la factura 441093"
      },
      {
        title: 'Consultar Facturas',
        description: 'Filtrar por fechas y clientes.',
        icon: FileSearch,
        iconClassName: 'text-violet-500',
        prompt: "facturas del 2026-05-01 al 2026-05-21"
      },
      {
        title: 'Resumen',
        description: 'Totales y estadísticas.',
        icon: BarChart3,
        iconClassName: 'text-emerald-500',
        prompt: "Hola"
      },
      {
        title: 'Producto Vendido',
        description: 'Consultar ventas por producto.',
        icon: PackageSearch,
        iconClassName: 'text-orange-500',
        prompt: "Hola"
      }
    ]
  },
  {
    title: 'Excels',
    description: 'Exportaciones y reportes',
    icon: FileSpreadsheet,
    items: [
      {
        title: 'Exportar Facturas',
        description: 'Descargar listado de facturas.',
        icon: FileSpreadsheet,
        iconClassName: 'text-green-500',
        prompt: "exportar facturas de hoy en Excel"
      },
      {
        title: 'Exportar Resumen',
        description: 'Generar reporte resumido.',
        icon: FileSpreadsheet,
        iconClassName: 'text-lime-500', 
        prompt: "Hola"
      }
    ]
  }
];

/**
 * Dropdown para selccionar las consultas predefinidas
 */
export const ToolsDropdown = () => {

  const { setText } = useChatInputStore();

  /** Escribe en el global storage el valor del propmpt predefinido */
  const handleClickItem = (value:string):void =>{
    setText(value);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size='icon'
          className='group relative size-12 rounded-2xl'
        >
          <Wrench className='relative z-10 size-4 transition-transform duration-200 group-hover:rotate-12' />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align='end'
        sideOffset={12}
        className='w-[92vw] max-w-[320px] rounded-2xl border border-border/50 bg-background/95 p-2 shadow-2xl backdrop-blur-xl'
      >
        {/* HEADER */}
        <div className='flex items-center gap-3 rounded-xl px-3 py-3'>
          <div className='flex size-10 items-center justify-center rounded-xl bg-primary/10'>
            <Sparkles className='size-4 text-primary' />
          </div>

          <div className='flex flex-col'>
            <span className='text-sm font-medium'>
              Herramientas Facturación
            </span>
          </div>
        </div>

        <DropdownMenuSeparator className='my-2' />

        {/* SECCIONES */}
        {sections.map((section) => {
          const SectionIcon = section.icon;

          return (
            <DropdownMenuGroup key={section.title}>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger className='rounded-xl py-3'>
                  <div className='flex flex-1 items-center gap-3'>
                    <div className='flex size-8 items-center justify-center rounded-lg bg-muted'>
                      <SectionIcon className='size-4 text-muted-foreground' />
                    </div>

                    <div className='flex flex-col text-left'>
                      <span className='text-sm'>
                        {section.title}
                      </span>

                      <span className='text-muted-foreground text-xs'>
                        {section.description}
                      </span>
                    </div>
                  </div>
                </DropdownMenuSubTrigger>

                <DropdownMenuPortal>
                  <DropdownMenuSubContent
                    sideOffset={6}
                    alignOffset={-88}
                    className='w-[90vw] max-w-[340px] rounded-2xl border border-border/50 p-2 shadow-2xl'
                  >
                    <DropdownMenuLabel className='text-muted-foreground text-xs'>
                      {section.title}
                    </DropdownMenuLabel>

                    <DropdownMenuSeparator />

                    {section.items.map((item) => {
                      const ItemIcon = item.icon;
                      const prompt = item.prompt;

                      return (
                        <DropdownMenuItem
                          onClick={() => handleClickItem(prompt)}
                          key={item.title}
                          className='items-start gap-3 rounded-xl py-3'
                        >
                          <ItemIcon
                            className={`mt-0.5 size-4 ${item.iconClassName}`}
                          />

                          <div className='flex flex-col'>
                            <span className='text-sm'>
                              {item.title}
                            </span>

                            <span className='text-muted-foreground text-xs'>
                              {item.description}
                            </span>
                          </div>
                        </DropdownMenuItem>
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