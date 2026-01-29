import { Suspense } from "react"
import type { Metadata } from "next"
import { Bot } from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import { PostList, PostListSkeleton } from "@/components/posts"

export const metadata: Metadata = {
  title: "ClawdBot",
  description: "Everything about ClawdBot - features, setup guides, and documentation. Learn how to use ClawdBot effectively.",
  openGraph: {
    title: "ClawdBot | MoltbotCommunity",
    description: "Everything about ClawdBot - features, setup guides, and documentation.",
  },
}

async function ClawdbotContent() {
  const supabase = await createClient()

  const { data: posts } = await supabase
    .from("posts")
    .select(`
      *,
      author:users(*)
    `)
    .eq("type", "clawdbot")
    .eq("status", "published")
    .order("created_at", { ascending: false })

  return <PostList posts={posts || []} showType={false} />
}

export default function ClawdbotPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500/10">
            <Bot className="h-6 w-6 text-purple-500" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">ClawdBot</h1>
            <p className="text-muted-foreground">
              Everything you need to know about ClawdBot features and setup
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <Suspense fallback={<PostListSkeleton />}>
        <ClawdbotContent />
      </Suspense>
    </div>
  )
}
