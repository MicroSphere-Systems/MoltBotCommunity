import { Suspense } from "react"
import type { Metadata } from "next"
import { Wrench } from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import { PostList, PostListSkeleton } from "@/components/posts"

export const metadata: Metadata = {
  title: "Fixes",
  description: "Solutions to common issues and troubleshooting guides for Moltbot and Clawdbot. Find fixes for known problems.",
  openGraph: {
    title: "Fixes | MoltbotCommunity",
    description: "Solutions to common issues and troubleshooting guides for Moltbot and Clawdbot.",
  },
}

async function FixesContent() {
  const supabase = await createClient()

  const { data: posts } = await supabase
    .from("posts")
    .select(`
      *,
      author:users(*)
    `)
    .eq("type", "fix")
    .eq("status", "published")
    .order("created_at", { ascending: false })

  return <PostList posts={posts || []} showType={false} />
}

export default function FixesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-500/10">
            <Wrench className="h-6 w-6 text-orange-500" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Fixes</h1>
            <p className="text-muted-foreground">
              Solutions to common issues and troubleshooting guides
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <Suspense fallback={<PostListSkeleton />}>
        <FixesContent />
      </Suspense>
    </div>
  )
}
