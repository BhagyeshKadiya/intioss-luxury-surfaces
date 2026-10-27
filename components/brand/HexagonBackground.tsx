"use client";

import React, { useId, useRef, useEffect, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";
import { IntiossExactHexagon } from "./IntiossExactHexagon";

interface FloatingSymbolConfig {
  id: string;
  size: number;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  rotateDuration: number;
  floatDuration: number;
  floatOffset: number;
  rotateDirection: 1 | -1;
  baseOpacity: number;
  fillMaroon: boolean;
  parallaxStrength: number;
}

interface HexagonBackgroundProps {
  theme?: "light" | "dark" | "gold";
  intensity?: "subtle" | "medium" | "prominent";
  showPattern?: boolean;
  showFloating?: boolean;
  className?: string;
}

export function HexagonBackground({
  theme = "light",
  intensity = "subtle",
  showPattern = true,
  showFloating = true,
  className = "",
}: HexagonBackgroundProps) {
  const patternId = useId().replace(/:/g, "_");
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [isClient, setIsClient] = useState(false);

  // Smooth Magnetic Parallax Mouse Tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 90, mass: 0.8 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (shouldReduceMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      // Normalize mouse offset between -1 and 1
      const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      mouseX.set(nx);
      mouseY.set(ny);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [shouldReduceMotion, mouseX, mouseY]);

  // Curated layout of exact INTIOSS logo symbols placed organically in the whitespace
  const symbols: FloatingSymbolConfig[] =
    theme === "light"
      ? [
          {
            id: "sym-tl",
            size: 135,
            top: "15px",
            left: "2.5%",
            rotateDuration: 52,
            floatDuration: 7.5,
            floatOffset: 12,
            rotateDirection: 1,
            baseOpacity: intensity === "prominent" ? 0.35 : 0.22,
            fillMaroon: false,
            parallaxStrength: 18,
          },
          {
            id: "sym-tr",
            size: 165,
            top: "35px",
            right: "2%",
            rotateDuration: 64,
            floatDuration: 9,
            floatOffset: -14,
            rotateDirection: -1,
            baseOpacity: intensity === "prominent" ? 0.32 : 0.2,
            fillMaroon: true,
            parallaxStrength: 24,
          },
          {
            id: "sym-bl",
            size: 120,
            bottom: "35px",
            left: "3.5%",
            rotateDuration: 44,
            floatDuration: 6.8,
            floatOffset: 10,
            rotateDirection: -1,
            baseOpacity: intensity === "prominent" ? 0.28 : 0.18,
            fillMaroon: false,
            parallaxStrength: 15,
          },
          {
            id: "sym-br",
            size: 180,
            bottom: "20px",
            right: "2.5%",
            rotateDuration: 70,
            floatDuration: 10,
            floatOffset: 16,
            rotateDirection: 1,
            baseOpacity: intensity === "prominent" ? 0.34 : 0.22,
            fillMaroon: true,
            parallaxStrength: 28,
          },
        ]
      : [
          {
            id: "dark-sym-tl",
            size: 145,
            top: "20px",
            left: "2%",
            rotateDuration: 55,
            floatDuration: 8,
            floatOffset: 14,
            rotateDirection: 1,
            baseOpacity: 0.25,
            fillMaroon: true,
            parallaxStrength: 20,
          },
          {
            id: "dark-sym-tr",
            size: 175,
            top: "30px",
            right: "2%",
            rotateDuration: 68,
            floatDuration: 9.5,
            floatOffset: -16,
            rotateDirection: -1,
            baseOpacity: 0.22,
            fillMaroon: true,
            parallaxStrength: 26,
          },
          {
            id: "dark-sym-bl",
            size: 125,
            bottom: "30px",
            left: "3%",
            rotateDuration: 46,
            floatDuration: 7,
            floatOffset: 12,
            rotateDirection: -1,
            baseOpacity: 0.2,
            fillMaroon: false,
            parallaxStrength: 16,
          },
          {
            id: "dark-sym-br",
            size: 190,
            bottom: "15px",
            right: "2%",
            rotateDuration: 75,
            floatDuration: 10.5,
            floatOffset: 18,
            rotateDirection: 1,
            baseOpacity: 0.26,
            fillMaroon: true,
            parallaxStrength: 30,
          },
        ];

  const strokeColor =
    theme === "light"
      ? "#DDB62B"
      : theme === "gold"
      ? "#F3D368"
      : "#E5C866";

  const basePatternOpacity =
    theme === "light"
      ? intensity === "subtle"
        ? 0.035
        : intensity === "medium"
        ? 0.065
        : 0.095
      : intensity === "subtle"
      ? 0.045
      : intensity === "medium"
      ? 0.08
      : 0.12;

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none overflow-hidden z-0 select-none ${className}`}
      aria-hidden="true"
    >
      {/* 1. Subtle Architectural Honeycomb Watermark Mesh */}
      {showPattern && (
        <div
          className="absolute inset-0 transition-opacity duration-1000 pointer-events-none"
          style={{ opacity: basePatternOpacity }}
        >
          <svg
            width="100%"
            height="100%"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
          >
            <defs>
              <pattern
                id={`hex-mesh-${patternId}`}
                width="56"
                height="97"
                patternUnits="userSpaceOnUse"
                patternTransform="scale(0.85)"
              >
                <path
                  d="M28 0 L56 16.17 L56 48.5 L28 64.67 L0 48.5 L0 16.17 Z"
                  fill="none"
                  stroke={strokeColor}
                  strokeWidth="0.8"
                  strokeLinecap="round"
                />
                <path
                  d="M28 97 L56 113.17 L56 145.5 L28 161.67 L0 145.5 L0 113.17 Z"
                  fill="none"
                  stroke={strokeColor}
                  strokeWidth="0.8"
                  strokeLinecap="round"
                />
                <path
                  d="M56 48.5 L84 64.67 L84 97 L56 113.17 L28 97 L28 64.67 Z"
                  fill="none"
                  stroke={strokeColor}
                  strokeWidth="0.8"
                  strokeLinecap="round"
                />
                <path
                  d="M0 48.5 L28 64.67 L28 97 L0 113.17 L-28 97 L-28 64.67 Z"
                  fill="none"
                  stroke={strokeColor}
                  strokeWidth="0.8"
                  strokeLinecap="round"
                />

                <circle cx="28" cy="32.33" r="1.1" fill={strokeColor} fillOpacity="0.5" />
                <circle cx="56" cy="80.83" r="1.1" fill={strokeColor} fillOpacity="0.5" />
                <circle cx="0" cy="80.83" r="1.1" fill={strokeColor} fillOpacity="0.5" />
              </pattern>

              <radialGradient id={`radial-mask-${patternId}`} cx="50%" cy="50%" r="55%">
                <stop offset="0%" stopColor="#fff" stopOpacity={theme === "light" ? "0.2" : "0.4"} />
                <stop offset="70%" stopColor="#fff" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#fff" stopOpacity="1" />
              </radialGradient>
              <mask id={`mask-${patternId}`}>
                <rect width="100%" height="100%" fill={`url(#radial-mask-${patternId})`} />
              </mask>
            </defs>

            <rect
              width="100%"
              height="100%"
              fill={`url(#hex-mesh-${patternId})`}
              mask={`url(#mask-${patternId})`}
            />
          </svg>
        </div>
      )}

      {/* 2. Floating Exact INTIOSS Logo Symbols with Quiet Luxury Prismatic Sheen */}
      {showFloating && isClient && (
        <div className="absolute inset-0 overflow-hidden">
          {symbols.map((sym, idx) => {
            return (
              <FloatingSymbolItem
                key={sym.id}
                sym={sym}
                idx={idx}
                smoothMouseX={smoothMouseX}
                smoothMouseY={smoothMouseY}
                shouldReduceMotion={shouldReduceMotion}
                theme={theme}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

// Dedicated individual floating symbol with smooth magnetic parallax and specular sheen
function FloatingSymbolItem({
  sym,
  idx,
  smoothMouseX,
  smoothMouseY,
  shouldReduceMotion,
  theme,
}: {
  sym: FloatingSymbolConfig;
  idx: number;
  smoothMouseX: any;
  smoothMouseY: any;
  shouldReduceMotion: boolean | null;
  theme: "light" | "dark" | "gold";
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="absolute pointer-events-auto cursor-pointer"
      style={{
        top: sym.top,
        bottom: sym.bottom,
        left: sym.left,
        right: sym.right,
        width: sym.size,
        height: (sym.size * 116) / 100,
        opacity: isHovered ? 0.85 : sym.baseOpacity,
        transition: "opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      {/* Magnetic Parallax Shift Layer */}
      <motion.div
        style={{
          x: shouldReduceMotion ? 0 : smoothMouseX ? smoothMouseX : 0,
          y: shouldReduceMotion ? 0 : smoothMouseY ? smoothMouseY : 0,
        }}
        className="w-full h-full"
      >
        {/* Organic Levitation & Bobbing */}
        <motion.div
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  y: [0, sym.floatOffset, 0],
                  x: [0, sym.floatOffset * 0.3, 0],
                }
          }
          transition={{
            duration: sym.floatDuration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: idx * 1.1,
          }}
          className="w-full h-full"
        >
          {/* Calm, Slow Infinite Rotation */}
          <motion.div
            animate={
              shouldReduceMotion
                ? undefined
                : {
                    rotate: sym.rotateDirection === 1 ? [0, 360] : [0, -360],
                  }
            }
            transition={{
              duration: sym.rotateDuration,
              repeat: Infinity,
              ease: "linear",
            }}
            className="w-full h-full flex items-center justify-center origin-center"
          >
            <IntiossExactHexagon
              size={sym.size}
              fillMaroon={sym.fillMaroon}
              interactive={true}
              strokeWidth={1.2}
              strokeColor={theme === "light" ? "#DDB62B" : "#F3D368"}
              className="drop-shadow-[0_4px_16px_rgba(221,182,43,0.18)]"
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
