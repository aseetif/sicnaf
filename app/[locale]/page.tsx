import Link from 'next/link'
import { Wrench, Container, Hammer, Settings, ArrowRight, Phone, Mail, MapPin, Shield, Clock, Award, CheckCircle } from 'lucide-react'
import Navbar from '@/components/public/Navbar'
import Footer from '@/components/public/Footer'
import { useTranslations } from 'next-intl'

const stats = [
  { value: '500+', key: 'interventions' },
  { value: '15 ans', key: 'experience' },
  { value: '98%', key: 'satisfaction' },
  { value: '48h', key: 'delai' },
]

const steps = [
  { num: '01', titleKey: 's1_title', descKey: 's1_desc' },
  { num: '02', titleKey: 's2_title', descKey: 's2_desc' },
  { num: '03', titleKey: 's3_title', descKey: 's3_desc' },
  { num: '04', titleKey: 's4_title', descKey: 's4_desc' },
]

export default function HomePage() {
  const t = useTranslations()

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[92vh] flex items-center bg-sicnaf-500 overflow-hidden">
        <div className="absolute inset-0 bg-hero-pattern opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-br from-sicnaf-700 via-sicnaf-500 to-sicnaf-600" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/3" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-white/90 text-sm font-medium">{t('hero.badge')}</span>
            </div>

            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
              {t('hero.title1')}
              <span className="block text-accent">{t('hero.title2')}</span>
              <span className="block text-white/80 text-4xl md:text-5xl">{t('hero.title3')}</span>
            </h1>

            <p className="text-xl text-white/75 leading-relaxed mb-10 max-w-2xl">
              {t('hero.description')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/devis" className="btn-accent text-base px-8 py-4">
                {t('hero.cta_devis')}
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a href="tel:+213550595630" className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/30 text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/20 transition-all duration-200">
                <Phone className="w-5 h-5" />
                {t('hero.cta_call')}
              </a>
            </div>

            <div className="flex flex-wrap gap-6 mt-12">
              {[
                { icon: Shield, key: 'badge1' },
                { icon: Award, key: 'badge2' },
                { icon: Clock, key: 'badge3' },
              ].map((item) => (
                <div key={item.key} className="flex items-center gap-2 text-white/70">
                  <item.icon className="w-4 h-4 text-accent" />
                  <span className="text-sm">{t(`hero.${item.key}`)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

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
              <div key={stat.key} className="text-center">
                <div className="font-display text-4xl font-bold text-accent mb-2">{stat.value}</div>
                <div className="text-steel-500 text-sm">{t(`stats.${stat.key}`)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-20 bg-steel-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-accent font-semibold text-sm uppercase tracking-widest">Notre expertise</span>
          <h2 className="section-title mt-3 mb-4">{t('services.title')}</h2>
          <p className="section-subtitle mx-auto mb-10">{t('services.subtitle')}</p>
          <Link href="/services" className="btn-primary text-base px-8 py-4">
            {t('services.cta')}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* How it works */}
      <section id="fonctionnement" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title mt-3 mb-4">{t('steps.title')}</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-8 relative">
            {steps.map((step) => (
              <div key={step.num} className="text-center relative">
                <div className="w-16 h-16 rounded-2xl bg-sicnaf-500 text-white font-display text-2xl font-bold flex items-center justify-center mx-auto mb-4 shadow-industrial relative z-10">
                  {step.num}
                </div>
                <h3 className="font-semibold text-sicnaf-500 mb-2">{t(`steps.${step.titleKey}`)}</h3>
                <p className="text-steel-500 text-sm leading-relaxed">{t(`steps.${step.descKey}`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 bg-gradient-to-r from-sicnaf-600 to-sicnaf-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-pattern opacity-20" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-display text-4xl font-bold text-white mb-4">{t('cta.title')}</h2>
          <p className="text-white/75 text-lg mb-8">{t('cta.desc')}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/devis" className="btn-accent">
              {t('cta.devis')}
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/contact" className="inline-flex items-center gap-2 bg-white/10 border border-white/30 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/20 transition-all">
              <Phone className="w-5 h-5" />
              {t('cta.contact')}
            </Link>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 bg-steel-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title mb-4">{t('contact.title')}</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { icon: Phone, labelKey: 'phone', value: '+213 550 59 56 30', href: 'tel:+213550595630' },
              { icon: Mail, labelKey: 'email', value: 'contact@sicnaf.com', href: 'mailto:contact@sicnaf.com' },
              { icon: MapPin, labelKey: 'zone', valueKey: 'zone_value', href: 'https://www.google.com/maps/search/?api=1&query=Beni+Tamou+Zaouia+Blida+Algerie' },
            ].map((item) => (
              <a key={item.labelKey} href={item.href} className="card text-center hover:border-sicnaf-300 group">
                <div className="w-12 h-12 rounded-xl bg-sicnaf-50 flex items-center justify-center mx-auto mb-4 group-hover:bg-sicnaf-500 transition-colors">
                  <item.icon className="w-6 h-6 text-sicnaf-500 group-hover:text-white transition-colors" />
                </div>
                <div className="text-sm text-steel-400 mb-1">{t(`contact.${item.labelKey}`)}</div>
                <div className="font-semibold text-sicnaf-500">{item.valueKey ? t(`contact.${item.valueKey}`) : item.value}</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}