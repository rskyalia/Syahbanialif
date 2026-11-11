import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import { projects, projectCategories } from "@/data/projects";
import ProjectActions from "./project-actions";

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
    <main
      className="min-h-screen"
      style={{ background: "var(--color-canvas)", color: "var(--color-ink)" }}
    >
      {/* ── Back link ── */}
      <div className="container-main pt-28 pb-6">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-sm transition-colors duration-300 group"
          style={{ color: "var(--color-ink-muted)" }}
        >
          <ArrowLeft
            className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1"
            aria-hidden="true"
          />
          Back to Projects
        </Link>
      </div>

      {/* ── Hero image ── */}
      <div className="container-main pb-12">
        <div
          className="relative w-full overflow-hidden rounded-2xl"
          style={{
            aspectRatio: "16/9",
            background:  "var(--color-canvas-mid)",
            boxShadow:   "0 24px 60px rgba(0,0,0,0.5)",
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
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="container-main pb-24">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">

          {/* Left — main content */}
          <div className="lg:col-span-8">

            {/* Category + year + role */}
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <span
                className="text-xs font-mono uppercase tracking-wider"
                style={{ color: "var(--color-mint)" }}
              >
                {categoryLabel}
              </span>
              <span style={{ color: "var(--color-ink-subtle)" }} aria-hidden="true">•</span>
              <span className="text-xs" style={{ color: "var(--color-ink-subtle)" }}>
                {project.year}
              </span>
              {project.role && (
                <>
                  <span style={{ color: "var(--color-ink-subtle)" }} aria-hidden="true">•</span>
                  <span className="text-xs" style={{ color: "var(--color-ink-subtle)" }}>
                    {project.role}
                  </span>
                </>
              )}
            </div>

            {/* Title */}
            <h1
              className="font-display font-bold leading-tight mb-6"
              style={{ fontSize: "clamp(2rem,5vw,3.5rem)", color: "var(--color-ink)" }}
            >
              {project.title}
            </h1>

            {/* Description */}
            <p className="text-lg leading-relaxed mb-10" style={{ color: "var(--color-ink-muted)" }}>
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
                ].map(({ label, content }) => (
                  <div key={label}>
                    <h2
                      className="text-xs font-mono uppercase tracking-widest mb-3"
                      style={{ color: "var(--color-mint)" }}
                    >
                      {label}
                    </h2>
                    <p className="leading-relaxed" style={{ color: "var(--color-ink-muted)" }}>
                      {content}
                    </p>
                  </div>
                ))}

                {cs.techDetails?.length > 0 && (
                  <div>
                    <h2
                      className="text-xs font-mono uppercase tracking-widest mb-4"
                      style={{ color: "var(--color-mint)" }}
                    >
                      Technical Details
                    </h2>
                    <ul className="space-y-2">
                      {cs.techDetails.map((detail, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-sm"
                          style={{ color: "var(--color-ink-muted)" }}
                        >
                          <span
                            className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
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
              <p className="text-sm italic" style={{ color: "var(--color-ink-subtle)" }}>
                Dokumentasi case study untuk proyek ini belum tersedia.
              </p>
            )}
          </div>

          {/* Right — sidebar with client interactivity */}
          <aside className="lg:col-span-4">
            <div
              className="sticky top-24 rounded-2xl p-6 space-y-6"
              style={{
                backdropFilter: "blur(16px)",
                background:     "rgba(24,52,58,0.4)",
                border:         "1px solid rgba(255,255,255,0.08)",
              }}
            >
              {/* Interactive action buttons — Client Component */}
              <ProjectActions
                liveUrl={project.liveUrl}
                repoUrl={project.repoUrl}
                title={project.title}
              />

              <hr style={{ borderColor: "rgba(255,255,255,0.08)" }} />

              {/* Meta — static, no handlers needed */}
              <dl className="space-y-3 text-sm">
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
                              background:  "rgba(184,216,199,0.1)",
                              color:       "var(--color-mint)",
                              border:      "1px solid rgba(184,216,199,0.2)",
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
  );
}
