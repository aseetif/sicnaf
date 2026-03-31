// app/layout.tsx
import type { Metadata } from 'next'
import { Playfair_Display, Source_Sans_3, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'SICNAF — Solutions Industrielles & Interventions',
  description:
    'SICNAF, spécialiste en installation de bennes, conteneurs, réparation et maintenance industrielle. Devis rapide et intervention professionnelle.',
  keywords: ['benne', 'conteneur', 'maintenance industrielle', 'réparation', 'intervention', 'SICNAF'],
  openGraph: {
    title: 'SICNAF — Solutions Industrielles',
    description: 'Installation, réparation et maintenance industrielle professionnelle',
    type: 'website',
    locale: 'fr_FR',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={`${playfair.variable} ${sourceSans.variable} ${jetbrains.variable}`}>
      <body className="font-body bg-white text-steel-900 antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
