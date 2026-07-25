import { ABOUT_STATS } from "@/components/about/content";

export function AboutStats() {
  return (
    <section className="bg-navy py-12 text-white sm:py-14">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 sm:px-6 md:grid-cols-4 lg:px-8">
        {ABOUT_STATS.map((stat, i) => (
          <div
            key={stat.label}
            className={`text-center ${
              i > 0 ? "md:border-l md:border-amber/40" : ""
            }`}
          >
            <p className="font-display text-3xl font-bold text-amber sm:text-4xl">
              {stat.value}
            </p>
            <p className="mt-2 text-sm text-white/75">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
