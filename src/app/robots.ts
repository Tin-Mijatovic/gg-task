import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/favorites"],
      disallow: "/private/", // This is not needed for this app but just an example
    },
    sitemap: `${process.env.PUBLIC_APP_URL}/sitemap.xml`,
  };
}
