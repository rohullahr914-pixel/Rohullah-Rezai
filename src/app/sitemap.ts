import type { MetadataRoute } from "next";
import { profile } from "@/data/portfolio";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = profile.siteUrl?.replace(/\/$/, "");
  if (!siteUrl) return [];
  return [{ url: siteUrl, lastModified: new Date(), changeFrequency: "monthly", priority: 1 }];
}
