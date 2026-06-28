"use client";
import { assetPath } from "@/lib/paths";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@/components/Icons";
import { formatPrice, getCategoryPath } from "@/lib/utils";
import type { Product } from "@/types/product";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group overflow-hidden rounded-[30px] border border-black/8 bg-white/90 shadow-[0_24px_60px_rgba(17,17,17,0.08)]">
      <Link className="block" href={`/product/${product.slug}`}>
        <div className="relative aspect-[4/4.5] overflow-hidden bg-[#f3f2ee]">
          <Image
            alt={product.name}
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 100vw"
            src={assetPath(product.images[0])}
          />
        </div>
      </Link>

      <div className="space-y-5 p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <Link
              className="text-lg font-medium text-[#111111] transition hover:text-black/70"
              href={`/product/${product.slug}`}
            >
              {product.name}
            </Link>
            <Link
              className="mt-2 block text-xs uppercase tracking-[0.28em] text-black/40 transition hover:text-black/65"
              href={getCategoryPath(product.category)}
            >
              {product.category}
            </Link>
          </div>

          <p className="text-sm font-medium text-black/78">
            {formatPrice(product.price)}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex-1 rounded-full bg-black px-4 py-3 text-center text-sm font-medium text-white">
            Coming Soon
          </div>

          <Link
            className="inline-flex items-center gap-2 rounded-full border border-black/10 px-4 py-3 text-sm text-black transition hover:bg-black/[0.04]"
            href={`/product/${product.slug}`}
          >
            Details
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
