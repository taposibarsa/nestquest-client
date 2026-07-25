"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { RemoteImg } from "@/components/ui/RemoteImg";
import "swiper/css";
import "swiper/css/pagination";

const FALLBACK =
  "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80";

export function ImageGallery({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const photos = images.length > 0 ? images : [FALLBACK];
  const [active, setActive] = useState(0);
  const current = Math.min(active, photos.length - 1);

  const go = (delta: number) => {
    setActive((i) => (i + delta + photos.length) % photos.length);
  };

  const thumbIndexes = (() => {
    if (photos.length <= 3) {
      return photos.map((_, i) => i);
    }
    const start = Math.min(Math.max(0, current - 1), photos.length - 3);
    return [start, start + 1, start + 2];
  })();

  return (
    <section aria-label="Property images">
      <div className="relative md:hidden">
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          spaceBetween={0}
          className="overflow-hidden rounded-xl"
          onSlideChange={(s) => setActive(s.activeIndex)}
        >
          {photos.map((src, i) => (
            <SwiperSlide key={`${src}-${i}`}>
              <div className="relative aspect-[4/3] bg-navy/5">
                <RemoteImg
                  src={src}
                  alt={`${title} — image ${i + 1}`}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <span className="absolute right-3 top-3 z-10 rounded-md bg-navy/80 px-2.5 py-1 text-xs font-semibold text-white">
          {current + 1} / {photos.length}
        </span>
      </div>

      <div className="hidden gap-3 md:grid md:grid-cols-5 md:items-stretch">
        <div className="relative col-span-3 aspect-[4/3] overflow-hidden rounded-xl bg-navy/5">
          <RemoteImg
            src={photos[current]}
            alt={`${title} — image ${current + 1}`}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <span className="absolute right-3 top-3 z-10 rounded-md bg-navy/80 px-2.5 py-1 text-xs font-semibold text-white">
            {current + 1} / {photos.length}
          </span>
          {photos.length > 1 ? (
            <>
              <button
                type="button"
                onClick={() => go(-1)}
                className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-navy/70 p-2 text-white hover:bg-navy"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-navy/70 p-2 text-white hover:bg-navy"
                aria-label="Next image"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          ) : null}
        </div>

        <div
          className="col-span-2 grid gap-3"
          style={{
            gridTemplateRows: `repeat(${thumbIndexes.length}, minmax(0, 1fr))`,
          }}
        >
          {thumbIndexes.map((i) => (
            <button
              key={`${photos[i]}-${i}`}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show image ${i + 1} of ${photos.length}`}
              aria-pressed={i === current}
              className={`relative min-h-0 overflow-hidden rounded-xl bg-navy/5 ring-2 transition ${
                i === current
                  ? "ring-amber"
                  : "ring-transparent hover:ring-navy/20"
              }`}
            >
              <RemoteImg
                src={photos[i]}
                alt={`${title} thumbnail ${i + 1}`}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
