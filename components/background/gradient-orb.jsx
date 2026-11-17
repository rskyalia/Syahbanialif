import { cn } from "@/lib/utils";

/**
 * GradientOrb — large soft light source for ambient depth.
 *
 * Uses a radial-gradient (color → transparent) rather than a `filter: blur()`
 * so the soft falloff is cheap to render and composite. No backdrop-filter,
 * no heavy blur: safe for many instances and for mobile.
 *
 * @param {string} color   - rgba center tint, e.g. "rgba(35,81,90,0.5)"
 * @param {number} size    - diameter in px
 * @param {object} position - { top/left/right/bottom } css values
 * @param {number} opacity - overall opacity
 */
export default function GradientOrb({
  color    = "rgba(35,81,90,0.5)",
  size     = 420,
  position = {},
  opacity  = 0.6,
  className,
  style,
}) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute rounded-full", className)}
      style={{
        width:  size,
        height: size,
        background: `radial-gradient(circle at 50% 50%, ${color} 0%, transparent 70%)`,
        opacity,
        ...position,
        ...style,
      }}
    />
  );
}
