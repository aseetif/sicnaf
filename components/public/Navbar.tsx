// components/public/Navbar.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Phone } from 'lucide-react'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-steel-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 bg-sicnaf-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-display font-bold text-sm">SN</span>
            </div>
            <div>
              <span className="font-display font-bold text-xl text-sicnaf-500">SICNAF</span>
              <div className="text-[10px] text-steel-400 leading-none -mt-0.5">Solutions Industrielles</div>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/#services" className="text-steel-600 hover:text-sicnaf-500 font-medium text-sm transition-colors">Services</Link>
            <Link href="/#fonctionnement" className="text-steel-600 hover:text-sicnaf-500 font-medium text-sm transition-colors">Fonctionnement</Link>
            <Link href="/contact" className="text-steel-600 hover:text-sicnaf-500 font-medium text-sm transition-colors">Contact</Link>
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a href="tel:0123456789" className="flex items-center gap-1.5 text-sm text-steel-600 hover:text-sicnaf-500 font-medium">
              <Phone className="w-4 h-4" />
              +213 550 59 56 30

            </a>
            <Link href="/devis" className="btn-accent text-sm px-5 py-2.5">
              Devis gratuit
            </Link>
            <Link href="/login" className="flex items-center gap-1.5 text-sm bg-sicnaf-500 text-white px-4 py-2.5 rounded-lg font-medium hover:bg-sicnaf-600 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              Espace admin
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
            <Link href="/#services" className="block px-4 py-2.5 text-steel-600 hover:bg-steel-50 rounded-lg">Services</Link>
            <Link href="/#fonctionnement" className="block px-4 py-2.5 text-steel-600 hover:bg-steel-50 rounded-lg">Fonctionnement</Link>
            <Link href="/contact" className="block px-4 py-2.5 text-steel-600 hover:bg-steel-50 rounded-lg">Contact</Link>
            <Link href="/devis" className="block px-4 py-2.5 bg-accent text-white rounded-lg font-semibold text-center mt-2">Devis gratuit</Link>
            <Link href="/login" className="block px-4 py-2.5 bg-sicnaf-500 text-white rounded-lg font-semibold text-center mt-2">🔒 Espace admin</Link>

          </div>
        )}
      </div>
    </nav>
  )
}
