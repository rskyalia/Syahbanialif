"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/animations/gsap-config";

/**
 * Lenis smooth-scroll provider with full GSAP ScrollTrigger integration.
 *
 * Key design decisions:
 * - Uses gsap.ticker instead of requestAnimationFrame to stay in sync with GSAP
 * - lagSmoothing(0) prevents jitter on slow devices
 * - Binds single ScrollTrigger.update listener via lenis 'scroll' event
 * - Fully cleaned up on unmount — no memory leaks
 * - Respects prefers-reduced-motion
 */
export default function SmoothScroll({ children }) {
  const lenisRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // On mobile, disable smooth wheel to let native momentum scroll take over
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    const lenis = new Lenis({
      duration:         prefersReduced ? 0.4 : 1.15,
      easing:           (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation:      "vertical",
      gestureOrientation: "vertical",
      smoothWheel:      !prefersReduced,
      wheelMultiplier:  1,
      touchMultiplier:  isMobile ? 1.5 : 2,
      infinite:         false,
      autoResize:       true,   // auto-refresh on resize
    });

    lenisRef.current = lenis;

    /* Bind ScrollTrigger to Lenis scroll event */
    lenis.on("scroll", ScrollTrigger.update);

    /* Drive Lenis from GSAP ticker — single RAF loop */
    const rafCallback = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(rafCallback);
    gsap.ticker.lagSmoothing(0);

    /* Expose globally for components that need manual stop/start (e.g. modals) */
    if (typeof window !== "undefined") window.__lenis = lenis;

    return () => {
      lenis.off("scroll", ScrollTrigger.update);
      gsap.ticker.remove(rafCallback);
      lenis.destroy();
      lenisRef.current = null;
      if (typeof window !== "undefined") delete window.__lenis;
    };
  }, []);

  return <>{children}</>;
}
