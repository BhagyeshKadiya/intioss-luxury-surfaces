import React, { useState } from "react";

interface IntiossExactHexagonProps {
  size?: number;
  className?: string;
  fillMaroon?: boolean;
  strokeColor?: string;
  strokeWidth?: number;
  interactive?: boolean;
  animated?: boolean;
  onClick?: () => void;
}

// Precision mathematical coordinates for the INTIOSS Logo Symbol (in 100x116 viewBox)
export const INTIOSS_SYMBOL_NODES = {
  outer: [
    { x: 50, y: 4 },
    { x: 95, y: 30 },
    { x: 95, y: 86 },
    { x: 50, y: 112 },
    { x: 5, y: 86 },
    { x: 5, y: 30 },
  ],
  inner: [
    { x: 50, y: 12 },
    { x: 89, y: 34 },
    { x: 89, y: 82 },
    { x: 50, y: 104 },
    { x: 11, y: 82 },
    { x: 11, y: 34 },
  ],
  facets: [
    { x: 50, y: 35 },
    { x: 50, y: 58 },
    { x: 50, y: 81 },
    { x: 30.5, y: 46.5 },
    { x: 69.5, y: 46.5 },
    { x: 30.5, y: 69.5 },
    { x: 69.5, y: 69.5 },
    { x: 11, y: 58 },
    { x: 89, y: 58 },
  ],
};

const outerPointsString = INTIOSS_SYMBOL_NODES.outer.map((p) => `${p.x},${p.y}`).join(" ");
const innerPointsString = INTIOSS_SYMBOL_NODES.inner.map((p) => `${p.x},${p.y}`).join(" ");

const DIAGONAL_FACET_LINES = [
  // Down-Right lines
  { x1: 30.5, y1: 23, x2: 89, y2: 58 },
  { x1: 11, y1: 34, x2: 89, y2: 82 },
  { x1: 11, y1: 58, x2: 69.5, y2: 93 },
  // Down-Left lines
  { x1: 69.5, y1: 23, x2: 11, y2: 58 },
  { x1: 89, y1: 34, x2: 11, y2: 82 },
  { x1: 89, y1: 58, x2: 30.5, y2: 93 },
];

export function IntiossExactHexagon({
  size = 120,
  className = "",
  fillMaroon = true,
  strokeColor = "#DDB62B",
  strokeWidth = 1.3,
  interactive = false,
  animated = false,
  onClick,
}: IntiossExactHexagonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const uniqueId = React.useId().replace(/:/g, "_");

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      style={{
        width: size,
        height: (size * 116) / 100,
      }}
      className={`relative inline-block select-none transition-transform duration-300 ${
        interactive ? "cursor-pointer" : ""
      } ${className}`}
    >
      {/* 1. Ethereal Soft Ambient Warm-Gold Glow (Sophisticated & Quiet) */}
      <div
        className={`absolute inset-0 rounded-full pointer-events-none transition-all duration-700 ease-out ${
          isHovered
            ? "bg-gradient-to-tr from-gold/25 via-gold/15 to-transparent blur-2xl scale-125 opacity-100"
            : "bg-gold/0 blur-xl scale-95 opacity-0"
        }`}
      />

      <svg
        viewBox="0 0 100 116"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`w-full h-full relative z-10 transition-all duration-500 ${
          isHovered ? "scale-[1.035]" : "scale-100"
        }`}
        style={{
          filter: isHovered
            ? "drop-shadow(0 6px 18px rgba(221, 182, 43, 0.45))"
            : "drop-shadow(0 3px 10px rgba(0,0,0,0.12))",
        }}
      >
        <defs>
          {/* Subtle Brushed Antique Gold Rim Gradient */}
          <linearGradient id={`goldRimGrad-${uniqueId}`} x1="15%" y1="0%" x2="85%" y2="100%">
            <stop offset="0%" stopColor="#F9E28C" />
            <stop offset="40%" stopColor="#DDB62B" />
            <stop offset="75%" stopColor="#A88118" />
            <stop offset="100%" stopColor="#F3D368" />
          </linearGradient>

          {/* Silky Specular Sheen (Sweeps smoothly across facets on hover) */}
          <linearGradient
            id={`specularSweep-${uniqueId}`}
            x1={isHovered ? "120%" : "-60%"}
            y1={isHovered ? "120%" : "-60%"}
            x2={isHovered ? "180%" : "0%"}
            y2={isHovered ? "180%" : "0%"}
          >
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
            <stop offset="45%" stopColor="#FFF4D0" stopOpacity="0.45" />
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.75" />
            <stop offset="55%" stopColor="#FFF4D0" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>

          {/* Inner Hexagon Clip Path */}
          <clipPath id={`innerClip-${uniqueId}`}>
            <polygon points={innerPointsString} />
          </clipPath>
        </defs>

        {/* 1. Outer Hexagon Solid Rim */}
        <polygon
          points={outerPointsString}
          fill={`url(#goldRimGrad-${uniqueId})`}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinejoin="round"
        />

        {/* 2. Inner Hexagon Ground (Deep Architectural Burgundy) */}
        <polygon
          points={innerPointsString}
          fill={fillMaroon ? (isHovered ? "#460E18" : "#3E0C15") : "transparent"}
          stroke={strokeColor}
          strokeWidth={strokeWidth * 0.8}
          strokeLinejoin="round"
          className="transition-colors duration-500 ease-out"
        />

        {/* 3. Internal Diamond Facet Lattice (Exact INTIOSS Rhombuses) */}
        <g clipPath={`url(#innerClip-${uniqueId})`}>
          {DIAGONAL_FACET_LINES.map((line, idx) => (
            <line
              key={idx}
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              stroke={isHovered ? "#FCEEC7" : strokeColor}
              strokeWidth={isHovered ? strokeWidth * 0.95 : strokeWidth * 0.7}
              strokeOpacity={isHovered ? 0.9 : 0.72}
              strokeLinecap="round"
              className="transition-all duration-400 ease-out"
            />
          ))}

          {/* Silky Specular Glint Sheen across the facets on hover */}
          <rect
            x="0"
            y="0"
            width="100"
            height="116"
            fill={`url(#specularSweep-${uniqueId})`}
            className="transition-all duration-1000 ease-in-out pointer-events-none"
            style={{
              opacity: isHovered ? 1 : 0,
            }}
          />

          {/* Delicate Gemological Facet Intersection Nodes */}
          {INTIOSS_SYMBOL_NODES.facets.map((node, nIdx) => (
            <circle
              key={nIdx}
              cx={node.x}
              cy={node.y}
              r={isHovered ? 1.5 : 1.1}
              fill={isHovered ? "#FFFFFF" : strokeColor}
              fillOpacity={isHovered ? 0.95 : 0.75}
              className="transition-all duration-300"
            />
          ))}
        </g>

        {/* 4. Elegant Hairline Golden Highlight Accent on Hover */}
        {isHovered && (
          <polygon
            points={outerPointsString}
            fill="none"
            stroke="#FFF5C2"
            strokeWidth="0.8"
            strokeOpacity="0.6"
            strokeLinejoin="round"
            className="transition-opacity duration-500"
          />
        )}
      </svg>
    </div>
  );
}
