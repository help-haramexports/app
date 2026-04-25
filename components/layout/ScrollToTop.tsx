"use client";

import { useState, useEffect } from 'react';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Scroll check logic
    const toggleVisibility = () => {
      // 300px niche scroll karne par button dikhega
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    
    // Initial check (page load hote hi status check karega)
    toggleVisibility();

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 md:bottom-10 md:right-10 bg-gray-900 text-white w-14 h-14 rounded-full shadow-2xl hover:bg-gray-700 transition-all z-[99999] flex items-center justify-center border-2 border-white cursor-pointer active:scale-95"
      aria-label="Scroll to top"
      title="Scroll to top"
      style={{ isolation: 'isolate' }}
    >
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7" />
      </svg>
    </button>
  );
}