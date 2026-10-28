"use client";

import React, { useId } from "react";
import {
  INTIOSS_SYMBOL_NODES,
  DIAGONAL_FACET_LINES,
} from "./IntiossExactHexagon";

export type HalfHexagonSide = "left-dock" | "right-dock" | "top-dock" | "bottom-dock";

interface IntiossHalfHexagonProps {
  side: HalfHexagonSide;
  size?: number; // width in pixels for vertical docks, or width for horizontal
  theme?: "light" | "dark" | "gold";
  opacity?: number;
  strokeWidth?: number;
  strokeColor?: string;
  fillMaroon?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const outerPointsString = INTIOSS_SYMBOL_NODES.outer.map((p) => `${p.x},${p.y}`).join(" ");
const innerPointsString = INTIOSS_SYMBOL_NODES.inner.map((p) => `${p.x},${p.y}`).join(" ");

/**
 * IntiossHalfHexagon
 * 
 * Uses the 100% EXACT SAME internal diamond facet pattern, nodes, and geometry
 * as the official INTIOSS Hexagon symbol (IntiossExactHexagon).
 * Bisected with precision into clean, static half-hexagons with ZERO motion and ZERO animation.
 */
export function IntiossHalfHexagon({
  side,
  size = 280,
  theme = "light",
  opacity,
  strokeWidth = 1.3,
  strokeColor,
  fillMaroon = true,
  className = "",
  style = {},
}: IntiossHalfHexagonProps) {
  const uniqueId = useId().replace(/:/g, "_");

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
      ? 0.22
      : 0.28;

  // ViewBox and dimensions according to side
  // Full symbol is 100 wide x 116 high.
  // Left-dock (right half): viewBox="50 0 50 116", aspect ratio 50:116
  // Right-dock (left half): viewBox="0 0 50 116", aspect ratio 50:116
  // Top-dock (bottom half): viewBox="0 58 100 58", aspect ratio 100:58
  // Bottom-dock (top half): viewBox="0 0 100 58", aspect ratio 100:58
  const isVertical = side === "left-dock" || side === "right-dock";
  const width = size;
  const height = isVertical
    ? Math.round((size * 116) / 50)
    : Math.round((size * 58) / 100);

  const viewBox =
    side === "left-dock"
      ? "50 0 50 116"
      : side === "right-dock"
      ? "0 0 50 116"
      : side === "top-dock"
      ? "0 58 100 58"
      : "0 0 100 58";

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
        viewBox={viewBox}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          {/* Subtle Brushed Antique Gold Rim Gradient */}
          <linearGradient id={`halfGoldGrad-${uniqueId}`} x1="15%" y1="0%" x2="85%" y2="100%">
            <stop offset="0%" stopColor="#F9E28C" />
            <stop offset="40%" stopColor={effectiveStroke} />
            <stop offset="75%" stopColor="#A88118" />
            <stop offset="100%" stopColor="#F3D368" />
          </linearGradient>

          {/* Exact Inner Hexagon Clip Path */}
          <clipPath id={`halfInnerClip-${uniqueId}`}>
            <polygon points={innerPointsString} />
          </clipPath>
        </defs>

        {/* 1. Outer Hexagon Solid Rim (Exact INTIOSS outer polygon) */}
        <polygon
          points={outerPointsString}
          fill={`url(#halfGoldGrad-${uniqueId})`}
          stroke={effectiveStroke}
          strokeWidth={strokeWidth}
          strokeLinejoin="round"
        />

        {/* 2. Inner Hexagon Ground (Deep Architectural Burgundy or Transparent) */}
        <polygon
          points={innerPointsString}
          fill={fillMaroon ? (theme === "dark" ? "#3E0C15" : "#460E18") : "transparent"}
          fillOpacity={fillMaroon ? (theme === "dark" ? 0.85 : 0.45) : 0}
          stroke={effectiveStroke}
          strokeWidth={strokeWidth * 0.8}
          strokeLinejoin="round"
        />

        {/* 3. EXACT Internal Diamond Facet Lattice (Exact INTIOSS Rhombuses, Unaltered) */}
        <g clipPath={`url(#halfInnerClip-${uniqueId})`}>
          {DIAGONAL_FACET_LINES.map((line, idx) => (
            <line
              key={idx}
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              stroke={effectiveStroke}
              strokeWidth={strokeWidth * 0.75}
              strokeOpacity={0.8}
              strokeLinecap="round"
            />
          ))}

          {/* EXACT Delicate Gemological Facet Intersection Nodes */}
          {INTIOSS_SYMBOL_NODES.facets.map((node, nIdx) => (
            <circle
              key={nIdx}
              cx={node.x}
              cy={node.y}
              r={1.15}
              fill={effectiveStroke}
              fillOpacity={0.85}
            />
          ))}
        </g>

        {/* 4. Precision Cut-Edge Spine Line (Closes the half-hexagon with the gold rim) */}
        {side === "left-dock" && (
          <line
            x1="50"
            y1="4"
            x2="50"
            y2="112"
            stroke={`url(#halfGoldGrad-${uniqueId})`}
            strokeWidth={strokeWidth * 1.1}
            strokeLinecap="round"
          />
        )}
        {side === "right-dock" && (
          <line
            x1="50"
            y1="4"
            x2="50"
            y2="112"
            stroke={`url(#halfGoldGrad-${uniqueId})`}
            strokeWidth={strokeWidth * 1.1}
            strokeLinecap="round"
          />
        )}
        {side === "top-dock" && (
          <line
            x1="5"
            y1="58"
            x2="95"
            y2="58"
            stroke={`url(#halfGoldGrad-${uniqueId})`}
            strokeWidth={strokeWidth * 1.1}
            strokeLinecap="round"
          />
        )}
        {side === "bottom-dock" && (
          <line
            x1="5"
            y1="58"
            x2="95"
            y2="58"
            stroke={`url(#halfGoldGrad-${uniqueId})`}
            strokeWidth={strokeWidth * 1.1}
            strokeLinecap="round"
          />
        )}
      </svg>
    </div>
  );
}
