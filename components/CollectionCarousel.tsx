import { HeroCarousel, type CarouselSlide } from "@/components/HeroCarousel";

export function CollectionCarousel({ slides }: { slides: CarouselSlide[] }) {
  return <HeroCarousel compact slides={slides} />;
}
