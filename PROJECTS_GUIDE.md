# Projects Guide — Muhammad Alif Sya'bani Portfolio

## Adding a New Project

Edit `data/projects.js` and add an entry to the `projects` array:

```js
{
  id:          "7",                        // unique string
  title:       "My New Project",
  slug:        "my-new-project",           // URL-safe
  description: "Brief description...",
  category:    "web-development",          // matches a projectCategories id
  tags:        ["React", "GSAP"],
  image:       "/images/projects/my-project.webp",  // ← place image here
  liveUrl:     "https://my-project.com",   // null if not deployed
  repoUrl:     "https://github.com/...",   // null if private
  featured:    false,                      // true = spans 2 columns
  year:        "2026",
  role:        "Full-stack Developer",
}
```

## Project Images

### Format & Size
- Format: **WebP** preferred (AVIF for extra compression)
- Recommended size: **1600 × 1000px** (16:10 aspect ratio)
- Max file size: **150KB** (use https://squoosh.app to compress)
- Place in: `public/images/projects/`

### Naming convention
`kebab-case-project-name.webp` → e.g. `portfolio-v2.webp`

### Using next/image (when image file is available)
Replace the placeholder `<div>` in `projects-section.jsx` with:

```jsx
import Image from "next/image";

<Image
  src={project.image}
  alt={`Screenshot of ${project.title}`}
  fill
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  className="object-cover"
  loading="lazy"       // critical images: loading="eager"
  placeholder="blur"   // add blurDataURL for LQIP
/>
```

## Categories
Current categories (`data/projects.js → projectCategories`):
- `all` — All Projects
- `web-development` — Web Development
- `ui-ux-design` — UI/UX Design
- `graphic-design` — Graphic Design
- `ai-projects` — AI Projects

Add more by appending to the `projectCategories` array.

## Featured Projects
Setting `featured: true` makes the card span 2 grid columns on desktop.
Only 1–2 projects should be featured at a time for visual balance.

## Performance Notes
- Next.js automatically serves AVIF/WebP via the `<Image>` component
- The `deviceSizes` in `next.config.mjs` covers 375px → 1920px
- Always add descriptive `alt` text — required for SEO & accessibility
