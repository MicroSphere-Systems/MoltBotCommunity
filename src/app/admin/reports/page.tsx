import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatDate } from "@/lib/utils"

export default async function AdminReportsPage() {
  const supabase = await createClient()

  const { data: reports } = await supabase
    .from("reports")
    .select(`
      *,
      reporter:users!reporter_id(username)
    `)
    .order("created_at", { ascending: false })
    .limit(50)

  const statusColors = {
    pending: "bg-yellow-500/10 text-yellow-500",
    resolved: "bg-green-500/10 text-green-500",
    dismissed: "bg-gray-500/10 text-gray-500",
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Reports</h1>
        <p className="text-muted-foreground">
          Review and manage content reports from the community.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Reports</CardTitle>
          <CardDescription>
            {reports?.length || 0} total reports
          </CardDescription>
        </CardHeader>
        <CardContent>
          {reports && reports.length > 0 ? (
            <div className="space-y-4">
              {reports.map((report: any) => (
                <div
                  key={report.id}
                  className="flex items-start justify-between border-b pb-4 last:border-0 last:pb-0"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Badge className={statusColors[report.status as keyof typeof statusColors]}>
                        {report.status}
                      </Badge>
                      <Badge variant="outline">{report.reported_type}</Badge>
                    </div>
                    <p className="text-sm">{report.reason}</p>
                    <p className="text-xs text-muted-foreground">
                      Reported by {report.reporter?.username} on {formatDate(report.created_at)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground">No reports found</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
