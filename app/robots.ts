import type { MetadataRoute } from "next";

const siteUrl = "https://paylinks.coderise-solution.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/dashboard/",
        "/api/",
        "/login/",
        "/register/",
      ],
    },

    sitemap: `${siteUrl}/sitemap.xml`,
  };
}