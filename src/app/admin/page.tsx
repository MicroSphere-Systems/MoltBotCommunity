import { Users, FileText, Eye, Flag } from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

async function getStats() {
  const supabase = await createClient()

  const [users, posts, answers, reports] = await Promise.all([
    supabase.from("users").select("*", { count: "exact", head: true }),
    supabase.from("posts").select("*", { count: "exact", head: true }),
    supabase.from("answers").select("*", { count: "exact", head: true }),
    supabase.from("reports").select("*", { count: "exact", head: true }).eq("status", "pending"),
  ])

  // Get total views
  const { data: viewsData } = await supabase
    .from("posts")
    .select("views")

  const viewsList = (viewsData || []) as Array<{ views: number }>
  const totalViews = viewsList.reduce((sum, post) => sum + (post.views || 0), 0)

  return {
    users: users.count || 0,
    posts: posts.count || 0,
    answers: answers.count || 0,
    pendingReports: reports.count || 0,
    totalViews,
  }
}

async function getRecentActivity() {
  const supabase = await createClient()

  const { data: recentPosts } = await supabase
    .from("posts")
    .select(`
      id,
      title,
      type,
      created_at,
      author:users(username)
    `)
    .order("created_at", { ascending: false })
    .limit(5)

  return recentPosts || []
}

export default async function AdminDashboard() {
  const stats = await getStats()
  const recentActivity = await getRecentActivity()

  const statCards = [
    {
      title: "Total Users",
      value: stats.users,
      icon: Users,
      color: "text-blue-500",
    },
    {
      title: "Total Posts",
      value: stats.posts,
      icon: FileText,
      color: "text-green-500",
    },
    {
      title: "Total Views",
      value: stats.totalViews.toLocaleString(),
      icon: Eye,
      color: "text-purple-500",
    },
    {
      title: "Pending Reports",
      value: stats.pendingReports,
      icon: Flag,
      color: stats.pendingReports > 0 ? "text-red-500" : "text-muted-foreground",
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to the admin dashboard. Here&apos;s an overview of your community.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest posts and questions from the community</CardDescription>
        </CardHeader>
        <CardContent>
          {recentActivity.length > 0 ? (
            <div className="space-y-4">
              {recentActivity.map((post: any) => (
                <div
                  key={post.id}
                  className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                >
                  <div>
                    <p className="font-medium">{post.title}</p>
                    <p className="text-sm text-muted-foreground">
                      by {post.author?.username} &middot; {post.type}
                    </p>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {new Date(post.created_at).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground">No recent activity</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
