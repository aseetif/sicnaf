'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Save, Loader2, ArrowLeft, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { formatCurrency, formatDate } from '@/lib/utils'

export default function ModifierFactureForm({ facture }: { facture: any }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    statut: facture.statut,
    notes: facture.notes || '',
    dateEcheance: facture.dateEcheance
      ? new Date(facture.dateEcheance).toISOString().split('T')[0]
      : '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`/api/factures/${facture.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          statut: form.statut,
          notes: form.notes || null,
          dateEcheance: form.dateEcheance ? new Date(form.dateEcheance) : null,
        }),
      })
      if (!res.ok) throw new Error('Erreur lors de la modification')
      router.push(`/admin/interventions/${facture.interventionId}/facture`)
    } catch (err: any) {
      setError(err.message)
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Supprimer cette facture ? Cette action est irréversible.')) return
    await fetch(`/api/factures/${facture.id}`, { method: 'DELETE' })
    router.push('/admin/factures')
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
      <div className="flex items-center gap-4 -mt-4 mb-2">
        <Link href={`/admin/interventions/${facture.interventionId}/facture`} className="p-2 rounded-xl hover:bg-steel-100">
          <ArrowLeft className="w-5 h-5" />
        </Link>
      </div>

      {/* Résumé */}
      <div className="card bg-steel-50">
        <h2 className="font-semibold text-sicnaf-500 mb-3">Résumé</h2>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <span className="text-steel-400">N° Facture</span>
            <div className="font-mono font-medium">{facture.numero}</div>
          </div>
          <div>
            <span className="text-steel-400">Client</span>
            <div className="font-medium">{facture.intervention.client.prenom} {facture.intervention.client.nom}</div>
          </div>
          <div>
            <span className="text-steel-400">Date émission</span>
            <div>{formatDate(facture.dateEmission)}</div>
          </div>
          <div>
            <span className="text-steel-400">Total TTC</span>
            <div className="font-bold text-sicnaf-500">{formatCurrency(facture.total)}</div>
          </div>
        </div>
      </div>

      {/* Modification */}
      <div className="card space-y-5">
        <h2 className="font-semibold text-sicnaf-500 pb-2 border-b border-steel-100">Modifier</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="label">Statut</label>
            <select name="statut" value={form.statut} onChange={handleChange} className="input">
              <option value="EN_ATTENTE">En attente</option>
              <option value="PAYEE">Payée</option>
              <option value="ANNULEE">Annulée</option>
            </select>
          </div>
          <div>
            <label className="label">Date d'échéance</label>
            <input type="date" name="dateEcheance" value={form.dateEcheance} onChange={handleChange} className="input" />
          </div>
        </div>
        <div>
          <label className="label">Notes</label>
          <textarea name="notes" value={form.notes} onChange={handleChange} rows={3} className="input resize-none" placeholder="Notes sur la facture..." />
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm">{error}</div>
      )}

      <div className="flex items-center justify-between">
      <div className="flex gap-3">
        <button type="submit" disabled={loading} className="btn-primary">
          {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Enregistrement...</> : <><Save className="w-4 h-4" /> Enregistrer</>}
        </button>
        <Link href={`/admin/interventions/${facture.interventionId}/facture`} className="btn-outline">
          Annuler
        </Link>
      </div>
      <button
        type="button"
        onClick={handleDelete}
        className="flex items-center gap-2 px-4 py-2 text-red-500 hover:bg-red-50 rounded-lg text-sm transition-colors"
      >
        <Trash2 className="w-4 h-4" /> Supprimer la facture
      </button>
    </div>
    </form>
  )
}