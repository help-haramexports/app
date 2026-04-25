import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Haram Exports",
  description:
    "Learn about Haram Exports, our leather craftsmanship, and our retail storefront approach.",
};

export default function AboutPage() {
  return (
    <div className="bg-white">
      <section className="border-b border-gray-200 bg-gray-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-gray-500">
            About Haram Exports
          </span>
          <h1 className="mt-4 max-w-4xl text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl">
            Handcrafted equestrian products shaped in Kanpur for riders around the world.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-gray-600">
            We combine deep leather-making experience with modern product standards
            so riders can shop premium gear with confidence across mobile and desktop.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="overflow-hidden rounded-2xl border border-gray-200">
            <img
              src="/images/craftsmanship.png"
              alt="Haram Exports craftsmanship"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Built around quality, comfort, and everyday riding confidence.
            </h2>
            <p className="leading-relaxed text-gray-600">
              From saddle construction to leather finishing, every stage is focused on
              consistency. That matters for every rider who expects dependable feel,
              finish, and long-lasting performance.
            </p>
            <p className="leading-relaxed text-gray-600">
              Our product development process is shaped around fit, durability, and
              presentation, while our Shopify-powered storefront keeps shopping,
              account access, and order updates simple for customers.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                "Handcrafted leather production",
                "Shopify-managed customer accounts",
                "Live retail catalog",
                "Responsive mobile shopping",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4 text-sm font-semibold text-gray-900"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-900 py-16 text-white sm:py-20">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold sm:text-4xl">
            Ready to explore the latest collection?
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg leading-relaxed text-gray-300">
            Browse the live catalog, search products, or jump into your customer account.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/collections/all"
              className="rounded-full bg-white px-6 py-3 font-semibold text-gray-900 transition hover:bg-gray-100"
            >
              Browse Catalog
            </Link>
            <Link
              href="/account"
              className="rounded-full border border-white px-6 py-3 font-semibold text-white transition hover:bg-white hover:text-gray-900"
            >
              My Account
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
