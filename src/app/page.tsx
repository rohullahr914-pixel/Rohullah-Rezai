import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Experience } from "@/components/sections/experience";
import { Education } from "@/components/sections/education";
import { SelectedWork } from "@/components/sections/selected-work";
import { AiLab } from "@/components/sections/ai-lab";
import { Technology } from "@/components/sections/technology";
import { Languages } from "@/components/sections/languages";
import { Github } from "@/components/sections/github";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";
import { profile } from "@/data/portfolio";

const person = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: ["AI Engineer", "Full-Stack Developer", "Founder"],
  address: { "@type": "PostalAddress", addressCountry: "Afghanistan" },
  sameAs: [profile.github],
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }} />
      <main id="main">
        <Hero />
        <About />
        <Experience />
        <Education />
        <SelectedWork />
        <AiLab />
        <Technology />
        <Languages />
        <Github />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
