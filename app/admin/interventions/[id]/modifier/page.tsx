import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import ModifierInterventionForm from './ModifierInterventionForm'

export default async function ModifierInterventionPage({ params }: { params: { id: string } }) {
  const intervention = await prisma.intervention.findUnique({
    where: { id: params.id },
    include: { client: true, lignes: true },
  })
  if (!intervention) notFound()

  const clients = await prisma.client.findMany({ orderBy: { nom: 'asc' } })

  return (
    <div>
      <h1 className="font-display text-3xl font-bold text-sicnaf-500 mb-8">Modifier l'intervention</h1>
      <ModifierInterventionForm intervention={intervention} clients={clients} />
    </div>
  )
}