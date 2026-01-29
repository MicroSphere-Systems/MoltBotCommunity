import { PostCard, PostCardSkeleton } from "./post-card"
import type { PostWithAuthor } from "@/types"

interface PostListProps {
  posts: PostWithAuthor[]
  showType?: boolean
}

export function PostList({ posts, showType = true }: PostListProps) {
  if (posts.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-lg text-muted-foreground">No posts found.</p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} showType={showType} />
      ))}
    </div>
  )
}

export function PostListSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <PostCardSkeleton key={i} />
      ))}
    </div>
  )
}
