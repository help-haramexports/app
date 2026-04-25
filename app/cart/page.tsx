"use client";

import Link from "next/link";
import { formatMoney } from "@/lib/shopify";
import { useCart } from "@/components/providers/CartProvider";

export default function CartPage() {
  const { cart, itemCount, isPending, removeLine, updateLine, statusMessage } = useCart();
  const lines = cart?.lines.edges.map(({ node }) => node) ?? [];

  return (
    <div className="bg-white">
      <section className="border-b border-gray-200 bg-gray-50 py-14 sm:py-18">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-gray-500">
            Shopping Cart
          </span>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl">
            Your cart
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-gray-600">
            Review your items and continue securely to Shopify checkout.
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1.3fr_0.7fr] lg:px-8">
          <div className="space-y-4">
            {lines.length > 0 ? (
              lines.map((line) => (
                <article
                  key={line.id}
                  className="grid grid-cols-[96px_1fr] gap-4 rounded-2xl border border-gray-200 p-4 sm:grid-cols-[120px_1fr]"
                >
                  <div className="overflow-hidden rounded-xl bg-gray-50">
                    {line.merchandise.image ? (
                      <img
                        src={line.merchandise.image.url}
                        alt={
                          line.merchandise.image.altText ||
                          line.merchandise.product.title
                        }
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full min-h-24 items-center justify-center text-xs text-gray-400">
                        No image
                      </div>
                    )}
                  </div>

                  <div className="flex min-w-0 flex-col gap-4">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <Link
                          href={`/product/${line.merchandise.product.handle}`}
                          className="line-clamp-2 text-base font-bold text-gray-900 hover:text-gray-700"
                        >
                          {line.merchandise.product.title}
                        </Link>
                        <p className="text-sm text-gray-500">{line.merchandise.title}</p>
                      </div>
                      <p className="text-base font-bold text-gray-900">
                        {formatMoney(
                          line.merchandise.price.amount,
                          line.merchandise.price.currencyCode,
                        )}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <div className="inline-flex items-center rounded-lg border border-gray-200">
                        <button
                          type="button"
                          className="px-3 py-2 text-gray-600 transition hover:bg-gray-50"
                          onClick={() => updateLine(line.id, line.quantity - 1)}
                          aria-label="Decrease line quantity"
                        >
                          -
                        </button>
                        <div className="w-10 border-x border-gray-200 py-2 text-center text-sm font-semibold text-gray-900">
                          {line.quantity}
                        </div>
                        <button
                          type="button"
                          className="px-3 py-2 text-gray-600 transition hover:bg-gray-50"
                          onClick={() => updateLine(line.id, line.quantity + 1)}
                          aria-label="Increase line quantity"
                        >
                          +
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeLine(line.id)}
                        className="text-sm font-semibold text-gray-500 transition hover:text-gray-900"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-6 py-16 text-center">
                <h2 className="text-2xl font-bold text-gray-900">Your cart is empty</h2>
                <p className="mt-3 text-gray-500">
                  Start with the newest products from the live Shopify catalog.
                </p>
                <Link
                  href="/collections/all"
                  className="mt-6 inline-flex rounded-full bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
                >
                  Shop the collection
                </Link>
              </div>
            )}
          </div>

          <aside className="rounded-3xl border border-gray-200 bg-gray-50 p-6">
            <h2 className="text-xl font-bold text-gray-900">Order summary</h2>
            <div className="mt-6 space-y-4 text-sm text-gray-600">
              <div className="flex items-center justify-between">
                <span>Items</span>
                <span className="font-semibold text-gray-900">{itemCount}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-gray-900">
                  {cart
                    ? formatMoney(
                        cart.cost.subtotalAmount.amount,
                        cart.cost.subtotalAmount.currencyCode,
                      )
                    : formatMoney(0)}
                </span>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4 text-base">
                <span className="font-semibold text-gray-900">Estimated total</span>
                <span className="font-bold text-gray-900">
                  {cart
                    ? formatMoney(
                        cart.cost.totalAmount.amount,
                        cart.cost.totalAmount.currencyCode,
                      )
                    : formatMoney(0)}
                </span>
              </div>
            </div>

            <a
              href={cart?.checkoutUrl || "#"}
              className={`mt-8 inline-flex w-full items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-white transition ${
                cart?.checkoutUrl
                  ? "bg-gray-900 hover:bg-gray-800"
                  : "pointer-events-none bg-gray-300"
              }`}
            >
              Checkout with Shopify
            </a>

            <Link
              href="/search"
              className="mt-3 inline-flex w-full items-center justify-center rounded-full border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-900 transition hover:border-gray-900"
            >
              Continue Shopping
            </Link>

            {statusMessage ? (
              <p className="mt-4 text-sm font-medium text-gray-500" aria-live="polite">
                {statusMessage}
              </p>
            ) : null}

            {isPending ? (
              <p className="mt-2 text-sm text-gray-400" aria-live="polite">
                Updating your cart...
              </p>
            ) : null}
          </aside>
        </div>
      </section>
    </div>
  );
}
