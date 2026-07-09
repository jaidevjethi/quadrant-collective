import type { MetadataRoute } from "next";
import { caseStudies } from "@/lib/work";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/services", "/work", "/about", "/contact", "/privacy"].map((path) => ({
    url: `${SITE_URL}${path}/`,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : path === "/privacy" ? 0.3 : 0.8,
  }));

  const work = caseStudies.map((c) => ({
    url: `${SITE_URL}/work/${c.slug}/`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...routes, ...work];
}
