# Phase 1: Complete Landing Page - Research

**Researched:** 2026-03-28
**Domain:** Static B2B landing page -- HTML + Tailwind CSS v4 + GSAP + image pipeline
**Confidence:** HIGH

## Summary

Phase 1 delivers the entire G&P landing page in a single phase. The project is a static single-page site with no backend, no framework, and no npm. The stack is locked: Tailwind CSS v4 (CDN for dev, standalone CLI for production), GSAP 3.14.2 + ScrollTrigger for scroll animations, Space Grotesk + Inter from Google Fonts, and optimized WebP/AVIF images converted from HEIC sources.

The critical path is: (1) set up the project skeleton with Tailwind theme and font loading, (2) convert HEIC photos to web formats, (3) build sections top-to-bottom following the narrative arc (hero through footer), (4) add GSAP scroll animations, (5) add legal/DSGVO compliance elements, and (6) production-harden with Tailwind CLI build and Lighthouse validation.

**Primary recommendation:** Build the page in a top-to-bottom narrative order. Start with the HTML skeleton, Tailwind theme, and image pipeline -- these unblock everything else. Then build each section sequentially (nav, hero, problem, pillars, credibility, schbrechstunde, final CTA, footer). Add GSAP animations after all sections exist. Finish with production CSS build, OG tags, cookie banner, and performance validation.

## Project Constraints (from CLAUDE.md)

- **Tech Stack**: Pure HTML + Tailwind CSS (CDN) + vanilla JS -- no build tools, no npm, no frameworks
- **Hosting**: GitHub Pages -- must be fully static
- **Assets**: HEIC photos need conversion to web formats (JPEG/WebP) before use
- **Language**: All user-facing content in German
- **Design Direction**: "Geiles Design" -- bold, provocative, premium. NOT generic corporate.
- **No system dialogs** -- use nice UI elements (from global CLAUDE.md)
- **No `rm` or `rm -rf`** -- use `trash` instead (from global CLAUDE.md)
- **File safety**: backup important files before modifying (from global CLAUDE.md)

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| DESIGN-01 | Bold typography system -- Space Grotesk (headings) + Inter (body) with oversized display sizes | Typography section: Google Fonts CDN link, Tailwind `@theme` font tokens, responsive size scale from UI-SPEC |
| DESIGN-02 | Dark, high-contrast color scheme that feels premium and anti-corporate | Color section: 8 custom color tokens via `@theme`, 60/30/10 distribution rule, WCAG contrast ratios verified |
| DESIGN-03 | Sections reveal with scroll-triggered GSAP animations | Animation section: GSAP 3.14.2 + ScrollTrigger CDN, `gsap.matchMedia()` for reduced-motion, per-section animation specs |
| DESIGN-04 | Real photos from bilder-landshut-asis integrated as WebP/AVIF with JPEG fallback | Image pipeline section: ImageMagick conversion commands, `<picture>` element pattern, EXIF stripping |
| DESIGN-05 | Fully responsive mobile-first | Layout section: Tailwind breakpoints, container max-width, responsive patterns per component |
| DESIGN-06 | German compound words render correctly with proper hyphenation | Typography rules: `lang="de"`, `hyphens: auto`, `text-balance` on headings |
| CONTENT-01 | Hero section with dramatic slogan and primary CTA | UI-SPEC copywriting contract: exact German copy, mailto link, animation timing |
| CONTENT-02 | Problem agitation section -- "Hoechstleistungskiller" framing | UI-SPEC section order and copy; fade-up staggered animation |
| CONTENT-03 | Three Themenschwerpunkte as bold visual blocks | UI-SPEC pillar cards layout: 3-column grid desktop, stacked mobile, card hover effects |
| CONTENT-04 | Sch(B)rechstunde KI section with CTA | UI-SPEC copy and mailto with pre-filled subject line |
| CONTENT-05 | Footer with links to v-und-s.de and neues-management.jimdofree.com | UI-SPEC footer layout and link targets |
| CONTENT-06 | Navigation (hamburger mobile, sticky desktop) | UI-SPEC nav layout: transparent-to-solid transition, mobile overlay, aria attributes |
| LEAD-01 | Primary CTA button in hero | UI-SPEC interaction contract: `mailto:f.gloebl@g-und-p.de` |
| LEAD-02 | Sch(B)rechstunde signup CTA | UI-SPEC: mailto with `?subject=Anmeldung%20Sch(B)rechstunde%20KI` |
| LEAD-03 | Multiple CTA touchpoints throughout page | UI-SPEC: 4 touchpoints -- hero, rhythm points ("Sprich mit Frank"), schbrechstunde, final CTA |
| LEGAL-01 | Impressum link to v-und-s.de | Footer external link |
| LEGAL-02 | Datenschutzerklaerung link to v-und-s.de | Footer external link |
| LEGAL-03 | Cookie/CDN disclosure banner (DSGVO) | UI-SPEC cookie banner: fixed bottom, localStorage dismissal, single "OK, verstanden" button |
| TECH-01 | Deploys correctly on GitHub Pages | Relative paths, `.nojekyll` file, test deployment early |
| TECH-02 | OG meta tags for LinkedIn/social sharing | HTML `<head>` template with og:title, og:description, og:image, og:type |
| TECH-03 | Lighthouse mobile score >= 90 | Performance budget: <500KB total, <2.5s LCP, hero fetchpriority="high", Tailwind CLI minify |
| TECH-04 | Page loads under 3s on 3G | Image optimization, lazy loading below fold, preconnect fonts, deferred JS |
| TECH-05 | HEIC photos converted to WebP + JPEG with EXIF/GPS stripped | Image pipeline: magick with -strip, color profile conversion, quality targets |
</phase_requirements>

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Tailwind CSS (CDN) | `@tailwindcss/browser@4.2.2` | Development styling | Zero setup, `@theme` customization, instant prototyping |
| Tailwind CSS (Standalone CLI) | v4.2.2 | Production CSS build | Single binary, no Node/npm, generates <10KB CSS |
| GSAP | 3.14.2 | Scroll animations + timelines | Industry standard, free license, ScrollTrigger plugin |
| GSAP ScrollTrigger | 3.14.2 | Scroll-driven animation triggers | Part of GSAP, CDN delivery |
| Space Grotesk | 700 | Heading font | Geometric boldness, full German character support |
| Inter | 400 | Body font | Screen readability gold standard, full German support |

**Version verification (2026-03-28):**
- `@tailwindcss/browser`: 4.2.2 (npm registry)
- `tailwindcss` (CLI): 4.2.2 (npm registry, GitHub release tag v4.2.2)
- `gsap`: 3.14.2 (npm registry)

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| Heroicons | inline SVG | UI icons (menu, close, arrows) | Copy-paste SVG, no CDN needed |
| ImageMagick | 7.1.2-3 | HEIC to WebP/AVIF/JPEG conversion | Pre-build image pipeline |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| GSAP ScrollTrigger | IntersectionObserver + CSS | Simpler but cannot do staggered timelines or count-up animations. Architecture research suggested this but UI-SPEC requires GSAP-level animation complexity. |
| Google Fonts CDN | Self-hosted fonts | Eliminates DSGVO concern but adds complexity. Google Fonts CDN is acceptable with a disclosure banner. |
| Tailwind CLI binary | Tailwind CDN in production | CDN adds ~200KB JS runtime + FOUC. CLI produces static CSS. Use CLI for production. |

**CDN URLs:**
```html
<!-- Tailwind (development only) -->
<script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>

<!-- GSAP -->
<script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/ScrollTrigger.min.js"></script>

<!-- Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400&family=Space+Grotesk:wght@700&display=swap" rel="stylesheet">
```

**Production build:**
```bash
# Download Tailwind CLI binary (once):
curl -sLO https://github.com/tailwindlabs/tailwindcss/releases/download/v4.2.2/tailwindcss-macos-arm64
chmod +x tailwindcss-macos-arm64

# Build production CSS:
./tailwindcss-macos-arm64 -i css/input.css -o css/output.css --minify
```

## Architecture Patterns

### Recommended Project Structure

```
gundp-webpage/
  index.html              -- Single page, all sections (~500-700 lines)
  css/
    input.css             -- @import "tailwindcss" + @theme + @layer components
    output.css            -- Generated by Tailwind CLI (committed for production)
  js/
    main.js               -- GSAP animations, nav behavior, cookie banner (~150-200 lines)
  assets/
    images/
      hero-bg.avif        -- Hero background (AVIF, highest priority)
      hero-bg.webp        -- Hero background (WebP fallback)
      hero-bg.jpg         -- Hero background (JPEG fallback)
      [other images].webp -- Below-fold images
      [other images].jpg  -- JPEG fallbacks
      og-image.jpg        -- Open Graph social sharing (1200x630)
  .nojekyll               -- Tell GitHub Pages to skip Jekyll
  build.sh                -- One-liner Tailwind CLI build script
  convert-images.sh       -- HEIC to WebP/AVIF/JPEG pipeline
  bilder-landshut-asis/   -- Source HEIC photos (not deployed)
```

### Pattern 1: Section-as-Component
**What:** Each `<section>` is self-contained with its own `id`, background color, padding, and content. No section depends on another.
**When to use:** Every section on the page.
**Example:**
```html
<section id="problem" class="bg-gp-charcoal py-12 md:py-16 lg:py-24">
  <div class="mx-auto max-w-7xl px-6 lg:px-8">
    <h2 class="font-heading text-3xl lg:text-5xl font-bold leading-tight text-gp-white">
      Warum die meisten Fabriken unter ihrem Potenzial bleiben
    </h2>
    <!-- section content -->
  </div>
</section>
```

### Pattern 2: Tailwind @theme for Design System
**What:** All custom colors, fonts, and tokens defined in `@theme` block. Tailwind auto-generates utility classes.
**When to use:** Always. This is the single source of truth for the design system.
**Example:**
```css
/* css/input.css */
@import "tailwindcss";

@theme {
  --color-gp-black: #0a0a0a;
  --color-gp-dark: #141414;
  --color-gp-charcoal: #1a1a1a;
  --color-gp-slate: #2a2a2a;
  --color-gp-grey: #666666;
  --color-gp-light: #e5e5e5;
  --color-gp-white: #fafafa;
  --color-gp-red: #c41e3a;
  --color-gp-red-hover: #d6263f;
  --color-gp-gold: #c5a55a;
  --color-gp-gold-hover: #d4b76a;
  --font-heading: 'Space Grotesk', sans-serif;
  --font-body: 'Inter', sans-serif;
}
```
This generates: `bg-gp-black`, `text-gp-red`, `font-heading`, `font-body`, etc.

### Pattern 3: GSAP matchMedia for Reduced Motion
**What:** Use `gsap.matchMedia()` to conditionally run animations only when `prefers-reduced-motion: no-preference`.
**When to use:** All GSAP scroll animations.
**Example:**
```javascript
// Source: https://gsap.com/docs/v3/GSAP/gsap.matchMedia()
gsap.registerPlugin(ScrollTrigger);

let mm = gsap.matchMedia();

mm.add("(prefers-reduced-motion: no-preference)", () => {
  // All scroll animations go here -- only run when motion is OK
  gsap.from("#problem h2", {
    scrollTrigger: { trigger: "#problem", start: "top 80%" },
    y: 30, opacity: 0, duration: 0.6, ease: "power2.out"
  });

  gsap.from(".pillar-card", {
    scrollTrigger: { trigger: "#pillars", start: "top 75%" },
    y: 40, opacity: 0, duration: 0.7, stagger: 0.15, ease: "power3.out"
  });

  // ... more animations
  return () => { /* cleanup runs automatically */ };
});
```

### Pattern 4: `<picture>` Element for Multi-Format Images
**What:** Use `<picture>` with AVIF, WebP, and JPEG sources. Browser picks the best supported format.
**When to use:** Every photo on the page.
**Example:**
```html
<!-- Hero (LCP - no lazy loading, high priority) -->
<picture>
  <source srcset="assets/images/hero-bg.avif" type="image/avif">
  <source srcset="assets/images/hero-bg.webp" type="image/webp">
  <img src="assets/images/hero-bg.jpg" alt="Produktionshalle mit modernen Maschinen"
       width="1920" height="1080" fetchpriority="high" decoding="async">
</picture>

<!-- Below-fold (lazy loaded) -->
<picture>
  <source srcset="assets/images/frank.webp" type="image/webp">
  <img src="assets/images/frank.jpg" alt="Frank Gloebl, Berater fuer produzierende Unternehmen"
       width="800" height="600" loading="lazy" decoding="async">
</picture>
```

### Pattern 5: Cookie Banner with localStorage
**What:** DSGVO disclosure banner, dismissible with localStorage persistence.
**When to use:** Required for Google Fonts CDN usage.
**Example:**
```javascript
// Check if already dismissed
if (!localStorage.getItem('gp-cookie-notice-dismissed')) {
  document.getElementById('cookie-banner').classList.remove('hidden');
}

document.getElementById('cookie-dismiss').addEventListener('click', () => {
  localStorage.setItem('gp-cookie-notice-dismissed', 'true');
  document.getElementById('cookie-banner').classList.add('hidden');
});
```

### Anti-Patterns to Avoid
- **Parallax scrolling:** Performance killer on mobile Safari. Use static backgrounds with overlay gradients.
- **Tailwind CDN in production:** Adds ~200KB JS, causes FOUC. Use standalone CLI build.
- **Auto-rotating carousel:** Content after slide 1 gets <1% engagement. Show all pillars in a grid.
- **Framework creep:** No Alpine.js, no Stimulus, no React. Vanilla JS handles the 4 interactive behaviors (nav toggle, scroll reveal, smooth scroll, cookie banner).
- **Loading all font weights:** Only load weight 400 (Inter body) and 700 (Space Grotesk headings). Each extra weight adds ~20KB.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Scroll-triggered animations | Custom IntersectionObserver + CSS | GSAP ScrollTrigger | Timeline sequencing, stagger, count-up animations need GSAP. IO+CSS cannot do staggered reveals cleanly. |
| Image format conversion | Manual one-by-one conversion | Shell script with ImageMagick | Consistent quality, EXIF stripping, color profile conversion. Error-prone by hand. |
| CSS utility generation | Custom CSS classes for every color/spacing | Tailwind @theme | Auto-generates hundreds of utilities from token definitions. |
| Responsive design system | Media queries by hand | Tailwind breakpoint prefixes | `sm:`, `md:`, `lg:` prefixes are consistent and auditable. |
| Icon system | SVG sprite sheet or icon font | Inline SVG copy-paste from Heroicons | Only ~5-8 icons needed. Inline is simpler and has zero HTTP overhead. |

**Key insight:** This is a static page with no backend and no state. The complexity is in visual polish (animations, responsive layout, image optimization) not in application logic. Use libraries for visual complexity, keep the JS tiny.

## Common Pitfalls

### Pitfall 1: Tailwind CDN Shipped to Production
**What goes wrong:** Page loads 200KB+ of JS, causes Flash of Unstyled Content, fails Core Web Vitals.
**Why it happens:** CDN is convenient during development and forgetting to switch is easy.
**How to avoid:** Create a `build.sh` script in Phase 1 that generates production CSS. The HTML template should have clearly commented CDN (dev) vs CSS link (prod) sections.
**Warning signs:** Lighthouse performance score drops below 80, visible FOUC on page load.

### Pitfall 2: GitHub Pages Base Path Breaks Assets
**What goes wrong:** Images, CSS, and JS files return 404 on GitHub Pages because paths start with `/`.
**Why it happens:** GitHub project pages serve from `username.github.io/repo-name/`, not from root.
**How to avoid:** Use relative paths everywhere (`./assets/images/` not `/assets/images/`). Deploy and test after the first commit, not after the site is "done."
**Warning signs:** Works locally with `python3 -m http.server` but all assets break on GitHub Pages.

### Pitfall 3: German Compound Words Overflow Containers
**What goes wrong:** "Hoechstleistungssteigerungspotenzial" overflows its container on mobile, breaking the layout.
**Why it happens:** CSS default does not hyphenate. English-centric layouts assume shorter words.
**How to avoid:** Set `lang="de"` on `<html>`, add `hyphens: auto` on body text, use `text-balance` on headings. Test with actual German copy during development, never lorem ipsum.
**Warning signs:** Horizontal scrollbar appears on mobile, text overflows card boundaries.

### Pitfall 4: Hero Image Kills LCP
**What goes wrong:** Largest Contentful Paint exceeds 4 seconds because the hero background image is lazy-loaded or unoptimized.
**Why it happens:** Default `loading="lazy"` applied to all images including the hero, or hero image is a 2MB JPEG.
**How to avoid:** Hero image uses `fetchpriority="high"`, NO `loading="lazy"`, AVIF/WebP format, max 1920px width, quality 60-80. Preconnect to image CDN if applicable.
**Warning signs:** Lighthouse flags LCP element as the hero image.

### Pitfall 5: GSAP Animations Run Without Checking Reduced Motion
**What goes wrong:** Users with vestibular disorders experience nausea or discomfort from scroll animations.
**Why it happens:** Animations are registered globally without checking `prefers-reduced-motion`.
**How to avoid:** Wrap ALL GSAP animations in `gsap.matchMedia("(prefers-reduced-motion: no-preference)")`. Elements render in their final state immediately when reduced motion is preferred.
**Warning signs:** Lighthouse accessibility audit flags motion issues.

### Pitfall 6: HEIC Color Profile Produces Washed-Out WebP
**What goes wrong:** Converted images look faded or have wrong colors compared to the original HEIC.
**Why it happens:** HEIC files from iPhone use Display P3 color profile. WebP/JPEG expect sRGB. Without explicit conversion, colors shift.
**How to avoid:** Use `magick input.HEIC -colorspace sRGB -strip -quality 80 output.webp` to explicitly convert color space and strip metadata.
**Warning signs:** Side-by-side comparison of HEIC preview and WebP shows noticeable color difference.

### Pitfall 7: Sticky Nav Covers Anchor Targets
**What goes wrong:** Clicking a nav link scrolls to the section but the heading is hidden behind the sticky nav bar.
**Why it happens:** `scroll-behavior: smooth` scrolls to the exact top of the element, not accounting for the 80px nav.
**How to avoid:** Set `scroll-padding-top: 5rem` (80px) on `<html>`. The UI-SPEC specifies this as `scroll-pt-20`.
**Warning signs:** Heading text is partially or fully hidden behind the nav after clicking an anchor link.

## Code Examples

### Complete input.css (Tailwind Theme)
```css
/* css/input.css */
@import "tailwindcss";

@theme {
  --color-gp-black: #0a0a0a;
  --color-gp-dark: #141414;
  --color-gp-charcoal: #1a1a1a;
  --color-gp-slate: #2a2a2a;
  --color-gp-grey: #666666;
  --color-gp-light: #e5e5e5;
  --color-gp-white: #fafafa;
  --color-gp-red: #c41e3a;
  --color-gp-red-hover: #d6263f;
  --color-gp-gold: #c5a55a;
  --color-gp-gold-hover: #d4b76a;
  --font-heading: 'Space Grotesk', sans-serif;
  --font-body: 'Inter', sans-serif;
}

/* Base styles */
@layer base {
  html {
    scroll-behavior: smooth;
    scroll-padding-top: 5rem;
  }
  body {
    font-family: var(--font-body);
    background-color: var(--color-gp-black);
    color: var(--color-gp-white);
    -webkit-font-smoothing: antialiased;
  }
  /* German hyphenation for body text */
  p, li, dd {
    hyphens: auto;
    -webkit-hyphens: auto;
  }
}
```

### HEIC Conversion Script
```bash
#!/bin/bash
# convert-images.sh -- Convert HEIC photos to web formats
# Requires: ImageMagick 7+ (brew install imagemagick)

SRC="bilder-landshut-asis"
DEST="assets/images"
mkdir -p "$DEST"

for f in "$SRC"/*.HEIC; do
  base=$(basename "${f%.*}")

  # WebP (primary format, quality 80)
  magick "$f" -colorspace sRGB -strip -quality 80 -resize "1920x1920>" \
    "$DEST/${base}.webp"

  # JPEG fallback (quality 85)
  magick "$f" -colorspace sRGB -strip -quality 85 -resize "1920x1920>" \
    "$DEST/${base}.jpg"

  # AVIF (hero images only, quality 60)
  magick "$f" -colorspace sRGB -strip -quality 60 -resize "1920x1920>" \
    "$DEST/${base}.avif"

  echo "Converted: $base (.webp, .jpg, .avif)"
done
```

### GSAP Animation Setup (main.js skeleton)
```javascript
// js/main.js
// Source: https://gsap.com/docs/v3/Plugins/ScrollTrigger/

gsap.registerPlugin(ScrollTrigger);

// === Reduced Motion Guard ===
let mm = gsap.matchMedia();

mm.add("(prefers-reduced-motion: no-preference)", () => {

  // Hero entrance (no scroll trigger -- plays on load)
  let heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
  heroTl
    .from("#hero h1", { y: 40, opacity: 0, duration: 0.8 })
    .from("#hero .subheadline", { y: 30, opacity: 0, duration: 0.6 }, "-=0.4")
    .from("#hero .cta-btn", { y: 20, opacity: 0, duration: 0.5 }, "-=0.3");

  // Problem section -- fade up staggered
  gsap.from("#problem .problem-item", {
    scrollTrigger: { trigger: "#problem", start: "top 80%" },
    y: 30, opacity: 0, duration: 0.6, stagger: 0.2, ease: "power2.out"
  });

  // Pillar cards -- fade up staggered left to right
  gsap.from(".pillar-card", {
    scrollTrigger: { trigger: "#pillars", start: "top 75%" },
    y: 40, opacity: 0, duration: 0.7, stagger: 0.15, ease: "power3.out"
  });

  // ... more section animations per UI-SPEC

  return () => { /* auto cleanup */ };
});

// === Sticky Nav (always active, not motion-dependent) ===
const nav = document.querySelector("nav");
window.addEventListener("scroll", () => {
  nav.classList.toggle("bg-gp-dark/95", window.scrollY > 80);
  nav.classList.toggle("backdrop-blur-sm", window.scrollY > 80);
}, { passive: true });

// === Mobile Menu Toggle ===
const menuBtn = document.getElementById("menu-btn");
const menuOverlay = document.getElementById("menu-overlay");
const menuClose = document.getElementById("menu-close");

function openMenu() {
  menuOverlay.classList.remove("hidden");
  menuBtn.setAttribute("aria-expanded", "true");
  document.body.style.overflow = "hidden";
}
function closeMenu() {
  menuOverlay.classList.add("hidden");
  menuBtn.setAttribute("aria-expanded", "false");
  document.body.style.overflow = "";
}

menuBtn?.addEventListener("click", openMenu);
menuClose?.addEventListener("click", closeMenu);
menuOverlay?.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", closeMenu);
});

// === Cookie Banner ===
if (!localStorage.getItem("gp-cookie-notice-dismissed")) {
  document.getElementById("cookie-banner")?.classList.remove("hidden");
}
document.getElementById("cookie-dismiss")?.addEventListener("click", () => {
  localStorage.setItem("gp-cookie-notice-dismissed", "true");
  document.getElementById("cookie-banner")?.classList.add("hidden");
});
```

### Smooth Scroll for Anchor Links
```javascript
// Already handled by CSS scroll-behavior: smooth + scroll-padding-top: 5rem
// JS enhancement only needed if programmatic scrolling is required
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute("href"));
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
    // Close mobile menu if open
    closeMenu();
  });
});
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Tailwind v3 `tailwind.config.js` | Tailwind v4 `@theme` in CSS | Feb 2025 (v4.0) | No JS config file, tokens defined in CSS, auto-generates utilities |
| GSAP paid license for commercial | GSAP fully free | Late 2024 (Webflow acquisition) | No license concern, use freely |
| AOS for scroll animations | GSAP ScrollTrigger | AOS unmaintained since 2019 | Use GSAP, not AOS |
| `loading="lazy"` on all images | `fetchpriority="high"` on LCP | 2023+ (Chrome 102) | Hero image must NOT be lazy-loaded |

**Deprecated/outdated:**
- Tailwind v3 config format (`tailwind.config.js`): Replaced by `@theme` directive in v4
- AOS (Animate on Scroll): Last release 7 years ago, do not use
- `type="text/tailwindcss"` style blocks: Only for CDN development mode. Production uses compiled CSS.

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| ImageMagick | HEIC conversion (DESIGN-04, TECH-05) | yes | 7.1.2-3 | -- |
| cwebp | Alternative WebP encoder | yes | 1.6.0 | ImageMagick handles WebP |
| avifenc | Alternative AVIF encoder | yes | 1.3.0 | ImageMagick handles AVIF |
| sips | macOS image tool | yes | built-in | ImageMagick preferred |
| Python 3 | Local dev server | yes | 3.14.3 | `npx serve .` |
| curl | Download Tailwind CLI binary | yes | built-in | -- |
| git | Version control | yes | 2.52.0 | -- |
| trash | Safe file deletion | yes | installed | -- |

**Missing dependencies with no fallback:** None.

**Missing dependencies with fallback:** None -- all tools available.

## Open Questions

1. **Which HEIC photos to use for which sections?**
   - What we know: 3 HEIC files exist in `bilder-landshut-asis/` (IMG_0350, IMG_0350 2, IMG_0351)
   - What's unclear: Which photo is best for the hero background vs. credibility section. Only 3 photos may not be enough for all sections.
   - Recommendation: Convert all 3, visually evaluate, assign to sections. Use CSS gradient overlays to make any photo work as a dark hero background. If more photos are needed, use atmospheric dark backgrounds without photos for some sections.

2. **Specific results metrics for credibility section**
   - What we know: UI-SPEC references count-up animations for metrics (e.g., "30% Leistungssteigerung")
   - What's unclear: Actual numbers need to come from Frank Gloebl
   - Recommendation: Build the counter animation with placeholder numbers. Real numbers are a content swap, not a code change.

3. **G&P logo / brand mark**
   - What we know: UI-SPEC mentions "Logo left" in nav. No logo file exists in the repo.
   - What's unclear: Whether an SVG logo exists or needs to be created
   - Recommendation: Use text "G&P" in Space Grotesk 700 as the nav brand mark. This is consistent with the bold typographic approach and avoids blocking on a missing asset.

## Sources

### Primary (HIGH confidence)
- [Tailwind CSS v4 @theme docs](https://tailwindcss.com/docs/theme) -- verified @theme syntax, namespace-to-utility mapping
- [Tailwind CSS v4 CLI docs](https://tailwindcss.com/docs/installation/tailwind-cli) -- standalone binary workflow
- [Tailwind CSS v4.2.2 GitHub release](https://github.com/tailwindlabs/tailwindcss/releases/tag/v4.2.2) -- macOS ARM64 binary: `tailwindcss-macos-arm64`
- [GSAP ScrollTrigger docs](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) -- basic usage, trigger configuration
- [GSAP matchMedia docs](https://gsap.com/docs/v3/GSAP/gsap.matchMedia()) -- reduced motion implementation
- npm registry: `@tailwindcss/browser@4.2.2`, `gsap@3.14.2` -- version verification 2026-03-28

### Secondary (MEDIUM confidence)
- [GSAP matchMedia + reduced motion community forum](https://gsap.com/community/forums/topic/27141-scrolltriggermatchmedia-and-prefers-reduced-motion/) -- pattern validation
- [Codrops GSAP scroll animations (Dec 2025)](https://tympanus.net/codrops/2025/12/17/building-responsive-scroll-triggered-curved-path-animations-with-gsap/) -- recent best practices

### Tertiary (LOW confidence)
- Font pairing (Space Grotesk + Inter) is subjective -- validate visually with actual German headline copy
- Performance budget targets (<500KB, <2.5s LCP) are industry standards, not measured against these specific assets

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH -- all versions verified against npm registry and GitHub releases
- Architecture: HIGH -- single-page static HTML is the simplest possible architecture, patterns verified via official docs
- Pitfalls: HIGH -- sourced from official docs (Tailwind CDN warning), platform docs (GitHub Pages), and established web performance research
- Image pipeline: HIGH -- ImageMagick 7.1.2 confirmed available locally, conversion commands verified

**Research date:** 2026-03-28
**Valid until:** 2026-04-28 (stable stack, no fast-moving dependencies)
