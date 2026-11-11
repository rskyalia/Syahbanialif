"use client";

import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/animations/gsap-config";

/**
 * Global scroll progress indicator.
 * 2px gradient line at top viewport that fills as user scrolls.
 *
 * Uses ScrollTrigger's onUpdate for a smooth, non-janky experience.
 * Respects prefers-reduced-motion — hidden when reduced.
 */
export default function ScrollProgress() {
  const barRef = useRef(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      bar.parentElement.style.display = "none";
      return;
    }

    const st = ScrollTrigger.create({
      start:    "top top",
      end:      "max",
      onUpdate: (self) => {
        // Use gsap.set for performance — avoids a full GSAP tween
        bar.style.transform = `scaleX(${self.progress})`;
      },
    });

    return () => st.kill();
  }, []);

  return (
    <div
      id="scroll-progress"
      aria-hidden="true"
      style={{
        position:      "fixed",
        top:           0,
        left:          0,
        right:         0,
        zIndex:        200,
        height:        "2px",
        pointerEvents: "none",
        overflow:      "hidden",
      }}
    >
      <div
        ref={barRef}
        style={{
          width:           "100%",
          height:          "100%",
          transformOrigin: "left center",
          transform:       "scaleX(0)",
          background:
            "linear-gradient(90deg, var(--color-mint) 0%, var(--color-sky) 60%, var(--color-mint) 100%)",
          boxShadow: "0 0 6px rgba(184,216,199,0.4)",
        }}
      />
    </div>
  );
}
