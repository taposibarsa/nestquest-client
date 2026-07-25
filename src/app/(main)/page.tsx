import type { Metadata } from "next";
import { Suspense } from "react";
import { HeroSection } from "@/components/home/HeroSection";
import { CategorySection } from "@/components/home/CategorySection";
import { FeaturedProperties } from "@/components/home/FeaturedProperties";
import { StatsSection } from "@/components/home/StatsSection";
import { HowItWorks } from "@/components/home/HowItWorks";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { LatestBlogs } from "@/components/home/LatestBlogs";
import { FAQSection } from "@/components/home/FAQSection";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { SkeletonCard } from "@/components/ui/SkeletonCard";

export const metadata: Metadata = {
  title: "NestQuest | Find Your Perfect Home in Bangladesh",
  description:
    "Browse verified residential and commercial listings across Dhaka, Chittagong, and beyond. Search, filter, and connect with agents on NestQuest.",
};

function FeaturedFallback() {
  return (
    <section className="bg-white py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <div className="mx-auto h-8 w-64 animate-pulse rounded bg-navy/10" />
          <div className="mx-auto mt-3 h-4 w-80 animate-pulse rounded bg-navy/10" />
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <main className="flex-1">
      <HeroSection />
      <CategorySection />
      <Suspense fallback={<FeaturedFallback />}>
        <FeaturedProperties />
      </Suspense>
      <StatsSection />
      <HowItWorks />
      <TestimonialsSection />
      <LatestBlogs />
      <FAQSection />
      <NewsletterSection />
    </main>
  );
}
