"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/animations/gsap-config";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Code2, Database, Palette, Sparkles, Cpu, Layers,
} from "lucide-react";
import { SectionWrapper, SectionHeading, Card } from "@/components/ui";
import { skills } from "@/data/about";

gsap.registerPlugin(ScrollTrigger);

const iconMap = { Code2, Database, Palette, Sparkles, Cpu, Layers };

export default function SkillsSection() {
  const sectionRef = useRef(null);
  const gridRef    = useRef(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const grid    = gridRef.current;
      if (!section || !grid) return;

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const cards   = Array.from(grid.children);

      /* ── Entry: stagger cards from below ── */
      gsap.fromTo(
        cards,
        { opacity: 0, y: 55, scale: 0.94 },
        {
          opacity:  1,
          y:        0,
          scale:    1,
          duration: 0.75,
          stagger:  { amount: 0.5, from: "start" },
          ease:     "power3.out",
          scrollTrigger: {
            trigger:       grid,
            start:         "top 82%",
            toggleActions: "play none none reverse",
          },
        }
      );

      if (reduced) return;

      /* ── Hover: each card ── */
      cards.forEach((card) => {
        const icon   = card.querySelector(".skill-icon");
        const dot    = card.querySelector(".skill-icon-dot");
        const items  = card.querySelectorAll(".skill-item");
        const glow   = card.querySelector(".card-glow");

        // Create a reusable hover timeline (paused)
        const hoverTl = gsap.timeline({ paused: true });

        hoverTl
          .to(glow,  { opacity: 1, duration: 0.35, ease: "power2.out" }, 0)
          .to(icon,  { scale: 1.12, rotate: 8, duration: 0.35, ease: "back.out(1.7)" }, 0)
          .to(dot,   { scale: 1.4, opacity: 1, duration: 0.3, ease: "back.out(2)" }, 0)
          .to(items, {
            x:       5,
            duration: 0.3,
            stagger:  0.03,
            ease:    "power2.out",
          }, 0.05);

        card.addEventListener("mouseenter", () => hoverTl.play());
        card.addEventListener("mouseleave", () => hoverTl.reverse());
      });
    },
    { scope: sectionRef }
  );

  return (
    <SectionWrapper
      id="skills"
      bg="transparent"
      className="py-24 md:py-32"
      style={{
        background: "linear-gradient(180deg, transparent, rgba(24,52,58,0.18) 50%, transparent)",
      }}
    >
      <div ref={sectionRef} className="container mx-auto px-4">

        {/* Heading */}
        <SectionHeading
          subtitle="What I bring to the table"
          title="Technical Skills"
          align="center"
          className="mb-16 md:mb-20"
        />

        {/* Grid */}
        <div
          ref={gridRef}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto"
        >
          {skills.map((group, i) => {
            const Icon = iconMap[group.icon] || Code2;

            return (
              <Card
                key={i}
                variant="glass"
                className="relative overflow-hidden cursor-default"
                style={{ willChange: "transform" }}
              >
                {/* Glow overlay — appears on hover via GSAP */}
                <div
                  className="card-glow absolute inset-0 pointer-events-none opacity-0"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(184,216,199,0.07) 0%, rgba(168,217,237,0.05) 100%)",
                  }}
                />

                {/* Corner shine */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[var(--color-mint)]/8 to-transparent opacity-0 group-hover:opacity-100 pointer-events-none" />

                {/* Content */}
                <div className="relative z-10 p-6">

                  {/* Icon */}
                  <div
                    className="skill-icon w-14 h-14 rounded-xl flex items-center justify-center mb-4"
                    style={{
                      background: "linear-gradient(135deg,rgba(184,216,199,0.18),rgba(168,217,237,0.12))",
                      border:     "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    <Icon className="w-7 h-7 text-[var(--color-mint)]" />
                  </div>

                  {/* Category */}
                  <h3 className="text-xl font-display font-bold text-[var(--color-ink)] mb-4">
                    {group.category}
                  </h3>

                  {/* Items */}
                  <div className="space-y-2">
                    {group.items.map((skill, si) => (
                      <div
                        key={si}
                        className="skill-item flex items-center gap-2 text-sm text-[var(--color-ink-muted)]"
                      >
                        <div
                          className="skill-icon-dot w-1.5 h-1.5 rounded-full flex-shrink-0"
                          style={{ background: "rgba(184,216,199,0.55)" }}
                        />
                        <span>{skill}</span>
                      </div>
                    ))}
                  </div>

                </div>
              </Card>
            );
          })}
        </div>

      </div>
    </SectionWrapper>
  );
}
