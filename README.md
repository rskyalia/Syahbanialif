# Muhammad Alif Sya'bani — Portfolio V2

Personal portfolio website for Muhammad Alif Sya'bani. Creative Developer, Programmer, Graphic Designer & Public Speaker.

---

## Tech Stack

| Category | Library |
|----------|---------|
| Framework | Next.js 15 (App Router) |
| UI Library | React 19 |
| Styling | Tailwind CSS v4 |
| Animation | GSAP 3 + ScrollTrigger |
| Smooth Scroll | Lenis |
| Icons | Lucide React |
| Form | React Hook Form + Zod |
| Utilities | clsx + tailwind-merge |

---

## Project Structure

```
syahbanialif/
├── animations/          # GSAP configuration and animation presets
│   ├── gsap-config.js   # Plugin registration (ScrollTrigger, useGSAP)
│   └── presets.js       # Reusable from/to animation objects
│
├── app/                 # Next.js App Router
│   ├── fonts.js         # Google Fonts configuration
│   ├── globals.css      # Global styles, CSS tokens, Tailwind utilities
│   ├── layout.js        # Root layout with metadata and providers
│   ├── loading.js       # Global loading UI
│   ├── not-found.js     # 404 page
│   ├── page.js          # Home page (/)
│   ├── robots.js        # /robots.txt
│   └── sitemap.js       # /sitemap.xml
│
├── components/
│   ├── common/          # Shared wrappers (AnimatedSection, etc.)
│   ├── layout/          # Header and Footer
│   ├── providers/       # Context/global providers (SmoothScroll)
│   ├── sections/        # Page sections (hero, about, services, …)
│   └── ui/              # Primitive UI components (Button, Card, Badge, …)
│
├── data/                # Static data driving every section
│   ├── about.js         # Personal info and skills
│   ├── experience.js    # Work experience / timeline
│   ├── navigation.js    # Nav links
│   ├── projects.js      # Portfolio projects
│   ├── services.js      # Services offered
│   └── site-config.js   # SEO metadata, URLs, social links
│
├── hooks/               # Custom React hooks
│   ├── use-local-storage.js
│   ├── use-media-query.js
│   ├── use-scroll-position.js
│   └── index.js
│
├── lib/                 # Pure utility functions
│   ├── utils.js         # cn() — Tailwind class merger
│   └── validations.js   # Zod schemas (contact form, etc.)
│
└── public/
    └── images/
        └── projects/    # Project screenshot assets
```

---

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Adding a New Section

1. Create a folder inside `components/sections/` (e.g. `hero/`)
2. Add a `hero-section.jsx` file
3. Export it in `components/sections/index.js`
4. Import and render it in `app/page.js`
5. Add the scroll anchor to `data/navigation.js`

---

## Adding a New Project

Open `data/projects.js` and add a new entry to the `projects` array:

```js
{
  id: "my-project",
  title: "My Project",
  description: "Short description.",
  tags: ["Next.js", "Tailwind CSS"],
  image: "/images/projects/my-project.jpg",
  liveUrl: "https://example.com",
  repoUrl: "https://github.com/syahbanialif/my-project",
  featured: false,
}
```

---

## Environment Variables

Create a `.env.local` file at the project root for any secrets:

```env
# Not needed for static deployment — add variables here as required
# NEXT_PUBLIC_CONTACT_EMAIL=hello@syahbanialif.com
```

---

## License

© 2024 Muhammad Alif Sya'bani. All rights reserved.
