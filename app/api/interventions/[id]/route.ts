export const dynamic = 'force-dynamic'

// app/api/interventions/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  const intervention = await prisma.intervention.findUnique({
    where: { id: params.id },
    include: { client: true, lignes: true, facture: true },
  })
  if (!intervention) return NextResponse.json({ error: 'Non trouvé' }, { status: 404 })
  return NextResponse.json(intervention)
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  const body = await req.json()
  const intervention = await prisma.intervention.update({
    where: { id: params.id },
    data: body,
  })
  return NextResponse.json(intervention)
}

// export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
//   const session = await getServerSession(authOptions)
//   if (!session) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

//   await prisma.intervention.delete({ where: { id: params.id } })
//   return NextResponse.json({ success: true })
// }

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  // Supprimer la facture liée d'abord
  await prisma.facture.deleteMany({ where: { interventionId: params.id } })
  
  // Supprimer les lignes
  await prisma.ligneIntervention.deleteMany({ where: { interventionId: params.id } })
  
  // Supprimer l'intervention
  await prisma.intervention.delete({ where: { id: params.id } })
  
  return NextResponse.json({ success: true })
}