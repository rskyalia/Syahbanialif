"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/animations/gsap-config";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin, Download } from "lucide-react";
import { SectionWrapper, SectionHeading } from "@/components/ui";
import { Button, Badge } from "@/components/ui";
import { personalInfo, stats } from "@/data/about";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef(null);
  const imageRef   = useRef(null);
  const imageInner = useRef(null);
  const contentRef = useRef(null);
  const statsRef   = useRef(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      /* ── Image: frame reveal ── */
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, scale: 0.92, y: 40 },
        {
          opacity: 1, scale: 1, y: 0, duration: 1.1, ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 78%", toggleActions: "play none none reverse" },
        }
      );

      /* ── Image inner: parallax drift ── */
      if (!reduced && imageInner.current) {
        gsap.to(imageInner.current, {
          yPercent: -12, ease: "none",
          scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: 1.5 },
        });
      }

      /* ── Content: stagger children ── */
      const kids = Array.from(contentRef.current?.children ?? []);
      gsap.fromTo(kids,
        { opacity: 0, y: 36 },
        {
          opacity: 1, y: 0, duration: 0.8, stagger: 0.13, ease: "power3.out",
          scrollTrigger: { trigger: contentRef.current, start: "top 80%", toggleActions: "play none none reverse" },
        }
      );

      /* ── Stats: animated counter ── */
      if (statsRef.current && !reduced) {
        const statEls = statsRef.current.querySelectorAll(".stat-num");
        statEls.forEach((el) => {
          const target = parseInt(el.dataset.target ?? "0", 10);
          const obj    = { val: 0 };
          gsap.to(obj, {
            val:      target,
            duration: 1.8,
            ease:     "power2.out",
            onUpdate: () => { el.textContent = Math.round(obj.val) + "+"; },
            scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none reset" },
          });
        });

        gsap.fromTo(
          statsRef.current.children,
          { opacity: 0, y: 20 },
          {
            opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power3.out",
            scrollTrigger: { trigger: statsRef.current, start: "top 85%", toggleActions: "play none none reverse" },
          }
        );
      }
    },
    { scope: sectionRef }
  );

  return (
    <SectionWrapper id="about" className="py-24 md:py-32">
      <div ref={sectionRef} className="container mx-auto px-4">

        <SectionHeading
          subtitle="Get to know me"
          title="About Me"
          align="center"
          className="mb-16 md:mb-20"
        />

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start max-w-7xl mx-auto">

          {/* ── Left: Image ── */}
          <div className="lg:col-span-5" ref={imageRef} style={{ opacity: 0 }}>
            <div className="relative group">

              {/* Glass frame */}
              <div
                className="relative aspect-[3/4] rounded-2xl overflow-hidden"
                style={{
                  backdropFilter: "blur(16px)",
                  background:     "rgba(24,52,58,0.3)",
                  border:         "1px solid rgba(255,255,255,0.1)",
                  boxShadow:      "0 20px 48px rgba(0,0,0,0.4)",
                }}
              >
                {/* Inner div moves with parallax */}
                <div
                  ref={imageInner}
                  className="absolute inset-0 scale-[1.12] origin-center"
                  style={{ willChange: "transform" }}
                >
                  {/* Foto profil nyata */}
                  <Image
                    src="/images/about/fotodiri.jpg"
                    alt={`Portrait photo of ${personalInfo.name}`}
                    fill
                    sizes="(max-width: 1024px) 90vw, 40vw"
                    className="object-cover object-center"
                    priority
                  />
                  {/* Subtle overlay untuk menjaga gradien di atas foto */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(10,18,24,0.35) 0%, transparent 60%)",
                    }}
                    aria-hidden="true"
                  />
                </div>

                {/* Corner accents */}
                <div className="absolute top-4 right-4 w-16 h-16 border-t-2 border-r-2 border-[var(--color-mint)]/30 rounded-tr-lg pointer-events-none" aria-hidden="true" />
                <div className="absolute bottom-4 left-4 w-16 h-16 border-b-2 border-l-2 border-[var(--color-sky)]/30 rounded-bl-lg pointer-events-none" aria-hidden="true" />
              </div>

              {/* Availability badge */}
              <div
                className="absolute -bottom-4 -right-4 rounded-2xl px-4 py-3"
                style={{
                  backdropFilter: "blur(16px)",
                  background:     "rgba(24,52,58,0.85)",
                  border:         "1px solid rgba(255,255,255,0.1)",
                  boxShadow:      "0 8px 24px rgba(0,0,0,0.3)",
                }}
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{
                      background: personalInfo.availability ? "var(--color-mint)" : "#f87171",
                      animation:  personalInfo.availability ? "pulse-dot 2s ease-in-out infinite" : "none",
                    }}
                    aria-hidden="true"
                  />
                  <span className="text-sm font-medium text-[var(--color-ink)]">
                    {personalInfo.availability ? (personalInfo.availabilityLabel ?? "Available for work") : "Currently busy"}
                  </span>
                </div>
              </div>
            </div>

            {/* Stats row */}
            {stats && stats.length > 0 && (
              <div ref={statsRef} className="grid grid-cols-3 gap-4 mt-12">
                {stats.map((stat, i) => (
                  <div key={i} className="text-center">
                    <p
                      className="stat-num text-2xl sm:text-3xl font-display font-bold"
                      style={{ color: "var(--color-mint)" }}
                      data-target={stat.value}
                      aria-label={`${stat.value}${stat.suffix} ${stat.label}`}
                    >
                      {stat.value}{stat.suffix}
                    </p>
                    <p className="text-xs text-[var(--color-ink-subtle)] mt-1 leading-tight">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ── Right: Content ── */}
          <div className="lg:col-span-7" ref={contentRef}>

            {/* Roles */}
            <div className="flex flex-wrap gap-2 mb-6">
              {personalInfo.roles.map((role, i) => (
                <Badge key={i} variant="outline">{role}</Badge>
              ))}
            </div>

            {/* Name */}
            <h3 className="text-4xl md:text-5xl font-display font-bold text-[var(--color-ink)] mb-3">
              {personalInfo.nickname}
            </h3>

            {/* Full name */}
            <p className="text-lg text-[var(--color-ink-muted)] mb-2">
              {personalInfo.name}
            </p>

            {/* Location */}
            <div className="flex items-center gap-2 text-[var(--color-ink-subtle)] mb-8">
              <MapPin className="w-4 h-4" aria-hidden="true" />
              <span className="text-sm">{personalInfo.location}</span>
            </div>

            {/* Bio */}
            <div className="mb-8">
              <p className="text-lg leading-relaxed text-[var(--color-ink-muted)]">
                {personalInfo.bio}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Button variant="primary" size="lg" asChild>
                <a
                  href="/curriculumvitae/alif'sresume.pdf"
                  download="Muhammad-Alif-Syahbani-CV.pdf"
                  className="inline-flex items-center gap-2"
                  aria-label="Download CV Muhammad Alif Sya'bani"
                >
                  <Download className="w-5 h-5" aria-hidden="true" />
                  Download CV
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="#contact">Get in Touch</a>
              </Button>
            </div>
          </div>

        </div>
      </div>

      {/* Keyframes for availability dot */}
      <style>{`
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.5; transform: scale(0.85); }
        }
      `}</style>
    </SectionWrapper>
  );
}
