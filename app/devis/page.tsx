// app/devis/page.tsx
'use client'

import { useState } from 'react'
import Navbar from '@/components/public/Navbar'
import Footer from '@/components/public/Footer'
import { Send, CheckCircle, Loader2 } from 'lucide-react'

const types = [
  { value: 'INSTALLATION_BENNE', label: 'Installation de benne' },
  { value: 'CONTENEUR', label: 'Conteneur' },
  { value: 'REPARATION', label: 'Réparation industrielle' },
  { value: 'MAINTENANCE', label: 'Maintenance préventive' },
  { value: 'AUTRE', label: 'Autre' },
]

export default function DevisPage() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    nom: '', prenom: '', email: '', telephone: '', societe: '',
    typeService: '', description: '', adresse: '', dateSouhaitee: '',
  })

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

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Erreur lors de l\'envoi')
      }

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

          {/* Header */}
          <div className="text-center mb-10">
            <span className="text-accent font-semibold text-sm uppercase tracking-widest">Gratuit & sans engagement</span>
            <h1 className="font-display text-4xl font-bold text-sicnaf-500 mt-2 mb-3">Demande de Devis</h1>
            <p className="text-steel-500">Remplissez le formulaire ci-dessous. Nous vous recontactons sous 24h.</p>
          </div>

          {success ? (
            <div className="card text-center py-16">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="font-display text-2xl font-bold text-sicnaf-500 mb-3">Demande envoyée !</h2>
              <p className="text-steel-500 max-w-md mx-auto">
                Votre demande de devis a bien été reçue. Notre équipe vous contactera dans les 24 heures ouvrées.
              </p>
              <button
                onClick={() => { setSuccess(false); setForm({ nom: '', prenom: '', email: '', telephone: '', societe: '', typeService: '', description: '', adresse: '', dateSouhaitee: '' }) }}
                className="btn-primary mt-8"
              >
                Nouvelle demande
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="card space-y-6">
              {/* Identity */}
              <div>
                <h3 className="font-semibold text-sicnaf-500 mb-4 pb-2 border-b border-steel-100">Vos coordonnées</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="label">Prénom *</label>
                    <input name="prenom" value={form.prenom} onChange={handleChange} required className="input" placeholder="Jean" />
                  </div>
                  <div>
                    <label className="label">Nom *</label>
                    <input name="nom" value={form.nom} onChange={handleChange} required className="input" placeholder="Martin" />
                  </div>
                  <div>
                    <label className="label">Email *</label>
                    <input type="email" name="email" value={form.email} onChange={handleChange} required className="input" placeholder="jean@example.fr" />
                  </div>
                  <div>
                    <label className="label">Téléphone *</label>
                    <input name="telephone" value={form.telephone} onChange={handleChange} required className="input" placeholder="06 12 34 56 78" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="label">Société (optionnel)</label>
                    <input name="societe" value={form.societe} onChange={handleChange} className="input" placeholder="Ma Société SARL" />
                  </div>
                </div>
              </div>

              {/* Request */}
              <div>
                <h3 className="font-semibold text-sicnaf-500 mb-4 pb-2 border-b border-steel-100">Votre demande</h3>
                <div className="space-y-4">
                  <div>
                    <label className="label">Type de service *</label>
                    <select name="typeService" value={form.typeService} onChange={handleChange} required className="input">
                      <option value="">Sélectionnez un service</option>
                      {types.map((t) => (
                        <option key={t.value} value={t.value}>{t.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="label">Description de votre besoin *</label>
                    <textarea
                      name="description"
                      value={form.description}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="input resize-none"
                      placeholder="Décrivez votre besoin en détail : type d'équipement, état actuel, travaux souhaités..."
                    />
                  </div>
                  <div>
                    <label className="label">Adresse du chantier</label>
                    <input name="adresse" value={form.adresse} onChange={handleChange} className="input" placeholder="123 Rue de l'Industrie, 75001 Paris" />
                  </div>
                  <div>
                    <label className="label">Date souhaitée d'intervention</label>
                    <input type="date" name="dateSouhaitee" value={form.dateSouhaitee} onChange={handleChange} className="input" />
                  </div>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm">
                  {error}
                </div>
              )}

              <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-4">
                {loading ? (
                  <><Loader2 className="w-5 h-5 animate-spin" /> Envoi en cours...</>
                ) : (
                  <><Send className="w-5 h-5" /> Envoyer ma demande de devis</>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}
