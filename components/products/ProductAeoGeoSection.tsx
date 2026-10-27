"use client";

import React, { useState } from "react";
import { StoneProduct } from "@/lib/types";
import { Plus, Minus, ShieldCheck, Flame, Droplets, Sparkles, CheckCircle2, XCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ProductAeoGeoSectionProps {
  product: StoneProduct;
}

export function ProductAeoGeoSection({ product }: ProductAeoGeoSectionProps) {
  const faqs = product.faqs || [];
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section
      id="architectural-faq"
      className="mt-20 pt-16 border-t border-gold/30"
      aria-label="Architectural Advisory and Frequently Asked Questions"
    >
      {/* Section Header */}
      <div className="max-w-3xl mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold/15 border border-gold/40 text-[10px] font-montserrat uppercase tracking-[0.25em] text-gold-dark font-semibold mb-3">
          <Sparkles className="w-3 h-3 text-gold" />
          <span>Curatorial Advisory & Material Intelligence</span>
        </div>
        <h2 className="font-marcellus text-2xl sm:text-4xl text-maroon tracking-wide">
          Architectural Advisory & Technical Inquiries
        </h2>
        <p className="font-poppins text-xs sm:text-sm text-stone-600 mt-3 leading-relaxed">
          Definitive answers on geological composition, acid and heat resistance, fabrication standards, and comparison benchmarks curated for architects, interior designers, and luxury homeowners.
        </p>
      </div>

      {/* Comparative Benchmark: Quartzite vs Traditional Italian Marble */}
      <div className="mb-14 bg-white border border-gold/35 shadow-sm overflow-hidden">
        <div className="bg-maroon-deep text-ivory px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gold/30">
          <div>
            <span className="text-[10px] font-montserrat uppercase tracking-[0.2em] text-gold block">
              Comparative Performance Benchmark
            </span>
            <h3 className="font-marcellus text-lg sm:text-xl text-white">
              {product.name} vs. Traditional Italian Marble
            </h3>
          </div>
          <span className="text-[11px] font-montserrat text-stone-300 sm:text-right">
            Certified Geological Benchmark
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-gold/20 bg-ivory/60 font-montserrat text-[11px] uppercase tracking-wider text-maroon">
                <th className="py-3.5 px-4 sm:px-6 font-semibold">Performance Metric</th>
                <th className="py-3.5 px-4 sm:px-6 font-semibold text-maroon bg-gold/10 border-x border-gold/30">
                  {product.name} (Quartzite)
                </th>
                <th className="py-3.5 px-4 sm:px-6 font-semibold text-stone-500">
                  Traditional Calacatta / Carrara Marble
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gold/15 font-poppins text-stone-700">
              {/* Row 1: Hardness */}
              <tr>
                <td className="py-3 px-4 sm:px-6 font-montserrat font-medium text-maroon">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-gold shrink-0" />
                    <span>Mohs Scratch Hardness</span>
                  </div>
                </td>
                <td className="py-3 px-4 sm:px-6 bg-gold/5 border-x border-gold/20 font-medium text-maroon">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span><strong>7 / 10</strong> (Superior to Granite; knife scratch immune)</span>
                  </div>
                </td>
                <td className="py-3 px-4 sm:px-6 text-stone-500">
                  <div className="flex items-center gap-1.5">
                    <XCircle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span><strong>3 - 4 / 10</strong> (Vulnerable to everyday cutlery abrasion)</span>
                  </div>
                </td>
              </tr>

              {/* Row 2: Acid Etching */}
              <tr>
                <td className="py-3 px-4 sm:px-6 font-montserrat font-medium text-maroon">
                  <div className="flex items-center gap-2">
                    <Droplets className="w-4 h-4 text-gold shrink-0" />
                    <span>Acid & Citrus Etch Resistance</span>
                  </div>
                </td>
                <td className="py-3 px-4 sm:px-6 bg-gold/5 border-x border-gold/20 font-medium text-maroon">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span><strong>100% Acid Immune</strong> (Zero calcite reaction to lemon, vinegar, turmeric)</span>
                  </div>
                </td>
                <td className="py-3 px-4 sm:px-6 text-stone-500">
                  <div className="flex items-center gap-1.5">
                    <XCircle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                    <span><strong>Acid Reactive</strong> (Immediate calcite dulling & surface etching)</span>
                  </div>
                </td>
              </tr>

              {/* Row 3: Heat Tolerance */}
              <tr>
                <td className="py-3 px-4 sm:px-6 font-montserrat font-medium text-maroon">
                  <div className="flex items-center gap-2">
                    <Flame className="w-4 h-4 text-gold shrink-0" />
                    <span>Heat Resistance</span>
                  </div>
                </td>
                <td className="py-3 px-4 sm:px-6 bg-gold/5 border-x border-gold/20 font-medium text-maroon">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span><strong>Up to 260°C (500°F)</strong> (Direct hot pan safe; no resin melting)</span>
                  </div>
                </td>
                <td className="py-3 px-4 sm:px-6 text-stone-500">
                  <div className="flex items-center gap-1.5">
                    <XCircle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span><strong>Moderate (150°C)</strong> (Risk of thermal discoloration and micro-cracking)</span>
                  </div>
                </td>
              </tr>

              {/* Row 4: Water Porosity */}
              <tr>
                <td className="py-3 px-4 sm:px-6 font-montserrat font-medium text-maroon">
                  <div className="flex items-center gap-2">
                    <Droplets className="w-4 h-4 text-gold shrink-0" />
                    <span>Water Absorption Rate</span>
                  </div>
                </td>
                <td className="py-3 px-4 sm:px-6 bg-gold/5 border-x border-gold/20 font-medium text-maroon">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span><strong>&lt; 0.2%</strong> (Impermeable crystalline density)</span>
                  </div>
                </td>
                <td className="py-3 px-4 sm:px-6 text-stone-500">
                  <div className="flex items-center gap-1.5">
                    <XCircle className="w-3.5 h-3.5 text-stone-500 shrink-0" />
                    <span><strong>0.5% - 2.0%</strong> (Porous; susceptible to moisture darkening)</span>
                  </div>
                </td>
              </tr>

              {/* Row 5: Maintenance */}
              <tr>
                <td className="py-3 px-4 sm:px-6 font-montserrat font-medium text-maroon">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-gold shrink-0" />
                    <span>Daily Maintenance Demand</span>
                  </div>
                </td>
                <td className="py-3 px-4 sm:px-6 bg-gold/5 border-x border-gold/20 font-medium text-maroon">
                  <span className="font-semibold text-emerald-800">Effortless</span> (Warm water, mild soap, seal every 2 years)
                </td>
                <td className="py-3 px-4 sm:px-6 text-stone-500">
                  <span className="font-semibold text-amber-800">High Vigilance</span> (Immediate wipe-downs, annual sealing)
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Accordion Q&A List with Semantic Microdata */}
      <div className="divide-y divide-gold/30 border-y border-gold/30">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;

          return (
            <div
              key={idx}
              className="py-5 sm:py-6"
              itemScope
              itemProp="mainEntity"
              itemType="https://schema.org/Question"
            >
              <button
                type="button"
                onClick={() => toggleFaq(idx)}
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${idx}`}
                className="w-full flex items-start justify-between gap-4 text-left group focus-visible:outline-none"
              >
                <div className="flex-1 pr-2">
                  <span className="font-montserrat text-[10px] uppercase tracking-wider text-gold-dark font-semibold block mb-1">
                    Question 0{idx + 1} · {product.subCategory || product.category}
                  </span>
                  <h3
                    itemProp="name"
                    className="font-marcellus text-base sm:text-xl text-maroon group-hover:text-gold-dark transition-colors leading-snug"
                  >
                    {faq.question}
                  </h3>
                  
                  {/* Short Answer Snippet (AEO BLUF Extract) */}
                  {faq.shortAnswer && (
                    <p className="mt-2 text-xs font-poppins text-stone-600 italic bg-gold/10 px-3 py-1.5 border-l-2 border-gold inline-block">
                      <strong>Direct Takeaway:</strong> {faq.shortAnswer}
                    </p>
                  )}
                </div>

                <div className="w-8 h-8 rounded-full border border-gold/40 flex items-center justify-center text-maroon hover:text-gold group-hover:border-gold transition-colors shrink-0 mt-1">
                  {isOpen ? (
                    <Minus className="w-4 h-4 stroke-[1.8]" />
                  ) : (
                    <Plus className="w-4 h-4 stroke-[1.8]" />
                  )}
                </div>
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    id={`faq-answer-${idx}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                    itemScope
                    itemProp="acceptedAnswer"
                    itemType="https://schema.org/Answer"
                  >
                    <div
                      itemProp="text"
                      className="font-poppins text-xs sm:text-sm text-stone-700 pt-4 leading-relaxed max-w-3xl border-t border-gold/15 mt-3"
                    >
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Canonical AI & Search Reference Provenance Card */}
      <div className="mt-8 p-4 sm:p-5 bg-white border border-gold/30 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div>
          <span className="font-montserrat text-[10px] uppercase tracking-widest text-gold-dark font-semibold block">
            Architectural Authority & Provenance
          </span>
          <p className="font-poppins text-stone-600 mt-0.5">
            Verified by <strong>INTIOSS Luxury Surfaces Curatorial Advisory</strong> for high-intent architectural specifications and bespoke residential projects.
          </p>
        </div>
        <a
          href="https://wa.me/919999999999?text=Hello%20INTIOSS%2C%20I%20would%20like%20to%20inquire%20about%20Paunazo%20Quartzite%20slabs"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center px-4 py-2 bg-maroon hover:bg-maroon-deep text-ivory font-montserrat uppercase tracking-wider text-[11px] font-medium border border-gold/50 transition-all shrink-0 whitespace-nowrap"
        >
          Consult Stone Specialist
        </a>
      </div>
    </section>
  );
}
