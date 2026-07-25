"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

const HERO_BG =
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=80";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.5, ease: "easeOut" as const },
  }),
};

export function HeroSection() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    router.push(
      q ? `/properties?search=${encodeURIComponent(q)}` : "/properties"
    );
  };

  return (
    <section
      className="relative flex min-h-[65vh] items-center justify-center overflow-hidden py-14"
      aria-label="Hero"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${HERO_BG})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-navy/80 via-navy/70 to-navy/85" />

      <div className="relative z-10 mx-auto w-full max-w-3xl px-4 text-center text-white sm:px-6">
        <motion.p
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-amber"
        >
          Your Trusted Property Partner in Bangladesh
        </motion.p>
        <motion.h1
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="font-display text-4xl font-bold leading-tight sm:text-5xl lg:text-[56px]"
        >
          Find Your Perfect Home with NestQuest
        </motion.h1>
        <motion.p
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mx-auto mt-4 max-w-2xl text-base text-white/85 sm:text-lg"
        >
          Browse thousands of verified residential and commercial listings
          across Dhaka, Chittagong, and beyond.
        </motion.p>

        <motion.form
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          onSubmit={onSubmit}
          className="mx-auto mt-8 flex max-w-xl overflow-hidden rounded-xl bg-white shadow-lg"
        >
          <label className="relative min-w-0 flex-1">
            <span className="sr-only">Search properties</span>
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-cool-gray"
              aria-hidden
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by city, area, or property type..."
              className="w-full border-0 bg-transparent py-3.5 pl-10 pr-3 text-sm text-charcoal placeholder:text-cool-gray/70 focus:outline-none focus:ring-0"
            />
          </label>
          <button
            type="submit"
            className="shrink-0 bg-amber px-5 text-sm font-semibold text-navy transition hover:bg-amber/90"
          >
            Search
          </button>
        </motion.form>

        <motion.div
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mt-10 grid grid-cols-3 gap-2 sm:gap-4"
        >
          {[
            { value: "1,200+", label: "Properties Listed" },
            { value: "850+", label: "Happy Families" },
            { value: "12+", label: "Cities Covered" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="font-display text-xl font-bold text-amber sm:text-3xl">
                {stat.value}
              </p>
              <p className="mt-1 text-[10px] leading-tight text-white/75 sm:text-sm">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
