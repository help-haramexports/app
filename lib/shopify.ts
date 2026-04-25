const apiVersion = "2026-04";

const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN
  ?.replace(/^https?:\/\//, "")
  .replace(/\/$/, "");
const storefrontAccessToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

export const shopifyStoreDomain = domain ?? "";
export const shopifyStoreUrl = domain ? `https://${domain}` : "";
export const shopifyStorefrontApiUrl = domain
  ? `https://${domain}/api/${apiVersion}/graphql.json`
  : "";
export const shopifyStorefrontAccessToken = storefrontAccessToken ?? "";

export type ShopifyMenuItem = {
  title: string;
  url: string;
};

export type ShopifyImage = {
  url: string;
  altText: string | null;
};

export type ShopifyMoney = {
  amount: string;
  currencyCode: string;
};

export type ShopifyProductVariant = {
  id: string;
  title: string;
  availableForSale: boolean;
  price: ShopifyMoney;
  image?: ShopifyImage | null;
};

export type ShopifyProduct = {
  id: string;
  handle: string;
  title: string;
  description?: string;
  descriptionHtml?: string;
  priceRange: {
    minVariantPrice: ShopifyMoney;
  };
  images: {
    edges: Array<{
      node: ShopifyImage;
    }>;
  };
  variants?: {
    edges: Array<{
      node: ShopifyProductVariant;
    }>;
  };
};

export type ShopifyCollection = {
  id: string;
  handle: string;
  title: string;
  description: string;
  image?: ShopifyImage | null;
  products: {
    edges: Array<{
      node: ShopifyProduct;
    }>;
  };
};

export type ShopifyCartLine = {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    price: ShopifyMoney;
    image?: ShopifyImage | null;
    product: {
      title: string;
      handle: string;
    };
  };
};

export type ShopifyCart = {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: {
    subtotalAmount: ShopifyMoney;
    totalAmount: ShopifyMoney;
  };
  lines: {
    edges: Array<{
      node: ShopifyCartLine;
    }>;
  };
};

type ShopifyGraphQLError = {
  message: string;
};

type ShopifyResponse<TData> = {
  data?: TData;
  errors?: ShopifyGraphQLError[];
};

type ShopifyFetchOptions<TVariables> = {
  query: string;
  variables?: TVariables;
  revalidate?: number;
};

export async function shopifyFetch<
  TData,
  TVariables extends Record<string, unknown> = Record<string, never>
>({
  query,
  variables,
  revalidate = 3600,
}: ShopifyFetchOptions<TVariables>): Promise<{
  status: number;
  body: ShopifyResponse<TData>;
}> {
  if (!domain || !storefrontAccessToken) {
    throw new Error(
      "Missing Shopify environment variables. Please set NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN and NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN.",
    );
  }

  const result = await fetch(shopifyStorefrontApiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate },
  });

  const body = (await result.json()) as ShopifyResponse<TData>;

  if (!result.ok) {
    throw new Error(`Shopify request failed with status ${result.status}.`);
  }

  if (body.errors?.length) {
    throw new Error(body.errors.map((error) => error.message).join(" "));
  }

  return {
    status: result.status,
    body,
  };
}

export function normalizeShopifyPath(url: string) {
  if (!url) {
    return "/";
  }

  try {
    const normalizedUrl = url.startsWith("http") ? new URL(url).pathname : url;
    return normalizedUrl.startsWith("/") ? normalizedUrl : `/${normalizedUrl}`;
  } catch {
    return url.startsWith("/") ? url : `/${url}`;
  }
}

export function formatMoney(amount: string | number, currencyCode = "INR") {
  const numericAmount =
    typeof amount === "number" ? amount : Number.parseFloat(amount);

  if (!Number.isFinite(numericAmount)) {
    return "";
  }

  try {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: currencyCode,
      maximumFractionDigits: 0,
    }).format(numericAmount);
  } catch {
    return `${currencyCode} ${numericAmount.toFixed(0)}`;
  }
}

export function getShopifyAccountUrl(path = "/account") {
  if (!shopifyStoreUrl) {
    return path;
  }

  return `${shopifyStoreUrl}${path}`;
}
