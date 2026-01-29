import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Disclaimer",
  description: "Disclaimer for MoltbotCommunity - Important notices about the information on our platform.",
}

export default function DisclaimerPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-8 text-4xl font-bold">Disclaimer</h1>

      <div className="prose prose-lg max-w-none dark:prose-invert">
        <p className="lead">
          Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
        </p>

        <h2>General Information</h2>
        <p>
          The information provided on MoltbotCommunity is for general informational purposes only. While we strive to keep the information up to date and accurate, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the information, products, services, or related graphics contained on the platform.
        </p>

        <h2>User-Generated Content</h2>
        <p>
          MoltbotCommunity is a community-driven platform. The guides, fixes, answers, and other content are contributed by community members. We do not verify or endorse all user-generated content. Use any information at your own discretion and risk.
        </p>

        <h2>No Professional Advice</h2>
        <p>
          The content on this platform does not constitute professional advice. For specific technical issues or concerns, please consult official documentation or qualified professionals.
        </p>

        <h2>Third-Party Links</h2>
        <p>
          Our platform may contain links to external websites. We have no control over the content and nature of these sites and are not responsible for their content or privacy practices.
        </p>

        <h2>Affiliation Disclaimer</h2>
        <p>
          MoltbotCommunity is a community platform created by and for users of Moltbot and Clawdbot. Unless explicitly stated otherwise, we are not officially affiliated with the creators or developers of these products.
        </p>

        <h2>Use at Your Own Risk</h2>
        <p>
          Any reliance you place on information from this platform is strictly at your own risk. We will not be liable for any loss or damage arising from the use of information provided on this platform.
        </p>

        <h2>Changes</h2>
        <p>
          We reserve the right to modify this disclaimer at any time without notice. It is your responsibility to check this page periodically for changes.
        </p>
      </div>
    </div>
  )
}
