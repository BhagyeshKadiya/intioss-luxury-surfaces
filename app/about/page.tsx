import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Provenance | About INTIOSS — 55+ Years of Luxury Surfaces",
  description:
    "Over 55+ Years of Expertise, Experience, and Enduring Trust. INTIOSS is the culmination of more than five decades dedicated to realizing spaces of authentic class, sophistication, and timeless permanence.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-ivory text-maroon pt-28 sm:pt-36 pb-24 sm:pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-[11px] font-raleway uppercase tracking-[0.25em] text-grey mb-8">
          <Link href="/" className="hover:text-maroon transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-gold">Our Provenance</span>
        </div>

        {/* Main Editorial Presentation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Narrative Content */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            <div className="space-y-3">
              <span className="inline-block font-raleway font-light text-xs sm:text-sm uppercase tracking-[0.35em] text-gold">
                Our Provenance
              </span>
              <h1 className="font-marcellus text-3xl sm:text-5xl lg:text-6xl text-maroon font-normal tracking-wide leading-[1.15]">
                Over 55+ Years of Expertise, Experience, and Enduring Trust.
              </h1>
            </div>

            <div className="w-20 h-px bg-gold/50" />

            <p className="font-marcellus text-lg sm:text-xl text-maroon leading-relaxed">
              INTIOSS is the culmination of more than five decades dedicated to realizing spaces of authentic class, sophistication, and timeless permanence.
            </p>

            <div className="font-poppins text-sm sm:text-base text-grey leading-relaxed space-y-4">
              <p>
                True luxury in natural stone cannot be manufactured; it is discovered, understood, and precisely finished. For over half a century, our lineage has been defined by an unwavering dedication to the earth’s most extraordinary geological creations. What began as a foundational mastery of stone masonry has evolved into INTIOSS—a house dedicated to sourcing and curating exquisite marble and rare semiprecious stones for discerning architects, designers, and homeowners.
              </p>
            </div>

            {/* Editorial CTAs */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 bg-maroon hover:bg-maroon-deep text-white px-6 py-3.5 text-xs font-montserrat uppercase tracking-[0.2em] font-medium border border-gold transition-all shadow-sm"
              >
                <span>Explore Curated Surfaces</span>
                <ArrowRight className="w-3.5 h-3.5 text-gold" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-ivory text-maroon px-6 py-3.5 text-xs font-montserrat uppercase tracking-[0.2em] font-medium border border-gold/40 hover:border-gold transition-all shadow-sm"
              >
                <span>Private Consultation</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Single Archival Image with Luxury Framing */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              {/* Outer decorative framing */}
              <div className="absolute -inset-3 sm:-inset-4 border border-gold/25 pointer-events-none" />
              <div className="relative aspect-[2/3] w-full overflow-hidden border border-gold/50 shadow-2xl bg-stone-100">
                <Image
                  src="/images/legacy-founder.jpg"
                  alt="INTIOSS Provenance — 55+ Years of Heritage and Mastery"
                  fill
                  priority
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 450px"
                />
                {/* Subtle luxury vignette gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-maroon/30 via-transparent to-transparent pointer-events-none" />
              </div>
              <div className="mt-3 text-center">
                <span className="font-raleway text-[11px] uppercase tracking-[0.25em] text-grey">
                  Five Decades of Architectural Reverence
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
