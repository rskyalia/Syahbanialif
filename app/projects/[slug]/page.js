import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import { projects, projectCategories } from "@/data/projects";
import ProjectActions from "./project-actions";
import { Header } from "@/components/layout";
import SectionBackground from "@/components/background/section-background";

/* ── Static params ── */
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

/* ── Per-page metadata ── */
export function generateMetadata({ params }) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return { title: "Project Not Found" };
  return {
    title:       project.title,
    description: project.description,
    openGraph: {
      title:       project.title,
      description: project.description,
      images:      [{ url: project.image, width: 1200, height: 750, alt: project.title }],
    },
  };
}

export default function ProjectDetailPage({ params }) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) notFound();

  const categoryLabel =
    projectCategories.find((c) => c.id === project.category)?.label ?? project.category;
  const cs = project.caseStudy;

  return (
    <>
      <Header />

      <main
        className="min-h-screen"
        style={{ color: "var(--color-ink)" }}
      >
        {/* ── Atmospheric page background ── */}
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <SectionBackground variant="projects" />
        </div>

        {/* ── Hero banner ── */}
        <div className="relative pt-28 pb-0 overflow-hidden">
          {/* Full-bleed project image with cinematic overlay */}
          <div className="container-main">
            <div
              className="relative w-full overflow-hidden rounded-3xl"
              style={{
                aspectRatio: "16/8",
                background:  "var(--color-canvas-mid)",
                boxShadow:   "0 32px 80px rgba(0,0,0,0.55)",
              }}
            >
              <Image
                src={project.image}
                alt={`Screenshot of ${project.title}`}
                fill
                priority
                sizes="(max-width: 1280px) 100vw, 1280px"
                className="object-cover object-top"
              />
              {/* Cinematic gradient overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(11,21,29,0.85) 0%, rgba(11,21,29,0.3) 40%, transparent 70%)",
                }}
                aria-hidden="true"
              />
              {/* Category + year pill */}
              <div className="absolute top-5 left-5 z-10">
                <span
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider"
                  style={{
                    background:         "rgba(11,21,29,0.6)",
                    backdropFilter:     "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    border:             "1px solid rgba(255,255,255,0.12)",
                    color:              "var(--color-mint)",
                  }}
                >
                  {categoryLabel}
                  {project.year && (
                    <><span style={{ opacity: 0.4 }}>·</span> {project.year}</>
                  )}
                </span>
              </div>
              {/* Title overlay at bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10 z-10">
                <h1
                  className="font-display font-bold leading-tight"
                  style={{ fontSize: "clamp(1.8rem,4.5vw,3.2rem)", color: "var(--color-ink)" }}
                >
                  {project.title}
                </h1>
                {project.role && (
                  <p
                    className="mt-2 text-sm font-mono uppercase tracking-wider"
                    style={{ color: "var(--color-mint)" }}
                  >
                    {project.role}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ── Back link ── */}
        <div className="container-main pt-8 pb-4 relative z-10">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-sm transition-colors duration-300 group"
            style={{ color: "var(--color-ink-muted)" }}
            onMouseEnter={undefined}
          >
            <ArrowLeft
              className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1"
              aria-hidden="true"
            />
            Back to Projects
          </Link>
        </div>

        {/* ── Main content ── */}
        <div className="container-main pb-28 relative z-10">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14">

            {/* Left — main content */}
            <div className="lg:col-span-8">

              {/* Description lead */}
              <p
                className="text-lg md:text-xl leading-relaxed mb-10 font-light"
                style={{ color: "var(--color-ink-muted)" }}
              >
                {project.description}
              </p>

              {/* Case study */}
              {cs ? (
                <div className="space-y-10">
                  {[
                    { label: "Problem",  content: cs.problem  },
                    { label: "Solution", content: cs.solution },
                    { label: "Process",  content: cs.process  },
                    { label: "Result",   content: cs.result   },
                  ].filter(({ content }) => !!content).map(({ label, content }) => (
                    <div
                      key={label}
                      className="rounded-2xl p-7"
                      style={{
                        background:         "rgba(24,52,58,0.3)",
                        backdropFilter:     "blur(16px)",
                        WebkitBackdropFilter: "blur(16px)",
                        border:             "1px solid rgba(255,255,255,0.07)",
                        boxShadow:          "inset 0 1px 0 rgba(255,255,255,0.06)",
                      }}
                    >
                      <h2
                        className="text-xs font-mono uppercase tracking-widest mb-4 flex items-center gap-3"
                        style={{ color: "var(--color-mint)" }}
                      >
                        <span
                          className="inline-block w-6 h-px flex-shrink-0"
                          style={{ background: "var(--color-mint)", opacity: 0.5 }}
                          aria-hidden="true"
                        />
                        {label}
                      </h2>
                      <p className="leading-relaxed text-base" style={{ color: "var(--color-ink-muted)" }}>
                        {content}
                      </p>
                    </div>
                  ))}

                  {cs.techDetails?.length > 0 && (
                    <div
                      className="rounded-2xl p-7"
                      style={{
                        background:         "rgba(24,52,58,0.3)",
                        backdropFilter:     "blur(16px)",
                        WebkitBackdropFilter: "blur(16px)",
                        border:             "1px solid rgba(255,255,255,0.07)",
                        boxShadow:          "inset 0 1px 0 rgba(255,255,255,0.06)",
                      }}
                    >
                      <h2
                        className="text-xs font-mono uppercase tracking-widest mb-5 flex items-center gap-3"
                        style={{ color: "var(--color-mint)" }}
                      >
                        <span
                          className="inline-block w-6 h-px flex-shrink-0"
                          style={{ background: "var(--color-mint)", opacity: 0.5 }}
                          aria-hidden="true"
                        />
                        Technical Details
                      </h2>
                      <ul className="space-y-3">
                        {cs.techDetails.map((detail, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-3 text-sm"
                            style={{ color: "var(--color-ink-muted)" }}
                          >
                            <span
                              className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0"
                              style={{ background: "var(--color-mint)" }}
                              aria-hidden="true"
                            />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <div
                  className="rounded-2xl p-8 text-center"
                  style={{
                    background: "rgba(24,52,58,0.25)",
                    border:     "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <p className="text-sm italic" style={{ color: "var(--color-ink-subtle)" }}>
                    Dokumentasi case study untuk proyek ini belum tersedia.
                  </p>
                </div>
              )}
            </div>

            {/* Right — sticky glass sidebar */}
            <aside className="lg:col-span-4">
              <div
                className="sticky top-28 rounded-2xl p-6 space-y-6"
                style={{
                  background:         "rgba(24,52,58,0.35)",
                  backdropFilter:     "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  border:             "1px solid rgba(255,255,255,0.10)",
                  boxShadow:          "inset 0 1px 0 rgba(255,255,255,0.08), 0 20px 48px rgba(0,0,0,0.3)",
                }}
              >
                {/* Interactive action buttons */}
                <ProjectActions
                  liveUrl={project.liveUrl}
                  repoUrl={project.repoUrl}
                  title={project.title}
                />

                <hr style={{ borderColor: "rgba(255,255,255,0.08)" }} />

                {/* Meta */}
                <dl className="space-y-4 text-sm">
                  <div className="flex items-center gap-3">
                    <Calendar
                      className="w-4 h-4 flex-shrink-0"
                      style={{ color: "var(--color-mint)" }}
                      aria-hidden="true"
                    />
                    <div>
                      <dt className="sr-only">Year</dt>
                      <dd style={{ color: "var(--color-ink-muted)" }}>{project.year}</dd>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Tag
                      className="w-4 h-4 flex-shrink-0 mt-0.5"
                      style={{ color: "var(--color-mint)" }}
                      aria-hidden="true"
                    />
                    <div>
                      <dt className="sr-only">Technologies</dt>
                      <dd>
                        <div className="flex flex-wrap gap-1.5">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-xs px-2.5 py-1 rounded-full"
                              style={{
                                background: "rgba(184,216,199,0.1)",
                                color:      "var(--color-mint)",
                                border:     "1px solid rgba(184,216,199,0.2)",
                              }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </dd>
                    </div>
                  </div>
                </dl>
              </div>
            </aside>

          </div>
        </div>
      </main>
    </>
  );
}
