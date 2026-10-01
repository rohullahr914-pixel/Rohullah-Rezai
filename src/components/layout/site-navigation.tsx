"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BrandLogo } from "@/components/layout/brand-logo";
import { ThemePicker } from "@/components/layout/theme-picker";
import { navigation, profile } from "@/data/portfolio";

export function SiteNavigation() {
  const pathname = usePathname();
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const reduceMotion = useReducedMotion();

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
  const sectionHref = (href: string) => pathname === "/" ? href : "/" + href;

  return (
    <header className={"site-header" + (scrolled ? " is-scrolled" : "")}>
      <motion.a className="brand-mark brand-mark-image" href={sectionHref("#home")} aria-label="Rohullah Rezai, home" data-cursor="link" onClick={closeMenu} whileHover={reduceMotion ? undefined : { scale: 1.06, rotate: -3 }} whileTap={reduceMotion ? undefined : { scale: 0.94 }} transition={{ type: "spring", stiffness: 360, damping: 22 }}>
        <BrandLogo className="brand-logo-image" priority sizes="48px" />
      </motion.a>
      <nav className="desktop-nav" aria-label="Main navigation">
        {navigation.map((item) => {
          const section = item.href.slice(1);
          return <a key={item.href} className={pathname === "/" && active === section ? "active" : ""} href={sectionHref(item.href)} data-cursor="link">{item.label}</a>;
        })}
      </nav>
      <div className="header-actions">
        <ThemePicker />
        <a className="talk-link" href={sectionHref("#contact")} data-cursor="link">Let’s talk <ArrowUpRight size={14} strokeWidth={1.7} /></a>
      </div>
      <button className="menu-toggle" type="button" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} aria-controls="mobile-navigation">
        {menuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>
      <AnimatePresence>
        {menuOpen && (
          <motion.nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation" initial={{ opacity: 0, y: reduceMotion ? 0 : -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: reduceMotion ? 0 : -8 }} transition={{ duration: reduceMotion ? 0 : 0.22 }}>
            {navigation.map((item, index) => (
              <a key={item.href} href={sectionHref(item.href)} className={pathname === "/" && active === item.href.slice(1) ? "active" : ""} onClick={closeMenu}>
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
