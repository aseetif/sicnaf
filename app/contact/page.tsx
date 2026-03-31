// app/contact/page.tsx
import Navbar from '@/components/public/Navbar'
import Footer from '@/components/public/Footer'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import Link from 'next/link'

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-24 pb-20 bg-steel-50 min-h-screen">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="font-display text-4xl font-bold text-sicnaf-500 mb-3">Contactez-nous</h1>
            <p className="text-steel-500">Notre équipe est disponible pour répondre à toutes vos questions</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Info */}
            <div className="space-y-5">
              {[
                { icon: Phone, label: 'Téléphone', value: '01 23 45 67 89', sub: 'Du lundi au vendredi, 8h-18h', href: 'tel:0123456789' },
                { icon: Mail, label: 'Email', value: 'contact@sicnaf.fr', sub: 'Réponse sous 24h', href: 'mailto:contact@sicnaf.fr' },
                { icon: MapPin, label: 'Zone d\'intervention', value: 'Île-de-France & régions', sub: 'France entière sur devis', href: '#' },
                { icon: Clock, label: 'Horaires', value: 'Lun–Ven : 8h–18h', sub: 'Urgences 24h/24', href: '#' },
              ].map((item) => (
                <a key={item.label} href={item.href} className="card flex items-center gap-4 hover:border-sicnaf-300 group">
                  <div className="w-12 h-12 bg-sicnaf-500 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-accent transition-colors">
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-xs text-steel-400">{item.label}</div>
                    <div className="font-semibold text-sicnaf-500">{item.value}</div>
                    <div className="text-xs text-steel-400">{item.sub}</div>
                  </div>
                </a>
              ))}
            </div>

            {/* CTA Card */}
            <div className="card bg-sicnaf-500 text-white border-sicnaf-400 flex flex-col justify-center text-center py-12">
              <h2 className="font-display text-3xl font-bold mb-4">Besoin d'un devis ?</h2>
              <p className="text-white/75 mb-8">
                Remplissez notre formulaire en ligne et recevez un devis détaillé sous 24h, gratuitement et sans engagement.
              </p>
              <Link href="/devis" className="btn-accent mx-auto">
                Demander un devis gratuit
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
