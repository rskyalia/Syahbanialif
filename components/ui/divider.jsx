import { cn } from "@/lib/utils";

/**
 * Divider — decorative horizontal rule
 *
 * @param {"default" | "fade"} variant
 * @param {"horizontal" | "vertical"} orientation
 */
export default function Divider({
  variant = "fade",
  orientation = "horizontal",
  className,
  ...props
}) {
  if (orientation === "vertical") {
    return (
      <span
        role="separator"
        aria-orientation="vertical"
        className={cn("divider-vertical inline-block self-stretch", className)}
        {...props}
      />
    );
  }

  return (
    <hr
      role="separator"
      className={cn(
        variant === "fade" ? "divider" : "border-t border-border",
        className
      )}
      {...props}
    />
  );
}
