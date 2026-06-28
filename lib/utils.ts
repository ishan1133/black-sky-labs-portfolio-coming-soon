import type { ProductCategory } from "@/types/product";

const categoryPaths: Record<ProductCategory, string> = {
  Aircraft: "/aircraft",
  Rockets: "/rockets",
  Missiles: "/missiles",
  Misc: "/misc"
};

export function formatPrice(priceInCents: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(priceInCents / 100);
}

export function getCategoryPath(category: ProductCategory) {
  return categoryPaths[category];
}

export function titleToKicker(category: ProductCategory) {
  return `${category} Collection`;
}
