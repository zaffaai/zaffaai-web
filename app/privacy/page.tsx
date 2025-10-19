export const metadata = {
  title: 'Privacy Policy · Zaffa AI',
  description: 'How we handle your data at Zaffa AI.',
}

export default function Privacy() {
  const effective = new Date().toLocaleDateString()
  return (
    <main className="mx-auto min-h-screen max-w-3xl bg-brand-cream px-6 py-14 text-brand-charcoal">
      <h1 className="text-3xl font-semibold">Privacy Policy</h1>
      <p className="mt-3 text-gray-700">
        We respect your privacy. This policy explains what we collect, why we collect it, and how we use it.
      </p>

      <h2 className="mt-8 text-xl font-semibold">Information we collect</h2>
      <ul className="mt-2 list-disc pl-5 text-gray-700">
        <li>Contact details you provide (e.g., name, email) for early access and product updates.</li>
        <li>Vendor details if you pre-register (e.g., business name, category, links).</li>
        <li>Basic product analytics during early access to improve Zaffa AI.</li>
      </ul>

      <h2 className="mt-8 text-xl font-semibold">How we use information</h2>
      <ul className="mt-2 list-disc pl-5 text-gray-700">
        <li>To provide early access, onboard users and vendors, and improve the product.</li>
        <li>To communicate important updates (no spam; you can unsubscribe anytime).</li>
      </ul>

      <h2 className="mt-8 text-xl font-semibold">Sharing</h2>
      <p className="mt-2 text-gray-700">
        We don’t sell your data. We may use trusted processors (e.g., hosting, analytics) who only process data on our behalf.
      </p>

      <h2 className="mt-8 text-xl font-semibold">Data retention</h2>
      <p className="mt-2 text-gray-700">
        We keep data for as long as needed to provide early access and improve Zaffa AI. You can request deletion at any time.
      </p>

      <h2 className="mt-8 text-xl font-semibold">Your rights</h2>
      <p className="mt-2 text-gray-700">
        You can request access, correction, or deletion of your data by emailing{' '}
        <a href="mailto:team@zaffa.ai" className="text-brand-red underline">team@zaffa.ai</a>.
      </p>

      <h2 className="mt-8 text-xl font-semibold">Contact</h2>
      <p className="mt-2 text-gray-700">
        For privacy questions or requests, email{' '}
        <a href="mailto:team@zaffa.ai" className="text-brand-red underline">team@zaffa.ai</a>.
      </p>

      <p className="mt-10 text-sm text-gray-500">Effective date: {effective}</p>
    </main>
  )
}
