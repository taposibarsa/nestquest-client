import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col items-center justify-center px-4 py-20 text-center">
      <p className="text-sm font-semibold uppercase tracking-wide text-amber">
        404
      </p>
      <h1 className="mt-2 font-display text-3xl font-bold text-navy sm:text-4xl">
        Page not found
      </h1>
      <p className="mt-3 max-w-md text-cool-gray">
        The page you are looking for does not exist or may have moved.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="inline-flex rounded-lg bg-amber px-5 py-2.5 text-sm font-semibold text-navy transition hover:bg-amber/90"
        >
          Go home
        </Link>
        <Link
          href="/properties"
          className="inline-flex rounded-lg border border-navy/20 bg-white px-5 py-2.5 text-sm font-semibold text-navy transition hover:bg-navy/5"
        >
          Browse properties
        </Link>
      </div>
    </main>
  );
}
