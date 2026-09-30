"use client";

import Image from "next/image";
import { ArrowUpRight, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { experience } from "@/data/portfolio";

export function Experience() {
  const [certificateOpen, setCertificateOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (certificateOpen && !dialog.open) dialog.showModal();
    if (!certificateOpen && dialog.open) dialog.close();
  }, [certificateOpen]);

  return (
    <section className="section experience-section" id="experience" aria-labelledby="experience-title">
      <div className="section-topline"><span>02 / EXPERIENCE</span><span>GROWTH THROUGH MAKING</span></div>
      <div className="section-heading-row" data-reveal>
        <h2 className="section-title" id="experience-title">BUILT BY<br /><em>DOING.</em></h2>
        <p className="section-intro">A focused path through web development, technology and the craft of turning ideas into working systems.</p>
      </div>
      <div className="timeline">
        {experience.map((item) => (
          <article className="timeline-item" key={item.number} data-reveal>
            <div className="timeline-number"><span>{item.number}</span><i /></div>
            <div className="timeline-main">
              <div className="timeline-meta"><span>{item.role}</span><span>{item.duration}</span></div>
              <h3>{item.company}</h3>
              <p>{item.description}</p>
              {item.certificate && <button className="text-link certificate-link" type="button" onClick={() => setCertificateOpen(true)} data-cursor="link">View certificate <ArrowUpRight size={15} /></button>}
            </div>
            {item.certificate && <button className="certificate-thumb" type="button" aria-label="Open NeuroFive internship certificate" onClick={() => setCertificateOpen(true)} data-cursor="link"><Image src="/images/neurofive-certificate.jpg" alt="NeuroFive Solutions certificate of internship in Full Stack Web Development" fill sizes="(max-width: 760px) 80vw, 300px" /><span>VIEW DOCUMENT <ArrowUpRight size={12} /></span></button>}
          </article>
        ))}
      </div>
      <dialog className="certificate-dialog" ref={dialogRef} aria-label="NeuroFive Solutions certificate" onClose={() => setCertificateOpen(false)} onClick={(event) => { if (event.target === dialogRef.current) setCertificateOpen(false); }}>
        <div className="dialog-toolbar"><span>NEUROFIVE SOLUTIONS / CERTIFICATE</span><button type="button" onClick={() => setCertificateOpen(false)} aria-label="Close certificate"><X size={19} /></button></div>
        <div className="certificate-full"><Image src="/images/neurofive-certificate.jpg" alt="Original certificate of internship for Rohullah Rezai in Full Stack Web Development at NeuroFive Solutions" fill sizes="95vw" /></div>
      </dialog>
    </section>
  );
}
