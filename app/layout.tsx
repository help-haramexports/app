import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/layout/ScrollToTop";
import {
  normalizeShopifyPath,
  shopifyFetch,
  type ShopifyMenuItem,
} from "@/lib/shopify";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Haram Exports | Premium Equestrian Gear",
  description:
    "Global manufacturer of high-quality handcrafted saddles, jackets, and horse riding accessories.",
};

async function getShopifyMenu(handle: string): Promise<ShopifyMenuItem[] | null> {
  const query = `
    query getMenu($handle: String!) {
      menu(handle: $handle) {
        items {
          title
          url
        }
      }
    }
  `;

  try {
    const response = await shopifyFetch<
      {
        menu: {
          items: ShopifyMenuItem[] | null;
        } | null;
      },
      { handle: string }
    >({
      query,
      variables: { handle },
    });

    const items = response.body.data?.menu?.items ?? [];

    if (items.length === 0) {
      return null;
    }

    return items.map((item) => ({
      title: item.title,
      url: normalizeShopifyPath(item.url),
    }));
  } catch (error) {
    console.error(`Error fetching menu ${handle}:`, error);
    return null;
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const [mainMenuItems, shopMenuItems, legalMenuItems] = await Promise.all([
    getShopifyMenu("main-menu"),
    getShopifyMenu("footer-shop"),
    getShopifyMenu("footer-legal"),
  ]);

  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${inter.className} flex min-h-screen flex-col overflow-x-hidden bg-white text-gray-900 antialiased`}
      >
        <Navbar menuItems={mainMenuItems || undefined} />
        <main className="flex-grow">{children}</main>
        <Footer
          shopLinks={shopMenuItems || undefined}
          legalLinks={legalMenuItems || undefined}
        />
        <ScrollToTop />
      </body>
    </html>
  );
}
