import type { Post, Answer, User } from "@/types"

interface JsonLdProps {
  data: Record<string, unknown>
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

// Website schema for homepage
export function WebsiteJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "MoltbotCommunity",
    url: process.env.NEXT_PUBLIC_APP_URL || "https://moltbotcommunity.com",
    description: "The official community platform for Moltbot and Clawdbot users.",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${process.env.NEXT_PUBLIC_APP_URL || "https://moltbotcommunity.com"}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  }

  return <JsonLd data={data} />
}

// Organization schema
export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "MoltbotCommunity",
    url: process.env.NEXT_PUBLIC_APP_URL || "https://moltbotcommunity.com",
    logo: `${process.env.NEXT_PUBLIC_APP_URL || "https://moltbotcommunity.com"}/logo.png`,
    sameAs: [
      "https://github.com/moltbot",
      "https://twitter.com/moltbot",
    ],
  }

  return <JsonLd data={data} />
}

// Article schema for guides, fixes, etc.
interface ArticleJsonLdProps {
  title: string
  description: string
  author: User
  datePublished: string
  dateModified: string
  url: string
  image?: string
}

export function ArticleJsonLd({
  title,
  description,
  author,
  datePublished,
  dateModified,
  url,
  image,
}: ArticleJsonLdProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    author: {
      "@type": "Person",
      name: author.username,
      url: `${process.env.NEXT_PUBLIC_APP_URL}/profile/${author.username}`,
    },
    datePublished,
    dateModified,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    publisher: {
      "@type": "Organization",
      name: "MoltbotCommunity",
      logo: {
        "@type": "ImageObject",
        url: `${process.env.NEXT_PUBLIC_APP_URL}/logo.png`,
      },
    },
    ...(image && {
      image: {
        "@type": "ImageObject",
        url: image,
      },
    }),
  }

  return <JsonLd data={data} />
}

// HowTo schema for guides
interface HowToJsonLdProps {
  title: string
  description: string
  steps: Array<{ name: string; text: string }>
  totalTime?: string
}

export function HowToJsonLd({
  title,
  description,
  steps,
  totalTime,
}: HowToJsonLdProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: title,
    description,
    ...(totalTime && { totalTime }),
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
  }

  return <JsonLd data={data} />
}

// FAQ schema
interface FAQJsonLdProps {
  questions: Array<{ question: string; answer: string }>
}

export function FAQJsonLd({ questions }: FAQJsonLdProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.answer,
      },
    })),
  }

  return <JsonLd data={data} />
}

// QA Page schema for questions
interface QAPageJsonLdProps {
  question: Post
  answers: Array<Answer & { user: User }>
}

export function QAPageJsonLd({ question, answers }: QAPageJsonLdProps) {
  const acceptedAnswer = answers.find((a) => a.is_accepted)
  const suggestedAnswer = answers.length > 0 && !acceptedAnswer ? answers[0] : null

  const data = {
    "@context": "https://schema.org",
    "@type": "QAPage",
    mainEntity: {
      "@type": "Question",
      name: question.title,
      text: question.content,
      dateCreated: question.created_at,
      answerCount: answers.length,
      ...(acceptedAnswer && {
        acceptedAnswer: {
          "@type": "Answer",
          text: acceptedAnswer.content,
          dateCreated: acceptedAnswer.created_at,
          upvoteCount: acceptedAnswer.votes,
          author: {
            "@type": "Person",
            name: acceptedAnswer.user.username,
          },
        },
      }),
      ...(suggestedAnswer && {
        suggestedAnswer: {
          "@type": "Answer",
          text: suggestedAnswer.content,
          dateCreated: suggestedAnswer.created_at,
          upvoteCount: suggestedAnswer.votes,
          author: {
            "@type": "Person",
            name: suggestedAnswer.user.username,
          },
        },
      }),
    },
  }

  return <JsonLd data={data} />
}

// Breadcrumb schema
interface BreadcrumbJsonLdProps {
  items: Array<{ name: string; href: string }>
}

export function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${process.env.NEXT_PUBLIC_APP_URL}${item.href}`,
    })),
  }

  return <JsonLd data={data} />
}
