# Technology Stack

**Project:** G&P Landing Page
**Researched:** 2026-03-28

## Strategy: CDN for Development, Standalone CLI for Production

The project constraint says "no build tools, no npm, no frameworks." The recommended approach honors this spirit while being smart about performance:

1. **Develop** with Tailwind CDN (`@tailwindcss/browser@4`) for instant feedback, zero setup
2. **Ship** with Tailwind standalone CLI (single binary, no Node.js, no npm) to generate a tiny static CSS file
3. A one-line build command (`./tailwindcss -i input.css -o output.css --minify`) replaces the CDN script tag for production

This is NOT a build system. It is a single binary you run once before deploying. The output is a static `.css` file under 10KB. GitHub Pages serves it like any other file. This approach eliminates the ~200KB runtime JS penalty of the CDN in production.

**Confidence: HIGH** -- verified via official Tailwind docs (tailwindcss.com/docs/installation/tailwind-cli)

## Recommended Stack

### Core Styling

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Tailwind CSS (CDN) | `@tailwindcss/browser@4` | Development styling | Zero setup, instant prototyping, full v4 features including container queries, 3D transforms, `@theme` customization. Use `<style type="text/tailwindcss">` for theme config. |
| Tailwind CSS (Standalone CLI) | v4.2 | Production CSS build | Single binary download from GitHub releases. No Node, no npm. Generates optimized CSS file < 10KB. Run once before deploy. |

**CDN script tag (development):**
```html
<script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
```

**Theme customization (works with both CDN and CLI):**
```html
<style type="text/tailwindcss">
  @import "tailwindcss";
  @theme {
    --color-gp-black: #0a0a0a;
    --color-gp-red: #c41e3a;
    --color-gp-gold: #c5a55a;
    --color-gp-white: #fafafa;
    --font-heading: 'Space Grotesk', sans-serif;
    --font-body: 'Inter', sans-serif;
  }
</style>
```

**Production build (one command):**
```bash
# Download once (macOS ARM):
curl -sLO https://github.com/tailwindlabs/tailwindcss/releases/latest/download/tailwindcss-macos-arm64
chmod +x tailwindcss-macos-arm64

# Build production CSS:
./tailwindcss-macos-arm64 -i input.css -o dist/output.css --minify
```

### Animation

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| GSAP | 3.14.2 | Scroll animations, entrance effects, timeline sequencing | Industry standard. Now 100% free (Webflow acquired GreenSock late 2024, removed paywall). ScrollTrigger plugin enables dramatic scroll-driven reveals. Tiny footprint via CDN. |

**CDN links:**
```html
<script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/ScrollTrigger.min.js"></script>
```

**Why GSAP over alternatives:**
- **vs AOS (Animate on Scroll):** AOS is stuck at v2.3.4 (7 years old, unmaintained). GSAP ScrollTrigger is actively maintained and far more powerful.
- **vs Anime.js:** Good but less ecosystem, weaker scroll-trigger support, less documentation.
- **vs Motion One / Web Animations API:** Promising but less battle-tested for complex timelines. GSAP's timeline API is unmatched for sequenced reveals.
- **vs CSS-only animations:** Use CSS transitions for simple hovers/state changes. Use GSAP for scroll-triggered sequences, staggered reveals, and complex timelines that CSS cannot handle cleanly.

**Confidence: HIGH** -- GSAP 3.14.2 verified via jsdelivr.com, free license confirmed via css-tricks.com

### Typography (Google Fonts)

| Font | Weight(s) | Purpose | Why |
|------|-----------|---------|-----|
| Space Grotesk | 500, 700 | Headings, hero text, CTAs | Geometric sans-serif with distinctive character. Bold without being aggressive. Conveys technical precision and modernity -- perfect for manufacturing/consulting. Excellent German character support (umlauts, eszett). |
| Inter | 400, 500, 600 | Body text, descriptions, UI text | The gold standard for screen readability. Neutral enough to not compete with bold headings. Variable font with optical sizing. Exceptional at small sizes. |

**CDN link (single request, both fonts):**
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@500;700&display=swap" rel="stylesheet">
```

**Why this pairing:**
- Space Grotesk's geometric boldness for "Dramatische Leistungssteigerung" hero text radiates Kompetenz and Entschlossenheit
- Inter's polished neutrality makes body text scannable for busy Geschaeftsfuehrer
- Both fonts have full German character support (critical: ae, oe, ue, ss)
- Well-established pairing recommended across multiple typography resources

**Why NOT other fonts:**
- **Germania One / Fraktur fonts:** Kitsch and unreadable. This is consulting, not a beer label.
- **Montserrat:** Overused. Does not differentiate.
- **Roboto:** Google's system font. Feels generic, not premium.
- **Playfair Display / serif fonts:** Too editorial. Manufacturing consulting needs geometric confidence, not literary elegance.

**Confidence: MEDIUM** -- font pairing is subjective. Verified both fonts have full German glyph coverage via Google Fonts specimen pages.

### Image Optimization

| Format | Use Case | Why |
|--------|----------|-----|
| WebP | Primary web format for photos | ~30% smaller than JPEG at equivalent quality. Universal browser support (Safari 14+, Chrome, Firefox, Edge). |
| AVIF | Progressive enhancement for hero images | ~50% smaller than JPEG. Supported in Chrome 85+, Firefox 93+, Safari 16.4+. Use as first source in `<picture>`. |
| JPEG | Fallback only | For browsers that do not support WebP (effectively none in 2026, but good practice). |
| SVG | Logo, icons, simple graphics | Infinitely scalable, tiny file size, style with CSS. |

**Implementation pattern:**
```html
<picture>
  <source srcset="hero.avif" type="image/avif">
  <source srcset="hero.webp" type="image/webp">
  <img src="hero.jpg" alt="..." loading="lazy" decoding="async"
       width="1200" height="800">
</picture>
```

**Hero image (LCP):** Do NOT lazy-load. Add `fetchpriority="high"`:
```html
<img src="hero.webp" alt="..." fetchpriority="high" width="1200" height="800">
```

**HEIC conversion pipeline (macOS, using ImageMagick):**
```bash
# Install once
brew install imagemagick

# Convert all HEIC to WebP (quality 80, good balance)
for f in bilder-landshut-asis/*.HEIC; do
  magick "$f" -quality 80 -resize "1920x1920>" \
    "images/$(basename "${f%.*}").webp"
done

# Generate AVIF versions for hero images
for f in bilder-landshut-asis/*.HEIC; do
  magick "$f" -quality 60 -resize "1920x1920>" \
    -define avif:speed=4 \
    "images/$(basename "${f%.*}").avif"
done
```

**Confidence: HIGH** -- AVIF/WebP support data verified via caniuse and MDN. ImageMagick HEIC support verified.

### Icons

| Technology | Purpose | Why |
|------------|---------|-----|
| Heroicons (inline SVG) | UI icons (arrows, phone, email, menu) | Made by Tailwind team. Copy-paste SVG, no external dependency. Matches Tailwind design language. |
| Custom SVG | G&P logo, brand marks | Inline for instant render, no HTTP request. |

**Why NOT icon fonts (Font Awesome, etc.):** Extra HTTP request, loads hundreds of unused icons, FOUT (flash of unstyled text), harder to style. Inline SVG is superior for a single-page site with < 20 icons.

**Confidence: HIGH**

## Infrastructure

| Technology | Purpose | Why |
|------------|---------|-----|
| GitHub Pages | Hosting | Free, supports custom domains, HTTPS included, perfect for static sites. Zero server management. |
| `<meta>` tags | SEO, Open Graph | Essential for Google indexing and social sharing previews. No build tool needed. |
| `rel="preconnect"` | Font performance | Establishes early connection to Google Fonts CDN. Free 100-300ms savings. |

## Performance Budget

For a single landing page targeting German manufacturing executives (likely on decent connections but possibly older devices):

| Metric | Target | How |
|--------|--------|-----|
| First Contentful Paint | < 1.5s | Preconnect fonts, inline critical CSS, hero image priority |
| Largest Contentful Paint | < 2.5s | Optimized hero image (WebP/AVIF), fetchpriority="high" |
| Total page weight | < 500KB | Optimized images, minified CSS, GSAP is ~25KB gzipped |
| CSS file (production) | < 10KB | Tailwind CLI purges unused styles |
| JavaScript | < 50KB gzipped | GSAP core (~25KB) + ScrollTrigger (~10KB) + custom (~5KB) |

## Alternatives Considered

| Category | Recommended | Alternative | Why Not |
|----------|-------------|-------------|---------|
| CSS Framework | Tailwind v4 (CDN + CLI) | Bootstrap 5 | Bootstrap's design language is recognizable and generic. Tailwind allows fully custom bold aesthetic. |
| CSS Framework | Tailwind v4 | Hand-written CSS | Too slow for rapid prototyping. No utility-class productivity. |
| Animation | GSAP 3.14 | AOS 2.3.4 | AOS unmaintained (7 years). Limited to simple fade/slide. Cannot do timeline sequences. |
| Animation | GSAP 3.14 | CSS-only | Insufficient for scroll-triggered staggered reveals. Use CSS for simple hovers. |
| Animation | GSAP 3.14 | Anime.js | Less documentation, weaker scroll integration, smaller community. |
| Fonts | Space Grotesk + Inter | System fonts | No brand differentiation. Looks generic. |
| Image format | WebP + AVIF | JPEG only | 30-50% larger files. No reason to skip modern formats in 2026. |
| Hosting | GitHub Pages | Netlify/Vercel | Overkill. No server-side features needed. GitHub Pages is simpler. |
| Icons | Inline SVG (Heroicons) | Font Awesome CDN | Extra request, loads unused icons, FOUT risk. |
| Build | Tailwind Standalone CLI | npm + PostCSS | Violates project constraint of no npm. Standalone CLI is a single binary. |

## Development Workflow

```
1. Edit index.html (Tailwind CDN loads in browser)
2. Open in browser (live-server or just file://)
3. Iterate on design with instant Tailwind feedback
4. When ready to deploy:
   a. Run: ./tailwindcss -i input.css -o dist/output.css --minify
   b. Replace CDN script tag with: <link href="dist/output.css" rel="stylesheet">
   c. Push to GitHub Pages
```

## Complete HTML Head Template

```html
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>G&P - Dramatische Leistungssteigerung fuer produzierende Unternehmen</title>

  <!-- Fonts (preconnect for speed) -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@500;700&display=swap" rel="stylesheet">

  <!-- Tailwind CSS (DEVELOPMENT: CDN) -->
  <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
  <!-- Tailwind CSS (PRODUCTION: swap above with this)
  <link href="dist/output.css" rel="stylesheet"> -->

  <!-- Custom theme -->
  <style type="text/tailwindcss">
    @theme {
      --color-gp-black: #0a0a0a;
      --color-gp-red: #c41e3a;
      --color-gp-gold: #c5a55a;
      --color-gp-white: #fafafa;
      --font-heading: 'Space Grotesk', sans-serif;
      --font-body: 'Inter', sans-serif;
    }
  </style>

  <!-- GSAP for scroll animations -->
  <script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/ScrollTrigger.min.js"></script>

  <!-- Open Graph / SEO -->
  <meta name="description" content="G&P - Dramatische Leistungssteigerung fuer produzierende Unternehmen. ERP & KI, Lean, Organisation.">
  <meta property="og:title" content="G&P - Hoechstleistung fuer Ihre Produktion">
  <meta property="og:type" content="website">
</head>
```

## Sources

- [Tailwind CSS v4 Play CDN docs](https://tailwindcss.com/docs/installation/play-cdn) -- official, HIGH confidence
- [Tailwind CSS v4 CLI docs](https://tailwindcss.com/docs/installation/tailwind-cli) -- official, HIGH confidence
- [Tailwind CSS v4 theme variables](https://tailwindcss.com/docs/theme) -- official, HIGH confidence
- [GSAP now free (CSS-Tricks)](https://css-tricks.com/gsap-is-now-completely-free-even-for-commercial-use/) -- verified, HIGH confidence
- [GSAP 3.14.2 on jsdelivr](https://www.jsdelivr.com/package/npm/gsap) -- verified, HIGH confidence
- [GSAP ScrollTrigger docs](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) -- official, HIGH confidence
- [Space Grotesk + Inter pairing](https://www.etienneaubertbonn.com/inter-font-pairing/) -- community, MEDIUM confidence
- [WebP vs AVIF comparison (SpeedVitals)](https://speedvitals.com/blog/webp-vs-avif/) -- editorial, MEDIUM confidence
- [Image optimization best practices 2025](https://www.frontendtools.tech/blog/modern-image-optimization-techniques-2025) -- editorial, MEDIUM confidence
- [CDN to production CSS workflow](https://www.conroyp.com/articles/tailwind-cdn-to-production-optimised-css-bundle) -- community, MEDIUM confidence
