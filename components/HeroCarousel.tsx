"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRightIcon } from "@/components/Icons";

export type CarouselSlide = {
  title: string;
  subtitle: string;
  image: string;
  href: string;
  ctaLabel: string;
  kicker: string;
};

type HeroCarouselProps = {
  slides: CarouselSlide[];
  compact?: boolean;
};

export function HeroCarousel({
  slides,
  compact = false
}: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCurrentIndex((current) => (current + 1) % slides.length);
    }, 5000);

    return () => window.clearInterval(interval);
  }, [slides.length]);

  return (
    <section
      className={`relative overflow-hidden rounded-[36px] border border-black/8 bg-white/90 shadow-[0_24px_80px_rgba(17,17,17,0.08)] ${
        compact ? "min-h-[420px]" : "min-h-[620px]"
      }`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.9),transparent_38%),linear-gradient(180deg,rgba(250,250,248,0.95),rgba(241,240,235,0.92))]" />
      {slides.map((slide, index) => {
        const active = index === currentIndex;

        return (
          <div
            className={`absolute inset-0 transition-all duration-700 ${
              active
                ? "pointer-events-auto opacity-100"
                : "pointer-events-none opacity-0"
            }`}
            key={`${slide.title}-${index}`}
          >
            <div className="relative grid h-full items-center gap-8 px-6 py-10 md:grid-cols-[0.9fr_1.1fr] md:px-10 md:py-12">
              <div className="order-2 max-w-2xl space-y-5 md:order-1">
                <p className="text-[11px] uppercase tracking-[0.38em] text-black/42">
                  {slide.kicker}
                </p>
                <h1
                  className={`font-medium tracking-[-0.05em] text-[#111111] ${
                    compact ? "text-4xl md:text-5xl" : "text-5xl md:text-7xl"
                  }`}
                >
                  {slide.title}
                </h1>
                <p className="max-w-xl text-base leading-7 text-black/62 md:text-lg">
                  {slide.subtitle}
                </p>
                <Link
                  className="inline-flex items-center gap-3 rounded-full bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-black/88"
                  href={slide.href}
                >
                  {slide.ctaLabel}
                  <ArrowRightIcon className="h-4 w-4" />
                </Link>
              </div>

              <div className="order-1 flex items-center justify-center md:order-2">
                <div
                  className={`relative w-full overflow-hidden rounded-[28px] bg-[#f4f4f1] shadow-[inset_0_0_0_1px_rgba(17,17,17,0.05)] ${
                    compact ? "aspect-[4/3.3]" : "aspect-[4/3]"
                  }`}
                >
                  <Image
                    alt={slide.title}
                    className="object-contain p-4 md:p-8"
                    fill
                    priority={index === 0}
                    sizes="100vw"
                    src={slide.image}
                  />
                </div>
              </div>
            </div>
          </div>
        );
      })}

      <div className="absolute bottom-5 right-5 z-10 flex gap-2">
        {slides.map((slide, index) => (
          <button
            aria-label={`Go to ${slide.title}`}
            className={`h-2.5 rounded-full transition ${
              currentIndex === index ? "w-10 bg-black" : "w-2.5 bg-black/20"
            }`}
            key={slide.title}
            onClick={() => setCurrentIndex(index)}
            type="button"
          />
        ))}
      </div>
    </section>
  );
}
