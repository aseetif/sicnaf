'use client'

import { useState } from 'react'
import Navbar from '@/components/public/Navbar'
import Footer from '@/components/public/Footer'
import { Send, CheckCircle, Loader2 } from 'lucide-react'
import { useTranslations } from 'next-intl'

export default function DevisPage() {
  const t = useTranslations('devis')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    nom: '', prenom: '', email: '', telephone: '', societe: '',
    typeService: '', description: '', adresse: '', dateSouhaitee: '',
    tonnage: '', dimensions: '', marqueVehicule: '',
  })

  const types = [
    { value: 'INSTALLATION_BENNE', label: t('type_benne') },
    { value: 'CONTENEUR', label: t('type_conteneur') },
    { value: 'REPARATION', label: t('type_reparation') },
    { value: 'MAINTENANCE', label: t('type_maintenance') },
    { value: 'AUTRE', label: t('type_autre') },
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/devis/public', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Erreur')
      setSuccess(true)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-24 pb-20 bg-steel-50 min-h-screen">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h1 className="font-display text-4xl font-bold text-sicnaf-500 mt-2 mb-3">{t('title')}</h1>
            <p className="text-steel-500">{t('subtitle')}</p>
          </div>

          {success ? (
            <div className="card text-center py-16">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="font-display text-2xl font-bold text-sicnaf-500 mb-3">{t('success_title')}</h2>
              <p className="text-steel-500 max-w-md mx-auto">{t('success_desc')}</p>
              <button
                onClick={() => { setSuccess(false); setForm({ nom: '', prenom: '', email: '', telephone: '', societe: '', typeService: '', description: '', adresse: '', dateSouhaitee: '', tonnage: '', dimensions: '', marqueVehicule: '' }) }}                className="btn-primary mt-8"
              >
                {t('new_request')}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="card space-y-6">
              <div>
                <h3 className="font-semibold text-sicnaf-500 mb-4 pb-2 border-b border-steel-100">{t('section_coordonnees')}</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="label">{t('prenom')} *</label>
                    <input name="prenom" value={form.prenom} onChange={handleChange} required className="input" />
                  </div>
                  <div>
                    <label className="label">{t('nom')} *</label>
                    <input name="nom" value={form.nom} onChange={handleChange} required className="input" />
                  </div>
                  <div>
                    <label className="label">{t('email')} *</label>
                    <input type="email" name="email" value={form.email} onChange={handleChange} required className="input" />
                  </div>
                  <div>
                    <label className="label">{t('telephone')} *</label>
                    <input name="telephone" value={form.telephone} onChange={handleChange} required className="input" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="label">{t('societe')}</label>
                    <input name="societe" value={form.societe} onChange={handleChange} className="input" />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-sicnaf-500 mb-4 pb-2 border-b border-steel-100">{t('section_demande')}</h3>
                <div className="space-y-4">
                  <div>
                    <label className="label">{t('type_service')} *</label>
                    <select name="typeService" value={form.typeService} onChange={handleChange} required className="input">
                      <option value="">{t('select_service')}</option>
                      {types.map((type) => (
                        <option key={type.value} value={type.value}>{type.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="label">{t('description')} *</label>
                    <textarea name="description" value={form.description} onChange={handleChange} required rows={4} className="input resize-none" />
                  </div>
                  <div>
                    <label className="label">{t('adresse')}</label>
                    <input name="adresse" value={form.adresse} onChange={handleChange} className="input" />
                  </div>
                  <div>
                    <label className="label">{t('date')}</label>
                    <input type="date" name="dateSouhaitee" value={form.dateSouhaitee} onChange={handleChange} className="input" />
                  </div>
                  <div>
                    <label className="label">{t('tonnage')}</label>
                    <input name="tonnage" value={form.tonnage} onChange={handleChange} className="input" placeholder="Ex: 5 tonnes" />
                  </div>
                  <div>
                    <label className="label">{t('dimensions')}</label>
                    <input name="dimensions" value={form.dimensions} onChange={handleChange} className="input" placeholder="Ex: 6m x 2.5m x 2m" />
                  </div>
                  <div>
                    <label className="label">{t('marque_vehicule')}</label>
                    <input name="marqueVehicule" value={form.marqueVehicule} onChange={handleChange} className="input" placeholder="Ex: Mercedes, Renault..." />
                  </div>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm">{error}</div>
              )}

              <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-4">
                {loading ? <><Loader2 className="w-5 h-5 animate-spin" /> {t('sending')}...</> : <><Send className="w-5 h-5" /> {t('submit')}</>}
              </button>
            </form>
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}