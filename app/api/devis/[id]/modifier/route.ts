import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  const body = await req.json()
  const { clientId, typeService, description, adresseChantier, notes, lignes, sousTotal, total, tva, statut } = body

  await prisma.ligneDevis.deleteMany({ where: { devisId: params.id } })

  const devis = await prisma.devis.update({
    where: { id: params.id },
    data: {
      clientId,
      typeService,
      description,
      adresseChantier: adresseChantier || null,
      notes: notes || null,
      sousTotal,
      total,
      tva: Number(tva),
      statut,
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
  })

  return NextResponse.json(devis)
}