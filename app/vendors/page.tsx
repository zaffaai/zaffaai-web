'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
// 1. Import motion and Easing
import { motion, Easing } from 'framer-motion' 

// --- ANIMATION CONFIGURATION ---
// Re-use the smooth easing curve
const easeOutCubic = [0, 0.55, 0.45, 1] as Easing; 

// Variants for the main container (to stagger the children, like the header text)
const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easeOutCubic,
      staggerChildren: 0.08, // Subtle stagger for form groups/text
    },
  },
}

// Variants for individual elements (text, form fields)
const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.4, 
      ease: easeOutCubic
    } 
  },
}
// -------------------------------


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
      // Assuming you created the API route at /api/vendors
      // In a real application, this fetch call would be used
      // const res = await fetch('/api/vendors', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(form),
      // })
      // if (!res.ok) throw new Error('failed')

      // SIMULATE API CALL
      await new Promise(resolve => setTimeout(resolve, 1000));

      setStatus('ok')
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
    <motion.main
      // Apply the main animation to the whole page content
      variants={sectionVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-brand-cream text-brand-charcoal"
    >
      {/* Header / pitch */}
      <section className="relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 bg-brand-red/10 blur-3xl opacity-50 animate-blob" />
        <div className="pointer-events-none absolute -bottom-20 -right-16 h-80 w-80 bg-rose-300/60 blur-3xl opacity-50 animate-blob" style={{ animationDelay: '-6s' }} />
        <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-white/70 via-brand-cream to-brand-cream" />

        <div className="mx-auto max-w-3xl px-6 pt-14 pb-6">
          {/* Animated Header Text */}
          <motion.h1 variants={itemVariants} className="text-3xl font-semibold">
            Vendor pre-registration
          </motion.h1>
          <motion.p variants={itemVariants} className="mt-2 text-gray-700">
            Be among the first vendors couples see when Zaffa AI launches in Egypt — UAE next.
            Early vendors get <strong className="text-brand-red">premium visibility</strong>, a clean profile, and
            <strong className="text-brand-red"> pre-qualified leads</strong>.
          </motion.p>

          {/* Animated list of benefits */}
          <motion.ul variants={itemVariants} className="mt-4 text-sm text-gray-700 list-disc pl-5">
            <li> Show your work & availability</li>
            <li> Get matched to couples by city, category, and budget</li>
            <li> Chat leads directly via your profile</li>
          </motion.ul>
        </div>
      </section>

      {/* Form Section */}
      <section className="mx-auto max-w-3xl px-6 pb-14">
        {/* 💥 IMPROVEMENT: Form Wrapper with Interactive Hover */}
        <motion.form
          onSubmit={submit}
          whileHover={{ y: -5, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)' }} 
          transition={{ type: "spring", stiffness: 300 }}
          className="mt-4 rounded-3xl border bg-white p-6 shadow-xl"
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

          {/* Form Fields - Each field group is wrapped in a motion.div */}
          <div className="grid gap-5 sm:grid-cols-2">
            
            {/* Business Name */}
            <motion.div variants={itemVariants} className="sm:col-span-2">
              <label className="block text-sm font-medium">Business name *</label>
              <input
                className="mt-1 w-full rounded-md border px-3 py-2 focus:border-brand-red focus:ring-brand-red"
                value={form.businessName}
                onChange={(e) => set('businessName', e.target.value)}
                required
                placeholder="e.g., Desert Bloom Decor"
              />
            </motion.div>

            {/* Contact Name */}
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium">Contact name</label>
              <input
                className="mt-1 w-full rounded-md border px-3 py-2 focus:border-brand-red focus:ring-brand-red"
                value={form.contactName}
                onChange={(e) => set('contactName', e.target.value)}
                placeholder="e.g., Mariam Hassan"
              />
            </motion.div>

            {/* Email */}
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium">Email *</label>
              <input
                type="email"
                className="mt-1 w-full rounded-md border px-3 py-2 focus:border-brand-red focus:ring-brand-red"
                value={form.email}
                onChange={(e) => set('email', e.target.value)}
                required
                placeholder="you@business.com"
                inputMode="email"
                autoComplete="email"
              />
              <p className="mt-1 text-xs text-gray-500">We’ll send early-access details here.</p>
            </motion.div>

            {/* Phone */}
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium">Phone</label>
              <input
                className="mt-1 w-full rounded-md border px-3 py-2 focus:border-brand-red focus:ring-brand-red"
                value={form.phone}
                onChange={(e) => set('phone', e.target.value)}
                placeholder="+20 1X XXX XXXX"
                inputMode="tel"
                autoComplete="tel"
              />
            </motion.div>

            {/* City */}
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium">City</label>
              <input
                className="mt-1 w-full rounded-md border px-3 py-2 focus:border-brand-red focus:ring-brand-red"
                value={form.city}
                onChange={(e) => set('city', e.target.value)}
                placeholder="e.g., Cairo"
              />
            </motion.div>

            {/* Category */}
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium">Category</label>
              <select
                className="mt-1 w-full rounded-md border px-3 py-2 focus:border-brand-red focus:ring-brand-red"
                value={form.category}
                onChange={(e) => set('category', e.target.value)}
              >
                <option value="">Select…</option>
                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
              <p className="mt-1 text-xs text-gray-500">Choose the closest match.</p>
            </motion.div>

            {/* Price range */}
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium">Price range</label>
              <select
                className="mt-1 w-full rounded-md border px-3 py-2 focus:border-brand-red focus:ring-brand-red"
                value={form.priceRange}
                onChange={(e) => set('priceRange', e.target.value)}
              >
                <option value="">Select…</option>
                {PRICE.map((p) => <option key={p}>{p}</option>)}
              </select>
              <p className="mt-1 text-xs text-gray-500">$ = budget-friendly, $$$$ = premium</p>
            </motion.div>

            {/* Website */}
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium">Website</label>
              <input
                className="mt-1 w-full rounded-md border px-3 py-2 focus:border-brand-red focus:ring-brand-red"
                value={form.website}
                onChange={(e) => set('website', e.target.value)}
                placeholder="https://…"
                inputMode="url"
                autoComplete="url"
              />
            </motion.div>

            {/* Instagram */}
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium">Instagram</label>
              <input
                className="mt-1 w-full rounded-md border px-3 py-2 focus:border-brand-red focus:ring-brand-red"
                value={form.instagram}
                onChange={(e) => set('instagram', e.target.value)}
                placeholder="https://instagram.com/yourpage"
                inputMode="url"
              />
            </motion.div>

            {/* Availability month */}
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium">Availability month</label>
              <input
                placeholder="e.g., Nov 2025"
                className="mt-1 w-full rounded-md border px-3 py-2 focus:border-brand-red focus:ring-brand-red"
                value={form.availabilityMonth}
                onChange={(e) => set('availabilityMonth', e.target.value)}
              />
            </motion.div>

            {/* Notes (Full Width) */}
            <motion.div variants={itemVariants} className="sm:col-span-2">
              <label className="block text-sm font-medium">Notes</label>
              <textarea
                rows={4}
                className="mt-1 w-full rounded-md border px-3 py-2 focus:border-brand-red focus:ring-brand-red"
                value={form.notes}
                onChange={(e) => set('notes', e.target.value)}
                placeholder="Tell us anything that helps us match you better."
              />
            </motion.div>
          </div>

          {err && <p className="mt-4 text-sm text-red-600">{err}</p>}

          {/* 💥 IMPROVEMENT: Button with Micro-Animation */}
          <motion.button
            type="submit"
            disabled={status === 'loading'}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-6 w-full rounded-md bg-brand-red px-4 py-3 text-white font-semibold transition hover:brightness-110 disabled:opacity-60"
          >
            {status === 'loading' ? 'Submitting…' : 'Join the vendor network'}
          </motion.button>

          {status === 'ok' && (
            <p className="mt-3 text-sm text-green-600">Thanks! We’ll reach out soon.</p>
          )}
          {status === 'error' && (
            <p className="mt-3 text-sm text-red-600">Something went wrong. Try again.</p>
          )}
          <p className="mt-3 text-xs text-gray-500">
            By submitting, you agree to receive early-access updates.
          </p>
        </motion.form>
      </section>

      {/* Sticky bar on small screens (also animated) */}
      <motion.div 
        variants={itemVariants}
        className="fixed inset-x-0 bottom-0 z-20 bg-white/90 p-3 backdrop-blur md:hidden"
      >
        <motion.button
          onClick={() => { // Removed the unused 'e' event object
            const formEl = document.querySelector('form')
            formEl?.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }}
          // Interactive button
          whileTap={{ scale: 0.98 }}
          className="mx-auto block w-full max-w-md rounded-md bg-brand-red px-4 py-2 text-white"
        >
          Pre-register now
        </motion.button>
      </motion.div>
    </motion.main>
  )
}
