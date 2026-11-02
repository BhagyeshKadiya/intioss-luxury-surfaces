"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  MessageSquare,
  Wrench,
  CheckCircle2,
} from "lucide-react";
import { SERVICES } from "@/data/services";
import { getWhatsAppUrl } from "@/lib/config";

export function ServicesShowcaseCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsVisible, setItemsVisible] = useState(3);
  const [isHovered, setIsHovered] = useState(false);

  // Responsive items count: mobile = 1, tablet = 2, desktop = 3
  useEffect(() => {
    const updateItemsVisible = () => {
      if (window.innerWidth < 640) {
        setItemsVisible(1);
      } else if (window.innerWidth < 1024) {
        setItemsVisible(2);
      } else {
        setItemsVisible(3);
      }
    };
    updateItemsVisible();
    window.addEventListener("resize", updateItemsVisible);
    return () => window.removeEventListener("resize", updateItemsVisible);
  }, []);

  const totalItems = SERVICES.length;
  const maxIndex = Math.max(0, totalItems - itemsVisible);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
  }, [maxIndex]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
  }, [maxIndex]);

  // Auto-advance every 6s when not hovered
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(interval);
  }, [handleNext, isHovered]);

  return (
    <section className="mb-20 sm:mb-28">
      {/* Carousel Header Bar */}
      <div className="flex items-center justify-between mb-8 px-1">
        <div>
          <div className="inline-flex items-center gap-2 mb-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            <span className="font-montserrat text-[11px] uppercase tracking-[0.25em] text-gold-dark font-semibold">
              Architectural Disciplines Carousel
            </span>
          </div>
          <h2 className="font-marcellus text-2xl sm:text-3xl text-maroon">
            End-to-End Stone Capabilities
          </h2>
        </div>

        {/* Navigation Arrow Controls */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous service"
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white border border-gold/40 hover:border-gold hover:bg-gold/10 text-maroon shadow-sm flex items-center justify-center transition-all duration-200 active:scale-95 cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5 text-maroon" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next service"
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white border border-gold/40 hover:border-gold hover:bg-gold/10 text-maroon shadow-sm flex items-center justify-center transition-all duration-200 active:scale-95 cursor-pointer"
          >
            <ChevronRight className="w-5 h-5 text-maroon" />
          </button>
        </div>
      </div>

      {/* Carousel Track */}
      <div
        className="relative overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          className="flex transition-transform duration-500 ease-out -mx-3"
          style={{
            transform: `translateX(-${currentIndex * (100 / itemsVisible)}%)`,
          }}
        >
          {SERVICES.map((service, idx) => (
            <div
              key={service.id}
              className="flex-shrink-0 px-3"
              style={{ width: `${100 / itemsVisible}%` }}
            >
              <div className="h-full bg-white rounded-2xl border border-gold/30 shadow-md hover:shadow-xl hover:border-gold transition-all duration-300 overflow-hidden flex flex-col group">
                {/* Image Header with Discipline Badge & Zoom */}
                <div className="relative h-[230px] sm:h-[250px] w-full overflow-hidden bg-stone-100 flex-shrink-0">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-maroon-deep/90 via-maroon-deep/20 to-transparent pointer-events-none" />

                  {/* Top Discipline Number Badge */}
                  <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none">
                    <span className="px-2.5 py-1 rounded-full text-[9px] sm:text-[10px] font-montserrat uppercase tracking-wider font-semibold bg-maroon-deep/90 text-ivory border border-gold/40 shadow-xs backdrop-blur-xs">
                      Discipline 0{idx + 1}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-montserrat uppercase tracking-wider font-medium bg-gold text-maroon-deep shadow-xs">
                      Active
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-4 right-4 pointer-events-none">
                    <span className="text-[10px] font-montserrat uppercase tracking-widest text-gold/90 font-medium block">
                      In-House & Group Capabilities
                    </span>
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-5 sm:p-6 flex flex-col justify-between flex-1 bg-white">
                  <div>
                    <h3 className="font-marcellus text-xl sm:text-2xl text-maroon group-hover:text-gold-dark transition-colors line-clamp-1">
                      {service.title}
                    </h3>
                    <p className="font-jost text-xs sm:text-sm text-stone-600 mt-2 line-clamp-2 leading-relaxed">
                      {service.shortDesc}
                    </p>

                    {/* Quick Capabilities */}
                    <ul className="mt-4 space-y-1.5 border-t border-gold/15 pt-3">
                      {service.capabilities.slice(0, 2).map((cap, cIdx) => (
                        <li key={cIdx} className="flex items-center gap-2 text-xs font-jost text-stone-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-gold shrink-0" />
                          <span className="line-clamp-1">{cap}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Strip */}
                  <div className="mt-5 pt-3.5 border-t border-gold/15 flex items-center justify-between gap-2">
                    <Link
                      href={`#${service.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-montserrat uppercase tracking-wider font-semibold text-maroon group-hover:text-gold-dark transition-colors"
                    >
                      <span>Explore Details</span>
                      <ArrowRight className="w-3.5 h-3.5 text-gold group-hover:translate-x-1 transition-transform" />
                    </Link>

                    <a
                      href={getWhatsAppUrl(`Hello INTIOSS, I would like to inquire about ${service.title}.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] font-montserrat uppercase tracking-wider text-stone-500 hover:text-maroon inline-flex items-center gap-1"
                    >
                      <MessageSquare className="w-3 h-3 text-gold" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Pagination Progress Dots */}
      <div className="flex items-center justify-center gap-2 mt-8">
        {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setCurrentIndex(idx)}
            aria-label={`Go to service slide ${idx + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
              currentIndex === idx
                ? "w-8 bg-gold shadow-sm"
                : "w-2 bg-stone-300 hover:bg-stone-400"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

