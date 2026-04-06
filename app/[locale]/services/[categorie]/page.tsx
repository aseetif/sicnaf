import { categories } from '@/lib/services'
import { notFound } from 'next/navigation'
import Navbar from '@/components/public/Navbar'
import Footer from '@/components/public/Footer'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, CheckCircle, Phone } from 'lucide-react'

export async function generateStaticParams() {
  return categories.map((cat) => ({ categorie: cat.id }))
}

export default function CategorieDetailPage({ params }: { params: { categorie: string } }) {
  const cat = categories.find((c) => c.id === params.categorie)
  if (!cat) notFound()
  const currentIndex = categories.findIndex((c) => c.id === params.categorie)
  const prev = categories[currentIndex - 1]
  const next = categories[currentIndex + 1]

  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="pt-16 relative overflow-hidden">
        <div className="h-80 md:h-96 relative">
          <img src={cat.image} alt={cat.titre} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-sicnaf-900/80 via-sicnaf-900/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 max-w-7xl mx-auto">
            <Link href="/services" className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm mb-4 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Retour aux services
            </Link>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-4xl">{cat.icon}</span>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-white">{cat.titre}</h1>
            </div>
            <p className="text-white/80 text-lg max-w-2xl">{cat.description}</p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-steel-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-10">
            <div className="h-px flex-1 bg-steel-200" />
            <span className="text-steel-400 text-sm font-medium px-4">
              {cat.services.length} service{cat.services.length > 1 ? 's' : ''} disponible{cat.services.length > 1 ? 's' : ''}
            </span>
            <div className="h-px flex-1 bg-steel-200" />
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {cat.services.map((service, idx) => (
              <div key={service.id} className="bg-white rounded-2xl p-8 shadow-card hover:shadow-card-hover transition-shadow border border-steel-100">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-sicnaf-500 text-white font-display font-bold text-lg flex items-center justify-center shrink-0">
                    {String(idx + 1).padStart(2, '0')}
                  </div>
                  <div>
                    <h2 className="font-display text-xl font-bold text-sicnaf-500 mb-1">{service.nom}</h2>
                    <p className="text-steel-500 text-sm leading-relaxed">{service.description}</p>
                  </div>
                </div>
                <div className="border-t border-steel-100 my-4" />
                <ul className="space-y-2.5">
                  {service.details.map((detail) => (
                    <li key={detail} className="flex items-start gap-2.5">
                      <CheckCircle className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                      <span className="text-steel-600 text-sm">{detail}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 pt-5 border-t border-steel-50">
                  <Link href={`/devis?service=${cat.id}`} className="inline-flex items-center gap-2 text-sicnaf-500 font-semibold text-sm hover:text-accent transition-colors">
                    Demander un devis pour ce service <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white border-t border-steel-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-display text-3xl font-bold text-sicnaf-500 mb-4">Intéressé par nos services ?</h2>
          <p className="text-steel-500 mb-8">Contactez-nous pour un devis gratuit ou appelez-nous directement.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/devis" className="btn-accent">Demander un devis <ArrowRight className="w-5 h-5" /></Link>
            <a href="tel:+213550595630" className="btn-outline">
                <Phone className="w-5 h-5" /> +213 550 59 56 30
            </a>
          </div>
        </div>
      </section>

      <section className="py-10 bg-steel-50 border-t border-steel-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {prev ? (
              <Link href={`/services/${prev.id}`} className="flex items-center gap-2 text-steel-500 hover:text-sicnaf-500 font-medium transition-colors">
                <ArrowLeft className="w-4 h-4" />
                <div><div className="text-xs text-steel-400">Précédent</div><div>{prev.titre}</div></div>
              </Link>
            ) : <div />}
            <Link href="/services" className="text-steel-400 hover:text-sicnaf-500 text-sm">Tous les services</Link>
            {next ? (
              <Link href={`/services/${next.id}`} className="flex items-center gap-2 text-steel-500 hover:text-sicnaf-500 font-medium transition-colors text-right">
                <div><div className="text-xs text-steel-400">Suivant</div><div>{next.titre}</div></div>
                <ArrowRight className="w-4 h-4" />
              </Link>
            ) : <div />}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}