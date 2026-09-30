"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useRef, useState } from "react";
import { skills } from "@/data/portfolio";
import { supportsDesktopWebGL } from "@/lib/capabilities";

const TechnologyScene = dynamic(() => import("@/components/three/technology-scene"), {
  ssr: false,
  loading: () => <div className="tech-scene-placeholder" aria-hidden="true" />,
});

export function Technology() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeSkill, setActiveSkill] = useState("React.js");
  const [sceneReady, setSceneReady] = useState(false);
  const [sceneActive, setSceneActive] = useState(false);
  const activeCategory = useMemo(() => skills.find((group) => group.items.includes(activeSkill))?.category ?? "Technology", [activeSkill]);

  useEffect(() => {
    const capable = supportsDesktopWebGL(900);
    setSceneReady(capable);
    if (!capable || !sectionRef.current) return;
    const observer = new IntersectionObserver(([entry]) => setSceneActive(entry.isIntersecting && !document.hidden), { threshold: 0.05 });
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
  }, []);

  return (
    <section className="section technology-section" id="technology" ref={sectionRef} aria-labelledby="technology-title">
      <div className="section-topline"><span>04 / TECHNOLOGY</span><span>TOOLS ARE MATERIAL</span></div>
      <div className="tech-heading" data-reveal><span className="eyebrow">THE STACK BEHIND THE WORK.</span><h2 id="technology-title">A TOOL FOR<br /><em>EVERY LAYER.</em></h2></div>
      <div className="tech-layout">
        <div className="tech-categories">
          {skills.map((group) => (
            <div className="tech-category" key={group.category} data-reveal>
              <h3>{group.category}</h3>
              <div className="tech-node-cloud" role="group" aria-label={group.category + " technologies"}>
                {group.items.map((item, index) => <button key={item} type="button" className={activeSkill === item ? "tech-node is-selected" : "tech-node"} onMouseEnter={() => setActiveSkill(item)} onFocus={() => setActiveSkill(item)} onClick={() => setActiveSkill(item)} aria-pressed={activeSkill === item}><span>{String(index + 1).padStart(2, "0")}</span>{item}</button>)}
              </div>
            </div>
          ))}
        </div>
        <div className="tech-visual" aria-label="Interactive map of the technology stack">
          <div className="tech-scene-wrap" aria-hidden="true">{sceneReady && <TechnologyScene active={sceneActive} />}</div>
          <div className="tech-visual-overlay"><span className="tech-ring ring-outer" /><span className="tech-ring ring-inner" /><span className="tech-core" /><span className="tech-connection connection-a" /><span className="tech-connection connection-b" /></div>
          <div className="tech-active-label" aria-live="polite"><span>SELECTED NODE / {activeCategory.toUpperCase()}</span><strong>{activeSkill}</strong></div>
          <span className="tech-visual-caption">SYSTEMS THINK IN CONNECTIONS</span>
        </div>
      </div>
    </section>
  );
}
