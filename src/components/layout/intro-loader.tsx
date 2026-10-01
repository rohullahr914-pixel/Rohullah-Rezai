"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { BrandLogo } from "@/components/layout/brand-logo";

export function IntroLoader() {
  const [ready, setReady] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const timer = window.setTimeout(() => setReady(true), reduceMotion ? 100 : 650);
    return () => window.clearTimeout(timer);
  }, [reduceMotion]);

  return (
    <AnimatePresence>
      {!ready && (
        <motion.div className="intro-loader" initial={{ opacity: 1 }} exit={reduceMotion ? { opacity: 0 } : { opacity: 0, filter: "blur(8px)", scale: 1.02 }} transition={{ duration: reduceMotion ? 0.16 : 0.42, ease: "easeOut" }} aria-hidden="true">
          <motion.div className="loader-logo-frame" initial={reduceMotion ? false : { opacity: 0, y: 18, scale: 0.9, filter: "blur(12px)" }} animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }} transition={{ duration: reduceMotion ? 0 : 0.72, ease: [0.16, 1, 0.3, 1] }}>
            <BrandLogo className="loader-logo" priority sizes="(max-width: 600px) 68vw, 300px" />
          </motion.div>
          <div className="loader-caption">An independent practice in web and AI</div>
          <div className="loader-track"><motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: reduceMotion ? 0 : 0.72, ease: "easeInOut", delay: 0.08 }} /></div>
          <span className="loader-number">ROHULLAH REZAI <i /> 2026</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
