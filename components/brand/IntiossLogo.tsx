"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

interface IntiossLogoProps {
  className?: string;
  theme?: "light" | "dark"; // Kept for API compatibility, but image remains static
  showSubtitle?: boolean;
  size?: "sm" | "md" | "lg" | "hero";
  asLink?: boolean;
}

export function IntiossLogo({
  className = "",
  theme = "light",
  showSubtitle = true,
  size = "md",
  asLink = true,
}: IntiossLogoProps) {
  // Map sizes to Tailwind widths.
  // The original SVG was responsive and had width/height scaling. We use widths here.
  const sizeClasses = {
    sm: "w-32 md:w-40",
    md: "w-48 md:w-56",
    lg: "w-64 md:w-72",
    hero: "w-72 sm:w-80 md:w-96 lg:w-[450px]",
  }[size];

  const maxPixelWidth = {
    sm: "160px",
    md: "220px",
    lg: "280px",
    hero: "450px",
  }[size];

  const content = (
    <div
      className={`relative flex items-center justify-center ${sizeClasses}`}
      style={{ maxWidth: maxPixelWidth, width: "100%" }}
    >
      <Image
        src="/Intioss_logo_transparent.png"
        alt="INTIOSS Luxury Surfaces"
        width={1024}
        height={359}
        className="w-full h-auto object-contain"
        priority
      />
    </div>
  );

  if (asLink) {
    return (
      <Link href="/" className={`inline-flex flex-col items-center select-none transition-opacity hover:opacity-90 ${className}`}>
        {content}
      </Link>
    );
  }

  return (
    <div className={`inline-flex flex-col items-center select-none ${className}`}>
      {content}
    </div>
  );
}
