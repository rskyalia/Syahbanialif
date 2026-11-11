# Deployment Guide — Vercel

## Pre-deployment Checklist

Before pushing, pastikan semua assets berikut sudah ada:

- [ ] `/public/favicon.ico` (placeholder sudah ada — replace dengan yang proper)
- [ ] `/public/favicon-16x16.png` (placeholder sudah ada)
- [ ] `/public/favicon-32x32.png` (placeholder sudah ada)
- [ ] `/public/apple-touch-icon.png` (placeholder sudah ada)
- [ ] `/public/images/og-image.jpg` (placeholder sudah ada — replace dengan yang proper)
- [ ] `/public/images/video/cinematictrailvideo.mp4` (video hero — wajib ada)
- [ ] `/public/curriculumvitae/alif'sresume.pdf` (CV — sudah ada ✓)

## Deploy ke Vercel

### Opsi 1 — Via CLI (Rekomendasi)

```bash
# Install Vercel CLI (sekali saja)
npm i -g vercel

# Login
vercel login

# Deploy dari root project
cd "f:\File Alif\Portfolio Alif V2\Syahbanialif"
vercel

# Production deploy
vercel --prod
```

### Opsi 2 — Via GitHub (Auto-deploy)

1. Push repo ke GitHub:
   ```bash
   git init
   git add .
   git commit -m "feat: portfolio v2 with GSAP animations"
   git branch -M main
   git remote add origin https://github.com/USERNAME/REPO.git
   git push -u origin main
   ```

2. Buka https://vercel.com/new
3. Import repository dari GitHub
4. Vercel otomatis deteksi Next.js — klik **Deploy**

### Opsi 3 — Via Vercel Dashboard

1. Buka https://vercel.com/new
2. Drag & drop folder project ke dashboard
3. Klik Deploy

---

## Vercel Project Settings

### Build & Output Settings
| Setting          | Value           |
|------------------|-----------------|
| Framework        | Next.js         |
| Build Command    | `npm run build` |
| Output Directory | `.next`         |
| Install Command  | `npm install`   |
| Node.js Version  | 18.x atau 20.x  |

### Environment Variables
Tidak ada environment variable yang diperlukan untuk portfolio statis ini.

Jika ingin menambah form backend (Resend, EmailJS, dll):
```
RESEND_API_KEY=re_xxxxxxxxxxxx
```

---

## Domain Custom

1. Di Vercel dashboard → Project → Settings → Domains
2. Add domain: `syahbanialif.com`
3. Update DNS di registrar:
   ```
   A     @    76.76.21.21
   CNAME www  cname.vercel-dns.com
   ```
4. SSL otomatis di-provision oleh Vercel (Let's Encrypt)

---

## Performance Tips

### Video Hero
Video `cinematictrailvideo.mp4` adalah file terbesar (9.8MB).
Rekomendasi:
- Compress dengan HandBrake: H.264, CRF 28, 1080p max
- Target: < 5MB
- Tambahkan `poster` attribute ke `<video>` untuk LCP improvement:
  ```html
  <video poster="/images/hero-poster.jpg" ...>
  ```

### Image Optimization
Semua gambar akan otomatis di-serve sebagai AVIF/WebP oleh Vercel
berkat konfigurasi di `next.config.mjs`.

### Cache Headers
Headers sudah dikonfigurasi di `next.config.mjs`:
- Static assets: `max-age=31536000, immutable` (1 tahun)
- Video: `max-age=86400` (1 hari)

---

## Post-Deploy Checklist

- [ ] Buka URL deploy, test semua section
- [ ] Test mobile (375px, 430px) di Chrome DevTools
- [ ] Test keyboard navigation (Tab, Enter, Escape)
- [ ] Verify `/sitemap.xml` accessible
- [ ] Verify `/robots.txt` accessible
- [ ] Test download CV button
- [ ] Test all social links open in new tab
- [ ] Test contact email button
- [ ] Check console — no errors
- [ ] Submit sitemap ke Google Search Console:
      `https://search.google.com/search-console`
      → Add property → URL prefix → `https://syahbanialif.com`
      → Sitemaps → `https://syahbanialif.com/sitemap.xml`
