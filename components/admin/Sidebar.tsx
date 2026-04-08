'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import {
  LayoutDashboard, Users, ClipboardList, Wrench,
  FileText, LogOut, ExternalLink, Bell
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'

export default function AdminSidebar({ user }: { user: any }) {
  const pathname = usePathname()
  const [nouvellesDemandes, setNouvellesDemandes] = useState(0)

  useEffect(() => {
    const fetchDemandes = async () => {
      try {
        const res = await fetch('/api/demandes/count')
        const data = await res.json()
        setNouvellesDemandes(data.count)
      } catch (e) {}
    }
    fetchDemandes()
    const interval = setInterval(fetchDemandes, 30000)
    return () => clearInterval(interval)
  }, [])

  const nav = [
    { href: '/admin/dashboard', icon: LayoutDashboard, label: 'Tableau de bord', badge: 0 },
    { href: '/admin/demandes', icon: Bell, label: 'Demandes clients', badge: nouvellesDemandes },
    { href: '/admin/clients', icon: Users, label: 'Clients', badge: 0 },
    { href: '/admin/devis', icon: ClipboardList, label: 'Devis', badge: 0 },
    { href: '/admin/interventions', icon: Wrench, label: 'Interventions', badge: 0 },
    { href: '/admin/factures', icon: FileText, label: 'Factures', badge: 0 },
  ]

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-sicnaf-500 text-white flex flex-col z-40">
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
            <span className="font-display font-bold text-lg">SN</span>
          </div>
          <div>
            <div className="font-display font-bold text-xl">SICNAF</div>
            <div className="text-white/50 text-xs">Administration</div>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {nav.map((item) => {
          const active = pathname === item.href || pathname.startsWith(item.href + '/')
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-150',
                active
                  ? 'bg-white/20 text-white shadow-sm'
                  : 'text-white/60 hover:bg-white/10 hover:text-white'
              )}
            >
              <div className="flex items-center gap-3">
                <item.icon className="w-5 h-5 shrink-0" />
                {item.label}
              </div>
              {item.badge > 0 && (
                <span className="bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {item.badge > 9 ? '9+' : item.badge}
                </span>
              )}
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-white/10 space-y-2">
        <a
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-white/60 hover:bg-white/10 hover:text-white transition-all"
        >
          <ExternalLink className="w-5 h-5" />
          Voir le site
        </a>

        <div className="px-4 py-3 bg-white/5 rounded-xl">
          <div className="text-xs text-white/40 mb-0.5">Connecté en tant que</div>
          <div className="text-sm font-medium truncate">{user?.name || user?.email}</div>
        </div>

        <button
          onClick={() => signOut({ callbackUrl: '/login' })}
          className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-white/60 hover:bg-red-500/20 hover:text-red-300 transition-all w-full"
        >
          <LogOut className="w-5 h-5" />
          Déconnexion
        </button>
      </div>
    </aside>
  )
}