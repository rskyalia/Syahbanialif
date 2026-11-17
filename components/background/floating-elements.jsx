import { cn } from "@/lib/utils";

/**
 * FloatingElements — ambient floating particles for depth & life.
 *
 * Positions are deterministic (index-based) to avoid SSR/CSR hydration
 * mismatches and keep rendering cheap. Count is reduced by the caller on
 * mobile. Motion comes from the shared `.anim-float` keyframe (disabled
 * under prefers-reduced-motion and on mobile via globals.css).
 *
 * @param {number} count  - how many particles (max 8)
 * @param {string} color  - rgba tint + glow color
 */
const PRESETS = [
  { top: "14%", left: "9%",  size: 6, dur: 9  },
  { top: "28%", left: "86%", size: 4, dur: 11 },
  { top: "52%", left: "16%", size: 5, dur: 10 },
  { top: "70%", left: "78%", size: 7, dur: 13 },
  { top: "40%", left: "48%", size: 3, dur: 12 },
  { top: "20%", left: "62%", size: 4, dur: 14 },
  { top: "84%", left: "30%", size: 5, dur: 11 },
  { top: "62%", left: "92%", size: 4, dur: 13 },
];

export default function FloatingElements({ count = 6, color = "rgba(184,216,199,0.5)", className }) {
  const items = PRESETS.slice(0, Math.min(count, PRESETS.length));

  return (
    <div aria-hidden="true" className={cn("pointer-events-none absolute inset-0", className)}>
      {items.map((p, i) => (
        <span
          key={i}
          className="anim-float absolute rounded-full"
          style={{
            top: p.top,
            left: p.left,
            width: p.size,
            height: p.size,
            background: color,
            boxShadow: `0 0 ${p.size * 2.5}px ${color}`,
            opacity: 0.7,
            animationDuration: `${p.dur}s`,
            animationDelay: `${(i * 0.8).toFixed(1)}s`,
          }}
        />
      ))}
    </div>
  );
}
