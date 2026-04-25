import type { Metadata } from "next";
import {
  getShopifyAccountUrl,
  shopifyStoreDomain,
} from "@/lib/shopify";

export const metadata: Metadata = {
  title: "My Account | Haram Exports",
  description:
    "Sign in, register, and manage your orders through Shopify customer accounts.",
};

export default function AccountPage() {
  const accountLinks = [
    {
      title: "Sign In",
      description: "Access saved addresses, order history, and account details.",
      href: getShopifyAccountUrl("/account/login"),
    },
    {
      title: "Create Account",
      description: "Register a new customer profile directly in Shopify.",
      href: getShopifyAccountUrl("/account/register"),
    },
    {
      title: "Track Orders",
      description: "Open your Shopify customer account to see orders and status updates.",
      href: getShopifyAccountUrl("/account"),
    },
  ];

  return (
    <div className="bg-white">
      <section className="border-b border-gray-200 bg-gray-50 py-14 sm:py-18">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-gray-500">
            My Account
          </span>
          <h1 className="mt-4 max-w-4xl text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl">
            Your account, registration, and order history stay managed in Shopify.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-gray-600">
            This storefront stays fast and headless, while customer sign-in, saved
            details, and order management continue inside the connected Shopify account.
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
          {accountLinks.map((item) => (
            <a
              key={item.title}
              href={item.href}
              className="rounded-2xl border border-gray-200 bg-gray-50 p-8 transition hover:-translate-y-1 hover:shadow-lg"
            >
              <h2 className="text-2xl font-bold text-gray-900">{item.title}</h2>
              <p className="mt-4 leading-relaxed text-gray-600">{item.description}</p>
              <span className="mt-6 inline-flex text-sm font-semibold text-gray-900">
                Continue
              </span>
            </a>
          ))}
        </div>
      </section>

      <section className="pb-14 sm:pb-18">
        <div className="mx-auto max-w-5xl rounded-3xl bg-gray-900 px-6 py-12 text-white sm:px-10">
          <h2 className="text-3xl font-extrabold">Shopify-powered customer flow</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              "Customer registration",
              "Order history and tracking",
              "Saved addresses and profile details",
              "Product listing synced from Shopify",
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm font-semibold text-white/90"
              >
                {item}
              </div>
            ))}
          </div>
          <p className="mt-8 text-sm leading-relaxed text-gray-300">
            Connected store domain:
            {" "}
            <span className="font-semibold text-white">{shopifyStoreDomain || "Not configured"}</span>
          </p>
        </div>
      </section>
    </div>
  );
}
