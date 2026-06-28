import Link from "next/link";
import {
  getFeaturedProducts,
  getNewReleases,
  products
} from "@/data/products";
import { HeroCarousel } from "@/components/HeroCarousel";
import { ProductGrid } from "@/components/ProductGrid";
import { getCategoryPath } from "@/lib/utils";

const heroSlides = [
  {
    title: "Blueprint Apparel, Reframed",
    subtitle:
      "A cleaner Black Sky Labs concept with photoreal shirt mockups, premium spacing, and a portfolio-first presentation.",
    image: "/products/f22-tee-photo.png",
    href: "/aircraft",
    ctaLabel: "Explore Aircraft",
    kicker: "Portfolio Edition"
  },
  {
    title: "Launch Vehicle Capsule",
    subtitle:
      "Technical graphics presented with a brighter, more editorial look inspired by premium hardware storefronts.",
    image: "/products/new-glenn-tee-photo.png",
    href: "/rockets",
    ctaLabel: "Explore Rockets",
    kicker: "Coming Soon"
  },
  {
    title: "Hypersonic Studies",
    subtitle:
      "Same aerospace focus, but tuned as a portfolio-ready concept site rather than a live checkout experience.",
    image: "/products/x51-tee-photo.png",
    href: "/missiles",
    ctaLabel: "View Missiles",
    kicker: "Product Showcase"
  }
];

const featuredProducts = getFeaturedProducts();
const newReleases = getNewReleases();

export default function HomePage() {
  return (
    <div className="space-y-14 pb-10">
      <HeroCarousel slides={heroSlides} />

      <section className="grid gap-5 md:grid-cols-4">
        {(["Aircraft", "Rockets", "Missiles", "Misc"] as const).map(
          (category) => {
            const itemCount = products.filter(
              (product) => product.category === category
            ).length;

            return (
              <Link
                className="rounded-[28px] border border-black/8 bg-white/90 p-6 shadow-[0_18px_40px_rgba(17,17,17,0.05)] transition hover:-translate-y-0.5 hover:border-black/12 hover:bg-white"
                href={getCategoryPath(category)}
                key={category}
              >
                <p className="text-[11px] uppercase tracking-[0.35em] text-black/42">
                  Category
                </p>
                <h2 className="mt-4 text-2xl font-medium tracking-[-0.04em] text-[#111111]">
                  {category}
                </h2>
                <p className="mt-3 text-sm leading-6 text-black/58">
                  {itemCount} engineered graphic{itemCount === 1 ? "" : "s"}
                </p>
              </Link>
            );
          }
        )}
      </section>

      <section className="space-y-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.35em] text-black/42">
              Featured Pieces
            </p>
            <h2 className="mt-3 text-3xl font-medium tracking-[-0.04em] text-[#111111] md:text-4xl">
              Product photography with engineering intent
            </h2>
          </div>
          <Link className="text-sm text-black/60 transition hover:text-black" href="/coming-soon">
            Launch Status
          </Link>
        </div>
        <ProductGrid products={featuredProducts} />
      </section>

      <section className="space-y-8">
        <div>
          <p className="text-[11px] uppercase tracking-[0.35em] text-black/42">
            New Releases
          </p>
          <h2 className="mt-3 text-3xl font-medium tracking-[-0.04em] text-[#111111] md:text-4xl">
            A cleaner concept for a future launch
          </h2>
        </div>
        <ProductGrid products={newReleases} />
      </section>
    </div>
  );
}
