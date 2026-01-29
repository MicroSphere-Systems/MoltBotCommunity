import Link from "next/link"
import { Eye, Edit, Trash2 } from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { formatDate } from "@/lib/utils"

export default async function AdminPostsPage() {
  const supabase = await createClient()

  const { data: posts } = await supabase
    .from("posts")
    .select(`
      *,
      author:users(username)
    `)
    .order("created_at", { ascending: false })
    .limit(50)

  const statusColors = {
    draft: "bg-yellow-500/10 text-yellow-500",
    published: "bg-green-500/10 text-green-500",
    archived: "bg-gray-500/10 text-gray-500",
  }

  const typeLabels: Record<string, string> = {
    guide: "Guide",
    fix: "Fix",
    faq: "FAQ",
    clawdbot: "ClawdBot",
    question: "Question",
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Posts</h1>
          <p className="text-muted-foreground">
            Manage all posts, guides, fixes, and questions.
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Posts</CardTitle>
          <CardDescription>
            {posts?.length || 0} total posts
          </CardDescription>
        </CardHeader>
        <CardContent>
          {posts && posts.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b text-left text-sm text-muted-foreground">
                    <th className="pb-3 pr-4">Title</th>
                    <th className="pb-3 pr-4">Type</th>
                    <th className="pb-3 pr-4">Author</th>
                    <th className="pb-3 pr-4">Status</th>
                    <th className="pb-3 pr-4">Views</th>
                    <th className="pb-3 pr-4">Date</th>
                    <th className="pb-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map((post: any) => (
                    <tr key={post.id} className="border-b last:border-0">
                      <td className="py-3 pr-4">
                        <span className="font-medium line-clamp-1">{post.title}</span>
                      </td>
                      <td className="py-3 pr-4">
                        <Badge variant="outline">{typeLabels[post.type]}</Badge>
                      </td>
                      <td className="py-3 pr-4 text-sm text-muted-foreground">
                        {post.author?.username}
                      </td>
                      <td className="py-3 pr-4">
                        <Badge className={statusColors[post.status as keyof typeof statusColors]}>
                          {post.status}
                        </Badge>
                      </td>
                      <td className="py-3 pr-4 text-sm text-muted-foreground">
                        {post.views}
                      </td>
                      <td className="py-3 pr-4 text-sm text-muted-foreground">
                        {formatDate(post.created_at)}
                      </td>
                      <td className="py-3">
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="icon" asChild>
                            <Link href={`/${post.type === "question" ? "questions" : post.type}/${post.slug}`}>
                              <Eye className="h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center text-muted-foreground">No posts found</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
