"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Menu, X } from "lucide-react";
import { gsap, useGSAP } from "@/animations/gsap-config";
import { cn } from "@/lib/utils";
import { navLinks } from "@/data/navigation";
import { useScrollPosition, useActiveSection } from "@/hooks";
import Button from "@/components/ui/button";
import IconButton from "@/components/ui/icon-button";

/**
 * Section ids in document order — module-level constant so the
 * scrollspy hook receives a referentially-stable array.
 */
const SECTION_IDS = navLinks.map((l) => l.href.replace("#", ""));

export default function Header() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { isScrolled } = useScrollPosition(40);
  const activeId       = useActiveSection(SECTION_IDS, 0.4);

  const rootRef       = useRef(null);   // wraps header + mobile menu (GSAP scope)
  const headerRef     = useRef(null);   // fixed header bar
  const pillRef       = useRef(null);   // the floating glass pill
  const navListRef    = useRef(null);   // desktop <ul>
  const indicatorRef  = useRef(null);   // active mint indicator
  const mobileNavRef  = useRef(null);   // mobile dialog container
  const backdropRef   = useRef(null);   // mobile backdrop
  const activeIdRef   = useRef(activeId);

  /* keep a ref copy of activeId so the indicator positioner stays stable */
  useEffect(() => { activeIdRef.current = activeId; }, [activeId]);

  /* ── Entrance animation ── */
  useGSAP(
    () => {
      const header = headerRef.current;
      if (!header) return;

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      gsap.fromTo(
        header,
        { y: reduced ? 0 : -24, opacity: 0 },
        {
          y:        0,
          opacity:  1,
          duration: reduced ? 0.3 : 0.8,
          ease:     "power3.out",
          delay:    reduced ? 0.5 : 2.1,
        }
      );
    },
    { scope: rootRef }
  );

  /* ── Position the active indicator under the current link ── */
  const firstIndicator = useRef(true);

  const positionIndicator = useCallback((animate) => {
    const list      = navListRef.current;
    const indicator = indicatorRef.current;
    if (!list || !indicator) return;

    // Indicator is desktop-only; bail (and hide) when the desktop list is off.
    const isDesktop = window.matchMedia("(min-width: 768px)").matches;
    if (!isDesktop) {
      gsap.set(indicator, { width: 0, x: 0, opacity: 0 });
      return;
    }

    const activeLink = list.querySelector(`[data-href="#${activeIdRef.current}"]`);
    if (!activeLink || activeLink.offsetWidth === 0) return;

    const x = activeLink.offsetLeft;
    const w = activeLink.offsetWidth;

    if (animate && !firstIndicator.current) {
      gsap.to(indicator, { x, width: w, opacity: 1, duration: 0.45, ease: "power3.out" });
    } else {
      gsap.set(indicator, { x, width: w, opacity: 1 });
      firstIndicator.current = false;
    }
  }, []);

  // Re-position whenever the active section changes.
  useEffect(() => {
    positionIndicator(true);
  }, [activeId, positionIndicator]);

  // Re-position on resize (breakpoint changes the visible link set) and
  // once web fonts have loaded (link widths shift with the font swap).
  useEffect(() => {
    let rafId = null;
    const onResize = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => positionIndicator(false));
    };
    window.addEventListener("resize", onResize, { passive: true });
    if (typeof document !== "undefined" && document.fonts?.ready) {
      document.fonts.ready.then(() => positionIndicator(false)).catch(() => {});
    }
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
    };
  }, [positionIndicator]);

  /* ── Scroll-based glass transformation: subtle scale (GSAP) ──
     Opacity / blur / saturation are handled by the .is-scrolled CSS class
     transition; the scale is driven here with GSAP for a smooth settle. */
  useEffect(() => {
    const pill = pillRef.current;
    if (!pill) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      gsap.set(pill, { scale: 1 });
      return;
    }
    gsap.to(pill, { scale: isScrolled ? 0.985 : 1, duration: 0.5, ease: "power3.out" });
  }, [isScrolled]);

  /* ── Pointer-follow glow: track cursor across the glass ── */
  const handlePointerGlow = useCallback((e) => {
    const pill = pillRef.current;
    if (!pill) return;
    const rect = pill.getBoundingClientRect();
    if (rect.width === 0) return;
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    pill.style.setProperty("--lg-mx", `${x}%`);
    pill.style.setProperty("--lg-my", `${y}%`);
  }, []);

  /* ── Mobile menu: staggered open / close (GSAP, bidirectional) ──
     A plain effect (not useGSAP) is used because useGSAP reverts the
     previous context on dependency change, which would snap the panel
     shut instead of animating the close. We kill in-flight tweens on
     cleanup without reverting, so each open/close plays out fully. */
  useEffect(() => {
    const panel    = mobileNavRef.current;
    const backdrop = backdropRef.current;
    if (!panel || !backdrop) return;

    const items    = panel.querySelectorAll("[data-mobile-item]");
    const reduced  = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isMobileOpen) {
      if (reduced) {
        gsap.set(backdrop, { opacity: 1 });
        gsap.set(panel, { yPercent: 0 });
        gsap.set(items, { opacity: 1, y: 0 });
      } else {
        gsap.to(backdrop, { opacity: 1, duration: 0.4, ease: "power2.out" });
        gsap.fromTo(
          panel,
          { yPercent: 100 },
          { yPercent: 0, duration: 0.5, ease: "power3.out" }
        );
        gsap.fromTo(
          items,
          { opacity: 0, y: 14 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.06,
            ease: "power3.out",
            delay: 0.12,
          }
        );
      }
    } else {
      if (reduced) {
        gsap.set(backdrop, { opacity: 0 });
        gsap.set(panel, { yPercent: 100 });
        gsap.set(items, { opacity: 0, y: 14 });
      } else {
        gsap.to(backdrop, { opacity: 0, duration: 0.3, ease: "power2.in" });
        gsap.to(panel, { yPercent: 100, duration: 0.35, ease: "power3.in" });
        gsap.to(items, { opacity: 0, y: 10, duration: 0.25, stagger: 0.03, ease: "power2.in" });
      }
    }

    return () => {
      gsap.killTweensOf([backdrop, panel, items]);
    };
  }, [isMobileOpen]);

  /* ── Close on resize to desktop ── */
  useEffect(() => {
    const mql     = window.matchMedia("(min-width: 768px)");
    const handler = (e) => { if (e.matches) setIsMobileOpen(false); };
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  /* ── Lock body scroll when mobile menu open ── */
  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileOpen]);

  /* ── Close on Escape key ── */
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape" && isMobileOpen) setIsMobileOpen(false);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isMobileOpen]);

  const closeMenu = useCallback(() => setIsMobileOpen(false), []);

  return (
    <div ref={rootRef}>
      <header
        ref={headerRef}
        className="fixed inset-x-0 top-0 z-[1000] px-3 sm:px-6 pt-4 sm:pt-6 pointer-events-none"
        style={{ opacity: 0 }}
      >
        <nav
          ref={pillRef}
          onMouseMove={handlePointerGlow}
          className={cn(
            "liquid-glass rounded-pill pointer-events-auto",
            "mx-auto w-full max-w-4xl",
            "px-3.5 sm:px-5 py-2 sm:py-2.5",
            isScrolled && "is-scrolled"
          )}
          aria-label="Main navigation"
        >
          <div className="relative z-10 flex items-center justify-between gap-2 sm:gap-3">

            {/* Logo */}
            <a
              href="#home"
              onClick={closeMenu}
              className="font-brand font-bold tracking-tight text-xl transition-colors duration-300 hover:text-[var(--color-mint)] flex items-center gap-0.5 select-none"
              style={{ color: "#F5F7F5", fontFamily: "var(--font-brand)" }}
              aria-label="Muhammad Alif Sya'bani — back to top"
            >
              Alif<span style={{ color: "var(--color-mint)" }} aria-hidden="true">.</span>
            </a>

            {/* Desktop nav */}
            <ul ref={navListRef} className="relative hidden md:flex items-center gap-0.5 lg:gap-1" role="list">
              <span ref={indicatorRef} className="lg-nav-indicator" aria-hidden="true" />
              {navLinks.map((link) => {
                const isActive = activeId === link.href.slice(1);
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      data-href={link.href}
                      aria-current={isActive ? "page" : undefined}
                      className={cn("lg-nav-link text-xs lg:text-sm", isActive && "is-active")}
                    >
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>

            {/* Desktop CTA */}
            <div className="hidden md:block">
              <Button as="a" href="#contact" variant="primary" size="sm" className="shadow-mint">
                Let&apos;s Talk
              </Button>
            </div>

            {/* Mobile toggle — animated hamburger ↔ X */}
            <IconButton
              variant="ghost"
              size="md"
              label={isMobileOpen ? "Close navigation menu" : "Open navigation menu"}
              className="md:hidden relative text-white hover:text-[var(--color-mint)]"
              onClick={() => setIsMobileOpen((p) => !p)}
              aria-expanded={isMobileOpen}
              aria-controls="mobile-nav"
              aria-haspopup="dialog"
            >
              <span
                aria-hidden="true"
                className="absolute inset-0 flex items-center justify-center transition-all duration-300 ease-smooth"
                style={{
                  opacity:   isMobileOpen ? 0 : 1,
                  transform: isMobileOpen ? "rotate(90deg) scale(0.5)" : "rotate(0deg) scale(1)",
                }}
              >
                <Menu size={20} aria-hidden="true" />
              </span>
              <span
                aria-hidden="true"
                className="absolute inset-0 flex items-center justify-center transition-all duration-300 ease-smooth"
                style={{
                  opacity:   isMobileOpen ? 1 : 0,
                  transform: isMobileOpen ? "rotate(0deg) scale(1)" : "rotate(-90deg) scale(0.5)",
                }}
              >
                <X size={20} aria-hidden="true" />
              </span>
            </IconButton>
          </div>
        </nav>
      </header>

      {/* ── Mobile menu ── */}
      <div
        id="mobile-nav"
        ref={mobileNavRef}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        inert={!isMobileOpen ? "true" : undefined}
        className={cn(
          "fixed inset-0 z-40 md:hidden flex flex-col",
          isMobileOpen ? "pointer-events-auto" : "pointer-events-none"
        )}
      >
        {/* Backdrop */}
        <div
          ref={backdropRef}
          className="absolute inset-0"
          style={{ background: "rgba(10,18,22,0.60)", opacity: 0 }}
          onClick={closeMenu}
          aria-hidden="true"
        />

        {/* Slide-up liquid glass panel */}
        <nav
          aria-label="Mobile navigation links"
          className="liquid-glass-panel relative mt-auto rounded-t-3xl p-6 pb-10 sm:mx-4 sm:rounded-3xl"
          style={{ transform: "translateY(100%)" }}
        >
          <div className="mx-auto w-full max-w-md">
            {/* Grab handle */}
            <div
              aria-hidden="true"
              className="mx-auto mb-5 h-1 w-10 rounded-pill"
              style={{ background: "rgba(255,255,255,0.25)" }}
            />

            <ul className="flex flex-col gap-1 mb-6" role="list">
              {navLinks.map((link, i) => {
                const isActive = activeId === link.href.slice(1);
                return (
                  <li key={link.href} data-mobile-item>
                    <a
                      href={link.href}
                      onClick={closeMenu}
                      aria-current={isActive ? "page" : undefined}
                      className={cn(
                        "flex items-center rounded-2xl px-5 py-3.5 text-base sm:text-lg font-medium",
                        "min-h-[50px] transition-colors duration-250",
                        isActive
                          ? "text-white font-semibold bg-white/10 shadow-sm"
                          : "text-white/85 hover:text-white hover:bg-white/5"
                      )}
                    >
                      <span
                        className="font-mono text-xs mr-4 select-none font-semibold"
                        style={{ color: "var(--color-mint)", opacity: 0.9 }}
                        aria-hidden="true"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>

            <Button
              as="a"
              href="#contact"
              variant="primary"
              size="lg"
              className="w-full text-center justify-center"
              onClick={closeMenu}
            >
              Let&apos;s Talk
            </Button>
          </div>
        </nav>
      </div>
    </div>
  );
}
