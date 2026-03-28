
### Ejemplo de módulo de peticiones (una sola app)

## Resumen de comunicación con APIs
```plaintext
UI (React)
   ↓
Hooks (React Query)
   ↓
Service (API calls)
   ↓
apiClient (fetch/axios centralizado)
```

```plaintext
src/features/usuarios/
├─ services/
│  └─ usuarios.service.ts
├─ dtos/
│  ├─ create-usuario.dto.ts
│  └─ usuario.response.dto.ts
├─ hooks/
│  ├─ queries/useUsuarios.ts
│  └─ mutations/useCreateUsuario.ts
└─ components/ (opcional)
```

#### Dtos
```typescript
// src/features/usuarios/dtos/usuario.response.dto.ts

export interface UsuarioResponseDto {
  id: number;
  nombre: string;
  correo: string;
}
```

```typescript
// src/features/usuarios/dtos/create-usuario.dto.ts

export interface CreateUsuarioDto {
  nombre: string;
  correo: string;
  password: string;
}
```

### Service
```typescript
// src/features/usuarios/services/usuarios.service.ts

import { apiClient } from "@/lib/api-client"; // wrapper global de fetch/axios
import { CreateUsuarioDto } from "../dtos/create-usuario.dto";
import { UsuarioResponseDto } from "../dtos/usuario.response.dto";

export class UsuarioService {
  async getAll(): Promise<UsuarioResponseDto[]> {
    return apiClient.get<UsuarioResponseDto[]>("/Usuario/buscar");
  }

  async getById(id: number): Promise<UsuarioResponseDto> {
    return apiClient.get<UsuarioResponseDto>(`/Usuario/obtener-por-id/${id}`);
  }

  async create(data: CreateUsuarioDto): Promise<UsuarioResponseDto> {
    return apiClient.post<UsuarioResponseDto>("/Usuario/crear", data);
  }

  async delete(id: number): Promise<void> {
    return apiClient.delete(`/Usuario/eliminar/${id}`);
  }
}
```

```typescript
// src/features/usuarios/hooks/mutations/useCreateUsuario.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UsuarioService } from "../../services/usuarios.service";
import { CreateUsuarioDto } from "../../dtos/create-usuario.dto";

const service = new UsuarioService();

export const useCreateUsuario = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateUsuarioDto) => service.create(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["usuarios"] }),
  });
};
```

```typescript
// src/features/usuarios/hooks/queries/useUsuarios.ts

import { useQuery } from "@tanstack/react-query";
import { UsuarioService } from "../../services/usuarios.service";

const service = new UsuarioService();

export const useUsuarios = () =>
  useQuery({
    queryKey: ["usuarios"],
    queryFn: () => service.getAll(),
  });
```

### UI (ejemplo mínimo)
```typescript
// src/examples/UsersPage.tsx

import { useUsuarios } from "@/features/usuarios/hooks/queries/useUsuarios";
import { useCreateUsuario } from "@/features/usuarios/hooks/mutations/useCreateUsuario";
import { useState } from "react";

export default function UsersPage() {
  const { data, isLoading, error } = useUsuarios();
  const createUsuario = useCreateUsuario();

  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");

  if (isLoading) return <p>Cargando...</p>;
  if (error) return <p>Error al cargar usuarios</p>;

  const handleCreate = () => {
    createUsuario.mutate({ nombre, correo, password: "123456" });
  };

  return (
    <div>
      <h1>Usuarios</h1>

      <ul>
        {data?.map((u) => (
          <li key={u.id}>
            {u.nombre} - {u.correo}
          </li>
        ))}
      </ul>

      <h2>Crear usuario</h2>
      <input
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      <input
        placeholder="Correo"
        value={correo}
        onChange={(e) => setCorreo(e.target.value)}
      />

      <button onClick={handleCreate}>Crear usuario</button>
    </div>
  );
}
```



