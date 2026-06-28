"use client";
import { assetPath } from "@/lib/paths";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { CloseIcon } from "@/components/Icons";
import { formatPrice } from "@/lib/utils";

export function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    subtotal,
    updateQuantity
  } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  async function handleCheckout() {
    if (!items.length) {
      return;
    }

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

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/70 backdrop-blur-sm transition ${
          isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={closeCart}
      />

      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col border-l border-white/10 bg-[#0a0a0a] transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-5">
          <div>
            <p className="text-sm font-medium text-white">Cart</p>
            <p className="text-xs uppercase tracking-[0.22em] text-white/45">
              Ready for checkout
            </p>
          </div>
          <button
            aria-label="Close cart"
            className="rounded-full border border-white/10 p-2 text-white/75 transition hover:bg-white/5 hover:text-white"
            onClick={closeCart}
            type="button"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5">
          {items.length ? (
            <div className="space-y-4">
              {items.map((item) => {
                const product = products.find((entry) => entry.id === item.productId);

                if (!product) {
                  return null;
                }

                return (
                  <div
                    className="rounded-[24px] border border-white/10 bg-white/[0.03] p-4"
                    key={`${item.productId}-${item.size}`}
                  >
                    <div className="flex gap-4">
                      <div className="relative h-24 w-20 overflow-hidden rounded-2xl bg-[#151515]">
                        <Image
                          alt={product.name}
                          className="object-cover"
                          fill
                          sizes="80px"
                          src={assetPath(product.images[0])}
                        />
                      </div>

                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          <Link
                            className="text-sm font-medium text-white transition hover:text-white/75"
                            href={`/product/${product.slug}`}
                            onClick={closeCart}
                          >
                            {product.name}
                          </Link>
                          <p className="mt-1 text-xs uppercase tracking-[0.2em] text-white/45">
                            Size {item.size}
                          </p>
                        </div>

                        <div className="flex items-center justify-between gap-3">
                          <div className="inline-flex items-center rounded-full border border-white/10">
                            <button
                              className="px-3 py-1.5 text-white/70 transition hover:text-white"
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
                            <span className="min-w-8 text-center text-sm text-white">
                              {item.quantity}
                            </span>
                            <button
                              className="px-3 py-1.5 text-white/70 transition hover:text-white"
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

                          <div className="text-right">
                            <p className="text-sm font-medium text-white">
                              {formatPrice(product.price * item.quantity)}
                            </p>
                            <button
                              className="mt-1 text-xs text-white/45 transition hover:text-white/80"
                              onClick={() => removeItem(item.productId, item.size)}
                              type="button"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="rounded-[28px] border border-dashed border-white/15 bg-white/[0.03] p-8 text-center">
              <p className="text-lg font-medium text-white">Your cart is empty.</p>
              <p className="mt-3 text-sm leading-6 text-white/55">
                Add a blueprint tee to start your checkout session.
              </p>
              <Link
                className="mt-6 inline-flex rounded-full bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-white/85"
                href="/"
                onClick={closeCart}
              >
                Continue Shopping
              </Link>
            </div>
          )}
        </div>

        <div className="border-t border-white/10 px-5 py-5">
          <div className="mb-4 flex items-center justify-between text-sm text-white/60">
            <span>Subtotal</span>
            <span className="text-lg font-medium text-white">
              {formatPrice(subtotal)}
            </span>
          </div>
          <button
            className="w-full rounded-full bg-white px-5 py-3.5 text-sm font-medium text-black transition hover:bg-white/85 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={!items.length || isCheckingOut}
            onClick={handleCheckout}
            type="button"
          >
            {isCheckingOut ? "Redirecting..." : "Checkout"}
          </button>
          <Link
            className="mt-3 block text-center text-sm text-white/55 transition hover:text-white"
            href="/cart"
            onClick={closeCart}
          >
            View full cart
          </Link>
        </div>
      </aside>
    </>
  );
}
