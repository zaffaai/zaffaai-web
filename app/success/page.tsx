'use client'

import { useMemo } from 'react'
import { useSearchParams } from 'next/navigation'

export default function Success() {
  const qp = useSearchParams()
  const isVendor = qp.get('vendor') === '1'

  // build share links (uses current origin)
  const { url, text } = useMemo(() => {
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://zaffa.ai'
    const landing = `${origin}/?utm_source=share&utm_medium=success`
    const copy = isVendor
      ? 'Vendors: check out Zaffa AI — a new way to meet engaged couples in Egypt & the UAE.'
      : 'I just joined the Zaffa AI early access — a smart copilot for wedding planning in Egypt & the UAE.'
    return { url: landing, text: copy }
  }, [isVendor])

  const share = {
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    x: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
    whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(`${text} ${url}`)}`,
  }

  return (
    <main className="relative mx-auto max-w-xl px-6 py-24 text-center">
      {/* simple confetti */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        {Array.from({ length: 30 }).map((_, i) => (
          <span
            key={i}
            className="absolute inline-block h-2 w-2 animate-[confetti_2.2s_linear_infinite] rounded-[1px]"
            style={{
              left: `${(i * 7) % 100}%`,
              top: '-10px',
              background:
                ['#C41D1D', '#FDE2E2', '#111827', '#F59E0B', '#10B981'][i % 5],
              animationDelay: `${(i % 10) * 0.15}s`,
              transform: `rotate(${(i % 8) * 12}deg)`,
            }}
          />
        ))}
      </div>
      <style jsx global>{`
        @keyframes confetti {
          0% { transform: translateY(-20px) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          100% { transform: translateY(110vh) rotate(360deg); opacity: 0; }
        }
      `}</style>

      <h1 className="text-3xl font-semibold">
        {isVendor ? 'Welcome to the vendor network 🎉' : 'You’re on the list 🎉'}
      </h1>
      <p className="mt-3 text-gray-600">
        {isVendor
          ? 'Thanks for pre-registering. We’ll reach out with next steps and early access details.'
          : 'We’ll reach out with early access details soon. Want to help us launch faster? Share Zaffa with friends 💌'}
      </p>

      <div className="mt-7 grid gap-3 sm:grid-cols-3">
        <a className="rounded-md border px-4 py-2 hover:bg-white" href={share.linkedin} target="_blank">Share on LinkedIn</a>
        <a className="rounded-md border px-4 py-2 hover:bg-white" href={share.x} target="_blank">Share on X</a>
        <a className="rounded-md border px-4 py-2 hover:bg-white" href={share.whatsapp} target="_blank">Share on WhatsApp</a>
      </div>

      <div className="mt-8 flex flex-col items-center gap-3">
        {isVendor ? (
          <a href="/" className="rounded-md bg-brand-red px-5 py-2.5 text-white">Back to homepage</a>
        ) : (
          <a href="/vendors" className="rounded-md bg-brand-red px-5 py-2.5 text-white">
            Are you a vendor? Join the network
          </a>
        )}
        <a href="/" className="text-sm text-brand-red underline">Return to homepage</a>
      </div>
    </main>
  )
}
