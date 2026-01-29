import type { MetadataRoute } from "next"
import { createAdminClient } from "@/lib/supabase/admin"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://moltbotcommunity.com"

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/guides`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/fix`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/clawdbot`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/questions`,
      lastModified: new Date(),
      changeFrequency: "hourly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ]

  // Fetch dynamic pages from database
  try {
    const supabase = createAdminClient()

    const { data } = await supabase
      .from("posts")
      .select("slug, type, updated_at")
      .eq("status", "published")
      .order("updated_at", { ascending: false })

    const posts = (data || []) as Array<{ slug: string; type: string; updated_at: string }>

    if (posts.length > 0) {
      const dynamicPages: MetadataRoute.Sitemap = posts.map((post) => {
        const path = post.type === "question" ? "questions" : post.type
        return {
          url: `${baseUrl}/${path}/${post.slug}`,
          lastModified: new Date(post.updated_at),
          changeFrequency: "weekly" as const,
          priority: 0.7,
        }
      })

      return [...staticPages, ...dynamicPages]
    }
  } catch (error) {
    console.error("Error generating sitemap:", error)
  }

  return staticPages
}
