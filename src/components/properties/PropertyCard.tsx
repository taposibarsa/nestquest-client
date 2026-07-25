import Link from "next/link";
import { Bath, BedDouble, MapPin, Maximize, Star } from "lucide-react";
import type { Property } from "@/types";
import { formatPriceLabel } from "@/lib/format";
import { Badge } from "@/components/ui/Badge";
import { RemoteImg } from "@/components/ui/RemoteImg";

export function PropertyCard({ property }: { property: Property }) {
  const image =
    property.images[0] ||
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80";
  const location = `${property.location.area}, ${property.location.city}`;

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl border border-navy/10 bg-white shadow-sm transition hover:shadow-md">
      <div className="relative aspect-[4/3] overflow-hidden bg-navy/5">
        <RemoteImg
          src={image}
          alt={property.title}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          <Badge variant="navy">{property.propertyType}</Badge>
          <Badge variant={property.priceType === "sale" ? "amber" : "sage"}>
            {property.priceType === "sale" ? "For Sale" : "For Rent"}
          </Badge>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="font-display text-lg font-semibold leading-snug text-navy line-clamp-1">
          {property.title}
        </h3>
        <p className="flex items-start gap-1 text-sm text-cool-gray">
          <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />
          <span className="line-clamp-1">{location}</span>
        </p>
        <p className="text-sm text-cool-gray line-clamp-2">
          {property.shortDescription}
        </p>

        <div className="mt-1 flex flex-wrap items-center gap-3 text-xs font-medium text-charcoal">
          {property.bedrooms > 0 ? (
            <span className="inline-flex items-center gap-1">
              <BedDouble className="h-3.5 w-3.5 text-cool-gray" />
              {property.bedrooms}
            </span>
          ) : null}
          {property.bathrooms > 0 ? (
            <span className="inline-flex items-center gap-1">
              <Bath className="h-3.5 w-3.5 text-cool-gray" />
              {property.bathrooms}
            </span>
          ) : null}
          <span className="inline-flex items-center gap-1">
            <Maximize className="h-3.5 w-3.5 text-cool-gray" />
            {property.area.toLocaleString()} sqft
          </span>
          {property.totalReviews > 0 ? (
            <span className="inline-flex items-center gap-1">
              <Star className="h-3.5 w-3.5 fill-amber text-amber" />
              {property.averageRating.toFixed(1)}
            </span>
          ) : null}
        </div>

        <p className="mt-auto pt-2 font-display text-xl font-bold text-navy">
          {formatPriceLabel(
            property.price,
            property.priceType,
            property.rentPeriod
          )}
        </p>

        <Link
          href={`/properties/${property._id}`}
          className="mt-1 inline-flex w-full items-center justify-center rounded-lg bg-amber px-4 py-2 text-sm font-semibold text-navy transition hover:bg-amber/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber focus-visible:ring-offset-2"
        >
          View Details
        </Link>
      </div>
    </article>
  );
}
