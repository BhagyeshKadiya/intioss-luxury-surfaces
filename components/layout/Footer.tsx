"use client";

import React, { useState } from "react";
import Link from "next/link";
import { IntiossLogo } from "@/components/brand/IntiossLogo";
import { IntiossHexagon } from "@/components/brand/IntiossHexagon";
import { IntiossPattern } from "@/components/brand/IntiossPattern";
import { SITE_CONFIG } from "@/lib/config";
import { ArrowUp, Instagram, Linkedin, Youtube, ExternalLink, Check } from "lucide-react";

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
    <footer className="relative bg-maroon-deep text-ivory pt-20 pb-12 overflow-hidden border-t border-gold/30">
      {/* Faint Hexagon Watermark Pattern */}
      <IntiossPattern opacity={0.05} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid: 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-gold/20">
          {/* Col 1: Brand & Parentage (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col items-start space-y-6">
            <IntiossLogo theme="dark" size="md" />

            <p className="font-poppins text-xs sm:text-sm text-ivory/70 leading-relaxed max-w-sm mt-3">
              Direct quarrier, bespoke processor, and turnkey master fitter of rare marble,
              semi-precious gemstones, and architectural surfaces.
            </p>

            <div className="pt-2">
              <span className="font-raleway text-[11px] uppercase tracking-[0.25em] text-gold/80 block mb-2">
                A Gandhi Civil Decor Group Enterprise
              </span>
              <a
                href={SITE_CONFIG.parentBrand.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-montserrat text-ivory/80 hover:text-gold transition-colors"
              >
                <span>Parent Brand: Quality Marble</span>
                <ExternalLink className="w-3.5 h-3.5 text-gold" />
              </a>
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
                <Link href="/products?category=Marble" className="hover:text-gold transition-colors">
                  Natural Stones
                </Link>
              </li>
              <li>
                <Link href="/products?category=Semi-Precious" className="hover:text-gold transition-colors">
                  Semi-Precious Stones
                </Link>
              </li>
              <li>
                <Link href="/products?category=Countertop" className="hover:text-gold transition-colors">
                  Exclusive Table Tops — Stone
                </Link>
              </li>
              <li>
                <Link href="/products?category=Mosaics" className="hover:text-gold transition-colors">
                  Mosaics
                </Link>
              </li>
              <li>
                <Link href="/products?category=Veneers" className="hover:text-gold transition-colors">
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
                  View All Surfaces →
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Services & Company (3 Cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-marcellus text-base uppercase tracking-wider text-gold border-b border-gold/20 pb-2">
              Services
            </h4>
            <ul className="space-y-2.5 font-montserrat text-xs text-ivory/70">
              <li>
                <Link href="/services#luxury-civil-interior-contracting" className="hover:text-gold transition-colors">
                  Luxury Civil Interior Contracting
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
                <Link href="/services#stone-maintenance-services" className="hover:text-gold transition-colors">
                  Stone Maintenance Services
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Locations & Newsletter (3 Cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-marcellus text-base uppercase tracking-wider text-gold border-b border-gold/20 pb-2">
              Private Concierge
            </h4>
            <div className="text-xs text-ivory/70 space-y-2">
              <p>
                <strong className="text-ivory font-montserrat font-medium">South Mumbai Studio:</strong>
                <br />
                {SITE_CONFIG.locations[0].address}
              </p>
              <p>
                <strong className="text-ivory font-montserrat font-medium">Gujarat Atelier:</strong>
                <br />
                {SITE_CONFIG.locations[1].address}
              </p>
              <p className="pt-1">
                <span className="text-gold font-montserrat">{SITE_CONFIG.phoneDisplay}</span>
                <br />
                <span className="text-ivory/50">{SITE_CONFIG.email}</span>
              </p>
            </div>

            {/* Newsletter input */}
            <form onSubmit={handleSubscribe} className="pt-3">
              <span className="font-raleway text-[11px] uppercase tracking-[0.2em] text-ivory/60 block mb-2">
                Curated Stone Inquiries
              </span>
              <div className="flex items-center border border-gold/40 rounded-sm overflow-hidden bg-black/20">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Architect or Client Email"
                  required
                  className="bg-transparent px-3 py-2 text-xs text-ivory placeholder:text-ivory/40 flex-1 focus:outline-none"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="bg-gold text-maroon px-5 py-2.5 text-xs font-montserrat font-semibold hover:bg-gold-light transition-colors shrink-0 whitespace-nowrap flex items-center justify-center min-w-[100px]"
                >
                  {subscribed ? <Check className="w-4 h-4" /> : "Subscribe"}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom Bar without Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-raleway text-ivory/60">
          <div>
            © {new Date().getFullYear()} INTIOSS – Luxury Surfaces. All rights reserved. Gandhi Civil Decor Group.
          </div>
        </div>
      </div>
    </footer>
  );
}
