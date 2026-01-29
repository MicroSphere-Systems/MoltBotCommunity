import { Suspense } from "react"
import type { Metadata } from "next"
import Link from "next/link"
import { MessageSquare, Plus } from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { PostList, PostListSkeleton } from "@/components/posts"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const metadata: Metadata = {
  title: "Questions",
  description: "Ask questions and get answers from the Moltbot and Clawdbot community. Share your knowledge and help others.",
  openGraph: {
    title: "Questions | MoltbotCommunity",
    description: "Ask questions and get answers from the Moltbot and Clawdbot community.",
  },
}

async function QuestionsContent({ filter }: { filter: "newest" | "unanswered" | "popular" }) {
  const supabase = await createClient()

  let query = supabase
    .from("posts")
    .select(`
      *,
      author:users(*)
    `)
    .eq("type", "question")
    .eq("status", "published")

  if (filter === "unanswered") {
    query = query.is("accepted_answer_id", null)
  }

  if (filter === "popular") {
    query = query.order("views", { ascending: false })
  } else {
    query = query.order("created_at", { ascending: false })
  }

  const { data: posts } = await query.limit(20)

  return <PostList posts={posts || []} showType={false} />
}

export default function QuestionsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-pink-500/10">
            <MessageSquare className="h-6 w-6 text-pink-500" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Questions</h1>
            <p className="text-muted-foreground">
              Ask questions and get answers from the community
            </p>
          </div>
        </div>
        <Button asChild>
          <Link href="/questions/ask">
            <Plus className="mr-2 h-4 w-4" />
            Ask Question
          </Link>
        </Button>
      </div>

      {/* Tabs for filtering */}
      <Tabs defaultValue="newest" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="newest">Newest</TabsTrigger>
          <TabsTrigger value="unanswered">Unanswered</TabsTrigger>
          <TabsTrigger value="popular">Popular</TabsTrigger>
        </TabsList>

        <TabsContent value="newest">
          <Suspense fallback={<PostListSkeleton />}>
            <QuestionsContent filter="newest" />
          </Suspense>
        </TabsContent>

        <TabsContent value="unanswered">
          <Suspense fallback={<PostListSkeleton />}>
            <QuestionsContent filter="unanswered" />
          </Suspense>
        </TabsContent>

        <TabsContent value="popular">
          <Suspense fallback={<PostListSkeleton />}>
            <QuestionsContent filter="popular" />
          </Suspense>
        </TabsContent>
      </Tabs>
    </div>
  )
}
