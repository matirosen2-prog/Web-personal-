import type { MetadataRoute } from "next";
import { profile } from "@/content/cv";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: profile.url, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${profile.url}${profile.cv.es}`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${profile.url}${profile.cv.en}`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
  ];
}
