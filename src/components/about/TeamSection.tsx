import { TEAM } from "@/components/about/content";
import { RemoteImg } from "@/components/ui/RemoteImg";

export function TeamSection() {
  return (
    <section className="bg-white py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h2 className="font-display text-3xl font-bold text-navy">
            Meet the Team
          </h2>
          <p className="mt-2 text-cool-gray">
            The people building NestQuest for Bangladesh.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TEAM.map((member) => (
            <article
              key={member.name}
              className="overflow-hidden rounded-xl border border-navy/10 bg-off-white/40 shadow-sm"
            >
              <div className="relative aspect-square bg-navy/5">
                <RemoteImg
                  src={member.image}
                  alt={member.name}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
              <div className="p-5">
                <h3 className="font-display text-lg font-semibold text-navy">
                  {member.name}
                </h3>
                <p className="text-sm font-medium text-amber">{member.role}</p>
                <p className="mt-2 text-sm text-cool-gray">{member.bio}</p>
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${member.name} on LinkedIn`}
                  className="mt-3 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-navy/10 text-xs font-bold uppercase text-navy transition hover:bg-amber hover:text-navy"
                >
                  in
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
