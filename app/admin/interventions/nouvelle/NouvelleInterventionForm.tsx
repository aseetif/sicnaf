// app/admin/interventions/nouvelle/NouvelleInterventionForm.tsx
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

export default function NouvelleInterventionForm({ clients }: { clients: any[] }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    clientId: '',
    typeService: '',
    description: '',
    adresseChantier: '',
    technicien: '',
    notes: '',
    tva: 20,
  })
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
  const total = sousTotal * (1 + form.tva / 100)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.clientId || !form.typeService || !form.description) {
      setError('Veuillez remplir tous les champs obligatoires')
      return
    }
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/interventions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, lignes, sousTotal, total }),
      })
      if (!res.ok) throw new Error('Erreur lors de la création')
      const data = await res.json()
      router.push(`/admin/interventions/${data.id}`)
    } catch (err: any) {
      setError(err.message)
      setLoading(false)
    }
  }

  const pieces = lignes.filter(l => l.type === 'PIECE')
  const mainOeuvre = lignes.filter(l => l.type === 'MAIN_OEUVRE')

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl space-y-6">
      <div className="flex items-center gap-4 -mt-4 mb-2">
        <Link href="/admin/interventions" className="p-2 rounded-xl hover:bg-steel-100 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
      </div>

      {/* General info */}
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
            <textarea name="description" value={form.description} onChange={handleChange} required rows={3} className="input resize-none" placeholder="Description détaillée de l'intervention..." />
          </div>
          <div>
            <label className="label">Adresse du chantier</label>
            <input name="adresseChantier" value={form.adresseChantier} onChange={handleChange} className="input" />
          </div>
          <div>
            <label className="label">Technicien</label>
            <input name="technicien" value={form.technicien} onChange={handleChange} className="input" placeholder="Nom du technicien" />
          </div>
          <div className="sm:col-span-2">
            <label className="label">Notes internes</label>
            <textarea name="notes" value={form.notes} onChange={handleChange} rows={2} className="input resize-none" />
          </div>
        </div>
      </div>

      {/* Pièces */}
      <div className="card space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-sicnaf-500">Pièces & Matériaux</h2>
          <button type="button" onClick={() => addLigne('PIECE')} className="flex items-center gap-1.5 text-sm text-sicnaf-500 hover:text-sicnaf-600 font-medium bg-sicnaf-50 px-3 py-1.5 rounded-lg">
            <Plus className="w-4 h-4" /> Ajouter une pièce
          </button>
        </div>

        {pieces.length === 0 ? (
          <p className="text-steel-300 text-sm italic">Aucune pièce ajoutée</p>
        ) : (
          <div className="space-y-3">
            <div className="grid grid-cols-12 gap-2 text-xs text-steel-400 font-medium px-1">
              <div className="col-span-5">Description</div>
              <div className="col-span-2 text-center">Quantité</div>
              <div className="col-span-2 text-center">Prix unitaire</div>
              <div className="col-span-2 text-right">Total</div>
              <div className="col-span-1"></div>
            </div>
            {lignes.map((l, idx) => l.type === 'PIECE' && (
              <div key={idx} className="grid grid-cols-12 gap-2 items-center bg-steel-50 rounded-lg p-2">
                <div className="col-span-5">
                  <input value={l.description} onChange={e => updateLigne(idx, 'description', e.target.value)} className="input text-sm py-1.5" placeholder="Description de la pièce" />
                </div>
                <div className="col-span-2">
                  <input type="number" min="0" step="0.01" value={l.quantite} onChange={e => updateLigne(idx, 'quantite', Number(e.target.value))} className="input text-sm py-1.5 text-center" />
                </div>
                <div className="col-span-2">
                  <input type="number" min="0" step="0.01" value={l.prixUnitaire} onChange={e => updateLigne(idx, 'prixUnitaire', Number(e.target.value))} className="input text-sm py-1.5 text-center" placeholder="0.00" />
                </div>
                <div className="col-span-2 text-right font-medium text-sm pr-2">{formatCurrency(l.total)}</div>
                <div className="col-span-1 flex justify-center">
                  <button type="button" onClick={() => removeLigne(idx)} className="p-1 text-red-400 hover:text-red-600 hover:bg-red-50 rounded">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Main d'oeuvre */}
      <div className="card space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-sicnaf-500">Main d'œuvre</h2>
          <button type="button" onClick={() => addLigne('MAIN_OEUVRE')} className="flex items-center gap-1.5 text-sm text-sicnaf-500 hover:text-sicnaf-600 font-medium bg-sicnaf-50 px-3 py-1.5 rounded-lg">
            <Plus className="w-4 h-4" /> Ajouter main d'œuvre
          </button>
        </div>

        {mainOeuvre.length === 0 ? (
          <p className="text-steel-300 text-sm italic">Aucune main d'œuvre ajoutée</p>
        ) : (
          <div className="space-y-3">
            <div className="grid grid-cols-12 gap-2 text-xs text-steel-400 font-medium px-1">
              <div className="col-span-5">Description</div>
              <div className="col-span-2 text-center">Heures</div>
              <div className="col-span-2 text-center">Taux horaire</div>
              <div className="col-span-2 text-right">Total</div>
              <div className="col-span-1"></div>
            </div>
            {lignes.map((l, idx) => l.type === 'MAIN_OEUVRE' && (
              <div key={idx} className="grid grid-cols-12 gap-2 items-center bg-amber-50 rounded-lg p-2">
                <div className="col-span-5">
                  <input value={l.description} onChange={e => updateLigne(idx, 'description', e.target.value)} className="input text-sm py-1.5" placeholder="Ex: Pose et installation" />
                </div>
                <div className="col-span-2">
                  <input type="number" min="0" step="0.5" value={l.quantite} onChange={e => updateLigne(idx, 'quantite', Number(e.target.value))} className="input text-sm py-1.5 text-center" />
                </div>
                <div className="col-span-2">
                  <input type="number" min="0" step="0.01" value={l.prixUnitaire} onChange={e => updateLigne(idx, 'prixUnitaire', Number(e.target.value))} className="input text-sm py-1.5 text-center" placeholder="0.00" />
                </div>
                <div className="col-span-2 text-right font-medium text-sm pr-2">{formatCurrency(l.total)}</div>
                <div className="col-span-1 flex justify-center">
                  <button type="button" onClick={() => removeLigne(idx)} className="p-1 text-red-400 hover:text-red-600 hover:bg-red-50 rounded">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

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
                <span className="font-medium">{formatCurrency(sousTotal * form.tva / 100)}</span>
              </div>
            </div>
            <div className="flex justify-between pt-2 border-t border-steel-100">
              <span className="font-bold text-sicnaf-500">Total TTC</span>
              <span className="font-bold text-lg text-sicnaf-500">{formatCurrency(total)}</span>
            </div>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm">{error}</div>
      )}

      <div className="flex gap-3">
        <button type="submit" disabled={loading} className="btn-primary">
          {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Enregistrement...</> : <><Save className="w-4 h-4" /> Enregistrer l'intervention</>}
        </button>
        <Link href="/admin/interventions" className="btn-outline">Annuler</Link>
      </div>
    </form>
  )
}
