// prisma/seed.js
const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create admin user
  const hashedPassword = await bcrypt.hash('Admin@Sicnaf2024!', 12)

  const admin = await prisma.user.upsert({
    where: { email: 'admin@sicnaf.fr' },
    update: {},
    create: {
      email: 'admin@sicnaf.fr',
      password: hashedPassword,
      name: 'Administrateur SICNAF',
      role: 'ADMIN',
    },
  })

  console.log('✅ Admin user created:', admin.email)

  // Create a sample client
  const client = await prisma.client.upsert({
    where: { id: 'client-demo-001' },
    update: {},
    create: {
      id: 'client-demo-001',
      nom: 'Martin',
      prenom: 'Jean',
      email: 'jean.martin@example.fr',
      telephone: '06 12 34 56 78',
      adresse: '12 Rue de l\'Industrie',
      ville: 'Lyon',
      codePostal: '69001',
      societe: 'Industrie Martin SARL',
      siret: '12345678900012',
    },
  })

  console.log('✅ Sample client created:', client.societe)

  console.log('\n📋 Login credentials:')
  console.log('   Email: admin@sicnaf.fr')
  console.log('   Password: Admin@Sicnaf2024!')
  console.log('\n🚀 Seeding complete!')
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
