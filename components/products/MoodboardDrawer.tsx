"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { StoneProduct } from "@/lib/types";
import { WHATSAPP_NUMBER } from "@/lib/config";
import { X, Heart, MessageSquare, Share2, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface MoodboardDrawerProps {
  moodboard: StoneProduct[];
  onRemove: (productId: string) => void;
  onClear: () => void;
  isOpen: boolean;
  onClose: () => void;
}

export function MoodboardDrawer({
  moodboard,
  onRemove,
  onClear,
  isOpen,
  onClose,
}: MoodboardDrawerProps) {
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      if (typeof window !== "undefined" && (window as any).__lenis) {
        (window as any).__lenis.stop();
      }
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      if (typeof window !== "undefined" && (window as any).__lenis) {
        (window as any).__lenis.start();
      }
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      if (typeof window !== "undefined" && (window as any).__lenis) {
        (window as any).__lenis.start();
      }
    };
  }, [isOpen]);

  const shareOnWhatsApp = () => {
    if (moodboard.length === 0) return;
    const stoneNames = moodboard.map((s) => s.name).join(", ");
    const text = `Hello INTIOSS Concierge, I have curated a project shortlist: ${stoneNames}. Could we discuss sample availability and dry-lay viewing?`;
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`,
      "_blank"
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            onWheel={(e) => e.preventDefault()}
            onTouchMove={(e) => e.preventDefault()}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[98] touch-none"
          />

          {/* Drawer Right */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            data-lenis-prevent="true"
            onWheel={(e) => e.stopPropagation()}
            className="fixed top-0 right-0 bottom-0 w-full sm:w-[460px] bg-ivory text-maroon z-[99] shadow-2xl flex flex-col justify-between border-l border-gold/40 overscroll-contain"
          >
            {/* Header */}
            <div className="p-6 border-b border-gold/30 flex items-center justify-between bg-white flex-shrink-0">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-gold fill-gold" />
                <h3 className="font-marcellus text-xl text-maroon">
                  Your Moodboard Shortlist ({moodboard.length})
                </h3>
              </div>
              <button
                onClick={onClose}
                aria-label="Close Moodboard"
                className="p-1.5 border border-gold/40 text-maroon hover:text-gold"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* List */}
            <div
              data-lenis-prevent="true"
              onWheel={(e) => e.stopPropagation()}
              className="p-6 flex-1 overflow-y-auto space-y-4 overscroll-contain luxury-scrollbar"
              style={{ overscrollBehavior: "contain", WebkitOverflowScrolling: "touch" }}
            >
              {moodboard.length === 0 ? (
                <div className="py-16 text-center text-grey">
                  <Heart className="w-10 h-10 text-gold/40 mx-auto mb-3" />
                  <p className="font-marcellus text-lg text-maroon">Your shortlist is empty</p>
                  <p className="font-poppins text-xs mt-1">
                    Click the heart icon on any stone to curate a custom project palette.
                  </p>
                </div>
              ) : (
                moodboard.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-3 bg-white border border-gold/25 relative group"
                  >
                    <div className="relative w-20 h-20 flex-shrink-0 border border-gold/20 overflow-hidden">
                      <Image
                        src={item.primaryImage}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <span className="font-raleway text-[9px] uppercase tracking-wider text-gold">
                        {item.category} · {item.origin}
                      </span>
                      <Link
                        href={`/products/${item.slug}`}
                        onClick={onClose}
                        className="font-marcellus text-base text-maroon hover:text-gold transition-colors"
                      >
                        {item.name}
                      </Link>
                      <span className="text-[10px] text-grey font-montserrat mt-0.5">
                        {item.veining}
                      </span>
                    </div>
                    <button
                      onClick={() => onRemove(item.id)}
                      aria-label="Remove item"
                      className="p-1 text-grey hover:text-red-700 self-center"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Footer with WhatsApp Export Button */}
            {moodboard.length > 0 && (
              <div className="p-6 border-t border-gold/30 bg-white space-y-3">
                <button
                  onClick={shareOnWhatsApp}
                  className="w-full bg-maroon hover:bg-maroon-deep text-white py-3.5 font-montserrat text-xs uppercase tracking-[0.2em] font-semibold border border-gold shadow flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageSquare className="w-4 h-4 text-gold" />
                  <span>Share Shortlist on WhatsApp</span>
                </button>

                <button
                  onClick={onClear}
                  className="w-full text-center text-xs font-montserrat uppercase tracking-wider text-grey hover:text-maroon underline"
                >
                  Clear Entire Shortlist
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
