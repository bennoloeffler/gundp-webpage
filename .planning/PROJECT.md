# G&P Landing Page

## What This Is

A bold, high-impact single-page website for G&P (Glöbl & Partner), a consultancy that delivers dramatic performance improvements for manufacturing companies. The page targets Geschäftsführer and Entscheider in produzierenden Unternehmen, driving them to take action — sign up for the "Sch(B)rechstunde KI" or contact G&P directly.

## Core Value

Geschäftsführer produzierende Unternehmen must feel *compelled* to act — either signing up for the Sch(B)rechstunde or reaching out to G&P. The page must radiate competence, provocation, and Höchstleistung.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Hero section with dramatic slogan: "Dramatische Leistungssteigerung für produzierende Unternehmen — kille die Höchstleistungskiller in Deiner Firma"
- [ ] 3 Themenschwerpunkte presented as bold visual blocks: ERP & KI, Orga/Mensch/Führung, Lean
- [ ] Sch(B)rechstunde KI section — Freitags 16:00h, with clear CTA to f.gloebl@g-und-p.de
- [ ] Links to Mutter-Homepage v-und-s.de and neues-management.jimdofree.com
- [ ] Responsive design — works on mobile and desktop
- [ ] "Geiles Design" — bold typography, dramatic visuals, high contrast, premium feel (inspired by g-u-p.de but modernized and bolder)
- [ ] Lead generation CTAs throughout the page
- [ ] Static hosting compatible (GitHub Pages)

### Out of Scope

- Backend/CMS — pure static page, no server logic
- Contact form with backend processing — mailto links suffice for v1
- Multi-page site — single landing page only
- Blog or news section — content lives on v-und-s.de and jimdofree

## Context

- G&P is the consultancy brand of Frank Glöbl, focused on manufacturing performance
- Parent brand: V&S (v-und-s.de) — deeper content, broader consulting portfolio
- Themen-Blog: neues-management.jimdofree.com
- Reference photos available in `bilder-landshut-asis/` (HEIC format, need conversion for web)
- Current website g-u-p.de serves as design inspiration — keep the brand feel but make it bolder and more modern
- All content is German

## Constraints

- **Tech Stack**: Pure HTML + Tailwind CSS (CDN) + vanilla JS — no build tools, no npm, no frameworks
- **Hosting**: GitHub Pages — must be fully static
- **Assets**: HEIC photos need conversion to web formats (JPEG/WebP) before use
- **Language**: All user-facing content in German

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Tailwind via CDN, no build tools | Simplicity, zero setup, easy maintenance | — Pending |
| Inspired by g-u-p.de design | Brand continuity while modernizing | — Pending |
| GitHub Pages hosting | Free, simple, fits static site | — Pending |
| Lead generation focus | Primary goal is driving contact/signups | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd:transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd:complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-03-28 after initialization*
