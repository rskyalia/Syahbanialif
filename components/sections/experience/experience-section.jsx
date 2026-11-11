"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/animations/gsap-config";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Briefcase, GraduationCap, Award, Mic } from "lucide-react";
import { SectionWrapper, SectionHeading, Badge } from "@/components/ui";
import { experiences, education } from "@/data/experience";

gsap.registerPlugin(ScrollTrigger);

const typeIcons = { work: Briefcase, leadership: Award, speaking: Mic, education: GraduationCap };

export default function ExperienceSection() {
  const sectionRef  = useRef(null);
  const timelineRef = useRef(null);
  const progressRef = useRef(null);

  /* Merge + sort by date desc */
  const allItems = [
    ...experiences.map((e) => ({ ...e, _cat: "experience" })),
    ...education.map((e)   => ({ ...e, _cat: "education" })),
  ].sort((a, b) => {
    const aP = a.period.toLowerCase();
    const bP = b.period.toLowerCase();
    if (aP.includes("now")) return -1;
    if (bP.includes("now")) return 1;
    const aY = parseInt(aP.match(/\d{4}/)?.[0] ?? "0");
    const bY = parseInt(bP.match(/\d{4}/)?.[0] ?? "0");
    return bY - aY;
  });

  useGSAP(
    () => {
      const section  = sectionRef.current;
      const timeline = timelineRef.current;
      const progress = progressRef.current;
      if (!section || !timeline) return;

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      /* ── Scrub the center progress line ── */
      if (progress) {
        gsap.fromTo(
          progress,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease:   "none",
            scrollTrigger: {
              trigger: section,
              start:   "top 65%",
              end:     "bottom 25%",
              scrub:   1.2,
            },
          }
        );
      }

      /* ── Alternating item entrance ── */
      const items = timeline.querySelectorAll(".timeline-item");
      items.forEach((item, i) => {
        const isLeft = i % 2 === 0;
        gsap.fromTo(
          item,
          {
            opacity: 0,
            x:       reduced ? 0 : (isLeft ? -50 : 50),
          },
          {
            opacity:  1,
            x:        0,
            duration: 0.8,
            ease:     "power3.out",
            scrollTrigger: {
              trigger:       item,
              start:         "top 82%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      /* ── Icon nodes spring in ── */
      if (!reduced) {
        const icons = timeline.querySelectorAll(".timeline-icon");
        icons.forEach((icon) => {
          gsap.fromTo(
            icon,
            { scale: 0, rotate: -180, opacity: 0 },
            {
              scale:    1,
              rotate:   0,
              opacity:  1,
              duration: 0.6,
              ease:     "back.out(1.7)",
              scrollTrigger: {
                trigger:       icon,
                start:         "top 80%",
                toggleActions: "play none none reverse",
              },
            }
          );
        });
      }
    },
    { scope: sectionRef }
  );

  return (
    <SectionWrapper id="experience" className="py-24 md:py-32">
      <div ref={sectionRef} className="container mx-auto px-4">

        <SectionHeading
          subtitle="My professional journey"
          title="Experience & Education"
          align="center"
          className="mb-16 md:mb-20"
        />

        <div className="relative max-w-5xl mx-auto">

          {/* Center line track */}
          <div
            className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 hidden md:block"
            style={{ background: "rgba(255,255,255,0.08)" }}
          />

          {/* Animated progress line */}
          <div
            ref={progressRef}
            className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 origin-top hidden md:block"
            style={{
              transform:  "translateX(-50%) scaleY(0)",
              transformOrigin: "top center",
              background: "linear-gradient(to bottom,var(--color-mint),var(--color-sky),var(--color-mint))",
            }}
          />

          {/* Items */}
          <div ref={timelineRef} className="space-y-12 md:space-y-16">
            {allItems.map((item, index) => {
              const Icon   = typeIcons[item.type] || Briefcase;
              const isLeft = index % 2 === 0;

              return (
                <div
                  key={item.id ?? index}
                  className="timeline-item relative grid md:grid-cols-2 gap-8 md:gap-12"
                >
                  {/* ── Content ── */}
                  <div className={isLeft ? "md:text-right md:pr-8" : "md:col-start-2 md:pl-8"}>
                    <div
                      className="rounded-2xl p-6 transition-all duration-300 hover:scale-[1.015]"
                      style={{
                        backdropFilter: "blur(16px)",
                        background:     "rgba(24,52,58,0.4)",
                        border:         "1px solid rgba(255,255,255,0.08)",
                        boxShadow:      "0 8px 24px rgba(0,0,0,0.25)",
                      }}
                    >
                      <Badge variant="outline" className={`mb-3 ${isLeft ? "md:float-right md:ml-3" : ""}`}>
                        {item.period}
                      </Badge>

                      <h3 className="text-xl font-display font-bold text-[var(--color-ink)] mb-2 hover:text-[var(--color-mint)] transition-colors">
                        {item.position ?? item.degree}
                      </h3>

                      <p className="text-[var(--color-mint)] font-medium mb-3">
                        {item.company ?? item.institution}
                      </p>

                      <p className="text-sm text-[var(--color-ink-muted)] leading-relaxed mb-4">
                        {item.description}
                      </p>

                      {item.skills?.length > 0 && (
                        <div className={`flex flex-wrap gap-2 ${isLeft ? "md:justify-end" : ""}`}>
                          {item.skills.map((s, si) => (
                            <span
                              key={si}
                              className="text-xs px-2.5 py-1 rounded-full"
                              style={{
                                background:  "rgba(184,216,199,0.1)",
                                color:       "var(--color-mint)",
                                border:      "1px solid rgba(184,216,199,0.2)",
                              }}
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* ── Center icon ── */}
                  <div
                    className="timeline-icon absolute left-0 md:left-1/2 top-6 md:-translate-x-1/2 w-14 h-14 rounded-full z-10 flex items-center justify-center"
                    style={{
                      background: "linear-gradient(135deg,rgba(184,216,199,0.2),rgba(16,29,37,1))",
                      border:     "4px solid var(--color-canvas)",
                      boxShadow:  "0 0 0 1px rgba(184,216,199,0.2), 0 4px 12px rgba(0,0,0,0.4)",
                    }}
                  >
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{ background: "linear-gradient(135deg,rgba(184,216,199,0.25),rgba(168,217,237,0.2))" }}
                    >
                      <Icon className="w-5 h-5 text-[var(--color-mint)]" />
                    </div>
                  </div>

                  {/* Spacer for right-side items */}
                  {!isLeft && <div className="hidden md:block" />}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </SectionWrapper>
  );
}
