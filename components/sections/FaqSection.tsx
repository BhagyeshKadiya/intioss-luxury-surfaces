"use client";

import React, { useState } from "react";
import { FAQS } from "@/data/faqs";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { HexagonBackground } from "@/components/brand/HexagonBackground";

export function FaqSection() {
  const [openId, setOpenId] = useState<string | null>(FAQS[0].id);

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="relative py-24 sm:py-32 bg-ivory text-maroon overflow-hidden border-t border-gold/30">
      {/* Luxury Animated Hexagon Background: Exact INTIOSS Logo Symbol with Spider & Lighting Effects */}
      <HexagonBackground
        theme="light"
        intensity="subtle"
        showPattern={true}
        showFloating={true}
        enableSpiderEffect={true}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="font-raleway font-semibold text-xs sm:text-sm uppercase tracking-[0.3em] text-gold-dark mb-3 block">
            INTIOSS Advisory
          </span>
          <h2 className="font-marcellus text-3xl sm:text-5xl text-maroon tracking-wide">
            Frequently Asked Questions
          </h2>
          <p className="font-poppins text-xs sm:text-sm text-stone-700 mt-4 max-w-xl mx-auto leading-relaxed">
            Everything you need to know about our sourcing, materials, architectural services, and comprehensive stone care.
          </p>
        </div>

        {/* Accordion List with Hairline Dividers */}
        <div className="divide-y divide-gold/30 border-y border-gold/30">
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
                    <span className="font-raleway text-[10px] sm:text-[11px] uppercase tracking-wider text-gold-dark font-semibold">
                      {faq.category}
                    </span>
                    <h3 className="font-marcellus text-base sm:text-xl text-maroon group-hover:text-maroon-deep transition-colors leading-snug">
                      {faq.question}
                    </h3>
                  </div>

                  {/* Gold Plus / Minus Icon */}
                  <div className="w-8 h-8 rounded-full border border-gold/40 flex items-center justify-center text-maroon hover:text-gold group-hover:border-gold transition-colors flex-shrink-0 active:scale-90">
                    {isOpen ? (
                      <Minus className="w-4 h-4 stroke-[1.8]" />
                    ) : (
                      <Plus className="w-4 h-4 stroke-[1.8]" />
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
                      <p className="font-poppins text-xs sm:text-sm text-stone-700 pt-3 sm:pt-4 leading-relaxed pr-2 sm:pr-8">
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
