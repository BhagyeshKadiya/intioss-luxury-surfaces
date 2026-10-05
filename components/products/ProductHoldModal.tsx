"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import { X, MessageCircle, ShieldCheck } from "lucide-react";
import { SITE_CONFIG } from "@/lib/config";

interface ProductHoldModalProps {
  productName: string;
  productOrigin: string;
  applications: string[];
}

export function ProductHoldModal({ productName, productOrigin, applications }: ProductHoldModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({
    userType: "Architect",
    name: "",
    phone: "",
    email: "",
    city: "",
    application: applications[0] || "General",
    sqft: 100,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const message = `*Slab Hold Request: ${productName}*
Origin: ${productOrigin}

*Client Details:*
Profile: ${formData.userType}
Name: ${formData.name}
Phone: ${formData.phone}
Email: ${formData.email}
City: ${formData.city}

*Requirements:*
Application: ${formData.application}
Quantity: ${formData.sqft} Sq.Ft.

Please confirm availability and hold status.`;

    const encodedMessage = encodeURIComponent(message);
    const waUrl = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodedMessage}`;
    window.open(waUrl, "_blank", "noopener,noreferrer");
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={handleOpen}
        className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-black hover:bg-stone-800 text-gold px-6 py-3 font-montserrat text-xs uppercase tracking-[0.2em] font-semibold border border-gold/40 shadow transition-colors shrink-0 whitespace-nowrap"
      >
        <ShieldCheck className="w-4 h-4 shrink-0" />
        <span>Hold This Slab</span>
      </button>

      {mounted && createPortal(
        <AnimatePresence>
          {isOpen && (
            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={handleClose}
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              />

              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="relative w-full max-w-lg bg-ivory border border-gold/40 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
              >
                {/* Header */}
                <div className="bg-maroon-deep p-6 text-center relative border-b border-gold/30 flex-shrink-0">
                  <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 text-ivory/60 hover:text-gold transition-colors"
                    aria-label="Close modal"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  <span className="font-raleway text-[10px] uppercase tracking-[0.25em] text-gold/80 block mb-1">
                    Concierge Request
                  </span>
                  <h3 className="font-marcellus text-xl sm:text-2xl text-ivory">
                    Hold {productName}
                  </h3>
                </div>

                {/* Form Content */}
                <div className="p-6 overflow-y-auto flex-1 min-h-0">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block font-montserrat text-xs font-semibold text-maroon mb-1.5 uppercase tracking-wider">
                        I am a
                      </label>
                      <select
                        required
                        value={formData.userType}
                        onChange={(e) => setFormData({ ...formData, userType: e.target.value })}
                        className="w-full bg-white border border-gold/40 p-2.5 text-sm font-poppins text-maroon focus:outline-none focus:border-maroon"
                      >
                        <option value="Architect">Architect</option>
                        <option value="Interior Designer">Interior Designer</option>
                        <option value="Traders">Traders</option>
                        <option value="For our own home">For our own home</option>
                        <option value="Others">Others</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-montserrat text-xs font-semibold text-maroon mb-1.5 uppercase tracking-wider">
                          Full Name
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Enter your name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full bg-white border border-gold/40 p-2.5 text-sm font-poppins text-maroon placeholder:text-grey/50 focus:outline-none focus:border-maroon"
                        />
                      </div>
                      <div>
                        <label className="block font-montserrat text-xs font-semibold text-maroon mb-1.5 uppercase tracking-wider">
                          Contact Number
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="+91 00000 00000"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full bg-white border border-gold/40 p-2.5 text-sm font-poppins text-maroon placeholder:text-grey/50 focus:outline-none focus:border-maroon"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-montserrat text-xs font-semibold text-maroon mb-1.5 uppercase tracking-wider">
                          Email ID
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="your@email.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full bg-white border border-gold/40 p-2.5 text-sm font-poppins text-maroon placeholder:text-grey/50 focus:outline-none focus:border-maroon"
                        />
                      </div>
                      <div>
                        <label className="block font-montserrat text-xs font-semibold text-maroon mb-1.5 uppercase tracking-wider">
                          City
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Mumbai"
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          className="w-full bg-white border border-gold/40 p-2.5 text-sm font-poppins text-maroon placeholder:text-grey/50 focus:outline-none focus:border-maroon"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-montserrat text-xs font-semibold text-maroon mb-1.5 uppercase tracking-wider">
                        Application / Use Case
                      </label>
                      <select
                        required
                        value={formData.application}
                        onChange={(e) => setFormData({ ...formData, application: e.target.value })}
                        className="w-full bg-white border border-gold/40 p-2.5 text-sm font-poppins text-maroon focus:outline-none focus:border-maroon"
                      >
                        {applications.map((app, idx) => (
                          <option key={idx} value={app}>
                            {app}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block font-montserrat text-xs font-semibold text-maroon mb-1.5 uppercase tracking-wider">
                        How many Sq.Ft. to hold?
                      </label>
                      <input
                        type="number"
                        required
                        min={10}
                        max={10000}
                        placeholder="e.g. 500"
                        value={formData.sqft}
                        onChange={(e) => setFormData({ ...formData, sqft: parseInt(e.target.value) || 0 })}
                        className="w-full bg-white border border-gold/40 p-2.5 text-sm font-poppins text-maroon focus:outline-none focus:border-maroon"
                      />
                      <p className="mt-1.5 text-[10px] text-grey font-poppins">
                        Note: Subject to availability. Holds are typically valid for 48 hours.
                      </p>
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white px-6 py-4 font-montserrat text-xs uppercase tracking-[0.1em] font-semibold transition-colors shadow-md"
                      >
                        <MessageCircle className="w-5 h-5" />
                        <span>Submit & WhatsApp</span>
                      </button>
                    </div>
                  </form>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
