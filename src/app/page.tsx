import Link from "next/link"
import Image from "next/image"
import {
  BookOpen,
  Wrench,
  HelpCircle,
  Bot,
  MessageSquare,
  ArrowRight,
  Users,
  Zap,
  Shield,
  Star,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const features = [
  {
    title: "Guides",
    description: "Step-by-step tutorials to master every feature",
    href: "/guides",
    icon: BookOpen,
    color: "bg-blue-500/10 text-blue-500",
  },
  {
    title: "Fixes",
    description: "Quick solutions to common problems",
    href: "/fix",
    icon: Wrench,
    color: "bg-orange-500/10 text-orange-500",
  },
  {
    title: "FAQ",
    description: "Instant answers to your questions",
    href: "/faq",
    icon: HelpCircle,
    color: "bg-green-500/10 text-green-500",
  },
  {
    title: "ClawdBot",
    description: "Dedicated ClawdBot resources",
    href: "/clawdbot",
    icon: Bot,
    color: "bg-purple-500/10 text-purple-500",
  },
  {
    title: "Community Q&A",
    description: "Get help from experienced users",
    href: "/questions",
    icon: MessageSquare,
    color: "bg-pink-500/10 text-pink-500",
  },
]

const benefits = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Get answers and solutions in minutes, not hours",
  },
  {
    icon: Users,
    title: "Active Community",
    description: "Join thousands of Moltbot and Clawdbot users",
  },
  {
    icon: Shield,
    title: "Verified Solutions",
    description: "Community-tested fixes that actually work",
  },
  {
    icon: Star,
    title: "Expert Knowledge",
    description: "Learn from power users and developers",
  },
]

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#0a1628]">
      {/* Hero Section */}
      <section className="relative flex flex-1 flex-col items-center justify-center px-4 py-20 text-center">
        {/* Background glow effect */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/20 blur-[120px]" />
          <div className="absolute left-1/4 top-1/3 h-[400px] w-[400px] rounded-full bg-orange-500/10 blur-[100px]" />
        </div>

        <div className="relative z-10 flex flex-col items-center">
          {/* Logo */}
          <div className="mb-8">
            <div className="relative h-40 w-40 overflow-hidden rounded-3xl border-4 border-cyan-500/30 bg-[#0d1f35] shadow-2xl shadow-cyan-500/20 sm:h-52 sm:w-52">
              {/* Replace with your logo - put logo.png in public folder */}
              <Image
                src="/logo.png"
                alt="MoltBot Logo"
                fill
                className="object-contain p-4"
                priority
              />
            </div>
          </div>

          {/* Title */}
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            <span className="bg-gradient-to-r from-cyan-400 to-cyan-300 bg-clip-text text-transparent">
              Moltbot
            </span>
            <span className="text-orange-400">Community</span>
          </h1>

          {/* Tagline */}
          <p className="mb-8 max-w-2xl text-lg text-slate-400 sm:text-xl">
            The official community hub for Moltbot and Clawdbot users.
            <br className="hidden sm:block" />
            Guides, fixes, support, and everything in between.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button
              size="lg"
              className="bg-cyan-500 px-8 text-lg font-semibold text-[#0a1628] hover:bg-cyan-400"
              asChild
            >
              <Link href="/signup">
                Join Community
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-slate-600 px-8 text-lg text-slate-300 hover:bg-slate-800 hover:text-white"
              asChild
            >
              <Link href="/guides">Explore Guides</Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-16 flex flex-wrap justify-center gap-8 sm:gap-16">
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-400 sm:text-4xl">500+</div>
              <div className="text-sm text-slate-500">Members</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-400 sm:text-4xl">50+</div>
              <div className="text-sm text-slate-500">Guides</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-400 sm:text-4xl">100+</div>
              <div className="text-sm text-slate-500">Solutions</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-t border-slate-800 bg-[#0d1f35] px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-4 text-center text-3xl font-bold text-white sm:text-4xl">
            Everything You Need
          </h2>
          <p className="mb-12 text-center text-slate-400">
            Resources to help you get the most out of your bots
          </p>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Link key={feature.title} href={feature.href}>
                <Card className="h-full border-slate-700 bg-[#0a1628] transition-all hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/10">
                  <CardHeader>
                    <div className={`mb-3 inline-flex rounded-lg p-3 ${feature.color}`}>
                      <feature.icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="flex items-center justify-between text-white">
                      {feature.title}
                      <ArrowRight className="h-4 w-4 text-slate-500" />
                    </CardTitle>
                    <CardDescription className="text-slate-400">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="border-t border-slate-800 px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-4 text-center text-3xl font-bold text-white sm:text-4xl">
            Why Join Us?
          </h2>
          <p className="mb-12 text-center text-slate-400">
            Be part of a thriving community
          </p>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="text-center">
                <div className="mx-auto mb-4 inline-flex rounded-full bg-cyan-500/10 p-4">
                  <benefit.icon className="h-8 w-8 text-cyan-400" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-white">{benefit.title}</h3>
                <p className="text-sm text-slate-400">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-slate-800 bg-gradient-to-r from-cyan-500/10 to-orange-500/10 px-4 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
            Ready to Get Started?
          </h2>
          <p className="mb-8 text-lg text-slate-400">
            Join the MoltbotCommunity today and unlock access to all guides, fixes, and community support.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              className="bg-cyan-500 px-8 text-lg font-semibold text-[#0a1628] hover:bg-cyan-400"
              asChild
            >
              <Link href="/signup">Create Free Account</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-slate-600 px-8 text-lg text-slate-300 hover:bg-slate-800 hover:text-white"
              asChild
            >
              <Link href="/login">Sign In</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-[#060d17] px-4 py-8">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-cyan-400">Moltbot</span>
              <span className="text-xl font-bold text-orange-400">Community</span>
            </div>
            <div className="flex gap-6 text-sm text-slate-500">
              <Link href="/privacy" className="hover:text-slate-300">Privacy</Link>
              <Link href="/terms" className="hover:text-slate-300">Terms</Link>
              <Link href="/disclaimer" className="hover:text-slate-300">Disclaimer</Link>
            </div>
          </div>
          <div className="mt-4 text-center text-sm text-slate-600">
            &copy; {new Date().getFullYear()} MoltbotCommunity. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
