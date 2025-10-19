export const metadata = {
  title: 'FAQ · Zaffa AI',
  description: 'Answers to common questions for couples and vendors.',
}

type QA = { q: string; a: string }
const faqs: QA[] = [
  {
    q: 'Where is Zaffa AI available?',
    a: 'We’re starting in Egypt (Cairo & Alexandria) and expanding to the UAE next.',
  },
  {
    q: 'Does Nour support Arabic?',
    a: 'Yes. Nour chats in Arabic or English and tailors answers to local context and pricing.',
  },
  {
    q: 'How much does it cost?',
    a: 'During early access it’s free for couples and vendors. We’ll share plans before public launch.',
  },
  {
    q: 'I’m a vendor. What do I get?',
    a: 'A public profile, discovery in local searches, and pre-qualified leads from engaged couples.',
  },
  {
    q: 'Can I import my guest list?',
    a: 'Yes—CSV import is supported in early access along with RSVP tracking and plus-ones.',
  },
  {
    q: 'When will I get access?',
    a: 'We invite cohorts each month. Waitlist order and city coverage influence invites.',
  },
]

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-brand-cream text-brand-charcoal">
      <section className="mx-auto max-w-4xl px-6 py-14">
        <h1 className="text-3xl font-semibold">Frequently asked questions</h1>
        <p className="mt-2 text-gray-700">
          Can’t find what you’re looking for? <a href="/contact" className="text-brand-red underline">Contact us</a>.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {faqs.map((item, i) => (
            <div key={i} className="rounded-2xl border bg-white p-5 shadow-sm">
              <h2 className="text-sm font-semibold">{item.q}</h2>
              <p className="mt-1 text-sm text-gray-600">{item.a}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
