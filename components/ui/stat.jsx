import { cn } from "@/lib/utils";

/**
 * Stat — editorial number/metric display
 *
 * Usage:
 *   <Stat value="40+" label="Projects Delivered" />
 *
 * @param {string} value   — large display number
 * @param {string} label   — supporting description
 * @param {"mint" | "sky" | "default"} accent
 */
export default function Stat({ value, label, accent = "default", className }) {
  const accentColor = {
    mint:    "text-mint",
    sky:     "text-sky",
    default: "text-ink",
  };

  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <span
        className={cn(
          "font-display font-bold leading-none tracking-tight",
          "text-5xl sm:text-6xl",
          accentColor[accent]
        )}
      >
        {value}
      </span>
      <span className="type-body-sm text-ink-subtle uppercase tracking-wide font-medium">
        {label}
      </span>
    </div>
  );
}
