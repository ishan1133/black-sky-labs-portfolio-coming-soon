"use client";

import { useState } from "react";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/types/product";

const sizes = ["S", "M", "L", "XL", "XXL"] as const;

export function ProductPurchasePanel({ product }: { product: Product }) {
  const [size, setSize] = useState<(typeof sizes)[number]>("M");
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="rounded-[34px] border border-black/8 bg-white/90 p-6 shadow-[0_24px_60px_rgba(17,17,17,0.08)] md:p-8">
      <p className="text-[11px] uppercase tracking-[0.35em] text-black/42">
        Portfolio Product
      </p>
      <h1 className="mt-4 text-4xl font-medium tracking-[-0.04em] text-[#111111] md:text-5xl">
        {product.name}
      </h1>
      <p className="mt-4 text-2xl text-black/78">{formatPrice(product.price)}</p>
      <p className="mt-6 max-w-2xl text-base leading-7 text-black/62">
        {product.description} Blueprint technical artwork printed on premium
        heavyweight cotton.
      </p>

      <div className="mt-8 space-y-6">
        <div>
          <p className="mb-3 text-sm text-black/56">Size</p>
          <div className="flex flex-wrap gap-3">
            {sizes.map((entry) => (
              <button
                className={`min-w-14 rounded-full border px-4 py-2 text-sm transition ${
                  entry === size
                    ? "border-black bg-black text-white"
                    : "border-black/12 text-black/70 hover:bg-black/[0.04]"
                }`}
                key={entry}
                onClick={() => setSize(entry)}
                type="button"
              >
                {entry}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-3 text-sm text-black/56">Quantity</p>
          <div className="inline-flex items-center rounded-full border border-black/12">
            <button
              className="px-4 py-2 text-black/60 transition hover:text-black"
              onClick={() => setQuantity((current) => Math.max(1, current - 1))}
              type="button"
            >
              -
            </button>
            <span className="min-w-10 text-center text-sm text-black">
              {quantity}
            </span>
            <button
              className="px-4 py-2 text-black/60 transition hover:text-black"
              onClick={() => setQuantity((current) => current + 1)}
              type="button"
            >
              +
            </button>
          </div>
        </div>

        <div className="rounded-[28px] border border-amber-500/20 bg-amber-50 px-5 py-4 text-sm leading-6 text-amber-900/80">
          This portfolio build does not include a live checkout. Product
          purchasing is intentionally marked as coming soon.
        </div>

        <button
          className="w-full rounded-full bg-black px-5 py-4 text-sm font-medium text-white transition hover:bg-black/88"
          type="button"
        >
          Checkout Coming Soon
        </button>
      </div>

      <div className="mt-8 border-t border-black/8 pt-6">
        <p className="text-sm leading-6 text-black/45">
          Original artwork. Not affiliated with or endorsed by any aerospace
          company, agency, or manufacturer.
        </p>
      </div>
    </div>
  );
}
