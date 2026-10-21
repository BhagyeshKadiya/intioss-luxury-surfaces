"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Placeholder } from "@/components/ui/Placeholder";
import { ArrowLeft, Monitor, Smartphone, Sun, Moon, ArrowDown } from "lucide-react";

interface LogoOption {
  id: string;
  title: string;
  description: string;
  technique: string;
  whyItWorks: string;
}

const OPTIONS: LogoOption[] = [
  {
    id: "option-1",
    title: "Option 1: Integrated Header with Editorial Gradient Scrim",
    description: "The logo sits directly inside the top header, protected by a delicate top-to-bottom dark gradient scrim. The center hero photograph remains 100% open and unobstructed.",
    technique: "Subtle linear gradient scrim (rgba(20, 8, 14, 0.7) -> transparent) across the top 140px. No box, no frosted plinth. Material veining stays completely hero.",
    whyItWorks: "Maximum architectural purity. The stone is uninterrupted across 90% of the viewport. Tagline sits gracefully below center.",
  },
  {
    id: "option-2",
    title: "Option 2: Zero-Box Centered Floating Hallmark",
    description: "The logo floats centered over the photograph with zero container box. Contrast is achieved via a subtle directional backlight drop-shadow and ambient contrast bloom.",
    technique: "Direct transparent rendering with soft drop-shadow (rgba(0,0,0,0.7) blur 24px) plus radial background vignette. No visible rectangle edges.",
    whyItWorks: "Retains the classic central brand presence of luxury houses without the heavy 'patch' or frosted plinth box that obscure the stone.",
  },
  {
    id: "option-3",
    title: "Option 3: Top-Left Architectural Hallmark",
    description: "The brand mark is anchored at the top-left like an architect's hallmark on blueprints, paired with a right-aligned luxury menu.",
    technique: "Corner anchor with local radial scrim. Leaves the entire center and right field open for high-impact panoramic stone view.",
    whyItWorks: "Contemporary European gallery aesthetic. Very clean, leaves zero visual footprint in the center field.",
  },
  {
    id: "option-4",
    title: "Option 4: Dual-Tone Adaptive Header with Dynamic Contrast",
    description: "A responsive header that pairs the logo with an intelligent dual-gradient layer, maintaining WCAG AA contrast across white marbles and dark gem walls.",
    technique: "Multi-stop subtle scrim (rgba(20,8,14,0.65) to transparent) that seamlessly blends on both light Statuario and deep Tiger Eye.",
    whyItWorks: "Guarantees crystal-clear legibility on all 8 rotating hero slides without altering or covering the natural stone patterns.",
  },
];

const PHOTOS = [
  {
    id: "light",
    label: "Light Marble (Golden Statuario)",
    src: "/hero/Intioss_Golden-Statuario_Bathroom-Wall-Cladding_04.webp",
  },
  {
    id: "dark",
    label: "Dark Gemstone (Tiger Eye)",
    src: "/hero/Intioss_Tiger-Eye_Entrance-Feature-Wall_04.webp",
  },
];

export function LogoOptionsClient() {
  const [selectedOption, setSelectedOption] = useState<string>("option-1");
  const [selectedPhoto, setSelectedPhoto] = useState<string>("light");
  const [deviceView, setDeviceView] = useState<"desktop" | "phone">("desktop");
  const [scrollState, setScrollState] = useState<"initial" | "scrolled">("initial");

  const currentOption = OPTIONS.find((o) => o.id === selectedOption) || OPTIONS[0];
  const currentPhoto = PHOTOS.find((p) => p.id === selectedPhoto) || PHOTOS[0];

  return (
    <div className="min-h-screen bg-paper text-maroon p-4 sm:p-8 font-sans">
      {/* Top Bar */}
      <div className="max-w-7xl mx-auto mb-8 border-b border-maroon/10 pb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-montserrat uppercase tracking-widest text-grey hover:text-maroon mb-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Live Draft
            </Link>
            <h1 className="font-marcellus text-2xl sm:text-4xl text-maroon">
              Hero Logo Placement Proposals (Draft 4)
            </h1>
            <p className="font-jost text-sm text-grey mt-1">
              Internal review route for INTIOSS directors · Evaluating 4 non-box placement techniques.
            </p>
          </div>

          <div className="flex flex-col sm:items-end gap-2">
            <Placeholder
              kind="LOGO — vector needed"
              label="[LOGO — vector needed]"
              className="bg-gold/10 border-gold text-maroon"
            >
              <span className="text-[10px] text-grey-dark max-w-xs block text-left sm:text-right">
                Currently using authentic PNG. Vector SVG (`LOGO.pdf` or `.svg`) requested from INTIOSS for distortion-free sharpness.
              </span>
            </Placeholder>
          </div>
        </div>

        {/* Global Controls */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          {/* Photo Switcher */}
          <div className="inline-flex items-center p-1 bg-stone-200/80 rounded-lg text-xs">
            <button
              type="button"
              onClick={() => setSelectedPhoto("light")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-montserrat text-xs transition-all ${
                selectedPhoto === "light" ? "bg-white text-maroon shadow-sm" : "text-grey hover:text-maroon"
              }`}
            >
              <Sun className="w-3.5 h-3.5" /> Light Photo
            </button>
            <button
              type="button"
              onClick={() => setSelectedPhoto("dark")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-montserrat text-xs transition-all ${
                selectedPhoto === "dark" ? "bg-maroon-deep text-ivory shadow-sm" : "text-grey hover:text-maroon"
              }`}
            >
              <Moon className="w-3.5 h-3.5" /> Dark Photo
            </button>
          </div>

          {/* Viewport Switcher */}
          <div className="inline-flex items-center p-1 bg-stone-200/80 rounded-lg text-xs">
            <button
              type="button"
              onClick={() => setDeviceView("desktop")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-montserrat text-xs transition-all ${
                deviceView === "desktop" ? "bg-white text-maroon shadow-sm" : "text-grey hover:text-maroon"
              }`}
            >
              <Monitor className="w-3.5 h-3.5" /> Desktop (1440px)
            </button>
            <button
              type="button"
              onClick={() => setDeviceView("phone")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-montserrat text-xs transition-all ${
                deviceView === "phone" ? "bg-white text-maroon shadow-sm" : "text-grey hover:text-maroon"
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" /> Phone (390px)
            </button>
          </div>

          {/* Scroll State Switcher */}
          <div className="inline-flex items-center p-1 bg-stone-200/80 rounded-lg text-xs">
            <button
              type="button"
              onClick={() => setScrollState("initial")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-montserrat text-xs transition-all ${
                scrollState === "initial" ? "bg-white text-maroon shadow-sm" : "text-grey hover:text-maroon"
              }`}
            >
              Initial Hero State
            </button>
            <button
              type="button"
              onClick={() => setScrollState("scrolled")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-montserrat text-xs transition-all ${
                scrollState === "scrolled" ? "bg-maroon text-ivory shadow-sm" : "text-grey hover:text-maroon"
              }`}
            >
              <ArrowDown className="w-3.5 h-3.5" /> Scrolled Sticky State
            </button>
          </div>
        </div>
      </div>

      {/* Option Selector Tabs */}
      <div className="max-w-7xl mx-auto mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {OPTIONS.map((opt) => (
          <button
            key={opt.id}
            type="button"
            onClick={() => setSelectedOption(opt.id)}
            className={`p-4 text-left rounded-xl border transition-all ${
              selectedOption === opt.id
                ? "border-maroon bg-white shadow-md ring-2 ring-gold/40"
                : "border-maroon/15 bg-paper-warm hover:bg-white"
            }`}
          >
            <div className="font-montserrat text-xs font-semibold uppercase tracking-wider text-gold mb-1">
              {opt.id.replace("-", " ").toUpperCase()}
            </div>
            <div className="font-marcellus text-base text-maroon font-medium mb-1">
              {opt.title.split(":")[1]?.trim() || opt.title}
            </div>
            <p className="font-jost text-xs text-grey line-clamp-2">
              {opt.description}
            </p>
          </button>
        ))}
      </div>

      {/* Active Proposal Details */}
      <div className="max-w-7xl mx-auto mb-6 p-4 sm:p-6 bg-white rounded-xl border border-maroon/10 shadow-sm">
        <h2 className="font-marcellus text-xl text-maroon mb-2">{currentOption.title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-jost text-grey-dark">
          <div>
            <strong className="block text-maroon uppercase tracking-wider font-montserrat mb-1">
              Core Concept
            </strong>
            {currentOption.description}
          </div>
          <div>
            <strong className="block text-maroon uppercase tracking-wider font-montserrat mb-1">
              Technique (No Center Box)
            </strong>
            {currentOption.technique}
          </div>
          <div>
            <strong className="block text-maroon uppercase tracking-wider font-montserrat mb-1">
              Why the Material Stays Hero
            </strong>
            {currentOption.whyItWorks}
          </div>
        </div>
      </div>

      {/* Interactive Mockup Canvas */}
      <div className="max-w-7xl mx-auto flex justify-center pb-16">
        <div
          className={`relative overflow-hidden transition-all duration-500 shadow-2xl rounded-2xl border border-stone-300 ${
            deviceView === "desktop"
              ? "w-full h-[620px]"
              : "w-[390px] h-[780px]"
          }`}
        >
          {/* Background Stone Photograph */}
          <Image
            src={currentPhoto.src}
            alt={currentPhoto.label}
            fill
            className="object-cover select-none"
            priority
          />

          {/* Option-Specific Scrim Overlays & Layouts */}

          {/* OPTION 1: Integrated Header with Top Scrim */}
          {selectedOption === "option-1" && (
            <>
              {/* Top Gradient Scrim */}
              <div
                className="absolute inset-x-0 top-0 h-40 pointer-events-none transition-all duration-300"
                style={{
                  background:
                    scrollState === "scrolled"
                      ? "rgba(48, 12, 22, 0.95)"
                      : "linear-gradient(180deg, rgba(20, 8, 14, 0.72) 0%, rgba(20, 8, 14, 0) 100%)",
                }}
              />

              {/* Header Bar */}
              <header
                className={`absolute inset-x-0 top-0 z-30 px-6 sm:px-12 flex items-center justify-between transition-all duration-300 ${
                  scrollState === "scrolled"
                    ? "py-3 bg-maroon-deep/95 backdrop-blur-md border-b border-gold/30 shadow-lg"
                    : "py-6"
                }`}
              >
                <div className="relative w-36 sm:w-48 h-10">
                  <Image
                    src="/Intioss_logo_transparent.png"
                    alt="INTIOSS Logo"
                    fill
                    className="object-contain filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
                    style={{ filter: "brightness(0) invert(1)" }}
                  />
                </div>

                <nav className="flex items-center gap-6 text-ivory text-xs font-montserrat uppercase tracking-widest">
                  <span className="hover:text-gold cursor-pointer">Products</span>
                  <span className="hover:text-gold cursor-pointer">Services</span>
                  <span className="hover:text-gold cursor-pointer">About</span>
                  <span className="hover:text-gold cursor-pointer">Contact</span>
                </nav>
              </header>

              {/* Center Tagline (Hero Pure Material) */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-20">
                <p
                  style={{ fontSynthesis: "none" }}
                  className="font-marcellus font-normal text-lg sm:text-2xl tracking-[0.08em] text-ivory drop-shadow-[0_2px_14px_rgba(0,0,0,0.95)] max-w-xl"
                >
                  Breathtaking Stones for the Discerning Few
                </p>
                <span className="mt-3 text-[10px] uppercase font-montserrat tracking-[0.25em] text-gold/80">
                  Zero Center Box · Material 100% Hero
                </span>
              </div>
            </>
          )}

          {/* OPTION 2: Minimalist Centered Floating Hallmark (No Box) */}
          {selectedOption === "option-2" && (
            <>
              {/* Subtle Ambient Vignette */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse at center, rgba(20, 8, 14, 0.25) 0%, rgba(20, 8, 14, 0.65) 100%)",
                }}
              />

              {/* Top Navigation */}
              <header className="absolute inset-x-0 top-0 z-30 px-6 sm:px-12 py-5 flex items-center justify-between text-ivory text-xs font-montserrat uppercase tracking-widest">
                <span className="text-gold/90 font-medium">INTIOSS</span>
                <nav className="flex items-center gap-6">
                  <span>Products</span>
                  <span>Services</span>
                </nav>
              </header>

              {/* Center Floating Logo with Soft Radial Glow (NO BOX) */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-20">
                <div
                  className={`relative transition-all duration-500 ${
                    scrollState === "scrolled"
                      ? "opacity-0 -translate-y-8"
                      : "opacity-100 translate-y-0"
                  }`}
                >
                  <div className="relative w-64 sm:w-80 h-20 mb-4 mx-auto">
                    <Image
                      src="/Intioss_logo_transparent.png"
                      alt="INTIOSS Logo"
                      fill
                      className="object-contain drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]"
                    />
                  </div>
                  <p
                    style={{ fontSynthesis: "none" }}
                    className="font-marcellus font-normal text-base sm:text-xl tracking-[0.08em] text-ivory drop-shadow-[0_2px_14px_rgba(0,0,0,0.95)]"
                  >
                    Breathtaking Stones for the Discerning Few
                  </p>
                </div>

                {scrollState === "scrolled" && (
                  <div className="p-3 bg-maroon-deep/80 backdrop-blur-md rounded-lg text-xs text-gold">
                    In scrolled state, the center floating logo smoothly transitions to docked header.
                  </div>
                )}
              </div>
            </>
          )}

          {/* OPTION 3: Top-Left Architectural Hallmark */}
          {selectedOption === "option-3" && (
            <>
              {/* Corner Radial Scrim */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(20, 8, 14, 0.75) 0%, rgba(20, 8, 14, 0) 55%)",
                }}
              />

              {/* Architectural Top-Left Brand Anchor */}
              <div className="absolute top-6 left-6 sm:left-12 z-30">
                <div className="relative w-40 sm:w-56 h-12">
                  <Image
                    src="/Intioss_logo_transparent.png"
                    alt="INTIOSS Logo"
                    fill
                    className="object-contain filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
                    style={{ filter: "brightness(0) invert(1)" }}
                  />
                </div>
                <div className="mt-1 h-[1px] w-16 bg-gold/70" />
              </div>

              {/* Top-Right Menu */}
              <nav className="absolute top-8 right-6 sm:right-12 z-30 flex items-center gap-6 text-ivory text-xs font-montserrat uppercase tracking-widest drop-shadow-md">
                <span className="hover:text-gold cursor-pointer">Products</span>
                <span className="hover:text-gold cursor-pointer">Services</span>
                <span className="hover:text-gold cursor-pointer">Contact</span>
              </nav>

              {/* Lower Third Tagline */}
              <div className="absolute bottom-16 inset-x-0 flex flex-col items-center text-center px-4 z-20">
                <p
                  style={{ fontSynthesis: "none" }}
                  className="font-marcellus font-normal text-lg sm:text-2xl tracking-[0.08em] text-ivory drop-shadow-[0_2px_14px_rgba(0,0,0,0.95)] max-w-xl"
                >
                  Breathtaking Stones for the Discerning Few
                </p>
              </div>
            </>
          )}

          {/* OPTION 4: Dual-Tone Adaptive Header */}
          {selectedOption === "option-4" && (
            <>
              {/* Dual-Tone Adaptive Top & Bottom Soft Scrim */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(20, 8, 14, 0.68) 0%, rgba(20, 8, 14, 0.15) 40%, rgba(20, 8, 14, 0.72) 100%)",
                }}
              />

              {/* Top Nav with Adaptive Center Crest */}
              <header className="absolute inset-x-0 top-0 z-30 px-6 sm:px-12 py-5 flex items-center justify-between border-b border-white/10 backdrop-blur-sm bg-black/15">
                <span className="text-[11px] font-montserrat uppercase tracking-widest text-ivory/80">
                  Luxury Surfaces
                </span>

                <div className="relative w-44 sm:w-56 h-10">
                  <Image
                    src="/Intioss_logo_transparent.png"
                    alt="INTIOSS Logo"
                    fill
                    className="object-contain filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
                    style={{ filter: "brightness(0) invert(1)" }}
                  />
                </div>

                <span className="text-[11px] font-montserrat uppercase tracking-widest text-gold cursor-pointer">
                  Menu
                </span>
              </header>

              {/* Center Tagline */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-20">
                <p
                  style={{ fontSynthesis: "none" }}
                  className="font-marcellus font-normal text-lg sm:text-2xl tracking-[0.08em] text-ivory drop-shadow-[0_2px_14px_rgba(0,0,0,0.95)] max-w-xl"
                >
                  Breathtaking Stones for the Discerning Few
                </p>
                <div className="mt-4 flex items-center gap-2">
                  <span className="h-px w-6 bg-gold/60" />
                  <span className="font-montserrat text-[10px] tracking-[0.3em] uppercase text-ivory/70">
                    Dual-Tone Scrim Engine
                  </span>
                  <span className="h-px w-6 bg-gold/60" />
                </div>
              </div>
            </>
          )}

          {/* Current Live Comparison Watermark */}
          <div className="absolute bottom-3 right-3 z-30 px-2 py-1 bg-black/70 backdrop-blur-md rounded text-[10px] font-mono text-ivory/80">
            Preview Mode · {selectedPhoto === "light" ? "Light Stone" : "Dark Stone"} · {deviceView}
          </div>
        </div>
      </div>
    </div>
  );
}
