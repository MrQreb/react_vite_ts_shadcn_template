import { useNavigate, useSearch } from "@tanstack/react-router";
import { useCallback, useMemo } from "react";
import type { QueryParams } from "../DataTable";

// ─── Types ───────────────────────────────────────────────────────────────────

interface UseDataTableOptions {
  /**
   * Valores por defecto para los query params.
   * Se usan cuando la URL no tiene el parámetro definido.
   */
  defaults?: Partial<QueryParams>;
  /**
   * Lista de claves de filtros que deseas limpiar cuando se resetea la tabla.
   * Ejemplo: `["rol", "activo"]`
   */
  filterKeys?: string[];
}

interface UseDataTableReturn {
  /** Parámetros actuales leídos de la URL */
  queryParams: QueryParams;
  /**
   * Actualiza uno o más parámetros en la URL.
   * Los valores vacíos (`""`, `undefined`, `null`) se eliminan de la URL.
   *
   * @example
   * updateQueryParams({ page: 2, search: "laptop" })
   * // → URL: ?page=2&search=laptop
   */
  updateQueryParams: (updates: Partial<QueryParams>) => void;
  /**
   * Limpia todos los filtros y regresa a la primera página.
   * Conserva el `pageSize` por defecto y elimina los filtros definidos en `filterKeys`.
   */
  resetQueryParams: () => void;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

/**
 * Hook para sincronizar el estado de la tabla con los query params de la URL
 * usando TanStack Router.
 *
 * Los cambios en la tabla (página, búsqueda, filtros) se reflejan en la URL
 * automáticamente, lo que permite compartir links y usar el botón "atrás"
 * del navegador.
 *
 * **Integración con el servidor:**
 * Los `queryParams` resultantes deben pasarse a tu función de fetching
 * para construir la petición al servidor:
 *
 * @example
 * ```tsx
 * // En tu componente de página:
 * const { queryParams, updateQueryParams, resetQueryParams } = useDataTable({
 *   defaults: { pageSize: 25 },
 * });
 *
 * // Petición al servidor con los query params de la URL:
 * const { data } = useQuery({
 *   queryKey: ["users", queryParams],
 *   queryFn: () => api.getUsers(queryParams),
 *   // → GET /api/users?page=1&pageSize=25&search=ana&rol=admin
 * });
 *
 * return (
 *   <DataTable
 *     data={data?.items ?? []}
 *     totalPages={data?.totalPages ?? 0}
 *     queryParams={queryParams}
 *     onQueryChange={updateQueryParams}
 *   />
 * );
 * ```
 *
 * @param options - Opciones del hook (valores por defecto)
 */
export function useDataTable({
  defaults = {},
  filterKeys = [],
}: UseDataTableOptions = {}): UseDataTableReturn {
  const navigate = useNavigate();
  const search = useSearch({ strict: false }) as Record<string, any>;

  /**
   * Combina los valores de la URL con los defaults.
   * La URL siempre tiene prioridad sobre los defaults.
   */
  const queryParams: QueryParams = useMemo(() => {
    // Extraer filtros adicionales (cualquier param que no sea page/pageSize/search)
    const extraParams = Object.fromEntries(
      Object.entries(search).filter(
        ([k]) => !["page", "pageSize", "search"].includes(k)
      )
    );

    return {
      page: Number(search.page) || defaults.page || 1,
      pageSize: Number(search.pageSize) || defaults.pageSize || 50,
      search: search.search ?? defaults.search ?? "",
      ...extraParams,
    };
  }, [search, defaults]);

  /**
   * Actualiza la URL con los nuevos parámetros.
   * Elimina valores vacíos para mantener la URL limpia.
   */
  const updateQueryParams = useCallback(
    (updates: Partial<QueryParams>) => {
      navigate({
        //@ts-ignore
        search: (prev: Record<string, any>) => {
          const next = { ...prev, ...updates };

          // Eliminar valores vacíos de la URL
          for (const key of Object.keys(next)) {
            const val = next[key];
            if (val === "" || val === undefined || val === null) {
              delete next[key];
            }
          }

          return next;
        },
      });
    },
    [navigate]
  );

  /**
   * Resetea a los valores por defecto (página 1, sin búsqueda ni filtros).
   */
  const resetQueryParams = useCallback(() => {
    navigate({
      //@ts-ignore
      search: () => {
        const next: Record<string, any> = {
          page: 1,
          pageSize: defaults.pageSize ?? 50,
        };

        // Elimina filtros configurados en `filterKeys` y limpia búsqueda global
        filterKeys.forEach((key) => delete next[key]);
        return next;
      },
    });
  }, [navigate, defaults.pageSize, filterKeys]);

  return { queryParams, updateQueryParams, resetQueryParams };
}
