import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Haram Exports",
  description:
    "Wholesale inquiries, product sourcing guidance, and catalog support for Haram Exports.",
};

export default function ContactPage() {
  return (
    <div className="bg-white">
      <section className="border-b border-gray-200 bg-gray-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-gray-500">
            Contact Sales
          </span>
          <h1 className="mt-4 max-w-4xl text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl">
            Start the conversation for catalog access, wholesale pricing, or custom programs.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-gray-600">
            The fastest inquiries include the product category, expected quantity,
            target market, and any branding or packaging requirements.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
          {[
            {
              title: "Wholesale Catalog Requests",
              description:
                "Share the categories you are evaluating so the team can respond with the most relevant range.",
            },
            {
              title: "Private Label and Customization",
              description:
                "Mention logos, finish changes, packaging needs, or market-specific styling requirements.",
            },
            {
              title: "Sampling and Shipping Guidance",
              description:
                "Include delivery country, lead-time expectations, and whether you need sample-first sourcing.",
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
          <h2 className="text-3xl font-extrabold">What to include in your inquiry</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              "Product family or preferred collection",
              "Approximate order quantity",
              "Target country or delivery region",
              "Private label or branding requirements",
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
              href="/collections/all"
              className="rounded-full bg-white px-6 py-3 text-center font-semibold text-gray-900 transition hover:bg-gray-100"
            >
              Review the Catalog
            </Link>
            <Link
              href="/policies/terms-of-service"
              className="rounded-full border border-white px-6 py-3 text-center font-semibold text-white transition hover:bg-white hover:text-gray-900"
            >
              Read Business Terms
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
