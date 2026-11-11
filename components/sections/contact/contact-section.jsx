"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/animations/gsap-config";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Github, Linkedin, Instagram, Mail,
  ArrowRight, Send, CheckCircle, AlertCircle, Loader2,
} from "lucide-react";
import { siteConfig } from "@/data/site-config";
import { SectionWrapper } from "@/components/ui";

gsap.registerPlugin(ScrollTrigger);

const socialLinks = [
  { label: "GitHub",    href: siteConfig.social.github,            Icon: Github    },
  { label: "LinkedIn",  href: siteConfig.social.linkedin,          Icon: Linkedin  },
  { label: "Instagram", href: siteConfig.social.instagram,         Icon: Instagram },
  { label: "Email",     href: `mailto:${siteConfig.social.email}`, Icon: Mail      },
];

/* ── Shared input style ── */
const inputBase = {
  background:   "rgba(255,255,255,0.05)",
  border:       "1px solid rgba(255,255,255,0.1)",
  color:        "var(--color-ink)",
  outline:      "none",
  borderRadius: "0.75rem",
  padding:      "0.75rem 1rem",
  fontSize:     "0.875rem",
  width:        "100%",
  minHeight:    "48px",
  fontFamily:   "var(--font-sans)",
  transition:   "border-color 0.2s ease",
};

function FieldError({ msg }) {
  if (!msg) return null;
  return (
    <p className="text-xs flex items-center gap-1 mt-1" style={{ color: "#f87171" }} role="alert">
      <AlertCircle className="w-3 h-3 flex-shrink-0" aria-hidden="true" />
      {msg}
    </p>
  );
}

export default function ContactSection() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const subRef     = useRef(null);
  const ctaRef     = useRef(null);
  const socialRef  = useRef(null);
  const formRef    = useRef(null);

  const emptyFields = { name: "", email: "", message: "" };
  const [fields,  setFields]  = useState(emptyFields);
  const [errors,  setErrors]  = useState({});
  const [status,  setStatus]  = useState("idle"); // idle | sending | success | error
  const [apiError, setApiError] = useState("");

  /* ── Client-side validation ── */
  function validate() {
    const e = {};
    if (!fields.name.trim() || fields.name.trim().length < 2)
      e.name = "Nama minimal 2 karakter.";
    if (!fields.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email))
      e.email = "Alamat email tidak valid.";
    if (!fields.message.trim() || fields.message.trim().length < 10)
      e.message = "Pesan minimal 10 karakter.";
    return e;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: undefined }));
  };

  /* ── Submit via API route ── */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const clientErrors = validate();
    if (Object.keys(clientErrors).length > 0) {
      setErrors(clientErrors);
      const firstKey = Object.keys(clientErrors)[0];
      document.getElementById(`contact-${firstKey}`)?.focus();
      return;
    }

    setStatus("sending");
    setErrors({});
    setApiError("");

    try {
      const res = await fetch("/api/contact", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({
          name:    fields.name.trim(),
          email:   fields.email.trim(),
          message: fields.message.trim(),
          website: "", // honeypot — intentionally empty
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        // Server-side validation errors
        if (data.errors) {
          setErrors(data.errors);
          setStatus("idle");
          return;
        }
        throw new Error(data.error ?? "Gagal mengirim pesan.");
      }

      if (data.fallback && data.mailto) {
        // No email provider configured — open mailto client
        const { subject, body } = data.mailto;
        window.location.href = `mailto:${siteConfig.social.email}?subject=${subject}&body=${body}`;
      }

      setStatus("success");
      setFields(emptyFields);

    } catch (err) {
      console.error("[Contact]", err);
      setApiError(err.message ?? "Terjadi kesalahan. Silakan coba lagi.");
      setStatus("error");
    }
  };

  /* ── Entrance animations ── */
  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger:       headingRef.current,
          start:         "top 82%",
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(
        headingRef.current?.querySelectorAll(".contact-line") ?? [],
        { opacity: 0, y: reduced ? 0 : 50 },
        { opacity: 1, y: 0, duration: 0.85, stagger: 0.14, ease: "power3.out" }
      )
      .fromTo(subRef.current,
        { opacity: 0, y: reduced ? 0 : 25 },
        { opacity: 1, y: 0, duration: 0.75, ease: "power3.out" },
        "-=0.5"
      )
      .fromTo(ctaRef.current,
        { opacity: 0, scale: reduced ? 1 : 0.9, y: reduced ? 0 : 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.65, ease: "back.out(1.5)" },
        "-=0.4"
      );

      if (formRef.current) {
        gsap.fromTo(
          formRef.current.querySelectorAll(".form-field"),
          { opacity: 0, y: reduced ? 0 : 20 },
          {
            opacity: 1, y: 0, duration: 0.55, stagger: 0.1, ease: "power3.out",
            scrollTrigger: {
              trigger:       formRef.current,
              start:         "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      const icons = socialRef.current?.querySelectorAll(".social-icon") ?? [];
      gsap.fromTo(
        icons,
        { opacity: 0, y: reduced ? 0 : 25, scale: reduced ? 1 : 0.7 },
        {
          opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.07, ease: "back.out(1.7)",
          scrollTrigger: {
            trigger:       socialRef.current,
            start:         "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );

      if (!reduced) {
        icons.forEach((icon) => {
          const hoverTl = gsap.timeline({ paused: true });
          hoverTl.to(icon, { scale: 1.18, y: -5, duration: 0.3, ease: "back.out(2)" });
          icon.addEventListener("mouseenter", () => hoverTl.play());
          icon.addEventListener("mouseleave", () => hoverTl.reverse());
        });
      }
    },
    { scope: sectionRef }
  );

  return (
    <SectionWrapper id="contact" className="py-24 md:py-36">
      <div ref={sectionRef} className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">

          {/* ── Heading ── */}
          <div className="text-center mb-14">
            <p className="font-mono text-xs uppercase tracking-widest mb-6"
               style={{ color: "var(--color-mint)" }}>
              Get in Touch
            </p>
            <h2
              id="contact-heading"
              ref={headingRef}
              className="font-display font-bold leading-tight mb-6"
              style={{ fontSize: "clamp(2.2rem,6vw,4rem)", color: "var(--color-ink)" }}
            >
              <span className="contact-line block">Let&apos;s Build</span>
              <span className="contact-line block">
                <span style={{
                  background:           "linear-gradient(120deg,#E8F5EE 0%,var(--color-mint) 40%,var(--color-sky) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor:  "transparent",
                  backgroundClip:      "text",
                }}>Something Great.</span>
              </span>
            </h2>
            <p
              ref={subRef}
              className="text-lg leading-relaxed max-w-xl mx-auto"
              style={{ color: "var(--color-ink-muted)" }}
            >
              Tersedia untuk proyek freelance, kolaborasi, dan peluang menarik.
              Mari wujudkan sesuatu yang bermakna bersama.
            </p>
          </div>

          {/* ── Direct email CTA ── */}
          <div ref={ctaRef} className="text-center mb-14">
            <a
              href={`mailto:${siteConfig.social.email}`}
              aria-label={`Kirim email ke ${siteConfig.social.email}`}
              className="group inline-flex items-center gap-3 px-9 py-4 rounded-full font-semibold text-base transition-all duration-300"
              style={{
                background: "var(--color-mint)",
                color:      "var(--color-canvas)",
                boxShadow:  "0 0 32px rgba(184,216,199,0.25)",
                minHeight:  "52px",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background  = "var(--color-mint-light)";
                e.currentTarget.style.boxShadow   = "0 0 48px rgba(184,216,199,0.4)";
                e.currentTarget.style.transform   = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background  = "var(--color-mint)";
                e.currentTarget.style.boxShadow   = "0 0 32px rgba(184,216,199,0.25)";
                e.currentTarget.style.transform   = "translateY(0)";
              }}
            >
              <Send className="w-5 h-5" aria-hidden="true" />
              {siteConfig.social.email}
              <ArrowRight
                className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </a>
          </div>

          {/* ── Contact form ── */}
          <div
            className="rounded-2xl p-8 md:p-10 mb-12"
            style={{
              backdropFilter: "blur(20px)",
              background:     "rgba(24,52,58,0.35)",
              border:         "1px solid rgba(255,255,255,0.08)",
              boxShadow:      "0 20px 60px rgba(0,0,0,0.3)",
            }}
          >
            <h3 className="text-xl font-display font-bold text-[var(--color-ink)] mb-6">
              Atau kirim pesan langsung
            </h3>

            {status === "success" ? (
              <div
                className="flex flex-col items-center justify-center py-12 gap-4 text-center"
                role="status"
                aria-live="polite"
              >
                <CheckCircle
                  className="w-14 h-14"
                  style={{ color: "var(--color-mint)" }}
                  aria-hidden="true"
                />
                <p className="text-lg font-medium" style={{ color: "var(--color-ink)" }}>
                  Pesan terkirim!
                </p>
                <p className="text-sm" style={{ color: "var(--color-ink-muted)" }}>
                  Terima kasih telah menghubungi. Saya akan membalas secepatnya.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-2 text-sm underline"
                  style={{ color: "var(--color-mint)" }}
                >
                  Kirim pesan lain
                </button>
              </div>
            ) : (
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                noValidate
                aria-label="Contact form"
              >
                {/* Global API error */}
                {status === "error" && apiError && (
                  <div
                    className="form-field flex items-center gap-2 p-4 rounded-xl mb-5 text-sm"
                    style={{
                      background:   "rgba(248,113,113,0.1)",
                      border:       "1px solid rgba(248,113,113,0.3)",
                      color:        "#fca5a5",
                    }}
                    role="alert"
                  >
                    <AlertCircle className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                    {apiError}
                  </div>
                )}

                {/* Honeypot — hidden from humans */}
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  aria-hidden="true"
                  className="sr-only"
                  autoComplete="off"
                />

                <div className="grid sm:grid-cols-2 gap-5 mb-5">
                  {/* Name */}
                  <div className="form-field">
                    <label
                      htmlFor="contact-name"
                      className="block text-sm font-medium mb-1.5"
                      style={{ color: "var(--color-ink-muted)" }}
                    >
                      Nama <span aria-hidden="true" style={{ color: "var(--color-mint)" }}>*</span>
                      <span className="sr-only">(wajib)</span>
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      value={fields.name}
                      onChange={handleChange}
                      autoComplete="name"
                      placeholder="Muhammad Alif"
                      disabled={status === "sending"}
                      aria-invalid={!!errors.name}
                      style={inputBase}
                      onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(184,216,199,0.4)"; }}
                      onBlur={(e)  => { e.currentTarget.style.borderColor = errors.name ? "#f87171" : "rgba(255,255,255,0.1)"; }}
                    />
                    <FieldError msg={errors.name} />
                  </div>

                  {/* Email */}
                  <div className="form-field">
                    <label
                      htmlFor="contact-email"
                      className="block text-sm font-medium mb-1.5"
                      style={{ color: "var(--color-ink-muted)" }}
                    >
                      Email <span aria-hidden="true" style={{ color: "var(--color-mint)" }}>*</span>
                      <span className="sr-only">(wajib)</span>
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      value={fields.email}
                      onChange={handleChange}
                      autoComplete="email"
                      placeholder="hello@example.com"
                      disabled={status === "sending"}
                      aria-invalid={!!errors.email}
                      style={inputBase}
                      onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(184,216,199,0.4)"; }}
                      onBlur={(e)  => { e.currentTarget.style.borderColor = errors.email ? "#f87171" : "rgba(255,255,255,0.1)"; }}
                    />
                    <FieldError msg={errors.email} />
                  </div>
                </div>

                {/* Message */}
                <div className="form-field mb-6">
                  <label
                    htmlFor="contact-message"
                    className="block text-sm font-medium mb-1.5"
                    style={{ color: "var(--color-ink-muted)" }}
                  >
                    Pesan <span aria-hidden="true" style={{ color: "var(--color-mint)" }}>*</span>
                    <span className="sr-only">(wajib)</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={fields.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Ceritakan proyek atau kebutuhan Anda..."
                    disabled={status === "sending"}
                    aria-invalid={!!errors.message}
                    style={{ ...inputBase, minHeight: "140px", resize: "vertical" }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(184,216,199,0.4)"; }}
                    onBlur={(e)  => { e.currentTarget.style.borderColor = errors.message ? "#f87171" : "rgba(255,255,255,0.1)"; }}
                  />
                  <FieldError msg={errors.message} />
                </div>

                {/* Submit */}
                <div className="form-field">
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full font-semibold text-sm transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                    style={{
                      background: "var(--color-mint)",
                      color:      "var(--color-canvas)",
                      minHeight:  "48px",
                    }}
                    onMouseEnter={(e) => {
                      if (status !== "sending") e.currentTarget.style.background = "var(--color-mint-light)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "var(--color-mint)";
                    }}
                  >
                    {status === "sending" ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                        Mengirim…
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" aria-hidden="true" />
                        Kirim Pesan
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* ── Divider ── */}
          <div
            className="mb-10 h-px mx-auto"
            aria-hidden="true"
            style={{
              maxWidth:   "200px",
              background: "linear-gradient(to right,transparent,rgba(184,216,199,0.3),transparent)",
            }}
          />

          {/* ── Social links ── */}
          <nav
            ref={socialRef}
            aria-label="Social media links"
            className="flex items-center justify-center gap-5"
          >
            {socialLinks.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                aria-label={label}
                className="social-icon rounded-full flex items-center justify-center transition-colors duration-300"
                style={{
                  backdropFilter: "blur(12px)",
                  background:     "rgba(24,52,58,0.5)",
                  border:         "1px solid rgba(255,255,255,0.1)",
                  color:          "var(--color-ink-muted)",
                  width:          "48px",
                  height:         "48px",
                  minWidth:       "48px",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(184,216,199,0.35)";
                  e.currentTarget.style.color       = "var(--color-ink)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                  e.currentTarget.style.color       = "var(--color-ink-muted)";
                }}
              >
                <Icon className="w-5 h-5" aria-hidden="true" />
              </a>
            ))}
          </nav>

        </div>
      </div>
    </SectionWrapper>
  );
}
