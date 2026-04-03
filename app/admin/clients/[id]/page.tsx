export const dynamic = 'force-dynamic'

// app/admin/clients/[id]/page.tsx
import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { formatDate, formatCurrency, getStatutColor, getStatutLabel } from '@/lib/utils'
import Link from 'next/link'
import { ArrowLeft, Edit, Phone, Mail, MapPin, Building2, Wrench, ClipboardList } from 'lucide-react'

export default async function ClientDetailPage({ params }: { params: { id: string } }) {
  const client = await prisma.client.findUnique({
    where: { id: params.id },
    include: {
      interventions: { orderBy: { createdAt: 'desc' }, include: { facture: true } },
      devis: { orderBy: { createdAt: 'desc' } },
    },
  })

  if (!client) notFound()

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin/clients" className="p-2 rounded-xl hover:bg-steel-100">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div className="flex-1">
          <h1 className="font-display text-2xl font-bold text-sicnaf-500">
            {client.prenom} {client.nom}
          </h1>
          {client.societe && <p className="text-steel-400 text-sm">{client.societe}</p>}
        </div>
        <Link href={`/admin/clients/${client.id}/modifier`} className="btn-outline text-sm">
          <Edit className="w-4 h-4" /> Modifier
        </Link>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Info card */}
        <div className="space-y-5">
          <div className="card">
            <div className="w-16 h-16 bg-sicnaf-500 rounded-2xl flex items-center justify-center text-white font-display font-bold text-2xl mx-auto mb-4">
              {client.prenom[0]}{client.nom[0]}
            </div>
            <h2 className="font-semibold text-center mb-4">{client.prenom} {client.nom}</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2 text-steel-600">
                <Phone className="w-4 h-4 text-sicnaf-400" />
                <a href={`tel:${client.telephone}`} className="hover:text-sicnaf-500">{client.telephone}</a>
              </div>
              {client.email && (
                <div className="flex items-center gap-2 text-steel-600">
                  <Mail className="w-4 h-4 text-sicnaf-400" />
                  <a href={`mailto:${client.email}`} className="hover:text-sicnaf-500">{client.email}</a>
                </div>
              )}
              {client.adresse && (
                <div className="flex items-start gap-2 text-steel-600">
                  <MapPin className="w-4 h-4 text-sicnaf-400 mt-0.5" />
                  <span>{client.adresse}{client.ville ? `, ${client.ville}` : ''}{client.codePostal ? ` ${client.codePostal}` : ''}</span>
                </div>
              )}
              {client.societe && (
                <div className="flex items-center gap-2 text-steel-600">
                  <Building2 className="w-4 h-4 text-sicnaf-400" />
                  <span>{client.societe}</span>
                </div>
              )}
              {client.siret && (
                <div className="text-steel-400 text-xs pt-1">SIRET : {client.siret}</div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="card text-center py-4">
              <div className="font-display text-2xl font-bold text-sicnaf-500">{client.interventions.length}</div>
              <div className="text-xs text-steel-400 mt-1">Interventions</div>
            </div>
            <div className="card text-center py-4">
              <div className="font-display text-2xl font-bold text-sicnaf-500">{client.devis.length}</div>
              <div className="text-xs text-steel-400 mt-1">Devis</div>
            </div>
          </div>
        </div>

        {/* History */}
        <div className="lg:col-span-2 space-y-6">
          {/* Interventions */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-steel-700 flex items-center gap-2">
                <Wrench className="w-4 h-4" /> Interventions
              </h3>
              <Link href={`/admin/interventions/nouvelle?clientId=${client.id}`} className="text-xs text-sicnaf-500 hover:underline">
                + Nouvelle
              </Link>
            </div>
            {client.interventions.length === 0 ? (
              <p className="text-steel-300 text-sm italic">Aucune intervention</p>
            ) : (
              <div className="space-y-2">
                {client.interventions.map((inv) => (
                  <Link key={inv.id} href={`/admin/interventions/${inv.id}`} className="flex items-center justify-between p-3 rounded-xl hover:bg-steel-50 transition-colors group">
                    <div>
                      <div className="font-mono text-xs text-steel-400">{inv.numero}</div>
                      <div className="text-sm font-medium text-steel-700 mt-0.5 line-clamp-1">{inv.description}</div>
                      <div className="text-xs text-steel-400">{formatDate(inv.createdAt)}</div>
                    </div>
                    <div className="text-right">
                      <span className={`badge ${getStatutColor(inv.statut)}`}>{getStatutLabel(inv.statut)}</span>
                      <div className="font-semibold text-sm mt-1">{formatCurrency(inv.total)}</div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Devis */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-steel-700 flex items-center gap-2">
                <ClipboardList className="w-4 h-4" /> Devis
              </h3>
            </div>
            {client.devis.length === 0 ? (
              <p className="text-steel-300 text-sm italic">Aucun devis</p>
            ) : (
              <div className="space-y-2">
                {client.devis.map((d) => (
                  <div key={d.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-steel-50">
                    <div>
                      <div className="font-mono text-xs text-steel-400">{d.numero}</div>
                      <div className="text-sm font-medium text-steel-700 mt-0.5 line-clamp-1">{d.description}</div>
                      <div className="text-xs text-steel-400">{formatDate(d.createdAt)}</div>
                    </div>
                    <div className="text-right">
                      <span className={`badge ${getStatutColor(d.statut)}`}>{getStatutLabel(d.statut)}</span>
                      <div className="font-semibold text-sm mt-1">{formatCurrency(d.total)}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
