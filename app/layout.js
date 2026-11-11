import "./globals.css";
import { inter, bergant, cormorant, jetbrainsMono } from "./fonts";
import { siteConfig } from "@/data/site-config";
import SmoothScroll    from "@/components/providers/smooth-scroll";
import ScrollProgress  from "@/components/ui/scroll-progress";

/* ── Canonical metadata ── */
export const metadata = {
  metadataBase: new URL(siteConfig.url),

  title: {
    default:  siteConfig.title,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords:    siteConfig.keywords,

  authors:  [{ name: siteConfig.name, url: siteConfig.url }],
  creator:  siteConfig.name,
  publisher: siteConfig.name,

  /* ── Canonical ── */
  alternates: {
    canonical: siteConfig.url,
  },

  /* ── Open Graph ── */
  openGraph: {
    type:        "website",
    locale:      "id_ID",
    url:         siteConfig.url,
    title:       siteConfig.title,
    description: siteConfig.description,
    siteName:    siteConfig.name,
    images: [
      {
        url:    siteConfig.ogImage,
        width:  1200,
        height: 630,
        alt:    `${siteConfig.name} — Creative Developer & Designer`,
        type:   "image/jpeg",
      },
    ],
  },

  /* ── Twitter Card ── */
  twitter: {
    card:        "summary_large_image",
    site:        siteConfig.social.twitter,
    creator:     siteConfig.social.twitter,
    title:       siteConfig.title,
    description: siteConfig.description,
    images:      [siteConfig.ogImage],
  },

  /* ── Robots ── */
  robots: {
    index:  true,
    follow: true,
    googleBot: {
      index:              true,
      follow:             true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet":       -1,
    },
  },

  /* ── Icons ── */
  icons: {
    icon: [
      { url: "/favicon.ico",             sizes: "any" },
      { url: "/favicon-16x16.png",       sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png",       sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/favicon-16x16.png",
    apple:    "/apple-touch-icon.png",
  },

  /* ── Manifest ── */
  manifest: "/site.webmanifest",

  /* ── Verification (add values when available) ── */
  // verification: {
  //   google: "your-google-verification-code",
  // },
};

/* ── Viewport ── */
export const viewport = {
  themeColor:   "#101D25",
  width:        "device-width",
  initialScale: 1,
  maximumScale: 5,
};

/* ── JSON-LD Structured Data — Person schema ── */
const personSchema = {
  "@context": "https://schema.org",
  "@type":    "Person",
  name:       siteConfig.name,
  url:        siteConfig.url,
  jobTitle:   "Creative Developer & Designer",
  description: siteConfig.description,
  image:      `${siteConfig.url}${siteConfig.ogImage}`,
  sameAs: [
    siteConfig.social.github,
    siteConfig.social.linkedin,
    siteConfig.social.instagram,
  ],
  knowsAbout: [
    "Web Development",
    "Next.js",
    "React.js",
    "UI/UX Design",
    "Graphic Design",
    "Public Speaking",
  ],
  address: {
    "@type":           "PostalAddress",
    addressCountry:    "ID",
    addressLocality:   "Indonesia",
  },
  contactPoint: {
    "@type":       "ContactPoint",
    email:         siteConfig.social.email,
    contactType:   "professional",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="id"
      className={`${inter.variable} ${bergant.variable} ${cormorant.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        {/* Preconnect to Google Fonts CDN for faster font loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* DNS prefetch for external links */}
        <link rel="dns-prefetch" href="https://github.com" />
        <link rel="dns-prefetch" href="https://linkedin.com" />
      </head>
      <body className="bg-canvas text-ink antialiased">
        {/* Skip-to-content link — keyboard / screen reader accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-[var(--color-mint)] focus:text-[var(--color-canvas)] focus:font-semibold focus:text-sm"
        >
          Skip to main content
        </a>

        <ScrollProgress />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
