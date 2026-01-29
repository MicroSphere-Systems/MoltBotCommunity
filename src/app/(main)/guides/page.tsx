import { Suspense } from "react"
import type { Metadata } from "next"
import { BookOpen } from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import { PostList, PostListSkeleton } from "@/components/posts"

export const metadata: Metadata = {
  title: "Guides",
  description: "Step-by-step tutorials and guides for Moltbot and Clawdbot. Learn how to set up, configure, and use all features.",
  openGraph: {
    title: "Guides | MoltbotCommunity",
    description: "Step-by-step tutorials and guides for Moltbot and Clawdbot.",
  },
}

async function GuidesContent() {
  const supabase = await createClient()

  const { data: posts } = await supabase
    .from("posts")
    .select(`
      *,
      author:users(*)
    `)
    .eq("type", "guide")
    .eq("status", "published")
    .order("created_at", { ascending: false })

  return <PostList posts={posts || []} showType={false} />
}

export default function GuidesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/10">
            <BookOpen className="h-6 w-6 text-blue-500" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Guides</h1>
            <p className="text-muted-foreground">
              Step-by-step tutorials to help you get started and master advanced features
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <Suspense fallback={<PostListSkeleton />}>
        <GuidesContent />
      </Suspense>
    </div>
  )
}
