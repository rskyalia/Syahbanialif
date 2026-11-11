"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/animations/gsap-config";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

/**
 * SectionHeading — animated editorial section header.
 *
 * Built-in GSAP scroll-triggered reveal:
 *  - Eyebrow label fades in
 *  - Title slides up
 *  - Subtitle fades in
 *
 * @param {"left" | "center"} align
 * @param {boolean} animate — set false to skip GSAP (default: true)
 */
export default function SectionHeading({
  label,
  title,
  subtitle,
  align     = "center",
  divider   = false,
  animate   = true,
  className,
}) {
  const ref      = useRef(null);
  const isCenter = align === "center";

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || !animate) return;

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) return;

      const eyebrow = el.querySelector(".sh-eyebrow");
      const heading = el.querySelector(".sh-heading");
      const sub     = el.querySelector(".sh-subtitle");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger:       el,
          start:         "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      if (eyebrow) {
        tl.fromTo(eyebrow, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, 0);
      }

      if (heading) {
        tl.fromTo(heading, { opacity: 0, y: 32 }, { opacity: 1, y: 0, duration: 0.75, ease: "power3.out" }, 0.1);
      }

      if (sub) {
        tl.fromTo(sub, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.65, ease: "power3.out" }, 0.25);
      }
    },
    { scope: ref }
  );

  return (
    <header
      ref={ref}
      className={cn("mb-14 md:mb-20", isCenter && "text-center", className)}
    >
      {/* Eyebrow — mono label or subtitle-as-eyebrow */}
      {(label || subtitle) && (
        <div className={cn("sh-eyebrow mb-4 flex items-center gap-3", isCenter && "justify-center")}>
          {divider && (
            <span
              aria-hidden="true"
              className="inline-block h-px w-10 bg-gradient-to-r from-[var(--color-mint)] to-transparent flex-shrink-0"
            />
          )}
          <span
            className="font-mono text-xs uppercase tracking-widest font-semibold"
            style={{ color: "var(--color-mint)" }}
          >
            {label ?? subtitle}
          </span>
          {divider && (
            <span
              aria-hidden="true"
              className="inline-block h-px w-10 bg-gradient-to-l from-[var(--color-mint)] to-transparent flex-shrink-0"
            />
          )}
        </div>
      )}

      {/* Main heading */}
      {title && (
        <h2
          id={`${title.toLowerCase().replace(/\s+/g, "-")}-heading`}
          className={cn(
            "sh-heading font-display font-bold tracking-tight",
            "text-3xl sm:text-4xl lg:text-5xl",
            "text-[var(--color-ink)]",
            isCenter && "mx-auto"
          )}
        >
          {title}
        </h2>
      )}

      {/* Subtitle below title (if label was provided, subtitle is the paragraph) */}
      {label && subtitle && (
        <p
          className={cn(
            "sh-subtitle mt-5 max-w-xl text-base md:text-lg text-[var(--color-ink-muted)] leading-relaxed",
            isCenter && "mx-auto"
          )}
        >
          {subtitle}
        </p>
      )}
    </header>
  );
}
