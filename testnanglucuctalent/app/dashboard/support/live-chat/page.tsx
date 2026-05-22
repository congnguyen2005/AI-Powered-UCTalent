// app/dashboard/support/live-chat/page.tsx
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { MessageCircle, Users, Settings, Clock, CheckCircle, Shield } from 'lucide-react'
import AdminChatPanel from '../../../components/chat/AdminChatPanel'

export default function LiveChatPage() {
  const [stats] = useState({
    totalConversations: 156,
    activeChats: 3,
    waitingChats: 2,
    resolvedToday: 12,
    avgResponseTime: '1.2',
    satisfactionRate: 98,
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <MessageCircle className="w-7 h-7 text-green-400" />
          Hỗ trợ trực tuyến
        </h1>
        <p className="text-slate-400 mt-1">Quản lý chat hỗ trợ khách hàng realtime</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <div className="p-4 bg-slate-800/30 rounded-xl border border-slate-700">
          <p className="text-xs text-slate-400">Tổng hội thoại</p>
          <p className="text-2xl font-bold text-white">{stats.totalConversations}</p>
        </div>
        <div className="p-4 bg-green-500/10 rounded-xl border border-green-500/30">
          <p className="text-xs text-slate-400">Đang hỗ trợ</p>
          <p className="text-2xl font-bold text-green-400">{stats.activeChats}</p>
        </div>
        <div className="p-4 bg-yellow-500/10 rounded-xl border border-yellow-500/30">
          <p className="text-xs text-slate-400">Chờ phản hồi</p>
          <p className="text-2xl font-bold text-yellow-400">{stats.waitingChats}</p>
        </div>
        <div className="p-4 bg-blue-500/10 rounded-xl border border-blue-500/30">
          <p className="text-xs text-slate-400">Đã xử lý hôm nay</p>
          <p className="text-2xl font-bold text-blue-400">{stats.resolvedToday}</p>
        </div>
        <div className="p-4 bg-purple-500/10 rounded-xl border border-purple-500/30">
          <p className="text-xs text-slate-400">TG phản hồi TB</p>
          <p className="text-2xl font-bold text-purple-400">{stats.avgResponseTime} phút</p>
        </div>
        <div className="p-4 bg-green-500/10 rounded-xl border border-green-500/30">
          <p className="text-xs text-slate-400">Hài lòng</p>
          <p className="text-2xl font-bold text-green-400">{stats.satisfactionRate}%</p>
        </div>
      </div>

      {/* Chat Panel */}
      <AdminChatPanel />

      {/* Quick Settings */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-slate-800/30 rounded-xl border border-slate-700">
          <div className="flex items-center gap-2 mb-3">
            <Clock className="w-5 h-5 text-blue-400" />
            <h3 className="font-semibold text-white">Giờ làm việc</h3>
          </div>
          <p className="text-sm text-slate-300">Thứ 2 - Chủ nhật: 8:00 - 21:00</p>
          <p className="text-xs text-slate-500 mt-1">Hỗ trợ 24/7 cho khách hàng doanh nghiệp</p>
        </div>

        <div className="p-4 bg-slate-800/30 rounded-xl border border-slate-700">
          <div className="flex items-center gap-2 mb-3">
            <Shield className="w-5 h-5 text-green-400" />
            <h3 className="font-semibold text-white">Tự động trả lời</h3>
          </div>
          <p className="text-sm text-slate-300">AI hỗ trợ trả lời tự động khi offline</p>
          <p className="text-xs text-slate-500 mt-1">Có thể tùy chỉnh câu trả lời mặc định</p>
        </div>

        <div className="p-4 bg-slate-800/30 rounded-xl border border-slate-700">
          <div className="flex items-center gap-2 mb-3">
            <Users className="w-5 h-5 text-purple-400" />
            <h3 className="font-semibold text-white">Nhân viên hỗ trợ</h3>
          </div>
          <p className="text-sm text-slate-300">3 nhân viên đang trực tuyến</p>
          <p className="text-xs text-slate-500 mt-1">Phân công ca trực tự động</p>
        </div>
      </div>
    </div>
  )
}