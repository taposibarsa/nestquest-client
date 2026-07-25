"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import useSWR from "swr";
import toast from "react-hot-toast";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { Review } from "@/types";
import { ApiError, createReview, getReviews } from "@/lib/api";
import { useAuth } from "@/hooks/useAuth";
import { ReviewCard } from "@/components/detail/ReviewCard";
import { StarRating } from "@/components/detail/StarRating";
import { Button } from "@/components/ui/Button";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { EmptyState } from "@/components/ui/EmptyState";

function averageFrom(reviews: Review[]): number {
  if (reviews.length === 0) return 0;
  const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
  return Math.round((sum / reviews.length) * 10) / 10;
}

function breakdown(reviews: Review[]) {
  const counts = [0, 0, 0, 0, 0];
  for (const r of reviews) {
    if (r.rating >= 1 && r.rating <= 5) counts[r.rating - 1] += 1;
  }
  const total = reviews.length || 1;
  return [5, 4, 3, 2, 1].map((stars) => ({
    stars: `${stars}★`,
    count: counts[stars - 1],
    pct: Math.round((counts[stars - 1] / total) * 100),
  }));
}

export function ReviewsSection({
  propertyId,
  initialReviews,
  initialAverage,
}: {
  propertyId: string;
  initialReviews: Review[];
  initialAverage: number;
}) {
  const { isAuthenticated, token, isLoading: authLoading } = useAuth();
  const { data: reviews = initialReviews, mutate } = useSWR(
    ["reviews", propertyId],
    () => getReviews(propertyId),
    {
      fallbackData: initialReviews,
      revalidateOnFocus: false,
    }
  );

  const average =
    reviews.length === 0 ? initialAverage : averageFrom(reviews);
  const chartData = useMemo(() => breakdown(reviews), [reviews]);

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const loginHref = `/login?redirect=${encodeURIComponent(
    `/properties/${propertyId}`
  )}`;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    if (comment.trim().length < 20) {
      toast.error("Review must be at least 20 characters");
      return;
    }
    setSubmitting(true);
    try {
      const created = await createReview(token, {
        propertyId,
        rating,
        comment: comment.trim(),
      });
      await mutate([created, ...reviews], { revalidate: true });
      setComment("");
      setRating(5);
      toast.success("Review submitted — thank you!");
    } catch (err) {
      const message =
        err instanceof ApiError ? err.message : "Failed to submit review";
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="space-y-6">
      <h2 className="font-display text-2xl font-bold text-navy">
        Reviews & Ratings
      </h2>

      <div className="grid gap-6 rounded-xl border border-navy/10 bg-white p-5 shadow-sm md:grid-cols-2">
        <div className="flex flex-col items-start justify-center">
          <p className="font-display text-5xl font-bold text-navy">
            {average.toFixed(1)}
          </p>
          <StarRating value={average} size="lg" className="mt-2" />
          <p className="mt-2 text-sm text-cool-gray">
            ({reviews.length} review{reviews.length === 1 ? "" : "s"})
          </p>
        </div>
        <div className="h-40 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{ top: 4, right: 8, left: 8, bottom: 4 }}
            >
              <XAxis type="number" hide domain={[0, "dataMax"]} />
              <YAxis
                type="category"
                dataKey="stars"
                width={36}
                tick={{ fill: "#6b7280", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                formatter={(value) => [`${value} reviews`, "Count"]}
                contentStyle={{
                  borderRadius: 8,
                  borderColor: "rgba(26,43,74,0.15)",
                }}
              />
              <Bar dataKey="count" fill="#e8a838" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="space-y-3">
        {reviews.length === 0 ? (
          <EmptyState
            title="No reviews yet"
            description="Be the first to share your experience with this property."
          />
        ) : (
          reviews.map((review) => (
            <ReviewCard key={review._id} review={review} />
          ))
        )}
      </div>

      <div className="rounded-xl border border-navy/10 bg-white p-5 shadow-sm">
        {authLoading ? (
          <p className="text-sm text-cool-gray">Checking sign-in…</p>
        ) : isAuthenticated ? (
          <form
            onSubmit={onSubmit}
            className="space-y-4"
            aria-busy={submitting}
            noValidate
          >
            <h3 className="font-display text-xl font-semibold text-navy">
              Share Your Experience
            </h3>
            <div>
              <p className="mb-1 text-sm font-medium text-charcoal">Rating</p>
              <StarRating
                value={rating}
                onChange={submitting ? undefined : setRating}
                size="lg"
              />
            </div>
            <div>
              <label
                htmlFor="review-comment"
                className="mb-1 block text-sm font-medium text-charcoal"
              >
                Your review
              </label>
              <textarea
                id="review-comment"
                rows={4}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write your review..."
                className="w-full rounded-lg border border-navy/15 px-3 py-2 text-sm focus:border-amber focus:outline-none focus:ring-2 focus:ring-amber/30 disabled:cursor-not-allowed disabled:opacity-60"
                minLength={20}
                required
                disabled={submitting}
              />
              <p className="mt-1 text-xs text-cool-gray">
                Minimum 20 characters ({comment.trim().length}/20)
              </p>
            </div>
            <Button type="submit" disabled={submitting}>
              {submitting ? (
                <>
                  <LoadingSpinner className="h-4 w-4 text-navy" />
                  Submitting…
                </>
              ) : (
                "Submit Review"
              )}
            </Button>
          </form>
        ) : (
          <p className="mt-2 text-sm text-cool-gray">
            Please log in to leave a review.{" "}
            <Link
              href={loginHref}
              className="font-semibold text-sage underline-offset-2 hover:underline"
            >
              Login
            </Link>
          </p>
        )}
      </div>
    </section>
  );
}
