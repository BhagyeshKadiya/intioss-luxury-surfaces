"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { SITE_CONFIG, getWhatsAppUrl } from "@/lib/config";
import { Instagram, Linkedin, Youtube, ChevronDown, ChevronUp } from "lucide-react";

export function WhatsAppButton() {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(true);

  // Hide the global floating button on the product detail page 
  // to prevent overlapping with the sticky Enquire Bar
  const isProductDetailPage = pathname.startsWith("/products/") && pathname !== "/products";
  
  if (isProductDetailPage) {
    return null;
  }

  const targetUrl = getWhatsAppUrl();

  const otherSocials = [
    {
      name: "Instagram",
      href: SITE_CONFIG.socials.instagram,
      bgClass: "bg-gradient-to-tr from-[#FD1D1D] via-[#E1306C] to-[#833AB4] shadow-[0_4px_16px_rgba(225,48,108,0.45)] hover:shadow-[0_6px_22px_rgba(225,48,108,0.7)]",
      icon: <Instagram className="w-5 h-5 text-white drop-shadow-xs sm:w-6 sm:h-6" />,
      ringColor: "border-[#E1306C]/40",
    },
    {
      name: "LinkedIn",
      href: SITE_CONFIG.socials.linkedin,
      bgClass: "bg-[#0077B5] hover:bg-[#006097] shadow-[0_4px_16px_rgba(0,119,181,0.45)] hover:shadow-[0_6px_22px_rgba(0,119,181,0.7)]",
      icon: <Linkedin className="w-5 h-5 fill-white text-white drop-shadow-xs sm:w-6 sm:h-6" />,
      ringColor: "border-[#0077B5]/40",
    },
    {
      name: "YouTube",
      href: SITE_CONFIG.socials.youtube,
      bgClass: "bg-[#FF0000] hover:bg-[#D90000] shadow-[0_4px_16px_rgba(255,0,0,0.45)] hover:shadow-[0_6px_22px_rgba(255,0,0,0.7)]",
      icon: <Youtube className="w-5 h-5 fill-white text-white drop-shadow-xs sm:w-6 sm:h-6" />,
      ringColor: "border-[#FF0000]/40",
    },
  ];

  return (
    <aside
      aria-label="Direct Social Concierge Channels"
      className="fixed bottom-20 right-3.5 sm:bottom-6 sm:right-6 z-[87] flex flex-col items-end select-none pointer-events-auto"
      style={{
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
      }}
    >
      {/* Floating Stack of Big Brand Social Buttons */}
      <div className="flex flex-col items-end gap-3 sm:gap-3.5">
        {/* Toggle Collapse/Expand pill on top */}
        <button
          type="button"
          onClick={() => setIsExpanded((prev) => !prev)}
          aria-label={isExpanded ? "Collapse social buttons" : "Expand social buttons"}
          className="px-2 py-0.5 rounded-full bg-maroon-deep/90 text-gold text-[10px] font-montserrat uppercase tracking-widest border border-gold/40 shadow-md backdrop-blur-md hover:bg-maroon hover:border-gold transition-all duration-200 flex items-center gap-1 active:scale-95 cursor-pointer"
        >
          <span>Socials</span>
          {isExpanded ? (
            <ChevronDown className="w-3 h-3 text-gold" />
          ) : (
            <ChevronUp className="w-3 h-3 text-gold" />
          )}
        </button>

        {/* Other Social Media Big Buttons (Instagram, LinkedIn, YouTube) */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 15 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-end gap-3 sm:gap-3.5"
            >
              {otherSocials.map((item, idx) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: idx * 0.05, duration: 0.25 }}
                  className="flex items-center gap-2.5 group"
                >
                  {/* Floating Brand Tooltip Label on Hover */}
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 px-3 py-1 rounded-full bg-maroon-deep/95 text-ivory text-[11px] font-montserrat font-semibold tracking-wider border border-gold/40 shadow-xl backdrop-blur-md pointer-events-none whitespace-nowrap">
                    {item.name}
                  </span>

                  {/* Big Circular Social Button matching WhatsApp size */}
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open INTIOSS on ${item.name}`}
                    className={`relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full text-white border border-white/35 transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer ${item.bgClass}`}
                  >
                    {item.icon}
                  </a>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Big Anchor WhatsApp Button (Primary Brand Action) */}
        <div className="flex items-center gap-2.5 group relative">
          {/* Floating Tooltip Label on Hover */}
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 px-3 py-1 rounded-full bg-maroon-deep/95 text-ivory text-[11px] font-montserrat font-semibold tracking-wider border border-gold/40 shadow-xl backdrop-blur-md pointer-events-none whitespace-nowrap">
            WhatsApp Concierge
          </span>

          <div className="relative">
            {/* Soft Pulsing Green Ring */}
            <motion.div
              animate={{ scale: [1, 1.45], opacity: [0.55, 0] }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                ease: "easeOut",
              }}
              className="absolute inset-0 rounded-full border border-[#25D366] pointer-events-none"
            />

            {/* Big WhatsApp Button */}
            <a
              href={targetUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Direct WhatsApp Concierge"
              className="relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white border border-white/35 shadow-[0_4px_24px_rgba(37,211,102,0.55)] transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer"
            >
              {/* White WhatsApp SVG Glyph */}
              <svg
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="currentColor"
                className="text-white drop-shadow-sm sm:w-[28px] sm:h-[28px]"
              >
                <path d="M12.031 2C6.495 2 2 6.495 2 12.031c0 1.954.563 3.784 1.536 5.334L2 22l4.809-1.503c1.488.895 3.228 1.411 5.222 1.411 5.536 0 10.031-4.495 10.031-10.031C22.062 6.495 17.567 2 12.031 2zm0 18.283c-1.748 0-3.37-.532-4.717-1.442l-.338-.228-2.852.891.907-2.776-.251-.37c-1.026-1.512-1.569-3.284-1.569-5.127 0-4.57 3.717-8.287 8.287-8.287 4.57 0 8.287 3.717 8.287 8.287 0 4.57-3.717 8.287-8.287 8.287zm4.542-6.208c-.249-.125-1.472-.727-1.7-.81-.228-.083-.395-.125-.561.125-.166.25-.644.81-.789.977-.146.166-.291.187-.54.062-.249-.125-1.052-.388-2.003-1.236-.74-.66-1.24-1.476-1.385-1.725-.146-.249-.016-.384.108-.508.112-.112.249-.291.374-.437.125-.145.166-.25.25-.415.083-.166.042-.312-.021-.437-.062-.125-.561-1.352-.769-1.852-.202-.486-.407-.42-.561-.428-.145-.008-.312-.008-.478-.008-.166 0-.437.062-.665.312-.228.25-.873.853-.873 2.079 0 1.227.894 2.412 1.019 2.578.125.166 1.758 2.685 4.26 3.766.595.257 1.06.41 1.423.525.599.19 1.144.163 1.575.099.48-.072 1.472-.602 1.68-1.184.208-.582.208-1.081.145-1.185-.062-.104-.228-.166-.477-.291z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
}
