import type { Metadata } from 'next'
import '../globals.css'
import { Providers } from '../providers'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'

const locales = ['fr', 'en', 'ar']

export const metadata: Metadata = {
  title: 'SICNAF — Solutions Industrielles & Interventions',
  description: 'SICNAF, spécialiste en construction de bennes, véhicules spéciaux, réparation et maintenance industrielle.',
}

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  if (!locales.includes(locale)) notFound()

  const messages = await getMessages()

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <body className="bg-white text-steel-900 antialiased">
        <Providers>
          <NextIntlClientProvider messages={messages}>
            {children}
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  )
}