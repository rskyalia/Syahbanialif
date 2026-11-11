/**
 * Portfolio projects data.
 *
 * Setiap project mendukung halaman detail via /projects/[slug]
 * dengan field caseStudy untuk problem → solution → process → result.
 *
 * ATURAN: Jangan mengarang proyek, klien, maupun hasil pekerjaan.
 * Gunakan caseStudy: null untuk proyek tanpa dokumentasi lengkap.
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
    description:
      "Personal portfolio website dengan desain glassmorphism, animasi sinematik menggunakan GSAP dan Lenis smooth scroll, serta sistem font editorial Cormorant Garamond.",
    category:    "web-development",
    tags:        ["Next.js 15", "Tailwind CSS v4", "GSAP", "Lenis", "Cormorant Garamond"],
    image:       "/images/projects/alifportfolio.png",
    liveUrl:     "https://alifportfolio-tau.vercel.app",
    repoUrl:     "https://github.com/rskyalia/Syahbanialif",
    featured:    true,
    year:        "2026",
    role:        "Full-stack Developer & Designer",
    caseStudy: {
      problem:
        "Membutuhkan portfolio online yang profesional untuk menampilkan kemampuan sebagai developer dan designer, sekaligus mencerminkan identitas kreatif yang unik dan berkesan.",
      solution:
        "Membangun portfolio dengan konsep 'cinematic glassmorphism' — menggunakan video background landscape, font editorial Cormorant Garamond, dan animasi GSAP yang sinematik untuk menciptakan kesan mendalam dan profesional.",
      process:
        "Dimulai dari riset desain dan perencanaan arsitektur komponen. Menggunakan Next.js App Router untuk performa optimal, Tailwind CSS v4 untuk sistem desain yang konsisten, GSAP + Lenis untuk animasi fluid, dan Cormorant Garamond sebagai font display utama.",
      result:
        "Portfolio berhasil live di Vercel dengan Lighthouse score yang baik. Menampilkan proyek, pengalaman, dan pencapaian secara terstruktur dengan user experience yang sinematik.",
      techDetails: [
        "Next.js 15 App Router dengan static generation",
        "GSAP ScrollTrigger untuk scroll-based animations",
        "Lenis smooth scroll terintegrasi dengan GSAP ticker",
        "Cormorant Garamond (self-hosted) sebagai font display",
        "Glassmorphism design system dengan CSS custom properties",
        "Responsive dari 375px hingga 1440px",
        "Deployed ke Vercel dengan zero-config",
      ],
    },
  },
  {
    id:          "2",
    title:       "Alia Portfolio",
    slug:        "alia-portfolio",
    description:
      "Personal portfolio website untuk Alia, menampilkan karya dengan layout editorial yang bersih dan navigasi yang intuitif.",
    category:    "web-development",
    tags:        ["HTML", "CSS", "JavaScript", "Responsive Design"],
    image:       "/images/projects/aliaportfolio.png",
    liveUrl:     null,
    repoUrl:     null,
    featured:    false,
    year:        "2025",
    role:        "Frontend Developer",
    caseStudy: {
      problem:
        "Alia memerlukan portfolio online untuk menampilkan karyanya secara profesional dengan desain yang bersih dan mudah dinavigasi.",
      solution:
        "Membangun website portfolio dengan HTML, CSS, dan JavaScript vanilla — tanpa framework berlebihan — untuk memastikan loading yang cepat dan kode yang mudah dipahami.",
      process:
        "Desain dikerjakan langsung di kode dengan pendekatan mobile-first. Fokus pada tipografi yang bersih, whitespace yang proporsional, dan navigasi yang intuitif.",
      result:
        "Portfolio selesai dan berhasil menampilkan karya Alia secara terstruktur. Saat ini belum di-deploy ke domain publik.",
      techDetails: [
        "HTML5 semantik untuk struktur yang accessible",
        "CSS3 dengan custom properties dan flexbox/grid",
        "JavaScript vanilla untuk interaksi UI",
        "Mobile-first responsive design",
      ],
    },
  },
  {
    id:          "3",
    title:       "AL Resume Builder",
    slug:        "al-resume-builder",
    description:
      "Aplikasi web untuk membuat resume profesional secara online dengan berbagai template dan antarmuka yang user-friendly.",
    category:    "web-development",
    tags:        ["React.js", "JavaScript", "CSS", "PDF Export"],
    image:       "/images/projects/Alresumebuilder.png",
    liveUrl:     null,
    repoUrl:     null,
    featured:    true,
    year:        "2025",
    role:        "Frontend Developer",
    caseStudy: {
      problem:
        "Banyak orang kesulitan membuat resume yang terlihat profesional karena keterbatasan akses ke tools desain. Diperlukan aplikasi yang mudah digunakan untuk membuat resume dengan hasil yang baik.",
      solution:
        "Membangun Resume Builder berbasis React.js dengan antarmuka yang intuitif — user cukup mengisi form dan sistem secara otomatis menghasilkan tampilan resume yang terstruktur dan bisa diekspor.",
      process:
        "Menggunakan React.js dengan state management lokal untuk real-time preview. User dapat mengisi data di form sebelah kiri dan langsung melihat hasilnya di preview sebelah kanan.",
      result:
        "Aplikasi berfungsi dan dapat digunakan untuk membuat resume dengan hasil yang rapi. Fitur ekspor PDF masih dalam pengembangan.",
      techDetails: [
        "React.js dengan component-based architecture",
        "Real-time preview menggunakan React state",
        "CSS custom styling untuk template resume",
        "Responsive layout dua kolom (form + preview)",
      ],
    },
  },
];
