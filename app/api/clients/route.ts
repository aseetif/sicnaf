// app/api/clients/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  const clients = await prisma.client.findMany({
    orderBy: { nom: 'asc' },
    include: { _count: { select: { interventions: true, devis: true } } },
  })
  return NextResponse.json(clients)
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  const body = await req.json()
  const { nom, prenom, telephone, email, adresse, ville, codePostal, societe, siret, notes } = body

  if (!nom || !prenom || !telephone) {
    return NextResponse.json({ error: 'Nom, prénom et téléphone sont requis' }, { status: 400 })
  }

  const client = await prisma.client.create({
    data: { nom, prenom, telephone, email: email || null, adresse: adresse || null, ville: ville || null, codePostal: codePostal || null, societe: societe || null, siret: siret || null, notes: notes || null },
  })
  return NextResponse.json(client, { status: 201 })
}
