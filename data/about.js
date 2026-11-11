/**
 * Personal information for the About section.
 */
export const personalInfo = {
  name:         "Muhammad Alif Sya'bani",
  nickname:     "Alif",
  roles:        ["Programmer", "Graphic Designer", "Public Speaker"],
  bio:          "I'm Muhammad Alif Sya'bani, a creative developer and digital designer passionate about building meaningful digital experiences. I combine technical problem-solving, visual creativity, and communication skills to transform ideas into functional and engaging products.",
  location:     "Jember, Indonesia",
  availability: true,
  /** Used for the floating badge — keep short */
  availabilityLabel: "Open to new opportunities",
};

/**
 * Stats — hanya tampilkan angka yang dapat diverifikasi dari data nyata.
 * Jangan mengarang angka untuk terlihat lebih impressive.
 *
 * Verifikasi:
 * - 3 projects: portfolio v2, alia portfolio, al resume builder (data/projects.js)
 * - 4 skills categories: Programming, Database, Graphic Design, AI (data/about.js skills)
 * - 9 achievements: total entries di data/experience.js achievements array
 */
export const stats = [
  { label: "Projects",    value: 3,  suffix: "+"  },
  { label: "Skill Areas", value: 4,  suffix: ""   },
  { label: "Achievements", value: 9, suffix: "+"  },
];

/**
 * Skills grouped by category.
 */
export const skills = [
  {
    category: "Programming",
    icon: "Code2",
    items: [
      "PHP",
      "JavaScript",
      "React.js",
      "Next.js",
      "CodeIgniter 3 & 4",
      "Bootstrap",
      "Tailwind CSS",
      "jQuery",
      "AJAX",
      "Git",
    ],
  },
  {
    category: "Database",
    icon: "Database",
    items: [
      "MySQL",
      "Database Design",
      "Query Optimization",
      "Relational Database",
    ],
  },
  {
    category: "Graphic Design",
    icon: "Palette",
    items: [
      "Adobe Photoshop",
      "Canva",
      "Figma",
      "UI Design",
      "Social Media Design",
    ],
  },
  {
    category: "Artificial Intelligence",
    icon: "Sparkles",
    items: [
      "ChatGPT",
      "AI Prompt Engineering",
      "AI Assisted Design",
      "AI Productivity Workflow",
      "Content Generation",
    ],
  },
];

