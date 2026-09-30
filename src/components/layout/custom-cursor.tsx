"use client";

import { useEffect, useRef } from "react";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const media = window.matchMedia("(pointer: fine) and (min-width: 900px) and (prefers-reduced-motion: no-preference)");
    if (!media.matches) return;
    const cursor = cursorRef.current;
    if (!cursor) return;
    document.documentElement.classList.add("has-custom-cursor");
    let frame = 0;
    let x = -100;
    let y = -100;
    const move = (event: PointerEvent) => {
      x = event.clientX;
      y = event.clientY;
      if (!frame) frame = window.requestAnimationFrame(() => {
        cursor.style.transform = "translate3d(" + x + "px," + y + "px,0)";
        frame = 0;
      });
    };
    const onOver = (event: PointerEvent) => {
      const target = event.target instanceof Element ? event.target.closest<HTMLElement>("[data-cursor]") : null;
      cursor.classList.toggle("is-active", Boolean(target));
      const label = target?.dataset.cursor === "project" ? "Explore" : target?.dataset.cursor === "link" ? "Open" : "";
      if (labelRef.current) labelRef.current.textContent = label;
    };
    const onLeave = (event: PointerEvent) => {
      const source = event.target instanceof Element ? event.target.closest("[data-cursor]") : null;
      const destination = event.relatedTarget instanceof Element ? event.relatedTarget.closest("[data-cursor]") : null;
      if (source !== destination) cursor.classList.remove("is-active");
    };
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerover", onOver);
    document.addEventListener("pointerout", onLeave);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerout", onLeave);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  return <div className="custom-cursor" ref={cursorRef} aria-hidden="true"><span ref={labelRef} /></div>;
}
