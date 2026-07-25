"use client";

import { RequireAuth } from "@/components/RequireAuth";
import { AddPropertyForm } from "@/components/dashboard/AddPropertyForm";

export default function AddPropertyPage() {
  return (
    <RequireAuth>
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="font-display text-3xl font-bold text-navy sm:text-4xl">
            List a New Property
          </h1>
          <p className="mt-1 text-cool-gray">
            Fill in the details below and your property will be live within
            minutes.
          </p>
        </div>
        <AddPropertyForm />
      </main>
    </RequireAuth>
  );
}
