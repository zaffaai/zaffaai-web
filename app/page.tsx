'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Feature } from '@/components/Feature'

export default function Home() {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [role, setRole] = useState<'User' | 'Vendor' | 'Other'>('User')
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'error'>('idle')

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, fullName: name, role }),
      })
      if (!res.ok) throw new Error('failed')
      setStatus('ok')
      setEmail('')
      setName('')
      router.push('/success')
    } catch {
      setStatus('error')
    }
  }

  // screenshots (match files in /public/shots)
  const shots = [
    { src: '/shots/dashboard.png', label: 'Dashboard' },
    { src: '/shots/nour-chat.png', label: 'Nour — Chat' },
    { src: '/shots/vendors.png', label: 'Explore Vendors' },
    { src: '/shots/suggest-vendors.png', label: 'Suggest a Vendor' },
    { src: '/shots/wishes.png', label: 'Wishes & Wants' },
    { src: '/shots/guestlist.png', label: 'Guest List' },
    { src: '/shots/profile.png', label: 'Profile' },
    { src: '/shots/visionboard.png', label: 'Vision Board' },
    { src: '/shots/ask-nour.png', label: 'Ask Nour (prompt)' },
  ]
  const strip = [...shots, ...shots] // seamless loop

  return (
    <main className="min-h-screen bg-brand-cream text-brand-charcoal">
      {/* Top brand bar */}
      <section className="mx-auto max-w-6xl px-6 pt-8">
        <div className="flex items-center gap-3">
          {/* If your file is at public/zaffa-bouquet.png, use the leading slash */}
          <img src="/zaffa-bouquet.png" alt="Zaffa AI" className="h-10 w-10" />
        </div>
      </section>

      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* animated background blobs + bouquet watermark */}
        <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 bg-brand-red/10 blur-3xl animate-blob" />
        <div className="pointer-events-none absolute -bottom-20 -right-16 h-80 w-80 bg-rose/60 blur-3xl animate-blob" />
        <img
          src="/zaffa-bouquet.png"
          alt=""
          aria-hidden
          className="pointer-events-none absolute right-[-60px] top-10 h-52 opacity-10 animate-float"
        />
        <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-white/60 via-brand-cream to-brand-cream" />

        <div className="mx-auto max-w-6xl px-6 pt-12 pb-16 md:pt-16 md:pb-20">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div>
              <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
                Plan beautifully. Stress less.
              </h1>
              <p className="mt-4 text-lg text-gray-700">
                Vendor discovery, real budgets, RSVPs, and <strong>Nour</strong> — an AI copilot that
                speaks Arabic and understands local pricing.
              </p>
              <ul className="mt-6 space-y-2 text-gray-700">
                <li>• Vendor discovery tailored to Egypt & GCC</li>
                <li>• Guestlist & RSVP tools, budget tracker</li>
                <li>• Nour — your AI copilot for weddings</li>
              </ul>
            </div>

            <div className="relative">
              <div className="rounded-3xl border bg-white p-6 shadow-lg transition hover:-translate-y-0.5">
                <h2 className="text-xl font-semibold">Join the early list</h2>
                <p className="mt-1 text-sm text-gray-600">Be first to access the beta.</p>

                <form onSubmit={submit} className="mt-2" aria-label="Early access form">
                  <label className="mt-4 block text-sm font-medium">Full name</label>
                  <input
                    className="mt-1 w-full rounded-md border px-3 py-2"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your Full Name"
                  />

                  <label className="mt-4 block text-sm font-medium">Email</label>
                  <input
                    className="mt-1 w-full rounded-md border px-3 py-2"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                  />

                  <label className="mt-4 block text-sm font-medium">I am a</label>
                  <select
                    className="mt-1 w-full rounded-md border px-3 py-2"
                    value={role}
                    onChange={(e) => setRole(e.target.value as any)}
                  >
                    <option>User</option>
                    <option>Vendor</option>
                    <option>Other</option>
                  </select>

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="mt-6 w-full rounded-md bg-brand-red px-4 py-2 text-white transition hover:brightness-110 disabled:opacity-60"
                  >
                    {status === 'loading' ? 'Submitting…' : 'Get Early Access'}
                  </button>

                  {status === 'ok' && (
                    <p className="mt-3 text-sm text-green-600">Thanks! We’ll be in touch soon.</p>
                  )}
                  {status === 'error' && (
                    <p className="mt-3 text-sm text-red-600">Something went wrong. Try again.</p>
                  )}
                  <p className="mt-3 text-xs text-gray-500">
                    By joining, you agree to receive early access updates. No spam.
                  </p>
                </form>
              </div>

              {/* soft glow accents */}
              <div className="pointer-events-none absolute -left-12 -top-12 h-40 w-40 rounded-full bg-brand-red/10 blur-3xl" />
              <div className="pointer-events-none absolute -right-10 -bottom-10 h-40 w-40 rounded-full bg-red-200/40 blur-3xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-6 py-10 md:py-14">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="text-2xl font-semibold">Why Zaffa AI</h2>
          <span className="text-sm text-gray-600">Built in Egypt · Expanding to UAE</span>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Feature
            title="Smart Vendor Discovery"
            desc="Search by city, category, and budget. See transparent details and reviews you can trust."
          />
          <Feature
            title="Guestlist & RSVP"
            desc="Collect RSVPs, track plus-ones, and export lists for your venue or planner."
          />
          <Feature
            title="Budget Intelligence"
            desc="Plan with realistic costs for Egypt & GCC. Get suggestions to stay on track."
          />
          <Feature
            title="Nour — AI Assistant"
            desc="Chat in Arabic or English for recommendations, checklists, and local tips."
          />
          <Feature
            title="Team Planning"
            desc="Loop in your fiancé(e) or family without chaos. One source of truth."
          />
          <Feature
            title="For Vendors"
            desc="A clean profile, availability, and pre-qualified leads. Be discovered by the right couples."
          />
        </div>
      </section>

      {/* Animated product snapshots (marquee) */}
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <h2 className="text-2xl font-semibold">A peek inside Zaffa AI</h2>
        <p className="mt-1 text-gray-700">Dashboard, Nour chat, vendors, guest list, and more.</p>

        <div className="relative mt-6 overflow-hidden rounded-3xl border bg-white/70 shadow-card">
          {/* gradient edges */}
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-white to-transparent" />

          <div className="flex animate-marquee [width:200%] motion-reduce:animate-none">
            {strip.map((s, i) => (
              <figure
                key={i}
                className="mx-3 my-4 w-[360px] shrink-0 rounded-2xl border bg-white p-3 shadow-sm transition hover:scale-[1.01]"
              >
                <div className="overflow-hidden rounded-lg">
                  <img
                    src={s.src}
                    alt={s.label}
                    className="h-[220px] w-full rounded-lg object-cover"
                    loading={i < 4 ? 'eager' : 'lazy'}
                  />
                </div>
                <figcaption className="mt-2 text-sm text-gray-600">{s.label}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    
<section className="mx-auto max-w-6xl px-6 pb-16">
  <div className="mb-6 flex items-end justify-between">
    <h2 className="text-2xl font-semibold">FAQ</h2>
    <a href="/faq" className="text-sm text-brand-red hover:underline">See all →</a>
  </div>

  <div className="grid gap-4 md:grid-cols-3">
    <div className="rounded-2xl border bg-white p-5 shadow-sm">
      <h3 className="text-sm font-semibold">Is Nour bilingual?</h3>
      <p className="mt-1 text-sm text-gray-600">
        Yes — Nour chats in Arabic or English and tailors answers to local context.
      </p>
    </div>
    <div className="rounded-2xl border bg-white p-5 shadow-sm">
      <h3 className="text-sm font-semibold">When does Zaffa launch?</h3>
      <p className="mt-1 text-sm text-gray-600">
        Early access invites go out monthly starting in Egypt, then the UAE.
      </p>
    </div>
    <div className="rounded-2xl border bg-white p-5 shadow-sm">
      <h3 className="text-sm font-semibold">What do vendors get?</h3>
      <p className="mt-1 text-sm text-gray-600">
        A clean profile, discovery in searches, and pre-qualified leads.
      </p>
    </div>
  </div>
</section>


      {/* Vendor CTA */}
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="rounded-3xl bg-white p-8 shadow-sm md:p-12">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <h2 className="text-2xl font-semibold">Vendors: get in early</h2>
              <p className="mt-1 text-gray-700">
                Claim your profile and be discovered by the right couples when we launch in Egypt and the UAE.
              </p>
            </div>
            <a
              href="/vendors"
              className="inline-flex items-center rounded-lg bg-brand-red px-5 py-2.5 text-white"
            >
              Pre-register your business
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
