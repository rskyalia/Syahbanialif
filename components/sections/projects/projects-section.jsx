"use client";

import { useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap, useGSAP } from "@/animations/gsap-config";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink, Github, ArrowRight, BookOpen } from "lucide-react";
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

  /* ── Category switch: fade-out → update state → fade-in ── */
  const handleCategoryChange = useCallback(
    (id) => {
      if (id === activeCategory || isTransitioning) return;
      const cards = gridRef.current?.querySelectorAll(".project-card");
      if (!cards?.length) { setActiveCategory(id); return; }

      setIsTransitioning(true);
      gsap.to(cards, {
        opacity:  0,
        y:        20,
        duration: 0.3,
        stagger:  0.03,
        ease:     "power2.in",
        onComplete: () => {
          setActiveCategory(id);
          setIsTransitioning(false);
        },
      });
    },
    [activeCategory, isTransitioning]
  );

  /* ── Card animations ── */
  useGSAP(
    () => {
      const grid = gridRef.current;
      if (!grid) return;

      const cards = grid.querySelectorAll(".project-card");
      if (!cards.length) return;

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      /* Entry stagger */
      gsap.fromTo(
        cards,
        { opacity: 0, y: 60, scale: 0.93 },
        {
          opacity:    1,
          y:          0,
          scale:      1,
          duration:   0.75,
          stagger:    { amount: 0.4 },
          ease:       "power3.out",
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

      /* Hover: image zoom + overlay */
      cards.forEach((card) => {
        const imgWrap = card.querySelector(".proj-img-wrap");
        const overlay = card.querySelector(".proj-overlay");
        const title   = card.querySelector(".proj-title");
        if (!imgWrap) return;

        const tl = gsap.timeline({ paused: true });
        tl
          .to(imgWrap, { scale: 1.07, duration: 0.55, ease: "power2.out" }, 0)
          .to(overlay, { opacity: 1,  duration: 0.4,  ease: "power2.out" }, 0)
          .to(title,   { color: "var(--color-mint)", duration: 0.25 }, 0);

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

        {/* ── Category filters ── */}
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
                aria-pressed={isActive}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "text-[var(--color-canvas)] scale-105"
                    : "text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] border border-white/5"
                } ${isTransitioning ? "opacity-50 cursor-wait" : ""}`}
                style={{
                  background: isActive ? "var(--color-mint)" : "rgba(24,52,58,0.4)",
                  boxShadow:  isActive ? "0 0 20px rgba(184,216,199,0.25)" : "none",
                  minHeight:  "44px",
                }}
              >
                <span className="flex items-center gap-2">
                  {cat.label}
                  <span className={`text-xs ${isActive ? "opacity-80" : "opacity-40"}`}>
                    ({count})
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        {/* ── Project grid ── */}
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
                className="h-full overflow-hidden flex flex-col"
                style={{ willChange: "transform" }}
              >
                {/* ── Image area ── */}
                <div className="relative aspect-[16/10] overflow-hidden bg-[var(--color-canvas-mid)] flex-shrink-0">

                  {/* Image (zoom target) */}
                  <div
                    className="proj-img-wrap absolute inset-0 origin-center"
                    style={{ willChange: "transform" }}
                  >
                    <Image
                      src={project.image}
                      alt={`Screenshot of ${project.title}`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover object-top"
                      loading="lazy"
                    />
                  </div>

                  {/* Gradient overlay base — always visible for legibility */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(10,18,24,0.6) 0%, rgba(10,18,24,0.1) 50%, transparent 100%)",
                    }}
                    aria-hidden="true"
                  />

                  {/* Hover overlay — links appear on hover */}
                  <div
                    className="proj-overlay absolute inset-0 flex items-end justify-center pb-5 opacity-0 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(10,18,24,0.92) 0%, rgba(10,18,24,0.55) 55%, transparent 100%)",
                    }}
                  >
                    <div className="flex gap-3 pointer-events-auto">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Visit ${project.title} website`}
                          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-opacity duration-200 hover:opacity-90"
                          style={{ background: "var(--color-mint)", color: "var(--color-canvas)" }}
                        >
                          <ExternalLink className="w-4 h-4" aria-hidden="true" />
                          View Live
                        </a>
                      )}
                      {project.repoUrl && (
                        <a
                          href={project.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`View ${project.title} source code on GitHub`}
                          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-opacity duration-200 hover:opacity-90"
                          style={{
                            background: "rgba(255,255,255,0.12)",
                            color:      "var(--color-ink)",
                            border:     "1px solid rgba(255,255,255,0.15)",
                            backdropFilter: "blur(8px)",
                          }}
                        >
                          <Github className="w-4 h-4" aria-hidden="true" />
                          GitHub
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Featured badge */}
                  {project.featured && (
                    <div className="absolute top-3 left-3 z-10">
                      <Badge
                        className="backdrop-blur-sm text-[var(--color-canvas)]"
                        style={{ background: "rgba(184,216,199,0.9)" }}
                      >
                        Featured
                      </Badge>
                    </div>
                  )}

                  {/* Year badge */}
                  {project.year && (
                    <div className="absolute top-3 right-3 z-10">
                      <Badge variant="outline" className="backdrop-blur-sm">
                        {project.year}
                      </Badge>
                    </div>
                  )}
                </div>

                {/* ── Card body ── */}
                <div className="p-6 flex flex-col flex-1 gap-3">

                  {/* Category + role */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-mono text-[var(--color-mint)] uppercase tracking-wider">
                      {projectCategories.find((c) => c.id === project.category)?.label ?? project.category}
                    </span>
                    {project.role && (
                      <>
                        <span className="text-[var(--color-ink-subtle)]" aria-hidden="true">•</span>
                        <span className="text-xs text-[var(--color-ink-subtle)]">{project.role}</span>
                      </>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="proj-title text-xl md:text-2xl font-display font-bold text-[var(--color-ink)] transition-colors duration-300 leading-snug">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-[var(--color-ink-muted)] leading-relaxed flex-1">
                    {project.description}
                  </p>

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, ti) => (
                      <span
                        key={ti}
                        className="text-xs px-3 py-1 rounded-full border"
                        style={{
                          background:  "rgba(184,216,199,0.08)",
                          color:       "var(--color-mint)",
                          borderColor: "rgba(184,216,199,0.2)",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* ── Action buttons ── */}
                  <div className="flex flex-wrap gap-3 pt-1">
                    {project.liveUrl ? (
                      <Button variant="primary" size="sm" asChild>
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2"
                          aria-label={`Visit ${project.title} website`}
                        >
                          <ExternalLink className="w-4 h-4" aria-hidden="true" />
                          Visit Website
                        </a>
                      </Button>
                    ) : (
                      <span
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium cursor-not-allowed"
                        style={{
                          background: "rgba(184,216,199,0.1)",
                          color:      "var(--color-ink-subtle)",
                          border:     "1px solid rgba(184,216,199,0.15)",
                          minHeight:  "44px",
                        }}
                        aria-label="Website not yet available"
                      >
                        <ExternalLink className="w-4 h-4" aria-hidden="true" />
                        Coming Soon
                      </span>
                    )}

                    {project.repoUrl ? (
                      <Button variant="outline" size="sm" asChild>
                        <a
                          href={project.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2"
                          aria-label={`View ${project.title} on GitHub`}
                        >
                          <Github className="w-4 h-4" aria-hidden="true" />
                          GitHub
                        </a>
                      </Button>
                    ) : (
                      <span
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium cursor-not-allowed"
                        style={{
                          background: "transparent",
                          color:      "var(--color-ink-subtle)",
                          border:     "1px solid rgba(255,255,255,0.08)",
                          minHeight:  "44px",
                        }}
                        aria-label="Repository not public"
                      >
                        <Github className="w-4 h-4" aria-hidden="true" />
                        Private
                      </span>
                    )}

                    {/* Case Study — always shown */}
                    <Button variant="ghost" size="sm" asChild>
                      <Link
                        href={`/projects/${project.slug}`}
                        className="inline-flex items-center gap-2"
                        aria-label={`Read case study for ${project.title}`}
                      >
                        <BookOpen className="w-4 h-4" aria-hidden="true" />
                        Case Study
                      </Link>
                    </Button>
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
              <span className="text-3xl" aria-hidden="true">📂</span>
            </div>
            <h3 className="text-xl font-display font-bold text-[var(--color-ink)] mb-2">
              No projects found
            </h3>
            <p className="text-[var(--color-ink-muted)]">Try selecting a different category</p>
          </div>
        )}

      </div>
    </SectionWrapper>
  );
}
