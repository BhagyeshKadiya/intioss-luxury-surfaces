"use client";

import React, { useId } from "react";

interface HexagonBackgroundProps {
  theme?: "light" | "dark" | "gold";
  intensity?: "subtle" | "medium" | "prominent";
  showPattern?: boolean;
  showFloating?: boolean; // Retained for API compatibility, no half-hexagons rendered
  className?: string;
  layout?: "flanks" | "left-only" | "right-only" | "staggered" | "minimal";
  leftTop?: string;
  rightTop?: string;
  density?: "single" | "double" | "triple";
}

/**
 * HexagonBackground
 * 
 * Luxury architectural background system with ZERO animation and ZERO motion.
 * Renders an ultra-subtle static honeycomb watermark mesh when showPattern is true.
 * All half-hexagons have been completely removed across the website.
 */
export function HexagonBackground({
  theme = "light",
  intensity = "subtle",
  showPattern = true,
  className = "",
}: HexagonBackgroundProps) {
  const patternId = useId().replace(/:/g, "_");

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
          ? 0.06
          : 0.085
      : intensity === "subtle"
        ? 0.045
        : intensity === "medium"
          ? 0.075
          : 0.11;

  if (!showPattern) {
    return null;
  }

  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden z-0 select-none ${className}`}
      aria-hidden="true"
    >
      {/* Subtle Static Architectural Honeycomb Watermark Mesh (Zero Motion, No Half Hexagons) */}
      <div
        className="absolute inset-0 pointer-events-none"
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
              <stop offset="0%" stopColor="#fff" stopOpacity={theme === "light" ? "0.2" : "0.35"} />
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
    </div>
  );
}
