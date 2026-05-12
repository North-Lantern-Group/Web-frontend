import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const homepageLastModified = new Date("2026-05-12T00:00:00.000Z");
  const privacyLastModified = new Date("2026-04-24T00:00:00.000Z");
  const termsLastModified = new Date("2026-04-24T00:00:00.000Z");

  return [
    {
      url: "https://www.northlanterngroup.com",
      lastModified: homepageLastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://www.northlanterngroup.com/privacy",
      lastModified: privacyLastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: "https://www.northlanterngroup.com/terms",
      lastModified: termsLastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
