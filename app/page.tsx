'use client'

import { useMemo, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence, Variants } from 'framer-motion'

// --- TYPE DEFINITIONS ---
type FormState = {
  fullName: string
  email: string
  role: 'User' | 'Vendor' | ''
  // simple honeypot for bots
  company?: string
}

// --- ANIMATION CONFIGURATION ---
const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
}

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
    },
  },
}

// --- INLINE SVG ICON COMPONENTS ---
const IconWrapper = ({ children, className }: { children: React.ReactNode, className?: string }) => (
    <div className={`h-6 w-6 text-brand-red mb-2 ${className}`}>
        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
            {children}
        </svg>
    </div>
);

// 1. Map Pin (Smart Vendor Discovery)
const IconMapPin = () => (
    <IconWrapper>
        <path d="M12 10.5a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3z"></path>
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"></path>
    </IconWrapper>
);

// 2. Lightbulb (Nour — AI Assistant)
const IconLightbulb = () => (
    <IconWrapper>
        <path d="M15 14c.2-.9.7-1.7 1.4-2.2.7-.5 1.7-1 2.2-1.4"></path>
        <path d="M15 21c-1.8 0-3.6-.8-4.9-2.1-1.3-1.3-2.1-3.1-2.1-4.9"></path>
        <path d="M9 3v2"></path>
        <path d="M15 3v2"></path>
        <path d="M12 3a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"></path>
        <path d="M12 18h.01"></path>
    </IconWrapper>
);

// 3. Mail (Guestlist & RSVP)
const IconMail = () => (
    <IconWrapper>
        <rect width="20" height="16" x="2" y="4" rx="2"></rect>
        <path d="m22 7-10 7L2 7"></path>
    </IconWrapper>
);

// 4. DollarSign (Budget Intelligence)
const IconDollarSign = () => (
    <IconWrapper>
        <line x1="12" x2="12" y1="2" y2="22"></line>
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
    </IconWrapper>
);

// 5. Users (Team Planning)
const IconUsers = () => (
    <IconWrapper>
        <path d="M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2"></path>
        <circle cx="9.5" cy="7" r="4"></circle>
        <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    </IconWrapper>
);

// 6. Briefcase (For Vendors)
const IconBriefcase = () => (
    <IconWrapper>
        <rect width="20" height="14" x="2" y="7" rx="2" ry="2"></rect>
        <path d="M16 21V5a2 2 0 0 0-2-2H10a2 2 0 0 0-2 2v16"></path>
    </IconWrapper>
);
// --- END SVG COMPONENTS ---

// Image strip data
const strip = [
  { src: '/shots/guestlist.png', label: 'Guestlist Management' },
  { src: '/shots/suggest-vendors.png', label: 'Vendor Discovery' },
  { src: '/shots/dashboard.png', label: 'Dashboard Overview' },
  { src: '/shots/nour-chat.png', label: 'AI Chat Assistant (Nour)' },
  { src: '/shots/profile.png', label: 'Vendor Profile' },
  // Duplicate the items to ensure seamless infinite scroll
  { src: '/shots/guestlist.png', label: 'Guestlist Management' },
  { src: '/shots/suggest-vendors.png', label: 'Vendor Discovery' },
  { src: '/shots/dashboard.png', label: 'Dashboard Overview' },
  { src: '/shots/nour-chat.png', label: 'AI Chat Assistant (Nour)' },
  { src: '/shots/profile.png', label: 'Vendor Profile' },
]

const Marquee = () => (
  // The marquee animation uses Tailwind keyframes defined in tailwind.config.js (assumed available)
  <div className="overflow-hidden py-10">
    <div className="flex animate-marquee [width:200%] motion-reduce:animate-none">
      {strip.map((s, i) => (
        <motion.figure
          key={i}
          // Micro-interaction: Lift and shadow on figure hover
          whileHover={{ scale: 1.02, boxShadow: '0 15px 25px -5px rgba(0, 0, 0, 0.15)' }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          className="mx-3 my-4 w-[360px] shrink-0 rounded-2xl border bg-white p-3 shadow-md group"
        >
          <div className="overflow-hidden rounded-lg">
            {/* Carousel Enhancement: Subtle zoom on image inside */}
            <motion.img
              src={s.src}
              alt={s.label}
              className="h-[220px] w-full rounded-lg object-cover transition duration-300 group-hover:scale-[1.03]"
              // Use placeholder image if actual assets are not available
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null; 
                // Fallback to placeholder image with label
                target.src = `https://placehold.co/360x220/E8DED1/5D554D?text=${encodeURIComponent(s.label.replace(/\s/g, '+'))}`;
              }}
              loading={i < 4 ? 'eager' : 'lazy'}
            />
          </div>
          {/* 💥 UPDATED: Made carousel captions bolder and slightly larger */}
          <figcaption className="mt-2 text-base font-bold text-gray-800">{s.label}</figcaption>
        </motion.figure>
      ))}
    </div>
  </div>
)

const features = [
  {
    title: 'Smart Vendor Discovery',
    description: 'Search by city, category, and budget. See transparent details and reviews you can trust, powered by **Supabase** for reliability.',
    icon: IconMapPin,
  },
  {
    title: 'Nour — AI Assistant',
    description: 'Chat in Arabic or English for recommendations, checklists, and local tips, powered by **ChatGPT/LLMs** to provide smart, context-aware advice.',
    icon: IconLightbulb,
  },
  {
    title: 'Guestlist & RSVP',
    description: 'Collect RSVPs, track plus-ones, and export lists for your venue or planner.',
    icon: IconMail,
  },
  {
    title: 'Budget Intelligence',
    description: 'Plan with realistic costs for Egypt & GCC. Get suggestions to stay on track.',
    icon: IconDollarSign,
  },
  {
    title: 'Team Planning',
    description: 'Loop in your fiancé(e) or family without chaos. One source of truth.',
    icon: IconUsers,
  },
  {
    title: 'For Vendors',
    description: 'A clean profile, availability, and pre-qualified leads. Be discovered by the right couples.',
    icon: IconBriefcase,
    link: '/vendors',
  },
]

// 💥 FIX: Moved SignupCard definition outside of the main component
// to ensure component stability and prevent state loss on re-render/focus events.
const SignupCard = ({ form, status, isValid, set, submit }: {
  form: FormState,
  status: 'idle' | 'loading' | 'ok' | 'error',
  isValid: boolean,
  set: (k: keyof FormState, v: string) => void,
  submit: (e: React.FormEvent | null) => Promise<void>
}) => (
  <motion.div
    variants={item}
    className="w-full rounded-3xl bg-white p-8 shadow-xl border border-gray-100"
  >
    <h2 className="text-xl font-semibold">Join the early list</h2>
    <p className="mt-1 text-sm text-gray-600">Be first to access the beta.</p>
    
    <form onSubmit={submit} className="mt-4 space-y-4">
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

      <div>
        <label htmlFor="fullName" className="sr-only">Full Name</label>
        <input
          id="fullName"
          className="w-full rounded-lg border px-4 py-3 focus:ring-brand-red focus:border-brand-red"
          value={form.fullName}
          onChange={(e) => set('fullName', e.target.value)}
          required
          placeholder="Full Name"
        />
      </div>

      <div>
        <label htmlFor="email" className="sr-only">Email</label>
        <input
          id="email"
          type="email"
          className="w-full rounded-lg border px-4 py-3 focus:ring-brand-red focus:border-brand-red"
          value={form.email}
          onChange={(e) => set('email', e.target.value)}
          required
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label htmlFor="role" className="text-sm font-medium text-gray-700">I am a</label>
        <select
          id="role"
          className="mt-1 w-full rounded-lg border px-4 py-3 appearance-none bg-white focus:ring-brand-red focus:border-brand-red"
          value={form.role}
          onChange={(e) => set('role', e.target.value)}
        >
          <option value="User">User (Planning my wedding)</option>
          <option value="Vendor">Vendor (Looking to register)</option>
        </select>
      </div>

      <motion.button
        type="submit"
        disabled={!isValid || status === 'loading'}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full rounded-lg bg-brand-red px-6 py-3 font-semibold text-white transition hover:brightness-110 disabled:opacity-60"
      >
        <AnimatePresence mode="wait">
          {status === 'loading' ? (
            <motion.span key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              Getting Access...
            </motion.span>
          ) : (
            <motion.span key="ready" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              Get Early Access
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      <p className="text-center text-xs text-gray-500">
        By joining, you agree to receive early access updates. No spam.
      </p>
    </form>

    {status === 'error' && (
      <p className="mt-3 text-center text-sm text-red-500">
        Something went wrong. Please try again.
      </p>
    )}
  </motion.div>
)

export default function Home() {
  const router = useRouter()
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'error'>('idle')
  const [form, setForm] = useState<FormState>({
    fullName: '',
    email: '',
    role: 'User',
    company: '',
  })
  
  const formRef = useRef<HTMLDivElement>(null);

  // Using useCallback here to stabilize the `set` function passed to the child,
  // although moving SignupCard outside was the main fix.
  const set = useMemo(() => <K extends keyof FormState>(k: K, v: string) => {
    // This state setter correctly updates the form state
    setForm((f) => ({ ...f, [k]: v as FormState[K] }))
  }, []) // Empty dependency array ensures this function is stable

  const isValid = useMemo(() => {
    if (!form.fullName.trim()) return false
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return false
    return true
  }, [form.fullName, form.email])

  const scrollToForm = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  async function submit(e: React.FormEvent | null) {
    if (e && e.preventDefault) {
      e.preventDefault();
    }

    if (form.company) return // Honeypot
    if (!isValid) return

    setStatus('loading')
    try {
      // Simulating a successful network request delay
      await new Promise(resolve => setTimeout(resolve, 1500)); 

      setStatus('ok')
      
      scrollToForm();

      setForm({ fullName: '', email: '', role: 'User', company: '' })
      console.log('Form Submitted successfully:', form);
    } catch {
      setStatus('error')
    }
  }


  return (
    <motion.main initial="hidden" animate="visible" variants={staggerContainer} className="bg-brand-cream text-brand-charcoal">
      
      {/* Floating Sticky CTA Bar (Mobile Only) */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30, delay: 1 }}
        className="fixed inset-x-0 bottom-0 z-50 bg-white/90 p-4 shadow-2xl backdrop-blur-md lg:hidden"
      >
        <SignupCard 
          form={form} 
          status={status} 
          isValid={isValid} 
          set={set} 
          submit={submit} 
        />
      </motion.div>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-20">
        {/* Animated Background Elements */}
        <div className="pointer-events-none absolute -top-40 -left-60 h-80 w-80 bg-brand-red/10 blur-3xl opacity-50 animate-blob" />
        <div className="pointer-events-none absolute -bottom-40 -right-60 h-96 w-96 bg-rose-300/60 blur-3xl opacity-50 animate-blob" style={{ animationDelay: '-6s' }} />
        <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-white/70 via-brand-cream to-brand-cream" />

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 md:grid-cols-2 md:pt-10">
          {/* Left Column: Headline and Pitch */}
          <div className="md:order-1 order-2 md:max-w-none max-w-lg mx-auto">
            
            <motion.h1 variants={item} className="text-5xl font-extrabold leading-tight tracking-tighter sm:text-6xl mt-4">
              Plan beautifully. <br />
              <span className="text-brand-red">Stress less.</span>
            </motion.h1>

            <motion.p variants={item} className="mt-6 text-lg text-gray-700">
              Vendor discovery, real budgets, RSVPs, and **Nour** — an AI copilot that speaks Arabic and understands local pricing.
            </motion.p>

            <motion.ul variants={item} className="mt-6 space-y-3 text-gray-700 list-disc pl-5">
              <li>Vendor discovery tailored to Egypt & GCC</li>
              <li>Guestlist & RSVP tools, budget tracker</li>
              <li>Nour — your AI copilot for weddings</li>
            </motion.ul>
            
            {/* Desktop CTA to guide users to the form */}
            <motion.button
              variants={item}
              onClick={scrollToForm}
              className="mt-8 hidden md:inline-block rounded-lg bg-brand-red px-8 py-3 text-lg font-semibold text-white transition hover:brightness-110 shadow-lg"
            >
                Start Planning Now
            </motion.button>
          </div>

          {/* Right Column: Signup Card - Visible on desktop (lg:) */}
          <div ref={formRef} className="md:order-2 order-1 lg:flex justify-end hidden">
            <div className="max-w-md w-full"> 
              <SignupCard 
                form={form} 
                status={status} 
                isValid={isValid} 
                set={set} 
                submit={submit} 
              />
            </div>
          </div>
          
          {/* Right Column: Signup Card - Visible on tablet/small desktop (md:block) and mobile (order-1) */}
          <div ref={formRef} className="order-1 md:block lg:hidden flex justify-center">
            <div className="max-w-md w-full"> 
              <SignupCard 
                form={form} 
                status={status} 
                isValid={isValid} 
                set={set} 
                submit={submit} 
              />
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          variants={item}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:block"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }} // Gently bob up and down
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
            className="text-4xl text-brand-red opacity-70 cursor-pointer"
            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
          >
            ↓
          </motion.div>
        </motion.div>

      </section>
      
      {/* Product Showcase Marquee */}
      <section className="bg-white/50 py-10">
        <Marquee />
      </section>

      {/* Features Grid: Why Zaffa AI */}
      <section className="mx-auto max-w-6xl px-6 pt-16 pb-12">
        <motion.div variants={item} className="flex items-end justify-between border-b pb-4">
          <h2 className="text-3xl font-semibold">Why Zaffa AI</h2>
          <p className="text-sm text-gray-500">
            Built in Egypt · Expanding to UAE
          </p>
        </motion.div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={item}
              whileHover={{ y: -5, boxShadow: '0 10px 20px -5px rgba(0,0,0,0.1)' }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="rounded-2xl border bg-white p-6 shadow-sm"
            >
              {/* Using SVG Icons as components */}
              <feature.icon />
              
              <h3 className="mt-2 text-xl font-medium">{feature.title}</h3>
              <p className="mt-2 text-gray-700" dangerouslySetInnerHTML={{ __html: feature.description }} />
              {feature.link && (
                <a href={feature.link} className="mt-3 inline-block text-sm font-medium text-brand-red hover:underline">
                  Learn More &rarr;
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* End-of-Page CTA */}
      <section className="bg-brand-red/5 pt-20 pb-24">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <motion.h2 variants={item} className="text-3xl font-bold">
            Ready to Plan Your Perfect Wedding?
          </motion.h2>
          <motion.p variants={item} className="mt-4 text-lg text-gray-700">
            Join hundreds of couples already simplifying their journey. Get instant access to vendor data, budget tools, and your personal AI co-pilot.
          </motion.p>
          <motion.div variants={item} className="mt-8 flex justify-center">
            {/* CTA to scroll back up and use the form */}
            <motion.button
              onClick={scrollToForm}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="rounded-lg bg-brand-red px-10 py-4 text-xl font-semibold text-white transition hover:brightness-110 shadow-lg"
            >
              Start Planning Now
            </motion.button>
          </motion.div>
        </div>
      </section>
    </motion.main>
  )
}
