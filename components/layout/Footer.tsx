"use client";

import React, { useState } from "react";
import Link from "next/link";
import { IntiossHexagon } from "@/components/brand/IntiossHexagon";
import { IntiossPattern } from "@/components/brand/IntiossPattern";
import { SITE_CONFIG } from "@/lib/config";
import { Instagram, Linkedin, Youtube, ExternalLink, Check } from "lucide-react";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="relative bg-maroon-deep text-ivory pt-20 pb-28 sm:pb-14 overflow-hidden border-t border-gold/30">
      {/* Faint Hexagon Watermark Pattern (Simple, No Animation, No Motion) */}
      <IntiossPattern opacity={0.05} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid: 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-gold/20">
          {/* Col 1: INTIOSS & Group Companies (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col items-start space-y-6">
            <Link
              href="/"
              onClick={(e) => {
                if (typeof window !== "undefined") {
                  const lenis = (window as any).__lenis;
                  if (lenis) {
                    lenis.scrollTo(0, { duration: 1.0 });
                  }
                  window.scrollTo({ top: 0, behavior: "smooth" });

                  if (window.location.pathname === "/") {
                    e.preventDefault();
                  }
                }
              }}
              className="inline-flex items-center transition-transform hover:scale-105 active:scale-95 select-none"
              aria-label="INTIOSS Home"
            >
              <IntiossHexagon
                size={72}
                className="drop-shadow-[0_4px_20px_rgba(221,182,43,0.35)]"
              />
            </Link>

            <p className="font-jost text-xs sm:text-sm text-ivory/90 leading-relaxed max-w-sm mt-2">
              Curators of rare Italian marble, semi-precious gemstones, and bespoke architectural stone surfaces.
            </p>

            {/* Group Companies Section (Text-only until unmodified logo artwork is supplied) */}
            <div className="w-full pt-3 border-t border-gold/20">
              <span className="font-montserrat text-[10px] uppercase tracking-[0.25em] text-gold font-semibold block mb-3">
                INTIOSS Group
              </span>
              <div className="space-y-2 text-xs font-jost text-ivory/90">
                <div className="flex items-start justify-between gap-2">
                  <strong className="text-ivory font-medium">Quality Marble</strong>
                  <span className="text-ivory/80 text-[11px] text-right">Stockyard and marbles</span>
                </div>
                <div className="flex items-start justify-between gap-2">
                  <strong className="text-ivory font-medium">Marmo Granite International</strong>
                  <span className="text-ivory/80 text-[11px] text-right">Production</span>
                </div>
                <div className="flex items-start justify-between gap-2">
                  <strong className="text-ivory font-medium">Gandhi Civil Décor</strong>
                  <span className="text-ivory/80 text-[11px] text-right">Installation</span>
                </div>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-4 pt-2">
              <a
                href={SITE_CONFIG.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full border border-gold/40 flex items-center justify-center text-ivory/80 hover:text-gold hover:border-gold transition-all"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={SITE_CONFIG.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-full border border-gold/40 flex items-center justify-center text-ivory/80 hover:text-gold hover:border-gold transition-all"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={SITE_CONFIG.socials.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-9 h-9 rounded-full border border-gold/40 flex items-center justify-center text-ivory/80 hover:text-gold hover:border-gold transition-all"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Products & Categories (2 Cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-marcellus text-base uppercase tracking-wider text-gold border-b border-gold/20 pb-2">
              Products
            </h4>
            <ul className="space-y-2.5 font-montserrat text-xs text-ivory/70">
              <li>
                <Link href="/products?category=Natural Stones" className="hover:text-gold transition-colors">
                  Natural Stones
                </Link>
              </li>
              <li>
                <Link href="/products?category=Semi-Precious Stones" className="hover:text-gold transition-colors">
                  Semi-Precious Stones
                </Link>
              </li>
              <li>
                <Link href="/products?category=Exclusive Table Tops — Stone" className="hover:text-gold transition-colors">
                  Exclusive Table Tops — Stone
                </Link>
              </li>
              <li>
                <Link href="/products?category=Mosaics" className="hover:text-gold transition-colors">
                  Mosaics
                </Link>
              </li>
              <li>
                <Link href="/products?category=Stone Veneers" className="hover:text-gold transition-colors">
                  Stone Veneers
                </Link>
              </li>
              <li>
                <Link href="/products?category=Artefacts" className="hover:text-gold transition-colors">
                  Artefacts
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gold hover:underline">
                  View Full Catalogue →
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Services (3 Cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-marcellus text-base uppercase tracking-wider text-gold border-b border-gold/20 pb-2">
              Services
            </h4>
            <ul className="space-y-2.5 font-montserrat text-xs text-ivory/70">
              <li>
                <Link href="/services#luxury-civil-contracting" className="hover:text-gold transition-colors">
                  Luxury Civil Contracting
                </Link>
              </li>
              <li>
                <Link href="/services#marble-block-processing" className="hover:text-gold transition-colors">
                  Marble Block Processing
                </Link>
              </li>
              <li>
                <Link href="/services#stone-facades" className="hover:text-gold transition-colors">
                  Stone Facades
                </Link>
              </li>
              <li>
                <Link href="/services#cnc-waterjet" className="hover:text-gold transition-colors">
                  CNC & Waterjet
                </Link>
              </li>
              <li>
                <Link href="/services#international-stone-sourcing" className="hover:text-gold transition-colors">
                  International Stone Sourcing
                </Link>
              </li>
              <li>
                <Link href="/services#stone-restoration-maintenance" className="hover:text-gold transition-colors">
                  Stone Restoration & Maintenance
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Exactly Three Locations & Direct Line (3 Cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-marcellus text-base uppercase tracking-wider text-gold border-b border-gold/20 pb-2">
              Locations
            </h4>
            <ul className="flex flex-col gap-2 font-jost text-xs text-ivory/80 pt-1">
              <li className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-gold/70" />
                <span>Mumbai</span>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-gold/70" />
                <span>Silvassa</span>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-gold/70" />
                <span>Kishangarh</span>
              </li>
            </ul>
            <div className="pt-2 border-t border-gold/15">
              <a
                href="tel:+919930171094"
                className="text-gold font-montserrat text-sm hover:underline block font-semibold"
              >
                +91 99301 71094
              </a>
              <span className="text-ivory/80 text-xs">{SITE_CONFIG.email}</span>
            </div>

            {/* Newsletter input */}
            <form onSubmit={handleSubscribe} className="pt-3">
              <span className="font-montserrat text-[10px] uppercase tracking-[0.2em] text-ivory/85 block mb-2 font-medium">
                Subscribe for Updates
              </span>
              <div className="flex items-center border border-gold/40 rounded-sm overflow-hidden bg-black/20">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Architect or Client Email"
                  required
                  className="bg-transparent px-3 py-2 text-xs text-ivory placeholder:text-ivory/60 flex-1 focus:outline-none"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="bg-gold text-maroon px-5 py-2.5 text-xs font-montserrat font-semibold hover:bg-gold-light transition-colors shrink-0 whitespace-nowrap flex items-center justify-center min-w-[100px] active:scale-95"
                >
                  {subscribed ? <Check className="w-4 h-4" /> : "Subscribe"}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-jost text-ivory/80">
          <div>
            © {new Date().getFullYear()} INTIOSS – Luxury Surfaces. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-[11px] font-montserrat uppercase tracking-wider text-ivory/70">
            <span>Mumbai</span>
            <span>·</span>
            <span>Silvassa</span>
            <span>·</span>
            <span>Kishangarh</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
