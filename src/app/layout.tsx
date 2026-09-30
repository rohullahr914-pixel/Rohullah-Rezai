import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { SiteNavigation } from "@/components/layout/site-navigation";
import { CustomCursor } from "@/components/layout/custom-cursor";
import { IntroLoader } from "@/components/layout/intro-loader";
import { MotionDirector } from "@/components/layout/motion-director";
import { ScrollProgress } from "@/components/layout/scroll-progress";
import { profile } from "@/data/portfolio";
import "./globals.css";

const title = "Rohullah Rezai — AI Engineer & Full-Stack Developer";
const description = "Portfolio of Rohullah Rezai, an AI Engineer and Full-Stack Developer building intelligent systems, AI-powered products and modern web experiences.";
const siteUrl = profile.siteUrl ? new URL(profile.siteUrl) : undefined;

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title,
  description,
  applicationName: "Rohullah Rezai",
  alternates: siteUrl ? { canonical: "/" } : undefined,
  openGraph: {
    type: "website",
    title,
    description,
    siteName: "Rohullah Rezai",
    url: siteUrl?.toString(),
    images: [{ url: "/images/rohullah-portrait.webp", width: 1078, height: 1544, alt: "Rohullah Rezai" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/images/rohullah-portrait.webp"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#080b0d",
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">Skip to content</a>
        <IntroLoader />
        <SiteNavigation />
        <CustomCursor />
        <MotionDirector />
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}
