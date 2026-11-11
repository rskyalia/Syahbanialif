import { cn } from "@/lib/utils";

/**
 * Card — Design System v2
 *
 * Variants:
 *   glass      — glassmorphism panel (default)
 *   surface    — solid dark surface
 *   outline    — minimal border only
 *   panoramic  — large rounded "window" frame card
 *
 * @param {boolean} hoverable — adds lift + border glow on hover
 * @param {boolean} rimLight  — adds subtle inset rim highlight
 */
export default function Card({
  variant = "glass",
  hoverable = true,
  rimLight = true,
  className,
  children,
  ...props
}) {
  const base =
    "relative overflow-hidden transition-all duration-300 ";

  const hoverBase = hoverable
    ? "hover:border-[var(--color-border-hover)] hover:-translate-y-1 hover:shadow-lg "
    : "";

  const rim = rimLight ? "glass-rim " : "";

  const variants = {
    glass:
      "glass rounded-2xl p-6 " + hoverBase + rim,

    surface:
      "bg-[var(--color-canvas-mid)] border border-[var(--color-border)] rounded-2xl p-6 " +
      hoverBase,

    outline:
      "bg-transparent border border-[var(--color-border)] rounded-2xl p-6 " +
      (hoverable
        ? "hover:border-[var(--color-border-hover)] hover:bg-[var(--color-canvas-mid)] "
        : ""),

    panoramic:
      "glass-mid rounded-frame border border-[var(--color-border)] p-0 " +
      hoverBase + rim,
  };

  return (
    <div
      className={cn(base, variants[variant], className)}
      {...props}
    >
      {children}
    </div>
  );
}
