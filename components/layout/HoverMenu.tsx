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
  { title: "About Us", href: "/about", description: "55+ years heritage · Gandhi Civil Décor Group" },
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
          >
            {/* Subtle Hexagon Pattern Background */}
            <IntiossPattern opacity={0.06} />

            {/* Header with Close Icon */}
            <div className="relative z-10 flex items-center justify-between px-8 pt-8 pb-4 border-b border-gold/20">
              <span className="font-raleway text-xs uppercase tracking-[0.3em] text-gold">
                Navigation Menu
              </span>
              <button
                onClick={onClose}
                aria-label="Close Menu"
                className="p-2 text-ivory/80 hover:text-gold transition-colors focus-visible:outline-gold"
              >
                <X className="w-6 h-6 stroke-[1.5]" />
              </button>
            </div>

            {/* Navigation Links with 80ms Stagger */}
            <div 
              data-lenis-prevent
              className="relative z-10 px-8 py-10 flex-1 overflow-y-auto min-h-0 scrollbar-hide flex flex-col justify-start space-y-4 md:space-y-6"
            >
              {MENU_ITEMS.map((item, index) => {
                const isItemHovered = hoveredIndex === index;
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.08 * index,
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
                      className="block py-2 focus-visible:outline-none"
                    >
                      <div className="flex items-center gap-3">
                        {/* Gold hexagon appears beside hovered item */}
                        <div
                          className={`transition-all duration-300 ${
                            isItemHovered
                              ? "opacity-100 scale-100 translate-x-0"
                              : "opacity-0 scale-75 -translate-x-2"
                          }`}
                        >
                          <IntiossHexagon
                            size={18}
                            fillMaroon
                            strokeColor="#DDB62B"
                          />
                        </div>

                        <span
                          className={`font-marcellus text-2xl md:text-3xl transition-colors duration-300 ${
                            isItemHovered ? "text-gold" : "text-ivory"
                          }`}
                        >
                          {item.title}
                        </span>
                      </div>

                      {/* Item sub-description */}
                      <p className="font-raleway text-xs text-ivory/50 pl-8 mt-1 tracking-wider uppercase">
                        {item.description}
                      </p>

                      {/* Thin Gold line extending under hovered item */}
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

            {/* Footer Strip in Drawer */}
            <div className="relative z-10 p-8 border-t border-gold/20 bg-maroon-deep/90">
              <div className="flex flex-col gap-2">
                <span className="font-raleway text-[11px] uppercase tracking-[0.25em] text-ivory/60">
                  Concierge Desk
                </span>
                <a
                  href={`tel:${SITE_CONFIG.phoneDisplay}`}
                  className="font-montserrat text-sm text-gold hover:underline flex items-center gap-2"
                >
                  {SITE_CONFIG.phoneDisplay}
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
                <span className="font-raleway text-[10px] text-ivory/40 tracking-wider">
                  South Mumbai · Ahmedabad · Surat · Silvassa
                </span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
