export const dynamic = 'force-dynamic'

// app/admin/dashboard/page.tsx
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import Link from 'next/link'
import { Users, ClipboardList, Wrench, FileText, Bell, ArrowRight, TrendingUp } from 'lucide-react'
import { formatCurrency, formatDate, getStatutColor, getStatutLabel } from '@/lib/utils'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  const [
    totalClients,
    totalDevis,
    totalInterventions,
    totalFactures,
    nouvellesDemandes,
    interventionsEnCours,
    facturesImpayees,
    dernieresInterventions,
  ] = await Promise.all([
    prisma.client.count(),
    prisma.devis.count(),
    prisma.intervention.count(),
    prisma.facture.count(),
    prisma.demandeDevis.count({ where: { statut: 'NOUVEAU' } }),
    prisma.intervention.count({ where: { statut: 'EN_COURS' } }),
    prisma.facture.count({ where: { statut: 'EN_ATTENTE' } }),
    prisma.intervention.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: { client: true, facture: true },
    }),
  ])

  const stats = [
    { label: 'Clients', value: totalClients, icon: Users, href: '/admin/clients', color: 'bg-blue-500' },
    { label: 'Devis', value: totalDevis, icon: ClipboardList, href: '/admin/devis', color: 'bg-purple-500' },
    { label: 'Interventions', value: totalInterventions, icon: Wrench, href: '/admin/interventions', color: 'bg-orange-500' },
    { label: 'Factures', value: totalFactures, icon: FileText, href: '/admin/factures', color: 'bg-green-500' },
  ]

  const alerts = [
    { label: 'Nouvelles demandes', count: nouvellesDemandes, href: '/admin/demandes', color: 'text-blue-600 bg-blue-50 border-blue-200' },
    { label: 'Interventions en cours', count: interventionsEnCours, href: '/admin/interventions', color: 'text-orange-600 bg-orange-50 border-orange-200' },
    { label: 'Factures impayées', count: facturesImpayees, href: '/admin/factures', color: 'text-red-600 bg-red-50 border-red-200' },
  ]

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-sicnaf-500">Tableau de bord</h1>
        <p className="text-steel-500 mt-1">Bonjour, {session?.user?.name?.split(' ')[0]} 👋</p>
      </div>

      {/* Alerts */}
      {(nouvellesDemandes > 0 || interventionsEnCours > 0 || facturesImpayees > 0) && (
        <div className="flex flex-wrap gap-3 mb-8">
          {alerts.filter(a => a.count > 0).map((alert) => (
            <Link
              key={alert.label}
              href={alert.href}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium hover:opacity-80 transition-opacity ${alert.color}`}
            >
              <Bell className="w-4 h-4" />
              <span>{alert.count} {alert.label}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          ))}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.href} className="card group">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 ${stat.color} rounded-xl flex items-center justify-center`}>
                <stat.icon className="w-5 h-5 text-white" />
              </div>
              <ArrowRight className="w-4 h-4 text-steel-300 group-hover:text-sicnaf-500 transition-colors" />
            </div>
            <div className="font-display text-3xl font-bold text-steel-900">{stat.value}</div>
            <div className="text-sm text-steel-400 mt-1">{stat.label}</div>
          </Link>
        ))}
      </div>

      {/* Recent interventions */}
      <div className="card">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-sicnaf-500" />
            <h2 className="font-semibold text-steel-900">Dernières interventions</h2>
          </div>
          <Link href="/admin/interventions" className="text-sm text-sicnaf-500 hover:text-sicnaf-600 font-medium flex items-center gap-1">
            Tout voir <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {dernieresInterventions.length === 0 ? (
          <div className="text-center py-8 text-steel-400">
            Aucune intervention pour le moment
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-steel-100">
                  <th className="text-left py-2.5 px-3 text-steel-400 font-medium">N°</th>
                  <th className="text-left py-2.5 px-3 text-steel-400 font-medium">Client</th>
                  <th className="text-left py-2.5 px-3 text-steel-400 font-medium">Description</th>
                  <th className="text-left py-2.5 px-3 text-steel-400 font-medium">Statut</th>
                  <th className="text-left py-2.5 px-3 text-steel-400 font-medium">Total</th>
                  <th className="text-left py-2.5 px-3 text-steel-400 font-medium">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-steel-50">
                {dernieresInterventions.map((inv) => (
                  <tr key={inv.id} className="hover:bg-steel-50 transition-colors">
                    <td className="py-3 px-3 font-mono text-xs text-steel-500">{inv.numero}</td>
                    <td className="py-3 px-3 font-medium">{inv.client.prenom} {inv.client.nom}</td>
                    <td className="py-3 px-3 text-steel-500 max-w-[200px] truncate">{inv.description}</td>
                    <td className="py-3 px-3">
                      <span className={`badge ${getStatutColor(inv.statut)}`}>{getStatutLabel(inv.statut)}</span>
                    </td>
                    <td className="py-3 px-3 font-medium">{formatCurrency(inv.total)}</td>
                    <td className="py-3 px-3 text-steel-400">{formatDate(inv.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
