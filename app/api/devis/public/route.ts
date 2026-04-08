import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { nom, prenom, email, telephone, societe, typeService, description, adresse, dateSouhaitee, tonnage, dimensions, marqueVehicule } = body

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
        tonnage: tonnage || null,
        dimensions: dimensions || null,
        marqueVehicule: marqueVehicule || null,
        statut: 'NOUVEAU',
      },
    })

    return NextResponse.json({ success: true, id: demande.id })
  } catch (error) {
    console.error('Error creating demande:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}