/**
 * Portfolio projects.
 * Add or modify entries here — they drive the Projects section.
 */

/**
 * Project categories for filtering
 */
export const projectCategories = [
  { id: "all", label: "All Projects" },
  { id: "web-development", label: "Web Development" },
  { id: "ui-ux-design", label: "UI/UX Design" },
  { id: "graphic-design", label: "Graphic Design" },
  { id: "ai-projects", label: "AI Projects" },
];

/**
 * Projects data
 * 
 * Structure:
 * - id: unique identifier (used for slug)
 * - title: project name
 * - slug: URL-friendly version of title
 * - description: brief project overview
 * - category: one of projectCategories id
 * - tags: array of technology/tools used
 * - image: path to project thumbnail
 * - images: array of additional images (optional)
 * - liveUrl: deployed project URL (use null if not available)
 * - repoUrl: source code URL (use null if not available)
 * - featured: boolean to highlight main projects
 * - year: project completion year
 * - client: client name (optional)
 * - role: your role in the project
 */
export const projects = [
  {
    id: "1",
    title: "Portfolio Website V2",
    slug: "portfolio-website-v2",
    description: "Modern portfolio website showcasing creative development work with smooth animations and interactive elements.",
    category: "web-development",
    tags: ["Next.js", "Tailwind CSS", "GSAP", "Framer Motion"],
    image: "/images/projects/placeholder-1.jpg",
    liveUrl: null, // Add URL when deployed
    repoUrl: null, // Add GitHub URL if public
    featured: true,
    year: "2026",
    role: "Full-stack Developer & Designer",
  },
  {
    id: "2",
    title: "E-Commerce Dashboard",
    slug: "ecommerce-dashboard",
    description: "Admin dashboard for managing online store with real-time analytics and inventory management.",
    category: "web-development",
    tags: ["PHP", "CodeIgniter 4", "MySQL", "Bootstrap"],
    image: "/images/projects/placeholder-2.jpg",
    liveUrl: null,
    repoUrl: null,
    featured: true,
    year: "2025",
    role: "Backend Developer",
  },
  {
    id: "3",
    title: "Mobile App UI Design",
    slug: "mobile-app-ui-design",
    description: "Clean and intuitive mobile app interface design with modern aesthetics and user-centered approach.",
    category: "ui-ux-design",
    tags: ["Figma", "UI Design", "Prototyping"],
    image: "/images/projects/placeholder-3.jpg",
    liveUrl: null,
    repoUrl: null,
    featured: false,
    year: "2025",
    role: "UI/UX Designer",
  },
  {
    id: "4",
    title: "Brand Identity Design",
    slug: "brand-identity-design",
    description: "Complete brand identity package including logo, color scheme, and visual guidelines.",
    category: "graphic-design",
    tags: ["Adobe Photoshop", "Canva", "Brand Design"],
    image: "/images/projects/placeholder-4.jpg",
    liveUrl: null,
    repoUrl: null,
    featured: false,
    year: "2025",
    role: "Graphic Designer",
  },
  {
    id: "5",
    title: "AI Content Generator",
    slug: "ai-content-generator",
    description: "Web application leveraging AI to generate creative content with custom prompts and templates.",
    category: "ai-projects",
    tags: ["React.js", "ChatGPT API", "AI Prompt Engineering"],
    image: "/images/projects/placeholder-5.jpg",
    liveUrl: null,
    repoUrl: null,
    featured: true,
    year: "2026",
    role: "Frontend Developer",
  },
  {
    id: "6",
    title: "School Event Poster Series",
    slug: "school-event-poster-series",
    description: "Visual campaign materials for various school events with cohesive design language.",
    category: "graphic-design",
    tags: ["Adobe Photoshop", "Canva", "Social Media Design"],
    image: "/images/projects/placeholder-6.jpg",
    liveUrl: null,
    repoUrl: null,
    featured: false,
    year: "2024",
    role: "Graphic Designer",
  },
];

