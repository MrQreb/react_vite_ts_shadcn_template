// shared/services/api.ts

/**
 * Función base para realizar peticiones HTTP a la API.
 * 
 * Centraliza:
 * - Configuración de headers
 * - Manejo de token de autenticación
 * - Manejo de errores
 * - Parseo de respuesta
 *
 * @template T Tipo de dato esperado en la respuesta
 * 
 * @param endpoint Ruta del endpoint (ej: "/Usuario/buscar")
 * @param options Configuración adicional de la petición (method, body, headers, etc.)
 * 
 * @returns {Promise<T>} Promesa con la respuesta tipada del backend
 * 
 * @throws {Error} Lanza un error si la respuesta HTTP no es exitosa
 * 
 * @example
 * ```ts
 * const usuarios = await api<UsuarioResponseDto[]>("/Usuario/buscar");
 * ```
 * 
 * @example
 * ```ts
 * await api("/Usuario/crear", {
 *   method: "POST",
 *   body: JSON.stringify(data),
 * });
 * ```
 */
export const api = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {

  const token = localStorage.getItem("token");

  const res = await fetch(`${endpoint}`, {
    ...options,
    headers: {
      ...(options.body instanceof FormData
        ? {}
        : { "Content-Type": "application/json" }),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });

  // Intentar parsear JSON (evita crash si no hay body)
  const data = await res.json().catch(() => null);

  // Manejo de errores HTTP
  if (!res.ok) {
    throw new Error(
      data?.message ||
      data?.error ||
      "Error en la petición"
    );
  }

  return data;
};