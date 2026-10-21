"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

interface MilestoneItem {
  year: string;
  title: string;
  desc: string;
  tag?: string;
}

const MILESTONES: MilestoneItem[] = [
  {
    year: "1970",
    title: "Gandhi Civil Decor",
    desc: "Establishment of Civil Interior Business",
    tag: "Foundation",
  },
  {
    year: "1982",
    title: "Italian Marble Installation",
    desc: "One of the first teams to install Italian Marble in India",
    tag: "Pioneering Team",
  },
  {
    year: "1995",
    title: "Italian Marble Imports",
    desc: "Commenced own imports of premium Italian marble",
    tag: "Direct Sourcing",
  },
  {
    year: "1997",
    title: "Quality Marble",
    desc: "Setup of Quality Marble Stock Yard in Vile Parle, Mumbai",
    tag: "Stock Yard",
  },
  {
    year: "2007",
    title: "MGI Factory",
    desc: "Setup of Marmo Granite International factory at Silvassa",
    tag: "Manufacturing",
  },
  {
    year: "2014",
    title: "Malad Stock Yard",
    desc: "Additional stockyard opened at Malad, Mumbai.",
    tag: "Expansion",
  },
  {
    year: "2022",
    title: "INTIOSS Luxury Surfaces",
    desc: "A dedicated luxury brand for rare marbles and exotic stones, finished with exceptional craftsmanship.",
    tag: "The Brand",
  },
];

function TimelineCard({
  item,
  index,
}: {
  item: MilestoneItem;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "center center"],
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [40, 0]);

  const isEvenIndex = index % 2 === 0; // Alternates: 0=Ivory, 1=Burgundy, 2=Ivory, 3=Burgundy...
  const isLeftDesktop = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y }}
      className={`relative flex flex-col md:flex-row items-start md:items-center ${
        !isLeftDesktop ? "md:flex-row-reverse" : ""
      }`}
    >
      {/* Center node with gold outline and inner dot */}
      <div className="absolute left-6 md:left-1/2 top-6 md:top-1/2 w-4 h-4 rounded-full bg-white border-2 border-gold -translate-x-1/2 md:-translate-y-1/2 z-10 shadow-sm flex items-center justify-center">
        <div className={`w-1.5 h-1.5 rounded-full ${isEvenIndex ? "bg-maroon-deep" : "bg-gold"}`} />
      </div>

      {/* Empty half for desktop alternating layout */}
      <div className="hidden md:block md:w-1/2" />

      {/* Card content container with alternating background colors */}
      <div
        className={`w-full md:w-1/2 pl-16 md:pl-0 ${
          !isLeftDesktop ? "md:pr-12 md:text-right" : "md:pl-12 text-left"
        }`}
      >
        <div
          className={`p-6 md:p-8 rounded-2xl border transition-all duration-300 relative z-20 shadow-md ${
            isEvenIndex
              ? "bg-[#FAF7F2] text-maroon-deep border-gold/40 hover:shadow-lg"
              : "bg-maroon-deep text-ivory border-gold/50 shadow-[0_12px_32px_rgba(48,12,22,0.25)] hover:border-gold"
          }`}
        >
          {/* Year and category tag */}
          <div
            className={`flex items-center gap-3 mb-3 ${
              !isLeftDesktop ? "md:justify-end" : "justify-start"
            }`}
          >
            <span
              className={`text-3xl md:text-4xl font-marcellus font-normal ${
                isEvenIndex ? "text-gold-dark" : "text-gold"
              }`}
            >
              {item.year}
            </span>
            {item.tag && (
              <span
                className={`px-2.5 py-0.5 rounded-full text-[10px] font-montserrat uppercase font-semibold tracking-wider border ${
                  isEvenIndex
                    ? "bg-maroon-deep/5 text-maroon-deep border-gold/40"
                    : "bg-white/10 text-ivory border-gold/50"
                }`}
              >
                {item.tag}
              </span>
            )}
          </div>

          <h3
            className={`text-xl sm:text-2xl font-marcellus mb-2 font-normal ${
              isEvenIndex ? "text-maroon-deep" : "text-ivory"
            }`}
          >
            {item.title}
          </h3>

          {item.desc ? (
            <p
              className={`font-jost text-sm md:text-base leading-relaxed ${
                isEvenIndex ? "text-grey-dark" : "text-ivory/85"
              }`}
            >
              {item.desc}
            </p>
          ) : null}
        </div>
      </div>
    </motion.div>
  );
}

export function LegacySection() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="legacy"
      ref={containerRef}
      className="py-24 sm:py-32 bg-white text-maroon-deep relative overflow-hidden border-y border-gold/20"
    >
      {/* Subtle luxury ambient background nuance */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-[#FCFAF7] to-white pointer-events-none" />

      <div className="max-w-[1024px] mx-auto px-6 relative z-10">
        {/* Section Heading */}
        <div className="text-center mb-16 sm:mb-20">
          <span className="font-jost text-xs sm:text-sm uppercase tracking-[0.25em] text-gold font-semibold block mb-3">
            Our Legacy
          </span>
          <h2 className="font-marcellus text-3xl sm:text-5xl lg:text-6xl text-maroon-deep font-normal tracking-wide leading-tight">
            Born from the Legacy of 55 Years of Experience
          </h2>
        </div>

        {/* Vertical Timeline Track */}
        <div className="relative max-w-3xl mx-auto">
          {/* Subtle background rail line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gold/25 -translate-x-1/2" />

          {/* Animated gold progress fill line */}
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-6 md:left-1/2 top-0 w-[2px] bg-gradient-to-b from-gold via-gold-dark to-gold -translate-x-1/2 origin-top shadow-[0_0_8px_rgba(221,182,43,0.35)]"
          />

          {/* Timeline cards list */}
          <div className="space-y-12 sm:space-y-16">
            {MILESTONES.map((item, idx) => (
              <TimelineCard key={item.year} item={item} index={idx} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
