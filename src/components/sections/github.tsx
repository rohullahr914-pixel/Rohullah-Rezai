import { ArrowUpRight, Github as GithubIcon } from "lucide-react";
import { profile } from "@/data/portfolio";

export function Github() {
  return (
    <section className="section github-section" id="github" aria-labelledby="github-title">
      <div className="section-topline"><span>CODE / OPEN SOURCE</span><span>PUBLIC WORKSPACE</span></div>
      <div className="github-layout" data-reveal>
        <div className="github-heading"><span className="eyebrow">A LOOK UNDER THE HOOD</span><h2 id="github-title">BUILT IN<br /><em>PUBLIC.</em></h2><p>Code, experiments and the work behind the work.</p><a className="outline-link" href={profile.github} target="_blank" rel="noreferrer" data-cursor="link"><GithubIcon size={16} /> View GitHub <ArrowUpRight size={15} /></a></div>
        <div className="terminal-window" aria-label="Terminal introducing Rohullah Rezai">
          <div className="terminal-top"><div className="terminal-dots"><i /><i /><i /></div><span>ROHULLAH@PORTFOLIO:~</span><span>SESSION 01</span></div>
          <div className="terminal-content">
            <div className="terminal-line"><span className="terminal-prompt">rohullah@portfolio:~$</span><span>whoami</span></div>
            <div className="terminal-output"><span>AI Engineer</span><span>Full-Stack Developer</span><span>Builder</span></div>
            <div className="terminal-line terminal-command"><span className="terminal-prompt">rohullah@portfolio:~$</span><span>github --open {profile.githubHandle}</span></div>
            <a className="terminal-cta" href={profile.github} target="_blank" rel="noreferrer" data-cursor="link">OPEN GITHUB PROFILE <ArrowUpRight size={14} /></a>
            <div className="terminal-cursor" aria-hidden="true" />
          </div>
          <div className="terminal-status"><span><i /> CONNECTION READY</span><span>GITHUB / {profile.githubHandle.toUpperCase()}</span></div>
        </div>
      </div>
    </section>
  );
}
