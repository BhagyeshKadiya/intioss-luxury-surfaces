"use client";

import React, { useState } from "react";
import { MessageSquare, Send, Sparkles, CheckCircle2 } from "lucide-react";
import { SITE_CONFIG } from "@/lib/config";

interface BespokeOrderFormProps {
  categoryName: string;
  variant?: "card" | "full";
  className?: string;
  onSuccess?: () => void;
}

export function BespokeOrderForm({
  categoryName,
  variant = "full",
  className = "",
  onSuccess,
}: BespokeOrderFormProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [specs, setSpecs] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      alert("Please enter your name and phone number to continue.");
      return;
    }

    const message = `Hello INTIOSS Concierge,\n\nI would like to enquire about bespoke *${categoryName}* (Available on Request / Order Basis).\n\n• Name / Firm: ${name.trim()}\n• Contact: ${phone.trim()}${
      specs.trim() ? `\n• Requirements / Dimensions: ${specs.trim()}` : ""
    }\n\nPlease share fabrication lead times, stone options, and custom pricing.`;

    const encoded = encodeURIComponent(message);
    const waUrl = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encoded}`;

    setSubmitted(true);
    if (typeof window !== "undefined") {
      window.open(waUrl, "_blank", "noopener,noreferrer");
    }
    if (onSuccess) onSuccess();
  };

  if (variant === "card") {
    return (
      <div className={`h-full flex flex-col justify-between p-6 sm:p-7 bg-maroon-deep text-ivory ${className}`}>
        <div>
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-maroon text-gold border border-gold/40 rounded-full text-[10px] font-montserrat uppercase tracking-wider font-semibold mb-3 shadow-sm">
            <Sparkles className="w-3 h-3 text-gold" />
            <span>Available on Request · Order Basis</span>
          </div>

          <h3 className="font-marcellus text-2xl text-ivory leading-tight">
            {categoryName}
          </h3>

          <p className="font-poppins text-xs text-ivory/80 mt-2 leading-relaxed">
            Crafted exclusively on an order basis tailored to your architectural dimensions, edge profiling, and curated stone slabs. We make these bespoke on request rather than ready-made inventory.
          </p>

          <p className="text-[11px] font-montserrat text-gold/80 italic mt-1.5">
            ✦ Commissioned project photos updating soon.
          </p>
        </div>

        {/* Quick WhatsApp Form */}
        <form onSubmit={handleSubmit} className="mt-4 space-y-2.5 pt-3 border-t border-gold/25">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name / Studio *"
              className="w-full bg-black/40 border border-gold/30 px-3 py-2 text-xs text-ivory placeholder:text-ivory/50 rounded-none focus:outline-none focus:border-gold"
            />
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="WhatsApp Number *"
              className="w-full bg-black/40 border border-gold/30 px-3 py-2 text-xs text-ivory placeholder:text-ivory/50 rounded-none focus:outline-none focus:border-gold"
            />
          </div>

          <input
            type="text"
            value={specs}
            onChange={(e) => setSpecs(e.target.value)}
            placeholder="Custom dimensions / stone requirement (optional)"
            className="w-full bg-black/40 border border-gold/30 px-3 py-2 text-xs text-ivory placeholder:text-ivory/50 rounded-none focus:outline-none focus:border-gold"
          />

          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-gold via-gold/90 to-gold text-maroon font-montserrat text-xs uppercase tracking-wider font-bold hover:brightness-110 transition-all shadow-md active:scale-[0.98]"
          >
            <MessageSquare className="w-4 h-4 text-maroon fill-maroon" />
            <span>Enquire on WhatsApp (Available on Request)</span>
          </button>
        </form>
      </div>
    );
  }

  // Full Variant for Product Page Banner
  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-br from-maroon-deep via-maroon to-[#2b0f14] text-ivory border border-gold/40 p-6 sm:p-10 shadow-xl ${className}`}
    >
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Editorial Info */}
        <div className="lg:col-span-7">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-maroon/80 border border-gold/50 rounded-full text-[11px] font-montserrat uppercase tracking-wider font-semibold text-gold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>Available on Request · Bespoke Order Basis</span>
          </div>

          <h2 className="font-marcellus text-2xl sm:text-4xl text-ivory tracking-wide">
            {categoryName}
          </h2>

          <p className="font-poppins text-xs sm:text-sm text-ivory/85 mt-3 leading-relaxed max-w-xl">
            We do not maintain ready-made off-the-shelf inventory for this collection. Each masterpiece is handcrafted exclusively on an order basis to match your architectural drawings, custom dimensions, edge treatments, and chosen stone varieties.
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs font-montserrat text-gold">
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-gold" /> Custom Architectural Dimensions
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-gold" /> Handcrafted on Commission
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-gold" /> Direct Quarry Stone Selection
            </span>
          </div>

          <p className="text-[11px] font-montserrat text-ivory/60 italic mt-3">
            ✦ High-resolution photographs of recently commissioned private installations will be added here soon.
          </p>
        </div>

        {/* Right WhatsApp Form */}
        <div className="lg:col-span-5 bg-white/5 backdrop-blur-md border border-gold/30 p-5 sm:p-6 shadow-2xl">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-gold/20">
            <h4 className="font-marcellus text-lg text-ivory">Request Custom Commission</h4>
            <span className="text-[10px] font-montserrat uppercase tracking-wider text-gold">Direct WhatsApp</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-[10px] font-raleway uppercase tracking-wider text-ivory/70 mb-1">
                Your Name / Architecture Firm *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Rajiv Mehta / Studio Forma"
                className="w-full bg-black/40 border border-gold/30 px-3 py-2 text-xs text-ivory placeholder:text-ivory/40 rounded-none focus:outline-none focus:border-gold"
              />
            </div>

            <div>
              <label className="block text-[10px] font-raleway uppercase tracking-wider text-ivory/70 mb-1">
                WhatsApp Contact Number *
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full bg-black/40 border border-gold/30 px-3 py-2 text-xs text-ivory placeholder:text-ivory/40 rounded-none focus:outline-none focus:border-gold"
              />
            </div>

            <div>
              <label className="block text-[10px] font-raleway uppercase tracking-wider text-ivory/70 mb-1">
                Custom Dimensions & Stone Specifications
              </label>
              <textarea
                rows={2}
                value={specs}
                onChange={(e) => setSpecs(e.target.value)}
                placeholder="e.g. 10-seater dining top in Calacatta Viola, 320x120cm with shark-nose edge"
                className="w-full bg-black/40 border border-gold/30 px-3 py-2 text-xs text-ivory placeholder:text-ivory/40 rounded-none focus:outline-none focus:border-gold resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-[#D4AF37] via-[#f3e5ab] to-[#D4AF37] text-maroon font-montserrat text-xs uppercase tracking-wider font-bold hover:brightness-110 transition-all shadow-lg active:scale-[0.98] mt-2 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 text-maroon fill-maroon" />
              <span>Enquire on WhatsApp (Available on Request)</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
