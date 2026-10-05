"use client";

import React from "react";
import Image from "next/image";
import { motion } from "motion/react";

interface HexagonProps {
  className?: string;
  size?: number | string;
  animated?: boolean;
  fillMaroon?: boolean;
  strokeColor?: string;
  strokeWidth?: number;
}

export function IntiossHexagon({
  className = "",
  size = 32,
  animated = false,
}: HexagonProps) {
  const sz = typeof size === "number" ? `${size}px` : size;

  const imageElement = (
    <div
      className={`relative inline-flex items-center justify-center ${className}`}
      style={{ width: sz, height: sz }}
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
