import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import ModifierDevisForm from './ModifierDevisForm'

export default async function ModifierDevisPage({ params }: { params: { id: string } }) {
  const devis = await prisma.devis.findUnique({
    where: { id: params.id },
    include: { client: true, lignes: true },
  })
  if (!devis) notFound()

  const clients = await prisma.client.findMany({ orderBy: { nom: 'asc' } })

  return (
    <div>
      <h1 className="font-display text-3xl font-bold text-sicnaf-500 mb-8">Modifier le devis</h1>
      <ModifierDevisForm devis={devis} clients={clients} />
    </div>
  )
}