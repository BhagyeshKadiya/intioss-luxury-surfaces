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
    <section className="relative py-20 sm:py-28 bg-[#FAF7F2] text-maroon-deep overflow-hidden border-t border-gold/30">
      {/* Luxury Animated Hexagon Background in Light Mode */}
      <HexagonBackground
        theme="light"
        intensity="subtle"
        showPattern={true}
        showFloating={true}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 mb-3.5 px-4 py-1.5 rounded-full bg-maroon-deep/5 border border-gold/40 shadow-xs backdrop-blur-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-dark animate-pulse" />
            <IntiossHexagon size={15} useVector={true} enablePrismaticGlint={true} />
            <span className="font-montserrat text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-maroon-deep font-semibold">
              INTIOSS Advisory • Guidance & Standards
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-gold-dark animate-pulse" />
          </div>

          <h2 className="font-marcellus text-3xl sm:text-5xl text-maroon-deep tracking-wide">
            Frequently Asked Questions
          </h2>
          <p className="font-jost text-sm sm:text-base text-stone-600 mt-3 max-w-xl mx-auto leading-relaxed">
            Everything you need to know about our sourcing, materials, architectural services, and comprehensive stone care.
          </p>
        </div>

        {/* Accordion List with Hairline Dividers */}
        <div className="divide-y divide-gold/25 bg-white rounded-2xl px-6 sm:px-8 py-3 border border-gold/30 shadow-lg">
          {FAQS.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div key={faq.id} className="py-5 sm:py-6">
                <button
                  type="button"
                  onClick={() => toggleItem(faq.id)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 text-left group focus-visible:outline-none py-1"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-3">
                    <span className="font-montserrat text-[10px] sm:text-[11px] uppercase tracking-wider text-maroon font-semibold px-2 py-0.5 rounded bg-maroon-deep/5 border border-gold/30">
                      {faq.category}
                    </span>
                    <h3 className="font-marcellus text-base sm:text-xl text-maroon-deep group-hover:text-gold-dark transition-colors leading-snug">
                      {faq.question}
                    </h3>
                  </div>

                  {/* Gold Plus / Minus Icon */}
                  <div className="w-8 h-8 rounded-full border border-gold/40 bg-[#FAF7F2] flex items-center justify-center text-maroon-deep group-hover:border-gold group-hover:text-gold-dark transition-all flex-shrink-0 active:scale-90">
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
                      <p className="font-jost text-xs sm:text-sm text-stone-700 pt-3 sm:pt-4 leading-relaxed pr-2 sm:pr-8">
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
