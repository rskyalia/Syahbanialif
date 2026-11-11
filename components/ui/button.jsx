import { cloneElement, isValidElement } from "react";
import { cn } from "@/lib/utils";

/**
 * Button — Design System v2
 *
 * Variants:  primary | secondary | outline | ghost | glass
 * Sizes:     sm | md | lg
 *
 * @param {React.ElementType} as    — render as "button" | "a" | Link (default: "button")
 * @param {boolean}           asChild — render styles onto the single child element
 * @param {boolean}           icon  — reduces padding for icon-only use
 *
 * Usage with asChild:
 *   <Button asChild variant="primary"><Link href="/page">Click</Link></Button>
 *
 * Usage with as:
 *   <Button as="a" href="#contact">Click</Button>
 */
export default function Button({
  variant  = "primary",
  size     = "md",
  icon     = false,
  className,
  as: Tag  = "button",
  asChild  = false,
  children,
  ...props
}) {
  /* ── Base styles ── */
  const base =
    "relative inline-flex items-center justify-center gap-2 " +
    "font-sans font-medium leading-none " +
    "rounded-pill " +
    "transition-all duration-300 " +
    "cursor-pointer select-none " +
    "disabled:opacity-40 disabled:pointer-events-none " +
    "focus-visible:outline focus-visible:outline-2 " +
    "focus-visible:outline-offset-2 " +
    "active:scale-[0.97] " +
    /* Minimum touch target — WCAG 2.5.5 */
    "min-h-[44px] ";

  /* ── Variant map ── */
  const variants = {
    primary:
      "bg-[var(--color-mint)] text-[var(--color-canvas)] font-semibold " +
      "hover:bg-[var(--color-mint-light)] " +
      "active:bg-[var(--color-mint-dim)] " +
      "shadow-sm ",

    secondary:
      "glass-mid glass-rim " +
      "text-[var(--color-ink)] " +
      "hover:border-[var(--color-border-hover)] " +
      "hover:-translate-y-0.5 hover:shadow-lg ",

    outline:
      "bg-transparent " +
      "border border-[var(--color-border)] " +
      "hover:border-[var(--color-border-hover)] " +
      "text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] ",

    ghost:
      "bg-transparent border-transparent " +
      "text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] " +
      "hover:bg-[var(--color-canvas-mid)] ",

    glass:
      "glass glass-rim " +
      "text-[var(--color-ink)] " +
      "hover:border-[var(--color-border-hover)] " +
      "hover:-translate-y-0.5 ",
  };

  /* ── Size map ── */
  const sizes = {
    sm: icon ? "p-2 text-sm"      : "px-5 py-2.5 text-sm",
    md: icon ? "p-2.5 text-base"  : "px-7 py-3.5 text-base",
    lg: icon ? "p-3.5 text-lg"    : "px-9 py-4 text-lg",
  };

  const computedClass = cn(base, variants[variant], sizes[size], className);

  /* ── asChild: clone styles onto the child element ── */
  if (asChild && isValidElement(children)) {
    return cloneElement(children, {
      className: cn(computedClass, children.props.className),
      ...props,
    });
  }

  return (
    <Tag className={computedClass} {...props}>
      {children}
    </Tag>
  );
}
