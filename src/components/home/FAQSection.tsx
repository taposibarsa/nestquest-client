"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { FAQS } from "@/components/home/content";

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-white py-14 sm:py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h2 className="font-display text-3xl font-bold text-navy">
            Frequently Asked Questions
          </h2>
          <p className="mt-2 text-cool-gray">
            Quick answers about listing, browsing, and contacting agents.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={item.q}
                className="overflow-hidden rounded-xl border border-navy/10 bg-off-white/50"
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-semibold text-navy">{item.q}</span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-cool-gray transition ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    aria-hidden
                  />
                </button>
                {isOpen ? (
                  <div className="border-t border-navy/10 px-5 py-4 text-sm leading-relaxed text-cool-gray">
                    {item.a}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
