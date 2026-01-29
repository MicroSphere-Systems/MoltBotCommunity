import Link from "next/link"
import { Github, Twitter, MessageCircle } from "lucide-react"

const footerLinks = {
  product: [
    { name: "Guides", href: "/guides" },
    { name: "Fixes", href: "/fix" },
    { name: "FAQ", href: "/faq" },
    { name: "Questions", href: "/questions" },
  ],
  resources: [
    { name: "ClawdBot", href: "/clawdbot" },
    { name: "API Docs", href: "/docs/api" },
    { name: "Changelog", href: "/changelog" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Disclaimer", href: "/disclaimer" },
  ],
}

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <span className="text-lg font-bold text-primary-foreground">M</span>
              </div>
              <span className="font-bold">
                <span className="brand-gradient-text">Moltbot</span>
                <span className="text-muted-foreground">Community</span>
              </span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              The official community platform for Moltbot and Clawdbot users. Get help, share knowledge, and connect with other users.
            </p>
            <div className="mt-4 flex gap-4">
              <Link
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                href="https://discord.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground"
              >
                <MessageCircle className="h-5 w-5" />
                <span className="sr-only">Discord</span>
              </Link>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-sm font-semibold">Product</h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="text-sm font-semibold">Resources</h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-sm font-semibold">Legal</h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t pt-8">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} MoltbotCommunity. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
