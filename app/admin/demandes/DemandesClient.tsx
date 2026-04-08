// app/admin/demandes/DemandesClient.tsx
'use client'

import { useState } from 'react'
import { formatDate, getStatutColor, getStatutLabel, getTypeServiceLabel } from '@/lib/utils'
import { Phone, Mail, CheckCircle, Clock, Eye } from 'lucide-react'

export default function DemandesClient({ demandes }: { demandes: any[] }) {
  const [selected, setSelected] = useState<any>(null)
  const [filter, setFilter] = useState('ALL')

  const filtered = demandes.filter(d => filter === 'ALL' || d.statut === filter)

  const updateStatut = async (id: string, statut: string) => {
    await fetch(`/api/demandes/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ statut }),
    })
    window.location.reload()
  }

  return (
    <div className="flex gap-6">
      {/* List */}
      <div className="flex-1">
        {/* Filters */}
        <div className="flex gap-2 mb-4">
          {[
            { value: 'ALL', label: 'Toutes' },
            { value: 'NOUVEAU', label: 'Nouvelles' },
            { value: 'EN_COURS', label: 'En cours' },
            { value: 'TRAITE', label: 'Traitées' },
          ].map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filter === f.value
                  ? 'bg-sicnaf-500 text-white'
                  : 'bg-white text-steel-600 border border-steel-200 hover:border-sicnaf-300'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {filtered.length === 0 && (
            <div className="card text-center py-12 text-steel-400">Aucune demande</div>
          )}
          {filtered.map((d) => (
            <div
              key={d.id}
              onClick={() => setSelected(d)}
              className={`card cursor-pointer transition-all ${selected?.id === d.id ? 'border-sicnaf-400 shadow-card-hover' : ''}`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold">{d.prenom} {d.nom}</span>
                    {d.societe && <span className="text-steel-400 text-sm">— {d.societe}</span>}
                    <span className={`badge ${getStatutColor(d.statut)}`}>{getStatutLabel(d.statut)}</span>
                  </div>
                  <div className="text-sm text-steel-500 mb-2">{getTypeServiceLabel(d.typeService)}</div>
                  <p className="text-sm text-steel-400 line-clamp-2">{d.description}</p>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-xs text-steel-400">{formatDate(d.createdAt)}</div>
                  <div className="flex gap-1.5 mt-2">
                    <a href={`tel:${d.telephone}`} onClick={e => e.stopPropagation()} className="p-1.5 rounded-lg bg-steel-100 hover:bg-sicnaf-500 hover:text-white transition-all">
                      <Phone className="w-3.5 h-3.5" />
                    </a>
                    <a href={`mailto:${d.email}`} onClick={e => e.stopPropagation()} className="p-1.5 rounded-lg bg-steel-100 hover:bg-sicnaf-500 hover:text-white transition-all">
                      <Mail className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail panel */}
      {selected && (
        <div className="w-80 shrink-0">
          <div className="card sticky top-8">
            <h3 className="font-semibold text-sicnaf-500 mb-4">Détail de la demande</h3>

            <div className="space-y-3 text-sm">
              <div>
                <span className="text-steel-400">Client</span>
                <div className="font-medium">{selected.prenom} {selected.nom}</div>
                {selected.societe && <div className="text-steel-500">{selected.societe}</div>}
              </div>
              <div>
                <span className="text-steel-400">Contact</span>
                <div>{selected.telephone}</div>
                <div className="text-steel-500">{selected.email}</div>
              </div>
              <div>
                <span className="text-steel-400">Service</span>
                <div className="font-medium">{getTypeServiceLabel(selected.typeService)}</div>
              </div>
              {selected.adresse && (
                <div>
                  <span className="text-steel-400">Adresse chantier</span>
                  <div>{selected.adresse}</div>
                </div>
              )}
              {selected.datesouhaitee && (
                <div>
                  <span className="text-steel-400">Date souhaitée</span>
                  <div>{selected.datesouhaitee}</div>
                </div>
              )}
              <div>
                <span className="text-steel-400">Description</span>
                <p className="text-steel-600 leading-relaxed mt-1">{selected.description}</p>
              </div>
              {selected.tonnage && (
                <div>
                  <span className="text-steel-400">Tonnage</span>
                  <div>{selected.tonnage}</div>
                </div>
              )}
              {selected.dimensions && (
                <div>
                  <span className="text-steel-400">Dimensions</span>
                  <div>{selected.dimensions}</div>
                </div>
              )}
              {selected.marqueVehicule && (
                <div>
                  <span className="text-steel-400">Marque véhicule</span>
                  <div>{selected.marqueVehicule}</div>
                </div>
              )}
            </div>

            <div className="border-t border-steel-100 mt-4 pt-4 space-y-2">
              <div className="text-xs text-steel-400 mb-2">Changer le statut :</div>
              <button
                onClick={() => updateStatut(selected.id, 'EN_COURS')}
                className="flex items-center gap-2 w-full px-3 py-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 text-sm font-medium"
              >
                <Clock className="w-4 h-4" /> Marquer en cours
              </button>
              <button
                onClick={() => updateStatut(selected.id, 'TRAITE')}
                className="flex items-center gap-2 w-full px-3 py-2 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 text-sm font-medium"
              >
                <CheckCircle className="w-4 h-4" /> Marquer traité
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
