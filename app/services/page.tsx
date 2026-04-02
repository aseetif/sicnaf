import Navbar from '@/components/public/Navbar'
import Footer from '@/components/public/Footer'
import { categories } from '@/lib/services'
import Link from 'next/link'
import { ArrowRight, CheckCircle } from 'lucide-react'

export const metadata = {
  title: 'Nos Services — SICNAF',
  description: 'Découvrez tous les services SICNAF : construction de bennes, véhicules spéciaux, transformation, réparation et construction métallique.',
}

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="pt-28 pb-16 bg-gradient-to-br from-sicnaf-700 to-sicnaf-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-pattern opacity-20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-accent font-semibold text-sm uppercase tracking-widest">Notre expertise</span>
          <h1 className="font-display text-5xl font-bold text-white mt-3 mb-4">Nos Services</h1>
          <p className="text-white/75 text-xl max-w-2xl mx-auto">
            SICNAF vous propose une gamme complète de services industriels, de la construction à la maintenance de tous vos véhicules et équipements.
          </p>
        </div>
      </section>

      <section className="py-20 bg-steel-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/services/${cat.id}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative h-52 overflow-hidden">
                  <img src={cat.image} alt={cat.titre} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute top-4 left-4 text-3xl">{cat.icon}</div>
                  <div className="absolute bottom-4 right-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-3 py-1 text-white text-xs font-medium">
                    {cat.services.length} service{cat.services.length > 1 ? 's' : ''}
                  </div>
                </div>
                <div className="p-6">
                  <h2 className="font-display text-xl font-bold text-sicnaf-500 mb-2 group-hover:text-accent transition-colors">
                    {cat.titre}
                  </h2>
                  <p className="text-steel-500 text-sm leading-relaxed mb-4">{cat.description}</p>
                  <ul className="space-y-1.5 mb-5">
                    {cat.services.slice(0, 3).map((s) => (
                      <li key={s.id} className="flex items-center gap-2 text-sm text-steel-600">
                        <CheckCircle className="w-3.5 h-3.5 text-accent shrink-0" />
                        {s.nom}
                      </li>
                    ))}
                    {cat.services.length > 3 && (
                      <li className="text-xs text-steel-400 pl-5">
                        + {cat.services.length - 3} autre{cat.services.length - 3 > 1 ? 's' : ''}...
                      </li>
                    )}
                  </ul>
                  <div className="flex items-center gap-2 text-sicnaf-500 font-semibold text-sm group-hover:gap-3 transition-all">
                    Voir les détails <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-sicnaf-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-pattern opacity-20" />
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-display text-3xl font-bold text-white mb-4">Besoin d'un service sur mesure ?</h2>
          <p className="text-white/75 mb-8">Contactez-nous pour un devis gratuit et personnalisé selon vos besoins.</p>
          <Link href="/devis" className="btn-accent">
            Demander un devis gratuit <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}