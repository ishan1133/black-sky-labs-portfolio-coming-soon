import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductGallery } from "@/components/ProductGallery";
import { ProductPurchasePanel } from "@/components/ProductPurchasePanel";
import {
  getProductBySlug,
  products
} from "@/data/products";

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug
  }));
}

export async function generateMetadata({
  params
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found | Black Sky Labs"
    };
  }

  return {
    title: `${product.name} | Black Sky Labs`,
    description: product.description
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
      <ProductGallery images={product.images} name={product.name} />

      <div className="space-y-8">
        <ProductPurchasePanel product={product} />

        <section className="rounded-[30px] border border-black/8 bg-white/90 p-6 shadow-[0_24px_60px_rgba(17,17,17,0.08)] md:p-8">
          <p className="text-[11px] uppercase tracking-[0.35em] text-black/42">
            Specifications
          </p>
          <div className="mt-6 divide-y divide-black/8">
            {product.specs.map((spec) => (
              <div
                className="flex flex-col gap-2 py-4 md:flex-row md:items-center md:justify-between"
                key={spec.label}
              >
                <span className="text-sm uppercase tracking-[0.2em] text-black/42">
                  {spec.label}
                </span>
                <span className="text-sm text-black/80">{spec.value}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
