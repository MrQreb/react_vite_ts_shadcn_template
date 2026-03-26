
// ─── Types ────────────────────────────────────────────────────────────────────

import { BadgeBoolean, BadgeText, DataTable, SortableHeader } from "@/custom-components/DataTable";
import { useDataTable } from "@/custom-components/DataTable/hooks/useDataTable";
import type { ColumnDef } from "@tanstack/react-table";

interface Product {
  id: number;
  name: string;
  category: "electronics" | "clothing" | "food" | "sports";
  price: number;
  stock: number;
  inStock: boolean;
}

// ─── Static data ─────────────────────────────────────────────────────────────

const PRODUCTS: Product[] = [
  { id: 1,  name: "Laptop Pro 15",      category: "electronics", price: 18500, stock: 12, inStock: true  },
  { id: 2,  name: "Teclado Mecánico",   category: "electronics", price: 1200,  stock: 45, inStock: true  },
  { id: 3,  name: "Playera Deportiva",  category: "clothing",    price: 350,   stock: 0,  inStock: false },
  { id: 4,  name: "Monitor 4K 27\"",    category: "electronics", price: 9800,  stock: 8,  inStock: true  },
  { id: 5,  name: "Proteína Whey",      category: "food",        price: 680,   stock: 30, inStock: true  },
  { id: 6,  name: "Zapatillas Running", category: "sports",      price: 2200,  stock: 0,  inStock: false },
  { id: 7,  name: "Audífonos BT",       category: "electronics", price: 1800,  stock: 22, inStock: true  },
  { id: 8,  name: "Pants Jogger",       category: "clothing",    price: 480,   stock: 15, inStock: true  },
  { id: 9,  name: "Barra de Proteína",  category: "food",        price: 45,    stock: 200,inStock: true  },
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

const CATEGORY_LABELS = {
  electronics: "Electrónica",
  clothing:    "Ropa",
  food:        "Alimentos",
  sports:      "Deportes",
};

// ─── Columns ──────────────────────────────────────────────────────────────────

const columns: ColumnDef<Product, any>[] = [
  {
    accessorKey: "id",
    header: "#",
    cell: ({ getValue }) => <span className="text-gray-400 text-xs">#{getValue()}</span>,
  },
  {
    accessorKey: "name",
    header: ({ column }) => <SortableHeader column={column} title="Producto" />,
    cell: ({ getValue }) => <span className="font-medium">{getValue()}</span>,
  },
  {
    accessorKey: "category",
    header: "Categoría",
    cell: ({ getValue }) => {
      const cat = getValue() as Product["category"];
      return <BadgeText text={CATEGORY_LABELS[cat]} variant={CATEGORY_VARIANTS[cat]} />;
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => <SortableHeader column={column} title="Precio" />,
    cell: ({ getValue }) => (
      <span className="font-semibold text-emerald-600">
        ${(getValue() as number).toLocaleString("es-MX")}
      </span>
    ),
  },
  {
    accessorKey: "stock",
    header: ({ column }) => <SortableHeader column={column} title="Stock" />,
    cell: ({ getValue }) => {
      const stock = getValue() as number;
      return (
        <span className={stock === 0 ? "text-red-500 font-medium" : "text-gray-700"}>
          {stock} uds.
        </span>
      );
    },
  },
  {
    accessorKey: "inStock",
    header: "Disponible",
    cell: ({ getValue }) => <BadgeBoolean value={getValue()} textTrue="Disponible" textFalse="Agotado" />,
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ProductsPage() {
  const { queryParams, updateQueryParams } = useDataTable({ pageSize: 5 });

  // Client-side "pagination" with static data
  const filtered = PRODUCTS.filter((p) => {
    const q = (queryParams.search ?? "").toLowerCase();
    return !q || p.name.toLowerCase().includes(q) || CATEGORY_LABELS[p.category].toLowerCase().includes(q);
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / queryParams.pageSize));
  const page = Math.min(queryParams.page, totalPages);
  const sliced = filtered.slice((page - 1) * queryParams.pageSize, page * queryParams.pageSize);

  const handleExportCSV = () => {
    const headers = ["ID", "Producto", "Categoría", "Precio", "Stock", "Disponible"];
    const rows = PRODUCTS.map((p) => [
      p.id, p.name, CATEGORY_LABELS[p.category], p.price, p.stock, p.inStock ? "Sí" : "No",
    ]);
    const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "productos.csv";
    a.click();
  };

  return (
    <DataTable
      title="Catálogo de productos"
      data={sliced}
      columns={columns}
      totalPages={totalPages}
      totalRecords={filtered.length}
      queryParams={{ ...queryParams, page }}
      onQueryChange={updateQueryParams}
      onExportCSV={handleExportCSV}
    />
  );
}
