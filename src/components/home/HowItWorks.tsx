import {
  ArrowRight,
  ClipboardCheck,
  MessageSquare,
  Search,
} from "lucide-react";

const STEPS = [
  {
    title: "Search Properties",
    description:
      "Use our powerful search and filters to find properties that match your budget, location, and lifestyle.",
    Icon: Search,
  },
  {
    title: "Contact an Agent",
    description:
      "Get in touch directly with verified property agents who can schedule viewings and answer your questions.",
    Icon: MessageSquare,
  },
  {
    title: "Move In",
    description:
      "Complete the paperwork, make the payment, and get your keys. It's that simple.",
    Icon: ClipboardCheck,
  },
];

export function HowItWorks() {
  return (
    <section className="bg-cool-gray/10 py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="font-display text-3xl font-bold text-navy">
            How It Works
          </h2>
          <p className="mt-2 text-cool-gray">
            Three simple steps to your next home.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3 md:gap-6">
          {STEPS.map((step, i) => (
            <div key={step.title} className="relative text-center">
              {i < STEPS.length - 1 ? (
                <ArrowRight
                  className="absolute -right-4 top-8 hidden h-5 w-5 text-navy/25 md:block lg:-right-3"
                  aria-hidden
                />
              ) : null}
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-amber font-display text-lg font-bold text-navy">
                {i + 1}
              </div>
              <step.Icon
                className="mx-auto mt-4 h-8 w-8 text-navy"
                strokeWidth={1.5}
                aria-hidden
              />
              <h3 className="mt-3 font-display text-xl font-semibold text-navy">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-cool-gray">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
