"use client";

import { useEffect, useRef } from "react";

export function ScrollProgress() {
  const fillRef = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const update = () => {
      const range = document.documentElement.scrollHeight - window.innerHeight;
      const amount = range > 0 ? window.scrollY / range : 0;
      if (fillRef.current) fillRef.current.style.transform = "scaleY(" + Math.max(0, Math.min(1, amount)) + ")";
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);
  return <div className="scroll-progress" aria-hidden="true"><span ref={fillRef} /></div>;
}
