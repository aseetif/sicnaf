// app/admin/clients/page.tsx
import { prisma } from '@/lib/prisma'
import { formatDate } from '@/lib/utils'
import Link from 'next/link'
import { Plus, Users, Phone, Mail, Building2 } from 'lucide-react'
import ClientsActions from './ClientsActions'

export default async function ClientsPage() {
  const clients = await prisma.client.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      _count: { select: { interventions: true, devis: true } },
    },
  })

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-sicnaf-500">Clients</h1>
          <p className="text-steel-500 mt-1">{clients.length} client{clients.length > 1 ? 's' : ''} enregistré{clients.length > 1 ? 's' : ''}</p>
        </div>
        <Link href="/admin/clients/nouveau" className="btn-primary">
          <Plus className="w-4 h-4" /> Nouveau client
        </Link>
      </div>

      {clients.length === 0 ? (
        <div className="card text-center py-16">
          <Users className="w-12 h-12 text-steel-200 mx-auto mb-4" />
          <h3 className="font-semibold text-steel-400 mb-2">Aucun client</h3>
          <p className="text-steel-300 text-sm mb-6">Commencez par créer votre premier client</p>
          <Link href="/admin/clients/nouveau" className="btn-primary">
            <Plus className="w-4 h-4" /> Créer un client
          </Link>
        </div>
      ) : (
        <div className="grid gap-4">
          {clients.map((client) => (
            <div key={client.id} className="card">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-sicnaf-500 rounded-xl flex items-center justify-center text-white font-display font-bold text-lg shrink-0">
                  {client.prenom[0]}{client.nom[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="font-semibold">{client.prenom} {client.nom}</h3>
                    {client.societe && (
                      <span className="flex items-center gap-1 text-xs text-steel-400">
                        <Building2 className="w-3 h-3" /> {client.societe}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-steel-400">
                    <span className="flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5" />{client.telephone}
                    </span>
                    {client.email && (
                      <span className="flex items-center gap-1">
                        <Mail className="w-3.5 h-3.5" />{client.email}
                      </span>
                    )}
                    {client.ville && <span>{client.ville}</span>}
                  </div>
                </div>
                <div className="flex items-center gap-6 text-sm shrink-0">
                  <div className="text-center">
                    <div className="font-semibold text-steel-700">{client._count.devis}</div>
                    <div className="text-steel-400 text-xs">Devis</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-steel-700">{client._count.interventions}</div>
                    <div className="text-steel-400 text-xs">Interventions</div>
                  </div>
                  <ClientsActions clientId={client.id} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
