"use client";

import { useRef, useState, useCallback } from "react";
import { gsap, useGSAP } from "@/animations/gsap-config";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import {
  SectionWrapper,
  SectionHeading,
  Card,
  Badge,
  Button,
} from "@/components/ui";
import { projects, projectCategories } from "@/data/projects";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectsSection() {
  const sectionRef  = useRef(null);
  const gridRef     = useRef(null);
  const [activeCategory, setActiveCategory]   = useState("all");
  const [isTransitioning, setIsTransitioning] = useState(false);

  const filteredProjects =
    activeCategory === "all"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  /* ── Category switch: fade-out → update → fade-in ── */
  const handleCategoryChange = useCallback(
    (id) => {
      if (id === activeCategory || isTransitioning) return;
      const cards = gridRef.current?.querySelectorAll(".project-card");
      if (!cards?.length) {
        setActiveCategory(id);
        return;
      }
      setIsTransitioning(true);
      gsap.to(cards, {
        opacity: 0,
        y:       20,
        duration: 0.3,
        stagger:  0.03,
        ease:    "power2.in",
        onComplete: () => {
          setActiveCategory(id);
          setIsTransitioning(false);
        },
      });
    },
    [activeCategory, isTransitioning]
  );

  /* ── Animate cards when filteredProjects changes ── */
  useGSAP(
    () => {
      const grid = gridRef.current;
      if (!grid) return;

      const cards = grid.querySelectorAll(".project-card");
      if (!cards.length) return;

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      /* Entry animation for all visible cards */
      gsap.fromTo(
        cards,
        { opacity: 0, y: 60, scale: 0.93 },
        {
          opacity:  1,
          y:        0,
          scale:    1,
          duration: 0.75,
          stagger:  { amount: 0.4 },
          ease:     "power3.out",
          clearProps: "transform",
          scrollTrigger: {
            trigger:       grid,
            start:         "top 85%",
            toggleActions: "play none none none",
            once:          true,
          },
        }
      );

      if (reduced) return;

      /* ── Per-card hover: image zoom + overlay ── */
      cards.forEach((card) => {
        const img     = card.querySelector(".proj-img");
        const overlay = card.querySelector(".proj-overlay");
        const title   = card.querySelector(".proj-title");

        if (!img) return;

        const tl = gsap.timeline({ paused: true });
        tl
          .to(img,     { scale: 1.08, duration: 0.55, ease: "power2.out" }, 0)
          .to(overlay, { opacity: 1,  duration: 0.4,  ease: "power2.out" }, 0)
          .to(title,   { color: "var(--color-mint)", duration: 0.3 }, 0);

        card.addEventListener("mouseenter", () => tl.play());
        card.addEventListener("mouseleave", () => tl.reverse());
      });
    },
    { scope: sectionRef, dependencies: [filteredProjects] }
  );

  return (
    <SectionWrapper
      id="projects"
      bg="transparent"
      className="py-24 md:py-32"
      style={{
        background: "linear-gradient(180deg, transparent, rgba(24,52,58,0.1) 50%, transparent)",
      }}
    >
      <div ref={sectionRef} className="container mx-auto px-4">

        {/* Heading */}
        <div className="mb-12 md:mb-16">
          <SectionHeading subtitle="Crafted with passion" title="Selected Works" align="center" />
          <p className="text-center text-[var(--color-ink-muted)] max-w-2xl mx-auto mt-6">
            A collection of projects showcasing skills in web development, design, and creative
            problem-solving.
          </p>
        </div>

        {/* Category filters */}
        <div
          className="flex flex-wrap justify-center gap-3 mb-12 md:mb-16"
          role="group"
          aria-label="Filter projects by category"
        >
          {projectCategories.map((cat) => {
            const isActive = activeCategory === cat.id;
            const count    = cat.id === "all"
              ? projects.length
              : projects.filter((p) => p.category === cat.id).length;

            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                disabled={isTransitioning}
                aria-pressed={activeCategory === cat.id}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 relative overflow-hidden ${
                  isActive
                    ? "text-[var(--color-canvas)] scale-105"
                    : "text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] border border-white/5"
                } ${isTransitioning ? "opacity-50 cursor-wait" : ""}`}
                style={{
                  background: isActive
                    ? "var(--color-mint)"
                    : "rgba(24,52,58,0.4)",
                  boxShadow: isActive
                    ? "0 0 20px rgba(184,216,199,0.25)"
                    : "none",
                }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  {cat.label}
                  <span className={`text-xs ${isActive ? "opacity-80" : "opacity-40"}`}>
                    ({count})
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <div
          ref={gridRef}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
          aria-live="polite"
          aria-label="Project list"
        >
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              className={`project-card ${project.featured ? "md:col-span-2" : ""}`}
            >
              <Card
                variant="glass"
                className="h-full overflow-hidden"
                style={{ willChange: "transform" }}
              >
                {/* Image area */}
                <div className="project-image-wrapper relative aspect-[16/10] overflow-hidden bg-[var(--color-canvas-mid)]">
                  {/* Placeholder gradient */}
                  <div
                    className="proj-img absolute inset-0 origin-center"
                    style={{
                      background:
                        "linear-gradient(135deg,rgba(184,216,199,0.18) 0%,rgba(168,217,237,0.1) 50%,rgba(184,216,199,0.08) 100%)",
                      willChange: "transform",
                    }}
                  />

                  {/* Letter placeholder */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="text-center">
                      <div className="w-20 h-20 mx-auto rounded-2xl bg-[var(--color-mint)]/10 border border-[var(--color-mint)]/20 flex items-center justify-center mb-3">
                        <span className="text-3xl font-display font-bold text-[var(--color-mint)]">
                          {project.title.charAt(0)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Hover overlay with links */}
                  <div
                    className="proj-overlay absolute inset-0 flex items-end justify-center pb-6 opacity-0"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(10,18,24,0.88) 0%, rgba(10,18,24,0.5) 50%, transparent 100%)",
                      pointerEvents: "none",
                    }}
                  >
                    <div className="flex gap-3">
                      {project.liveUrl && (
                        <div className="px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 text-[var(--color-canvas)]"
                          style={{ background: "var(--color-mint)" }}>
                          <ExternalLink className="w-4 h-4" />
                          View Live
                        </div>
                      )}
                      {project.repoUrl && (
                        <div className="px-4 py-2 rounded-lg bg-[var(--color-canvas-mid)] text-[var(--color-ink)] text-sm font-medium flex items-center gap-2">
                          <Github className="w-4 h-4" />
                          Source
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Badges */}
                  {project.featured && (
                    <div className="absolute top-4 left-4 z-10">
                      <Badge className="bg-[var(--color-mint)]/90 text-[var(--color-canvas)] backdrop-blur-sm">
                        Featured
                      </Badge>
                    </div>
                  )}
                  {project.year && (
                    <div className="absolute top-4 right-4 z-10">
                      <Badge variant="outline" className="backdrop-blur-sm">
                        {project.year}
                      </Badge>
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-[var(--color-mint)] uppercase tracking-wider">
                      {projectCategories.find((c) => c.id === project.category)?.label ?? project.category}
                    </span>
                    {project.role && (
                      <>
                        <span className="text-[var(--color-ink-subtle)]">•</span>
                        <span className="text-xs text-[var(--color-ink-subtle)]">{project.role}</span>
                      </>
                    )}
                  </div>

                  <h3 className="proj-title text-xl md:text-2xl font-display font-bold text-[var(--color-ink)] transition-colors duration-300">
                    {project.title}
                  </h3>

                  <p className="text-sm text-[var(--color-ink-muted)] leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, ti) => (
                      <span
                        key={ti}
                        className="text-xs px-3 py-1 rounded-full border"
                        style={{
                          background: "rgba(184,216,199,0.08)",
                          color:      "var(--color-mint)",
                          borderColor:"rgba(184,216,199,0.2)",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-3 pt-2">
                    {project.liveUrl ? (
                      <Button variant="primary" size="sm" asChild>
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                           className="inline-flex items-center gap-2">
                          View Project
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </Button>
                    ) : (
                      <Button variant="primary" size="sm" disabled className="opacity-50 cursor-not-allowed">
                        Coming Soon
                      </Button>
                    )}
                    {project.repoUrl && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={project.repoUrl} target="_blank" rel="noopener noreferrer"
                           className="inline-flex items-center gap-2">
                          <Github className="w-4 h-4" />
                          Source Code
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            </article>
          ))}
        </div>

        {/* Empty state */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-[var(--color-mint)]/10 border border-[var(--color-mint)]/20 flex items-center justify-center">
              <span className="text-3xl">📂</span>
            </div>
            <h3 className="text-xl font-display font-bold text-[var(--color-ink)] mb-2">
              No projects found
            </h3>
            <p className="text-[var(--color-ink-muted)]">Try selecting a different category</p>
          </div>
        )}

        {/* CTA */}
        {filteredProjects.length > 0 && (
          <div className="text-center mt-12">
            <Button variant="ghost" size="lg" className="group inline-flex items-center gap-2">
              View All Projects
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </div>
        )}

      </div>
    </SectionWrapper>
  );
}
