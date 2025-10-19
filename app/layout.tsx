// app/layout.tsx
import './globals.css'
import type { Metadata } from 'next'
import Footer from '@/components/Footer'
import PageTransitionWrapper from '@/components/PageTransitionWrapper' // Import the new wrapper

export const metadata: Metadata = {
  title: 'Zaffa AI — Plan beautifully, stress less',
  description: 'AI-powered wedding planning for Egypt & the GCC.',
  icons: {
    icon: [
      { url: '/zaffa-bouquet.png', sizes: '32x32' },
      { url: '/zaffa-bouquet.png', sizes: '16x16' },
    ],
    apple: [{ url: '/zaffa-bouquet.png', sizes: '180x180' }],
  },
  openGraph: {
    title: 'Zaffa AI',
    description: 'Vendor discovery, budgets, RSVPs, and Nour — your AI copilot.',
    images: ['/og.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-brand-cream text-brand-charcoal antialiased">
        {/* Wrap the core page content with the PageTransitionWrapper */}
        <PageTransitionWrapper>
          {children}
        </PageTransitionWrapper>
        <Footer />
      </body>
    </html>
  )
}