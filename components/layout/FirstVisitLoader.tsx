"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { IntiossHexagon } from "@/components/brand/IntiossHexagon";

export function FirstVisitLoader() {
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    // Check if user has already visited in this session
    const hasVisited = sessionStorage.getItem("intioss_visited");
    if (!hasVisited) {
      setShowLoader(true);
      const timer = setTimeout(() => {
        setShowLoader(false);
        sessionStorage.setItem("intioss_visited", "true");
      }, 1800);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <AnimatePresence>
      {showLoader && (
        <motion.div
          key="first-visit-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-black/20 backdrop-blur-md text-ivory select-none"
        >
          <div className="relative flex flex-col items-center">
            {/* Animated Hexagon */}
            <IntiossHexagon size={96} animated fillMaroon strokeColor="#DDB62B" strokeWidth={2.5} />

            {/* Brand Wordmark subtle fade */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="mt-6 flex flex-col items-center"
            >
              <span className="font-montserrat tracking-[0.25em] text-sm uppercase text-ivory/90">
                INTIOSS
              </span>
              <span className="font-raleway font-light text-[9px] tracking-[0.4em] uppercase text-gold/80 mt-1">
                Luxury Surfaces
              </span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
