"use client";

import Link from "next/link";
import { RequireAuth } from "@/components/RequireAuth";
import { ManageProperties } from "@/components/dashboard/ManageProperties";

export default function ManagePropertiesPage() {
  return (
    <RequireAuth>
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="font-display text-3xl font-bold text-navy sm:text-4xl">
              My Property Listings
            </h1>
            <p className="mt-1 text-cool-gray">
              Manage all the properties you have listed on NestQuest.
            </p>
          </div>
          <Link
            href="/items/add"
            className="inline-flex items-center justify-center rounded-lg bg-amber px-4 py-2 text-sm font-semibold text-navy transition hover:bg-amber/90"
          >
            Add Property
          </Link>
        </div>
        <ManageProperties />
      </main>
    </RequireAuth>
  );
}
