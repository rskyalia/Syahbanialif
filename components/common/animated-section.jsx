"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/animations/gsap-config";
import { scrollTriggerDefaults } from "@/animations/presets";

/**
 * AnimatedSection — reusable wrapper that fades + slides in its children
 * when they enter the viewport.
 *
 * @param {React.ReactNode} children
 * @param {string}          className
 * @param {"up"|"down"|"left"|"right"|"fade"} direction
 * @param {number}          delay        - stagger delay for direct children
 * @param {boolean}         staggerKids  - when true, staggers direct children
 * @param {string}          triggerStart - ScrollTrigger start position
 */
export default function AnimatedSection({
  children,
  className = "",
  direction   = "up",
  delay       = 0,
  staggerKids = false,
  triggerStart,
}) {
  const ref = useRef(null);

  const fromVars = {
    up:    { opacity: 0, y: 50 },
    down:  { opacity: 0, y: -40 },
    left:  { opacity: 0, x: -60 },
    right: { opacity: 0, x: 60 },
    fade:  { opacity: 0 },
  }[direction];

  const toVars = {
    opacity:  1,
    y:        0,
    x:        0,
    duration: 0.9,
    ease:     "power3.out",
    delay,
    scrollTrigger: {
      trigger:       ref.current,
      start:         triggerStart ?? scrollTriggerDefaults.start,
      end:           scrollTriggerDefaults.end,
      toggleActions: scrollTriggerDefaults.toggleActions,
    },
  };

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      // Respect reduced motion
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) return;

      if (staggerKids) {
        gsap.fromTo(el.children, fromVars, {
          ...toVars,
          stagger: 0.12,
          scrollTrigger: { ...toVars.scrollTrigger, trigger: el },
        });
      } else {
        gsap.fromTo(el, fromVars, {
          ...toVars,
          scrollTrigger: { ...toVars.scrollTrigger, trigger: el },
        });
      }
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
