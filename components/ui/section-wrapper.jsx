import { cn } from "@/lib/utils";

/**
 * SectionWrapper — Design System v2
 *
 * Wraps every page section with:
 *  - Consistent vertical padding (section-pad)
 *  - Responsive container (container-main)
 *  - Optional background variant
 *  - Optional dot-grid overlay
 *
 * @param {"default" | "mid" | "gradient" | "transparent"} bg
 * @param {boolean} dotGrid        — show subtle dot grid background
 * @param {string}  id             — scroll anchor id
 */
export default function SectionWrapper({
  id,
  bg                = "default",
  dotGrid           = false,
  className,
  style,
  containerClassName,
  as: Component     = "section",
  children,
  ...props
}) {
  const bgStyles = {
    default:     "bg-canvas",
    mid:         "bg-canvas-mid",
    gradient:    "bg-gradient-section",
    transparent: "bg-transparent",
  };

  return (
    <Component
      id={id}
      className={cn(
        "section-pad relative overflow-hidden",
        bgStyles[bg],
        dotGrid && "bg-dot-grid",
        className
      )}
      style={style}
      {...props}
    >
      <div className={cn("container-main relative z-10", containerClassName)}>
        {children}
      </div>
    </Component>
  );
}
