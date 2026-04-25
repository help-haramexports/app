"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/components/providers/CartProvider";
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

function iconClassName() {
  return "h-5 w-5";
}

export default function Navbar({ menuItems = defaultMenu }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { itemCount } = useCart();

  const quickLinks = [
    {
      href: "/search",
      label: "Search",
      icon: (
        <svg className={iconClassName()} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.8}
            d="M21 21l-4.35-4.35m1.85-5.15a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      ),
    },
    {
      href: "/account",
      label: "Account",
      icon: (
        <svg className={iconClassName()} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.8}
            d="M15 7a3 3 0 11-6 0 3 3 0 016 0zm5 13a8 8 0 10-16 0h16z"
          />
        </svg>
      ),
    },
    {
      href: "/cart",
      label: "Cart",
      icon: (
        <svg className={iconClassName()} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.8}
            d="M3 4h2l2.4 10.2a1 1 0 00.98.8h8.94a1 1 0 00.97-.76L21 7H7"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.8}
            d="M10 19a1 1 0 100 2 1 1 0 000-2zm8 0a1 1 0 100 2 1 1 0 000-2z"
          />
        </svg>
      ),
      count: itemCount,
    },
  ];

  return (
    <>
      <nav className="sticky top-0 z-[9999] w-full border-b border-gray-200 bg-white/95 shadow-sm backdrop-blur">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="shrink-0 text-lg font-extrabold tracking-tight text-gray-900 sm:text-xl md:text-2xl"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            HARAM <span className="font-light text-gray-500">EXPORTS</span>
          </Link>

          <div className="hidden min-w-0 items-center gap-6 lg:flex">
            {menuItems.map((item) => (
              <Link
                key={`${item.title}-${item.url}`}
                href={item.url}
                className="whitespace-nowrap text-sm font-semibold text-gray-700 transition hover:text-black"
              >
                {item.title}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden items-center gap-2 lg:flex">
              {quickLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="relative rounded-full p-2.5 text-gray-700 transition hover:bg-gray-100 hover:text-gray-900"
                  aria-label={item.label}
                >
                  {item.icon}
                  {item.count ? (
                    <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-gray-900 px-1 text-[10px] font-bold text-white">
                      {item.count}
                    </span>
                  ) : null}
                </Link>
              ))}
            </div>

            <button
              type="button"
              className="rounded-full bg-gray-50 p-2.5 text-gray-900 transition hover:bg-gray-100 lg:hidden"
              onClick={() => setIsMobileMenuOpen((open) => !open)}
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
        </div>
      </nav>

      <div
        className={`fixed inset-x-0 top-20 z-[9998] max-h-[calc(100vh-5rem)] overflow-y-auto border-t border-gray-100 bg-white shadow-[0_10px_20px_rgba(0,0,0,0.08)] lg:hidden ${
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

          <div className="mt-3 grid grid-cols-3 gap-3">
            {quickLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative flex flex-col items-center justify-center rounded-2xl border border-gray-200 px-3 py-4 text-sm font-semibold text-gray-900"
              >
                {item.icon}
                <span className="mt-2">{item.label}</span>
                {item.count ? (
                  <span className="absolute right-3 top-3 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-gray-900 px-1 text-[10px] font-bold text-white">
                    {item.count}
                  </span>
                ) : null}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
