"use client";

import type { PropertyType } from "@/types";
import { Button } from "@/components/ui/Button";

export type FilterDraft = {
  types: PropertyType[];
  priceType: "" | "sale" | "rent";
  minPrice: string;
  maxPrice: string;
  bedrooms: string;
  city: string;
};

export const PROPERTY_TYPE_OPTIONS: { value: PropertyType; label: string }[] = [
  { value: "apartment", label: "Apartment" },
  { value: "house", label: "House" },
  { value: "villa", label: "Villa" },
  { value: "office", label: "Office" },
  { value: "studio", label: "Studio" },
  { value: "land", label: "Land" },
];

export const CITY_OPTIONS = [
  "Dhaka",
  "Chittagong",
  "Sylhet",
  "Rajshahi",
  "Khulna",
] as const;

export function FilterPanel({
  draft,
  onChange,
  onApply,
  onClear,
  className = "",
  showHeader = true,
}: {
  draft: FilterDraft;
  onChange: (next: FilterDraft) => void;
  onApply: () => void;
  onClear: () => void;
  className?: string;
  /** Set false when the parent already renders a Filters title (mobile sheet). */
  showHeader?: boolean;
}) {
  const toggleType = (type: PropertyType) => {
    const types = draft.types.includes(type)
      ? draft.types.filter((t) => t !== type)
      : [...draft.types, type];
    onChange({ ...draft, types });
  };

  return (
    <aside
      className={`rounded-xl border border-navy/10 bg-white p-5 shadow-sm ${className}`}
    >
      {showHeader ? (
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold text-navy">
            Filters
          </h2>
          <button
            type="button"
            onClick={onClear}
            className="text-sm font-medium text-sage hover:underline"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="mb-4 flex justify-end">
          <button
            type="button"
            onClick={onClear}
            className="text-sm font-medium text-sage hover:underline"
          >
            Clear Filters
          </button>
        </div>
      )}

      <div className="space-y-6">
        <fieldset>
          <legend className="mb-2 text-sm font-semibold text-charcoal">
            Property Type
          </legend>
          <div className="space-y-2">
            {PROPERTY_TYPE_OPTIONS.map((opt) => (
              <label
                key={opt.value}
                className="flex cursor-pointer items-center gap-2 text-sm text-charcoal"
              >
                <input
                  type="checkbox"
                  checked={draft.types.includes(opt.value)}
                  onChange={() => toggleType(opt.value)}
                  className="rounded border-navy/30 text-amber focus:ring-amber"
                />
                {opt.label}
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="mb-2 text-sm font-semibold text-charcoal">
            Listing Type
          </legend>
          <div className="space-y-2">
            {(
              [
                { value: "", label: "All" },
                { value: "sale", label: "For Sale" },
                { value: "rent", label: "For Rent" },
              ] as const
            ).map((opt) => (
              <label
                key={opt.label}
                className="flex cursor-pointer items-center gap-2 text-sm text-charcoal"
              >
                <input
                  type="radio"
                  name="priceType"
                  checked={draft.priceType === opt.value}
                  onChange={() =>
                    onChange({ ...draft, priceType: opt.value })
                  }
                  className="border-navy/30 text-amber focus:ring-amber"
                />
                {opt.label}
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="mb-2 text-sm font-semibold text-charcoal">
            Price Range (BDT)
          </legend>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              min={0}
              placeholder="Min"
              value={draft.minPrice}
              onChange={(e) =>
                onChange({ ...draft, minPrice: e.target.value })
              }
              className="w-full rounded-lg border border-navy/15 px-3 py-2 text-sm focus:border-amber focus:outline-none focus:ring-2 focus:ring-amber/30"
            />
            <input
              type="number"
              min={0}
              placeholder="Max"
              value={draft.maxPrice}
              onChange={(e) =>
                onChange({ ...draft, maxPrice: e.target.value })
              }
              className="w-full rounded-lg border border-navy/15 px-3 py-2 text-sm focus:border-amber focus:outline-none focus:ring-2 focus:ring-amber/30"
            />
          </div>
        </fieldset>

        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-charcoal">
            Bedrooms
          </span>
          <select
            value={draft.bedrooms}
            onChange={(e) => onChange({ ...draft, bedrooms: e.target.value })}
            className="w-full rounded-lg border border-navy/15 bg-white px-3 py-2 text-sm focus:border-amber focus:outline-none focus:ring-2 focus:ring-amber/30"
          >
            <option value="">Any</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5+</option>
          </select>
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-charcoal">
            City
          </span>
          <select
            value={draft.city}
            onChange={(e) => onChange({ ...draft, city: e.target.value })}
            className="w-full rounded-lg border border-navy/15 bg-white px-3 py-2 text-sm focus:border-amber focus:outline-none focus:ring-2 focus:ring-amber/30"
          >
            <option value="">All cities</option>
            {CITY_OPTIONS.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </label>

        <Button type="button" className="w-full" onClick={onApply}>
          Apply Filters
        </Button>
      </div>
    </aside>
  );
}
