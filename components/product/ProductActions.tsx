"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/components/providers/CartProvider";

type ProductActionsProps = {
  variantId?: string;
  availableForSale?: boolean;
};

export default function ProductActions({
  variantId,
  availableForSale = true,
}: ProductActionsProps) {
  const [quantity, setQuantity] = useState(1);
  const [localMessage, setLocalMessage] = useState<string | null>(null);
  const { addLine, isPending, statusMessage } = useCart();

  async function handleAddToCart() {
    if (!variantId) {
      setLocalMessage("This product is unavailable right now.");
      return;
    }

    const added = await addLine(variantId, quantity);

    if (added) {
      setLocalMessage("Item added to your cart.");
    }
  }

  const message = localMessage || statusMessage;

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-[auto_1fr]">
        <div className="inline-flex items-center rounded-lg border border-gray-200">
          <button
            type="button"
            className="px-4 py-3 text-gray-600 transition hover:bg-gray-50"
            onClick={() => setQuantity((current) => Math.max(1, current - 1))}
            aria-label="Decrease quantity"
          >
            -
          </button>
          <div className="w-12 border-x border-gray-200 py-3 text-center text-sm font-semibold text-gray-900">
            {quantity}
          </div>
          <button
            type="button"
            className="px-4 py-3 text-gray-600 transition hover:bg-gray-50"
            onClick={() => setQuantity((current) => current + 1)}
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>

        <button
          type="button"
          onClick={handleAddToCart}
          disabled={!variantId || !availableForSale || isPending}
          className="inline-flex items-center justify-center rounded-lg bg-gray-900 px-6 py-4 text-center font-bold text-white transition-all hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-300"
        >
          {availableForSale ? "Add to Cart" : "Out of Stock"}
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Link
          href="/cart"
          className="inline-flex items-center justify-center rounded-lg border-2 border-gray-900 px-6 py-4 text-center font-bold text-gray-900 transition-all hover:bg-gray-50"
        >
          View Cart
        </Link>
        <Link
          href="/collections/all"
          className="inline-flex items-center justify-center rounded-lg border border-gray-200 px-6 py-4 text-center font-semibold text-gray-700 transition-all hover:border-gray-900 hover:text-gray-900"
        >
          Keep Shopping
        </Link>
      </div>

      {message ? (
        <p className="text-sm font-medium text-gray-600" aria-live="polite">
          {message}
        </p>
      ) : null}
    </div>
  );
}
