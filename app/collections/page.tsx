import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Collections | Haram Exports",
  description:
    "Browse saddles, riding apparel, and handcrafted leather accessories from Haram Exports.",
};

const collectionCards = [
  {
    title: "Professional Saddles",
    description: "Performance-driven saddle builds for training, show, and retail programs.",
    href: "/collections/saddles",
    image: "/images/cat-saddles.png",
  },
  {
    title: "Equestrian Jackets",
    description: "Structured riding apparel for professional presentation and comfort.",
    href: "/collections/jackets",
    image: "/images/cat-jackets.png",
  },
  {
    title: "Leather Accessories",
    description: "Riding essentials, finishing pieces, and add-ons crafted in premium leather.",
    href: "/collections/accessories",
    image: "/images/cat-accessories.png",
  },
  {
    title: "Full Catalog",
    description: "The latest products available from the connected Shopify storefront.",
    href: "/collections/all",
    image: "/images/hero-bg.png",
  },
];

export default function CollectionsLandingPage() {
  return (
    <div className="bg-white">
      <section className="border-b border-gray-200 bg-gray-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-gray-500">
            Collections
          </span>
          <h1 className="mt-4 max-w-3xl text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl">
            A headless Shopify catalog built for riders, retailers, and distributors.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-600">
            Explore the core product families and jump directly into the collections
            that matter most to your buyers.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          {collectionCards.map((collection) => (
            <Link
              key={collection.href}
              href={collection.href}
              className="group overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className="relative h-72 overflow-hidden bg-gray-100">
                <img
                  src={collection.image}
                  alt={collection.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-8">
                <h2 className="text-2xl font-bold text-gray-900">{collection.title}</h2>
                <p className="mt-3 leading-relaxed text-gray-600">
                  {collection.description}
                </p>
                <span className="mt-6 inline-flex items-center text-sm font-semibold text-gray-900">
                  Explore collection
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
