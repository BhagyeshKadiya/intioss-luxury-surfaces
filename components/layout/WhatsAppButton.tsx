"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { getWhatsAppUrl, getProductWhatsAppUrl } from "@/lib/config";
import { PRODUCTS } from "@/data/products";

export function WhatsAppButton() {
  const pathname = usePathname();
  const [showTooltip, setShowTooltip] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Tooltip appears after 4s automatically
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  // Hide the global floating button on the product detail page 
  // to prevent overlapping with the sticky Enquire Bar
  const isProductDetailPage = pathname.startsWith("/products/") && pathname !== "/products";
  
  if (isProductDetailPage) {
    return null;
  }

  const targetUrl = getWhatsAppUrl();

  return (
    <div
      className="fixed bottom-20 right-3.5 sm:bottom-6 sm:right-6 z-[87] flex items-center gap-3 select-none"
      style={{
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Tooltip: Chat with us */}
      <AnimatePresence>
        {(showTooltip || isHovered) && (
          <motion.div
            initial={{ opacity: 0, x: 10, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="hidden sm:flex items-center gap-2 bg-maroon-deep text-ivory px-3.5 py-2 rounded-sm border border-gold/40 shadow-xl backdrop-blur-md"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            <span className="font-montserrat text-xs tracking-wider uppercase font-medium">
              Chat with us
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button Container with Idle Float */}
      <motion.div
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="relative"
      >
        {/* Soft Pulsing Gold Ring */}
        <motion.div
          animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
          transition={{
            duration: 2.4,
            repeat: Infinity,
            ease: "easeOut",
          }}
          className="absolute inset-0 rounded-full border border-gold pointer-events-none"
        />

        {/* WhatsApp Link Button */}
        <a
          href={targetUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Direct WhatsApp Concierge"
          className="relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-maroon text-white border border-gold shadow-2xl transition-transform hover:scale-105 active:scale-90 backdrop-blur-md"
        >
          {/* White WhatsApp SVG Glyph */}
          <svg
            viewBox="0 0 24 24"
            width="22"
            height="22"
            fill="currentColor"
            className="text-white drop-shadow-sm sm:w-[26px] sm:h-[26px]"
          >
            <path d="M12.031 2C6.495 2 2 6.495 2 12.031c0 1.954.563 3.784 1.536 5.334L2 22l4.809-1.503c1.488.895 3.228 1.411 5.222 1.411 5.536 0 10.031-4.495 10.031-10.031C22.062 6.495 17.567 2 12.031 2zm0 18.283c-1.748 0-3.37-.532-4.717-1.442l-.338-.228-2.852.891.907-2.776-.251-.37c-1.026-1.512-1.569-3.284-1.569-5.127 0-4.57 3.717-8.287 8.287-8.287 4.57 0 8.287 3.717 8.287 8.287 0 4.57-3.717 8.287-8.287 8.287zm4.542-6.208c-.249-.125-1.472-.727-1.7-.81-.228-.083-.395-.125-.561.125-.166.25-.644.81-.789.977-.146.166-.291.187-.54.062-.249-.125-1.052-.388-2.003-1.236-.74-.66-1.24-1.476-1.385-1.725-.146-.249-.016-.384.108-.508.112-.112.249-.291.374-.437.125-.145.166-.25.25-.415.083-.166.042-.312-.021-.437-.062-.125-.561-1.352-.769-1.852-.202-.486-.407-.42-.561-.428-.145-.008-.312-.008-.478-.008-.166 0-.437.062-.665.312-.228.25-.873.853-.873 2.079 0 1.227.894 2.412 1.019 2.578.125.166 1.758 2.685 4.26 3.766.595.257 1.06.41 1.423.525.599.19 1.144.163 1.575.099.48-.072 1.472-.602 1.68-1.184.208-.582.208-1.081.145-1.185-.062-.104-.228-.166-.477-.291z" />
          </svg>
        </a>
      </motion.div>
    </div>
  );
}
