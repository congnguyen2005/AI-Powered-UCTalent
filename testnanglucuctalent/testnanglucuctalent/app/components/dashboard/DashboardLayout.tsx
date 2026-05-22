'use client'

import { ReactNode, useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Menu, X, LayoutDashboard, Star, Settings, LogOut, Sparkles } from 'lucide-react'

interface DashboardLayoutProps {
  children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [userName, setUserName] = useState('')
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/auth/login')
    }
    // Lấy tên user từ token hoặc localStorage
    const name = localStorage.getItem('userName') || 'Nhân viên'
    setUserName(name)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userName')
    router.push('/auth/login')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black">
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen bg-slate-900/80 backdrop-blur-xl border-r border-slate-800 transition-all duration-300 z-20 ${
          sidebarOpen ? 'w-64' : 'w-20'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className={`p-5 border-b border-slate-800 ${!sidebarOpen && 'px-2'}`}>
            <div className="flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-blue-400" />
              {sidebarOpen && (
                <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  ORM AI
                </span>
              )}
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-3 space-y-1.5">
            <Link
              href="/dashboard"
              className="flex items-center gap-3 px-3 py-2.5 text-slate-300 hover:bg-slate-800 rounded-xl transition group"
            >
              <LayoutDashboard className="w-5 h-5" />
              {sidebarOpen && <span>Bảng điều khiển</span>}
            </Link>
            <Link
              href="/dashboard/reviews"
              className="flex items-center gap-3 px-3 py-2.5 text-slate-300 hover:bg-slate-800 rounded-xl transition group"
            >
              <Star className="w-5 h-5" />
              {sidebarOpen && <span>Quản lý đánh giá</span>}
            </Link>
            <Link
              href="/dashboard/settings"
              className="flex items-center gap-3 px-3 py-2.5 text-slate-300 hover:bg-slate-800 rounded-xl transition group"
            >
              <Settings className="w-5 h-5" />
              {sidebarOpen && <span>Cài đặt</span>}
            </Link>
          </nav>

          {/* User Info & Logout */}
          <div className="p-4 border-t border-slate-800">
            {sidebarOpen && (
              <div className="mb-3 px-2">
                <p className="text-sm text-slate-400">Xin chào,</p>
                <p className="font-semibold text-white truncate">{userName}</p>
              </div>
            )}
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-3 py-2 text-red-400 hover:bg-red-500/10 rounded-xl transition"
            >
              <LogOut className="w-5 h-5" />
              {sidebarOpen && <span>Đăng xuất</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main
        className={`transition-all duration-300 min-h-screen ${
          sidebarOpen ? 'ml-64' : 'ml-20'
        }`}
      >
        <div className="p-6 md:p-8">{children}</div>
      </main>

      {/* Toggle Sidebar Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed left-4 top-4 z-30 p-2 bg-slate-800/80 backdrop-blur-sm hover:bg-slate-700 rounded-lg text-white transition border border-slate-700"
      >
        {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
      </button>
    </div>
  )
}