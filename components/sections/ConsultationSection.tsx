"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { IntiossHexagon } from "@/components/brand/IntiossHexagon";
import { Check, ArrowRight, MessageSquare } from "lucide-react";

const SURFACE_OPTIONS = [
  "Natural Stone",
  "Semi-Precious",
  "Table Tops",
  "Mosaics",
  "Stone Veneers",
  "Artefacts",
  "Stone Façade",
  "Civil Contracting",
];

const PROJECT_TYPES = [
  "Residential",
  "Commercial",
  "Hospitality",
  "Architect-Designer",
];

export function ConsultationSection() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    city: "",
    projectType: "Residential",
    interestedIn: ["Natural Stone"],
    approxArea: "",
    preferredDate: "",
    message: "",
    honeypot: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedWhatsAppUrl, setSubmittedWhatsAppUrl] = useState<string | null>(null);

  const toggleInterest = (item: string) => {
    setFormData((prev) => {
      const exists = prev.interestedIn.includes(item);
      if (exists) {
        if (prev.interestedIn.length === 1) return prev; // keep at least one
        return { ...prev, interestedIn: prev.interestedIn.filter((i) => i !== item) };
      }
      return { ...prev, interestedIn: [...prev.interestedIn, item] };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/consult", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSubmittedWhatsAppUrl(data.whatsAppUrl);
      } else if (data.errors) {
        const errMap: Record<string, string> = {};
        for (const [k, v] of Object.entries(data.errors)) {
          errMap[k] = Array.isArray(v) ? v[0] : (v as string);
        }
        setErrors(errMap);
      } else {
        setErrors({ general: data.error || "Submission failed. Please try again." });
      }
    } catch {
      setErrors({ general: "Network error. Please contact us directly on WhatsApp." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="consultation" className="relative py-24 sm:py-32 bg-ivory text-maroon overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Luxury Persuasive Image (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/5] w-full overflow-hidden border border-gold/40 shadow-xl bg-maroon-deep">
              <Image
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop"
                alt="INTIOSS Private Stone Consultation & Dry Lay"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-maroon-deep via-transparent to-transparent opacity-85" />

              <div className="absolute bottom-8 left-8 right-8 text-ivory">
                <span className="font-raleway text-[10px] uppercase tracking-[0.3em] text-gold block mb-2">
                  Bespoke Atelier Service
                </span>
                <h3 className="font-marcellus text-2xl sm:text-3xl text-ivory leading-snug">
                  Experience slabs under natural daylight at our private studios.
                </h3>
                <p className="font-poppins text-xs text-ivory/70 mt-3 leading-relaxed">
                  We schedule private viewings for architects and homeowners across our South Mumbai and Gujarat display reserves.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Form Container (7 cols) */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-12 border border-gold/30 shadow-lg relative">
            <AnimatePresence mode="wait">
              {submittedWhatsAppUrl ? (
                // Success State with Hexagon Animation & WhatsApp Continue Button
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-12 flex flex-col items-center text-center"
                >
                  <IntiossHexagon size={64} animated fillMaroon strokeColor="#DDB62B" strokeWidth={2.5} />

                  <h3 className="font-marcellus text-2xl sm:text-3xl text-maroon mt-6">
                    Consultation Request Confirmed
                  </h3>
                  <p className="font-poppins text-xs sm:text-sm text-grey mt-2 max-w-md">
                    Thank you. Our senior technical stone curator will review your floor plans and reach out within 2 business hours.
                  </p>

                  <a
                    href={submittedWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-8 inline-flex items-center gap-2 bg-maroon hover:bg-maroon-deep text-white px-8 py-4 font-montserrat text-xs uppercase tracking-[0.2em] font-medium border border-gold shadow-md transition-colors"
                  >
                    <MessageSquare className="w-4 h-4 text-gold" />
                    <span>Continue on WhatsApp with Details</span>
                  </a>

                  <button
                    onClick={() => setSubmittedWhatsAppUrl(null)}
                    className="mt-6 text-xs font-raleway text-grey hover:text-maroon underline uppercase tracking-wider"
                  >
                    Submit Another Request
                  </button>
                </motion.div>
              ) : (
                // Consultation Booking Form
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="space-y-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div>
                    <span className="font-raleway font-light text-xs uppercase tracking-[0.25em] text-grey block">
                      Private Appointment
                    </span>
                    <h3 className="font-marcellus text-2xl sm:text-3xl text-maroon mt-1">
                      Book a Private Consultation
                    </h3>
                  </div>

                  {errors.general && (
                    <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-poppins">
                      {errors.general}
                    </div>
                  )}

                  {/* Honeypot Spam Trap (Hidden) */}
                  <input
                    type="text"
                    name="website_honeypot"
                    value={formData.honeypot}
                    onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  {/* Row 1: Full Name & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="relative">
                      <label className="block text-[11px] font-montserrat uppercase tracking-wider text-grey mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="e.g. Rahul Mehta"
                        className="w-full bg-transparent border-b border-gold/40 py-2 text-sm text-maroon placeholder:text-grey/40 focus:outline-none focus:border-gold transition-colors"
                      />
                      {errors.fullName && (
                        <span className="text-[10px] text-red-600 mt-1 block">{errors.fullName}</span>
                      )}
                    </div>

                    <div className="relative">
                      <label className="block text-[11px] font-montserrat uppercase tracking-wider text-grey mb-1">
                        Phone (+91) *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98200 XXXXX"
                        className="w-full bg-transparent border-b border-gold/40 py-2 text-sm text-maroon placeholder:text-grey/40 focus:outline-none focus:border-gold transition-colors"
                      />
                      {errors.phone && (
                        <span className="text-[10px] text-red-600 mt-1 block">{errors.phone}</span>
                      )}
                    </div>
                  </div>

                  {/* Row 2: Email & City */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="relative">
                      <label className="block text-[11px] font-montserrat uppercase tracking-wider text-grey mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="rahul@example.com"
                        className="w-full bg-transparent border-b border-gold/40 py-2 text-sm text-maroon placeholder:text-grey/40 focus:outline-none focus:border-gold transition-colors"
                      />
                      {errors.email && (
                        <span className="text-[10px] text-red-600 mt-1 block">{errors.email}</span>
                      )}
                    </div>

                    <div className="relative">
                      <label className="block text-[11px] font-montserrat uppercase tracking-wider text-grey mb-1">
                        City *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        placeholder="Mumbai, Ahmedabad, Surat..."
                        className="w-full bg-transparent border-b border-gold/40 py-2 text-sm text-maroon placeholder:text-grey/40 focus:outline-none focus:border-gold transition-colors"
                      />
                      {errors.city && (
                        <span className="text-[10px] text-red-600 mt-1 block">{errors.city}</span>
                      )}
                    </div>
                  </div>

                  {/* Project Type */}
                  <div>
                    <label className="block text-[11px] font-montserrat uppercase tracking-wider text-grey mb-2">
                      Project Type
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {PROJECT_TYPES.map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setFormData({ ...formData, projectType: type })}
                          className={`py-2 px-3 text-xs font-montserrat text-center border transition-all ${
                            formData.projectType === type
                              ? "bg-maroon text-white border-gold font-medium"
                              : "border-gold/30 text-grey hover:border-gold hover:text-maroon"
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Interested In Multi-Select Chips */}
                  <div>
                    <label className="block text-[11px] font-montserrat uppercase tracking-wider text-grey mb-2">
                      Surfaces & Disciplines of Interest *
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {SURFACE_OPTIONS.map((item) => {
                        const isSelected = formData.interestedIn.includes(item);
                        return (
                          <button
                            key={item}
                            type="button"
                            onClick={() => toggleInterest(item)}
                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-montserrat transition-all border ${
                              isSelected
                                ? "bg-maroon-deep text-ivory border-gold"
                                : "bg-white text-grey border-gold/30 hover:border-gold hover:text-maroon"
                            }`}
                          >
                            {isSelected && <Check className="w-3.5 h-3.5 text-gold" />}
                            <span>{item}</span>
                          </button>
                        );
                      })}
                    </div>
                    {errors.interestedIn && (
                      <span className="text-[10px] text-red-600 mt-1 block">{errors.interestedIn}</span>
                    )}
                  </div>

                  {/* Row 3: Approx Area & Preferred Date */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="relative">
                      <label className="block text-[11px] font-montserrat uppercase tracking-wider text-grey mb-1">
                        Approx. Area (Sq Ft)
                      </label>
                      <input
                        type="text"
                        value={formData.approxArea}
                        onChange={(e) => setFormData({ ...formData, approxArea: e.target.value })}
                        placeholder="e.g. 5,000 sq ft"
                        className="w-full bg-transparent border-b border-gold/40 py-2 text-sm text-maroon placeholder:text-grey/40 focus:outline-none focus:border-gold transition-colors"
                      />
                    </div>

                    <div className="relative">
                      <label className="block text-[11px] font-montserrat uppercase tracking-wider text-grey mb-1">
                        Preferred Date
                      </label>
                      <input
                        type="date"
                        value={formData.preferredDate}
                        onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                        className="w-full bg-transparent border-b border-gold/40 py-2 text-sm text-maroon placeholder:text-grey/40 focus:outline-none focus:border-gold transition-colors"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div className="relative">
                    <label className="block text-[11px] font-montserrat uppercase tracking-wider text-grey mb-1">
                      Project Notes or Specific Stones Needed
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="e.g. Looking for continuous bookmatched Statuario for Worli duplex living room..."
                      className="w-full bg-transparent border-b border-gold/40 py-2 text-sm text-maroon placeholder:text-grey/40 focus:outline-none focus:border-gold transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-maroon hover:bg-maroon-deep text-white py-4 font-montserrat text-xs uppercase tracking-[0.2em] font-semibold border border-gold shadow-md flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Reserving Consultation...</span>
                    ) : (
                      <>
                        <span>Submit Private Consultation Request</span>
                        <ArrowRight className="w-4 h-4 text-gold" />
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
