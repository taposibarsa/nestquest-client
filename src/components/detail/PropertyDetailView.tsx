"use client";

import type { Property, Review } from "@/types";
import { ImageGallery } from "@/components/detail/ImageGallery";
import { PropertyInfo } from "@/components/detail/PropertyInfo";
import { ReviewsSection } from "@/components/detail/ReviewsSection";
import { RelatedProperties } from "@/components/detail/RelatedProperties";

export function PropertyDetailView({
  property,
  reviews,
}: {
  property: Property;
  reviews: Review[];
}) {
  const isApproved = (property.moderationStatus ?? "approved") === "approved";

  return (
    <main className="mx-auto w-full max-w-7xl flex-1 space-y-10 px-4 py-8 sm:px-6 lg:px-8">
      {!isApproved ? (
        <p className="rounded-xl border border-amber/40 bg-amber/10 px-4 py-3 text-sm text-navy">
          This listing is{" "}
          <strong className="capitalize">
            {property.moderationStatus ?? "pending"}
          </strong>
          . It is not visible to the public until an admin approves it.
        </p>
      ) : null}
      <ImageGallery images={property.images} title={property.title} />
      <PropertyInfo property={property} />
      {isApproved ? (
        <ReviewsSection
          propertyId={property._id}
          initialReviews={reviews}
          initialAverage={property.averageRating}
        />
      ) : null}
      {isApproved ? <RelatedProperties property={property} /> : null}
    </main>
  );
}
