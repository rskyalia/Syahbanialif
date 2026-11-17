import Link from "next/link";
import Button from "@/components/ui/button";

export const metadata = {
  title: "404 — Page Not Found",
  description: "The page you are looking for doesn't exist or has been moved.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden">

      {/* Atmospheric decorative layer — purely visual, aria-hidden */}
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        {/* large ambient orb top-left */}
        <div
          className="absolute -top-1/4 -left-1/4 w-[70vw] h-[70vw] rounded-full"
          style={{
            background: "radial-gradient(circle at 50% 50%, rgba(35,81,90,0.35) 0%, transparent 70%)",
          }}
        />
        {/* smaller sky orb bottom-right */}
        <div
          className="absolute -bottom-1/4 -right-1/4 w-[50vw] h-[50vw] rounded-full"
          style={{
            background: "radial-gradient(circle at 50% 50%, rgba(168,217,237,0.12) 0%, transparent 70%)",
          }}
        />
        {/* fine grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(168,217,237,0.05) 1px, transparent 1px)," +
              "linear-gradient(to bottom, rgba(168,217,237,0.05) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            WebkitMaskImage:
              "radial-gradient(ellipse 70% 70% at 50% 50%, #000 20%, transparent 80%)",
            maskImage:
              "radial-gradient(ellipse 70% 70% at 50% 50%, #000 20%, transparent 80%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-lg mx-auto">

        {/* Giant 404 — decorative backdrop number */}
        <p
          className="font-display font-bold leading-none select-none pointer-events-none"
          style={{
            fontSize:   "clamp(6rem, 22vw, 14rem)",
            lineHeight:  1,
            background: "linear-gradient(135deg, rgba(184,216,199,0.18) 0%, rgba(168,217,237,0.10) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor:  "transparent",
            backgroundClip:       "text",
            userSelect: "none",
          }}
          aria-hidden="true"
        >
          404
        </p>

        {/* Glass card over the 404 */}
        <div
          className="-mt-10 md:-mt-16 rounded-3xl px-8 py-10"
          style={{
            background:          "rgba(24,52,58,0.35)",
            backdropFilter:      "blur(20px)",
            WebkitBackdropFilter:"blur(20px)",
            border:              "1px solid rgba(255,255,255,0.10)",
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.08), 0 20px 48px rgba(0,0,0,0.3)",
          }}
        >
          <h1
            className="font-display font-bold text-3xl sm:text-4xl mb-4"
            style={{ color: "var(--color-ink)" }}
          >
            Page Not Found
          </h1>

          <p
            className="text-base mb-8 leading-relaxed"
            style={{ color: "var(--color-ink-muted)" }}
          >
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>

          <Button as={Link} href="/" variant="primary" size="lg">
            Back to Home
          </Button>
        </div>

        {/* Subtle mono label */}
        <p
          className="mt-8 font-mono text-xs uppercase tracking-widest"
          style={{ color: "var(--color-ink-subtle)" }}
        >
          alifportfolio · 404
        </p>
      </div>
    </main>
  );
}
