import type { Review } from "@/types";
import { StarRating } from "@/components/detail/StarRating";
import { RemoteImg } from "@/components/ui/RemoteImg";

function initials(name: string): string {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");
}

export function ReviewCard({ review }: { review: Review }) {
  const date = new Date(review.createdAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <article className="rounded-xl border border-navy/10 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-start gap-3">
        {review.userImage ? (
          <RemoteImg
            src={review.userImage}
            alt={review.userName}
            className="h-10 w-10 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-navy/10 text-xs font-bold text-navy">
            {initials(review.userName)}
          </div>
        )}
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="font-semibold text-navy">{review.userName}</p>
            <time className="text-xs text-cool-gray" dateTime={review.createdAt}>
              {date}
            </time>
          </div>
          <StarRating value={review.rating} size="sm" className="mt-1" />
        </div>
      </div>
      <p className="text-sm leading-relaxed text-charcoal/90">{review.comment}</p>
    </article>
  );
}
