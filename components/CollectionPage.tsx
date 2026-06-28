"use client";

import { useState } from "react";
import { CollectionCarousel } from "@/components/CollectionCarousel";
import { ChevronIcon } from "@/components/Icons";
import { ProductGrid } from "@/components/ProductGrid";
import type { CarouselSlide } from "@/components/HeroCarousel";
import type { Product } from "@/types/product";

type SortValue = "newest" | "price-asc" | "price-desc";

export function CollectionPage({
  title,
  description,
  slides,
  products
}: {
  title: string;
  description: string;
  slides: CarouselSlide[];
  products: Product[];
}) {
  const [sortValue, setSortValue] = useState<SortValue>("newest");

  const sortedProducts = [...products].sort((a, b) => {
    if (sortValue === "price-asc") {
      return a.price - b.price;
    }

    if (sortValue === "price-desc") {
      return b.price - a.price;
    }

    return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime();
  });

  return (
    <div className="space-y-12">
      <CollectionCarousel slides={slides} />

      <section className="rounded-[32px] border border-black/8 bg-white/90 p-6 shadow-[0_24px_60px_rgba(17,17,17,0.06)] md:p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-[11px] uppercase tracking-[0.35em] text-black/42">
              Collection
            </p>
            <h1 className="mt-4 text-4xl font-medium tracking-[-0.04em] text-[#111111] md:text-5xl">
              {title}
            </h1>
            <p className="mt-4 text-base leading-7 text-black/60">
              {description}
            </p>
          </div>

          <div className="relative">
            <select
              aria-label="Sort products"
              className="appearance-none rounded-full border border-black/10 bg-white px-5 py-3 pr-11 text-sm text-black outline-none transition focus:border-black/25"
              onChange={(event) => setSortValue(event.target.value as SortValue)}
              value={sortValue}
            >
              <option value="newest">Newest</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
            <ChevronIcon className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-black/45" />
          </div>
        </div>
      </section>

      <ProductGrid products={sortedProducts} />
    </div>
  );
}
