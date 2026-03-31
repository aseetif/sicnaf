// app/admin/factures/FactureActions.tsx
'use client'

import Link from 'next/link'
import { Eye, CheckCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function FactureActions({ facture, interventionId }: { facture: any; interventionId: string }) {
  const router = useRouter()

  const markPaid = async () => {
    await fetch(`/api/factures/${facture.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ statut: 'PAYEE' }),
    })
    router.refresh()
  }

  return (
    <div className="flex items-center gap-1">
      <Link
        href={`/admin/interventions/${interventionId}/facture`}
        className="p-2 rounded-lg hover:bg-sicnaf-50 text-steel-400 hover:text-sicnaf-500 transition-all"
        title="Voir"
      >
        <Eye className="w-4 h-4" />
      </Link>
      {facture.statut === 'EN_ATTENTE' && (
        <button
          onClick={markPaid}
          className="p-2 rounded-lg hover:bg-green-50 text-steel-400 hover:text-green-600 transition-all"
          title="Marquer payée"
        >
          <CheckCircle className="w-4 h-4" />
        </button>
      )}
    </div>
  )
}
