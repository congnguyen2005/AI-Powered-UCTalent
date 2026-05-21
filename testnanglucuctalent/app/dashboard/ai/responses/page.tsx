'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { MessageSquare, CheckCircle, Clock, TrendingUp, Zap, Edit3, Copy, ThumbsUp } from 'lucide-react'
import toast from 'react-hot-toast'

export default function AIResponsesPage() {
  const [responses] = useState([
    { id: 1, text: 'Cảm ơn bạn đã phản hồi tích cực! Chúng tôi rất vui khi được phục vụ bạn.', approved: true, used: 45, sentiment: 'positive' },
    { id: 2, text: 'Xin lỗi vì trải nghiệm không tốt. Chúng tôi sẽ liên hệ lại trong 24h.', approved: true, used: 38, sentiment: 'negative' },
    { id: 3, text: 'Cảm ơn góp ý của bạn. Chúng tôi sẽ xem xét để cải thiện.', approved: false, used: 12, sentiment: 'neutral' },
  ])

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success('Đã sao chép phản hồi')
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <MessageSquare className="w-7 h-7 text-blue-400" />
          AI Response Library
        </h1>
        <p className="text-slate-400 mt-1">Thư viện phản hồi thông minh do AI tạo ra</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-slate-800/30 rounded-xl border border-slate-700">
          <p className="text-sm text-slate-400">Tổng phản hồi</p>
          <p className="text-2xl font-bold text-white">156</p>
        </div>
        <div className="p-4 bg-slate-800/30 rounded-xl border border-slate-700">
          <p className="text-sm text-slate-400">Đã duyệt</p>
          <p className="text-2xl font-bold text-green-400">87%</p>
        </div>
        <div className="p-4 bg-slate-800/30 rounded-xl border border-slate-700">
          <p className="text-sm text-slate-400">Đã sử dụng</p>
          <p className="text-2xl font-bold text-blue-400">95</p>
        </div>
      </div>

      <div className="space-y-3">
        {responses.map((response, idx) => (
          <motion.div
            key={response.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="p-4 bg-slate-800/30 rounded-xl border border-slate-700"
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-2">
                {response.approved ? (
                  <CheckCircle className="w-4 h-4 text-green-400" />
                ) : (
                  <Clock className="w-4 h-4 text-yellow-400" />
                )}
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  response.sentiment === 'positive' ? 'bg-green-500/20 text-green-400' :
                  response.sentiment === 'negative' ? 'bg-red-500/20 text-red-400' :
                  'bg-yellow-500/20 text-yellow-400'
                }`}>
                  {response.sentiment === 'positive' ? 'Tích cực' : response.sentiment === 'negative' ? 'Tiêu cực' : 'Trung tính'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500">Đã dùng: {response.used} lần</span>
              </div>
            </div>
            <p className="text-slate-300 text-sm mb-3">{response.text}</p>
            <div className="flex gap-2">
              <button onClick={() => copyToClipboard(response.text)} className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 rounded-lg text-xs text-white transition flex items-center gap-1">
                <Copy className="w-3 h-3" /> Sao chép
              </button>
              <button className="px-3 py-1.5 bg-blue-600/20 hover:bg-blue-600/30 rounded-lg text-xs text-blue-400 transition flex items-center gap-1">
                <Edit3 className="w-3 h-3" /> Chỉnh sửa
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}