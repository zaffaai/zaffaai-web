// components/Footer.tsx
export default function Footer() {
  return (
    <footer className="border-t bg-white/70 py-6">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 text-sm text-gray-600">
        <span>© {new Date().getFullYear()} Zaffa AI · Egypt ↔︎ UAE</span>
        <nav className="flex gap-4">
          <a href="/privacy" className="hover:underline">Privacy</a>
          <a href="/faq" className="hover:underline">FAQ</a>
          <a href="/contact" className="hover:underline">Contact</a>
        </nav>
      </div>
    </footer>
  )
}
