import { CollectionPage } from "@/components/CollectionPage";
import {
  getCollectionSlides,
  getProductsByCategory
} from "@/data/products";

export default function RocketsPage() {
  return (
    <CollectionPage
      description="Launch vehicles and orbital craft framed through a premium minimal lens, with blueprint cues that feel archival instead of loud."
      products={getProductsByCategory("Rockets")}
      slides={getCollectionSlides("Rockets")}
      title="Rockets"
    />
  );
}
