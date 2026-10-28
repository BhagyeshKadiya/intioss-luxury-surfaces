"use client";

import React, { useId } from "react";

export type HalfHexagonSide = "left-dock" | "right-dock" | "top-dock" | "bottom-dock";

interface IntiossHalfHexagonProps {
  side: HalfHexagonSide;
  size?: number; // width in pixels
  theme?: "light" | "dark" | "gold";
  opacity?: number;
  strokeWidth?: number;
  strokeColor?: string;
  fillMaroon?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * IntiossHalfHexagon
 * 
 * Precision mathematical half-hexagon architectural watermark.
 * Clean, static, luxury geometry with ZERO animation and ZERO motion.
 * Designed to gracefully anchor into negative and blank spaces across the website.
 */
export function IntiossHalfHexagon({
  side,
  size = 280,
  theme = "light",
  opacity,
  strokeWidth = 1.2,
  strokeColor,
  fillMaroon = false,
  className = "",
  style = {},
}: IntiossHalfHexagonProps) {
  const uniqueId = useId().replace(/:/g, "_");

  // Default theme color palettes
  const defaultStroke =
    theme === "light"
      ? "#C9A020" // Antique gold for ivory backgrounds
      : theme === "gold"
      ? "#F3D368"
      : "#E5C866"; // Luminous champagne gold for dark burgundy/obsidian backgrounds

  const effectiveStroke = strokeColor || defaultStroke;

  const defaultOpacity =
    opacity !== undefined
      ? opacity
      : theme === "light"
      ? 0.16
      : 0.22;

  // 1. LEFT-DOCK: Sits on the left edge of the section, facets point right into the blank space
  if (side === "left-dock") {
    const height = Math.round((size * 116) / 50);

    return (
      <div
        className={`pointer-events-none select-none ${className}`}
        style={{
          width: size,
          height,
          opacity: defaultOpacity,
          ...style,
        }}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 50 116"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <defs>
            <linearGradient id={`halfGradLeft-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={effectiveStroke} stopOpacity="0.9" />
              <stop offset="60%" stopColor={effectiveStroke} stopOpacity="0.6" />
              <stop offset="100%" stopColor={effectiveStroke} stopOpacity="0.3" />
            </linearGradient>
            <clipPath id={`halfClipLeft-${uniqueId}`}>
              <polygon points="0,12 39,34 39,82 0,104" />
            </clipPath>
          </defs>

          {/* Outer Half-Hexagon Rim (Spine flush on left: x=0) */}
          <polygon
            points="0,4 45,30 45,86 0,112"
            fill="none"
            stroke={`url(#halfGradLeft-${uniqueId})`}
            strokeWidth={strokeWidth}
            strokeLinejoin="round"
          />

          {/* Inner Accent Polygon */}
          <polygon
            points="0,12 39,34 39,82 0,104"
            fill={fillMaroon ? (theme === "dark" ? "#2A070E" : "#4A101A") : "none"}
            fillOpacity={fillMaroon ? 0.35 : 0}
            stroke={effectiveStroke}
            strokeWidth={strokeWidth * 0.75}
            strokeLinejoin="round"
            strokeOpacity="0.75"
          />

          {/* Architectural Gemological Facet Grid */}
          <g clipPath={`url(#halfClipLeft-${uniqueId})`}>
            {/* Center horizontal divider */}
            <line
              x1="0"
              y1="58"
              x2="39"
              y2="58"
              stroke={effectiveStroke}
              strokeWidth={strokeWidth * 0.65}
              strokeOpacity="0.65"
            />
            {/* Upper and lower converging diamond facets */}
            <line
              x1="0"
              y1="35"
              x2="39"
              y2="58"
              stroke={effectiveStroke}
              strokeWidth={strokeWidth * 0.65}
              strokeOpacity="0.6"
            />
            <line
              x1="0"
              y1="81"
              x2="39"
              y2="58"
              stroke={effectiveStroke}
              strokeWidth={strokeWidth * 0.65}
              strokeOpacity="0.6"
            />
            {/* Slant diagonals */}
            <line
              x1="0"
              y1="12"
              x2="39"
              y2="34"
              stroke={effectiveStroke}
              strokeWidth={strokeWidth * 0.55}
              strokeOpacity="0.5"
            />
            <line
              x1="0"
              y1="104"
              x2="39"
              y2="82"
              stroke={effectiveStroke}
              strokeWidth={strokeWidth * 0.55}
              strokeOpacity="0.5"
            />

            {/* Subtle Intersection Diamond Dots */}
            <circle cx="0" cy="58" r="1.3" fill={effectiveStroke} fillOpacity="0.8" />
            <circle cx="20" cy="46.5" r="1.1" fill={effectiveStroke} fillOpacity="0.6" />
            <circle cx="20" cy="69.5" r="1.1" fill={effectiveStroke} fillOpacity="0.6" />
            <circle cx="39" cy="58" r="1.2" fill={effectiveStroke} fillOpacity="0.8" />
          </g>
        </svg>
      </div>
    );
  }

  // 2. RIGHT-DOCK: Sits on the right edge of the section, facets point left into the blank space
  if (side === "right-dock") {
    const height = Math.round((size * 116) / 50);

    return (
      <div
        className={`pointer-events-none select-none ${className}`}
        style={{
          width: size,
          height,
          opacity: defaultOpacity,
          ...style,
        }}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 50 116"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <defs>
            <linearGradient id={`halfGradRight-${uniqueId}`} x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={effectiveStroke} stopOpacity="0.9" />
              <stop offset="60%" stopColor={effectiveStroke} stopOpacity="0.6" />
              <stop offset="100%" stopColor={effectiveStroke} stopOpacity="0.3" />
            </linearGradient>
            <clipPath id={`halfClipRight-${uniqueId}`}>
              <polygon points="50,12 11,34 11,82 50,104" />
            </clipPath>
          </defs>

          {/* Outer Half-Hexagon Rim (Spine flush on right: x=50) */}
          <polygon
            points="50,4 5,30 5,86 50,112"
            fill="none"
            stroke={`url(#halfGradRight-${uniqueId})`}
            strokeWidth={strokeWidth}
            strokeLinejoin="round"
          />

          {/* Inner Accent Polygon */}
          <polygon
            points="50,12 11,34 11,82 50,104"
            fill={fillMaroon ? (theme === "dark" ? "#2A070E" : "#4A101A") : "none"}
            fillOpacity={fillMaroon ? 0.35 : 0}
            stroke={effectiveStroke}
            strokeWidth={strokeWidth * 0.75}
            strokeLinejoin="round"
            strokeOpacity="0.75"
          />

          {/* Architectural Gemological Facet Grid */}
          <g clipPath={`url(#halfClipRight-${uniqueId})`}>
            {/* Center horizontal divider */}
            <line
              x1="50"
              y1="58"
              x2="11"
              y2="58"
              stroke={effectiveStroke}
              strokeWidth={strokeWidth * 0.65}
              strokeOpacity="0.65"
            />
            {/* Upper and lower converging diamond facets */}
            <line
              x1="50"
              y1="35"
              x2="11"
              y2="58"
              stroke={effectiveStroke}
              strokeWidth={strokeWidth * 0.65}
              strokeOpacity="0.6"
            />
            <line
              x1="50"
              y1="81"
              x2="11"
              y2="58"
              stroke={effectiveStroke}
              strokeWidth={strokeWidth * 0.65}
              strokeOpacity="0.6"
            />
            {/* Slant diagonals */}
            <line
              x1="50"
              y1="12"
              x2="11"
              y2="34"
              stroke={effectiveStroke}
              strokeWidth={strokeWidth * 0.55}
              strokeOpacity="0.5"
            />
            <line
              x1="50"
              y1="104"
              x2="11"
              y2="82"
              stroke={effectiveStroke}
              strokeWidth={strokeWidth * 0.55}
              strokeOpacity="0.5"
            />

            {/* Subtle Intersection Diamond Dots */}
            <circle cx="50" cy="58" r="1.3" fill={effectiveStroke} fillOpacity="0.8" />
            <circle cx="30" cy="46.5" r="1.1" fill={effectiveStroke} fillOpacity="0.6" />
            <circle cx="30" cy="69.5" r="1.1" fill={effectiveStroke} fillOpacity="0.6" />
            <circle cx="11" cy="58" r="1.2" fill={effectiveStroke} fillOpacity="0.8" />
          </g>
        </svg>
      </div>
    );
  }

  // 3. TOP-DOCK: Sits on the top border pointing down into the blank space
  if (side === "top-dock") {
    const width = size;
    const height = Math.round((size * 58) / 100);

    return (
      <div
        className={`pointer-events-none select-none ${className}`}
        style={{
          width,
          height,
          opacity: defaultOpacity,
          ...style,
        }}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 100 58"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <polygon
            points="5,0 5,28 50,54 95,28 95,0"
            fill="none"
            stroke={effectiveStroke}
            strokeWidth={strokeWidth}
            strokeLinejoin="round"
          />
          <polygon
            points="11,0 11,24 50,46 89,24 89,0"
            fill="none"
            stroke={effectiveStroke}
            strokeWidth={strokeWidth * 0.75}
            strokeLinejoin="round"
            strokeOpacity="0.7"
          />
        </svg>
      </div>
    );
  }

  // 4. BOTTOM-DOCK: Sits on the bottom border pointing up into the blank space
  const width = size;
  const height = Math.round((size * 58) / 100);

  return (
    <div
      className={`pointer-events-none select-none ${className}`}
      style={{
        width,
        height,
        opacity: defaultOpacity,
        ...style,
      }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 100 58"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <polygon
          points="5,58 5,30 50,4 95,30 95,58"
          fill="none"
          stroke={effectiveStroke}
          strokeWidth={strokeWidth}
          strokeLinejoin="round"
        />
        <polygon
          points="11,58 11,34 50,12 89,34 89,58"
          fill="none"
          stroke={effectiveStroke}
          strokeWidth={strokeWidth * 0.75}
          strokeLinejoin="round"
          strokeOpacity="0.7"
        />
      </svg>
    </div>
  );
}
