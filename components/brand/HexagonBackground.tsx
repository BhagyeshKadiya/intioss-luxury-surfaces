"use client";

import React, { useId, useRef, useEffect, useState, useCallback } from "react";
import { motion, useReducedMotion } from "motion/react";

interface FloatingSymbolDef {
  id: string;
  size: number;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  rotateDuration: number;
  floatDuration: number;
  floatOffset: number;
  rotateDirection: 1 | -1;
  baseOpacity: number;
  fillMaroon?: boolean;
}

interface HexagonBackgroundProps {
  theme?: "light" | "dark" | "gold";
  intensity?: "subtle" | "medium" | "prominent";
  showPattern?: boolean;
  showFloating?: boolean;
  enableSpiderEffect?: boolean;
  spiderDistance?: number;
  className?: string;
}

// Exact INTIOSS Logo Symbol Geometry Nodes (in 100x116 viewBox)
const LOGO_NODES = {
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

const outerPointsString = LOGO_NODES.outer.map((p) => `${p.x},${p.y}`).join(" ");
const innerPointsString = LOGO_NODES.inner.map((p) => `${p.x},${p.y}`).join(" ");

// Internal Diamond Lattice Lines matching exact logo symbol
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

export function HexagonBackground({
  theme = "light",
  intensity = "subtle",
  showPattern = true,
  showFloating = true,
  enableSpiderEffect = true,
  spiderDistance = 240,
  className = "",
}: HexagonBackgroundProps) {
  const patternId = useId().replace(/:/g, "_");
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [isClient, setIsClient] = useState(false);
  const [hoveredHexId, setHoveredHexId] = useState<string | null>(null);

  // References to track the exact screen positions of floating symbols for the spiderweb connector
  const symbolRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Curated layout of exact INTIOSS logo symbols positioned in the blank margins
  const floatingSymbols: FloatingSymbolDef[] =
    theme === "light"
      ? [
          {
            id: "sym-tl",
            size: 130,
            top: "10px",
            left: "2%",
            rotateDuration: 48,
            floatDuration: 7,
            floatOffset: 14,
            rotateDirection: 1,
            baseOpacity: intensity === "prominent" ? 0.35 : 0.24,
            fillMaroon: false,
          },
          {
            id: "sym-tr",
            size: 160,
            top: "40px",
            right: "2%",
            rotateDuration: 56,
            floatDuration: 8.5,
            floatOffset: -16,
            rotateDirection: -1,
            baseOpacity: intensity === "prominent" ? 0.32 : 0.22,
            fillMaroon: true,
          },
          {
            id: "sym-bl",
            size: 115,
            bottom: "35px",
            left: "4%",
            rotateDuration: 40,
            floatDuration: 6.5,
            floatOffset: 12,
            rotateDirection: -1,
            baseOpacity: intensity === "prominent" ? 0.3 : 0.2,
            fillMaroon: false,
          },
          {
            id: "sym-br",
            size: 175,
            bottom: "20px",
            right: "3%",
            rotateDuration: 62,
            floatDuration: 9,
            floatOffset: 18,
            rotateDirection: 1,
            baseOpacity: intensity === "prominent" ? 0.35 : 0.25,
            fillMaroon: true,
          },
        ]
      : [
          {
            id: "dark-sym-tl",
            size: 140,
            top: "20px",
            left: "2%",
            rotateDuration: 50,
            floatDuration: 7.5,
            floatOffset: 16,
            rotateDirection: 1,
            baseOpacity: 0.28,
            fillMaroon: true,
          },
          {
            id: "dark-sym-tr",
            size: 170,
            top: "35px",
            right: "2%",
            rotateDuration: 60,
            floatDuration: 9,
            floatOffset: -16,
            rotateDirection: -1,
            baseOpacity: 0.25,
            fillMaroon: true,
          },
          {
            id: "dark-sym-bl",
            size: 120,
            bottom: "30px",
            left: "3%",
            rotateDuration: 42,
            floatDuration: 6.8,
            floatOffset: 14,
            rotateDirection: -1,
            baseOpacity: 0.24,
            fillMaroon: false,
          },
          {
            id: "dark-sym-br",
            size: 180,
            bottom: "15px",
            right: "2%",
            rotateDuration: 68,
            floatDuration: 9.5,
            floatOffset: 18,
            rotateDirection: 1,
            baseOpacity: 0.3,
            fillMaroon: true,
          },
        ];

  // -------------------------------------------------------------
  // Interactive Canvas Spider Effect & Lighting Web System
  // -------------------------------------------------------------
  useEffect(() => {
    if (!enableSpiderEffect || shouldReduceMotion || !isClient) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let mousePos: { x: number; y: number } | null = null;

    // Handle canvas resizing to match container perfectly
    const resizeCanvas = () => {
      if (!container || !canvas) return;
      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      // Only track if mouse is near or inside container
      if (
        e.clientX >= rect.left - 100 &&
        e.clientX <= rect.right + 100 &&
        e.clientY >= rect.top - 100 &&
        e.clientY <= rect.bottom + 100
      ) {
        mousePos = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        };
      } else {
        mousePos = null;
      }
    };

    const onMouseLeave = () => {
      mousePos = null;
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);

    // Render loop for the spider web lighting
    const render = () => {
      const rect = container.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      if (mousePos) {
        const mx = mousePos.x;
        const my = mousePos.y;

        // For each floating symbol, calculate its nodes in canvas coordinates
        symbolRefs.current.forEach((el, id) => {
          if (!el) return;
          const elRect = el.getBoundingClientRect();
          const elX = elRect.left - rect.left;
          const elY = elRect.top - rect.top;
          const elW = elRect.width;
          const elH = elRect.height;

          const centerDist = Math.hypot(mx - (elX + elW / 2), my - (elY + elH / 2));

          if (centerDist < spiderDistance) {
            const proximityFactor = Math.max(0, 1 - centerDist / spiderDistance);

            // Connect spider lines to key logo vertices and facet intersection nodes
            const targetNodes = [
              ...LOGO_NODES.outer,
              ...LOGO_NODES.facets.slice(0, 5),
            ];

            targetNodes.forEach((node, nIdx) => {
              const nx = elX + (node.x / 100) * elW;
              const ny = elY + (node.y / 116) * elH;

              const nodeDist = Math.hypot(mx - nx, my - ny);
              if (nodeDist < spiderDistance * 1.1) {
                const nodeFactor = Math.max(0, 1 - nodeDist / (spiderDistance * 1.1));
                const lineAlpha = nodeFactor * proximityFactor * (theme === "light" ? 0.75 : 0.85);

                // 1. Soft Golden Spider Web Outer Glow
                ctx.beginPath();
                ctx.moveTo(mx, my);
                ctx.lineTo(nx, ny);
                ctx.strokeStyle = `rgba(221, 182, 43, ${lineAlpha * 0.45})`;
                ctx.lineWidth = 2.5;
                ctx.stroke();

                // 2. High-Voltage Brilliant Laser Filament
                ctx.beginPath();
                ctx.moveTo(mx, my);
                ctx.lineTo(nx, ny);
                ctx.strokeStyle = `rgba(255, 238, 168, ${lineAlpha})`;
                ctx.lineWidth = 1;
                ctx.stroke();

                // 3. Shimmering Spider Spark Node at the Hexagon Corner
                ctx.beginPath();
                ctx.arc(nx, ny, 2.2 * lineAlpha, 0, Math.PI * 2);
                ctx.fillStyle = "#FFFFFF";
                ctx.shadowColor = "#DDB62B";
                ctx.shadowBlur = 6;
                ctx.fill();
                ctx.shadowBlur = 0; // reset
              }
            });

            // Spark at the mouse cursor
            ctx.beginPath();
            ctx.arc(mx, my, 3 * proximityFactor, 0, Math.PI * 2);
            ctx.fillStyle = "#FFF2A8";
            ctx.shadowColor = "#DDB62B";
            ctx.shadowBlur = 10;
            ctx.fill();
            ctx.shadowBlur = 0;
          }
        });
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [enableSpiderEffect, spiderDistance, shouldReduceMotion, isClient, theme]);

  const strokeColor =
    theme === "light"
      ? "#DDB62B"
      : theme === "gold"
      ? "#F3D368"
      : "#E5C866";

  const basePatternOpacity =
    theme === "light"
      ? intensity === "subtle"
        ? 0.04
        : intensity === "medium"
        ? 0.075
        : 0.11
      : intensity === "subtle"
      ? 0.05
      : intensity === "medium"
      ? 0.09
      : 0.14;

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none overflow-hidden z-0 select-none ${className}`}
      aria-hidden="true"
    >
      {/* 1. Seamless Repeating Honeycomb Pattern with Animated Radial Ambient Fade */}
      {showPattern && (
        <div
          className="absolute inset-0 transition-opacity duration-1000"
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
                {/* Seamless Hexagon Grid Matching INTIOSS Orientation */}
                <path
                  d="M28 0 L56 16.17 L56 48.5 L28 64.67 L0 48.5 L0 16.17 Z"
                  fill="none"
                  stroke={strokeColor}
                  strokeWidth="0.85"
                  strokeLinecap="round"
                />
                <path
                  d="M28 97 L56 113.17 L56 145.5 L28 161.67 L0 145.5 L0 113.17 Z"
                  fill="none"
                  stroke={strokeColor}
                  strokeWidth="0.85"
                  strokeLinecap="round"
                />
                <path
                  d="M56 48.5 L84 64.67 L84 97 L56 113.17 L28 97 L28 64.67 Z"
                  fill="none"
                  stroke={strokeColor}
                  strokeWidth="0.85"
                  strokeLinecap="round"
                />
                <path
                  d="M0 48.5 L28 64.67 L28 97 L0 113.17 L-28 97 L-28 64.67 Z"
                  fill="none"
                  stroke={strokeColor}
                  strokeWidth="0.85"
                  strokeLinecap="round"
                />

                {/* Subtle center nodes */}
                <circle cx="28" cy="32.33" r="1.1" fill={strokeColor} fillOpacity="0.6" />
                <circle cx="56" cy="80.83" r="1.1" fill={strokeColor} fillOpacity="0.6" />
                <circle cx="0" cy="80.83" r="1.1" fill={strokeColor} fillOpacity="0.6" />
              </pattern>

              <radialGradient id={`radial-mask-${patternId}`} cx="50%" cy="50%" r="55%">
                <stop offset="0%" stopColor="#fff" stopOpacity={theme === "light" ? "0.3" : "0.5"} />
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

          {/* Micro-shimmer wave */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/5 to-transparent animate-pulse pointer-events-none"
            style={{ animationDuration: "10s" }}
          />
        </div>
      )}

      {/* 2. Interactive Canvas for Spider Web Lightning Lines */}
      {enableSpiderEffect && isClient && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-10"
        />
      )}

      {/* 3. Floating EXACT INTIOSS Logo Symbols with Lighting & Spider Hover Effect */}
      {showFloating && isClient && (
        <div className="absolute inset-0 overflow-hidden">
          {floatingSymbols.map((sym, idx) => {
            const isHovered = hoveredHexId === sym.id;
            const clipId = `clip-${sym.id}-${patternId}`;

            return (
              <motion.div
                key={sym.id}
                ref={(el) => {
                  if (el) symbolRefs.current.set(sym.id, el);
                  else symbolRefs.current.delete(sym.id);
                }}
                onMouseEnter={() => setHoveredHexId(sym.id)}
                onMouseLeave={() => setHoveredHexId(null)}
                className="absolute pointer-events-auto cursor-pointer"
                style={{
                  top: sym.top,
                  bottom: sym.bottom,
                  left: sym.left,
                  right: sym.right,
                  width: sym.size,
                  height: (sym.size * 116) / 100,
                  opacity: isHovered ? 0.95 : sym.baseOpacity,
                  transition: "opacity 0.4s ease",
                }}
              >
                {/* Levitation / Float Layer */}
                <motion.div
                  animate={
                    shouldReduceMotion
                      ? undefined
                      : {
                          y: [0, sym.floatOffset, 0],
                          x: [0, sym.floatOffset * 0.35, 0],
                        }
                  }
                  transition={{
                    duration: sym.floatDuration,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: idx * 0.9,
                  }}
                  className="w-full h-full"
                >
                  {/* Slow Infinite Architectural Rotation */}
                  <motion.div
                    animate={
                      shouldReduceMotion
                        ? undefined
                        : {
                            rotate: sym.rotateDirection === 1 ? [0, 360] : [0, -360],
                          }
                    }
                    transition={{
                      duration: sym.rotateDuration,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="w-full h-full flex items-center justify-center origin-center"
                  >
                    {/* Glowing Lighting Aura behind symbol on hover */}
                    <div
                      className={`absolute inset-0 rounded-full blur-xl pointer-events-none transition-all duration-500 ${
                        isHovered
                          ? "bg-gold/40 scale-125 opacity-100"
                          : "bg-gold/0 scale-90 opacity-0"
                      }`}
                    />

                    {/* Exact INTIOSS Logo Symbol Vector Artwork */}
                    <svg
                      viewBox="0 0 100 116"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className={`w-full h-full transition-all duration-300 ${
                        isHovered ? "scale-105" : "scale-100"
                      }`}
                      style={{
                        filter: isHovered
                          ? "drop-shadow(0 0 14px rgba(221, 182, 43, 0.85)) drop-shadow(0 0 28px rgba(221, 182, 43, 0.5))"
                          : "drop-shadow(0 4px 14px rgba(221, 182, 43, 0.2))",
                      }}
                    >
                      <defs>
                        <linearGradient
                          id={`gold-rim-${sym.id}-${patternId}`}
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="100%"
                        >
                          <stop offset="0%" stopColor="#F9E28C" />
                          <stop offset="35%" stopColor="#DDB62B" />
                          <stop offset="70%" stopColor="#B38A18" />
                          <stop offset="100%" stopColor="#F3D368" />
                        </linearGradient>

                        <clipPath id={clipId}>
                          <polygon points={innerPointsString} />
                        </clipPath>
                      </defs>

                      {/* 1. Outer Hexagon Rim (Exact Logo Gold Rim) */}
                      <polygon
                        points={outerPointsString}
                        fill={`url(#gold-rim-${sym.id}-${patternId})`}
                        stroke={strokeColor}
                        strokeWidth="1.4"
                        strokeLinejoin="round"
                      />

                      {/* 2. Inner Hexagon Body (Maroon or Dark Luxury) */}
                      <polygon
                        points={innerPointsString}
                        fill={
                          sym.fillMaroon
                            ? isHovered
                              ? "#560E1B"
                              : "#3E0C15"
                            : theme === "light"
                            ? isHovered
                              ? "#FDF8ED"
                              : "#FAF8F5"
                            : isHovered
                            ? "#4D0F1B"
                            : "#2A070E"
                        }
                        stroke={strokeColor}
                        strokeWidth="1.1"
                        strokeLinejoin="round"
                        className="transition-colors duration-300"
                      />

                      {/* 3. Internal Diamond Facet Lattice (Exact INTIOSS Rhombus Geometry) */}
                      <g clipPath={`url(#${clipId})`}>
                        {DIAGONAL_FACET_LINES.map((line, lIdx) => (
                          <line
                            key={lIdx}
                            x1={line.x1}
                            y1={line.y1}
                            x2={line.x2}
                            y2={line.y2}
                            stroke={isHovered ? "#FFEAA7" : strokeColor}
                            strokeWidth={isHovered ? 1.6 : 0.9}
                            strokeOpacity={isHovered ? 0.95 : 0.75}
                            strokeLinecap="round"
                            className="transition-all duration-300"
                          />
                        ))}

                        {/* Running Laser Lighting Surge across Facets on Hover */}
                        {isHovered && (
                          <g className="animate-pulse" style={{ animationDuration: "1.1s" }}>
                            {DIAGONAL_FACET_LINES.map((line, lIdx) => (
                              <line
                                key={`pulse-${lIdx}`}
                                x1={line.x1}
                                y1={line.y1}
                                x2={line.x2}
                                y2={line.y2}
                                stroke="#FFFFFF"
                                strokeWidth="1.4"
                                strokeDasharray="14 30"
                                className="animate-dash"
                                strokeLinecap="round"
                                opacity={0.85}
                              />
                            ))}
                          </g>
                        )}

                        {/* Diamond Facet Nodes */}
                        {LOGO_NODES.facets.map((node, nodeIdx) => (
                          <circle
                            key={nodeIdx}
                            cx={node.x}
                            cy={node.y}
                            r={isHovered ? 2 : 1.2}
                            fill={isHovered ? "#FFFFFF" : strokeColor}
                            className="transition-all duration-200"
                            style={{
                              filter: isHovered ? "drop-shadow(0 0 3px #FFFFFF)" : undefined,
                            }}
                          />
                        ))}
                      </g>

                      {/* 4. Outer Laser Perimeter Lighting Tracer on Hover */}
                      {isHovered && (
                        <polygon
                          points={outerPointsString}
                          fill="none"
                          stroke="#FFF8C4"
                          strokeWidth="2.2"
                          strokeDasharray="20 50"
                          strokeLinecap="round"
                          style={{
                            filter: "drop-shadow(0 0 6px #FFFFFF)",
                          }}
                        />
                      )}
                    </svg>
                  </motion.div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
