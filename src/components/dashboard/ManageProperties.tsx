"use client";

import { useState } from "react";
import Link from "next/link";
import useSWR from "swr";
import toast from "react-hot-toast";
import { Home } from "lucide-react";
import type { Property } from "@/types";
import { ApiError, deleteProperty, getUserProperties } from "@/lib/api";
import { formatPriceLabel } from "@/lib/format";
import { useAuth } from "@/hooks/useAuth";
import { Modal } from "@/components/ui/Modal";
import { EmptyState } from "@/components/ui/EmptyState";
import { Badge } from "@/components/ui/Badge";
import { RemoteImg } from "@/components/ui/RemoteImg";
import { SkeletonCard } from "@/components/ui/SkeletonCard";

function listedOn(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function ManageProperties() {
  const { token } = useAuth();
  const { data, error, isLoading, mutate } = useSWR(
    token ? ["my-properties", token] : null,
    () => getUserProperties(token!),
    { revalidateOnFocus: false }
  );

  const [pendingDelete, setPendingDelete] = useState<Property | null>(null);
  const [deleting, setDeleting] = useState(false);

  const properties = data ?? [];

  const confirmDelete = async () => {
    if (!token || !pendingDelete) return;
    setDeleting(true);
    try {
      await deleteProperty(token, pendingDelete._id);
      await mutate(
        (current) =>
          (current ?? []).filter((p) => p._id !== pendingDelete._id),
        { revalidate: false }
      );
      toast.success("Property deleted successfully");
      setPendingDelete(null);
    } catch (err) {
      const message =
        err instanceof ApiError ? err.message : "Could not delete property";
      toast.error(message);
    } finally {
      setDeleting(false);
    }
  };

  if (!token || isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
        {error instanceof Error
          ? error.message
          : "Failed to load your listings."}
      </p>
    );
  }

  if (properties.length === 0) {
    return (
      <EmptyState
        title="You haven't listed any properties yet."
        description="Create your first listing and it will show up here."
        icon={<Home className="h-12 w-12" strokeWidth={1.25} />}
        action={
          <Link
            href="/items/add"
            className="inline-flex items-center justify-center rounded-lg bg-amber px-4 py-2 text-sm font-semibold text-navy transition hover:bg-amber/90"
          >
            Add Your First Property →
          </Link>
        }
      />
    );
  }

  return (
    <>
      <p className="mb-5 rounded-xl border border-navy/10 bg-white px-4 py-3 text-sm font-medium text-navy shadow-sm">
        You have {properties.length} active listing
        {properties.length === 1 ? "" : "s"}
      </p>

      <div className="hidden overflow-x-auto rounded-xl border border-navy/10 bg-white shadow-sm md:block">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="border-b border-navy/10 bg-off-white/80 text-cool-gray">
            <tr>
              <th className="px-4 py-3 font-medium">#</th>
              <th className="px-4 py-3 font-medium">Property</th>
              <th className="px-4 py-3 font-medium">Type</th>
              <th className="px-4 py-3 font-medium">Price</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Listed On</th>
              <th className="px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {properties.map((p, i) => (
              <tr key={p._id} className="border-b border-navy/5 last:border-0">
                <td className="px-4 py-3 text-cool-gray">{i + 1}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-16 shrink-0 overflow-hidden rounded-md bg-navy/5">
                      {p.images[0] ? (
                        <RemoteImg
                          src={p.images[0]}
                          alt={p.title}
                          className="h-full w-full object-cover"
                        />
                      ) : null}
                    </div>
                    <span className="font-medium text-navy line-clamp-2">
                      {p.title}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3 capitalize">{p.propertyType}</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  {formatPriceLabel(p.price, p.priceType, p.rentPeriod)}
                </td>
                <td className="px-4 py-3">
                  <Badge variant="sage">{p.status}</Badge>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-cool-gray">
                  {listedOn(p.createdAt)}
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-2">
                    <a
                      href={`/properties/${p._id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex rounded-lg border border-navy/30 px-3 py-1.5 text-xs font-semibold text-navy hover:bg-navy/5"
                    >
                      View
                    </a>
                    <button
                      type="button"
                      onClick={() => setPendingDelete(p)}
                      className="inline-flex rounded-lg border border-red-300 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="space-y-4 md:hidden">
        {properties.map((p) => (
          <article
            key={p._id}
            className="rounded-xl border border-navy/10 bg-white p-4 shadow-sm"
          >
            <div className="flex gap-3">
              <div className="h-20 w-24 shrink-0 overflow-hidden rounded-lg bg-navy/5">
                {p.images[0] ? (
                  <RemoteImg
                    src={p.images[0]}
                    alt={p.title}
                    className="h-full w-full object-cover"
                  />
                ) : null}
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-navy line-clamp-2">
                  {p.title}
                </h3>
                <p className="mt-1 text-sm capitalize text-cool-gray">
                  {p.propertyType} · {listedOn(p.createdAt)}
                </p>
                <p className="mt-1 text-sm font-semibold text-navy">
                  {formatPriceLabel(p.price, p.priceType, p.rentPeriod)}
                </p>
                <Badge variant="sage" className="mt-2">
                  {p.status}
                </Badge>
              </div>
            </div>
            <div className="mt-3 flex gap-2">
              <a
                href={`/properties/${p._id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-1 items-center justify-center rounded-lg border border-navy/30 px-3 py-2 text-sm font-semibold text-navy"
              >
                View
              </a>
              <button
                type="button"
                onClick={() => setPendingDelete(p)}
                className="inline-flex flex-1 items-center justify-center rounded-lg border border-red-300 px-3 py-2 text-sm font-semibold text-red-600"
              >
                Delete
              </button>
            </div>
          </article>
        ))}
      </div>

      <Modal
        open={!!pendingDelete}
        title="Delete property?"
        onClose={() => {
          if (!deleting) setPendingDelete(null);
        }}
        onConfirm={confirmDelete}
        confirmLabel="Yes, Delete"
        confirming={deleting}
        confirmVariant="danger"
      >
        <p>
          Are you sure you want to delete &ldquo;{pendingDelete?.title}&rdquo;?
          This cannot be undone.
        </p>
      </Modal>
    </>
  );
}
