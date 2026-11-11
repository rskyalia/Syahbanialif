"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin }    from "gsap/TextPlugin";
import { useGSAP }       from "@gsap/react";

/**
 * Register GSAP plugins once.
 * "use client" — safe to import in Client Components only.
 * Never import this in Server Components.
 */
gsap.registerPlugin(ScrollTrigger, TextPlugin, useGSAP);

/** Global GSAP defaults — used consistently across all animations */
gsap.defaults({
  ease:     "power3.out",
  duration: 0.8,
});

export { gsap, ScrollTrigger, TextPlugin, useGSAP };
