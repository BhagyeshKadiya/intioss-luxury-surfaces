import React from "react";
import Image from "next/image";
import Link from "next/link";
import { SERVICES } from "@/data/services";
import { ArrowRight, Check, Shield, Calendar, MessageSquare } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Turnkey Stone Services & Civil Contracting | INTIOSS",
  description:
    "End-to-end architectural stone execution: Luxury civil contracting, block processing, ventilated façades, 5-axis CNC & waterjet carving, international sourcing, and AMC care.",
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-ivory text-maroon pt-24 sm:pt-28 pb-32">
      {/* Intro Header Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 sm:mb-24">
        <div className="text-center max-w-3xl mx-auto">
          <span className="font-raleway font-light text-xs sm:text-sm uppercase tracking-[0.3em] text-grey mb-3 block">
            End-To-End Architectural Discipline
          </span>
          <h1 className="font-marcellus text-3xl sm:text-5xl lg:text-6xl text-maroon tracking-wide">
            Sourcing. Processing. Fitting. Care.
          </h1>
          <p className="font-poppins text-xs sm:text-sm text-grey mt-4 leading-relaxed">
            Unlike surface retailers who subcontract execution to unvetted labor, INTIOSS controls the entire lifecycle under one roof. Backed by the Gandhi Civil Décor Group&apos;s 55-year contracting lineage, we guarantee millimeter tolerance from mountain bench to final diamond crystallisation.
          </p>
        </div>
      </div>

      {/* 6 Alternating Image & Text Services Sections */}
      <div className="space-y-24 sm:space-y-36">
        {SERVICES.map((service, index) => {
          const isEven = index % 2 === 0;
          return (
            <section
              key={service.id}
              id={service.slug}
              className={`relative py-16 ${
                index % 2 === 1 ? "bg-white border-y border-gold/20" : "bg-ivory"
              }`}
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center ${
                    isEven ? "" : "lg:flex-row-reverse"
                  }`}
                >
                  {/* Image Column (5 cols) */}
                  <div
                    className={`lg:col-span-5 relative ${
                      isEven ? "lg:order-1" : "lg:order-2"
                    }`}
                  >
                    <div className="relative aspect-[4/5] w-full overflow-hidden border border-gold/40 shadow-xl bg-stone-100">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 45vw"
                        className="object-cover"
                      />
                      <div className="absolute top-4 left-4 bg-maroon-deep text-ivory text-[10px] font-montserrat uppercase tracking-widest px-3 py-1 border border-gold/40">
                        Discipline 0{index + 1}
                      </div>
                    </div>
                  </div>

                  {/* Text Column (7 cols) */}
                  <div
                    className={`lg:col-span-7 flex flex-col justify-center ${
                      isEven ? "lg:order-2" : "lg:order-1"
                    }`}
                  >
                    <span className="font-raleway text-xs uppercase tracking-[0.25em] text-gold font-medium">
                      Turnkey Capability
                    </span>
                    <h2 className="font-marcellus text-2xl sm:text-4xl text-maroon mt-1">
                      {service.title}
                    </h2>
                    <p className="font-poppins text-xs sm:text-sm text-grey leading-relaxed mt-4">
                      {service.fullDesc}
                    </p>

                    {/* Capabilities list */}
                    <div className="mt-6">
                      <h4 className="font-montserrat text-xs uppercase tracking-wider text-maroon font-semibold mb-3">
                        Technical Highlights:
                      </h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-poppins text-maroon/90">
                        {service.capabilities.map((cap, cIdx) => (
                          <li key={cIdx} className="flex items-center gap-2">
                            <Check className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                            <span>{cap}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Process Mini-Timeline (5 Steps) */}
                    <div className="mt-8 pt-6 border-t border-gold/25">
                      <span className="font-raleway text-[11px] uppercase tracking-[0.2em] text-grey block mb-4">
                        Standard Execution Protocol
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                        {service.process.map((step) => (
                          <div
                            key={step.stepNumber}
                            className="bg-ivory/80 p-3 border border-gold/30 flex flex-col"
                          >
                            <span className="font-montserrat text-[10px] text-gold font-bold">
                              {step.stepNumber}
                            </span>
                            <span className="font-marcellus text-xs text-maroon font-semibold mt-1">
                              {step.title}
                            </span>
                            <p className="font-poppins text-[10px] text-grey mt-1 leading-snug line-clamp-3">
                              {step.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CTA Strip */}
                    <div className="mt-8 flex flex-wrap items-center gap-4">
                      <Link
                        href="/#consultation"
                        className="inline-flex items-center gap-2 bg-maroon hover:bg-maroon-deep text-white px-6 py-3 font-montserrat text-xs uppercase tracking-[0.2em] font-semibold border border-gold transition-colors"
                      >
                        <Calendar className="w-3.5 h-3.5 text-gold" />
                        <span>Commission Service</span>
                      </Link>

                      <a
                        href={getWhatsAppUrl(`Hello INTIOSS, I would like to discuss your ${service.title} capabilities for an upcoming project.`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-white hover:bg-ivory text-maroon px-5 py-3 font-montserrat text-xs uppercase tracking-[0.18em] border border-gold/40 transition-colors"
                      >
                        <MessageSquare className="w-3.5 h-3.5 text-gold" />
                        <span>WhatsApp Specialist</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
