"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { TESTIMONIALS } from "@/data/testimonials";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function TestimonialsSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    duration: 45, // Slow, silky motion
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  // Auto-advance every 7 seconds, pausing on hover
  useEffect(() => {
    if (!emblaApi || isPaused) return;
    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 7000);
    return () => clearInterval(interval);
  }, [emblaApi, isPaused]);

  return (
    <section
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative py-24 sm:py-32 bg-maroon-deep text-ivory overflow-hidden border-t border-gold/30"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Eyebrow */}
        <div className="text-center mb-8">
          <span className="font-raleway font-light text-xs sm:text-sm uppercase tracking-[0.3em] text-gold">
            Architect & Client Commendations
          </span>
        </div>

        {/* Embla Carousel Viewport */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {TESTIMONIALS.map((item) => (
              <div
                key={item.id}
                className="flex-[0_0_100%] min-w-0 px-4 sm:px-8 text-center flex flex-col items-center select-none"
              >
                {/* Giant Gold Quotation Mark */}
                <div
                  className="font-garamond text-7xl sm:text-9xl text-gold/40 leading-none select-none mb-2"
                  aria-hidden="true"
                >
                  “
                </div>

                {/* Pull Quote in EB Garamond */}
                <blockquote className="font-garamond text-xl sm:text-2xl md:text-3xl text-ivory/95 italic font-normal leading-relaxed max-w-3xl">
                  {item.quote}
                </blockquote>

                {/* Client Metadata */}
                <div className="mt-8 flex flex-col items-center">
                  {item.image && (
                    <div className="relative w-16 h-16 rounded-full overflow-hidden mb-4 border-2 border-gold/40">
                      <Image
                        src={item.image}
                        alt={item.clientName}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <cite className="font-marcellus text-base sm:text-lg text-gold not-italic tracking-wide">
                    {item.clientName}
                  </cite>
                  <span className="font-montserrat text-xs uppercase tracking-widest text-ivory/70 mt-1">
                    {item.clientRole} · {item.city}
                  </span>
                  <span className="font-raleway text-[11px] text-ivory/40 tracking-wider mt-0.5">
                    {item.projectScope}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Carousel Controls */}
        <div className="mt-12 flex items-center justify-center gap-6">
          <button
            onClick={scrollPrev}
            aria-label="Previous testimonial"
            className="w-10 h-10 rounded-full border border-gold/40 flex items-center justify-center text-ivory hover:text-gold hover:border-gold transition-colors focus-visible:outline-gold"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Dots Indicator */}
          <div className="flex items-center gap-2">
            {TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => emblaApi?.scrollTo(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`transition-all duration-300 ${
                  selectedIndex === idx
                    ? "w-6 h-1.5 bg-gold rounded-none"
                    : "w-1.5 h-1.5 bg-ivory/30 rounded-none hover:bg-ivory/60"
                }`}
              />
            ))}
          </div>

          <button
            onClick={scrollNext}
            aria-label="Next testimonial"
            className="w-10 h-10 rounded-full border border-gold/40 flex items-center justify-center text-ivory hover:text-gold hover:border-gold transition-colors focus-visible:outline-gold"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
