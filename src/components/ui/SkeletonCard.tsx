export function SkeletonCard() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-navy/10 bg-white shadow-sm">
      <div className="aspect-[4/3] animate-pulse bg-navy/10" />
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex gap-2">
          <div className="h-5 w-16 animate-pulse rounded-md bg-navy/10" />
          <div className="h-5 w-14 animate-pulse rounded-md bg-navy/10" />
        </div>
        <div className="h-5 w-[80%] animate-pulse rounded bg-navy/10" />
        <div className="h-4 w-full animate-pulse rounded bg-navy/10" />
        <div className="h-4 w-[65%] animate-pulse rounded bg-navy/10" />
        <div className="mt-auto flex gap-3 pt-2">
          <div className="h-4 w-12 animate-pulse rounded bg-navy/10" />
          <div className="h-4 w-12 animate-pulse rounded bg-navy/10" />
          <div className="h-4 w-16 animate-pulse rounded bg-navy/10" />
        </div>
        <div className="h-6 w-28 animate-pulse rounded bg-navy/10" />
        <div className="h-10 w-full animate-pulse rounded-lg bg-navy/10" />
      </div>
    </div>
  );
}
