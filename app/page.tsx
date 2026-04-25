import { shopifyFetch } from '../lib/shopify';
import Link from 'next/link';
import type { Metadata } from 'next';

// SEO Metadata
export const metadata: Metadata = {
  title: 'Haram Exports | Premium Handcrafted Equestrian Gear & Saddles',
  description: 'Premium handcrafted saddles and equestrian gear for the global rider. Direct from manufacturer in Kanpur, India. Worldwide shipping via DHL & FedEx.',
  keywords: ['equestrian gear', 'handcrafted saddles', 'leather saddles', 'horse riding gear', 'premium saddles India', 'B2B equestrian'],
  authors: [{ name: 'Haram Exports' }],
  openGraph: {
    title: 'Haram Exports | Excellence in Every Stitch',
    description: 'Premium handcrafted saddles and equestrian gear for the global rider.',
    type: 'website',
  },
};

interface ProductEdge {
  node: {
    id: string;
    title: string;
    handle: string;
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
  };
}

// Data Fetcher: Connected to Shopify Storefront API
async function getProducts(): Promise<ProductEdge[]> {
  try {
    const query = `
      query {
        products(first: 6) {
          edges {
            node {
              id
              title
              handle
              priceRange {
                minVariantPrice {
                  amount
                  currencyCode
                }
              }
              images(first: 1) {
                edges {
                  node {
                    url
                    altText
                  }
                }
              }
            }
          }
        }
      }
    `;
    const res = await shopifyFetch({ query });
    return res.body?.data?.products?.edges || [];
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export default async function Home() {
  const products = await getProducts();

  return (
    <main className="flex flex-col min-h-screen bg-white overflow-hidden">
      
      {/* 1. HERO BANNER */}
      <section className="relative min-h-[85vh] w-full flex items-center justify-center bg-gray-900 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/hero-bg.png')" }}
        >
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        <div className="relative z-10 text-center px-6 sm:px-8 py-20 lg:px-8 max-w-5xl mx-auto flex flex-col items-center justify-center h-full mt-8 md:mt-0">
          <span className="inline-block text-white/90 uppercase tracking-[0.2em] md:tracking-[0.3em] text-xs sm:text-sm font-bold mb-4 md:mb-6">
            Direct from Manufacturer
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white mb-6 md:mb-8 leading-tight sm:leading-tight">
            Excellence in <br className="block sm:hidden" /> Every Stitch.
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-200 mb-10 md:mb-12 font-light max-w-2xl mx-auto leading-relaxed">
            Premium handcrafted saddles and equestrian gear for the global rider. Engineered for performance, crafted for legacy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
            <Link 
              href="/collections/saddles" 
              className="w-full sm:w-auto bg-white text-gray-900 px-8 py-4 font-bold hover:bg-gray-100 transition-all duration-300 shadow-lg text-sm md:text-base rounded-md"
            >
              Shop Saddles
            </Link>
            <Link 
              href="/collections/jackets" 
              className="w-full sm:w-auto bg-transparent border-2 border-white text-white px-8 py-4 font-bold hover:bg-white hover:text-gray-900 transition-all duration-300 text-sm md:text-base rounded-md"
            >
              Explore Apparel
            </Link>
          </div>
        </div>
      </section>

      {/* 2. TRUSTED BY LOGOS */}
      <section className="py-8 sm:py-12 bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-6 font-semibold">
            Trusted by Global Equestrian Partners
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-12 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            <h2 className="text-2xl sm:text-3xl font-black font-serif text-gray-700">EQUUS</h2>
            <h2 className="text-2xl sm:text-3xl font-black font-sans text-gray-700">RIDER'S CHOICE</h2>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tighter text-gray-700">GLOBAL EQUESTRIAN</h2>
            <h2 className="text-2xl sm:text-3xl font-black italic text-gray-700">Tack & Gear</h2>
          </div>
        </div>
      </section>

      {/* 3. TRUST BADGES */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center p-6 rounded-lg hover:bg-gray-50 transition-colors duration-300">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wider mb-2">Worldwide Shipping</h3>
              <p className="text-gray-500 text-sm">Tracked logistics via DHL & FedEx.</p>
            </div>
            <div className="flex flex-col items-center p-6 rounded-lg hover:bg-gray-50 transition-colors duration-300">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wider mb-2">100% Genuine Leather</h3>
              <p className="text-gray-500 text-sm">Ethically sourced, premium grade.</p>
            </div>
            <div className="flex flex-col items-center p-6 rounded-lg hover:bg-gray-50 transition-colors duration-300">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wider mb-2">Secure B2B Checkout</h3>
              <p className="text-gray-500 text-sm">Encrypted global payment gateways.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SHOP BY DISCIPLINE (Connected via Next Links) */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-3">
              Shop by Discipline
            </h2>
            <p className="text-gray-500 text-base sm:text-lg">
              Find the perfect gear tailored to your riding style.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link href="/collections/saddles" className="group relative h-80 overflow-hidden rounded-lg bg-gray-900">
              <img 
                src="/images/cat-saddles.png" 
                alt="Professional Saddles" 
                className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-50 transition-all duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-white mb-3">Professional Saddles</h3>
                  <span className="inline-block text-white text-sm uppercase tracking-widest border-b-2 border-white pb-1 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    Explore
                  </span>
                </div>
              </div>
            </Link>
            <Link href="/collections/jackets" className="group relative h-80 overflow-hidden rounded-lg bg-gray-900">
              <img 
                src="/images/cat-jackets.png" 
                alt="Equestrian Apparel" 
                className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-50 transition-all duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-white mb-3">Equestrian Apparel</h3>
                  <span className="inline-block text-white text-sm uppercase tracking-widest border-b-2 border-white pb-1 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    Explore
                  </span>
                </div>
              </div>
            </Link>
            <Link href="/collections/accessories" className="group relative h-80 overflow-hidden rounded-lg bg-gray-900">
              <img 
                src="/images/cat-accessories.png" 
                alt="Leather Accessories" 
                className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-50 transition-all duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-white mb-3">Leather Accessories</h3>
                  <span className="inline-block text-white text-sm uppercase tracking-widest border-b-2 border-white pb-1 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    Explore
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 5. FEATURED PRODUCTS - FULLY DYNAMIC & LINKED */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-4">
            <div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
                Featured Gear
              </h2>
              <p className="text-gray-500 text-base">
                Our most sought-after saddles by professionals.
              </p>
            </div>
            <Link 
              href="/collections/all" 
              className="inline-flex items-center text-gray-900 font-semibold border-b-2 border-gray-900 pb-1 hover:text-gray-600 hover:border-gray-600 transition-all duration-300 group"
            >
              View All Products 
              <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map(({ node }) => {
                const image = node.images.edges[0]?.node;
                const price = parseFloat(node.priceRange.minVariantPrice.amount);
                
                return (
                  <article 
                    key={node.id} 
                    className="group bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-gray-300 hover:shadow-2xl transition-all duration-500 flex flex-col relative"
                  >
                    {/* Entire image area is now a clickable link to the product page */}
                    <Link href={`/product/${node.handle}`} className="relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden block">
                      {image ? (
                        <img 
                          src={image.url} 
                          alt={image.altText || node.title} 
                          className="absolute inset-0 w-full h-full p-6 sm:p-8 object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-700 ease-out"
                          loading="lazy"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                          <svg className="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}
                      
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-gray-900 p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </div>

                      <span className="absolute top-4 left-4 bg-gray-900 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                        Premium
                      </span>
                    </Link>

                    <div className="p-6 flex flex-col flex-grow bg-white z-10 relative">
                      <Link href={`/product/${node.handle}`}>
                        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-gray-600 transition-colors duration-300">
                          {node.title}
                        </h3>
                      </Link>
                      
                      <div className="mt-auto pt-4 flex items-center justify-between border-t border-gray-50">
                        <div>
                          <p className="text-2xl font-extrabold text-gray-900">
                            ₹{price.toLocaleString('en-IN', { minimumFractionDigits: 0 })}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">Incl. all taxes</p>
                        </div>
                        {/* Dynamic View Product Link disguised as a button */}
                        <Link 
                          href={`/product/${node.handle}`}
                          className="bg-gray-100 hover:bg-gray-900 hover:text-white text-gray-900 px-5 py-2.5 rounded-lg font-semibold text-sm transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
                        >
                          View Product
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16 bg-gray-50 rounded-xl">
              <p className="text-gray-500 text-lg">Loading products...</p>
            </div>
          )}
        </div>
      </section>

      {/* 6. B2B WHOLESALE */}
      <section className="bg-gradient-to-br from-gray-100 to-gray-200 py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6 leading-tight">
            Partner With Us for High-Volume Retail
          </h2>
          <p className="text-lg text-gray-600 mb-10 leading-relaxed max-w-3xl mx-auto">
            Are you an equestrian retailer, distributor, or riding academy? Haram Exports offers scalable manufacturing, custom branding, and aggressive wholesale pricing for international B2B partners.
          </p>
          <Link 
            href="/contact" 
            className="inline-block bg-gray-900 text-white px-10 py-4 font-bold hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl uppercase tracking-wider text-sm hover:scale-105"
          >
            Request Wholesale Catalog
          </Link>
        </div>
      </section>

      {/* 7. CRAFTSMANSHIP */}
      <section className="py-16 sm:py-24 bg-gray-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="relative">
              <div className="absolute inset-0 border-2 border-gray-700 translate-x-3 translate-y-3 md:translate-x-4 md:translate-y-4 rounded-lg hidden sm:block"></div>
              <img 
                src="/images/craftsmanship.png" 
                alt="Leather Craftsmanship" 
                className="relative z-10 object-cover h-96 lg:h-[500px] w-full rounded-lg filter brightness-90 contrast-125"
                loading="lazy"
              />
            </div>
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
                The Legacy of Indian Craftsmanship.
              </h2>
              <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                Based in the historic leather manufacturing hub of Kanpur, Haram Exports combines centuries-old artisanal techniques with modern biomechanical design.
              </p>
              <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                Every saddle is meticulously hand-tooled, rigorously inspected, and built to withstand the most demanding equestrian environments. We don't just make gear; we forge partnerships with riders worldwide.
              </p>
              <Link 
                href="/about" 
                className="inline-flex items-center font-bold text-white hover:text-gray-300 transition-all duration-300 group text-lg"
              >
                Read Our Full Story 
                <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FAQ */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-500 text-base">
              Everything you need to know about our products and shipping.
            </p>
          </div>
          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-6">
              <h4 className="text-lg font-bold text-gray-900 mb-3">Do you ship internationally?</h4>
              <p className="text-gray-600 leading-relaxed">
                Yes, we export globally using trusted logistics partners like DHL and FedEx to ensure safe and timely delivery to your doorstep.
              </p>
            </div>
            <div className="border-b border-gray-200 pb-6">
              <h4 className="text-lg font-bold text-gray-900 mb-3">What kind of leather do you use?</h4>
              <p className="text-gray-600 leading-relaxed">
                We use only premium, ethically sourced full-grain leather, treated and finished by expert artisans to ensure maximum durability and comfort.
              </p>
            </div>
            <div className="border-b border-gray-200 pb-6">
              <h4 className="text-lg font-bold text-gray-900 mb-3">Can I place a custom or bulk order?</h4>
              <p className="text-gray-600 leading-relaxed">
                Absolutely. We specialize in B2B and wholesale manufacturing. Please reach out to our sales team for custom tooling, branding, and bulk pricing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 9. TESTIMONIALS */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-3">
              Trusted by Global Riders
            </h2>
            <p className="text-gray-500 text-base">
              Don't just take our word for it.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: 'James D.',
                location: 'Texas, USA',
                text: 'The craftsmanship is absolutely phenomenal. We ordered a container of Western saddles for our retail chain in Texas, and the quality of the leather exceeded our expectations. Highly recommended B2B partner.'
              },
              {
                name: 'Elena M.',
                location: 'Munich, Germany',
                text: 'Beautiful stitching and great ergonomic design. DHL shipping was surprisingly fast from India to Munich. I use my saddle every day for training.'
              },
              {
                name: 'David R.',
                location: 'Sydney, Australia',
                text: 'Finding a reliable leather manufacturer is tough. Haram Exports delivered perfectly on our custom specifications. The communication with their team was excellent.'
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300">
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 italic mb-6 leading-relaxed">"{testimonial.text}"</p>
                <div>
                  <p className="font-bold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}