import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import { ChevronLeft, Eye, Clock, MessageSquare, Check } from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { formatDate, formatRelativeTime } from "@/lib/utils"
import { AnswerForm } from "@/components/questions/answer-form"
import { VoteButtons } from "@/components/questions/vote-buttons"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createClient()

  const { data } = await supabase
    .from("posts")
    .select("title, excerpt, content")
    .eq("slug", slug)
    .eq("type", "question")
    .single()

  if (!data) {
    return {
      title: "Question Not Found",
    }
  }

  const post = data as { title: string; excerpt: string | null; content: string }

  return {
    title: post.title,
    description: post.excerpt || post.content.slice(0, 160),
    openGraph: {
      title: `${post.title} | MoltbotCommunity`,
      description: post.excerpt || post.content.slice(0, 160),
      type: "article",
    },
  }
}

export default async function QuestionPage({ params }: PageProps) {
  const { slug } = await params
  const supabase = await createClient()

  const { data } = await supabase
    .from("posts")
    .select(`
      *,
      author:users(*)
    `)
    .eq("slug", slug)
    .eq("type", "question")
    .eq("status", "published")
    .single()

  if (!data) {
    notFound()
  }

  const post = data as any

  // Fetch answers
  const { data: answersData } = await supabase
    .from("answers")
    .select(`
      *,
      user:users(*)
    `)
    .eq("post_id", post.id)
    .order("is_accepted", { ascending: false })
    .order("votes", { ascending: false })
    .order("created_at", { ascending: true })

  const answers = (answersData || []) as any[]

  // Increment view count (ignore errors - function may not exist yet)
  try {
    await (supabase as any).rpc("increment_post_views", { post_id: post.id })
  } catch {
    // Function may not exist in dev
  }

  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      {/* Back Button */}
      <Button variant="ghost" size="sm" className="mb-6" asChild>
        <Link href="/questions">
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to Questions
        </Link>
      </Button>

      {/* Question */}
      <article className="mb-8">
        <header className="mb-6">
          <div className="mb-4 flex items-center gap-2">
            <Badge variant="outline" className="bg-pink-500/10 text-pink-500 border-pink-500/20">
              Question
            </Badge>
            {post.accepted_answer_id && (
              <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                <Check className="mr-1 h-3 w-3" />
                Answered
              </Badge>
            )}
          </div>
          <h1 className="mb-4 text-3xl font-bold leading-tight">{post.title}</h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage
                  src={post.author.avatar_url || undefined}
                  alt={post.author.username}
                />
                <AvatarFallback className="text-xs">
                  {post.author.username.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <Link
                href={`/profile/${post.author.username}`}
                className="font-medium text-foreground hover:underline"
              >
                {post.author.username}
              </Link>
            </div>
            <Separator orientation="vertical" className="h-4" />
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              Asked {formatRelativeTime(post.created_at)}
            </span>
            <Separator orientation="vertical" className="h-4" />
            <span className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              {post.views} views
            </span>
            <Separator orientation="vertical" className="h-4" />
            <span className="flex items-center gap-1">
              <MessageSquare className="h-4 w-4" />
              {answers?.length || 0} answers
            </span>
          </div>
        </header>

        <div className="prose prose-lg max-w-none dark:prose-invert">
          <div dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br/>') }} />
        </div>
      </article>

      <Separator className="my-8" />

      {/* Answers Section */}
      <section>
        <h2 className="mb-6 text-2xl font-bold">
          {answers?.length || 0} {answers?.length === 1 ? "Answer" : "Answers"}
        </h2>

        {answers && answers.length > 0 ? (
          <div className="space-y-6">
            {answers.map((answer) => (
              <Card
                key={answer.id}
                className={answer.is_accepted ? "border-green-500/50 bg-green-500/5" : ""}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start gap-4">
                    <VoteButtons
                      answerId={answer.id}
                      votes={answer.votes}
                      isAccepted={answer.is_accepted}
                      postAuthorId={post.author_id}
                      postId={post.id}
                    />
                    <div className="flex-1">
                      <div className="prose max-w-none dark:prose-invert">
                        <div dangerouslySetInnerHTML={{ __html: answer.content.replace(/\n/g, '<br/>') }} />
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Avatar className="h-6 w-6">
                        <AvatarImage
                          src={answer.user.avatar_url || undefined}
                          alt={answer.user.username}
                        />
                        <AvatarFallback className="text-xs">
                          {answer.user.username.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <Link
                        href={`/profile/${answer.user.username}`}
                        className="font-medium text-foreground hover:underline"
                      >
                        {answer.user.username}
                      </Link>
                      <span className="text-xs">
                        answered {formatRelativeTime(answer.created_at)}
                      </span>
                    </div>
                    {answer.is_accepted && (
                      <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                        <Check className="mr-1 h-3 w-3" />
                        Accepted
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="py-8 text-center">
              <p className="text-muted-foreground">
                No answers yet. Be the first to answer this question!
              </p>
            </CardContent>
          </Card>
        )}
      </section>

      <Separator className="my-8" />

      {/* Answer Form */}
      <section>
        <h2 className="mb-6 text-2xl font-bold">Your Answer</h2>
        {user ? (
          <AnswerForm postId={post.id} />
        ) : (
          <Card>
            <CardContent className="py-8 text-center">
              <p className="mb-4 text-muted-foreground">
                You need to be logged in to answer this question.
              </p>
              <Button asChild>
                <Link href={`/login?redirect=/questions/${slug}`}>Sign in to Answer</Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </section>
    </div>
  )
}
