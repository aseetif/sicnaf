// app/admin/interventions/nouvelle/page.tsx
import { prisma } from '@/lib/prisma'
import NouvelleInterventionForm from './NouvelleInterventionForm'

export default async function NouvelleInterventionPage() {
  const clients = await prisma.client.findMany({ orderBy: { nom: 'asc' } })
  return (
    <div>
      <h1 className="font-display text-3xl font-bold text-sicnaf-500 mb-8">Nouvelle intervention</h1>
      <NouvelleInterventionForm clients={clients} />
    </div>
  )
}
