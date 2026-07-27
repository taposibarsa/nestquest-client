"use client";

import useSWR from "swr";
import { getPropertyById } from "@/lib/api";
import { useAuth } from "@/hooks/useAuth";
import { PropertyDetailView } from "@/components/detail/PropertyDetailView";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

/** Fetches a property with the viewer JWT so owners/admins can open pending listings. */
export function PropertyDetailClient({ id }: { id: string }) {
  const { token, isLoading: authLoading } = useAuth();
  const { data, error, isLoading } = useSWR(
    !authLoading ? ["property-detail-auth", id, token ?? "guest"] : null,
    () => getPropertyById(id, token),
    { revalidateOnFocus: false }
  );

  if (authLoading || isLoading) {
    return (
      <main className="flex flex-1 flex-col items-center justify-center gap-3 p-8">
        <LoadingSpinner className="h-6 w-6 text-amber" />
        <p className="text-cool-gray">Loading property…</p>
      </main>
    );
  }

  if (error || !data) {
    return (
      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col items-center justify-center px-4 py-16 text-center">
        <h1 className="font-display text-3xl font-bold text-navy">
          Property not found
        </h1>
        <p className="mt-2 max-w-md text-cool-gray">
          This listing may be pending approval, rejected, or the link is
          invalid.
        </p>
      </main>
    );
  }

  return (
    <PropertyDetailView property={data.property} reviews={data.reviews} />
  );
}
