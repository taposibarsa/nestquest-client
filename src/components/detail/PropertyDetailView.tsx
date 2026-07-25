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
  return (
    <main className="mx-auto w-full max-w-7xl flex-1 space-y-10 px-4 py-8 sm:px-6 lg:px-8">
      <ImageGallery images={property.images} title={property.title} />
      <PropertyInfo property={property} />
      <ReviewsSection
        propertyId={property._id}
        initialReviews={reviews}
        initialAverage={property.averageRating}
      />
      <RelatedProperties property={property} />
    </main>
  );
}
