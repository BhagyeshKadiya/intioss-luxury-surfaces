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
    tag: "GCD",
  },
  {
    year: "1982",
    title: "Italian Marble Installation",
    desc: "One of the first teams to install Italian Marble in India",
    tag: "GM Badal",
  },
  {
    year: "1995",
    title: "Italian Marble Imports",
    desc: "Commenced own imports of premium Italian marble",
    tag: "Own Imports",
  },
  {
    year: "1997",
    title: "Quality Marble",
    desc: "Setup of Quality Marble Stock Yard in Vile Parle, Mumbai",
    tag: "Mumbai",
  },
  {
    year: "2007",
    title: "MGI Factory",
    desc: "Setup of Macma Granite International factory at Silvasa",
    tag: "Silvasa",
  },
  {
    year: "2014",
    title: "Malad Stock Yard",
    desc: "Setting up of specialized stock yard in Malad",
    tag: "Malad",
  },
  {
    year: "2022",
    title: "INTIOSS Luxury Surfaces",
    desc: "",
    tag: "INTIOSS",
  },
];

function TimelineCard({
  item,
  isEven,
}: {
  item: MilestoneItem;
  isEven: boolean;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "center center"],
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [50, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y }}
      className={`relative flex flex-col md:flex-row items-start md:items-center ${
        isEven ? "md:flex-row-reverse" : ""
      }`}
    >
      <div className="absolute left-6 md:left-1/2 top-6 md:top-1/2 w-4 h-4 rounded-full bg-wine-deep border-2 border-gold -translate-x-1/2 md:-translate-y-1/2 z-10" />
      <div className="hidden md:block md:w-1/2" />
      <div
        className={`w-full md:w-1/2 pl-16 md:pl-0 ${
          isEven ? "md:pr-12 md:text-right" : "md:pl-12 text-left"
        }`}
      >
        <div className="bg-wine-deep p-6 md:p-8 rounded-2xl border border-white/10 shadow-sm hover:shadow-md transition-shadow group relative z-20">
          <div
            className={`flex items-center gap-4 mb-3 ${
              isEven ? "md:justify-end" : "justify-start"
            }`}
          >
            <span className="text-3xl md:text-4xl font-inter text-gold">
              {item.year}
            </span>
          </div>
          <h3 className="text-xl font-inter font-semibold text-paper mb-2 group-hover:text-gold transition-colors">
            {item.title}
          </h3>
          {item.desc ? (
            <p className="text-paper/70 font-inter text-sm md:text-base leading-relaxed">
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
      className="py-24 md:py-32 bg-wine text-paper relative overflow-hidden"
    >
      <div className="max-w-[1024px] mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <span className="text-gold font-jost tracking-[0.2em] uppercase text-sm font-semibold">
            Our Legacy
          </span>
          <h2 className="text-display font-inter text-paper mt-4">
            Backed by 55+ Years of Experience
          </h2>
          <p className="font-inter text-paper/70 max-w-2xl mx-auto mt-6 text-lg">
            A rich heritage of excellence in luxury civil contracting and stone processing, evolving over decades to bring you unparalleled quality.
          </p>
        </div>

        <div className="relative max-w-3xl mx-auto">
          {/* Vertical base line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-wine/10 -translate-x-1/2" />
          {/* Animated gold progress line */}
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-6 md:left-1/2 top-0 w-px bg-gold -translate-x-1/2 origin-top"
          />
          <div className="space-y-12 md:space-y-20">
            {MILESTONES.map((item, index) => (
              <TimelineCard
                key={item.year}
                item={item}
                isEven={index % 2 === 0}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
