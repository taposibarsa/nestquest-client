"use client";

import { Star } from "lucide-react";

type StarRatingProps = {
  value: number;
  onChange?: (value: number) => void;
  size?: "sm" | "md" | "lg";
  className?: string;
};

const sizes = {
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-7 w-7",
};

export function StarRating({
  value,
  onChange,
  size = "md",
  className = "",
}: StarRatingProps) {
  const interactive = typeof onChange === "function";
  const iconClass = sizes[size];

  return (
    <div
      className={`inline-flex items-center gap-0.5 ${className}`}
      role={interactive ? "radiogroup" : "img"}
      aria-label={interactive ? "Rating" : `${value} out of 5 stars`}
    >
      {[1, 2, 3, 4, 5].map((n) => {
        const filled = interactive ? n <= value : n <= Math.round(value);
        if (interactive) {
          return (
            <button
              key={n}
              type="button"
              role="radio"
              aria-checked={n === value}
              aria-label={`${n} star${n === 1 ? "" : "s"}`}
              onClick={() => onChange(n)}
              className="rounded p-0.5 transition hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber"
            >
              <Star
                className={`${iconClass} ${
                  filled ? "fill-amber text-amber" : "text-cool-gray/40"
                }`}
              />
            </button>
          );
        }
        return (
          <Star
            key={n}
            className={`${iconClass} ${
              filled ? "fill-amber text-amber" : "text-cool-gray/40"
            }`}
            aria-hidden
          />
        );
      })}
    </div>
  );
}
