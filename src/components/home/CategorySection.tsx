import Link from "next/link";
import { CATEGORIES } from "@/components/home/content";

export function CategorySection() {
  return (
    <section className="bg-off-white py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h2 className="font-display text-3xl font-bold text-navy">
            Browse by Category
          </h2>
          <p className="mt-2 text-cool-gray">
            Jump straight to the property type you need.
          </p>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-3 md:overflow-visible lg:grid-cols-6">
          {CATEGORIES.map(({ type, label, countLabel, Icon }) => (
            <Link
              key={type}
              href={`/properties?type=${type}`}
              className="w-[140px] shrink-0 rounded-xl border border-navy/15 bg-white p-5 text-center transition hover:scale-[1.03] hover:border-amber md:w-auto"
            >
              <Icon
                className="mx-auto h-8 w-8 text-amber"
                strokeWidth={1.5}
                aria-hidden
              />
              <p className="mt-3 text-sm font-semibold text-navy">{label}</p>
              <p className="mt-1 text-xs text-cool-gray">{countLabel}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
