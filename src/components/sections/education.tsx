import { ArrowUpRight } from "lucide-react";
import { education } from "@/data/portfolio";

export function Education() {
  return (
    <section className="section education-section" id="education" aria-labelledby="education-title">
      <div className="section-topline"><span>03 / EDUCATION</span><span>FOUNDATIONS</span></div>
      <div className="education-card" data-reveal>
        <div className="education-mark" aria-hidden="true">AR<span>.</span></div>
        <div className="education-detail"><span className="eyebrow">{education.qualification} · {education.year}</span><h2 id="education-title">{education.school}</h2></div>
        <ArrowUpRight className="education-arrow" size={22} strokeWidth={1.2} aria-hidden="true" />
      </div>
    </section>
  );
}
