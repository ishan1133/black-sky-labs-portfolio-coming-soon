import { CollectionPage } from "@/components/CollectionPage";
import {
  getCollectionSlides,
  getProductsByCategory
} from "@/data/products";

export default function AircraftPage() {
  return (
    <CollectionPage
      description="Aircraft studies translated into heavyweight everyday pieces, designed for people who love proportions, stealth geometry, and long-span silhouettes."
      products={getProductsByCategory("Aircraft")}
      slides={getCollectionSlides("Aircraft")}
      title="Aircraft"
    />
  );
}
