// app/admin/clients/[id]/modifier/ClientEditForm.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Save, Loader2, Trash2 } from 'lucide-react'
import Link from 'next/link'

export default function ClientEditForm({ client }: { client: any }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    nom: client.nom || '',
    prenom: client.prenom || '',
    email: client.email || '',
    telephone: client.telephone || '',
    adresse: client.adresse || '',
    ville: client.ville || '',
    codePostal: client.codePostal || '',
    societe: client.societe || '',
    siret: client.siret || '',
    notes: client.notes || '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`/api/clients/${client.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Erreur lors de la modification')
      router.push(`/admin/clients/${client.id}`)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Supprimer ce client ? Cette action est irréversible.')) return
    await fetch(`/api/clients/${client.id}`, { method: 'DELETE' })
    router.push('/admin/clients')
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
      <div className="flex items-center gap-4 -mt-4 mb-2">
        <Link href={`/admin/clients/${client.id}`} className="p-2 rounded-xl hover:bg-steel-100 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
      </div>

      <div className="card space-y-5">
        <h2 className="font-semibold text-sicnaf-500 pb-2 border-b border-steel-100">Informations personnelles</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="label">Prénom *</label>
            <input name="prenom" value={form.prenom} onChange={handleChange} required className="input" />
          </div>
          <div>
            <label className="label">Nom *</label>
            <input name="nom" value={form.nom} onChange={handleChange} required className="input" />
          </div>
          <div>
            <label className="label">Téléphone *</label>
            <input name="telephone" value={form.telephone} onChange={handleChange} required className="input" />
          </div>
          <div>
            <label className="label">Email</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} className="input" />
          </div>
        </div>
      </div>

      <div className="card space-y-5">
        <h2 className="font-semibold text-sicnaf-500 pb-2 border-b border-steel-100">Adresse</h2>
        <div>
          <label className="label">Adresse</label>
          <input name="adresse" value={form.adresse} onChange={handleChange} className="input" />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="label">Ville</label>
            <input name="ville" value={form.ville} onChange={handleChange} className="input" />
          </div>
          <div>
            <label className="label">Code postal</label>
            <input name="codePostal" value={form.codePostal} onChange={handleChange} className="input" />
          </div>
        </div>
      </div>

      <div className="card space-y-5">
        <h2 className="font-semibold text-sicnaf-500 pb-2 border-b border-steel-100">Informations professionnelles</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="label">Société</label>
            <input name="societe" value={form.societe} onChange={handleChange} className="input" />
          </div>
          <div>
            <label className="label">SIRET</label>
            <input name="siret" value={form.siret} onChange={handleChange} className="input" />
          </div>
        </div>
        <div>
          <label className="label">Notes</label>
          <textarea name="notes" value={form.notes} onChange={handleChange} rows={3} className="input resize-none" />
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
          <Link href={`/admin/clients/${client.id}`} className="btn-outline">Annuler</Link>
        </div>
        <button
          type="button"
          onClick={handleDelete}
          className="flex items-center gap-2 px-4 py-2 text-red-500 hover:bg-red-50 rounded-lg text-sm transition-colors"
        >
          <Trash2 className="w-4 h-4" /> Supprimer le client
        </button>
      </div>
    </form>
  )
}
