export const metadata = {
  title: 'Contact · Zaffa AI',
  description: 'Get in touch with the Zaffa AI team.',
}

export default function Contact() {
  return (
    <main className="mx-auto min-h-screen max-w-3xl bg-brand-cream px-6 py-14 text-brand-charcoal">
      <h1 className="text-3xl font-semibold">Contact us</h1>
      <p className="mt-3 text-gray-700">
        Questions, partnerships, or press? We’d love to hear from you.
      </p>

      <div className="mt-6 rounded-2xl border bg-white p-6 shadow-sm">
        <h2 className="text-lg font-medium">Email</h2>
        <p className="mt-1 text-gray-700">
          <a href="mailto:team@zaffa.ai?subject=Hello%20Zaffa%20AI" className="text-brand-red underline">
            team@zaffa.ai
          </a>
        </p>

        <h2 className="mt-6 text-lg font-medium">Social</h2>
        <ul className="mt-1 space-y-1 text-gray-700">
          <li><a className="underline" href="https://www.linkedin.com" target="_blank">LinkedIn</a></li>
          <li><a className="underline" href="https://x.com" target="_blank">X (Twitter)</a></li>
          <li><a className="underline" href="https://instagram.com" target="_blank">Instagram</a></li>
        </ul>
      </div>

      <p className="mt-6 text-xs text-gray-500">
        We typically reply within 1–2 business days.
      </p>
    </main>
  )
}
