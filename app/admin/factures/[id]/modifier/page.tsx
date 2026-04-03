export const dynamic = 'force-dynamic'

import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import ModifierFactureForm from './ModifierFactureForm'

export default async function ModifierFacturePage({ params }: { params: { id: string } }) {
  const facture = await prisma.facture.findUnique({
    where: { id: params.id },
    include: { intervention: { include: { client: true, lignes: true } } },
  })
  if (!facture) notFound()

  return (
    <div>
      <h1 className="font-display text-3xl font-bold text-sicnaf-500 mb-8">Modifier la facture</h1>
      <ModifierFactureForm facture={facture} />
    </div>
  )
}