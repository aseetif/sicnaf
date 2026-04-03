export const dynamic = 'force-dynamic'

// app/api/devis/public/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { nom, prenom, email, telephone, societe, typeService, description, adresse, dateSouhaitee } = body

    if (!nom || !prenom || !email || !telephone || !typeService || !description) {
      return NextResponse.json({ error: 'Champs obligatoires manquants' }, { status: 400 })
    }

    const demande = await prisma.demandeDevis.create({
      data: {
        nom,
        prenom,
        email,
        telephone,
        societe: societe || null,
        typeService,
        description,
        adresse: adresse || null,
        datesouhaitee: dateSouhaitee || null,
        statut: 'NOUVEAU',
      },
    })

    return NextResponse.json({ success: true, id: demande.id })
  } catch (error) {
    console.error('Error creating demande:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
