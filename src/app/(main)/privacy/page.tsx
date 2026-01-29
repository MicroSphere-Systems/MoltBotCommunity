import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for MoltbotCommunity - Learn how we collect, use, and protect your data.",
}

export default function PrivacyPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-8 text-4xl font-bold">Privacy Policy</h1>

      <div className="prose prose-lg max-w-none dark:prose-invert">
        <p className="lead">
          Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
        </p>

        <h2>1. Information We Collect</h2>
        <p>
          When you use MoltbotCommunity, we collect certain information to provide and improve our services:
        </p>
        <ul>
          <li><strong>Account Information:</strong> Email address, username, and profile information you provide.</li>
          <li><strong>Content:</strong> Questions, answers, comments, and other content you submit.</li>
          <li><strong>Usage Data:</strong> Information about how you interact with our platform.</li>
        </ul>

        <h2>2. How We Use Your Information</h2>
        <p>We use the information we collect to:</p>
        <ul>
          <li>Provide, maintain, and improve our services</li>
          <li>Process your requests and respond to your inquiries</li>
          <li>Send you technical notices and support messages</li>
          <li>Protect against malicious or unauthorized activity</li>
        </ul>

        <h2>3. Information Sharing</h2>
        <p>
          We do not sell your personal information. We may share information only in the following circumstances:
        </p>
        <ul>
          <li>With your consent</li>
          <li>To comply with legal obligations</li>
          <li>To protect our rights and prevent fraud</li>
        </ul>

        <h2>4. Data Security</h2>
        <p>
          We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
        </p>

        <h2>5. Your Rights</h2>
        <p>You have the right to:</p>
        <ul>
          <li>Access your personal data</li>
          <li>Correct inaccurate data</li>
          <li>Request deletion of your data</li>
          <li>Object to processing of your data</li>
        </ul>

        <h2>6. Cookies</h2>
        <p>
          We use cookies and similar technologies to maintain your session, remember your preferences, and analyze how our platform is used.
        </p>

        <h2>7. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page.
        </p>

        <h2>8. Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us through the community platform.
        </p>
      </div>
    </div>
  )
}
