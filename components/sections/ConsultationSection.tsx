"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { IntiossHexagon } from "@/components/brand/IntiossHexagon";
import { HexagonBackground } from "@/components/brand/HexagonBackground";
import {
  Check,
  ArrowRight,
  MessageSquare,
  Building2,
  Video,
  ChevronDown,
  Layers,
  Wrench,
  X,
  Sparkles,
} from "lucide-react";

export const PRODUCT_INTEREST_OPTIONS = [
  "Natural Stone",
  "Semi-Precious Stone",
  "Table Tops",
  "Stone Veneers",
  "Mosaics",
  "Stone Art",
];

export const SERVICE_INTEREST_OPTIONS = [
  "Luxury Civil Contracting",
  "Marble Block Processing & Slabbing",
  "Stone Facades & Exterior Cladding",
  "CNC & Waterjet Precision Inlay",
  "International Stone Sourcing",
  "Stone Restoration, Polishing & AMC",
];

const PROJECT_TYPES = [
  "Residential",
  "Commercial",
  "Hospitality",
  "Architect-Designer",
];

const APPROX_AREA_OPTIONS = [
  "1 - 500",
  "501 - 2000",
  "2001 - 5000",
  "5001 & above",
];

const TIME_SLOTS = [
  "Morning (10:00 AM - 1:00 PM)",
  "Afternoon (1:00 PM - 4:00 PM)",
  "Evening (4:00 PM - 7:00 PM)",
];

export function ConsultationSection() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    city: "Mumbai",
    consultationMode: "Offline" as "Offline" | "Online",
    projectType: "Residential",
    interestedIn: [] as string[],
    approxArea: "",
    preferredDate: "",
    preferredTime: "",
    message: "",
    honeypot: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedWhatsAppUrl, setSubmittedWhatsAppUrl] = useState<string | null>(null);

  const toggleInterest = (item: string) => {
    setFormData((prev) => {
      const exists = prev.interestedIn.includes(item);
      return {
        ...prev,
        interestedIn: exists
          ? prev.interestedIn.filter((i) => i !== item)
          : [...prev.interestedIn, item],
      };
    });
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) errs.fullName = "Full Name is required";
    if (!formData.phone.trim()) {
      errs.phone = "Phone number is required";
    } else if (!/^[6-9]\d{9}$/.test(formData.phone.replace(/\D/g, "").slice(-10))) {
      errs.phone = "Valid 10-digit Indian phone number required";
    }
    if (!formData.email.trim()) {
      errs.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = "Valid email address required";
    }
    if (!formData.city) errs.city = "City is required";
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.honeypot) return;

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

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
    <section id="consultation" className="relative py-20 sm:py-28 bg-[#FAF7F2] text-maroon-deep overflow-hidden border-b border-gold/30">
      {/* Luxury Animated Hexagon Background */}
      <HexagonBackground
        theme="light"
        intensity="subtle"
        showPattern={true}
        showFloating={true}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Column: Brand Majenta Studio Card (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full min-h-[420px] bg-maroon-deep p-8 sm:p-10 border border-gold/40 shadow-2xl text-ivory rounded-2xl sm:rounded-3xl">
            <div>
              <div className="inline-flex items-center gap-2 mb-3.5 px-3.5 py-1 rounded-full bg-white/10 border border-gold/40">
                <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                <span className="font-montserrat text-[10px] uppercase tracking-[0.22em] text-gold font-semibold">
                  Private Consultation
                </span>
              </div>
              <h3 className="font-marcellus text-2xl sm:text-3xl text-ivory leading-snug">
                {formData.consultationMode === "Online"
                  ? "Virtual Stone Concierge consultations with live HD slab viewing & floor plan specifications."
                  : "Private viewings by appointment in Mumbai, Silvassa and Kishangarh."}
              </h3>
            </div>

            <div className="my-6 flex-1 relative min-h-[260px] sm:min-h-[300px] w-full overflow-hidden border border-gold/30 shadow-lg group rounded-xl">
              <Image
                src="/images/consultation/private-consultation-studio.jpg"
                alt="INTIOSS Private Stone Viewing Studio & Consultation Lounge in Mumbai, Silvassa and Kishangarh"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-maroon-deep/85 via-transparent to-black/20 pointer-events-none" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[10px] font-raleway uppercase tracking-[0.15em] text-gold bg-maroon-deep/90 backdrop-blur-md px-3 py-1.5 border border-gold/30 pointer-events-none shadow-sm rounded-lg">
                <span className="font-semibold">
                  {formData.consultationMode === "Online" ? "Online Video Concierge" : "Private Viewing Lounge"}
                </span>
                <span>Mumbai · Silvassa · Kishangarh</span>
              </div>
            </div>

            <p className="font-jost text-xs text-ivory/70 leading-relaxed border-t border-gold/20 pt-4">
              Dedicated architectural stone consultation for private residences, luxury estates, and commercial landmarks.
            </p>
          </div>

          {/* Right Column: Pristine White Form Container (7 cols) */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-12 border border-gold/30 shadow-xl relative rounded-2xl sm:rounded-3xl text-maroon-deep">
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

                  <h3 className="font-marcellus text-2xl sm:text-3xl text-maroon-deep mt-6">
                    Consultation Request Confirmed
                  </h3>
                  <p className="font-jost text-sm text-stone-600 mt-2 max-w-md">
                    Thank you. Our senior technical stone curator will review your floor plans and reach out within 2 business hours.
                  </p>

                  <a
                    href={submittedWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-8 inline-flex items-center gap-2 bg-maroon hover:bg-maroon-deep text-white px-8 py-4 font-montserrat text-xs uppercase tracking-[0.2em] font-bold rounded-xl shadow-lg transition-transform hover:scale-105"
                  >
                    <MessageSquare className="w-4 h-4 text-gold" />
                    <span>Continue on WhatsApp with Details</span>
                  </a>

                  <button
                    onClick={() => setSubmittedWhatsAppUrl(null)}
                    className="mt-6 text-xs font-montserrat text-gold-dark hover:text-maroon underline uppercase tracking-wider"
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
                    <span className="font-montserrat font-semibold text-[10px] uppercase tracking-[0.25em] text-gold-dark block">
                      Private Appointment
                    </span>
                    <h3 className="font-marcellus text-2xl sm:text-3xl text-maroon-deep mt-1">
                      Book a Private Consultation
                    </h3>
                  </div>

                  {errors.general && (
                    <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-poppins rounded-lg">
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

                  {/* Two Tabs: ONLINE vs OFFLINE Consultation Format */}
                  <div>
                    <label className="block text-[11px] font-montserrat uppercase tracking-wider text-stone-800 font-semibold mb-2">
                      Consultation Format *
                    </label>
                    <div className="grid grid-cols-2 gap-3 p-1.5 bg-[#FAF7F2] border border-gold/40 rounded-xl">
                      <button
                        type="button"
                        onClick={() => setFormData((prev) => ({ ...prev, consultationMode: "Offline" }))}
                        className={`py-3 px-3 text-xs font-montserrat uppercase tracking-wider font-semibold rounded-lg transition-all flex items-center justify-center gap-2 ${
                          formData.consultationMode === "Offline"
                            ? "bg-maroon-deep text-ivory shadow-md font-bold border border-gold"
                            : "text-stone-700 hover:text-maroon hover:bg-white"
                        }`}
                      >
                        <Building2 className="w-4 h-4 text-gold flex-shrink-0" />
                        <span className="truncate">Offline (Studio Visit)</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setFormData((prev) => ({ ...prev, consultationMode: "Online" }))}
                        className={`py-3 px-3 text-xs font-montserrat uppercase tracking-wider font-semibold rounded-lg transition-all flex items-center justify-center gap-2 ${
                          formData.consultationMode === "Online"
                            ? "bg-maroon-deep text-ivory shadow-md font-bold border border-gold"
                            : "text-stone-700 hover:text-maroon hover:bg-white"
                        }`}
                      >
                        <Video className="w-4 h-4 text-gold flex-shrink-0" />
                        <span className="truncate">Online (Virtual Video)</span>
                      </button>
                    </div>
                  </div>

                  {/* Row 1: Full Name & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="relative">
                      <label className="block text-[11px] font-montserrat uppercase tracking-wider text-stone-800 font-semibold mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="e.g. Rahul Mehta"
                        className="w-full bg-transparent border-b border-gold/40 py-2.5 px-1 text-sm text-maroon-deep placeholder:text-stone-400 focus:outline-none focus:border-gold transition-colors"
                      />
                      {errors.fullName && (
                        <span className="text-[10px] text-red-600 mt-1 block">{errors.fullName}</span>
                      )}
                    </div>

                    <div className="relative">
                      <label className="block text-[11px] font-montserrat uppercase tracking-wider text-stone-800 font-semibold mb-1">
                        Phone (+91) *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98200 XXXXX"
                        className="w-full bg-transparent border-b border-gold/40 py-2.5 px-1 text-sm text-maroon-deep placeholder:text-stone-400 focus:outline-none focus:border-gold transition-colors"
                      />
                      {errors.phone && (
                        <span className="text-[10px] text-red-600 mt-1 block">{errors.phone}</span>
                      )}
                    </div>
                  </div>

                  {/* Row 2: Email & City */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="relative">
                      <label className="block text-[11px] font-montserrat uppercase tracking-wider text-stone-800 font-semibold mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="rahul@example.com"
                        className="w-full bg-transparent border-b border-gold/40 py-2.5 px-1 text-sm text-maroon-deep placeholder:text-stone-400 focus:outline-none focus:border-gold transition-colors"
                      />
                      {errors.email && (
                        <span className="text-[10px] text-red-600 mt-1 block">{errors.email}</span>
                      )}
                    </div>

                    <div className="relative">
                      <label className="block text-[11px] font-montserrat uppercase tracking-wider text-stone-800 font-semibold mb-1">
                        City (Where We Are Present) *
                      </label>
                      <div className="relative">
                        <select
                          required
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          className="w-full bg-white border-b border-gold/40 py-2.5 px-1 text-sm text-maroon-deep focus:outline-none focus:border-gold transition-colors cursor-pointer appearance-none pr-8"
                        >
                          <option value="Mumbai">Mumbai (Studio & Experience Gallery)</option>
                          <option value="Silvassa">Silvassa (Processing Works & Slab Hub)</option>
                          <option value="Kishangarh">Kishangarh (Architectural Stone Center)</option>
                          {formData.consultationMode === "Online" && (
                            <option value="Other City (Online Consultation)">
                              Other City (Online Virtual Meeting)
                            </option>
                          )}
                        </select>
                        <ChevronDown className="w-4 h-4 text-gold-dark absolute right-1 top-3 pointer-events-none" />
                      </div>
                      {errors.city && (
                        <span className="text-[10px] text-red-600 mt-1 block">{errors.city}</span>
                      )}
                    </div>
                  </div>

                  {/* Project Type */}
                  <div>
                    <label className="block text-[11px] font-montserrat uppercase tracking-wider text-stone-800 font-semibold mb-2">
                      Project Type
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {PROJECT_TYPES.map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setFormData({ ...formData, projectType: type })}
                          className={`py-2 px-3 text-xs font-montserrat text-center border rounded-lg transition-all active:scale-95 ${
                            formData.projectType === type
                              ? "bg-maroon-deep text-white border-gold font-bold shadow-sm"
                              : "border-gold/30 text-stone-700 hover:border-gold hover:text-maroon font-medium bg-[#FAF7F2]"
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Surfaces & Disciplines of Interest */}
                  <div className="space-y-4">
                    <label className="block text-[11px] font-montserrat uppercase tracking-wider text-stone-800 font-semibold">
                      Surfaces & Disciplines of Interest *
                    </label>

                    {/* Dual Dropdowns Grid: Select Products & Select Services */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Products Dropdown */}
                      <div className="relative">
                        <label className="flex items-center gap-1.5 text-[10px] font-montserrat uppercase tracking-wider text-gold-dark font-semibold mb-1">
                          <Layers className="w-3 h-3 text-gold" />
                          <span>Select Product / Surface</span>
                        </label>
                        <div className="relative">
                          <select
                            defaultValue=""
                            onChange={(e) => {
                              const val = e.target.value;
                              if (val) {
                                if (!formData.interestedIn.includes(val)) {
                                  setFormData((prev) => ({
                                    ...prev,
                                    interestedIn: [...prev.interestedIn, val],
                                  }));
                                }
                                e.target.value = "";
                              }
                            }}
                            className="w-full bg-[#FAF7F2] border border-gold/40 hover:border-gold py-2.5 px-3 text-xs font-montserrat text-maroon-deep focus:outline-none focus:border-gold transition-colors cursor-pointer appearance-none pr-8 rounded-lg shadow-xs"
                          >
                            <option value="">Select Product Category...</option>
                            {PRODUCT_INTEREST_OPTIONS.map((prod) => (
                              <option key={prod} value={prod}>
                                {formData.interestedIn.includes(prod) ? `✓ ${prod}` : prod}
                              </option>
                            ))}
                          </select>
                          <ChevronDown className="w-4 h-4 text-gold-dark absolute right-2.5 top-3 pointer-events-none" />
                        </div>
                      </div>

                      {/* Services Dropdown */}
                      <div className="relative">
                        <label className="flex items-center gap-1.5 text-[10px] font-montserrat uppercase tracking-wider text-gold-dark font-semibold mb-1">
                          <Wrench className="w-3 h-3 text-gold" />
                          <span>Select Architectural Service</span>
                        </label>
                        <div className="relative">
                          <select
                            defaultValue=""
                            onChange={(e) => {
                              const val = e.target.value;
                              if (val) {
                                if (!formData.interestedIn.includes(val)) {
                                  setFormData((prev) => ({
                                    ...prev,
                                    interestedIn: [...prev.interestedIn, val],
                                  }));
                                }
                                e.target.value = "";
                              }
                            }}
                            className="w-full bg-[#FAF7F2] border border-gold/40 hover:border-gold py-2.5 px-3 text-xs font-montserrat text-maroon-deep focus:outline-none focus:border-gold transition-colors cursor-pointer appearance-none pr-8 rounded-lg shadow-xs"
                          >
                            <option value="">Choose from All Services...</option>
                            {SERVICE_INTEREST_OPTIONS.map((serv) => (
                              <option key={serv} value={serv}>
                                {formData.interestedIn.includes(serv) ? `✓ ${serv}` : serv}
                              </option>
                            ))}
                          </select>
                          <ChevronDown className="w-4 h-4 text-gold-dark absolute right-2.5 top-3 pointer-events-none" />
                        </div>
                      </div>
                    </div>

                    {/* Selected Tags Display with Remove Badge */}
                    {formData.interestedIn.length > 0 && (
                      <div className="pt-1">
                        <span className="text-[10px] font-montserrat uppercase tracking-wider text-stone-500 font-medium block mb-1.5">
                          Selected Choices ({formData.interestedIn.length}):
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {formData.interestedIn.map((item) => (
                            <span
                              key={item}
                              className="inline-flex items-center gap-1.5 pl-2.5 pr-1.5 py-1 text-[11px] font-montserrat bg-maroon-deep text-ivory border border-gold rounded-md shadow-xs"
                            >
                              <span>{item}</span>
                              <button
                                type="button"
                                onClick={() => toggleInterest(item)}
                                aria-label={`Remove ${item}`}
                                className="w-4 h-4 rounded-full hover:bg-gold/30 flex items-center justify-center text-gold transition-colors cursor-pointer"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {errors.interestedIn && (
                      <span className="text-[10px] text-red-600 mt-1 block">{errors.interestedIn}</span>
                    )}
                  </div>

                  {/* Row 3: Approx Area (Dropdown) */}
                  <div className="grid grid-cols-1 gap-6">
                    <div className="relative">
                      <label className="block text-[11px] font-montserrat uppercase tracking-wider text-stone-800 font-semibold mb-1">
                        Approx. Area (Sq Ft) *
                      </label>
                      <div className="relative">
                        <select
                          value={formData.approxArea}
                          onChange={(e) => setFormData({ ...formData, approxArea: e.target.value })}
                          className="w-full bg-white border-b border-gold/40 py-2.5 px-1 text-sm text-maroon-deep focus:outline-none focus:border-gold transition-colors cursor-pointer appearance-none pr-8"
                        >
                          <option value="">Select Approx Area...</option>
                          {APPROX_AREA_OPTIONS.map((area) => (
                            <option key={area} value={area}>
                              {area} sq ft
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="w-4 h-4 text-gold-dark absolute right-1 top-3 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  {/* Row 4: Preferred Date & Preferred Time Slots */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="relative">
                      <label className="block text-[11px] font-montserrat uppercase tracking-wider text-stone-800 font-semibold mb-1 flex items-center justify-between">
                        <span>Preferred Date</span>
                        <span className="text-[10px] text-stone-400 font-normal lowercase">(optional)</span>
                      </label>
                      <input
                        type="date"
                        min={new Date().toISOString().split("T")[0]}
                        value={formData.preferredDate}
                        onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                        className="w-full bg-transparent border-b border-gold/40 py-2.5 px-1 text-sm text-maroon-deep placeholder:text-stone-400 focus:outline-none focus:border-gold transition-colors cursor-pointer"
                      />
                    </div>

                    <div className="relative">
                      <label className="block text-[11px] font-montserrat uppercase tracking-wider text-stone-800 font-semibold mb-1 flex items-center justify-between">
                        <span>Preferred Time Slot</span>
                        <span className="text-[10px] text-stone-400 font-normal lowercase">(optional)</span>
                      </label>
                      <div className="relative">
                        <select
                          value={formData.preferredTime}
                          onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                          className="w-full bg-white border-b border-gold/40 py-2.5 px-1 text-sm text-maroon-deep focus:outline-none focus:border-gold transition-colors cursor-pointer appearance-none pr-8"
                        >
                          <option value="">Select Time Slot...</option>
                          {TIME_SLOTS.map((slot) => (
                            <option key={slot} value={slot}>
                              {slot}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="w-4 h-4 text-gold-dark absolute right-1 top-3 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="relative">
                    <label className="block text-[11px] font-montserrat uppercase tracking-wider text-stone-800 font-semibold mb-1">
                      Project Notes or Specific Stones Needed
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="e.g. Looking for continuous bookmatched Statuario for living room flooring..."
                      className="w-full bg-transparent border-b border-gold/40 py-2.5 px-1 text-sm text-maroon-deep placeholder:text-stone-400 focus:outline-none focus:border-gold transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-maroon hover:bg-maroon-deep text-white py-4 font-montserrat text-xs uppercase tracking-[0.2em] font-bold rounded-xl shadow-md flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] border border-gold disabled:opacity-50 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span>Reserving Consultation...</span>
                    ) : (
                      <>
                        <span>Submit Private Consultation Request</span>
                        <ArrowRight className="w-4 h-4 text-gold stroke-[2.5]" />
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
