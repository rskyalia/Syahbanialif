/**
 * Route-level loading UI — shown by Next.js during Suspense boundaries.
 * Uses CSS only (no GSAP) for maximum performance.
 */
export default function Loading() {
  return (
    <div
      className="flex min-h-screen items-center justify-center"
      style={{ background: "var(--color-canvas)" }}
      role="status"
      aria-label="Loading"
    >
      <div className="flex flex-col items-center gap-5">
        {/* Spinner */}
        <div
          className="w-10 h-10 rounded-full border-2 animate-spin"
          style={{
            borderColor:    "rgba(184,216,199,0.2)",
            borderTopColor: "var(--color-mint)",
          }}
          aria-hidden="true"
        />
        {/* Logo */}
        <span
          className="font-display font-bold text-xl"
          style={{ color: "var(--color-ink)" }}
        >
          Alif<span style={{ color: "var(--color-mint)" }}>.</span>
        </span>
      </div>
    </div>
  );
}
