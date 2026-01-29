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

export default function SignupPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = React.useState(false)

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)

    const formData = new FormData(event.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const username = formData.get("username") as string

    // Validate username
    if (!/^[a-zA-Z0-9_]{3,20}$/.test(username)) {
      toast({
        title: "Invalid username",
        description: "Username must be 3-20 characters and contain only letters, numbers, and underscores.",
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    const supabase = createClient()

    // Check if username is taken
    const { data: existingUser } = await supabase
      .from("users")
      .select("username")
      .eq("username", username)
      .single()

    if (existingUser) {
      toast({
        title: "Username taken",
        description: "This username is already in use. Please choose another.",
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    // Sign up without email confirmation
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
        },
        emailRedirectTo: undefined, // No email confirmation
      },
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

    // Auto sign in after signup
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (signInError) {
      toast({
        title: "Account created!",
        description: "Please sign in with your new account.",
      })
      router.push("/login")
      return
    }

    toast({
      title: "Welcome to MoltbotCommunity!",
      description: "Your account has been created successfully.",
    })

    router.push("/")
    router.refresh()
  }

  return (
    <Card className="w-full max-w-md border-slate-700 bg-[#0d1f35]">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl text-white">Create an account</CardTitle>
        <CardDescription className="text-slate-400">
          Join the MoltbotCommunity today
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username" className="text-slate-300">Username</Label>
            <Input
              id="username"
              name="username"
              type="text"
              placeholder="johndoe"
              required
              disabled={isLoading}
              pattern="^[a-zA-Z0-9_]{3,20}$"
              className="border-slate-600 bg-[#0a1628] text-white placeholder:text-slate-500"
            />
            <p className="text-xs text-slate-500">
              3-20 characters, letters, numbers, and underscores only
            </p>
          </div>
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
              placeholder="Create a password"
              required
              disabled={isLoading}
              minLength={8}
              className="border-slate-600 bg-[#0a1628] text-white placeholder:text-slate-500"
            />
            <p className="text-xs text-slate-500">
              Must be at least 8 characters
            </p>
          </div>
          <Button
            type="submit"
            className="w-full bg-cyan-500 text-[#0a1628] hover:bg-cyan-400"
            disabled={isLoading}
          >
            {isLoading ? "Creating account..." : "Create account"}
          </Button>
        </form>

        <p className="mt-4 text-center text-xs text-slate-500">
          By signing up, you agree to our{" "}
          <Link href="/terms" className="text-cyan-400 hover:underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="text-cyan-400 hover:underline">
            Privacy Policy
          </Link>
          .
        </p>
      </CardContent>
      <CardFooter className="justify-center">
        <p className="text-sm text-slate-400">
          Already have an account?{" "}
          <Link href="/login" className="text-cyan-400 hover:underline">
            Sign in
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}
