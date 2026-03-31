// app/api/factures/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { generateNumero } from '@/lib/utils'

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  const factures = await prisma.facture.findMany({
    orderBy: { createdAt: 'desc' },
    include: { intervention: { include: { client: true } } },
  })
  return NextResponse.json(factures)
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  const { interventionId } = await req.json()

  // Check if facture already exists
  const existing = await prisma.facture.findUnique({ where: { interventionId } })
  if (existing) return NextResponse.json({ error: 'Facture déjà existante' }, { status: 400 })

  const intervention = await prisma.intervention.findUnique({ where: { id: interventionId } })
  if (!intervention) return NextResponse.json({ error: 'Intervention non trouvée' }, { status: 404 })

  const numero = generateNumero('FAC')

  const facture = await prisma.facture.create({
    data: {
      numero,
      interventionId,
      sousTotal: intervention.sousTotal,
      tva: intervention.tva,
      total: intervention.total,
      statut: 'EN_ATTENTE',
    },
  })

  // Mark intervention as terminated
  await prisma.intervention.update({
    where: { id: interventionId },
    data: { statut: 'TERMINEE' },
  })

  return NextResponse.json(facture, { status: 201 })
}
