"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const value = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      toast.error("Please enter a valid email address");
      return;
    }
    setSubmitting(true);
    window.setTimeout(() => {
      toast.success("You're subscribed!");
      setEmail("");
      setSubmitting(false);
    }, 400);
  };

  return (
    <section className="bg-navy py-14 sm:py-16">
      <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
        <h2 className="font-display text-3xl font-bold text-white">
          Get the Latest Listings in Your Inbox
        </h2>
        <p className="mt-2 text-white/75">
          Subscribe and we&apos;ll send you new properties in your preferred
          location every week.
        </p>
        <form
          onSubmit={onSubmit}
          className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
          aria-busy={submitting}
        >
          <label className="sr-only" htmlFor="newsletter-email">
            Email
          </label>
          <input
            id="newsletter-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="min-w-0 flex-1 rounded-lg border border-amber bg-white px-4 py-3 text-sm text-charcoal focus:border-amber focus:outline-none focus:ring-2 focus:ring-amber/40 disabled:cursor-not-allowed disabled:opacity-60"
            required
            disabled={submitting}
          />
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-amber px-6 py-3 text-sm font-semibold text-navy transition hover:bg-amber/90 disabled:opacity-60"
          >
            {submitting ? (
              <>
                <LoadingSpinner className="h-4 w-4 text-navy" />
                Subscribing…
              </>
            ) : (
              "Subscribe"
            )}
          </button>
        </form>
      </div>
    </section>
  );
}
