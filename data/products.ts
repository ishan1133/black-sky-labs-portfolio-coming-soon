import type { Product, ProductCategory } from "@/types/product";

// The storefront catalog is sourced from this local file.
// The admin tool can generate updated TypeScript for this module, but it does
// not write to disk automatically.
export const products: Product[] = [
  {
    id: "f22-blueprint-tee",
    slug: "f22-blueprint-tee",
    name: "F-22 Blueprint Tee",
    category: "Aircraft",
    price: 4200,
    images: ["/products/f22-tee-photo.png"],
    featured: true,
    new: true,
    subtitle: "Low-observable geometry rendered as museum-grade linework.",
    releaseDate: "2026-06-25",
    description:
      "A precision blueprint interpretation of the F-22 silhouette, printed for people who appreciate airframe geometry, panel logic, and clean technical composition.",
    specs: [
      { label: "Material", value: "Premium heavyweight cotton" },
      { label: "Print", value: "Soft-hand high-density blueprint graphic" },
      { label: "Fit", value: "Structured unisex silhouette" },
      { label: "Design", value: "Engineering linework with profile annotations" },
    ]
  },
  {
    id: "b1-lancer-blueprint-tee",
    slug: "b1-lancer-blueprint-tee",
    name: "B-1 Lancer Blueprint Tee",
    category: "Aircraft",
    price: 4200,
    images: ["/products/b1-tee-photo.png"],
    featured: true,
    new: false,
    subtitle: "Variable-sweep bomber contours translated into stark blueprint form.",
    releaseDate: "2026-06-10",
    description:
      "A clean aircraft study built around the B-1's iconic planform, balancing broad wing geometry with a quiet, gallery-like visual system.",
    specs: [
      { label: "Material", value: "Premium heavyweight cotton" },
      { label: "Print", value: "Durable blueprint ink application" },
      { label: "Fit", value: "Relaxed premium cut" },
      { label: "Artwork", value: "Top, side, and datum-line inspired layout" },
    ]
  },
  {
    id: "new-glenn-blueprint-tee",
    slug: "new-glenn-blueprint-tee",
    name: "New Glenn Blueprint Tee",
    category: "Rockets",
    price: 4400,
    images: ["/products/new-glenn-tee-photo.png"],
    featured: true,
    new: true,
    subtitle: "Orbital launch proportions framed through crisp launch-vehicle drafting.",
    releaseDate: "2026-06-22",
    description:
      "Minimal rocket artwork focused on stage architecture, body proportions, and launch-pad drama, rendered with the restraint of a premium industrial print.",
    specs: [
      { label: "Material", value: "Premium heavyweight cotton" },
      { label: "Print", value: "High-contrast technical artwork" },
      { label: "Fit", value: "Tailored casual drape" },
      { label: "Artwork", value: "Launch vehicle profile with grid callouts" },
    ]
  },
  {
    id: "x37b-orbital-blueprint-tee",
    slug: "x37b-orbital-blueprint-tee",
    name: "X-37B Orbital Blueprint Tee",
    category: "Rockets",
    price: 4400,
    images: ["/products/x37b-tee-photo.png"],
    featured: false,
    new: true,
    subtitle: "Compact orbital vehicle artwork with a stealth-lab sensibility.",
    releaseDate: "2026-06-20",
    description:
      "This piece centers the X-37B in a restrained technical composition, mixing orbital craft proportions with blueprint framing cues and archival styling.",
    specs: [
      { label: "Material", value: "Premium heavyweight cotton" },
      { label: "Print", value: "Fine-line orbital vehicle blueprint graphic" },
      { label: "Fit", value: "Modern straight fit" },
      { label: "Artwork", value: "Vehicle profile with mission-inspired details" },
    ]
  },
  {
    id: "x51-waverider-blueprint-tee",
    slug: "x51-waverider-blueprint-tee",
    name: "X-51 Waverider Blueprint Tee",
    category: "Missiles",
    price: 4000,
    images: ["/products/x51-tee-photo.png"],
    featured: true,
    new: false,
    subtitle: "Hypersonic form factor expressed in spare, kinetic linework.",
    releaseDate: "2026-06-05",
    description:
      "A focused study of the X-51 shape, designed for people drawn to high-speed vehicle silhouettes, intake geometry, and disciplined technical art.",
    specs: [
      { label: "Material", value: "Premium heavyweight cotton" },
      { label: "Print", value: "Blueprint technical artwork with soft finish" },
      { label: "Fit", value: "Boxy premium streetwear fit" },
      { label: "Artwork", value: "Hypersonic profile with engineering notes" },
    ]
  },
  {
    id: "hypersonic-engine-blueprint-tee",
    slug: "hypersonic-engine-blueprint-tee",
    name: "Hypersonic Engine Blueprint Tee",
    category: "Misc",
    price: 4000,
    images: ["/products/engine-tee-photo.png"],
    featured: false,
    new: true,
    subtitle: "Cross-sectional propulsion artwork for the lab-minded collector.",
    releaseDate: "2026-06-24",
    description:
      "An engineering-first print built around a speculative hypersonic propulsion study, mixing sectional views, measured spacing, and understated blueprint cues.",
    specs: [
      { label: "Material", value: "Premium heavyweight cotton" },
      { label: "Print", value: "Dense linework with archival technical feel" },
      { label: "Fit", value: "Relaxed, structured premium fit" },
      { label: "Artwork", value: "Section view with propulsion annotations" },
    ]
  }
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
    href: `/product/${product.slug}`,
    ctaLabel: "View Product",
    kicker: `${category} Capsule`
  }));
}
