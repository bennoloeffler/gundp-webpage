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
