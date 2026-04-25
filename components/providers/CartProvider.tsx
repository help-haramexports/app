"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  shopifyStorefrontAccessToken,
  shopifyStorefrontApiUrl,
  type ShopifyCart,
} from "@/lib/shopify";

type CartContextValue = {
  cart: ShopifyCart | null;
  itemCount: number;
  isPending: boolean;
  statusMessage: string | null;
  addLine: (merchandiseId: string, quantity: number) => Promise<boolean>;
  updateLine: (lineId: string, quantity: number) => Promise<void>;
  removeLine: (lineId: string) => Promise<void>;
};

type ShopifyCartMutationResult = {
  cart: ShopifyCart | null;
  userErrors?: Array<{
    message: string;
  }>;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);
const cartStorageKey = "haram-exports-cart-id";

const cartFields = `
  id
  checkoutUrl
  totalQuantity
  cost {
    subtotalAmount {
      amount
      currencyCode
    }
    totalAmount {
      amount
      currencyCode
    }
  }
  lines(first: 50) {
    edges {
      node {
        id
        quantity
        merchandise {
          ... on ProductVariant {
            id
            title
            price {
              amount
              currencyCode
            }
            image {
              url
              altText
            }
            product {
              title
              handle
            }
          }
        }
      }
    }
  }
`;

async function storefrontFetch<TData, TVariables extends Record<string, unknown>>(
  query: string,
  variables: TVariables,
) {
  if (!shopifyStorefrontApiUrl || !shopifyStorefrontAccessToken) {
    throw new Error("Shopify storefront credentials are missing.");
  }

  const response = await fetch(shopifyStorefrontApiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": shopifyStorefrontAccessToken,
    },
    body: JSON.stringify({ query, variables }),
  });

  const body = (await response.json()) as {
    data?: TData;
    errors?: Array<{ message: string }>;
  };

  if (!response.ok) {
    throw new Error(`Shopify cart request failed with status ${response.status}.`);
  }

  if (body.errors?.length) {
    throw new Error(body.errors.map((error) => error.message).join(" "));
  }

  return body.data;
}

function readStoredCartId() {
  if (typeof window === "undefined") {
    return null;
  }

  return window.localStorage.getItem(cartStorageKey);
}

function persistCartId(cartId: string | null) {
  if (typeof window === "undefined") {
    return;
  }

  if (cartId) {
    window.localStorage.setItem(cartStorageKey, cartId);
  } else {
    window.localStorage.removeItem(cartStorageKey);
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<ShopifyCart | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  async function refreshCart(cartId: string) {
    const data = await storefrontFetch<
      { cart: ShopifyCart | null },
      { cartId: string }
    >(
      `
        query getCart($cartId: ID!) {
          cart(id: $cartId) {
            ${cartFields}
          }
        }
      `,
      { cartId },
    );

    return data?.cart ?? null;
  }

  async function handleMutation(
    operation: Promise<ShopifyCartMutationResult | null>,
    successMessage: string,
  ) {
    setIsPending(true);
    setStatusMessage(null);

    try {
      const result = await operation;

      if (!result?.cart) {
        throw new Error("Cart update failed.");
      }

      if (result.userErrors?.length) {
        throw new Error(result.userErrors.map((error) => error.message).join(" "));
      }

      setCart(result.cart);
      persistCartId(result.cart.id);
      setStatusMessage(successMessage);
      return true;
    } catch (error) {
      setStatusMessage(
        error instanceof Error ? error.message : "Unable to update your cart right now.",
      );
      return false;
    } finally {
      setIsPending(false);
    }
  }

  useEffect(() => {
    const storedCartId = readStoredCartId();

    if (!storedCartId) {
      return;
    }

    let isMounted = true;

    async function loadExistingCart(cartId: string) {
      try {
        const existingCart = await refreshCart(cartId);

        if (!isMounted) {
          return;
        }

        if (!existingCart) {
          persistCartId(null);
          setCart(null);
          return;
        }

        setCart(existingCart);
      } catch {
        if (isMounted) {
          persistCartId(null);
          setCart(null);
        }
      }
    }

    loadExistingCart(storedCartId);

    return () => {
      isMounted = false;
    };
  }, []);

  async function addLine(merchandiseId: string, quantity: number) {
    if (!merchandiseId || quantity < 1) {
      setStatusMessage("This item is currently unavailable.");
      return false;
    }

    if (cart?.id) {
      return handleMutation(
        storefrontFetch<
          { cartLinesAdd: ShopifyCartMutationResult },
          {
            cartId: string;
            lines: Array<{ merchandiseId: string; quantity: number }>;
          }
        >(
          `
            mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
              cartLinesAdd(cartId: $cartId, lines: $lines) {
                cart {
                  ${cartFields}
                }
                userErrors {
                  message
                }
              }
            }
          `,
          {
            cartId: cart.id,
            lines: [{ merchandiseId, quantity }],
          },
        ).then((data) => data?.cartLinesAdd ?? null),
        "Added to cart.",
      );
    }

    return handleMutation(
      storefrontFetch<
        { cartCreate: ShopifyCartMutationResult },
        {
          input: {
            lines: Array<{ merchandiseId: string; quantity: number }>;
          };
        }
      >(
        `
          mutation cartCreate($input: CartInput) {
            cartCreate(input: $input) {
              cart {
                ${cartFields}
              }
              userErrors {
                message
              }
            }
          }
        `,
        {
          input: {
            lines: [{ merchandiseId, quantity }],
          },
        },
      ).then((data) => data?.cartCreate ?? null),
      "Added to cart.",
    );
  }

  async function updateLine(lineId: string, quantity: number) {
    if (!cart?.id) {
      return;
    }

    if (quantity < 1) {
      await removeLine(lineId);
      return;
    }

    await handleMutation(
      storefrontFetch<
        { cartLinesUpdate: ShopifyCartMutationResult },
        {
          cartId: string;
          lines: Array<{ id: string; quantity: number }>;
        }
      >(
        `
          mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
            cartLinesUpdate(cartId: $cartId, lines: $lines) {
              cart {
                ${cartFields}
              }
              userErrors {
                message
              }
            }
          }
        `,
        {
          cartId: cart.id,
          lines: [{ id: lineId, quantity }],
        },
      ).then((data) => data?.cartLinesUpdate ?? null),
      "Cart updated.",
    );
  }

  async function removeLine(lineId: string) {
    if (!cart?.id) {
      return;
    }

    await handleMutation(
      storefrontFetch<
        { cartLinesRemove: ShopifyCartMutationResult },
        {
          cartId: string;
          lineIds: string[];
        }
      >(
        `
          mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
            cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
              cart {
                ${cartFields}
              }
              userErrors {
                message
              }
            }
          }
        `,
        {
          cartId: cart.id,
          lineIds: [lineId],
        },
      ).then((data) => data?.cartLinesRemove ?? null),
      "Item removed from cart.",
    );
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        itemCount: cart?.totalQuantity ?? 0,
        isPending,
        statusMessage,
        addLine,
        updateLine,
        removeLine,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartProvider.");
  }

  return context;
}
