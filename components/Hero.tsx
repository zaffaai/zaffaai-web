import React from 'react';

// NOTE: In a real Next.js environment, the logo should be imported and 
// used with the <Image /> component for optimization. We use a variable here
// to satisfy component requirements in this specific environment.
const BOUQUET_IMAGE_SRC = "/logo/zaffa-bouquet.png";

// Inline SVG for the AI Assistant icon (a sparkle)
const SparkleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    {...props}
  >
    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
  </svg>
);


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
        aria-hidden="false" 
        loading="lazy" 
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
              <strong>Zaffa AI</strong> is your smart copilot for wedding planning—discover trusted vendors, manage budgets & guestlists, and get instant answers in Arabic or English.
            </p>
            <ul className="mt-6 space-y-2 text-gray-700">
              <li>• Vendor discovery tailored for <strong>Egypt & GCC</strong></li>
              <li>• Guestlist, RSVP, and budget tracking in one place</li>
              <li className="flex items-center space-x-2">
                {/* ADDED: New Sparkle Icon */}
                <SparkleIcon className="h-5 w-5 text-brand-red inline-block mr-1" aria-hidden="true" /> 
                <span className="font-medium">Nour</span> — your AI assistant for quick, local answers
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
