import type { Product, ProductCategory, ProductSpec } from "@/types/product";

export const productCategories: ProductCategory[] = [
  "Aircraft",
  "Rockets",
  "Missiles",
  "Misc"
];

export const ADMIN_PRODUCTS_STORAGE_KEY = "black-sky-labs-admin-products";

export function createEmptyProduct(): Product {
  const stamp = Date.now();

  return {
    id: `new-product-${stamp}`,
    slug: `new-product-${stamp}`,
    name: "New Blueprint Tee",
    category: "Aircraft",
    price: 4200,
    images: ["/products/f22-01.svg"],
    featured: false,
    new: true,
    subtitle: "Minimal aerospace blueprint artwork.",
    releaseDate: new Date().toISOString().slice(0, 10),
    description:
      "Blueprint technical artwork printed on premium heavyweight cotton.",
    specs: [
      { label: "Material", value: "Premium heavyweight cotton" },
      { label: "Print", value: "Blueprint technical artwork" }
    ]
  };
}

export function cloneProduct(product: Product): Product {
  return {
    ...product,
    images: [...product.images],
    specs: product.specs.map((spec) => ({ ...spec }))
  };
}

function formatSpec(spec: ProductSpec) {
  return `{ label: ${JSON.stringify(spec.label)}, value: ${JSON.stringify(spec.value)} }`;
}

function formatProduct(product: Product) {
  return [
    "  {",
    `    id: ${JSON.stringify(product.id)},`,
    `    slug: ${JSON.stringify(product.slug)},`,
    `    name: ${JSON.stringify(product.name)},`,
    `    category: ${JSON.stringify(product.category)},`,
    `    price: ${product.price},`,
    `    images: [${product.images.map((image) => JSON.stringify(image)).join(", ")}],`,
    `    featured: ${product.featured},`,
    `    new: ${product.new},`,
    `    subtitle: ${JSON.stringify(product.subtitle)},`,
    `    releaseDate: ${JSON.stringify(product.releaseDate)},`,
    "    description:",
    `      ${JSON.stringify(product.description)},`,
    "    specs: [",
    ...product.specs.map((spec) => `      ${formatSpec(spec)},`),
    "    ]",
    "  }"
  ].join("\n");
}

// This export string mirrors /data/products.ts so you can copy it back into the
// real catalog file after editing products locally in /admin.
export function generateProductsModule(products: Product[]) {
  const formattedProducts = products.map(formatProduct).join(",\n");

  return `import type { Product, ProductCategory } from "@/types/product";

// The storefront catalog is sourced from this local file.
// The admin tool can generate updated TypeScript for this module, but it does
// not write to disk automatically.
export const products: Product[] = [
${formattedProducts}
];

// Replace any placeholder path below with a real file in /public/products.
export function getFeaturedProducts() {
  return products.filter((product) => product.featured);
}

export function getNewReleases() {
  return [...products]
    .filter((product) => product.new)
    .sort(
      (a, b) =>
        new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
    );
}

export function getProductsByCategory(category: ProductCategory) {
  return products.filter((product) => product.category === category);
}

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getCollectionSlides(category: ProductCategory) {
  return getProductsByCategory(category).map((product) => ({
    title: product.name,
    subtitle: product.subtitle,
    image: product.images[0],
    href: \`/product/\${product.slug}\`,
    ctaLabel: "View Product",
    kicker: \`\${category} Capsule\`
  }));
}
`;
}

export function isValidProductImagePath(path: string) {
  return /^\/products\/.+\.(png|jpe?g|webp|avif|svg)$/i.test(path.trim());
}

// Later, this helper layer is a natural place to swap local state for a real
// database or CMS-backed API without changing the storefront data shape.
