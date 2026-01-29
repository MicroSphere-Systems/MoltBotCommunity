"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { createClient } from "@/lib/supabase/client"

interface AnswerFormProps {
  postId: string
}

export function AnswerForm({ postId }: AnswerFormProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = React.useState(false)
  const [content, setContent] = React.useState("")

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)

    if (!content.trim()) {
      toast({
        title: "Error",
        description: "Please write an answer.",
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
        description: "You must be logged in to answer.",
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    const { error } = await (supabase as any)
      .from("answers")
      .insert({
        post_id: postId,
        user_id: user.id,
        content: content.trim(),
      })

    if (error) {
      toast({
        title: "Error",
        description: "Failed to post answer. Please try again.",
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    toast({
      title: "Answer Posted!",
      description: "Your answer has been posted successfully.",
    })

    setContent("")
    router.refresh()
    setIsLoading(false)
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={onSubmit} className="space-y-4">
          <Textarea
            placeholder="Write your answer here. Be helpful and detailed."
            rows={8}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            disabled={isLoading}
          />
          <div className="flex justify-end">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Posting..." : "Post Answer"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
