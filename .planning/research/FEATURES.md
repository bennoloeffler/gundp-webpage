# Feature Research

**Domain:** B2B consulting landing page (manufacturing performance consultancy, German market)
**Researched:** 2026-03-28
**Confidence:** HIGH

## Feature Landscape

### Table Stakes (Visitors Expect These)

Missing any of these means Geschaeftsfuehrer bounce within seconds. These are non-negotiable for a credible consulting presence.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| **Hero section with clear value proposition** | Visitors decide in 3-5 seconds whether to stay. H1 under 8 words, subheadline providing context, single primary CTA visible above the fold. | LOW | "Dramatische Leistungssteigerung fuer produzierende Unternehmen" is strong but needs pairing with a visible CTA and supporting subline. |
| **Mobile-responsive design** | 68%+ of B2B buyers research on mobile. Non-responsive = immediate bounce. | MEDIUM | Tailwind handles this well. Vertical stack on mobile: headline, subline, CTA, visual. Min 18-20px body text, tap-friendly buttons. |
| **Fast load time (under 3 seconds)** | Slow pages kill conversions. Static site on GitHub Pages should achieve this easily if images are optimized. | LOW | WebP images, lazy loading for below-fold content, Tailwind CDN is lightweight. |
| **Impressum page/section** | Legally required in Germany. Missing = Abmahnung risk (formal warning letters with fees of 150-500+ EUR). Must be reachable in 2 clicks max from any point. | LOW | Footer link. Must include: full company name with legal form, address, email, responsible person for editorial content. |
| **Datenschutzerklaerung (Privacy Policy)** | Legally required under DSGVO/GDPR, separate from Impressum. Required even for static sites if any tracking or external resources are loaded (Tailwind CDN counts). | LOW | Footer link, separate section or page. Must describe what data is collected, why, and how. Even loading external CDNs triggers this requirement. |
| **Clear contact path** | Visitors who want to engage must find contact info instantly. A consulting page without obvious contact = dead end. | LOW | mailto: link to f.gloebl@g-und-p.de. Phone number if available. Repeated at multiple scroll points. |
| **Navigation/section anchors** | Single-page sites need a way to jump between sections. Without it, long pages feel like a wall of text. | LOW | Sticky header with anchor links. Smooth scroll behavior. |
| **Professional typography and spacing** | German manufacturing executives expect Qualitaet. Amateurish typography destroys credibility instantly in this market. | MEDIUM | Bold, high-contrast type. Large headlines. Generous whitespace. Premium fonts (system fonts or well-chosen Google Fonts). |
| **Three Themenschwerpunkte sections** | Core offering must be immediately scannable. ERP & KI, Orga/Mensch/Fuehrung, Lean are the pillars. | MEDIUM | Bold visual blocks with distinct identity per theme. Each with brief description and clear link to value. |
| **Cookie consent banner** | DSGVO requirement if loading any external resources (Tailwind CDN, Google Fonts, etc.). Fines are real. | LOW | Simple banner. If no tracking/analytics, can be minimal. If using only essential external resources, a notice may suffice without opt-in. |

### Differentiators (Competitive Advantage for Bold/Provocative Brand)

These are what make G&P's page stand out from the sea of forgettable corporate consulting websites.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| **Provocative, confrontational headline copy** | "Kille die Hoechstleistungskiller" is not typical corporate speak. This pattern of bold, challenger statements forces engagement -- visitors either resonate or leave, both of which are good outcomes (qualifies leads). | LOW | Copy is the highest-leverage differentiator. Challenge assumptions. Use direct "Du" address. No corporate hedging. |
| **Dramatic visual design (dark theme, high contrast)** | Most manufacturing consulting sites are bland corporate blue-grey. A dark, high-contrast design with bold typography signals: "We are not like the others." Hajster and similar bold industrial sites prove this works. | MEDIUM | Dark backgrounds, bright accent colors, oversized typography. Think editorial magazine meets industrial design. Inspired by g-u-p.de but pushed further. |
| **Results metrics / social proof with numbers** | "30% Produktivitaetssteigerung" hits harder than "Wir verbessern Ihre Prozesse." Specific numbers create credibility and urgency. Numbers bring scale and trust. | LOW | Position key metrics prominently -- can be near hero or in dedicated results section. Real numbers from past engagements. |
| **Sch(B)rechstunde KI as a low-barrier entry offer** | Most consulting CTAs are "Kontaktieren Sie uns" (high commitment). A free Friday 16:00 session is a brilliant low-friction entry point. This is a lead gen differentiator. | MEDIUM | Dedicated section with clear time/format, what to expect, and simple email CTA. Make the wordplay (Sprech/Brechstunde) visually playful. |
| **Scroll-driven visual storytelling** | Instead of static content blocks, sections that build narrative momentum as the user scrolls. Each section escalates the argument for why the visitor needs G&P. | MEDIUM | CSS animations on scroll (IntersectionObserver + CSS transitions). Not gratuitous -- purposeful reveals that support the argument structure. Vanilla JS, no libraries needed. |
| **Single dominant CTA repeated at rhythm points** | Rather than multiple competing CTAs, one primary action (Sch(B)rechstunde signup or direct contact) repeated at 3-4 natural scroll pause points. Eliminates decision paralysis. | LOW | Same CTA, same styling, placed after hero, after Themenschwerpunkte, after social proof, and in footer. |
| **Bold section transitions / visual breaks** | Full-bleed images, color shifts, or typographic statements between content sections. Prevents "wall of content" fatigue on single-page sites. | MEDIUM | Alternating dark/light sections, dramatic full-width dividers, or provocative pull quotes between sections. |
| **Personal brand presence (Frank Gloebl)** | Consulting is trust-based. A face and story behind the brand converts better than faceless corporate identity. Real face + real story is the strongest trust signal. | LOW | Photo, brief bio/credentials, possibly a short statement. Not a full biography -- just enough to establish credibility and human connection. |

### Anti-Features (Deliberately NOT Building)

| Feature | Why Requested | Why Problematic | Alternative |
|---------|---------------|-----------------|-------------|
| **Generic stock photography** | "We need images for every section" | Stock photos of handshakes and smiling business people scream inauthenticity. Manufacturing executives see through this instantly. Destroys the bold brand promise. | Use real photos from bilder-landshut-asis/, abstract/geometric visuals, bold typography as visual element, or carefully chosen industrial imagery. |
| **Contact form with multiple fields** | "We need to capture leads properly" | Forms with 5+ fields kill conversion (120% better conversion with fewer fields). Also requires backend processing, which is out of scope for static hosting. | Simple mailto: link or single-field email CTA. Progressive disclosure -- get them to email first, qualify later. |
| **Chatbot / live chat widget** | "Modern websites have chat" | Adds complexity, requires maintenance/response commitment, external dependency. A one-person consultancy cannot staff live chat. Feels corporate, not bold. | Clear, prominent email/phone contact. The Sch(B)rechstunde IS the conversation entry point. |
| **Carousel / image slider in hero** | "Show multiple messages" | Carousels have abysmal engagement (less than 1% click past first slide). They dilute the message and slow page load. One message, stated boldly, converts better. | Single powerful hero statement. If multiple themes need exposure, use scroll sections, not a slider. |
| **Blog / news section on the landing page** | "Show thought leadership" | Adds maintenance burden, content goes stale, splits focus from conversion. Blog content already lives on neues-management.jimdofree.com. | Link to external blog. Keep the landing page focused on one job: convert visitors to leads. |
| **Animated loading screen / splash page** | "Wow factor on entry" | Adds friction before value. Every millisecond before the hero is visible is a potential bounce. Bold design should be immediate, not gated. | Make the hero section itself the wow moment. Instant impact. |
| **Corporate jargon and hedging language** | "Sound professional" | "Ganzheitliche Loesungsansaetze fuer nachhaltige Wertschoepfungsoptimierung" is exactly how every other consulting site sounds. It says nothing and repels. Contradicts the provocative brand. | Direct, punchy German. Short sentences. Concrete claims. "Du" not "Sie" (per brand voice). Challenge the reader. |
| **Multi-page navigation structure** | "Separate pages for each topic" | Splits the persuasion narrative. A single-page site controls the scroll journey and keeps the argument building. Multi-page = more chances to lose the visitor. | Single page with anchor navigation. Sequential storytelling structure. |
| **Analytics/tracking without consent** | "We need to know our visitors" | DSGVO violation risk. German authorities actively enforce. Abmahnung culture means competitors can report you. | If analytics needed later, use privacy-respecting options (Plausible, self-hosted Matomo) with proper consent. For v1, skip entirely. |

## Feature Dependencies

```
[Impressum] ──required-by──> [Go Live]
[Datenschutzerklaerung] ──required-by──> [Go Live]
[Cookie Consent] ──required-by──> [External CDN Usage (Tailwind, Fonts)]

[Hero Section]
    └──enhances──> [Primary CTA]
                       └──repeated-in──> [Themenschwerpunkte]
                                              └──leads-to──> [Sch(B)rechstunde Section]
                                                                  └──converts-via──> [Contact CTA]

[Mobile Responsive] ──required-by──> [All Visual Features]

[Professional Typography] ──foundation-for──> [Dramatic Visual Design]
                                                   └──enables──> [Bold Section Transitions]
                                                   └──enables──> [Scroll-Driven Storytelling]

[Real Photos (converted from HEIC)] ──required-before──> [Personal Brand Presence]
[Real Photos (converted from HEIC)] ──required-before──> [Visual Content Sections]

[Results Metrics] ──enhances──> [Themenschwerpunkte]
[Personal Brand Presence] ──enhances──> [Trust / Social Proof]
```

### Dependency Notes

- **Legal pages (Impressum, Datenschutz) required before go-live:** These are non-negotiable for any German website. Build them early, not as an afterthought.
- **Hero Section drives all downstream engagement:** If the hero fails, nothing else matters. Invest most design energy here.
- **HEIC photo conversion is a prerequisite:** The real photos in bilder-landshut-asis/ need conversion to WebP/JPEG before any visual content can be finalized.
- **Typography foundation enables visual design:** Get the type system right first (scale, weights, spacing), then layer dramatic design on top. Reversing this order causes rework.
- **Scroll storytelling depends on section structure:** The narrative arc (problem, credibility, solution, proof, CTA) must be solid before adding scroll animations.

## MVP Definition

### Launch With (v1)

The minimum to validate that the page drives leads:

- [ ] **Hero section** -- Dramatic headline, subline, primary CTA above the fold
- [ ] **Three Themenschwerpunkte blocks** -- ERP & KI, Orga/Mensch/Fuehrung, Lean as bold visual sections
- [ ] **Sch(B)rechstunde KI section** -- Time, format, email CTA, clear value proposition
- [ ] **Contact section** -- Email, links to v-und-s.de and neues-management blog
- [ ] **Personal brand element** -- Photo + brief positioning of Frank Gloebl
- [ ] **Impressum** -- Legal compliance (footer-linked section or separate page)
- [ ] **Datenschutzerklaerung** -- DSGVO compliance
- [ ] **Responsive design** -- Mobile-first, tested on real devices
- [ ] **Sticky navigation** -- Anchor links to key sections
- [ ] **Dark/bold visual theme** -- High contrast, premium typography, dramatic feel

### Add After Validation (v1.x)

Features to add once the page is live and generating initial leads:

- [ ] **Scroll-driven animations** -- Trigger when lead flow confirms visitors are scrolling deep
- [ ] **Results metrics section** -- Add when specific client metrics are available/approved for publication
- [ ] **Testimonial quotes** -- Add when client permission is secured
- [ ] **Cookie consent banner** -- Add when/if analytics or additional external services are integrated
- [ ] **Privacy-respecting analytics** -- Plausible or similar, to understand what sections get engagement

### Future Consideration (v2+)

- [ ] **Video content** -- Short (under 2 min) video of Frank explaining the approach. Defer because video production is a separate effort.
- [ ] **Case study deep-links** -- Detailed success stories, possibly on v-und-s.de with links from landing page.
- [ ] **Calendar integration for Sch(B)rechstunde** -- Direct booking instead of email. Defer because it adds external dependency.
- [ ] **Multilingual support (English)** -- Only if international clients become a goal. Currently all-German is correct.

## Feature Prioritization Matrix

| Feature | User Value | Implementation Cost | Priority |
|---------|------------|---------------------|----------|
| Hero section with provocative copy | HIGH | LOW | P1 |
| Three Themenschwerpunkte | HIGH | MEDIUM | P1 |
| Sch(B)rechstunde section + CTA | HIGH | LOW | P1 |
| Mobile responsive design | HIGH | MEDIUM | P1 |
| Dark/bold visual theme | HIGH | MEDIUM | P1 |
| Professional typography system | HIGH | LOW | P1 |
| Impressum | HIGH (legal) | LOW | P1 |
| Datenschutzerklaerung | HIGH (legal) | LOW | P1 |
| Contact section | HIGH | LOW | P1 |
| Sticky navigation with anchors | MEDIUM | LOW | P1 |
| Personal brand presence | HIGH | LOW | P1 |
| Repeated CTA pattern | HIGH | LOW | P1 |
| Bold section transitions | MEDIUM | MEDIUM | P2 |
| Results metrics / numbers | HIGH | LOW | P2 |
| Scroll-driven animations | MEDIUM | MEDIUM | P2 |
| Cookie consent banner | MEDIUM (legal) | LOW | P2 |
| Privacy analytics | LOW | LOW | P3 |
| Video content | MEDIUM | HIGH | P3 |
| Calendar booking | MEDIUM | MEDIUM | P3 |

**Priority key:**
- P1: Must have for launch -- the page does not work without these
- P2: Should have, add once v1 is live and validated
- P3: Nice to have, future consideration

## Competitor/Reference Feature Analysis

| Feature | Typical Manufacturing Consulting Sites | Bold/Premium Sites (Hajster, Path Robotics) | G&P Approach |
|---------|---------------------------------------|---------------------------------------------|-------------|
| Visual tone | Corporate blue, safe, stock photos | Dark, dramatic, oversized type, real imagery | Dark/bold, real photos, provocative typography |
| Headline style | Generic ("Ihr Partner fuer...") | Specific outcome claims, challenger positioning | Direct provocation ("Kille die Hoechstleistungskiller") |
| CTA style | "Kontaktieren Sie uns" (vague, high-commitment) | Specific low-commitment offers | Sch(B)rechstunde as low-barrier entry + direct email |
| Social proof | Logo walls, generic testimonials | Specific metrics, named case studies | Results numbers + personal brand credibility |
| Content structure | Multi-page, nested navigation | Single-page narrative scroll | Single-page sequential argument |
| Mobile experience | Often broken or desktop-only | Fully responsive, mobile-first | Mobile-first responsive |
| Legal compliance | Usually present but hidden | Varies | Prominent, compliant, no risk |
| Language tone | Formal "Sie", corporate German | Varies by market | Informal "Du", direct, punchy |

## Content Section Order (Recommended Scroll Sequence)

The page should follow a persuasion arc, not just list information:

1. **Hero** -- Bold claim + primary CTA (above fold)
2. **Problem agitation** -- Why most manufacturing companies underperform (short, punchy)
3. **Themenschwerpunkte** -- Three pillars showing the path to Hoechstleistung
4. **Results / Social proof** -- Numbers, metrics, credibility signals
5. **Personal brand** -- Frank Gloebl, credentials, trust
6. **Sch(B)rechstunde KI** -- Low-barrier entry offer with clear CTA
7. **Contact / Links** -- Email, links to parent sites
8. **Footer** -- Impressum link, Datenschutz link, copyright

This sequence mirrors the classic consulting sales conversation: challenge, educate, prove, offer.

## Sources

- [Instapage: 9 B2B Landing Page Lessons 2025-2026](https://instapage.com/blog/b2b-landing-page-best-practices) -- Hero section, CTA patterns, form optimization
- [Unbounce: Best B2B Landing Page Examples](https://unbounce.com/landing-page-examples/best-b2b-landing-page-examples/) -- Conversion patterns
- [Windmill Strategy: Best Manufacturing Websites](https://www.windmillstrategy.com/best-manufacturing-websites-examples/) -- Industrial design patterns
- [Knapsack Creative: Social Proof on Consulting Websites](https://knapsackcreative.com/blog-industry/consulting-website-social-proof) -- Trust signal placement
- [All About Berlin: Website Compliance Germany](https://allaboutberlin.com/guides/website-compliance-germany) -- German legal requirements
- [Dr. DSGVO: Impressum Requirements](https://dr-dsgvo.de/pflichtangaben-im-impressum-en/) -- Specific Impressum fields
- [Prismic: Hero Section Best Practices](https://prismic.io/blog/website-hero-section) -- Above-fold design patterns
- [Heyflow: B2B Landing Page Best Practices](https://heyflow.com/blog/b2b-landing-page-best-practices/) -- Trust signals near CTAs

---
*Feature research for: G&P Manufacturing Consultancy Landing Page*
*Researched: 2026-03-28*
