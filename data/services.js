import {
  Code2,
  Palette,
  MonitorSmartphone,
  Mic2,
} from "lucide-react";

/**
 * Services offered.
 * `icon` references are Lucide React component names — import them where used.
 */
export const services = [
  {
    id: "web-development",
    title: "Web Development",
    description:
      "Membangun website modern dan performant menggunakan teknologi terkini seperti React, Next.js, dan Tailwind CSS.",
    Icon: Code2,
  },
  {
    id: "graphic-design",
    title: "Graphic Design",
    description:
      "Mendesain visual identity, UI/UX, poster, dan berbagai materi grafis yang estetik dan fungsional.",
    Icon: Palette,
  },
  {
    id: "responsive-design",
    title: "Responsive Design",
    description:
      "Memastikan setiap produk digital tampil optimal di berbagai perangkat dan ukuran layar.",
    Icon: MonitorSmartphone,
  },
  {
    id: "public-speaking",
    title: "Public Speaking",
    description:
      "Menyampaikan presentasi, workshop, dan sharing session tentang teknologi dan kreativitas.",
    Icon: Mic2,
  },
];

