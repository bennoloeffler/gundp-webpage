// js/main.js -- G&P Landing Page Interactivity
// Dependencies: GSAP 3.14.2 + ScrollTrigger (loaded via CDN in index.html)

gsap.registerPlugin(ScrollTrigger);

// ========================================
// 1. GSAP SCROLL ANIMATIONS (motion-guarded)
// ========================================
let mm = gsap.matchMedia();

mm.add("(prefers-reduced-motion: no-preference)", () => {

  // --- Hero entrance (plays on load, no scroll trigger) ---
  // Ensure elements are visible before GSAP animates them
  document.querySelectorAll("#hero h1, #hero .subheadline, #hero .cta-btn").forEach(function(el) {
    el.style.opacity = "1";
  });
  const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
  heroTl
    .from("#hero h1", { y: 40, opacity: 0, duration: 0.8 })
    .from("#hero .subheadline", { y: 30, opacity: 0, duration: 0.6 }, "-=0.4")
    .from("#hero .cta-btn", { y: 20, opacity: 0, duration: 0.5 }, "-=0.3");

  // --- Problem section: fade up staggered ---
  gsap.from("#problem .problem-item", {
    scrollTrigger: { trigger: "#problem", start: "top 80%", toggleActions: "play none none none" },
    y: 30, opacity: 0, duration: 0.6, stagger: 0.2, ease: "power2.out"
  });

  // --- Pillars section: fade up staggered left-to-right ---
  document.querySelectorAll(".pillar-card").forEach(el => el.style.opacity = "1");
  gsap.from(".pillar-card", {
    scrollTrigger: { trigger: "#pillars", start: "top bottom", toggleActions: "play none none none" },
    y: 30, opacity: 0, duration: 0.5, stagger: 0.1, ease: "power2.out"
  });

  // --- Manifesto section: lines fade up staggered ---
  gsap.from("#manifesto .manifesto-line", {
    scrollTrigger: { trigger: "#manifesto", start: "top 75%", toggleActions: "play none none none" },
    y: 25, opacity: 0, duration: 0.6, stagger: 0.12, ease: "power2.out"
  });

  // --- Haltung section: text block + team cards ---
  gsap.from("#haltung h2, #haltung .max-w-3xl p", {
    scrollTrigger: { trigger: "#haltung", start: "top 80%", toggleActions: "play none none none" },
    x: -30, opacity: 0, duration: 0.7, stagger: 0.15, ease: "power2.out"
  });
  gsap.from("#haltung .team-card", {
    scrollTrigger: { trigger: "#haltung", start: "top 75%", toggleActions: "play none none none" },
    y: 30, opacity: 0, duration: 0.6, stagger: 0.15, ease: "power3.out"
  });

  // --- Sch(B)rechstunde section: fade up ---
  gsap.from("#scb h2, #scb p, #scb a", {
    scrollTrigger: { trigger: "#scb", start: "top 80%", toggleActions: "play none none none" },
    y: 30, opacity: 0, duration: 0.6, stagger: 0.15, ease: "power2.out"
  });

  // --- Final CTA section: fade up ---
  document.querySelectorAll("#cta h2, #cta p, #cta a").forEach(function(el) { el.style.opacity = "1"; });
  gsap.from("#cta h2, #cta p, #cta a", {
    scrollTrigger: { trigger: "#cta", start: "top 80%", toggleActions: "play none none none" },
    y: 30, opacity: 0, duration: 0.6, stagger: 0.15, ease: "power2.out"
  });

  return () => { /* GSAP auto-cleans up matchMedia contexts */ };
});

// ========================================
// 2. STICKY NAV BACKGROUND TRANSITION
// ========================================
// Always active (not motion-dependent)
const nav = document.querySelector("nav");
if (nav) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 80) {
      nav.classList.add("shadow-md");
    } else {
      nav.classList.remove("shadow-md");
    }
  }, { passive: true });
}

// ========================================
// 3. MOBILE MENU TOGGLE
// ========================================
const menuBtn = document.getElementById("menu-btn");
const menuOverlay = document.getElementById("menu-overlay");
const menuClose = document.getElementById("menu-close");

function openMenu() {
  if (!menuOverlay) return;
  menuOverlay.classList.remove("hidden");
  menuOverlay.setAttribute("aria-hidden", "false");
  menuBtn?.setAttribute("aria-expanded", "true");
  document.body.style.overflow = "hidden";
}

function closeMenu() {
  if (!menuOverlay) return;
  menuOverlay.classList.add("hidden");
  menuOverlay.setAttribute("aria-hidden", "true");
  menuBtn?.setAttribute("aria-expanded", "false");
  document.body.style.overflow = "";
}

menuBtn?.addEventListener("click", openMenu);
menuClose?.addEventListener("click", closeMenu);

// Close menu when clicking a nav link (smooth scroll to section)
menuOverlay?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

// ========================================
// 4. SMOOTH SCROLL FOR ANCHOR LINKS
// ========================================
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    const href = link.getAttribute("href");
    if (!href || href === "#") return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      // Close mobile menu if it was open
      closeMenu();
    }
  });
});

// ========================================
// 5. COOKIE BANNER (DSGVO)
// ========================================
const cookieBanner = document.getElementById("cookie-banner");
const cookieDismiss = document.getElementById("cookie-dismiss");

if (cookieBanner && !localStorage.getItem("gp-cookie-notice-dismissed")) {
  cookieBanner.classList.remove("hidden");
}

cookieDismiss?.addEventListener("click", () => {
  localStorage.setItem("gp-cookie-notice-dismissed", "true");
  cookieBanner?.classList.add("hidden");
});
