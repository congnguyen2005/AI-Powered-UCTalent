// app/components/dashboard/MainLayout.tsx
'use client'

import { ReactNode } from 'react'
import Sidebar from './Sidebar'
import Topbar from './Topbar'

interface MainLayoutProps {
  children: ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-black">
      <Sidebar />
      <div className="ml-20 lg:ml-72">
        <Topbar />
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  )
}