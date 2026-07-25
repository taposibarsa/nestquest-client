import Link from "next/link";

export default function PropertyNotFound() {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col items-center justify-center px-4 py-16 text-center">
      <h1 className="font-display text-3xl font-bold text-navy">
        Property not found
      </h1>
      <p className="mt-2 max-w-md text-cool-gray">
        This listing may have been removed or the link is invalid.
      </p>
      <Link
        href="/properties"
        className="mt-6 inline-flex rounded-lg bg-amber px-5 py-2.5 text-sm font-semibold text-navy transition hover:bg-amber/90"
      >
        Browse properties
      </Link>
    </main>
  );
}
