"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";

interface IntiossExactHexagonProps {
  size?: number;
  className?: string;
  fillMaroon?: boolean;
  strokeColor?: string;
  strokeWidth?: number;
  interactive?: boolean;
  enableSpiderEffect?: boolean;
  spiderThreshold?: number; // Distance in pixels to trigger spider web lines
  animated?: boolean;
  onClick?: () => void;
}

// Nodes for the INTIOSS Logo Symbol (in 100x116 coordinate system)
export const INTIOSS_SYMBOL_NODES = {
  // Outer perimeter (6 points)
  outer: [
    { id: "o-top", x: 50, y: 4 },
    { id: "o-tr", x: 95, y: 30 },
    { id: "o-br", x: 95, y: 86 },
    { id: "o-bot", x: 50, y: 112 },
    { id: "o-bl", x: 5, y: 86 },
    { id: "o-tl", x: 5, y: 30 },
  ],
  // Inner perimeter (6 points)
  inner: [
    { id: "i-top", x: 50, y: 12 },
    { id: "i-tr", x: 89, y: 34 },
    { id: "i-br", x: 89, y: 82 },
    { id: "i-bot", x: 50, y: 104 },
    { id: "i-bl", x: 11, y: 82 },
    { id: "i-tl", x: 11, y: 34 },
  ],
  // Internal diamond intersection nodes
  facets: [
    { id: "f-top-mid", x: 50, y: 35 },
    { id: "f-center", x: 50, y: 58 },
    { id: "f-bot-mid", x: 50, y: 81 },
    { id: "f-mid-tl", x: 30.5, y: 46.5 },
    { id: "f-mid-tr", x: 69.5, y: 46.5 },
    { id: "f-mid-bl", x: 30.5, y: 69.5 },
    { id: "f-mid-br", x: 69.5, y: 69.5 },
    { id: "f-edge-left", x: 11, y: 58 },
    { id: "f-edge-right", x: 89, y: 58 },
  ],
};

export function IntiossExactHexagon({
  size = 120,
  className = "",
  fillMaroon = true,
  strokeColor = "#DDB62B",
  strokeWidth = 1.6,
  interactive = true,
  enableSpiderEffect = true,
  spiderThreshold = 180,
  animated = false,
  onClick,
}: IntiossExactHexagonProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [spiderLines, setSpiderLines] = useState<{ x1: number; y1: number; x2: number; y2: number; opacity: number }[]>([]);
  const shouldReduceMotion = useReducedMotion();

  // Mouse tracking for spider web effect
  useEffect(() => {
    if (!enableSpiderEffect || shouldReduceMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dist = Math.hypot(e.clientX - centerX, e.clientY - centerY);

      if (dist < spiderThreshold) {
        // Calculate relative mouse coordinates inside the SVG viewBox (0..100, 0..116)
        const relX = ((e.clientX - rect.left) / rect.width) * 100;
        const relY = ((e.clientY - rect.top) / rect.height) * 116;

        // Connect to nearest facet nodes (spider web effect)
        const allNodes = [
          ...INTIOSS_SYMBOL_NODES.outer,
          ...INTIOSS_SYMBOL_NODES.facets,
        ];

        // Sort nodes by distance to mouse and pick closest 5-7 nodes
        const sorted = allNodes
          .map((n) => ({
            ...n,
            d: Math.hypot(n.x - relX, n.y - relY),
          }))
          .sort((a, b) => a.d - b.d)
          .slice(0, 6);

        const intensity = Math.max(0, 1 - dist / spiderThreshold);

        const lines = sorted.map((target) => ({
          x1: relX,
          y1: relY,
          x2: target.x,
          y2: target.y,
          opacity: (1 - target.d / 120) * intensity * 0.95,
        }));

        setSpiderLines(lines);
      } else {
        if (spiderLines.length > 0) setSpiderLines([]);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [enableSpiderEffect, spiderThreshold, shouldReduceMotion, spiderLines.length]);

  const outerPoints = INTIOSS_SYMBOL_NODES.outer.map((p) => `${p.x},${p.y}`).join(" ");
  const innerPoints = INTIOSS_SYMBOL_NODES.inner.map((p) => `${p.x},${p.y}`).join(" ");

  // Internal diagonal facet lattice lines
  const diagonalLines = [
    // Down-Right lines
    { x1: 30.5, y1: 23, x2: 89, y2: 58 },
    { x1: 11, y1: 34, x2: 89, y2: 82 },
    { x1: 11, y1: 58, x2: 69.5, y2: 93 },
    // Down-Left lines
    { x1: 69.5, y1: 23, x2: 11, y2: 58 },
    { x1: 89, y1: 34, x2: 11, y2: 82 },
    { x1: 89, y1: 58, x2: 30.5, y2: 93 },
  ];

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setSpiderLines([]);
      }}
      onClick={onClick}
      className={`relative inline-block select-none ${interactive ? "cursor-pointer" : ""} ${className}`}
      style={{ width: size, height: (size * 116) / 100 }}
    >
      {/* Radiant Lighting Aura on Hover / Proximity */}
      <div
        className={`absolute inset-0 rounded-full blur-xl pointer-events-none transition-all duration-500 ${
          isHovered || spiderLines.length > 0
            ? "bg-gold/35 scale-125 opacity-100"
            : "bg-gold/0 scale-90 opacity-0"
        }`}
      />

      <svg
        viewBox="0 0 100 116"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`w-full h-full relative z-10 transition-transform duration-300 ${
          isHovered ? "scale-105" : "scale-100"
        }`}
        style={{
          filter: isHovered
            ? "drop-shadow(0 0 12px rgba(221, 182, 43, 0.85)) drop-shadow(0 0 24px rgba(221, 182, 43, 0.45))"
            : spiderLines.length > 0
            ? "drop-shadow(0 0 8px rgba(221, 182, 43, 0.4))"
            : undefined,
        }}
      >
        <defs>
          {/* Gold Metallic Gradients */}
          <linearGradient id="intiossGoldRim" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F9E28C" />
            <stop offset="35%" stopColor="#DDB62B" />
            <stop offset="70%" stopColor="#B38A18" />
            <stop offset="100%" stopColor="#F3D368" />
          </linearGradient>

          <linearGradient id="intiossSpiderLaser" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="40%" stopColor="#F5DF88" />
            <stop offset="100%" stopColor="#DDB62B" />
          </linearGradient>

          {/* Facet clip path to contain lattice lines strictly inside the inner hexagon */}
          <clipPath id="innerHexClip">
            <polygon points={innerPoints} />
          </clipPath>
        </defs>

        {/* 1. Outer Hexagon Base Fill (Gold Rim Body) */}
        <polygon
          points={outerPoints}
          fill="url(#intiossGoldRim)"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinejoin="round"
        />

        {/* 2. Inner Hexagon Fill (Maroon Body or Dark Luxury Ground) */}
        <polygon
          points={innerPoints}
          fill={fillMaroon ? (isHovered ? "#560E1B" : "#3E0C15") : "transparent"}
          stroke={strokeColor}
          strokeWidth={strokeWidth * 0.85}
          strokeLinejoin="round"
          className="transition-colors duration-300"
        />

        {/* 3. Internal Diamond Facet Lattice (Exact INTIOSS Logo Grid) */}
        <g clipPath="url(#innerHexClip)">
          {diagonalLines.map((line, idx) => (
            <line
              key={idx}
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              stroke={isHovered ? "#FFEAA7" : strokeColor}
              strokeWidth={isHovered ? strokeWidth * 1.1 : strokeWidth * 0.75}
              strokeOpacity={isHovered ? 0.95 : 0.8}
              strokeLinecap="round"
              className="transition-all duration-300"
            />
          ))}

          {/* Running Laser Lighting Effect when Hovered */}
          {isHovered && (
            <g className="animate-pulse" style={{ animationDuration: "1.2s" }}>
              {diagonalLines.map((line, idx) => (
                <line
                  key={`pulse-${idx}`}
                  x1={line.x1}
                  y1={line.y1}
                  x2={line.x2}
                  y2={line.y2}
                  stroke="#FFFFFF"
                  strokeWidth={strokeWidth * 0.9}
                  strokeDasharray="15 35"
                  className="animate-dash"
                  strokeLinecap="round"
                  opacity={0.8}
                />
              ))}
            </g>
          )}

          {/* Diamond Facet Nodes */}
          {INTIOSS_SYMBOL_NODES.facets.map((node) => (
            <circle
              key={node.id}
              cx={node.x}
              cy={node.y}
              r={isHovered ? 2.2 : 1.4}
              fill={isHovered ? "#FFFFFF" : strokeColor}
              className="transition-all duration-200"
              style={{
                filter: isHovered ? "drop-shadow(0 0 4px #FFFFFF)" : undefined,
              }}
            />
          ))}
        </g>

        {/* 4. Interactive Spider Web Lightning Effect Lines */}
        {spiderLines.map((line, idx) => (
          <g key={`spider-${idx}`}>
            {/* Soft Outer Web Glow */}
            <line
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              stroke="#DDB62B"
              strokeWidth="2.5"
              strokeOpacity={line.opacity * 0.4}
              strokeLinecap="round"
            />
            {/* Core Electric Laser Web Filament */}
            <line
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              stroke="url(#intiossSpiderLaser)"
              strokeWidth="1.2"
              strokeOpacity={line.opacity}
              strokeLinecap="round"
              strokeDasharray={idx % 2 === 0 ? "none" : "4 2"}
            />
            {/* Anchor Spark Dot at Hexagon Node */}
            <circle
              cx={line.x2}
              cy={line.y2}
              r={line.opacity * 2.8}
              fill="#FFFFFF"
              style={{ filter: "drop-shadow(0 0 3px #F3D368)" }}
            />
          </g>
        ))}

        {/* 5. Outer Laser Perimeter Tracer on Hover (Lighting Effect) */}
        {isHovered && (
          <polygon
            points={outerPoints}
            fill="none"
            stroke="#FFF2A8"
            strokeWidth={strokeWidth * 1.5}
            strokeDasharray="25 60"
            strokeLinecap="round"
            className="animate-spin-slow"
            style={{
              transformOrigin: "50% 58%",
              filter: "drop-shadow(0 0 6px #FFFFFF)",
            }}
          />
        )}
      </svg>
    </div>
  );
}
