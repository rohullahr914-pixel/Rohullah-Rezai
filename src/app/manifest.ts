import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Rohullah Rezai — Portfolio",
    short_name: "RR",
    description: "AI Engineer and Full-Stack Developer",
    start_url: "/",
    display: "standalone",
    background_color: "#080b0d",
    theme_color: "#080b0d",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" }],
  };
}
