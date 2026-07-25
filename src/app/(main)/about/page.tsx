import type { Metadata } from "next";
import { AboutHero } from "@/components/about/AboutHero";
import { OurStory } from "@/components/about/OurStory";
import { MissionVision } from "@/components/about/MissionVision";
import { WhyChooseUs } from "@/components/about/WhyChooseUs";
import { TeamSection } from "@/components/about/TeamSection";
import { AboutStats } from "@/components/about/AboutStats";

export const metadata: Metadata = {
  title: "About NestQuest | Our Story & Team",
  description:
    "Learn how NestQuest helps families across Bangladesh find verified homes with trusted agents — our mission, vision, and team.",
};

export default function AboutPage() {
  return (
    <main className="flex-1">
      <AboutHero />
      <OurStory />
      <MissionVision />
      <WhyChooseUs />
      <TeamSection />
      <AboutStats />
    </main>
  );
}
