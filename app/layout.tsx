import type { Metadata } from 'next'
import './globals.css'
import { Providers } from './providers'

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
    <html lang="fr">
      <body className="bg-white text-steel-900 antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}