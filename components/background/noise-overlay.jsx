import { cn } from "@/lib/utils";

/**
 * NoiseOverlay — subtle SVG fractal-noise film grain.
 *
 * - `fixed` (default true): a single global layer pinned to the viewport,
 *   sitting above section backgrounds but below z-10 content, so it never
 *   reduces text legibility.
 * - pointer-events disabled; very low opacity for a cinematic, not grainy, look.
 *
 * @param {number}  opacity - 0–1 (default 0.04)
 * @param {boolean} fixed   - pin to viewport (global) vs fill parent (local)
 */
const NOISE_URI =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E\")";

export default function NoiseOverlay({ opacity = 0.04, fixed = true, className, style }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none",
        fixed ? "fixed inset-0 z-[1]" : "absolute inset-0 z-0",
        className
      )}
      style={{
        backgroundImage: NOISE_URI,
        backgroundSize: "220px 220px",
        opacity,
        ...style,
      }}
    />
  );
}
