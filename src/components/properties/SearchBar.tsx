"use client";

import { Search } from "lucide-react";

export function SearchBar({
  value,
  onChange,
  placeholder = "Search by city, area, or title...",
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="relative block w-full">
      <span className="sr-only">Search properties</span>
      <Search
        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-cool-gray"
        aria-hidden
      />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-navy/15 bg-white py-2.5 pl-10 pr-3 text-sm text-charcoal placeholder:text-cool-gray/70 focus:border-amber focus:outline-none focus:ring-2 focus:ring-amber/30"
      />
    </label>
  );
}
