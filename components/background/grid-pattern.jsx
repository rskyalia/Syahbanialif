import { cn } from "@/lib/utils";

/**
 * GridPattern — fine technical grid or dot field with a radial fade mask
 * so it never reads as a harsh, full-bleed grid behind content.
 *
 * @param {"fine"|"coarse"|"dots"} variant
 * @param {number} opacity
 */
const GRIDS = {
  fine:   { size: 40, color: "rgba(168,217,237,0.06)", type: "lines" },
  coarse: { size: 80, color: "rgba(168,217,237,0.05)", type: "lines" },
  dots:   { size: 26, color: "rgba(184,216,199,0.08)", type: "dots"  },
};

export default function GridPattern({ variant = "fine", opacity = 0.5, className, style }) {
  const g = GRIDS[variant] ?? GRIDS.fine;

  const backgroundImage =
    g.type === "dots"
      ? `radial-gradient(circle, ${g.color} 1px, transparent 1.6px)`
      : `linear-gradient(to right, ${g.color} 1px, transparent 1px), linear-gradient(to bottom, ${g.color} 1px, transparent 1px)`;

  return (
    <div
      aria-hidden="true"
      className={cn("bg-fade-mask", className)}
      style={{
        backgroundImage,
        backgroundSize: `${g.size}px ${g.size}px`,
        opacity,
        ...style,
      }}
    />
  );
}
