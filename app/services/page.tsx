import React from "react";
import Image from "next/image";
import Link from "next/link";
import { SERVICES } from "@/data/services";
import { Placeholder } from "@/components/ui/Placeholder";
import { Calendar, MessageSquare, CheckCircle2 } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/config";
import type { Metadata } from "next";
import { ServicesShowcaseCarousel } from "@/components/services/ServicesShowcaseCarousel";
import { ServicesProductsCarousel } from "@/components/services/ServicesProductsCarousel";
import { HexagonBackground } from "@/components/brand/HexagonBackground";

export const metadata: Metadata = {
  title: "Stone Services & Architectural Execution | INTIOSS",
  description:
    "End-to-end architectural stone execution: Luxury civil contracting, block processing, ventilated facades, CNC & waterjet carving, international sourcing, and stone restoration & maintenance.",
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-ivory text-maroon pt-24 sm:pt-28 pb-32 relative overflow-hidden">
      {/* Luxury Animated Hexagon Background */}
      <HexagonBackground
        theme="light"
        intensity="subtle"
        showPattern={true}
        showFloating={true}
      />

      {/* Intro Header Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-14 sm:mb-20 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <span className="font-montserrat font-semibold text-xs sm:text-sm uppercase tracking-[0.3em] text-gold-dark mb-3 block">
            SOURCING · PROCESSING · INSTALLATION
          </span>
          <h1 className="font-marcellus text-3xl sm:text-5xl lg:text-6xl text-maroon tracking-wide">
            Stone Services & Architectural Execution
          </h1>
          <p className="font-jost text-sm sm:text-base text-stone-700 mt-5 leading-relaxed font-normal">
            INTIOSS delivers stone work end to end, through its in-house capability and its group companies, which handle luxury civil contracting and related work.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* 1. Architectural Services Carousel */}
        <ServicesShowcaseCarousel />

        {/* 2. Detailed Disciplines & Technical Execution Protocols */}
        <div className="pt-12 border-t border-gold/25 mb-16">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-montserrat text-xs uppercase tracking-[0.25em] text-gold-dark font-semibold block mb-2">
              In-Depth Specifications
            </span>
            <h2 className="font-marcellus text-2xl sm:text-4xl text-maroon">
              Detailed Execution Protocols
            </h2>
          </div>

          <div className="space-y-24 sm:space-y-36">
            {SERVICES.map((service, index) => {
              const isEven = index % 2 === 0;
              return (
                <section
                  key={service.id}
                  id={service.slug}
                  className={`relative py-14 sm:py-16 scroll-mt-28 ${
                    index % 2 === 1
                      ? "bg-white border-y border-gold/20 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 shadow-xs"
                      : "bg-transparent"
                  }`}
                >
                  <div className="max-w-7xl mx-auto">
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
                        <div className="relative aspect-[4/5] w-full overflow-hidden border border-gold/40 shadow-xl bg-stone-100 flex items-center justify-center">
                          {service.photoPlaceholder ? (
                            <Placeholder
                              kind="PHOTO"
                              label={`[${service.photoPlaceholder}]`}
                              className="w-full h-full bg-paper p-8 flex-col justify-center"
                            >
                              <span className="text-xs text-grey max-w-xs block mt-2">
                                Authentic photography representing INTIOSS sourcing specialists waiting for client supply.
                              </span>
                            </Placeholder>
                          ) : (
                            <>
                              <Image
                                src={service.image}
                                alt={service.title}
                                fill
                                sizes="(max-width: 1024px) 100vw, 45vw"
                                className="object-cover"
                              />
                              <div className="absolute top-4 left-4 bg-maroon-deep text-ivory text-[10px] font-montserrat uppercase tracking-widest px-3 py-1 border border-gold/40 shadow-xs">
                                Service 0{index + 1}
                              </div>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Text Column (7 cols) */}
                      <div
                        className={`lg:col-span-7 flex flex-col justify-center ${
                          isEven ? "lg:order-2" : "lg:order-1"
                        }`}
                      >
                        <span className="font-montserrat text-xs uppercase tracking-[0.25em] text-gold-dark font-semibold">
                          Architectural Discipline 0{index + 1}
                        </span>
                        <h2 className="font-marcellus text-2xl sm:text-4xl text-maroon mt-1">
                          {service.title}
                        </h2>
                        <p className="font-jost text-sm sm:text-base text-stone-700 leading-relaxed mt-4">
                          {service.fullDesc}
                        </p>

                        {/* Capabilities Highlights */}
                        <div className="mt-6">
                          <h4 className="font-montserrat text-xs uppercase tracking-wider text-maroon font-semibold mb-3">
                            Key Architectural Capabilities:
                          </h4>
                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-jost text-stone-700">
                            {service.capabilities.map((cap, cIdx) => (
                              <li key={cIdx} className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                                <span>{cap}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Execution Protocol Steps */}
                        <div className="mt-8 pt-6 border-t border-gold/25">
                          <span className="font-montserrat text-[11px] uppercase tracking-[0.2em] text-stone-600 font-semibold block mb-4">
                            Execution Protocol
                          </span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                            {service.process.map((step) => (
                              <div
                                key={step.stepNumber}
                                className="bg-paper p-3 border border-gold/30 flex flex-col shadow-xs"
                              >
                                <span className="font-montserrat text-[10px] text-gold-dark font-bold">
                                  Step {step.stepNumber}
                                </span>
                                <span className="font-marcellus text-xs text-maroon font-semibold mt-1">
                                  {step.title}
                                </span>
                                <p className="font-jost text-[10px] text-stone-600 mt-1 leading-snug">
                                  {step.description}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* CTA Strip */}
                        <div className="mt-8 flex flex-wrap items-center gap-4">
                          <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 bg-maroon hover:bg-maroon-deep text-white px-6 py-3 font-montserrat text-xs uppercase tracking-[0.2em] font-semibold border border-gold transition-all duration-200 active:scale-95 shadow-sm"
                          >
                            <Calendar className="w-3.5 h-3.5 text-gold" />
                            <span>Book Consultation</span>
                          </Link>

                          <a
                            href={getWhatsAppUrl(`Hello INTIOSS, I would like to inquire regarding ${service.title}.`)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-white hover:bg-ivory text-maroon px-5 py-3 font-montserrat text-xs uppercase tracking-[0.18em] border border-gold/40 transition-all duration-200 active:scale-95 shadow-sm"
                          >
                            <MessageSquare className="w-3.5 h-3.5 text-gold" />
                            <span>Inquire on WhatsApp</span>
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

        {/* 3. Product Showcase Carousel on Services Page */}
        <ServicesProductsCarousel />
      </div>
    </div>
  );
}
