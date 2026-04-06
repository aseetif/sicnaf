'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Menu, X, Phone, Lock, Globe } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const t = useTranslations('nav')
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const languages = [
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'ar', label: 'العربية', flag: '🇩🇿' },
  ]

  const switchLocale = (newLocale: string) => {
    const segments = pathname.split('/')
    segments[1] = newLocale
    router.push(segments.join('/'))
    setLangOpen(false)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-steel-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center gap-3">
            <img src="/images/logo.png" alt="SICNAF" className="h-10 w-auto" />
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link href={`/${locale}/services`} className="text-steel-600 hover:text-sicnaf-500 font-medium text-sm transition-colors">{t('services')}</Link>
            <Link href={`/${locale}#fonctionnement`} className="text-steel-600 hover:text-sicnaf-500 font-medium text-sm transition-colors">{t('fonctionnement')}</Link>
            <Link href={`/${locale}/contact`} className="text-steel-600 hover:text-sicnaf-500 font-medium text-sm transition-colors">{t('contact')}</Link>
          </div>

          {/* CTA buttons */}
          <div className="hidden md:flex items-center gap-3">
            <a href="tel:+213550595630" className="flex items-center gap-1.5 text-sm text-steel-600 hover:text-sicnaf-500 font-medium">
              <Phone className="w-4 h-4" />+213 550 59 56 30
            </a>
            <Link href={`/${locale}/devis`} className="btn-accent text-sm px-5 py-2.5">{t('devis')}</Link>

            {/* Language switcher */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1.5 text-sm bg-steel-100 text-steel-600 px-3 py-2 rounded-lg hover:bg-steel-200 transition-colors"
              >
                <Globe className="w-4 h-4" />
                {languages.find(l => l.code === locale)?.flag}
              </button>
              {langOpen && (
                <div className="absolute right-0 top-10 bg-white border border-steel-200 rounded-xl shadow-lg overflow-hidden z-50 min-w-[140px]">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => switchLocale(lang.code)}
                      className={`flex items-center gap-2 w-full px-4 py-2.5 text-sm hover:bg-steel-50 transition-colors ${locale === lang.code ? 'bg-sicnaf-50 text-sicnaf-500 font-medium' : 'text-steel-600'}`}
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Link href="/login" className="flex items-center gap-1.5 text-sm bg-sicnaf-500 text-white px-4 py-2.5 rounded-lg font-medium hover:bg-sicnaf-600 transition-colors">
              <Lock className="w-3.5 h-3.5" />{t('admin')}
            </Link>
          </div>

          {/* Mobile toggle */}
          <button onClick={() => setOpen(!open)} className="md:hidden p-2 rounded-lg hover:bg-steel-100">
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden py-4 border-t border-steel-100 space-y-2">
            <Link href={`/${locale}/services`} onClick={() => setOpen(false)} className="block px-4 py-2.5 text-steel-600 hover:bg-steel-50 rounded-lg">{t('services')}</Link>
            <Link href={`/${locale}/contact`} onClick={() => setOpen(false)} className="block px-4 py-2.5 text-steel-600 hover:bg-steel-50 rounded-lg">{t('contact')}</Link>
            <Link href={`/${locale}/devis`} onClick={() => setOpen(false)} className="block px-4 py-2.5 bg-accent text-white rounded-lg font-semibold text-center mt-2">{t('devis')}</Link>
            <Link href="/login" onClick={() => setOpen(false)} className="block px-4 py-2.5 bg-sicnaf-500 text-white rounded-lg font-semibold text-center mt-2">🔒 {t('admin')}</Link>
            {/* Language mobile */}
            <div className="flex gap-2 px-4 mt-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => { switchLocale(lang.code); setOpen(false) }}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${locale === lang.code ? 'bg-sicnaf-500 text-white' : 'bg-steel-100 text-steel-600'}`}
                >
                  {lang.flag} {lang.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}