"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { Star } from "lucide-react";
import { TESTIMONIALS } from "@/components/home/content";
import { RemoteImg } from "@/components/ui/RemoteImg";
import "swiper/css";
import "swiper/css/pagination";

export function TestimonialsSection() {
  return (
    <section className="bg-white py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h2 className="font-display text-3xl font-bold text-navy">
            What Our Clients Say
          </h2>
          <p className="mt-2 text-cool-gray">
            Real stories from homeowners and renters across Bangladesh.
          </p>
        </div>

        <Swiper
          modules={[Autoplay, Pagination]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 4500, disableOnInteraction: false }}
          spaceBetween={20}
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="!pb-12"
        >
          {TESTIMONIALS.map((t) => (
            <SwiperSlide key={t.name} className="h-auto">
              <article className="flex h-full flex-col rounded-xl border border-navy/10 bg-off-white/60 p-6 shadow-sm">
                <div className="mb-4 flex items-center gap-3">
                  <RemoteImg
                    src={t.avatar}
                    alt={t.name}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-navy">{t.name}</p>
                    <p className="text-xs text-cool-gray">{t.location}</p>
                  </div>
                </div>
                <div className="mb-3 flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-amber text-amber"
                      aria-hidden
                    />
                  ))}
                </div>
                <p className="text-sm leading-relaxed text-charcoal/90">
                  “{t.text}”
                </p>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
