import Link from "next/link";
import type { Metadata } from "next";
import ProductCard from "@/components/product/ProductCard";
import { shopifyFetch, type ShopifyProduct } from "@/lib/shopify";

export const metadata: Metadata = {
  title: "Haram Exports | Premium Handcrafted Equestrian Gear & Saddles",
  description:
    "Shop premium handcrafted saddles, riding jackets, and equestrian accessories in a retail storefront powered by Shopify.",
  keywords: [
    "equestrian gear",
    "handcrafted saddles",
    "leather saddles",
    "horse riding gear",
    "premium saddles India",
    "retail equestrian store",
  ],
  authors: [{ name: "Haram Exports" }],
  openGraph: {
    title: "Haram Exports | Excellence in Every Stitch",
    description:
      "Shop premium handcrafted saddles, riding jackets, and equestrian accessories.",
    type: "website",
  },
};

async function getFeaturedProducts(): Promise<ShopifyProduct[]> {
  const query = `
    query getFeaturedProducts {
      products(first: 8, sortKey: UPDATED_AT, reverse: true) {
        edges {
          node {
            id
            title
            handle
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 1) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
            variants(first: 1) {
              edges {
                node {
                  id
                  title
                  availableForSale
                  price {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await shopifyFetch<{
      products: {
        edges: Array<{
          node: ShopifyProduct;
        }>;
      };
    }>({ query });

    return response.body.data?.products.edges.map(({ node }) => node) ?? [];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

const homepageCollections = [
  {
    title: "Professional Saddles",
    href: "/collections/saddles",
    image: "/images/cat-saddles.png",
    description: "Performance builds for daily training and competition.",
  },
  {
    title: "Equestrian Apparel",
    href: "/collections/jackets",
    image: "/images/cat-jackets.png",
    description: "Clean silhouettes and functional riding comfort.",
  },
  {
    title: "Leather Accessories",
    href: "/collections/accessories",
    image: "/images/cat-accessories.png",
    description: "Refined finishing pieces for horse and rider.",
  },
  {
    title: "Full Catalog",
    href: "/collections/all",
    image: "/images/hero-bg.png",
    description: "Browse the latest live products synced from Shopify.",
  },
];

export default async function Home() {
  const products = await getFeaturedProducts();

  return (
    <div className="flex flex-col overflow-x-hidden bg-white">
      <section className="relative flex min-h-[78vh] w-full items-center justify-center overflow-hidden bg-gray-900">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/hero-bg.png')" }}
        >
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="relative z-10 mx-auto flex h-full max-w-5xl flex-col items-center justify-center px-6 py-20 text-center sm:px-8 lg:px-8">
          <span className="mb-4 inline-block text-xs font-bold uppercase tracking-[0.2em] text-white/90 sm:text-sm md:mb-6 md:tracking-[0.3em]">
            Retail Storefront
          </span>
          <h1 className="mb-6 text-4xl font-extrabold leading-tight text-white sm:text-5xl md:mb-8 md:text-7xl">
            Excellence in <br className="block sm:hidden" /> Every Stitch.
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-base font-light leading-relaxed text-gray-200 sm:text-lg md:mb-12 md:text-xl">
            Premium handcrafted saddles and equestrian gear for the global rider.
            Browse, register, and order through our Shopify-powered retail experience.
          </p>
          <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row sm:justify-center">
            <Link
              href="/collections/all"
              className="w-full rounded-md bg-white px-8 py-4 text-sm font-bold text-gray-900 shadow-lg transition-all duration-300 hover:bg-gray-100 md:text-base sm:w-auto"
            >
              Shop All Products
            </Link>
            <Link
              href="/search"
              className="w-full rounded-md border-2 border-white bg-transparent px-8 py-4 text-sm font-bold text-white transition-all duration-300 hover:bg-white hover:text-gray-900 md:text-base sm:w-auto"
            >
              Search Catalog
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-gray-200 bg-gray-50 py-8 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <p className="mb-6 text-xs font-semibold uppercase tracking-widest text-gray-400">
            Loved by riders worldwide
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 opacity-60 grayscale transition-all duration-500 hover:grayscale-0 sm:gap-12">
            <h2 className="font-serif text-2xl font-black text-gray-700 sm:text-3xl">
              EQUUS
            </h2>
            <h2 className="text-2xl font-black text-gray-700 sm:text-3xl">
              RIDER&apos;S CHOICE
            </h2>
            <h2 className="text-2xl font-black tracking-tight text-gray-700 sm:text-3xl">
              GLOBAL EQUESTRIAN
            </h2>
            <h2 className="text-2xl font-black italic text-gray-700 sm:text-3xl">
              Tack & Gear
            </h2>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-3">
            {[
              {
                title: "Worldwide Shipping",
                description: "Tracked logistics via DHL and FedEx.",
                icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
              },
              {
                title: "Secure Checkout",
                description: "Cart and payments are completed through Shopify.",
                icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
              },
              {
                title: "Shopify Customer Accounts",
                description: "Registration, orders, and addresses stay easy to manage.",
                icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex flex-col items-center rounded-lg p-6 transition-colors duration-300 hover:bg-gray-50"
              >
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                  <svg
                    className="h-8 w-8 text-gray-900"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d={item.icon}
                    />
                  </svg>
                </div>
                <h3 className="mb-2 text-sm font-bold uppercase tracking-wider text-gray-900">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <h2 className="mb-3 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Shop by Collection
              </h2>
              <p className="text-base text-gray-500 sm:text-lg">
                Swipe through the main categories and jump straight into the live catalog.
              </p>
            </div>
            <Link
              href="/collections"
              className="hidden text-sm font-semibold text-gray-600 transition hover:text-gray-900 sm:inline-flex"
            >
              View all collections
            </Link>
          </div>

          <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-4 sm:gap-4">
            {homepageCollections.map((category) => (
              <Link
                key={category.href}
                href={category.href}
                className="group relative w-[calc(50%-0.375rem)] min-w-[150px] shrink-0 snap-start overflow-hidden rounded-2xl bg-gray-900 sm:w-[320px] sm:min-w-[320px]"
              >
                <img
                  src={category.image}
                  alt={category.title}
                  className="h-56 w-full object-cover opacity-70 transition-all duration-500 group-hover:scale-110 group-hover:opacity-50 sm:h-80"
                />
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/25 to-transparent p-3 text-white sm:p-6">
                  <h3 className="text-base font-bold sm:text-2xl">{category.title}</h3>
                  <p className="mt-2 max-w-xs text-xs leading-relaxed text-white/80 sm:text-sm">
                    {category.description}
                  </p>
                  <span className="mt-3 inline-flex text-[11px] font-semibold uppercase tracking-[0.18em] text-white/90 sm:mt-4 sm:text-sm sm:tracking-[0.2em]">
                    Explore
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-2 sm:hidden">
            <Link
              href="/collections"
              className="inline-flex text-sm font-semibold text-gray-700 transition hover:text-gray-900"
            >
              View all collections
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="mb-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Featured Gear
              </h2>
              <p className="text-base text-gray-500">
                Fresh products pulled directly from Shopify.
              </p>
            </div>
            <Link
              href="/collections/all"
              className="group inline-flex items-center border-b-2 border-gray-900 pb-1 font-semibold text-gray-900 transition-all duration-300 hover:border-gray-600 hover:text-gray-600"
            >
              View All Products
              <svg
                className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>

          {products.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="rounded-xl bg-gray-50 py-16 text-center">
              <p className="text-lg text-gray-500">
                Products will appear here as soon as Shopify data is available.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="bg-gradient-to-br from-gray-100 to-gray-200 py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                title: "Customer Account Access",
                description:
                  "Secure sign-in keeps saved addresses, order history, and profile details in one familiar customer area.",
                href: "/account",
                cta: "Open account",
              },
              {
                title: "Live Catalog Search",
                description:
                  "Browse saddles, tack, and accessories faster with search connected directly to your current Shopify inventory.",
                href: "/search",
                cta: "Search products",
              },
              {
                title: "Smooth Secure Checkout",
                description:
                  "Add items here and complete payment through Shopify so inventory, checkout, and order handling stay perfectly aligned.",
                href: "/cart",
                cta: "Review cart",
              },
            ].map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="rounded-2xl border border-white/70 bg-white/85 p-8 shadow-[0_16px_40px_rgba(15,23,42,0.06)] transition hover:-translate-y-1 hover:shadow-xl"
              >
                <h2 className="text-2xl font-bold text-gray-900">{item.title}</h2>
                <p className="mt-4 leading-relaxed text-gray-600">{item.description}</p>
                <span className="mt-6 inline-flex items-center text-sm font-semibold text-gray-900">
                  {item.cta}
                  <svg
                    className="ml-2 h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 17L17 7m0 0H9m8 0v8"
                    />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="overflow-hidden bg-gray-900 py-16 text-white sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div className="relative">
              <div className="absolute inset-0 hidden translate-x-3 translate-y-3 rounded-lg border-2 border-gray-700 sm:block md:translate-x-4 md:translate-y-4" />
              <img
                src="/images/craftsmanship.png"
                alt="Leather craftsmanship"
                className="relative z-10 h-96 w-full rounded-lg object-cover brightness-90 contrast-125 lg:h-[500px]"
                loading="lazy"
              />
            </div>

            <div>
              <h2 className="mb-6 text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl">
                The Legacy of Indian Craftsmanship.
              </h2>
              <p className="mb-6 text-lg leading-relaxed text-gray-300">
                Based in the historic leather manufacturing hub of Kanpur, Haram
                Exports combines centuries-old artisanal techniques with modern
                riding comfort and durable finishing.
              </p>
              <p className="mb-8 text-lg leading-relaxed text-gray-300">
                Every saddle is meticulously hand-tooled, rigorously inspected, and
                built to stand up to demanding equestrian routines. The storefront
                stays fast and responsive across mobile and desktop while Shopify
                manages products, customers, and orders.
              </p>
              <Link
                href="/about"
                className="group inline-flex items-center text-lg font-bold text-white transition-all duration-300 hover:text-gray-300"
              >
                Read Our Full Story
                <svg
                  className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="text-base text-gray-500">
              Everything you need to know about our products, accounts, and checkout.
            </p>
          </div>
          <div className="space-y-6">
            {[
              {
                question: "Do you ship internationally?",
                answer:
                  "Yes. We ship globally using trusted logistics partners like DHL and FedEx to ensure safe and timely delivery.",
              },
              {
                question: "How do I track my order?",
                answer:
                  "Sign in through the Shopify customer account flow to review your order status and saved shipping details.",
              },
              {
                question: "Can I create an account before checkout?",
                answer:
                  "Absolutely. Shopify customer accounts handle registration, login, order history, and saved addresses.",
              },
            ].map((item) => (
              <div key={item.question} className="border-b border-gray-200 pb-6">
                <h3 className="mb-3 text-lg font-bold text-gray-900">{item.question}</h3>
                <p className="leading-relaxed text-gray-600">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Trusted by Riders
            </h2>
            <p className="text-base text-gray-500">A few words from customers around the world.</p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "James D.",
                location: "Texas, USA",
                text:
                  "The craftsmanship is absolutely phenomenal. The leather quality exceeded our expectations and the delivery process was smooth.",
              },
              {
                name: "Elena M.",
                location: "Munich, Germany",
                text:
                  "Beautiful stitching, balanced ergonomics, and strong finishing. The saddle performs brilliantly in daily training.",
              },
              {
                name: "David R.",
                location: "Sydney, Australia",
                text:
                  "A clean shopping experience and excellent finish quality. The product looked just as strong in person as it did online.",
              },
            ].map((testimonial) => (
              <div
                key={testimonial.name}
                className="rounded-xl bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-xl"
              >
                <div className="mb-4 flex text-yellow-400">
                  {[...Array(5)].map((_, index) => (
                    <svg key={index} className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="mb-6 italic leading-relaxed text-gray-700">
                  &quot;{testimonial.text}&quot;
                </p>
                <div>
                  <p className="font-bold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
