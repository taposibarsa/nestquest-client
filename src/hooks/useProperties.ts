"use client";

import useSWR from "swr";
import { getProperties, type PropertyQuery } from "@/lib/api";
import type { PaginatedProperties } from "@/types";

function queryKey(params: PropertyQuery): string {
  const entries = Object.entries(params)
    .filter(([, v]) => v !== undefined && v !== null && v !== "")
    .map(([k, v]) => [k, Array.isArray(v) ? v.join(",") : String(v)] as [string, string])
    .sort(([a], [b]) => a.localeCompare(b));
  return new URLSearchParams(entries).toString();
}

export function useProperties(params: PropertyQuery = {}) {
  const key = queryKey({ page: 1, limit: 8, sort: "newest", ...params });

  const { data, error, isLoading, isValidating, mutate } =
    useSWR<PaginatedProperties>(
      ["properties", key],
      () => getProperties(params),
      {
        // Avoid skeleton flash on tab focus; still revalidate when the query key changes.
        revalidateOnFocus: false,
        keepPreviousData: false,
      }
    );

  return {
    data,
    properties: data?.data ?? [],
    page: data?.page ?? params.page ?? 1,
    limit: data?.limit ?? params.limit ?? 8,
    total: data?.total ?? 0,
    totalPages: data?.totalPages ?? 0,
    isLoading,
    isValidating,
    error: error instanceof Error ? error : null,
    mutate,
  };
}
