import { ColumnDef } from "@tanstack/react-table";
import { DataTable, SortableHeader, BadgeBoolean, BadgeText } from "../components/DataTable";
import { useDataTable } from "../hooks/useDataTable";

// ─── Types ────────────────────────────────────────────────────────────────────

interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "editor" | "viewer";
  active: boolean;
  createdAt: string;
}

// ─── Static data ─────────────────────────────────────────────────────────────

const USERS: User[] = [
  { id: 1,  name: "Ana García",       email: "ana@example.com",     role: "admin",  active: true,  createdAt: "2024-01-15" },
  { id: 2,  name: "Luis Martínez",    email: "luis@example.com",    role: "editor", active: true,  createdAt: "2024-02-20" },
  { id: 3,  name: "María López",      email: "maria@example.com",   role: "viewer", active: false, createdAt: "2024-03-05" },
  { id: 4,  name: "Carlos Ramírez",   email: "carlos@example.com",  role: "editor", active: true,  createdAt: "2024-03-18" },
  { id: 5,  name: "Elena Torres",     email: "elena@example.com",   role: "admin",  active: true,  createdAt: "2024-04-01" },
  { id: 6,  name: "José Hernández",   email: "jose@example.com",    role: "viewer", active: false, createdAt: "2024-04-15" },
  { id: 7,  name: "Patricia Sánchez", email: "patricia@example.com",role: "editor", active: true,  createdAt: "2024-05-10" },
  { id: 8,  name: "Miguel Flores",    email: "miguel@example.com",  role: "viewer", active: true,  createdAt: "2024-05-22" },
  { id: 9,  name: "Sofía Reyes",      email: "sofia@example.com",   role: "admin",  active: false, createdAt: "2024-06-01" },
  { id: 10, name: "Diego Morales",    email: "diego@example.com",   role: "editor", active: true,  createdAt: "2024-06-15" },
  { id: 11, name: "Valentina Cruz",   email: "valentina@example.com",role:"viewer", active: true,  createdAt: "2024-07-03" },
  { id: 12, name: "Andrés Vega",      email: "andres@example.com",  role: "editor", active: false, createdAt: "2024-07-20" },
];

const ROLE_VARIANTS = { admin: "red", editor: "blue", viewer: "gray" } as const;

// ─── Columns ──────────────────────────────────────────────────────────────────

const columns: ColumnDef<User, any>[] = [
  {
    accessorKey: "id",
    header: "#",
    cell: ({ getValue }) => <span className="text-gray-400 text-xs">#{getValue()}</span>,
  },
  {
    accessorKey: "name",
    header: ({ column }) => <SortableHeader column={column} title="Nombre" />,
  },
  {
    accessorKey: "email",
    header: ({ column }) => <SortableHeader column={column} title="Correo" />,
    cell: ({ getValue }) => (
      <a href={`mailto:${getValue()}`} className="text-blue-600 hover:underline text-sm">
        {getValue()}
      </a>
    ),
  },
  {
    accessorKey: "role",
    header: "Rol",
    cell: ({ getValue }) => {
      const role = getValue() as User["role"];
      return <BadgeText text={role} variant={ROLE_VARIANTS[role]} />;
    },
  },
  {
    accessorKey: "active",
    header: "Activo",
    cell: ({ getValue }) => <BadgeBoolean value={getValue()} textTrue="Activo" textFalse="Inactivo" />,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => <SortableHeader column={column} title="Creado" />,
    cell: ({ getValue }) => (
      <span className="text-gray-500 text-xs">{getValue()}</span>
    ),
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function UsersPage() {
  const { queryParams, updateQueryParams } = useDataTable({ pageSize: 5 });

  // Client-side "pagination" with static data
  const filtered = USERS.filter((u) => {
    const q = (queryParams.search ?? "").toLowerCase();
    return !q || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / queryParams.pageSize));
  const page = Math.min(queryParams.page, totalPages);
  const sliced = filtered.slice((page - 1) * queryParams.pageSize, page * queryParams.pageSize);

  const handleExportCSV = () => {
    const headers = ["ID", "Nombre", "Correo", "Rol", "Activo", "Creado"];
    const rows = USERS.map((u) => [u.id, u.name, u.email, u.role, u.active ? "Sí" : "No", u.createdAt]);
    const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "usuarios.csv";
    a.click();
  };

  return (
    <DataTable
      title="Usuarios del sistema"
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
