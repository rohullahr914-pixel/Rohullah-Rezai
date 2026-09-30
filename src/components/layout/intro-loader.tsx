"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export function IntroLoader() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let secondFrame = 0;
    const firstFrame = window.requestAnimationFrame(() => {
      secondFrame = window.requestAnimationFrame(() => setReady(true));
    });
    return () => {
      window.cancelAnimationFrame(firstFrame);
      window.cancelAnimationFrame(secondFrame);
    };
  }, []);

  return (
    <AnimatePresence>
      {!ready && (
        <motion.div className="intro-loader" initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35, ease: "easeOut" }} aria-hidden="true">
          <div className="loader-mark">RR<span>.</span></div>
          <div className="loader-caption">Building a little space for ideas</div>
          <div className="loader-track"><motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.42, ease: "easeInOut" }} /></div>
          <span className="loader-number">00 — 100</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
