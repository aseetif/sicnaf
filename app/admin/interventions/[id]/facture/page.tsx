// app/admin/interventions/[id]/facture/page.tsx
import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import FactureView from './FactureView'

export default async function FacturePage({ params }: { params: { id: string } }) {
  const intervention = await prisma.intervention.findUnique({
    where: { id: params.id },
    include: {
      client: true,
      lignes: true,
      facture: true,
    },
  })

  if (!intervention) notFound()

  return (
    <div>
      <FactureView intervention={intervention} />
    </div>
  )
}
