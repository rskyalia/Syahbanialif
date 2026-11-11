import localFont    from "next/font/local";
import { Inter, JetBrains_Mono } from "next/font/google";

/**
 * Brand font — Bergand (self-hosted).
 * Hanya dipakai untuk logo/icon "Alif." di navbar dan footer.
 * Tersedia via CSS var(--font-brand) dan class `font-brand`.
 */
export const bergant = localFont({
  src: [
    {
      path:   "../public/fonts/bergant/Bergand.otf",
      weight: "400",
      style:  "normal",
    },
  ],
  variable: "--font-brand",   // ← bukan --font-display lagi
  display:  "swap",
  preload:  true,             // preload karena muncul di hero/navbar
  fallback: ["Georgia", "serif"],
});

/**
 * Display / heading font — Cormorant Garamond (self-hosted).
 * Dipakai untuk SEMUA heading: H1–H6, hero title, section title,
 * card title, nama, dll. via var(--font-display) / class `font-display`.
 */
export const cormorant = localFont({
  src: [
    {
      path:   "../public/fonts/cormorant-garamond/CormorantGaramond-Light.ttf",
      weight: "300",
      style:  "normal",
    },
    {
      path:   "../public/fonts/cormorant-garamond/CormorantGaramond-LightItalic.ttf",
      weight: "300",
      style:  "italic",
    },
    {
      path:   "../public/fonts/cormorant-garamond/CormorantGaramond-Regular.ttf",
      weight: "400",
      style:  "normal",
    },
    {
      path:   "../public/fonts/cormorant-garamond/CormorantGaramond-Italic.ttf",
      weight: "400",
      style:  "italic",
    },
    {
      path:   "../public/fonts/cormorant-garamond/CormorantGaramond-Medium.ttf",
      weight: "500",
      style:  "normal",
    },
    {
      path:   "../public/fonts/cormorant-garamond/CormorantGaramond-MediumItalic.ttf",
      weight: "500",
      style:  "italic",
    },
    {
      path:   "../public/fonts/cormorant-garamond/CormorantGaramond-SemiBold.ttf",
      weight: "600",
      style:  "normal",
    },
    {
      path:   "../public/fonts/cormorant-garamond/CormorantGaramond-Bold.ttf",
      weight: "700",
      style:  "normal",
    },
    {
      path:   "../public/fonts/cormorant-garamond/CormorantGaramond-BoldItalic.ttf",
      weight: "700",
      style:  "italic",
    },
  ],
  variable: "--font-display",  // ← sekarang Cormorant Garamond yang jadi display font
  display:  "swap",
  preload:  true,
  fallback: ["Georgia", "Times New Roman", "serif"],
});

/**
 * Body font — Inter (self-cached oleh Next.js dari Google Fonts).
 * Dipakai untuk semua body text, UI copy, button, label.
 */
export const inter = Inter({
  subsets:  ["latin"],
  display:  "swap",
  variable: "--font-sans",
  weight:   ["400", "500", "600", "700"],
});

/**
 * Mono font — JetBrains Mono (self-cached oleh Next.js).
 * Dipakai untuk label teknis, counter, badge kode.
 */
export const jetbrainsMono = JetBrains_Mono({
  subsets:  ["latin"],
  display:  "swap",
  variable: "--font-mono",
  weight:   ["400", "500"],
});
