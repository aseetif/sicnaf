// app/admin/layout.tsx
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import AdminSidebar from '@/components/admin/Sidebar'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-steel-50">
      <AdminSidebar user={session.user} />
      <main className="md:ml-64 p-4 md:p-8 min-h-screen">
        {children}
      </main>
    </div>
  )
}
