import { languages } from "@/data/portfolio";

export function Languages() {
  return (
    <section className="section languages-section" id="languages" aria-labelledby="languages-title">
      <div className="section-topline"><span>LANGUAGES</span><span>HUMAN, SPOKEN</span></div>
      <div className="language-list" data-reveal>
        <h2 id="languages-title">WORDS THAT<br /><em>CONNECT.</em></h2>
        {languages.map((language, index) => <div className="language-row" key={language.name}><span>0{index + 1}</span><strong>{language.name}</strong><span>{language.level}</span></div>)}
      </div>
    </section>
  );
}
