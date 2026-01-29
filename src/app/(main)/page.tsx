import Link from "next/link"
import {
  BookOpen,
  Wrench,
  HelpCircle,
  Bot,
  MessageSquare,
  ArrowRight,
  Search,
  Users,
  TrendingUp,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

const categories = [
  {
    title: "Guides",
    description: "Step-by-step tutorials to help you get started and master advanced features",
    href: "/guides",
    icon: BookOpen,
    color: "text-blue-500",
  },
  {
    title: "Fixes",
    description: "Solutions to common issues and troubleshooting guides",
    href: "/fix",
    icon: Wrench,
    color: "text-orange-500",
  },
  {
    title: "FAQ",
    description: "Answers to frequently asked questions about Moltbot and Clawdbot",
    href: "/faq",
    icon: HelpCircle,
    color: "text-green-500",
  },
  {
    title: "ClawdBot",
    description: "Everything you need to know about ClawdBot features and setup",
    href: "/clawdbot",
    icon: Bot,
    color: "text-purple-500",
  },
  {
    title: "Questions",
    description: "Ask questions and get answers from the community",
    href: "/questions",
    icon: MessageSquare,
    color: "text-pink-500",
  },
]

const stats = [
  { label: "Community Members", value: "10K+", icon: Users },
  { label: "Questions Answered", value: "5K+", icon: MessageSquare },
  { label: "Guides Published", value: "200+", icon: BookOpen },
]

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b bg-gradient-to-b from-background to-muted/20 px-4 py-24 md:py-32">
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
        <div className="container relative mx-auto max-w-5xl text-center">
          <Badge variant="secondary" className="mb-4">
            The Official Community Platform
          </Badge>
          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Welcome to{" "}
            <span className="brand-gradient-text">MoltbotCommunity</span>
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground sm:text-xl">
            Your go-to resource for guides, troubleshooting, and community support for Moltbot and Clawdbot.
            Get help, share knowledge, and connect with other users.
          </p>

          {/* Search Bar */}
          <div className="mx-auto mb-8 flex max-w-xl gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search guides, fixes, questions..."
                className="pl-10"
              />
            </div>
            <Button>Search</Button>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/guides">
                Browse Guides
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/questions/ask">Ask a Question</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-b bg-muted/30 px-4 py-12">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center text-center">
                <stat.icon className="mb-2 h-8 w-8 text-primary" />
                <div className="text-3xl font-bold">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="px-4 py-16">
        <div className="container mx-auto">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold">Explore Our Resources</h2>
            <p className="text-muted-foreground">
              Find everything you need to get the most out of Moltbot and Clawdbot
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <Link key={category.title} href={category.href}>
                <Card className="h-full transition-all hover:border-primary hover:shadow-lg">
                  <CardHeader>
                    <div className="mb-2">
                      <category.icon className={`h-8 w-8 ${category.color}`} />
                    </div>
                    <CardTitle className="flex items-center justify-between">
                      {category.title}
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    </CardTitle>
                    <CardDescription>{category.description}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Content Section */}
      <section className="border-t bg-muted/30 px-4 py-16">
        <div className="container mx-auto">
          <div className="mb-12 flex items-center justify-between">
            <div>
              <h2 className="mb-2 text-3xl font-bold">Trending Now</h2>
              <p className="text-muted-foreground">
                Most popular guides and questions this week
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/questions">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Placeholder for popular content - will be fetched from database */}
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="transition-all hover:shadow-md">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <Badge variant="secondary" className="mb-2">
                        {i % 2 === 0 ? "Guide" : "Question"}
                      </Badge>
                      <CardTitle className="text-lg">
                        {i % 2 === 0
                          ? "How to set up Moltbot for the first time"
                          : "Why is my bot not responding to commands?"}
                      </CardTitle>
                      <CardDescription className="mt-2 line-clamp-2">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.
                      </CardDescription>
                    </div>
                    <TrendingUp className="h-5 w-5 text-green-500" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>1.2k views</span>
                    <span>42 likes</span>
                    <span>3 days ago</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-16">
        <div className="container mx-auto">
          <Card className="brand-gradient p-8 text-white md:p-12">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                Can&apos;t find what you&apos;re looking for?
              </h2>
              <p className="mb-8 text-white/80">
                Our community is here to help. Ask a question and get answers from experienced Moltbot and Clawdbot users.
              </p>
              <Button
                size="lg"
                variant="secondary"
                className="bg-white text-primary hover:bg-white/90"
                asChild
              >
                <Link href="/questions/ask">
                  Ask the Community
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </Card>
        </div>
      </section>
    </div>
  )
}
