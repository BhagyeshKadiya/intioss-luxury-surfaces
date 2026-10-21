import React from "react";
import { SITE_CONFIG, getWhatsAppUrl } from "@/lib/config";
import { ConsultationSection } from "@/components/sections/ConsultationSection";
import { Placeholder } from "@/components/ui/Placeholder";
import { Phone, Mail, MapPin, Clock, MessageSquare } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Private Contact & Studios | INTIOSS",
  description:
    "Schedule a private viewing at our Mumbai, Silvassa, or Kishangarh locations. Inquire directly with our stone concierges.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-ivory text-maroon pt-24 sm:pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-montserrat font-medium text-xs sm:text-sm uppercase tracking-[0.3em] text-gold mb-3 block">
            Private Concierge
          </span>
          <h1 className="font-marcellus text-4xl sm:text-6xl text-maroon">
            Connect With Our Curators
          </h1>
          <p className="font-jost text-sm sm:text-base text-grey mt-4 leading-relaxed">
            Whether specifying slabs for an expansive residence, commissioning a bespoke bookmatched installation, or visiting our processing works, our team is available for private consultations.
          </p>
        </div>

        {/* 3 Physical Locations Grid with Placeholders */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {SITE_CONFIG.locations.map((loc, idx) => (
            <div
              key={loc.city}
              className="bg-white border border-gold/30 p-8 shadow-sm flex flex-col justify-between"
            >
              <div>
                <span className="font-montserrat text-[10px] uppercase tracking-[0.25em] text-gold block mb-1 font-semibold">
                  Location 0{idx + 1}
                </span>
                <h3 className="font-marcellus text-2xl text-maroon">
                  {loc.city}
                </h3>
                <p className="font-montserrat text-xs text-grey font-medium mt-1">
                  {loc.area}
                </p>

                <div className="mt-6 space-y-3 font-jost text-xs text-maroon/85">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                    <Placeholder kind="ADDRESS" label="[ADDRESS]" className="p-1 px-2 text-[10px] bg-paper" />
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-gold flex-shrink-0" />
                    <span>{loc.phone}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Mail className="w-4 h-4 text-gold flex-shrink-0" />
                    <span>{SITE_CONFIG.email}</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Clock className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                    <span>{loc.hours}</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-gold/20">
                <a
                  href={getWhatsAppUrl(`Hello INTIOSS, I would like to schedule a visit to the ${loc.city} location.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-montserrat uppercase tracking-wider text-maroon hover:text-gold font-semibold transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-gold" />
                  <span>Schedule Private Viewing</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Studio Locations Overview (Replaces Worli Map) */}
        <div className="mb-20 border border-gold/40 shadow-sm bg-white p-8 sm:p-12 text-center">
          <span className="font-montserrat text-xs uppercase tracking-widest text-gold block mb-2 font-medium">
            Physical Presence
          </span>
          <h2 className="font-marcellus text-2xl sm:text-3xl text-maroon mb-4">
            Three Dedicated Locations Across India
          </h2>
          <p className="font-jost text-sm text-grey max-w-xl mx-auto mb-8">
            Private viewings are conducted by prior appointment in Mumbai, Silvassa, and Kishangarh. Full studio and yard addresses will be confirmed upon appointment scheduling.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <div className="p-4 bg-paper border border-gold/25">
              <strong className="block font-marcellus text-lg text-maroon">Mumbai</strong>
              <span className="text-xs text-grey">Studio & Experience Gallery</span>
              <div className="mt-2">
                <Placeholder kind="ADDRESS" label="[ADDRESS]" className="w-full text-[10px]" />
              </div>
            </div>
            <div className="p-4 bg-paper border border-gold/25">
              <strong className="block font-marcellus text-lg text-maroon">Silvassa</strong>
              <span className="text-xs text-grey">Processing Works & Slab Hub</span>
              <div className="mt-2">
                <Placeholder kind="ADDRESS" label="[ADDRESS]" className="w-full text-[10px]" />
              </div>
            </div>
            <div className="p-4 bg-paper border border-gold/25">
              <strong className="block font-marcellus text-lg text-maroon">Kishangarh</strong>
              <span className="text-xs text-grey">Architectural Stone Atelier</span>
              <div className="mt-2">
                <Placeholder kind="ADDRESS" label="[ADDRESS]" className="w-full text-[10px]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Embedded Consultation Section */}
      <ConsultationSection />
    </div>
  );
}
