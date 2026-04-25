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
  const productHref = `/product/${product.handle}`;

  return (
    <article className="group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-stone-200 bg-stone-50 shadow-[0_12px_32px_rgba(15,23,42,0.06)] transition-all duration-500 hover:-translate-y-1 hover:border-stone-300 hover:shadow-[0_18px_44px_rgba(15,23,42,0.1)]">
      <Link
        href={productHref}
        className="relative block aspect-square overflow-hidden border-b border-stone-200 bg-white"
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

        <span className="absolute left-3 top-3 rounded-full border border-stone-200 bg-white/95 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-gray-900 shadow-sm sm:left-4 sm:top-4 sm:px-3 sm:py-1.5">
          {badgeText}
        </span>
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-4 sm:gap-4 sm:p-5">
        <Link href={productHref}>
          <h3 className="min-h-[2.75rem] line-clamp-2 text-sm font-bold text-gray-900 transition-colors duration-300 group-hover:text-gray-600 sm:min-h-[3rem] sm:text-base">
            {product.title}
          </h3>
        </Link>

        <div className="mt-auto flex items-end justify-between gap-3 border-t border-stone-200 pt-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gray-500">
              Retail Price
            </p>
            <p className="mt-1 text-base font-extrabold text-gray-900 sm:text-xl">
              {formatMoney(
                product.priceRange.minVariantPrice.amount,
                product.priceRange.minVariantPrice.currencyCode,
              )}
            </p>
            <p className="mt-1 text-[11px] text-gray-500 sm:text-xs">
              Live Shopify listing
            </p>
          </div>

          <Link
            href={productHref}
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-stone-200 bg-white text-gray-900 transition-all duration-300 hover:border-gray-900 hover:bg-gray-900 hover:text-white"
            aria-label={`View ${product.title}`}
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 17L17 7m0 0H9m8 0v8"
              />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
}
