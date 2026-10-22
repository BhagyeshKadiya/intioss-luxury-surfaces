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

  // Multi-source bulletproof scroll detection (Native + Lenis + RAF)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const checkScroll = (y?: number) => {
      const scrollY =
        typeof y === "number"
          ? y
          : window.scrollY || document.documentElement.scrollTop || 0;
      if (scrollY > 60) {
        setIsScrolled(true);
      } else {
        setIsScrolled(!isHome);
      }
      setIsVisible(true);
      lastScrollY.current = scrollY;
    };

    // Initial check
    checkScroll();

    // 1. Native scroll listeners
    const onScroll = () => checkScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("scroll", onScroll, { passive: true });

    // 2. Lenis hook
    let lenisHooked = false;
    const tryHookLenis = () => {
      const lenis = (window as any).__lenis;
      if (lenis && typeof lenis.on === "function" && !lenisHooked) {
        lenisHooked = true;
        lenis.on("scroll", (e: any) => {
          checkScroll(typeof e?.scroll === "number" ? e.scroll : window.scrollY);
        });
        return true;
      }
      return false;
    };

    if (!tryHookLenis()) {
      const pollInterval = setInterval(() => {
        if (tryHookLenis()) {
          clearInterval(pollInterval);
        }
      }, 100);
      setTimeout(() => clearInterval(pollInterval), 3000);
    }

    // 3. RAF continuous frame check (ensures immediate response on touch fling / smooth scrolling)
    let rafId: number;
    let lastCheckedY = -1;
    const frameLoop = () => {
      const currentY = window.scrollY || document.documentElement.scrollTop || 0;
      if (Math.abs(currentY - lastCheckedY) >= 2) {
        lastCheckedY = currentY;
        checkScroll(currentY);
      }
      rafId = requestAnimationFrame(frameLoop);
    };
    rafId = requestAnimationFrame(frameLoop);

    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, [isHome]);

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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isOverHero
            ? "bg-transparent text-ivory border-b border-transparent shadow-none"
            : "bg-[#FAF7F2] text-maroon shadow-[0_4px_20px_-2px_rgba(48,12,22,0.08)] border-b border-gold/40"
        }`}
        style={
          isOverHero
            ? undefined
            : {
                backgroundColor: "#FAF7F2",
                borderBottomColor: "rgba(221, 182, 43, 0.35)",
              }
        }
      >
        <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-4">
          {/* Left: Brand Logo (never squashed or overlapping) */}
          <div className="flex items-center min-w-[96px] sm:min-w-[140px] shrink-0">
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

          {/* Right: Responsive Navigation Links + Menu Trigger */}
          <div className="flex items-center gap-2 sm:gap-6 lg:gap-8">
            <nav className="flex items-center gap-2 sm:gap-5 lg:gap-7">
              <Link
                href="/products"
                className={`inline-block font-montserrat text-xs sm:text-sm uppercase tracking-[0.14em] sm:tracking-[0.18em] font-medium nav-link-gold ${
                  isOverHero
                    ? "text-ivory drop-shadow-[0_1px_4px_rgba(0,0,0,0.85)] hover:text-gold"
                    : "text-maroon hover:text-gold"
                }`}
              >
                Products
              </Link>
              <Link
                href="/services"
                className={`hidden sm:inline-block font-montserrat text-xs sm:text-sm uppercase tracking-[0.14em] sm:tracking-[0.18em] font-medium nav-link-gold ${
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
              className="relative shrink-0"
              onMouseEnter={handleTriggerMouseEnter}
              onMouseLeave={handleTriggerMouseLeave}
            >
              <button
                type="button"
                onClick={() => setIsMenuOpen((prev) => !prev)}
                aria-label="Toggle navigation menu"
                aria-expanded={isMenuOpen}
                className={`p-1.5 sm:p-2 transition-colors flex items-center justify-center rounded-sm active:scale-90 ${
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
