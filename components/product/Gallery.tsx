"use client";

import { useState } from "react";
import type { ShopifyImage } from "@/lib/shopify";

type GalleryProps = {
  images: ShopifyImage[];
  title: string;
};

export default function Gallery({ images, title }: GalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedImage = images[selectedIndex];

  return (
    <div className="space-y-4 lg:sticky lg:top-28">
      <div className="relative aspect-square overflow-hidden rounded-2xl border border-gray-100 bg-gray-50">
        {selectedImage ? (
          <img
            src={selectedImage.url}
            alt={selectedImage.altText || title}
            className="h-full w-full object-contain p-8"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-gray-400">
            No image available
          </div>
        )}
      </div>

      {images.length > 1 ? (
        <div className="grid grid-cols-4 gap-4">
          {images.map((image, index) => (
            <button
              key={`${image.url}-${index}`}
              type="button"
              onClick={() => setSelectedIndex(index)}
              className={`aspect-square overflow-hidden rounded-lg border transition-all ${
                index === selectedIndex
                  ? "border-gray-900 ring-2 ring-gray-900/10"
                  : "border-gray-100 hover:border-gray-300"
              }`}
              aria-label={`View ${title} image ${index + 1}`}
            >
              <img
                src={image.url}
                alt={image.altText || `${title} thumbnail ${index + 1}`}
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
