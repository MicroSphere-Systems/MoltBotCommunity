import Link from "next/link"
import { Eye, MessageSquare, ThumbsUp, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { formatRelativeTime } from "@/lib/utils"
import type { PostWithAuthor, PostType } from "@/types"

const typeLabels: Record<PostType, string> = {
  guide: "Guide",
  fix: "Fix",
  faq: "FAQ",
  clawdbot: "ClawdBot",
  question: "Question",
}

const typeColors: Record<PostType, string> = {
  guide: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  fix: "bg-orange-500/10 text-orange-500 border-orange-500/20",
  faq: "bg-green-500/10 text-green-500 border-green-500/20",
  clawdbot: "bg-purple-500/10 text-purple-500 border-purple-500/20",
  question: "bg-pink-500/10 text-pink-500 border-pink-500/20",
}

interface PostCardProps {
  post: PostWithAuthor
  showType?: boolean
}

export function PostCard({ post, showType = true }: PostCardProps) {
  const href = post.type === "question"
    ? `/questions/${post.slug}`
    : `/${post.type}/${post.slug}`

  return (
    <Link href={href}>
      <Card className="h-full transition-all hover:border-primary hover:shadow-md">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              {showType && (
                <Badge
                  variant="outline"
                  className={`mb-2 ${typeColors[post.type]}`}
                >
                  {typeLabels[post.type]}
                </Badge>
              )}
              <CardTitle className="line-clamp-2 text-lg leading-tight">
                {post.title}
              </CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {post.excerpt && (
            <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">
              {post.excerpt}
            </p>
          )}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage
                  src={post.author.avatar_url || undefined}
                  alt={post.author.username}
                />
                <AvatarFallback className="text-xs">
                  {post.author.username.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm text-muted-foreground">
                {post.author.username}
              </span>
            </div>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Eye className="h-3 w-3" />
                {post.views}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {formatRelativeTime(post.created_at)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

// Skeleton for loading state
export function PostCardSkeleton() {
  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="mb-2 h-5 w-16 animate-pulse rounded bg-muted" />
        <div className="h-6 w-full animate-pulse rounded bg-muted" />
        <div className="mt-1 h-6 w-3/4 animate-pulse rounded bg-muted" />
      </CardHeader>
      <CardContent>
        <div className="mb-4 space-y-2">
          <div className="h-4 w-full animate-pulse rounded bg-muted" />
          <div className="h-4 w-5/6 animate-pulse rounded bg-muted" />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 animate-pulse rounded-full bg-muted" />
            <div className="h-4 w-20 animate-pulse rounded bg-muted" />
          </div>
          <div className="h-4 w-24 animate-pulse rounded bg-muted" />
        </div>
      </CardContent>
    </Card>
  )
}
