# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Landing page for **G&P Management Consultants UG** (Glöbl & Partner) — a consultancy helping manufacturing companies achieve dramatic performance improvements. Single-page site with sub-pages for each topic.

**Company:** G&P Management Consultants UG, Birkenweg 6, 84082 Laberweinting
**Geschäftsführer:** Florian Glöbl
**Parent brand:** V&S (Vollmer & Scheffczyk GmbH, v-und-s.de)
**Themen-Blog:** neues-management.jimdofree.com

## Tech Stack

Pure HTML + Tailwind CSS v3 CDN + vanilla JS. No build tools, no npm, no frameworks.

```bash
# Dev server
python3 -m http.server 8080

# Production CSS build (optional, for GitHub Pages without CDN)
./build.sh
```

**Tailwind Config:** Defined inline in each HTML file via `tailwind.config = { ... }` in a `<script>` tag. Custom colors: `gp-red` (#c41e3a), `gp-red-hover` (#d6263f), `gp-gold` (#c5a55a). Fonts: Space Grotesk (heading), Inter (body).

**Dark/Light Mode:** Uses `darkMode: 'media'` (follows system preference). Every element needs both light and dark classes (e.g., `text-gray-900 dark:text-white`).

**3-Column Layout:** Uses custom CSS class `.flex-trio` defined in `<style>` tag of index.html. Do NOT use Tailwind grid classes — they don't work reliably with the CDN. The `.flex-trio` class uses `flex: 1 1 0%; min-width: 0; overflow: hidden` on children.

**4-Column Layout (Team):** Uses `.flex-quad` class — 2x2 grid with `flex-wrap: wrap` and `width: calc(50% - 0.75rem)` per item.

## Site Structure

```
index.html                          # Main landing page
organisation-fuehrung-mensch.html   # Sub-page: Organisation, Führung & Mensch
lean.html                           # Sub-page: Lean
erp-ki.html                         # Sub-page: ERP & KI
leistung-am-limit.html              # Sub-page: Leistung am Limit event
systemgestalter.html                # Sub-page: SystemGestalter Ausbildung
```

## Content & People

### Team (shown on main page)
1. **Florian Glöbl** — Geschäftsführer, Berater & Vernetzer. Photo: `assets/images/team/florian-cropped.jpg`
2. **Benno Löffler** — Gesellschafter & Systempraktiker. Author of "Saugute Zusammenarbeit". Photo: `assets/images/team/benno-cropped.jpg`
3. **Simone Heigl** — Trainerin, Beraterin & Coach (simoneheigl.com). Photo: `assets/images/heigl/img-00.jpg`
4. **David Weber** — Lean-Berater & Wertschöpfungsexperte (weundd.de). Photo: `assets/images/weundd/img-05.jpg`

### Three Pillars (in this order!)
1. **Organisation, Führung & Mensch** — Strukturen statt Verhalten. Inspiriert von Metaplan, Hephaistos/Eidenschink, Simone Heigl.
2. **Lean** — Saugute Wertschöpfung. ReaLean, Shopfloor Management, CCPM. Content von neues-management.jimdofree.com und David Weber.
3. **ERP & KI** — Höchstleistungs-Killer vermeiden. Wertschöpfungsnahe Erprobung statt sauteure Konzepte.

### Events (3 cards on main page)
1. **Sch(B)rechstunde** — Freitags 16:00–17:00, offener Austausch zu ERP, KI, Höchstleistungskillern. Anmeldung via mailto.
2. **Leistung am Limit** — 3-Tages-Event in den Bergen. Official site: leistung-am-limit.de
3. **SystemGestalter** — Ausbildung in 3 Blöcken. Von V&S. Termine Sept/Okt 2026.

### Core Principles (from g-u-p.de)
- **Kernwerte:** Ehrlich. Direkt. Wirksam.
- **Haltung:** "Organisationen erzeugen Verhalten — nicht umgekehrt."
- **Wertversprechen:** "Primat der Wertschöpfung" — wir arbeiten am System, nicht am Individuum
- **Manifesto:** "Schnelle Erprobung statt sauteure Konzepte / Echte Probleme lösen statt Methodik bis der Arzt kommt / Mehr Wirkung statt mehr Manntage"
- **Contact:** f.gloebl@g-und-p.de, info@g-u-p.de, +49 (0) 172 / 1718875

## Content Sources (for future research)

When updating content, scrape these sites with Playwright (Cloudflare blocks curl/WebFetch):

```python
# Pattern that works:
from playwright.sync_api import sync_playwright
browser = p.chromium.launch(headless=False, args=['--disable-blink-features=AutomationControlled'])
context = browser.new_context(user_agent='Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) ...')
```

| Source | URL | What to get |
|--------|-----|-------------|
| G&P Homepage | g-u-p.de | Services, principles, team bios, images |
| G&P Leistung am Limit | g-u-p.de/leistung-am-limit/ | Event details, PDFs |
| V&S | v-und-s.de | Lean/Agile/TOC principles, team, testimonials |
| V&S SystemGestalter | v-und-s.de/events-media/ausbildung-systemgestalter/ | Ausbildung details, prices |
| Neues Management | neues-management.jimdofree.com | Provocative lean texts, Beratungsansatz |
| Simone Heigl | simoneheigl.com | Training topics, bio |
| David Weber | weundd.de | Lean expertise, portrait |
| Hephaistos | hephaistos.org | Metatheorie der Veränderung |
| Metaplan | metaplan.com/de/ | Organization theory principles |
| Klaus Eidenschink | eidenschink.de | Systemische Beratung |
| Leistung am Limit | leistung-am-limit.de | Official event site, booking |

## Assets

```
assets/images/gup/          # Scraped from g-u-p.de (service icons, team, action photos)
assets/images/icons/         # Transparent versions of g-u-p.de pictograms (red on transparent)
assets/images/team/          # Cropped team portraits (use these, not gup/ originals)
assets/images/heigl/         # Simone Heigl photos from simoneheigl.com
assets/images/weundd/        # David Weber photos from weundd.de
assets/images/gup-logo-transparent.png  # G&P logo (transparent bg, works on light+dark)
assets/pdf/                  # Event flyers and programs
```

**Image handling:** The g-u-p.de team photos (image-20/21/22.png) have a decorative red frame baked in. Use the cropped versions in `team/` instead. For new people photos, always crop to face with `object-cover rounded-full`.

**bilder-landshut-asis/** contains handwritten concept sketches — NOT photos for the website.

## Language

All user-facing content in **German** with proper umlauts (ü, ö, ä, ß). Never use ae/oe/ue substitutes. Use `&shy;` for soft hyphens in long compound words, `&nbsp;–` for dashes.

## Deployment

Hosted on GitHub Pages: https://bennoloeffler.github.io/gundp-webpage/

```bash
# Commit locally (default during development)
git add -A && git commit -m "description"

# Deploy only when user says "deploy"
git push origin master
```

GitHub Pages is configured to serve from `master` branch root (`/`).

## Key Lessons Learned

- **Tailwind CDN vs grid:** Tailwind CSS v3 CDN (`cdn.tailwindcss.com`) does NOT reliably generate grid utility classes. Use custom CSS classes (`.flex-trio`, `.flex-quad`) with plain flexbox instead.
- **GSAP `gsap.from()` hides elements:** `gsap.from(".class", { opacity: 0 })` immediately sets elements invisible. Set `opacity: 1` explicitly before GSAP runs, and use `start: "top bottom"` to trigger as soon as section enters viewport.
- **g-u-p.de blocks scraping:** Cloudflare protected. Must use Playwright with `headless=False` and `--disable-blink-features=AutomationControlled`. LinkedIn also blocks — cannot scrape profiles.
- **Portrait photos from g-u-p.de:** Original PNGs have red border frames. Always crop with ImageMagick: `magick input.png -gravity center -crop 55%x65%+0+0 +repage output.jpg`
- **Live Server caching:** VS Code Live Server aggressively caches. Use `python3 -m http.server 8080` for reliable dev serving.
- **Florian Glöbl is NOT Frank.** The email prefix `f.gloebl` stands for Florian, not Frank.
