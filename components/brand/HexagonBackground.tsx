"use client";

import React, { useId } from "react";
import { IntiossHalfHexagon } from "./IntiossHalfHexagon";

interface HexagonBackgroundProps {
  theme?: "light" | "dark" | "gold";
  intensity?: "subtle" | "medium" | "prominent";
  showPattern?: boolean;
  showFloating?: boolean;
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
 * Elegantly anchors precision half-hexagons (with the exact INTIOSS logo diamond pattern)
 * into natural blank spaces & side margins across the entire website.
 */
export function HexagonBackground({
  theme = "light",
  intensity = "subtle",
  showPattern = true,
  showFloating = true,
  className = "",
  layout = "flanks",
  leftTop = "18%",
  rightTop = "58%",
  density = "single",
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

  const halfHexOpacity =
    theme === "light"
      ? intensity === "prominent"
        ? 0.24
        : 0.16
      : intensity === "prominent"
      ? 0.30
      : 0.22;

  // Position configurations according to density
  const leftPositions =
    density === "triple"
      ? ["12%", "48%", "82%"]
      : density === "double"
      ? [leftTop, "68%"]
      : [leftTop];

  const rightPositions =
    density === "triple"
      ? ["28%", "64%", "92%"]
      : density === "double"
      ? ["38%", rightTop]
      : [rightTop];

  const showLeft = layout === "flanks" || layout === "staggered" || layout === "left-only";
  const showRight = layout === "flanks" || layout === "staggered" || layout === "right-only";

  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden z-0 select-none ${className}`}
      aria-hidden="true"
    >
      {/* 1. Subtle Static Architectural Honeycomb Watermark Mesh (Zero Motion) */}
      {showPattern && (
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
      )}

      {/* 2. Static Architectural Half Hexagons with EXACT INTIOSS Logo Diamond Pattern in Blank Spaces */}
      {showFloating && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Left Flank Half Hexagons (Docks flush to the left boundary, extending into blank space) */}
          {showLeft &&
            leftPositions.map((pos, idx) => (
              <div
                key={`left-half-${idx}`}
                className="absolute left-0 pointer-events-none hidden sm:block"
                style={{
                  top: pos,
                  transform: "translateY(-50%)",
                }}
              >
                <IntiossHalfHexagon
                  side="left-dock"
                  size={idx % 2 === 0 ? 240 : 210}
                  theme={theme}
                  opacity={halfHexOpacity}
                  strokeWidth={1.2}
                  fillMaroon={theme === "dark"}
                  className="drop-shadow-[0_2px_12px_rgba(201,160,32,0.12)]"
                />
              </div>
            ))}

          {/* Right Flank Half Hexagons (Docks flush to the right boundary, extending into blank space) */}
          {showRight &&
            rightPositions.map((pos, idx) => (
              <div
                key={`right-half-${idx}`}
                className="absolute right-0 pointer-events-none hidden sm:block"
                style={{
                  top: pos,
                  transform: "translateY(-50%)",
                }}
              >
                <IntiossHalfHexagon
                  side="right-dock"
                  size={idx % 2 === 0 ? 260 : 230}
                  theme={theme}
                  opacity={halfHexOpacity}
                  strokeWidth={1.2}
                  fillMaroon={theme === "dark"}
                  className="drop-shadow-[0_2px_12px_rgba(201,160,32,0.12)]"
                />
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export { IntiossHalfHexagon } from "./IntiossHalfHexagon";
