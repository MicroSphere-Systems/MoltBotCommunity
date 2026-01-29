import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { formatDate } from "@/lib/utils"

export default async function AdminUsersPage() {
  const supabase = await createClient()

  const { data } = await supabase
    .from("users")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(50)

  const users = (data || []) as any[]

  const roleColors: Record<string, string> = {
    user: "bg-secondary text-secondary-foreground",
    moderator: "bg-blue-500/10 text-blue-500",
    admin: "bg-red-500/10 text-red-500",
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Users</h1>
        <p className="text-muted-foreground">
          Manage community members and their roles.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Users</CardTitle>
          <CardDescription>
            {users?.length || 0} total users
          </CardDescription>
        </CardHeader>
        <CardContent>
          {users && users.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b text-left text-sm text-muted-foreground">
                    <th className="pb-3 pr-4">User</th>
                    <th className="pb-3 pr-4">Email</th>
                    <th className="pb-3 pr-4">Role</th>
                    <th className="pb-3 pr-4">Reputation</th>
                    <th className="pb-3 pr-4">Status</th>
                    <th className="pb-3">Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-b last:border-0">
                      <td className="py-3 pr-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={user.avatar_url || undefined} />
                            <AvatarFallback>
                              {user.username.slice(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{user.username}</span>
                        </div>
                      </td>
                      <td className="py-3 pr-4 text-sm text-muted-foreground">
                        {user.email}
                      </td>
                      <td className="py-3 pr-4">
                        <Badge className={roleColors[user.role as keyof typeof roleColors]}>
                          {user.role}
                        </Badge>
                      </td>
                      <td className="py-3 pr-4 text-sm">
                        {user.reputation}
                      </td>
                      <td className="py-3 pr-4">
                        {user.is_banned ? (
                          <Badge variant="destructive">Banned</Badge>
                        ) : (
                          <Badge variant="outline" className="bg-green-500/10 text-green-500">
                            Active
                          </Badge>
                        )}
                      </td>
                      <td className="py-3 text-sm text-muted-foreground">
                        {formatDate(user.created_at)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center text-muted-foreground">No users found</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
