import type { Metadata } from "next";
import { getPropertyById } from "@/lib/api";
import { PropertyDetailView } from "@/components/detail/PropertyDetailView";
import { PropertyDetailClient } from "@/components/detail/PropertyDetailClient";

type Props = {
  params: Promise<{ id: string }>;
};

function isMissingProperty(err: unknown): boolean {
  if (typeof err !== "object" || err === null) return false;
  const status = "status" in err ? Number(err.status) : NaN;
  return status === 404 || status === 400;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  try {
    const { property } = await getPropertyById(id);
    return {
      title: `${property.title} | NestQuest`,
      description: property.shortDescription,
    };
  } catch {
    return { title: "Property | NestQuest" };
  }
}

export default async function PropertyDetailPage({ params }: Props) {
  const { id } = await params;

  try {
    const { property, reviews } = await getPropertyById(id);
    return <PropertyDetailView property={property} reviews={reviews} />;
  } catch (err) {
    if (isMissingProperty(err)) {
      // Owner/admin may still open pending/rejected with JWT (client fetch).
      return <PropertyDetailClient id={id} />;
    }
    throw err;
  }
}
