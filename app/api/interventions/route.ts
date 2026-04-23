export const dynamic = 'force-dynamic'

// app/api/interventions/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { generateNumero } from '@/lib/utils'

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  const interventions = await prisma.intervention.findMany({
    orderBy: { createdAt: 'desc' },
    include: { client: true, facture: true },
  })
  return NextResponse.json(interventions)
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  const body = await req.json()
  const { clientId, typeService, description, adresseChantier, technicien, notes, lignes, sousTotal, total, tva } = body

  const numero = generateNumero('INT')

  const intervention = await prisma.intervention.create({
    data: {
      numero,
      clientId,
      typeService,
      description,
      adresseChantier: adresseChantier || null,
      technicien: technicien || null,
      notes: notes || null,
      sousTotal: sousTotal || 0,
      total: total || 0,
      tva: parseFloat(tva) || 20,
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

  return NextResponse.json(intervention, { status: 201 })
}
