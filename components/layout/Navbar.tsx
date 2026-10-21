"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { Menu } from "lucide-react";
import { IntiossLogo } from "@/components/brand/IntiossLogo";

import { HoverMenu } from "./HoverMenu";
import { MobileAppDock } from "./MobileAppDock";

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(!isHome);
  const [isVisible, setIsVisible] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const lastScrollY = useRef(0);
  const leaveTimeout = useRef<NodeJS.Timeout | null>(null);

  // Close menu on pathname change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Sync scroll state on initial mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const currentScrollY = window.scrollY;
      lastScrollY.current = currentScrollY;
      
      if (currentScrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(!isHome);
      }
      setIsVisible(true);
    }
  }, [isHome]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Scroll behavior:
  // - Entire scroll ke dauran menu, products & services hamesha rehna chahiye (never hide on scroll down).
  // - Top of homepage: transparent background, logo hidden over hero.
  // - Scrolled down (> 80px): luxury solid ivory navbar with magenta border & logo.
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 80) {
      setIsScrolled(true);
    } else {
      setIsScrolled(!isHome);
    }

    // Keep visible throughout entire scroll
    setIsVisible(true);

    lastScrollY.current = latest;
  });

  // Hover triggers for menu with 200ms grace period on mouse leave
  const handleTriggerMouseEnter = () => {
    if (leaveTimeout.current) clearTimeout(leaveTimeout.current);
    setIsMenuOpen(true);
  };

  const handleTriggerMouseLeave = () => {
    leaveTimeout.current = setTimeout(() => {
      setIsMenuOpen(false);
    }, 200);
  };

  const handleMenuMouseEnter = () => {
    if (leaveTimeout.current) clearTimeout(leaveTimeout.current);
  };

  const handleMenuMouseLeave = () => {
    leaveTimeout.current = setTimeout(() => {
      setIsMenuOpen(false);
    }, 200);
  };

  // Determine styling based on scroll state & current page
  const isOverHero = isHome && !isScrolled;

  return (
    <>
      <motion.header
        initial={{ y: 0 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
          isOverHero
            ? "bg-transparent text-ivory border-b border-transparent shadow-none"
            : "bg-ivory/95 text-maroon backdrop-blur-md shadow-sm border-b-2 border-maroon"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
          {/* Left: Brand Logo (proper min width so it never distorts or squashes) */}
          <div className="flex items-center min-w-[130px] sm:min-w-[180px] shrink-0">
            <motion.div
              initial={false}
              animate={{ opacity: isOverHero ? 0 : 1 }}
              transition={{ duration: 0.3 }}
              className={`flex items-center ${
                isOverHero ? "pointer-events-none" : "pointer-events-auto"
              }`}
            >
              <IntiossLogo
                theme="light"
                size="sm"
                showSubtitle={false}
              />
            </motion.div>
          </div>

          {/* Right: Visible Links ("Products", "Services", "About", "Gallery") + Menu Trigger */}
          <div className="flex items-center gap-3 sm:gap-8">
            <nav className="flex items-center gap-3 sm:gap-7">
              <Link
                href="/products"
                className={`font-montserrat text-xs sm:text-sm uppercase tracking-[0.18em] font-medium nav-link-gold ${
                  isOverHero
                    ? "text-ivory drop-shadow-[0_1px_4px_rgba(0,0,0,0.85)] hover:text-gold"
                    : "text-maroon hover:text-gold"
                }`}
              >
                Products
              </Link>
              <Link
                href="/services"
                className={`font-montserrat text-xs sm:text-sm uppercase tracking-[0.18em] font-medium nav-link-gold ${
                  isOverHero
                    ? "text-ivory drop-shadow-[0_1px_4px_rgba(0,0,0,0.85)] hover:text-gold"
                    : "text-maroon hover:text-gold"
                }`}
              >
                Services
              </Link>
              <Link
                href="/about"
                className={`hidden md:inline-block font-montserrat text-xs sm:text-sm uppercase tracking-[0.18em] font-medium nav-link-gold ${
                  isOverHero
                    ? "text-ivory drop-shadow-[0_1px_4px_rgba(0,0,0,0.85)] hover:text-gold"
                    : "text-maroon hover:text-gold"
                }`}
              >
                About
              </Link>
              <Link
                href="/gallery"
                className={`hidden md:inline-block font-montserrat text-xs sm:text-sm uppercase tracking-[0.18em] font-medium nav-link-gold ${
                  isOverHero
                    ? "text-ivory drop-shadow-[0_1px_4px_rgba(0,0,0,0.85)] hover:text-gold"
                    : "text-maroon hover:text-gold"
                }`}
              >
                Gallery
              </Link>
            </nav>

            {/* Three-Line Mobile App Style Menu Trigger */}
            <div
              className="relative"
              onMouseEnter={handleTriggerMouseEnter}
              onMouseLeave={handleTriggerMouseLeave}
            >
              <button
                type="button"
                onClick={() => setIsMenuOpen((prev) => !prev)}
                aria-label="Toggle navigation menu"
                aria-expanded={isMenuOpen}
                className={`p-2 transition-colors flex items-center justify-center rounded-sm active:scale-90 ${
                  isOverHero
                    ? "text-ivory hover:text-gold drop-shadow-[0_1px_4px_rgba(0,0,0,0.85)]"
                    : "text-maroon hover:text-gold"
                }`}
              >
                <Menu className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2]" />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile App Bottom Navigation Dock */}
      <MobileAppDock onOpenMenu={() => setIsMenuOpen(true)} />

      {/* Hover Expand Menu Drawer */}
      <HoverMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onMouseEnter={handleMenuMouseEnter}
        onMouseLeave={handleMenuMouseLeave}
      />
    </>
  );
}
