import GradientOrb from "./gradient-orb";

/**
 * AtmosphericBackground — global, fixed ambient depth layer.
 *
 * Sits behind all sections (z-0). It is the continuous "deep" atmosphere that
 * shows through transparent sections and at page edges.
 *
 * Pure Server Component: sizing and visibility are handled via responsive CSS classes,
 * avoiding hydration mismatch and client JavaScript execution.
 */
export default function AtmosphericBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Base ambient wash */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 65% at 50% 8%, rgba(35,81,90,0.22) 0%, transparent 55%)," +
            "radial-gradient(ellipse 70% 60% at 100% 95%, rgba(16,52,58,0.20) 0%, transparent 55%)," +
            "radial-gradient(ellipse 60% 50% at 0% 75%, rgba(35,81,90,0.14) 0%, transparent 52%)",
        }}
      />

      {/* Top-left Orb */}
      <GradientOrb
        color="rgba(35,81,90,0.45)"
        size={720}
        position={{ top: "-10%", left: "-8%" }}
        opacity={0.45}
        className="anim-drift max-md:!w-[420px] max-md:!h-[420px]"
      />

      {/* Bottom-right Orb */}
      <GradientOrb
        color="rgba(168,217,237,0.14)"
        size={600}
        position={{ bottom: "-14%", right: "-10%" }}
        opacity={0.4}
        className="anim-float max-md:!w-[360px] max-md:!h-[360px]"
      />

      {/* Center-right Orb (Desktop only) */}
      <GradientOrb
        color="rgba(184,216,199,0.12)"
        size={520}
        position={{ top: "42%", left: "55%" }}
        opacity={0.32}
        className="anim-drift hidden md:block"
      />
    </div>
  );
}
