export const dynamic = 'force-dynamic'

// app/admin/demandes/page.tsx
import { prisma } from '@/lib/prisma'
import { formatDate, getStatutColor, getStatutLabel, getTypeServiceLabel } from '@/lib/utils'
import DemandesClient from './DemandesClient'

export default async function DemandesPage() {
  const demandes = await prisma.demandeDevis.findMany({
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-sicnaf-500">Demandes de devis</h1>
        <p className="text-steel-500 mt-1">Demandes envoyées depuis le site</p>
      </div>
      <DemandesClient demandes={demandes} />
    </div>
  )
}
