/**
 * Reusable GSAP animation presets.
 * Import these in components that use useGSAP or gsap.to/from/fromTo.
 *
 * Usage:
 *   gsap.fromTo(el, presets.fadeUp.from, { ...presets.fadeUp.to })
 */

/* ── Fade variants ───────────────────────────────────────── */

export const fadeUp = {
  from: { opacity: 0, y: 50, willChange: "transform, opacity" },
  to:   { opacity: 1, y: 0, duration: 0.85, ease: "power3.out", clearProps: "willChange" },
};

export const fadeDown = {
  from: { opacity: 0, y: -40 },
  to:   { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
};

export const fadeLeft = {
  from: { opacity: 0, x: -60, willChange: "transform, opacity" },
  to:   { opacity: 1, x: 0, duration: 0.85, ease: "power3.out", clearProps: "willChange" },
};

export const fadeRight = {
  from: { opacity: 0, x: 60, willChange: "transform, opacity" },
  to:   { opacity: 1, x: 0, duration: 0.85, ease: "power3.out", clearProps: "willChange" },
};

export const fadeIn = {
  from: { opacity: 0 },
  to:   { opacity: 1, duration: 0.7, ease: "power2.out" },
};

/* ── Scale variants ──────────────────────────────────────── */

export const scaleIn = {
  from: { opacity: 0, scale: 0.88, willChange: "transform, opacity" },
  to:   { opacity: 1, scale: 1, duration: 0.75, ease: "power3.out", clearProps: "willChange" },
};

export const scaleInSpring = {
  from: { opacity: 0, scale: 0.5 },
  to:   { opacity: 1, scale: 1, duration: 0.65, ease: "back.out(1.7)" },
};

/* ── Clip / reveal variants ──────────────────────────────── */

/** Text line wipe-up — works on a wrapper div with overflow: hidden */
export const clipRevealUp = {
  from: { yPercent: 110, opacity: 0 },
  to:   { yPercent: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
};

/** Image reveal from left */
export const clipRevealLeft = {
  from: { xPercent: -105, opacity: 0 },
  to:   { xPercent: 0, opacity: 1, duration: 1, ease: "power3.inOut" },
};

/* ── Stagger config ──────────────────────────────────────── */

export const stagger = {
  default:  0.12,
  fast:     0.06,
  slow:     0.2,
  cards:    0.1,
  letters:  0.025,
};

/* ── Durations ───────────────────────────────────────────── */

export const duration = {
  fast:   0.4,
  base:   0.7,
  slow:   1.0,
  slower: 1.4,
};

/* ── Easings (match CSS design tokens) ──────────────────── */

export const ease = {
  smooth:  "power3.out",           // expo-out style — cinematic
  spring:  "back.out(1.7)",        // spring overshoot
  cin:     "power2.inOut",         // cinematic in-out
  linear:  "none",                 // scrub animations
  out:     "power2.out",
  inOut:   "power2.inOut",
};

/* ── ScrollTrigger defaults ──────────────────────────────── */

export const scrollTriggerDefaults = {
  start:         "top 82%",
  end:           "top 50%",
  toggleActions: "play none none reverse",
};

/** Scrub variant — for parallax and line drawing */
export const scrollTriggerScrub = {
  start: "top bottom",
  end:   "bottom top",
  scrub: 1.5,
};

/* ── Parallax helper ─────────────────────────────────────── */

/**
 * Returns a standard parallax config for a given y-distance.
 * @param {number} yPercent - how far the element drifts (default 20)
 */
export function parallaxConfig(yPercent = 20) {
  return {
    yPercent,
    ease: "none",
    scrollTrigger: {
      start: "top bottom",
      end:   "bottom top",
      scrub: 1.5,
    },
  };
}
