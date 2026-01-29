import type { Metadata } from "next"
import { redirect } from "next/navigation"
import Link from "next/link"
import { ChevronLeft, HelpCircle } from "lucide-react"
import { getUser } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AskQuestionForm } from "@/components/questions/ask-question-form"

export const metadata: Metadata = {
  title: "Ask a Question",
  description: "Ask a question to the Moltbot and Clawdbot community. Get help from experienced users.",
}

export default async function AskQuestionPage() {
  const user = await getUser()

  if (!user) {
    redirect("/login?redirect=/questions/ask")
  }

  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      {/* Back Button */}
      <Button variant="ghost" size="sm" className="mb-6" asChild>
        <Link href="/questions">
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to Questions
        </Link>
      </Button>

      {/* Header */}
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">Ask a Question</h1>
        <p className="text-muted-foreground">
          Get help from the community by asking a clear, detailed question.
        </p>
      </div>

      {/* Tips Card */}
      <Card className="mb-8 border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <HelpCircle className="h-5 w-5 text-primary" />
            Tips for a Great Question
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• <strong>Be specific:</strong> Include details about what you&apos;re trying to do</li>
            <li>• <strong>Show your work:</strong> Describe what you&apos;ve already tried</li>
            <li>• <strong>Include errors:</strong> Copy any error messages you&apos;re seeing</li>
            <li>• <strong>Use a clear title:</strong> Summarize your question in one sentence</li>
          </ul>
        </CardContent>
      </Card>

      {/* Question Form */}
      <AskQuestionForm />
    </div>
  )
}
