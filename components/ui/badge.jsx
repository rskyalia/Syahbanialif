import { cn } from "@/lib/utils";

/**
 * Badge — Design System v2
 *
 * Variants:
 *   default  — dark glass, muted text
 *   mint     — mint-tinted accent
 *   sky      — sky-tinted accent
 *   outline  — border only
 *   label    — uppercase mono label (technical)
 *
 * @param {"sm" | "md"} size
 */
export default function Badge({
  variant = "default",
  size = "sm",
  className,
  children,
}) {
  const base =
    "inline-flex items-center justify-center " +
    "font-medium leading-none " +
    "transition-colors duration-300 ";

  const variants = {
    default:
      "glass-subtle rounded-full " +
      "text-[var(--color-ink-muted)] ",

    mint:
      "glass-mint rounded-full " +
      "text-[var(--color-mint)] ",

    sky:
      "glass-sky rounded-full " +
      "text-[var(--color-sky)] ",

    outline:
      "bg-transparent rounded-full " +
      "text-[var(--color-ink-muted)] border border-[var(--color-border)] " +
      "hover:border-[var(--color-border-hover)] hover:text-[var(--color-ink)] ",

    label:
      "bg-transparent " +
      "font-mono text-[var(--color-sky)] tracking-widest uppercase ",
  };

  const sizes = {
    sm: "px-3 py-1 text-xs",
    md: "px-4 py-1.5 text-sm",
  };

  return (
    <span className={cn(base, variants[variant], sizes[size], className)}>
      {children}
    </span>
  );
}
