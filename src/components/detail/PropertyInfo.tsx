"use client";

import {
  Bath,
  BedDouble,
  Copy,
  Mail,
  MapPin,
  Maximize,
  MessageCircle,
  Phone,
  UserRound,
} from "lucide-react";
import toast from "react-hot-toast";
import type { Property } from "@/types";
import { formatPriceLabel } from "@/lib/format";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { AmenitiesList } from "@/components/detail/AmenitiesList";

function yesNo(value: boolean): string {
  return value ? "Yes" : "No";
}

export function PropertyInfo({ property }: { property: Property }) {
  const locationLine = [
    property.location.address,
    property.location.area,
    property.location.city,
  ]
    .filter(Boolean)
    .join(", ");

  const paragraphs = property.fullDescription
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  const shareUrl =
    typeof window !== "undefined"
      ? window.location.href
      : `/properties/${property._id}`;

  const copyLink = async () => {
    try {
      const url =
        typeof window !== "undefined"
          ? window.location.href
          : shareUrl;
      await navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard");
    } catch {
      toast.error("Could not copy link");
    }
  };

  const whatsappHref = (() => {
    const text = `Check out this property on NestQuest: ${property.title} — ${
      typeof window !== "undefined" ? window.location.href : shareUrl
    }`;
    return `https://wa.me/?text=${encodeURIComponent(text)}`;
  })();

  const featureRows: [string, string][] = [
    ["Property Type", property.propertyType],
    ["Status", property.status],
    ["Furnished", yesNo(property.features.furnished)],
    ["Pet Friendly", yesNo(property.features.petFriendly)],
    ["Elevator", yesNo(property.features.elevator)],
    ["Balcony", yesNo(property.features.balcony)],
  ];

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <div className="space-y-8 lg:col-span-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-navy sm:text-4xl">
            {property.title}
          </h1>
          <p className="mt-2 flex items-start gap-1.5 text-cool-gray">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
            {locationLine}
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <p className="font-display text-3xl font-bold text-navy">
              {formatPriceLabel(
                property.price,
                property.priceType,
                property.rentPeriod
              )}
            </p>
            <Badge variant={property.priceType === "sale" ? "amber" : "sage"}>
              {property.priceType === "sale"
                ? "For Sale"
                : property.rentPeriod === "yearly"
                  ? "For Rent /yr"
                  : "For Rent /mo"}
            </Badge>
          </div>

          <div className="mt-5 flex flex-wrap gap-4 text-sm font-medium text-charcoal">
            {property.bedrooms > 0 ? (
              <span className="inline-flex items-center gap-1.5">
                <BedDouble className="h-4 w-4 text-cool-gray" />
                {property.bedrooms} Beds
              </span>
            ) : null}
            {property.bathrooms > 0 ? (
              <span className="inline-flex items-center gap-1.5">
                <Bath className="h-4 w-4 text-cool-gray" />
                {property.bathrooms} Baths
              </span>
            ) : null}
            <span className="inline-flex items-center gap-1.5">
              <Maximize className="h-4 w-4 text-cool-gray" />
              {property.area.toLocaleString()} sqft
            </span>
            <Badge variant="navy">{property.propertyType}</Badge>
          </div>
        </div>

        <div>
          <h2 className="mb-3 font-display text-xl font-semibold text-navy">
            Description
          </h2>
          <div className="space-y-3 text-sm leading-relaxed text-charcoal/90">
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>

        <AmenitiesList amenities={property.amenities} />

        <div>
          <h3 className="mb-3 font-display text-xl font-semibold text-navy">
            Key Features
          </h3>
          <table className="w-full overflow-hidden rounded-xl border border-navy/10 bg-white text-sm">
            <tbody>
              {featureRows.map(([label, value], i) => (
                <tr
                  key={label}
                  className={i % 2 === 0 ? "bg-off-white/60" : "bg-white"}
                >
                  <th className="px-4 py-2.5 text-left font-medium text-cool-gray">
                    {label}
                  </th>
                  <td className="px-4 py-2.5 capitalize text-charcoal">
                    {value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <aside className="space-y-4 lg:col-span-4">
        <div className="rounded-xl border border-navy/10 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-navy/10 text-navy">
              <UserRound className="h-6 w-6" aria-hidden />
            </div>
            <div>
              <p className="font-semibold text-navy">
                {property.contactInfo.agentName}
              </p>
              <p className="text-xs text-cool-gray">Listing agent</p>
            </div>
          </div>
          <p className="mb-1 flex items-center gap-2 text-sm text-charcoal">
            <Phone className="h-3.5 w-3.5 text-cool-gray" />
            {property.contactInfo.agentPhone}
          </p>
          <p className="mb-4 flex items-center gap-2 text-sm text-charcoal">
            <Mail className="h-3.5 w-3.5 text-cool-gray" />
            {property.contactInfo.agentEmail}
          </p>
          <div className="flex flex-col gap-2">
            <a
              href={`tel:${property.contactInfo.agentPhone.replace(/\s+/g, "")}`}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-amber px-4 py-2 text-sm font-semibold text-navy transition hover:bg-amber/90"
            >
              <Phone className="h-4 w-4" />
              Call Agent
            </a>
            <a
              href={`mailto:${property.contactInfo.agentEmail}`}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-navy/20 bg-white px-4 py-2 text-sm font-semibold text-navy transition hover:bg-navy/5"
            >
              <Mail className="h-4 w-4" />
              Email Agent
            </a>
          </div>
        </div>

        <div className="rounded-xl border border-navy/10 bg-white p-5 shadow-sm">
          <p className="mb-3 text-sm font-semibold text-navy">Share</p>
          <div className="flex flex-col gap-2">
            <Button variant="secondary" className="w-full" onClick={copyLink}>
              <Copy className="h-4 w-4" />
              Copy link
            </Button>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-navy/20 bg-white px-4 py-2 text-sm font-semibold text-navy transition hover:bg-navy/5"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
          </div>
        </div>
      </aside>
    </div>
  );
}
