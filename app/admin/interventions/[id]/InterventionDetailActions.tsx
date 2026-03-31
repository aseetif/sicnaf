// app/admin/interventions/[id]/InterventionDetailActions.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { CheckCircle, XCircle, Loader2 } from 'lucide-react'

export default function InterventionDetailActions({ intervention }: { intervention: any }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const updateStatut = async (statut: string) => {
    setLoading(true)
    await fetch(`/api/interventions/${intervention.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ statut }),
    })
    router.refresh()
    setLoading(false)
  }

  return (
    <div className="flex gap-2">
      {intervention.statut === 'EN_COURS' && (
        <button
          onClick={() => updateStatut('TERMINEE')}
          disabled={loading}
          className="flex items-center gap-1.5 px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 transition-colors"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
          Terminer
        </button>
      )}
      {intervention.statut !== 'ANNULEE' && (
        <button
          onClick={() => updateStatut('ANNULEE')}
          disabled={loading}
          className="flex items-center gap-1.5 px-4 py-2 bg-red-50 text-red-600 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors"
        >
          <XCircle className="w-4 h-4" />
          Annuler
        </button>
      )}
    </div>
  )
}
