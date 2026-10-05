"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { IntiossHexagon } from "@/components/brand/IntiossHexagon";
import { IntiossPattern } from "@/components/brand/IntiossPattern";
import { X, ArrowRight } from "lucide-react";
import { SITE_CONFIG } from "@/lib/config";

interface HoverMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

const MENU_ITEMS = [
  { title: "About Us", href: "/about", description: "55+ years heritage · Gandhi Civil Decor Group" },
  { title: "Book Match", href: "/book-match", description: "Interactive mirror simulation tool" },
  { title: "Gallery (Marble Use Cases)", href: "/gallery", description: "Curated architectural installations" },
  { title: "Blogs", href: "/blogs", description: "Editorial stone guides & material science" },
  { title: "Contact Us", href: "/contact", description: "Showrooms in South Mumbai & Gujarat" },
];

export function HoverMenu({
  isOpen,
  onClose,
  onMouseEnter,
  onMouseLeave,
}: HoverMenuProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Lock body scroll when menu is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Dimmer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[98]"
          />

          {/* Expanded Menu Panel */}
          <motion.div
            initial={{ x: "100%", opacity: 0.8 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0.8 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            className="fixed top-0 right-0 bottom-0 w-full sm:w-[480px] md:w-[560px] bg-maroon-deep text-ivory z-[99] shadow-2xl flex flex-col justify-between overflow-hidden border-l border-gold/30"
            style={{
              paddingBottom: "env(safe-area-inset-bottom, 0px)",
            }}
          >
            {/* Subtle Hexagon Pattern Background */}
            <IntiossPattern opacity={0.06} />

            {/* Mobile iOS-style Grab Handle */}
            <div className="sm:hidden pt-3 pb-1 flex justify-center">
              <div className="w-12 h-1 bg-gold/40 rounded-full" />
            </div>

            {/* Header with Close Icon */}
            <div className="relative z-10 flex items-center justify-between px-6 sm:px-8 pt-4 sm:pt-6 pb-4 border-b border-gold/20">
              <div className="flex items-center gap-2">
                <IntiossHexagon size={18} fillMaroon strokeColor="#DDB62B" />
                <span className="font-raleway text-xs uppercase tracking-[0.3em] text-gold font-medium">
                  Directory & Concierge
                </span>
              </div>
              <button
                onClick={onClose}
                aria-label="Close Menu"
                className="p-2 text-ivory/80 hover:text-gold transition-colors focus-visible:outline-gold active:scale-90"
              >
                <X className="w-6 h-6 stroke-[1.5]" />
              </button>
            </div>

            {/* Navigation Links with 80ms Stagger */}
            <div 
              data-lenis-prevent
              className="relative z-10 px-6 sm:px-8 py-6 sm:py-10 flex-1 overflow-y-auto min-h-0 scrollbar-hide flex flex-col justify-start space-y-3 sm:space-y-4"
            >
              {MENU_ITEMS.map((item, index) => {
                const isItemHovered = hoveredIndex === index;
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.06 * index,
                      duration: 0.4,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className="relative group"
                  >
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="block py-2.5 px-3 rounded-lg hover:bg-white/5 active:bg-white/10 active:scale-[0.98] transition-all focus-visible:outline-none"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {/* Gold hexagon indicator */}
                          <div
                            className={`transition-all duration-300 ${
                              isItemHovered
                                ? "opacity-100 scale-100 translate-x-0"
                                : "opacity-40 scale-75 -translate-x-1"
                            }`}
                          >
                            <IntiossHexagon
                              size={16}
                              fillMaroon
                              strokeColor="#DDB62B"
                            />
                          </div>

                          <span
                            className={`font-marcellus text-xl sm:text-2xl md:text-3xl transition-colors duration-300 ${
                              isItemHovered ? "text-gold" : "text-ivory"
                            }`}
                          >
                            {item.title}
                          </span>
                        </div>

                        <ArrowRight className="w-4 h-4 text-gold/60 group-hover:text-gold group-hover:translate-x-1 transition-all" />
                      </div>

                      {/* Item sub-description */}
                      <p className="font-raleway text-[11px] sm:text-xs text-ivory/50 pl-7 mt-0.5 tracking-wider uppercase">
                        {item.description}
                      </p>

                      {/* Hairline underline on hover */}
                      <div
                        className={`h-[1px] bg-gold mt-2 transition-all duration-300 origin-left ${
                          isItemHovered ? "w-full opacity-100" : "w-0 opacity-0"
                        }`}
                      />
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {/* Mobile App Quick Contact Bar */}
            <div className="relative z-10 p-6 sm:p-8 border-t border-gold/20 bg-maroon-deep/95">
              <span className="font-raleway text-[10px] uppercase tracking-[0.25em] text-gold block mb-3 font-semibold">
                Direct Concierge Access
              </span>
              
              <div className="grid grid-cols-2 gap-2 mb-3">
                <a
                  href={`tel:${SITE_CONFIG.phoneDisplay}`}
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-white/5 hover:bg-white/10 active:scale-95 border border-gold/30 text-ivory text-xs font-montserrat uppercase tracking-wider rounded-none transition-all"
                >
                  <span>Call Desk</span>
                  <ArrowRight className="w-3 h-3 text-gold" />
                </a>

                <a
                  href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent("Hello INTIOSS Concierge, I would like to schedule a private slab consultation.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-maroon hover:bg-maroon/80 active:scale-95 border border-gold text-gold text-xs font-montserrat uppercase tracking-wider rounded-none transition-all font-semibold"
                >
                  <span>WhatsApp</span>
                  <ArrowRight className="w-3 h-3" />
                </a>
              </div>

              <div className="flex items-center justify-between text-[10px] text-ivory/50 tracking-wider">
                <span>South Mumbai · Ahmedabad · Surat</span>
                <span className="text-gold/80">Est. 1970</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
