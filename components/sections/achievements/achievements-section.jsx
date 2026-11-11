"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/animations/gsap-config";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Trophy, Users, Mic, Palette, Star, X } from "lucide-react";
import { SectionWrapper, SectionHeading, Badge } from "@/components/ui";
import { achievements } from "@/data/experience";

gsap.registerPlugin(ScrollTrigger);

const categoryConfig = {
  competition: { label: "Competition",  Icon: Trophy,  color: "var(--color-mint)"       },
  leadership:  { label: "Leadership",   Icon: Users,   color: "var(--color-sky)"        },
  event:       { label: "Event",        Icon: Mic,     color: "rgba(184,216,199,0.85)"  },
  creative:    { label: "Creative",     Icon: Palette, color: "rgba(168,217,237,0.85)"  },
};

/* ── Lightbox ── */
function Lightbox({ item, onClose }) {
  if (!item) return null;
  const cfg = categoryConfig[item.category] ?? categoryConfig.event;

  return (
    <div
      className="fixed inset-0 z-[300] flex items-center justify-center p-4 md:p-8"
      style={{ background: "rgba(10,18,24,0.92)", backdropFilter: "blur(16px)" }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
    >
      <div
        className="relative max-w-2xl w-full rounded-2xl overflow-hidden"
        style={{
          background:   "rgba(24,52,58,0.95)",
          border:       "1px solid rgba(255,255,255,0.1)",
          boxShadow:    "0 32px 80px rgba(0,0,0,0.6)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image */}
        <div className="relative aspect-[16/10] w-full bg-[var(--color-canvas-mid)]">
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="(max-width: 768px) 95vw, 672px"
            className="object-cover object-center"
          />
        </div>

        {/* Info */}
        <div className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <cfg.Icon className="w-4 h-4 flex-shrink-0" style={{ color: cfg.color }} aria-hidden="true" />
                <span className="text-xs font-mono uppercase tracking-wider" style={{ color: cfg.color }}>
                  {cfg.label} · {item.year}
                </span>
              </div>
              <h3 className="text-xl font-display font-bold text-[var(--color-ink)] mb-2 leading-snug">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--color-ink-muted)" }}>
                {item.description}
              </p>
            </div>
          </div>
        </div>

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-200"
          style={{ background: "rgba(0,0,0,0.5)", color: "var(--color-ink)" }}
          aria-label="Close"
          onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(0,0,0,0.75)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(0,0,0,0.5)"; }}
        >
          <X className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

/* ── Achievement Card ── */
function AchievementCard({ item, onClick }) {
  const cfg = categoryConfig[item.category] ?? categoryConfig.event;

  return (
    <button
      className="achievement-card group text-left w-full rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
      style={{
        background:   "rgba(24,52,58,0.35)",
        border:       "1px solid rgba(255,255,255,0.08)",
        backdropFilter: "blur(12px)",
        willChange:   "transform",
      }}
      onClick={() => onClick(item)}
      aria-label={`View ${item.title}`}
    >
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden bg-[var(--color-canvas-mid)]">
        <div
          className="ach-img absolute inset-0 origin-center"
          style={{ willChange: "transform" }}
        >
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover object-center"
            loading="lazy"
          />
        </div>

        {/* Overlay */}
        <div
          className="ach-overlay absolute inset-0 opacity-0 flex items-center justify-center"
          style={{ background: "rgba(10,18,24,0.6)" }}
          aria-hidden="true"
        >
          <span className="text-sm font-medium text-white bg-black/40 px-4 py-2 rounded-full">
            Lihat Detail
          </span>
        </div>

        {/* Category badge */}
        <div className="absolute top-3 left-3 z-10">
          <span
            className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider px-2.5 py-1 rounded-full"
            style={{
              background:   "rgba(10,18,24,0.7)",
              color:        cfg.color,
              border:       `1px solid ${cfg.color}40`,
              backdropFilter: "blur(8px)",
            }}
          >
            <cfg.Icon className="w-3 h-3" aria-hidden="true" />
            {cfg.label}
          </span>
        </div>

        {/* Year */}
        <div className="absolute top-3 right-3 z-10">
          <span
            className="text-xs font-mono px-2.5 py-1 rounded-full"
            style={{
              background:   "rgba(10,18,24,0.7)",
              color:        "var(--color-ink-muted)",
              backdropFilter: "blur(8px)",
            }}
          >
            {item.year}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-base font-display font-bold text-[var(--color-ink)] leading-snug mb-2 group-hover:text-[var(--color-mint)] transition-colors duration-300">
          {item.title}
        </h3>
        <p className="text-xs leading-relaxed line-clamp-2" style={{ color: "var(--color-ink-muted)" }}>
          {item.description}
        </p>
      </div>
    </button>
  );
}

/* ── Main Section ── */
export default function AchievementsSection() {
  const sectionRef = useRef(null);
  const gridRef    = useRef(null);
  const [lightbox, setLightbox] = useState(null);

  useGSAP(
    () => {
      const grid = gridRef.current;
      if (!grid) return;

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const cards   = grid.querySelectorAll(".achievement-card");

      /* Entry stagger */
      gsap.fromTo(
        cards,
        { opacity: 0, y: reduced ? 0 : 50, scale: reduced ? 1 : 0.94 },
        {
          opacity:  1,
          y:        0,
          scale:    1,
          duration: 0.7,
          stagger:  { amount: 0.5 },
          ease:     "power3.out",
          scrollTrigger: {
            trigger:       grid,
            start:         "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      if (reduced) return;

      /* Hover: image zoom + overlay */
      cards.forEach((card) => {
        const img     = card.querySelector(".ach-img");
        const overlay = card.querySelector(".ach-overlay");
        if (!img) return;

        const tl = gsap.timeline({ paused: true });
        tl
          .to(img,     { scale: 1.07, duration: 0.5, ease: "power2.out" }, 0)
          .to(overlay, { opacity: 1,  duration: 0.35, ease: "power2.out" }, 0);

        card.addEventListener("mouseenter", () => tl.play());
        card.addEventListener("mouseleave", () => tl.reverse());
      });
    },
    { scope: sectionRef }
  );

  /* Close lightbox on Escape */
  const handleKeyDown = (e) => {
    if (e.key === "Escape") setLightbox(null);
  };

  return (
    <>
      <SectionWrapper id="achievements" className="py-24 md:py-32">
        <div
          ref={sectionRef}
          className="container mx-auto px-4"
          onKeyDown={handleKeyDown}
        >
          <SectionHeading
            subtitle="Prestasi & Pengakuan"
            title="Achievements"
            align="center"
            className="mb-16 md:mb-20"
          />

          {/* Stats summary */}
          <div className="flex flex-wrap justify-center gap-6 mb-14">
            {[
              { icon: Trophy, label: "Kompetisi",  count: achievements.filter(a => a.category === "competition").length  },
              { icon: Users,  label: "Kepemimpinan", count: achievements.filter(a => a.category === "leadership").length },
              { icon: Mic,    label: "Event",       count: achievements.filter(a => a.category === "event").length       },
              { icon: Palette,label: "Kreatif",     count: achievements.filter(a => a.category === "creative").length    },
            ].map(({ icon: Icon, label, count }) => (
              count > 0 && (
                <div
                  key={label}
                  className="flex items-center gap-3 px-5 py-3 rounded-full"
                  style={{
                    background:   "rgba(24,52,58,0.4)",
                    border:       "1px solid rgba(255,255,255,0.08)",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  <Icon className="w-4 h-4 text-[var(--color-mint)]" aria-hidden="true" />
                  <span className="text-sm font-medium text-[var(--color-ink)]">{count} {label}</span>
                </div>
              )
            ))}
          </div>

          {/* Grid */}
          <div
            ref={gridRef}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
            aria-label="Achievements gallery"
          >
            {achievements.map((item) => (
              <AchievementCard
                key={item.id}
                item={item}
                onClick={setLightbox}
              />
            ))}
          </div>

          {/* Disclaimer */}
          <p
            className="text-center text-xs mt-10 font-mono"
            style={{ color: "var(--color-ink-subtle)" }}
          >
            * Semua prestasi dan kegiatan di atas berdasarkan dokumentasi nyata.
          </p>
        </div>
      </SectionWrapper>

      {/* Lightbox */}
      {lightbox && (
        <Lightbox item={lightbox} onClose={() => setLightbox(null)} />
      )}
    </>
  );
}
