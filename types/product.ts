export type ProductCategory = "Aircraft" | "Rockets" | "Missiles" | "Misc";

export type ProductSpec = {
  label: string;
  value: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  price: number;
  images: string[];
  featured: boolean;
  new: boolean;
  description: string;
  specs: ProductSpec[];
  subtitle: string;
  releaseDate: string;
};

export type CartItem = {
  productId: string;
  size: "S" | "M" | "L" | "XL" | "XXL";
  quantity: number;
};
