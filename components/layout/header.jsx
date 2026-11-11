"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Menu, X } from "lucide-react";
import { gsap, useGSAP } from "@/animations/gsap-config";
import { cn } from "@/lib/utils";
import { navLinks } from "@/data/navigation";
import { useScrollPosition } from "@/hooks";
import Button from "@/components/ui/button";
import IconButton from "@/components/ui/icon-button";

export default function Header() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { isScrolled } = useScrollPosition(80);
  const headerRef    = useRef(null);
  const mobileNavRef = useRef(null);

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
    { scope: headerRef }
  );

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
    <>
      <header
        ref={headerRef}
        className={cn(
          "fixed inset-x-0 top-0 z-50",
          "transition-all duration-500",
          isScrolled ? "px-4 pt-3" : "px-0 pt-0"
        )}
        style={{ opacity: 0 }}
      >
        <nav
          className={cn(
            "flex items-center justify-between",
            "transition-all duration-500",
            isScrolled
              ? "glass-heavy glass-rim rounded-2xl px-5 py-3 mx-auto max-w-5xl shadow-lg"
              : "container-main py-5"
          )}
          aria-label="Main navigation"
        >
          {/* Logo */}
          <a
            href="#home"
            onClick={closeMenu}
            className="font-brand font-bold tracking-tight text-xl transition-colors duration-300 hover:text-[var(--color-mint)] flex items-center gap-0.5"
            style={{ color: "var(--color-ink)", fontFamily: "var(--font-brand)" }}
            aria-label="Muhammad Alif Sya'bani — back to top"
          >
            Alif<span style={{ color: "var(--color-mint)" }} aria-hidden="true">.</span>
          </a>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-0.5" role="list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="relative px-4 py-2 rounded-full text-sm transition-colors duration-300 hover:bg-[var(--color-canvas-high)] link-underline"
                  style={{ color: "var(--color-ink-muted)" }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "var(--color-ink)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "var(--color-ink-muted)"; }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Button as="a" href="#contact" variant="primary" size="sm">
              Let&apos;s Talk
            </Button>
          </div>

          {/* Mobile toggle */}
          <IconButton
            variant="ghost"
            size="md"
            label={isMobileOpen ? "Close navigation menu" : "Open navigation menu"}
            className="md:hidden"
            onClick={() => setIsMobileOpen((p) => !p)}
            aria-expanded={isMobileOpen}
            aria-controls="mobile-nav"
            aria-haspopup="dialog"
          >
            {isMobileOpen
              ? <X size={20} aria-hidden="true" />
              : <Menu size={20} aria-hidden="true" />
            }
          </IconButton>
        </nav>
      </header>

      {/* ── Mobile menu ── */}
      <div
        id="mobile-nav"
        ref={mobileNavRef}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        /* Conditionally inert to prevent focus trapping when closed */
        inert={!isMobileOpen ? "" : undefined}
        className={cn(
          "fixed inset-0 z-40 md:hidden flex flex-col",
          "transition-all duration-500",
          isMobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 backdrop-blur-xl"
          style={{ background: "rgba(16,29,37,0.85)" }}
          onClick={closeMenu}
          aria-hidden="true"
        />

        {/* Slide-up panel */}
        <nav
          aria-label="Mobile navigation links"
          className={cn(
            "relative mt-auto glass-heavy glass-rim rounded-t-3xl p-8 pb-12",
            "transition-transform duration-500",
            isMobileOpen ? "translate-y-0" : "translate-y-full"
          )}
        >
          <ul className="flex flex-col gap-1 mb-8" role="list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="block rounded-xl px-5 py-4 text-lg transition-colors duration-300 hover:bg-[var(--color-canvas-high)]"
                  style={{ color: "var(--color-ink-muted)", minHeight: "52px", display: "flex", alignItems: "center" }}
                  onClick={closeMenu}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "var(--color-ink)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "var(--color-ink-muted)"; }}
                >
                  {link.label}
                </a>
              </li>
            ))}
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
        </nav>
      </div>
    </>
  );
}
