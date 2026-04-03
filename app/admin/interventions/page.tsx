export const dynamic = 'force-dynamic'

// app/admin/interventions/page.tsx
import { prisma } from '@/lib/prisma'
import { formatDate, formatCurrency, getStatutColor, getStatutLabel, getTypeServiceLabel } from '@/lib/utils'
import Link from 'next/link'
import { Plus, Wrench } from 'lucide-react'
import InterventionActions from './InterventionActions'

export default async function InterventionsPage() {
  const interventions = await prisma.intervention.findMany({
    orderBy: { createdAt: 'desc' },
    include: { client: true, facture: true },
  })

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-sicnaf-500">Interventions</h1>
          <p className="text-steel-500 mt-1">{interventions.length} intervention{interventions.length > 1 ? 's' : ''}</p>
        </div>
        <Link href="/admin/interventions/nouvelle" className="btn-primary">
          <Plus className="w-4 h-4" /> Nouvelle intervention
        </Link>
      </div>

      {interventions.length === 0 ? (
        <div className="card text-center py-16">
          <Wrench className="w-12 h-12 text-steel-200 mx-auto mb-4" />
          <h3 className="font-semibold text-steel-400 mb-2">Aucune intervention</h3>
          <Link href="/admin/interventions/nouvelle" className="btn-primary mt-4">
            <Plus className="w-4 h-4" /> Créer une intervention
          </Link>
        </div>
      ) : (
        <div className="card overflow-hidden p-0">
          <table className="w-full text-sm">
            <thead className="bg-steel-50 border-b border-steel-100">
              <tr>
                <th className="text-left py-3.5 px-4 text-steel-400 font-medium">N°</th>
                <th className="text-left py-3.5 px-4 text-steel-400 font-medium">Client</th>
                <th className="text-left py-3.5 px-4 text-steel-400 font-medium">Type</th>
                <th className="text-left py-3.5 px-4 text-steel-400 font-medium">Statut</th>
                <th className="text-left py-3.5 px-4 text-steel-400 font-medium">Facture</th>
                <th className="text-left py-3.5 px-4 text-steel-400 font-medium">Total</th>
                <th className="text-left py-3.5 px-4 text-steel-400 font-medium">Date</th>
                <th className="py-3.5 px-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-steel-50">
              {interventions.map((inv) => (
                <tr key={inv.id} className="hover:bg-steel-50 transition-colors">
                  <td className="py-3.5 px-4 font-mono text-xs text-steel-500">{inv.numero}</td>
                  <td className="py-3.5 px-4 font-medium">{inv.client.prenom} {inv.client.nom}</td>
                  <td className="py-3.5 px-4 text-steel-500">{getTypeServiceLabel(inv.typeService)}</td>
                  <td className="py-3.5 px-4">
                    <span className={`badge ${getStatutColor(inv.statut)}`}>{getStatutLabel(inv.statut)}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    {inv.facture ? (
                      <span className={`badge ${getStatutColor(inv.facture.statut)}`}>{getStatutLabel(inv.facture.statut)}</span>
                    ) : (
                      <span className="text-steel-300 text-xs">Aucune</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 font-semibold">{formatCurrency(inv.total)}</td>
                  <td className="py-3.5 px-4 text-steel-400">{formatDate(inv.createdAt)}</td>
                  <td className="py-3.5 px-4">
                    <InterventionActions interventionId={inv.id} hasFacture={!!inv.facture} />
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
