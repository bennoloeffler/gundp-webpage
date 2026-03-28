// js/main.js -- G&P Landing Page Interactivity
// Dependencies: GSAP 3.14.2 + ScrollTrigger (loaded via CDN in index.html)

gsap.registerPlugin(ScrollTrigger);

// ========================================
// 1. GSAP SCROLL ANIMATIONS (motion-guarded)
// ========================================
let mm = gsap.matchMedia();

mm.add("(prefers-reduced-motion: no-preference)", () => {

  // --- Hero entrance (plays on load, no scroll trigger) ---
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
  gsap.from(".pillar-card", {
    scrollTrigger: { trigger: "#pillars", start: "top 75%", toggleActions: "play none none none" },
    y: 40, opacity: 0, duration: 0.7, stagger: 0.15, ease: "power3.out"
  });

  // --- Credibility section: typographic accent fade in + scale ---
  gsap.from("#proof .font-heading", {
    scrollTrigger: { trigger: "#proof", start: "top 80%", toggleActions: "play none none none" },
    opacity: 0, scale: 0.95, duration: 0.8, ease: "power2.out"
  });

  // --- Credibility metrics: count-up animation ---
  document.querySelectorAll(".metric-number").forEach((el) => {
    const target = parseInt(el.getAttribute("data-target"), 10);
    if (isNaN(target)) return;
    const counter = { val: 0 };
    gsap.to(counter, {
      val: target,
      duration: 1.5,
      ease: "power1.inOut",
      scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" },
      onUpdate: () => { el.textContent = Math.round(counter.val); }
    });
  });

  // --- Sch(B)rechstunde section: fade up ---
  gsap.from("#scb h2, #scb p, #scb a", {
    scrollTrigger: { trigger: "#scb", start: "top 80%", toggleActions: "play none none none" },
    y: 30, opacity: 0, duration: 0.6, stagger: 0.15, ease: "power2.out"
  });

  // --- Final CTA section: fade up ---
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
      nav.classList.add("bg-gp-dark/95", "backdrop-blur-sm");
    } else {
      nav.classList.remove("bg-gp-dark/95", "backdrop-blur-sm");
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
