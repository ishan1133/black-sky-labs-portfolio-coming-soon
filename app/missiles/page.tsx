import { CollectionPage } from "@/components/CollectionPage";
import {
  getCollectionSlides,
  getProductsByCategory
} from "@/data/products";

export default function MissilesPage() {
  return (
    <CollectionPage
      description="High-speed forms, edge cases, and test-article silhouettes captured with clean linework and restrained presentation."
      products={getProductsByCategory("Missiles")}
      slides={getCollectionSlides("Missiles")}
      title="Missiles"
    />
  );
}
