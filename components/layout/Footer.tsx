import Link from 'next/link';

// Default Fallback Menus (Agar Shopify se data aane mein deri ho)
const defaultShopLinks = [
  { title: 'Professional Saddles', url: '/collections/saddles' },
  { title: 'Riding Jackets', url: '/collections/jackets' },
  { title: 'Horse Accessories', url: '/collections/accessories' }
];

const defaultLegalLinks = [
  { title: 'Terms of Service', url: '/policies/terms-of-service' },
  { title: 'Privacy Policy', url: '/policies/privacy-policy' },
  { title: 'Refund Policy', url: '/policies/refund-policy' },
  { title: 'Contact Information', url: '/contact' }
];

// Ab Footer do menus accept karega: 'shopLinks' aur 'legalLinks'
export default function Footer({ 
  shopLinks = defaultShopLinks, 
  legalLinks = defaultLegalLinks 
}: { 
  shopLinks?: { title: string, url: string }[],
  legalLinks?: { title: string, url: string }[] 
}) {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Column 1: Brand Info */}
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-xl font-extrabold text-gray-900 mb-4 tracking-tighter">HARAM EXPORTS</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Premium handcrafted equestrian gear, saddles, and accessories. A proud entity of Malik Innovations, delivering global excellence directly from Kanpur, India.
            </p>
          </div>

          {/* Column 2: Quick Links (Dynamic) */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Shop</h4>
            <ul className="space-y-3 text-sm text-gray-500">
              {shopLinks.map((link, index) => (
                <li key={index}>
                  <Link href={link.url} className="hover:text-black transition">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Legal & Support (Dynamic) */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Legal & Support</h4>
            <ul className="space-y-3 text-sm text-gray-500">
              {legalLinks.map((link, index) => (
                <li key={index}>
                  <Link href={link.url} className="hover:text-black transition">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Subscribe</h4>
            <p className="text-gray-500 text-sm mb-4">Get the latest updates on new products and global sales.</p>
            <div className="flex">
              <input type="email" placeholder="Email address" className="px-4 py-2 w-full border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-gray-900" />
              <button className="bg-gray-900 text-white px-4 py-2 rounded-r-md hover:bg-gray-800 transition">
                &rarr;
              </button>
            </div>
          </div>

        </div>

        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-xs">
            &copy; {new Date().getFullYear()} Haram Exports (Malik Innovations). All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 text-gray-400 text-xs">
            Powered by Next.js & Shopify Headless
          </div>
        </div>
      </div>
    </footer>
  );
}