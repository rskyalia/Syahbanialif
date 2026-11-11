"use client";

import { useState, useEffect } from "react";

/**
 * Tracks vertical scroll position and whether user has scrolled past a threshold.
 *
 * Compatible with Lenis smooth scroll — listens to both native `scroll`
 * and the Lenis instance exposed at `window.__lenis` when available.
 *
 * @param {number} threshold - Scroll offset in px to consider "scrolled" (default 50)
 * @returns {{ scrollY: number, isScrolled: boolean, direction: "up"|"down"|null }}
 */
export function useScrollPosition(threshold = 50) {
  const [scrollY,    setScrollY]    = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [direction,  setDirection]  = useState(null);
  const [prevY,      setPrevY]      = useState(0);

  useEffect(() => {
    let rafId = null;

    function update(y) {
      setScrollY(y);
      setIsScrolled(y > threshold);
      setDirection(y > prevY ? "down" : y < prevY ? "up" : null);
      setPrevY(y);
    }

    // Native scroll listener — fires for both Lenis and fallback
    function handleScroll() {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => update(window.scrollY));
    }

    // Initial value
    update(window.scrollY);

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Also hook into Lenis if it's already initialised
    const lenis = window.__lenis;
    if (lenis) {
      lenis.on("scroll", ({ scroll }) => update(scroll));
    }

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", handleScroll);
      if (window.__lenis) window.__lenis.off("scroll", handleScroll);
    };
  }, [threshold]); // eslint-disable-line react-hooks/exhaustive-deps

  return { scrollY, isScrolled, direction };
}
