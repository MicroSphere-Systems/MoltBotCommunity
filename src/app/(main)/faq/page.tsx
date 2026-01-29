import { Suspense } from "react"
import type { Metadata } from "next"
import { HelpCircle } from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Skeleton } from "@/components/ui/skeleton"

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions about Moltbot and Clawdbot. Find quick answers to common questions.",
  openGraph: {
    title: "FAQ | MoltbotCommunity",
    description: "Frequently asked questions about Moltbot and Clawdbot.",
  },
}

async function FAQContent() {
  const supabase = await createClient()

  const { data } = await supabase
    .from("posts")
    .select("id, title, content")
    .eq("type", "faq")
    .eq("status", "published")
    .order("created_at", { ascending: true })

  const faqs = (data || []) as Array<{ id: string; title: string; content: string }>

  if (faqs.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-lg text-muted-foreground">No FAQs available yet.</p>
      </div>
    )
  }

  return (
    <Accordion type="single" collapsible className="w-full">
      {faqs.map((faq, index) => (
        <AccordionItem key={faq.id} value={`item-${index}`}>
          <AccordionTrigger className="text-left text-lg">
            {faq.title}
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground">
            <div dangerouslySetInnerHTML={{ __html: faq.content.replace(/\n/g, '<br/>') }} />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

function FAQSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="border-b py-4">
          <Skeleton className="h-6 w-3/4" />
        </div>
      ))}
    </div>
  )
}

export default function FAQPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-500/10">
            <HelpCircle className="h-6 w-6 text-green-500" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Frequently Asked Questions</h1>
            <p className="text-muted-foreground">
              Quick answers to common questions about Moltbot and Clawdbot
            </p>
          </div>
        </div>
      </div>

      {/* FAQ Accordion */}
      <Suspense fallback={<FAQSkeleton />}>
        <FAQContent />
      </Suspense>

      {/* More Help Section */}
      <div className="mt-12 rounded-lg border bg-muted/30 p-6 text-center">
        <h2 className="mb-2 text-xl font-semibold">Still have questions?</h2>
        <p className="mb-4 text-muted-foreground">
          Can&apos;t find what you&apos;re looking for? Ask the community!
        </p>
        <a
          href="/questions/ask"
          className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          Ask a Question
        </a>
      </div>
    </div>
  )
}
