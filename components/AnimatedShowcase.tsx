// components/AnimatedShowcase.tsx
import Image from 'next/image'

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

// duplicate for seamless loop
const strip = [...shots, ...shots]

export default function AnimatedShowcase() {
  return (
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
                <Image
                  src={s.src}
                  alt={s.label}
                  width={720}
                  height={420}
                  className="h-[220px] w-full object-cover"
                  priority={i < 3}
                />
              </div>
              <figcaption className="mt-2 text-sm text-gray-600">{s.label}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
