"use client";

import { useRef, useState, useCallback } from "react";
import { Download, ArrowRight } from "lucide-react";
import { gsap, useGSAP } from "@/animations/gsap-config";
import Preloader from "@/components/ui/preloader";
import ScrollIndicator from "@/components/ui/scroll-indicator";
import GradientOrb from "@/components/background/gradient-orb";
import FloatingElements from "@/components/background/floating-elements";

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

    // Overlay tetap konsisten, tidak fade out
    // gsap.to(overlayRef.current, {
    //   opacity: 0.6,
    //   ease:    "none",
    //   scrollTrigger: {
    //     trigger: sectionRef.current,
    //     start:   "30% top",
    //     end:     "bottom top",
    //     scrub:   2,
    //   },
    // });
  }, { dependencies: [preloaderDone], scope: sectionRef });

  return (
    <>
      <Preloader onComplete={handlePreloaderDone} />

      <section
        ref={sectionRef}
        id="home"
        aria-label="Hero — Muhammad Alif Sya'bani, Creative Developer"
        style={{
          position:  "relative",
          width:     "100%",
          minHeight: "100svh",
          overflow:  "hidden",
          margin:    0,
          padding:   0,
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

        {/* ── Cinematic layered overlay (tetap konsisten, tidak fade) ── */}
        <div
          ref={overlayRef}
          aria-hidden="true"
          style={{
            position:    "absolute",
            inset:       0,
            background:
              /* 1. Dark overlay di top untuk navbar contrast */
              "linear-gradient(to bottom, rgba(8, 16, 22, 0.75) 0%, rgba(8, 16, 22, 0.45) 16%, transparent 36%), " +
              /* 2. Central dark gradient untuk text readability */
              "radial-gradient(ellipse 75% 55% at 50% 50%, rgba(10, 20, 28, 0.65) 0%, rgba(10, 20, 28, 0.35) 65%, transparent 100%), " +
              /* 3. Horizontal vignette */
              "linear-gradient(to right, rgba(8, 16, 22, 0.40) 0%, transparent 25%, transparent 75%, rgba(8, 16, 22, 0.40) 100%), " +
              /* 4. Strong bottom gradient untuk seamless blend dengan section berikutnya */
              "linear-gradient(to top, var(--color-canvas) 0%, rgba(16, 29, 37, 0.90) 15%, rgba(16, 29, 37, 0.50) 35%, transparent 65%)",
            pointerEvents: "none",
          }}
        />

        {/* ── Atmospheric depth layer ── */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{ zIndex: 5 }}
        >
          {/* Fog settling at the base for cinematic depth */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 70% 50% at 50% 100%, rgba(11,21,29,0.6) 0%, transparent 60%)",
            }}
          />
          <GradientOrb
            color="rgba(35,81,90,0.45)"
            size={560}
            position={{ top: "12%", left: "8%" }}
            opacity={0.4}
            className="anim-drift"
          />
          <GradientOrb
            color="rgba(168,217,237,0.18)"
            size={480}
            position={{ bottom: "8%", right: "10%" }}
            opacity={0.35}
            className="anim-float"
          />
          <FloatingElements count={7} color="rgba(184,216,199,0.5)" />
        </div>

        {/* ── Content (Properly offset from fixed navbar with responsive vertical centering) ── */}
        <div
          style={{
            position:       "relative",
            width:          "100%",
            minHeight:      "100svh",
            display:        "flex",
            flexDirection:  "column",
            justifyContent: "center",
            alignItems:     "center",
            textAlign:      "center",
            paddingTop:     "clamp(120px, 16vh, 180px)",
            paddingBottom:  "clamp(85px, 11vh, 125px)",
            paddingLeft:    "clamp(1.25rem, 5vw, 3rem)",
            paddingRight:   "clamp(1.25rem, 5vw, 3rem)",
            zIndex:         10,
          }}
        >
          {/* Badge — completely clear of the floating navbar */}
          <div ref={badgeRef} style={{ marginBottom: "clamp(1rem, 2vh, 1.5rem)" }}>
            <span
              role="text"
              style={{
                display:              "inline-flex",
                alignItems:           "center",
                gap:                  "0.5em",
                padding:              "0.35em 1em",
                borderRadius:         "9999px",
                fontFamily:           "var(--font-mono)",
                fontSize:             "clamp(0.65rem, 1vw, 0.75rem)",
                fontWeight:           500,
                letterSpacing:        "0.18em",
                textTransform:        "uppercase",
                color:                "var(--color-sky)",
                background:           "rgba(10, 22, 30, 0.65)",
                border:               "1px solid rgba(168, 217, 237, 0.28)",
                boxShadow:            "0 4px 16px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.12)",
                backdropFilter:       "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  width:        "6px",
                  height:       "6px",
                  borderRadius: "50%",
                  background:   "var(--color-mint)",
                  flexShrink:   0,
                  animation:    "pulse-mint 2.5s ease-in-out infinite",
                }}
              />
              Creative Developer
            </span>
          </div>

          {/* Heading — fluid clamp sizing, editorial line-height, zero clipping */}
          <h1
            ref={headingRef}
            style={{
              fontFamily:    "var(--font-display)",
              fontWeight:    700,
              letterSpacing: "-0.025em",
              lineHeight:    1.12,
              color:         "#F5F7F5",
              fontSize:      "clamp(2.1rem, 5.5vw, 5.2rem)",
              maxWidth:      "18ch",
              margin:        "0 auto",
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

          {/* Description — high contrast against layered mountain backdrop */}
          <p
            ref={descRef}
            style={{
              fontFamily:   "var(--font-sans)",
              fontSize:     "clamp(0.92rem, 1.35vw, 1.12rem)",
              lineHeight:   1.68,
              color:        "rgba(245, 247, 245, 0.82)",
              maxWidth:     "52ch",
              marginTop:    "clamp(1.2rem, 2.2vh, 1.8rem)",
              marginBottom: 0,
              marginLeft:   "auto",
              marginRight:  "auto",
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
              gap:            "clamp(0.75rem, 1.5vw, 1.25rem)",
              marginTop:      "clamp(1.5rem, 3vh, 2.4rem)",
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
    ? {
        background: "var(--color-mint)",
        color: "var(--color-canvas)",
        boxShadow: "0 4px 16px rgba(184, 216, 199, 0.28)",
      }
    : {
        background:           "rgba(245,247,245,0.09)",
        color:                "#F5F7F5",
        border:               "1px solid rgba(245,247,245,0.22)",
        boxShadow:            "0 4px 16px rgba(0, 0, 0, 0.20)",
        backdropFilter:       "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
      };

  return (
    <a
      href={href}
      download={download}
      className="cta-item focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-mint)]"
      style={{ ...baseStyle, ...variantStyle }}
      onMouseEnter={(e) => {
        if (primary) {
          e.currentTarget.style.background = "var(--color-mint-light)";
          e.currentTarget.style.boxShadow  = "0 6px 24px rgba(184, 216, 199, 0.40)";
        } else {
          e.currentTarget.style.background   = "rgba(245,247,245,0.16)";
          e.currentTarget.style.borderColor  = "rgba(245,247,245,0.36)";
        }
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        if (primary) {
          e.currentTarget.style.background = "var(--color-mint)";
          e.currentTarget.style.boxShadow  = "0 4px 16px rgba(184, 216, 199, 0.28)";
        } else {
          e.currentTarget.style.background   = "rgba(245,247,245,0.09)";
          e.currentTarget.style.borderColor  = "rgba(245,247,245,0.22)";
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
