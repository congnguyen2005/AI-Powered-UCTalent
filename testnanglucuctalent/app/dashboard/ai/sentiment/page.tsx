'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, BarChart3, PieChart, Activity, Smile, Meh, Frown } from 'lucide-react'

export default function AISentimentPage() {
  const [sentimentData] = useState({
    positive: 75,
    neutral: 15,
    negative: 10,
    dailyTrend: [65, 70, 68, 72, 75, 78, 80]
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Smile className="w-7 h-7 text-green-400" />
          Sentiment Analysis
        </h1>
        <p className="text-slate-400 mt-1">Phân tích cảm xúc khách hàng theo thời gian thực</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-gradient-to-br from-green-500/10 to-green-600/5 rounded-xl border border-green-500/30">
          <div className="flex items-center gap-2 mb-3">
            <Smile className="w-6 h-6 text-green-400" />
            <h3 className="text-lg font-semibold text-white">Tích cực</h3>
          </div>
          <p className="text-3xl font-bold text-green-400">{sentimentData.positive}%</p>
          <p className="text-xs text-green-400/70 mt-2">↑ 12% so với tuần trước</p>
        </div>
        
        <div className="p-6 bg-gradient-to-br from-yellow-500/10 to-yellow-600/5 rounded-xl border border-yellow-500/30">
          <div className="flex items-center gap-2 mb-3">
            <Meh className="w-6 h-6 text-yellow-400" />
            <h3 className="text-lg font-semibold text-white">Trung tính</h3>
          </div>
          <p className="text-3xl font-bold text-yellow-400">{sentimentData.neutral}%</p>
          <p className="text-xs text-yellow-400/70 mt-2">↓ 3% so với tuần trước</p>
        </div>
        
        <div className="p-6 bg-gradient-to-br from-red-500/10 to-red-600/5 rounded-xl border border-red-500/30">
          <div className="flex items-center gap-2 mb-3">
            <Frown className="w-6 h-6 text-red-400" />
            <h3 className="text-lg font-semibold text-white">Tiêu cực</h3>
          </div>
          <p className="text-3xl font-bold text-red-400">{sentimentData.negative}%</p>
          <p className="text-xs text-red-400/70 mt-2">↓ 5% so với tuần trước</p>
        </div>
      </div>

      <div className="p-6 bg-slate-800/30 rounded-xl border border-slate-700">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Activity className="w-5 h-5 text-blue-400" />
          Sentiment Trend (7 ngày)
        </h3>
        <div className="h-64 flex items-end justify-between gap-2">
          {sentimentData.dailyTrend.map((value, idx) => (
            <div key={idx} className="flex-1 flex flex-col items-center gap-2">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${value * 2}px` }}
                className="w-full bg-gradient-to-t from-green-500 to-green-400 rounded-t-lg"
              />
              <span className="text-xs text-slate-400">Ngày {idx + 1}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}