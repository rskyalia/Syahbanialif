/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  /* ── Image optimization ── */
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [375, 430, 640, 750, 828, 1080, 1200, 1440, 1920],
    imageSizes:  [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year
    dangerouslyAllowSVG: false,
  },

  /* ── Remove console in production ── */
  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production"
        ? { exclude: ["error", "warn"] }
        : false,
  },

  /* ── GSAP must be transpiled for Next.js App Router ── */
  transpilePackages: ["gsap"],

  /* ── Security & performance headers ── */
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
      /* Long-cache for static assets */
      {
        source: "/_next/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      /* Cache video */
      {
        source: "/images/video/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
      /* Cache fonts */
      {
        source: "/fonts/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  /* ── Redirect legacy CV path to actual file ── */
  async redirects() {
    return [
      {
        source:      "/cv-muhammad-alif-syahbani.pdf",
        destination: "/curriculumvitae/alif'sresume.pdf",
        permanent:   false,
      },
    ];
  },
};

export default nextConfig;
