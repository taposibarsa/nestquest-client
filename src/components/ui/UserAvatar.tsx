"use client";

import { useState } from "react";
import { User } from "lucide-react";

function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return (parts[0]![0] ?? "?").toUpperCase();
  return `${parts[0]![0] ?? ""}${parts[1]![0] ?? ""}`.toUpperCase();
}

/**
 * Profile avatar — uses profileImage when present (Google / pasted URLs).
 * referrerPolicy no-referrer avoids Google avatar blocking.
 */
export function UserAvatar({
  name,
  imageUrl,
  size = "md",
  className = "",
}: {
  name: string;
  imageUrl?: string | null;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  const sizeClass =
    size === "sm" ? "h-8 w-8 text-[10px]" : size === "lg" ? "h-12 w-12 text-sm" : "h-9 w-9 text-xs";

  const showImage = Boolean(imageUrl?.trim()) && !failed;

  if (showImage) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={imageUrl!}
        alt={name}
        referrerPolicy="no-referrer"
        onError={() => setFailed(true)}
        className={`${sizeClass} shrink-0 rounded-full object-cover ring-2 ring-white/20 ${className}`}
      />
    );
  }

  return (
    <div
      className={`inline-flex ${sizeClass} shrink-0 items-center justify-center rounded-full bg-amber font-bold text-navy ring-2 ring-white/20 ${className}`}
      aria-hidden
    >
      {name.trim() ? initials(name) : <User className="h-4 w-4" />}
    </div>
  );
}
