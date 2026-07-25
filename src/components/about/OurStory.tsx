import { STORY_IMAGE } from "@/components/about/content";
import { RemoteImg } from "@/components/ui/RemoteImg";

export function OurStory() {
  return (
    <section className="bg-off-white py-14 sm:py-16">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-navy/5">
          <RemoteImg
            src={STORY_IMAGE}
            alt="NestQuest team collaborating in a modern office"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
        <div>
          <h2 className="font-display text-3xl font-bold text-navy">
            Our Story
          </h2>
          <div className="mt-4 space-y-4 text-sm leading-relaxed text-charcoal/90 sm:text-base">
            <p>
              NestQuest was founded in 2021 with a simple mission — to make
              property searching in Bangladesh transparent, easy, and accessible
              to everyone. Too many families were forced to rely on incomplete
              Facebook posts, unverified brokers, and word-of-mouth alone.
            </p>
            <p>
              We built a platform where verified residential and commercial
              listings sit side by side with clear prices, photos, and direct
              agent contact. From Gulshan apartments to Chittagong offices,
              seekers can filter by budget, neighbourhood, and listing type in
              minutes.
            </p>
            <p>
              Today NestQuest connects buyers, renters, and agents across major
              cities while staying focused on trust: accurate details, respectful
              communication, and tools that put people in control of their next
              move.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
