"use client";

import Link from 'next/link';
import { useState } from 'react';

// Default menu (Fallback) agar Shopify se data aane mein deri ho
const defaultMenu = [
  { title: 'Home', url: '/' },
  { title: 'Professional Saddles', url: '/collections/saddles' },
  { title: 'Equestrian Jackets', url: '/collections/jackets' },
  { title: 'Accessories', url: '/collections/accessories' }
];

// Ab Navbar 'menuItems' ko prop ke through accept karega
export default function Navbar({ menuItems = defaultMenu }: { menuItems?: { title: string, url: string }[] }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className="sticky top-0 z-[9999] w-full bg-white border-b border-gray-100 shadow-sm relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            
            {/* Left: Logo */}
            <div className="flex-shrink-0 flex items-center z-50">
              <Link href="/" className="text-xl md:text-2xl font-extrabold text-gray-900 tracking-tighter">
                HARAM <span className="text-gray-500 font-light">EXPORTS</span>
              </Link>
            </div>

            {/* Center: Desktop Navigation (Dynamic Shopify Data) */}
            <div className="hidden md:flex space-x-8">
              {menuItems.map((item, index) => (
                <Link key={index} href={item.url} className="text-gray-700 hover:text-black font-medium transition">
                  {item.title}
                </Link>
              ))}
            </div>

            {/* Right: Icons & Mobile Toggle */}
            <div className="flex items-center space-x-3 md:space-x-5 z-50">
              
              {/* Desktop Only Icons */}
              <button className="hidden sm:block text-gray-500 hover:text-black transition">
                <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </button>
              <button className="hidden sm:block text-gray-500 hover:text-black transition">
                <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
              </button>

              {/* Cart Icon (Always visible) */}
              <button className="text-gray-500 hover:text-black transition relative p-1 md:p-2">
                <svg className="w-6 h-6 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                <span className="absolute top-0 right-0 bg-gray-900 text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">0</span>
              </button>

              {/* Mobile Menu Hamburger Button */}
              <button 
                className="md:hidden text-gray-900 p-2 focus:outline-none bg-gray-50 rounded-md"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-expanded={isMobileMenuOpen}
                aria-label="Toggle Navigation Menu"
              >
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Dropdown Panel (Dynamic Shopify Data) */}
      <div 
        className={`md:hidden absolute top-20 left-0 w-full bg-white shadow-[0_10px_20px_rgba(0,0,0,0.1)] z-[9998] border-t border-gray-100 ${
          isMobileMenuOpen ? 'block' : 'hidden'
        }`}
      >
        <div className="px-6 py-6 flex flex-col space-y-2 h-auto">
          {menuItems.map((item, index) => (
            <Link 
              key={index} 
              href={item.url} 
              onClick={() => setIsMobileMenuOpen(false)} 
              className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-4 pt-2"
            >
              {item.title}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}