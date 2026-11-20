"use client";

import React, { useState } from "react";
import { FAQS } from "@/data/faqs";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { HexagonBackground } from "@/components/brand/HexagonBackground";
import { IntiossHexagon } from "@/components/brand/IntiossHexagon";

export function FaqSection() {
  const [openId, setOpenId] = useState<string | null>(FAQS[0].id);

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="relative py-20 sm:py-28 bg-maroon-deep text-ivory overflow-hidden border-t border-gold/30">
      {/* Luxury Animated Hexagon Background in Dark Theme */}
      <HexagonBackground
        theme="dark"
        intensity="subtle"
        showPattern={true}
        showFloating={true}
      />

      {/* Ambient background glows */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gold/10 rounded-full blur-[160px]" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-[#6B2236]/50 rounded-full blur-[160px]" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 mb-3.5 px-4 py-1.5 rounded-full bg-white/10 border border-gold/40 shadow-xs backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            <IntiossHexagon size={15} useVector={true} enablePrismaticGlint={true} />
            <span className="font-montserrat text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-gold font-semibold">
              INTIOSS Advisory • Guidance & Standards
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
          </div>

          <h2 className="font-marcellus text-3xl sm:text-5xl text-ivory tracking-wide">
            Frequently Asked Questions
          </h2>
          <p className="font-jost text-sm sm:text-base text-ivory/80 mt-3 max-w-xl mx-auto leading-relaxed">
            Everything you need to know about our sourcing, materials, architectural services, and comprehensive stone care.
          </p>
        </div>

        {/* Accordion List with Hairline Dividers */}
        <div className="divide-y divide-gold/25 bg-[#3B121D]/90 rounded-2xl px-6 sm:px-8 py-3 border border-gold/40 shadow-2xl backdrop-blur-md">
          {FAQS.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div key={faq.id} className="py-5 sm:py-6">
                <button
                  type="button"
                  onClick={() => toggleItem(faq.id)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 text-left group focus-visible:outline-none py-1 cursor-pointer"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-3">
                    <span className="font-montserrat text-[10px] sm:text-[11px] uppercase tracking-wider text-gold font-semibold px-2 py-0.5 rounded bg-white/10 border border-gold/30">
                      {faq.category}
                    </span>
                    <h3 className="font-marcellus text-base sm:text-xl text-ivory group-hover:text-gold transition-colors leading-snug">
                      {faq.question}
                    </h3>
                  </div>

                  {/* Gold Plus / Minus Icon */}
                  <div className="w-8 h-8 rounded-full border border-gold/40 bg-white/10 flex items-center justify-center text-gold group-hover:border-gold group-hover:bg-gold group-hover:text-maroon-deep transition-all flex-shrink-0 active:scale-90">
                    {isOpen ? (
                      <Minus className="w-4 h-4 stroke-[2]" />
                    ) : (
                      <Plus className="w-4 h-4 stroke-[2]" />
                    )}
                  </div>
                </button>

                {/* Animated Answer Drawer */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="font-jost text-xs sm:text-sm text-ivory/90 pt-3 sm:pt-4 leading-relaxed pr-2 sm:pr-8">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
