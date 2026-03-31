// app/admin/interventions/[id]/page.tsx
import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { formatDate, formatCurrency, getStatutColor, getStatutLabel, getTypeServiceLabel } from '@/lib/utils'
import Link from 'next/link'
import { ArrowLeft, FileText, Plus, Edit3, MapPin, User, Wrench, Calendar } from 'lucide-react'
import InterventionDetailActions from './InterventionDetailActions'

export default async function InterventionDetailPage({ params }: { params: { id: string } }) {
  const intervention = await prisma.intervention.findUnique({
    where: { id: params.id },
    include: {
      client: true,
      facture: true,
      lignes: true,
      devis: true,
    },
  })

  if (!intervention) notFound()

  const pieces = intervention.lignes.filter(l => l.type === 'PIECE')
  const mainOeuvre = intervention.lignes.filter(l => l.type === 'MAIN_OEUVRE')

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin/interventions" className="p-2 rounded-xl hover:bg-steel-100 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="font-display text-2xl font-bold text-sicnaf-500">Intervention</h1>
            <span className="font-mono text-sm text-steel-400">{intervention.numero}</span>
            <span className={`badge ${getStatutColor(intervention.statut)}`}>{getStatutLabel(intervention.statut)}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <InterventionDetailActions intervention={intervention} />
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Description */}
          <div className="card">
            <h2 className="font-semibold text-sicnaf-500 mb-4 flex items-center gap-2">
              <Wrench className="w-4 h-4" /> Description de l'intervention
            </h2>
            <p className="text-steel-600 leading-relaxed">{intervention.description}</p>
            {intervention.notes && (
              <div className="mt-4 pt-4 border-t border-steel-100">
                <p className="text-xs text-steel-400 mb-1">Notes internes</p>
                <p className="text-steel-500 text-sm">{intervention.notes}</p>
              </div>
            )}
          </div>

          {/* Pièces */}
          {pieces.length > 0 && (
            <div className="card">
              <h2 className="font-semibold text-sicnaf-500 mb-4">Pièces & Matériaux</h2>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-steel-100 text-steel-400 text-xs">
                    <th className="text-left pb-2">Description</th>
                    <th className="text-center pb-2">Qté</th>
                    <th className="text-right pb-2">P.U. HT</th>
                    <th className="text-right pb-2">Total HT</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-steel-50">
                  {pieces.map((p) => (
                    <tr key={p.id}>
                      <td className="py-2.5">{p.description}</td>
                      <td className="py-2.5 text-center text-steel-500">{p.quantite}</td>
                      <td className="py-2.5 text-right text-steel-500">{formatCurrency(p.prixUnitaire)}</td>
                      <td className="py-2.5 text-right font-medium">{formatCurrency(p.total)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Main d'œuvre */}
          {mainOeuvre.length > 0 && (
            <div className="card">
              <h2 className="font-semibold text-sicnaf-500 mb-4">Main d'œuvre</h2>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-steel-100 text-steel-400 text-xs">
                    <th className="text-left pb-2">Description</th>
                    <th className="text-center pb-2">Heures</th>
                    <th className="text-right pb-2">Taux HT</th>
                    <th className="text-right pb-2">Total HT</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-steel-50">
                  {mainOeuvre.map((m) => (
                    <tr key={m.id}>
                      <td className="py-2.5">{m.description}</td>
                      <td className="py-2.5 text-center text-steel-500">{m.quantite}h</td>
                      <td className="py-2.5 text-right text-steel-500">{formatCurrency(m.prixUnitaire)}</td>
                      <td className="py-2.5 text-right font-medium">{formatCurrency(m.total)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Totals */}
          <div className="card">
            <div className="flex justify-end">
              <div className="w-64 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-steel-400">Sous-total HT</span>
                  <span>{formatCurrency(intervention.sousTotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-steel-400">TVA ({intervention.tva}%)</span>
                  <span>{formatCurrency(intervention.total - intervention.sousTotal)}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-steel-200 font-bold text-base">
                  <span className="text-sicnaf-500">Total TTC</span>
                  <span className="text-sicnaf-500">{formatCurrency(intervention.total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          {/* Client info */}
          <div className="card">
            <h3 className="font-semibold text-steel-700 mb-3 flex items-center gap-2">
              <User className="w-4 h-4" /> Client
            </h3>
            <div className="space-y-1.5 text-sm">
              <div className="font-medium">{intervention.client.prenom} {intervention.client.nom}</div>
              {intervention.client.societe && <div className="text-steel-500">{intervention.client.societe}</div>}
              <div className="text-steel-500">{intervention.client.telephone}</div>
              {intervention.client.email && <div className="text-steel-400">{intervention.client.email}</div>}
            </div>
            <Link href={`/admin/clients/${intervention.clientId}`} className="mt-3 text-xs text-sicnaf-500 hover:underline block">
              Voir la fiche client →
            </Link>
          </div>

          {/* Details */}
          <div className="card space-y-3 text-sm">
            <h3 className="font-semibold text-steel-700">Détails</h3>
            <div className="flex items-start gap-2 text-steel-500">
              <Calendar className="w-4 h-4 mt-0.5 shrink-0 text-steel-300" />
              <div>
                <div className="text-xs text-steel-400">Date début</div>
                {formatDate(intervention.dateDebut)}
              </div>
            </div>
            {intervention.dateFin && (
              <div className="flex items-start gap-2 text-steel-500">
                <Calendar className="w-4 h-4 mt-0.5 shrink-0 text-steel-300" />
                <div>
                  <div className="text-xs text-steel-400">Date fin</div>
                  {formatDate(intervention.dateFin)}
                </div>
              </div>
            )}
            <div className="flex items-start gap-2 text-steel-500">
              <Wrench className="w-4 h-4 mt-0.5 shrink-0 text-steel-300" />
              <div>
                <div className="text-xs text-steel-400">Type</div>
                {getTypeServiceLabel(intervention.typeService)}
              </div>
            </div>
            {intervention.adresseChantier && (
              <div className="flex items-start gap-2 text-steel-500">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-steel-300" />
                <div>
                  <div className="text-xs text-steel-400">Chantier</div>
                  {intervention.adresseChantier}
                </div>
              </div>
            )}
            {intervention.technicien && (
              <div>
                <div className="text-xs text-steel-400">Technicien</div>
                <div>{intervention.technicien}</div>
              </div>
            )}
          </div>

          {/* Facture */}
          <div className="card">
            <h3 className="font-semibold text-steel-700 mb-3 flex items-center gap-2">
              <FileText className="w-4 h-4" /> Facture
            </h3>
            {intervention.facture ? (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-mono text-xs text-steel-500">{intervention.facture.numero}</span>
                  <span className={`badge ${getStatutColor(intervention.facture.statut)}`}>{getStatutLabel(intervention.facture.statut)}</span>
                </div>
                <div className="text-lg font-bold text-sicnaf-500">{formatCurrency(intervention.facture.total)}</div>
                <Link href={`/admin/interventions/${intervention.id}/facture`} className="mt-3 btn-primary text-sm w-full justify-center">
                  Voir la facture
                </Link>
              </div>
            ) : (
              <div>
                <p className="text-steel-400 text-sm mb-3">Aucune facture générée</p>
                <Link href={`/admin/interventions/${intervention.id}/facture`} className="btn-accent text-sm w-full justify-center">
                  <Plus className="w-4 h-4" /> Générer la facture
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
