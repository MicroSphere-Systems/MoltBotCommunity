"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { ChevronUp, ChevronDown, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { createClient } from "@/lib/supabase/client"
import { cn } from "@/lib/utils"

interface VoteButtonsProps {
  answerId: string
  votes: number
  isAccepted: boolean
  postAuthorId: string
  postId: string
}

export function VoteButtons({
  answerId,
  votes,
  isAccepted,
  postAuthorId,
  postId,
}: VoteButtonsProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [currentVotes, setCurrentVotes] = React.useState(votes)
  const [userVote, setUserVote] = React.useState<number | null>(null)
  const [isLoading, setIsLoading] = React.useState(false)
  const [canAccept, setCanAccept] = React.useState(false)

  React.useEffect(() => {
    const checkUserVote = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()

      if (user) {
        // Check if user is the post author
        setCanAccept(user.id === postAuthorId)

        // Get user's existing vote
        const { data } = await supabase
          .from("votes")
          .select("value")
          .eq("user_id", user.id)
          .eq("answer_id", answerId)
          .single()

        const vote = data as { value: number } | null
        if (vote) {
          setUserVote(vote.value)
        }
      }
    }
    checkUserVote()
  }, [answerId, postAuthorId])

  async function handleVote(value: number) {
    setIsLoading(true)

    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      toast({
        title: "Sign in required",
        description: "You must be logged in to vote.",
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    // If clicking the same vote, remove it
    if (userVote === value) {
      const { error } = await (supabase as any)
        .from("votes")
        .delete()
        .eq("user_id", user.id)
        .eq("answer_id", answerId)

      if (!error) {
        setCurrentVotes(currentVotes - value)
        setUserVote(null)
      }
    } else {
      // If changing vote or new vote
      const { error } = await (supabase as any)
        .from("votes")
        .upsert({
          user_id: user.id,
          answer_id: answerId,
          value,
        })

      if (!error) {
        const voteDiff = userVote ? value - userVote : value
        setCurrentVotes(currentVotes + voteDiff)
        setUserVote(value)
      }
    }

    setIsLoading(false)
    router.refresh()
  }

  async function handleAccept() {
    setIsLoading(true)

    const supabase = createClient()
    const { error } = await (supabase as any).rpc("accept_answer", {
      answer_id: answerId,
      post_id: postId,
    })

    if (error) {
      toast({
        title: "Error",
        description: "Failed to accept answer. Please try again.",
        variant: "destructive",
      })
    } else {
      toast({
        title: "Answer Accepted",
        description: "You've marked this as the accepted answer.",
      })
      router.refresh()
    }

    setIsLoading(false)
  }

  return (
    <div className="flex flex-col items-center gap-1">
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "h-8 w-8",
          userVote === 1 && "text-green-500"
        )}
        onClick={() => handleVote(1)}
        disabled={isLoading}
      >
        <ChevronUp className="h-6 w-6" />
      </Button>

      <span className={cn(
        "text-lg font-semibold",
        currentVotes > 0 && "text-green-500",
        currentVotes < 0 && "text-red-500"
      )}>
        {currentVotes}
      </span>

      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "h-8 w-8",
          userVote === -1 && "text-red-500"
        )}
        onClick={() => handleVote(-1)}
        disabled={isLoading}
      >
        <ChevronDown className="h-6 w-6" />
      </Button>

      {canAccept && !isAccepted && (
        <Button
          variant="ghost"
          size="icon"
          className="mt-2 h-8 w-8 text-muted-foreground hover:text-green-500"
          onClick={handleAccept}
          disabled={isLoading}
          title="Accept this answer"
        >
          <Check className="h-5 w-5" />
        </Button>
      )}

      {isAccepted && (
        <div className="mt-2 text-green-500" title="Accepted answer">
          <Check className="h-6 w-6" />
        </div>
      )}
    </div>
  )
}
