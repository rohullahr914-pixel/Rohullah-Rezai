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
          const heroTitle = document.querySelector<HTMLElement>("#hero-title");
          const heroLetters = heroTitle?.querySelectorAll<HTMLElement>(".hero-letter");
          const heroPortrait = document.querySelector<HTMLElement>(".hero-portrait-frame");
          const portraitPhoto = heroPortrait?.querySelector<HTMLElement>("img");
          const heroTimeline = gsap.timeline({ delay: 0.12, defaults: { ease: "power4.out" } });

          if (heroLetters?.length) {
            heroTimeline.fromTo(heroLetters, { yPercent: 115, rotateX: -72, z: -45, autoAlpha: 0 }, {
              yPercent: 0,
              rotateX: 0,
              z: 0,
              autoAlpha: 1,
              duration: 1.05,
              stagger: 0.035,
              clearProps: "transform,visibility",
            }, 0);
          }

          if (heroPortrait) {
            heroTimeline.fromTo(heroPortrait, { clipPath: "inset(0 0 100% 0)", rotateY: -7, scale: 1.06 }, {
              clipPath: "inset(0 0 0% 0)",
              rotateY: 0,
              scale: 1,
              duration: 1.2,
              clearProps: "clipPath,transform",
            }, 0.12);
          }

          heroTimeline.fromTo(".hero-eyebrow, .hero-statement, .hero-scroll-link, .hero-footer", {
            y: 22,
            autoAlpha: 0,
            filter: "blur(5px)",
          }, {
            y: 0,
            autoAlpha: 1,
            filter: "blur(0px)",
            duration: 0.82,
            stagger: 0.1,
            clearProps: "transform,filter,visibility",
          }, 0.42);

          gsap.to(".hero-orbit.orbit-one", { rotation: "+=360", duration: 48, repeat: -1, ease: "none", transformOrigin: "50% 50%" });
          gsap.to(".hero-orbit.orbit-two", { rotation: "-=360", duration: 62, repeat: -1, ease: "none", transformOrigin: "50% 50%" });
          gsap.to(".contact-orbit", { rotateY: 18, rotateX: -12, y: -8, duration: 3.8, repeat: -1, yoyo: true, ease: "sine.inOut", transformPerspective: 900 });

          const hero = document.querySelector<HTMLElement>("#home");
          const sceneWrap = hero?.querySelector<HTMLElement>(".hero-scene-wrap");
          const tiltSceneX = sceneWrap && gsap.quickTo(sceneWrap, "rotationX", { duration: 0.9, ease: "power3.out" });
          const tiltSceneY = sceneWrap && gsap.quickTo(sceneWrap, "rotationY", { duration: 0.9, ease: "power3.out" });
          const tiltPortraitX = heroPortrait && gsap.quickTo(heroPortrait, "rotationX", { duration: 0.8, ease: "power3.out" });
          const tiltPortraitY = heroPortrait && gsap.quickTo(heroPortrait, "rotationY", { duration: 0.8, ease: "power3.out" });
          const handleHeroPointer = (event: PointerEvent) => {
            if (event.pointerType !== "mouse" || !hero) return;
            const bounds = hero.getBoundingClientRect();
            const x = (event.clientX - bounds.left) / bounds.width - 0.5;
            const y = (event.clientY - bounds.top) / bounds.height - 0.5;
            tiltSceneX?.(-y * 7);
            tiltSceneY?.(x * 9);
            tiltPortraitX?.(-y * 2.8);
            tiltPortraitY?.(x * 3.2);
          };
          const resetHeroPointer = () => {
            tiltSceneX?.(0);
            tiltSceneY?.(0);
            tiltPortraitX?.(0);
            tiltPortraitY?.(0);
          };
          hero?.addEventListener("pointermove", handleHeroPointer);
          hero?.addEventListener("pointerleave", resetHeroPointer);

          gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
            gsap.fromTo(element, { y: 32, autoAlpha: 0, filter: "blur(7px)" }, {
              y: 0,
              autoAlpha: 1,
              filter: "blur(0px)",
              duration: 1.05,
              ease: "power4.out",
              scrollTrigger: { trigger: element, start: "top 88%", once: true },
            });
          });
          gsap.utils.toArray<HTMLElement>(".project-card").forEach((card, index) => {
            const artwork = card.querySelector<HTMLElement>(".project-art");
            const info = card.querySelectorAll<HTMLElement>(".project-number, .project-description, .project-action");
            if (artwork) gsap.fromTo(artwork, { rotateX: 8, z: -80, scale: 0.96, transformPerspective: 1200 }, {
              rotateX: 0,
              z: 0,
              scale: 1,
              duration: 1.25,
              ease: "power3.out",
              scrollTrigger: { trigger: card, start: "top 84%", once: true },
            });
            if (info.length) gsap.fromTo(info, { y: 16, autoAlpha: 0 }, {
              y: 0,
              autoAlpha: 1,
              duration: 0.68,
              stagger: 0.08,
              ease: "power3.out",
              scrollTrigger: { trigger: card, start: "top 76%", once: true },
              delay: index * 0.025,
            });
          });
          if (hero && portraitPhoto) gsap.to(portraitPhoto, {
            yPercent: 8,
            scale: 1.06,
            ease: "none",
            scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: 0.6 },
          });
          gsap.utils.toArray<HTMLElement>(".hero-coordinate, .hero-signal").forEach((element, index) => {
            gsap.fromTo(element, { autoAlpha: 0, y: index % 2 ? 12 : -12 }, {
              autoAlpha: 1,
              y: 0,
              duration: 0.8,
              delay: 0.72,
              ease: "power3.out",
              clearProps: "transform,visibility",
            });
          });
          return () => {
            hero?.removeEventListener("pointermove", handleHeroPointer);
            hero?.removeEventListener("pointerleave", resetHeroPointer);
          };
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
