"use client";

import { ExternalLink, Github } from "lucide-react";

/**
 * Client component untuk action buttons di project detail page.
 * Dipisah karena butuh event handlers (onMouseEnter/Leave).
 */
export default function ProjectActions({ liveUrl, repoUrl, title }) {
  const btnBase = {
    display:         "flex",
    alignItems:      "center",
    justifyContent:  "center",
    gap:             "0.5rem",
    width:           "100%",
    padding:         "0.75rem",
    borderRadius:    "0.75rem",
    fontWeight:      600,
    fontSize:        "0.875rem",
    textDecoration:  "none",
    transition:      "all 0.25s ease",
    minHeight:       "48px",
    cursor:          "pointer",
    border:          "none",
  };

  return (
    <div className="space-y-3">
      {/* Visit Website */}
      {liveUrl ? (
        <a
          href={liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Visit ${title} live website`}
          style={{ ...btnBase, background: "var(--color-mint)", color: "var(--color-canvas)" }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "var(--color-mint-light)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "var(--color-mint)"; }}
        >
          <ExternalLink className="w-4 h-4" aria-hidden="true" />
          Visit Website
        </a>
      ) : (
        <span
          style={{
            ...btnBase,
            cursor:     "not-allowed",
            background: "rgba(184,216,199,0.08)",
            color:      "var(--color-ink-subtle)",
            border:     "1px solid rgba(184,216,199,0.15)",
          }}
        >
          <ExternalLink className="w-4 h-4" aria-hidden="true" />
          Website Coming Soon
        </span>
      )}

      {/* GitHub */}
      {repoUrl ? (
        <a
          href={repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View ${title} source code on GitHub`}
          style={{
            ...btnBase,
            background: "transparent",
            color:      "var(--color-ink-muted)",
            border:     "1px solid rgba(255,255,255,0.12)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "rgba(184,216,199,0.3)";
            e.currentTarget.style.color       = "var(--color-ink)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
            e.currentTarget.style.color       = "var(--color-ink-muted)";
          }}
        >
          <Github className="w-4 h-4" aria-hidden="true" />
          View on GitHub
        </a>
      ) : (
        <span
          style={{
            ...btnBase,
            cursor:     "not-allowed",
            background: "transparent",
            color:      "var(--color-ink-subtle)",
            border:     "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <Github className="w-4 h-4" aria-hidden="true" />
          Private Repository
        </span>
      )}
    </div>
  );
}
