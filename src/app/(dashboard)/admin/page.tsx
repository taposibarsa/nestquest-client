import { RequireAdmin } from "@/components/RequireAdmin";
import { AdminListingsPanel } from "@/components/admin/AdminListingsPanel";

export default function AdminPage() {
  return (
    <RequireAdmin>
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="font-display text-3xl font-bold text-navy">
            Admin Dashboard
          </h1>
          <p className="mt-1 text-cool-gray">
            Review pending listings, approve or reject submissions, and manage
            featured properties.
          </p>
        </div>
        <AdminListingsPanel />
      </main>
    </RequireAdmin>
  );
}
