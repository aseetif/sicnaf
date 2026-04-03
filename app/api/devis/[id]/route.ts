export const dynamic = 'force-dynamic'

// app/api/devis/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  const devis = await prisma.devis.findUnique({
    where: { id: params.id },
    include: { client: true, lignes: true },
  })
  if (!devis) return NextResponse.json({ error: 'Non trouvé' }, { status: 404 })
  return NextResponse.json(devis)
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  const body = await req.json()
  const devis = await prisma.devis.update({
    where: { id: params.id },
    data: body,
  })
  return NextResponse.json(devis)
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  await prisma.devis.delete({ where: { id: params.id } })
  return NextResponse.json({ success: true })
}
