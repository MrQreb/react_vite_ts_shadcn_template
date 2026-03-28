# Estructura de carpetas (una sola app)

```plaintext
root
├─ public/
│
├─ src/
│  ├─ app/
│  │  ├─ App.tsx
│  │  ├─ providers/              # Providers globales: Query, Theme, Auth
│  │  │  ├─ AuthProvider.tsx
│  │  │  ├─ QueryProvider.tsx
│  │  │  └─ ThemeProvider.tsx
│  │  ├─ router/                 # TanStack Router
│  │  │  ├─ __root.tsx
│  │  │  ├─ routeTree.gen.ts
│  │  │  ├─ routeTree.ts
│  │  │  └─ router.ts
│  │  └─ layouts/
│  │     └─ NotFound.tsx
│  │
│  ├─ assets/                    # Está libre para estáticos locales
│  │
│  ├─ components/
│  │  ├─ custom/                 # Componentes con lógica
│  │  │  ├─ DataTable/
│  │  │  │  ├─ DataTable.tsx
│  │  │  │  ├─ DataTableColumns.tsx
│  │  │  │  ├─ DataTablePagination.tsx
│  │  │  │  ├─ DataTableToolbar.tsx
│  │  │  │  ├─ filterTable-helper.ts
│  │  │  │  └─ hooks/
│  │  │  │     ├─ useCsvExport.ts
│  │  │  │     ├─ useDataTable.ts
│  │  │  │     └─ useRowSelectionExport.ts
│  │  │  └─ FilterTable/
│  │  │     ├─ FilterTable.tsx
│  │  │     ├─ helpers.ts
│  │  │     ├─ types.ts
│  │  │     └─ components/
│  │  │        ├─ DateFilter.tsx
│  │  │        ├─ DateRangeFilter.tsx
│  │  │        ├─ FilterBadge.tsx
│  │  │        ├─ FilterField.tsx
│  │  │        └─ SelectFilter.tsx
│  │  └─ ui/                     # UI puros (shadcn)
│  │     ├─ avatar.tsx
│  │     ├─ badge.tsx
│  │     ├─ button.tsx
│  │     ├─ calendar.tsx
│  │     ├─ card.tsx
│  │     ├─ carousel.tsx
│  │     ├─ checkbox.tsx
│  │     ├─ combobox.tsx
│  │     ├─ command.tsx
│  │     ├─ dialog.tsx
│  │     ├─ dropdown-menu.tsx
│  │     ├─ input-group.tsx
│  │     ├─ input.tsx
│  │     ├─ label.tsx
│  │     ├─ popover.tsx
│  │     ├─ select.tsx
│  │     ├─ separator.tsx
│  │     ├─ skeleton.tsx
│  │     ├─ table.tsx
│  │     └─ textarea.tsx
│  │
│  ├─ examples/                  # Páginas de ejemplo
│  │  ├─ ProductsPage.tsx
│  │  └─ UsersPage.tsx
│  │
│  ├─ features/
│  │  └─ auth/
│  │     ├─ routes/
│  │     │  └─ routes.ts
│  │     └─ login/
│  │        ├─ components/
│  │        │  └─ UserAuthForm.tsx
│  │        ├─ hooks/
│  │        │  └─ api/
│  │        │     └─ useLogin.tsx
│  │        ├─ pages/
│  │        │  └─ LoginPage.tsx
│  │        └─ schemas/
│  │           └─ loginSchema.ts
│  │
│  │  ├─ usuarios/                 # Feature completa de usuarios
│  │  │  ├─ routes/
│  │  │  │  └─ routes.ts           # Rutas TanStack Router del dominio
│  │  │  ├─ pages/
│  │  │  │  └─ UsersPage.tsx       # Página principal del listado
│  │  │  ├─ components/
│  │  │  │  ├─ UserTable.tsx       # Tabla (puede envolver DataTable)
│  │  │  │  ├─ UserForm.tsx        # Form crear/editar
│  │  │  │  └─ UserFilters.tsx     # Filtros para la tabla
│  │  │  ├─ dtos/
│  │  │  │  ├─ create-usuario.dto.ts
│  │  │  │  ├─ update-usuario.dto.ts
│  │  │  │  └─ usuario.response.dto.ts
│  │  │  ├─ services/
│  │  │  │  └─ usuarios.service.ts # Llama a apiClient
│  │  │  ├─ hooks/
│  │  │  │  ├─ queries/
│  │  │  │  │  ├─ useUsuarios.ts   # Lista
│  │  │  │  │  └─ useUsuario.ts    # Detalle
│  │  │  │  └─ mutations/
│  │  │  │     ├─ useCreateUsuario.ts
│  │  │  │     ├─ useUpdateUsuario.ts
│  │  │  │     └─ useDeleteUsuario.ts
│  │  │  ├─ schemas/
│  │  │  │  └─ usuarioSchema.ts    # Validación con Zod
│  │  │  ├─ types/
│  │  │  │  └─ usuario.ts          # Tipos internos (opcional)
│  │  │  └─ mappers/               # Transformaciones API ↔ UI (opcional)
│  │
│  ├─ lib/
│  │  └─ utils.ts                # utilidades varias
│  │
│  ├─ styles/
│  │  └─ globals.css
│  │
│  ├─ index.css
│  └─ main.tsx
│
├─ documentation/                # Docs del proyecto
│  └─ estructura-directorio.md
│
├─ package.json
└─ vite.config.ts
```
