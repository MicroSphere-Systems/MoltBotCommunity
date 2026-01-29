import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { Calendar, Award, MessageSquare, BookOpen } from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { formatDate } from "@/lib/utils"
import { PostList } from "@/components/posts"

interface PageProps {
  params: Promise<{ username: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { username } = await params
  const supabase = await createClient()

  const { data } = await supabase
    .from("users")
    .select("username, bio")
    .eq("username", username)
    .single()

  if (!data) {
    return {
      title: "User Not Found",
    }
  }

  const userData = data as { username: string; bio: string | null }

  return {
    title: `${userData.username}'s Profile`,
    description: userData.bio || `Check out ${userData.username}'s profile on MoltbotCommunity.`,
  }
}

export default async function ProfilePage({ params }: PageProps) {
  const { username } = await params
  const supabase = await createClient()

  const { data } = await supabase
    .from("users")
    .select("*")
    .eq("username", username)
    .single()

  if (!data) {
    notFound()
  }

  const user = data as any

  // Fetch user's posts
  const { data: postsData } = await supabase
    .from("posts")
    .select(`
      *,
      author:users(*)
    `)
    .eq("author_id", user.id)
    .eq("status", "published")
    .order("created_at", { ascending: false })
    .limit(10)

  const posts = (postsData || []) as any[]

  // Fetch user's answers count
  const { count: answersCount } = await supabase
    .from("answers")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user.id)

  // Fetch user's questions count
  const { count: questionsCount } = await supabase
    .from("posts")
    .select("*", { count: "exact", head: true })
    .eq("author_id", user.id)
    .eq("type", "question")

  const roleColors: Record<string, string> = {
    user: "bg-secondary text-secondary-foreground",
    moderator: "bg-blue-500/10 text-blue-500",
    admin: "bg-red-500/10 text-red-500",
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-8 md:grid-cols-3">
        {/* Profile Sidebar */}
        <div className="md:col-span-1">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={user.avatar_url || undefined} alt={user.username} />
                  <AvatarFallback className="text-2xl">
                    {user.username.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <h1 className="mt-4 text-2xl font-bold">{user.username}</h1>
                <Badge className={`mt-2 ${roleColors[user.role]}`}>
                  {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                </Badge>

                {user.bio && (
                  <p className="mt-4 text-sm text-muted-foreground">{user.bio}</p>
                )}

                <div className="mt-6 w-full space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 text-muted-foreground">
                      <Award className="h-4 w-4" />
                      Reputation
                    </span>
                    <span className="font-semibold">{user.reputation}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      Joined
                    </span>
                    <span>{formatDate(user.created_at)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 text-muted-foreground">
                      <BookOpen className="h-4 w-4" />
                      Posts
                    </span>
                    <span>{posts?.length || 0}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 text-muted-foreground">
                      <MessageSquare className="h-4 w-4" />
                      Answers
                    </span>
                    <span>{answersCount || 0}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Activity */}
        <div className="md:col-span-2">
          <Tabs defaultValue="posts" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="posts">Posts</TabsTrigger>
              <TabsTrigger value="questions">Questions ({questionsCount || 0})</TabsTrigger>
            </TabsList>

            <TabsContent value="posts">
              {posts && posts.length > 0 ? (
                <PostList posts={posts} showType />
              ) : (
                <Card>
                  <CardContent className="py-8 text-center">
                    <p className="text-muted-foreground">No posts yet.</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="questions">
              {posts?.filter(p => p.type === "question") && posts.filter(p => p.type === "question").length > 0 ? (
                <PostList posts={posts.filter(p => p.type === "question")} showType={false} />
              ) : (
                <Card>
                  <CardContent className="py-8 text-center">
                    <p className="text-muted-foreground">No questions asked yet.</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
