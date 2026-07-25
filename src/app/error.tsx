"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col items-center justify-center px-4 py-20 text-center">
      <p className="text-sm font-semibold uppercase tracking-wide text-amber">
        Something went wrong
      </p>
      <h1 className="mt-2 font-display text-3xl font-bold text-navy sm:text-4xl">
        We hit an unexpected error
      </h1>
      <p className="mt-3 max-w-md text-cool-gray">
        Please try again. If the problem continues, return home and browse
        listings from there.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="inline-flex rounded-lg bg-amber px-5 py-2.5 text-sm font-semibold text-navy transition hover:bg-amber/90"
        >
          Try again
        </button>
        <Link
          href="/"
          className="inline-flex rounded-lg border border-navy/20 bg-white px-5 py-2.5 text-sm font-semibold text-navy transition hover:bg-navy/5"
        >
          Go home
        </Link>
      </div>
    </main>
  );
}
