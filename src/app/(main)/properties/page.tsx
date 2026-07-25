import { Suspense } from "react";
import { PropertiesExplore } from "@/components/properties/PropertiesExplore";
import { SkeletonCard } from "@/components/ui/SkeletonCard";

function ExploreFallback() {
  return (
    <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 h-10 w-64 animate-pulse rounded bg-navy/10" />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </main>
  );
}

export default function PropertiesPage() {
  return (
    <Suspense fallback={<ExploreFallback />}>
      <PropertiesExplore />
    </Suspense>
  );
}
