"use client";

import Link from "next/link";
import { useState } from "react";
import type { ShopifyMenuItem } from "@/lib/shopify";

const defaultMenu: ShopifyMenuItem[] = [
  { title: "Home", url: "/" },
  { title: "Professional Saddles", url: "/collections/saddles" },
  { title: "Equestrian Jackets", url: "/collections/jackets" },
  { title: "Accessories", url: "/collections/accessories" },
];

type NavbarProps = {
  menuItems?: ShopifyMenuItem[];
};

export default function Navbar({ menuItems = defaultMenu }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className="sticky top-0 z-[9999] w-full border-b border-gray-200 bg-white/95 shadow-sm backdrop-blur">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="text-xl font-extrabold tracking-tight text-gray-900 md:text-2xl"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            HARAM <span className="font-light text-gray-500">EXPORTS</span>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {menuItems.map((item) => (
              <Link
                key={`${item.title}-${item.url}`}
                href={item.url}
                className="text-sm font-semibold text-gray-700 transition hover:text-black"
              >
                {item.title}
              </Link>
            ))}
          </div>

          <div className="hidden items-center gap-4 md:flex">
            <Link
              href="/collections/all"
              className="text-sm font-semibold text-gray-600 transition hover:text-black"
            >
              Catalog
            </Link>
            <Link
              href="/contact"
              className="rounded-full bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800"
            >
              Request Quote
            </Link>
          </div>

          <button
            type="button"
            className="rounded-md bg-gray-50 p-2 text-gray-900 md:hidden"
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            aria-expanded={isMobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </nav>

      <div
        className={`fixed inset-x-0 top-20 z-[9998] border-t border-gray-100 bg-white shadow-[0_10px_20px_rgba(0,0,0,0.08)] md:hidden ${
          isMobileMenuOpen ? "block" : "hidden"
        }`}
      >
        <div className="flex flex-col gap-2 px-6 py-6">
          {menuItems.map((item) => (
            <Link
              key={`${item.title}-${item.url}`}
              href={item.url}
              onClick={() => setIsMobileMenuOpen(false)}
              className="border-b border-gray-100 py-3 text-lg font-bold text-gray-900"
            >
              {item.title}
            </Link>
          ))}

          <Link
            href="/collections/all"
            onClick={() => setIsMobileMenuOpen(false)}
            className="border-b border-gray-100 py-3 text-lg font-bold text-gray-900"
          >
            Catalog
          </Link>

          <Link
            href="/contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className="mt-3 rounded-full bg-gray-900 px-5 py-3 text-center text-sm font-semibold text-white"
          >
            Request Quote
          </Link>
        </div>
      </div>
    </>
  );
}
