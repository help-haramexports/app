import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductCard from "@/components/product/ProductCard";
import {
  shopifyFetch,
  type ShopifyCollection,
  type ShopifyImage,
  type ShopifyProduct,
} from "@/lib/shopify";

type CollectionPageProps = {
  params: Promise<{
    handle: string;
  }>;
};

type CollectionViewModel = {
  title: string;
  handle: string;
  description: string;
  image?: ShopifyImage | null;
  products: ShopifyProduct[];
};

const productCardFields = `
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
`;

async function getCollection(handle: string): Promise<CollectionViewModel | null> {
  if (handle === "all") {
    const query = `
      query getAllProducts {
        products(first: 12, sortKey: UPDATED_AT, reverse: true) {
          edges {
            node {
              ${productCardFields}
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

      return {
        title: "All Products",
        handle: "all",
        description:
          "Browse our latest handcrafted saddles, riding apparel, and leather accessories.",
        products: response.body.data?.products.edges.map(({ node }) => node) ?? [],
      };
    } catch (error) {
      console.error("Error fetching all products:", error);
      return null;
    }
  }

  const query = `
    query getCollection($handle: String!) {
      collection(handle: $handle) {
        id
        handle
        title
        description
        image {
          url
          altText
        }
        products(first: 12, sortKey: BEST_SELLING) {
          edges {
            node {
              ${productCardFields}
            }
          }
        }
      }
    }
  `;

  try {
    const response = await shopifyFetch<
      {
        collection: ShopifyCollection | null;
      },
      { handle: string }
    >({
      query,
      variables: { handle },
    });

    const collection = response.body.data?.collection;

    if (!collection) {
      return null;
    }

    return {
      title: collection.title,
      handle: collection.handle,
      description:
        collection.description ||
        "Premium equestrian gear crafted for everyday training and retail programs.",
      image: collection.image,
      products: collection.products.edges.map(({ node }) => node),
    };
  } catch (error) {
    console.error(`Error fetching collection ${handle}:`, error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: CollectionPageProps): Promise<Metadata> {
  const { handle } = await params;
  const collection = await getCollection(handle);

  if (!collection) {
    return {
      title: "Collection Not Found | Haram Exports",
    };
  }

  return {
    title: `${collection.title} | Haram Exports`,
    description: collection.description,
  };
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { handle } = await params;
  const collection = await getCollection(handle);

  if (!collection) {
    notFound();
  }

  return (
    <div className="bg-white">
      <section className="border-b border-gray-200 bg-gray-50">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8 lg:py-20">
          <div className="flex flex-col justify-center">
            <nav className="mb-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
              <Link href="/" className="transition hover:text-gray-900">
                Home
              </Link>
              <span>/</span>
              <Link href="/collections" className="transition hover:text-gray-900">
                Collections
              </Link>
              <span>/</span>
              <span className="text-gray-900">{collection.title}</span>
            </nav>
            <span className="mb-4 text-xs font-bold uppercase tracking-[0.28em] text-gray-500">
              Curated Product Range
            </span>
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl">
              {collection.title}
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-gray-600">
              {collection.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="rounded-full bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
              >
                Request Wholesale Pricing
              </Link>
              <Link
                href="/collections/all"
                className="rounded-full border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-900 transition hover:border-gray-900"
              >
                Browse Full Catalog
              </Link>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
            {collection.image ? (
              <img
                src={collection.image.url}
                alt={collection.image.altText || collection.title}
                className="h-full max-h-[420px] w-full object-cover"
              />
            ) : (
              <div className="flex h-full min-h-[320px] items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 p-10 text-center">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-gray-500">
                    Haram Exports
                  </p>
                  <p className="mt-4 text-2xl font-bold text-gray-900">
                    Handcrafted leather products built for the global riding market.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
                Products in this collection
              </h2>
              <p className="text-gray-500">
                {collection.products.length} items available from Shopify.
              </p>
            </div>
            <Link
              href="/about"
              className="text-sm font-semibold text-gray-600 transition hover:text-gray-900"
            >
              Learn more about our manufacturing approach
            </Link>
          </div>

          {collection.products.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3">
              {collection.products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-6 py-16 text-center">
              <h3 className="text-xl font-bold text-gray-900">No products published yet</h3>
              <p className="mt-3 text-gray-500">
                This collection is ready, but products have not been pushed from
                Shopify yet.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
