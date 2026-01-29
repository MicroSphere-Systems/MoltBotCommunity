"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { createClient } from "@/lib/supabase/client"

export default function LoginPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = React.useState(false)

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)

    const formData = new FormData(event.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    const supabase = createClient()

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    toast({
      title: "Welcome back!",
      description: "You have successfully signed in.",
    })

    router.push("/")
    router.refresh()
  }

  return (
    <Card className="w-full max-w-md border-slate-700 bg-[#0d1f35]">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl text-white">Welcome back</CardTitle>
        <CardDescription className="text-slate-400">
          Sign in to your account to continue
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-slate-300">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              required
              disabled={isLoading}
              className="border-slate-600 bg-[#0a1628] text-white placeholder:text-slate-500"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-slate-300">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              required
              disabled={isLoading}
              className="border-slate-600 bg-[#0a1628] text-white placeholder:text-slate-500"
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-cyan-500 text-[#0a1628] hover:bg-cyan-400"
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="justify-center">
        <p className="text-sm text-slate-400">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-cyan-400 hover:underline">
            Sign up
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}
