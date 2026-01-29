import Link from "next/link"
import { Home, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
        <span className="text-4xl font-bold text-muted-foreground">404</span>
      </div>
      <h1 className="mb-4 text-3xl font-bold">Page Not Found</h1>
      <p className="mb-8 max-w-md text-muted-foreground">
        Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been removed, renamed, or doesn&apos;t exist.
      </p>
      <div className="flex gap-4">
        <Button variant="outline" asChild>
          <Link href="javascript:history.back()">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Link>
        </Button>
        <Button asChild>
          <Link href="/">
            <Home className="mr-2 h-4 w-4" />
            Home
          </Link>
        </Button>
      </div>
    </div>
  )
}
