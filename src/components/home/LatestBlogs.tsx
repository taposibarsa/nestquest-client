import Link from "next/link";
import { BLOGS } from "@/components/home/content";
import { RemoteImg } from "@/components/ui/RemoteImg";
import { Badge } from "@/components/ui/Badge";

export function LatestBlogs() {
  return (
    <section className="bg-off-white py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h2 className="font-display text-3xl font-bold text-navy">
            Latest from the NestQuest Blog
          </h2>
          <p className="mt-2 text-cool-gray">
            Practical guides for buyers, renters, and first-time owners.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {BLOGS.map((post) => (
            <article
              key={post.title}
              className="flex flex-col overflow-hidden rounded-xl border border-navy/10 bg-white shadow-sm"
            >
              <div className="relative aspect-[16/10] bg-navy/5">
                <RemoteImg
                  src={post.image}
                  alt={post.title}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <div className="mb-2 flex items-center gap-2">
                  <Badge variant="amber">{post.category}</Badge>
                  <time className="text-xs text-cool-gray">{post.date}</time>
                </div>
                <h3 className="font-display text-lg font-semibold text-navy line-clamp-2">
                  {post.title}
                </h3>
                <p className="mt-2 flex-1 text-sm text-cool-gray line-clamp-3">
                  {post.excerpt}
                </p>
                <Link
                  href="/about"
                  className="mt-4 text-sm font-semibold text-sage hover:underline"
                >
                  About NestQuest →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
