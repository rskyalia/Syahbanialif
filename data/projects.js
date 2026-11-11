/**
 * Portfolio projects.
 * Edit entries here — mereka akan langsung tampil di Projects section.
 *
 * image: path relatif dari /public/
 * liveUrl: URL live website (null = "Coming Soon")
 * repoUrl: URL GitHub (null = tidak tampil)
 */

export const projectCategories = [
  { id: "all",             label: "All Projects"    },
  { id: "web-development", label: "Web Development" },
  { id: "ui-ux-design",    label: "UI/UX Design"    },
  { id: "graphic-design",  label: "Graphic Design"  },
  { id: "ai-projects",     label: "AI Projects"     },
];

export const projects = [
  {
    id:          "1",
    title:       "Portfolio Website V2",
    slug:        "portfolio-website-v2",
    description: "Modern portfolio website dengan animasi sinematik menggunakan GSAP, Lenis smooth scroll, dan glassmorphism design system.",
    category:    "web-development",
    tags:        ["Next.js", "Tailwind CSS", "GSAP", "Lenis"],
    image:       "/images/projects/alifportfolio.png",
    liveUrl:     null,
    repoUrl:     "https://github.com/syahbanialif/portfolio-v2",
    featured:    true,
    year:        "2026",
    role:        "Full-stack Developer & Designer",
  },
  {
    id:          "2",
    title:       "Alia Portfolio",
    slug:        "alia-portfolio",
    description: "Personal portfolio website untuk Alia, menampilkan karya desain dan fotografi dengan layout editorial yang bersih.",
    category:    "web-development",
    tags:        ["HTML", "CSS", "JavaScript", "Responsive"],
    image:       "/images/projects/aliaportfolio.png",
    liveUrl:     null,
    repoUrl:     null,
    featured:    false,
    year:        "2025",
    role:        "Frontend Developer",
  },
  {
    id:          "3",
    title:       "AL Resume Builder",
    slug:        "al-resume-builder",
    description: "Aplikasi web untuk membuat resume profesional secara online dengan berbagai template modern dan fitur ekspor PDF.",
    category:    "web-development",
    tags:        ["React.js", "JavaScript", "CSS", "PDF Export"],
    image:       "/images/projects/Alresumebuilder.png",
    liveUrl:     null,
    repoUrl:     null,
    featured:    true,
    year:        "2025",
    role:        "Frontend Developer",
  },
];
