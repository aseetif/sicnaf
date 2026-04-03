export const dynamic = 'force-dynamic'

// app/admin/devis/nouveau/page.tsx
import { prisma } from '@/lib/prisma'
import NouveauDevisForm from './NouveauDevisForm'

export default async function NouveauDevisPage() {
  const clients = await prisma.client.findMany({ orderBy: { nom: 'asc' } })
  return (
    <div>
      <h1 className="font-display text-3xl font-bold text-sicnaf-500 mb-8">Nouveau devis</h1>
      <NouveauDevisForm clients={clients} />
    </div>
  )
}
