"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { APPLICATION_SPACES } from "@/data/applications";
import { ArrowRight } from "lucide-react";

export function ApplicationSelector() {
  return (
    <section className="relative py-20 sm:py-28 bg-maroon-deep text-ivory overflow-hidden border-y border-gold/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="font-marcellus text-3xl sm:text-5xl text-ivory tracking-wide">
              Find Your Stone by Space
            </h2>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-xs font-montserrat uppercase tracking-[0.2em] text-gold hover:text-white transition-colors"
          >
            <span>View All Applications</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* 7 Spaces Grid: Clear, upright labels on top of photograph with subtle gradient overlay */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {APPLICATION_SPACES.map((space) => (
            <div
              key={space.id}
              className="group relative h-80 sm:h-96 rounded-none overflow-hidden border border-gold/25 bg-maroon transition-all duration-300 hover:border-gold shadow-md flex flex-col justify-end"
            >
              {/* Photograph */}
              <Image
                src={space.image}
                alt={space.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Subtle Gradient Scrim Overlay for Legibility */}
              <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(20, 8, 14, 0.15) 0%, rgba(20, 8, 14, 0.4) 50%, rgba(20, 8, 14, 0.88) 100%)",
                }}
              />

              {/* Upright Space Title & Recommended Slabs */}
              <div className="relative z-10 p-5 sm:p-6 flex flex-col gap-3">
                <Link
                  href={`/products?application=${encodeURIComponent(space.title)}`}
                  className="group/title inline-flex items-center justify-between"
                >
                  <h3 className="font-marcellus text-xl sm:text-2xl text-ivory font-normal tracking-wide group-hover/title:text-gold transition-colors">
                    {space.title}
                  </h3>
                  <ArrowRight className="w-4 h-4 text-gold transform group-hover/title:translate-x-1 transition-transform opacity-80" />
                </Link>

                {/* Recommended Slab Links into Catalogue */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {space.recommendedStones.map((stone) => (
                    <Link
                      key={stone.slug}
                      href={`/products/${stone.slug}`}
                      className="bg-black/50 hover:bg-gold hover:text-maroon text-ivory/90 hover:font-medium text-[11px] font-montserrat px-2 py-1 border border-gold/30 transition-colors"
                    >
                      {stone.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
