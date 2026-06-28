"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";

export function CartPage() {
  const { items, removeItem, subtotal, updateQuantity } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  async function handleCheckout() {
    setIsCheckingOut(true);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ items })
      });

      if (!response.ok) {
        throw new Error("Checkout failed");
      }

      const data = (await response.json()) as { url?: string };

      if (!data.url) {
        throw new Error("Missing checkout URL");
      }

      window.location.href = data.url;
    } catch (error) {
      console.error(error);
      window.alert(
        "Unable to start checkout right now. Verify your Stripe keys and try again."
      );
    } finally {
      setIsCheckingOut(false);
    }
  }

  if (!items.length) {
    return (
      <section className="rounded-[32px] border border-dashed border-white/15 bg-white/[0.03] px-6 py-16 text-center md:px-8">
        <p className="text-[11px] uppercase tracking-[0.35em] text-white/45">
          Cart
        </p>
        <h1 className="mt-4 text-4xl font-medium tracking-[-0.03em] text-white">
          Your cart is empty
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-white/58">
          Explore the collections and add a few blueprint pieces before you
          check out.
        </p>
        <Link
          className="mt-8 inline-flex rounded-full bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-white/85"
          href="/"
        >
          Return Home
        </Link>
      </section>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
      <section className="space-y-4">
        {items.map((item) => {
          const product = products.find((entry) => entry.id === item.productId);

          if (!product) {
            return null;
          }

          return (
            <div
              className="rounded-[28px] border border-white/10 bg-white/[0.03] p-4 md:p-5"
              key={`${item.productId}-${item.size}`}
            >
              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="relative aspect-[4/4.5] w-full overflow-hidden rounded-[24px] bg-[#111] sm:w-44">
                  <Image
                    alt={product.name}
                    className="object-cover"
                    fill
                    sizes="176px"
                    src={product.images[0]}
                  />
                </div>

                <div className="flex flex-1 flex-col justify-between gap-6">
                  <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                    <div>
                      <Link
                        className="text-xl font-medium text-white transition hover:text-white/75"
                        href={`/product/${product.slug}`}
                      >
                        {product.name}
                      </Link>
                      <p className="mt-2 text-sm uppercase tracking-[0.22em] text-white/45">
                        {product.category} / Size {item.size}
                      </p>
                    </div>
                    <p className="text-lg text-white">
                      {formatPrice(product.price * item.quantity)}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="inline-flex items-center rounded-full border border-white/10">
                      <button
                        className="px-4 py-2 text-white/70 transition hover:text-white"
                        onClick={() =>
                          updateQuantity(
                            item.productId,
                            item.size,
                            item.quantity - 1
                          )
                        }
                        type="button"
                      >
                        -
                      </button>
                      <span className="min-w-10 text-center text-sm text-white">
                        {item.quantity}
                      </span>
                      <button
                        className="px-4 py-2 text-white/70 transition hover:text-white"
                        onClick={() =>
                          updateQuantity(
                            item.productId,
                            item.size,
                            item.quantity + 1
                          )
                        }
                        type="button"
                      >
                        +
                      </button>
                    </div>

                    <button
                      className="text-sm text-white/45 transition hover:text-white"
                      onClick={() => removeItem(item.productId, item.size)}
                      type="button"
                    >
                      Remove item
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      <aside className="h-fit rounded-[30px] border border-white/10 bg-white/[0.03] p-6 md:p-8">
        <p className="text-[11px] uppercase tracking-[0.35em] text-white/45">
          Order Summary
        </p>
        <div className="mt-6 space-y-3 border-b border-white/10 pb-6 text-sm text-white/60">
          <div className="flex items-center justify-between">
            <span>Subtotal</span>
            <span className="text-white">{formatPrice(subtotal)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Shipping</span>
            <span className="text-white/40">Calculated by Stripe</span>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <span className="text-sm text-white/60">Estimated total</span>
          <span className="text-2xl text-white">{formatPrice(subtotal)}</span>
        </div>

        <button
          className="mt-8 w-full rounded-full bg-white px-5 py-4 text-sm font-medium text-black transition hover:bg-white/85 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={isCheckingOut}
          onClick={handleCheckout}
          type="button"
        >
          {isCheckingOut ? "Redirecting..." : "Proceed to Checkout"}
        </button>
      </aside>
    </div>
  );
}
