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
 * MilestoneLogo
 * Pure brand logo presentation: NO flag, NO text, NO background.
 * Beautifully scaled to match the visual presence of the opposite container box.
 */
function MilestoneLogo({
  logo,
  title,
  aspect = "wide",
  isMobile = false,
}: {
  logo: string;
  title: string;
  aspect?: "wide" | "square";
  isMobile?: boolean;
}) {
  const isSquare = aspect === "square";

  if (isMobile) {
    return (
      <div className="shrink-0 flex items-center justify-center ml-2.5 sm:ml-3.5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logo}
          alt={`${title} Logo`}
          className={`object-contain select-none filter drop-shadow-xs transition-transform duration-300 ${
            isSquare ? "h-9 w-9 sm:h-10 sm:w-10" : "h-6 sm:h-7 max-w-[100px]"
          }`}
          loading="eager"
        />
      </div>
    );
  }

  return (
    <motion.div
      whileHover={{ scale: 1.04 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="relative flex items-center justify-center w-full max-w-[290px] h-full max-h-[140px] px-4 py-2 select-none"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={logo}
        alt={`${title} Logo`}
        className={`w-full h-auto object-contain filter drop-shadow-sm select-none transition-transform duration-300 ${
          isSquare
            ? "max-h-[120px] max-w-[120px] lg:max-h-[135px] lg:max-w-[135px]"
            : "max-h-[85px] max-w-[240px] lg:max-h-[95px] lg:max-w-[260px]"
        }`}
        loading="eager"
      />
    </motion.div>
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
  const isEven = index % 2 === 0; // Box 1, 3, 5, 7 -> Beige ("badge color"); Box 2, 4, 6 -> Brand Magenta

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
        <div
          className={`w-1.5 h-1.5 rounded-full ${
            isEven ? "bg-maroon-deep" : "bg-gold"
          } animate-pulse`}
        />
      </div>

      {/* Opposite Column (Desktop): Centered with generous breathing room from the center line & box */}
      <div
        className={`hidden md:flex w-1/2 ${
          isLeftDesktop ? "pr-16 lg:pr-20" : "pl-16 lg:pl-20"
        } justify-center items-center`}
      >
        {item.logo ? (
          <MilestoneLogo
            logo={item.logo}
            title={item.title}
            aspect={item.logoAspect || "wide"}
          />
        ) : (
          <div className="w-full h-8" />
        )}
      </div>

      {/* Card Content Container in Alternating Beige & Brand Magenta Style */}
      <div
        className={`w-full md:w-1/2 pl-16 md:pl-0 ${
          !isLeftDesktop ? "md:pr-12 md:text-right" : "md:pl-12 text-left"
        }`}
      >
        <div
          className={`p-6 md:p-8 rounded-2xl border transition-all duration-300 relative z-20 group ${
            isEven
              ? "bg-[#FAF7F2] border-gold/40 hover:border-gold text-maroon-deep shadow-lg hover:shadow-2xl"
              : "bg-gradient-to-br from-maroon-deep via-maroon to-maroon-deep border-gold/50 hover:border-gold text-ivory shadow-[0_12px_36px_rgba(48,12,22,0.3)] hover:shadow-[0_18px_48px_rgba(48,12,22,0.45)]"
          }`}
        >
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
              <span
                className={`text-2xl sm:text-3xl md:text-4xl font-marcellus font-normal ${
                  isEven ? "text-gold-dark" : "text-gold drop-shadow-xs"
                }`}
              >
                {item.year}
              </span>
              {item.tag && (
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-montserrat uppercase font-semibold tracking-wider border ${
                    isEven
                      ? "bg-maroon-deep/5 text-maroon border-gold/40"
                      : "bg-white/10 text-gold-light border-gold/50 backdrop-blur-xs"
                  }`}
                >
                  {item.tag}
                </span>
              )}
            </div>

            {/* Mobile-only clean logo: ONLY LOGO - NO flag, NO text, NO background */}
            {item.logo && (
              <div className="block md:hidden">
                <MilestoneLogo
                  logo={item.logo}
                  title={item.title}
                  aspect={item.logoAspect || "wide"}
                  isMobile={true}
                />
              </div>
            )}
          </div>

          <h3
            className={`text-xl sm:text-2xl font-marcellus mb-2 font-normal transition-colors ${
              isEven
                ? "text-maroon-deep group-hover:text-gold-dark"
                : "text-ivory group-hover:text-gold"
            }`}
          >
            {item.title}
          </h3>

          {item.desc ? (
            <p
              className={`font-jost text-sm md:text-base leading-relaxed ${
                isEven ? "text-stone-700" : "text-ivory/90"
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

      {/* Top subtle transitional bridge from dark obsidian to ivory atelier */}
      <div className="absolute top-0 inset-x-0 h-16 sm:h-24 bg-gradient-to-b from-[#140409]/8 via-transparent to-transparent pointer-events-none z-10" />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center max-w-6xl mx-auto mb-16 sm:mb-20">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 mb-3.5 px-4 py-1.5 rounded-full bg-maroon-deep/5 border border-gold/40 shadow-sm backdrop-blur-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-dark animate-pulse" />
            <IntiossHexagon size={15} useVector={true} enablePrismaticGlint={true} />
            <span className="font-montserrat text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-maroon-deep font-semibold">
              Our Legacy • 55+ Years of Mastery
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-gold-dark animate-pulse" />
          </div>

          <h2 className="font-marcellus text-[clamp(0.95rem,2.7vw,2.65rem)] whitespace-nowrap text-maroon-deep font-normal tracking-wide leading-tight">
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
