import React from "react";
import { SITE_CONFIG, getWhatsAppUrl } from "@/lib/config";
import { ConsultationSection } from "@/components/sections/ConsultationSection";
import { Phone, Mail, MapPin, Clock, MessageSquare, ExternalLink } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Private Contact & Experience Studios | INTIOSS",
  description:
    "Schedule a private viewing at our Silvassa, Mumbai, or Kishangarh locations. Inquire directly with our stone concierges.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-ivory text-maroon pt-24 sm:pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-raleway font-light text-xs sm:text-sm uppercase tracking-[0.3em] text-grey mb-3 block">
            Private Concierge
          </span>
          <h1 className="font-marcellus text-4xl sm:text-6xl text-maroon">
            Connect With Our Curators
          </h1>
          <p className="font-poppins text-xs sm:text-sm text-grey mt-4 leading-relaxed">
            Whether specifying slabs for an expansive residence, commissioning a bespoke bookmatched installation, or visiting our 80,000 sq ft processing works, our directors are available for private consultations.
          </p>
        </div>

        {/* 3 Physical Locations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {SITE_CONFIG.locations.map((loc, idx) => (
            <div
              key={loc.city}
              className="bg-white border border-gold/30 p-8 shadow-sm flex flex-col justify-between"
            >
              <div>
                <span className="font-raleway text-[10px] uppercase tracking-[0.25em] text-gold block mb-1">
                  Location 0{idx + 1}
                </span>
                <h3 className="font-marcellus text-2xl text-maroon">
                  {loc.city}
                </h3>
                <p className="font-montserrat text-xs text-grey font-medium mt-1">
                  {loc.area}
                </p>

                <div className="mt-6 space-y-3 font-poppins text-xs text-maroon/85">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                    <span>{loc.address}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-gold flex-shrink-0" />
                    <span>{loc.phone}</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Clock className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                    <span>{loc.hours}</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-gold/20">
                <a
                  href={getWhatsAppUrl(`Hello INTIOSS, I would like to schedule a visit to the ${loc.city} studio.`)}
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

        {/* Map Embed Container */}
        <div className="mb-20 border border-gold/40 shadow-xl overflow-hidden bg-stone-200">
          <div className="p-4 bg-maroon-deep text-ivory flex items-center justify-between border-b border-gold/30">
            <span className="font-montserrat text-xs uppercase tracking-widest text-gold">
              Experience Studios & Processing Hubs
            </span>
            <span className="font-raleway text-[11px] text-ivory/60">
              Silvassa · Mumbai · Kishangarh
            </span>
          </div>
          <iframe
            title="INTIOSS South Mumbai Studio Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3772.842774900767!2d72.81845187590886!3d18.993593082193566!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7ce8ea9844f2d%3A0xe9f799a4e98f7902!2sDr%20E%20Moses%20Rd%2C%20Worli%2C%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1715000000000!5m2!1sen!2sin"
            width="100%"
            height="420"
            style={{ border: 0, filter: "grayscale(20%) contrast(1.1)" }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>

      {/* Embedded Consultation Section */}
      <ConsultationSection />
    </div>
  );
}
