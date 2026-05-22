// app/components/dashboard/Topbar.tsx
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  Bell,
  Settings,
  LogOut,
  User,
  ChevronDown,
  Sparkles,
  Shield,
  Clock,
  MessageSquare,
  AlertTriangle,
  CheckCircle,
  X
} from 'lucide-react'

interface Notification {
  id: string
  type: 'info' | 'warning' | 'critical' | 'success'
  title: string
  message: string
  time: string
  read: boolean
}

export default function Topbar() {
  const router = useRouter()
  const [showNotifications, setShowNotifications] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'critical',
      title: 'Phát hiện khủng hoảng',
      message: 'Review tiêu cực từ khách hàng tại chi nhánh HCM',
      time: '2 phút trước',
      read: false,
    },
    {
      id: '2',
      type: 'warning',
      title: 'Review chờ xử lý',
      message: '5 review cần phản hồi gấp',
      time: '15 phút trước',
      read: false,
    },
    {
      id: '3',
      type: 'success',
      title: 'AI đã tạo phản hồi',
      message: '3 gợi ý mới cho review tiêu cực',
      time: '1 giờ trước',
      read: true,
    },
  ])

  const unreadCount = notifications.filter(n => !n.read).length

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'critical': return <AlertTriangle className="w-4 h-4 text-red-400" />
      case 'warning': return <Clock className="w-4 h-4 text-yellow-400" />
      case 'success': return <CheckCircle className="w-4 h-4 text-green-400" />
      default: return <MessageSquare className="w-4 h-4 text-blue-400" />
    }
  }

  const getNotificationBg = (type: string) => {
    switch (type) {
      case 'critical': return 'bg-red-500/10 border-red-500/30'
      case 'warning': return 'bg-yellow-500/10 border-yellow-500/30'
      case 'success': return 'bg-green-500/10 border-green-500/30'
      default: return 'bg-blue-500/10 border-blue-500/30'
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userName')
    router.push('/auth/login')
  }

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    )
  }

  return (
    <header className="sticky top-0 z-20 bg-slate-900/80 backdrop-blur-xl border-b border-slate-800">
      <div className="flex items-center justify-between px-6 py-3">
        {/* Left - Search */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Tìm kiếm review, khách hàng, chi nhánh..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition text-sm"
            />
          </div>
        </div>

        {/* Right - Actions */}
        <div className="flex items-center gap-2">
          {/* AI Quick Action */}
          <button className="relative p-2 rounded-lg bg-gradient-to-r from-blue-600/20 to-purple-600/20 hover:from-blue-600/30 hover:to-purple-600/30 transition border border-blue-500/30">
            <Sparkles className="w-5 h-5 text-blue-400" />
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-lg hover:bg-slate-800 transition"
            >
              <Bell className="w-5 h-5 text-slate-400" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              )}
            </button>

            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 top-full mt-2 w-96 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl overflow-hidden z-50"
                >
                  <div className="p-4 border-b border-slate-800 flex justify-between items-center">
                    <h3 className="font-semibold text-white">Thông báo</h3>
                    <button
                      onClick={() => setShowNotifications(false)}
                      className="p-1 rounded-lg hover:bg-slate-800"
                    >
                      <X className="w-4 h-4 text-slate-400" />
                    </button>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="p-8 text-center text-slate-500">
                        <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">Không có thông báo mới</p>
                      </div>
                    ) : (
                      notifications.map((notif) => (
                        <div
                          key={notif.id}
                          className={`p-4 border-b border-slate-800 hover:bg-slate-800/50 transition cursor-pointer ${
                            !notif.read ? 'bg-slate-800/30' : ''
                          }`}
                          onClick={() => markAsRead(notif.id)}
                        >
                          <div className={`p-3 rounded-lg ${getNotificationBg(notif.type)}`}>
                            <div className="flex items-start gap-3">
                              {getNotificationIcon(notif.type)}
                              <div className="flex-1">
                                <p className="text-sm font-medium text-white">{notif.title}</p>
                                <p className="text-xs text-slate-400 mt-1">{notif.message}</p>
                                <p className="text-xs text-slate-500 mt-2">{notif.time}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                  <div className="p-3 border-t border-slate-800 text-center">
                    <button className="text-xs text-blue-400 hover:text-blue-300">
                      Xem tất cả thông báo
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-lg hover:bg-slate-800 transition"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <span className="text-white text-sm font-medium">AD</span>
              </div>
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </button>

            <AnimatePresence>
              {showUserMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 top-full mt-2 w-64 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl overflow-hidden z-50"
                >
                  <div className="p-4 border-b border-slate-800">
                    <p className="font-semibold text-white">Admin Demo</p>
                    <p className="text-xs text-slate-400 mt-0.5">admin@demo.com</p>
                    <div className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 bg-blue-500/20 rounded-full">
                      <Shield className="w-3 h-3 text-blue-400" />
                      <span className="text-xs text-blue-400">Super Admin</span>
                    </div>
                  </div>
                  <div className="py-2">
                    <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-300 hover:bg-slate-800 transition">
                      <User className="w-4 h-4" />
                      Hồ sơ
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-300 hover:bg-slate-800 transition">
                      <Settings className="w-4 h-4" />
                      Cài đặt
                    </button>
                    <hr className="my-2 border-slate-800" />
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 transition"
                    >
                      <LogOut className="w-4 h-4" />
                      Đăng xuất
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  )
}