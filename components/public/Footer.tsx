// components/public/Footer.tsx
import Link from 'next/link'
import { Phone, Mail, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-sicnaf-500 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                <span className="text-white font-display font-bold">SN</span>
              </div>
              <div>
                <span className="font-display font-bold text-2xl">SICNAF</span>
                <div className="text-white/50 text-xs">Solutions Industrielles</div>
              </div>
            </div>
            <p className="text-white/65 text-sm leading-relaxed max-w-sm">
              Spécialiste en installation de bennes, conteneurs, réparation et maintenance industrielle.
              Intervenant professionnel depuis 15 ans.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-white/90">Navigation</h4>
            <ul className="space-y-2">
              {[
                { label: 'Accueil', href: '/' },
                { label: 'Nos services', href: '/#services' },
                { label: 'Devis gratuit', href: '/devis' },
                { label: 'Contact', href: '/contact' },
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-white/60 hover:text-accent text-sm transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-white/90">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-white/60 text-sm">
                <Phone className="w-4 h-4 text-accent shrink-0" />
                <a href="tel:0550 59 56 30" className="hover:text-accent transition-colors">+213 550 59 56 30
</a>
              </li>
              <li className="flex items-center gap-2 text-white/60 text-sm">
                <Mail className="w-4 h-4 text-accent shrink-0" />
                <a href="mailto:contact@sicnaf.com" className="hover:text-accent transition-colors">contact@sicnaf.com</a>
              </li>
              <li className="flex items-start gap-2 text-white/60 text-sm">
                <MapPin className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <span>Beni Tamou, Zaouia<br />Blida 09000, Algérie</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-sm">© {new Date().getFullYear()} SICNAF. Tous droits réservés.</p>
          <p className="text-white/40 text-sm">SIRET : 123 456 789 00001</p>
        </div>
      </div>
    </footer>
  )
}
