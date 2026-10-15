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

  // Sync scroll state on initial mount to prevent jerks when refreshing while scrolled down
  useEffect(() => {
    if (typeof window !== "undefined") {
      const currentScrollY = window.scrollY;
      lastScrollY.current = currentScrollY;
      
      if (currentScrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(!isHome);
      }
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

  // Scroll behavior: intent-based hide on scroll down, show on scroll up
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = lastScrollY.current;
    const diff = latest - previous;

    if (latest > 80) {
      setIsScrolled(true);
    } else {
      setIsScrolled(!isHome); // On non-home pages, keep solid ivory
    }

    if (latest > 100 && diff > 0) {
      // Scrolling down
      setIsVisible(false);
    } else if (diff < 0 || latest <= 100) {
      // Scrolling up or near top
      setIsVisible(true);
    }

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
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
          isOverHero
            ? "bg-black/20 text-ivory backdrop-blur-sm border-b-2 border-maroon"
            : "bg-ivory/95 text-maroon backdrop-blur-md shadow-sm border-b-2 border-maroon"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          {/* Left: Brand Logo + White Tagline */}
          <div className="flex items-center">
            <motion.div
              initial={false}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-3 sm:gap-4 pointer-events-auto"
            >
              {/* Logo in Magenta Border Box */}
              <div className="flex items-center px-2 sm:px-2.5 py-1 rounded-sm border-2 border-maroon bg-white/90 shadow-sm">
                <IntiossLogo
                  theme="light"
                  size="sm"
                  showSubtitle={false}
                />
              </div>

              {/* White Tagline beside Logo */}
              <div
                className={`hidden sm:flex items-center pl-3 sm:pl-4 border-l transition-colors ${
                  isOverHero ? "border-white/30" : "border-maroon/30"
                }`}
              >
                <span
                  className={`font-raleway text-[9px] md:text-[10px] lg:text-[11px] uppercase tracking-[0.18em] lg:tracking-[0.24em] font-medium leading-snug whitespace-nowrap text-white ${
                    isOverHero
                      ? "drop-shadow-[0_1px_6px_rgba(0,0,0,0.95)]"
                      : "bg-maroon px-2.5 py-0.5 rounded-sm border border-gold/40 shadow-sm"
                  }`}
                >
                  Breathtaking stones for the discerning few.
                </span>
              </div>
            </motion.div>
          </div>

          {/* Right: Visible Links ("Products", "Services") + 3-line hamburger */}
          <div className="flex items-center gap-4 sm:gap-10">
            <nav className="flex items-center gap-4 sm:gap-10">
              <Link
                href="/products"
                className={`font-montserrat text-xs sm:text-sm uppercase tracking-[0.18em] font-medium nav-link-gold ${
                  isOverHero ? "text-ivory" : "text-maroon"
                }`}
              >
                Products
              </Link>
              <Link
                href="/services"
                className={`font-montserrat text-xs sm:text-sm uppercase tracking-[0.18em] font-medium nav-link-gold ${
                  isOverHero ? "text-ivory" : "text-maroon"
                }`}
              >
                Services
              </Link>
            </nav>

            {/* Three-line Hamburger Trigger */}
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
                    ? "text-ivory hover:text-gold"
                    : "text-maroon hover:text-gold"
                }`}
              >
                <Menu className="w-6 h-6 stroke-[1.6]" />
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
