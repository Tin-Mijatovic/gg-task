import type { MetadataRoute } from "next";
import { fetchPosts } from "@/lib/api";
import { PostType } from "@/lib/types";

const baseUrl = process.env.PUBLIC_APP_URL || "http://localhost:3000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // NOTE: This is not needed for this app but just an example how would you generate sitemap dynamically
  const allPosts: PostType[] = await fetchPosts();

  const postRoutes = allPosts.map((post) => ({
    url: `${baseUrl}/posts/${post.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/favorites`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...postRoutes,
  ];
}
