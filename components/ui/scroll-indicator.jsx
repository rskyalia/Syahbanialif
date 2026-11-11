/**
 * ScrollIndicator — animated scroll down cue.
 * Uses CSS animation only (no GSAP overhead).
 */
export default function ScrollIndicator({ className = "" }) {
  return (
    <div
      className={`flex flex-col items-center gap-2 ${className}`}
      aria-hidden="true"
    >
      {/* Mouse outline */}
      <div
        className="relative rounded-full border"
        style={{
          width: "22px",
          height: "34px",
          borderColor: "rgba(245,247,245,0.3)",
        }}
      >
        {/* Scrolling dot */}
        <div
          className="absolute left-1/2 rounded-full"
          style={{
            width: "3px",
            height: "7px",
            background: "var(--color-mint)",
            transform: "translateX(-50%)",
            top: "5px",
            animation: "scroll-dot 2s cubic-bezier(0.16,1,0.3,1) infinite",
          }}
        />
      </div>

      {/* Label */}
      <span
        className="font-mono uppercase"
        style={{
          fontSize: "9px",
          letterSpacing: "0.2em",
          color: "rgba(245,247,245,0.4)",
        }}
      >
        Scroll
      </span>

      {/* Keyframes injected via style tag — no GSAP dependency */}
      <style>{`
        @keyframes scroll-dot {
          0%   { transform: translateX(-50%) translateY(0); opacity: 1; }
          60%  { transform: translateX(-50%) translateY(12px); opacity: 0; }
          61%  { transform: translateX(-50%) translateY(0); opacity: 0; }
          100% { transform: translateX(-50%) translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
