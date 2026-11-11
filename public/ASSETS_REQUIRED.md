# Required Public Assets

The following assets are referenced in the code but not yet present.
Generate/place them before deploying to production.

## Favicon Set
Generate from https://realfavicongenerator.net or Figma with your "A." logo:

| File                        | Size       | Purpose                        |
|-----------------------------|------------|--------------------------------|
| `/public/favicon.ico`       | 48×48      | Browser tab (multi-size .ico)  |
| `/public/favicon-16x16.png` | 16×16      | Small browser tab              |
| `/public/favicon-32x32.png` | 32×32      | Retina browser tab             |
| `/public/apple-touch-icon.png` | 180×180 | iOS home screen icon           |

## Open Graph Image
| File                      | Size       | Purpose                        |
|---------------------------|------------|--------------------------------|
| `/public/images/og-image.jpg` | 1200×630 | Social share preview         |

Design guideline for OG image:
- Background: #101D25 (canvas color)
- Centered text: "Alif." in display font + tagline
- Subtle mint/sky gradient accent

## Profile Photo
| File                           | Size      | Purpose             |
|--------------------------------|-----------|---------------------|
| `/public/images/profile.jpg`   | 800×1067  | About section photo |
| `/public/images/profile.webp`  | 800×1067  | WebP version        |

Optimize with: https://squoosh.app (target: WebP, quality 80, ~100KB max)
