import { BadgeCheck, Handshake, Wallet } from "lucide-react";
import { WHY_CHOOSE } from "@/components/about/content";

const ICONS = [BadgeCheck, Wallet, Handshake];

export function WhyChooseUs() {
  return (
    <section className="bg-off-white py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h2 className="font-display text-3xl font-bold text-navy">
            Why Choose Us?
          </h2>
          <p className="mt-2 text-cool-gray">
            Built for seekers and agents who value clarity.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {WHY_CHOOSE.map((item, i) => {
            const Icon = ICONS[i] ?? BadgeCheck;
            return (
              <article
                key={item.title}
                className="rounded-xl border border-navy/10 bg-white p-6 text-center shadow-sm"
              >
                <Icon
                  className="mx-auto h-9 w-9 text-sage"
                  strokeWidth={1.5}
                  aria-hidden
                />
                <h3 className="mt-4 font-display text-xl font-semibold text-navy">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-cool-gray">{item.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
