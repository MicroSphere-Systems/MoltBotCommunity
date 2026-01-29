import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import { ChevronLeft, Eye, Clock } from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { formatDate } from "@/lib/utils"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createClient()

  const { data } = await supabase
    .from("posts")
    .select("title, excerpt, content")
    .eq("slug", slug)
    .eq("type", "fix")
    .single()

  if (!data) {
    return {
      title: "Fix Not Found",
    }
  }

  const post = data as { title: string; excerpt: string | null; content: string }

  return {
    title: post.title,
    description: post.excerpt || post.content.slice(0, 160),
    openGraph: {
      title: `${post.title} | MoltbotCommunity`,
      description: post.excerpt || post.content.slice(0, 160),
      type: "article",
    },
  }
}

export default async function FixPage({ params }: PageProps) {
  const { slug } = await params
  const supabase = await createClient()

  const { data } = await supabase
    .from("posts")
    .select(`
      *,
      author:users(*)
    `)
    .eq("slug", slug)
    .eq("type", "fix")
    .eq("status", "published")
    .single()

  if (!data) {
    notFound()
  }

  const post = data as any

  // Increment view count (ignore errors - function may not exist yet)
  try {
    await (supabase as any).rpc("increment_post_views", { post_id: post.id })
  } catch {
    // Function may not exist in dev
  }

  return (
    <article className="container mx-auto max-w-4xl px-4 py-8">
      {/* Back Button */}
      <Button variant="ghost" size="sm" className="mb-6" asChild>
        <Link href="/fix">
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to Fixes
        </Link>
      </Button>

      {/* Header */}
      <header className="mb-8">
        <Badge variant="outline" className="mb-4 bg-orange-500/10 text-orange-500 border-orange-500/20">
          Fix
        </Badge>
        <h1 className="mb-4 text-4xl font-bold leading-tight">{post.title}</h1>

        {post.excerpt && (
          <p className="mb-6 text-xl text-muted-foreground">{post.excerpt}</p>
        )}

        {/* Author and Meta */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage
                src={post.author.avatar_url || undefined}
                alt={post.author.username}
              />
              <AvatarFallback>
                {post.author.username.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <Link
              href={`/profile/${post.author.username}`}
              className="font-medium text-foreground hover:underline"
            >
              {post.author.username}
            </Link>
          </div>
          <Separator orientation="vertical" className="h-4" />
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <time dateTime={post.created_at}>{formatDate(post.created_at)}</time>
          </div>
          <Separator orientation="vertical" className="h-4" />
          <div className="flex items-center gap-1">
            <Eye className="h-4 w-4" />
            {post.views} views
          </div>
        </div>
      </header>

      <Separator className="mb-8" />

      {/* Content */}
      <div className="prose prose-lg max-w-none dark:prose-invert">
        <div dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br/>') }} />
      </div>

      <Separator className="my-8" />

      {/* Author Card */}
      <div className="rounded-lg border bg-card p-6">
        <div className="flex items-start gap-4">
          <Avatar className="h-12 w-12">
            <AvatarImage
              src={post.author.avatar_url || undefined}
              alt={post.author.username}
            />
            <AvatarFallback>
              {post.author.username.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <Link
                href={`/profile/${post.author.username}`}
                className="font-semibold hover:underline"
              >
                {post.author.username}
              </Link>
              <Badge variant="secondary">{post.author.reputation} rep</Badge>
            </div>
            {post.author.bio && (
              <p className="mt-1 text-sm text-muted-foreground">{post.author.bio}</p>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}
