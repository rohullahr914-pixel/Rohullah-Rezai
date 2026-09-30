import type { MetadataRoute } from "next";
import { profile } from "@/data/portfolio";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = profile.siteUrl?.replace(/\/$/, "");
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: siteUrl ? siteUrl + "/sitemap.xml" : undefined,
    host: siteUrl,
  };
}
