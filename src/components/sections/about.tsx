import { ArrowDownRight } from "lucide-react";
import { experience, education } from "@/data/portfolio";

const keywords = ["AI ENGINEERING", "FULL-STACK", "AUTOMATION", "PRODUCT DEVELOPMENT", "THREE.JS"];

export function About() {
  return (
    <section className="section about-section" id="about" aria-labelledby="about-title">
      <div className="section-topline"><span>01 / ABOUT</span><span>THE PERSON BEHIND THE SYSTEMS</span></div>
      <div className="about-layout">
        <div className="about-heading" data-reveal>
          <h2 id="about-title">I DON’T JUST BUILD<br />WEBSITES.<br /><em>I BUILD DIGITAL<br />SYSTEMS.</em></h2>
          <span className="heading-arrow"><ArrowDownRight size={23} strokeWidth={1.2} /></span>
        </div>
        <div className="about-copy" data-reveal>
          <span className="eyebrow">A PRACTICE IN PROGRESS</span>
          <p className="about-lede">Rohullah Rezai is an AI Engineer and Full-Stack Developer focused on building modern web applications, intelligent systems, AI-powered products, automation solutions and scalable digital experiences.</p>
          <p className="about-body">He works across frontend, backend, databases, cloud deployment, AI APIs and modern product development, bringing each layer together to make useful technology feel clear and considered.</p>
          <div className="keyword-track" aria-label="Areas of focus">{keywords.map((keyword) => <span key={keyword}>{keyword}</span>)}</div>
        </div>
      </div>
      <div className="about-facts" data-reveal>
        <div className="fact-label"><span>THE PATH SO FAR</span><span>03 FACTS</span></div>
        <div className="fact-card"><strong>{experience[0].duration}</strong><span>NeuroFive Solutions</span><small>Full-Stack Web Development</small></div>
        <div className="fact-card"><strong>{experience[1].duration}</strong><span>NexByte</span><small>Technology Development</small></div>
        <div className="fact-card"><strong>{education.year}</strong><span>High school graduation</span><small>Abdul Rahim Shaheed High School</small></div>
      </div>
    </section>
  );
}
