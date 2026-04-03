export const dynamic = 'force-dynamic'

// app/admin/factures/page.tsx
import { prisma } from '@/lib/prisma'
import { formatDate, formatCurrency, getStatutColor, getStatutLabel } from '@/lib/utils'
import Link from 'next/link'
import { FileText, TrendingUp } from 'lucide-react'
import FactureActions from './FactureActions'

export default async function FacturesPage() {
  const factures = await prisma.facture.findMany({
    orderBy: { createdAt: 'desc' },
    include: { intervention: { include: { client: true } } },
  })

  const totalPayees = factures.filter(f => f.statut === 'PAYEE').reduce((acc, f) => acc + f.total, 0)
  const totalAttente = factures.filter(f => f.statut === 'EN_ATTENTE').reduce((acc, f) => acc + f.total, 0)

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-sicnaf-500">Factures</h1>
        <p className="text-steel-500 mt-1">{factures.length} facture{factures.length > 1 ? 's' : ''}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-5 mb-8">
        <div className="card">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-green-600" />
            </div>
            <span className="text-steel-400 text-sm">Encaissé</span>
          </div>
          <div className="font-display text-2xl font-bold text-green-600">{formatCurrency(totalPayees)}</div>
        </div>
        <div className="card">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
              <FileText className="w-4 h-4 text-yellow-600" />
            </div>
            <span className="text-steel-400 text-sm">En attente</span>
          </div>
          <div className="font-display text-2xl font-bold text-yellow-600">{formatCurrency(totalAttente)}</div>
        </div>
      </div>

      {factures.length === 0 ? (
        <div className="card text-center py-16">
          <FileText className="w-12 h-12 text-steel-200 mx-auto mb-4" />
          <h3 className="font-semibold text-steel-400">Aucune facture</h3>
          <p className="text-steel-300 text-sm mt-2">Les factures apparaîtront ici après création d'une intervention</p>
        </div>
      ) : (
        <div className="card overflow-hidden p-0">
          <table className="w-full text-sm">
            <thead className="bg-steel-50 border-b border-steel-100">
              <tr>
                <th className="text-left py-3.5 px-4 text-steel-400 font-medium">N° Facture</th>
                <th className="text-left py-3.5 px-4 text-steel-400 font-medium">Client</th>
                <th className="text-left py-3.5 px-4 text-steel-400 font-medium">Intervention</th>
                <th className="text-left py-3.5 px-4 text-steel-400 font-medium">Statut</th>
                <th className="text-right py-3.5 px-4 text-steel-400 font-medium">Total TTC</th>
                <th className="text-left py-3.5 px-4 text-steel-400 font-medium">Date</th>
                <th className="py-3.5 px-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-steel-50">
              {factures.map((facture) => (
                <tr key={facture.id} className="hover:bg-steel-50 transition-colors">
                  <td className="py-3.5 px-4 font-mono text-xs text-steel-500">{facture.numero}</td>
                  <td className="py-3.5 px-4 font-medium">
                    {facture.intervention.client.prenom} {facture.intervention.client.nom}
                    {facture.intervention.client.societe && (
                      <div className="text-xs text-steel-400">{facture.intervention.client.societe}</div>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-steel-500 max-w-[200px] truncate">
                    {facture.intervention.description}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`badge ${getStatutColor(facture.statut)}`}>{getStatutLabel(facture.statut)}</span>
                  </td>
                  <td className="py-3.5 px-4 text-right font-bold text-sicnaf-500">{formatCurrency(facture.total)}</td>
                  <td className="py-3.5 px-4 text-steel-400">{formatDate(facture.createdAt)}</td>
                  <td className="py-3.5 px-4">
                    <FactureActions facture={facture} interventionId={facture.interventionId} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
