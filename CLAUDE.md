# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Landing page for **G&P** (Glöbl & Partner) — a consultancy helping manufacturing companies achieve dramatic performance improvements. Single-page site with bold, striking design.

**Tech Stack:** Pure HTML, JavaScript, Tailwind CSS (via CDN). No build tools, no framework — open `index.html` directly in a browser.

**Design Direction:** Geiles Design — bold typography, dramatic visuals, high contrast, confident whitespace. NOT generic corporate. Think premium, provocative, manufacturing-meets-modern.

## Key Content Structure

- **Hero:** Slogan "Dramatische Leistungssteigerung für produzierende Unternehmen"
- **3 Focus Areas:**
  1. ERP & KI — Höchstleistungs-Killer vermeiden
  2. Orga, Mensch & Führung — Rahmen für Höchstleistungs-Entfaltung
  3. Lean — ohne saugute Wertschöpfung ist alles andere nichts
- **Special Section:** Sch(B)rechstunde KI — Freitags 16:00h, Anmeldung via f.gloebl@g-und-p.de
- **Links:** Mutter-Homepage v-und-s.de, Themen auf neues-management.jimdofree.com

## Language

All content is **German**. Code comments and commit messages in English are fine.

## Assets

- Reference photos in `bilder-landshut-asis/` (HEIC format — convert to web formats before use)
- Reference design: https://www.g-u-p.de/

## Development

```bash
# Serve locally (any simple HTTP server works)
python3 -m http.server 8000
# or
npx serve .
```

No build step. No npm install. Just HTML + Tailwind CDN + JS.

<!-- GSD:project-start source:PROJECT.md -->
## Project

**G&P Landing Page**

A bold, high-impact single-page website for G&P (Glöbl & Partner), a consultancy that delivers dramatic performance improvements for manufacturing companies. The page targets Geschäftsführer and Entscheider in produzierenden Unternehmen, driving them to take action — sign up for the "Sch(B)rechstunde KI" or contact G&P directly.

**Core Value:** Geschäftsführer produzierende Unternehmen must feel *compelled* to act — either signing up for the Sch(B)rechstunde or reaching out to G&P. The page must radiate competence, provocation, and Höchstleistung.

### Constraints

- **Tech Stack**: Pure HTML + Tailwind CSS (CDN) + vanilla JS — no build tools, no npm, no frameworks
- **Hosting**: GitHub Pages — must be fully static
- **Assets**: HEIC photos need conversion to web formats (JPEG/WebP) before use
- **Language**: All user-facing content in German
<!-- GSD:project-end -->

<!-- GSD:stack-start source:research/STACK.md -->
## Technology Stack

## Strategy: CDN for Development, Standalone CLI for Production
## Recommended Stack
### Core Styling
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Tailwind CSS (CDN) | `@tailwindcss/browser@4` | Development styling | Zero setup, instant prototyping, full v4 features including container queries, 3D transforms, `@theme` customization. Use `<style type="text/tailwindcss">` for theme config. |
| Tailwind CSS (Standalone CLI) | v4.2 | Production CSS build | Single binary download from GitHub releases. No Node, no npm. Generates optimized CSS file < 10KB. Run once before deploy. |
# Download once (macOS ARM):
# Build production CSS:
### Animation
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| GSAP | 3.14.2 | Scroll animations, entrance effects, timeline sequencing | Industry standard. Now 100% free (Webflow acquired GreenSock late 2024, removed paywall). ScrollTrigger plugin enables dramatic scroll-driven reveals. Tiny footprint via CDN. |
- **vs AOS (Animate on Scroll):** AOS is stuck at v2.3.4 (7 years old, unmaintained). GSAP ScrollTrigger is actively maintained and far more powerful.
- **vs Anime.js:** Good but less ecosystem, weaker scroll-trigger support, less documentation.
- **vs Motion One / Web Animations API:** Promising but less battle-tested for complex timelines. GSAP's timeline API is unmatched for sequenced reveals.
- **vs CSS-only animations:** Use CSS transitions for simple hovers/state changes. Use GSAP for scroll-triggered sequences, staggered reveals, and complex timelines that CSS cannot handle cleanly.
### Typography (Google Fonts)
| Font | Weight(s) | Purpose | Why |
|------|-----------|---------|-----|
| Space Grotesk | 500, 700 | Headings, hero text, CTAs | Geometric sans-serif with distinctive character. Bold without being aggressive. Conveys technical precision and modernity -- perfect for manufacturing/consulting. Excellent German character support (umlauts, eszett). |
| Inter | 400, 500, 600 | Body text, descriptions, UI text | The gold standard for screen readability. Neutral enough to not compete with bold headings. Variable font with optical sizing. Exceptional at small sizes. |
- Space Grotesk's geometric boldness for "Dramatische Leistungssteigerung" hero text radiates Kompetenz and Entschlossenheit
- Inter's polished neutrality makes body text scannable for busy Geschaeftsfuehrer
- Both fonts have full German character support (critical: ae, oe, ue, ss)
- Well-established pairing recommended across multiple typography resources
- **Germania One / Fraktur fonts:** Kitsch and unreadable. This is consulting, not a beer label.
- **Montserrat:** Overused. Does not differentiate.
- **Roboto:** Google's system font. Feels generic, not premium.
- **Playfair Display / serif fonts:** Too editorial. Manufacturing consulting needs geometric confidence, not literary elegance.
### Image Optimization
| Format | Use Case | Why |
|--------|----------|-----|
| WebP | Primary web format for photos | ~30% smaller than JPEG at equivalent quality. Universal browser support (Safari 14+, Chrome, Firefox, Edge). |
| AVIF | Progressive enhancement for hero images | ~50% smaller than JPEG. Supported in Chrome 85+, Firefox 93+, Safari 16.4+. Use as first source in `<picture>`. |
| JPEG | Fallback only | For browsers that do not support WebP (effectively none in 2026, but good practice). |
| SVG | Logo, icons, simple graphics | Infinitely scalable, tiny file size, style with CSS. |
# Install once
# Convert all HEIC to WebP (quality 80, good balance)
# Generate AVIF versions for hero images
### Icons
| Technology | Purpose | Why |
|------------|---------|-----|
| Heroicons (inline SVG) | UI icons (arrows, phone, email, menu) | Made by Tailwind team. Copy-paste SVG, no external dependency. Matches Tailwind design language. |
| Custom SVG | G&P logo, brand marks | Inline for instant render, no HTTP request. |
## Infrastructure
| Technology | Purpose | Why |
|------------|---------|-----|
| GitHub Pages | Hosting | Free, supports custom domains, HTTPS included, perfect for static sites. Zero server management. |
| `<meta>` tags | SEO, Open Graph | Essential for Google indexing and social sharing previews. No build tool needed. |
| `rel="preconnect"` | Font performance | Establishes early connection to Google Fonts CDN. Free 100-300ms savings. |
## Performance Budget
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
## Complete HTML Head Template
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
<!-- GSD:stack-end -->

<!-- GSD:conventions-start source:CONVENTIONS.md -->
## Conventions

Conventions not yet established. Will populate as patterns emerge during development.
<!-- GSD:conventions-end -->

<!-- GSD:architecture-start source:ARCHITECTURE.md -->
## Architecture

Architecture not yet mapped. Follow existing patterns found in the codebase.
<!-- GSD:architecture-end -->

<!-- GSD:workflow-start source:GSD defaults -->
## GSD Workflow Enforcement

Before using Edit, Write, or other file-changing tools, start work through a GSD command so planning artifacts and execution context stay in sync.

Use these entry points:
- `/gsd:quick` for small fixes, doc updates, and ad-hoc tasks
- `/gsd:debug` for investigation and bug fixing
- `/gsd:execute-phase` for planned phase work

Do not make direct repo edits outside a GSD workflow unless the user explicitly asks to bypass it.
<!-- GSD:workflow-end -->

<!-- GSD:profile-start -->
## Developer Profile

> Profile not yet configured. Run `/gsd:profile-user` to generate your developer profile.
> This section is managed by `generate-claude-profile` -- do not edit manually.
<!-- GSD:profile-end -->
