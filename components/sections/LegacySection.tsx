"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "motion/react";
import { SITE_CONFIG } from "@/lib/config";
import { ExternalLink, Sparkles, MapPin, Award } from "lucide-react";

const TIMELINE_MILESTONES = [
  {
    year: "1971",
    period: "Pioneering Foundations",
    title: "Civil Stone Masonry in Western India",
    desc: "First commercial stone civil works in Western India. Master stonemasons carving monolithic foundations for institutional and high-profile landmarks.",
    stat: "1st Generation Masons",
    location: "Western India",
  },
  {
    year: "1997",
    period: "Corporate Inception",
    title: "Gandhi Civil Decor Incorporation",
    desc: "Formal corporate incorporation delivering turnkey luxury residential interiors and architectural stonework for South Mumbai's most prestigious estates.",
    stat: "500+ Luxury Estates",
    location: "Mumbai & Gujarat",
  },
  {
    year: "2008",
    period: "Direct Alpine Alliances",
    title: "Direct Italian Quarry Partnerships",
    desc: "Direct block procurement partnerships established in Carrara, Verona, and Brescia. Eliminating middlemen to inspect and claim the finest mountain vein cuts.",
    stat: "100% Direct Sourcing",
    location: "Carrara & Verona, Italy",
  },
  {
    year: "2018",
    period: "Industrial Mastery",
    title: "Silvassa High-Tech Processing Facility",
    desc: "Commissioned a 100,000 sq.ft state-of-the-art facility equipped with multi-wire diamond gang saws, robotic resin lines, and 5-axis CNC architectural carving.",
    stat: "100,000 Sq.Ft Facility",
    location: "Silvassa Processing Plant",
  },
  {
    year: "Today",
    period: "The Masterpiece Atelier",
    title: "INTIOSS Luxury Surfaces",
    desc: "The dedicated ultra-luxury brand for discerning architects and private estates. Curating rare Italian marble, precious onyx, and zero-tolerance precision fitting.",
    stat: "Zero-Tolerance Fitting",
    location: "South Mumbai Atelier & Gujarat",
  },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1800; // ms
    const stepTime = 25;
    const steps = duration / stepTime;
    const increment = value / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {displayValue.toLocaleString()}
      {suffix}
    </span>
  );
}

export function LegacySection() {
  const [activeIdx, setActiveIdx] = useState(4); // Default to "Today"
  const timelineRef = useRef<HTMLDivElement>(null);
  const isTimelineInView = useInView(timelineRef, { once: true, amount: 0.2 });

  return (
    <section className="relative py-24 sm:py-32 bg-ivory text-maroon overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Split Layout: Editorial Image Left, Story Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Heritage Founder & Architecture Editorial Image with Zoom In/Out Motion */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[3/4] w-full overflow-hidden border border-gold/40 shadow-2xl bg-maroon-deep">
              <motion.div
                animate={{
                  scale: [1, 1.08, 1],
                }}
                transition={{
                  duration: 14,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-full h-full relative"
              >
                <Image
                  src="/images/legacy-founder.jpg"
                  alt="Gandhi Civil Decor & Quality Marble Heritage — 55+ Years of Provenance"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-center"
                  priority
                />
              </motion.div>

              {/* Scrim Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-maroon-deep/80 via-transparent to-transparent pointer-events-none z-10" />

              {/* Floating Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-4 bg-maroon-deep/90 text-ivory border border-gold/50 shadow-lg backdrop-blur-sm z-20">
                <span className="font-raleway text-[10px] uppercase tracking-[0.25em] text-gold block">
                  Heritage Standard
                </span>
                <span className="font-marcellus text-base sm:text-lg">
                  Zero-Tolerance Master Fitting Since 1971
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Copy, Heritage & Counters (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <span className="font-raleway font-light text-xs sm:text-sm uppercase tracking-[0.3em] text-grey mb-3">
              Provenance & Lineage
            </span>
            <h2 className="font-marcellus text-3xl sm:text-5xl text-maroon tracking-wide mb-6">
              Backed by 55+ Years of Experience.
            </h2>

            <div className="space-y-4 font-poppins text-xs sm:text-sm text-grey leading-relaxed">
              <p>
                INTIOSS was born out of an uncompromising architectural truth: fine marble cannot be treated as a commodity. A rare slab quarried high in the Tuscan mountains requires structural mastery, zero-deflection substrate engineering, and generational stonemasonry before it can rest upon a private salon floor.
              </p>
              <p>
                As the dedicated luxury surfaces arm of the{" "}
                <strong className="text-maroon font-montserrat font-medium">Gandhi Civil Decor Group</strong> and a direct subsidiary of{" "}
                <strong className="text-maroon font-montserrat font-medium">Quality Marble</strong>, INTIOSS bridges the gap between mountain quarry benches in Italy and the most prestigious penthouses and estates of South Mumbai and Gujarat.
              </p>
            </div>

            {/* Parent Brand Link */}
            <div className="mt-6 pt-4 border-t border-gold/20">
              <a
                href={SITE_CONFIG.parentBrand.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-montserrat text-xs uppercase tracking-[0.2em] text-maroon hover:text-gold transition-colors font-medium"
              >
                <span>Our Parent Brand: Quality Marble</span>
                <ExternalLink className="w-3.5 h-3.5 text-gold" />
              </a>
            </div>

            {/* Animated Counters Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-10 pt-8 border-t border-gold/30">
              {SITE_CONFIG.stats.map((stat, i) => (
                <div key={i} className="flex flex-col">
                  <span className="font-marcellus text-3xl sm:text-4xl text-maroon font-normal">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </span>
                  <span className="font-raleway text-[11px] uppercase tracking-wider text-grey mt-1">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Milestone Timeline: "The Evolution of Excellence" with Animated Motion */}
        <div ref={timelineRef} className="mt-24 pt-16 border-t border-gold/30">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <span className="font-raleway text-xs sm:text-sm uppercase tracking-[0.3em] text-gold block mb-2 font-medium">
                Milestone History
              </span>
              <h3 className="font-marcellus text-2xl sm:text-4xl text-maroon tracking-wide">
                The Evolution of Excellence
              </h3>
            </div>
            <p className="font-poppins text-xs sm:text-sm text-grey max-w-md">
              Tracing five decades of pioneering quarry discovery, precision diamond cutting, and zero-tolerance architectural fittings.
            </p>
          </div>

          {/* Interactive Timeline Track & Nodes */}
          <div className="relative mb-12 pt-4">
            {/* Background Base Rail Line */}
            <div className="hidden md:block absolute top-[28px] left-[5%] right-[5%] h-[2px] bg-gold/20 z-0" />

            {/* Dynamic Gold Animated Progress Line */}
            <motion.div
              className="hidden md:block absolute top-[28px] left-[5%] h-[2px] bg-gradient-to-r from-gold via-gold-light to-gold shadow-sm z-0"
              initial={{ width: 0 }}
              animate={
                isTimelineInView
                  ? {
                      width: `${(activeIdx / (TIMELINE_MILESTONES.length - 1)) * 90}%`,
                    }
                  : { width: 0 }
              }
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            />

            {/* Shimmer Light Pulse running along the line */}
            <motion.div
              className="hidden md:block absolute top-[27px] left-[5%] w-16 h-[4px] bg-gradient-to-r from-transparent via-gold-light to-transparent rounded-full z-0 pointer-events-none"
              animate={{
                x: ["0%", "550%"],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* 5 Milestone Year Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 md:gap-2 relative z-10">
              {TIMELINE_MILESTONES.map((item, idx) => {
                const isActive = activeIdx === idx;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveIdx(idx)}
                    onMouseEnter={() => setActiveIdx(idx)}
                    className="flex flex-col items-center text-center group cursor-pointer focus:outline-none py-2"
                  >
                    {/* Node with Animated Halo */}
                    <div className="relative flex items-center justify-center mb-3">
                      {/* Pulse Ring on Active */}
                      {isActive && (
                        <motion.div
                          layoutId="node-halo"
                          className="absolute -inset-2.5 rounded-full border border-gold/60 bg-gold/10"
                          transition={{ type: "spring", stiffness: 350, damping: 25 }}
                        />
                      )}

                      <motion.div
                        animate={{
                          scale: isActive ? 1.2 : 1,
                          backgroundColor: isActive ? "#541B2A" : "#FAF7F2",
                          borderColor: isActive ? "#DDB62B" : "rgba(221, 182, 43, 0.5)",
                        }}
                        transition={{ duration: 0.3 }}
                        className="w-8 h-8 rounded-full border-2 flex items-center justify-center shadow-sm group-hover:border-gold transition-colors z-10"
                      >
                        <motion.div
                          animate={{
                            scale: isActive ? 1.4 : 1,
                            backgroundColor: isActive ? "#DDB62B" : "#541B2A",
                          }}
                          className="w-2.5 h-2.5 rounded-full"
                        />
                      </motion.div>
                    </div>

                    {/* Year Label */}
                    <span
                      className={`font-montserrat font-semibold text-sm sm:text-base tracking-wider transition-colors duration-300 ${
                        isActive ? "text-maroon font-bold scale-105" : "text-grey group-hover:text-maroon"
                      }`}
                    >
                      {item.year}
                    </span>

                    {/* Period Subtitle */}
                    <span
                      className={`font-raleway text-[10px] uppercase tracking-wider transition-colors duration-300 mt-0.5 line-clamp-1 ${
                        isActive ? "text-gold font-medium" : "text-grey/60 group-hover:text-grey"
                      }`}
                    >
                      {item.period}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Era Spotlight Showcase Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIdx}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="relative p-6 sm:p-10 bg-white/80 backdrop-blur-md border border-gold/40 shadow-xl overflow-hidden"
            >
              {/* Subtle Gold Accent Top Border Line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-gold/20 via-gold to-gold/20" />

              {/* Giant Watermark Year in Background */}
              <div className="absolute right-4 -bottom-6 font-garamond font-normal text-7xl sm:text-9xl text-gold/10 select-none pointer-events-none">
                {TIMELINE_MILESTONES[activeIdx].year}
              </div>

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                <div className="lg:col-span-8">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-maroon-deep text-gold text-[10px] font-montserrat uppercase tracking-widest font-semibold border border-gold/30">
                      <Sparkles className="w-3 h-3 text-gold" />
                      <span>{TIMELINE_MILESTONES[activeIdx].year} — {TIMELINE_MILESTONES[activeIdx].period}</span>
                    </span>

                    <span className="inline-flex items-center gap-1 text-grey text-xs font-poppins">
                      <MapPin className="w-3 h-3 text-gold" />
                      <span>{TIMELINE_MILESTONES[activeIdx].location}</span>
                    </span>
                  </div>

                  <h4 className="font-marcellus text-xl sm:text-3xl text-maroon mt-2 mb-3 leading-snug">
                    {TIMELINE_MILESTONES[activeIdx].title}
                  </h4>

                  <p className="font-poppins text-xs sm:text-sm text-grey leading-relaxed max-w-2xl">
                    {TIMELINE_MILESTONES[activeIdx].desc}
                  </p>
                </div>

                <div className="lg:col-span-4 flex flex-col sm:items-end justify-center pt-4 lg:pt-0 border-t lg:border-t-0 lg:border-l border-gold/20 lg:pl-8">
                  <span className="font-raleway text-[10px] uppercase tracking-[0.25em] text-grey mb-1">
                    Era Milestone
                  </span>
                  <div className="flex items-center gap-2 text-maroon">
                    <Award className="w-5 h-5 text-gold" />
                    <span className="font-marcellus text-lg sm:text-xl font-medium">
                      {TIMELINE_MILESTONES[activeIdx].stat}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

