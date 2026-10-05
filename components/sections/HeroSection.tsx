"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from "motion/react";
import { Volume2, VolumeX } from "lucide-react";
import { IntiossLogo } from "@/components/brand/IntiossLogo";

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [imageIndex, setImageIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const userManuallyPaused = useRef(false);
  const isOutOfHero = useRef(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const images = [
    "/hero/Intioss_Golden-Statuario_Bathroom-Wall-Cladding_04.png",
    "/hero/Intioss_Golden-Statuario_Living-Room-Flooring_03.png",
    "/hero/Intioss_Ice-Berg_Kitchen-Countertop-Backsplash_05.png",
    "/hero/Intioss_Michael-Angelo_Bathroom-Wall-Cladding_04.png",
    "/hero/Intioss_Petrified-Wood-Mosaic_Dining-Table-Top_04.png",
    "/hero/Intioss_Tiger-Eye_Entrance-Feature-Wall_04.png",
    "/hero/intioss_use_case.png",
    "/hero/Intioss_White-Travertine_Dining-Table-Top_05.png"
  ];

  const pathname = usePathname();
  const { scrollY } = useScroll();

  // Scroll morph: as user scrolls 0 to 60vh (approx 0 to 500px), logo shrinks and travels up into navbar position
  const logoScale = useTransform(scrollY, [0, 400], [1, 0.4]);
  const logoY = useTransform(scrollY, [0, 400], [0, -180]);
  const wordmarkOpacity = useTransform(scrollY, [0, 250], [1, 0]);
  const taglineOpacity = useTransform(scrollY, [0, 180], [1, 0]);
  const scrollCueOpacity = useTransform(scrollY, [0, 120], [1, 0]);

  const handlePrevImage = useCallback(() => {
    if (images.length > 0) {
      setImageIndex((prev) => (prev - 1 + images.length) % images.length);
    }
  }, [images.length]);

  const handleNextImage = useCallback(() => {
    if (images.length > 0) {
      setImageIndex((prev) => (prev + 1) % images.length);
    }
  }, [images.length]);

  useEffect(() => {
    if (images.length <= 1) return;

    timerRef.current = setTimeout(() => {
      handleNextImage();
    }, 5500); // 5.5 seconds per image

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [imageIndex, handleNextImage, images.length]);

  // Stop ambient music
  const stopAudio = useCallback(() => {
    if (audioRef.current && !audioRef.current.paused) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, []);

  // Play ambient music
  const playAudio = useCallback(() => {
    if (!audioRef.current || userManuallyPaused.current || isOutOfHero.current) return;
    audioRef.current.volume = 0.45;
    audioRef.current
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => {
        setIsPlaying(false);
      });
  }, []);

  // Initialize music & handle first user interaction
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Attempt initial playback
    playAudio();

    // Browser policy fallback: start music on first user gesture
    const handleFirstGesture = () => {
      if (!userManuallyPaused.current && !isOutOfHero.current) {
        playAudio();
      }
      window.removeEventListener("click", handleFirstGesture);
      window.removeEventListener("touchstart", handleFirstGesture);
      window.removeEventListener("keydown", handleFirstGesture);
    };

    window.addEventListener("click", handleFirstGesture, { passive: true });
    window.addEventListener("touchstart", handleFirstGesture, { passive: true });
    window.addEventListener("keydown", handleFirstGesture, { passive: true });

    // Handle tab visibility changes (pause when switching tab)
    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopAudio();
      } else if (!isOutOfHero.current && !userManuallyPaused.current) {
        playAudio();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // On unmount (e.g. navigating to another page): STOP MUSIC IMMEDIATELY
    return () => {
      window.removeEventListener("click", handleFirstGesture);
      window.removeEventListener("touchstart", handleFirstGesture);
      window.removeEventListener("keydown", handleFirstGesture);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };
  }, [playAudio, stopAudio]);

  // Stop music when navigating to another route
  useEffect(() => {
    if (pathname !== "/") {
      stopAudio();
    }
  }, [pathname, stopAudio]);

  // Monitor scroll: stop audio when scrolled past Hero (> 400px), resume when back at top
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 400) {
      if (!isOutOfHero.current) {
        isOutOfHero.current = true;
        stopAudio();
      }
    } else if (latest < 200) {
      if (isOutOfHero.current) {
        isOutOfHero.current = false;
        if (!userManuallyPaused.current) {
          playAudio();
        }
      }
    }
  });

  // Manual Toggle button click handler
  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!audioRef.current) return;

    if (isPlaying) {
      userManuallyPaused.current = true;
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      userManuallyPaused.current = false;
      audioRef.current.volume = 0.45;
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(console.error);
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[100svh] min-h-[640px] flex items-center justify-center overflow-hidden bg-maroon-deep select-none touch-pan-y"
    >
      {/* Background Classical Violin Audio (stops automatically on scroll or route change) */}
      <audio
        ref={audioRef}
        src="/nastelbom-violin-299793.mp3"
        loop
        preload="auto"
      />

      {/* Top App Story Progress Indicators (Instagram / Luxury App Style) */}
      <div className="absolute top-20 sm:top-24 left-4 right-4 z-30 flex items-center gap-1.5 max-w-md mx-auto pointer-events-auto">
        {images.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setImageIndex(idx)}
            aria-label={`Jump to slide ${idx + 1}`}
            className="flex-1 h-1 rounded-full bg-white/25 overflow-hidden transition-all duration-300 relative focus:outline-none"
          >
            {idx === imageIndex ? (
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 5.5, ease: "linear" }}
                className="h-full bg-gold shadow-[0_0_8px_#DDB62B]"
              />
            ) : idx < imageIndex ? (
              <div className="h-full w-full bg-gold/70" />
            ) : (
              <div className="h-full w-0 bg-transparent" />
            )}
          </button>
        ))}
      </div>

      {/* Background Cinematic Image Sequence with Swipe Gesture */}
      <AnimatePresence mode="popLayout">
        {images.length > 0 && (
          <motion.img
            key={images[imageIndex]}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, info) => {
              if (info.offset.x < -40) {
                handleNextImage();
              } else if (info.offset.x > 40) {
                handlePrevImage();
              }
            }}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ 
              opacity: { duration: 1.5, ease: "easeInOut" },
              scale: { duration: 7.5, ease: "easeOut" }
            }}
            src={images[imageIndex]}
            alt="Intioss Luxury Surfaces"
            className="absolute inset-0 w-full h-full object-cover z-0 cursor-grab active:cursor-grabbing"
          />
        )}
      </AnimatePresence>

      {/* Scrim Overlay: Maroon-deep to transparent scrim */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(48, 12, 22, 0.5) 0%, rgba(48, 12, 22, 0.35) 45%, rgba(48, 12, 22, 0.8) 100%)",
        }}
      />

      {/* Center Hero Logo with Scroll Morph */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center px-4 max-w-5xl mx-auto">
        <motion.div
          style={{
            scale: logoScale,
            y: logoY,
          }}
          className="flex flex-col items-center"
        >
          {/* Main Logo Container */}
          <div className="flex flex-col items-center">
            <IntiossLogo size="hero" asLink={false} />
          </div>
        </motion.div>

        {/* Beneath Logo: One line in Raleway, tracked: "Sourcing · Processing · Fitting" */}
        <motion.div
          style={{ opacity: taglineOpacity }}
          className="mt-5 md:mt-8 font-raleway font-light uppercase tracking-[0.25em] sm:tracking-[0.3em] text-gold/90 text-xs sm:text-sm"
        >
          Sourcing &nbsp;·&nbsp; Processing &nbsp;·&nbsp; Fitting
        </motion.div>

        {/* Mobile Swipe Hint Pill */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="sm:hidden mt-4 inline-flex items-center gap-2 px-3 py-1 bg-maroon-deep/60 backdrop-blur-md rounded-full border border-gold/30 text-[10px] font-montserrat uppercase tracking-wider text-ivory/80"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
          <span>Slide {imageIndex + 1} / {images.length} · Swipe to explore</span>
        </motion.div>
      </div>

      {/* Luxury Sound Controller (bottom-left / top-right adaptive) */}
      <motion.div
        style={{ opacity: scrollCueOpacity }}
        className="absolute bottom-20 sm:bottom-8 left-4 sm:left-10 z-20 flex items-center gap-2"
      >
        <button
          type="button"
          onClick={toggleSound}
          aria-label={isPlaying ? "Mute ambient music" : "Play ambient music"}
          className="group flex items-center gap-2 px-3 py-1.5 bg-maroon-deep/80 hover:bg-maroon-deep/95 border border-gold/40 hover:border-gold text-ivory/90 hover:text-gold transition-all duration-300 backdrop-blur-xl shadow-lg rounded-full cursor-pointer active:scale-90"
        >
          {isPlaying ? (
            <Volume2 className="w-3.5 h-3.5 text-gold animate-pulse" />
          ) : (
            <VolumeX className="w-3.5 h-3.5 text-ivory/60 group-hover:text-gold transition-colors" />
          )}

          {/* Equalizer animation bars when playing */}
          <div className="flex items-end gap-0.5 h-3 w-3">
            <span
              className={`w-0.5 bg-gold rounded-full transition-all duration-300 ${
                isPlaying ? "h-full animate-pulse" : "h-1 bg-ivory/40"
              }`}
            />
            <span
              className={`w-0.5 bg-gold rounded-full transition-all duration-300 ${
                isPlaying ? "h-2/3 animate-pulse" : "h-1.5 bg-ivory/40"
              }`}
            />
            <span
              className={`w-0.5 bg-gold rounded-full transition-all duration-300 ${
                isPlaying ? "h-5/6 animate-pulse" : "h-1 bg-ivory/40"
              }`}
            />
          </div>

          <span className="font-raleway text-[9px] uppercase tracking-[0.2em] font-medium text-ivory/80 group-hover:text-gold transition-colors">
            {isPlaying ? "Sound On" : "Sound"}
          </span>
        </button>
      </motion.div>

      {/* Minimal Scroll Cue: Pulsing Gold Indicator (hidden on small mobile to avoid dock collision) */}
      <motion.div
        style={{ opacity: scrollCueOpacity }}
        className="hidden sm:flex absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex-col items-center gap-2 pointer-events-none"
      >
        <span className="font-raleway text-[9px] uppercase tracking-[0.3em] text-ivory/60">
          Scroll
        </span>
        <div className="w-[1px] h-10 bg-white/20 relative overflow-hidden">
          <motion.div
            animate={{
              y: ["-100%", "100%"],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-full h-1/2 bg-gold"
          />
        </div>
      </motion.div>
    </section>
  );
}

