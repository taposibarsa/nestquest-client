"use client";

import { useEffect, useRef, useState } from "react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { MONTHLY_LISTINGS } from "@/components/home/content";

const STATS = [
  { target: 1200, suffix: "+", label: "Total Properties Listed" },
  { target: 850, suffix: "+", label: "Verified Buyers and Tenants" },
  { target: 12, suffix: "+", label: "Cities and Districts Covered" },
  { target: 98, suffix: "%", label: "Client Satisfaction Rate" },
];

function useCountUp(target: number, active: boolean, duration = 1200) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(target * eased));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, target, duration]);

  return value;
}

function StatItem({
  target,
  suffix,
  label,
  active,
  showDivider,
}: {
  target: number;
  suffix: string;
  label: string;
  active: boolean;
  showDivider: boolean;
}) {
  const value = useCountUp(target, active);
  return (
    <div
      className={`relative px-4 py-2 text-center ${
        showDivider ? "md:border-l md:border-amber/40" : ""
      }`}
    >
      <p className="font-display text-3xl font-bold text-amber sm:text-4xl">
        {value.toLocaleString()}
        {suffix}
      </p>
      <p className="mt-2 text-xs text-white/80 sm:text-sm">{label}</p>
    </div>
  );
}

export function StatsSection() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          obs.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="bg-navy py-14 text-white sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h2 className="font-display text-3xl font-bold">
            NestQuest in Numbers
          </h2>
          <p className="mt-2 text-white/70">
            Trusted metrics from our growing Bangladesh community.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-0">
          {STATS.map((stat, i) => (
            <StatItem
              key={stat.label}
              {...stat}
              active={active}
              showDivider={i > 0}
            />
          ))}
        </div>

        <div className="mt-10 h-48 rounded-xl border border-white/10 bg-white/5 p-4">
          <p className="mb-2 text-center text-xs font-medium uppercase tracking-wide text-amber">
            Properties Listed Per Month
          </p>
          <ResponsiveContainer width="100%" height="85%">
            <AreaChart data={MONTHLY_LISTINGS}>
              <XAxis
                dataKey="month"
                tick={{ fill: "#ffffff99", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis hide />
              <Tooltip
                contentStyle={{
                  borderRadius: 8,
                  borderColor: "rgba(26,43,74,0.2)",
                }}
              />
              <Area
                type="monotone"
                dataKey="listings"
                stroke="#e8a838"
                fill="#e8a838"
                fillOpacity={0.25}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}
