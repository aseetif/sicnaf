export const dynamic = 'force-dynamic'

// app/admin/devis/page.tsx
import { prisma } from '@/lib/prisma'
import { formatDate, formatCurrency, getStatutColor, getStatutLabel, getTypeServiceLabel } from '@/lib/utils'
import Link from 'next/link'
import { Plus, ClipboardList } from 'lucide-react'
import DevisActions from './DevisActions'

export default async function DevisPage() {
  const devis = await prisma.devis.findMany({
    orderBy: { createdAt: 'desc' },
    include: { client: true },
  })

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-sicnaf-500">Devis</h1>
          <p className="text-steel-500 mt-1">{devis.length} devis</p>
        </div>
        <Link href="/admin/devis/nouveau" className="btn-primary">
          <Plus className="w-4 h-4" /> Nouveau devis
        </Link>
      </div>

      {devis.length === 0 ? (
        <div className="card text-center py-16">
          <ClipboardList className="w-12 h-12 text-steel-200 mx-auto mb-4" />
          <h3 className="font-semibold text-steel-400 mb-2">Aucun devis</h3>
          <Link href="/admin/devis/nouveau" className="btn-primary mt-4">
            <Plus className="w-4 h-4" /> Créer un devis
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
                <th className="text-right py-3.5 px-4 text-steel-400 font-medium">Total TTC</th>
                <th className="text-left py-3.5 px-4 text-steel-400 font-medium">Date</th>
                <th className="py-3.5 px-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-steel-50">
              {devis.map((d) => (
                <tr key={d.id} className="hover:bg-steel-50 transition-colors">
                  <td className="py-3.5 px-4 font-mono text-xs text-steel-500">{d.numero}</td>
                  <td className="py-3.5 px-4 font-medium">{d.client.prenom} {d.client.nom}</td>
                  <td className="py-3.5 px-4 text-steel-500">{getTypeServiceLabel(d.typeService)}</td>
                  <td className="py-3.5 px-4">
                    <span className={`badge ${getStatutColor(d.statut)}`}>{getStatutLabel(d.statut)}</span>
                  </td>
                  <td className="py-3.5 px-4 text-right font-bold text-sicnaf-500">{formatCurrency(d.total)}</td>
                  <td className="py-3.5 px-4 text-steel-400">{formatDate(d.createdAt)}</td>
                  <td className="py-3.5 px-4">
                    <DevisActions devisId={d.id} />
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
