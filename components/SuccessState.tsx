"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { useCart } from "@/context/CartContext";

export function SuccessState() {
  const { clearCart } = useCart();
  const hasCleared = useRef(false);

  useEffect(() => {
    if (hasCleared.current) {
      return;
    }

    clearCart();
    hasCleared.current = true;
  }, [clearCart]);

  return (
    <section className="rounded-[32px] border border-white/10 bg-white/[0.03] px-6 py-16 text-center md:px-8">
      <p className="text-[11px] uppercase tracking-[0.35em] text-white/45">
        Checkout Complete
      </p>
      <h1 className="mt-4 text-4xl font-medium tracking-[-0.03em] text-white md:text-5xl">
        Thank you for your order
      </h1>
      <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-white/58">
        Your Black Sky Labs order has been handed off to Stripe successfully.
        You can continue exploring the latest blueprint releases below.
      </p>
      <Link
        className="mt-8 inline-flex rounded-full bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-white/85"
        href="/"
      >
        Continue Shopping
      </Link>
    </section>
  );
}
