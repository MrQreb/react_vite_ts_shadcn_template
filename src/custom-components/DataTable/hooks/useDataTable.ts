import { useNavigate, useSearch } from "@tanstack/react-router";
import { useCallback } from "react";
import type { QueryParams } from "../DataTable";

/**
 * Hook for managing table query params synced with TanStack Router URL search params.
 *
 * Usage:
 *   const { queryParams, updateQueryParams } = useDataTable({ route });
 *
 * This keeps page, pageSize, search, and any custom filters in the URL automatically.
 */
export function useDataTable(defaults: Partial<QueryParams> = {}) {
  const navigate = useNavigate();
  const search = useSearch({ strict: false }) as Record<string, any>;

  const queryParams: QueryParams = {
    page: Number(search.page) || defaults.page || 1,
    pageSize: Number(search.pageSize) || defaults.pageSize || 10,
    search: search.search ?? defaults.search ?? "",
    ...defaults,
    ...Object.fromEntries(
      Object.entries(search).filter(([k]) => !["page", "pageSize", "search"].includes(k))
    ),
  };

  const updateQueryParams = useCallback(
    (updates: Partial<QueryParams>) => {
      navigate({
        search: (prev: Record<string, any>) => {
          const next = { ...prev, ...updates };
          // Remove empty values to keep URL clean
          Object.keys(next).forEach((k) => {
            if (next[k] === "" || next[k] === undefined || next[k] === null) {
              delete next[k];
            }
          });
          return next;
        },
      });
    },
    [navigate]
  );

  const resetQueryParams = useCallback(() => {
    navigate({
      search: {
        page: 1,
        pageSize: defaults.pageSize ?? 10,
      },
    });
  }, [navigate, defaults.pageSize]);

  return { queryParams, updateQueryParams, resetQueryParams };
}
