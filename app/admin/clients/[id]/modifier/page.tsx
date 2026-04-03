export const dynamic = 'force-dynamic'

// app/admin/clients/[id]/modifier/page.tsx
import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import ClientEditForm from './ClientEditForm'

export default async function ModifierClientPage({ params }: { params: { id: string } }) {
  const client = await prisma.client.findUnique({ where: { id: params.id } })
  if (!client) notFound()

  return (
    <div>
      <h1 className="font-display text-3xl font-bold text-sicnaf-500 mb-8">
        Modifier le client
      </h1>
      <ClientEditForm client={client} />
    </div>
  )
}
