"use client";

import React, { useRef } from "react";
import NextImage from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { HexagonBackground } from "@/components/brand/HexagonBackground";

interface MilestoneItem {
  year: string;
  title: string;
  desc: string;
  tag?: string;
  logo?: string;
  logoAspect?: "wide" | "square";
  standardTitle?: string;
}

const MILESTONES: MilestoneItem[] = [
  {
    year: "1970",
    title: "Gandhi Civil Decor",
    desc: "Establishment of Civil Interior Business",
    tag: "Foundation",
    logo: "/images/legacy/gandhi-civil-decor-logo.png",
    logoAspect: "wide",
    standardTitle: "Gandhi Civil Decor Standard",
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
    standardTitle: "Quality Marble Standard",
  },
  {
    year: "2007",
    title: "MGI Factory",
    desc: "Setup of Marmo Granite International factory at Silvassa",
    tag: "Manufacturing",
    logo: "/images/legacy/mgi-logo.png",
    logoAspect: "wide",
    standardTitle: "MGI International Standard",
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
    standardTitle: "INTIOSS Maison Standard",
  },
];

interface HeritageBrandFlagProps {
  logo: string;
  title: string;
  year: string;
  standardTitle?: string;
  aspect?: "wide" | "square";
  isDarkCard: boolean;
  isLeftDesktop: boolean;
  delay?: number;
}

/**
 * HeritageBrandFlag
 * Renders an archival brand standard flag on a polished golden flagpole with
 * fluid, physics-based undulating silk wave motion and dynamic light shimmer.
 */
function HeritageBrandFlag({
  logo,
  title,
  year,
  standardTitle,
  aspect = "wide",
  isDarkCard,
  isLeftDesktop,
  delay = 0,
}: HeritageBrandFlagProps) {
  const isSquare = aspect === "square";

  return (
    <div
      className={`flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 ${
        !isLeftDesktop ? "md:flex-row-reverse md:items-center" : ""
      }`}
    >
      {/* Flagpole & Waving Flag Unit */}
      <div className="relative flex items-center select-none py-1">
        {/* Vertical Golden Flagpole */}
        <div className="relative flex flex-col items-center mr-1 z-20 flex-shrink-0">
          {/* Top Brass Finial Sphere */}
          <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-tr from-[#8C6D14] via-[#F3E5AB] to-[#FFFBE8] shadow-[0_1px_4px_rgba(0,0,0,0.35)] ring-1 ring-gold/40 relative flex items-center justify-center">
            <span className="w-1 h-1 rounded-full bg-white/80 absolute top-0.5 left-0.5" />
          </div>
          {/* Top Collar */}
          <div className="w-2 h-0.5 bg-[#8C6D14] -mt-px mb-0.5" />

          {/* Golden Mast Shaft */}
          <div
            className={`w-[3px] bg-gradient-to-b from-[#F3E5AB] via-[#DDB62B] to-[#8C6D14] shadow-[0_0_6px_rgba(221,182,43,0.35)] rounded-full relative ${
              isSquare ? "h-[62px] sm:h-[70px]" : "h-[58px] sm:h-[66px]"
            }`}
          >
            {/* Upper Halyard Ring / Grommet */}
            <div className="absolute -right-1 top-2 w-1.5 h-1.5 rounded-full border border-gold/80 bg-white shadow-xs" />
            {/* Lower Halyard Ring / Grommet */}
            <div className="absolute -right-1 bottom-2 w-1.5 h-1.5 rounded-full border border-gold/80 bg-white shadow-xs" />
          </div>

          {/* Bottom Pedestal Cap */}
          <div className="w-2.5 h-1 rounded-full bg-gradient-to-b from-gold via-gold-dark to-[#554006] shadow-sm -mt-0.5" />
        </div>

        {/* Animated Waving Silk Flag Banner */}
        <motion.div
          className={`relative origin-left overflow-hidden rounded-r-md border border-gold/45 border-r-2 border-r-gold/80 shadow-[0_8px_20px_-4px_rgba(48,12,22,0.22)] bg-gradient-to-r from-white via-[#FCFAF7] to-[#F5EFEB] flex items-center justify-center ${
            isSquare
              ? "w-[68px] sm:w-[78px] h-[52px] sm:h-[58px] p-1.5"
              : "w-[170px] sm:w-[210px] h-[48px] sm:h-[54px] p-2"
          }`}
          animate={{
            rotateZ: [0, 2.2, -1.8, 1.4, 0],
            skewY: [0, -2.0, 2.4, -1.2, 0],
            y: [0, -3.0, 2.2, -1.5, 0],
            scaleX: [1, 0.985, 1.012, 0.99, 1],
          }}
          transition={{
            duration: 4.8,
            repeat: Infinity,
            ease: "easeInOut",
            delay,
          }}
          whileHover={{
            scale: 1.04,
            rotateZ: 3,
            transition: { duration: 0.25 },
          }}
        >
          {/* Logo Graphic inside Flag */}
          <div className="relative w-full h-full flex items-center justify-center z-10">
            <NextImage
              src={logo}
              alt={`${title} Archival Flag`}
              fill
              sizes="(max-width: 640px) 170px, 210px"
              className="object-contain"
              priority={year === "1970"}
            />
          </div>

          {/* Dynamic Silk Shimmer Sheen Wave (Sweeping light reflecting off folds) */}
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
              delay: delay + 0.25,
            }}
          />

          {/* Cloth Fold Depth Shadow */}
          <motion.div
            className="absolute inset-0 pointer-events-none bg-gradient-to-r from-black/[0.04] via-transparent to-black/[0.08] mix-blend-multiply z-20"
            animate={{
              opacity: [0.25, 0.6, 0.25],
            }}
            transition={{
              duration: 2.4,
              repeat: Infinity,
              ease: "easeInOut",
              delay,
            }}
          />
        </motion.div>
      </div>

      {/* Archival Standard Caption */}
      <div
        className={`flex flex-col ${
          !isLeftDesktop ? "md:items-end md:text-right" : "items-start text-left"
        }`}
      >
        <span className="text-[9px] sm:text-[10px] font-montserrat tracking-[0.18em] uppercase text-gold font-semibold flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse flex-shrink-0" />
          Heritage Standard
        </span>
        <span
          className={`text-[11px] sm:text-xs font-marcellus tracking-wide ${
            isDarkCard ? "text-ivory/80" : "text-maroon-deep/80"
          }`}
        >
          {standardTitle || `${title} Flag`}
        </span>
      </div>
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

          {/* Heritage Brand Flag Banner (for milestones with historical brand standards) */}
          {item.logo && (
            <div
              className={`mt-5 pt-4 border-t ${
                isEvenIndex ? "border-gold/20" : "border-gold/30"
              } flex items-center ${
                !isLeftDesktop ? "md:justify-end" : "justify-start"
              }`}
            >
              <HeritageBrandFlag
                logo={item.logo}
                title={item.title}
                year={item.year}
                standardTitle={item.standardTitle}
                aspect={item.logoAspect || "wide"}
                isDarkCard={!isEvenIndex}
                isLeftDesktop={isLeftDesktop}
                delay={index * 0.35}
              />
            </div>
          )}
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
      {/* Luxury Animated Hexagon Background: Exact INTIOSS Logo Symbols with Quiet Luxury Prismatic Sheen */}
      <HexagonBackground
        theme="light"
        intensity="subtle"
        showPattern={true}
        showFloating={true}
      />

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
