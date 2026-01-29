import { redirect } from "next/navigation"
import Link from "next/link"
import { LayoutDashboard, FileText, Users, Flag, Home, Settings } from "lucide-react"
import { getUserProfile } from "@/lib/supabase/server"
import { cn } from "@/lib/utils"

const sidebarLinks = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Posts", href: "/admin/posts", icon: FileText },
  { name: "Users", href: "/admin/users", icon: Users },
  { name: "Reports", href: "/admin/reports", icon: Flag },
]

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const profile = await getUserProfile()

  if (!profile || !["admin", "moderator"].includes(profile.role)) {
    redirect("/")
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r bg-card">
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center border-b px-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <span className="text-lg font-bold text-primary-foreground">M</span>
              </div>
              <span className="font-bold">
                <span className="brand-gradient-text">Admin</span>
              </span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 p-4">
            {sidebarLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <link.icon className="h-4 w-4" />
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Footer */}
          <div className="border-t p-4">
            <Link
              href="/"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              <Home className="h-4 w-4" />
              Back to Site
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 flex-1 p-8">{children}</main>
    </div>
  )
}
