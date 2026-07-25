"use client";

import type { RefObject } from "react";
import type { Property } from "@/types";
import { PropertyCard } from "@/components/properties/PropertyCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { SkeletonCard } from "@/components/ui/SkeletonCard";
import { Button } from "@/components/ui/Button";

export function PropertyGrid({
  properties,
  page,
  limit,
  total,
  isLoading,
  onClearFilters,
  gridRef,
}: {
  properties: Property[];
  page: number;
  limit: number;
  total: number;
  /** True on initial load and on every subsequent filter/sort/page fetch. */
  isLoading: boolean;
  onClearFilters?: () => void;
  gridRef?: RefObject<HTMLDivElement | null>;
}) {
  const from = total === 0 ? 0 : (page - 1) * limit + 1;
  const to = Math.min(page * limit, total);

  return (
    <div ref={gridRef}>
      <p className="mb-4 text-sm text-cool-gray">
        {isLoading
          ? "Loading properties…"
          : total === 0
            ? "No properties to show"
            : `Showing ${from}–${to} of ${total} properties`}
      </p>

      {isLoading ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : properties.length === 0 ? (
        <EmptyState
          title="No properties found"
          description="No properties found. Try adjusting your filters."
          action={
            onClearFilters ? (
              <Button variant="secondary" onClick={onClearFilters}>
                Clear Filters
              </Button>
            ) : undefined
          }
        />
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {properties.map((property) => (
            <PropertyCard key={property._id} property={property} />
          ))}
        </div>
      )}
    </div>
  );
}
