import Link from "next/link";
import { getFeaturedProperties } from "@/lib/api";
import { PropertyCard } from "@/components/properties/PropertyCard";
import { EmptyState } from "@/components/ui/EmptyState";

export async function FeaturedProperties() {
  let properties: Awaited<ReturnType<typeof getFeaturedProperties>> = [];
  try {
    properties = await getFeaturedProperties();
  } catch {
    properties = [];
  }

  const list = properties.slice(0, 8);

  return (
    <section className="bg-white py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h2 className="font-display text-3xl font-bold text-navy">
            Featured Properties
          </h2>
          <p className="mt-2 text-cool-gray">
            Handpicked listings our agents recommend
          </p>
        </div>

        {list.length === 0 ? (
          <EmptyState
            title="No featured listings yet"
            description="Featured properties will appear here once agents mark listings as featured."
            action={
              <Link
                href="/properties"
                className="inline-flex rounded-lg bg-amber px-5 py-2.5 text-sm font-semibold text-navy transition hover:bg-amber/90"
              >
                Browse all properties
              </Link>
            }
          />
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {list.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}

        {list.length > 0 ? (
          <div className="mt-10 flex justify-center">
            <Link
              href="/properties"
              className="inline-flex rounded-lg bg-amber px-6 py-2.5 text-sm font-semibold text-navy transition hover:bg-amber/90"
            >
              View All Properties
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  );
}
