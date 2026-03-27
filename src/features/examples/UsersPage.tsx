import { useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { Users, UserCheck, UserX, ShieldCheck, Trash2, Mail } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DataTable,
  FilterTable,
  SortableHeader,
  BadgeBoolean,
  BadgeText,
  useDataTable,
  parseBooleanParam,
  useCsvExport,
  type FilterType,
} from "@/custom-components/DataTable";

// ─── Tipos ────────────────────────────────────────────────────────────────────

interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "editor" | "viewer";
  active: boolean;
  createdAt: string;
}

// ─── Datos estáticos ──────────────────────────────────────────────────────────

const USERS: User[] = [
  { id: 1, name: "Ana García", email: "ana@example.com", role: "admin", active: true, createdAt: "2024-01-15" },
  { id: 2, name: "Luis Martínez", email: "luis@example.com", role: "editor", active: true, createdAt: "2024-02-20" },
  { id: 3, name: "María López", email: "maria@example.com", role: "viewer", active: false, createdAt: "2024-03-05" },
  { id: 4, name: "Carlos Ramírez", email: "carlos@example.com", role: "editor", active: true, createdAt: "2024-03-18" },
  { id: 5, name: "Elena Torres", email: "elena@example.com", role: "admin", active: true, createdAt: "2024-04-01" },
  { id: 6, name: "José Hernández", email: "jose@example.com", role: "viewer", active: false, createdAt: "2024-04-15" },
  { id: 7, name: "Patricia Sánchez", email: "patricia@example.com", role: "editor", active: true, createdAt: "2024-05-10" },
  { id: 8, name: "Miguel Flores", email: "miguel@example.com", role: "viewer", active: true, createdAt: "2024-05-22" },
  { id: 9, name: "Sofía Reyes", email: "sofia@example.com", role: "admin", active: false, createdAt: "2024-06-01" },
  { id: 10, name: "Diego Morales", email: "diego@example.com", role: "editor", active: true, createdAt: "2024-06-15" },
  { id: 11, name: "Valentina Cruz", email: "valentina@example.com", role: "viewer", active: true, createdAt: "2024-07-03" },
  { id: 12, name: "Andrés Vega", email: "andres@example.com", role: "editor", active: false, createdAt: "2024-07-20" },
  { id: 12, name: "Andrés Vega", email: "andres@example.com", role: "editor", active: false, createdAt: "2024-07-20" },
  { id: 12, name: "Andrés Vega", email: "andres@example.com", role: "editor", active: false, createdAt: "2024-07-20" },
  { id: 12, name: "Andrés Vega", email: "andres@example.com", role: "editor", active: false, createdAt: "2024-07-20" },
  { id: 12, name: "Andrés Vega", email: "andres@example.com", role: "editor", active: false, createdAt: "2024-07-20" },
  { id: 12, name: "Andrés Vega", email: "andres@example.com", role: "editor", active: false, createdAt: "2024-07-20" },
  { id: 12, name: "Andrés Vega", email: "andres@example.com", role: "editor", active: false, createdAt: "2024-07-20" },
  { id: 12, name: "Andrés Vega", email: "andres@example.com", role: "editor", active: false, createdAt: "2024-07-20" },
  { id: 12, name: "Andrés Vega", email: "andres@example.com", role: "editor", active: false, createdAt: "2024-07-20" },
  { id: 12, name: "Andrés Vega", email: "andres@example.com", role: "editor", active: false, createdAt: "2024-07-20" },
  { id: 12, name: "Andrés Vega", email: "andres@example.com", role: "editor", active: false, createdAt: "2024-07-20" },
  { id: 12, name: "Andrés Vega", email: "andres@example.com", role: "editor", active: false, createdAt: "2024-07-20" },
  { id: 12, name: "Andrés Vega", email: "andres@example.com", role: "editor", active: false, createdAt: "2024-07-20" },
  { id: 12, name: "Andrés Vega", email: "andres@example.com", role: "editor", active: false, createdAt: "2024-07-20" },
  { id: 12, name: "Andrés Vega", email: "andres@example.com", role: "editor", active: false, createdAt: "2024-07-20" },
  { id: 12, name: "Andrés Vega", email: "andres@example.com", role: "editor", active: false, createdAt: "2024-07-20" },
  { id: 12, name: "Andrés Vega", email: "andres@example.com", role: "editor", active: false, createdAt: "2024-07-20" },
  { id: 12, name: "Andrés Vega", email: "andres@example.com", role: "editor", active: false, createdAt: "2024-07-20" },
  { id: 12, name: "Andrés Vega", email: "andres@example.com", role: "editor", active: false, createdAt: "2024-07-20" },
  { id: 12, name: "Andrés Vega", email: "andres@example.com", role: "editor", active: false, createdAt: "2024-07-20" },
  { id: 12, name: "Andrés Vega", email: "andres@example.com", role: "editor", active: false, createdAt: "2024-07-20" },
  { id: 12, name: "Andrés Vega", email: "andres@example.com", role: "editor", active: false, createdAt: "2024-07-20" },
  { id: 12, name: "Andrés Vega", email: "andres@example.com", role: "editor", active: false, createdAt: "2024-07-20" },
  { id: 12, name: "Andrés Vega", email: "andres@example.com", role: "editor", active: false, createdAt: "2024-07-20" },
  { id: 12, name: "Andrés Vega", email: "andres@example.com", role: "editor", active: false, createdAt: "2024-07-20" },
  { id: 12, name: "Andrés Vega", email: "andres@example.com", role: "editor", active: false, createdAt: "2024-07-20" },
  { id: 12, name: "Andrés Vega", email: "andres@example.com", role: "editor", active: false, createdAt: "2024-07-20" },
  { id: 12, name: "Andrés Vega", email: "andres@example.com", role: "editor", active: false, createdAt: "2024-07-20" },
  { id: 12, name: "Andrés Vega", email: "andres@example.com", role: "editor", active: false, createdAt: "2024-07-20" },
  { id: 12, name: "Andrés Vega", email: "andres@example.com", role: "editor", active: false, createdAt: "2024-07-20" },
  { id: 12, name: "Andrés Vega", email: "andres@example.com", role: "editor", active: false, createdAt: "2024-07-20" },
  { id: 12, name: "Andrés Vega", email: "andres@example.com", role: "editor", active: false, createdAt: "2024-07-20" },
  { id: 12, name: "Andrés Vega", email: "andres@example.com", role: "editor", active: false, createdAt: "2024-07-20" },
  { id: 12, name: "Andrés Vega", email: "andres@example.com", role: "editor", active: false, createdAt: "2024-07-20" },
  { id: 12, name: "Andrés Vega", email: "andres@example.com", role: "editor", active: false, createdAt: "2024-07-20" },
  { id: 12, name: "Andrés Vega", email: "andres@example.com", role: "editor", active: false, createdAt: "2024-07-20" },
  { id: 12, name: "Andrés Vega", email: "andres@example.com", role: "editor", active: false, createdAt: "2024-07-20" },
  { id: 12, name: "Andrés Vega", email: "andres@example.com", role: "editor", active: false, createdAt: "2024-07-20" },
  { id: 12, name: "Andrés Vega", email: "andres@example.com", role: "editor", active: false, createdAt: "2024-07-20" },
  { id: 12, name: "Andrés Vega", email: "andres@example.com", role: "editor", active: false, createdAt: "2024-07-20" },
  { id: 12, name: "Andrés Vega", email: "andres@example.com", role: "editor", active: false, createdAt: "2024-07-20" },
  { id: 12, name: "Andrés Vega", email: "andres@example.com", role: "editor", active: false, createdAt: "2024-07-20" },
  { id: 12, name: "Andrés Vega", email: "andres@example.com", role: "editor", active: false, createdAt: "2024-07-20" },
  { id: 12, name: "Andrés Vega", email: "andres@example.com", role: "editor", active: false, createdAt: "2024-07-20" },
  { id: 12, name: "Andrés Vega", email: "andres@example.com", role: "editor", active: false, createdAt: "2024-07-20" },
  { id: 12, name: "Andrés Vega", email: "andres@example.com", role: "editor", active: false, createdAt: "2024-07-20" },
  { id: 12, name: "Andrés Vega", email: "andres@example.com", role: "editor", active: false, createdAt: "2024-07-20" },
  { id: 12, name: "Andrés Vega", email: "andres@example.com", role: "editor", active: false, createdAt: "2024-07-20" },
  { id: 12, name: "Andrés Vega", email: "andres@example.com", role: "editor", active: false, createdAt: "2024-07-20" },
  { id: 12, name: "Andrés Vega", email: "andres@example.com", role: "editor", active: false, createdAt: "2024-07-20" },
  { id: 12, name: "Andrés Vega", email: "andres@example.com", role: "editor", active: false, createdAt: "2024-07-20" },
  { id: 12, name: "Andrés Vega", email: "andres@example.com", role: "editor", active: false, createdAt: "2024-07-20" },
  { id: 12, name: "Andrés Vega", email: "andres@example.com", role: "editor", active: false, createdAt: "2024-07-20" },
  { id: 12, name: "Andrés Vega", email: "andres@example.com", role: "editor", active: false, createdAt: "2024-07-20" },
  { id: 12, name: "Andrés Vega", email: "andres@example.com", role: "editor", active: false, createdAt: "2024-07-20" },
  { id: 12, name: "Andrés Vega", email: "andres@example.com", role: "editor", active: false, createdAt: "2024-07-20" },
  { id: 12, name: "Andrés Vega", email: "andres@example.com", role: "editor", active: false, createdAt: "2024-07-20" },
  { id: 12, name: "Andrés Vega", email: "andres@example.com", role: "editor", active: false, createdAt: "2024-07-20" },
  { id: 12, name: "Andrés Vega", email: "andres@example.com", role: "editor", active: false, createdAt: "2024-07-20" },
  { id: 12, name: "Andrés Vega", email: "andres@example.com", role: "editor", active: false, createdAt: "2024-07-20" },
  { id: 12, name: "Andrés Vega", email: "andres@example.com", role: "editor", active: false, createdAt: "2024-07-20" },
  { id: 12, name: "Andrés Vega", email: "andres@example.com", role: "editor", active: false, createdAt: "2024-07-20" },
  { id: 12, name: "Andrés Vega", email: "andres@example.com", role: "editor", active: false, createdAt: "2024-07-20" },
  { id: 12, name: "Andrés Vega", email: "andres@example.com", role: "editor", active: false, createdAt: "2024-07-20" },
  { id: 12, name: "Andrés Vega", email: "andres@example.com", role: "editor", active: false, createdAt: "2024-07-20" },
  { id: 12, name: "Andrés Vega", email: "andres@example.com", role: "editor", active: false, createdAt: "2024-07-20" },
  { id: 12, name: "Andrés Vega", email: "andres@example.com", role: "editor", active: false, createdAt: "2024-07-20" },
  { id: 12, name: "Andrés Vega", email: "andres@example.com", role: "editor", active: false, createdAt: "2024-07-20" },
  { id: 12, name: "Andrés Vega", email: "andres@example.com", role: "editor", active: false, createdAt: "2024-07-20" },
  { id: 12, name: "Andrés Vega", email: "andres@example.com", role: "editor", active: false, createdAt: "2024-07-20" },
  { id: 12, name: "Andrés Vega", email: "andres@example.com", role: "editor", active: false, createdAt: "2024-07-20" },
  { id: 12, name: "Andrés Vega", email: "andres@example.com", role: "editor", active: false, createdAt: "2024-07-20" },
  { id: 12, name: "Andrés Vega", email: "andres@example.com", role: "editor", active: false, createdAt: "2024-07-20" },
  { id: 12, name: "Andrés Vega", email: "andres@example.com", role: "editor", active: false, createdAt: "2024-07-20" },
  { id: 12, name: "Andrés Vega", email: "andres@example.com", role: "editor", active: false, createdAt: "2024-07-20" },
  { id: 12, name: "Andrés Vega", email: "andres@example.com", role: "editor", active: false, createdAt: "2024-07-20" },
  { id: 12, name: "Andrés Vega", email: "andres@example.com", role: "editor", active: false, createdAt: "2024-07-20" },
  { id: 12, name: "Andrés Vega", email: "andres@example.com", role: "editor", active: false, createdAt: "2024-07-20" },
  { id: 12, name: "Andrés Vega", email: "andres@example.com", role: "editor", active: false, createdAt: "2024-07-20" },
  { id: 12, name: "Andrés Vega", email: "andres@example.com", role: "editor", active: false, createdAt: "2024-07-20" },
  { id: 12, name: "Andrés Vega", email: "andres@example.com", role: "editor", active: false, createdAt: "2024-07-20" },
  { id: 12, name: "Andrés Vega", email: "andres@example.com", role: "editor", active: false, createdAt: "2024-07-20" },
  { id: 12, name: "Andrés Vega", email: "andres@example.com", role: "editor", active: false, createdAt: "2024-07-20" },
  { id: 12, name: "Andrés Vega", email: "andres@example.com", role: "editor", active: false, createdAt: "2024-07-20" },
];

const ROLE_VARIANTS = { admin: "red", editor: "blue", viewer: "gray" } as const;
const ROLE_LABELS = { admin: "Admin", editor: "Editor", viewer: "Visor" } as const;

const ROL_OPTIONS = Object.entries(ROLE_LABELS).map(([v, l]) => ({ value: v, label: l }));
const ESTADO_OPTIONS = [
  { value: "true", label: "Activos" },
  { value: "false", label: "Inactivos" },
];

/** Obtiene las iniciales de un nombre completo */
const iniciales = (nombre: string) =>
  nombre.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();

// ─── Columnas ─────────────────────────────────────────────────────────────────

const columns: ColumnDef<User, any>[] = [
  {
    accessorKey: "name",
    size: 220,
    meta: { label: "Usuario" },
    header: ({ column }) => <SortableHeader column={column} title="Usuario" />,
    cell: ({ row }) => (
      <div className="flex items-center gap-2.5">
        <Avatar className="h-8 w-8">
          <AvatarFallback className="text-xs font-semibold bg-primary/10 text-primary">
            {iniciales(row.original.name)}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="font-medium text-sm leading-tight">{row.original.name}</span>
          <span className="text-xs text-muted-foreground">{row.original.email}</span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "email",
    // size: 0,
    meta: { label: "Correo" },
    header: "Correo",
    // Se oculta por defecto — ya se muestra en la columna "Usuario"
    // Para exportarla al CSV, el usuario puede hacerla visible desde el menú Columnas
    enableHiding: true,
    cell: ({ getValue }) => (
      <a href={`mailto:${getValue()}`} className="text-primary hover:underline text-sm">
        {getValue()}
      </a>
    ),
  },
  {
    accessorKey: "role",
    size: 300,
    meta: { label: "Rol" },
    header: "Rol",
    cell: ({ getValue }) => {
      const role = getValue() as User["role"];
      return <BadgeText text={ROLE_LABELS[role]} variant={ROLE_VARIANTS[role]} />;
    },
  },
  {
    accessorKey: "active",
    // size: 100,
    meta: { label: "Estado" },
    header: "Estado",
    cell: ({ getValue }) => (
      <BadgeBoolean value={getValue()} textTrue="Activo" textFalse="Inactivo" />
    ),
  },
  {
    accessorKey: "createdAt",
    // size: 120,
    meta: { label: "Registro" },
    header: ({ column }) => <SortableHeader column={column} title="Registro" />,
    cell: ({ getValue }) => (
      <span className="text-muted-foreground text-xs tabular-nums">{getValue()}</span>
    ),
  },
];

// ─── Página ───────────────────────────────────────────────────────────────────

/**
 * Página de administración de usuarios.
 *
 * URL de ejemplo con todos los filtros activos:
 * `/usuarios?page=1&pageSize=5&search=ana&rol=admin&activo=true`
 *
 * En producción, reemplaza el filtrado local con:
 * ```ts
 * const { data, isLoading } = useQuery({
 *   queryKey: ["users", queryParams],
 *   queryFn: () => api.getUsers(queryParams),
 * });
 * ```
 */
export default function UsersPage() {
  const { queryParams, updateQueryParams, resetQueryParams } = useDataTable({
    defaults: { pageSize: 30 },
    filterKeys: ["rol", "activo", "startDate", "endDate"],
  });
  const [rol, setRol] = useState<string>((queryParams.rol as string) ?? "");
  const [activo, setActivo] = useState<string>((queryParams.activo as string) ?? "");
  const [rangoFecha, setRangoFecha] = useState<{ start: string | null; end: string | null}>({
    start: (queryParams.startDate as string) ?? null,
    end: (queryParams.endDate as string) ?? null,
  });
  const [seleccionados, setSeleccionados] = useState<User[]>([]);

  // ── Filtrado y paginación client-side ─────────────────────────────────────
  const activoBool = parseBooleanParam(queryParams.activo as string | undefined);

  const filtrados = USERS.filter((u) => {
    const q = (queryParams.search ?? "").toLowerCase();
    const matchSearch = !q || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
    const matchRol = !queryParams.rol || u.role === queryParams.rol;
    const matchActivo = activoBool === undefined || u.active === activoBool;
    const matchFecha = (() => {
      if (!queryParams.startDate && !queryParams.endDate) return true;
      const d = new Date(u.createdAt);
      if (queryParams.startDate && d < new Date(queryParams.startDate as string)) return false;
      if (queryParams.endDate && d > new Date(queryParams.endDate as string)) return false;
      return true;
    })();
    return matchSearch && matchRol && matchActivo && matchFecha;
  });

  const totalPages = Math.max(1, Math.ceil(filtrados.length / queryParams.pageSize));
  const page = Math.min(queryParams.page, totalPages);
  const pageData = filtrados.slice((page - 1) * queryParams.pageSize, page * queryParams.pageSize);

  const exportCsv = useCsvExport<User>({ fileName: "usuarios.csv" });

  // Solo exporta Nombre y Correo (sin depender de columnas visibles)
  const handleExportCSV: Parameters<typeof DataTable<User>>[0]["onExportCSV"] = ({
    selectedRows,
    rowsForExport,
  }) => {
    const columns = [
      { label: "Nombre", accessor: (u: User) => u.name },
      { label: "Correo", accessor: (u: User) => u.email },
    ];

    exportCsv({
      visibleHeaders: columns.map((c) => c.label),
      getRowValues: (row: User) => columns.map((c) => String(c.accessor(row) ?? "")),
      selectedRows,
      rowsForExport,
    });
  };

  // ──────────────────────────────────────────────────────────────────────────

  const activos = USERS.filter((u) => u.active).length;
  const inactivos = USERS.length - activos;
  const admins = USERS.filter((u) => u.role === "admin").length;

  const filtros: FilterType[] = [
    {
      type: "select", key: "rol", label: "Rol",
      value: rol, options: ROL_OPTIONS, onChange: setRol,
    },
    {
      type: "select", key: "activo", label: "Estado",
      value: activo, options: ESTADO_OPTIONS, onChange: setActivo,
    },
    {
      type: "dateRange", key: "fecha", label: "Registro",
      value: rangoFecha,
      onChange: setRangoFecha,
    },
  ];

  const handleResetAll = () => {
    setRol("");
    setActivo("");
    setRangoFecha({ start: null, end: null });
    setSeleccionados([]);
    resetQueryParams();
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

        {/* Encabezado */}
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Gestión de usuarios
            </h1>
            <p className="text-muted-foreground mt-1">
              Administra roles, permisos y estado de los usuarios del sistema.
            </p>
          </div>
          <Button className="gap-2">
            <Users className="h-4 w-4" />
            Nuevo usuario
          </Button>
        </div>

        {/* Métricas */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          <StatCard icon={<UserCheck className="h-4 w-4 text-emerald-600" />} label="Activos" value={activos} bg="bg-emerald-50 dark:bg-emerald-950/30" />
          <StatCard icon={<UserX className="h-4 w-4 text-red-500" />} label="Inactivos" value={inactivos} bg="bg-red-50 dark:bg-red-950/30" />
          <StatCard icon={<ShieldCheck className="h-4 w-4 text-violet-600" />} label="Admins" value={admins} bg="bg-violet-50 dark:bg-violet-950/30" />
        </div>

        {/* Acciones de selección */}
        {seleccionados.length > 0 && (
          <div className="flex items-center gap-3 px-4 py-3 rounded-lg border border-primary/20 bg-primary/5">
            <span className="text-sm font-medium text-primary">
              {seleccionados.length} usuario{seleccionados.length !== 1 && "s"} seleccionado{seleccionados.length !== 1 && "s"}
            </span>
            <div className="flex gap-2 ml-auto">
              <Button size="sm" variant="outline" className="gap-1.5 h-8">
                <Mail className="h-3.5 w-3.5" />
                Enviar correo
              </Button>
              <Button size="sm" variant="destructive" className="gap-1.5 h-8">
                <Trash2 className="h-3.5 w-3.5" />
                Eliminar
              </Button>
            </div>
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
                    const nextRol = (draft.find((f) => f.key === "rol")?.value as string) ?? "";
                    const nextActivo = (draft.find((f) => f.key === "activo")?.value as string) ?? "";
                    const nextFecha = (draft.find((f) => f.key === "fecha")?.value as { start: string | null; end: string | null }) ?? { start: null, end: null };
                    setRol(nextRol);
                    setActivo(nextActivo);
                    setRangoFecha(nextFecha);
                    updateQueryParams({
                      rol: nextRol || undefined,
                      activo: nextActivo || undefined,
                      startDate: nextFecha.start || undefined,
                      endDate: nextFecha.end || undefined,
                      page: 1,
                    });
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

// ─── Tarjeta de estadística ───────────────────────────────────────────────────

function StatCard({ icon, label, value, bg }: {
  icon: React.ReactNode;
  label: string;
  value: number;
  bg: string;
}) {
  return (
    <Card>
      <CardContent className="pt-5 pb-4">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${bg}`}>{icon}</div>
          <div>
            <p className="text-xs text-muted-foreground font-medium">{label}</p>
            <p className="text-xl font-bold text-foreground">{value}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
