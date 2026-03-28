import { useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { Package, TrendingUp, AlertTriangle, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { BadgeBoolean, BadgeText, DataTable, FilterTable, SortableHeader, useCsvExport, useDataTable, type FilterType } from "@/components/custom/DataTable";


// ─── Tipos ────────────────────────────────────────────────────────────────────

interface Product {
  id: number;
  name: string;
  category: "electronics" | "clothing" | "food" | "sports";
  price: number;
  stock: number;
  inStock: boolean;
}

// ─── Datos estáticos (simula respuesta del servidor) ──────────────────────────

const PRODUCTS: Product[] = [
  { id: 1,  name: "Laptop Pro 15",      category: "electronics", price: 18500, stock: 12, inStock: true  },
  { id: 2,  name: "Teclado Mecánico",   category: "electronics", price: 1200,  stock: 45, inStock: true  },
  { id: 3,  name: "Playera Deportiva",  category: "clothing",    price: 350,   stock: 0,  inStock: false },
  { id: 4,  name: "Monitor 4K 27\"",    category: "electronics", price: 9800,  stock: 8,  inStock: true  },
  { id: 5,  name: "Proteína Whey",      category: "food",        price: 680,   stock: 30, inStock: true  },
  { id: 6,  name: "Zapatillas Running", category: "sports",      price: 2200,  stock: 0,  inStock: false },
  { id: 7,  name: "Audífonos BT",       category: "electronics", price: 1800,  stock: 22, inStock: true  },
  { id: 8,  name: "Pants Jogger",       category: "clothing",    price: 480,   stock: 15, inStock: true  },
  { id: 9,  name: "Barra de Proteína",  category: "food",        price: 45,    stock: 200, inStock: true  },
  { id: 10, name: "Mancuernas 20kg",    category: "sports",      price: 950,   stock: 7,  inStock: true  },
  { id: 11, name: "Mouse Inalámbrico",  category: "electronics", price: 650,   stock: 0,  inStock: false },
  { id: 12, name: "Chaqueta Térmica",   category: "clothing",    price: 1100,  stock: 9,  inStock: true  },
];

const CATEGORY_VARIANTS = {
  electronics: "blue",
  clothing:    "yellow",
  food:        "green",
  sports:      "red",
} as const;

const CATEGORY_LABELS: Record<Product["category"], string> = {
  electronics: "Electrónica",
  clothing:    "Ropa",
  food:        "Alimentos",
  sports:      "Deportes",
};

const CATEGORY_OPTIONS = Object.entries(CATEGORY_LABELS).map(([value, label]) => ({ value, label }));

// ─── Métricas ─────────────────────────────────────────────────────────────────

function calcularMetricas(productos: Product[]) {
  const total = productos.length;
  const disponibles = productos.filter((p) => p.inStock).length;
  const agotados = total - disponibles;
  const valorInventario = productos.reduce((s, p) => s + p.price * p.stock, 0);
  return { total, disponibles, agotados, valorInventario };
}

// ─── Columnas ─────────────────────────────────────────────────────────────────

const columns: ColumnDef<Product, any>[] = [
  {
    accessorKey: "id",
    size: 60,
    meta: { label: "ID" },
    header: "#",
    cell: ({ getValue }) => (
      <span className="text-muted-foreground text-xs font-mono">#{getValue()}</span>
    ),
  },
  {
    accessorKey: "name",
    size: 200,
    meta: { label: "Producto" },
    header: ({ column }) => <SortableHeader column={column} title="Producto" />,
    cell: ({ getValue }) => <span className="font-medium">{getValue()}</span>,
  },
  {
    accessorKey: "category",
    size: 130,
    meta: { label: "Categoría" },
    header: "Categoría",
    cell: ({ getValue }) => {
      const cat = getValue() as Product["category"];
      return <BadgeText text={CATEGORY_LABELS[cat]} variant={CATEGORY_VARIANTS[cat]} />;
    },
  },
  {
    accessorKey: "price",
    size: 120,
    meta: { label: "Precio" },
    header: ({ column }) => <SortableHeader column={column} title="Precio" />,
    cell: ({ getValue }) => (
      <span className="font-semibold text-emerald-600 dark:text-emerald-400">
        ${(getValue() as number).toLocaleString("es-MX")}
      </span>
    ),
  },
  {
    accessorKey: "stock",
    size: 100,
    meta: { label: "Stock" },
    header: ({ column }) => <SortableHeader column={column} title="Stock" />,
    cell: ({ getValue }) => {
      const stock = getValue() as number;
      return (
        <span className={stock === 0 ? "text-destructive font-medium" : "text-foreground"}>
          {stock} uds.
        </span>
      );
    },
  },
  {
    accessorKey: "inStock",
    size: 120,
    meta: { label: "Disponible" },
    header: "Disponible",
    cell: ({ getValue }) => (
      <BadgeBoolean value={getValue()} textTrue="Disponible" textFalse="Agotado" />
    ),
  },
];

// ─── Página ───────────────────────────────────────────────────────────────────

/**
 * Página de catálogo de productos.
 *
 * En producción, reemplaza el filtrado/paginación local con:
 * ```ts
 * const { data, isLoading } = useQuery({
 *   queryKey: ["products", queryParams],
 *   queryFn: () => api.getProducts(queryParams),
 *   // → GET /api/products?page=1&pageSize=5&search=laptop&categoria=electronics
 * });
 * ```
 */
export default function ProductsPage() {
  const { queryParams, updateQueryParams, resetQueryParams } = useDataTable({
    defaults: { pageSize: 30 },
    filterKeys: ["categoria"],
  });
  const [categoria, setCategoria] = useState<string>((queryParams.categoria as string) ?? "");
  const [seleccionados, setSeleccionados] = useState<Product[]>([]);

  // ── Filtrado y paginación client-side (reemplazar con fetch al servidor) ───
  const filtrados = PRODUCTS.filter((p) => {
    const q = (queryParams.search ?? "").toLowerCase();
    const matchSearch = !q || p.name.toLowerCase().includes(q) || CATEGORY_LABELS[p.category].toLowerCase().includes(q);
    const matchCategoria = !queryParams.categoria || p.category === queryParams.categoria;
    return matchSearch && matchCategoria;
  });

  
  const totalPages = Math.max(1, Math.ceil(filtrados.length / queryParams.pageSize));
  const page = Math.min(queryParams.page, totalPages);
  const pageData = filtrados.slice((page - 1) * queryParams.pageSize, page * queryParams.pageSize);
  // ──────────────────────────────────────────────────────────────────────────

  const handleExportCSV = useCsvExport<Product>({ fileName: "productos.csv" });

  const metricas = calcularMetricas(PRODUCTS);

  const filtros: FilterType[] = [
    {
      type: "select",
      key: "categoria",
      label: "Categoría",
      value: categoria,
      options: CATEGORY_OPTIONS,
      onChange: setCategoria,
    },
  ];

  const handleResetAll = () => {
    setCategoria("");
    setSeleccionados([]);
    resetQueryParams();
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

        {/* Encabezado de página */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Catálogo de productos
            </h1>
            <p className="text-muted-foreground mt-1">
              Gestiona el inventario y disponibilidad de productos.
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-muted px-3 py-1.5">
            <Package className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">{metricas.total} productos</span>
          </div>
        </div>

        {/* Tarjetas de métricas */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            icon={<Package className="h-4 w-4 text-blue-500" />}
            label="Total productos"
            value={metricas.total}
            bg="bg-blue-50 dark:bg-blue-950/30"
          />
          <MetricCard
            icon={<CheckCircle2 className="h-4 w-4 text-emerald-500" />}
            label="Disponibles"
            value={metricas.disponibles}
            bg="bg-emerald-50 dark:bg-emerald-950/30"
          />
          <MetricCard
            icon={<AlertTriangle className="h-4 w-4 text-red-500" />}
            label="Agotados"
            value={metricas.agotados}
            bg="bg-red-50 dark:bg-red-950/30"
          />
          <MetricCard
            icon={<TrendingUp className="h-4 w-4 text-violet-500" />}
            label="Valor inventario"
            value={`$${metricas.valorInventario.toLocaleString("es-MX")}`}
            bg="bg-violet-50 dark:bg-violet-950/30"
          />
        </div>

        {/* Banner de selección activa */}
        {seleccionados.length > 0 && (
          <div className="rounded-lg border border-primary/20 bg-primary/5 px-4 py-3 text-sm flex items-center justify-between">
            <span className="font-medium text-primary">
              {seleccionados.length} producto{seleccionados.length !== 1 && "s"} seleccionado{seleccionados.length !== 1 && "s"}
            </span>
            <span className="text-muted-foreground">
              Valor total:{" "}
              <strong className="text-foreground">
                ${seleccionados.reduce((s, p) => s + p.price, 0).toLocaleString("es-MX")}
              </strong>
            </span>
          </div>
        )}

        {/* Tabla */}
        <Card>
          <CardContent className="pt-6">
            <DataTable
              data={pageData}
              columns={columns}
              totalPages={totalPages}
              totalRecords={filtrados.length}
              queryParams={{ ...queryParams, page }}
              onQueryChange={updateQueryParams}
              onExportCSV={handleExportCSV}
              onResetAll={handleResetAll}
              enableRowSelection
              onRowSelectionChange={setSeleccionados}
              toolbar={
                <FilterTable
                  filters={filtros}
                  onApply={(draft) => {
                    const nextCategoria = (draft.find((f) => f.key === "categoria")?.value as string) ?? "";
                    setCategoria(nextCategoria);
                    updateQueryParams({ categoria: nextCategoria || undefined, page: 1 });
                  }}
                  onClear={handleResetAll}
                />
              }
            />
          </CardContent>
        </Card>

      </div>
    </div>
  );
}

// ─── Tarjeta de métrica ───────────────────────────────────────────────────────

function MetricCard({ icon, label, value, bg }: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  bg: string;
}) {
  return (
    <Card className="border">
      <CardContent className="pt-5 pb-4">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${bg}`}>{icon}</div>
          <div>
            <p className="text-xs text-muted-foreground font-medium">{label}</p>
            <p className="text-lg font-bold text-foreground">{value}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
