import { ArrowUpRight, Send } from "lucide-react";
import { bots } from "@/data/portfolio";

export function AiLab() {
  return (
    <section className="section lab-section" id="experiments" aria-labelledby="lab-title">
      <div className="section-topline"><span>AI LAB</span><span>EXPERIMENTS & BOTS</span></div>
      <div className="lab-heading" data-reveal><span className="eyebrow">SMALL IDEAS, IN MOTION</span><h2 id="lab-title">CURIOSITY,<br /><em>IN PRACTICE.</em></h2><p>A collection of experimental AI products exploring personas, prompts and learning.</p></div>
      <div className="bot-list">
        {bots.map((bot, index) => (
          <article className="bot-card" key={bot.name} data-reveal>
            <div className="bot-icon"><Send size={17} strokeWidth={1.4} /></div>
            <span className="bot-index">0{index + 1}</span>
            <div className="bot-copy"><h3>{bot.name}</h3><p>{bot.description}</p></div>
            {bot.url ? <a className="text-link" href={bot.url} target="_blank" rel="noreferrer" data-cursor="link">Open bot <ArrowUpRight size={15} /></a> : <span className="bot-unavailable">TELEGRAM LINK NOT PROVIDED</span>}
          </article>
        ))}
      </div>
    </section>
  );
}
