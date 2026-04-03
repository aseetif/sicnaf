export const dynamic = 'force-dynamic'

// app/admin/devis/[id]/page.tsx
import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { formatDate, formatCurrency, getStatutColor, getStatutLabel, getTypeServiceLabel } from '@/lib/utils'
import Link from 'next/link'
import { ArrowLeft, Download, User, MapPin, Calendar, Edit } from 'lucide-react'
import DevisDetailActions from './DevisDetailActions'

export default async function DevisDetailPage({ params }: { params: { id: string } }) {
  const devis = await prisma.devis.findUnique({
    where: { id: params.id },
    include: { client: true, lignes: true },
  })

  if (!devis) notFound()

  const pieces = devis.lignes.filter(l => l.type === 'PIECE')
  const mainOeuvre = devis.lignes.filter(l => l.type === 'MAIN_OEUVRE')

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin/devis" className="p-2 rounded-xl hover:bg-steel-100">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="font-display text-2xl font-bold text-sicnaf-500">Devis</h1>
            <span className="font-mono text-sm text-steel-400">{devis.numero}</span>
            <span className={`badge ${getStatutColor(devis.statut)}`}>{getStatutLabel(devis.statut)}</span>
          </div>
        </div>
        <div className="flex gap-2">
  <Link href={`/admin/devis/${devis.id}/modifier`} className="btn-outline text-sm">
    <Edit className="w-4 h-4" /> Modifier
  </Link>
  <DevisDetailActions devis={devis} />
</div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Description */}
          <div className="card">
            <h2 className="font-semibold text-sicnaf-500 mb-3">Description</h2>
            <p className="text-steel-600">{devis.description}</p>
            {devis.notes && (
              <div className="mt-3 pt-3 border-t border-steel-100 text-sm text-steel-400">
                Notes : {devis.notes}
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
                  {pieces.map(p => (
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

          {/* M.O. */}
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
                  {mainOeuvre.map(m => (
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

          {/* Totaux */}
          <div className="card">
            <div className="flex justify-end">
              <div className="w-64 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-steel-400">Sous-total HT</span>
                  <span>{formatCurrency(devis.sousTotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-steel-400">TVA ({devis.tva}%)</span>
                  <span>{formatCurrency(devis.total - devis.sousTotal)}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-steel-200 font-bold text-base">
                  <span className="text-sicnaf-500">Total TTC</span>
                  <span className="text-sicnaf-500">{formatCurrency(devis.total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          <div className="card">
            <h3 className="font-semibold text-steel-700 mb-3 flex items-center gap-2">
              <User className="w-4 h-4" /> Client
            </h3>
            <div className="space-y-1 text-sm">
              <div className="font-medium">{devis.client.prenom} {devis.client.nom}</div>
              {devis.client.societe && <div className="text-steel-400">{devis.client.societe}</div>}
              <div className="text-steel-500">{devis.client.telephone}</div>
            </div>
            <Link href={`/admin/clients/${devis.clientId}`} className="text-xs text-sicnaf-500 hover:underline mt-2 block">
              Voir la fiche →
            </Link>
          </div>

          <div className="card space-y-3 text-sm">
            <h3 className="font-semibold text-steel-700">Informations</h3>
            <div>
              <div className="text-xs text-steel-400">Date</div>
              <div className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-steel-300" />{formatDate(devis.createdAt)}</div>
            </div>
            <div>
              <div className="text-xs text-steel-400">Type de service</div>
              <div>{getTypeServiceLabel(devis.typeService)}</div>
            </div>
            {devis.adresseChantier && (
              <div>
                <div className="text-xs text-steel-400">Adresse chantier</div>
                <div className="flex items-start gap-1.5"><MapPin className="w-3.5 h-3.5 text-steel-300 mt-0.5" />{devis.adresseChantier}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
