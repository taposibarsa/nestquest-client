import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPropertyById } from "@/lib/api";
import { PropertyDetailView } from "@/components/detail/PropertyDetailView";

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
      notFound();
    }
    throw err;
  }
}
