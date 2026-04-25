import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Haram Exports",
  description:
    "Customer support, shopping help, and product guidance for Haram Exports.",
};

export default function ContactPage() {
  return (
    <div className="bg-white">
      <section className="border-b border-gray-200 bg-gray-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-gray-500">
            Customer Support
          </span>
          <h1 className="mt-4 max-w-4xl text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl">
            Need help with shopping, sizing, policies, or your order?
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-gray-600">
            This headless storefront keeps your catalog fast, while Shopify continues
            to handle customer accounts, orders, and checkout securely.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
          {[
            {
              title: "Order Support",
              description:
                "Use your Shopify customer account to review order details, shipping progress, and saved addresses.",
            },
            {
              title: "Sizing and Product Help",
              description:
                "Browse the product catalog for descriptions, materials, and live availability before checkout.",
            },
            {
              title: "Shipping and Policies",
              description:
                "Policy pages and Shopify checkout keep shipping, returns, and privacy information clear.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-gray-200 bg-gray-50 p-8"
            >
              <h2 className="text-xl font-bold text-gray-900">{item.title}</h2>
              <p className="mt-4 leading-relaxed text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="pb-16 sm:pb-20">
        <div className="mx-auto max-w-5xl rounded-3xl bg-gray-900 px-6 py-12 text-white sm:px-10">
          <h2 className="text-3xl font-extrabold">Where to manage customer actions</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              "Registration through Shopify customer accounts",
              "Order history inside your account page",
              "Live product listing from Shopify",
              "Checkout and payments in Shopify",
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm font-semibold text-white/90"
              >
                {item}
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/account"
              className="rounded-full bg-white px-6 py-3 text-center font-semibold text-gray-900 transition hover:bg-gray-100"
            >
              Open My Account
            </Link>
            <Link
              href="/search"
              className="rounded-full border border-white px-6 py-3 text-center font-semibold text-white transition hover:bg-white hover:text-gray-900"
            >
              Search Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
