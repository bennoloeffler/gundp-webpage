# Project Research Summary

**Project:** G&P Landing Page
**Domain:** B2B consulting landing page (manufacturing performance consultancy, German market)
**Researched:** 2026-03-28
**Confidence:** HIGH

## Executive Summary

G&P needs a single-page static landing page that breaks every rule of boring corporate consulting websites. The target audience -- Geschaeftsfuehrer of manufacturing companies -- has seen hundreds of blue-grey template sites with stock handshake photos and empty slogans. Research across stack, features, architecture, and pitfalls converges on one conclusion: this page must be visually bold, textually provocative, and technically lean. The recommended approach is a single HTML file, Tailwind CSS compiled via standalone CLI binary (no npm, no Node), GSAP for scroll animations, and optimized WebP images from the existing Landshut photo set. The entire site should weigh under 500KB and load in under 2.5 seconds.

The biggest risk is not technical -- it is design timidity. Every researcher flagged "generic corporate design" as a critical pitfall. If the page could belong to any consulting company after swapping the logo, it has failed. The second risk is the HEIC-to-WebP image pipeline: the existing photos are in Apple's HEIC format, which no browser supports, and hasty conversion produces bloated or color-shifted results. The third risk is shipping the Tailwind CDN to production, which adds 300KB+ of JavaScript and causes a Flash of Unstyled Content. The mitigation for all three is to address them in Phase 1 before any content sections are built: establish the bold design system, convert images properly, and set up the Tailwind CLI binary build.

The recommended build order follows the persuasion arc of the page itself: foundation and hero first (because if the hero fails, nothing else matters), then the core content sections that carry the conversion narrative, then polish and trust signals, then production hardening. Four phases, each delivering something deployable, each building on the last.

## Key Findings

### Recommended Stack

The stack honors the "no npm, no frameworks" constraint while being smart about production quality. Tailwind CSS v4 via CDN for development (instant feedback) and via standalone CLI binary for production (single command, generates a tiny CSS file). GSAP 3.14.2 for scroll-driven animations -- now fully free after Webflow's acquisition of GreenSock. Space Grotesk + Inter from Google Fonts for the bold-yet-readable typography the brand demands. All delivered via CDN, no package management required.

**Core technologies:**
- **Tailwind CSS v4 (CDN + Standalone CLI):** Styling -- utility-first enables the custom bold aesthetic without fighting a framework's design language
- **GSAP 3.14.2 + ScrollTrigger:** Scroll animations -- industry standard, now free, unmatched timeline API for sequenced reveals
- **Space Grotesk (headings) + Inter (body):** Typography -- geometric boldness for heroes, polished neutrality for body, both with full German character support
- **WebP + AVIF images:** Performance -- 30-50% smaller than JPEG, universal browser support in 2026
- **GitHub Pages:** Hosting -- free, HTTPS included, zero server management
- **Inline SVG (Heroicons):** Icons -- no external dependency, no FOUT, matches Tailwind design language

### Expected Features

**Must have (table stakes):**
- Hero section with provocative headline and single CTA above the fold
- Three Themenschwerpunkte blocks (ERP & KI, Orga/Mensch/Fuehrung, Lean)
- Sch(B)rechstunde KI section with time, format, and email CTA
- Mobile-responsive design (68%+ of B2B buyers research on mobile)
- Impressum and Datenschutzerklaerung (legally required in Germany -- Abmahnung risk)
- Contact section with mailto link to f.gloebl@g-und-p.de
- Sticky navigation with anchor links
- Dark, bold visual theme with premium typography
- Personal brand presence (Frank Gloebl photo + positioning)

**Should have (differentiators):**
- Provocative, confrontational copy throughout (not just hero)
- Scroll-driven visual storytelling with GSAP animations
- Results metrics with specific numbers ("30% Produktivitaetssteigerung")
- Bold section transitions (color shifts, typographic statements between sections)
- Single dominant CTA repeated at rhythm points (4 touchpoints)

**Defer (v2+):**
- Video content (separate production effort)
- Calendar integration for Sch(B)rechstunde booking
- Privacy-respecting analytics (Plausible/Matomo)
- Multilingual support

### Architecture Approach

Single HTML file (~400-600 lines) with compiled Tailwind CSS and one vanilla JS file (~100-150 lines). No frameworks, no SPA routing, no bundlers. The page is a linear narrative scroll following the AIDA model: Hero (Attention) to Problem Agitation (Interest) to Three Pillars + Proof (Desire) to Sch(B)rechstunde + Final CTA (Action). All interactivity uses IntersectionObserver for scroll reveals and basic event listeners for nav behavior. Data flow is strictly unidirectional: user action to JS handler to DOM mutation to CSS render. Every `<section>` is self-contained with its own id, background treatment, and padding -- making reordering trivial and responsive behavior predictable.

**Major components:**
1. **Navigation (sticky)** -- Anchor links, transparent-to-solid on scroll, hamburger on mobile
2. **Hero section** -- Full viewport, dramatic headline, single CTA, atmospheric background image
3. **Problem Agitation** -- 2-3 provocative statements about manufacturing performance killers
4. **Three Pillars (Themenschwerpunkte)** -- Three-column grid (desktop), stacked (mobile), distinct visual identity per pillar
5. **Credibility/Social Proof** -- Frank Gloebl bio/photo, results metrics, trust signals
6. **Sch(B)rechstunde KI** -- Specific offer section with time, format, and prominent CTA
7. **Final CTA + Footer** -- Closing conversion push, legal links, external links

### Critical Pitfalls

1. **Generic corporate design** -- The single highest-risk pitfall. Must establish bold visual identity in Phase 1 before any sections are built. Test: "Could this page belong to any other consulting company?" If yes, redesign. Recovery cost is HIGH (full visual redesign).

2. **Tailwind CDN shipped to production** -- Adds 300KB+ JS, causes Flash of Unstyled Content, fails Core Web Vitals. Use the standalone CLI binary instead: single command, produces <10KB CSS file. Decide in Phase 1 before writing any HTML. Recovery cost is LOW.

3. **HEIC photos never properly converted** -- Browser-invisible format, color profile issues (Display P3 to sRGB), bloated file sizes without quality control. Build a conversion script in Phase 1 that produces WebP + JPEG fallbacks, strips EXIF/GPS data, and targets <200KB per hero image. Recovery cost is MEDIUM.

4. **GitHub Pages base path breaks all assets** -- Project sites serve from a subpath. Use relative paths everywhere (`./images/` not `/images/`). Test deployment after first commit, not after the site is "done." Recovery cost is LOW.

5. **German text breaks English-assumption layouts** -- Long compound words overflow containers on mobile. Set `lang="de"`, add `hyphens: auto`, test with actual German copy not lorem ipsum. Must be established in Phase 1 base HTML. Recovery cost is LOW if caught early, HIGH if caught late.

## Implications for Roadmap

Based on research, suggested phase structure:

### Phase 1: Foundation -- Design System, Infrastructure, and Asset Pipeline

**Rationale:** Every research file identifies Phase 1 decisions as foundational. The design system prevents the critical "generic corporate" pitfall. The Tailwind CLI setup prevents the CDN production pitfall. The image pipeline unblocks all visual content. Deploying early to GitHub Pages catches path issues before they compound.

**Delivers:** Deployable page skeleton with hero section, navigation, footer, bold visual identity, and working GitHub Pages deployment. Converted images ready for use.

**Addresses features:** Hero section, sticky navigation, dark/bold visual theme, professional typography, Impressum, Datenschutzerklaerung, responsive foundation

**Avoids pitfalls:** Generic corporate design (by establishing identity first), Tailwind CDN in production (by setting up CLI binary), HEIC conversion failures (by building pipeline early), GitHub Pages path issues (by deploying immediately), German language handling (by setting lang="de" and font verification from day one)

### Phase 2: Content Sections -- Conversion Narrative

**Rationale:** With the foundation solid, build the sections that carry the persuasion arc. These sections are the core product -- they convert visitors into leads. Architecture research shows these sections are self-contained and can be built sequentially, each tested on mobile before moving to the next.

**Delivers:** Complete content narrative from Problem Agitation through Three Pillars through Sch(B)rechstunde -- the full conversion funnel.

**Addresses features:** Three Themenschwerpunkte blocks, Sch(B)rechstunde KI section, problem agitation section, contact section, CTA hierarchy (primary/secondary/tertiary), personal brand presence, repeated CTA pattern

**Avoids pitfalls:** Mobile responsiveness as afterthought (by building each section mobile-first), CTA hierarchy confusion (by enforcing visual hierarchy from design system), wall-of-text syndrome (by using bold headlines + short copy)

### Phase 3: Polish -- Animations, Trust Signals, and Visual Refinement

**Rationale:** Polish comes after content because scroll animations depend on section structure being finalized. Trust signals (metrics, credibility) are high-value but non-blocking -- the page converts without them, they just convert better with them. GSAP integration happens here because the scroll narrative must be stable first.

**Delivers:** Scroll-driven reveal animations, credibility section with metrics, bold section transitions, count-up animations for statistics, sticky nav effects.

**Addresses features:** Scroll-driven animations (GSAP + ScrollTrigger), results metrics/social proof, bold section transitions, visual storytelling

**Avoids pitfalls:** Heavy animation libraries for simple effects (architecture recommends IntersectionObserver for simple reveals, GSAP only for complex timelines)

### Phase 4: Production Hardening -- Performance, SEO, and Launch

**Rationale:** Final phase is optimization, not new features. Lighthouse testing, Open Graph tags for LinkedIn sharing (critical B2B channel), final responsive QA across devices, and the production Tailwind build.

**Delivers:** Production-ready site with Lighthouse mobile score >= 90, correct OG/social meta tags, custom 404 page, final Tailwind CLI build, HTTPS verified.

**Addresses features:** Cookie consent banner (if needed), SEO meta tags, Open Graph image, favicon, print stylesheet considerations, accessibility basics (contrast >= 4.5:1, alt text in German)

**Avoids pitfalls:** "Looks done but isn't" items (missing favicon, lang="en" leftover, no OG tags, missing image alt texts, HTTPS not enforced)

### Phase Ordering Rationale

- **Foundation before content** because the design system, image pipeline, and deployment setup prevent the three highest-cost pitfalls. Getting these wrong poisons everything downstream.
- **Content before polish** because the persuasion narrative must be solid before layering animations on top. Reversing this order causes rework when sections change.
- **Polish before production hardening** because performance optimization (image compression, CSS purging) should happen on the final content, not on work-in-progress sections.
- **Each phase produces something deployable** -- Phase 1 gives a real page (hero + nav + footer), Phase 2 adds the full conversion funnel, Phase 3 adds delight, Phase 4 ships.

### Research Flags

Phases likely needing deeper research during planning:
- **Phase 1:** Image conversion pipeline -- HEIC color profile handling and quality settings need testing with the specific Landshut photos. The sips vs ImageMagick vs cwebp choice depends on what is already installed.
- **Phase 3:** GSAP ScrollTrigger integration -- specific trigger points and animation timelines will need experimentation. The architecture recommends IntersectionObserver for simple reveals and GSAP only for complex sequences, so the boundary needs definition.

Phases with standard patterns (skip research-phase):
- **Phase 2:** Content sections follow well-documented B2B landing page patterns (AIDA model, section-as-component architecture). No novel technical challenges.
- **Phase 4:** GitHub Pages deployment, meta tags, Lighthouse optimization are thoroughly documented. Standard checklist execution.

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | Tailwind v4 CLI, GSAP 3.14.2, Google Fonts all verified via official docs. CDN URLs confirmed on jsdelivr. |
| Features | HIGH | B2B landing page patterns well-researched. German legal requirements (Impressum, DSGVO) verified via authoritative sources. |
| Architecture | HIGH | Single-page static site is the simplest possible architecture. IntersectionObserver, Tailwind utility-first, section-as-component are all battle-tested patterns. |
| Pitfalls | HIGH | All pitfalls sourced from official docs (Tailwind CDN warning), platform docs (GitHub Pages), and established web performance research. German-specific pitfalls verified. |

**Overall confidence:** HIGH

### Gaps to Address

- **Font pairing is subjective:** Space Grotesk + Inter is a well-regarded combination but font choice should be validated visually with the actual German headline copy during Phase 1. If Space Grotesk does not feel bold enough for "Dramatische Leistungssteigerung," consider Clash Display or similar.
- **Specific results metrics unknown:** The features research recommends concrete numbers ("30% Produktivitaetssteigerung") but actual client metrics need to come from Frank Gloebl. Placeholder structure should be built; real numbers inserted when available.
- **GSAP vs IntersectionObserver boundary:** Architecture recommends vanilla IntersectionObserver for simple reveals, GSAP for complex timelines. Stack recommends GSAP for everything. Resolve during Phase 3 planning -- start with IntersectionObserver, add GSAP only where CSS transitions are insufficient.
- **Cookie consent scope:** Whether a minimal notice or full opt-in banner is needed depends on which external resources are loaded. If only Google Fonts + Tailwind CDN (development only), a notice may suffice. If analytics are added later, full consent is required. Defer detailed implementation to Phase 4.

## Sources

### Primary (HIGH confidence)
- [Tailwind CSS v4 CLI docs](https://tailwindcss.com/docs/installation/tailwind-cli) -- standalone binary workflow, production build
- [Tailwind CSS v4 Play CDN docs](https://tailwindcss.com/docs/installation/play-cdn) -- CDN limitations, development-only warning
- [GSAP 3.14.2 on jsdelivr](https://www.jsdelivr.com/package/npm/gsap) -- version verification, CDN URLs
- [GSAP ScrollTrigger docs](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) -- scroll animation API
- [GSAP now free (CSS-Tricks)](https://css-tricks.com/gsap-is-now-completely-free-even-for-commercial-use/) -- license change confirmed
- [GitHub Pages custom domain docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/troubleshooting-custom-domains-and-github-pages) -- deployment configuration

### Secondary (MEDIUM confidence)
- [Instapage: B2B Landing Page Best Practices](https://instapage.com/blog/b2b-landing-page-best-practices) -- section ordering, conversion patterns
- [All About Berlin: Website Compliance Germany](https://allaboutberlin.com/guides/website-compliance-germany) -- German legal requirements
- [Dr. DSGVO: Impressum Requirements](https://dr-dsgvo.de/pflichtangaben-im-impressum-en/) -- specific Impressum fields
- [Space Grotesk + Inter pairing](https://www.etienneaubertbonn.com/inter-font-pairing/) -- typography combination
- [WebP vs AVIF comparison (SpeedVitals)](https://speedvitals.com/blog/webp-vs-avif/) -- image format benchmarks
- [FreeCodeCamp: IntersectionObserver scroll animations](https://www.freecodecamp.org/news/scroll-animations-with-javascript-intersection-observer-api/) -- vanilla JS patterns

### Tertiary (LOW confidence)
- Font pairing choice is ultimately subjective -- validate visually with real German copy
- Performance budget targets (< 500KB total, < 2.5s LCP) are industry best practices, not project-specific measurements

---
*Research completed: 2026-03-28*
*Ready for roadmap: yes*
