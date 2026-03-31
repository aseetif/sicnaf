// app/admin/devis/[id]/DevisDetailActions.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Download, CheckCircle, XCircle, Loader2 } from 'lucide-react'

export default function DevisDetailActions({ devis }: { devis: any }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [downloading, setDownloading] = useState(false)

  const updateStatut = async (statut: string) => {
    setLoading(true)
    await fetch(`/api/devis/${devis.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ statut }),
    })
    router.refresh()
    setLoading(false)
  }

  const downloadPDF = async () => {
    setDownloading(true)
    try {
      const { generateDevisPDF } = await import('@/lib/pdf')
      await generateDevisPDF(devis)
    } finally {
      setDownloading(false)
    }
  }

  return (
    <div className="flex gap-2">
      <button onClick={downloadPDF} disabled={downloading} className="btn-outline text-sm">
        {downloading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
        PDF
      </button>
      {devis.statut === 'EN_ATTENTE' && (
        <>
          <button onClick={() => updateStatut('ACCEPTE')} disabled={loading} className="flex items-center gap-1.5 px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600">
            <CheckCircle className="w-4 h-4" /> Accepter
          </button>
          <button onClick={() => updateStatut('REFUSE')} disabled={loading} className="flex items-center gap-1.5 px-4 py-2 bg-red-50 text-red-600 rounded-lg text-sm font-medium hover:bg-red-100">
            <XCircle className="w-4 h-4" /> Refuser
          </button>
        </>
      )}
    </div>
  )
}
