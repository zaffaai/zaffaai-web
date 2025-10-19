import React from 'react';

// NOTE: In a real Next.js environment, the logo should be imported and 
// used with the <Image /> component for optimization. We use a variable here
// to satisfy component requirements in this specific environment.
const BOUQUET_IMAGE_SRC = "/logo/zaffa-bouquet.png";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* animated background blobs */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 bg-brand-red/10 blur-3xl animate-blob" />
      <div className="pointer-events-none absolute -bottom-20 -right-16 h-80 w-80 bg-rose-300/60 blur-3xl opacity-50 animate-blob" style={{ animationDelay: '-6s' }} />

      {/* bouquet watermark - using <img> here to avoid Next.js Image component dependency issues in this environment */}
      <img
        src={BOUQUET_IMAGE_SRC}
        alt="Stylized floral bouquet watermark" // Added descriptive alt text
        aria-hidden="false" // Changed to false, as it contains content that should be hidden for styling only if necessary, but here, alt text is provided.
        loading="lazy" // Added lazy loading as a best practice for images below the fold
        className="pointer-events-none absolute right-[-60px] top-10 h-52 opacity-10 animate-float"
      />

      {/* gradient wash behind everything */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-gray-50 via-white to-white" />

      <div className="mx-auto max-w-6xl px-6 pt-20 pb-12 md:pt-28 md:pb-16">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
              Plan beautifully. Stress less.
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              **Zaffa AI** is your smart copilot for wedding planning—discover trusted vendors, manage budgets & guestlists, and get instant answers in Arabic or English.
            </p>
            <ul className="mt-6 space-y-2 text-gray-700">
              <li>• Vendor discovery tailored for **Egypt & GCC**</li>
              <li>• Guestlist, RSVP, and budget tracking in one place</li>
              <li>
                • <span className="font-medium">Nour</span> — your AI assistant for quick, local answers
              </li>
            </ul>
          </div>

          <div className="relative">
            <div className="rounded-3xl border bg-white/70 p-6 shadow-xl backdrop-blur transition hover:-translate-y-0.5">
              {/* Waitlist form will render here */}
              <div id="waitlist-slot" />
              <p className="mt-3 text-xs text-gray-500">
                By joining, you agree to receive early access updates. No spam.
              </p>
            </div>

            {/* soft glow accents */}
            <div className="pointer-events-none absolute -left-12 -top-12 h-40 w-40 rounded-full bg-gray-200/30 blur-3xl" />
            <div className="pointer-events-none absolute -right-10 -bottom-10 h-40 w-40 rounded-full bg-pink-200/30 blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  )
}
