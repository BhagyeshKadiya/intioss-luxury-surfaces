"use client";

import React, { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.95,
    });

    lenisRef.current = lenis;

    if (typeof window !== "undefined") {
      (window as any).__lenis = lenis;
    }

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      if (typeof window !== "undefined") {
        delete (window as any).__lenis;
      }
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // When navigating to any page, ensure scroll always resets to the top unless an anchor hash is present
  useEffect(() => {
    if (typeof window === "undefined") return;

    const scrollToTopOrHash = () => {
      const hash = window.location.hash;
      if (hash) {
        const targetElement = document.querySelector(hash);
        if (targetElement) {
          if (lenisRef.current) {
            lenisRef.current.scrollTo(targetElement as HTMLElement, { offset: -90 });
          } else {
            targetElement.scrollIntoView({ behavior: "smooth" });
          }
          return;
        }
      }

      // No hash: Reset scroll strictly to top (0, 0)
      if (lenisRef.current) {
        lenisRef.current.scrollTo(0, { immediate: true });
      }
      window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    // Immediate reset
    scrollToTopOrHash();

    // Re-verify shortly after DOM hydration to prevent any scroll jump
    const timer = setTimeout(scrollToTopOrHash, 30);
    return () => clearTimeout(timer);
  }, [pathname]);

  return <>{children}</>;
}
