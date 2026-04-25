import { shopifyFetch } from '@/lib/shopify';
import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';

interface Product {
  id: string;
  handle: string;
  title: string;
  descriptionHtml: string;
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  images: {
    edges: Array<{
      node: {
        url: string;
        altText: string | null;
      };
    }>;
  };
}

// 1. Dynamic SEO Metadata: Taaki Google har product ko sahi se index kare
export async function generateMetadata({ params }: { params: { handle: string } }): Promise<Metadata> {
  const product = await getProduct(params.handle);

  if (!product) return { title: 'Product Not Found' };

  return {
    title: `${product.title} | Haram Exports`,
    description: product.title,
    openGraph: {
      images: [product.images.edges[0]?.node.url || ''],
    },
  };
}

// 2. Data Fetcher: Shopify se handle ke zariye product lana
async function getProduct(handle: string): Promise<Product | null> {
  const query = `
    query getProduct($handle: String!) {
      product(handle: $handle) {
        id
        handle
        title
        descriptionHtml
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        images(first: 5) {
          edges {
            node {
              url
              altText
            }
          }
        }
      }
    }
  `;

  const res = await shopifyFetch({
    query,
    variables: { handle },
  });

  return res.body?.data?.product || null;
}

export default async function ProductPage({ params }: { params: { handle: string } }) {
  const product = await getProduct(params.handle);

  // Agar product nahi mila toh 404 page dikhao
  if (!product) {
    notFound();
  }

  const firstImage = product.images.edges[0]?.node;
  const price = parseFloat(product.priceRange.minVariantPrice.amount);

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          {/* Left: Product Images */}
          <div className="space-y-4 sticky top-28">
            <div className="relative aspect-square bg-gray-50 rounded-2xl overflow-hidden border border-gray-100">
              {firstImage ? (
                <img
                  src={firstImage.url}
                  alt={firstImage.altText || product.title}
                  className="w-full h-full object-contain p-8 mix-blend-multiply"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">No Image Available</div>
              )}
            </div>
            
            {/* Gallery Thumbnails (Agar zyada images hain) */}
            <div className="grid grid-cols-4 gap-4">
              {product.images.edges.slice(1).map((image, i) => (
                <div key={i} className="aspect-square bg-gray-50 rounded-lg overflow-hidden border border-gray-100 cursor-pointer hover:border-gray-900 transition-all">
                  <img src={image.node.url} alt={image.node.altText || ''} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="flex flex-col">
            <nav className="flex mb-4 text-xs uppercase tracking-widest text-gray-400 font-bold">
              <a href="/" className="hover:text-gray-900">Home</a>
              <span className="mx-2">/</span>
              <span className="text-gray-900">Product Detail</span>
            </nav>

            <h1 className="text-3xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight leading-tight">
              {product.title}
            </h1>

            <div className="flex items-center gap-4 mb-8">
              <span className="text-3xl font-extrabold text-gray-900">
                ₹{price.toLocaleString('en-IN')}
              </span>
              <span className="bg-gray-900 text-white text-[10px] uppercase font-bold px-2.5 py-1 rounded-full tracking-tighter">
                Premium Leather
              </span>
            </div>

            <div className="border-t border-b border-gray-100 py-8 mb-8">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-4">Description</h3>
              <div 
                className="prose prose-sm text-gray-600 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
              />
            </div>

            {/* Product Actions */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex border border-gray-200 rounded-lg overflow-hidden">
                  <button className="px-4 py-3 hover:bg-gray-50 text-gray-600">-</button>
                  <input type="number" defaultValue="1" className="w-12 text-center border-x border-gray-200 focus:outline-none" />
                  <button className="px-4 py-3 hover:bg-gray-50 text-gray-600">+</button>
                </div>
                <button className="flex-1 bg-gray-900 text-white font-bold py-4 rounded-lg hover:bg-gray-800 transition-all shadow-xl hover:shadow-2xl active:scale-[0.98]">
                  Add to Cart
                </button>
              </div>
              <button className="w-full border-2 border-gray-900 text-gray-900 font-bold py-4 rounded-lg hover:bg-gray-50 transition-all">
                Inquire for B2B Wholesale
              </button>
            </div>

            {/* Extra trust details */}
            <div className="mt-12 grid grid-cols-2 gap-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <span className="text-xs font-bold text-gray-500 uppercase tracking-tight">Worldwide Shipping</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                </div>
                <span className="text-xs font-bold text-gray-500 uppercase tracking-tight">100% Genuine Leather</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}