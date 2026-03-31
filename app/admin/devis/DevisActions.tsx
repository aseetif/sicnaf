// app/admin/devis/DevisActions.tsx
'use client'
import Link from 'next/link'
import { Eye } from 'lucide-react'

export default function DevisActions({ devisId }: { devisId: string }) {
  return (
    <div className="flex items-center gap-1">
      <Link href={`/admin/devis/${devisId}`} className="p-2 rounded-lg hover:bg-sicnaf-50 text-steel-400 hover:text-sicnaf-500 transition-all" title="Voir">
        <Eye className="w-4 h-4" />
      </Link>
    </div>
  )
}
