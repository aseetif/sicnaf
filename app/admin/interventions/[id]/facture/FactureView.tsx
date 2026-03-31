// app/admin/interventions/[id]/facture/FactureView.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { formatDate, formatCurrency, getStatutColor, getStatutLabel } from '@/lib/utils'
import { ArrowLeft, Download, CheckCircle, Loader2, FileText, Plus } from 'lucide-react'
import Link from 'next/link'

export default function FactureView({ intervention }: { intervention: any }) {
  const router = useRouter()
  const [creating, setCreating] = useState(false)
  const [downloading, setDownloading] = useState(false)
  const [error, setError] = useState('')

  const createFacture = async () => {
    setCreating(true)
    setError('')
    try {
      const res = await fetch('/api/factures', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ interventionId: intervention.id }),
      })
      if (!res.ok) throw new Error('Erreur lors de la création')
      router.refresh()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setCreating(false)
    }
  }

  const downloadPDF = async () => {
    setDownloading(true)
    try {
      const { generateFacturePDF } = await import('@/lib/pdf')
      await generateFacturePDF({ ...intervention.facture, intervention })
    } catch (err) {
      console.error('PDF error:', err)
    } finally {
      setDownloading(false)
    }
  }

  const updateStatutFacture = async (statut: string) => {
    await fetch(`/api/factures/${intervention.facture.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ statut }),
    })
    router.refresh()
  }

  const pieces = intervention.lignes.filter((l: any) => l.type === 'PIECE')
  const mainOeuvre = intervention.lignes.filter((l: any) => l.type === 'MAIN_OEUVRE')

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Link href={`/admin/interventions/${intervention.id}`} className="p-2 rounded-xl hover:bg-steel-100 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div className="flex-1">
          <h1 className="font-display text-2xl font-bold text-sicnaf-500">
            {intervention.facture ? 'Facture' : 'Générer une facture'}
          </h1>
          {intervention.facture && (
            <span className="text-sm text-steel-400 font-mono">{intervention.facture.numero}</span>
          )}
        </div>
        {intervention.facture && (
          <div className="flex gap-2">
            <button onClick={downloadPDF} disabled={downloading} className="btn-primary text-sm">
              {downloading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
              Télécharger PDF
            </button>
            {intervention.facture.statut === 'EN_ATTENTE' && (
              <button onClick={() => updateStatutFacture('PAYEE')} className="flex items-center gap-1.5 px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600">
                <CheckCircle className="w-4 h-4" /> Marquer payée
              </button>
            )}
          </div>
        )}
      </div>

      {!intervention.facture ? (
        <div className="card max-w-xl text-center py-12">
          <FileText className="w-16 h-16 text-steel-200 mx-auto mb-4" />
          <h2 className="font-semibold text-steel-600 mb-2">Aucune facture générée</h2>
          <p className="text-steel-400 text-sm mb-6">
            Créez la facture pour cette intervention.<br />
            Total : <strong>{formatCurrency(intervention.total)}</strong>
          </p>
          {error && <div className="bg-red-50 text-red-600 rounded-lg p-3 text-sm mb-4">{error}</div>}
          <button onClick={createFacture} disabled={creating} className="btn-accent">
            {creating ? <><Loader2 className="w-4 h-4 animate-spin" /> Création...</> : <><Plus className="w-4 h-4" /> Générer la facture</>}
          </button>
        </div>
      ) : (
        /* Facture preview */
        <div className="max-w-3xl">
          {/* Status bar */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <span className={`badge text-sm px-3 py-1 ${getStatutColor(intervention.facture.statut)}`}>
                {getStatutLabel(intervention.facture.statut)}
              </span>
              <span className="text-sm text-steel-400">Émise le {formatDate(intervention.facture.dateEmission)}</span>
            </div>
          </div>

          {/* Facture document preview */}
          <div className="bg-white border border-steel-200 rounded-2xl overflow-hidden shadow-card">
            {/* Header */}
            <div className="bg-sicnaf-500 p-8">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-display text-4xl font-bold text-white">SICNAF</div>
                  <div className="text-accent text-sm mt-1">Solutions Industrielles & Interventions</div>
                </div>
                <div className="text-right text-white">
                  <div className="font-display text-2xl font-bold">FACTURE</div>
                  <div className="text-white/70 text-sm mt-1">{intervention.facture.numero}</div>
                  <div className="text-white/50 text-xs mt-0.5">Émise le {formatDate(intervention.facture.dateEmission)}</div>
                </div>
              </div>
            </div>

            <div className="p-8 space-y-6">
              {/* Client */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-xs text-steel-400 uppercase tracking-wider mb-2">Facturé à</div>
                  <div className="font-semibold">{intervention.client.prenom} {intervention.client.nom}</div>
                  {intervention.client.societe && <div className="text-steel-500">{intervention.client.societe}</div>}
                  <div className="text-steel-400 text-sm">{intervention.client.telephone}</div>
                  {intervention.client.email && <div className="text-steel-400 text-sm">{intervention.client.email}</div>}
                </div>
                <div>
                  <div className="text-xs text-steel-400 uppercase tracking-wider mb-2">Intervention</div>
                  <div className="text-sm text-steel-600">{intervention.description}</div>
                  {intervention.adresseChantier && (
                    <div className="text-steel-400 text-xs mt-1">{intervention.adresseChantier}</div>
                  )}
                </div>
              </div>

              {/* Pièces */}
              {pieces.length > 0 && (
                <div>
                  <div className="bg-sicnaf-500 text-white text-xs font-semibold px-4 py-2 rounded-t-lg">PIÈCES & MATÉRIAUX</div>
                  <table className="w-full text-sm border border-steel-100 rounded-b-lg overflow-hidden">
                    <thead className="bg-steel-50">
                      <tr className="text-xs text-steel-400">
                        <th className="text-left px-4 py-2">Description</th>
                        <th className="text-center px-4 py-2">Qté</th>
                        <th className="text-right px-4 py-2">P.U. HT</th>
                        <th className="text-right px-4 py-2">Total HT</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-steel-50">
                      {pieces.map((p: any) => (
                        <tr key={p.id}>
                          <td className="px-4 py-2.5">{p.description}</td>
                          <td className="px-4 py-2.5 text-center text-steel-500">{p.quantite}</td>
                          <td className="px-4 py-2.5 text-right text-steel-500">{formatCurrency(p.prixUnitaire)}</td>
                          <td className="px-4 py-2.5 text-right font-medium">{formatCurrency(p.total)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Main d'oeuvre */}
              {mainOeuvre.length > 0 && (
                <div>
                  <div className="bg-sicnaf-500 text-white text-xs font-semibold px-4 py-2 rounded-t-lg">MAIN D'ŒUVRE</div>
                  <table className="w-full text-sm border border-steel-100 rounded-b-lg overflow-hidden">
                    <thead className="bg-steel-50">
                      <tr className="text-xs text-steel-400">
                        <th className="text-left px-4 py-2">Description</th>
                        <th className="text-center px-4 py-2">Heures</th>
                        <th className="text-right px-4 py-2">Taux HT</th>
                        <th className="text-right px-4 py-2">Total HT</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-steel-50">
                      {mainOeuvre.map((m: any) => (
                        <tr key={m.id}>
                          <td className="px-4 py-2.5">{m.description}</td>
                          <td className="px-4 py-2.5 text-center text-steel-500">{m.quantite}h</td>
                          <td className="px-4 py-2.5 text-right text-steel-500">{formatCurrency(m.prixUnitaire)}</td>
                          <td className="px-4 py-2.5 text-right font-medium">{formatCurrency(m.total)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Totals */}
              <div className="flex justify-end">
                <div className="w-64 space-y-2 text-sm bg-steel-50 rounded-xl p-4">
                  <div className="flex justify-between">
                    <span className="text-steel-400">Sous-total HT</span>
                    <span>{formatCurrency(intervention.facture.sousTotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-steel-400">TVA ({intervention.facture.tva}%)</span>
                    <span>{formatCurrency(intervention.facture.total - intervention.facture.sousTotal)}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-steel-200 font-bold text-base bg-sicnaf-500 text-white -mx-4 -mb-4 px-4 py-3 rounded-b-xl">
                    <span>TOTAL TTC</span>
                    <span>{formatCurrency(intervention.facture.total)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
