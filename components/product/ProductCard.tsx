import Link from "next/link";
import { formatMoney, type ShopifyProduct } from "@/lib/shopify";

type ProductCardProps = {
  product: Pick<ShopifyProduct, "id" | "handle" | "title" | "priceRange" | "images">;
  badgeText?: string;
};

export default function ProductCard({
  product,
  badgeText = "New",
}: ProductCardProps) {
  const image = product.images.edges[0]?.node;

  return (
    <article className="group flex min-w-0 flex-col overflow-hidden rounded-xl border border-gray-200 bg-white transition-all duration-500 hover:-translate-y-1 hover:border-gray-300 hover:shadow-2xl">
      <Link
        href={`/product/${product.handle}`}
        className="relative block aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100"
      >
        {image ? (
          <img
            src={image.url}
            alt={image.altText || product.title}
            className="absolute inset-0 h-full w-full object-contain p-4 transition-transform duration-700 ease-out group-hover:scale-105 sm:p-6"
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-gray-400 sm:text-sm">
            Image unavailable
          </div>
        )}

        <span className="absolute left-3 top-3 rounded-full bg-gray-900 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white sm:left-4 sm:top-4 sm:px-3 sm:py-1.5">
          {badgeText}
        </span>
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-4 sm:gap-4 sm:p-6">
        <Link href={`/product/${product.handle}`}>
          <h3 className="line-clamp-2 text-sm font-bold text-gray-900 transition-colors duration-300 group-hover:text-gray-600 sm:text-lg">
            {product.title}
          </h3>
        </Link>

        <div className="mt-auto flex flex-col gap-3 border-t border-gray-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-base font-extrabold text-gray-900 sm:text-2xl">
              {formatMoney(
                product.priceRange.minVariantPrice.amount,
                product.priceRange.minVariantPrice.currencyCode,
              )}
            </p>
            <p className="mt-1 text-[11px] text-gray-500 sm:text-xs">Ships from our Shopify catalog</p>
          </div>

          <Link
            href={`/product/${product.handle}`}
            className="inline-flex items-center justify-center rounded-lg bg-gray-100 px-3 py-2 text-xs font-semibold text-gray-900 transition-all duration-300 hover:bg-gray-900 hover:text-white sm:px-5 sm:py-2.5 sm:text-sm"
          >
            View Product
          </Link>
        </div>
      </div>
    </article>
  );
}
