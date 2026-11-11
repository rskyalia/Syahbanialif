"use client";

import { useEffect, useRef } from "react";
import { gsap, useGSAP } from "@/animations/gsap-config";

/**
 * Preloader — cinematic entrance screen.
 * Fades out once the page is ready, then calls onComplete.
 *
 * @param {Function} onComplete — called when preloader animation finishes
 */
export default function Preloader({ onComplete }) {
  const rootRef = useRef(null);
  const barRef  = useRef(null);
  const textRef = useRef(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      const bar  = barRef.current;
      const text = textRef.current;
      if (!root || !bar || !text) return;

      const tl = gsap.timeline({
        onComplete: () => {
          if (onComplete) onComplete();
        },
      });

      // 1. Progress bar fills
      tl.fromTo(
        bar,
        { scaleX: 0 },
        { scaleX: 1, duration: 1.2, ease: "power2.inOut", transformOrigin: "left center" }
      )
      // 2. Text fades in
      .fromTo(
        text,
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
        "-=0.5"
      )
      // 3. Hold briefly
      .to({}, { duration: 0.3 })
      // 4. Everything fades out
      .to(root, {
        opacity: 0,
        duration: 0.6,
        ease: "power2.inOut",
        pointerEvents: "none",
        onComplete: () => {
          root.style.display = "none";
        },
      });
    },
    { scope: rootRef }
  );

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{ background: "var(--color-canvas)" }}
      aria-hidden="true"
    >
      {/* Logo mark */}
      <div ref={textRef} className="mb-8 opacity-0">
        <span
          className="font-display font-bold tracking-tight"
          style={{ fontSize: "2rem", color: "var(--color-ink)" }}
        >
          Alif<span style={{ color: "var(--color-mint)" }}>.</span>
        </span>
      </div>

      {/* Progress bar track */}
      <div
        className="relative overflow-hidden rounded-full"
        style={{
          width: "120px",
          height: "1px",
          background: "var(--color-border)",
        }}
      >
        <div
          ref={barRef}
          className="absolute inset-0 rounded-full"
          style={{
            background: "linear-gradient(to right, var(--color-mint), var(--color-sky))",
            transformOrigin: "left center",
            transform: "scaleX(0)",
          }}
        />
      </div>
    </div>
  );
}
