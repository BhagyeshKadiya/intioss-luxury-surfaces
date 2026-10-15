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
  // - Top of page (home or inner): Products, Services, and 3-dot menu remain visible.
  // - Over homepage hero: background is transparent and left logo is hidden.
  // - Scrolling down: header hides for immersion.
  // - Back-scrolling (scrolling UP): full solid navbar slides into view.
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = lastScrollY.current;
    const diff = latest - previous;

    if (latest > 80) {
      setIsScrolled(true);
    } else {
      setIsScrolled(!isHome);
    }

    if (latest <= 80) {
      // Near the very top: always visible
      setIsVisible(true);
    } else if (diff > 3) {
      // Scrolling DOWN: hide
      setIsVisible(false);
    } else if (diff < -3) {
      // Scrolling UP (back-scrolling): appear!
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
            ? "bg-transparent text-ivory border-b border-transparent shadow-none"
            : "bg-ivory/95 text-maroon backdrop-blur-md shadow-sm border-b-2 border-maroon"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          {/* Left: Brand Logo (hidden over hero to prevent duplicate with hero center logo, visible on back-scroll/inner pages) */}
          <div className="flex items-center">
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

          {/* Right: Visible Links ("Products", "Services") + 3-Dot Menu */}
          <div className="flex items-center gap-4 sm:gap-10">
            <nav className="flex items-center gap-4 sm:gap-10">
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
