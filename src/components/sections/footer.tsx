import { ArrowUpRight } from "lucide-react";
import { BrandLogo } from "@/components/layout/brand-logo";
import { profile } from "@/data/portfolio";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-brand"><a className="brand-mark brand-mark-image footer-logo-link" href="#home" aria-label="Back to top" data-cursor="link"><BrandLogo className="brand-logo-image" sizes="60px" /></a><div><strong>{profile.name}</strong><span>AI Engineer · Full-Stack Developer</span></div></div>
      <span className="footer-copy">© {new Date().getFullYear()} {profile.name}</span>
      <span className="footer-built">Built with Next.js + Three.js</span>
      <a className="back-to-top" href="#home" data-cursor="link">Back to top <ArrowUpRight size={14} /></a>
    </footer>
  );
}
