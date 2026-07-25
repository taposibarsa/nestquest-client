"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SlidersHorizontal, X } from "lucide-react";
import type { PropertySort, PropertyType } from "@/types";
import { useDebounce } from "@/hooks/useDebounce";
import { useProperties } from "@/hooks/useProperties";
import type { PropertyQuery } from "@/lib/api";
import {
  FilterPanel,
  type FilterDraft,
  PROPERTY_TYPE_OPTIONS,
} from "@/components/properties/FilterPanel";
import { SearchBar } from "@/components/properties/SearchBar";
import { SortDropdown } from "@/components/properties/SortDropdown";
import { PropertyGrid } from "@/components/properties/PropertyGrid";
import { PaginationControls } from "@/components/properties/PaginationControls";
import { Button } from "@/components/ui/Button";

const SORTS: PropertySort[] = [
  "newest",
  "price_asc",
  "price_desc",
  "rating",
  "reviews",
];

const VALID_TYPES = new Set(
  PROPERTY_TYPE_OPTIONS.map((o) => o.value)
);

function parseTypes(raw: string | null): PropertyType[] {
  if (!raw) return [];
  return raw
    .split(",")
    .map((t) => t.trim())
    .filter((t): t is PropertyType => VALID_TYPES.has(t as PropertyType));
}

function draftFromParams(sp: URLSearchParams): FilterDraft {
  const priceType = sp.get("priceType");
  return {
    types: parseTypes(sp.get("type")),
    priceType:
      priceType === "sale" || priceType === "rent" ? priceType : "",
    minPrice: sp.get("minPrice") ?? "",
    maxPrice: sp.get("maxPrice") ?? "",
    bedrooms: sp.get("bedrooms") ?? "",
    city: sp.get("city") ?? "",
  };
}

function emptyDraft(): FilterDraft {
  return {
    types: [],
    priceType: "",
    minPrice: "",
    maxPrice: "",
    bedrooms: "",
    city: "",
  };
}

export function PropertiesExplore() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const gridRef = useRef<HTMLDivElement>(null);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const searchFromUrl = searchParams.get("search") ?? "";
  const [searchInput, setSearchInput] = useState(searchFromUrl);
  const debouncedSearch = useDebounce(searchInput, 300);

  const [draft, setDraft] = useState<FilterDraft>(() =>
    draftFromParams(new URLSearchParams(searchParams.toString()))
  );

  // Sync draft + search from URL on back/forward — but don't wipe mid-typing search
  useEffect(() => {
    setDraft(draftFromParams(new URLSearchParams(searchParams.toString())));
    const urlSearch = searchParams.get("search") ?? "";
    setSearchInput((prev) => {
      if (prev !== debouncedSearch) return prev;
      return urlSearch;
    });
  }, [searchParams, debouncedSearch]);

  const sortParam = searchParams.get("sort");
  const sort: PropertySort = SORTS.includes(sortParam as PropertySort)
    ? (sortParam as PropertySort)
    : "newest";
  const page = Math.max(1, Number(searchParams.get("page")) || 1);

  const replaceParams = useCallback(
    (mutate: (params: URLSearchParams) => void) => {
      const params = new URLSearchParams(searchParams.toString());
      mutate(params);
      const qs = params.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [pathname, router, searchParams]
  );

  // Debounced search → URL (compare trimmed to avoid rewrite loops)
  useEffect(() => {
    const current = searchParams.get("search") ?? "";
    const next = debouncedSearch.trim();
    if (next === current) return;
    replaceParams((params) => {
      if (next) params.set("search", next);
      else params.delete("search");
      params.delete("page");
    });
  }, [debouncedSearch, replaceParams, searchParams]);

  const query = useMemo((): PropertyQuery => {
    const types = parseTypes(searchParams.get("type"));
    const priceTypeRaw = searchParams.get("priceType");
    const priceType: PropertyQuery["priceType"] =
      priceTypeRaw === "sale" || priceTypeRaw === "rent"
        ? priceTypeRaw
        : undefined;
    return {
      page,
      limit: 8,
      sort,
      search: searchParams.get("search") ?? undefined,
      type: types.length ? types.join(",") : undefined,
      city: searchParams.get("city") || undefined,
      priceType,
      minPrice: searchParams.get("minPrice") || undefined,
      maxPrice: searchParams.get("maxPrice") || undefined,
      bedrooms: searchParams.get("bedrooms") || undefined,
    };
  }, [page, searchParams, sort]);

  const { properties, total, totalPages, isLoading, isValidating, error } =
    useProperties(query);

  // Spec: skeletons on every new fetch (not only first load)
  const showSkeleton = isLoading || isValidating;

  // Clamp out-of-range page (e.g. ?page=99) once totals are known
  useEffect(() => {
    if (isLoading || isValidating) return;
    if (totalPages === 0 && page > 1) {
      replaceParams((params) => {
        params.delete("page");
      });
      return;
    }
    if (totalPages > 0 && page > totalPages) {
      replaceParams((params) => {
        if (totalPages <= 1) params.delete("page");
        else params.set("page", String(totalPages));
      });
    }
  }, [isLoading, isValidating, page, replaceParams, totalPages]);

  const applyDraftToUrl = (next: FilterDraft) => {
    replaceParams((params) => {
      if (next.types.length) params.set("type", next.types.join(","));
      else params.delete("type");

      if (next.priceType) params.set("priceType", next.priceType);
      else params.delete("priceType");

      if (next.minPrice.trim()) params.set("minPrice", next.minPrice.trim());
      else params.delete("minPrice");

      if (next.maxPrice.trim()) params.set("maxPrice", next.maxPrice.trim());
      else params.delete("maxPrice");

      if (next.bedrooms) params.set("bedrooms", next.bedrooms);
      else params.delete("bedrooms");

      if (next.city) params.set("city", next.city);
      else params.delete("city");

      params.delete("page");
    });
  };

  const clearFilters = () => {
    setDraft(emptyDraft());
    setSearchInput("");
    replaceParams((params) => {
      [
        "type",
        "priceType",
        "minPrice",
        "maxPrice",
        "bedrooms",
        "city",
        "search",
        "page",
      ].forEach((k) => params.delete(k));
    });
    setMobileFiltersOpen(false);
  };

  const handlePageChange = (nextPage: number) => {
    replaceParams((params) => {
      if (nextPage <= 1) params.delete("page");
      else params.set("page", String(nextPage));
    });
    gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="font-display text-3xl font-bold text-navy sm:text-4xl">
          Explore Properties
        </h1>
        <p className="mt-1 text-cool-gray">
          Search and filter listings across Bangladesh.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        <div className="hidden lg:col-span-3 lg:block">
          <div className="sticky top-24">
            <FilterPanel
              draft={draft}
              onChange={setDraft}
              onApply={() => applyDraftToUrl(draft)}
              onClear={clearFilters}
            />
          </div>
        </div>

        <div className="lg:col-span-9">
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="min-w-0 flex-1">
              <SearchBar value={searchInput} onChange={setSearchInput} />
            </div>
            <div className="flex items-center justify-between gap-3">
              <Button
                variant="secondary"
                className="lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filters
              </Button>
              <SortDropdown
                value={sort}
                onChange={(value) => {
                  replaceParams((params) => {
                    if (value === "newest") params.delete("sort");
                    else params.set("sort", value);
                    params.delete("page");
                  });
                }}
              />
            </div>
          </div>

          {error ? (
            <p className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error.message || "Failed to load properties."}
            </p>
          ) : null}

          <PropertyGrid
            properties={properties}
            page={page}
            limit={8}
            total={total}
            isLoading={showSkeleton}
            onClearFilters={clearFilters}
            gridRef={gridRef}
          />

          <div className="mt-8">
            <PaginationControls
              page={Math.min(page, Math.max(totalPages, 1))}
              totalPages={totalPages}
              onChange={handlePageChange}
            />
          </div>
        </div>
      </div>

      {mobileFiltersOpen ? (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-navy/40"
            aria-label="Close filters"
            onClick={() => setMobileFiltersOpen(false)}
          />
          <div className="absolute inset-y-0 right-0 flex w-full max-w-sm flex-col bg-off-white shadow-xl">
            <div className="flex items-center justify-between border-b border-navy/10 px-4 py-3">
              <h2 className="font-display text-lg font-semibold text-navy">
                Filters
              </h2>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(false)}
                className="rounded-lg p-2 text-navy hover:bg-navy/5"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              <FilterPanel
                draft={draft}
                onChange={setDraft}
                showHeader={false}
                onApply={() => {
                  applyDraftToUrl(draft);
                  setMobileFiltersOpen(false);
                }}
                onClear={clearFilters}
              />
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}
