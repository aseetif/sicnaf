// app/page.tsx
import Link from 'next/link'
import { Wrench, Container, Hammer, Settings, ArrowRight, Phone, Mail, MapPin, Shield, Clock, Award, CheckCircle } from 'lucide-react'
import Navbar from '@/components/public/Navbar'
import Footer from '@/components/public/Footer'

const services = [
  {
    icon: Container,
    title: 'Installation de Bennes',
    description: 'Installation professionnelle de bennes à ordures, bennes TP et bennes de chantier sur tous types de véhicules industriels.',
    features: ['Bennes à ordures ménagères', 'Bennes de chantier', 'Bennes basculantes', 'Bennes à griffe'],
  },
  {
    icon: Wrench,
    title: 'Installation de Conteneurs',
    description: 'Mise en place et installation de conteneurs industriels, maritimes et de stockage selon vos besoins spécifiques.',
    features: ['Conteneurs maritimes', 'Conteneurs de stockage', 'Conteneurs frigorifiques', 'Aménagement sur mesure'],
  },
  {
    icon: Hammer,
    title: 'Réparation Industrielle',
    description: 'Diagnostic et réparation rapide de vos équipements industriels pour minimiser votre temps d\'arrêt.',
    features: ['Diagnostic complet', 'Réparation hydraulique', 'Soudure & chaudronnerie', 'Pièces d\'origine'],
  },
  {
    icon: Settings,
    title: 'Maintenance Préventive',
    description: 'Programmes de maintenance adaptés pour prolonger la durée de vie de vos équipements et éviter les pannes.',
    features: ['Contrats de maintenance', 'Révision périodique', 'Contrôle hydraulique', 'Rapport d\'intervention'],
  },
]

const stats = [
  { value: '500+', label: 'Interventions réalisées' },
  { value: '15 ans', label: 'D\'expérience' },
  { value: '98%', label: 'Clients satisfaits' },
  { value: '48h', label: 'Délai d\'intervention' },
]

const steps = [
  { num: '01', title: 'Demande de devis', desc: 'Remplissez notre formulaire en ligne avec vos besoins.' },
  { num: '02', title: 'Étude & chiffrage', desc: 'Nous analysons votre demande et préparons un devis détaillé.' },
  { num: '03', title: 'Intervention', desc: 'Nos techniciens interviennent selon le planning convenu.' },
  { num: '04', title: 'Facturation', desc: 'Réception de votre facture claire et détaillée.' },
]

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[92vh] flex items-center bg-sicnaf-500 overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-hero-pattern opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-br from-sicnaf-700 via-sicnaf-500 to-sicnaf-600" />

        {/* Decorative shapes */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/3" />
        <div className="absolute top-1/2 right-1/4 w-32 h-32 border border-accent/30 rounded-full" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-white/90 text-sm font-medium">Spécialiste intervention industrielle</span>
            </div>

            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
              Solutions
              <span className="block text-accent">Industrielles</span>
              <span className="block text-white/80 text-4xl md:text-5xl">Professionnelles</span>
            </h1>

            <p className="text-xl text-white/75 leading-relaxed mb-10 max-w-2xl">
              SICNAF intervient pour l'installation de bennes, conteneurs, la réparation
              et la maintenance de vos équipements industriels. Rapide, fiable, professionnel.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/devis" className="btn-accent text-base px-8 py-4">
                Demander un devis gratuit
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a href="tel:0123456789" className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/30 text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/20 transition-all duration-200">
                <Phone className="w-5 h-5" />
                Appeler maintenant
              </a>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-6 mt-12">
              {[
                { icon: Shield, text: 'Assurance RC Pro' },
                { icon: Award, text: 'Certifié qualifié' },
                { icon: Clock, text: 'Intervention rapide' },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-2 text-white/70">
                  <item.icon className="w-4 h-4 text-accent" />
                  <span className="text-sm">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 80L1440 80L1440 30C1200 80 960 0 720 30C480 60 240 0 0 30L0 80Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-display text-4xl font-bold text-accent mb-2">{stat.value}</div>
                <div className="text-steel-500 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-20 bg-steel-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-accent font-semibold text-sm uppercase tracking-widest">Notre expertise</span>
          <h2 className="section-title mt-3 mb-4">Nos Services</h2>
          <p className="section-subtitle mx-auto mb-10">
            Installation de bennes, véhicules spéciaux, transformation, réparation et construction métallique. Découvrez toute notre gamme de services industriels.
          </p>
          <Link href="/services" className="btn-primary text-base px-8 py-4">
            Découvrir tous nos services
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* How it works */}
      <section id="fonctionnement" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-accent font-semibold text-sm uppercase tracking-widest">Simple & efficace</span>
            <h2 className="section-title mt-3 mb-4">Comment ça fonctionne ?</h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8 relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-8 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-accent/30 to-accent/30 via-accent" style={{left: '12.5%', right: '12.5%'}} />

            {steps.map((step, i) => (
              <div key={step.num} className="text-center relative">
                <div className="w-16 h-16 rounded-2xl bg-sicnaf-500 text-white font-display text-2xl font-bold flex items-center justify-center mx-auto mb-4 shadow-industrial relative z-10">
                  {step.num}
                </div>
                <h3 className="font-semibold text-sicnaf-500 mb-2">{step.title}</h3>
                <p className="text-steel-500 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 bg-gradient-to-r from-sicnaf-600 to-sicnaf-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-pattern opacity-20" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-display text-4xl font-bold text-white mb-4">
            Besoin d'une intervention rapide ?
          </h2>
          <p className="text-white/75 text-lg mb-8">
            Notre équipe intervient sous 48h sur votre site. Devis gratuit et sans engagement.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/devis" className="btn-accent">
              Demander un devis gratuit
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/contact" className="inline-flex items-center gap-2 bg-white/10 border border-white/30 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/20 transition-all">
              <Phone className="w-5 h-5" />
              Nous contacter
            </Link>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 bg-steel-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title mb-4">Contactez-nous</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { icon: Phone, label: 'Téléphone', value: '+213 550 59 56 30', href: 'tel:+213550595630' },
              { icon: Mail, label: 'Email', value: 'contact@sicnaf.fr', href: 'mailto:contact@sicnaf.fr' },
              { icon: MapPin, label: 'Adresse', value: 'Beni Tamou, Zaouia, Blida 09000', sub: 'Algérie entière sur devis', href: 'https://www.google.com/maps/search/?api=1&query=Beni+Tamou+Zaouia+Blida+Algerie' },
                        ].map((item) => (
              <a key={item.label} href={item.href} className="card text-center hover:border-sicnaf-300 group">
                <div className="w-12 h-12 rounded-xl bg-sicnaf-50 flex items-center justify-center mx-auto mb-4 group-hover:bg-sicnaf-500 transition-colors">
                  <item.icon className="w-6 h-6 text-sicnaf-500 group-hover:text-white transition-colors" />
                </div>
                <div className="text-sm text-steel-400 mb-1">{item.label}</div>
                <div className="font-semibold text-sicnaf-500">{item.value}</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
