export type LinkValue = string | null;

export const profile = {
  name: "Rohullah Rezai",
  firstName: "Rohullah",
  lastName: "Rezai",
  title: "AI Engineer · Full-Stack Developer · Founder",
  email: "rohullarr914@gmail.com",
  location: "Afghanistan",
  availability: "Available worldwide",
  github: "https://github.com/rohullahr914-pixel",
  githubHandle: "@rohullahr914-pixel",
  linkedin: null as LinkValue,
  x: null as LinkValue,
  whatsapp: null as LinkValue,
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? null,
};

export const navigation = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Work", href: "#work" },
  { label: "Skills", href: "#technology" },
  { label: "Contact", href: "#contact" },
];

export const experience = [
  {
    number: "01",
    company: "NeuroFive Solutions",
    role: "Full-Stack Web Developer",
    duration: "2 Years",
    description: "Full-stack web development experience, with a certificate of internship in Full Stack Web Development.",
    certificate: true,
  },
  {
    number: "02",
    company: "NexByte",
    role: "Full-Stack / Technology Development",
    duration: "1 Year",
    description: "A one-year role focused on full-stack and technology development.",
    certificate: false,
  },
];

export const education = {
  school: "Abdul Rahim Shaheed High School",
  qualification: "High School Graduation",
  year: "2025",
};

export const projects = [
  {
    number: "01",
    name: "SOULX AI",
    slug: "soulx",
    category: "AI Platform / AI Personas / Social AI",
    description: "An AI persona platform designed around interactive AI identities, conversations and community experiences.",
    url: null as LinkValue,
    featured: true,
  },
  {
    number: "02",
    name: "Bamboo Cleaning",
    slug: "bamboo",
    category: "Business Website",
    description: "A business website for Bamboo Cleaning.",
    url: null as LinkValue,
    featured: false,
  },
  {
    number: "03",
    name: "CCACSC",
    slug: "ccacsc",
    category: "Web Platform",
    description: "A web platform for CCACSC.",
    url: null as LinkValue,
    featured: false,
  },
  {
    number: "04",
    name: "Kaaj Dental Clinic",
    slug: "kaaj",
    category: "Healthcare / Dental Website",
    description: "A website for Kaaj Dental Clinic.",
    url: null as LinkValue,
    featured: false,
  },
];

export const bots = [
  {
    name: "YouAI Persona Bot",
    description: "An experimental Telegram bot centered on AI personas.",
    url: null as LinkValue,
  },
  {
    name: "PromptPilot AI Bot",
    description: "An experimental AI bot focused on prompts.",
    url: null as LinkValue,
  },
  {
    name: "Mentora Tutor Bot",
    description: "An experimental AI tutor bot.",
    url: null as LinkValue,
  },
];

export const skills = [
  {
    category: "Frontend",
    items: ["HTML5", "CSS3", "JavaScript", "TypeScript", "React.js", "Three.js", "Tailwind CSS"],
  },
  {
    category: "Backend",
    items: ["Node.js", "PHP", "Laravel"],
  },
  {
    category: "Database",
    items: ["MySQL", "Supabase"],
  },
  {
    category: "AI & Engineering",
    items: ["Python", "AI Engineering", "AI APIs", "Claude / AI-assisted development"],
  },
  {
    category: "Cloud & Deployment",
    items: ["AWS", "Hostinger", "Production Deployment", "Git", "GitHub"],
  },
];

export const languages = [
  { name: "Persian / Dari", level: "Native" },
  { name: "English", level: "Advanced" },
];

export const projectAssets: Record<string, string | undefined> = {};

export const socialLinks = [
  { label: "GitHub", url: profile.github },
  { label: "LinkedIn", url: profile.linkedin },
  { label: "X", url: profile.x },
  { label: "WhatsApp", url: profile.whatsapp },
];
