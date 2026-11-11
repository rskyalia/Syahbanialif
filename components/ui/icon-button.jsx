import { cn } from "@/lib/utils";

/**
 * IconButton — circular icon-only button.
 *
 * Always requires a descriptive `label` for screen readers.
 *
 * @param {"glass" | "outline" | "ghost"} variant
 * @param {"sm" | "md" | "lg"} size
 * @param {string} label — required; rendered as aria-label
 * @param {React.ElementType} as — render as "button" | "a" | Link
 */
export default function IconButton({
  variant  = "glass",
  size     = "md",
  label,
  className,
  as: Tag  = "button",
  children,
  ...props
}) {
  const base =
    "inline-flex items-center justify-center " +
    "rounded-full " +
    "transition-all duration-300 " +
    "cursor-pointer select-none " +
    "disabled:opacity-40 disabled:pointer-events-none " +
    "focus-visible:outline focus-visible:outline-2 " +
    "focus-visible:outline-offset-2 " +
    "active:scale-[0.95] ";

  const variants = {
    glass:
      "glass glass-rim " +
      "text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] " +
      "hover:border-[var(--color-border-hover)] ",

    outline:
      "bg-transparent border border-[var(--color-border)] " +
      "text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] " +
      "hover:border-[var(--color-border-hover)] hover:bg-[var(--color-canvas-mid)] ",

    ghost:
      "bg-transparent border-transparent " +
      "text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] " +
      "hover:bg-[var(--color-canvas-mid)] ",
  };

  /* All sizes have min 44×44px for WCAG 2.5.5 touch target compliance */
  const sizes = {
    sm: "w-9 h-9 min-w-[44px] min-h-[44px] text-sm",
    md: "w-10 h-10 min-w-[44px] min-h-[44px] text-base",
    lg: "w-12 h-12 text-lg",
  };

  return (
    <Tag
      aria-label={label}
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </Tag>
  );
}
