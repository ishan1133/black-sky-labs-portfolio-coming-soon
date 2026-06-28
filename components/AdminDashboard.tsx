"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { products as seedProducts } from "@/data/products";
import {
  ADMIN_PRODUCTS_STORAGE_KEY,
  cloneProduct,
  createEmptyProduct,
  generateProductsModule,
  isValidProductImagePath,
  productCategories
} from "@/lib/product-admin";
import { formatPrice } from "@/lib/utils";
import type { Product, ProductSpec } from "@/types/product";

function AdminProductPreviewCard({ product }: { product: Product }) {
  const previewImage = product.images[0]?.trim() || "/products/f22-01.svg";

  return (
    <article className="group overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.03] shadow-panel">
      <div className="relative aspect-[4/4.6] overflow-hidden bg-[#111]">
        <Image
          alt={product.name}
          className="object-cover"
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 100vw"
          src={previewImage}
        />
      </div>

      <div className="space-y-5 p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-lg font-medium text-white">{product.name}</p>
            <p className="mt-2 block text-xs uppercase tracking-[0.28em] text-white/45">
              {product.category}
            </p>
          </div>

          <p className="text-sm font-medium text-white">
            {formatPrice(product.price)}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex-1 rounded-full border border-white/15 bg-white px-4 py-3 text-center text-sm font-medium text-black">
            Add to Cart
          </div>

          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-3 text-sm text-white">
            View
          </div>
        </div>
      </div>
    </article>
  );
}

function AdminImagePreview({
  path,
  alt
}: {
  path: string;
  alt: string;
}) {
  const trimmedPath = path.trim();

  if (!trimmedPath) {
    return (
      <div className="flex h-24 items-center justify-center rounded-2xl border border-dashed border-white/10 bg-black/30 px-3 text-center text-xs leading-5 text-white/38">
        Add an image path to preview it here.
      </div>
    );
  }

  if (!isValidProductImagePath(trimmedPath)) {
    return (
      <div className="flex h-24 items-center justify-center rounded-2xl border border-dashed border-amber-500/30 bg-amber-500/10 px-3 text-center text-xs leading-5 text-amber-200/80">
        Use a local path like /products/example-image.png
      </div>
    );
  }

  return (
    <div className="relative h-24 overflow-hidden rounded-2xl border border-white/10 bg-[#111]">
      {/* Swap placeholder art by replacing files inside /public/products. */}
      <Image
        alt={alt}
        className="object-cover"
        fill
        sizes="120px"
        src={trimmedPath}
      />
    </div>
  );
}

function SpecEditor({
  specs,
  onChange
}: {
  specs: ProductSpec[];
  onChange: (nextSpecs: ProductSpec[]) => void;
}) {
  return (
    <div className="space-y-3">
      {specs.map((spec, index) => (
        <div
          className="grid gap-3 rounded-2xl border border-white/10 bg-black/25 p-3 md:grid-cols-[1fr_1fr_auto]"
          key={`${spec.label}-${index}`}
        >
          <input
            className="rounded-2xl border border-white/10 bg-black px-4 py-3 text-sm text-white outline-none transition focus:border-white/30"
            onChange={(event) => {
              const nextSpecs = specs.map((entry, entryIndex) =>
                entryIndex === index
                  ? { ...entry, label: event.target.value }
                  : entry
              );
              onChange(nextSpecs);
            }}
            placeholder="Spec label"
            type="text"
            value={spec.label}
          />
          <input
            className="rounded-2xl border border-white/10 bg-black px-4 py-3 text-sm text-white outline-none transition focus:border-white/30"
            onChange={(event) => {
              const nextSpecs = specs.map((entry, entryIndex) =>
                entryIndex === index
                  ? { ...entry, value: event.target.value }
                  : entry
              );
              onChange(nextSpecs);
            }}
            placeholder="Spec value"
            type="text"
            value={spec.value}
          />
          <button
            className="rounded-2xl border border-white/10 px-4 py-3 text-sm text-white/70 transition hover:bg-white/5 hover:text-white"
            onClick={() =>
              onChange(specs.filter((_, entryIndex) => entryIndex !== index))
            }
            type="button"
          >
            Remove
          </button>
        </div>
      ))}

      <button
        className="rounded-full border border-white/15 px-4 py-2 text-sm text-white transition hover:bg-white/5"
        onClick={() =>
          onChange([...specs, { label: "New spec", value: "Value" }])
        }
        type="button"
      >
        Add Spec
      </button>
    </div>
  );
}

function ProductListItem({
  product,
  isActive,
  onEdit,
  onDelete
}: {
  product: Product;
  isActive: boolean;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <div
      className={`rounded-[26px] border p-4 transition ${
        isActive
          ? "border-white/30 bg-white/[0.08]"
          : "border-white/10 bg-white/[0.03]"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-lg font-medium text-white">{product.name}</p>
          <p className="mt-1 text-xs uppercase tracking-[0.24em] text-white/45">
            {product.category} / {product.slug}
          </p>
          <p className="mt-3 text-sm text-white/60">
            {formatPrice(product.price)} / {product.images.length} image
            {product.images.length === 1 ? "" : "s"}
          </p>
        </div>

        <div className="flex gap-2">
          <button
            className="rounded-full border border-white/10 px-4 py-2 text-sm text-white transition hover:bg-white/5"
            onClick={onEdit}
            type="button"
          >
            Edit
          </button>
          <button
            className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/70 transition hover:border-red-400/30 hover:bg-red-500/10 hover:text-red-200"
            onClick={onDelete}
            type="button"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export function AdminDashboard() {
  const [draftProducts, setDraftProducts] = useState<Product[]>(() =>
    seedProducts.map(cloneProduct)
  );
  const [selectedProductId, setSelectedProductId] = useState<string>(
    seedProducts[0]?.id ?? ""
  );
  const [hasLoadedStorage, setHasLoadedStorage] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const storedProducts = window.localStorage.getItem(
      ADMIN_PRODUCTS_STORAGE_KEY
    );

    if (!storedProducts) {
      setHasLoadedStorage(true);
      return;
    }

    try {
      const parsedProducts = JSON.parse(storedProducts) as Product[];

      if (parsedProducts.length) {
        setDraftProducts(parsedProducts);
        setSelectedProductId(parsedProducts[0].id);
      } else {
        setDraftProducts([]);
        setSelectedProductId("");
      }
    } catch {
      window.localStorage.removeItem(ADMIN_PRODUCTS_STORAGE_KEY);
    } finally {
      setHasLoadedStorage(true);
    }
  }, []);

  useEffect(() => {
    if (!hasLoadedStorage) {
      return;
    }

    window.localStorage.setItem(
      ADMIN_PRODUCTS_STORAGE_KEY,
      JSON.stringify(draftProducts)
    );
  }, [draftProducts, hasLoadedStorage]);

  const selectedProduct =
    draftProducts.find((product) => product.id === selectedProductId) ??
    draftProducts[0] ??
    null;

  const exportedModule = useMemo(
    () => generateProductsModule(draftProducts),
    [draftProducts]
  );

  function updateSelectedProduct(updater: (product: Product) => Product) {
    if (!selectedProduct) {
      return;
    }

    setDraftProducts((currentProducts) =>
      currentProducts.map((product) =>
        product.id === selectedProduct.id ? updater(product) : product
      )
    );
  }

  function handleAddProduct() {
    const nextProduct = createEmptyProduct();
    setDraftProducts((currentProducts) => [nextProduct, ...currentProducts]);
    setSelectedProductId(nextProduct.id);
  }

  function handleDeleteProduct(productId: string) {
    setDraftProducts((currentProducts) => {
      const nextProducts = currentProducts.filter(
        (product) => product.id !== productId
      );

      if (selectedProductId === productId) {
        setSelectedProductId(nextProducts[0]?.id ?? "");
      }

      return nextProducts;
    });
  }

  async function handleCopyExport() {
    await navigator.clipboard.writeText(exportedModule);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  function resetToSeedData() {
    const resetProducts = seedProducts.map(cloneProduct);
    setDraftProducts(resetProducts);
    setSelectedProductId(resetProducts[0]?.id ?? "");
    window.localStorage.removeItem(ADMIN_PRODUCTS_STORAGE_KEY);
  }

  return (
    <div className="space-y-10 pb-10">
      <section className="rounded-[32px] border border-white/10 bg-white/[0.03] p-6 md:p-8">
        <p className="text-[11px] uppercase tracking-[0.35em] text-white/45">
          Local Admin Mode
        </p>
        <h1 className="mt-4 text-4xl font-medium tracking-[-0.03em] text-white md:text-5xl">
          Product editor
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-white/62">
          Edit product-shaped local state, preview how items look, and export a
          ready-to-paste `products.ts` module. Changes here stay in your browser
          until you copy them back into the real catalog file.
        </p>
        <div className="mt-6 rounded-[24px] border border-amber-500/25 bg-amber-500/10 p-4 text-sm leading-6 text-amber-100/85">
          Warning: admin edits are stored locally in `localStorage` unless you
          export them and paste the generated code into `data/products.ts`.
        </div>
      </section>

      <section className="grid gap-8 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-[11px] uppercase tracking-[0.35em] text-white/45">
                Catalog
              </p>
              <h2 className="mt-2 text-2xl font-medium text-white">
                {draftProducts.length} product
                {draftProducts.length === 1 ? "" : "s"}
              </h2>
            </div>
            <div className="flex gap-2">
              <button
                className="rounded-full bg-white px-4 py-2.5 text-sm font-medium text-black transition hover:bg-white/85"
                onClick={handleAddProduct}
                type="button"
              >
                Add Product
              </button>
              <button
                className="rounded-full border border-white/15 px-4 py-2.5 text-sm text-white transition hover:bg-white/5"
                onClick={resetToSeedData}
                type="button"
              >
                Reset Local Edits
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {draftProducts.map((product) => (
              <ProductListItem
                isActive={product.id === selectedProduct?.id}
                key={product.id}
                onDelete={() => handleDeleteProduct(product.id)}
                onEdit={() => setSelectedProductId(product.id)}
                product={product}
              />
            ))}
          </div>
        </div>

        <div className="space-y-6">
          {selectedProduct ? (
            <>
              <section className="rounded-[32px] border border-white/10 bg-white/[0.03] p-6 md:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.35em] text-white/45">
                      Editing
                    </p>
                    <h2 className="mt-2 text-2xl font-medium text-white">
                      {selectedProduct.name}
                    </h2>
                  </div>
                  <span className="rounded-full border border-white/10 px-3 py-1.5 text-xs uppercase tracking-[0.2em] text-white/55">
                    {selectedProduct.category}
                  </span>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <label className="space-y-2">
                    <span className="text-sm text-white/65">Product ID</span>
                    <input
                      className="w-full rounded-2xl border border-white/10 bg-black px-4 py-3 text-sm text-white outline-none transition focus:border-white/30"
                      onChange={(event) => {
                        const nextId = event.target.value;
                        updateSelectedProduct((product) => ({
                          ...product,
                          id: nextId
                        }));
                        setSelectedProductId(nextId);
                      }}
                      type="text"
                      value={selectedProduct.id}
                    />
                  </label>

                  <label className="space-y-2">
                    <span className="text-sm text-white/65">Slug</span>
                    <input
                      className="w-full rounded-2xl border border-white/10 bg-black px-4 py-3 text-sm text-white outline-none transition focus:border-white/30"
                      onChange={(event) =>
                        updateSelectedProduct((product) => ({
                          ...product,
                          slug: event.target.value
                        }))
                      }
                      type="text"
                      value={selectedProduct.slug}
                    />
                  </label>

                  <label className="space-y-2 md:col-span-2">
                    <span className="text-sm text-white/65">Product name</span>
                    <input
                      className="w-full rounded-2xl border border-white/10 bg-black px-4 py-3 text-sm text-white outline-none transition focus:border-white/30"
                      onChange={(event) =>
                        updateSelectedProduct((product) => ({
                          ...product,
                          name: event.target.value
                        }))
                      }
                      type="text"
                      value={selectedProduct.name}
                    />
                  </label>

                  <label className="space-y-2">
                    <span className="text-sm text-white/65">Category</span>
                    <select
                      className="w-full rounded-2xl border border-white/10 bg-black px-4 py-3 text-sm text-white outline-none transition focus:border-white/30"
                      onChange={(event) =>
                        updateSelectedProduct((product) => ({
                          ...product,
                          category: event.target.value as Product["category"]
                        }))
                      }
                      value={selectedProduct.category}
                    >
                      {productCategories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="space-y-2">
                    <span className="text-sm text-white/65">
                      Price in cents
                    </span>
                    <input
                      className="w-full rounded-2xl border border-white/10 bg-black px-4 py-3 text-sm text-white outline-none transition focus:border-white/30"
                      min="0"
                      onChange={(event) =>
                        updateSelectedProduct((product) => ({
                          ...product,
                          price: Number(event.target.value || 0)
                        }))
                      }
                      type="number"
                      value={selectedProduct.price}
                    />
                  </label>

                  <label className="space-y-2">
                    <span className="text-sm text-white/65">Subtitle</span>
                    <input
                      className="w-full rounded-2xl border border-white/10 bg-black px-4 py-3 text-sm text-white outline-none transition focus:border-white/30"
                      onChange={(event) =>
                        updateSelectedProduct((product) => ({
                          ...product,
                          subtitle: event.target.value
                        }))
                      }
                      type="text"
                      value={selectedProduct.subtitle}
                    />
                  </label>

                  <label className="space-y-2">
                    <span className="text-sm text-white/65">Release date</span>
                    <input
                      className="w-full rounded-2xl border border-white/10 bg-black px-4 py-3 text-sm text-white outline-none transition focus:border-white/30"
                      onChange={(event) =>
                        updateSelectedProduct((product) => ({
                          ...product,
                          releaseDate: event.target.value
                        }))
                      }
                      type="date"
                      value={selectedProduct.releaseDate}
                    />
                  </label>

                  <label className="flex items-center justify-between rounded-[24px] border border-white/10 bg-black/20 px-4 py-4">
                    <span className="text-sm text-white/70">Featured item</span>
                    <input
                      checked={selectedProduct.featured}
                      className="h-5 w-5 accent-white"
                      onChange={(event) =>
                        updateSelectedProduct((product) => ({
                          ...product,
                          featured: event.target.checked
                        }))
                      }
                      type="checkbox"
                    />
                  </label>

                  <label className="flex items-center justify-between rounded-[24px] border border-white/10 bg-black/20 px-4 py-4">
                    <span className="text-sm text-white/70">New release</span>
                    <input
                      checked={selectedProduct.new}
                      className="h-5 w-5 accent-white"
                      onChange={(event) =>
                        updateSelectedProduct((product) => ({
                          ...product,
                          new: event.target.checked
                        }))
                      }
                      type="checkbox"
                    />
                  </label>

                  <label className="space-y-2 md:col-span-2">
                    <span className="text-sm text-white/65">Description</span>
                    <textarea
                      className="min-h-32 w-full rounded-[24px] border border-white/10 bg-black px-4 py-3 text-sm text-white outline-none transition focus:border-white/30"
                      onChange={(event) =>
                        updateSelectedProduct((product) => ({
                          ...product,
                          description: event.target.value
                        }))
                      }
                      value={selectedProduct.description}
                    />
                  </label>
                </div>
              </section>

              <section className="rounded-[32px] border border-white/10 bg-white/[0.03] p-6 md:p-8">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.35em] text-white/45">
                      Image Helper
                    </p>
                    <h2 className="mt-2 text-2xl font-medium text-white">
                      Local product image paths
                    </h2>
                  </div>
                </div>

                <div className="mt-4 space-y-2 text-sm leading-6 text-white/62">
                  <p>Place product images inside `public/products`.</p>
                  <p>Use paths like `/products/example-image.png` in the form.</p>
                  <p>Paste image paths directly below to preview them live.</p>
                </div>

                <div className="mt-6 space-y-4">
                  {selectedProduct.images.map((image, index) => (
                    <div
                      className="grid gap-4 rounded-[24px] border border-white/10 bg-black/20 p-4 md:grid-cols-[1fr_220px_auto]"
                      key={`${image}-${index}`}
                    >
                      <div className="space-y-2">
                        <label className="block text-sm text-white/65">
                          Image path {index + 1}
                        </label>
                        <input
                          className="w-full rounded-2xl border border-white/10 bg-black px-4 py-3 text-sm text-white outline-none transition focus:border-white/30"
                          onChange={(event) =>
                            updateSelectedProduct((product) => ({
                              ...product,
                              images: product.images.map((entry, entryIndex) =>
                                entryIndex === index
                                  ? event.target.value
                                  : entry
                              )
                            }))
                          }
                          placeholder="/products/example-image.png"
                          type="text"
                          value={image}
                        />
                      </div>
                      <AdminImagePreview
                        alt={`${selectedProduct.name} preview ${index + 1}`}
                        path={image}
                      />
                      <button
                        className="rounded-2xl border border-white/10 px-4 py-3 text-sm text-white/70 transition hover:bg-white/5 hover:text-white"
                        onClick={() =>
                          updateSelectedProduct((product) => {
                            if (product.images.length === 1) {
                              return {
                                ...product,
                                images: ["/products/f22-01.svg"]
                              };
                            }

                            return {
                              ...product,
                              images: product.images.filter(
                                (_, entryIndex) => entryIndex !== index
                              )
                            };
                          })
                        }
                        type="button"
                      >
                        Remove
                      </button>
                    </div>
                  ))}

                  <button
                    className="rounded-full border border-white/15 px-4 py-2 text-sm text-white transition hover:bg-white/5"
                    onClick={() =>
                      updateSelectedProduct((product) => ({
                        ...product,
                        images: [...product.images, "/products/f22-01.svg"]
                      }))
                    }
                    type="button"
                  >
                    Add Image Path
                  </button>
                </div>
              </section>

              <section className="rounded-[32px] border border-white/10 bg-white/[0.03] p-6 md:p-8">
                <p className="text-[11px] uppercase tracking-[0.35em] text-white/45">
                  Specifications
                </p>
                <h2 className="mt-2 text-2xl font-medium text-white">
                  Product specs
                </h2>
                <div className="mt-6">
                  <SpecEditor
                    onChange={(nextSpecs) =>
                      updateSelectedProduct((product) => ({
                        ...product,
                        specs: nextSpecs
                      }))
                    }
                    specs={selectedProduct.specs}
                  />
                </div>
              </section>

              <section className="rounded-[32px] border border-white/10 bg-white/[0.03] p-6 md:p-8">
                <p className="text-[11px] uppercase tracking-[0.35em] text-white/45">
                  Storefront Preview
                </p>
                <h2 className="mt-2 text-2xl font-medium text-white">
                  Product card preview
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-white/60">
                  This mirrors the storefront card styling without changing cart
                  state, so you can safely preview local edits.
                </p>
                <div className="mt-6 max-w-sm">
                  <AdminProductPreviewCard product={selectedProduct} />
                </div>
              </section>
            </>
          ) : (
            <section className="rounded-[32px] border border-dashed border-white/15 bg-white/[0.03] p-8 text-center">
              <h2 className="text-2xl font-medium text-white">
                No product selected
              </h2>
              <p className="mt-3 text-sm leading-6 text-white/58">
                Add a product or select one from the list to start editing.
              </p>
            </section>
          )}
        </div>
      </section>

      <section className="rounded-[32px] border border-white/10 bg-white/[0.03] p-6 md:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.35em] text-white/45">
              Export
            </p>
            <h2 className="mt-2 text-2xl font-medium text-white">
              Generate `products.ts`
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-white/60">
              The export below recreates the full `data/products.ts` module so
              you can copy and paste it back into the real file when you want
              the storefront routes to use your updated catalog.
            </p>
          </div>
          <button
            className="rounded-full bg-white px-4 py-2.5 text-sm font-medium text-black transition hover:bg-white/85"
            onClick={handleCopyExport}
            type="button"
          >
            {copied ? "Copied" : "Copy Export"}
          </button>
        </div>

        <textarea
          className="mt-6 min-h-[420px] w-full rounded-[24px] border border-white/10 bg-black px-4 py-4 font-mono text-sm leading-6 text-white outline-none"
          readOnly
          value={exportedModule}
        />
      </section>
    </div>
  );
}
