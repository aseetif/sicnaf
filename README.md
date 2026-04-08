# SICNAF — Plateforme de Gestion des Interventions Industrielles

Site web professionnel + interface d'administration pour la gestion des interventions industrielles (bennes, conteneurs, réparation, maintenance).

## 🚀 Technologies

- **Framework** : Next.js 14 (App Router)
- **Base de données** : SQLite (développement) / PostgreSQL (production) via Prisma ORM
- **Authentification** : NextAuth.js
- **Styling** : Tailwind CSS
- **PDF** : jsPDF + jsPDF-AutoTable
- **Language** : TypeScript

## 📁 Structure du projet

```
sicnaf/
├── app/
│   ├── page.tsx                    # Page d'accueil publique
│   ├── devis/page.tsx              # Formulaire de demande de devis
│   ├── contact/page.tsx            # Page contact
│   ├── admin/
│   │   ├── login/page.tsx          # Connexion admin
│   │   ├── dashboard/page.tsx      # Tableau de bord
│   │   ├── demandes/               # Demandes clients
│   │   ├── clients/                # Gestion clients
│   │   ├── devis/                  # Gestion devis
│   │   ├── interventions/          # Gestion interventions
│   │   └── factures/               # Gestion factures
│   └── api/
│       ├── auth/[...nextauth]/     # API authentification
│       ├── clients/                # API clients
│       ├── devis/                  # API devis
│       ├── interventions/          # API interventions
│       ├── factures/               # API factures
│       └── demandes/               # API demandes
├── components/
│   ├── public/                     # Composants publics (Navbar, Footer)
│   └── admin/                      # Composants admin (Sidebar)
├── lib/
│   ├── prisma.ts                   # Client Prisma
│   ├── auth.ts                     # Configuration NextAuth
│   ├── utils.ts                    # Fonctions utilitaires
│   └── pdf.ts                      # Génération PDF
├── prisma/
│   ├── schema.prisma               # Schéma base de données
│   └── seed.js                     # Données initiales
└── public/                         # Fichiers statiques
```

## ⚡ Installation & Démarrage

### 1. Cloner le dépôt

```bash
git clone https://github.com/votre-username/sicnaf.git
cd sicnaf
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Configurer les variables d'environnement

```bash
cp .env.example .env.local
```

Éditez `.env.local` et remplissez les valeurs :

```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="votre-secret-tres-long-et-aleatoire"
NEXTAUTH_URL="http://localhost:3000"

NEXT_PUBLIC_COMPANY_NAME="SICNAF"
NEXT_PUBLIC_COMPANY_PHONE="01 23 45 67 89"
NEXT_PUBLIC_COMPANY_EMAIL="contact@sicnaf.com"
NEXT_PUBLIC_COMPANY_ADDRESS="123 Rue de l'Industrie, 75001 Paris"
NEXT_PUBLIC_COMPANY_SIRET="12345678900001"
```

### 4. Initialiser la base de données

```bash
npm run db:push
npm run db:seed
```

### 5. Lancer en développement

```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000)

## 🔐 Accès administrateur

| Champ | Valeur |
|-------|--------|
| URL | http://localhost:3000/admin/login |
| Email | admin@sicnaf.fr |
| Mot de passe | Admin@Sicnaf2024! |

> ⚠️ **Important** : Changez le mot de passe en production !

## 🏗️ Flux de gestion

```
Client → Demande de devis (formulaire public)
          ↓
Admin → Consulte les demandes → Crée un client + intervention
          ↓
Admin → Ajoute pièces et main d'œuvre
          ↓
Admin → Génère la facture (PDF téléchargeable)
```

## 🗄️ Base de données

### Modèles

| Modèle | Description |
|--------|-------------|
| `User` | Administrateur du système |
| `Client` | Clients de l'entreprise |
| `DemandeDevis` | Demandes depuis le formulaire public |
| `Devis` | Devis créés par l'admin |
| `Intervention` | Interventions avec pièces et M.O. |
| `Facture` | Factures générées depuis les interventions |

### Types de services

- `INSTALLATION_BENNE` — Installation de benne
- `CONTENEUR` — Installation de conteneur
- `REPARATION` — Réparation industrielle
- `MAINTENANCE` — Maintenance préventive
- `AUTRE` — Autre

## 🚢 Déploiement en production

### Option 1 : Vercel (recommandé)

```bash
npm install -g vercel
vercel
```

Configurez les variables d'environnement dans le dashboard Vercel.
Pour la DB en production, utilisez **Vercel Postgres** ou **PlanetScale** :

```env
DATABASE_URL="postgresql://user:password@host:5432/sicnaf"
```

Puis dans `prisma/schema.prisma`, changez le provider :

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

### Option 2 : VPS avec PM2

```bash
npm run build
npm install -g pm2
pm2 start npm --name "sicnaf" -- start
```

## 🛠️ Scripts disponibles

| Script | Description |
|--------|-------------|
| `npm run dev` | Démarrer en développement |
| `npm run build` | Builder pour production |
| `npm run start` | Démarrer en production |
| `npm run db:push` | Pousser le schéma Prisma |
| `npm run db:migrate` | Créer une migration |
| `npm run db:studio` | Ouvrir Prisma Studio |
| `npm run db:seed` | Insérer les données initiales |

## 📝 Configuration personnalisation

### Modifier les informations de l'entreprise

Éditez `.env.local` :

```env
NEXT_PUBLIC_COMPANY_NAME="Votre Entreprise"
NEXT_PUBLIC_COMPANY_PHONE="XX XX XX XX XX"
NEXT_PUBLIC_COMPANY_EMAIL="votre@email.fr"
NEXT_PUBLIC_COMPANY_ADDRESS="Votre adresse"
NEXT_PUBLIC_COMPANY_SIRET="VOTRE SIRET"
```

### Modifier les couleurs

Éditez `tailwind.config.js` — section `colors.sicnaf` pour la couleur principale.

## 🔧 Git — Initialisation du dépôt

```bash
git init
git add .
git commit -m "Initial commit — SICNAF v1.0"
git branch -M main
git remote add origin https://github.com/votre-username/sicnaf.git
git push -u origin main
```

---

Développé pour **SICNAF** — Solutions Industrielles & Interventions
