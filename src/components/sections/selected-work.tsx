import { ArrowUpRight, ArrowRight } from "lucide-react";
import { projectAssets, projects } from "@/data/portfolio";
import { ProjectArtwork } from "@/components/sections/project-artwork";

export function SelectedWork() {
  return (
    <section className="section work-section" id="work" aria-labelledby="work-title">
      <div className="section-topline"><span>SELECTED WORK</span><span>IDEAS MADE TANGIBLE</span></div>
      <div className="work-layout">
        <div className="work-heading" data-reveal><span className="eyebrow">A SELECTION / 2024 — 2026</span><h2 id="work-title">SELECTED<br /><em>WORK.</em></h2><p>Digital products and platforms shaped around useful technology and considered experience.</p><div className="work-count"><span>04</span> PROJECTS IN FOCUS</div></div>
        <div className="project-list">
          {projects.map((project) => (
            <article className={"project-card" + (project.featured ? " project-featured" : "")} key={project.slug} data-reveal>
              <ProjectArtwork slug={project.slug} name={project.name} asset={projectAssets[project.slug]} featured={project.featured} />
              <div className="project-info">
                <div className="project-number">{project.number} <span>/ PROJECT</span></div>
                <div className="project-description"><span className="eyebrow">{project.category}</span><h3>{project.name}</h3><p>{project.description}</p></div>
                {project.url ? <a className="project-action" href={project.url} target="_blank" rel="noreferrer" data-cursor="link" aria-label={"Visit " + project.name}><span>Visit project</span><ArrowUpRight size={17} /></a> : <span className="project-action is-unavailable" aria-label="Project link not supplied"><span>Project link not supplied</span><ArrowRight size={16} /></span>}
              </div>
            </article>
          ))}
        </div>
      </div>
      <p className="work-footnote">Project screens and live URLs can be added as they become available.</p>
    </section>
  );
}
