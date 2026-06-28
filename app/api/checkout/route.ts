import { NextResponse } from "next/server";
import Stripe from "stripe";
import { products } from "@/data/products";
import type { CartItem } from "@/types/product";

type CheckoutBody = {
  items?: CartItem[];
};

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

const stripe = stripeSecretKey
  ? new Stripe(stripeSecretKey)
  : null;

export async function POST(request: Request) {
  if (!stripe) {
    return NextResponse.json(
      { error: "Stripe is not configured." },
      { status: 500 }
    );
  }

  if (!siteUrl) {
    return NextResponse.json(
      { error: "NEXT_PUBLIC_SITE_URL is not configured." },
      { status: 500 }
    );
  }

  try {
    const body = (await request.json()) as CheckoutBody;
    const items = body.items ?? [];

    if (!items.length) {
      return NextResponse.json(
        { error: "Cart is empty." },
        { status: 400 }
      );
    }

    const validatedItems = items.map((item) => {
      const product = products.find((entry) => entry.id === item.productId);

      if (!product) {
        throw new Error(`Invalid product id: ${item.productId}`);
      }

      if (!["S", "M", "L", "XL", "XXL"].includes(item.size)) {
        throw new Error(`Invalid size: ${item.size}`);
      }

      if (!Number.isInteger(item.quantity) || item.quantity < 1 || item.quantity > 10) {
        throw new Error(`Invalid quantity for ${item.productId}`);
      }

      return {
        product,
        quantity: item.quantity,
        size: item.size
      };
    });

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      success_url: `${siteUrl}/success`,
      cancel_url: `${siteUrl}/checkout-cancelled`,
      line_items: validatedItems.map(({ product, quantity, size }) => ({
        quantity,
        price_data: {
          currency: "usd",
          unit_amount: product.price,
          product_data: {
            name: `${product.name} / ${size}`,
            description: product.description
          }
        }
      }))
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Unable to create checkout session." },
      { status: 500 }
    );
  }
}
