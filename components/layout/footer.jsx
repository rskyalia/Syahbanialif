"use client";

import { useRef } from "react";
import Link from "next/link";
import { Github, Linkedin, Instagram, Mail, ArrowUpRight } from "lucide-react";
import { gsap, useGSAP } from "@/animations/gsap-config";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { siteConfig } from "@/data/site-config";
import { navLinks } from "@/data/navigation";
import Divider from "@/components/ui/divider";
import IconButton from "@/components/ui/icon-button";

gsap.registerPlugin(ScrollTrigger);

const socialLinks = [
  { label: "GitHub",    href: siteConfig.social.github,                Icon: Github },
  { label: "LinkedIn",  href: siteConfig.social.linkedin,              Icon: Linkedin },
  { label: "Instagram", href: siteConfig.social.instagram,             Icon: Instagram },
  { label: "Email",     href: `mailto:${siteConfig.social.email}`,     Icon: Mail },
];

export default function Footer() {
  const year      = new Date().getFullYear();
  const footerRef = useRef(null);

  useGSAP(
    () => {
      const footer  = footerRef.current;
      if (!footer) return;

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) return;

      /* Stagger the three columns in */
      const cols = footer.querySelectorAll(".footer-col");
      gsap.fromTo(
        cols,
        { opacity: 0, y: 28 },
        {
          opacity:  1,
          y:        0,
          duration: 0.75,
          stagger:  0.1,
          ease:     "power3.out",
          scrollTrigger: {
            trigger:       footer,
            start:         "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );

      /* Social icon hover pulses */
      const icons = footer.querySelectorAll(".footer-social");
      icons.forEach((icon) => {
        icon.addEventListener("mouseenter", () => {
          gsap.to(icon, { scale: 1.15, duration: 0.25, ease: "back.out(2)" });
        });
        icon.addEventListener("mouseleave", () => {
          gsap.to(icon, { scale: 1, duration: 0.25, ease: "power2.out" });
        });
      });
    },
    { scope: footerRef }
  );

  return (
    <footer
      ref={footerRef}
      className="relative border-t overflow-hidden"
      style={{
        background:   "var(--color-canvas)",
        borderColor:  "rgba(168,217,237,0.1)",
      }}
      role="contentinfo"
    >
      {/* Top glow line */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-px inset-x-0 h-px"
        style={{
          background:
            "linear-gradient(to right,transparent,rgba(184,216,199,0.35),transparent)",
        }}
      />

      <div className="container-main py-16 md:py-20">

        {/* Top row */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">

          {/* Brand — logo memakai Bergand */}
          <div className="footer-col">
            <Link
              href="#home"
              className="font-brand text-2xl font-bold transition-colors duration-300"
              style={{ color: "var(--color-ink)", fontFamily: "var(--font-brand)" }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "var(--color-mint)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "var(--color-ink)"; }}
            >
              Alif<span style={{ color: "var(--color-mint)" }}>.</span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed max-w-xs"
               style={{ color: "var(--color-ink-subtle)" }}>
              Creative Developer, Programmer,<br />
              Graphic Designer &amp; Public Speaker.
            </p>

            {/* Social icons */}
            <div className="mt-6 flex items-center gap-2">
              {socialLinks.map(({ label, href, Icon }) => (
                <div key={label} className="footer-social">
                  <IconButton
                    as="a"
                    href={href}
                    target={href.startsWith("mailto") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    variant="outline"
                    size="sm"
                    label={label}
                  >
                    <Icon size={15} />
                  </IconButton>
                </div>
              ))}
            </div>
          </div>

          {/* Quick nav */}
          <nav aria-label="Footer navigation" className="footer-col md:pl-8">
            <p
              className="font-mono text-xs uppercase tracking-widest font-semibold mb-4"
              style={{ color: "var(--color-mint)" }}
            >
              Navigation
            </p>
            <ul className="flex flex-col gap-2.5" role="list">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm transition-colors duration-300 link-underline"
                    style={{ color: "var(--color-ink-muted)" }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = "var(--color-ink)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = "var(--color-ink-muted)"; }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div className="footer-col">
            <p
              className="font-mono text-xs uppercase tracking-widest font-semibold mb-4"
              style={{ color: "var(--color-mint)" }}
            >
              Get in Touch
            </p>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--color-ink-muted)" }}>
              Tersedia untuk proyek freelance, kolaborasi, dan peluang menarik lainnya.
            </p>
            <a
              href={`mailto:${siteConfig.social.email}`}
              className="inline-flex items-center gap-2 text-sm transition-colors duration-300 hover-arrow"
              style={{ color: "var(--color-mint)" }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "var(--color-mint-light)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "var(--color-mint)"; }}
            >
              {siteConfig.social.email}
              <ArrowUpRight size={14} className="arrow-icon" />
            </a>
          </div>

        </div>

        <Divider className="my-10" />

        {/* Bottom row */}
        <div className="flex flex-col-reverse gap-3 md:flex-row md:items-center md:justify-between">
          <p className="text-xs" style={{ color: "var(--color-ink-subtle)" }}>
            &copy; {year} {siteConfig.name}. All rights reserved.
          </p>
          <p className="text-xs font-mono" style={{ color: "var(--color-ink-subtle)" }}>
            Crafted with passion &amp; precision.
          </p>
        </div>

      </div>
    </footer>
  );
}
