"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { createClient } from "@/lib/supabase/client"
import { slugify } from "@/lib/utils"

export function AskQuestionForm() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = React.useState(false)

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)

    const formData = new FormData(event.currentTarget)
    const title = formData.get("title") as string
    const content = formData.get("content") as string

    if (!title.trim() || !content.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to ask a question.",
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    // Generate unique slug
    const baseSlug = slugify(title)
    const timestamp = Date.now().toString(36)
    const slug = `${baseSlug}-${timestamp}`

    const { data, error } = await (supabase as any)
      .from("posts")
      .insert({
        type: "question",
        title: title.trim(),
        slug,
        content: content.trim(),
        excerpt: content.trim().slice(0, 200),
        author_id: user.id,
        status: "published",
      })
      .select()
      .single()

    if (error) {
      toast({
        title: "Error",
        description: "Failed to post question. Please try again.",
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    toast({
      title: "Question Posted!",
      description: "Your question has been posted successfully.",
    })

    router.push(`/questions/${slug}`)
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              placeholder="e.g., How do I configure auto-restart for my bot?"
              required
              disabled={isLoading}
            />
            <p className="text-xs text-muted-foreground">
              Be specific and imagine you&apos;re asking a question to another person.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Details</Label>
            <Textarea
              id="content"
              name="content"
              placeholder="Describe your problem or question in detail. Include what you've tried, any error messages, and what you expected to happen."
              rows={10}
              required
              disabled={isLoading}
            />
            <p className="text-xs text-muted-foreground">
              Include all the information someone would need to answer your question.
            </p>
          </div>

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Posting..." : "Post Question"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
