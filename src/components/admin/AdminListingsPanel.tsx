"use client";

import { useState } from "react";
import useSWR from "swr";
import toast from "react-hot-toast";
import type { ModerationStatus } from "@/types";
import {
  ApiError,
  getAdminProperties,
  moderateProperty,
  setPropertyFeatured,
  type AdminProperty,
} from "@/lib/api";
import { formatPriceLabel } from "@/lib/format";
import { useAuth } from "@/hooks/useAuth";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { RemoteImg } from "@/components/ui/RemoteImg";
import { SkeletonCard } from "@/components/ui/SkeletonCard";

const TABS: { id: ModerationStatus; label: string }[] = [
  { id: "pending", label: "Pending" },
  { id: "approved", label: "Approved" },
  { id: "rejected", label: "Rejected" },
];

function listedOn(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function AdminListingsPanel() {
  const { token } = useAuth();
  const [tab, setTab] = useState<ModerationStatus>("pending");
  const [busyId, setBusyId] = useState<string | null>(null);

  const { data, error, isLoading, mutate } = useSWR(
    token ? ["admin-properties", token, tab] : null,
    () => getAdminProperties(token!, { status: tab, limit: 50 }),
    { revalidateOnFocus: false }
  );

  const listings = data?.data ?? [];

  async function onModerate(id: string, action: "approve" | "reject") {
    if (!token) return;
    setBusyId(id);
    try {
      await moderateProperty(token, id, action);
      toast.success(
        action === "approve" ? "Listing approved" : "Listing rejected"
      );
      await mutate();
    } catch (err) {
      toast.error(
        err instanceof ApiError ? err.message : "Could not update listing"
      );
    } finally {
      setBusyId(null);
    }
  }

  async function onFeatured(p: AdminProperty, featured: boolean) {
    if (!token) return;
    setBusyId(p._id);
    try {
      await setPropertyFeatured(token, p._id, featured);
      toast.success(featured ? "Marked as featured" : "Removed from featured");
      await mutate();
    } catch (err) {
      toast.error(
        err instanceof ApiError ? err.message : "Could not update featured"
      );
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
              tab === t.id
                ? "bg-amber text-navy"
                : "border border-navy/15 bg-white text-navy hover:bg-navy/5"
            }`}
          >
            {t.label}
            {data && tab === t.id ? (
              <span className="ml-2 text-xs opacity-70">({data.total})</span>
            ) : null}
          </button>
        ))}
      </div>

      {!token || isLoading ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : error ? (
        <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error instanceof Error
            ? error.message
            : "Failed to load admin listings."}
        </p>
      ) : listings.length === 0 ? (
        <EmptyState
          title={`No ${tab} listings`}
          description={
            tab === "pending"
              ? "New user submissions will appear here for review."
              : `There are no ${tab} listings right now.`
          }
        />
      ) : (
        <div className="space-y-4">
          {listings.map((p) => {
            const busy = busyId === p._id;
            return (
              <article
                key={p._id}
                className="flex flex-col gap-4 rounded-xl border border-navy/10 bg-white p-4 shadow-sm sm:flex-row sm:items-center"
              >
                <div className="h-28 w-full shrink-0 overflow-hidden rounded-lg bg-navy/5 sm:h-24 sm:w-36">
                  {p.images[0] ? (
                    <RemoteImg
                      src={p.images[0]}
                      alt={p.title}
                      className="h-full w-full object-cover"
                    />
                  ) : null}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-display text-lg font-semibold text-navy line-clamp-1">
                      {p.title}
                    </h3>
                    {p.featured ? (
                      <Badge variant="amber">Featured</Badge>
                    ) : null}
                  </div>
                  <p className="mt-1 text-sm text-cool-gray">
                    {p.location.area}, {p.location.city} ·{" "}
                    <span className="capitalize">{p.propertyType}</span>
                  </p>
                  <p className="mt-1 text-sm font-semibold text-navy">
                    {formatPriceLabel(p.price, p.priceType, p.rentPeriod)}
                  </p>
                  <p className="mt-1 text-xs text-cool-gray">
                    Owner: {p.ownerName} ({p.ownerEmail}) · Listed{" "}
                    {listedOn(p.createdAt)}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 sm:flex-col sm:items-stretch">
                  {tab === "pending" ? (
                    <>
                      <Button
                        type="button"
                        size="sm"
                        disabled={busy}
                        onClick={() => onModerate(p._id, "approve")}
                      >
                        {busy ? <LoadingSpinner className="h-4 w-4" /> : null}
                        Accept
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        variant="secondary"
                        disabled={busy}
                        className="border-red-300 text-red-700 hover:bg-red-50"
                        onClick={() => onModerate(p._id, "reject")}
                      >
                        Reject
                      </Button>
                    </>
                  ) : null}
                  {tab === "approved" ? (
                    <>
                      <Button
                        type="button"
                        size="sm"
                        variant={p.featured ? "secondary" : "primary"}
                        disabled={busy}
                        onClick={() => onFeatured(p, !p.featured)}
                      >
                        {busy ? <LoadingSpinner className="h-4 w-4" /> : null}
                        {p.featured ? "Unfeature" : "Feature"}
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        variant="secondary"
                        disabled={busy}
                        className="border-red-300 text-red-700 hover:bg-red-50"
                        onClick={() => onModerate(p._id, "reject")}
                      >
                        Reject
                      </Button>
                    </>
                  ) : null}
                  {tab === "rejected" ? (
                    <Button
                      type="button"
                      size="sm"
                      disabled={busy}
                      onClick={() => onModerate(p._id, "approve")}
                    >
                      {busy ? <LoadingSpinner className="h-4 w-4" /> : null}
                      Accept
                    </Button>
                  ) : null}
                  <a
                    href={`/properties/${p._id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-lg border border-navy/20 px-3 py-1.5 text-sm font-semibold text-navy hover:bg-navy/5"
                  >
                    View
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
