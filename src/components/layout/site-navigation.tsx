"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { navigation, profile } from "@/data/portfolio";

export function SiteNavigation() {
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActive(visible.target.id);
    }, { rootMargin: "-38% 0px -52% 0px", threshold: [0, 0.2, 0.5, 0.8] });
    navigation.forEach((item) => {
      const element = document.querySelector(item.href);
      if (element) observer.observe(element);
    });
    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={"site-header" + (scrolled ? " is-scrolled" : "")}>
      <a className="brand-mark" href="#home" aria-label="Rohullah Rezai, home" data-cursor="link" onClick={closeMenu}>RR<span>.</span></a>
      <nav className="desktop-nav" aria-label="Main navigation">
        {navigation.map((item) => {
          const section = item.href.slice(1);
          return <a key={item.href} className={active === section ? "active" : ""} href={item.href} data-cursor="link">{item.label}</a>;
        })}
      </nav>
      <a className="talk-link" href="#contact" data-cursor="link">Let’s talk <ArrowUpRight size={14} strokeWidth={1.7} /></a>
      <button className="menu-toggle" type="button" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} aria-controls="mobile-navigation">
        {menuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>
      <AnimatePresence>
        {menuOpen && (
          <motion.nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.22 }}>
            {navigation.map((item, index) => (
              <a key={item.href} href={item.href} className={active === item.href.slice(1) ? "active" : ""} onClick={closeMenu}>
                <span>0{index + 1}</span>{item.label}<ArrowUpRight size={15} />
              </a>
            ))}
            <div className="mobile-nav-foot"><span>{profile.location}</span><span>Available worldwide</span></div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
