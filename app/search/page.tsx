import Link from "next/link";
import type { Metadata } from "next";
import ProductCard from "@/components/product/ProductCard";
import { shopifyFetch, type ShopifyProduct } from "@/lib/shopify";

export const metadata: Metadata = {
  title: "Search | Haram Exports",
  description: "Search the live Shopify catalog for saddles, jackets, and accessories.",
};

type SearchPageProps = {
  searchParams: Promise<{
    q?: string | string[];
  }>;
};

async function searchProducts(searchTerm: string): Promise<ShopifyProduct[]> {
  if (!searchTerm) {
    return [];
  }

  const query = `
    query searchProducts($query: String!) {
      products(first: 18, query: $query, sortKey: RELEVANCE) {
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
    const response = await shopifyFetch<
      {
        products: {
          edges: Array<{
            node: ShopifyProduct;
          }>;
        };
      },
      { query: string }
    >({
      query,
      variables: { query: searchTerm },
      revalidate: 0,
    });

    return response.body.data?.products.edges.map(({ node }) => node) ?? [];
  } catch (error) {
    console.error("Error searching products:", error);
    return [];
  }
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const resolvedSearchParams = await searchParams;
  const rawQuery = resolvedSearchParams.q;
  const query = Array.isArray(rawQuery) ? rawQuery[0] : rawQuery || "";
  const products = await searchProducts(query);

  return (
    <div className="bg-white">
      <section className="border-b border-gray-200 bg-gray-50 py-14 sm:py-18">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-gray-500">
            Search
          </span>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl">
            Find your next riding essential
          </h1>
          <form action="/search" className="mt-8 flex flex-col gap-3 sm:flex-row">
            <input
              type="search"
              name="q"
              defaultValue={query}
              placeholder="Search saddles, jackets, accessories..."
              className="w-full rounded-full border border-gray-300 px-5 py-3 text-sm text-gray-900 outline-none transition focus:border-gray-900"
            />
            <button
              type="submit"
              className="rounded-full bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
            >
              Search
            </button>
          </form>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {query ? (
            <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Results for &quot;{query}&quot;
                </h2>
                <p className="text-gray-500">
                  {products.length} product{products.length === 1 ? "" : "s"} found.
                </p>
              </div>
              <Link
                href="/collections/all"
                className="text-sm font-semibold text-gray-600 transition hover:text-gray-900"
              >
                Browse full catalog
              </Link>
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-6 py-14 text-center">
              <h2 className="text-2xl font-bold text-gray-900">Search the catalog</h2>
              <p className="mt-3 text-gray-500">
                Start with a product name, style, or category.
              </p>
            </div>
          )}

          {query && products.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : null}

          {query && products.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-6 py-14 text-center">
              <h2 className="text-2xl font-bold text-gray-900">No exact matches yet</h2>
              <p className="mt-3 text-gray-500">
                Try another keyword or browse all live listings from Shopify.
              </p>
              <Link
                href="/collections/all"
                className="mt-6 inline-flex rounded-full bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
              >
                Shop all products
              </Link>
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
}
