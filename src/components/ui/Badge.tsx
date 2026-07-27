import type { ReactNode } from "react";

type BadgeVariant = "amber" | "navy" | "sage" | "gray" | "danger";

const variants: Record<BadgeVariant, string> = {
  amber: "bg-amber/20 text-navy",
  navy: "bg-navy text-white",
  sage: "bg-sage/15 text-sage",
  gray: "bg-cool-gray/15 text-cool-gray",
  danger: "bg-red-100 text-red-700",
};

export function Badge({
  children,
  variant = "amber",
  className = "",
}: {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-semibold capitalize ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
