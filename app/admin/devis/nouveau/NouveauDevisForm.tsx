// app/admin/devis/nouveau/NouveauDevisForm.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, Trash2, Save, Loader2, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { formatCurrency } from '@/lib/utils'

const types = [
  { value: 'INSTALLATION_BENNE', label: 'Installation de benne' },
  { value: 'CONTENEUR', label: 'Conteneur' },
  { value: 'REPARATION', label: 'Réparation' },
  { value: 'MAINTENANCE', label: 'Maintenance' },
  { value: 'AUTRE', label: 'Autre' },
]

interface Ligne {
  description: string
  quantite: number
  prixUnitaire: number
  type: 'PIECE' | 'MAIN_OEUVRE'
  total: number
}

export default function NouveauDevisForm({ clients }: { clients: any[] }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({ clientId: '', typeService: '', description: '', adresseChantier: '', notes: '', tva: 20 })
  const [lignes, setLignes] = useState<Ligne[]>([])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const addLigne = (type: 'PIECE' | 'MAIN_OEUVRE') => {
    setLignes([...lignes, { description: '', quantite: 1, prixUnitaire: 0, type, total: 0 }])
  }

  const updateLigne = (idx: number, field: string, value: string | number) => {
    const updated = [...lignes]
    updated[idx] = { ...updated[idx], [field]: value }
    const q = Number(field === 'quantite' ? value : updated[idx].quantite)
    const p = Number(field === 'prixUnitaire' ? value : updated[idx].prixUnitaire)
    updated[idx].total = q * p
    setLignes(updated)
  }

  const removeLigne = (idx: number) => setLignes(lignes.filter((_, i) => i !== idx))

  const sousTotal = lignes.reduce((acc, l) => acc + l.total, 0)
  const total = sousTotal * (1 + Number(form.tva) / 100)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.clientId || !form.typeService || !form.description) {
      setError('Veuillez remplir tous les champs obligatoires')
      return
    }
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/devis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, lignes, sousTotal, total }),
      })
      if (!res.ok) throw new Error('Erreur lors de la création')
      router.push('/admin/devis')
    } catch (err: any) {
      setError(err.message)
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl space-y-6">
      <div className="flex items-center gap-4 -mt-4 mb-2">
        <Link href="/admin/devis" className="p-2 rounded-xl hover:bg-steel-100 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
      </div>

      <div className="card space-y-5">
        <h2 className="font-semibold text-sicnaf-500 pb-2 border-b border-steel-100">Informations générales</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="label">Client *</label>
            <select name="clientId" value={form.clientId} onChange={handleChange} required className="input">
              <option value="">Sélectionnez un client</option>
              {clients.map(c => (
                <option key={c.id} value={c.id}>{c.prenom} {c.nom}{c.societe ? ` — ${c.societe}` : ''}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="label">Type de service *</label>
            <select name="typeService" value={form.typeService} onChange={handleChange} required className="input">
              <option value="">Sélectionnez</option>
              {types.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
            </select>
          </div>
          <div className="sm:col-span-2">
            <label className="label">Description *</label>
            <textarea name="description" value={form.description} onChange={handleChange} required rows={3} className="input resize-none" />
          </div>
          <div>
            <label className="label">Adresse du chantier</label>
            <input name="adresseChantier" value={form.adresseChantier} onChange={handleChange} className="input" />
          </div>
          <div>
            <label className="label">Notes</label>
            <input name="notes" value={form.notes} onChange={handleChange} className="input" />
          </div>
        </div>
      </div>

      {/* Lignes */}
      {(['PIECE', 'MAIN_OEUVRE'] as const).map((type) => (
        <div key={type} className="card space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-sicnaf-500">{type === 'PIECE' ? 'Pièces & Matériaux' : "Main d'œuvre"}</h2>
            <button type="button" onClick={() => addLigne(type)} className="flex items-center gap-1.5 text-sm text-sicnaf-500 bg-sicnaf-50 px-3 py-1.5 rounded-lg hover:bg-sicnaf-100">
              <Plus className="w-4 h-4" /> Ajouter
            </button>
          </div>
          {lignes.filter(l => l.type === type).length === 0 ? (
            <p className="text-steel-300 text-sm italic">Aucun élément</p>
          ) : (
            <div className="space-y-3">
              {lignes.map((l, idx) => l.type === type && (
                <div key={idx} className={`grid grid-cols-12 gap-2 items-center rounded-lg p-2 ${type === 'PIECE' ? 'bg-steel-50' : 'bg-amber-50'}`}>
                  <div className="col-span-5">
                    <input value={l.description} onChange={e => updateLigne(idx, 'description', e.target.value)} className="input text-sm py-1.5" placeholder="Description" />
                  </div>
                  <div className="col-span-2">
                    <input type="number" min="0" step="0.01" value={l.quantite} onChange={e => updateLigne(idx, 'quantite', Number(e.target.value))} className="input text-sm py-1.5 text-center" />
                  </div>
                  <div className="col-span-2">
                    <input type="number" min="0" step="0.01" value={l.prixUnitaire} onChange={e => updateLigne(idx, 'prixUnitaire', Number(e.target.value))} className="input text-sm py-1.5 text-center" />
                  </div>
                  <div className="col-span-2 text-right font-medium text-sm pr-2">{formatCurrency(l.total)}</div>
                  <div className="col-span-1 flex justify-center">
                    <button type="button" onClick={() => removeLigne(idx)} className="p-1 text-red-400 hover:text-red-600">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      {/* Totals */}
      <div className="card">
        <div className="flex justify-end">
          <div className="w-72 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-steel-500">Sous-total HT</span>
              <span className="font-medium">{formatCurrency(sousTotal)}</span>
            </div>
            <div className="flex justify-between text-sm items-center">
              <span className="text-steel-500">TVA</span>
              <div className="flex items-center gap-2">
                <select name="tva" value={form.tva} onChange={handleChange} className="border border-steel-200 rounded px-2 py-0.5 text-sm">
                  <option value={0}>0%</option>
                  <option value={10}>10%</option>
                  <option value={20}>20%</option>
                </select>
                <span className="font-medium">{formatCurrency(sousTotal * Number(form.tva) / 100)}</span>
              </div>
            </div>
            <div className="flex justify-between pt-2 border-t border-steel-100">
              <span className="font-bold text-sicnaf-500">Total TTC</span>
              <span className="font-bold text-lg text-sicnaf-500">{formatCurrency(total)}</span>
            </div>
          </div>
        </div>
      </div>

      {error && <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm">{error}</div>}

      <div className="flex gap-3">
        <button type="submit" disabled={loading} className="btn-primary">
          {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Enregistrement...</> : <><Save className="w-4 h-4" /> Enregistrer le devis</>}
        </button>
        <Link href="/admin/devis" className="btn-outline">Annuler</Link>
      </div>
    </form>
  )
}
