import { CollectionPage } from "@/components/CollectionPage";
import {
  getCollectionSlides,
  getProductsByCategory
} from "@/data/products";

export default function MiscPage() {
  return (
    <CollectionPage
      description="Cross-sections, propulsion studies, and lab-floor curiosities for the part of the collection that lives between categories."
      products={getProductsByCategory("Misc")}
      slides={getCollectionSlides("Misc")}
      title="Misc"
    />
  );
}
