import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Providers } from "@/components/providers"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  title: {
    default: "MoltbotCommunity - Guides, Fixes & Q&A for Moltbot & Clawdbot",
    template: "%s | MoltbotCommunity",
  },
  description:
    "The official community platform for Moltbot and Clawdbot users. Find guides, troubleshooting fixes, FAQs, and get answers to your questions from the community.",
  keywords: [
    "moltbot",
    "clawdbot",
    "bot",
    "automation",
    "guides",
    "fixes",
    "community",
    "Q&A",
    "help",
  ],
  authors: [{ name: "MoltbotCommunity" }],
  creator: "MoltbotCommunity",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "MoltbotCommunity",
    title: "MoltbotCommunity - Guides, Fixes & Q&A",
    description:
      "The official community platform for Moltbot and Clawdbot users.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "MoltbotCommunity",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MoltbotCommunity",
    description:
      "The official community platform for Moltbot and Clawdbot users.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
