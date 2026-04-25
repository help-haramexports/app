import Link from "next/link";
import type { ShopifyMenuItem } from "@/lib/shopify";

const defaultShopLinks: ShopifyMenuItem[] = [
  { title: "Professional Saddles", url: "/collections/saddles" },
  { title: "Riding Jackets", url: "/collections/jackets" },
  { title: "Horse Accessories", url: "/collections/accessories" },
];

const defaultLegalLinks: ShopifyMenuItem[] = [
  { title: "Terms of Service", url: "/policies/terms-of-service" },
  { title: "Privacy Policy", url: "/policies/privacy-policy" },
  { title: "Refund Policy", url: "/policies/refund-policy" },
  { title: "Contact Information", url: "/contact" },
];

type FooterProps = {
  shopLinks?: ShopifyMenuItem[];
  legalLinks?: ShopifyMenuItem[];
};

export default function Footer({
  shopLinks = defaultShopLinks,
  legalLinks = defaultLegalLinks,
}: FooterProps) {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 pb-8 pt-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-12 grid grid-cols-1 gap-12 md:grid-cols-4">
          <div>
            <h3 className="mb-4 text-xl font-extrabold tracking-tight text-gray-900">
              HARAM EXPORTS
            </h3>
            <p className="text-sm leading-relaxed text-gray-500">
              Premium handcrafted equestrian gear, saddles, and accessories from
              Kanpur, India, designed for everyday riders and modern online shopping.
            </p>
          </div>

          <div>
            <h4 className="mb-4 font-semibold text-gray-900">Shop</h4>
            <ul className="space-y-3 text-sm text-gray-500">
              {shopLinks.map((link) => (
                <li key={`${link.title}-${link.url}`}>
                  <Link href={link.url} className="transition hover:text-black">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold text-gray-900">Support</h4>
            <ul className="space-y-3 text-sm text-gray-500">
              {legalLinks.map((link) => (
                <li key={`${link.title}-${link.url}`}>
                  <Link href={link.url} className="transition hover:text-black">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold text-gray-900">Customer Care</h4>
            <p className="mb-4 text-sm text-gray-500">
              Account access, order tracking, and secure checkout stay connected to
              Shopify so day-to-day store operations remain simple and reliable.
            </p>
            <div className="flex flex-col gap-3">
              <Link
                href="/account"
                className="inline-flex items-center justify-center rounded-full bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800"
              >
                My Account
              </Link>
              <Link
                href="/search"
                className="inline-flex items-center justify-center rounded-full border border-gray-300 px-4 py-2.5 text-sm font-semibold text-gray-900 transition hover:border-gray-900"
              >
                Search Products
              </Link>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-gray-200 pt-8 md:flex-row">
          <p className="text-xs text-gray-400">
            &copy; {new Date().getFullYear()} Haram Exports. All rights reserved.
          </p>
          <p className="text-center text-xs text-gray-400 md:text-right">
            Designed and developed by{" "}
            <a
              href="https://malik-innovations.vercel.app/"
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-gray-600 transition hover:text-gray-900"
            >
              Malik Innovations
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
