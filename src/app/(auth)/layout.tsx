import Link from "next/link"
import Image from "next/image"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#0a1628] p-4">
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-[100px]" />
      </div>

      <div className="relative z-10 mb-8">
        <Link href="/" className="flex flex-col items-center gap-4">
          {/* Logo */}
          <div className="relative h-20 w-20 overflow-hidden rounded-2xl border-2 border-cyan-500/30 bg-[#0d1f35]">
            <Image
              src="/logo.png"
              alt="MoltBot Logo"
              fill
              className="object-contain p-2"
            />
          </div>
          <div className="text-center">
            <span className="text-2xl font-bold text-cyan-400">Moltbot</span>
            <span className="text-2xl font-bold text-orange-400">Community</span>
          </div>
        </Link>
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  )
}
