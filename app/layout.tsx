import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/layout/ScrollToTop";
// Shopify API fetcher ko import kiya
import { shopifyFetch } from "@/lib/shopify"; 

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Haram Exports | Premium Equestrian Gear",
  description: "Global manufacturer of high-quality handcrafted saddles, jackets, and horse riding accessories.",
};

// Shopify Storefront API se menu fetch karne ka dynamic function
async function getShopifyMenu(handle: string) {
  const query = `
    query {
      menu(handle: "${handle}") {
        items {
          title
          url
        }
      }
    }
  `;
  try {
    const res = await shopifyFetch({ query });
    const items = res.body?.data?.menu?.items || [];
    
    // Shopify absolute URLs (https://...) deta hai. Next.js ke fast routing ke liye hum isko relative (/collections/...) mein convert karte hain.
    return items.map((item: any) => {
      try {
        const urlObj = new URL(item.url);
        return { title: item.title, url: urlObj.pathname };
      } catch(e) {
        return { title: item.title, url: item.url };
      }
    });
  } catch (error) {
    console.error(`Error fetching menu ${handle}:`, error);
    return null;
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  // Yahan hum Shopify admin panel se 3 alag-alag menus fetch kar rahe hain "handle" ke zariye
  const mainMenuItems = await getShopifyMenu("main-menu");
  const shopMenuItems = await getShopifyMenu("footer-shop");
  const legalMenuItems = await getShopifyMenu("footer-legal");

  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} min-h-screen flex flex-col bg-white text-gray-900 overflow-x-hidden antialiased`}>
        
        {/* Navbar ko fetch kiya hua Shopify 'main-menu' pass kar diya */}
        <Navbar menuItems={mainMenuItems || undefined} />
        
        <main className="flex-grow w-full">
          {children}
        </main>
        
        {/* Footer ko dono fetched Shopify menus pass kar diye */}
        <Footer 
          shopLinks={shopMenuItems || undefined} 
          legalLinks={legalMenuItems || undefined} 
        />
        
        <ScrollToTop />
      </body>
    </html>
  );
}