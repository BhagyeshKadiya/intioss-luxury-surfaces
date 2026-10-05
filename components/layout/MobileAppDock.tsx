"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "motion/react";
import { Home, Layers, Sparkles, Calendar, Menu } from "lucide-react";
import { IntiossHexagon } from "@/components/brand/IntiossHexagon";

interface MobileAppDockProps {
  onOpenMenu?: () => void;
}

export function MobileAppDock({ onOpenMenu }: MobileAppDockProps) {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  // Intent-based scroll awareness: hide on scroll down, reveal on scroll up
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = lastScrollY.current;
    const diff = latest - previous;

    if (latest > 120 && diff > 8) {
      setIsVisible(false); // fast scroll down -> hide to maximize reading view
    } else if (diff < -8 || latest <= 80) {
      setIsVisible(true); // scroll up -> reveal
    }

    lastScrollY.current = latest;
  });

  const navTabs = [
    {
      id: "home",
      label: "Home",
      href: "/",
      icon: Home,
      isActive: pathname === "/",
    },
    {
      id: "products",
      label: "Surfaces",
      href: "/products",
      icon: Layers,
      isActive: pathname.startsWith("/products"),
    },
    {
      id: "book-match",
      label: "Visualizer",
      href: "/book-match",
      icon: Sparkles,
      isActive: pathname === "/book-match",
    },
    {
      id: "consult",
      label: "Consult",
      href: "/contact",
      icon: Calendar,
      isActive: pathname === "/contact",
    },
  ];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          aria-label="Mobile Navigation Bar"
          className="fixed bottom-3 left-3 right-3 max-w-[390px] mx-auto z-[88] md:hidden select-none"
          style={{
            paddingBottom: "env(safe-area-inset-bottom, 0px)",
          }}
        >
          {/* Glassmorphic Luxury Dock Container */}
          <div className="relative flex items-center justify-between px-2.5 py-2 bg-maroon-deep/95 backdrop-blur-2xl border border-gold/40 rounded-full shadow-[0_12px_40px_rgba(0,0,0,0.65)] ring-1 ring-white/10">
            {/* Top Micro Gold Hairline Accent */}
            <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-gold/60 to-transparent" />

            {/* Nav Tabs */}
            {navTabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <Link
                  key={tab.id}
                  href={tab.href}
                  className="relative flex-1 flex flex-col items-center justify-center py-1 group focus-visible:outline-none"
                >
                  <motion.div
                    whileTap={{ scale: 0.84 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    className="relative flex flex-col items-center justify-center"
                  >
                    {/* Active Pill Glow */}
                    {tab.isActive && (
                      <motion.div
                        layoutId="mobileDockActivePill"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        className="absolute -inset-1.5 bg-white/10 rounded-full border border-gold/30 -z-10"
                      />
                    )}

                    {/* Icon or Brand Mark */}
                    {tab.id === "home" ? (
                      <div className="relative">
                        <IntiossHexagon
                          size={18}
                          fillMaroon={!tab.isActive}
                          strokeColor={tab.isActive ? "#DDB62B" : "#FAF7F2"}
                          className="transition-transform duration-200"
                        />
                      </div>
                    ) : (
                      <Icon
                        className={`w-4 h-4 transition-colors duration-200 ${
                          tab.isActive ? "text-gold stroke-[2.2]" : "text-ivory/70 stroke-[1.6]"
                        }`}
                      />
                    )}

                    {/* Label */}
                    <span
                      className={`text-[9px] font-montserrat uppercase tracking-wider mt-1 transition-colors duration-200 font-medium ${
                        tab.isActive ? "text-gold font-semibold" : "text-ivory/60"
                      }`}
                    >
                      {tab.label}
                    </span>

                    {/* Active dot */}
                    {tab.isActive && (
                      <motion.span
                        layoutId="mobileDockDot"
                        className="w-1 h-1 bg-gold rounded-full mt-0.5 shadow-[0_0_6px_#DDB62B]"
                      />
                    )}
                  </motion.div>
                </Link>
              );
            })}

            {/* Menu Trigger Tab */}
            <button
              type="button"
              onClick={onOpenMenu}
              aria-label="Open Navigation Menu"
              className="relative flex-1 flex flex-col items-center justify-center py-1 group focus-visible:outline-none"
            >
              <motion.div
                whileTap={{ scale: 0.84 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="relative flex flex-col items-center justify-center"
              >
                <div className="w-7 h-7 rounded-full bg-gold/15 border border-gold/40 flex items-center justify-center text-gold">
                  <Menu className="w-3.5 h-3.5 stroke-[2]" />
                </div>
                <span className="text-[9px] font-montserrat uppercase tracking-wider mt-0.5 text-gold font-medium">
                  Menu
                </span>
              </motion.div>
            </button>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
