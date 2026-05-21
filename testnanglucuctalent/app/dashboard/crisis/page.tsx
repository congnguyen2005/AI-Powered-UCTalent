// app/dashboard/crisis/page.tsx
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  AlertTriangle,
  Shield,
  Clock,
  Eye,
  Send,
  CheckCircle,
  XCircle,
  TrendingUp,
  Bell,
  Zap
} from 'lucide-react'

export default function CrisisCenter() {
  const [crisisReviews] = useState([
    {
      id: '1',
      text: 'THẢM HỌA! Phòng bẩn, giường có rệp, nhân viên thô lỗ. Tôi sẽ đăng bài này lên các hội nhóm để mọi người biết!',
      author: 'Phạm Thị D',
      rating: 1,
      riskLevel: 'critical',
      timestamp: '1 giờ trước',
      status: 'pending',
    },
    {
      id: '2',
      text: 'Dịch vụ quá tệ, tôi sẽ kiện các bạn vì đã lừa dối khách hàng. Đã ghi âm lại toàn bộ cuộc trò chuyện.',
      author: 'Nguyễn Văn B',
      rating: 1,
      riskLevel: 'high',
      timestamp: '3 giờ trước',
      status: 'investigating',
    },
  ])

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'critical': return 'bg-red-500/20 text-red-400 border-red-500/30'
      case 'high': return 'bg-orange-500/20 text-orange-400 border-orange-500/30'
      default: return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
    }
  }

  const getRiskLabel = (level: string) => {
    switch (level) {
      case 'critical': return '⚠️ NGUY CẤP'
      case 'high': return 'CAO'
      default: return 'TRUNG BÌNH'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <AlertTriangle className="w-7 h-7 text-red-400" />
          Trung tâm khủng hoảng
        </h1>
        <p className="text-slate-400 mt-1">Phát hiện và xử lý khủng hoảng truyền thông realtime</p>
      </div>

      {/* Alert Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-5 bg-red-500/10 rounded-xl border border-red-500/30">
          <p className="text-sm text-slate-400 mb-1">Nguy cấp</p>
          <p className="text-3xl font-bold text-red-400">2</p>
          <p className="text-xs text-red-400/70 mt-2">Cần xử lý ngay</p>
        </div>
        <div className="p-5 bg-orange-500/10 rounded-xl border border-orange-500/30">
          <p className="text-sm text-slate-400 mb-1">Cảnh báo cao</p>
          <p className="text-3xl font-bold text-orange-400">5</p>
          <p className="text-xs text-orange-400/70 mt-2">Theo dõi sát</p>
        </div>
        <div className="p-5 bg-yellow-500/10 rounded-xl border border-yellow-500/30">
          <p className="text-sm text-slate-400 mb-1">Cảnh báo trung bình</p>
          <p className="text-3xl font-bold text-yellow-400">12</p>
          <p className="text-xs text-yellow-400/70 mt-2">Cần phản hồi</p>
        </div>
        <div className="p-5 bg-green-500/10 rounded-xl border border-green-500/30">
          <p className="text-sm text-slate-400 mb-1">Đã xử lý</p>
          <p className="text-3xl font-bold text-green-400">8</p>
          <p className="text-xs text-green-400/70 mt-2">Trong 24h qua</p>
        </div>
      </div>

      {/* Crisis Reviews List */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-white">Đánh giá nguy cơ khủng hoảng</h2>
        {crisisReviews.map((review, idx) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="p-5 bg-gradient-to-r from-red-500/10 to-red-600/5 rounded-xl border border-red-500/30"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                </div>
                <div>
                  <p className="font-semibold text-white">{review.author}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className={`px-2 py-0.5 rounded-full text-xs font-medium border ${getRiskColor(review.riskLevel)}`}>
                      {getRiskLabel(review.riskLevel)}
                    </div>
                    <span className="text-xs text-slate-500">{review.timestamp}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition">
                  Xử lý ngay
                </button>
                <button className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm font-medium transition">
                  Theo dõi
                </button>
              </div>
            </div>
            <p className="text-slate-300 mb-3">{review.text}</p>
            <div className="flex items-center gap-4 text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <Eye className="w-3 h-3" /> Viral risk: High
              </span>
              <span className="flex items-center gap-1">
                <Send className="w-3 h-3" /> Legal threat: Yes
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* AI Recommendations */}
      <div className="p-6 bg-slate-800/30 rounded-xl border border-slate-700">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Zap className="w-5 h-5 text-yellow-400" />
          AI Recommendations
        </h3>
        <div className="space-y-3">
          <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/30">
            <p className="text-sm text-blue-300">📢 Khuyến nghị xử lý khủng hoảng</p>
            <p className="text-xs text-slate-400 mt-2">
              Phản hồi trong vòng 15 phút, liên hệ trực tiếp với khách hàng qua điện thoại, 
              chuẩn bị phương án bồi thường, thông báo cho ban giám đốc.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}