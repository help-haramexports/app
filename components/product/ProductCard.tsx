import Link from "next/link";
import { formatMoney, type ShopifyProduct } from "@/lib/shopify";

type ProductCardProps = {
  product: Pick<ShopifyProduct, "id" | "handle" | "title" | "priceRange" | "images">;
  badgeText?: string;
};

export default function ProductCard({
  product,
  badgeText = "Premium",
}: ProductCardProps) {
  const image = product.images.edges[0]?.node;

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white transition-all duration-500 hover:-translate-y-1 hover:border-gray-300 hover:shadow-2xl">
      <Link
        href={`/product/${product.handle}`}
        className="relative block aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100"
      >
        {image ? (
          <img
            src={image.url}
            alt={image.altText || product.title}
            className="absolute inset-0 h-full w-full object-contain p-6 transition-transform duration-700 ease-out group-hover:scale-110"
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-gray-400">
            Image unavailable
          </div>
        )}

        <span className="absolute left-4 top-4 rounded-full bg-gray-900 px-3 py-1.5 text-xs font-bold text-white">
          {badgeText}
        </span>
      </Link>

      <div className="flex flex-1 flex-col gap-4 p-6">
        <Link href={`/product/${product.handle}`}>
          <h3 className="line-clamp-2 text-lg font-bold text-gray-900 transition-colors duration-300 group-hover:text-gray-600">
            {product.title}
          </h3>
        </Link>

        <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-4">
          <div>
            <p className="text-2xl font-extrabold text-gray-900">
              {formatMoney(
                product.priceRange.minVariantPrice.amount,
                product.priceRange.minVariantPrice.currencyCode,
              )}
            </p>
            <p className="mt-1 text-xs text-gray-500">Built for professional riding</p>
          </div>

          <Link
            href={`/product/${product.handle}`}
            className="rounded-lg bg-gray-100 px-5 py-2.5 text-sm font-semibold text-gray-900 transition-all duration-300 hover:bg-gray-900 hover:text-white"
          >
            View Product
          </Link>
        </div>
      </div>
    </article>
  );
}
