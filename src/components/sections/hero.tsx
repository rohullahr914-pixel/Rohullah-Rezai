"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { ArrowDown, ArrowUpRight, Mail } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { GithubMark, LinkedInMark } from "@/components/icons/social-icons";
import { profile } from "@/data/portfolio";
import { useSupportsDesktopWebGL } from "@/lib/capabilities";

const HeroScene = dynamic(() => import("@/components/three/hero-scene"), {
  ssr: false,
  loading: () => <div className="hero-scene-placeholder" aria-hidden="true" />,
});

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const sceneReady = useSupportsDesktopWebGL(768);
  const [sceneActive, setSceneActive] = useState(true);

  useEffect(() => {
    if (!sceneReady || !sectionRef.current) return;
    const observer = new IntersectionObserver(([entry]) => setSceneActive(entry.isIntersecting), { threshold: 0.01 });
    observer.observe(sectionRef.current);
    const onVisibility = () => {
      const bounds = sectionRef.current?.getBoundingClientRect();
      setSceneActive(!document.hidden && Boolean(bounds && bounds.bottom > 0 && bounds.top < window.innerHeight));
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [sceneReady]);

  return (
    <section className="hero-section" id="home" ref={sectionRef} aria-labelledby="hero-title">
      <div className="hero-scene-wrap" aria-hidden="true">{sceneReady && <HeroScene active={sceneActive} />}</div>
      <div className="hero-grid-lines" aria-hidden="true" />
      <div className="hero-main">
        <div className="hero-copy">
          <p className="eyebrow hero-eyebrow"><span className="status-dot" />AI engineer&nbsp; / &nbsp;Full-stack developer&nbsp; / &nbsp;Founder</p>
          <h1 id="hero-title" aria-label="Rohullah Rezai"><span className="hero-word" aria-hidden="true">{"ROHULLAH".split("").map((letter, index) => <span className="hero-letter" key={letter + index}>{letter}</span>)}</span><span className="hero-word hero-word-offset" aria-hidden="true">{"REZAI".split("").map((letter, index) => <span className="hero-letter" key={letter + index}>{letter}</span>)}<span className="title-period hero-letter">.</span></span></h1>
          <p className="hero-statement">I build intelligent systems and digital products where AI, engineering and human experience meet.</p>
          <a className="round-link hero-scroll-link" href="#about" data-cursor="link"><span>Scroll to explore</span><ArrowDown size={15} /></a>
        </div>
        <div className="hero-visual" aria-label="Portrait of Rohullah Rezai">
          <div className="hero-coordinate hero-coordinate-top">34°31&apos; N&nbsp; 69°11&apos; E <span>01 — 04</span></div>
          <div className="hero-portrait-frame">
            <Image src="/images/rohullah-portrait.webp" alt="Rohullah Rezai standing outside a modern building" fill priority sizes="(max-width: 767px) 74vw, (max-width: 1200px) 48vw, 550px" quality={88} />
            <div className="portrait-vignette" />
            <div className="portrait-caption"><span>ROHULLAH REZAI</span><span>AI · ENGINEERING · PRODUCT</span></div>
          </div>
          <div className="hero-coordinate hero-coordinate-bottom"><span>INDEPENDENT BY DESIGN</span><span>BASED IN AFGHANISTAN</span></div>
          <div className="hero-orbit orbit-one" aria-hidden="true"><i /></div>
          <div className="hero-orbit orbit-two" aria-hidden="true"><i /></div>
          <span className="hero-signal" aria-hidden="true">RR <span>— 2026</span></span>
        </div>
      </div>
      <div className="hero-footer">
        <div className="hero-location"><span>Based in {profile.location}</span><span>Available worldwide</span></div>
        <div className="hero-socials" aria-label="Social links">
          <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub profile" data-cursor="link"><GithubMark size={16} /><span>GitHub</span><ArrowUpRight size={12} /></a>
          {profile.linkedin && <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn profile" data-cursor="link"><LinkedInMark size={16} /><span>LinkedIn</span><ArrowUpRight size={12} /></a>}
          <a href={"mailto:" + profile.email} aria-label="Email Rohullah Rezai" data-cursor="link"><Mail size={15} /><span>Email</span><ArrowUpRight size={12} /></a>
        </div>
        <span className="hero-index">01 / 10</span>
      </div>
      <div className="hero-side-note" aria-hidden="true">A PERSONAL PRACTICE IN BUILDING WHAT’S NEXT</div>
    </section>
  );
}
