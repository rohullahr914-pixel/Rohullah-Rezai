"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, Check, Copy, Mail, Send } from "lucide-react";
import { useState } from "react";
import { GithubMark, LinkedInMark } from "@/components/icons/social-icons";
import { profile, socialLinks } from "@/data/portfolio";

const icons = { GitHub: GithubMark, LinkedIn: LinkedInMark, X: ArrowUpRight, WhatsApp: Send };

export function Contact() {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(profile.email);
      } else {
        const field = document.createElement("textarea");
        field.value = profile.email;
        field.setAttribute("readonly", "");
        field.style.position = "fixed";
        field.style.opacity = "0";
        document.body.appendChild(field);
        field.select();
        document.execCommand("copy");
        field.remove();
      }
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <section className="section contact-section" id="contact" aria-labelledby="contact-title">
      <div className="section-topline"><span>LET’S MAKE SOMETHING MATTER</span><span>05 / CONTACT</span></div>
      <div className="contact-grid">
        <div className="contact-copy" data-reveal>
          <span className="eyebrow"><i /> OPEN TO GOOD IDEAS</span>
          <h2 id="contact-title">LET’S BUILD<br /><em>SOMETHING</em><br />EXTRAORDINARY<span className="title-period">.</span></h2>
          <p>Have a project, collaboration or ambitious idea? Let’s talk.</p>
          <a className="contact-email" href={"mailto:" + profile.email} data-cursor="link"><span>{profile.email}</span><ArrowUpRight size={18} /></a>
          <button className="copy-email" type="button" onClick={copyEmail} data-cursor="link" aria-live="polite">
            <AnimatePresence mode="wait" initial={false}>{copied ? <motion.span key="copied" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}><Check size={14} /> COPIED ✓</motion.span> : <motion.span key="copy" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}><Copy size={13} /> COPY EMAIL</motion.span>}</AnimatePresence>
          </button>
        </div>
        <div className="contact-aside" data-reveal>
          <div className="contact-orbit" aria-hidden="true"><span>RR</span><i /><i /><i /></div>
          <div className="contact-aside-rule" />
          <div className="contact-details">
            <span className="eyebrow">FIND ME ELSEWHERE</span>
            {socialLinks.map((link) => {
              const Icon = icons[link.label as keyof typeof icons];
              return link.url ? <a key={link.label} href={link.url} target="_blank" rel="noreferrer" data-cursor="link"><Icon size={16} />{link.label}<ArrowUpRight size={13} /></a> : <div className="contact-unavailable" key={link.label}><Icon size={16} /><span>{link.label}</span><small>PROFILE LINK NEEDED</small></div>;
            })}
            <a href="#experiments" data-cursor="link"><Send size={16} />Telegram bots<ArrowDownRight size={14} /></a>
          </div>
          <a className="contact-location" href={"mailto:" + profile.email} data-cursor="link"><Mail size={14} /><span>{profile.location}</span><span>AVAILABLE WORLDWIDE</span></a>
        </div>
      </div>
    </section>
  );
}
