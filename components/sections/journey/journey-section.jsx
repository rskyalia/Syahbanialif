"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/animations/gsap-config";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Briefcase, GraduationCap, Users, Mic, Calendar } from "lucide-react";
import { SectionWrapper, SectionHeading, Badge } from "@/components/ui";
import { experiences, education } from "@/data/experience";

gsap.registerPlugin(ScrollTrigger);

const iconMap = { work: Briefcase, leadership: Users, speaking: Mic, education: GraduationCap };

/* ─────────────────────────────────────────────
   TimelineBlock — reusable per-entry card
───────────────────────────────────────────── */
function TimelineBlock({ item, isExp }) {
  const Icon = iconMap[item.type] || (isExp ? Briefcase : GraduationCap);
  return (
    <div className="timeline-item relative pl-16">
      {/* Icon node */}
      <div
        className="timeline-icon absolute left-0 top-0 w-10 h-10 rounded-full flex items-center justify-center"
        style={{
          background:   isExp
            ? "linear-gradient(135deg,rgba(184,216,199,0.2),rgba(168,217,237,0.15))"
            : "linear-gradient(135deg,rgba(168,217,237,0.2),rgba(184,216,199,0.15))",
          border:       isExp
            ? "2px solid rgba(184,216,199,0.4)"
            : "2px solid rgba(168,217,237,0.4)",
          backdropFilter: "blur(8px)",
        }}
      >
        <Icon
          className="w-5 h-5"
          style={{ color: isExp ? "var(--color-mint)" : "var(--color-sky)" }}
        />
      </div>

      {/* Card */}
      <div
        className="rounded-xl p-6 transition-all duration-300 hover:scale-[1.015]"
        style={{
          backdropFilter: "blur(16px)",
          background:     "rgba(24,52,58,0.3)",
          border:         "1px solid rgba(255,255,255,0.08)",
          boxShadow:      "0 8px 24px rgba(0,0,0,0.2)",
        }}
      >
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
          <div>
            <h4 className="text-lg font-display font-bold text-[var(--color-ink)] mb-1">
              {item.position ?? item.degree}
            </h4>
            <p
              className="font-medium"
              style={{ color: isExp ? "var(--color-mint)" : "var(--color-sky)" }}
            >
              {item.company ?? item.institution}
            </p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <Badge variant="label">
              <Calendar className="w-3 h-3" />
              {item.period}
            </Badge>
            {item.status === "current" && (
              <Badge variant="mint">Current</Badge>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-[var(--color-ink-muted)] leading-relaxed mb-4">
          {item.description}
        </p>

        {/* Skills */}
        {item.skills?.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {item.skills.map((s, si) => (
              <Badge key={si} variant="outline">{s}</Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   TimelineColumn — a labelled column with line
───────────────────────────────────────────── */
function TimelineColumn({ title, Icon, iconColor, items, isExp, timelineLineRef }) {
  return (
    <div className="mb-16">
      <h3 className="text-2xl md:text-3xl font-display font-bold text-[var(--color-ink)] mb-8 flex items-center gap-3">
        <Icon className="w-7 h-7" style={{ color: iconColor }} />
        {title}
      </h3>

      <div className="relative">
        {/* Background line track */}
        <div
          className="absolute left-[19px] top-8 bottom-8 w-[2px]"
          style={{
            background: `linear-gradient(to bottom, ${iconColor}50 0%, ${iconColor}20 70%, transparent 100%)`,
          }}
        />

        {/* Animated progress line (drawn in by GSAP via ref) */}
        {timelineLineRef && (
          <div
            ref={timelineLineRef}
            className="absolute left-[19px] top-8 bottom-8 w-[2px] origin-top"
            style={{
              transform:  "scaleY(0)",
              background: `linear-gradient(to bottom, ${iconColor} 0%, transparent 100%)`,
            }}
          />
        )}

        <div className="space-y-8">
          {items.map((item, i) => (
            <TimelineBlock key={item.id ?? i} item={item} isExp={isExp} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Main section
───────────────────────────────────────────── */
export default function JourneySection() {
  const sectionRef  = useRef(null);
  const expLineRef  = useRef(null);
  const eduLineRef  = useRef(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      /* ── Draw timeline lines with scroll-scrub ── */
      [expLineRef, eduLineRef].forEach((lineRef) => {
        if (!lineRef.current) return;
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          {
            scaleY:   1,
            ease:     "none",
            scrollTrigger: {
              trigger:  lineRef.current.closest(".relative"),
              start:    "top 70%",
              end:      "bottom 30%",
              scrub:    1,
            },
          }
        );
      });

      /* ── Stagger timeline items ── */
      const items = section.querySelectorAll(".timeline-item");
      items.forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0, x: reduced ? 0 : -44 },
          {
            opacity:  1,
            x:        0,
            duration: 0.75,
            ease:     "power3.out",
            scrollTrigger: {
              trigger:       item,
              start:         "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      /* ── Icon nodes: spring scale in ── */
      if (!reduced) {
        const icons = section.querySelectorAll(".timeline-icon");
        icons.forEach((icon) => {
          gsap.fromTo(
            icon,
            { scale: 0, rotate: -90, opacity: 0 },
            {
              scale:    1,
              rotate:   0,
              opacity:  1,
              duration: 0.55,
              ease:     "back.out(1.7)",
              scrollTrigger: {
                trigger:       icon,
                start:         "top 88%",
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
    <SectionWrapper id="journey" className="py-24 md:py-32">
      <div ref={sectionRef} className="container mx-auto px-4">

        <SectionHeading
          subtitle="My professional path"
          title="Experience & Education"
          align="center"
          className="mb-16 md:mb-20"
        />

        <div className="max-w-4xl mx-auto">
          <TimelineColumn
            title="Experience"
            Icon={Briefcase}
            iconColor="var(--color-mint)"
            items={experiences}
            isExp
            timelineLineRef={expLineRef}
          />
          <TimelineColumn
            title="Education"
            Icon={GraduationCap}
            iconColor="var(--color-sky)"
            items={education}
            isExp={false}
            timelineLineRef={eduLineRef}
          />
        </div>

      </div>
    </SectionWrapper>
  );
}
