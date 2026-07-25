import { Target, Eye } from "lucide-react";

export function MissionVision() {
  return (
    <section className="bg-white py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2">
          <article className="rounded-xl border border-navy/10 bg-off-white/60 p-8 shadow-sm">
            <Target className="h-8 w-8 text-amber" aria-hidden />
            <h2 className="mt-4 font-display text-2xl font-bold text-navy">
              Our Mission
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-cool-gray sm:text-base">
              To connect every Bangladeshi family with their perfect home through
              verified listings and trusted agents.
            </p>
          </article>
          <article className="rounded-xl border border-navy/10 bg-off-white/60 p-8 shadow-sm">
            <Eye className="h-8 w-8 text-amber" aria-hidden />
            <h2 className="mt-4 font-display text-2xl font-bold text-navy">
              Our Vision
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-cool-gray sm:text-base">
              To become the most trusted real estate platform across South Asia
              by 2030.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
