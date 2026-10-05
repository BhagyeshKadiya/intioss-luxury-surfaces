import React from "react";
import Image from "next/image";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/config";
import { ExternalLink, Check, Award, Compass, Hammer, Sparkles } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About INTIOSS | Gandhi Civil Decor Group & Quality Marble",
  description:
    "Established 1997. The generational story of Gandhi Civil Decor Group and Quality Marble, bridging European quarry benches and India's finest private residences.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-ivory text-maroon pt-24 sm:pt-28 pb-32">
      {/* Editorial Hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="max-w-3xl">
          <span className="font-raleway font-light text-xs sm:text-sm uppercase tracking-[0.3em] text-grey mb-3 block">
            Our Provenance
          </span>
          <h1 className="font-marcellus text-4xl sm:text-6xl text-maroon tracking-wide leading-tight">
            55 Years of Stone. Three Generations of Mastery.
          </h1>
          <p className="font-poppins text-xs sm:text-base text-grey mt-6 leading-relaxed">
            INTIOSS is the culmination of more than five decades in monolithic masonry, direct European quarry exploration, and structural civil contracting. We do not view stone as decorative veneer, but as permanent geological architecture.
          </p>
        </div>
      </div>

      {/* Hero Visual Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-8 relative aspect-[16/9] overflow-hidden border border-gold/40 shadow-xl bg-stone-200">
            <Image
              src="https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?q=80&w=1200&auto=format&fit=crop"
              alt="INTIOSS Raw Quarry Bench Extraction in Italy"
              fill
              className="object-cover"
            />
            <div className="absolute bottom-4 left-4 bg-maroon-deep/90 text-ivory text-[10px] font-montserrat uppercase px-3 py-1 border border-gold/40">
              Quarry Bench Scouting · Carrara, Italy
            </div>
          </div>

          <div className="md:col-span-4 relative aspect-[4/5] md:aspect-auto overflow-hidden border border-gold/40 shadow-xl bg-stone-200">
            <Image
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop"
              alt="Finished Luxury Installation"
              fill
              className="object-cover"
            />
            <div className="absolute bottom-4 left-4 bg-maroon-deep/90 text-ivory text-[10px] font-montserrat uppercase px-3 py-1 border border-gold/40">
              South Mumbai Private Residence
            </div>
          </div>
        </div>
      </div>

      {/* The Story & Lineage */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          <div className="md:col-span-4">
            <span className="font-raleway text-xs uppercase tracking-[0.25em] text-gold font-medium block mb-2">
              Founding Heritage
            </span>
            <h2 className="font-marcellus text-2xl sm:text-3xl text-maroon">
              The Gandhi Civil Decor Group
            </h2>
            <div className="mt-4 pt-4 border-t border-gold/20">
              <a
                href={SITE_CONFIG.parentBrand.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-montserrat text-gold hover:underline"
              >
                <span>Parent Brand: Quality Marble</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <div className="md:col-span-8 space-y-4 font-poppins text-xs sm:text-sm text-grey leading-relaxed">
            <p>
              In 1971, the foundations of what would become the Gandhi Civil Decor Group were laid across Western India. Initially pioneering heavy industrial civil contracting and monumental stonework, the group developed an instinctive understanding of how natural stone reacts to climate, foundation settling, and architectural loads.
            </p>
            <p>
              Formalised in 1997, Gandhi Civil Decor expanded into luxury residential fitouts across South Mumbai—from the colonial bungalows of Malabar Hill to the high-rise penthouses of Worli. Recognizing that commercial marble vendors lacked the structural rigor required for zero-tolerance dry-laying, the group partnered with{" "}
              <strong className="text-maroon font-montserrat">Quality Marble</strong> to establish direct overseas sourcing operations in Carrara, Verona, and Turkey.
            </p>
            <p>
              Today, <strong className="text-maroon font-montserrat">INTIOSS</strong> represents the pure expression of this half-century legacy: a dedicated atelier for high-net-worth clients, developers, and discerning architects who require total command over block yield, bookmatching, and lifetime maintenance.
            </p>
          </div>
        </div>
      </div>

      {/* Core Values / Pillars */}
      <div className="bg-white py-20 border-y border-gold/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-raleway text-xs uppercase tracking-[0.3em] text-gold block mb-2">
              Our Principles
            </span>
            <h3 className="font-marcellus text-3xl sm:text-4xl text-maroon">
              The Four Tenets of INTIOSS
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 bg-ivory border border-gold/30">
              <Compass className="w-6 h-6 text-gold mb-4 stroke-[1.5]" />
              <h4 className="font-marcellus text-lg text-maroon mb-2">Zero-Intermediary Sourcing</h4>
              <p className="font-poppins text-xs text-grey leading-relaxed">
                We inspect raw quarry benches in person. No brokers, no auctions. You receive authentic block provenance with verified geological batch testing.
              </p>
            </div>

            <div className="p-6 bg-ivory border border-gold/30">
              <Hammer className="w-6 h-6 text-gold mb-4 stroke-[1.5]" />
              <h4 className="font-marcellus text-lg text-maroon mb-2">Substrate Civil Mastery</h4>
              <p className="font-poppins text-xs text-grey leading-relaxed">
                A slab is only as flat as the concrete below it. We engineer self-leveling moisture-barrier screeds before laying a single tile.
              </p>
            </div>

            <div className="p-6 bg-ivory border border-gold/30">
              <Sparkles className="w-6 h-6 text-gold mb-4 stroke-[1.5]" />
              <h4 className="font-marcellus text-lg text-maroon mb-2">Vein-Flow Geometry</h4>
              <p className="font-poppins text-xs text-grey leading-relaxed">
                Every project undergoes a full digital CAD dry-lay and physical factory layout so vein rhythms flow continuously from room to room.
              </p>
            </div>

            <div className="p-6 bg-ivory border border-gold/30">
              <Award className="w-6 h-6 text-gold mb-4 stroke-[1.5]" />
              <h4 className="font-marcellus text-lg text-maroon mb-2">Generational Stewardship</h4>
              <p className="font-poppins text-xs text-grey leading-relaxed">
                Our relationship does not end at handover. With our dedicated AMC division, we maintain mirror clarity through Italian crystallisation for decades.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
