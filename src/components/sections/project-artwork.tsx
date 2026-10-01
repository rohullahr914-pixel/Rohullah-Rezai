"use client";

import Image from "next/image";
import type { PointerEvent as ReactPointerEvent } from "react";
import { useRef } from "react";
import { projects } from "@/data/portfolio";

export function ProjectArtwork({ slug, name, asset, featured }: { slug: string; name: string; asset?: string; featured: boolean }) {
  const artRef = useRef<HTMLDivElement>(null);
  const index = projects.findIndex((project) => project.slug === slug) + 1;

  function tilt(event: ReactPointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches || !artRef.current) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;
    const tiltX = (0.5 - y) * 7;
    const tiltY = (x - 0.5) * 8;
    artRef.current.style.setProperty("--pointer-x", (x * 100).toFixed(1) + "%");
    artRef.current.style.setProperty("--pointer-y", (y * 100).toFixed(1) + "%");
    artRef.current.style.transform = "perspective(1400px) rotateX(" + tiltX.toFixed(2) + "deg) rotateY(" + tiltY.toFixed(2) + "deg) translateY(-5px) scale3d(1.012, 1.012, 1.012)";
  }

  function resetTilt() {
    if (artRef.current) {
      artRef.current.style.transform = "";
      artRef.current.style.removeProperty("--pointer-x");
      artRef.current.style.removeProperty("--pointer-y");
    }
  }

  return (
    <div ref={artRef} className={"project-art art-" + slug + (featured ? " is-featured" : "")} role="img" aria-label={asset ? name + " project preview" : name + " abstract visual placeholder; project screenshot not supplied"} data-cursor="project" onPointerMove={tilt} onPointerLeave={resetTilt}>
      {asset ? <Image src={asset} alt={name + " project screenshot"} fill sizes="(max-width: 760px) 100vw, 60vw" /> : (
        <>
          <div className="art-coordinate">VISUAL STUDY <span>0{index} / 04</span></div>
          {slug === "soulx" ? (
            <div className="soulx-composition" aria-hidden="true">
              <div className="soulx-ring ring-a" /><div className="soulx-ring ring-b" />
              <span className="soulx-orb orb-a" /><span className="soulx-orb orb-b" /><span className="soulx-orb orb-c" />
              <span className="soulx-sig">SX</span>
              <div className="soulx-wordmark">SOUL<span>X</span><small>AI PERSONAS / CONVERSATIONS / COMMUNITY</small></div>
            </div>
          ) : (
            <div className={"project-glyph glyph-" + slug} aria-hidden="true"><span>{name.split(" ").map((part) => part[0]).join("").slice(0, 3)}</span><i /><i /><i /></div>
          )}
          <div className="art-placeholder-note">PROJECT IMAGE NOT SUPPLIED</div>
          <div className="art-bottomline"><span>{name.toUpperCase()}</span><span>VISUAL PLACEHOLDER</span></div>
        </>
      )}
    </div>
  );
}
