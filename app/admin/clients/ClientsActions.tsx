// app/admin/clients/ClientsActions.tsx
'use client'

import Link from 'next/link'
import { Edit, Eye } from 'lucide-react'

export default function ClientsActions({ clientId }: { clientId: string }) {
  return (
    <div className="flex items-center gap-2">
      <Link
        href={`/admin/clients/${clientId}`}
        className="p-2 rounded-lg hover:bg-sicnaf-50 text-steel-400 hover:text-sicnaf-500 transition-all"
        title="Voir"
      >
        <Eye className="w-4 h-4" />
      </Link>
      <Link
        href={`/admin/clients/${clientId}/modifier`}
        className="p-2 rounded-lg hover:bg-sicnaf-50 text-steel-400 hover:text-sicnaf-500 transition-all"
        title="Modifier"
      >
        <Edit className="w-4 h-4" />
      </Link>
    </div>
  )
}
