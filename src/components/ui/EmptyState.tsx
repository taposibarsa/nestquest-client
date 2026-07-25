import type { ReactNode } from "react";
import { SearchX } from "lucide-react";

export function EmptyState({
  title,
  description,
  action,
  icon,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
  icon?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-navy/15 bg-white/60 px-6 py-16 text-center">
      <div className="mb-4 text-cool-gray">
        {icon ?? <SearchX className="h-12 w-12" strokeWidth={1.25} />}
      </div>
      <h3 className="font-display text-xl font-semibold text-navy">{title}</h3>
      {description ? (
        <p className="mt-2 max-w-md text-sm text-cool-gray">{description}</p>
      ) : null}
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}
