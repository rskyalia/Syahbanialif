"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/animations/gsap-config";
import { useMediaQuery } from "@/hooks";
import { cn } from "@/lib/utils";
import GradientOrb from "./gradient-orb";
import GridPattern from "./grid-pattern";
import FloatingElements from "./floating-elements";

/* ── Tints (rgba so the radial-gradient falloff is correct) ── */
const C = {
  ambient:    "rgba(35,81,90,0.55)",
  sky:        "rgba(168,217,237,0.22)",
  mint:       "rgba(184,216,199,0.20)",
  gold:       "rgba(224,196,138,0.18)",
};

/* ── Decorative SVG layers (kept inline + lightweight) ── */

function Rings({ className, style }) {
  return (
    <svg
      aria-hidden="true"
      className={cn("pointer-events-none absolute anim-spin", className)}
      style={style}
      viewBox="0 0 200 200"
      fill="none"
    >
      <circle cx="100" cy="100" r="96" stroke="rgba(168,217,237,0.10)" strokeWidth="1" />
      <circle cx="100" cy="100" r="70" stroke="rgba(184,216,199,0.10)" strokeWidth="1" strokeDasharray="2 6" />
      <circle cx="100" cy="100" r="44" stroke="rgba(168,217,237,0.08)" strokeWidth="1" />
    </svg>
  );
}

function TechLines({ className }) {
  return (
    <svg
      aria-hidden="true"
      className={cn("pointer-events-none absolute", className)}
      viewBox="0 0 400 300"
      fill="none"
      preserveAspectRatio="none"
    >
      <path d="M0,260 L120,160 L210,210 L300,90 L400,140" stroke="rgba(168,217,237,0.10)" strokeWidth="1" />
      <path d="M0,180 L160,220 L260,120 L400,180" stroke="rgba(184,216,199,0.08)" strokeWidth="1" strokeDasharray="3 6" />
      <circle cx="120" cy="160" r="3" fill="rgba(168,217,237,0.35)" />
      <circle cx="210" cy="210" r="3" fill="rgba(184,216,199,0.30)" />
      <circle cx="300" cy="90"  r="3" fill="rgba(168,217,237,0.35)" />
    </svg>
  );
}

function TimelineSpine({ className }) {
  return (
    <svg
      aria-hidden="true"
      className={cn("pointer-events-none absolute", className)}
      viewBox="0 0 60 600"
      fill="none"
      preserveAspectRatio="none"
    >
      <line x1="30" y1="0" x2="30" y2="600" stroke="rgba(168,217,237,0.08)" strokeWidth="1" strokeDasharray="2 8" />
      <circle cx="30" cy="80"  r="4" fill="none" stroke="rgba(184,216,199,0.20)" strokeWidth="1" />
      <circle cx="30" cy="300" r="4" fill="none" stroke="rgba(168,217,237,0.20)" strokeWidth="1" />
      <circle cx="30" cy="520" r="4" fill="none" stroke="rgba(184,216,199,0.20)" strokeWidth="1" />
    </svg>
  );
}

function AwardMotif({ className, style }) {
  return (
    <svg
      aria-hidden="true"
      className={cn("pointer-events-none absolute", className)}
      style={style}
      viewBox="0 0 200 200"
      fill="none"
    >
      <circle cx="100" cy="100" r="78" stroke="rgba(224,196,138,0.14)" strokeWidth="1" />
      <circle cx="100" cy="100" r="56" stroke="rgba(224,196,138,0.10)" strokeWidth="1" strokeDasharray="2 5" />
      <path
        d="M100 64 l8 18 19 1 -15 12 5 19 -17 -11 -17 11 5 -19 -15 -12 19 -1 z"
        fill="rgba(224,196,138,0.10)"
        stroke="rgba(224,196,138,0.16)"
        strokeWidth="1"
      />
    </svg>
  );
}

/* ── Variant definitions ── */
const VARIANTS = {
  about: {
    base:
      "radial-gradient(ellipse 60% 50% at 15% 20%, rgba(35,81,90,0.30) 0%, transparent 60%)," +
      "radial-gradient(ellipse 55% 45% at 85% 85%, rgba(168,217,237,0.08) 0%, transparent 55%)",
    orbs: [
      { color: C.ambient, size: 560, pos: { top: "-6%", left: "-4%" },        op: 0.5,  anim: "anim-drift" },
      { color: C.sky,     size: 420, pos: { bottom: "-8%", right: "-6%" },   op: 0.45, anim: "anim-float" },
      { color: C.mint,    size: 320, pos: { top: "45%", left: "60%" },        op: 0.35, anim: "anim-pulse" },
    ],
    grid: { variant: "dots", opacity: 0.5 },
    floating: { count: 6, color: "rgba(184,216,199,0.5)" },
    decoration: (<>
      <Rings className="w-[420px] h-[420px] -left-10 top-10 opacity-70" />
      <Rings className="w-[260px] h-[260px] right-6 bottom-10 opacity-50" />
    </>),
    parallax: true,
  },

  skills: {
    base: "radial-gradient(ellipse 70% 60% at 50% 0%, rgba(168,217,237,0.08) 0%, transparent 55%)",
    orbs: [
      { color: C.ambient, size: 520, pos: { top: "-10%", left: "40%" },      op: 0.4,  anim: "anim-drift" },
      { color: C.sky,     size: 360, pos: { bottom: "-12%", left: "-4%" },   op: 0.35, anim: "anim-float" },
    ],
    grid: { variant: "fine", opacity: 0.6 },
    floating: { count: 8, color: "rgba(168,217,237,0.5)" },
    decoration: <TechLines className="inset-0 w-full h-full opacity-60" />,
    parallax: false,
  },

  projects: {
    base:
      "radial-gradient(ellipse 50% 40% at 50% 12%, rgba(168,217,237,0.12) 0%, transparent 55%)," +
      "radial-gradient(ellipse 60% 50% at 80% 90%, rgba(35,81,90,0.22) 0%, transparent 55%)",
    orbs: [
      { color: C.sky,     size: 480, pos: { top: "-8%", left: "45%" },       op: 0.4,  anim: "anim-pulse" },
      { color: C.ambient, size: 460, pos: { bottom: "-10%", right: "-8%" },  op: 0.4,  anim: "anim-drift" },
    ],
    grid: null,
    floating: { count: 5, color: "rgba(184,216,199,0.45)" },
    decoration: null,
    parallax: false,
  },

  journey: {
    base:
      "radial-gradient(ellipse 60% 50% at 10% 30%, rgba(35,81,90,0.28) 0%, transparent 58%)," +
      "radial-gradient(ellipse 55% 45% at 90% 70%, rgba(168,217,237,0.07) 0%, transparent 55%)",
    orbs: [
      { color: C.ambient, size: 520, pos: { top: "-8%", left: "-6%" },       op: 0.45, anim: "anim-drift" },
      { color: C.sky,     size: 400, pos: { bottom: "-10%", right: "-4%" },  op: 0.4,  anim: "anim-float" },
    ],
    grid: { variant: "coarse", opacity: 0.45 },
    floating: { count: 5, color: "rgba(168,217,237,0.45)" },
    decoration: <TimelineSpine className="left-1/2 top-0 h-full w-[60px] -translate-x-1/2 opacity-60" />,
    parallax: true,
  },

  achievements: {
    base:
      "radial-gradient(ellipse 55% 45% at 80% 15%, rgba(224,196,138,0.07) 0%, transparent 55%)," +
      "radial-gradient(ellipse 60% 50% at 20% 85%, rgba(35,81,90,0.24) 0%, transparent 55%)",
    orbs: [
      { color: C.gold,    size: 440, pos: { top: "-6%", right: "10%" },      op: 0.4,  anim: "anim-pulse" },
      { color: C.ambient, size: 480, pos: { bottom: "-12%", left: "-6%" },   op: 0.4,  anim: "anim-drift" },
    ],
    grid: { variant: "dots", opacity: 0.4 },
    floating: { count: 5, color: "rgba(224,196,138,0.4)" },
    decoration: (<>
      <AwardMotif className="w-[360px] h-[360px] right-8 top-8 opacity-60" />
      <AwardMotif className="w-[220px] h-[220px] left-10 bottom-12 opacity-40" />
    </>),
    parallax: false,
  },

  contact: {
    base:
      "linear-gradient(180deg, rgba(11,21,29,0.2) 0%, transparent 30%, transparent 70%, rgba(11,21,29,0.4) 100%)," +
      "radial-gradient(ellipse 70% 40% at 50% 0%, rgba(168,217,237,0.10) 0%, transparent 60%)",
    orbs: [
      { color: C.mint,    size: 520, pos: { top: "-10%", left: "10%" },      op: 0.4, anim: "anim-aurora" },
      { color: C.sky,      size: 560, pos: { top: "5%", right: "8%" },        op: 0.4, anim: "anim-aurora" },
      { color: C.ambient,  size: 480, pos: { bottom: "-14%", left: "40%" },  op: 0.4, anim: "anim-drift" },
    ],
    grid: null,
    floating: { count: 7, color: "rgba(184,216,199,0.5)" },
    decoration: (
      <div
        className="absolute inset-x-0 top-1/4 h-32 anim-aurora"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(184,216,199,0.06), rgba(168,217,237,0.06), transparent)",
        }}
      />
    ),
    parallax: true,
  },
};

/**
 * SectionBackground — reusable, per-section atmospheric layer.
 *
 * Renders as an absolute, z-0, pointer-events-none layer behind the section's
 * z-10 content. A `variant` selects the gradient base, ambient orbs, grid,
 * decorative motifs, and floating particles. Optional GSAP parallax drifts the
 * orb layer on scroll (desktop + non-reduced-motion only).
 *
 * @param {"about"|"skills"|"projects"|"journey"|"achievements"|"contact"} variant
 */
export default function SectionBackground({ variant = "about", className }) {
  const v = VARIANTS[variant] ?? VARIANTS.about;
  const isMobile  = useMediaQuery(768);
  const orbsRef   = useRef(null);

  /* parallax for the orb layer — only where useful, desktop, non-reduced */
  useGSAP(
    () => {
      if (!v.parallax || isMobile) return;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) return;

      const layer = orbsRef.current;
      if (!layer?.parentElement) return;

      gsap.to(layer, {
        yPercent: -14,
        ease: "none",
        scrollTrigger: {
          trigger: layer.parentElement,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });
    },
    { dependencies: [v.parallax, isMobile], scope: orbsRef }
  );

  const orbs = v.orbs.map((o, i) => (
    <GradientOrb
      key={i}
      color={o.color}
      size={isMobile ? o.size * 0.7 : o.size}
      position={o.pos}
      opacity={isMobile ? o.op * 0.7 : o.op}
      className={o.anim}
    />
  ));

  const floatCount = isMobile ? Math.ceil(v.floating.count / 2) : v.floating.count;

  return (
    <div aria-hidden="true" className={cn("pointer-events-none absolute inset-0 z-0 overflow-hidden", className)}>
      {/* base gradient */}
      <div className="absolute inset-0" style={{ background: v.base }} />

      {/* orb layer (parallax target) */}
      <div ref={orbsRef} className="absolute inset-0">{orbs}</div>

      {/* technical grid / dots */}
      {v.grid && (
        <GridPattern variant={v.grid.variant} opacity={v.grid.opacity} className="absolute inset-0" />
      )}

      {/* variant-specific decorative motifs */}
      {v.decoration}

      {/* ambient floating particles */}
      <FloatingElements count={floatCount} color={v.floating.color} />

      {/* subtle boundary fades — smooth transitions between sections */}
      <div
        className="absolute inset-x-0 top-0 h-16"
        style={{ background: "linear-gradient(to bottom, rgba(11,21,29,0.35), transparent)" }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-16"
        style={{ background: "linear-gradient(to top, rgba(11,21,29,0.35), transparent)" }}
      />
    </div>
  );
}
