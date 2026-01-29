import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of Service for MoltbotCommunity - The rules and guidelines for using our platform.",
}

export default function TermsPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-8 text-4xl font-bold">Terms of Service</h1>

      <div className="prose prose-lg max-w-none dark:prose-invert">
        <p className="lead">
          Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
        </p>

        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing and using MoltbotCommunity, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our platform.
        </p>

        <h2>2. Description of Service</h2>
        <p>
          MoltbotCommunity is a community platform for Moltbot and Clawdbot users to share knowledge, ask questions, and help each other. We provide guides, troubleshooting resources, and a Q&A forum.
        </p>

        <h2>3. User Accounts</h2>
        <p>To participate fully in the community, you must:</p>
        <ul>
          <li>Create an account with accurate information</li>
          <li>Maintain the security of your account credentials</li>
          <li>Be at least 13 years of age</li>
          <li>Accept responsibility for all activities under your account</li>
        </ul>

        <h2>4. User Content</h2>
        <p>
          By posting content on MoltbotCommunity, you grant us a non-exclusive, royalty-free license to use, display, and distribute your content on our platform. You retain ownership of your content.
        </p>

        <h2>5. Prohibited Conduct</h2>
        <p>You agree not to:</p>
        <ul>
          <li>Post spam, malware, or malicious content</li>
          <li>Harass, threaten, or abuse other users</li>
          <li>Impersonate others or provide false information</li>
          <li>Violate any applicable laws or regulations</li>
          <li>Attempt to gain unauthorized access to the platform</li>
          <li>Use the platform for commercial advertising without permission</li>
        </ul>

        <h2>6. Content Moderation</h2>
        <p>
          We reserve the right to remove any content that violates these terms or is deemed inappropriate. Repeat violations may result in account suspension or termination.
        </p>

        <h2>7. Intellectual Property</h2>
        <p>
          The MoltbotCommunity platform, including its design, features, and content created by us, is protected by copyright and other intellectual property laws.
        </p>

        <h2>8. Disclaimer of Warranties</h2>
        <p>
          The platform is provided &quot;as is&quot; without warranties of any kind. We do not guarantee the accuracy or completeness of any information on the platform.
        </p>

        <h2>9. Limitation of Liability</h2>
        <p>
          MoltbotCommunity shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the platform.
        </p>

        <h2>10. Changes to Terms</h2>
        <p>
          We may modify these terms at any time. Continued use of the platform after changes constitutes acceptance of the modified terms.
        </p>

        <h2>11. Contact</h2>
        <p>
          If you have questions about these Terms of Service, please contact us through the community platform.
        </p>
      </div>
    </div>
  )
}
