// app/admin/interventions/InterventionActions.tsx
'use client'

import Link from 'next/link'
import { Eye, FileText, Plus } from 'lucide-react'

export default function InterventionActions({ interventionId, hasFacture }: { interventionId: string; hasFacture: boolean }) {
  return (
    <div className="flex items-center gap-1">
      <Link
        href={`/admin/interventions/${interventionId}`}
        className="p-2 rounded-lg hover:bg-sicnaf-50 text-steel-400 hover:text-sicnaf-500 transition-all"
        title="Voir"
      >
        <Eye className="w-4 h-4" />
      </Link>
      {!hasFacture && (
        <Link
          href={`/admin/interventions/${interventionId}/facture`}
          className="p-2 rounded-lg hover:bg-green-50 text-steel-400 hover:text-green-600 transition-all"
          title="Créer facture"
        >
          <Plus className="w-4 h-4" />
        </Link>
      )}
      {hasFacture && (
        <Link
          href={`/admin/interventions/${interventionId}/facture`}
          className="p-2 rounded-lg hover:bg-blue-50 text-steel-400 hover:text-blue-600 transition-all"
          title="Voir facture"
        >
          <FileText className="w-4 h-4" />
        </Link>
      )}
    </div>
  )
}
