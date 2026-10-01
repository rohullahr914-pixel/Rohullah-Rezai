import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { notFound } from "next/navigation";
import { ProjectArtwork } from "@/components/sections/project-artwork";
import { projectAssets, projects } from "@/data/portfolio";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) return {};

  return {
    title: project.name + " | Rohullah Rezai",
    description: project.description,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const projectIndex = projects.findIndex((item) => item.slug === slug);
  const project = projects[projectIndex];

  if (!project) notFound();

  const nextProject = projects[(projectIndex + 1) % projects.length];

  return (
    <main className="project-page" id="main">
      <section className="project-case section" aria-labelledby="project-title">
        <div className="case-topline">
          <Link href="/#work" className="case-back" data-cursor="link"><ArrowLeft size={14} /> All projects</Link>
          <span>{project.number} / 0{projects.length}</span>
        </div>
        <div className="case-hero">
          <div className="case-copy" data-reveal>
            <span className="eyebrow">{project.category}</span>
            <h1 id="project-title">{project.name}</h1>
            <p>{project.description}</p>
            <div className="case-actions">
              {project.url ? <a className="case-live-link" href={project.url} target="_blank" rel="noreferrer" data-cursor="link">Open live project <ArrowUpRight size={15} /></a> : <span className="case-live-status">Live project link not provided</span>}
              <Link href="/#contact" className="case-contact-link" data-cursor="link">Discuss a project <ArrowRight size={15} /></Link>
            </div>
          </div>
          <div className="case-art-stage" data-reveal>
            <span className="case-art-orbit case-art-orbit-a" aria-hidden="true" />
            <span className="case-art-orbit case-art-orbit-b" aria-hidden="true" />
            <ProjectArtwork slug={project.slug} name={project.name} asset={projectAssets[project.slug]} featured />
          </div>
        </div>
        <div className="case-meta-grid" data-reveal>
          <div><span>PROJECT</span><strong>{project.number} / 0{projects.length}</strong></div>
          <div><span>TYPE</span><strong>{project.category}</strong></div>
          <div><span>OVERVIEW</span><strong>{project.description}</strong></div>
        </div>
        <div className="case-next-row">
          <span>Continue exploring</span>
          <Link href={"/projects/" + nextProject.slug} data-cursor="link">Next project: {nextProject.name}<ArrowRight size={15} /></Link>
        </div>
      </section>
    </main>
  );
}
