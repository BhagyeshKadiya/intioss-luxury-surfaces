"use client";

import React, { useId } from "react";

interface PatternProps {
  className?: string;
  opacity?: number;
  strokeColor?: string;
  strokeWidth?: number;
  animated?: boolean;
}

export function IntiossPattern({
  className = "",
  opacity = 0.04,
  strokeColor = "#DDB62B",
  strokeWidth = 1,
  animated = false,
}: PatternProps) {
  const rawId = useId();
  const patternId = `intioss-hex-pattern-${rawId.replace(/:/g, "_")}`;

  return (
    <div
      className={`absolute inset-0 pointer-events-none z-0 overflow-hidden ${className}`}
      style={{ opacity }}
      aria-hidden="true"
    >
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <defs>
          <pattern
            id={patternId}
            width="56"
            height="97"
            patternUnits="userSpaceOnUse"
            patternTransform="scale(0.8)"
          >
            {/* Seamless Honeycomb Pattern */}
            <path
              d="M28 0 L56 16.17 L56 48.5 L28 64.67 L0 48.5 L0 16.17 Z"
              fill="none"
              stroke={strokeColor}
              strokeWidth={strokeWidth}
            />
            <path
              d="M28 97 L56 113.17 L56 145.5 L28 161.67 L0 145.5 L0 113.17 Z"
              fill="none"
              stroke={strokeColor}
              strokeWidth={strokeWidth}
            />
            <path
              d="M56 48.5 L84 64.67 L84 97 L56 113.17 L28 97 L28 64.67 Z"
              fill="none"
              stroke={strokeColor}
              strokeWidth={strokeWidth}
            />
            <path
              d="M0 48.5 L28 64.67 L28 97 L0 113.17 L-28 97 L-28 64.67 Z"
              fill="none"
              stroke={strokeColor}
              strokeWidth={strokeWidth}
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>

      {animated && (
        <div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/10 to-transparent animate-pulse pointer-events-none"
          style={{ animationDuration: "8s" }}
        />
      )}
    </div>
  );
}
