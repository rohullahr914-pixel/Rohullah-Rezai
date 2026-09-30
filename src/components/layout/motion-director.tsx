"use client";

import { useEffect } from "react";
export function MotionDirector() {
  useEffect(() => {
    let cancelled = false;
    let cleanup: (() => void) | undefined;
    void Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([gsapModule, triggerModule]) => {
      if (cancelled) return;
      const gsap = gsapModule.gsap;
      gsap.registerPlugin(triggerModule.ScrollTrigger);
      const media = gsap.matchMedia();
      const context = gsap.context(() => {
        media.add("(prefers-reduced-motion: no-preference)", () => {
          gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
            gsap.fromTo(element, { y: 28, autoAlpha: 0 }, {
              y: 0,
              autoAlpha: 1,
              duration: 0.85,
              ease: "power3.out",
              scrollTrigger: { trigger: element, start: "top 88%", once: true },
            });
          });
          const hero = document.querySelector("#home");
          const portrait = document.querySelector(".hero-portrait-frame");
          if (hero && portrait) gsap.to(portrait, {
            yPercent: 8,
            scale: 0.97,
            ease: "none",
            scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: 0.6 },
          });
        });
      });
      cleanup = () => {
        media.revert();
        context.revert();
      };
    }).catch((error: unknown) => {
      console.error("Scroll animation setup failed", error);
    });
    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  return null;
}
