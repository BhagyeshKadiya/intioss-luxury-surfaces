"use client";

import React from "react";
import Image from "next/image";
import { StoneProduct } from "@/lib/types";
import { formatPriceTier } from "@/lib/utils";
import { getProductWhatsAppUrl } from "@/lib/config";
import { X, Scale, ArrowRight, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface CompareDrawerProps {
  compareList: StoneProduct[];
  onRemove: (productId: string) => void;
  onClear: () => void;
  isOpen: boolean;
  onToggleOpen: () => void;
}

export function CompareDrawer({
  compareList,
  onRemove,
  onClear,
  isOpen,
  onToggleOpen,
}: CompareDrawerProps) {
  if (compareList.length === 0) return null;

  return (
    <>
      {/* Floating Bottom Pill Trigger */}
      <div className="fixed bottom-6 left-6 z-[85]">
        <button
          onClick={onToggleOpen}
          className="flex items-center gap-2 bg-maroon-deep text-ivory px-4 py-2.5 rounded-none border border-gold shadow-2xl hover:bg-maroon transition-all"
        >
          <Scale className="w-4 h-4 text-gold" />
          <span className="font-montserrat text-xs uppercase tracking-wider font-semibold">
            Compare Stones ({compareList.length}/3)
          </span>
        </button>
      </div>

      {/* Compare Modal / Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 bottom-0 z-[95] max-h-[85vh] overflow-y-auto bg-ivory text-maroon border-t-2 border-gold shadow-2xl p-6 sm:p-8"
          >
            <div className="max-w-7xl mx-auto">
              {/* Header */}
              <div className="flex items-center justify-between pb-6 border-b border-gold/30">
                <div className="flex items-center gap-3">
                  <Scale className="w-5 h-5 text-gold" />
                  <h3 className="font-marcellus text-xl sm:text-2xl text-maroon">
                    Stone Specification Comparison
                  </h3>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={onClear}
                    className="text-xs font-montserrat uppercase tracking-wider text-grey hover:text-maroon underline"
                  >
                    Clear All
                  </button>
                  <button
                    onClick={onToggleOpen}
                    aria-label="Close comparison"
                    className="p-1.5 border border-gold/40 text-maroon hover:text-gold transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Side-by-Side Comparison Table */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
                {compareList.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white border border-gold/30 p-5 flex flex-col justify-between relative shadow-sm"
                  >
                    {/* Remove button */}
                    <button
                      onClick={() => onRemove(product.id)}
                      aria-label="Remove stone"
                      className="absolute top-3 right-3 p-1 text-grey hover:text-maroon border border-grey/20 bg-white"
                    >
                      <X className="w-4 h-4" />
                    </button>

                    <div>
                      {/* Thumbnail */}
                      <div className="relative aspect-[16/9] w-full mb-4 border border-gold/20 overflow-hidden">
                        <Image
                          src={product.primaryImage}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <span className="font-raleway text-[10px] uppercase tracking-wider text-gold block">
                        {product.category}
                      </span>
                      <h4 className="font-marcellus text-lg text-maroon">
                        {product.name}
                      </h4>

                      {/* Specs List */}
                      <div className="mt-4 space-y-2 text-xs divide-y divide-gold/15">
                        <div className="pt-2 flex justify-between">
                          <span className="text-grey font-raleway uppercase">Origin:</span>
                          <span className="font-montserrat font-medium text-maroon">{product.origin}</span>
                        </div>
                        <div className="pt-2 flex justify-between">
                          <span className="text-grey font-raleway uppercase">Veining:</span>
                          <span className="font-montserrat font-medium text-maroon">{product.veining}</span>
                        </div>
                        <div className="pt-2 flex justify-between">
                          <span className="text-grey font-raleway uppercase">Price Tier:</span>
                          <span className="font-montserrat font-medium text-maroon">{formatPriceTier(product.priceTier)}</span>
                        </div>
                        <div className="pt-2 flex justify-between">
                          <span className="text-grey font-raleway uppercase">Density:</span>
                          <span className="font-montserrat text-maroon">{product.specs.density || "2.7 g/cm³"}</span>
                        </div>
                        <div className="pt-2 flex justify-between">
                          <span className="text-grey font-raleway uppercase">Absorption:</span>
                          <span className="font-montserrat text-maroon">{product.specs.waterAbsorption || "0.1%"}</span>
                        </div>
                        <div className="pt-2">
                          <span className="text-grey font-raleway uppercase block mb-1">Finishes:</span>
                          <div className="flex flex-wrap gap-1">
                            {product.finishes.map((f) => (
                              <span key={f} className="text-[10px] bg-ivory px-1.5 py-0.5 border border-gold/30">
                                {f}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="mt-6 pt-4 border-t border-gold/20 flex gap-2">
                      <a
                        href={getProductWhatsAppUrl(product.name)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-maroon hover:bg-maroon-deep text-white py-2 text-center text-[10px] font-montserrat uppercase tracking-wider font-semibold border border-gold flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <MessageSquare className="w-3.5 h-3.5 text-gold" />
                        <span>Enquire</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
