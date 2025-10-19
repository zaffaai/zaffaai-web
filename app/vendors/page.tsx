'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'

type FormState = {
  businessName: string
  contactName: string
  email: string
  phone: string
  city: string
  category: string
  website: string
  instagram: string
  priceRange: string
  availabilityMonth: string
  notes: string
  // simple honeypot for bots
  company?: string
}

const CATEGORIES = [
  'Venue', 'Photographer', 'Videographer', 'Planner', 'Catering',
  'Band/DJ', 'Makeup', 'Florist', 'Decorator', 'Other',
]

const PRICE = ['$', '$$', '$$$', '$$$$']

export default function Vendors() {
  const router = useRouter()
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'error'>('idle')
  const [err, setErr] = useState<string | null>(null)

  const [form, setForm] = useState<FormState>({
    businessName: '', contactName: '', email: '', phone: '',
    city: '', category: '', website: '', instagram: '',
    priceRange: '', availabilityMonth: '', notes: '', company: ''
  })

  function set<K extends keyof FormState>(k: K, v: string) {
    setForm((f) => ({ ...f, [k]: v }))
  }

  const isValid = useMemo(() => {
    if (!form.businessName.trim()) return false
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return false
    return true
  }, [form.businessName, form.email])

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setErr(null)

    // honeypot: if a bot fills it, bail
    if (form.company) return

    if (!isValid) {
      setErr('Please add a valid business name and email.')
      return
    }

    setStatus('loading')
    try {
      const res = await fetch('/api/vendors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('failed')

      setStatus('ok')
      // Clear form before redirect so back nav doesn’t repopulate
      setForm({
        businessName: '', contactName: '', email: '', phone: '',
        city: '', category: '', website: '', instagram: '',
        priceRange: '', availabilityMonth: '', notes: '', company: ''
      })
      router.push('/success?vendor=1')
    } catch {
      setStatus('error')
      setErr('Something went wrong. Please try again.')
    }
  }

  return (
    <main className="min-h-screen bg-brand-cream text-brand-charcoal">
      {/* Header / pitch */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 bg-brand-red/10 blur-3xl animate-blob" />
        <div className="pointer-events-none absolute -bottom-20 -right-16 h-80 w-80 bg-rose/60 blur-3xl animate-blob" />
        <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-white/70 via-brand-cream to-brand-cream" />

        <div className="mx-auto max-w-3xl px-6 pt-14 pb-6">
          <h1 className="text-3xl font-semibold">Vendor pre-registration</h1>
            <p className="mt-2 text-gray-700">
              Be among the first vendors couples see when Zaffa AI launches in Egypt — UAE next.
              Early vendors get <strong>premium visibility</strong>, a clean profile, and
              <strong> pre-qualified leads</strong>.
            </p>

          <ul className="mt-4 text-sm text-gray-700">
            <li> Show your work & availability</li>
            <li> Get matched to couples by city, category, and budget</li>
            <li> Chat leads directly via your profile</li>
          </ul>
        </div>
      </section>

      {/* Form */}
      <section className="mx-auto max-w-3xl px-6 pb-14">
        <form
          onSubmit={submit}
          className="mt-4 rounded-2xl border bg-white p-6 shadow-lg transition hover:-translate-y-0.5"
          aria-label="Vendor pre-registration form"
        >
          {/* hidden honeypot */}
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            className="hidden"
            value={form.company}
            onChange={(e) => set('company', e.target.value)}
            aria-hidden="true"
          />

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium">Business name *</label>
              <input
                className="mt-1 w-full rounded-md border px-3 py-2"
                value={form.businessName}
                onChange={(e) => set('businessName', e.target.value)}
                required
                placeholder="e.g., Desert Bloom Decor"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Contact name</label>
              <input
                className="mt-1 w-full rounded-md border px-3 py-2"
                value={form.contactName}
                onChange={(e) => set('contactName', e.target.value)}
                placeholder="e.g., Mariam Hassan"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Email *</label>
              <input
                type="email"
                className="mt-1 w-full rounded-md border px-3 py-2"
                value={form.email}
                onChange={(e) => set('email', e.target.value)}
                required
                placeholder="you@business.com"
                inputMode="email"
                autoComplete="email"
              />
              <p className="mt-1 text-xs text-gray-500">We’ll send early-access details here.</p>
            </div>

            <div>
              <label className="block text-sm font-medium">Phone</label>
              <input
                className="mt-1 w-full rounded-md border px-3 py-2"
                value={form.phone}
                onChange={(e) => set('phone', e.target.value)}
                placeholder="+20 1X XXX XXXX"
                inputMode="tel"
                autoComplete="tel"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">City</label>
              <input
                className="mt-1 w-full rounded-md border px-3 py-2"
                value={form.city}
                onChange={(e) => set('city', e.target.value)}
                placeholder="e.g., Cairo"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Category</label>
              <select
                className="mt-1 w-full rounded-md border px-3 py-2"
                value={form.category}
                onChange={(e) => set('category', e.target.value)}
              >
                <option value="">Select…</option>
                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
              <p className="mt-1 text-xs text-gray-500">Choose the closest match.</p>
            </div>

            <div>
              <label className="block text-sm font-medium">Price range</label>
              <select
                className="mt-1 w-full rounded-md border px-3 py-2"
                value={form.priceRange}
                onChange={(e) => set('priceRange', e.target.value)}
              >
                <option value="">Select…</option>
                {PRICE.map((p) => <option key={p}>{p}</option>)}
              </select>
              <p className="mt-1 text-xs text-gray-500">$ = budget-friendly, $$$$ = premium</p>
            </div>

            <div>
              <label className="block text-sm font-medium">Website</label>
              <input
                className="mt-1 w-full rounded-md border px-3 py-2"
                value={form.website}
                onChange={(e) => set('website', e.target.value)}
                placeholder="https://…"
                inputMode="url"
                autoComplete="url"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Instagram</label>
              <input
                className="mt-1 w-full rounded-md border px-3 py-2"
                value={form.instagram}
                onChange={(e) => set('instagram', e.target.value)}
                placeholder="https://instagram.com/yourpage"
                inputMode="url"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Availability month</label>
              <input
                placeholder="e.g., Nov 2025"
                className="mt-1 w-full rounded-md border px-3 py-2"
                value={form.availabilityMonth}
                onChange={(e) => set('availabilityMonth', e.target.value)}
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-medium">Notes</label>
              <textarea
                rows={4}
                className="mt-1 w-full rounded-md border px-3 py-2"
                value={form.notes}
                onChange={(e) => set('notes', e.target.value)}
                placeholder="Tell us anything that helps us match you better."
              />
            </div>
          </div>

          {err && <p className="mt-4 text-sm text-red-600">{err}</p>}

          <button
            type="submit"
            disabled={status === 'loading'}
            className="mt-6 w-full rounded-md bg-brand-red px-4 py-2 text-white transition hover:brightness-110 disabled:opacity-60"
          >
            {status === 'loading' ? 'Submitting…' : 'Join the vendor network'}
          </button>

          {status === 'ok' && (
            <p className="mt-3 text-sm text-green-600">Thanks! We’ll reach out soon.</p>
          )}
          {status === 'error' && (
            <p className="mt-3 text-sm text-red-600">Something went wrong. Try again.</p>
          )}
          <p className="mt-3 text-xs text-gray-500">
            By submitting, you agree to receive early-access updates.
          </p>
        </form>
      </section>

      {/* Sticky bar on small screens */}
      <div className="fixed inset-x-0 bottom-0 z-20 bg-white/90 p-3 backdrop-blur md:hidden">
        <button
          onClick={(e) => {
            const formEl = document.querySelector('form')
            formEl?.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }}
          className="mx-auto block w-full max-w-md rounded-md bg-brand-red px-4 py-2 text-white"
        >
          Pre-register now
        </button>
      </div>
    </main>
  )
}
