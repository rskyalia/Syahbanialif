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
    title:       "How I Build a Futuristic Portfolio with Next.js",
    slug:        "alif-portfolio",
    description:
      "A deep dive into how I designed and engineered a modern portfolio using 3D, glassmorphism, and clean architecture. Inspired by Clarissa Aurelia Nahid Saputra",
    category:    "web-development",
    tags:        ["Next.js", "React.js", "Tailwind CSS", "GSAP", "3D", "Glassmorphism"],
    image:       "/images/projects/alif'spotfolio.png",
    liveUrl:     "https://syahbanialif.vercel.app/",
    repoUrl:     "https://github.com/rskyalia/AlifSyahBani.git",
    featured:    true,
    year:        "2025",
    role:        "Full-stack Developer & Designer",
    caseStudy: {
      problem:
        "Membutuhkan portfolio online yang futuristik dan profesional untuk menampilkan kemampuan sebagai developer, dengan konsep 3D dan glassmorphism yang modern.",
      solution:
        "Membangun portfolio dengan konsep futuristik menggunakan Next.js, 3D elements, glassmorphism design, dan clean architecture untuk menciptakan user experience yang memorable.",
      process:
        "Dimulai dari riset desain futuristik dan perencanaan arsitektur. Menggunakan Next.js untuk performa optimal, Tailwind CSS untuk sistem desain, GSAP untuk animasi 3D, dan glassmorphism untuk visual yang modern.",
      result:
        "Portfolio berhasil live di Vercel dengan tampilan futuristik yang menarik. Menampilkan proyek, skills, dan pengalaman dengan user interface yang inovatif.",
      techDetails: [
        "Next.js App Router untuk routing dan rendering",
        "3D elements dengan library modern",
        "Glassmorphism design system",
        "GSAP untuk animasi interaktif",
        "Tailwind CSS untuk styling",
        "Responsive design di semua device",
        "Deployed ke Vercel",
      ],
    },
  },
  {
    id:          "2",
    title:       "Modern Portfolio Website With React.js",
    slug:        "alia-portfolio",
    description:
      "A modern portfolio website built with React.js, Next.js, and Tailwind CSS for a sleek and responsive user experience.",
    category:    "web-development",
    tags:        ["React.js", "Next.js", "Tailwind CSS", "Responsive Design"],
    image:       "/images/projects/alia'sportfolio.png",
    liveUrl:     "https://portfolioalris.vercel.app/",
    repoUrl:     "https://github.com/rskyalia/Portfolio-sAliaV2",
    featured:    true,
    year:        "2025",
    role:        "Frontend Developer",
    caseStudy: {
      problem:
        "Memerlukan portfolio modern yang responsive dengan performa tinggi untuk menampilkan karya secara profesional.",
      solution:
        "Membangun portfolio modern menggunakan React.js dan Next.js dengan Tailwind CSS untuk menciptakan tampilan yang sleek dan responsive di semua device.",
      process:
        "Menggunakan React.js component-based architecture dengan Next.js untuk SSR dan static generation. Tailwind CSS digunakan untuk styling yang cepat dan konsisten.",
      result:
        "Portfolio berhasil live dengan user experience yang smooth dan responsive. Loading time yang cepat dan SEO-friendly.",
      techDetails: [
        "React.js dengan modern hooks",
        "Next.js untuk SSR dan static generation",
        "Tailwind CSS untuk utility-first styling",
        "Mobile-first responsive design",
        "Optimized images dan assets",
        "Deployed ke Vercel",
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
    image:       "/images/projects/alresumebuilder.png",
    liveUrl:     null,
    repoUrl:     null,
    featured:    false,
    year:        "2025",
    role:        "Frontend Developer",
    caseStudy: {
      problem:
        "Banyak orang kesulitan membuat resume yang terlihat profesional karena keterbatasan akses ke tools desain.",
      solution:
        "Membangun Resume Builder berbasis React.js dengan antarmuka yang intuitif untuk menghasilkan resume profesional secara otomatis.",
      process:
        "Menggunakan React.js dengan state management untuk real-time preview. User dapat mengisi data dan langsung melihat hasilnya.",
      result:
        "Aplikasi berfungsi dan dapat digunakan untuk membuat resume dengan hasil yang rapi dan profesional.",
      techDetails: [
        "React.js component-based architecture",
        "Real-time preview dengan React state",
        "CSS custom styling untuk template",
        "Responsive layout",
      ],
    },
  },
  {
    id:          "4",
    title:       "GoGreen Polinema - Environmental Sustainability Platform",
    slug:        "gogreen-polinema",
    description:
      "Platform digital untuk mendukung gerakan lingkungan hidup di kampus Polinema, membantu mahasiswa berkontribusi dalam pelestarian lingkungan melalui edukasi, challenge, dan tracking aktivitas ramah lingkungan.",
    category:    "web-development",
    tags:        ["Next.js", "React.js", "Environmental Tech", "Sustainability", "Web Platform"],
    image:       "/images/projects/gogreenpolinema.png",
    liveUrl:     "https://gogreenpolinema.vercel.app/",
    repoUrl:     "https://github.com/rskyalia/gogreen.git",
    featured:    true,
    year:        "2026",
    role:        "Full-stack Developer",
    caseStudy: {
      problem:
        "Kesadaran lingkungan di kalangan mahasiswa masih rendah dan tidak ada platform terpadu untuk mengkoordinir kegiatan ramah lingkungan di kampus.",
      solution:
        "Membangun platform GoGreen yang menyediakan edukasi lingkungan, challenge untuk mahasiswa, tracking aktivitas hijau, dan sistem reward untuk memotivasi partisipasi aktif dalam pelestarian lingkungan.",
      process:
        "Menggunakan Next.js untuk membangun platform yang cepat dan SEO-friendly. Mendesain user interface yang engaging dengan fitur gamification untuk meningkatkan partisipasi mahasiswa dalam kegiatan ramah lingkungan.",
      result:
        "Platform berhasil diluncurkan dan digunakan oleh komunitas Polinema untuk koordinasi kegiatan lingkungan, edukasi sustainability, dan tracking progress kampanye hijau.",
      techDetails: [
        "Next.js untuk SSR dan optimal performance",
        "React.js untuk interactive UI components",
        "Gamification system untuk user engagement",
        "Environmental impact tracking dashboard",
        "Responsive design untuk mobile dan desktop",
        "Deployed ke Vercel",
      ],
    },
  },
  {
    id:          "5",
    title:       "Lumora - Cambridge Curriculum Learning Platform",
    slug:        "lumora",
    description:
      "Platform pembelajaran interaktif menggunakan kurikulum Cambridge untuk siswa SD kelas 1-3, dilengkapi dengan AI personalization, interactive exercises, dan progress tracking untuk membuat proses belajar lebih engaging dan efektif.",
    category:    "ai-projects",
    tags:        ["Education", "Machine Learning", "Cambridge Curriculum", "AI", "Next.js", "Interactive Learning"],
    image:       "/images/projects/lumora.png",
    liveUrl:     "https://lumora.vercel.app/",
    repoUrl:     "https://github.com/rskyalia/lumora.git",
    featured:    true,
    year:        "2026",
    role:        "Full-stack Developer & ML Engineer",
    caseStudy: {
      problem:
        "Siswa SD kelas 1-3 membutuhkan metode pembelajaran yang interaktif dan personal sesuai dengan kurikulum Cambridge, namun platform yang ada kurang engaging dan tidak menyesuaikan dengan kemampuan individual siswa.",
      solution:
        "Membangun Lumora, platform pembelajaran dengan AI personalization yang menyesuaikan materi dengan kemampuan siswa. Dilengkapi dengan interactive exercises, gamification, dan real-time progress tracking untuk orang tua dan guru.",
      process:
        "Menggunakan Next.js untuk membangun platform yang responsive dan cepat. Menerapkan machine learning untuk personalisasi konten pembelajaran. Mendesain UI/UX yang child-friendly dengan elemen interaktif dan visual yang menarik.",
      result:
        "Platform Lumora berhasil diluncurkan dengan fitur AI personalization yang dapat menyesuaikan tingkat kesulitan materi. Siswa lebih engaged dalam belajar dan orang tua dapat memantau perkembangan anak secara real-time.",
      techDetails: [
        "Next.js untuk platform architecture",
        "Machine Learning untuk content personalization",
        "Cambridge Curriculum integration",
        "Interactive exercises dengan instant feedback",
        "Gamification system untuk motivasi belajar",
        "Parent & teacher dashboard untuk monitoring",
        "Child-friendly UI/UX design",
        "Responsive untuk tablet dan desktop",
      ],
    },
  },
];
