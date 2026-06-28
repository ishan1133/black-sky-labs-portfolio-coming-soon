"use client";

import Image from "next/image";
import { useState } from "react";

export function ProductGallery({
  images,
  name
}: {
  images: string[];
  name: string;
}) {
  const [activeImage, setActiveImage] = useState(images[0]);

  return (
    <div className="space-y-4">
      <div className="relative aspect-[4/4.8] overflow-hidden rounded-[30px] border border-black/8 bg-white shadow-[0_24px_60px_rgba(17,17,17,0.08)]">
        <Image
          alt={name}
          className="object-cover"
          fill
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
          src={activeImage}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        {images.map((image) => (
          <button
            className={`relative aspect-[4/4.8] overflow-hidden rounded-[24px] border ${
              activeImage === image ? "border-black/35" : "border-black/10"
            } bg-white shadow-[0_18px_40px_rgba(17,17,17,0.05)]`}
            key={image}
            onClick={() => setActiveImage(image)}
            type="button"
          >
            <Image
              alt={`${name} preview`}
              className="object-cover"
              fill
              sizes="(min-width: 1024px) 20vw, 40vw"
              src={image}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
