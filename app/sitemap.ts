import type { MetadataRoute } from "next";

const siteUrl = "https://paylinks.coderise-solution.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },

    {
  url: `${siteUrl}/publicite-facebook`,
  lastModified: new Date(),
  changeFrequency: "weekly",
  priority: 0.9,
},

{
  url: `${siteUrl}/acquisition-clients`,
  lastModified: new Date(),
  changeFrequency: "weekly",
  priority: 0.95,
},

    {
      url: `${siteUrl}/login`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },

    {
      url: `${siteUrl}/register`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },

    {
      url: `${siteUrl}/pricing`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];
}