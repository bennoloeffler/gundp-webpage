# Architecture Patterns

**Domain:** Premium B2B consulting landing page (single-page, static)
**Researched:** 2026-03-28

## Recommended Architecture

A single HTML file with compiled Tailwind CSS and a small vanilla JS file. No frameworks, no bundlers, no SPA routing. The page is a linear narrative scroll: problem, authority, solution, proof, action.

### High-Level Structure

```
index.html          -- Single page, all sections
css/
  input.css         -- Tailwind directives + custom styles
  output.css        -- Compiled production CSS (generated)
js/
  main.js           -- Scroll animations, mobile nav, interactions
assets/
  images/           -- Optimized WebP/JPEG from HEIC sources
  fonts/            -- Self-hosted bold display font (if needed)
```

### Build Approach: Tailwind Standalone CLI (not CDN)

**Decision:** Use the Tailwind CSS v4 standalone CLI executable, not the Play CDN.

**Why:** The Play CDN is explicitly "not intended for production" per Tailwind's own docs. It adds 300KB+ of JavaScript, causes flash of unstyled content, and processes styles at runtime. The standalone CLI produces a single, optimized CSS file with zero runtime overhead and requires no Node.js or npm.

**How it works:**
1. Download the standalone executable for macOS from [Tailwind releases](https://github.com/tailwindlabs/tailwindcss/releases/latest)
2. During development: `./tailwindcss -i css/input.css -o css/output.css --watch`
3. For production: `./tailwindcss -i css/input.css -o css/output.css --minify`
4. Commit the compiled `output.css` to the repo -- GitHub Pages serves it directly

This keeps the "no npm, no node_modules" constraint while producing production-quality CSS.

**Fallback:** If the standalone CLI creates friction for the client maintaining the site, the Play CDN (`@tailwindcss/browser@4`) is acceptable for a low-traffic consulting page. The performance penalty is real but tolerable for a site that gets hundreds, not millions, of visits. Include both options in the build script.

---

## Section Layout and Ordering

The page follows a persuasion-optimized narrative flow. Each section has one job and hands off to the next. This order is based on B2B landing page conversion research and adapted for a manufacturing consultancy targeting Geschaeftsfuehrer.

### Section 1: Navigation Bar (sticky)
**Purpose:** Orientation and quick-jump to sections
**Behavior:** Transparent on top, solid background on scroll (triggered at ~80px scroll). Hamburger menu on mobile.
**Content:** Logo/brand mark, section anchor links, primary CTA button ("Kontakt")
**Build order:** Phase 1

### Section 2: Hero
**Purpose:** Emotional hook -- 3-5 seconds to communicate who, what, and why
**Content:** Dramatic headline ("Dramatische Leistungssteigerung fuer produzierende Unternehmen"), subheadline with the "Hoechstleistungskiller" provocation, single CTA button, atmospheric background image (Landshut photos)
**Layout:** Full viewport height (`min-h-screen`). Centered text over darkened background image. Large bold typography. Single CTA.
**Build order:** Phase 1

### Section 3: Problem Agitation
**Purpose:** Make the Geschaeftsfuehrer feel the pain -- "this is about YOUR company"
**Content:** 2-3 provocative statements about manufacturing performance killers. Short, punchy copy. No solutions yet.
**Layout:** Dark background, large text, generous whitespace. Optional: subtle counter/stat animation on scroll.
**Build order:** Phase 2

### Section 4: Three Pillars (Themenschwerpunkte)
**Purpose:** Show the solution framework -- ERP & KI, Orga/Mensch/Fuehrung, Lean
**Content:** Three bold visual blocks, each with icon/image, title, 2-3 sentence description, and a subtle CTA
**Layout:** Three-column grid on desktop (`grid-cols-3`), stacked on mobile. Each block is a card with strong visual identity. Equal sizing creates balance.
**Build order:** Phase 2

### Section 5: Credibility / Social Proof
**Purpose:** Build trust -- who is Frank Gloebl, what results has G&P delivered
**Content:** Brief bio/photo, key results or metrics (e.g., "30% Leistungssteigerung in 6 Monaten"), client logos or testimonial quotes if available
**Layout:** Two-column on desktop (photo left, text right). Metrics can use large numbers with subtle count-up animation.
**Build order:** Phase 3

### Section 6: Sch(B)rechstunde KI
**Purpose:** Specific, time-bound CTA -- Freitags 16:00h
**Content:** What it is, when it happens, how to sign up (mailto CTA to f.gloebl@g-und-p.de), what participants get
**Layout:** Highlighted section with distinct background color. Calendar-like visual element. Prominent CTA button.
**Build order:** Phase 2

### Section 7: Call to Action (Final)
**Purpose:** Close the deal -- one clear next step
**Content:** Single compelling statement + primary CTA (contact), secondary CTA (Sch(B)rechstunde)
**Layout:** Full-width, high-contrast section. Minimal content, maximum impact. This is the "ask."
**Build order:** Phase 3

### Section 8: Footer
**Purpose:** Practical information and legal compliance
**Content:** Links to v-und-s.de and neues-management.jimdofree.com, Impressum, Datenschutz, contact email, copyright
**Layout:** Simple dark footer, standard multi-column layout
**Build order:** Phase 1

### Section Flow Rationale

```
Hero (emotion) --> Problem (pain) --> Pillars (solution) --> Proof (trust) --> Sch(B)rechstunde (specific offer) --> CTA (action) --> Footer (info)
```

This follows the classic AIDA model (Attention, Interest, Desire, Action) adapted for B2B consulting:
- **Attention:** Hero grabs with bold provocation
- **Interest:** Problem section makes it personal
- **Desire:** Pillars + Proof show competence and results
- **Action:** Sch(B)rechstunde and final CTA provide clear next steps

CTAs appear in Hero, Pillars (subtle), Sch(B)rechstunde, and Final CTA -- four touchpoints without feeling pushy.

---

## Responsive Strategy

**Approach:** Mobile-first with Tailwind's responsive prefixes (`sm:`, `md:`, `lg:`).

**Why mobile-first:** Geschaeftsfuehrer check their phones constantly. A consulting page that looks bad on mobile signals incompetence. Start with the constrained layout, enhance for desktop.

### Breakpoint Strategy

| Breakpoint | Tailwind Prefix | Target |
|------------|----------------|--------|
| < 640px | (default) | Mobile phones |
| >= 640px | `sm:` | Large phones, small tablets |
| >= 768px | `md:` | Tablets |
| >= 1024px | `lg:` | Laptops, desktops |
| >= 1280px | `xl:` | Large desktops |

### Key Responsive Patterns

| Component | Mobile | Desktop |
|-----------|--------|---------|
| Navigation | Hamburger menu, slide-in panel | Horizontal link bar |
| Hero | Stacked, full-bleed image, smaller heading | Large heading, possible side layout |
| Three Pillars | Single column, stacked cards | Three-column grid |
| Credibility | Stacked (image above text) | Two-column side-by-side |
| Typography | Base 16px, headings 2xl-4xl | Base 18px, headings 4xl-7xl |
| Spacing | Sections py-16 | Sections py-24 to py-32 |

### Typography Scale

Use Tailwind's built-in scale with a bold, high-contrast approach:

- **Hero headline:** `text-4xl md:text-6xl lg:text-7xl font-black` -- must dominate the viewport
- **Section headings:** `text-3xl md:text-4xl lg:text-5xl font-bold`
- **Body text:** `text-lg md:text-xl leading-relaxed`
- **CTA buttons:** `text-lg md:text-xl font-bold px-8 py-4`

---

## Scroll and Animation Architecture

### Core Principle: IntersectionObserver, not scroll events

All scroll-triggered animations use the native `IntersectionObserver` API. No external libraries needed. This is performant, battery-friendly, and has 95%+ browser support.

### Animation System (main.js)

```javascript
// Pattern: Generic reveal-on-scroll observer
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      observer.unobserve(entry.target); // animate once only
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));
```

### CSS Animation Classes

Define in `input.css` with Tailwind's `@layer`:

```css
@layer components {
  [data-animate] {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
  }
  [data-animate].revealed {
    opacity: 1;
    transform: translateY(0);
  }
  [data-animate="fade-left"] {
    transform: translateX(-30px);
  }
  [data-animate="fade-left"].revealed {
    transform: translateX(0);
  }
}
```

### Animation Types by Section

| Section | Animation | Trigger |
|---------|-----------|---------|
| Hero | None (immediately visible) or subtle fade-in on load | Page load |
| Problem | Fade-up, staggered paragraphs | Scroll into view |
| Three Pillars | Fade-up with stagger (left, center, right) | Scroll into view |
| Credibility | Fade-left (image), fade-right (text) | Scroll into view |
| Sch(B)rechstunde | Fade-up | Scroll into view |
| Final CTA | Fade-up | Scroll into view |
| Numbers/Stats | Count-up animation (JS-driven) | Scroll into view |

### Sticky Navigation Behavior

```javascript
// Pattern: Navbar background on scroll
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('bg-gray-900/95', window.scrollY > 80);
  nav.classList.toggle('bg-transparent', window.scrollY <= 80);
}, { passive: true });
```

### Smooth Scroll for Anchor Links

```javascript
// All internal links get smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
```

Also set in CSS: `html { scroll-behavior: smooth; scroll-padding-top: 5rem; }` (accounts for sticky nav height).

---

## File Organization

```
gundp-webpage/
  index.html              -- The single page
  css/
    input.css             -- Tailwind @import + custom @layer styles
    output.css            -- Generated by Tailwind CLI (committed)
  js/
    main.js               -- All interactions (~100-150 lines)
  assets/
    images/
      hero-bg.webp        -- Hero background (converted from HEIC)
      frank-portrait.webp -- Credibility section
      pillar-erp.webp     -- Pillar icons/images
      pillar-orga.webp
      pillar-lean.webp
      og-image.jpg        -- Open Graph social sharing image
    fonts/                -- Only if self-hosting a display font
  favicon.ico
  CNAME                   -- If using custom domain with GitHub Pages
  .nojekyll               -- Tell GitHub Pages to skip Jekyll processing
```

**Total JS:** One file, ~100-150 lines. No dependencies.
**Total CSS:** One compiled file from Tailwind.
**Total HTML:** One file, ~400-600 lines.

---

## Component Boundaries

| Component | Responsibility | Communicates With |
|-----------|---------------|-------------------|
| `<nav>` | Navigation, scroll-aware styling | main.js (scroll listener) |
| `<section id="hero">` | First impression, primary CTA | Self-contained |
| `<section id="problem">` | Pain agitation | main.js (scroll reveal) |
| `<section id="pillars">` | Solution framework (3 cards) | main.js (scroll reveal) |
| `<section id="proof">` | Credibility, social proof | main.js (scroll reveal, counter) |
| `<section id="schbrechstunde">` | Specific offer CTA | main.js (scroll reveal) |
| `<section id="contact">` | Final conversion CTA | Self-contained |
| `<footer>` | Links, legal, copyright | Self-contained |
| `main.js` | All interactivity | DOM via IntersectionObserver, scroll events |
| `input.css` | Custom styles, animation defs | Tailwind CLI compiles to output.css |

### Data Flow

```
User scrolls
  --> IntersectionObserver fires callback
  --> CSS class toggled on element
  --> CSS transition/animation plays

User clicks nav link
  --> JS intercepts click
  --> scrollIntoView() to target section
  --> IntersectionObserver triggers animations in that section

User clicks CTA
  --> mailto: link opens email client (no backend needed)
```

All data flow is unidirectional: user action --> JS handler --> DOM mutation --> CSS renders.

---

## Patterns to Follow

### Pattern 1: Section-as-Component
**What:** Each `<section>` is self-contained with its own `id`, background treatment, and padding. No section depends on another section's layout.
**When:** Always. Every section.
**Why:** Makes reordering trivial, testing isolated, and responsive behavior predictable.

### Pattern 2: Utility-First with @layer Escapes
**What:** Use Tailwind utility classes for 95% of styling. Use `@layer components` in `input.css` only for animation states and complex pseudo-element patterns that are awkward as utilities.
**When:** When a pattern repeats 3+ times or involves state transitions (`.revealed`).

### Pattern 3: Progressive Enhancement
**What:** Page is fully readable with CSS only. JavaScript adds polish (animations, smooth scroll, sticky nav effects) but nothing breaks without it.
**When:** Always. A Geschaeftsfuehrer with an aggressive corporate firewall that blocks JS should still see the content.

### Pattern 4: Image Optimization Pipeline
**What:** Convert HEIC source images to WebP (primary) + JPEG (fallback) using `<picture>` elements. Multiple sizes via `srcset`.
**When:** Every image. Critical for mobile performance.

```html
<picture>
  <source srcset="assets/images/hero-bg.webp" type="image/webp">
  <img src="assets/images/hero-bg.jpg" alt="..." loading="lazy">
</picture>
```

Hero image uses `loading="eager"`, all others `loading="lazy"`.

---

## Anti-Patterns to Avoid

### Anti-Pattern 1: Parallax Scrolling
**What:** Background images moving at different scroll speeds
**Why bad:** Performance killer on mobile, causes jank, often breaks on iOS Safari. Feels dated in 2026.
**Instead:** Static full-bleed backgrounds with subtle opacity/overlay transitions on scroll.

### Anti-Pattern 2: Carousel/Slider for Core Content
**What:** Auto-rotating content in the hero or pillars section
**Why bad:** Users don't interact with carousels. Content after slide 1 gets <1% engagement. Adds JS complexity.
**Instead:** Show all three pillars simultaneously in a grid.

### Anti-Pattern 3: Heavy Animation Libraries
**What:** Including GSAP, AOS, or Animate.css for a landing page
**Why bad:** Overkill for a static page with 6-8 sections. Adds 30-100KB of JS for effects achievable with IntersectionObserver + CSS transitions in 50 lines.
**Instead:** Vanilla IntersectionObserver + CSS transitions as described above.

### Anti-Pattern 4: Framework Creep
**What:** Adding Alpine.js, Stimulus, or any JS framework "just in case"
**Why bad:** Scope creep. A static consulting page has 3 interactive behaviors (nav toggle, scroll reveal, smooth scroll). No framework needed.
**Instead:** 100 lines of vanilla JS.

---

## Performance Budget

| Metric | Target | How |
|--------|--------|-----|
| First Contentful Paint | < 1.5s | Inline critical CSS, preload hero image |
| Largest Contentful Paint | < 2.5s | Optimized hero WebP, proper sizing |
| Total page weight | < 500KB | Compressed images, minified CSS, tiny JS |
| JavaScript | < 5KB | Single vanilla JS file |
| CSS | < 15KB | Tailwind CLI purges unused styles |
| Time to Interactive | < 2s | No render-blocking JS |

### Critical Rendering Path

1. HTML loads (single file, small)
2. CSS loads (output.css, linked in `<head>`)
3. Hero image loads (preloaded via `<link rel="preload">`)
4. JS loads (deferred via `<script defer>`)
5. Below-fold images lazy-load as user scrolls

---

## Build Order Implications

The sections and components map to a natural build progression:

| Phase | What to Build | Why This Order |
|-------|--------------|----------------|
| Phase 1 | HTML skeleton, nav, hero, footer, Tailwind setup, responsive grid | Foundation. Everything else sits on top of this. Validates design direction early. |
| Phase 2 | Problem section, Three Pillars, Sch(B)rechstunde section | Core content sections. These carry the conversion narrative. |
| Phase 3 | Credibility/proof section, scroll animations, sticky nav, image optimization | Polish layer. Adds trust signals and visual refinement. |
| Phase 4 | Performance optimization, SEO meta tags, OG image, final responsive QA, GitHub Pages deploy | Ship it. Production readiness. |

**Why this order matters:**
- Phase 1 produces something deployable immediately (hero + nav + footer = a real page)
- Phase 2 adds all conversion-driving content before any polish
- Phase 3 adds trust and delight -- the "geiles Design" factor
- Phase 4 is production hardening, not new features

---

## Scalability Considerations

| Concern | Current (1 page) | Future (if needed) |
|---------|-------------------|-------------------|
| Content updates | Edit HTML directly | Consider a simple templating system (11ty) |
| Multiple languages | Not needed (German only) | Duplicate HTML with hreflang tags |
| Blog/news | Out of scope (lives on jimdofree) | Keep out of scope -- separate concern |
| Analytics | Not in v1 | Add Plausible or simple GA4 snippet |
| Contact form | mailto: links | Formspree or Netlify Forms (no backend) |

---

## Sources

- [Instapage: 9 B2B Landing Page Lessons 2025](https://instapage.com/blog/b2b-landing-page-best-practices) -- section ordering, conversion patterns
- [CXL: How to Build a High-Converting Landing Page](https://cxl.com/blog/how-to-build-a-high-converting-landing-page/) -- visual hierarchy, anatomy
- [Tailwind CSS Play CDN docs](https://tailwindcss.com/docs/installation/play-cdn) -- CDN limitations, v4 syntax
- [Tailwind CSS CLI docs](https://tailwindcss.com/docs/installation/tailwind-cli) -- standalone CLI approach
- [Tailwind Standalone CLI announcement](https://tailwindcss.com/blog/standalone-cli) -- no-Node.js workflow
- [FreeCodeCamp: Scroll Animations with IntersectionObserver](https://www.freecodecamp.org/news/scroll-animations-with-javascript-intersection-observer-api/) -- vanilla JS scroll patterns
- [Directive Consulting: B2B Landing Page Best Practices](https://directiveconsulting.com/blog/blog-b2b-landing-page-best-practices-examples/) -- B2B-specific conversion patterns
- [TAOS: Tailwind Animation on Scroll](https://versoly.com/taos) -- considered but rejected (unnecessary dependency)
