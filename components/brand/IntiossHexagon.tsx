"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { IntiossExactHexagon } from "./IntiossExactHexagon";

interface HexagonProps {
  className?: string;
  size?: number | string;
  animated?: boolean;
  fillMaroon?: boolean;
  strokeColor?: string;
  strokeWidth?: number;
  useVector?: boolean;
  enableSpiderEffect?: boolean;
}

export function IntiossHexagon({
  className = "",
  size = 32,
  animated = false,
  fillMaroon = true,
  strokeColor = "#DDB62B",
  strokeWidth = 1.6,
  useVector = false,
  enableSpiderEffect = false,
}: HexagonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const numSize = typeof size === "number" ? size : parseInt(size as string, 10) || 32;
  const sz = typeof size === "number" ? `${size}px` : size;

  if (useVector || enableSpiderEffect) {
    return (
      <IntiossExactHexagon
        size={numSize}
        className={className}
        fillMaroon={fillMaroon}
        strokeColor={strokeColor}
        strokeWidth={strokeWidth}
        enableSpiderEffect={enableSpiderEffect}
        animated={animated}
      />
    );
  }

  const imageElement = (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative inline-flex items-center justify-center transition-transform duration-300 ${
        isHovered ? "scale-105" : "scale-100"
      } ${className}`}
      style={{
        width: sz,
        height: sz,
        filter: isHovered
          ? "drop-shadow(0 0 12px rgba(221, 182, 43, 0.85)) drop-shadow(0 0 24px rgba(221, 182, 43, 0.4))"
          : undefined,
      }}
    >
      <Image
        src="/brand-icon.png"
        alt="Intioss Hexagon Symbol"
        fill
        sizes="(max-width: 768px) 100vw, 128px"
        className="object-contain"
        priority
      />
    </div>
  );

  if (animated) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{
          duration: 1.2,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="inline-flex"
      >
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {imageElement}
        </motion.div>
      </motion.div>
    );
  }

  return imageElement;
}

export { IntiossExactHexagon } from "./IntiossExactHexagon";
