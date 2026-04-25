import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Gallery from "@/components/product/Gallery";
import { formatMoney, shopifyFetch, type ShopifyProduct } from "@/lib/shopify";

type ProductPageProps = {
  params: Promise<{
    handle: string;
  }>;
};

function stripHtml(value: string) {
  return value.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

async function getProduct(handle: string): Promise<ShopifyProduct | null> {
  const query = `
    query getProduct($handle: String!) {
      product(handle: $handle) {
        id
        handle
        title
        description
        descriptionHtml
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        images(first: 6) {
          edges {
            node {
              url
              altText
            }
          }
        }
      }
    }
  `;

  try {
    const response = await shopifyFetch<
      {
        product: ShopifyProduct | null;
      },
      { handle: string }
    >({
      query,
      variables: { handle },
    });

    return response.body.data?.product ?? null;
  } catch (error) {
    console.error(`Error fetching product ${handle}:`, error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { handle } = await params;
  const product = await getProduct(handle);

  if (!product) {
    return { title: "Product Not Found | Haram Exports" };
  }

  const description = stripHtml(product.descriptionHtml || product.description || "");
  const image = product.images.edges[0]?.node.url;

  return {
    title: `${product.title} | Haram Exports`,
    description: description || product.title,
    openGraph: image ? { images: [image] } : undefined,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { handle } = await params;
  const product = await getProduct(handle);

  if (!product) {
    notFound();
  }

  const galleryImages = product.images.edges.map(({ node }) => node);
  const hasRichDescription = Boolean(product.descriptionHtml);
  const fallbackDescription =
    product.description || "Details for this product will be updated shortly.";

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 md:py-20">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <Gallery images={galleryImages} title={product.title} />

          <div className="flex flex-col">
            <nav className="mb-4 flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-gray-400">
              <Link href="/" className="transition hover:text-gray-900">
                Home
              </Link>
              <span>/</span>
              <Link href="/collections/all" className="transition hover:text-gray-900">
                Catalog
              </Link>
              <span>/</span>
              <span className="text-gray-900">Product Detail</span>
            </nav>

            <h1 className="mb-4 text-3xl font-black leading-tight tracking-tight text-gray-900 md:text-5xl">
              {product.title}
            </h1>

            <div className="mb-8 flex flex-wrap items-center gap-4">
              <span className="text-3xl font-extrabold text-gray-900">
                {formatMoney(
                  product.priceRange.minVariantPrice.amount,
                  product.priceRange.minVariantPrice.currencyCode,
                )}
              </span>
              <span className="rounded-full bg-gray-900 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white">
                Premium Leather
              </span>
            </div>

            <div className="mb-8 border-y border-gray-100 py-8">
              <h2 className="mb-4 text-sm font-bold uppercase tracking-[0.24em] text-gray-900">
                Description
              </h2>
              {hasRichDescription ? (
                <div
                  className="prose prose-sm max-w-none leading-relaxed text-gray-600"
                  dangerouslySetInnerHTML={{ __html: product.descriptionHtml || "" }}
                />
              ) : (
                <p className="leading-relaxed text-gray-600">{fallbackDescription}</p>
              )}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-lg bg-gray-900 px-6 py-4 text-center font-bold text-white transition-all hover:bg-gray-800"
              >
                Request a Quote
              </Link>
              <Link
                href="/collections/all"
                className="inline-flex items-center justify-center rounded-lg border-2 border-gray-900 px-6 py-4 text-center font-bold text-gray-900 transition-all hover:bg-gray-50"
              >
                Browse More Products
              </Link>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {[
                {
                  title: "Worldwide Shipping",
                  description: "Reliable dispatch through export-focused logistics partners.",
                },
                {
                  title: "Private Label Ready",
                  description: "Bulk programs, custom branding, and catalog support available.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-gray-100 bg-gray-50 p-5"
                >
                  <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-gray-900">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-gray-600">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
