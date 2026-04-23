export const dynamic = 'force-dynamic'

// app/api/devis/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { generateNumero } from '@/lib/utils'

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  const devis = await prisma.devis.findMany({
    orderBy: { createdAt: 'desc' },
    include: { client: true, lignes: true },
  })
  return NextResponse.json(devis)
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  const body = await req.json()
  const { clientId, typeService, description, lignes, sousTotal, total, tva, notes, adresseChantier } = body

  const numero = generateNumero('DEV')

  const devis = await prisma.devis.create({
    data: {
      numero,
      clientId,
      typeService,
      description,
      notes: notes || null,
      adresseChantier: adresseChantier || null,
      sousTotal: sousTotal || 0,
      total: total || 0,
      tva: parseFloat(tva) || 20,
      statut: 'EN_ATTENTE',
      lignes: {
        create: (lignes || []).map((l: any) => ({
          description: l.description,
          quantite: l.quantite,
          prixUnitaire: l.prixUnitaire,
          type: l.type,
          total: l.total,
        })),
      },
    },
    include: { client: true, lignes: true },
  })

  return NextResponse.json(devis, { status: 201 })
}
