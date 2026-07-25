import { HERO_IMAGE } from "@/components/about/content";
import { RemoteImg } from "@/components/ui/RemoteImg";

export function AboutHero() {
  return (
    <section className="relative flex min-h-[40vh] items-center justify-center overflow-hidden">
      <RemoteImg
        src={HERO_IMAGE}
        alt="NestQuest team collaborating in a bright office"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-navy/75" aria-hidden />
      <div className="relative z-10 px-4 py-16 text-center text-white">
        <h1 className="font-display text-4xl font-bold sm:text-5xl">
          About NestQuest
        </h1>
        <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-amber" />
        <p className="mx-auto mt-4 max-w-xl text-base text-white/85 sm:text-lg">
          Making property search in Bangladesh transparent, easy, and accessible.
        </p>
      </div>
    </section>
  );
}
