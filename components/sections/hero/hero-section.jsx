"use client";

import { useRef, useState, useCallback } from "react";
import { Download, ArrowRight } from "lucide-react";
import { gsap, useGSAP } from "@/animations/gsap-config";
import Preloader from "@/components/ui/preloader";
import ScrollIndicator from "@/components/ui/scroll-indicator";

/** CV path — single source of truth */
const CV_PATH = "/curriculumvitae/alif'sresume.pdf";

/**
 * Hero Section — Full viewport cinematic background.
 * - Video background with parallax on scroll
 * - Cinematic entrance after preloader
 * - Fully keyboard accessible CTAs
 */
export default function HeroSection() {
  const sectionRef  = useRef(null);
  const videoRef    = useRef(null);
  const overlayRef  = useRef(null);
  const badgeRef    = useRef(null);
  const headingRef  = useRef(null);
  const descRef     = useRef(null);
  const ctaRef      = useRef(null);
  const scrollRef   = useRef(null);

  const [preloaderDone, setPreloaderDone] = useState(false);

  /* ── Entrance animation ── */
  const runEntrance = useCallback(() => {
    // Respect reduced motion
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      // Instant reveal for reduced motion users
      gsap.set(
        [videoRef.current, overlayRef.current, badgeRef.current, descRef.current, scrollRef.current],
        { opacity: 1, filter: "none" }
      );
      gsap.set(headingRef.current?.querySelectorAll(".hero-line") ?? [], { opacity: 1, y: 0 });
      gsap.set(ctaRef.current?.querySelectorAll(".cta-item") ?? [], { opacity: 1, y: 0 });
      return;
    }

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl
      .fromTo(
        videoRef.current,
        { filter: "brightness(0) saturate(0)" },
        { filter: "brightness(1) saturate(1)", duration: 1.8, ease: "power2.inOut" }
      )
      .fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.9 }, "-=0.9")
      .fromTo(badgeRef.current,   { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, "-=0.4")
      .fromTo(
        headingRef.current?.querySelectorAll(".hero-line") ?? [],
        { y: 44, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.12 },
        "-=0.25"
      )
      .fromTo(descRef.current, { y: 22, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, "-=0.4")
      .fromTo(
        ctaRef.current?.querySelectorAll(".cta-item") ?? [],
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55, stagger: 0.1 },
        "-=0.3"
      )
      .fromTo(scrollRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5 }, "-=0.15");
  }, []);

  const handlePreloaderDone = useCallback(() => {
    setPreloaderDone(true);
    runEntrance();
  }, [runEntrance]);

  /* ── Initial hidden state ── */
  useGSAP(() => {
    gsap.set(videoRef.current,   { filter: "brightness(0) saturate(0)" });
    gsap.set(overlayRef.current, { opacity: 0 });
    gsap.set(badgeRef.current,   { y: -20, opacity: 0 });
    if (headingRef.current) {
      gsap.set(headingRef.current.querySelectorAll(".hero-line"), { y: 44, opacity: 0 });
    }
    gsap.set(descRef.current, { y: 22, opacity: 0 });
    if (ctaRef.current) {
      gsap.set(ctaRef.current.querySelectorAll(".cta-item"), { y: 18, opacity: 0 });
    }
    gsap.set(scrollRef.current, { opacity: 0 });
  }, { scope: sectionRef });

  /* ── ScrollTrigger parallax ── */
  useGSAP(() => {
    if (!preloaderDone) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    gsap.to(videoRef.current, {
      yPercent: 18,
      ease:     "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start:   "top top",
        end:     "bottom top",
        scrub:   1.5,
      },
    });

    gsap.to(overlayRef.current, {
      opacity: 0.6,
      ease:    "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start:   "30% top",
        end:     "bottom top",
        scrub:   2,
      },
    });
  }, { dependencies: [preloaderDone], scope: sectionRef });

  return (
    <>
      <Preloader onComplete={handlePreloaderDone} />

      <section
        ref={sectionRef}
        id="home"
        aria-label="Hero — Muhammad Alif Sya'bani, Creative Developer"
        style={{
          position: "relative",
          width:    "100vw",
          height:   "100dvh",
          overflow: "hidden",
          margin:   0,
          padding:  0,
        }}
      >
        {/* ── Video background ── */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster="/images/og-image.jpg"
          aria-hidden="true"
          style={{
            position:        "absolute",
            top:             0,
            left:            0,
            width:           "100%",
            height:          "100%",
            objectFit:       "cover",
            objectPosition:  "center 40%",
            transform:       "scale(1.08)",
            transformOrigin: "center center",
            willChange:      "transform",
          }}
        >
          <source src="/images/video/cinematictrailvideo.mp4" type="video/mp4" />
          {/* Poster fallback if video can't load */}
        </video>

        {/* ── Cinematic overlay ── */}
        <div
          ref={overlayRef}
          aria-hidden="true"
          style={{
            position:    "absolute",
            inset:       0,
            background:
              "linear-gradient(to top, rgba(10,18,24,0.88) 0%, rgba(10,18,24,0.5) 35%, rgba(10,18,24,0.15) 60%, transparent 100%), " +
              "linear-gradient(to right, rgba(10,18,24,0.4) 0%, rgba(10,18,24,0.08) 50%, transparent 100%), " +
              "radial-gradient(ellipse at center, transparent 50%, rgba(5,10,15,0.5) 100%)",
            pointerEvents: "none",
          }}
        />

        {/* ── Content ── */}
        <div
          style={{
            position:       "absolute",
            inset:          0,
            display:        "flex",
            flexDirection:  "column",
            justifyContent: "center",
            alignItems:     "center",
            textAlign:      "center",
            padding:        "clamp(1.5rem, 5vw, 4rem)",
            zIndex:         10,
          }}
        >
          {/* Badge */}
          <div ref={badgeRef} style={{ marginBottom: "clamp(0.8rem, 1.8vw, 1.4rem)" }}>
            <span
              role="text"
              style={{
                display:         "inline-flex",
                alignItems:      "center",
                gap:             "0.5em",
                padding:         "0.32em 0.95em",
                borderRadius:    "9999px",
                fontFamily:      "var(--font-mono)",
                fontSize:        "clamp(0.62rem, 1vw, 0.72rem)",
                fontWeight:      500,
                letterSpacing:   "0.18em",
                textTransform:   "uppercase",
                color:           "var(--color-sky)",
                background:      "rgba(168,217,237,0.1)",
                border:          "1px solid rgba(168,217,237,0.24)",
                backdropFilter:  "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  width:        "5px",
                  height:       "5px",
                  borderRadius: "50%",
                  background:   "var(--color-mint)",
                  flexShrink:   0,
                  animation:    "pulse-mint 2.5s ease-in-out infinite",
                }}
              />
              Creative Developer
            </span>
          </div>

          {/* Heading */}
          <h1
            ref={headingRef}
            style={{
              fontFamily:    "var(--font-display)",
              fontWeight:    700,
              letterSpacing: "-0.025em",
              lineHeight:    1.06,
              color:         "#F5F7F5",
              fontSize:      "clamp(2.2rem, 6vw, 5.5rem)",
              maxWidth:      "16ch",
              margin:        0,
            }}
          >
            <span className="hero-line" style={{ display: "block" }}>
              Building Digital
            </span>
            <span className="hero-line" style={{ display: "block" }}>
              <span
                style={{
                  background:           "linear-gradient(120deg, #E8F5EE 0%, var(--color-mint) 40%, var(--color-sky) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor:  "transparent",
                  backgroundClip:      "text",
                }}
              >
                Experiences
              </span>
            </span>
            <span className="hero-line" style={{ display: "block" }}>
              Beyond Boundaries.
            </span>
          </h1>

          {/* Description */}
          <p
            ref={descRef}
            style={{
              fontFamily:  "var(--font-sans)",
              fontSize:    "clamp(0.85rem, 1.5vw, 1.08rem)",
              lineHeight:  1.65,
              color:       "rgba(245,247,245,0.65)",
              maxWidth:    "48ch",
              marginTop:   "clamp(1rem, 2vw, 1.5rem)",
              marginBottom: 0,
            }}
          >
            Combining technology, creativity, and meaningful ideas to create
            impactful digital experiences.
          </p>

          {/* CTA buttons */}
          <div
            ref={ctaRef}
            style={{
              display:        "flex",
              flexWrap:       "wrap",
              justifyContent: "center",
              gap:            "clamp(0.65rem, 1.3vw, 0.95rem)",
              marginTop:      "clamp(1.4rem, 2.8vw, 2.2rem)",
            }}
          >
            <CTAButton
              href="#projects"
              primary
              icon={<ArrowRight size={15} strokeWidth={2.5} aria-hidden="true" />}
            >
              Explore My Work
            </CTAButton>

            <CTAButton
              href={CV_PATH}
              download="Muhammad-Alif-Syahbani-CV.pdf"
              icon={<Download size={14} strokeWidth={2} aria-hidden="true" />}
            >
              Download CV
            </CTAButton>
          </div>
        </div>

        {/* ── Scroll indicator ── */}
        <div
          ref={scrollRef}
          style={{
            position:  "absolute",
            bottom:    "clamp(16px, 2.5vh, 28px)",
            left:      "50%",
            transform: "translateX(-50%)",
            zIndex:    15,
          }}
        >
          <ScrollIndicator />
        </div>

        {/* Keyframes */}
        <style>{`
          @keyframes pulse-mint {
            0%, 100% { opacity: 1;   transform: scale(1); }
            50%       { opacity: 0.4; transform: scale(0.82); }
          }
        `}</style>
      </section>
    </>
  );
}

/* ── CTA Button ── */
function CTAButton({ href, primary = false, download, icon, children }) {
  const baseStyle = {
    display:         "inline-flex",
    alignItems:      "center",
    gap:             "0.48em",
    padding:         "clamp(0.6rem, 1.1vw, 0.85rem) clamp(1.2rem, 2.2vw, 1.85rem)",
    borderRadius:    "9999px",
    fontFamily:      "var(--font-sans)",
    fontWeight:      primary ? 600 : 500,
    fontSize:        "clamp(0.78rem, 1.15vw, 0.92rem)",
    textDecoration:  "none",
    transition:      "all 0.28s cubic-bezier(0.16,1,0.3,1)",
    cursor:          "pointer",
    whiteSpace:      "nowrap",
    border:          "none",
    /* Minimum touch target — 44×44px per WCAG 2.5.5 */
    minHeight:       "44px",
    minWidth:        "44px",
  };

  const variantStyle = primary
    ? { background: "var(--color-mint)", color: "var(--color-canvas)" }
    : {
        background:          "rgba(245,247,245,0.09)",
        color:               "#F5F7F5",
        border:              "1px solid rgba(245,247,245,0.2)",
        backdropFilter:      "blur(14px)",
        WebkitBackdropFilter:"blur(14px)",
      };

  return (
    <a
      href={href}
      download={download}
      className="cta-item"
      style={{ ...baseStyle, ...variantStyle }}
      onMouseEnter={(e) => {
        if (primary) {
          e.currentTarget.style.background = "var(--color-mint-light)";
        } else {
          e.currentTarget.style.background   = "rgba(245,247,245,0.15)";
          e.currentTarget.style.borderColor  = "rgba(245,247,245,0.32)";
        }
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        if (primary) {
          e.currentTarget.style.background = "var(--color-mint)";
        } else {
          e.currentTarget.style.background   = "rgba(245,247,245,0.09)";
          e.currentTarget.style.borderColor  = "rgba(245,247,245,0.2)";
        }
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {!primary && icon}
      {children}
      {primary && icon}
    </a>
  );
}
