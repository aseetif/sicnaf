// lib/utils.ts
import { clsx, type ClassValue } from 'clsx'

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

export function generateNumero(prefix: string): string {
  const date = new Date()
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const random = Math.floor(Math.random() * 9000) + 1000
  return `${prefix}-${year}${month}-${random}`
}

export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
  }).format(amount)
}

export function getStatutColor(statut: string): string {
  const colors: Record<string, string> = {
    EN_ATTENTE: 'bg-yellow-100 text-yellow-800',
    NOUVEAU: 'bg-blue-100 text-blue-800',
    ACCEPTE: 'bg-green-100 text-green-800',
    REFUSE: 'bg-red-100 text-red-800',
    EXPIRE: 'bg-gray-100 text-gray-800',
    EN_COURS: 'bg-blue-100 text-blue-800',
    TERMINEE: 'bg-green-100 text-green-800',
    ANNULEE: 'bg-red-100 text-red-800',
    PAYEE: 'bg-green-100 text-green-800',
    TRAITE: 'bg-green-100 text-green-800',
  }
  return colors[statut] || 'bg-gray-100 text-gray-800'
}

export function getStatutLabel(statut: string): string {
  const labels: Record<string, string> = {
    EN_ATTENTE: 'En attente',
    NOUVEAU: 'Nouveau',
    ACCEPTE: 'Accepté',
    REFUSE: 'Refusé',
    EXPIRE: 'Expiré',
    EN_COURS: 'En cours',
    TERMINEE: 'Terminée',
    ANNULEE: 'Annulée',
    PAYEE: 'Payée',
    TRAITE: 'Traité',
  }
  return labels[statut] || statut
}

export function getTypeServiceLabel(type: string): string {
  const labels: Record<string, string> = {
    INSTALLATION_BENNE: 'Installation de benne',
    CONTENEUR: 'Conteneur',
    REPARATION: 'Réparation',
    MAINTENANCE: 'Maintenance',
    AUTRE: 'Autre',
  }
  return labels[type] || type
}
