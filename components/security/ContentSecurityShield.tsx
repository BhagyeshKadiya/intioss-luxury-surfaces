"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import { ShieldAlert, Lock } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

/**
 * ContentSecurityShield
 * 
 * Enterprise-grade client asset protection suite for INTIOSS:
 * - Disables context-menu / "Save Image As" on all imagery & media
 * - Blocks drag-and-drop extraction of stones, slabs, and photographs
 * - Intercepts browser save (Ctrl+S / Cmd+S), print (Ctrl+P / Cmd+P), view-source (Ctrl+U)
 * - Intercepts DevTools inspection shortcuts (F12, Ctrl+Shift+I/J/C)
 * - Detects screen-capture keys (PrintScreen, Win+Shift+S, Cmd+Shift+3/4) and blurs/shields view
 * - Provides an elegant luxury gold/maroon security notice toast
 */
export function ContentSecurityShield() {
  const [warningMessage, setWarningMessage] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const showSecurityNotice = useCallback((msg: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setWarningMessage(msg);
    timeoutRef.current = setTimeout(() => {
      setWarningMessage(null);
    }, 3200);
  }, []);

  const triggerShieldBlur = useCallback(() => {
    if (typeof document === "undefined") return;
    document.body.classList.add("content-shielded");
    setTimeout(() => {
      document.body.classList.remove("content-shielded");
    }, 1800);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // 1. Right-Click Context Menu Interception
    const handleContextMenu = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      // Allow right-click inside form inputs and textareas for accessibility & paste
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }

      e.preventDefault();
      e.stopPropagation();

      const isImageOrMedia =
        target &&
        (target.tagName === "IMG" ||
          target.tagName === "PICTURE" ||
          target.tagName === "VIDEO" ||
          target.closest("img") ||
          target.closest("[data-protected-image]") ||
          target.closest(".group"));

      if (isImageOrMedia) {
        showSecurityNotice(
          "INTIOSS Asset Protection: Direct image downloading is restricted for proprietary architectural security."
        );
      } else {
        showSecurityNotice(
          "INTIOSS Surface Protection: Content copying and media export are restricted."
        );
      }
    };

    // 2. Drag & Drop Extraction Prevention
    const handleDragStart = (e: DragEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "IMG" ||
          target.tagName === "PICTURE" ||
          target.tagName === "VIDEO" ||
          target.closest("img"))
      ) {
        e.preventDefault();
        e.stopPropagation();
        showSecurityNotice("Image dragging and external extraction are disabled.");
      }
    };

    // 3. Keyboard Shortcut Interception
    const handleKeyDown = (e: KeyboardEvent) => {
      const isCtrlOrCmd = e.ctrlKey || e.metaKey;
      const key = e.key ? e.key.toLowerCase() : "";

      // A. Screen capture keys (PrtScn / PrintScreen)
      if (e.key === "PrintScreen" || e.keyCode === 44) {
        e.preventDefault();
        triggerShieldBlur();
        showSecurityNotice(
          "Screen capture of INTIOSS architectural stone assets is protected under client confidentiality."
        );
        // Overwrite clipboard if accessible
        try {
          if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(
              "INTIOSS Luxury Surfaces — Confidential & Proprietary Architectural Asset"
            );
          }
        } catch {
          // Clipboard write silently ignored if permissions not granted
        }
        return;
      }

      // B. Win+Shift+S / Cmd+Shift+3/4 detection (Shift modifier with capture key)
      if (e.shiftKey && (e.metaKey || (isCtrlOrCmd && key === "s"))) {
        triggerShieldBlur();
        showSecurityNotice("Screen grab tools are shielded under architectural security.");
      }

      // C. Save Page (Ctrl+S / Cmd+S)
      if (isCtrlOrCmd && key === "s") {
        e.preventDefault();
        showSecurityNotice("Saving offline copies of this catalog is disabled.");
        return;
      }

      // D. Print (Ctrl+P / Cmd+P)
      if (isCtrlOrCmd && key === "p") {
        e.preventDefault();
        showSecurityNotice("Direct printing of rare stone imagery is restricted.");
        return;
      }

      // E. View Source (Ctrl+U / Cmd+U)
      if (isCtrlOrCmd && key === "u") {
        e.preventDefault();
        showSecurityNotice("Source inspection is protected.");
        return;
      }

      // F. DevTools inspection shortcuts (F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C)
      if (
        e.key === "F12" ||
        (isCtrlOrCmd && e.shiftKey && (key === "i" || key === "j" || key === "c"))
      ) {
        e.preventDefault();
        showSecurityNotice("Developer inspection tools are restricted for intellectual property protection.");
        return;
      }
    };

    // 4. Window Blur Recovery & Print Protection
    const handleWindowBlur = () => {
      // Quick shield protection with guaranteed automatic recovery
      document.body.classList.add("content-shielded");
      setTimeout(() => {
        if (typeof document !== "undefined") {
          document.body.classList.remove("content-shielded");
        }
      }, 800);
    };

    const handleWindowFocus = () => {
      document.body.classList.remove("content-shielded");
    };

    window.addEventListener("contextmenu", handleContextMenu, { capture: true });
    window.addEventListener("dragstart", handleDragStart, { capture: true });
    window.addEventListener("keydown", handleKeyDown, { capture: true });
    window.addEventListener("blur", handleWindowBlur);
    window.addEventListener("focus", handleWindowFocus);

    return () => {
      window.removeEventListener("contextmenu", handleContextMenu, { capture: true });
      window.removeEventListener("dragstart", handleDragStart, { capture: true });
      window.removeEventListener("keydown", handleKeyDown, { capture: true });
      window.removeEventListener("blur", handleWindowBlur);
      window.removeEventListener("focus", handleWindowFocus);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [showSecurityNotice, triggerShieldBlur]);

  return (
    <AnimatePresence>
      {warningMessage && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[999999] max-w-md w-[92vw] sm:w-auto pointer-events-none select-none"
        >
          <div className="flex items-center gap-3 bg-maroon-deep/95 text-ivory px-5 py-3.5 border border-gold/60 shadow-[0_10px_35px_rgba(0,0,0,0.45)] backdrop-blur-md">
            <div className="w-8 h-8 rounded-full bg-gold/15 border border-gold/40 flex items-center justify-center shrink-0">
              <ShieldAlert className="w-4 h-4 text-gold" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 text-[10px] font-montserrat uppercase tracking-[0.2em] text-gold font-semibold">
                <Lock className="w-3 h-3 text-gold" />
                <span>INTIOSS Digital Asset Protection</span>
              </div>
              <p className="font-jost text-xs text-ivory/90 mt-0.5 leading-snug">
                {warningMessage}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
