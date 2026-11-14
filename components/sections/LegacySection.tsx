"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { HexagonBackground } from "@/components/brand/HexagonBackground";
import { IntiossHexagon } from "@/components/brand/IntiossHexagon";

interface MilestoneItem {
  year: string;
  title: string;
  desc: string;
  tag?: string;
  logo?: string;
  logoAspect?: "wide" | "square";
}

const MILESTONES: MilestoneItem[] = [
  {
    year: "1970",
    title: "Gandhi Civil Decor",
    desc: "Establishment of Civil Interior Business",
    tag: "Foundation",
    logo: "/images/legacy/gandhi-civil-decor-logo.png",
    logoAspect: "wide",
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
    logo: "/images/legacy/quality-marble-logo.jpg",
    logoAspect: "square",
  },
  {
    year: "2007",
    title: "MGI Factory",
    desc: "Setup of Marmo Granite International factory at Silvassa",
    tag: "Manufacturing",
    logo: "/images/legacy/mgi-logo.png",
    logoAspect: "wide",
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
    logo: "/images/legacy/intioss-logo.png",
    logoAspect: "wide",
  },
];

/**
 * HeritageWavingFlag
 * Realistic waving silk flag banner on an ornate golden architectural flagpole.
 */
function HeritageWavingFlag({
  logo,
  title,
  aspect = "wide",
  delay = 0,
  isMobile = false,
}: {
  logo: string;
  title: string;
  aspect?: "wide" | "square";
  delay?: number;
  isMobile?: boolean;
}) {
  const isSquare = aspect === "square";

  return (
    <div className="relative flex items-center select-none flex-shrink-0">
      {/* Vertical Golden Architectural Flagpole */}
      <div className="relative flex flex-col items-center mr-1.5 sm:mr-2 z-20 flex-shrink-0">
        <div
          className={`rounded-full bg-gradient-to-tr from-[#8C6D14] via-[#F3E5AB] to-[#FFFBE8] shadow-md ring-1 ring-gold/70 relative flex items-center justify-center ${
            isMobile ? "w-3 h-3" : "w-4 h-4 lg:w-4.5 lg:h-4.5"
          }`}
        >
          <span
            className={`rounded-full bg-white/95 absolute top-0.5 left-0.5 ${
              isMobile ? "w-0.5 h-0.5" : "w-1 h-1"
            }`}
          />
        </div>

        <div className={`bg-[#8C6D14] -mt-px mb-0.5 ${isMobile ? "w-2 h-0.5" : "w-2.5 h-0.5"}`} />

        <div
          className={`bg-gradient-to-b from-[#F3E5AB] via-[#DDB62B] to-[#8C6D14] shadow-[0_0_10px_rgba(221,182,43,0.4)] rounded-full relative ${
            isMobile
              ? isSquare
                ? "w-[2.5px] h-[52px]"
                : "w-[2.5px] h-[46px]"
              : isSquare
              ? "w-[3.5px] h-[92px] lg:h-[102px]"
              : "w-[3.5px] h-[78px] lg:h-[88px]"
          }`}
        />
      </div>

      {/* Waving Silk Flag Fabric */}
      <motion.div
        className={`relative overflow-hidden shadow-lg border border-gold/40 rounded-sm bg-white p-2.5 flex items-center justify-center ${
          isMobile
            ? isSquare
              ? "w-[56px] h-[48px]"
              : "w-[80px] h-[44px]"
            : isSquare
            ? "w-[104px] h-[88px] lg:w-[114px] lg:h-[98px]"
            : "w-[145px] h-[74px] lg:w-[165px] lg:h-[84px]"
        }`}
        animate={{
          rotateZ: [0, -1.8, 1.2, -0.6, 0],
          skewY: [0, -1.2, 0.9, -0.4, 0],
          y: [0, -2, 1, -1, 0],
        }}
        transition={{
          duration: 5.2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: delay * 0.4,
        }}
        whileHover={{
          scale: 1.06,
          rotateZ: 2,
          transition: { duration: 0.25 },
        }}
      >
        <div className="relative w-full h-full flex items-center justify-center z-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logo}
            alt={`${title} Flag`}
            className="w-full h-full object-contain filter drop-shadow-sm transition-transform duration-300"
            loading="eager"
          />
        </div>

        {/* Dynamic Silk Shimmer */}
        <motion.div
          className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-white/60 to-transparent -skew-x-12 z-20"
          animate={{
            x: ["-130%", "230%"],
            opacity: [0.1, 0.6, 0.1],
          }}
          transition={{
            duration: 4.8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: delay * 0.4 + 0.3,
          }}
        />
      </motion.div>
    </div>
  );
}

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

  const isLeftDesktop = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y }}
      className={`relative flex items-center justify-between md:justify-normal w-full ${
        isLeftDesktop ? "md:flex-row-reverse" : ""
      }`}
    >
      {/* Center Golden Milestone Node */}
      <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-white border-2 border-gold shadow-[0_0_10px_rgba(221,182,43,0.5)] z-30 flex items-center justify-center">
        <div className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
      </div>

      {/* Flag Column (Desktop) */}
      <div
        className={`hidden md:flex w-1/2 ${
          isLeftDesktop ? "pr-12 justify-end" : "pl-12 justify-start"
        }`}
      >
        {item.logo ? (
          <div className="hover:scale-105 transition-transform duration-300">
            <HeritageWavingFlag
              logo={item.logo}
              title={item.title}
              aspect={item.logoAspect || "wide"}
              delay={index}
            />
          </div>
        ) : (
          <div className="w-full h-8" />
        )}
      </div>

      {/* Card Content Container in Pristine White Luxury Style */}
      <div
        className={`w-full md:w-1/2 pl-16 md:pl-0 ${
          !isLeftDesktop ? "md:pr-12 md:text-right" : "md:pl-12 text-left"
        }`}
      >
        <div className="p-6 md:p-8 rounded-2xl border transition-all duration-300 relative z-20 shadow-lg hover:shadow-2xl bg-white border-gold/30 hover:border-gold text-maroon-deep group">
          {/* Header Row: Year & Tag */}
          <div
            className={`flex items-center justify-between gap-3 mb-3 ${
              !isLeftDesktop ? "md:justify-end" : "justify-start"
            }`}
          >
            <div
              className={`flex items-center gap-2.5 sm:gap-3 ${
                !isLeftDesktop ? "md:flex-row-reverse" : ""
              }`}
            >
              <span className="text-2xl sm:text-3xl md:text-4xl font-marcellus font-normal text-gold-dark">
                {item.year}
              </span>
              {item.tag && (
                <span className="px-2.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-montserrat uppercase font-semibold tracking-wider border bg-maroon-deep/5 text-maroon border-gold/40">
                  {item.tag}
                </span>
              )}
            </div>

            {/* Mobile-only flag inside card header */}
            {item.logo && (
              <div className="block md:hidden">
                <HeritageWavingFlag
                  logo={item.logo}
                  title={item.title}
                  aspect={item.logoAspect || "wide"}
                  delay={index}
                  isMobile={true}
                />
              </div>
            )}
          </div>

          <h3 className="text-xl sm:text-2xl font-marcellus mb-2 font-normal text-maroon-deep group-hover:text-gold-dark transition-colors">
            {item.title}
          </h3>

          {item.desc ? (
            <p className="font-jost text-sm md:text-base leading-relaxed text-stone-700">
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
      className="py-20 sm:py-28 bg-[#FAF7F2] text-maroon-deep relative overflow-hidden border-b border-gold/30"
    >
      {/* Luxury Animated Hexagon Background in Light Theme */}
      <HexagonBackground
        theme="light"
        intensity="subtle"
        showPattern={true}
        showFloating={true}
      />

      {/* Subtle paper nuance */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FAF7F2] via-white to-[#FAF7F2] pointer-events-none" />

      <div className="max-w-[1024px] mx-auto px-6 relative z-10">
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 mb-3.5 px-4 py-1.5 rounded-full bg-maroon-deep/5 border border-gold/40 shadow-sm backdrop-blur-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-dark animate-pulse" />
            <IntiossHexagon size={15} useVector={true} enablePrismaticGlint={true} />
            <span className="font-montserrat text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-maroon-deep font-semibold">
              Our Legacy • 55+ Years of Mastery
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-gold-dark animate-pulse" />
          </div>

          <h2 className="font-marcellus text-3xl sm:text-5xl lg:text-6xl text-maroon-deep font-normal tracking-wide leading-tight">
            Born from the Legacy of 55 Years of Experience
          </h2>
          <p className="font-jost text-base sm:text-lg text-stone-600 mt-3 max-w-xl leading-relaxed">
            From pioneering Italian marble installations in 1982 to international manufacturing and rare stone curation.
          </p>
        </div>

        {/* Vertical Timeline Track */}
        <div className="relative max-w-3xl mx-auto">
          {/* Subtle background rail line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gold/30 -translate-x-1/2" />

          {/* Animated gold progress fill line */}
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-6 md:left-1/2 top-0 w-[2px] bg-gradient-to-b from-gold via-gold-dark to-gold -translate-x-1/2 origin-top shadow-[0_0_10px_rgba(221,182,43,0.4)]"
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
