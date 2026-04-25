import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { shopifyFetch } from "@/lib/shopify";

type PolicyPageProps = {
  params: Promise<{
    handle: string;
  }>;
};

type ShopifyPolicy = {
  title: string;
  body: string;
  url: string;
};

const policyFieldMap = {
  "privacy-policy": "privacyPolicy",
  "refund-policy": "refundPolicy",
  "terms-of-service": "termsOfService",
  "shipping-policy": "shippingPolicy",
} as const;

async function getPolicy(handle: string): Promise<ShopifyPolicy | null> {
  const field = policyFieldMap[handle as keyof typeof policyFieldMap];

  if (!field) {
    return null;
  }

  const query = `
    query getPolicies {
      shop {
        privacyPolicy {
          title
          body
          url
        }
        refundPolicy {
          title
          body
          url
        }
        termsOfService {
          title
          body
          url
        }
        shippingPolicy {
          title
          body
          url
        }
      }
    }
  `;

  try {
    const response = await shopifyFetch<{
      shop: Record<string, ShopifyPolicy | null> | null;
    }>({ query });

    return response.body.data?.shop?.[field] ?? null;
  } catch (error) {
    console.error(`Error fetching policy ${handle}:`, error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: PolicyPageProps): Promise<Metadata> {
  const { handle } = await params;
  const policy = await getPolicy(handle);

  if (!policy) {
    return {
      title: "Policy Not Found | Haram Exports",
    };
  }

  return {
    title: `${policy.title} | Haram Exports`,
    description: `Read the ${policy.title.toLowerCase()} for Haram Exports.`,
  };
}

export default async function PolicyPage({ params }: PolicyPageProps) {
  const { handle } = await params;
  const policy = await getPolicy(handle);

  if (!policy) {
    notFound();
  }

  const containsMarkup = /<\/?[a-z][\s\S]*>/i.test(policy.body);

  return (
    <div className="bg-white">
      <section className="border-b border-gray-200 bg-gray-50 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <nav className="mb-5 flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
            <Link href="/" className="transition hover:text-gray-900">
              Home
            </Link>
            <span>/</span>
            <span className="text-gray-900">Policy</span>
          </nav>
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl">
            {policy.title}
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-gray-600">
            Storefront policy content synced from Shopify.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {containsMarkup ? (
            <div
              className="prose prose-sm max-w-none text-gray-700"
              dangerouslySetInnerHTML={{ __html: policy.body }}
            />
          ) : (
            <div className="whitespace-pre-line leading-relaxed text-gray-700">
              {policy.body}
            </div>
          )}

          <div className="mt-10 rounded-2xl border border-gray-200 bg-gray-50 p-6">
            <p className="text-sm text-gray-600">
              Shopify policy source:
              {" "}
              <a
                href={policy.url}
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-gray-900 underline underline-offset-4"
              >
                Open original policy
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
