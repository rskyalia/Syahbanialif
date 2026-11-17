"use client";

import { cn } from "@/lib/utils";
import SectionBackground from "@/components/background/section-background";

/**
 * SectionWrapper — Design System v2
 *
 * Wraps every page section with:
 *  - Consistent vertical padding (section-pad)
 *  - Responsive container (container-main)
 *  - Optional background variant ("default" | "mid" | "gradient" | "transparent")
 *  - Optional dot-grid overlay
 *  - Optional immersive atmospheric `background` (renders a SectionBackground
 *    layer behind the z-10 content — see components/background)
 *
 * @param {"default" | "mid" | "gradient" | "transparent"} bg
 * @param {string}  background - immersive SectionBackground variant
 *                               ("about"|"skills"|"projects"|"journey"|
 *                                "achievements"|"contact")
 * @param {boolean} dotGrid     — show subtle dot grid background
 * @param {string}  id          — scroll anchor id
 */
export default function SectionWrapper({
  id,
  bg                = "default",
  background,
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
      style={{
        scrollMarginTop: "clamp(6.5rem, 9vw, 8rem)",
        ...style,
      }}
      {...props}
    >
      {background && <SectionBackground variant={background} />}

      <div className={cn("container-main relative z-10", containerClassName)}>
        {children}
      </div>
    </Component>
  );
}
