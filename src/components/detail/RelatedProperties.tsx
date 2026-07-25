"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Property } from "@/types";
import { getProperties } from "@/lib/api";
import { PropertyCard } from "@/components/properties/PropertyCard";
import { SkeletonCard } from "@/components/ui/SkeletonCard";

async function fetchRelated(property: Property): Promise<Property[]> {
  const exclude = new Set<string>([property._id]);
  const picked: Property[] = [];

  const byType = await getProperties({
    type: property.propertyType,
    limit: 8,
    sort: "newest",
  });
  for (const p of byType.data) {
    if (exclude.has(p._id)) continue;
    picked.push(p);
    exclude.add(p._id);
    if (picked.length >= 4) return picked;
  }

  if (picked.length < 4) {
    const byCity = await getProperties({
      city: property.location.city,
      limit: 8,
      sort: "newest",
    });
    for (const p of byCity.data) {
      if (exclude.has(p._id)) continue;
      picked.push(p);
      exclude.add(p._id);
      if (picked.length >= 4) break;
    }
  }

  return picked;
}

export function RelatedProperties({ property }: { property: Property }) {
  const [items, setItems] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    void (async () => {
      try {
        const list = await fetchRelated(property);
        if (!cancelled) setItems(list);
      } catch {
        if (!cancelled) setItems([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [property]);

  if (!loading && items.length === 0) return null;

  return (
    <section className="space-y-5">
      <h2 className="font-display text-2xl font-bold text-navy">
        Similar Properties You Might Like
      </h2>

      {loading ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {items.map((p) => (
            <PropertyCard key={p._id} property={p} />
          ))}
        </div>
      )}

      <div className="flex justify-center pt-2">
        <Link
          href="/properties"
          className="inline-flex items-center justify-center rounded-lg border border-navy/20 bg-white px-4 py-2 text-sm font-semibold text-navy transition hover:bg-navy/5"
        >
          View All Properties
        </Link>
      </div>
    </section>
  );
}
