"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { Menu } from "lucide-react";
import { IntiossLogo } from "@/components/brand/IntiossLogo";

import { HoverMenu } from "./HoverMenu";

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
            ? "bg-transparent text-ivory"
            : "bg-ivory/95 text-maroon backdrop-blur-md shadow-sm border-b border-gold/30"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Left: Brand Logo / Icon */}
          <div className="flex items-center">
            <motion.div
              initial={false}
              animate={{ opacity: (isHome && !isScrolled) ? 0 : 1 }}
              transition={{ duration: 0.3 }}
              className="flex items-center pointer-events-auto"
            >
              <IntiossLogo
                theme={isOverHero ? "dark" : "light"}
                size="sm"
                showSubtitle={false}
              />
            </motion.div>
          </div>

          {/* Right: Only TWO Visible Links ("Products", "Services") + 3-line hamburger */}
          <div className="flex items-center gap-6 sm:gap-10">
            <nav className="flex items-center gap-6 sm:gap-10">
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
                className={`p-2 transition-colors flex items-center justify-center rounded-sm ${
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
