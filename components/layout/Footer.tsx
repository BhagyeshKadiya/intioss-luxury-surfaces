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
                  className="bg-gold text-maroon px-5 py-2.5 text-xs font-montserrat font-semibold hover:bg-gold-light transition-colors shrink-0 whitespace-nowrap flex items-center justify-center min-w-[100px] active:scale-95 cursor-pointer"
                >
                  {subscribed ? <Check className="w-4 h-4" /> : "Subscribe"}
                </button>
              </div>
            </form>

            {/* Social Icons positioned directly underneath the Subscribe form in their authentic brand colors */}
            <div className="pt-5">
              <span className="font-montserrat text-[10px] uppercase tracking-[0.2em] text-gold/90 block mb-2.5 font-semibold">
                Follow INTIOSS
              </span>
              <div className="flex items-center gap-2.5">
                {/* Instagram: Authentic Gradient Brand Colors */}
                <a
                  href={SITE_CONFIG.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow INTIOSS on Instagram"
                  className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#FD1D1D] via-[#E1306C] to-[#833AB4] p-[1.5px] shadow-[0_4px_14px_rgba(225,48,108,0.35)] hover:scale-110 hover:shadow-[0_6px_20px_rgba(225,48,108,0.6)] active:scale-95 transition-all duration-300 flex items-center justify-center group"
                >
                  <div className="w-full h-full rounded-full bg-gradient-to-tr from-[#FD1D1D] via-[#E1306C] to-[#833AB4] flex items-center justify-center text-white">
                    <Instagram className="w-4 h-4 text-white drop-shadow-xs" />
                  </div>
                </a>

                {/* LinkedIn: Authentic #0077B5 Brand Color */}
                <a
                  href={SITE_CONFIG.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Connect with INTIOSS on LinkedIn"
                  className="w-9 h-9 rounded-full bg-[#0077B5] hover:bg-[#006097] text-white shadow-[0_4px_14px_rgba(0,119,181,0.35)] hover:scale-110 hover:shadow-[0_6px_20px_rgba(0,119,181,0.6)] active:scale-95 transition-all duration-300 flex items-center justify-center"
                >
                  <Linkedin className="w-4 h-4 fill-white text-white drop-shadow-xs" />
                </a>

                {/* YouTube: Authentic #FF0000 Brand Color */}
                <a
                  href={SITE_CONFIG.socials.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Watch INTIOSS on YouTube"
                  className="w-9 h-9 rounded-full bg-[#FF0000] hover:bg-[#D90000] text-white shadow-[0_4px_14px_rgba(255,0,0,0.35)] hover:scale-110 hover:shadow-[0_6px_20px_rgba(255,0,0,0.6)] active:scale-95 transition-all duration-300 flex items-center justify-center"
                >
                  <Youtube className="w-4 h-4 fill-white text-white drop-shadow-xs" />
                </a>

                {/* WhatsApp: Authentic #25D366 Brand Color */}
                <a
                  href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent("Hello INTIOSS Concierge, I would like to inquire about your luxury surfaces.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Connect with INTIOSS Concierge on WhatsApp"
                  className="w-9 h-9 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-[0_4px_14px_rgba(37,211,102,0.35)] hover:scale-110 hover:shadow-[0_6px_20px_rgba(37,211,102,0.6)] active:scale-95 transition-all duration-300 flex items-center justify-center"
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" className="text-white drop-shadow-xs">
                    <path d="M12.031 2C6.495 2 2 6.495 2 12.031c0 1.954.563 3.784 1.536 5.334L2 22l4.809-1.503c1.488.895 3.228 1.411 5.222 1.411 5.536 0 10.031-4.495 10.031-10.031C22.062 6.495 17.567 2 12.031 2zm0 18.283c-1.748 0-3.37-.532-4.717-1.442l-.338-.228-2.852.891.907-2.776-.251-.37c-1.026-1.512-1.569-3.284-1.569-5.127 0-4.57 3.717-8.287 8.287-8.287 4.57 0 8.287 3.717 8.287 8.287 0 4.57-3.717 8.287-8.287 8.287zm4.542-6.208c-.249-.125-1.472-.727-1.7-.81-.228-.083-.395-.125-.561.125-.166.25-.644.81-.789.977-.146.166-.291.187-.54.062-.249-.125-1.052-.388-2.003-1.236-.74-.66-1.24-1.476-1.385-1.725-.146-.249-.016-.384.108-.508.112-.112.249-.291.374-.437.125-.145.166-.25.25-.415.083-.166.042-.312-.021-.437-.062-.125-.561-1.352-.769-1.852-.202-.486-.407-.42-.561-.428-.145-.008-.312-.008-.478-.008-.166 0-.437.062-.665.312-.228.25-.873.853-.873 2.079 0 1.227.894 2.412 1.019 2.578.125.166 1.758 2.685 4.26 3.766.595.257 1.06.41 1.423.525.599.19 1.144.163 1.575.099.48-.072 1.472-.602 1.68-1.184.208-.582.208-1.081.145-1.185-.062-.104-.228-.166-.477-.291z" />
                  </svg>
                </a>
              </div>
            </div>
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
