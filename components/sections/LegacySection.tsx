"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "motion/react";
import { SITE_CONFIG } from "@/lib/config";
import { ExternalLink, Sparkles, MapPin, Award, Calendar } from "lucide-react";

interface Milestone {
  year: string;
  title: string;
  desc: string;
  stat: string;
  location: string;
}

const TIMELINE_MILESTONES: Milestone[] = [
  {
    year: "1970",
    title: "Gandhi Civil Decor",
    desc: "Establishment of Civil Interior Business",
    stat: "Civil Interior Foundation",
    location: "Mumbai, India",
  },
  {
    year: "1982",
    title: "Italian Marble Installation",
    desc: "One of the first teams to install Italian Marble in India",
    stat: "Pioneering Installation Team",
    location: "South Mumbai",
  },
  {
    year: "1995",
    title: "Italian Marble Imports",
    desc: "Commenced own imports of premium Italian marble",
    stat: "Direct European Sourcing",
    location: "Carrara & Verona, Italy",
  },
  {
    year: "1997",
    title: "Quality Marble",
    desc: "Setup of Quality Marble Stock Yard in Vile Parle, Mumbai",
    stat: "Vile Parle Stock Yard",
    location: "Vile Parle, Mumbai",
  },
  {
    year: "2007",
    title: "MGI Factory",
    desc: "Setup of Macma Granite International factory at Silvasa",
    stat: "Industrial Silvassa Plant",
    location: "Silvassa",
  },
  {
    year: "2014",
    title: "Malad Stock Yard",
    desc: "Setting up of specialized stock yard in Malad",
    stat: "Specialized Stock Yard",
    location: "Malad, Mumbai",
  },
  {
    year: "2022",
    title: "INTIOSS Luxury Surfaces",
    desc: "The dedicated ultra-luxury brand for discerning architects, private residences, and landmark estates",
    stat: "Ultra-Luxury Surface Atelier",
    location: "South Mumbai & Gujarat",
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
  const [activeIdx, setActiveIdx] = useState(6); // Default to 2022 "INTIOSS Luxury Surfaces"
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
              <div className="absolute inset-0 bg-gradient-to-t from-maroon-deep/90 via-transparent to-transparent pointer-events-none" />

              {/* Founder/Lineage Plaque */}
              <div className="absolute bottom-6 left-6 right-6 p-4 bg-maroon-deep/90 border border-gold/40 backdrop-blur-md text-ivory">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-raleway text-[10px] uppercase tracking-[0.25em] text-gold font-medium">
                    Lineage · Est. 1970
                  </span>
                </div>
                <h4 className="font-marcellus text-lg text-ivory">
                  Gandhi Civil Decor Group & Quality Marble
                </h4>
                <p className="font-poppins text-xs text-ivory/70 mt-1">
                  Direct European quarry inspection, state-of-the-art Silvassa processing, and zero-tolerance South Mumbai installation.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Narrative & Provenance */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            <div className="space-y-2">
              <span className="font-raleway font-light text-xs sm:text-sm uppercase tracking-[0.3em] text-grey">
                Our Provenance
              </span>
              <h2 className="font-marcellus text-3xl sm:text-5xl text-maroon font-normal tracking-wide leading-tight">
                Backed by 55+ Years of Experience
              </h2>
            </div>

            <p className="font-poppins text-xs sm:text-sm text-grey leading-relaxed">
              A rich heritage of excellence in luxury civil contracting and stone processing, evolving over decades to bring you unparalleled quality.
            </p>

            <p className="font-poppins text-xs sm:text-sm text-grey leading-relaxed">
              Under the stewardship of the Gandhi Civil Decor Group and Quality Marble, our lineage encompasses generations of stonemasons, civil engineers, and master quarry scouts. We control the complete lifecycle: scouting raw blocks, sawing monumental slabs in our high-tech facility, and executing dry-laid floorings with laser calibration.
            </p>

            {/* Parent Brand Link Callout */}
            <div className="pt-2">
              <a
                href={SITE_CONFIG.parentBrand.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-maroon-deep/5 border border-gold/40 text-maroon text-xs font-montserrat uppercase tracking-wider font-medium hover:bg-maroon hover:text-ivory hover:border-gold transition-all duration-300 group"
              >
                <span>Discover Parent Brand: Quality Marble</span>
                <ExternalLink className="w-3.5 h-3.5 text-gold group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>

            {/* Heritage Stats Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-gold/30">
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
              A rich heritage of excellence in luxury civil contracting and stone processing, evolving over decades to bring you unparalleled quality.
            </p>
          </div>

          {/* Interactive Timeline Track & Nodes */}
          <div className="relative mb-12 pt-4">
            {/* Background Base Rail Line */}
            <div className="hidden md:block absolute top-[28px] left-[4%] right-[4%] h-[2px] bg-gold/20 z-0" />

            {/* Dynamic Gold Animated Progress Line */}
            <motion.div
              className="hidden md:block absolute top-[28px] left-[4%] h-[2px] bg-gradient-to-r from-gold via-gold-light to-gold shadow-sm z-0"
              initial={{ width: 0 }}
              animate={
                isTimelineInView
                  ? {
                      width: `${(activeIdx / (TIMELINE_MILESTONES.length - 1)) * 92}%`,
                    }
                  : { width: 0 }
              }
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            />

            {/* Shimmer Light Pulse running along the line */}
            <motion.div
              className="hidden md:block absolute top-[27px] left-[4%] w-16 h-[4px] bg-gradient-to-r from-transparent via-gold-light to-transparent rounded-full z-0 pointer-events-none"
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

            {/* 7 Milestone Year Buttons with Exact Years */}
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3 relative z-10">
              {TIMELINE_MILESTONES.map((item, idx) => {
                const isActive = activeIdx === idx;
                return (
                  <button
                    key={item.year}
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
                          scale: isActive ? 1.15 : 1,
                          backgroundColor: isActive ? "#300C16" : "#FAF7F2",
                          borderColor: isActive ? "#DDB62B" : "rgba(221, 182, 43, 0.5)",
                        }}
                        transition={{ duration: 0.25 }}
                        className="px-2.5 py-1 rounded-full border-2 flex items-center justify-center relative shadow-sm"
                      >
                        <span
                          className={`font-montserrat text-xs font-bold tracking-wider ${
                            isActive ? "text-gold" : "text-maroon/80"
                          }`}
                        >
                          {item.year}
                        </span>
                      </motion.div>
                    </div>

                    {/* Step Title Label */}
                    <span
                      className={`font-montserrat text-[11px] font-medium transition-colors duration-200 line-clamp-1 ${
                        isActive
                          ? "text-maroon font-semibold"
                          : "text-grey/80 group-hover:text-maroon"
                      }`}
                    >
                      {item.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Milestone Detailed Callout Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIdx}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative p-8 sm:p-10 bg-white border border-gold/40 shadow-xl overflow-hidden"
            >
              {/* Gold Top Accent Line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold via-gold-light to-gold" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-8 space-y-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="flex items-center gap-1.5 px-3 py-1 bg-maroon-deep text-gold text-xs font-montserrat uppercase tracking-wider font-semibold border border-gold/40 shadow-xs">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{TIMELINE_MILESTONES[activeIdx].year}</span>
                    </span>
                    <span className="flex items-center gap-1 text-xs text-gold font-montserrat font-medium">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{TIMELINE_MILESTONES[activeIdx].location}</span>
                    </span>
                  </div>

                  <h4 className="font-marcellus text-2xl sm:text-3xl text-maroon">
                    {TIMELINE_MILESTONES[activeIdx].title}
                  </h4>

                  <p className="font-poppins text-xs sm:text-sm text-grey leading-relaxed">
                    {TIMELINE_MILESTONES[activeIdx].desc}
                  </p>
                </div>

                <div className="lg:col-span-4 flex lg:justify-end">
                  <div className="p-6 bg-maroon-deep text-ivory border border-gold/40 w-full sm:w-auto text-center sm:text-left">
                    <div className="flex items-center gap-2 text-gold mb-1">
                      <Award className="w-4 h-4" />
                      <span className="font-raleway text-[10px] uppercase tracking-[0.2em] font-medium">
                        Milestone Impact
                      </span>
                    </div>
                    <div className="font-marcellus text-lg sm:text-xl text-ivory mt-1">
                      {TIMELINE_MILESTONES[activeIdx].stat}
                    </div>
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
