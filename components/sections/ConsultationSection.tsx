"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { IntiossHexagon } from "@/components/brand/IntiossHexagon";
import { HexagonBackground } from "@/components/brand/HexagonBackground";
import {
  Check,
  ArrowRight,
  MessageSquare,
  Building2,
  MapPin,
  ChevronDown,
  Layers,
  Wrench,
  X,
  Sparkles,
} from "lucide-react";

export const ALL_INDIA_CITIES = [
  "Mumbai",
  "Delhi NCR",
  "Bengaluru",
  "Hyderabad",
  "Ahmedabad",
  "Chennai",
  "Kolkata",
  "Pune",
  "Surat",
  "Jaipur",
  "Kishangarh",
  "Silvassa",
  "Udaipur",
  "Vadodara",
  "Indore",
  "Nagpur",
  "Chandigarh",
  "Lucknow",
  "Coimbatore",
  "Kochi",
  "Goa",
  "Nashik",
  "Rajkot",
  "Bhopal",
  "Visakhapatnam",
  "Varanasi",
  "Dehradun",
  "Ludhiana",
  "Agra",
  "Kanpur",
  "Patna",
  "Thane",
  "Navi Mumbai",
  "Gurgaon",
  "Noida",
  "Faridabad",
  "Ghaziabad",
  "Amritsar",
  "Jodhpur",
  "Jabalpur",
  "Gwalior",
  "Vijayawada",
  "Madurai",
  "Raipur",
  "Kota",
  "Guwahati",
  "Mysore",
  "Mangalore",
  "Bhubaneswar",
  "Ranchi",
  "Jamshedpur",
  "Aurangabad",
  "Kolhapur",
  "Solapur",
  "Jamnagar",
  "Bhavnagar",
  "Morbi",
  "Vapi",
  "Daman",
  "Thiruvananthapuram",
  "Calicut",
  "Salem",
  "Tiruchirappalli",
  "Puducherry",
  "Ajmer",
  "Bikaner",
  "Alwar",
  "Haridwar",
  "Rishikesh",
  "Shimla",
  "Jammu",
  "Srinagar",
  "Allahabad (Prayagraj)",
  "Meerut",
  "Bareilly",
  "Gorakhpur",
  "Aligarh",
  "Moradabad",
  "Gaya",
  "Muzaffarpur",
  "Siliguri",
  "Asansol",
  "Durgapur",
  "Cuttack",
  "Rourkela",
  "Bilaspur",
  "Tirupati",
  "Warangal",
  "Hubballi-Dharwad",
  "Belgaum",
];

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

const STORE_LOCATIONS = [
  "Mumbai (Vile Parle - Stock Yard)",
  "Mumbai (Malad - Stock Yard)",
  "Silvassa (Factory - Experience Centre)",
  "Kishangarh (Only for Semi Precious Stone - Factory Experience Centre)",
];

const USER_ROLES = [
  "Architect",
  "Interior designer",
  "Home Owner",
  "Procurement / Purchase Team",
  "Civil Contractor",
  "Turnkey Contractor",
  "Trader",
];

const PROJECT_TYPES = [
  "Residential",
  "Commercial",
  "Hospitality",
];

const APPROX_AREA_OPTIONS = [
  "1 - 500",
  "501 - 2000",
  "2001 - 5000",
  "5001 & above",
];

const TIME_SLOTS = [
  "10:00 AM - 11:00 AM",
  "11:00 AM - 12:00 PM",
  "12:00 PM - 1:00 PM",
  "1:00 PM - 2:00 PM",
  "2:00 PM - 3:00 PM",
  "3:00 PM - 4:00 PM",
  "4:00 PM - 5:00 PM",
  "5:00 PM - 6:00 PM",
];

export function ConsultationSection() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    city: "",
    consultationMode: "Personal Store Visit" as "Personal Store Visit" | "Request Call Back",
    storeLocation: "",
    userRole: "",
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
  const [isCitySuggestionsOpen, setIsCitySuggestionsOpen] = useState(false);
  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);
  const cityWrapperRef = useRef<HTMLDivElement>(null);
  const productDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (cityWrapperRef.current && !cityWrapperRef.current.contains(event.target as Node)) {
        setIsCitySuggestionsOpen(false);
      }
      if (productDropdownRef.current && !productDropdownRef.current.contains(event.target as Node)) {
        setIsProductDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectCity = (city: string) => {
    setFormData((prev) => ({ ...prev, city }));
    setIsCitySuggestionsOpen(false);
    if (errors.city) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next.city;
        return next;
      });
    }
  };

  const filteredCities = formData.city.trim()
    ? ALL_INDIA_CITIES.filter((c) =>
        c.toLowerCase().includes(formData.city.toLowerCase())
      ).slice(0, 8)
    : ALL_INDIA_CITIES.slice(0, 8);

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
    if (formData.consultationMode === "Personal Store Visit" && !formData.storeLocation) {
      errs.storeLocation = "Please select a store / experience centre location";
    }
    if (!formData.city) errs.city = "City is required";
    if (!formData.userRole) errs.userRole = "Please select your role";
    if (formData.interestedIn.length === 0) {
      errs.interestedIn = "Select at least one product category";
    }
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
    <section id="consultation" className="relative py-20 sm:py-28 bg-maroon-deep text-ivory overflow-hidden border-t border-b border-gold/30">
      {/* Luxury Animated Hexagon Background in Dark Theme */}
      <HexagonBackground
        theme="dark"
        intensity="subtle"
        showPattern={true}
        showFloating={true}
      />

      {/* Ambient Luxury Lighting Glows */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gold/10 rounded-full blur-[160px]" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-[#6B2236]/50 rounded-full blur-[160px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Column: Brand Magenta Studio Card (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full min-h-[420px] bg-[#24060E]/90 p-8 sm:p-10 border border-gold/40 shadow-2xl text-ivory rounded-2xl sm:rounded-3xl backdrop-blur-md">
            <div>
              <div className="inline-flex items-center gap-2 mb-3.5 px-3.5 py-1 rounded-full bg-white/10 border border-gold/40">
                <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                <span className="font-montserrat text-[10px] uppercase tracking-[0.22em] text-gold font-semibold">
                  Private Consultation
                </span>
              </div>
              <h3 className="font-marcellus text-2xl sm:text-3xl text-ivory leading-snug">
                Private viewings by appointment in Mumbai, Silvassa and Kishangarh.
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
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[10px] font-raleway uppercase tracking-[0.15em] text-gold bg-maroon-deep/90 backdrop-blur-md px-3 py-1.5 border border-gold/30 pointer-events-none shadow-sm rounded-lg">
                <span className="font-semibold">Private Viewing Lounge</span>
                <span>Mumbai · Silvassa · Kishangarh</span>
              </div>
            </div>

            <p className="font-jost text-xs text-ivory/70 leading-relaxed border-t border-gold/20 pt-4">
              Dedicated architectural stone consultation for private residences, luxury estates, and commercial landmarks.
            </p>
          </div>

          {/* Right Column: Brand Magenta Private Appointment Form Container (7 cols) */}
          <div className="lg:col-span-7 bg-[#24060E]/95 p-8 sm:p-12 border border-gold/40 shadow-2xl relative rounded-2xl sm:rounded-3xl text-ivory backdrop-blur-md">
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

                  <h3 className="font-marcellus text-2xl sm:text-3xl text-ivory mt-6">
                    Consultation Request Confirmed
                  </h3>
                  <p className="font-jost text-sm text-ivory/80 mt-2 max-w-md">
                    Thank you. Our senior technical stone curator will review your floor plans and reach out within 2 business hours.
                  </p>

                  <a
                    href={submittedWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-8 inline-flex items-center gap-2 bg-gradient-to-r from-gold via-[#E8C84A] to-gold hover:from-[#E8C84A] hover:to-gold text-maroon-deep px-8 py-4 font-montserrat text-xs uppercase tracking-[0.2em] font-bold rounded-xl shadow-xl transition-transform hover:scale-105"
                  >
                    <MessageSquare className="w-4 h-4 text-maroon-deep fill-current" />
                    <span>Continue on WhatsApp with Details</span>
                  </a>

                  <button
                    onClick={() => setSubmittedWhatsAppUrl(null)}
                    className="mt-6 text-xs font-montserrat text-gold hover:text-ivory underline uppercase tracking-wider"
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
                    <span className="font-montserrat font-semibold text-[10px] uppercase tracking-[0.25em] text-gold block">
                      Private Appointment
                    </span>
                    <h3 className="font-marcellus text-2xl sm:text-3xl text-ivory mt-1">
                      Book a Private Consultation
                    </h3>
                  </div>

                  {/* Top Consultation Mode Toggle Buttons */}
                  <div className="grid grid-cols-2 gap-3">
                    {(["Personal Store Visit", "Request Call Back"] as const).map((mode) => {
                      const active = formData.consultationMode === mode;
                      return (
                        <button
                          key={mode}
                          type="button"
                          onClick={() =>
                            setFormData((prev) => ({
                              ...prev,
                              consultationMode: mode,
                              ...(mode === "Request Call Back" ? { storeLocation: "" } : {}),
                            }))
                          }
                          className={`py-3 px-4 rounded-xl text-xs sm:text-[13px] font-montserrat uppercase tracking-wider font-bold border transition-all duration-200 cursor-pointer active:scale-98 flex items-center justify-center gap-2 ${
                            active
                              ? "bg-gold text-maroon-deep border-gold shadow-[0_4px_18px_rgba(221,182,43,0.35)]"
                              : "bg-white/[0.04] text-ivory/85 border-gold/35 hover:border-gold hover:text-gold"
                          }`}
                        >
                          {mode === "Personal Store Visit" ? (
                            <Building2 className="w-4 h-4 shrink-0" />
                          ) : (
                            <MessageSquare className="w-4 h-4 shrink-0" />
                          )}
                          <span>{mode}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Conditional Store / Experience Centre Location (Only when Personal Store Visit is selected) */}
                  <AnimatePresence initial={false}>
                    {formData.consultationMode === "Personal Store Visit" && (
                      <motion.div
                        key="store-location-box"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-1">
                          <label className="block text-[11px] font-montserrat uppercase tracking-wider text-gold/90 font-semibold mb-1.5">
                            Location (Stock Yard / Experience Centre) *
                          </label>
                          <div className="relative">
                            <select
                              value={formData.storeLocation}
                              onChange={(e) => {
                                const loc = e.target.value;
                                const inferredCity = loc.startsWith("Mumbai")
                                  ? "Mumbai"
                                  : loc.startsWith("Silvassa")
                                  ? "Silvassa"
                                  : loc.startsWith("Kishangarh")
                                  ? "Kishangarh"
                                  : "";
                                setFormData((prev) => ({
                                  ...prev,
                                  storeLocation: loc,
                                  city: prev.city || inferredCity,
                                }));
                                if (errors.storeLocation) {
                                  setErrors((prev) => {
                                    const next = { ...prev };
                                    delete next.storeLocation;
                                    return next;
                                  });
                                }
                              }}
                              className="w-full bg-[#1A030A] border border-gold/45 hover:border-gold py-2.5 px-3 pr-9 text-xs sm:text-sm font-montserrat text-ivory focus:outline-none focus:border-gold transition-colors cursor-pointer appearance-none rounded-lg"
                            >
                              <option value="" className="bg-[#1A030A] text-ivory">
                                Select Store / Experience Centre...
                              </option>
                              {STORE_LOCATIONS.map((loc) => (
                                <option key={loc} value={loc} className="bg-[#1A030A] text-ivory">
                                  {loc}
                                </option>
                              ))}
                            </select>
                            <ChevronDown className="w-4 h-4 text-gold absolute right-3 top-3 pointer-events-none" />
                          </div>
                          {errors.storeLocation && (
                            <span className="text-[10px] text-red-400 mt-1 block">
                              {errors.storeLocation}
                            </span>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {errors.general && (
                    <div className="p-3 bg-red-950/80 border border-red-500/50 text-red-200 text-xs font-poppins rounded-lg">
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
                      <label className="block text-[11px] font-montserrat uppercase tracking-wider text-gold/90 font-semibold mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="e.g. Rahul Mehta"
                        className="w-full bg-white/[0.05] border-b border-gold/40 py-2.5 px-3 text-sm text-ivory placeholder:text-ivory/30 focus:outline-none focus:border-gold focus:bg-white/[0.08] transition-colors rounded-t-sm"
                      />
                      {errors.fullName && (
                        <span className="text-[10px] text-red-400 mt-1 block">{errors.fullName}</span>
                      )}
                    </div>

                    <div className="relative">
                      <label className="block text-[11px] font-montserrat uppercase tracking-wider text-gold/90 font-semibold mb-1">
                        Phone (+91) *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98200 XXXXX"
                        className="w-full bg-white/[0.05] border-b border-gold/40 py-2.5 px-3 text-sm text-ivory placeholder:text-ivory/30 focus:outline-none focus:border-gold focus:bg-white/[0.08] transition-colors rounded-t-sm"
                      />
                      {errors.phone && (
                        <span className="text-[10px] text-red-400 mt-1 block">{errors.phone}</span>
                      )}
                    </div>
                  </div>

                  {/* Row 2: Email & City (With All India Autocomplete) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="relative">
                      <label className="block text-[11px] font-montserrat uppercase tracking-wider text-gold/90 font-semibold mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="rahul@example.com"
                        className="w-full bg-white/[0.05] border-b border-gold/40 py-2.5 px-3 text-sm text-ivory placeholder:text-ivory/30 focus:outline-none focus:border-gold focus:bg-white/[0.08] transition-colors rounded-t-sm"
                      />
                      {errors.email && (
                        <span className="text-[10px] text-red-400 mt-1 block">{errors.email}</span>
                      )}
                    </div>

                    {/* City Autocomplete Field */}
                    <div className="relative" ref={cityWrapperRef}>
                      <label className="block text-[11px] font-montserrat uppercase tracking-wider text-gold/90 font-semibold mb-1 flex items-center justify-between">
                        <span>City / Location *</span>
                        <span className="text-[10px] text-ivory/40 font-normal lowercase">(all india)</span>
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          required
                          autoComplete="off"
                          value={formData.city}
                          onChange={(e) => {
                            setFormData((prev) => ({ ...prev, city: e.target.value }));
                            setIsCitySuggestionsOpen(true);
                          }}
                          onFocus={() => setIsCitySuggestionsOpen(true)}
                          placeholder="Type city (e.g. Mumbai, Delhi, Surat...)"
                          className="w-full bg-white/[0.05] border-b border-gold/40 py-2.5 px-3 pr-8 text-sm text-ivory placeholder:text-ivory/30 focus:outline-none focus:border-gold focus:bg-white/[0.08] transition-colors rounded-t-sm"
                        />
                        <MapPin className="w-4 h-4 text-gold/70 absolute right-2.5 top-3 pointer-events-none" />
                      </div>

                      {/* Autocomplete Suggestions Dropdown */}
                      <AnimatePresence>
                        {isCitySuggestionsOpen && filteredCities.length > 0 && (
                          <motion.div
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -4 }}
                            transition={{ duration: 0.15 }}
                            className="absolute left-0 right-0 top-full mt-1 bg-[#1F050C] border border-gold/40 shadow-2xl rounded-xl z-50 max-h-56 overflow-y-auto divide-y divide-gold/10 backdrop-blur-lg"
                          >
                            {filteredCities.map((city) => (
                              <button
                                key={city}
                                type="button"
                                onMouseDown={(e) => {
                                  e.preventDefault();
                                  selectCity(city);
                                }}
                                className="w-full text-left px-3.5 py-2.5 text-xs font-montserrat text-ivory/90 hover:text-gold hover:bg-white/[0.07] flex items-center justify-between transition-colors cursor-pointer group"
                              >
                                <div className="flex items-center gap-2">
                                  <MapPin className="w-3.5 h-3.5 text-gold/60 group-hover:text-gold flex-shrink-0" />
                                  <span className="font-medium">{city}</span>
                                </div>
                                {["Mumbai", "Silvassa", "Kishangarh"].includes(city) && (
                                  <span className="text-[9px] font-mono uppercase tracking-wider text-gold bg-gold/15 px-1.5 py-0.5 rounded border border-gold/30">
                                    Studio Hub
                                  </span>
                                )}
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {errors.city && (
                        <span className="text-[10px] text-red-400 mt-1 block">{errors.city}</span>
                      )}
                    </div>
                  </div>

                  {/* How you are ? & Approx. Area */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
                    {/* How you are ? (Dropdown) */}
                    <div className="relative">
                      <label className="block text-[11px] font-montserrat uppercase tracking-wider text-gold/90 font-semibold mb-1.5">
                        How You Are ? *
                      </label>
                      <div className="relative">
                        <select
                          value={formData.userRole}
                          onChange={(e) => {
                            setFormData({ ...formData, userRole: e.target.value });
                            if (errors.userRole) {
                              setErrors((prev) => {
                                const next = { ...prev };
                                delete next.userRole;
                                return next;
                              });
                            }
                          }}
                          className="w-full bg-[#1A030A] border border-gold/40 hover:border-gold py-2.5 px-3 pr-8 text-xs sm:text-sm font-montserrat text-ivory focus:outline-none focus:border-gold transition-colors cursor-pointer appearance-none rounded-lg"
                        >
                          <option value="" className="bg-[#1A030A] text-ivory">
                            Select Your Role...
                          </option>
                          {USER_ROLES.map((role) => (
                            <option key={role} value={role} className="bg-[#1A030A] text-ivory">
                              {role}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="w-4 h-4 text-gold absolute right-2.5 top-3 pointer-events-none" />
                      </div>
                      {errors.userRole && (
                        <span className="text-[10px] text-red-400 mt-1 block">{errors.userRole}</span>
                      )}
                    </div>

                    {/* Approx. Area (Dropdown) */}
                    <div className="relative">
                      <label className="block text-[11px] font-montserrat uppercase tracking-wider text-gold/90 font-semibold mb-1.5">
                        Area (Sq Ft) *
                      </label>
                      <div className="relative">
                        <select
                          value={formData.approxArea}
                          onChange={(e) => setFormData({ ...formData, approxArea: e.target.value })}
                          className="w-full bg-[#1A030A] border border-gold/40 hover:border-gold py-2.5 px-3 pr-8 text-xs sm:text-sm font-montserrat text-ivory focus:outline-none focus:border-gold transition-colors cursor-pointer appearance-none rounded-lg"
                        >
                          <option value="" className="bg-[#1A030A] text-ivory">Select Approx Area...</option>
                          {APPROX_AREA_OPTIONS.map((area) => (
                            <option key={area} value={area} className="bg-[#1A030A] text-ivory">
                              {area} sq ft
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="w-4 h-4 text-gold absolute right-2.5 top-3 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  {/* Project Type (3 Full-Width Toggle Buttons: RESIDENTIAL, COMMERCIAL, HOSPITALITY) */}
                  <div>
                    <label className="block text-[11px] font-montserrat uppercase tracking-wider text-gold/90 font-semibold mb-1.5">
                      Project Type
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {PROJECT_TYPES.map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setFormData({ ...formData, projectType: type })}
                          className={`py-2.5 px-3 text-xs font-montserrat uppercase tracking-wider text-center border rounded-lg transition-all active:scale-95 cursor-pointer ${
                            formData.projectType === type
                              ? "bg-gold text-maroon-deep border-gold font-bold shadow-sm"
                              : "border-gold/30 text-ivory/80 hover:border-gold hover:text-gold font-medium bg-white/[0.04]"
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Product Category (Multi-Select Dropdown) & Architectural Service */}
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Multi-Select Product Category Dropdown */}
                      <div className="relative" ref={productDropdownRef}>
                        <label className="flex items-center gap-1.5 text-[11px] font-montserrat uppercase tracking-wider text-gold/90 font-semibold mb-1.5">
                          <Layers className="w-3.5 h-3.5 text-gold" />
                          <span>Product Category *</span>
                        </label>
                        <button
                          type="button"
                          onClick={() => setIsProductDropdownOpen((prev) => !prev)}
                          className="w-full bg-[#1A030A] border border-gold/45 hover:border-gold py-2.5 px-3 text-xs font-montserrat text-ivory flex items-center justify-between rounded-lg transition-colors cursor-pointer"
                        >
                          <span className="truncate">
                            {formData.interestedIn.filter((i) => PRODUCT_INTEREST_OPTIONS.includes(i)).length === 0
                              ? "Select Product Categories (Multi-Select)..."
                              : `${formData.interestedIn.filter((i) => PRODUCT_INTEREST_OPTIONS.includes(i)).length} Category Selected`}
                          </span>
                          <ChevronDown
                            className={`w-4 h-4 text-gold shrink-0 transition-transform duration-200 ${
                              isProductDropdownOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>

                        <AnimatePresence>
                          {isProductDropdownOpen && (
                            <motion.div
                              initial={{ opacity: 0, y: -4 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -4 }}
                              transition={{ duration: 0.15 }}
                              className="absolute left-0 right-0 top-full mt-1.5 bg-[#1F050C] border border-gold/50 shadow-2xl rounded-xl z-50 p-2 space-y-1 backdrop-blur-lg"
                            >
                              {PRODUCT_INTEREST_OPTIONS.map((prod) => {
                                const checked = formData.interestedIn.includes(prod);
                                return (
                                  <button
                                    key={prod}
                                    type="button"
                                    onClick={() => {
                                      toggleInterest(prod);
                                      if (errors.interestedIn) {
                                        setErrors((prev) => {
                                          const next = { ...prev };
                                          delete next.interestedIn;
                                          return next;
                                        });
                                      }
                                    }}
                                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-montserrat text-left transition-colors cursor-pointer ${
                                      checked
                                        ? "bg-gold/15 text-gold font-semibold"
                                        : "text-ivory/90 hover:bg-white/[0.06] hover:text-gold"
                                    }`}
                                  >
                                    <span
                                      className={`w-4 h-4 rounded flex items-center justify-center border shrink-0 transition-colors ${
                                        checked
                                          ? "bg-gold border-gold text-maroon-deep"
                                          : "border-gold/45 bg-transparent"
                                      }`}
                                    >
                                      {checked && <Check className="w-3 h-3 stroke-[3]" />}
                                    </span>
                                    <span>{prod}</span>
                                  </button>
                                );
                              })}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Services Dropdown (Optional) */}
                      <div className="relative">
                        <label className="flex items-center gap-1.5 text-[11px] font-montserrat uppercase tracking-wider text-gold/90 font-semibold mb-1.5">
                          <Wrench className="w-3.5 h-3.5 text-gold" />
                          <span>Architectural Service</span>
                          <span className="text-[10px] text-ivory/40 font-normal lowercase">(optional)</span>
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
                            className="w-full bg-[#1A030A] border border-gold/40 hover:border-gold py-2.5 px-3 text-xs font-montserrat text-ivory focus:outline-none focus:border-gold transition-colors cursor-pointer appearance-none pr-8 rounded-lg shadow-xs"
                          >
                            <option value="" className="bg-[#1A030A] text-ivory">Choose from All Services...</option>
                            {SERVICE_INTEREST_OPTIONS.map((serv) => (
                              <option key={serv} value={serv} className="bg-[#1A030A] text-ivory">
                                {formData.interestedIn.includes(serv) ? `✓ ${serv}` : serv}
                              </option>
                            ))}
                          </select>
                          <ChevronDown className="w-4 h-4 text-gold absolute right-2.5 top-3 pointer-events-none" />
                        </div>
                      </div>
                    </div>

                    {/* Selected Tags Display with Remove Badge */}
                    {formData.interestedIn.length > 0 && (
                      <div className="pt-1">
                        <span className="text-[10px] font-montserrat uppercase tracking-wider text-ivory/60 font-medium block mb-1.5">
                          Selected Choices ({formData.interestedIn.length}):
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {formData.interestedIn.map((item) => (
                            <span
                              key={item}
                              className="inline-flex items-center gap-1.5 pl-2.5 pr-1.5 py-1 text-[11px] font-montserrat bg-gold/15 text-gold border border-gold/50 rounded-md shadow-xs"
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
                      <span className="text-[10px] text-red-400 mt-1 block">{errors.interestedIn}</span>
                    )}
                  </div>

                  {/* Row 4: Preferred Date & Preferred Time Slots */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="relative">
                      <label className="block text-[11px] font-montserrat uppercase tracking-wider text-gold/90 font-semibold mb-1 flex items-center justify-between">
                        <span>Preferred Date</span>
                        <span className="text-[10px] text-ivory/40 font-normal lowercase">(optional)</span>
                      </label>
                      <input
                        type="date"
                        min={new Date().toISOString().split("T")[0]}
                        value={formData.preferredDate}
                        onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                        className="w-full bg-white/[0.05] border-b border-gold/40 py-2.5 px-3 text-sm text-ivory placeholder:text-ivory/30 focus:outline-none focus:border-gold focus:bg-white/[0.08] transition-colors cursor-pointer rounded-t-sm"
                      />
                    </div>

                    <div className="relative">
                      <label className="block text-[11px] font-montserrat uppercase tracking-wider text-gold/90 font-semibold mb-1 flex items-center justify-between">
                        <span>Preferred Time Slot</span>
                        <span className="text-[10px] text-ivory/40 font-normal lowercase">(optional)</span>
                      </label>
                      <div className="relative">
                        <select
                          value={formData.preferredTime}
                          onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                          className="w-full bg-[#1A030A] border-b border-gold/40 py-2.5 px-3 text-sm text-ivory focus:outline-none focus:border-gold transition-colors cursor-pointer appearance-none pr-8 rounded-t-sm"
                        >
                          <option value="" className="bg-[#1A030A] text-ivory">Select Time Slot...</option>
                          {TIME_SLOTS.map((slot) => (
                            <option key={slot} value={slot} className="bg-[#1A030A] text-ivory">
                              {slot}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="w-4 h-4 text-gold absolute right-2.5 top-3.5 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="relative">
                    <label className="block text-[11px] font-montserrat uppercase tracking-wider text-gold/90 font-semibold mb-1">
                      Project Notes or Specific Stones Needed
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="e.g. Looking for continuous bookmatched Statuario for living room flooring..."
                      className="w-full bg-white/[0.05] border-b border-gold/40 py-2.5 px-3 text-sm text-ivory placeholder:text-ivory/30 focus:outline-none focus:border-gold focus:bg-white/[0.08] transition-colors resize-none rounded-t-sm"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-gold via-[#E8C84A] to-gold hover:from-[#E8C84A] hover:to-gold text-maroon-deep py-4 font-montserrat text-xs uppercase tracking-[0.2em] font-bold rounded-xl shadow-xl flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] border border-gold/80 disabled:opacity-50 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span>Reserving Consultation...</span>
                    ) : (
                      <>
                        <span>Submit Request</span>
                        <ArrowRight className="w-4 h-4 text-maroon-deep stroke-[2.5]" />
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
