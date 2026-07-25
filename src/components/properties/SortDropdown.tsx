"use client";

import type { PropertySort } from "@/types";

const OPTIONS: { value: PropertySort; label: string }[] = [
  { value: "newest", label: "Newest First" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
  { value: "reviews", label: "Most Reviewed" },
];

export function SortDropdown({
  value,
  onChange,
}: {
  value: PropertySort;
  onChange: (value: PropertySort) => void;
}) {
  return (
    <label className="flex items-center gap-2 text-sm text-cool-gray">
      <span className="shrink-0 font-medium">Sort</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as PropertySort)}
        className="rounded-lg border border-navy/15 bg-white px-3 py-2 text-sm font-medium text-charcoal focus:border-amber focus:outline-none focus:ring-2 focus:ring-amber/30"
      >
        {OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </label>
  );
}
