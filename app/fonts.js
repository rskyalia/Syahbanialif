import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";

/**
 * Display font — Space Grotesk (placeholder until Bergant is available).
 *
 * HOW TO ADD BERGANT LATER:
 *  1. Place woff2 files in public/fonts/bergant/
 *  2. Import `localFont` from "next/font/local"
 *  3. Replace this export with the localFont config (example in comments below)
 */
export const bergant = Space_Grotesk({
  subsets:  ["latin"],
  display:  "swap",
  variable: "--font-display",
  weight:   ["400", "500", "600", "700"],
  preload:  true,
  // Restrict to only glyphs needed for headings to reduce bundle size
  adjustFontFallback: true,
});

/*
// ── Uncomment when Bergant files are ready ──
import localFont from "next/font/local";
export const bergant = localFont({
  src: [
    { path: "../public/fonts/bergant/Bergant-Regular.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/bergant/Bergant-Medium.woff2",  weight: "500", style: "normal" },
    { path: "../public/fonts/bergant/Bergant-Bold.woff2",    weight: "700", style: "normal" },
  ],
  variable: "--font-display",
  display:  "swap",
  preload:  true,
  fallback: ["Space Grotesk", "system-ui", "sans-serif"],
});
*/

/**
 * Body font — Inter.
 * Only latin subset; weights: 400 (regular) & 600 (semibold) cover 99% of UI.
 */
export const inter = Inter({
  subsets:            ["latin"],
  display:            "swap",
  variable:           "--font-sans",
  preload:            true,
  weight:             ["400", "500", "600", "700"],
  adjustFontFallback: true,
});

/**
 * Mono font — JetBrains Mono.
 * preload: false — only loaded when first needed (labels, counters).
 * Subset to latin only, 2 weights cover all label use cases.
 */
export const jetbrainsMono = JetBrains_Mono({
  subsets:  ["latin"],
  display:  "swap",
  variable: "--font-mono",
  weight:   ["400", "500"],
  preload:  false, // non-critical — lazy load
});
