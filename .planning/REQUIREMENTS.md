# Requirements: G&P Landing Page

**Defined:** 2026-03-28
**Core Value:** Geschäftsführer produzierende Unternehmen must feel compelled to act — sign up for Sch(B)rechstunde or contact G&P.

## v1 Requirements

Requirements for initial release. Each maps to roadmap phases.

### Visual Design

- [ ] **DESIGN-01**: Page uses bold typography system — Space Grotesk (headings) + Inter (body) with oversized display sizes
- [ ] **DESIGN-02**: Page uses dark, high-contrast color scheme that feels premium and anti-corporate
- [ ] **DESIGN-03**: Sections reveal with scroll-triggered GSAP animations
- [ ] **DESIGN-04**: Real photos from bilder-landshut-asis integrated as WebP/AVIF with JPEG fallback
- [ ] **DESIGN-05**: Page is fully responsive mobile-first — works on phones, tablets, desktop
- [ ] **DESIGN-06**: German compound words render correctly with proper hyphenation (`hyphens: auto`, `lang="de"`)

### Content Sections

- [ ] **CONTENT-01**: Hero section with dramatic slogan "Dramatische Leistungssteigerung für produzierende Unternehmen" and primary CTA
- [ ] **CONTENT-02**: Problem agitation section — "Höchstleistungskiller" framing, why manufacturing companies need G&P
- [ ] **CONTENT-03**: Three Themenschwerpunkte presented as bold visual blocks: ERP & KI, Orga/Mensch/Führung, Lean
- [ ] **CONTENT-04**: Sch(B)rechstunde KI section — Freitags 16:00h, clear CTA to f.gloebl@g-und-p.de
- [ ] **CONTENT-05**: Footer with links to v-und-s.de and neues-management.jimdofree.com
- [ ] **CONTENT-06**: Navigation that works on mobile (hamburger) and desktop (sticky/fixed)

### Lead Generation

- [ ] **LEAD-01**: Primary CTA button in hero leading to contact/email
- [ ] **LEAD-02**: Sch(B)rechstunde signup CTA with mailto:f.gloebl@g-und-p.de
- [ ] **LEAD-03**: Multiple CTA touchpoints distributed throughout the page (not just hero)

### Legal & Compliance

- [ ] **LEGAL-01**: Impressum accessible via link to v-und-s.de Impressum page
- [ ] **LEGAL-02**: Datenschutzerklärung accessible via link to v-und-s.de Datenschutz page
- [ ] **LEGAL-03**: Cookie/CDN disclosure banner (DSGVO-compliant, covers Google Fonts + Tailwind CDN)

### Technical

- [ ] **TECH-01**: Page deploys correctly on GitHub Pages (relative paths, no broken assets)
- [ ] **TECH-02**: OG meta tags for rich previews when shared on LinkedIn/social media
- [ ] **TECH-03**: Lighthouse performance score ≥ 90 on mobile
- [ ] **TECH-04**: Page loads in under 3 seconds on 3G connection
- [ ] **TECH-05**: HEIC photos converted to WebP + JPEG fallback with EXIF/GPS data stripped

## v2 Requirements

Deferred to future release. Tracked but not in current roadmap.

### Content

- **CONTENT-V2-01**: Frank Glöbl personal brand section (face behind the consultancy)
- **CONTENT-V2-02**: Client testimonials / social proof section
- **CONTENT-V2-03**: Results metrics / KPI showcase section

### Technical

- **TECH-V2-01**: Custom domain setup with CNAME
- **TECH-V2-02**: Analytics integration (privacy-friendly, e.g., Plausible)
- **TECH-V2-03**: Print stylesheet for page sections

## Out of Scope

| Feature | Reason |
|---------|--------|
| Backend / CMS | Pure static page, no server logic needed |
| Contact form with backend | mailto links sufficient for v1 |
| Multi-page site | Single landing page only |
| Blog / news section | Content lives on v-und-s.de and jimdofree |
| Image carousel / slider | Anti-feature: kills engagement, feels generic |
| Chatbot | Anti-feature: corporate bloat for a consultancy page |
| Stock photos | Anti-feature: destroys authenticity, real photos only |
| OAuth / user accounts | No user system needed |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| (populated by roadmapper) | | |

**Coverage:**
- v1 requirements: 20 total
- Mapped to phases: 0
- Unmapped: 20 ⚠️

---
*Requirements defined: 2026-03-28*
*Last updated: 2026-03-28 after initial definition*
